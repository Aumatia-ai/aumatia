"use server";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

export interface UserProfileServer {
    id: string;
    email: string;
    full_name: string;
}

export interface TenantUserServer {
    id: string;
    user_id: string;
    tenant_id: string;
    role: string;
    is_active: boolean;
    active_modules: Record<string, boolean>;
    users: UserProfileServer;
}

/**
 * Server Action: Fetch all tenant users bypassing RLS using Service Role Key.
 * This eliminates ALL "infinite recursion" and RLS permission issues.
 */
export async function fetchTenantUsersAction(tenantId: string): Promise<TenantUserServer[]> {
    if (!serviceRoleKey) {
        throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing.");
    }

    // Step 1: Fetch tenant_users rows
    let query = supabaseAdmin
        .from('tenant_users')
        .select('id, user_id, tenant_id, role, is_active, active_modules');

    // If not master/super-admin, scope to specific tenant
    if (tenantId !== 'master') {
        query = query.eq('tenant_id', tenantId);
    }

    const { data: tenantData, error: tenantErr } = await query;

    if (tenantErr) {
        console.error("fetchTenantUsersAction: Error en tenant_users SELECT:", tenantErr.message);
        throw new Error(tenantErr.message);
    }

    if (!tenantData || tenantData.length === 0) {
        return [];
    }

    // Step 2: Fetch user profiles from users_global
    const userIds = tenantData.map(t => t.user_id);
    const { data: usersData, error: usersErr } = await supabaseAdmin
        .from('users_global')
        .select('id, email, full_name')
        .in('id', userIds);

    if (usersErr) {
        console.warn("fetchTenantUsersAction: No se pudo leer users_global:", usersErr.message);
    }

    // Step 3: Merge results
    const result = tenantData.map(tu => {
        const matchedUser = (usersData || []).find(u => u.id === tu.user_id) || {
            id: tu.user_id,
            email: "Sin perfil",
            full_name: "Sin perfil"
        };
        return {
            ...tu,
            users: matchedUser
        };
    });

    return result as TenantUserServer[];
}

/**
 * Server Action: Update user module permissions bypassing RLS.
 */
export async function updateUserModulesAction(tenantUserId: string, activeModules: Record<string, boolean>): Promise<void> {
    if (!serviceRoleKey) {
        throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing.");
    }

    const { error } = await supabaseAdmin
        .from('tenant_users')
        .update({ active_modules: activeModules })
        .eq('id', tenantUserId);

    if (error) {
        console.error("updateUserModulesAction: Error en UPDATE:", error.message);
        throw new Error(error.message);
    }
}

/**
 * Server Action: Create a new user (Auth + users_global + tenant_users) bypassing RLS.
 */
export async function createAdminUserAction(payload: {
    email: string;
    full_name: string;
    role: string;
    password?: string;
    tenant_id: string;
    modules?: Record<string, boolean>;
}) {
    if (!serviceRoleKey) {
        throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing. Cannot create users. Add it to .env.local.");
    }

    try {
        // 1. Create the user in Supabase Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: payload.email,
            password: payload.password || "TempPassword123!",
            email_confirm: true,
            user_metadata: {
                full_name: payload.full_name
            }
        });

        if (authError || !authData.user) {
            console.error("Error createUser Auth:", authError);
            throw new Error(`Auth Error: ${authError?.message}`);
        }

        const newUserId = authData.user.id;

        // 2. Upsert en users_global (tabla real de perfiles públicos)
        const { error: publicUserError } = await supabaseAdmin
            .from('users_global')
            .upsert({
                id: newUserId,
                email: payload.email,
                full_name: payload.full_name,
                updated_at: new Date().toISOString()
            }, { onConflict: 'id' });

        if (publicUserError) {
            console.warn("⚠️ Upsert en users_global falló:", publicUserError.message, publicUserError.details);
            throw new Error("No se pudo registrar el perfil público del integrante en BD: " + publicUserError.message);
        }
        
        // 3. Resolver tenant_id (manejar "master" → primer tenant real)
        let targetTenantId = payload.tenant_id;
        if (targetTenantId === 'master') {
            const { data: firstTenant } = await supabaseAdmin.from('tenants').select('id').limit(1).single();
            if (firstTenant && firstTenant.id) {
                targetTenantId = firstTenant.id;
            } else {
                throw new Error("No hay un Tenant (empresa) registrado en la Base de Datos.");
            }
        }

        // 4. Vincular al tenant
        const defaultModules = payload.modules || {
            pos_retail: true,
            pos_restaurant: false,
            billing: true,
            inventory: true,
            credit_notes: false,
            reports: true,
            marketplace: false,
            finanzas: false,
            contactia: false
        };

        const { error: tenantError } = await supabaseAdmin
            .from('tenant_users')
            .insert({
                user_id: newUserId,
                tenant_id: targetTenantId,
                role: payload.role,
                is_active: true,
                active_modules: defaultModules
            });

        if (tenantError) {
            console.error("Error inserting tenant_users:", tenantError);
            await supabaseAdmin.auth.admin.deleteUser(newUserId);
            throw new Error(`Vinculación Error: ${tenantError.message}`);
        }

        return { success: true, userId: newUserId };

    } catch (e: any) {
        console.error("createAdminUserAction Fatal:", e);
        throw new Error(e.message || "Failed to create user");
    }
}

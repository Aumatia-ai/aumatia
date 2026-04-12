import { supabase } from '../../../core/lib/supabaseClient';

export interface UserProfile {
    id: string; // auth.users.id
    email: string;
    full_name: string;
}

export interface TenantUser {
    id: string; // tenant_user.id
    user_id: string;
    tenant_id: string;
    role: string;
    is_active: boolean;
    active_modules: Record<string, boolean>;
    users: UserProfile;
}

export const adminUserService = {
    async getTenantUsers(tenantId: string): Promise<TenantUser[]> {
        try {
            let query = supabase
                .from('tenant_users')
                .select(`
                    id,
                    user_id,
                    tenant_id,
                    role,
                    is_active,
                    active_modules
                `);

            if (tenantId !== 'master') {
                query = query.eq('tenant_id', tenantId);
            }

            const { data: tenantData, error: tenantErr } = await query;

            if (tenantErr) {
                console.error("Error fetching tenant users en Supabase [SELECT]:", tenantErr.message, tenantErr.details || tenantErr);
                throw tenantErr;
            }

            if (!tenantData || tenantData.length === 0) {
                return [];
            }

            const userIds = tenantData.map(t => t.user_id);
            const { data: usersData, error: usersErr } = await supabase
                .from('users_global')
                .select('id, email, full_name')
                .in('id', userIds);

            if (usersErr) {
                 console.warn("No pudimos jalar los perfiles users_global (quizá por RLS):", usersErr.message);
            }

            const payloadResult = tenantData.map(tu => {
                const matchedUser = (usersData || []).find(u => u.id === tu.user_id) || { id: tu.user_id, email: "Oculto", full_name: "Oculto" };
                return {
                    ...tu,
                    users: matchedUser
                };
            });

            return (payloadResult as unknown) as TenantUser[];
        } catch (err: any) {
            console.error("adminUserService.getTenantUsers Critical Exception:", err?.message || err);
            throw err;
        }
    },

    async updateUserModules(tenantUserId: string, activeModules: Record<string, boolean>): Promise<void> {
        try {
            const { error } = await supabase
                .from('tenant_users')
                .update({ active_modules: activeModules })
                .eq('id', tenantUserId)
                .single();

            if (error) {
                console.error("Error updating user modules en Supabase [UPDATE]:", error.message);
                throw error;
            }
        } catch (err) {
            console.error("adminUserService.updateUserModules Critical Exception:", err);
            throw err;
        }
    }
};

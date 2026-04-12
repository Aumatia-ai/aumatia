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

export interface FetchedProfile {
    tenant_id: string;
    tenant_slug: string;
    role: string;
    industry: string;
    allowed_modules: string[];
}

/**
 * Server Action: Fetch user profile bypassing ALL RLS policies.
 * This eliminates every "infinite recursion" error.
 */
export async function fetchUserProfileAction(userId: string, userEmail: string, userMetadata: any): Promise<FetchedProfile | null> {
    if (!serviceRoleKey) {
        throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing.");
    }

    // Master Admin Hardcoded Override
    if (userEmail === "admin@aumatia.com.co") {
        return {
            tenant_id: "master",
            tenant_slug: "master",
            role: "admin",
            industry: "retail",
            allowed_modules: ["pos", "marketplace", "finanzas", "contactia", "web"]
        };
    }

    // Step 1: Fetch tenant_users row for this user
    const { data: tenantUser, error: tuErr } = await supabaseAdmin
        .from('tenant_users')
        .select('tenant_id, role, active_modules, is_active')
        .eq('user_id', userId)
        .eq('is_active', true)
        .maybeSingle();

    if (tuErr) {
        console.error("fetchUserProfileAction: Error consultando tenant_users:", tuErr.message);
        return null;
    }

    if (!tenantUser) {
        // User exists in Auth but has no tenant assignment
        return {
            tenant_id: "none",
            tenant_slug: "system",
            role: "user",
            industry: "retail",
            allowed_modules: []
        };
    }

    // Step 2: Fetch tenant slug
    let tenantSlug = "demo";
    const { data: tenant, error: tErr } = await supabaseAdmin
        .from('tenants')
        .select('slug')
        .eq('id', tenantUser.tenant_id)
        .maybeSingle();

    if (tErr) {
        console.warn("fetchUserProfileAction: No se pudo leer el tenant:", tErr.message);
    } else if (tenant) {
        tenantSlug = tenant.slug || "demo";
    }

    // Step 3: Parse allowed modules and derive industry from active_modules
    const activeMods: Record<string, boolean> = tenantUser.active_modules || {};
    const allowed_modules = Object.keys(activeMods).filter(k => activeMods[k]);

    // Derive industry from the POS type modules
    let assignedIndustry = 'retail'; // default fallback
    if (activeMods['pos_restaurant'] && !activeMods['pos_retail']) {
        assignedIndustry = 'restaurant';
    } else if (activeMods['pos_retail']) {
        assignedIndustry = 'retail';
    }

    return {
        tenant_id: tenantUser.tenant_id,
        tenant_slug: tenantSlug,
        role: tenantUser.role,
        industry: assignedIndustry,
        allowed_modules
    };
}

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
    id: string; // The user ID itself acts as the tenant ID
    nombre: string | null;
    telefono: string | null;
    brand_name: string | null;
    logourl: string | null;
    primary_color: string | null;
    secondary_color: string | null;
    role: string;
    industry: string;
    allowed_modules: string[];
}

export async function fetchUserProfileAction(userId: string, userEmail: string, userMetadata: any): Promise<FetchedProfile | null> {
    if (!serviceRoleKey) {
        throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing.");
    }

    const { data: usuario, error } = await supabaseAdmin
        .from('usuarios')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

    if (error) {
        console.error("fetchUserProfileAction: Error consultando usuarios:", error.message);
        return null;
    }

    if (!usuario) {
        return {
            id: userId,
            nombre: userMetadata?.nombre || "Usuario Nuevo",
            telefono: userMetadata?.telefono || null,
            brand_name: null,
            logourl: null,
            primary_color: '#050b14',
            secondary_color: '#06b6d4',
            role: "user",
            industry: "retail",
            allowed_modules: ["pos_retail", "pos_restaurant", "billing", "inventory"]
        };
    }

    console.log("fetchUserProfileAction: Raw DB row for user", userId, JSON.stringify(usuario));

    const activeMods: Record<string, boolean> = usuario.active_modules || {};
    const allowed_modules = Object.keys(activeMods).filter(k => activeMods[k]);

    let assignedIndustry = 'retail';
    if (activeMods['pos_restaurant'] && !activeMods['pos_retail']) {
        assignedIndustry = 'restaurant';
    } else if (activeMods['pos_retail']) {
        assignedIndustry = 'retail';
    }

    // Support both 'role' and 'rol' column names
    const dbRole = usuario.role || usuario.rol || "user";
    console.log("fetchUserProfileAction: Resolved role =", dbRole);

    return {
        id: usuario.id,
        nombre: usuario.nombre,
        telefono: usuario.telefono,
        brand_name: usuario.brand_name || "Mi Negocio",
        logourl: usuario.logourl || "",
        primary_color: usuario.primary_color || '#050b14',
        secondary_color: usuario.secondary_color || '#06b6d4',
        role: dbRole,
        industry: assignedIndustry,
        allowed_modules
    };
}

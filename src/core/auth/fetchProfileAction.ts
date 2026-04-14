"use server";

import { getSupabaseAdmin } from '../lib/supabaseAdmin';

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
    try {
        const supabaseAdmin = getSupabaseAdmin();

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
            console.log("fetchUserProfileAction: Usuario no encontrado en tabla pública, retornando perfil default:", userId);
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

        console.log("fetchUserProfileAction: Profile fetched successfully for", userId);

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
    } catch (e: any) {
        console.error("fetchUserProfileAction CRITICAL EXCEPTION:", e.message || e);
        // Do not re-throw, return null so the UI can handle the "no profile" state safely
        return null;
    }
}

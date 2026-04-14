"use server";

import { getSupabaseAdmin } from '../../../core/lib/supabaseAdmin';

export interface UsuarioServer {
    id: string;
    email: string;
    nombre: string | null;
    telefono: string | null;
    brand_name: string | null;
    logourl: string | null;
    primary_color: string | null;
    secondary_color: string | null;
    role: string;
    industry: string | null;
    active_modules: Record<string, boolean>;
}

/**
 * Fetch ALL users from public.usuarios (admin-only).
 */
export async function fetchAllUsuariosAction(): Promise<UsuarioServer[]> {
    try {
        const supabaseAdmin = getSupabaseAdmin();

        const { data, error } = await supabaseAdmin
            .from('usuarios')
            .select('*')
            .order('email', { ascending: true });

        if (error) {
            console.error("fetchAllUsuariosAction:", error.message);
            throw new Error(error.message);
        }

        return (data || []) as UsuarioServer[];
    } catch (e: any) {
        console.error("fetchAllUsuariosAction CRITICAL:", e.message || e);
        throw e; // Rethrow because this is likely a UI-handled admin failure, but now it's logged on server.
    }
}

/**
 * Update a single user's editable fields in public.usuarios.
 */
export async function updateUsuarioAction(userId: string, updates: {
    active_modules?: Record<string, boolean>;
    industry?: string;
    brand_name?: string;
    nombre?: string;
    telefono?: string;
}): Promise<void> {
    try {
        const supabaseAdmin = getSupabaseAdmin();

        const { error } = await supabaseAdmin
            .from('usuarios')
            .update(updates)
            .eq('id', userId);

        if (error) {
            console.error("updateUsuarioAction:", error.message);
            throw new Error(error.message);
        }
    } catch (e: any) {
        console.error("updateUsuarioAction CRITICAL:", e.message || e);
        throw e;
    }
}

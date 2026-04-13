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
    if (!serviceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing.");

    const { data, error } = await supabaseAdmin
        .from('usuarios')
        .select('*')
        .order('email', { ascending: true });

    if (error) {
        console.error("fetchAllUsuariosAction:", error.message);
        throw new Error(error.message);
    }

    return (data || []) as UsuarioServer[];
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
    if (!serviceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing.");

    const { error } = await supabaseAdmin
        .from('usuarios')
        .update(updates)
        .eq('id', userId);

    if (error) {
        console.error("updateUsuarioAction:", error.message);
        throw new Error(error.message);
    }
}

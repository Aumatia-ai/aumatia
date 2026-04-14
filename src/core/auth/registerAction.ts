"use server";

import { getSupabaseAdmin } from '../lib/supabaseAdmin';

/**
  * Server Action: Register a new SaaS owner bypassing email confirmation.
  * Uses Admin API to auto-confirm the user immediately.
  */
export async function registerUserAction(payload: {
    email: string;
    password: string;
    nombre: string;
    telefono: string;
}): Promise<{ success: boolean; error?: string }> {
    try {
        const supabaseAdmin = getSupabaseAdmin();

        const { data, error } = await supabaseAdmin.auth.admin.createUser({
            email: payload.email,
            password: payload.password,
            email_confirm: true, // Auto-confirm, no email sent
            user_metadata: {
                nombre: payload.nombre,
                telefono: payload.telefono
            }
        });

        if (error) {
            console.error("registerUserAction: Auth admin error:", error.message);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (e: any) {
        console.error("registerUserAction fatal:", e);
        return { success: false, error: e.message || "Error inesperado al registrar." };
    }
}

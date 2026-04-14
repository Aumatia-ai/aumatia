import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseAdminInstance: SupabaseClient | null = null;

/**
 * Utility to get a Supabase Admin client.
 * Using a singleton pattern and function-based access ensures 
 * environment variables are read at runtime.
 */
export function getSupabaseAdmin(): SupabaseClient {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    // If already initialized and keys are the same, return cached instance
    if (supabaseAdminInstance) {
        return supabaseAdminInstance;
    }

    if (!supabaseUrl || !serviceRoleKey) {
        const missing = [];
        if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL');
        if (!serviceRoleKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');
        
        console.error(`[SupabaseAdmin] CRITICAL ERROR: Missing environment variables: ${missing.join(', ')}`);
        
        // We throw here because the module cannot function without these.
        // In Server Actions, this should be caught by a try-catch block.
        throw new Error(`Configuración de Supabase incompleta: faltan ${missing.join(', ')}`);
    }

    console.log(`[SupabaseAdmin] Initializing admin client for: ${supabaseUrl}`);

    supabaseAdminInstance = createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });

    return supabaseAdminInstance;
}

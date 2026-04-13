"use server";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false }
});

/**
 * Ensures the 'logos' bucket exists in Supabase Storage.
 * Call this once or on-demand.
 */
export async function ensureLogosBucketAction(): Promise<{ success: boolean; error?: string }> {
    if (!serviceRoleKey) return { success: false, error: "Service role key missing." };

    try {
        // Check if bucket exists
        const { data: buckets } = await supabaseAdmin.storage.listBuckets();
        const exists = buckets?.some(b => b.name === 'logos');

        if (!exists) {
            const { error } = await supabaseAdmin.storage.createBucket('logos', {
                public: true,
                fileSizeLimit: 5 * 1024 * 1024, // 5MB
                allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif']
            });
            if (error) {
                console.error("Error creating logos bucket:", error.message);
                return { success: false, error: error.message };
            }
            console.log("Bucket 'logos' created successfully.");
        }

        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

/**
 * Upload a logo file via service role (bypasses RLS).
 * Accepts base64-encoded file data from the client.
 */
export async function uploadLogoAction(payload: {
    userId: string;
    fileName: string;
    fileBase64: string;
    contentType: string;
}): Promise<{ success: boolean; publicUrl?: string; error?: string }> {
    if (!serviceRoleKey) return { success: false, error: "Service role key missing." };

    try {
        // Ensure bucket exists first
        await ensureLogosBucketAction();

        // Convert base64 to Buffer
        const buffer = Buffer.from(payload.fileBase64, 'base64');
        const filePath = `${payload.userId}/logo_${Date.now()}.${payload.fileName.split('.').pop()}`;

        const { error: uploadError } = await supabaseAdmin.storage
            .from('logos')
            .upload(filePath, buffer, {
                upsert: true,
                contentType: payload.contentType
            });

        if (uploadError) {
            console.error("uploadLogoAction upload error:", uploadError.message);
            return { success: false, error: uploadError.message };
        }

        const { data: urlData } = supabaseAdmin.storage
            .from('logos')
            .getPublicUrl(filePath);

        // Also update logourl in public.usuarios directly
        const { error: dbError } = await supabaseAdmin
            .from('usuarios')
            .update({ logourl: urlData.publicUrl })
            .eq('id', payload.userId);

        if (dbError) {
            console.warn("uploadLogoAction DB update warning:", dbError.message);
        }

        return { success: true, publicUrl: urlData.publicUrl };
    } catch (e: any) {
        console.error("uploadLogoAction fatal:", e);
        return { success: false, error: e.message };
    }
}

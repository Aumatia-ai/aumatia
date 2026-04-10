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
                    active_modules,
                    users (
                        id,
                        email,
                        full_name
                    )
                `);

            if (tenantId !== 'master') {
                query = query.eq('tenant_id', tenantId);
            }

            const { data, error } = await query;

            if (error) {
                console.error("Error fetching tenant users en Supabase [SELECT]:", error);
                throw error;
            }

            return (data as unknown) as TenantUser[];
        } catch (err) {
            console.error("adminUserService.getTenantUsers Critical Exception:", err);
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

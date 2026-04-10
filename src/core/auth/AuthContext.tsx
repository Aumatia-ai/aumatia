"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Session, User } from "@supabase/supabase-js";

export interface UserProfile {
    user: User;
    tenant_slug: string;
    tenant_id: string;
    role: string;
    industry: string;
    allowed_modules: string[];
}

interface AuthState {
    session: Session | null;
    profile: UserProfile | null;
    loading: boolean;
}

const AuthContext = createContext<AuthState>({ session: null, profile: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error("AuthContext getSession error:", error);
            }
            setSession(session);
            if (session) {
                await fetchProfile(session.user);
            } else {
                setLoading(false);
            }
        };

        initializeAuth();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
            console.log("Auth event:", event);
            setSession(newSession);
            if (newSession) {
                fetchProfile(newSession.user);
            } else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const fetchProfile = async (user: User) => {
        try {
            // Master Admin Hardcoded Override
            if (user.email === "admin@aumatia.com.co") {
                setProfile({
                    user,
                    tenant_id: "master",
                    tenant_slug: "master",
                    role: "admin",
                    industry: "retail",
                    allowed_modules: ["pos", "marketplace", "finanzas", "contactia", "web"]
                });
                setLoading(false);
                return;
            }

            const { data: tenantUsers, error } = await supabase
                .from('tenant_users')
                .select(`
                    tenant_id,
                    role,
                    tenants ( slug ),
                    active_modules
                `)
                .eq('user_id', user.id)
                .eq('is_active', true)
                .maybeSingle();

            if (error) {
                console.error("AuthContext fetchProfile DB error details:", error.message, error.details, error.hint);
                setProfile(null);
            } else if (tenantUsers && tenantUsers.tenants) {
                const activeMods = tenantUsers.active_modules || {};
                const allowed_modules = Object.keys(activeMods).filter(k => activeMods[k]);
                
                // Add basic default modules if applicable
                if (!allowed_modules.includes('pos')) Object.keys(activeMods).forEach(k => { if(k === 'retail_pos' || k === 'restaurant_pos') allowed_modules.push('pos') });

                // Infer industry from user metadata or fallback so everything doesn't crash
                const assignedIndustry = user.user_metadata?.industry || 'retail'; 

                setProfile({
                    user,
                    tenant_id: tenantUsers.tenant_id,
                    tenant_slug: (tenantUsers.tenants as any).slug || 'demo',
                    role: tenantUsers.role,
                    industry: assignedIndustry,
                    allowed_modules
                });
            } else {
                console.warn("AuthContext fetchProfile: No existe este usuario en la tabla 'tenant_users'. Mostrando fallback para suscripciones.");
                setProfile({
                    user,
                    tenant_id: "none",
                    tenant_slug: "none",
                    role: "user",
                    industry: "retail",
                    allowed_modules: []
                });
            }
        } catch (err) {
            console.error("AuthContext fetchProfile generic exception:", err);
            setProfile(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ session, profile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

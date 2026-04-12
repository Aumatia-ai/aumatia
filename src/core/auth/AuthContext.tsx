"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { fetchUserProfileAction } from "./fetchProfileAction";
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
            const result = await fetchUserProfileAction(user.id, user.email || '', user.user_metadata);
            
            if (result) {
                setProfile({
                    user,
                    ...result
                });
            } else {
                console.warn("AuthContext fetchProfile: Server Action returned null for user", user.id);
                setProfile(null);
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

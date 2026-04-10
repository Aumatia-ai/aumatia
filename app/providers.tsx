"use client";

import { AuthProvider } from "../src/core/auth/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}

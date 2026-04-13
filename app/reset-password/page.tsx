"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "../../src/core/lib/supabaseClient";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // En Supabase, a veces el token viene en el hash /#access_token=... o es automáticamente manejado 
        // por supabase-js (si supabase.auth.onAuthStateChange detecta el evento PASSWORD_RECOVERY).
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            // If there's NO session and we aren't in recovery, redirect to login
            // For now, let's just let the user try updating.
        };
        checkSession();
    }, []);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });
            
            if (error) {
                console.error("Error validando el cambio de contraseña:", error.message);
                alert("Hubo un error: " + error.message);
            } else {
                alert("Contraseña restablecida correctamente. Iniciando sesión...");
                router.push("/launcher");
            }
        } catch (err) {
            console.error("Critical error setting password", err);
            alert("Error inesperado en el sistema.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050b14] flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10 flex flex-col items-center">
                    <div className="inline-block relative group">
                        <div className="absolute inset-0 bg-cyan-400/20 rounded-2xl animate-ping group-hover:bg-cyan-400/40 transition-all opacity-50 duration-700" />
                        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#050b14] to-[#0f172a] flex items-center justify-center backdrop-blur-md border border-cyan-500/40 shadow-[0_0_40px_rgba(0,255,255,0.25)] mb-6 z-10">
                            <Cpu className="w-10 h-10 text-cyan-400" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tight">Portal Aumatia</h1>
                    <p className="text-cyan-400/80 text-sm mt-3 font-medium tracking-wide flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        Establece tu nueva contraseña
                    </p>
                </div>

                <div className="bg-[#0b1221]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                    
                    <form onSubmit={handleReset} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-1">Nueva Contraseña</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input 
                                    type="password" required
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full bg-[#050b14]/60 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/60 transition-all hover:border-white/20"
                                />
                            </div>
                            <p className="text-xs text-white/40 pt-1">Ingresa al menos 6 caracteres.</p>
                        </div>
                        <button 
                            type="submit" disabled={isLoading}
                            className={`w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(0,180,255,0.4)] hover:shadow-[0_0_30px_rgba(0,180,255,0.6)] border border-cyan-400/20 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            {isLoading ? "Cambiando..." : "Cifrar y Guardar Contraseña"}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

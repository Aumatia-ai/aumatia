"use client";

import { motion } from "framer-motion";
import { Cpu, Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulación: Estableciendo cookie wildcard para el SSO
        // En producción: document.cookie = `aumatia_session=token123; domain=.aumatia.com.co; path=/; secure; samesite=lax`;
        document.cookie = `aumatia_session=dummy_token_123; path=/; max-age=86400`;
        
        // Simular autenticación almacenando la sesión en local storage para el Frontend (para Demo)
        localStorage.setItem("aumatia_session", JSON.stringify({
            tenant_slug: "demo",
            role: "admin",
            allowed_modules: ["pos", "marketplace", "finanzas", "contactia", "web"]
        }));

        router.push("/launcher");
    };

    return (
        <main className="min-h-screen bg-[#050b14] flex items-center justify-center relative overflow-hidden py-12 px-6">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-background to-background z-0 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8 flex flex-col items-center">
                    <Link href="/" className="inline-block">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center backdrop-blur-md border border-cyan-500/30 shadow-[0_0_30px_rgba(0,255,255,0.2)] mb-4">
                            <Cpu className="w-8 h-8 text-cyan-400" />
                        </div>
                    </Link>
                    <h1 className="text-2xl font-black text-white tracking-tight">Aumatia OS</h1>
                    <p className="text-white/50 text-sm mt-1">Acceso centralizado al ecosistema</p>
                </div>

                <div className="bg-[#0b101e]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    {/* Top shine */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                    
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/50 uppercase tracking-widest pl-1">Correo Electrónico</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@empresa.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center pl-1">
                                <label className="text-xs font-semibold text-white/50 uppercase tracking-widest">Contraseña</label>
                                <Link href="#" className="text-xs font-medium text-cyan-400 hover:text-cyan-300">¿Olvidaste tu contraseña?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input 
                                    type="password" 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] flex items-center justify-center gap-2 mt-4"
                        >
                            Acceder al OS
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-xs text-white/40">
                            Al iniciar sesión mediante Aumatia OS, autorizas el almacenamiento de cookies en tu dominio.
                        </p>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}

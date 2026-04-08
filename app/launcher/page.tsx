"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Monitor, ShoppingBag, Activity, Code, Cpu, Sparkles, LogOut, Globe, Headset } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SessionData {
    tenant_slug: string;
    role: string;
    allowed_modules: string[];
}

const moduleInfo: Record<string, { title: string, icon: any, colorClass: string, glowColor: string, basePath: string }> = {
    pos: { title: "Smart POS", icon: Monitor, colorClass: "text-blue-400", glowColor: "rgba(59,130,246,0.5)", basePath: "/pos" },
    marketplace: { title: "Marketplace", icon: ShoppingBag, colorClass: "text-purple-400", glowColor: "rgba(168,85,247,0.5)", basePath: "/marketplace" },
    finanzas: { title: "Finanzas", icon: Activity, colorClass: "text-green-400", glowColor: "rgba(34,197,94,0.5)", basePath: "/finanzas" },
    contactia: { title: "ContactIA", icon: Headset, colorClass: "text-fuchsia-500", glowColor: "rgba(217,70,239,0.5)", basePath: "/contactia" },
    web: { title: "Tu Web", icon: Globe, colorClass: "text-orange-400", glowColor: "rgba(249,115,22,0.5)", basePath: "/web" },
    agentes: { title: "Agentes AI", icon: Sparkles, colorClass: "text-pink-400", glowColor: "rgba(236,72,153,0.5)", basePath: "/agentes" }
};

export default function LauncherPage() {
    const [session, setSession] = useState<SessionData | null>(null);
    const router = useRouter();

    useEffect(() => {
        // En un entorno de producción, aquí decodificaríamos el JWT y verificaríamos su validez.
        const sessionStr = localStorage.getItem("aumatia_session");
        if (sessionStr) {
            setSession(JSON.parse(sessionStr));
        } else {
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        document.cookie = "aumatia_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("aumatia_session");
        router.push("/login");
    };

    if (!session) return <div className="min-h-screen bg-[#050b14] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-t-2 border-cyan-500 animate-spin" /></div>;

    // Calcular las posiciones radiales para los nodos
    const availableModules = session.allowed_modules.filter(m => moduleInfo[m]);
    const totalModules = availableModules.length;
    const radius = 180; // Radio del círculo en pixels

    return (
        <main className="min-h-screen bg-[#050b14] relative overflow-hidden flex flex-col items-center justify-center py-20 px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background z-0" />
            
            {/* Header del Tenant */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-40 border-b border-white/5 bg-background/50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30">
                        <Cpu className="w-5 h-5 text-cyan-400" />
                     </div>
                     <div>
                        <div className="text-white font-bold text-sm tracking-widest uppercase">Aumatia OS</div>
                        <div className="text-white/40 text-xs flex items-center gap-2">
                            <span>Workspace: <strong className="text-cyan-400">{session.tenant_slug}</strong></span>
                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                            <span>Role: <span className="capitalize">{session.role}</span></span>
                        </div>
                     </div>
                </div>
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium"
                >
                    Cerrar Sesión <LogOut className="w-4 h-4" />
                </button>
            </div>

            {/* Launcher Radial (Snowflake) */}
            <div className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px] flex items-center justify-center z-10 scale-75 md:scale-100">
                
                {/* Center Node */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute z-30"
                >
                    <div className="bg-[#0b101e] border-2 border-cyan-500/50 p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 w-40 h-40 shadow-[0_0_50px_rgba(0,255,255,0.4)] relative cursor-default">
                        <div className="absolute inset-0 w-full h-full rounded-[2rem] border border-cyan-400 animate-ping opacity-20" />
                        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                            <Cpu className="w-8 h-8 text-cyan-400" />
                        </div>
                        <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Aumatia OS</span>
                    </div>
                </motion.div>

                {/* Reloj Radial de Aplicaciones */}
                {availableModules.map((modKey, idx) => {
                    const mod = moduleInfo[modKey];
                    // Calcular el ángulo para posicionar uniformemente (en radianes)
                    const angle = (idx * (360 / totalModules) * Math.PI) / 180;
                    
                    // Ajuste de radio responsivo (300px desktop, 180 responsive center)
                    const r = window.innerWidth > 768 ? 240 : 180;

                    const x = Math.cos(angle - Math.PI/2) * r; // -PI/2 para empezar arriba
                    const y = Math.sin(angle - Math.PI/2) * r;

                    // En desarrollo local (localhost), usamos una ruta estática en lugar de un subdominio. En prod, ensamblamos el subdominio de tenant.
                    const isLocal = typeof window !== 'undefined' && window.location.hostname.includes('localhost');
                    const targetUrl = isLocal 
                        ? `http://localhost:3000${mod.basePath}` // Para demo local
                        : `https://${session.tenant_slug}.aumatia.com.co${mod.basePath}`;

                    return (
                        <div key={modKey} className="absolute inset-x-1/2 inset-y-1/2 flex items-center justify-center">
                            
                            {/* Línea conectora */}
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: r }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="absolute left-0 h-[1px] origin-left"
                                style={{
                                    rotate: `${(idx * (360 / totalModules)) - 90}deg`,
                                    background: `linear-gradient(90deg, rgba(0,255,255,0.2) 0%, transparent 100%)`
                                }}
                            />

                            <motion.a
                                href={targetUrl}
                                initial={{ opacity: 0, x: 0, y: 0 }}
                                animate={{ opacity: 1, x, y }}
                                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.5 + (idx * 0.1) }}
                                whileHover={{ scale: 1.1, boxShadow: `0 0 30px ${mod.glowColor}` }}
                                className="absolute bg-[#0b101e]/90 border border-white/10 backdrop-blur-xl p-5 rounded-3xl flex flex-col items-center justify-center gap-3 w-32 h-32 transform -translate-x-1/2 -translate-y-1/2 hover:border-white/30 transition-all z-20 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-colors">
                                    <mod.icon className={`w-6 h-6 ${mod.colorClass}`} />
                                </div>
                                <span className={`font-bold text-sm text-center group-hover:${mod.colorClass} transition-colors`}>{mod.title}</span>
                            </motion.a>
                        </div>
                    );
                })}
            </div>

            <div className="absolute bottom-8 z-10 text-center">
                <p className="text-white/40 text-sm">Escoge el módulo para iniciar a operar.</p>
            </div>
        </main>
    );
}

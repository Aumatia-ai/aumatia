"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { Store, Utensils, ShoppingCart, MessageSquare, LineChart, Settings, LogOut, Cpu } from "lucide-react";
import { useRouter } from "next/navigation";
import { SnowflakeBackground } from "../ui/SnowflakeBackground";
import { useAuth } from "../auth/AuthContext";
import { supabase } from "../lib/supabaseClient";

export function Launcher() {
    const { profile, loading } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    useEffect(() => {
        if (!loading && !profile) {
            router.push("/login");
        }
    }, [loading, profile, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050b14] flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-t-2 border-cyan-500 animate-spin" />
            </div>
        );
    }

    if (!profile) {
        return null;
    }

    const session = profile; // Alias to preserve downstream variable references

    const isNoPlan = session.tenant_id === "none" || session.tenant_slug === "system";

    if (isNoPlan) {
        return (
            <div className="w-full min-h-screen bg-[#050b14] flex flex-col items-center justify-center relative overflow-hidden">
                <SnowflakeBackground />
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 max-w-md w-[90%] text-center p-8 bg-[#0b1221]/80 backdrop-blur-xl border border-white/10 rounded-3xl"
                >
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-cyan-500/30 mb-6 shadow-[0_0_30px_rgba(0,255,255,0.15)]">
                        <Store className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">No tienes un plan activo</h2>
                    <p className="text-white/50 text-sm mb-8 leading-relaxed">
                        Acabas de crear tu cuenta, pero aún no has adquirido un plan ni fuiste asignado a un tenant. Adquiere un plan para desbloquear tu ecosistema empresarial.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button className="w-full py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(0,180,255,0.3)] transition-all">
                            Adquirir Plan
                        </button>
                        <button onClick={handleLogout} className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white/70 rounded-xl font-semibold transition-all border border-white/5">
                            Cerrar Sesión
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const isLocal = typeof window !== 'undefined' && window.location.hostname.includes('localhost');
    const getTargetUrl = (basePath: string) => isLocal 
        ? `http://localhost:3000${basePath}` 
        : `https://${session.tenant_slug}.aumatia.com.co${basePath}`;

    // SSO Synchronization Helper
    const handleSSORedirect = async (baseUrl: string) => {
        try {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                const queryConnector = baseUrl.includes('?') ? '&' : '?';
                window.location.href = `${baseUrl}${queryConnector}access_token=${data.session.access_token}&refresh_token=${data.session.refresh_token}`;
            } else {
                window.location.href = baseUrl;
            }
        } catch (err) {
            console.error("Error generating SSO sync URL:", err);
            window.location.href = baseUrl;
        }
    };

    // Conditional App Rendering Logic based on Role and Industry
    const apps: any[] = [];

    if (session.industry === 'retail' && session.role !== 'admin') {
        apps.push({ title: "POS Retail", icon: ShoppingCart, color: "text-blue-400", bgGlow: "rgba(59,130,246,0.3)", action: () => handleSSORedirect("https://pos.aumatia.com.co/auth/sync?industry=retail") });
    }

    if (session.industry === 'restaurant' && session.role !== 'admin') {
        apps.push({ title: "POS Restaurante", icon: Utensils, color: "text-orange-400", bgGlow: "rgba(249,115,22,0.3)", action: () => handleSSORedirect("https://pos.aumatia.com.co/auth/sync?industry=restaurant") });
    }

    if (session.role === 'admin') {
        apps.push({ title: "Panel Admin", icon: Settings, color: "text-rose-400", bgGlow: "rgba(244,63,113,0.3)", action: () => router.push("/app/admin") });
        apps.push({ title: "POS Retail", icon: ShoppingCart, color: "text-blue-400", bgGlow: "rgba(59,130,246,0.3)", action: () => handleSSORedirect("https://pos.aumatia.com.co/auth/sync?industry=retail") });
        apps.push({ title: "POS Restaurantes", icon: Utensils, color: "text-orange-400", bgGlow: "rgba(249,115,22,0.3)", action: () => handleSSORedirect("https://pos.aumatia.com.co/auth/sync?industry=restaurant") });
        apps.push({ title: "Marketplace", icon: Store, color: "text-purple-400", bgGlow: "rgba(168,85,247,0.3)", action: () => alert("Módulo en construcción") });
        apps.push({ title: "Finanzas", icon: LineChart, color: "text-green-400", bgGlow: "rgba(34,197,94,0.3)", action: () => alert("Módulo en construcción") });
        apps.push({ title: "ContactIA", icon: MessageSquare, color: "text-cyan-400", bgGlow: "rgba(6,182,212,0.3)", action: () => handleSSORedirect("https://os.aumatia.com.co/auth/sync?app=contactia") });
    }

    // Framer Motion Spring Animations for the Grid
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
    };

    return (
        <SnowflakeBackground>
            {/* Header del OS */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-40 border-b border-white/5 bg-background/20 backdrop-blur-md">
                <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0b1221] to-[#0f172a] flex items-center justify-center border border-cyan-500/30 shadow-[0_0_15px_rgba(0,255,255,0.15)] overflow-hidden">
                        <Cpu className="w-6 h-6 text-cyan-400" />
                     </div>
                     <div>
                        <div className="text-white font-black text-lg tracking-widest uppercase">Aumatia OS</div>
                        <div className="text-white/50 text-xs flex items-center gap-2 font-medium tracking-wide">
                            <span>Espacio: <strong className="text-cyan-400">{session.tenant_slug}</strong></span>
                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                            <span>Rol: <span className="capitalize text-green-400">{session.role}</span></span>
                            {session.industry && (
                                <>
                                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                                    <span>Ind: <span className="capitalize text-orange-300">{session.industry}</span></span>
                                </>
                            )}
                        </div>
                     </div>
                </div>
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white/70 hover:text-white transition-all text-sm font-semibold backdrop-blur-lg"
                >
                    <LogOut className="w-4 h-4" /> Salir 
                </button>
            </div>

            {/* Launchpad Grid Area */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center mt-24 mb-10 px-6">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight">
                        Launchpad
                    </h2>
                    <p className="text-lg text-cyan-400/80 font-medium mt-3">Accede a tus módulos autorizados.</p>
                </motion.div>

                {/* Grid Apps */}
                <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6 w-full"
                >
                    {apps.map((app, idx) => (
                        <motion.button
                            key={idx}
                            onClick={app.action}
                            variants={item}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative bg-[#0b1221]/80 backdrop-blur-2xl border border-white/10 hover:border-white/20 p-8 rounded-[2rem] flex flex-col items-center justify-center gap-5 transition-all shadow-xl hover:shadow-2xl overflow-hidden cursor-pointer"
                        >
                            {/* Hover Bottom Glow */}
                            <div className="absolute inset-x-0 -bottom-10 h-32 blur-[40px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" style={{ backgroundColor: app.bgGlow }} />
                            
                            {/* Icon Container */}
                            <div className={`w-20 h-20 rounded-[1.5rem] bg-[#050b14] flex items-center justify-center border border-white/5 group-hover:border-white/10 transition-colors shadow-inner relative z-10`}>
                                {/* Light bleed in the inner box */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[1.5rem] pointer-events-none" />
                                <app.icon className={`w-10 h-10 ${app.color} group-hover:scale-110 transition-transform duration-300 drop-shadow-lg`} />
                            </div>
                            
                            <span className="font-bold text-base text-white/90 group-hover:text-white text-center transition-colors z-10">
                                {app.title}
                            </span>
                        </motion.button>
                    ))}
                </motion.div>
                
                {apps.length === 0 && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-10 p-10 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 max-w-lg">
                         <p className="text-white/60 text-lg font-medium">No hay aplicaciones asignadas a tu cuenta. Contacta a un administrador.</p>
                     </motion.div>
                )}
            </div>
        </SnowflakeBackground>
    );
}

"use client";

import Navbar from "@/components/Navbar";
import TrustFooter from "@/components/TrustFooter";
import { motion } from "framer-motion";
import { Cpu, Layers, Link as LinkIcon, Shield, Monitor, ShoppingBag, Activity, Headset, Globe, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const SnowflakeNode = ({
    icon: Icon,
    title,
    colorClass,
    glowColor,
    positionClass,
    linkHref,
    dx,
    dy
}: {
    icon: any; title: string; colorClass: string; glowColor: string; positionClass: string; linkHref: string; dx: number; dy: number;
}) => (
    <Link href={linkHref} className={`absolute ${positionClass} transform -translate-x-1/2 -translate-y-1/2 z-20`}>
        <motion.div
            variants={{
                animate: {
                    x: [0, dx, 0],
                    y: [0, dy, 0],
                    transition: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }
            }}
            animate="animate"
            whileHover={{ scale: 1.1, boxShadow: `0 0 25px ${glowColor}` }}
            className="bg-[#0b101e]/80 border border-white/10 backdrop-blur-md p-4 md:p-5 rounded-2xl flex flex-col items-center justify-center gap-2 aspect-square w-24 h-24 md:w-32 md:h-32 transition-colors group cursor-pointer"
        >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-white/5 transition-all">
                <Icon className={`w-5 h-5 md:w-6 md:h-6 ${colorClass}`} />
            </div>
            <span className={`font-bold text-xs md:text-sm text-center transition-colors group-hover:${colorClass}`}>{title}</span>
        </motion.div>
    </Link>
);

export default function AumatiaOSPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-blue selection:text-black">
            <Navbar />
            
            <div className="pt-24 pb-16 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-background to-background -z-10" />
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mt-12 mb-20">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center justify-center p-4 bg-cyan-500/10 rounded-2xl mb-6 shadow-[0_0_30px_rgba(0,255,255,0.2)]"
                        >
                            <Cpu className="w-12 h-12 text-cyan-400" />
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
                        >
                            El <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Sistema Operativo</span> para tu Empresa.
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-white/70 leading-relaxed mb-12"
                        >
                            Aumatia OS no es solo una herramienta, es el centro de gravedad de tu negocio. Conecta tu punto de venta, tienda online, finanzas y agentes de IA bajo un mismo núcleo de datos. Un solo inicio de sesión, un control total.
                        </motion.p>

                        {/* Radial Snowflake Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="relative w-full aspect-square max-w-[550px] mx-auto flex items-center justify-center mb-8"
                        >
                            {/* SVG Connector Lines */}
                            {mounted && (
                                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-40 mix-blend-screen" viewBox="0 0 100 100">
                                    {/* Radial Lines from center */}
                                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} x1="50" y1="50" x2="50" y2="10" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="0.5" />
                                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} x1="50" y1="50" x2="85" y2="30" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="0.5" />
                                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} x1="50" y1="50" x2="85" y2="70" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="0.5" />
                                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} x1="50" y1="50" x2="50" y2="90" stroke="rgba(217, 70, 239, 0.4)" strokeWidth="0.5" />
                                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} x1="50" y1="50" x2="15" y2="70" stroke="rgba(249, 115, 22, 0.4)" strokeWidth="0.5" />
                                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} x1="50" y1="50" x2="15" y2="30" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="0.5" />
                                    
                                    {/* Inner web lines bridging the nodes */}
                                    <motion.polygon initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 2 }} points="50,10 85,30 85,70 50,90 15,70 15,30" fill="transparent" stroke="rgba(100, 150, 255, 0.15)" strokeWidth="0.3" strokeDasharray="1 1" />
                                </svg>
                            )}

                            {/* Center Node (Aumatia OS) */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="bg-[#050b14] border-2 border-cyan-500/50 p-6 rounded-3xl flex flex-col items-center justify-center gap-3 w-32 h-32 md:w-40 md:h-40 shadow-[0_0_40px_rgba(0,255,255,0.3)] relative"
                                >
                                    {/* Inner pulse */}
                                    <div className="absolute inset-0 w-full h-full rounded-3xl border border-cyan-400 animate-ping opacity-20" />
                                    
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center backdrop-blur-md">
                                        <Cpu className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
                                    </div>
                                    <span className="font-black text-sm md:text-base text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Aumatia OS</span>
                                </motion.div>
                            </div>

                            {/* Peripheral Nodes */}
                            <SnowflakeNode title="Smart POS" icon={Monitor} colorClass="text-blue-400" glowColor="rgba(59,130,246,0.5)" positionClass="top-[10%] left-[50%]" linkHref="/smart-pos" dx={0} dy={15} />
                            <SnowflakeNode title="Marketplace" icon={ShoppingBag} colorClass="text-purple-400" glowColor="rgba(168,85,247,0.5)" positionClass="top-[30%] left-[85%]" linkHref="/marketplace" dx={-13} dy={7.5} />
                            <SnowflakeNode title="Finanzas" icon={Activity} colorClass="text-green-400" glowColor="rgba(34,197,94,0.5)" positionClass="top-[70%] left-[85%]" linkHref="/finanzas" dx={-13} dy={-7.5} />
                            <SnowflakeNode title="ContactIA" icon={Headset} colorClass="text-fuchsia-500" glowColor="rgba(217,70,239,0.5)" positionClass="top-[90%] left-[50%]" linkHref="/contactia" dx={0} dy={-15} />
                            <SnowflakeNode title="Tu Web" icon={Globe} colorClass="text-orange-400" glowColor="rgba(249,115,22,0.5)" positionClass="top-[70%] left-[15%]" linkHref="/ecommerce" dx={13} dy={-7.5} />
                            <SnowflakeNode title="Agentes AI" icon={Sparkles} colorClass="text-pink-400" glowColor="rgba(236,72,153,0.5)" positionClass="top-[30%] left-[15%]" linkHref="/agentes-ai" dx={13} dy={7.5} />
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
                        {[
                            {
                                icon: LinkIcon,
                                title: "Conectividad Total",
                                description: "Todos los módulos comparten la misma base de datos. Lo que se vende en tu POS, se actualiza en el Marketplace y en Finanzas en tiempo real."
                            },
                            {
                                icon: Layers,
                                title: "Multi-tenant Arquitectura",
                                description: "Escalabilidad asegurada. Instancias personalizadas en subdominios únicos, garantizando velocidad y exclusividad de recursos."
                            },
                            {
                                icon: Shield,
                                title: "Single Sign-On (SSO)",
                                description: "Una sola identidad corporativa. Inicia sesión en Aumatia OS y accede a todas tus herramientas sin volver a pedir contraseñas."
                            }
                        ].map((feature, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 + (idx * 0.1) }}
                                className="bg-[#0b101e] border border-white/10 p-8 rounded-3xl hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] transition-all"
                            >
                                <feature.icon className="w-10 h-10 text-cyan-400 mb-6" />
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-white/60 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-center"
                    >
                        <Link href="/login" className="px-8 py-4 bg-neon-blue hover:bg-neon-purple text-black font-bold rounded-full transition-all inline-block shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                            Inicia Sesión en Aumatia OS
                        </Link>
                    </motion.div>
                </div>
            </div>
            
            <TrustFooter />
        </main>
    );
}


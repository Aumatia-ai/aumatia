"use client";

import { motion, Variants } from "framer-motion";
import { Monitor, Globe, ShoppingBag, Activity, ArrowRight, Cpu, Sparkles, Headset } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const SnowflakeNode = ({ 
        icon: Icon, 
        title, 
        colorClass, 
        delay, 
        positionClass, 
        linkHref,
        glowColor,
        dx,
        dy
    }: {
        icon: any; title: string; colorClass: string; delay: number; positionClass: string; linkHref: string; glowColor: string; dx: number; dy: number;
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
                            delay: delay,
                            ease: "easeInOut"
                        }
                    }
                }}
                animate="animate"
                whileHover={{ scale: 1.1, boxShadow: `0 0 25px ${glowColor}` }}
                className="bg-[#0b101e]/80 border border-white/10 backdrop-blur-md p-4 md:p-5 rounded-2xl flex flex-col items-center justify-center gap-2 aspect-square w-24 h-24 md:w-32 md:h-32 transition-colors group cursor-pointer"
            >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-white/5 transition-all`}>
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${colorClass}`} />
                </div>
                <span className={`font-bold text-xs md:text-sm text-center transition-colors group-hover:${colorClass}`}>{title}</span>
            </motion.div>
        </Link>
    );

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background z-0" />

            <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                {/* Left Column: Text */}
                <div className="text-center lg:text-left flex flex-col items-center lg:items-start z-30">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                    >
                        Tu empresa, <br />
                        pieza a pieza. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                            Tú eliges.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-muted-foreground text-lg md:text-xl max-w-xl mb-8"
                    >
                        ContactIA, Smart POS, Marketplace, Web, Finanzas o Agentes AI.
                        Comienza con uno, conéctalos todos en <strong>Aumatia OS</strong>.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link href="/#precios" className="px-8 py-4 bg-neon-blue hover:bg-neon-purple text-background font-bold rounded-full transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                            Ver Planes
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-full transition-all">
                            Hablar con Asesor
                        </a>
                    </motion.div>
                </div>

                {/* Right Column: Snowflake / Radial Layout */}
                <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
                    
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
                    <SnowflakeNode 
                        title="Smart POS" 
                        icon={Monitor} 
                        colorClass="text-blue-400" 
                        glowColor="rgba(59,130,246,0.5)" 
                        delay={0} 
                        positionClass="top-[10%] left-[50%]" 
                        linkHref="/solutions/smart-pos" 
                        dx={0} dy={15}
                    />

                    <SnowflakeNode 
                        title="Marketplace" 
                        icon={ShoppingBag} 
                        colorClass="text-purple-400" 
                        glowColor="rgba(168,85,247,0.5)" 
                        delay={0.5} 
                        positionClass="top-[30%] left-[85%]" 
                        linkHref="/solutions/marketplace" 
                        dx={-13} dy={7.5}
                    />

                    <SnowflakeNode 
                        title="Finanzas" 
                        icon={Activity} 
                        colorClass="text-green-400" 
                        glowColor="rgba(34,197,94,0.5)" 
                        delay={1.5} 
                        positionClass="top-[70%] left-[85%]" 
                        linkHref="/solutions/finances" 
                        dx={-13} dy={-7.5}
                    />

                    <SnowflakeNode 
                        title="ContactIA" 
                        icon={Headset} 
                        colorClass="text-fuchsia-500" 
                        glowColor="rgba(217,70,239,0.5)" 
                        delay={1} 
                        positionClass="top-[90%] left-[50%]" 
                        linkHref="/contactia" 
                        dx={0} dy={-15}
                    />

                    <SnowflakeNode 
                        title="Tu Web" 
                        icon={Globe} 
                        colorClass="text-orange-400" 
                        glowColor="rgba(249,115,22,0.5)" 
                        delay={2} 
                        positionClass="top-[70%] left-[15%]" 
                        linkHref="/solutions/web-development" 
                        dx={13} dy={-7.5}
                    />

                    <SnowflakeNode 
                        title="Agentes AI" 
                        icon={Sparkles} 
                        colorClass="text-pink-400" 
                        glowColor="rgba(236,72,153,0.5)" 
                        delay={2.5} 
                        positionClass="top-[30%] left-[15%]" 
                        linkHref="/solutions/agentes" 
                        dx={13} dy={7.5}
                    />

                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { Monitor, Globe, ShoppingBag, Calculator, Server } from "lucide-react";

export default function HeroSection() {
    const lineVariants = {
        initial: { pathLength: 0, opacity: 0 },
        animate: {
            pathLength: 1,
            opacity: [0.2, 0.5, 0.2],
            transition: {
                pathLength: { duration: 1.5, ease: "easeInOut" },
                opacity: { duration: 2, repeat: Infinity, ease: "linear" },
            },
        },
    };

    const ballVariants = {
        animate: {
            offsetDistance: ["0%", "100%"],
            opacity: [0, 1, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "linear",
            },
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-10">
            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background z-0" />

            <div className="container relative z-10 flex flex-col items-center text-center gap-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl"
                >
                    Todo tu negocio <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                        conectado
                    </span> a un solo inventario.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-muted-foreground text-lg md:text-xl max-w-2xl px-4"
                >
                    Crea un producto en el POS y publícalo automáticament en tu Web, Mercado Libre y Falabella.
                    Sin doble trabajo.
                </motion.p>

                {/* Sync Engine Visualization */}
                <div className="relative w-full max-w-3xl h-[400px] mt-12 flex items-center justify-center">

                    {/* Central Hub (POS) */}
                    <motion.div
                        className="absolute z-20 flex flex-col items-center justify-center w-32 h-32 rounded-full bg-background border-2 border-neon-blue shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                        animate={{ boxShadow: ["0 0 20px rgba(0,240,255,0.2)", "0 0 50px rgba(0,240,255,0.6)", "0 0 20px rgba(0,240,255,0.2)"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <Monitor className="w-10 h-10 text-neon-blue mb-2" />
                        <span className="text-xs font-bold text-white">POS / Stock</span>
                    </motion.div>

                    {/* Connection Lines (SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {/* Lines from Center to Satellites */}
                        <motion.path
                            d="M 384 200 L 150 100"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            fill="none"
                            initial="initial"
                            animate="animate"
                            variants={lineVariants}
                        />
                        <motion.path
                            d="M 384 200 L 618 100"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            fill="none"
                            initial="initial"
                            animate="animate"
                            variants={lineVariants}
                        />
                        <motion.path
                            d="M 384 200 L 384 350"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            fill="none"
                            initial="initial"
                            animate="animate"
                            variants={lineVariants}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
                                <stop offset="50%" stopColor="#00f0ff" stopOpacity="1" />
                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Animated Particles flowing - Simulated using absolute divs since offset-path isn't fully cross-browser smooth in React/Framer easily without huge overhead, using simple travel animations */}

                    {/* Particle to Web */}
                    <motion.div
                        className="absolute w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_10px_#00f0ff]"
                        animate={{
                            left: ["50%", "20%"],
                            top: ["50%", "25%"],
                            opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transform: "translate(-50%, -50%)" }}
                    />
                    {/* Particle to Marketplaces */}
                    <motion.div
                        className="absolute w-2 h-2 rounded-full bg-neon-purple shadow-[0_0_10px_#8b5cf6]"
                        animate={{
                            left: ["50%", "80%"],
                            top: ["50%", "25%"],
                            opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                        style={{ transform: "translate(-50%, -50%)" }}
                    />
                    {/* Particle to Finance */}
                    <motion.div
                        className="absolute w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]"
                        animate={{
                            left: ["50%", "50%"],
                            top: ["50%", "88%"],
                            opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                        style={{ transform: "translate(-50%, -50%)" }}
                    />


                    {/* Satellite 1: Web (Top Left) */}
                    <div className="absolute top-[25%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center group overflow-hidden">
                            <div className="absolute inset-0 bg-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Globe className="text-white w-8 h-8" />
                        </div>
                        <span className="text-sm font-medium text-white/80">Tu Tienda Web</span>
                    </div>

                    {/* Satellite 2: Marketplaces (Top Right) */}
                    <div className="absolute top-[25%] left-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center group overflow-hidden">
                            <div className="absolute inset-0 bg-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <ShoppingBag className="text-white w-8 h-8" />
                        </div>
                        <span className="text-sm font-medium text-white/80">Marketplaces</span>
                    </div>

                    {/* Satellite 3: Accounting (Bottom) */}
                    <div className="absolute top-[88%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center group overflow-hidden">
                            <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Calculator className="text-white w-8 h-8" />
                        </div>
                        <span className="text-sm font-medium text-white/80">Contabilidad</span>
                    </div>

                </div>
            </div>
        </section>
    );
}

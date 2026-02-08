"use client";

import { motion, Variants } from "framer-motion";
import { Monitor, Globe, ShoppingBag, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";


export default function HeroSection() {

    const floatingCard = (delay: number): Variants => ({
        animate: {
            y: [0, -15, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }
        }
    });

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background z-0" />

            <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Column: Text */}
                <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                    >
                        Tu comercio, <br />
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
                        Smart POS, E-commerce, Marketplace o Finanzas.
                        Comienza con uno, conéctalos todos.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link href="/#precios" className="px-8 py-4 bg-neon-blue hover:bg-neon-purple text-background font-bold rounded-full transition-all flex items-center justify-center gap-2 group">
                            Ver Planes
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-full transition-all">
                            Hablar con Asesor
                        </a>
                    </motion.div>
                </div>

                {/* Right Column: Floating Modular Grid */}
                <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-6 w-full max-w-md">

                        {/* Card 1: POS */}
                        <motion.div
                            variants={floatingCard(0)}
                            animate="animate"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,240,255,0.2)" }}
                            className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl flex flex-col items-center justify-center gap-4 aspect-square cursor-pointer group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-blue-500/40 group-hover:to-cyan-500/40 transition-all">
                                <Monitor className="w-8 h-8 text-cyan-400" />
                            </div>
                            <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">Smart POS</span>
                        </motion.div>

                        {/* Card 2: Marketplace */}
                        <motion.div
                            variants={floatingCard(1.5)}
                            animate="animate"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168,85,247,0.2)" }}
                            className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl flex flex-col items-center justify-center gap-4 aspect-square cursor-pointer mt-12 group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition-all">
                                <ShoppingBag className="w-8 h-8 text-purple-400" />
                            </div>
                            <span className="font-bold text-white group-hover:text-purple-400 transition-colors">Marketplace</span>
                        </motion.div>

                        {/* Card 3: Web */}
                        <motion.div
                            variants={floatingCard(0.5)}
                            animate="animate"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(249,115,22,0.2)" }}
                            className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl flex flex-col items-center justify-center gap-4 aspect-square cursor-pointer lg:-mt-12 group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center group-hover:from-orange-500/40 group-hover:to-red-500/40 transition-all">
                                <Globe className="w-8 h-8 text-orange-400" />
                            </div>
                            <span className="font-bold text-white group-hover:text-orange-400 transition-colors">Tu Web</span>
                        </motion.div>

                        {/* Card 4: Finances */}
                        <motion.div
                            variants={floatingCard(2)}
                            animate="animate"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34,197,94,0.2)" }}
                            className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl flex flex-col items-center justify-center gap-4 aspect-square cursor-pointer group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:from-green-500/40 group-hover:to-emerald-500/40 transition-all">
                                <Activity className="w-8 h-8 text-green-400" />
                            </div>
                            <span className="font-bold text-white group-hover:text-green-400 transition-colors">Finanzas</span>
                        </motion.div>

                    </div>
                </div>

            </div>
        </section>
    );
}

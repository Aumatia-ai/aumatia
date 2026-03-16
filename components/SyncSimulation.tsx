"use client";

import { motion } from "framer-motion";
import { CheckCircle2, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";

export default function SyncSimulation() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % 4); // Cycle through 4 steps
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 relative overflow-hidden bg-black/50 border-t border-white/5">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    
                    {/* Left Side: Content Context */}
                    <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mx-auto lg:mx-0">
                            <RotateCw className="w-3 h-3 animate-spin-slow" />
                            Sincronización en Vivo
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            La magia de un <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Negocio Conectado.</span>
                        </h2>
                        
                        <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Imagina vender un producto en tu mostrador físico y que, en menos de 2 segundos, tu stock se actualice automáticamente en tu tienda online y en todos tus canales digitales. Sin errores humanos, sin sobreventas, solo eficiencia pura.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            {[
                                { title: "Omnicanalidad", desc: "Inventario unificado para POS, Web y Canales Digitales." },
                                { title: "Control Total", desc: "Seguimiento de ventas y márgenes en tiempo real." },
                                { title: "Cero Errores", desc: "Elimina la carga manual de datos entre plataformas." },
                                { title: "Info en Tiempo Real", desc: "Reportes consolidados de todos tus puntos de venta." }
                            ].map((f, i) => (
                                <div key={i} className="flex gap-4 group justify-center lg:justify-start">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-all">
                                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="text-white font-bold mb-1">{f.title}</h4>
                                        <p className="text-white/40 text-sm leading-snug">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Simulation UI */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative z-10 bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-6 md:p-10 backdrop-blur-2xl shadow-2xl overflow-hidden min-h-[400px]">
                            
                            {/* Inner Header */}
                            <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping absolute inset-0" />
                                        <div className="w-3 h-3 rounded-full bg-blue-500 relative" />
                                    </div>
                                    <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">Ecosystem_Core :: Streaming</span>
                                </div>
                                <div className="flex gap-1.5 opacity-30">
                                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <AnimateLog
                                    active={step >= 0}
                                    text="👤 Venta registrada: Punto de Venta (POS)"
                                    time="14:20:01"
                                    type="info"
                                />
                                <AnimateLog
                                    active={step >= 1}
                                    text="📉 Inventario Físico Centralizado actualizado (-1)"
                                    time="14:20:02"
                                    type="success"
                                />
                                <AnimateLog
                                    active={step >= 2}
                                    text="🔄 Disparando sincronización con Tienda Online"
                                    time="14:20:02"
                                    type="warning"
                                />
                                <AnimateLog
                                    active={step >= 3}
                                    text="✅ Canales Digitales & E-commerce sincronizados"
                                    time="14:20:03"
                                    type="highlight"
                                />
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
                        </div>

                        {/* Floating Status Card */}
                        <motion.div 
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -left-6 bottom-10 z-20 flex items-center gap-4 bg-black/60 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-lg shadow-xl"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <RotateCw className="w-5 h-5 text-blue-400 animate-spin-slow" />
                            </div>
                            <div>
                                <div className="text-white font-bold text-xs">Sincronizado</div>
                                <div className="text-white/40 text-[10px]">Latencia &lt; 1.5s</div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function AnimateLog({ active, text, time, type }: { active: boolean, text: string, time: string, type: 'info' | 'success' | 'warning' | 'highlight' }) {
    const colors = {
        info: "text-white/60",
        success: "text-green-400",
        warning: "text-yellow-400",
        highlight: "text-neon-blue font-bold"
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: active ? 1 : 0.1, x: active ? 0 : 0 }}
            className={`font-mono text-sm border-l-2 pl-3 py-1 ${active ? 'border-white/20' : 'border-transparent'}`}
        >
            <span className="opacity-40 mr-3 text-xs">{time}</span>
            <span className={colors[type]}>{text}</span>
        </motion.div>
    )
}

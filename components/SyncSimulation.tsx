"use client";

import { motion } from "framer-motion";
import { CheckCircle2, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";

export default function SyncSimulation() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % 4); // Cycle through 4 steps
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 bg-black/40 border-y border-white/5">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left: Text Context */}
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        La magia de la <br />
                        <span className="text-neon-blue">sincronización real</span>.
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8">
                        Imagina vender en tu tienda física y ver cómo descontamos esa unidad en Mercado Libre al instante.
                        Sin errores manuales. Sin sobreventas.
                    </p>

                    <ul className="space-y-4">
                        {[
                            "Inventario centralizado (1 sola verdad).",
                            "Actualización en < 2 segundos.",
                            "Reportes financieros automáticos."
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                                <CheckCircle2 className="text-neon-blue w-5 h-5" />
                                <span className="text-white/80">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: Simulation UI */}
                <div className="relative rounded-2xl bg-card border border-white/10 p-6 overflow-hidden min-h-[300px] flex flex-col shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                        <span className="text-xs font-mono text-white/50">SYSTEM_LOGS :: LIVE</span>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <AnimateLog
                            active={step >= 0}
                            text="👤 Cajero escanea producto: 'Zapatillas Nike Air'"
                            time="10:42:01"
                            type="info"
                        />
                        <AnimateLog
                            active={step >= 1}
                            text="💰 Venta confirmada. -1 Stock en Tienda Física"
                            time="10:42:02"
                            type="success"
                        />
                        <AnimateLog
                            active={step >= 2}
                            text="🔄 Sync Engine disparado..."
                            time="10:42:02"
                            type="warning"
                        />
                        <AnimateLog
                            active={step >= 3}
                            text="✅ Stock actualizado en Mercado Libre (Total: 4)"
                            time="10:42:03"
                            type="highlight"
                        />
                    </div>

                    {/* Reset overlay for loop effect */}
                    {step === 3 && (
                        <motion.div
                            className="absolute top-4 right-4"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <RotateCw className="w-4 h-4 text-white/20" />
                        </motion.div>
                    )}
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

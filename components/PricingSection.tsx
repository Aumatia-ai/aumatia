"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Plan {
    title: string;
    priceCOP: string;
    priceUSD: string;
    period: string;
    description: string;
    features: string[];
    gradient: string;
    highlight?: boolean;
    originalPriceCOP?: string;
    originalPriceUSD?: string;
}

const modules: Plan[] = [
    {
        title: "Smart POS",
        priceCOP: "$95.000",
        priceUSD: "$25",
        period: "/mes",
        description: "Sistema de punto de venta independiente.",
        features: ["Facturación POS", "Control de Inventario Local", "Reportes Básicos", "Usuarios Ilimitados"],
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        title: "Web E-commerce",
        priceCOP: "$150.000",
        priceUSD: "$40",
        period: "/mes",
        description: "Tu propia tienda online profesional.",
        features: ["Dominio Personalizado", "Hosting Incluido", "Pasarela de Pagos", "Diseño Premium"],
        gradient: "from-orange-500 to-red-500"
    },
];

const bundles: Plan[] = [
    {
        title: "Starter Pack",
        priceCOP: "$95.000",
        priceUSD: "$25",
        period: "/mes",
        description: "Ideal para comenzar a vender en físico.",
        features: ["Módulo Smart POS", "Soporte Básico"],
        gradient: "from-gray-500 to-slate-500",
        highlight: false
    },
    {
        title: "Growth Pack",
        priceCOP: "$190.000",
        originalPriceCOP: "$245.000",
        priceUSD: "$50",
        originalPriceUSD: "$65",
        period: "/mes",
        description: "Unifica tus canales de venta.",
        features: [
            "Smart POS + Web E-commerce",
            "Sync de Precio y Stock (Gestión de producto independiente)",
            "Soporte Prioritario",
            "Analíticas Unificadas"
        ],
        gradient: "from-neon-blue to-neon-purple",
        highlight: true
    },
    {
        title: "Enterprise",
        priceCOP: "Consultar",
        priceUSD: "Contact Us",
        period: "",
        description: "Todo el ecosistema + personalización.",
        features: ["Todos los 4 Pilares", "Desarrollos a Medida", "Integraciones API", "Account Manager"],
        gradient: "from-emerald-500 to-green-500",
        highlight: false
    }
];

export default function PricingSection() {
    const [view, setView] = useState<"modules" | "bundles">("bundles");
    const [currency, setCurrency] = useState<"COP" | "USD">("COP");

    return (
        <section className="py-20 px-6 bg-background relative" id="precios">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Elige tu plan</h2>
                    <p className="text-muted-foreground mb-8">Empieza pequeño, crece sin límites.</p>

                    <div className="flex flex-col items-center gap-4">
                        {/* Currency Toggle */}
                        <div className="inline-flex bg-white/5 p-1 rounded-full border border-white/10 mb-2">
                            <button
                                onClick={() => setCurrency("COP")}
                                className={cn(
                                    "px-4 py-1 rounded-full text-xs font-bold transition-all",
                                    currency === "COP" ? "bg-green-500 text-white" : "text-white/60 hover:text-white"
                                )}
                            >
                                COP ($)
                            </button>
                            <button
                                onClick={() => setCurrency("USD")}
                                className={cn(
                                    "px-4 py-1 rounded-full text-xs font-bold transition-all",
                                    currency === "USD" ? "bg-blue-500 text-white" : "text-white/60 hover:text-white"
                                )}
                            >
                                USD ($)
                            </button>
                        </div>

                        {/* Module/Bundle Toggle */}
                        <div className="inline-flex bg-white/5 p-1 rounded-full border border-white/10">
                            <button
                                onClick={() => setView("modules")}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-medium transition-all",
                                    view === "modules" ? "bg-white text-black" : "text-white/60 hover:text-white"
                                )}
                            >
                                Módulos Individuales
                            </button>
                            <button
                                onClick={() => setView("bundles")}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-medium transition-all",
                                    view === "bundles" ? "bg-white text-black" : "text-white/60 hover:text-white"
                                )}
                            >
                                Paquetes (Ahorra más)
                            </button>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${view}-${currency}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                            "grid gap-8",
                            view === "modules" ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" : "grid-cols-1 md:grid-cols-3"
                        )}
                    >
                        {(view === "modules" ? modules : bundles).map((plan, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "relative bg-card border rounded-3xl p-8 flex flex-col hover:scale-[1.02] transition-transform duration-300",
                                    (plan.highlight ? "border-neon-blue shadow-[0_0_30px_rgba(0,240,255,0.15)]" : "border-white/10")
                                )}
                            >
                                {plan.highlight && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-neon-blue to-neon-purple text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                                        Más Popular
                                    </div>
                                )}

                                <div className={cn("w-12 h-12 rounded-xl mb-6 bg-gradient-to-br opacity-80", plan.gradient)} />

                                <h3 className="text-2xl font-bold mb-2 text-center">{plan.title}</h3>
                                <div className="flex flex-col items-center mb-6">
                                    {(currency === "COP" ? plan.originalPriceCOP : plan.originalPriceUSD) && (
                                        <span className="text-sm text-white/40 line-through mb-1">
                                            {currency === "COP" ? plan.originalPriceCOP : plan.originalPriceUSD}
                                        </span>
                                    )}
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-white">
                                            {currency === "COP" ? plan.priceCOP : plan.priceUSD}
                                        </span>
                                        <span className="text-white/50">{plan.period}</span>
                                    </div>
                                </div>
                                <p className="text-muted-foreground text-sm mb-8 h-10 text-center">{plan.description}</p>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm text-white/80">
                                            <Check className="w-5 h-5 text-green-500 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={cn(
                                    "w-full py-3 rounded-xl font-bold transition-all",
                                    (plan.highlight
                                        ? "bg-neon-blue text-background hover:bg-neon-purple hover:text-white"
                                        : "bg-white/10 hover:bg-white text-white hover:text-black")
                                )}>
                                    Comenzar Ahora
                                </button>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                <div className="mt-12 text-center">
                    <p className="text-sm text-white/40 flex items-center justify-center gap-2">
                        <Info className="w-4 h-4" />
                        Todos los precios incluyen IVA y actualizaciones gratuitas.
                    </p>
                </div>
            </div>
        </section>
    );
}

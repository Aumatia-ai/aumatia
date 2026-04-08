"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CreditCard, ShoppingCart, Activity, Code, ArrowRight, Cpu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
    {
        title: "Smart POS",
        description: "Facturación electrónica y control de stock físico. Independiente y potente.",
        icon: CreditCard,
        className: "md:col-span-1",
        color: "from-blue-500/20 to-cyan-500/20",
        border: "group-hover:border-cyan-500/50",
        href: "/solutions/smart-pos"
    },
    {
        title: "Marketplace",
        description: "Vende en múltiples marketplaces y canales digitales desde un solo lugar.",
        icon: ShoppingCart,
        className: "md:col-span-1",
        color: "from-purple-500/20 to-pink-500/20",
        border: "group-hover:border-purple-500/50",
        href: "/solutions/marketplace"
    },
    {
        title: "Finanzas & Siigo",
        description: "Inteligencia de negocios y reportes automáticos.",
        icon: Activity,
        className: "md:col-span-1",
        color: "from-green-500/20 to-emerald-500/20",
        border: "group-hover:border-green-500/50",
        href: "/solutions/finances"
    },
    {
        title: "Web & E-commerce",
        description: "Tu tienda online sincronizada o independiente.",
        icon: Code,
        className: "md:col-span-1",
        color: "from-orange-500/20 to-red-500/20",
        border: "group-hover:border-orange-500/50",
        href: "/solutions/web-development"
    },
    {
        title: "ContactIA",
        description: "Plataforma de soporte y centro de contacto omnicanal impulsado por IA.",
        icon: Cpu,
        className: "md:col-span-1",
        color: "from-cyan-500/20 to-blue-500/20",
        border: "group-hover:border-cyan-500/50",
        href: "/contactia"
    },
    {
        title: "Agentes AI",
        description: "Empleados virtuales que trabajan 24/7 en WhatsApp o tu Web automatizando ventas.",
        icon: Sparkles,
        className: "md:col-span-1",
        color: "from-fuchsia-500/20 to-pink-500/20",
        border: "group-hover:border-fuchsia-500/50",
        href: "/solutions/agentes"
    },
];

export default function FeatureGrid() {
    return (
        <section className="py-20 px-6 bg-background relative z-10" id="plataforma">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Elige tu solución</h2>
                    <p className="text-muted-foreground">Herramientas independientes o unificadas en nuestro sistema operativo impulsado por IA.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    {features.map((feature, i) => (
                        <Link
                            key={i}
                            href={feature.href}
                            className={cn(feature.className, "block")}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={cn(
                                    "group h-full relative overflow-hidden rounded-3xl border border-white/10 bg-card p-8 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300"
                                )}
                            >
                                <div
                                    className={cn(
                                        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                        feature.color
                                    )}
                                />

                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10 group-hover:bg-white/10 transition-colors">
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                                        {feature.description}
                                    </p>
                                </div>

                                <div className="relative z-10 flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors mt-auto">
                                    Explorar Módulo <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

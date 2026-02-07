"use client";

import { motion } from "framer-motion";
import { CreditCard, ShoppingCart, Activity, Code, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
    {
        title: "Smart POS (El Corazón)",
        description: "El origen de todo. Factura electrónicamente (DIAN) y controla el stock físico. Personalizable por rol.",
        icon: CreditCard,
        className: "md:col-span-2",
        color: "from-blue-500/20 to-cyan-500/20",
        border: "group-hover:border-cyan-500/50"
    },
    {
        title: "Marketplace Hub",
        description: "Conexión nativa con Falabella, Mercado Libre y Addi. Vende en físico, baja en web.",
        icon: ShoppingCart,
        className: "md:col-span-1",
        color: "from-purple-500/20 to-pink-500/20",
        border: "group-hover:border-purple-500/50"
    },
    {
        title: "Finanzas & Siigo",
        description: "Automatización contable total. Facturas y notas crédito se crean solas.",
        icon: Activity,
        className: "md:col-span-1",
        color: "from-green-500/20 to-emerald-500/20",
        border: "group-hover:border-green-500/50"
    },
    {
        title: "Desarrollo Web Propio",
        description: "Tu e-commerce diseñado por nosotros, alimentado por Aumatia. Sin subir productos manualmente.",
        icon: Code,
        className: "md:col-span-2",
        color: "from-orange-500/20 to-red-500/20",
        border: "group-hover:border-orange-500/50"
    },
];

export default function FeatureGrid() {
    return (
        <section className="py-20 px-6 bg-background relative z-10" id="plataforma">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">El Ecosistema Total</h2>
                    <p className="text-muted-foreground">4 Pilares conectados por una misma inteligencia.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={cn(
                                "group relative overflow-hidden rounded-3xl border border-white/10 bg-card p-8 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300",
                                feature.className
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
                                Saber más <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

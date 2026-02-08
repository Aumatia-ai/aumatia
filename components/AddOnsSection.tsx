"use client";

import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";

const addons = [
    {
        name: "Integración Siigo Nube",
        description: "Sincroniza tus facturas y notas crédito automáticamente con tu contabilidad.",
        price: "+$50.000 / mes",
        features: ["Facturación Electrónica DIAN", "Sincronización en tiempo real", "Manejo de impuestos"],
        recommended: true
    },
    {
        name: "Facturación Electrónica Ilimitada",
        description: "Emite documentos sin límites de cantidad.",
        price: "+$30.000 / mes",
        features: ["Sin límite de documentos", "Almacenamiento por 5 años", "Envío automático al cliente"],
        recommended: false
    }
];

export default function AddOnsSection() {
    return (
        <section className="py-20 px-6 bg-background border-t border-white/5">
            <div className="container mx-auto max-w-5xl">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">Potencia tu POS</h2>
                    <p className="text-muted-foreground">Módulos adicionales que puedes activar cuando quieras.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {addons.map((addon, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="relative bg-card border border-white/10 rounded-2xl p-8 hover:border-neon-blue/50 transition-colors group"
                        >
                            {addon.recommended && (
                                <div className="absolute top-0 right-0 bg-neon-blue text-background text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                                    Recomendado
                                </div>
                            )}

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-neon-blue/10 transition-colors">
                                    <Plus className="w-6 h-6 text-neon-blue" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{addon.name}</h3>
                                    <p className="text-neon-blue font-mono">{addon.price}</p>
                                </div>
                            </div>

                            <p className="text-muted-foreground mb-6">{addon.description}</p>

                            <ul className="space-y-3">
                                {addon.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm text-white/80">
                                        <Check className="w-4 h-4 text-green-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full mt-8 bg-white/5 border border-white/10 text-white py-3 rounded-lg font-medium hover:bg-neon-blue hover:text-background hover:border-transparent transition-all">
                                Agregar al Plan
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

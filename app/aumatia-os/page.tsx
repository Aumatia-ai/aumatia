"use client";

import Navbar from "@/components/Navbar";
import TrustFooter from "@/components/TrustFooter";
import { motion } from "framer-motion";
import { Cpu, Layers, Link as LinkIcon, Shield } from "lucide-react";
import Link from "next/link";

export default function AumatiaOSPage() {
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
                            className="text-xl text-white/70 leading-relaxed mb-8"
                        >
                            Aumatia OS no es solo una herramienta, es el centro de gravedad de tu negocio. Conecta tu punto de venta, tienda online, finanzas y agentes de IA bajo un mismo núcleo de datos. Un solo inicio de sesión, un control total.
                        </motion.p>

                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="relative mx-auto max-w-5xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                        >
                            <img 
                                src="/dashboard-mockup.png" 
                                alt="Dashboard Aumatia OS" 
                                className="w-full h-auto"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
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

"use client";

import Navbar from "@/components/Navbar";
import TrustFooter from "@/components/TrustFooter";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle, Target, Zap } from "lucide-react";
import Link from "next/link";

export default function finanzasPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-blue selection:text-black">
      <Navbar />
      
      <div className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background -z-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mt-12 mb-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-2xl mb-6 shadow-[0_0_30px_rgba(0,255,255,0.1)]"
            >
              <TrendingUp className="w-12 h-12 text-indigo-400" />
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
            >
              Finanzas <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">e Inteligencia de Negocios</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/70 leading-relaxed mb-8"
            >
              Control financiero, reportes automáticos e integración nativa con Siigo para tu contabilidad B2B.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <a href={`https://wa.me/573118905418?text=${encodeURIComponent('Hola Aumatia, estoy interesad@ en una demo de Finanzas e Inteligencia de Negocios')}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-full transition-all inline-block">
                Solicitar Demo
              </a>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
            {[
              { icon: CheckCircle, title: "Reportes en Tiempo Real", description: "Visualiza flujo de caja, cuentas por cobrar y rentabilidad al instante." },
              { icon: Target, title: "Integración Siigo", description: "Tus ventas se sincronizan automáticamente con tu software contable." },
              { icon: Zap, title: "Conciliación Bancaria", description: "Cruza tus pagos y facturas automáticamente reduciendo errores." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + (idx * 0.1) }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-indigo-500/30 transition-all"
              >
                <feature.icon className="w-10 h-10 text-indigo-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <TrustFooter />
    </main>
  );
}

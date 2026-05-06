"use client";

import Navbar from "@/components/Navbar";
import TrustFooter from "@/components/TrustFooter";
import { motion } from "framer-motion";
import { Bot, CheckCircle, Target, Zap } from "lucide-react";
import Link from "next/link";

export default function agentesaiPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-blue selection:text-black">
      <Navbar />
      
      <div className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-background to-background -z-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mt-12 mb-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center p-4 bg-neon-blue/10 rounded-2xl mb-6 shadow-[0_0_30px_rgba(0,255,255,0.1)]"
            >
              <Bot className="w-12 h-12 text-neon-blue" />
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
            >
              Agentes <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI - Empleados Virtuales</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/70 leading-relaxed mb-8"
            >
              Conversaciones naturales con IA. Tus agentes atienden, venden y agendan reuniones 24/7 en WhatsApp y Web.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <a href={`https://wa.me/573118905418?text=${encodeURIComponent('Hola Aumatia, estoy interesad@ en una demo de Agentes AI')}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-neon-blue hover:bg-neon-purple text-black font-bold rounded-full transition-all inline-block">
                Solicitar Demo
              </a>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
            {[
              { icon: CheckCircle, title: "Ventas por WhatsApp", description: "Cierra ventas automáticamente conectando tu inventario a la IA." },
              { icon: Target, title: "Prospección B2B", description: "Calificación automática de prospectos y programación de reuniones." },
              { icon: Zap, title: "Soporte 24/7", description: "Atención al cliente inmediata, resolviendo dudas frecuentes con inteligencia." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + (idx * 0.1) }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-cyan-500/30 transition-all"
              >
                <feature.icon className="w-10 h-10 text-neon-blue mb-6" />
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

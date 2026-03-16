"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, Bot, Zap, Shield, BarChart3, Globe } from "lucide-react";
import Link from "next/link";

const osFeatures = [
  {
    title: "Cerebro Central",
    desc: "Unifica inventario, ventas y clientes en un solo flujo inteligente.",
    icon: Cpu
  },
  {
    title: "Automatización IA",
    desc: "Agentes que venden, agendan y responden por ti 24/7.",
    icon: Bot
  },
  {
    title: "Sincronización Total",
    desc: "POS, Web y Marketplaces siempre en perfecta armonía.",
    icon: Zap
  }
];

export default function OSSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
              <Cpu className="w-3 h-3" />
              Sistema Operativo
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Aumatia OS: El motor de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Aceleración para tu Negocio
              </span>
            </h2>
            
            <p className="text-white/60 text-lg leading-relaxed max-w-xl">
              No es solo un software, es una infraestructura completa que elimina la fragmentación. 
              Conecta tus canales de venta, automatiza tu operación con IA y toma el control total desde una sola interfaz.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {osFeatures.map((f, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-all">
                    <f.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{f.title}</h4>
                    <p className="text-white/40 text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Link 
                href="/os" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-black rounded-full hover:bg-cyan-400 transition-all group"
              >
                Conocer Aumatia OS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Side: Visual Mockup */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 bg-slate-900/50 border border-white/10 rounded-3xl p-4 md:p-8 backdrop-blur-xl shadow-2xl">
              <div className="aspect-video w-full rounded-2xl bg-black/40 overflow-hidden relative border border-white/5">
                {/* Fake UI elements to simulate an OS dashboard */}
                <div className="absolute top-0 left-0 w-full p-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                  </div>
                  <div className="text-[10px] text-white/20 font-mono tracking-widest uppercase">system_v2.0_online</div>
                </div>
                
                <div className="p-8 mt-4 grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-32 rounded-xl bg-cyan-500/5 border border-cyan-500/10 p-4 relative overflow-hidden">
                    <div className="absolute top-2 right-2 w-12 h-12 bg-cyan-500/10 blur-xl rounded-full" />
                    <BarChart3 className="w-6 h-6 text-cyan-500 mb-2" />
                    <div className="w-1/2 h-2 bg-cyan-500/20 rounded-full mb-2" />
                    <div className="w-1/3 h-2 bg-cyan-500/10 rounded-full" />
                  </div>
                  <div className="h-32 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/10 p-4">
                    <Bot className="w-6 h-6 text-fuchsia-400 mb-2" />
                    <div className="w-2/3 h-2 bg-fuchsia-500/20 rounded-full mb-2" />
                    <div className="w-1/2 h-2 bg-fuchsia-500/10 rounded-full" />
                  </div>
                  <div className="h-24 rounded-xl bg-white/5 border border-white/10" />
                  <div className="h-24 rounded-xl bg-white/5 border border-white/10" />
                  <div className="h-24 rounded-xl bg-white/5 border border-white/10" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-xs font-mono text-cyan-400">Escaneando transacciones en tiempo real...</span>
                    </div>
                </div>
              </div>

              {/* Decorative elements outside the fake UI */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 blur-[60px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-fuchsia-500/20 blur-[60px] rounded-full pointer-events-none" />
            </div>
            
            {/* Floating indicator */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -right-4 top-1/2 z-20 hidden md:flex items-center gap-4 bg-black/80 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-lg"
            >
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-400" />
                </div>
                <div>
                    <div className="text-white font-bold text-sm">Protección Integrada</div>
                    <div className="text-white/40 text-[10px]">Sync Seguro AES-256</div>
                </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Cpu, Shield, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AumatiaOSPromo() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050b14] border-t border-white/5">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest">
              <Cpu className="w-3 h-3" />
              El Núcleo
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Presentamos el nuevo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Aumatia OS
              </span>
            </h2>
            
            <p className="text-white/60 text-lg leading-relaxed max-w-xl">
              Más que herramientas inconexas, hemos creado el primer Sistema Operativo real para tu empresa.
              Aloja tu información en un subdominio multi-tenant, inicia sesión una sola vez y controla todos tus módulos desde un punto central.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <Layers className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                      <h4 className="text-white font-bold mb-1">Arquitectura SaaS Multi-Tenant</h4>
                      <p className="text-white/40 text-sm">Tu data viaja de forma aislada y segura bajo tu propio entorno.</p>
                  </div>
              </div>
              <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                      <h4 className="text-white font-bold mb-1">Permisos por Módulo Unificados (SSO)</h4>
                      <p className="text-white/40 text-sm">Aumatia OS lee qué contrató tu empresa y despliega únicamente lo necesario.</p>
                  </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/os" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-black font-black rounded-full hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,200,255,0.4)] group"
              >
                Descubrir el Ecosistema
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Side: Visual Mockup (Snowflake Hub abstraction) */}
          <div className="w-full lg:w-1/2 relative">
             <div className="relative aspect-square max-w-md mx-auto">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-[80px] animate-pulse" />
                 
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-black border-2 border-cyan-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,255,255,0.3)] z-20">
                    <Cpu className="w-12 h-12 text-cyan-400 mb-2" />
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 px-4 text-center">Gestor Central SSO</span>
                 </div>

                 {/* Orbital rings */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/10 rounded-full border-dashed animate-[spin_60s_linear_infinite]" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-blue-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                 
                 {/* Decorative connecting nodes */}
                 <div className="absolute top-[15%] left-[85%] w-10 h-10 bg-black border border-white/20 rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <div className="w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]" />
                 </div>
                 <div className="absolute top-[80%] left-[10%] w-10 h-10 bg-black border border-white/20 rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <div className="w-3 h-3 bg-fuchsia-500 rounded-full shadow-[0_0_10px_#d946ef]" />
                 </div>
                 <div className="absolute top-[10%] left-[10%] w-10 h-10 bg-black border border-white/20 rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
                 </div>
                 <div className="absolute top-[85%] left-[80%] w-10 h-10 bg-black border border-white/20 rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" />
                 </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}

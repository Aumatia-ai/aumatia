"use client";

import Navbar from "@/components/Navbar";
import TrustFooter from "@/components/TrustFooter";
import { useState } from "react";
import { BookOpen, CheckCircle, Download } from "lucide-react";
import Image from "next/image";

export default function GuiaPymesIAPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call to CRM
    setTimeout(() => {
      setStatus("success");
      // Fire GA4 Event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "generate_lead", {
          event_category: "Downloads",
          event_label: "Guia_PYMES_IA",
        });
      }
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-blue selection:text-black">
      <Navbar />
      
      <div className="pt-32 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            
            {/* Left Column: Copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-semibold mb-6">
                <BookOpen className="w-4 h-4" />
                Whitepaper Gratuito
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Guía práctica: automatiza y escala tu PYME con IA
              </h1>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                Descubre el paso a paso exacto que están usando las empresas B2B en Colombia para prospectar en piloto automático, unificar inventarios y reducir sus costos operativos con Inteligencia Artificial.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Cómo usar IA para generar leads B2B 24/7.",
                  "La estrategia para unificar POS, Ecommerce y Marketplaces.",
                  "Plantillas de automatización para seguimiento de ventas."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-400 shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Form */}
            <div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                {status === "success" ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Download className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">¡Guía enviada!</h3>
                    <p className="text-white/60">Revisa tu correo electrónico, te hemos enviado el enlace de descarga directo.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-6">Descarga tu copia ahora</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Nombre completo *</label>
                        <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Ej. Juan Pérez" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Email corporativo *</label>
                        <input required type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="juan@empresa.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Nombre de la Empresa *</label>
                        <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Tu Empresa SAS" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Número de empleados *</label>
                        <select required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none">
                          <option value="">Selecciona una opción</option>
                          <option value="1-10">1 a 10 empleados</option>
                          <option value="11-50">11 a 50 empleados</option>
                          <option value="51-200">51 a 200 empleados</option>
                          <option value="201+">Más de 200 empleados</option>
                        </select>
                      </div>
                      <button 
                        type="submit" 
                        disabled={status === "submitting"}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-xl transition-colors mt-4 disabled:opacity-50"
                      >
                        {status === "submitting" ? "Procesando..." : "Descargar Guía Gratis"}
                      </button>
                      <p className="text-xs text-center text-white/40 mt-4">
                        Al descargar, aceptas nuestra Política de Privacidad.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <TrustFooter />
    </main>
  );
}

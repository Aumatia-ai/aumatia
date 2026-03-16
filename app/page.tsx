"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import OSSection from "@/components/OSSection";
import SyncSimulation from "@/components/SyncSimulation";
import TrustFooter from "@/components/TrustFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-blue selection:text-black">
      <Navbar />
      <HeroSection />
      <FeatureGrid />
      <OSSection />

      {/* Ecosystem Presentation Section */}
      <section className="py-24 bg-black/50 border-t border-white/5">
        <div className="container mx-auto text-center mb-16 px-6">
          <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Ecosistema Unificado</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">Todo tu negocio en un <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">solo flujo.</span></h2>
          <p className="text-white/50 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
            Aumatia no son módulos aislados, es una solución integral. Conecta tu punto de venta, tu tienda online, tus canales de venta y tu contabilidad en un ecosistema sincronizado que trabaja para ti, eliminando duplicidad de tareas y errores humanos.
          </p>
        </div>
        <SyncSimulation />
      </section>

      <TrustFooter />
    </main>
  );
}

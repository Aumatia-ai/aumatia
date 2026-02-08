"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import SyncSimulation from "@/components/SyncSimulation";
import TrustFooter from "@/components/TrustFooter";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-blue selection:text-black">
      <Navbar />
      <HeroSection />
      <FeatureGrid />

      {/* Optional Connection Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto text-center mb-10">
          <span className="text-neon-blue text-sm font-bold tracking-widest uppercase">Opcional</span>
          <h2 className="text-3xl font-bold mt-2">¿Quieres más poder? Conéctalos.</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Cada módulo es potente por sí solo. Pero cuando los unes, Aumatia sincroniza stock y precios automáticamente.
          </p>
        </div>
        <SyncSimulation />
      </section>

      <PricingSection />
      <TrustFooter />
    </main>
  );
}

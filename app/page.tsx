"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import SyncSimulation from "@/components/SyncSimulation";
import TrustFooter from "@/components/TrustFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-blue selection:text-black">
      <Navbar />
      <HeroSection />
      <FeatureGrid />
      <SyncSimulation />
      <TrustFooter />
    </main>
  );
}

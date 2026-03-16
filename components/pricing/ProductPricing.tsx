"use client";

import { PricingProvider } from "./PricingContext";
import PricingToggle from "./PricingToggle";
import PricingCard from "./PricingCard";
import { pricingData } from "@/lib/pricingData";

interface ProductPricingProps {
    producto: keyof typeof pricingData;
    title?: string;
    subtitle?: string;
}

export default function ProductPricing({ producto, title, subtitle }: ProductPricingProps) {
    if (!pricingData[producto]) {
        return <div className="p-4 text-red-500">Error: El producto "{producto}" no existe en el catálogo.</div>;
    }

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-black -z-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full -z-10" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                        {title || `Planes para ${pricingData[producto].title}`}
                    </h2>
                    <p className="text-white/60 text-lg">
                        {subtitle || "Transparencia sin letras pequeñas. Elige cómo quieres empezar."}
                    </p>
                </div>

                <PricingProvider>
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-12 backdrop-blur-md">
                        <PricingToggle />
                        
                        <div className="max-w-md mx-auto">
                            <PricingCard productId={producto} />
                        </div>
                    </div>
                </PricingProvider>
            </div>
        </section>
    );
}

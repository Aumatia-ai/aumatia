"use client";

import { usePricingContext } from "./PricingContext";
import { formatCurrency, pricingData } from "@/lib/pricingData";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
    productId: string;
}

export default function PricingCard({ productId }: PricingCardProps) {
    const { currency, period } = usePricingContext();
    const product = pricingData[productId];

    if (!product) {
        return <div className="p-4 border border-red-500 text-red-500">Product not found: {productId}</div>;
    }

    const currentPrice = period === 'month1' 
        ? product.prices[currency].month1 
        : product.prices[currency].month2Plus;
        
    const setupCost = product.prices[currency].setup;
    const monthlyCost = product.prices[currency].month2Plus; // Base monthly is always month2+

    return (
        <div className={cn(
            "relative flex flex-col p-8 rounded-[2rem] border transition-all duration-300 h-full backdrop-blur-sm shadow-xl",
            product.recommended 
                ? "bg-gradient-to-br from-slate-900/90 to-black border-cyan-500/50 shadow-[0_0_30px_rgba(0,240,255,0.15)] scale-105 z-10" 
                : "bg-black/60 border-white/10 hover:border-white/20"
        )}>
            {product.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full text-xs font-bold text-white tracking-widest uppercase truncate max-w-[90%] border border-white/20">
                    Recomendado
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{product.title}</h3>
                {product.description && (
                    <p className="text-white/60 text-sm mb-4">{product.description}</p>
                )}
            </div>

            <div className="mb-8">
                <div className="flex items-end gap-2 mb-2">
                    <span className={cn("text-4xl font-extrabold tracking-tight", product.recommended ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500" : "text-white")}>
                        {formatCurrency(currentPrice, currency)}
                    </span>
                    <span className="text-white/50 font-medium mb-1">/{currency}</span>
                </div>
                
                {/* Description based on Period toggle */}
                <div className="min-h-[40px] text-sm text-white/50 p-3 bg-white/5 rounded-xl border border-white/5">
                    {period === 'month1' ? (
                        <p>
                            <strong className="text-white/70">1er Mes:</strong> Incluye <span className="text-white">{formatCurrency(setupCost, currency)}</span> de Setup + <span className="text-white">{formatCurrency(monthlyCost, currency)}</span> Mensualidad.
                        </p>
                    ) : (
                        <p>
                            <strong className="text-white/70">Renovación mensual:</strong> Mantenimiento y licencia de la herramienta.
                        </p>
                    )}
                </div>
            </div>

            {/* Setup included detail (only show if viewing month1 or general features) */}
            <div className="mb-8 p-4 bg-gradient-to-r from-white/5 to-transparent rounded-2xl border-l-2 border-cyan-500/50">
                <p className="text-xs text-white/40 uppercase tracking-wider font-bold mb-1">Setup Inicial Incluye:</p>
                <p className="text-sm text-white/80 leading-relaxed">{product.setupDescription}</p>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
                {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-white/80">{feature}</span>
                    </li>
                ))}
            </ul>

            <button className={cn(
                "w-full py-4 rounded-full font-bold transition-all duration-300 mt-auto",
                product.recommended
                    ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
            )}>
                Elegir {product.title}
            </button>

        </div>
    );
}

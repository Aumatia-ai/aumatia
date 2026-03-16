"use client";

import { usePricingContext } from "./PricingContext";
import { cn } from "@/lib/utils";

export default function PricingToggle() {
    const { currency, setCurrency, period, setPeriod } = usePricingContext();

    return (
        <div className="flex flex-col items-center gap-6 mt-8 mb-16">
            
            {/* Time Period Selector */}
            <div className="bg-white/5 border border-white/10 p-1.5 rounded-full flex relative z-10 w-full max-w-sm">
                <button
                    onClick={() => setPeriod('month1')}
                    className={cn(
                        "relative flex-1 py-3 text-sm font-semibold rounded-full transition-all duration-300 z-10",
                        period === 'month1' ? "text-white" : "text-white/50 hover:text-white/80"
                    )}
                >
                    1er Mes (Setup + Mensual)
                </button>
                <button
                    onClick={() => setPeriod('month2+')}
                    className={cn(
                        "relative flex-1 py-3 text-sm font-semibold rounded-full transition-all duration-300 z-10",
                        period === 'month2+' ? "text-white" : "text-white/50 hover:text-white/80"
                    )}
                >
                    2do Mes (Renovación)
                </button>
                
                {/* Active Indicator Background */}
                <div 
                    className={cn(
                        "absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-cyan-500/80 to-blue-500/80 rounded-full transition-all duration-300 z-0",
                        period === 'month1' ? "left-1.5" : "left-[calc(50%+4px)]"
                    )}
                />
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-3">
                <span className={cn("text-sm font-medium transition-colors cursor-pointer", currency === 'COP' ? "text-white" : "text-white/50")} onClick={() => setCurrency('COP')}>
                    COP (🇨🇴)
                </span>
                
                <button 
                    onClick={() => setCurrency(currency === 'COP' ? 'USD' : 'COP')}
                    className="w-14 h-7 rounded-full bg-white/10 flex items-center px-1 cursor-pointer transition-colors hover:bg-white/20"
                >
                    <div className={cn(
                        "w-5 h-5 rounded-full bg-neon-blue shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-transform duration-300",
                        currency === 'USD' ? "translate-x-7" : "translate-x-0"
                    )} />
                </button>

                <span className={cn("text-sm font-medium transition-colors cursor-pointer", currency === 'USD' ? "text-white" : "text-white/50")} onClick={() => setCurrency('USD')}>
                    USD ($)
                </span>
            </div>

        </div>
    );
}

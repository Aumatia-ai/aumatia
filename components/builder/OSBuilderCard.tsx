"use client";

import { useEcosystemContext } from "./EcosystemContext";
import { osData, formatCurrency, OSLevel } from "@/lib/builderData";
import { Cpu, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OSBuilderCard() {
    const { currency, isOSSelected, toggleOS, osLevel, setOSLevel, trm } = useEcosystemContext();
    
    const setupPrice = currency === 'COP' ? osData.setupPriceCOP : Math.round(osData.setupPriceCOP / trm);

    const handleTabClick = (e: React.MouseEvent, level: OSLevel) => {
        e.stopPropagation(); // prevent triggering the main card toggle
        setOSLevel(level);
        if (!isOSSelected) {
            toggleOS();
        }
    };

    const currentLevelData = osData.levels[osLevel];
    const monthlyPrice = currency === 'COP' ? currentLevelData.monthlyPriceCOP : Math.round(currentLevelData.monthlyPriceCOP / trm);

    return (
        <div 
            onClick={() => toggleOS()}
            className={cn(
                "relative flex flex-col p-6 rounded-3xl border transition-all duration-300 cursor-pointer h-full group col-span-1 md:col-span-2 lg:col-span-3",
                isOSSelected 
                    ? "bg-gradient-to-br from-slate-900 to-black border-cyan-500 shadow-[0_0_30px_rgba(0,240,255,0.2)]" 
                    : "bg-black/60 border-white/10 hover:border-white/20"
            )}
        >
            {/* Absolute check indicator */}
            <div className={cn(
                "absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border z-10",
                isOSSelected 
                    ? "bg-cyan-500 border-cyan-400 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]" 
                    : "bg-white/5 border-white/20 text-white/30 group-hover:bg-white/10 group-hover:text-white/60"
            )}>
                {isOSSelected ? <Check className="w-5 h-5 font-bold" /> : <Plus className="w-5 h-5" />}
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center w-full">
                
                {/* Left Side: Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                        <div className={cn(
                            "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                            isOSSelected ? "bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg" : "bg-white/5 text-white/60"
                        )}>
                            <Cpu className="w-7 h-7" />
                        </div>
                        <div>
                            <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold tracking-widest uppercase text-cyan-400 mb-1 border border-white/5">
                                Motor Descuentos
                            </div>
                            <h3 className={cn("text-2xl font-black transition-colors", isOSSelected ? "text-white" : "text-white/90")}>Contactia</h3>
                        </div>
                    </div>
                    
                    <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-lg mb-6 md:mb-0">
                        El cerebro que conecta todo. Automatiza ventas con IA, campañas de WhatsApp y embudos complejos. Selecciona el nivel de poder que necesitas.
                    </p>
                </div>

                {/* Right Side: Tiers and Pricing */}
                <div className="w-full md:w-auto flex flex-col items-start md:items-end">
                    
                    {/* Tiers Tabs */}
                    <div className="flex bg-black/50 p-1.5 rounded-xl border border-white/10 mb-4 w-full md:w-auto" onClick={(e) => e.stopPropagation()}>
                        {(['starter', 'growth', 'pro'] as OSLevel[]).map((level) => (
                            <button
                                key={level}
                                onClick={(e) => handleTabClick(e, level)}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 capitalize flex-1 md:flex-none",
                                    osLevel === level 
                                        ? "bg-white/10 text-white shadow-sm border border-white/10" 
                                        : "text-white/40 hover:text-white/70"
                                )}
                            >
                                {level}
                            </button>
                        ))}
                    </div>

                    {/* Current Tier Price Display */}
                    <div className="text-left md:text-right w-full">
                        <div className="flex items-end justify-start md:justify-end gap-2 mb-1">
                            <span className={cn("text-4xl font-black transition-colors", isOSSelected ? "text-cyan-400" : "text-white")}>
                                {formatCurrency(monthlyPrice, currency)}
                            </span>
                            <span className="text-white/40 font-medium mb-1">/mes</span>
                        </div>
                        <div className="text-sm font-medium text-white/70 bg-white/5 px-3 py-1 rounded-lg inline-block border border-white/5 mb-2">
                            Incluye {currentLevelData.credits} Créditos AI
                        </div>
                        <p className="text-xs text-white/40 block mt-2">
                            + {formatCurrency(setupPrice, currency)} Setup único de flujos
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

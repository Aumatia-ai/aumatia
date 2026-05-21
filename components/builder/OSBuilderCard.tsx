"use client";

import { useEcosystemContext } from "./EcosystemContext";
import { osData, formatCurrency, OSLevel } from "@/lib/builderData";
import { Cpu, Plus, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OSBuilderCard() {
    const { currency, isOSSelected, toggleOS, osLevel, setOSLevel, trm } = useEcosystemContext();

    const level = osData.levels[osLevel];
    const monthlyPrice = currency === 'COP' ? level.monthlyPriceCOP : Math.round(level.monthlyPriceCOP / trm);
    const setupPrice = currency === 'COP' ? osData.setupPriceCOP : Math.round(osData.setupPriceCOP / trm);

    const handleTabClick = (e: React.MouseEvent, lvl: OSLevel) => {
        e.stopPropagation();
        setOSLevel(lvl);
        if (!isOSSelected) {
            toggleOS();
        }
    };

    return (
        <div
            onClick={() => toggleOS()}
            className={cn(
                "relative flex flex-col p-6 rounded-3xl border transition-all duration-300 cursor-pointer h-full group",
                isOSSelected
                    ? "bg-gradient-to-b from-slate-900 to-black border-cyan-500 shadow-[0_0_30px_rgba(0,240,255,0.15)] -translate-y-1"
                    : "bg-black/60 border-white/10 hover:border-white/20 hover:-translate-y-1"
            )}
        >
            {/* Absolute check indicator */}
            <div className={cn(
                "absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 border",
                isOSSelected
                    ? "bg-cyan-500 border-cyan-400 text-black"
                    : "bg-white/5 border-white/20 text-white/30 group-hover:bg-white/10 group-hover:text-white/60"
            )}>
                {isOSSelected ? <Check className="w-4 h-4 font-bold" /> : <Plus className="w-4 h-4" />}
            </div>

            <div className="flex items-center gap-4 mb-3">
                <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors shrink-0",
                    isOSSelected ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-white/60"
                )}>
                    <Cpu className="w-6 h-6" />
                </div>
                <div>
                    <h3 className={cn("text-xl font-bold transition-colors", isOSSelected ? "text-white" : "text-white/90")}>Contactia</h3>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border bg-white/5 text-cyan-400 border-white/10">
                        CRM+
                    </span>
                </div>
            </div>

            <p className="text-sm text-white/60 mb-5">Un CRM que va más allá: contactabilidad con IA por llamadas y WhatsApp, automatizaciones y prospección de leads.</p>

            {/* Level selector (segmented control) */}
            <div
                className="flex bg-black/50 p-1 rounded-xl border border-white/10 mb-5 w-full"
                onClick={(e) => e.stopPropagation()}
            >
                {(['starter', 'growth', 'pro'] as OSLevel[]).map((lvl) => (
                    <button
                        key={lvl}
                        onClick={(e) => handleTabClick(e, lvl)}
                        className={cn(
                            "flex-1 min-w-0 px-2 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-300 capitalize truncate",
                            osLevel === lvl
                                ? "bg-white/10 text-white shadow-sm border border-white/10"
                                : "text-white/40 hover:text-white/70"
                        )}
                    >
                        {osData.levels[lvl].title}
                    </button>
                ))}
            </div>

            {/* Price area */}
            <div className="mb-4 min-h-[68px]">
                <div className="flex items-end gap-1">
                    <span className={cn(
                        "text-3xl font-black",
                        isOSSelected ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400" : "text-white"
                    )}>
                        {formatCurrency(monthlyPrice, currency)}
                    </span>
                    <span className="text-white/40 text-sm font-medium mb-1">/mes</span>
                </div>
                <div className="mt-1 text-xs text-white/50 bg-white/5 px-2 py-1 rounded-md inline-block">
                    + {formatCurrency(setupPrice, currency)} Setup único de flujos
                </div>
            </div>

            {/* Credits highlight */}
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-white/70">
                <Sparkles className={cn("w-4 h-4 shrink-0", isOSSelected ? "text-cyan-400" : "text-white/30")} />
                <span>Incluye {level.credits} Créditos AI / mes</span>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 flex-grow">
                {level.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <Check className={cn("w-4 h-4 shrink-0 mt-0.5", isOSSelected ? "text-cyan-400" : "text-white/20")} />
                        <span className="text-sm text-white/70">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

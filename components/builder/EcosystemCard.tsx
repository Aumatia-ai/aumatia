"use client";

import { useEcosystemContext } from "./EcosystemContext";
import { EcosystemModuleData, formatCurrency } from "@/lib/builderData";
import { Monitor, Activity, ShoppingBag, Globe, BotMessageSquare, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const IconMap: Record<string, any> = {
    Monitor, Activity, ShoppingBag, Globe, BotMessageSquare
};

export default function EcosystemCard({ module }: { module: EcosystemModuleData }) {
    const { currency, selectedModules, toggleModule, trm } = useEcosystemContext();
    
    const isSelected = selectedModules.includes(module.id);
    
    const Icon = IconMap[module.iconName] || Monitor;
    
    const monthlyPrice = currency === 'COP' ? module.monthlyPriceCOP : Math.round(module.monthlyPriceCOP / trm);
    const setupPrice = currency === 'COP' ? module.setupPriceCOP : Math.round(module.setupPriceCOP / trm);

    return (
        <div 
            onClick={() => toggleModule(module.id)}
            className={cn(
                "relative flex flex-col p-6 rounded-3xl border transition-all duration-300 cursor-pointer h-full group",
                isSelected 
                    ? "bg-gradient-to-b from-slate-900 to-black border-cyan-500 shadow-[0_0_30px_rgba(0,240,255,0.15)] -translate-y-1" 
                    : "bg-black/60 border-white/10 hover:border-white/20 hover:-translate-y-1"
            )}
        >
            {/* Absolute check indicator */}
            <div className={cn(
                "absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 border",
                isSelected 
                    ? "bg-cyan-500 border-cyan-400 text-black" 
                    : "bg-white/5 border-white/20 text-white/30 group-hover:bg-white/10 group-hover:text-white/60"
            )}>
                {isSelected ? <Check className="w-4 h-4 font-bold" /> : <Plus className="w-4 h-4" />}
            </div>

            <div className="flex items-center gap-4 mb-4">
                <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    isSelected ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-white/60"
                )}>
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className={cn("text-xl font-bold transition-colors", isSelected ? "text-white" : "text-white/90")}>{module.title}</h3>
            </div>
            
            <p className="text-sm text-white/60 mb-6 flex-grow">{module.description}</p>

            <div className="mb-6">
                <div className="flex items-end gap-1">
                    <span className={cn("text-3xl font-black", isSelected ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400" : "text-white")}>
                        {formatCurrency(monthlyPrice, currency)}
                    </span>
                    <span className="text-white/40 text-sm font-medium mb-1">/mes</span>
                </div>
                <div className="mt-1 text-xs text-white/50 bg-white/5 px-2 py-1 rounded-md inline-block">
                    + {formatCurrency(setupPrice, currency)} de Setup único
                </div>
            </div>

            <ul className="space-y-2">
                {module.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <Check className={cn("w-4 h-4 shrink-0 mt-0.5", isSelected ? "text-cyan-400" : "text-white/20")} />
                        <span className="text-sm text-white/70">{feature}</span>
                    </li>
                ))}
            </ul>

        </div>
    );
}

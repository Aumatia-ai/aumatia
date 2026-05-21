"use client";

import { useEcosystemContext } from "./EcosystemContext";
import { smartPosPlans, formatCurrency, SmartPosLevel } from "@/lib/builderData";
import { Monitor, Plus, Check, MapPin, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_BASE = "https://wa.me/573118905418";

export default function SmartPosCard() {
    const { currency, selectedModules, toggleModule, smartPosLevel, setSmartPosLevel, trm } = useEcosystemContext();

    const isSelected = selectedModules.includes("smart-pos");
    const plan = smartPosPlans[smartPosLevel];

    const monthlyPrice = plan.monthlyPriceCOP === null
        ? null
        : (currency === 'COP' ? plan.monthlyPriceCOP : Math.round(plan.monthlyPriceCOP / trm));
    const setupPrice = plan.setupPriceCOP === null
        ? null
        : (currency === 'COP' ? plan.setupPriceCOP : Math.round(plan.setupPriceCOP / trm));

    const handleTabClick = (e: React.MouseEvent, level: SmartPosLevel) => {
        e.stopPropagation();
        setSmartPosLevel(level);
        if (!isSelected) {
            toggleModule("smart-pos");
        }
    };

    const enterpriseWhatsApp = `${WHATSAPP_BASE}?text=${encodeURIComponent(
        "Hola Aumatia, me interesa el plan Smart POS Empresarial. Me gustaría agendar una reunión para una cotización a la medida."
    )}`;

    return (
        <div
            onClick={() => toggleModule("smart-pos")}
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

            <div className="flex items-center gap-4 mb-3">
                <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors shrink-0",
                    isSelected ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-white/60"
                )}>
                    <Monitor className="w-6 h-6" />
                </div>
                <div>
                    <h3 className={cn("text-xl font-bold transition-colors", isSelected ? "text-white" : "text-white/90")}>Smart POS</h3>
                    {plan.badge && (
                        <span className={cn(
                            "inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border",
                            plan.badgeStyle === 'popular'
                                ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white border-transparent shadow-[0_0_12px_rgba(0,240,255,0.35)]"
                                : "bg-white/5 text-cyan-400 border-white/10"
                        )}>
                            {plan.badge}
                        </span>
                    )}
                </div>
            </div>

            <p className="text-sm text-white/60 mb-5">Facturación, inventario y gestión de puntos físicos.</p>

            {/* Sub-plan selector (segmented control) */}
            <div
                className="flex bg-black/50 p-1 rounded-xl border border-white/10 mb-5 w-full"
                onClick={(e) => e.stopPropagation()}
            >
                {(['lite', 'pro', 'empresarial'] as SmartPosLevel[]).map((level) => (
                    <button
                        key={level}
                        onClick={(e) => handleTabClick(e, level)}
                        className={cn(
                            "flex-1 min-w-0 px-2 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-300 capitalize truncate",
                            smartPosLevel === level
                                ? "bg-white/10 text-white shadow-sm border border-white/10"
                                : "text-white/40 hover:text-white/70"
                        )}
                    >
                        {smartPosPlans[level].title}
                    </button>
                ))}
            </div>

            {/* Price area */}
            <div className="mb-4 min-h-[68px]">
                {plan.isQuote ? (
                    <div>
                        <span className={cn(
                            "text-2xl font-black",
                            isSelected ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400" : "text-white"
                        )}>
                            Cotización a la medida
                        </span>
                        <p className="mt-1 text-xs text-white/50">Infraestructura dedicada según tu red de puntos.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-end gap-1">
                            <span className={cn(
                                "text-3xl font-black",
                                isSelected ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400" : "text-white"
                            )}>
                                {formatCurrency(monthlyPrice as number, currency)}
                            </span>
                            <span className="text-white/40 text-sm font-medium mb-1">/mes</span>
                        </div>
                        <div className="mt-1 text-xs text-white/50 bg-white/5 px-2 py-1 rounded-md inline-block">
                            {setupPrice && setupPrice > 0
                                ? `+ ${formatCurrency(setupPrice, currency)} de Setup único`
                                : "Sin setup"}
                        </div>
                    </>
                )}
            </div>

            {/* Limit label */}
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-white/70">
                <MapPin className={cn("w-4 h-4 shrink-0", isSelected ? "text-cyan-400" : "text-white/30")} />
                <span>{plan.limitLabel}</span>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 flex-grow">
                {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <Check className={cn("w-4 h-4 shrink-0 mt-0.5", isSelected ? "text-cyan-400" : "text-white/20")} />
                        <span className="text-sm text-white/70">{feature}</span>
                    </li>
                ))}
            </ul>

            {/* Enterprise-only CTA: schedule a meeting */}
            {plan.isQuote && (
                <a
                    href={enterpriseWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-6 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 font-bold text-white flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(255,0,255,0.4)] transition-all duration-300"
                >
                    <CalendarClock className="w-4 h-4" />
                    Agendar reunión
                </a>
            )}
        </div>
    );
}

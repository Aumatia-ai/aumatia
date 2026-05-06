"use client";

import { useEcosystemContext } from "./EcosystemContext";
import { formatCurrency, builderModules } from "@/lib/builderData";
import { ArrowRight, Sparkles, Monitor, Activity, ShoppingBag, Globe, BotMessageSquare, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const IconMap: Record<string, any> = {
    "smart-pos": Monitor,
    "finanzas": Activity,
    "marketplace": ShoppingBag,
    "ecommerce": Globe,
    "agentes-ai": BotMessageSquare
};

export default function StickySummaryBar() {
    const { 
        currency, 
        totalItems, 
        discountPercentage, 
        baseMonthlyCOP, 
        baseMonthlyUSD, 
        finalMonthlyCOP, 
        finalMonthlyUSD, 
        totalTodayCOP, 
        totalTodayUSD,
        selectedModules,
        isOSSelected,
        osLevel
    } = useEcosystemContext();

    // Build WhatsApp message with selected products
    const buildWhatsAppUrl = () => {
        const productNames: string[] = selectedModules.map(id => 
            builderModules.find(m => m.id === id)?.title || id
        );
        if (isOSSelected) {
            productNames.push(`Contactia (${osLevel.charAt(0).toUpperCase() + osLevel.slice(1)})`);
        }
        const productList = productNames.join(', ');
        const message = `Hola Aumatia, estoy interesad@ en adquirir ${productList}. Me gustaría recibir más información.`;
        return `https://wa.me/573118905418?text=${encodeURIComponent(message)}`;
    };

    if (totalItems === 0) return null;

    const baseMonthly = currency === 'COP' ? baseMonthlyCOP : baseMonthlyUSD;
    const finalMonthly = currency === 'COP' ? finalMonthlyCOP : finalMonthlyUSD;
    const totalToday = currency === 'COP' ? totalTodayCOP : totalTodayUSD;
    const discountAmount = baseMonthly - finalMonthly;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pb-6 md:pb-8 animate-in slide-in-from-bottom-full duration-500 fade-in">
            <div className="container mx-auto max-w-6xl">
                <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-3xl p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    
                    {/* Animated background gradient based on items count */}
                    <div 
                        className={cn(
                            "absolute inset-0 opacity-20 transition-all duration-1000 -z-10",
                            discountPercentage > 0 ? "bg-gradient-to-r from-emerald-500/40 via-cyan-500/20 to-fuchsia-500/40" : "bg-gradient-to-r from-slate-800 to-black"
                        )} 
                    />

                    {/* LEFT: Selected Modules Icons */}
                    <div className="flex-1 w-full">
                        <div className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">
                            Tu Ecosistema ({totalItems})
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selectedModules.map(id => {
                                const Icon = IconMap[id];
                                return (
                                    <div key={id} className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 relative group">
                                        {Icon && <Icon className="w-5 h-5 text-white/80" />}
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/20">
                                            {builderModules.find(m => m.id === id)?.title}
                                        </div>
                                    </div>
                                );
                            })}
                            {isOSSelected && (
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.4)] relative group">
                                    <Cpu className="w-5 h-5 text-white" />
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-cyan-500">
                                        Contactia
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CENTER: Calculations */}
                    <div className="flex-1 w-full flex flex-col items-start lg:items-center justify-center border-y lg:border-y-0 lg:border-x border-white/10 py-4 lg:py-0 px-0 lg:px-8">
                        {discountPercentage > 0 ? (
                            <div className="flex items-center gap-2 mb-1 w-full justify-between lg:justify-center">
                                <span className="text-white/40 line-through text-sm">Base: {formatCurrency(baseMonthly, currency)}</span>
                                <span className="font-bold text-emerald-400 text-sm bg-emerald-400/10 px-2 py-0.5 rounded flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    Ahorro -{discountPercentage}% ({formatCurrency(discountAmount, currency)})
                                </span>
                            </div>
                        ) : (
                            <div className="text-white/40 text-sm mb-1">Elige 2+ módulos para activar descuentos</div>
                        )}
                        
                        <div className="flex items-baseline gap-2">
                            <span className="text-xs font-bold text-white/50 uppercase">Mensualidad:</span>
                            <span className="text-3xl lg:text-4xl font-black text-white">{formatCurrency(finalMonthly, currency)}</span>
                            <span className="text-white/50 text-sm">/mes</span>
                        </div>
                    </div>

                    {/* RIGHT: Total Today & CTA */}
                    <div className="flex-1 w-full flex flex-col items-end gap-3 justify-center">
                        <div className="text-right">
                            <span className="text-xs font-bold text-white/50 block mb-1 uppercase">Pago Inicial (Hoy):</span>
                            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
                                {formatCurrency(totalToday, currency)}
                            </div>
                            <span className="text-[10px] text-white/30 block mt-0.5">Mensualidad Mes 1 + Setups</span>
                        </div>
                        
                        <a 
                            href={buildWhatsAppUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 font-bold text-white flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(255,0,255,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Finalizar Compra
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}

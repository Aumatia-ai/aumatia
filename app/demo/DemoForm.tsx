"use client";

import { useState } from "react";
import { MessageCircle, Monitor, Activity, ShoppingBag, Globe, BotMessageSquare, Headset } from "lucide-react";
import { cn } from "@/lib/utils";

const solutions = [
    { id: "smart-pos", label: "Smart POS", icon: Monitor, color: "text-blue-400", border: "border-blue-500", bg: "bg-blue-500/10" },
    { id: "finanzas", label: "Finanzas & BI", icon: Activity, color: "text-indigo-400", border: "border-indigo-500", bg: "bg-indigo-500/10" },
    { id: "marketplace", label: "Marketplace", icon: ShoppingBag, color: "text-emerald-400", border: "border-emerald-500", bg: "bg-emerald-500/10" },
    { id: "ecommerce", label: "E-commerce", icon: Globe, color: "text-pink-400", border: "border-pink-500", bg: "bg-pink-500/10" },
    { id: "agentes-ai", label: "Agentes AI", icon: BotMessageSquare, color: "text-cyan-400", border: "border-cyan-500", bg: "bg-cyan-500/10" },
    { id: "contactia", label: "Contactia (CRM)", icon: Headset, color: "text-fuchsia-400", border: "border-fuchsia-500", bg: "bg-fuchsia-500/10" },
];

export default function DemoForm() {
    const [selected, setSelected] = useState<string[]>([]);
    const [nombre, setNombre] = useState("");

    const toggleProduct = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const buildWhatsAppUrl = () => {
        const productNames = selected.map(id => solutions.find(s => s.id === id)?.label).filter(Boolean);
        const productList = productNames.join(", ");
        const greeting = nombre.trim() ? `Hola, soy ${nombre.trim()}. ` : "Hola Aumatia. ";
        const message = `${greeting}Estoy interesad@ en agendar una demo para conocer ${productList}. Me gustaría coordinar una reunión.`;
        return `https://wa.me/573118905418?text=${encodeURIComponent(message)}`;
    };

    const isValid = selected.length > 0;

    return (
        <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl w-full max-w-3xl mx-auto backdrop-blur-sm shadow-2xl relative z-10 overflow-hidden">
            {/* Background decorative glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="space-y-8 relative z-10">

                {/* Nombre (opcional) */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50 flex gap-1 items-center">
                        Tu nombre <span className="text-[10px] opacity-40 ml-1 font-normal">(Opcional)</span>
                    </label>
                    <input 
                        type="text" 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="¿Cómo te llamas?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-medium"
                    />
                </div>

                {/* Product Selector */}
                <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50 flex gap-1">
                        ¿Qué soluciones te interesan? <span className="text-cyan-400 font-black">*</span>
                    </label>
                    <p className="text-white/40 text-sm">Selecciona una o más soluciones para tu demo personalizada.</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                        {solutions.map((sol) => {
                            const Icon = sol.icon;
                            const isSelected = selected.includes(sol.id);
                            return (
                                <button
                                    key={sol.id}
                                    type="button"
                                    onClick={() => toggleProduct(sol.id)}
                                    className={cn(
                                        "flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer group",
                                        isSelected
                                            ? `${sol.bg} ${sol.border} shadow-lg scale-[1.02]`
                                            : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/5"
                                    )}
                                >
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                        isSelected ? `${sol.bg}` : "bg-white/5"
                                    )}>
                                        <Icon className={cn("w-6 h-6 transition-colors", isSelected ? sol.color : "text-white/40 group-hover:text-white/60")} />
                                    </div>
                                    <span className={cn(
                                        "text-sm font-bold text-center transition-colors",
                                        isSelected ? "text-white" : "text-white/60 group-hover:text-white/80"
                                    )}>
                                        {sol.label}
                                    </span>
                                    
                                    {/* Check indicator */}
                                    {isSelected && (
                                        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-black", sol.bg.replace('/10', '/40'))}>
                                            ✓
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Selected summary */}
                {selected.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-white/40 uppercase tracking-widest mr-2">Tu demo incluirá:</span>
                        {selected.map(id => {
                            const sol = solutions.find(s => s.id === id);
                            return sol ? (
                                <span key={id} className={cn("text-xs font-bold px-3 py-1 rounded-full border", sol.border, sol.bg, sol.color)}>
                                    {sol.label}
                                </span>
                            ) : null;
                        })}
                    </div>
                )}

                {/* WhatsApp CTA Button */}
                <div className="pt-2">
                    <a
                        href={isValid ? buildWhatsAppUrl() : undefined}
                        target={isValid ? "_blank" : undefined}
                        rel={isValid ? "noopener noreferrer" : undefined}
                        onClick={(e) => {
                            if (!isValid) {
                                e.preventDefault();
                            }
                        }}
                        className={cn(
                            "w-full py-4 rounded-xl relative group overflow-hidden transition-all duration-300 flex items-center justify-center gap-3",
                            isValid
                                ? "cursor-pointer"
                                : "opacity-40 cursor-not-allowed"
                        )}
                    >
                        <div className={cn(
                            "absolute inset-0 transition-transform duration-300",
                            isValid ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 group-hover:scale-105" : "bg-white/10"
                        )} />
                        
                        <div className="relative flex items-center justify-center gap-3 text-white font-black text-lg">
                            <MessageCircle className="w-5 h-5" />
                            Agendar Demo por WhatsApp
                        </div>
                    </a>
                    <p className="text-[10px] text-center text-white/30 mt-4 uppercase tracking-wider">
                        Serás redirigido a WhatsApp para coordinar tu reunión
                    </p>
                </div>

            </div>
        </div>
    );
}

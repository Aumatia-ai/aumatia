import { Zap, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const osPlans = [
    {
        name: "Starter",
        price: "$49",
        credits: "100",
        description: "Perfecto para comenzar a automatizar tareas básicas.",
        features: ["Copiloto AI", "Envío de Correos Automáticos", "WhatsApp Utility"]
    },
    {
        name: "Growth",
        price: "$150",
        credits: "300",
        description: "Ideal para crecer y escalar tus ventas de manera automática.",
        features: ["Todo lo de Starter", "WhatsApp Marketing", "Llamadas AI de Voz"],
        recommended: true
    },
    {
        name: "Pro/Enterprise",
        price: "$350",
        credits: "800",
        description: "Para empresas que requieren poder absoluto de prospección.",
        features: ["Todo lo de Growth", "Prospección Avanzada de Leads", "Soporte Prioritario"]
    }
];

export default function OSPricingSection() {
    return (
        <section className="mt-32 pt-20 border-t border-white/10 relative">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-40 bg-cyan-500/10 blur-[100px] -z-10" />

            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6">
                    <Zap className="w-4 h-4" />
                    Motor de Automatización
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                    Aumatia OS
                </h2>
                <p className="text-xl text-white/50 max-w-3xl mx-auto mb-8">
                    El cerebro que conecta todo tu ecosistema. Opera a través de un sistema de créditos flexibles 
                    <span className="text-white block mt-2 font-medium">(1 Crédito = $0.50 USD)</span>
                </p>
                <div className="inline-block p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-sm text-white/70">
                        <strong className="text-fuchsia-400">Nota:</strong> Setup único de configuración de flujos Aumatia OS: 
                        <strong className="text-white ml-2">$50 USD</strong>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {osPlans.map((plan, index) => (
                    <div 
                        key={plan.name}
                        className={cn(
                            "relative p-8 rounded-3xl border transition-all duration-300",
                            plan.recommended 
                                ? "bg-gradient-to-b from-black to-slate-900 border-cyan-500/30 shadow-[0_0_40px_rgba(0,240,255,0.1)] -translate-y-2 lg:scale-105 z-10" 
                                : "bg-black/40 border-white/10 hover:border-white/20"
                        )}
                    >
                        {plan.recommended && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-black text-xs font-bold rounded-full border border-cyan-300">
                                Más Popular
                            </div>
                        )}
                        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                        <p className="text-sm text-white/50 min-h-[40px] mb-6">{plan.description}</p>
                        
                        <div className="mb-6 flex items-end gap-2">
                            <span className="text-5xl font-black text-white">{plan.price}</span>
                            <span className="text-white/40 font-medium mb-1">USD/mes</span>
                        </div>
                        
                        <div className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 mb-8 flex justify-between items-center">
                            <span className="text-sm text-white/60">Incluye</span>
                            <span className="text-lg font-bold text-cyan-400">{plan.credits} Créditos</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-fuchsia-500 shrink-0 mt-0.5" />
                                    <span className="text-sm text-white/80">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className={cn(
                            "w-full py-4 rounded-2xl font-bold transition-all duration-300",
                            plan.recommended
                                ? "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                                : "bg-white/10 text-white hover:bg-white/20"
                        )}>
                            Comenzar con {plan.name}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

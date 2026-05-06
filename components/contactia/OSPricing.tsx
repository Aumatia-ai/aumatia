import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
    {
        name: "Starter",
        price: "$49",
        period: "/mes",
        description: "Perfecto para equipos pequeños.",
        features: ["100 Créditos", "Herramientas básicas de IA", "Prospección", "CRM Básico"],
        highlight: false,
        buttonText: "Suscribirse"
    },
    {
        name: "Growth",
        price: "$150",
        period: "/mes",
        description: "El más popular para equipos en crecimiento.",
        features: ["300 Créditos", "Todo lo de Starter", "Funciones Beta", "Soporte Prioritario", "Llamadas AI (VoIP)"],
        highlight: true,
        buttonText: "Obtener Plan"
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "Soluciones a medida para grandes volúmenes.",
        features: ["Acceso a API", "Onboarding dedicado", "Contratos anuales", "Créditos personalizados"],
        highlight: false,
        buttonText: "Agendar Reunión"
    }
];

const buildWhatsAppUrl = (planName: string) => {
    const message = `Hola Aumatia, estoy interesad@ en el plan ${planName} de Contactia. Me gustaría recibir más información.`;
    return `https://wa.me/573118905418?text=${encodeURIComponent(message)}`;
};

export default function OSPricing() {
    return (
        <section id="pricing" className="py-24 px-6 sm:px-12 bg-black/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Planes Integrales</h2>
                    <p className="text-white/60 text-lg">Paga solo por lo que necesitas para crecer tu negocio.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {tiers.map((tier, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "flex flex-col relative p-8 rounded-3xl border transition-all duration-300 h-full",
                                tier.highlight 
                                    ? "bg-white/5 border-neon-blue shadow-[0_0_30px_rgba(0,240,255,0.15)] md:-mt-8 md:mb-8 z-10" 
                                    : "bg-transparent border-white/10"
                            )}
                        >
                            {tier.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-blue text-background px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                    Más Popular
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                                <p className="text-white/60 text-sm h-10">{tier.description}</p>
                            </div>
                            <div className="mb-8 flex items-baseline gap-1">
                                <span className={cn("text-5xl font-extrabold tracking-tight", tier.highlight ? "text-white" : "text-white/80")}>
                                    {tier.price}
                                </span>
                                <span className="text-lg text-white/50">{tier.period}</span>
                            </div>
                            <ul className="mb-10 space-y-4 flex-1">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-white/80">
                                        <Check className="w-5 h-5 text-neon-blue shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto pt-8">
                                <a 
                                    href={buildWhatsAppUrl(tier.name)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "block w-full py-4 rounded-xl text-center font-bold transition-all",
                                        tier.highlight 
                                            ? "bg-neon-blue text-background hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]" 
                                            : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                                    )}
                                >
                                    {tier.buttonText}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


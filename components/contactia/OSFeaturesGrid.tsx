import { Search, Trello, MessageSquare, Bot, CreditCard, BarChart3 } from "lucide-react";

const features = [
    {
        title: "Motor de Prospección Inteligente",
        description: "Olvídate de comprar bases de datos externas. Buscador nativo de leads B2B.",
        bullets: ["Búsqueda por cargo/industria", "Enriquecimiento de datos", "Importación directa"],
        icon: Search
    },
    {
        title: "Pipeline de Ventas Dinámico",
        description: "Gestión visual tipo Kanban.",
        bullets: ["Vista 360 del Lead", "Etapas personalizables", "Etiquetas Hot/Warm/Cold"],
        icon: Trello
    },
    {
        title: "Centro de Comandos Omnicanal",
        description: "Centraliza interacciones sin cambiar de pestañas.",
        bullets: ["WhatsApp Business API", "Sync con Gmail/Outlook", "Llamadas VoIP"],
        icon: MessageSquare
    },
    {
        title: "Aumatia Copilot (IA)",
        description: "Tu compañero de ventas 24/7.",
        bullets: ["Redacción de correos", "Resúmenes de actividad", "Automatización"],
        icon: Bot
    },
    {
        title: "Sistema de Créditos Flexible",
        description: "Paga solo por lo que usas. Modelo justo.",
        bullets: ["Sin costos ocultos", "Recarga flexible", "Transparencia total"],
        icon: CreditCard
    },
    {
        title: "Dashboard de Rendimiento",
        description: "Métricas en tiempo real.",
        bullets: ["KPIs de equipo", "Seguimiento de conversiones", "Reportes exportables"],
        icon: BarChart3
    }
];

export default function OSFeaturesGrid() {
    return (
        <section className="py-20 px-6 sm:px-12 bg-black/40">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-neon-blue/50 transition-all duration-300 group"
                        >
                            <div className="h-12 w-12 rounded-lg bg-neon-blue/10 flex items-center justify-center border border-neon-blue/20 mb-6 group-hover:bg-neon-blue/20 transition-colors">
                                <feature.icon className="w-6 h-6 text-neon-blue" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-white/70 mb-6">{feature.description}</p>
                            <ul className="space-y-2">
                                {feature.bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-center text-sm text-white/50">
                                        <div className="w-1.5 h-1.5 rounded-full bg-neon-blue mr-3" />
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

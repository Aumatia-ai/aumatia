import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/TrustFooter";
import ProductPricing from "@/components/pricing/ProductPricing";
import { BotMessageSquare, Globe, Network, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Aumatia Agents - Empleados Digitales 24/7",
    description: "Desarrollamos e integramos Agentes de Inteligencia Artificial para tu WhatsApp, Sitio Web o CRM.",
};

const useCases = [
    {
        title: "Agente WhatsApp",
        description: "Cierra ventas, agenda citas y da soporte técnico directo en WhatsApp Business. Conversaciones naturales que convierten leads en clientes.",
        icon: BotMessageSquare,
        gradient: "from-green-400 to-emerald-600"
    },
    {
        title: "Agente Web",
        description: "Chatbot inteligente entrenado con toda la información de tu empresa e integrado en tu sitio web. Respuestas instantáneas, cero demoras.",
        icon: Globe,
        gradient: "from-blue-400 to-cyan-600"
    },
    {
        title: "Agente CRM",
        description: "Se integra con tus sistemas actuales como HubSpot, Salesforce o Siigo. Automatiza el seguimiento y calificación de leads sin esfuerzo manual.",
        icon: Network,
        gradient: "from-fuchsia-400 to-pink-600"
    }
];

export default function AIAgentsPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-fuchsia-500/30 overflow-x-hidden">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 px-6 min-h-[70vh] flex items-center">
                {/* Background Effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-fuchsia-600/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-fuchsia-900/20 via-black to-black -z-10" />

                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-fuchsia-400 text-sm font-semibold mb-8 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4" />
                        Aumatia AI Agents
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-white">
                        Empleados virtuales que trabajan <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">24/7 para tu negocio</span>.
                    </h1>

                    <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Desarrollamos e integramos Agentes de Inteligencia Artificial para tu WhatsApp, Sitio Web o CRM actual. Atiende clientes, califica leads y agenda citas en piloto automático.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 transform hover:-translate-y-1">
                            Cotizar mi Agente AI
                        </button>
                        <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 font-bold text-lg hover:bg-white/10 transition-colors duration-300">
                            Ver demostraciones
                        </button>
                    </div>
                </div>
            </section>

            {/* USE CASES SECTION */}
            <section className="py-24 px-6 relative border-t border-white/5 bg-gradient-to-b from-black to-slate-950">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold mb-4">¿Dónde puede trabajar tu Agente?</h2>
                        <p className="text-lg text-white/50">Nos adaptamos a los canales donde ya están tus clientes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {useCases.map((useCase, index) => (
                            <div 
                                key={index} 
                                className="group relative bg-black/50 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-500"
                            >
                                {/* Glowing Border Effect on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
                                
                                <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${useCase.gradient} shadow-lg shadow-black/50`}>
                                    <useCase.icon className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4">{useCase.title}</h3>
                                <p className="text-white/60 leading-relaxed font-medium">
                                    {useCase.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING SECTION - REUSED COMPONENT */}
            <div className="border-t border-white/5 relative z-20">
                <ProductPricing producto="agentes-ai" title="Inversión en Inteligencia Artificial" subtitle="Desbloquea el crecimiento escalable. Menos costos operativos, más ventas concretadas." />
            </div>

            <Footer />
        </main>
    );
}

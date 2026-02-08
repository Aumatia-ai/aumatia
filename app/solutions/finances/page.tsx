import { Metadata } from 'next';
import SolutionHero from "@/components/SolutionHero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/TrustFooter";
import { Activity } from "lucide-react";

export const metadata: Metadata = {
    title: "Aumatia Finanzas - Inteligencia de Negocios",
    description: "Control administrativo interno, reportes y KPIs para tu negocio.",
};

export default function FinancesPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-green-500 selection:text-black">
            <Navbar />

            <SolutionHero
                title="Finanzas y KPI's"
                subtitle="Deja de adivinar. Toma decisiones basadas en datos reales de tu operación."
                icon={<Activity className="w-10 h-10 text-white" />}
                gradient="from-green-500 to-emerald-500"
            />

            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold mb-8 text-center">Tu CFO Digital</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { title: "Márgenes Reales", desc: "Calcula la utilidad exacta descontando impuestos y comisiones." },
                            { title: "Flujo de Caja", desc: "Monitorea entradas y salidas diarias en tiempo real." },
                            { title: "Top Productos", desc: "Identifica qué se vende y qué solo ocupa espacio." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                                <h3 className="font-bold text-green-400 mb-2">{item.title}</h3>
                                <p className="text-sm text-white/70">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-8 rounded-2xl border border-green-500/30">
                        <h3 className="text-2xl font-bold mb-4 text-center">Control Administrativo Interno</h3>
                        <p className="text-center text-white/80 max-w-2xl mx-auto mb-8">
                            Organiza tu negocio antes de hablar con el contador. Lleva un control estricto de tu operación diaria.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                <h4 className="font-bold text-white mb-2">Gastos Operativos</h4>
                                <p className="text-sm text-white/60">Registra nómina, arriendos y gastos hormiga.</p>
                            </div>
                            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                <h4 className="font-bold text-white mb-2">Reporte Contador</h4>
                                <p className="text-sm text-white/60">Exporta en un clic el resumen mensual para tu declaración.</p>
                            </div>
                            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                <h4 className="font-bold text-white mb-2">Utilidad Neta</h4>
                                <p className="text-sm text-white/60">Conoce cuánto dinero te queda realmente a fin de mes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

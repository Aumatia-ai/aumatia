import { Metadata } from 'next';
import SolutionHero from "@/components/SolutionHero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/TrustFooter";
import { Code, Check } from "lucide-react";

export const metadata: Metadata = {
    title: "Aumatia Web & E-commerce - Tu Tienda Online",
    description: "Desarrollo web a medida con motor de e-commerce integrado. Sin plantillas genéricas.",
};

export default function WebDevPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-orange-500 selection:text-white">
            <Navbar />

            <SolutionHero
                title="Web & E-commerce"
                subtitle="Más que una tienda online. Un canal de ventas digital diseñado para convertir."
                icon={<Code className="w-10 h-10 text-white" />}
                gradient="from-orange-500 to-red-500"
            />

            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold mb-12 text-center">E-commerce de Alto Rendimiento</h2>

                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-4 text-orange-400">Diseño UI/UX A Medida</h3>
                                <p className="text-white/80 mb-4">
                                    No usamos plantillas aburridas de Wordpress. Diseñamos una experiencia única para tu marca, optimizada para móviles y velocidad.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-500" /> Next.js & React (Tecnología Moderna)</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-500" /> SEO Técnico Incluido</li>
                                </ul>
                            </div>
                            <div className="flex-1 h-64 w-full bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                                <span className="text-white/20 font-mono">Visualization Placeholder</span>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-4 text-orange-400">Centralizado en el Hub</h3>
                                <p className="text-white/80 mb-4">
                                    Crea tus productos en el Marketplace y sincronízalos automáticamente a tu web. Mercado Libre y tu E-commerce, siempre al día.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-500" /> Sync desde Marketplace</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-500" /> Pasarelas: Wompi, Bold, Addi, Sistecredito</li>
                                </ul>
                            </div>
                            <div className="flex-1 h-64 w-full bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                                <span className="text-white/20 font-mono">Sync Visualization Placeholder</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

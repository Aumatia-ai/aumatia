import { Metadata } from 'next';
import SolutionHero from "@/components/SolutionHero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/TrustFooter";
import ProductPricing from "@/components/pricing/ProductPricing";
import { Code, Check } from "lucide-react";
import WebUIVisual from "@/components/web/WebUIVisual";
import WebSyncVisual from "@/components/web/WebSyncVisual";

export const metadata: Metadata = {
    title: "Aumatia Web & E-commerce - Tu Tienda Online de Alto Rendimiento",
    description: "Desarrollo web a medida con motor de e-commerce integrado. Sin plantillas genéricas, optimizado para conversión y velocidad.",
};

export default function WebDevPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-orange-500 selection:text-white">
            <Navbar />

            <SolutionHero
                title="Web & E-commerce"
                subtitle="Más que una tienda online. Un canal de ventas digital diseñado para convertir y escalar."
                icon={<Code className="w-10 h-10 text-white" />}
                gradient="from-orange-500 to-red-500"
            />

            <section className="py-24 px-6 relative overflow-hidden">
                <div className="container mx-auto max-w-5xl">
                    <div className="mb-20 text-center">
                        <span className="text-orange-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Ingeniería Web</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white">E-commerce de Alto Rendimiento</h2>
                    </div>

                    <div className="space-y-32">
                        {/* Section 1: UI/UX */}
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="flex-1 space-y-6">
                                <h3 className="text-3xl font-bold text-orange-400">Diseño UI/UX <br /> Exclusivo</h3>
                                <p className="text-white/60 text-lg leading-relaxed">
                                    En Aumatia no creemos en las plantillas. Construimos arquitecturas robustas sobre **Next.js** y **React**, garantizando que tu tienda cargue en milisegundos y ofrezca una experiencia móvil impecable que convierta visitantes en clientes.
                                </p>
                                <ul className="space-y-4 pt-4">
                                    {[
                                        "Infraestructura Server-Side Rendering (SSR).",
                                        "Optimización Core Web Vitals (SEO Premium).",
                                        "Checkout ultra-rápido de un solo paso."
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-white/80">
                                            <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-orange-500" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex-1 w-full">
                                <WebUIVisual />
                            </div>
                        </div>

                        {/* Section 2: Hub Sync */}
                        <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
                            <div className="flex-1 space-y-6">
                                <h3 className="text-3xl font-bold text-orange-400">Sincronización <br /> Nativa con el Hub</h3>
                                <p className="text-white/60 text-lg leading-relaxed">
                                    Olvida la duplicidad de tareas. Gestiona tus productos en nuestro Marketplace Hub y observa cómo se sincronizan automáticamente en tu sitio web. Tu inventario y tus ventas, siempre unificados.
                                </p>
                                <ul className="space-y-4 pt-4">
                                    <li className="flex items-center gap-3 text-white/80">
                                        <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-orange-500" />
                                        </div>
                                        Sincronización de stock bidireccional inmediata.
                                    </li>
                                    <li className="flex items-center gap-3 text-white/80">
                                        <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-orange-500" />
                                        </div>
                                        Integración con Wompi, Bold, Addi y Sistecredito.
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1 w-full">
                                <WebSyncVisual />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ProductPricing producto="ecommerce" />

            <Footer />
        </main>
    );
}

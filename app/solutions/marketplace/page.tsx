import { Metadata } from 'next';
import SolutionHero from "@/components/SolutionHero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/TrustFooter";
import ProductPricing from "@/components/pricing/ProductPricing";
import { ShoppingBag, Check } from "lucide-react";

export const metadata: Metadata = {
    title: "Aumatia Marketplace - Centraliza tus ventas",
    description: "Conecta Mercado Libre, Falabella y más. Gestiona precios y stock desde un solo lugar.",
};

export default function MarketplacePage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-purple-500 selection:text-white">
            <Navbar />

            <SolutionHero
                title="Marketplace"
                subtitle="Unifica tu inventario. Publica en Mercado Libre y Falabella sin perder el control."
                icon={<ShoppingBag className="w-10 h-10 text-white" />}
                gradient="from-purple-500 to-pink-500"
            />

            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold mb-8 text-center">Vende en todas partes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors">
                            <h3 className="text-xl font-bold mb-4 text-purple-400">Canales Soportados</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Mercado Libre</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Falabella</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> E-commerce</li>
                            </ul>
                        </div>
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors">
                            <h3 className="text-xl font-bold mb-4 text-purple-400">Automatización</h3>
                            <p className="text-white/70 mb-4">
                                Olvídate de cancelar ventas por falta de stock. Cuando vendes en tienda física, el stock baja automáticamente en Mercado Libre.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Sync de Stock en tiempo real</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Ajuste de Precios masivo</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <ProductPricing producto="marketplace" />

            <Footer />
        </main>
    );
}

import { Metadata } from 'next';
import SolutionHero from "@/components/SolutionHero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/TrustFooter";
import AddOnsSection from "@/components/AddOnsSection";
import { Monitor, Check } from "lucide-react";

export const metadata: Metadata = {
    title: "Aumatia Smart POS - El corazón de tu negocio",
    description: "Facturación electrónica DIAN ilimitada, control de inventario local y gestión de empleados.",
};

export default function SmartPOSPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon-blue selection:text-black">
            <Navbar />

            <SolutionHero
                title="Smart POS"
                subtitle="El sistema de punto de venta que crece contigo. Factura, controla y vende sin complicaciones."
                icon={<Monitor className="w-10 h-10 text-white" />}
                gradient="from-blue-500 to-cyan-500"
            />

            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold mb-8 text-center">Todo lo que necesitas para operar</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold mb-4 text-neon-blue">Operación Diaria</h3>
                            <ul className="space-y-3">
                                {["Facturación Rápida", "Múltiples Cajeros", "Cierre de Caja Ciego", "Soporte de Lector de Barras"].map(item => (
                                    <li key={item} className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> {item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold mb-4 text-neon-blue">Cumplimiento & Control</h3>
                            <ul className="space-y-3">
                                {["Facturación Electrónica DIAN", "Inventario en Tiempo Real", "Reportes de Ventas", "Almacenamiento en Nube"].map(item => (
                                    <li key={item} className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> {item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <AddOnsSection />

            <Footer />
        </main>
    );
}

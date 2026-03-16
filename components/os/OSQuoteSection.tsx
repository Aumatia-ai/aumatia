import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

export default function OSQuoteSection() {
    return (
        <section className="py-32 px-6 sm:px-12 text-center border-b border-white/10">
            <div className="max-w-4xl mx-auto">
                <div
                    className="mb-16"
                >
                    <p className="text-3xl md:text-4xl lg:text-5xl italic font-light text-white/90 leading-snug">
                        "Aumatia OS fusiona Bases de Datos B2B, Gestión de CRM y Telefonía VoIP en una sola plataforma económica."
                    </p>
                </div>
                
                <div>
                    <Link 
                        href="/precios-os" 
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white hover:border-neon-blue hover:text-neon-blue transition-all duration-300 group"
                    >
                        <Calculator className="w-5 h-5" />
                        <span className="font-semibold text-lg">Ver calculadora de costos por País</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

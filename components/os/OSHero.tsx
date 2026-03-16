import Link from "next/link";

export default function OSHero() {
    return (
        <section className="pt-32 pb-20 px-6 sm:px-12 flex flex-col items-center justify-center text-center">
            <div
                className="max-w-4xl mx-auto space-y-6"
            >
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                    Aumatia OS
                </h1>
                <p className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-purple-400 mb-8">
                    El Sistema Operativo de Crecimiento para Equipos de Ventas Modernos.
                </p>
                <p className="text-lg text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
                    Aumatia OS no es solo un CRM; es una plataforma de aceleración de ventas impulsada por IA.
                    Unifica la prospección, la gestión de clientes y la comunicación omnicanal en una sola interfaz,
                    eliminando la necesidad de pagar por múltiples herramientas (como Scrapers, CRM y Telefonía por separado).
                </p>
                <div className="flex justify-center pt-4">
                    <Link href="#pricing" className="inline-block px-8 py-4 rounded-full bg-neon-blue text-background font-bold text-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all duration-300 transform hover:scale-105">
                        Empezar ahora →
                    </Link>
                </div>
            </div>
        </section>
    );
}

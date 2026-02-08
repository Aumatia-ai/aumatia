import Navbar from "@/components/Navbar";
import Footer from "@/components/TrustFooter";

export default function TermsConditions() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-32 pb-20">
            <Navbar />
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Términos y Condiciones de Uso</h1>
                <div className="prose prose-invert max-w-none space-y-8">

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-neon-blue">1. Aceptación y Capacidad Legal</h2>
                        <p className="text-white/70">
                            Al contratar Aumatia, usted declara ser mayor de edad y tener capacidad legal para representar a su comercio en Colombia.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-neon-blue">2. Naturaleza del Servicio</h2>
                        <p className="text-white/70">
                            Aumatia es una herramienta de &quot;Software as a Service&quot; (SaaS). NO somos una entidad financiera ni prestamos servicios contables directos. La responsabilidad tributaria final recae sobre el Usuario.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-neon-blue">3. Limitación de Responsabilidad (SLA)</h2>
                        <p className="text-white/70 mb-4">
                            Garantizamos un uptime del 99%. Sin embargo, Aumatia NO se hace responsable por:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-white/70">
                            <li>Caídas de la plataforma de la DIAN.</li>
                            <li>Cambios en APIs de terceros (Mercado Libre/Falabella).</li>
                            <li>Errores en la digitación de precios por parte del usuario.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-neon-blue">4. Suspensión por Mora</h2>
                        <p className="text-white/70">
                            El servicio es prepago. El no pago de la mensualidad generará suspensión automática del acceso a los 5 días calendario.
                        </p>
                    </section>

                </div>
            </div>
            <Footer />
        </main>
    );
}

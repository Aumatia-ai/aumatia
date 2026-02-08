import Navbar from "@/components/Navbar";
import Footer from "@/components/TrustFooter";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-32 pb-20">
            <Navbar />
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Política de Tratamiento de Datos Personales (Ley 1581 de 2012)</h1>
                <div className="prose prose-invert max-w-none space-y-8">

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-neon-blue">1. Responsable del Tratamiento</h2>
                        <p className="text-white/70">
                            Aumatia POS (en adelante &quot;La Empresa&quot;). Domicilio: Colombia. Contacto: soporte@aumatia.com.co.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-neon-blue">2. Finalidad de la Recolección</h2>
                        <p className="text-white/70 mb-4">
                            De conformidad con el Decreto 1377 de 2013, sus datos serán utilizados para:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-white/70">
                            <li>Prestación del servicio SaaS contratado.</li>
                            <li>Emisión de facturación electrónica ante la DIAN.</li>
                            <li>Sincronización de inventarios con terceros (Mercado Libre/Falabella) bajo su autorización expresa.</li>
                            <li>Envío de reportes administrativos.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-neon-blue">3. Derechos del Titular</h2>
                        <p className="text-white/70">
                            Como titular, tiene derecho a: Conocer, actualizar y rectificar sus datos; solicitar prueba de la autorización; y presentar quejas ante la Superintendencia de Industria y Comercio (SIC).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-neon-blue">4. Seguridad y Transferencia</h2>
                        <p className="text-white/70">
                            Aumatia implementa protocolos SSL/TLS. No vendemos ni alquilamos bases de datos. La transferencia a servidores en la nube (AWS/GCP) se realiza bajo estándares de seguridad vigentes.
                        </p>
                    </section>

                </div>
            </div>
            <Footer />
        </main>
    );
}

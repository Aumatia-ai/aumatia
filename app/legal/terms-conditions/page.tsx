export default function TermsConditions() {
    return (
        <div className="container mx-auto px-6 py-32 max-w-4xl prose prose-invert">
            <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                TÉRMINOS Y CONDICIONES DE USO – AUMATIA OS
            </h1>
            <p className="text-muted-foreground mb-12">Última actualización: 21 de marzo de 2026</p>

            <p className="text-white/80 mb-6 leading-relaxed">
                Bienvenido a Aumatia ("Aumatia", "nosotros", "nuestro"). Los presentes Términos y Condiciones (el "Contrato") regulan el acceso y uso de la plataforma Aumatia OS, incluyendo sus aplicaciones web, terminales de punto de venta (Smart POS), tiendas de e-commerce creadas en nuestro ecosistema, Agentes de Inteligencia Artificial (IA) y cualquier API o integración asociada (en adelante, los "Servicios").
            </p>
            <p className="text-white/80 mb-6 leading-relaxed">
                Al registrarse, acceder o utilizar nuestros Servicios, el Cliente (persona natural o jurídica) acepta estar legalmente vinculado por este Contrato. Si no está de acuerdo, no debe utilizar los Servicios.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Naturaleza del Servicio y Licencia B2B</h2>
            <p className="text-white/80 mb-4 leading-relaxed">
                Aumatia es un ecosistema tecnológico B2B (Business-to-Business) diseñado para sincronizar operaciones comerciales, inventarios, facturación y automatizar comunicaciones.
            </p>
            <ul className="list-disc pl-6 text-white/80 mb-6 space-y-2">
                <li><strong>Licencia:</strong> Otorgamos al Cliente una licencia limitada, no exclusiva, intransferible y revocable para acceder y usar los Servicios según el plan de suscripción contratado, exclusivamente para sus operaciones comerciales internas.</li>
                <li><strong>Restricciones:</strong> El Cliente no podrá revender, sublicenciar, realizar ingeniería inversa, ni usar la plataforma para crear un producto competitivo.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Cuentas y Responsabilidad de Acceso</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                El Cliente es enteramente responsable de mantener la confidencialidad de sus credenciales de acceso. Cualquier actividad, venta, configuración de impuestos (ej. IVA/Impoconsumo), o facturación emitida a través del Smart POS o el entorno web bajo su cuenta, se presumirá hecha por el Cliente. Aumatia no será responsable por fraudes internos, robos de dispositivos POS ni suplantaciones de identidad dentro del personal del Cliente.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Condiciones de Pagos y Facturación</h2>
            <ul className="list-disc pl-6 text-white/80 mb-6 space-y-2">
                <li><strong>Suscripciones:</strong> Los Servicios se facturan de forma recurrente (mensual o anual) según el plan elegido. El Cliente autoriza el cobro automático a través de los métodos de pago registrados.</li>
                <li><strong>Suspensión por no pago:</strong> Aumatia se reserva el derecho de suspender temporal o definitivamente el acceso al ecosistema (incluyendo POS, E-commerce y Agentes IA) si el pago presenta un retraso superior a tres (3) días calendario.</li>
                <li><strong>Políticas de Reembolso:</strong> Dada la naturaleza del servicio SaaS (Software as a Service), los pagos no son reembolsables, salvo disposición contraria exigida por el Estatuto del Consumidor de Colombia (Ley 1480 de 2011) frente al Derecho de Retracto, el cual solo aplica dentro de los primeros 5 días hábiles tras la compra inicial, siempre que no se haya comenzado a ejecutar el servicio ni se hayan aprovisionado las integraciones (ej. hardware POS o números de WhatsApp).</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Integraciones con Terceros (Marketplaces, DIAN, Meta, Siigo)</h2>
            <p className="text-white/80 mb-4 leading-relaxed">
                Aumatia facilita la integración con plataformas externas como Mercado Libre, VTEX, Falabella, proveedores contables (Siigo), la DIAN y Meta (WhatsApp API).
            </p>
            <ul className="list-disc pl-6 text-white/80 mb-6 space-y-2">
                <li><strong>Dependencia de Terceros:</strong> Aumatia hace sus mejores esfuerzos para mantener estas conexiones activas; sin embargo, no garantiza la disponibilidad ininterrumpida de estas API de terceros. Aumatia no es responsable por caídas de servicio, cambios en políticas, modificaciones de algoritmos o suspensión de cuentas impuestas por estos terceros (ej. caídas del portal de la DIAN o bloqueos de WhatsApp por Meta).</li>
                <li><strong>Autorización de Datos:</strong> Al conectar una integración, el Cliente autoriza a Aumatia a transmitir y recibir datos de estas plataformas en su nombre.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Uso de Agentes de IA y Canales de Mensajería (WhatsApp)</h2>
            <p className="text-white/80 mb-4">Al utilizar los Agentes de Inteligencia Artificial de Aumatia para interactuar con sus consumidores finales a través de WhatsApp, Webchat u otros canales, el Cliente acepta que:</p>
            <ul className="list-disc pl-6 text-white/80 mb-6 space-y-2">
                <li><strong>Cumplimiento de Políticas de Meta:</strong> El Cliente debe cumplir estrictamente con las Políticas de Comercio y WhatsApp Business establecidas por Meta.</li>
                <li><strong>Prohibición de Spam:</strong> Está estrictamente prohibido usar los Agentes IA para enviar comunicaciones no deseadas, masivas sin consentimiento (spam), o contenido ilegal.</li>
                <li><strong>Responsabilidad del Contenido:</strong> El Cliente es el único responsable legal por los mensajes enviados, las ofertas generadas y las respuestas dadas por la IA en su representación. Aumatia actúa solo como un canal tecnológico ("Encargado" del tratamiento de datos). Si Meta bloquea el número del Cliente por malas prácticas, Aumatia no asumirá responsabilidad ni otorgará reembolsos.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Tiendas E-commerce y Consumidores Finales</h2>
            <p className="text-white/80 mb-4">Cuando el Cliente utiliza Aumatia para crear y gestionar su propia tienda e-commerce:</p>
            <ul className="list-disc pl-6 text-white/80 mb-6 space-y-2">
                <li>El Cliente es el único responsable de cumplir con las leyes de protección al consumidor aplicables frente a sus compradores (tiempos de envío, garantías, derecho de retracto y reversión de pagos).</li>
                <li>Aumatia provee la tecnología, pero no hace parte de la relación de consumo ni del contrato de compraventa entre el Cliente y su comprador final.</li>
                <li>El Cliente está obligado a publicar sus propios "Términos y Condiciones" y "Políticas de Privacidad" en su tienda e-commerce.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Propiedad Intelectual y Datos</h2>
            <ul className="list-disc pl-6 text-white/80 mb-6 space-y-2">
                <li><strong>De Aumatia:</strong> Todo el código fuente, diseño, bases de datos de arquitectura, algoritmos, prompts de IA y la marca Aumatia son propiedad exclusiva de Aumatia.</li>
                <li><strong>Del Cliente:</strong> El Cliente conserva todos los derechos sobre la información de su catálogo, precios, bases de datos de sus clientes y registros transaccionales ("Datos del Cliente"). El Cliente nos otorga una licencia temporal para alojar y procesar esta información con el fin de prestarle el servicio.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Nivel de Servicio (SLA) y Limitación de Responsabilidad</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                Aumatia se proporciona "tal cual" (As is). Aunque apuntamos a un uptime superior al 99.5%, no garantizamos que el servicio estará libre de errores o interrupciones.
                <br /><br />
                En la máxima medida permitida por la ley colombiana, la responsabilidad total de Aumatia por cualquier reclamo derivado de este contrato (por lucro cesante, pérdida de datos o ventas fallidas) estará estrictamente limitada al equivalente del monto pagado por el Cliente a Aumatia en los últimos tres (3) meses de servicio.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Terminación</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                El Cliente puede cancelar su suscripción en cualquier momento desde su panel de facturación; la cancelación será efectiva al final del ciclo de facturación actual. Aumatia podrá terminar o suspender inmediatamente este Contrato si el Cliente infringe la ley, realiza actividades fraudulentas, o viola las políticas de uso aceptable.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Ley Aplicable y Jurisdicción</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                Estos Términos y Condiciones se rigen e interpretan bajo las leyes de la República de Colombia. Cualquier controversia derivada de este contrato será sometida a los jueces competentes en la ciudad de Bogotá D.C.
            </p>
        </div>
    );
}

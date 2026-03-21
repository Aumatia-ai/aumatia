export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-6 py-32 max-w-4xl max-h-full prose prose-invert">
            <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                POLÍTICA DE PRIVACIDAD Y TRATAMIENTO DE DATOS PERSONALES
            </h1>
            <p className="text-muted-foreground mb-12">Última actualización: 21 de marzo de 2026</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Marco Legal y Alcance</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                La presente política se rige bajo la Constitución Política de Colombia, la Ley Estatutaria 1581 de 2012 y sus decretos reglamentarios. Asimismo, con vocación internacional, Aumatia adopta los principios del Reglamento General de Protección de Datos (RGPD) de la Unión Europea (Reglamento UE 2016/679) para garantizar los más altos estándares globales de privacidad, transparencia y seguridad en el manejo de la información.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Roles en el Tratamiento de Datos</h2>
            <p className="text-white/80 mb-4 leading-relaxed">
                Dado el carácter modular y omnicanal de Aumatia OS, actuamos en dos calidades distintas:
            </p>
            <ul className="list-disc pl-6 text-white/80 mb-6 space-y-2">
                <li><strong>Como RESPONSABLE del Tratamiento:</strong> Cuando recolectamos datos directamente de los comercios, empresas y usuarios que se suscriben a nuestros planes (Smart POS, Web, Finanzas, etc.) para la prestación, facturación y soporte del servicio.</li>
                <li><strong>Como ENCARGADO del Tratamiento:</strong> Cuando procesamos datos de los consumidores finales (clientes del comercio) a través de nuestros sistemas (Agentes AI en WhatsApp, transacciones en POS, sincronización con Mercado Libre, Falabella, VTEX). En este escenario, el comercio es el Responsable legal y garantiza haber obtenido el consentimiento previo de sus consumidores. Aumatia procesa estos datos únicamente bajo las instrucciones del comercio.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Tipos de Datos Recopilados</h2>
            <ul className="list-disc pl-6 text-white/80 mb-6 space-y-2">
                <li><strong>Datos de Suscriptores (Comercios):</strong> Nombre legal, NIT, información bancaria y tributaria (para integración DIAN/Siigo), correos electrónicos, teléfonos y credenciales de acceso de usuarios administradores.</li>
                <li><strong>Datos de Consumidores Finales (procesados como Encargado):</strong> Nombres, direcciones de envío, historial de compras, números de teléfono (para WhatsApp AI), correos electrónicos y datos transaccionales capturados en Smart POS, Web o Marketplaces conectados.</li>
                <li><strong>Datos Técnicos y de Navegación:</strong> Direcciones IP, cookies técnicas, logs del sistema (sincronización en vivo) y métricas de uso de la plataforma.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Finalidad del Tratamiento</h2>
            <p className="text-white/80 mb-4">Los datos son procesados exclusivamente para:</p>
            <ul className="list-disc pl-6 text-white/80 mb-6 space-y-2">
                <li><strong>Operación del Ecosistema Aumatia OS:</strong> Sincronización de inventarios, gestión de ventas omnicanal y operación del Smart POS.</li>
                <li><strong>Automatización e Inteligencia Artificial:</strong> Operación de los Agentes AI para interactuar vía WhatsApp o Web. Los datos conversacionales se procesan para ejecutar la venta o soporte, y se anonimizan estrictamente antes de cualquier uso para mejora interna de modelos.</li>
                <li><strong>Integraciones Legales y Contables:</strong> Transmisión de datos hacia entidades gubernamentales (DIAN) o plataformas contables (Siigo) habilitadas por el usuario.</li>
                <li><strong>Sincronización de Marketplaces:</strong> Intercambio de datos transaccionales con plataformas de terceros (Mercado Libre, Falabella, VTEX) a solicitud del usuario.</li>
                <li><strong>Seguridad:</strong> Monitoreo del ecosistema para prevenir fraudes e interrupciones del servicio (latencia &lt; 1.5s).</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Tratamiento por Inteligencia Artificial (Cumplimiento Internacional)</h2>
            <p className="text-white/80 mb-4">Para cumplir con normativas internacionales de IA y privacidad de datos:</p>
            <ul className="list-disc pl-6 text-white/80 mb-6 space-y-2">
                <li><strong>Transparencia:</strong> Los Agentes AI de Aumatia se identifican como sistemas automatizados al interactuar con los consumidores.</li>
                <li><strong>No uso para entrenamiento de terceros:</strong> Los datos personales o comerciales confidenciales introducidos en el entorno de Aumatia no se venden ni se comparten con proveedores de modelos fundacionales (ej. OpenAI, Anthropic) para el entrenamiento de sus redes públicas. Los datos se envían vía API bajo acuerdos de estricta confidencialidad (Zero Data Retention API policies).</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Transferencias y Transmisiones Internacionales</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                Para garantizar una infraestructura robusta y de alta disponibilidad, Aumatia utiliza servidores en la nube (ej. AWS, GCP) y proveedores de infraestructura ubicados fuera de Colombia. Al aceptar esta política, el titular autoriza expresamente esta transferencia internacional. Aumatia garantiza que dichos servidores operan bajo estándares de seguridad internacionales (ISO 27001) y protocolos de encriptación AES-256.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Derechos de los Titulares (ARCO y RGPD)</h2>
            <p className="text-white/80 mb-4">Todo titular de la información tiene derecho a:</p>
            <ul className="list-disc pl-6 text-white/80 mb-6 space-y-2">
                <li><strong>Conocer, Actualizar y Rectificar</strong> sus datos personales (Colombia).</li>
                <li><strong>Suprimir/Cancelar</strong> los datos o revocar la autorización, siempre que no exista un deber legal o contractual que lo impida (ej. registros contables obligatorios por la DIAN).</li>
                <li><strong>Derecho a la Portabilidad (RGPD):</strong> Recibir sus datos en un formato estructurado y de lectura mecánica.</li>
                <li><strong>Derecho al Olvido y Limitación del Tratamiento (RGPD):</strong> Solicitar el cese del uso de sus datos para fines específicos sin afectar la prestación de otros servicios.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Seguridad de la Información</h2>
            <p className="text-white/80 mb-4">Aumatia implementa medidas técnicas, humanas y administrativas para evitar la adulteración, pérdida o acceso no autorizado. Esto incluye:</p>
            <ul className="list-disc pl-6 text-white/80 mb-6 space-y-2">
                <li>Sincronización segura mediante encriptación AES-256.</li>
                <li>Control de acceso basado en roles para los usuarios de Aumatia OS.</li>
                <li>Protocolos TLS/SSL para el tránsito de datos entre plataformas (POS, E-commerce, Meta, Marketplaces).</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Procedimiento Peticiones, Quejas y Reclamos (PQR)</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                Para ejercer cualquier derecho, el titular debe enviar una solicitud formal a <a href="mailto:admin@aumatia.com.co" className="text-neon-blue hover:underline">admin@aumatia.com.co</a> adjuntando una copia de su documento de identidad. Aumatia responderá a las peticiones en un término máximo de diez (10) días hábiles (para consultas) y quince (15) días hábiles (para reclamos y solicitudes de supresión), conforme a la Ley 1581 de 2012.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Uso de Cookies</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                El ecosistema web de Aumatia utiliza cookies estrictamente necesarias para el funcionamiento del "Cerebro Central", mantener sesiones iniciadas en el POS y sincronizar el carrito de compras. Las cookies analíticas o de marketing requieren consentimiento explícito del visitante mediante un banner de cookies al ingresar al sitio (Opt-in).
            </p>
        </div>
    );
}

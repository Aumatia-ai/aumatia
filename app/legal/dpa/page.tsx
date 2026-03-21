export default function DPA() {
    return (
        <div className="container mx-auto px-6 py-32 max-w-4xl prose prose-invert">
            <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                RESUMEN DEL ACUERDO DE PROCESAMIENTO DE DATOS (DPA)
            </h1>
            <p className="text-white/60 mb-12 italic">Nota: Este es un resumen público aplicable a todos los comercios que usan Aumatia. En contratos Enterprise, se firma un DPA más extenso como anexo.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Objeto y Roles</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                Este Acuerdo de Procesamiento de Datos rige el tratamiento de la información de los consumidores finales que el Cliente (El Comercio) recolecta a través del ecosistema de Aumatia (Agentes de WhatsApp, POS, E-commerce). Bajo la Ley 1581 de 2012 y el RGPD, el Cliente actúa como Responsable de los datos, y Aumatia actúa exclusivamente como Encargado del tratamiento.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Deberes del Cliente (Responsable)</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                El Cliente garantiza que tiene el consentimiento libre, previo e informado de sus consumidores finales para recopilar sus datos personales y contactarlos a través de canales como WhatsApp y correo electrónico. El Cliente exime de toda responsabilidad a Aumatia ante quejas de consumidores, multas de la Superintendencia de Industria y Comercio (SIC), o sanciones de plataformas (Meta) derivadas de bases de datos ilegítimas o envío de mensajes no solicitados.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Deberes de Aumatia (Encargado)</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                Aumatia se compromete a procesar los datos de los consumidores finales única y exclusivamente siguiendo las instrucciones del Cliente (ej. para procesar un pago o responder un mensaje vía IA). Aumatia implementará medidas de seguridad técnicas avanzadas (cifrado AES-256) y no utilizará las bases de datos de los clientes para beneficio propio, venta a terceros, ni para el entrenamiento de modelos de inteligencia artificial públicos ajenos al propio ecosistema del comercio.
            </p>
        </div>
    );
}

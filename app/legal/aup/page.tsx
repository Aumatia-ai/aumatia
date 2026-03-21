export default function AUPPolicy() {
    return (
        <div className="container mx-auto px-6 py-32 max-w-4xl prose prose-invert">
            <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                POLÍTICA DE USO ACEPTABLE (AUP)
            </h1>
            <p className="text-muted-foreground mb-12">Última actualización: 21 de marzo de 2026</p>

            <p className="text-white/80 mb-6 leading-relaxed">
                Esta Política de Uso Aceptable (AUP) establece las normas de conducta obligatorias para todos los clientes, usuarios y terceros que accedan a los servicios de Aumatia, incluyendo nuestro software (SaaS), agentes de Inteligencia Artificial (IA), integraciones de API (WhatsApp, DIAN, Marketplaces) y terminales POS. El uso de nuestros servicios implica la aceptación incondicional de esta política.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Usos Prohibidos</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                Está estrictamente prohibido utilizar el ecosistema de Aumatia para crear, transmitir o alojar contenido que sea ilegal, difamatorio, fraudulento, o que infrinja los derechos de propiedad intelectual de terceros. Los usuarios no podrán utilizar nuestros Agentes de IA para generar desinformación deliberada, suplantar identidades, o eludir los filtros de seguridad de plataformas como Meta (WhatsApp) o OpenAI.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Abuso Tecnológico y Spam</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                Los clientes no deben realizar acciones que sobrecarguen nuestra infraestructura de servidores, como el envío masivo de solicitudes automatizadas no autorizadas (ataques DDoS o scraping excesivo). Queda prohibido el uso de nuestras integraciones de mensajería (WhatsApp, SMS, Email) para enviar correos no deseados (spam), promociones masivas sin consentimiento previo (Opt-in) o cualquier actividad que viole las Políticas de Comercio y WhatsApp Business de Meta.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Consecuencias del Incumplimiento</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                Aumatia se reserva el derecho de auditar el uso de la plataforma mediante herramientas automatizadas para garantizar el cumplimiento de esta AUP. En caso de detectar una infracción, Aumatia podrá, a su entera discreción y sin previo aviso, suspender temporalmente la cuenta, eliminar el contenido infractor o cancelar definitivamente el servicio sin derecho a reembolso.
            </p>

        </div>
    );
}

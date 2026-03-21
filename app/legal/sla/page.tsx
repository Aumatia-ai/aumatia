export default function SLAPolicy() {
    return (
        <div className="container mx-auto px-6 py-32 max-w-4xl prose prose-invert">
            <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                ACUERDO DE NIVEL DE SERVICIO (SLA)
            </h1>
            <p className="text-muted-foreground mb-12">Última actualización: 21 de marzo de 2026</p>

            <p className="text-white/80 mb-6 leading-relaxed">
                Este Acuerdo de Nivel de Servicio (SLA) define el compromiso técnico de Aumatia respecto a la disponibilidad y rendimiento de nuestra plataforma en la nube (Aumatia OS) para clientes con suscripciones de pago.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Compromiso de Disponibilidad (Uptime)</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                Aumatia garantiza un nivel de disponibilidad mensual del sistema (Uptime) del 99.5% para sus servicios core, incluyendo el acceso al panel web, la operación de los terminales POS conectados y la base de datos de inventario. El tiempo de inactividad se calcula restando el porcentaje de minutos inactivos del total de minutos del mes, excluyendo los mantenimientos programados notificados con al menos 48 horas de anticipación.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Exclusiones del SLA</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                El compromiso de disponibilidad no aplica a interrupciones causadas por factores ajenos al control razonable de Aumatia. Esto incluye caídas en los servicios de terceros integrados (como fallas en los servidores de la DIAN para facturación electrónica, caídas globales de la API de WhatsApp/Meta, o problemas de conexión en Mercado Libre), así como fallas en el hardware o en el proveedor de internet local del cliente.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Créditos de Servicio</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
                Si Aumatia no logra cumplir con el Uptime del 99.5% en un mes calendario, el cliente afectado tendrá derecho a solicitar un crédito de servicio proporcional al tiempo de inactividad, el cual se aplicará como un descuento en su próxima factura de suscripción. Para reclamar este crédito, el cliente debe abrir un ticket de soporte dentro de los siete (7) días siguientes al mes en el que ocurrió el incidente.
            </p>
        </div>
    );
}

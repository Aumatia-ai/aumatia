export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  category: string;
  author: string;
  readingTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "generar-leads-b2b-ia-colombia",
    title: "Cómo generar leads B2B con IA en Colombia",
    description: "Aprende cómo usar la Inteligencia Artificial para prospectar, perfilar y agendar reuniones automáticamente en el mercado B2B colombiano.",
    date: "2026-04-23",
    category: "Prospección B2B",
    author: "Aumatia Growth Team",
    readingTime: "5 min",
    content: `
      ## El desafío de la prospección en Colombia

      En el entorno B2B actual, el principal cuello de botella no es cerrar las ventas, sino encontrar prospectos calificados. Los procesos manuales de búsqueda en LinkedIn o bases de datos compradas tienen tasas de respuesta cada vez más bajas.

      ### ¿Cómo ayuda la IA?

      La automatización de prospección B2B no significa enviar spam masivo. Se trata de usar agentes de IA para:
      1. **Calificación automática de prospectos:** Analizar sitios web y perfiles para determinar si cumplen con tu ICP (Ideal Customer Profile).
      2. **Conversaciones naturales con IA:** Usar agentes virtuales que envían mensajes ultra-personalizados.
      3. **Programación de reuniones automáticamente:** El agente cierra el flujo enviando un enlace de calendario (Calendly) solo a los prospectos tibios o calientes.

      ### El enfoque de Aumatia
      Con un ecosistema SaaS de prospección inteligente, puedes delegar el 80% del trabajo pesado a la IA, permitiendo que tus cerradores de ventas solo hablen con empresas que ya tienen una intención de compra.
    `
  },
  {
    slug: "automatizacion-ventas-pymes",
    title: "Automatización de ventas para PYMES: guía práctica",
    description: "Descubre cómo reducir costos operativos y mejorar tu tasa de cierre integrando automatización en tu flujo de ventas.",
    date: "2026-04-20",
    category: "Automatización",
    author: "Aumatia Growth Team",
    readingTime: "6 min",
    content: `
      ## ¿Por qué las PYMES necesitan automatizar?

      La reducción de costos operativos es clave para la supervivencia y crecimiento de cualquier negocio B2B.

      ### Pasos para implementar la automatización

      1. **Unificar el ecosistema:** No uses 5 herramientas diferentes. La omnicanalidad para PYMES comienza conectando el POS, la tienda online y el CRM.
      2. **Seguimiento automático de leads:** Configura un CRM donde ningún contacto se enfríe. Si un lead no responde en 3 días, la IA puede enviar un follow-up basado en contexto.
      3. **Facturación automatizada:** Con herramientas como Smart POS de Aumatia, la factura electrónica se emite y sincroniza con tu contabilidad (ej. Siigo) sin clics extra.

      La automatización de ventas no reemplaza a los humanos, los potencia.
    `
  },
  {
    slug: "agentes-de-voz-inteligencia-artificial",
    title: "Agentes de voz con inteligencia artificial: qué son y cómo usarlos",
    description: "Todo lo que necesitas saber sobre los Agentes AI que pueden atender llamadas, WhatsApp y el chat de tu web 24/7.",
    date: "2026-04-15",
    category: "IA en ventas",
    author: "Aumatia Product Team",
    readingTime: "4 min",
    content: `
      ## La revolución de la disponibilidad 24/7

      El consumidor y el comprador B2B ya no quieren esperar al horario de oficina para resolver una duda. Los agentes de voz con inteligencia artificial y los chatbots avanzados (basados en LLMs) son la solución.

      ### Casos de uso

      - **Soporte al cliente:** Respuestas inmediatas sobre estado de pedidos o políticas de devolución.
      - **Ventas asistidas por IA:** El agente puede recomendar productos basándose en el inventario actual (sincronizado con Aumatia OS).
      - **Filtrado inicial:** En B2B, el agente puede hacer 3 preguntas clave antes de transferir a un humano, garantizando la calificación automática de prospectos.

      Tener un empleado virtual que nunca duerme es hoy la mayor ventaja competitiva.
    `
  },
  {
    slug: "unificar-inventario-pos-web-marketplaces",
    title: "Cómo unificar tu inventario en POS, Web y Marketplaces",
    description: "Evita quiebres de stock y ventas fantasmas conectando tus canales físicos y digitales en un solo centro de control.",
    date: "2026-04-10",
    category: "Marketplaces",
    author: "Aumatia Product Team",
    readingTime: "5 min",
    content: `
      ## El problema de los silos de inventario

      Vender en Mercado Libre, tener una tienda Shopify y un local físico con un POS desconectado es una receta para el desastre. La falta de sincronización genera ventas dobles y mala reputación.

      ### La solución: Omnicanalidad real

      Con Aumatia OS, la unificación del inventario funciona así:
      - Entra mercancía a tu Bodega Principal.
      - Automáticamente se refleja el saldo disponible en todos tus canales.
      - Si alguien compra en el local físico (Smart POS), se descuenta 1 unidad.
      - Inmediatamente, la tienda Web y Mercado Libre actualizan su saldo, previniendo quiebres.

      Esto no solo mejora la experiencia del cliente, sino que significa una reducción brutal de costos operativos y dolores de cabeza contables.
    `
  }
];

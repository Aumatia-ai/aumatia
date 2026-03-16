export type Currency = 'COP' | 'USD';
export type Period = 'month1' | 'month2+';

export interface ProductPricingData {
    id: string;
    title: string;
    description?: string;
    prices: {
        COP: { month1: number; month2Plus: number; setup: number };
        USD: { month1: number; month2Plus: number; setup: number };
    };
    setupDescription: string;
    features: string[];
    isBundle?: boolean;
    recommended?: boolean;
}

export const pricingData: Record<string, ProductPricingData> = {
    // ==== MUNDO 1: OPERACIÓN Y GESTIÓN ====
    "smart-pos": {
        id: "smart-pos",
        title: "Smart POS",
        prices: {
            COP: { month1: 145000, month2Plus: 95000, setup: 50000 },
            USD: { month1: 37, month2Plus: 24, setup: 13 }
        },
        setupDescription: "Instalación, integración Siigo, migración data, 1h capacitación",
        features: [
            "Sistema POS completo",
            "Facturación Electrónica DIAN",
            "Control de inventario en tiempo real"
        ]
    },
    "finanzas": {
        id: "finanzas",
        title: "Finanzas & BI",
        prices: {
            COP: { month1: 99000, month2Plus: 49000, setup: 50000 },
            USD: { month1: 25, month2Plus: 12, setup: 13 }
        },
        setupDescription: "Conexión de datos, tableros iniciales",
        features: [
            "Dashboards de negocio avanzados",
            "Reportes automáticos y exportables",
            "Inteligencia Financiera"
        ]
    },
    "bundle-operativo": {
        id: "bundle-operativo",
        title: "Paquete Operativo",
        description: "POS + Finanzas",
        prices: {
            COP: { month1: 235000, month2Plus: 135000, setup: 100000 },
            USD: { month1: 59, month2Plus: 34, setup: 25 }
        },
        setupDescription: "Incluye la instalación y configuración de ambos sistemas",
        features: [
            "Todo el poder del Smart POS",
            "Inteligencia financiera conectada",
            "Visión 360º de tu negocio físico"
        ],
        isBundle: true,
        recommended: true
    },

    // ==== MUNDO 2: VENTAS DIGITALES ====
    "ecommerce": {
        id: "ecommerce",
        title: "Web & E-commerce",
        prices: {
            COP: { month1: 575000, month2Plus: 125000, setup: 450000 },
            USD: { month1: 144, month2Plus: 32, setup: 112 }
        },
        setupDescription: "Diseño de marca, pasarelas de pago, dominio, hosting",
        features: [
            "Tienda online profesional",
            "100% autoadministrable",
            "Catálogo ilimitado conectado"
        ]
    },
    "marketplace": {
        id: "marketplace",
        title: "Marketplace",
        prices: {
            COP: { month1: 135000, month2Plus: 85000, setup: 50000 },
            USD: { month1: 34, month2Plus: 21, setup: 13 }
        },
        setupDescription: "Vinculación MercadoLibre/Falabella, mapeo categorías",
        features: [
            "Gestión multicanal en una pantalla",
            "Publicación masiva de productos",
            "Sincronización de stock automática"
        ]
    },
    "bundle-digital": {
        id: "bundle-digital",
        title: "Paquete Digital",
        description: "Web + Marketplace",
        prices: {
            COP: { month1: 690000, month2Plus: 190000, setup: 500000 },
            USD: { month1: 173, month2Plus: 48, setup: 125 }
        },
        setupDescription: "Configuración completa web y vinculación marketplaces",
        features: [
            "Domina las ventas online",
            "Tu propia web profesional",
            "Presencia en los grandes Marketplaces"
        ],
        isBundle: true,
        recommended: true
    },

    // ==== MUNDO 3: INTELIGENCIA ARTIFICIAL ====
    "agentes-ai": {
        id: "agentes-ai",
        title: "Agentes AI Personalizados",
        description: "Un empleado virtual entrenado con tus datos para WhatsApp, Web o CRM.",
        prices: {
            COP: { month1: 600000, month2Plus: 200000, setup: 400000 },
            USD: { month1: 150, month2Plus: 50, setup: 100 }
        },
        setupDescription: "Desarrollo, entrenamiento del modelo LLM con tu data, y conexión e integración al canal seleccionado.",
        features: [
            "Mantenimiento del agente 24/7",
            "Consumo mensual de interacciones AI",
            "Actualizaciones de la Base de Conocimiento",
            "Soporte Técnico Directo"
        ]
    }
};

export const formatCurrency = (value: number, currency: Currency) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
};

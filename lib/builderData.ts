export type Currency = 'COP' | 'USD';
export type OSLevel = 'starter' | 'growth' | 'pro';

export interface EcosystemModuleData {
    id: string;
    title: string;
    description: string;
    iconName: string; // To be mapped to a Lucide icon component in the UI
    monthlyPriceCOP: number;
    setupPriceCOP: number;
    features: string[];
}

export const builderModules: EcosystemModuleData[] = [
    {
        id: "smart-pos",
        title: "Smart POS",
        description: "Facturación, inventario y gestión de puntos físicos.",
        iconName: "Monitor",
        monthlyPriceCOP: 95000,
        setupPriceCOP: 50000,
        features: ["Cierres de caja", "Multi-sucursal", "Facturación DIAN"]
    },
    {
        id: "finanzas",
        title: "Finanzas & BI",
        description: "Dashboards financieros e inteligencia de negocio.",
        iconName: "Activity",
        monthlyPriceCOP: 49000,
        setupPriceCOP: 50000,
        features: ["Márgenes reales", "Flujo de caja", "Exportación contable"]
    },
    {
        id: "marketplace",
        title: "Marketplace",
        description: "Vende en Mercado Libre y Falabella desde un solo hub.",
        iconName: "ShoppingBag",
        monthlyPriceCOP: 85000,
        setupPriceCOP: 50000,
        features: ["Sync de stock", "Mapeo de categorías", "Respuestas automáticas"]
    },
    {
        id: "ecommerce",
        title: "Web & E-commerce",
        description: "Tu propia tienda digital personalizada de alta conversión.",
        iconName: "Globe",
        monthlyPriceCOP: 125000,
        setupPriceCOP: 450000,
        features: ["Diseño 100% a medida", "Pasarelas de pago", "Dominio propio"]
    },
    {
        id: "agentes-ai",
        title: "Agentes AI",
        description: "Asistentes virtuales 24/7 entrenados con tu modelo de negocio.",
        iconName: "BotMessageSquare",
        monthlyPriceCOP: 200000,
        setupPriceCOP: 400000,
        features: ["Canal WhatsApp/Web", "Entrenamiento NLP", "Agendamiento automático"]
    }
];

// OS Special Logic
export const osData = {
    id: "aumatia-os",
    setupPriceCOP: 200000,
    levels: {
        starter: { title: "Starter", monthlyPriceCOP: 196000, credits: 100 },
        growth: { title: "Growth", monthlyPriceCOP: 600000, credits: 300 },
        pro: { title: "Pro", monthlyPriceCOP: 1400000, credits: 800 },
    }
};

// Fallback just in case the API fetch drops
export const FALLBACK_TRM = 3700;

export const formatCurrency = (value: number, currency: Currency) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
};

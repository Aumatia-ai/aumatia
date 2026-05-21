export type Currency = 'COP' | 'USD';
export type OSLevel = 'starter' | 'growth' | 'pro';
export type SmartPosLevel = 'lite' | 'pro' | 'empresarial';

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
        title: "Finanzas",
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

// Smart POS Sub-Plans Logic
export interface SmartPosPlanData {
    id: SmartPosLevel;
    title: string;
    monthlyPriceCOP: number | null; // null => no price (quote only)
    setupPriceCOP: number | null;   // null => no setup shown
    badge?: string;
    badgeStyle?: 'popular' | 'enterprise';
    limitLabel: string;
    features: string[];
    isQuote?: boolean; // Excluded from numeric total
}

export const smartPosPlans: Record<SmartPosLevel, SmartPosPlanData> = {
    lite: {
        id: 'lite',
        title: 'Lite',
        monthlyPriceCOP: 59000,
        setupPriceCOP: 40000,
        limitLabel: 'Solo 1 punto de venta',
        features: [
            'Facturación DIAN ilimitada',
            '1 caja · 1 sucursal',
            'Control de stocks',
            'Cierres de caja',
            'Inventario básico',
            'Costeo',
            'Infraestructura compartida',
        ],
    },
    pro: {
        id: 'pro',
        title: 'Pro',
        monthlyPriceCOP: 95000,
        setupPriceCOP: 50000,
        badge: 'Más popular',
        badgeStyle: 'popular',
        limitLabel: 'Hasta 3 puntos de venta',
        features: [
            'Facturación DIAN ilimitada',
            'Hasta 3 cajas / sucursales',
            'Control de stocks y costeo',
            'Reportes avanzados',
            'Multi-administrador',
            'Inventario avanzado',
            'Ecosistema nativo (Marketplace, E-commerce, AI)',
        ],
    },
    empresarial: {
        id: 'empresarial',
        title: 'Empresarial',
        monthlyPriceCOP: null,
        setupPriceCOP: null,
        badge: 'Empresarial',
        badgeStyle: 'enterprise',
        limitLabel: 'Puntos ilimitados',
        isQuote: true,
        features: [
            'Servidor privado exclusivo',
            'Base de datos privada',
            'Facturación DIAN ilimitada en todos los puntos',
            'Panel centralizado multi-sucursal',
            'Reportes consolidados por red',
            'Soporte y asistencia personalizada',
            'SLA garantizado',
            'Todo lo incluido en Lite y Pro',
            'Compatible con Marketplace, E-commerce y Agentes AI',
        ],
    },
};

// OS Special Logic
export interface OSLevelData {
    title: string;
    monthlyPriceCOP: number;
    credits: number;
    badge?: string;
    badgeStyle?: 'popular' | 'enterprise';
    features: string[];
}

export const osData = {
    id: "aumatia-os",
    setupPriceCOP: 200000,
    levels: {
        starter: {
            title: "Starter",
            monthlyPriceCOP: 196000,
            credits: 100,
            features: [
                "Automatización de ventas con IA",
                "Campañas de WhatsApp",
                "Embudos básicos",
                "1 agente activo",
                "Bandeja unificada",
                "Soporte por chat",
            ],
        },
        growth: {
            title: "Growth",
            monthlyPriceCOP: 600000,
            credits: 300,
            badge: "Más popular",
            badgeStyle: 'popular',
            features: [
                "Todo lo de Starter",
                "Embudos avanzados",
                "Multi-agente",
                "Reportes de conversión",
                "Integraciones por API",
                "Segmentación de audiencias",
            ],
        },
        pro: {
            title: "Pro",
            monthlyPriceCOP: 1400000,
            credits: 800,
            features: [
                "Todo lo de Growth",
                "Embudos ilimitados",
                "IA personalizada a tu negocio",
                "Prioridad de soporte",
                "Manager dedicado",
                "Onboarding asistido",
            ],
        },
    } as Record<OSLevel, OSLevelData>,
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

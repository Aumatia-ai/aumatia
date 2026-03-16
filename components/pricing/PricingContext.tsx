"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Currency, Period } from "@/lib/pricingData";

interface PricingContextProps {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    period: Period;
    setPeriod: (period: Period) => void;
}

const PricingContext = createContext<PricingContextProps | undefined>(undefined);

export function PricingProvider({ children, initialCurrency = 'COP', initialPeriod = 'month1' }: { children: ReactNode, initialCurrency?: Currency, initialPeriod?: Period }) {
    const [currency, setCurrency] = useState<Currency>(initialCurrency);
    const [period, setPeriod] = useState<Period>(initialPeriod);

    return (
        <PricingContext.Provider value={{ currency, setCurrency, period, setPeriod }}>
            {children}
        </PricingContext.Provider>
    );
}

export function usePricingContext() {
    const context = useContext(PricingContext);
    if (context === undefined) {
        throw new Error("usePricingContext must be used within a PricingProvider");
    }
    return context;
}

"use client";

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import { Currency, OSLevel, SmartPosLevel, builderModules, osData, smartPosPlans, FALLBACK_TRM } from "@/lib/builderData";

interface EcosystemContextProps {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    // TRM Logic
    trm: number;
    isLoadingTRM: boolean;
    
    // Core Modules state
    selectedModules: string[];
    toggleModule: (id: string) => void;

    // Smart POS sub-plan state
    smartPosLevel: SmartPosLevel;
    setSmartPosLevel: (level: SmartPosLevel) => void;
    isSmartPosQuote: boolean;

    // OS State
    isOSSelected: boolean;
    toggleOS: () => void;
    osLevel: OSLevel;
    setOSLevel: (level: OSLevel) => void;

    // Derived Financial Data
    totalItems: number;
    discountPercentage: number;
    
    baseMonthlyCOP: number;
    baseMonthlyUSD: number;
    
    finalMonthlyCOP: number;
    finalMonthlyUSD: number;
    
    totalSetupCOP: number;
    totalSetupUSD: number;
    
    totalTodayCOP: number;
    totalTodayUSD: number;
}

const EcosystemContext = createContext<EcosystemContextProps | undefined>(undefined);

export function EcosystemProvider({ children, initialCurrency = 'COP' }: { children: ReactNode, initialCurrency?: Currency }) {
    const [currency, setCurrency] = useState<Currency>(initialCurrency);
    const [selectedModules, setSelectedModules] = useState<string[]>([]);
    const [smartPosLevel, setSmartPosLevel] = useState<SmartPosLevel>('lite');

    const [isOSSelected, setIsOSSelected] = useState<boolean>(false);
    const [osLevel, setOSLevel] = useState<OSLevel>('starter');

    // TRM Real-time state
    const [trm, setTrm] = useState<number>(FALLBACK_TRM);
    const [isLoadingTRM, setIsLoadingTRM] = useState<boolean>(true);

    useEffect(() => {
        // Fetch Real-Time Exchange Rate on Load
        async function fetchTRM() {
            try {
                const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                if (data && data.rates && data.rates.COP) {
                    setTrm(data.rates.COP);
                }
            } catch (error) {
                console.warn("Could not fetch real-time TRM, using fallback rate:", error);
            } finally {
                setIsLoadingTRM(false);
            }
        }
        fetchTRM();
    }, []);

    const toggleModule = (id: string) => {
        setSelectedModules(prev => 
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    const toggleOS = () => {
        setIsOSSelected(prev => !prev);
    };

    // Calculate derived data
    const { 
        totalItems, 
        discountPercentage,
        baseMonthlyCOP,
        baseMonthlyUSD,
        finalMonthlyCOP,
        finalMonthlyUSD,
        totalSetupCOP,
        totalSetupUSD,
        totalTodayCOP,
        totalTodayUSD
    } = useMemo(() => {
        // Quantities
        const stdItems = selectedModules.length;
        const totalItemsCount = stdItems + (isOSSelected ? 1 : 0);

        // Discount logic
        let discount = 0;
        if (totalItemsCount >= 6) discount = 25;
        else if (totalItemsCount === 5) discount = 20;
        else if (totalItemsCount === 4) discount = 15;
        else if (totalItemsCount === 3) discount = 10;
        else if (totalItemsCount === 2) discount = 5;

        // Base Costs (COP)
        let monthlyCOP = 0;
        let setupCOP = 0;

        // Accumulate standard modules
        selectedModules.forEach(id => {
            // Smart POS uses its sub-plan pricing; Empresarial is quote-only (excluded from total)
            if (id === 'smart-pos') {
                const plan = smartPosPlans[smartPosLevel];
                if (!plan.isQuote) {
                    monthlyCOP += plan.monthlyPriceCOP ?? 0;
                    setupCOP += plan.setupPriceCOP ?? 0;
                }
                return;
            }
            const mod = builderModules.find(m => m.id === id);
            if (mod) {
                monthlyCOP += mod.monthlyPriceCOP;
                setupCOP += mod.setupPriceCOP;
            }
        });

        // Accumulate OS module if selected
        if (isOSSelected) {
            monthlyCOP += osData.levels[osLevel].monthlyPriceCOP;
            setupCOP += osData.setupPriceCOP;
        }

        // Calculate USD Equivalents dynamically using TRM
        const monthlyUSD = Math.round(monthlyCOP / trm);
        const setupUSD = Math.round(setupCOP / trm);

        // Apply discount to monthly base
        const discountMultiplier = 1 - (discount / 100);
        
        const finalMonthlyCOP = Math.round(monthlyCOP * discountMultiplier);
        const finalMonthlyUSD = Math.round(monthlyUSD * discountMultiplier);

        // Sum for Today (Mes 1)
        const totalTodayCOP = finalMonthlyCOP + setupCOP;
        const totalTodayUSD = finalMonthlyUSD + setupUSD;

        return {
            totalItems: totalItemsCount,
            discountPercentage: discount,
            baseMonthlyCOP: monthlyCOP,
            baseMonthlyUSD: monthlyUSD,
            finalMonthlyCOP,
            finalMonthlyUSD,
            totalSetupCOP: setupCOP,
            totalSetupUSD: setupUSD,
            totalTodayCOP,
            totalTodayUSD
        };
    }, [selectedModules, smartPosLevel, isOSSelected, osLevel, trm]);

    const isSmartPosQuote = selectedModules.includes('smart-pos') && !!smartPosPlans[smartPosLevel].isQuote;

    return (
        <EcosystemContext.Provider value={{
            currency,
            setCurrency,
            trm,
            isLoadingTRM,
            selectedModules,
            toggleModule,
            smartPosLevel,
            setSmartPosLevel,
            isSmartPosQuote,
            isOSSelected,
            toggleOS,
            osLevel,
            setOSLevel,
            totalItems,
            discountPercentage,
            baseMonthlyCOP,
            baseMonthlyUSD,
            finalMonthlyCOP,
            finalMonthlyUSD,
            totalSetupCOP,
            totalSetupUSD,
            totalTodayCOP,
            totalTodayUSD
        }}>
            {children}
        </EcosystemContext.Provider>
    );
}

export function useEcosystemContext() {
    const context = useContext(EcosystemContext);
    if (context === undefined) {
        throw new Error("useEcosystemContext must be used within a EcosystemProvider");
    }
    return context;
}

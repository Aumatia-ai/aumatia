"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import TrustFooter from "@/components/TrustFooter";
import Link from "next/link";
import { ArrowLeft, Globe, Phone, MessageSquare, Mail, Bot } from "lucide-react";

// Using the provided user data for pricing (1CR = 0.5USD)
// Table given:
// PAIS | LLAMADAS | WA UTILITY | WA MARKETING | EMAIL
// COLOMBIA | 0.211 | 0.009 | 0.046 | 0.015
// BOLIVIA | 0.686 | 0.033 | 0.180 | 0.015
// MEXICO | 0.173 | 0.026 | 0.085 | 0.015
// USA | 0.191 | 0.015 | 0.073 | 0.015
// GUATEMALA | 0.212 | 0.033 | 0.180 | 0.015
// EL SALVADOR | 0.218 | 0.033 | 0.180 | 0.015
// COSTA RICA | 0.200 | 0.033 | 0.180 | 0.015
// ECUADOR | 0.821 | 0.033 | 0.180 | 0.015

// I will convert the USD costs in the table to "Credits" assuming 1 Credit = $0.5 USD exactly as requested.
// Wait, the prompt says the user's table has USD costs (?)
// "1CR = 0.5USD" - This means Cost in Credits = Cost in USD / 0.5 = Cost in USD * 2.
// Let's create the data structure.

const pricingData: Record<string, { calls: number, waUtility: number, waMarketing: number, email: number }> = {
    "Colombia": { calls: 0.211, waUtility: 0.009, waMarketing: 0.046, email: 0.015 },
    "Bolivia": { calls: 0.686, waUtility: 0.033, waMarketing: 0.180, email: 0.015 },
    "México": { calls: 0.173, waUtility: 0.026, waMarketing: 0.085, email: 0.015 },
    "USA": { calls: 0.191, waUtility: 0.015, waMarketing: 0.073, email: 0.015 },
    "Guatemala": { calls: 0.212, waUtility: 0.033, waMarketing: 0.180, email: 0.015 },
    "El Salvador": { calls: 0.218, waUtility: 0.033, waMarketing: 0.180, email: 0.015 },
    "Costa Rica": { calls: 0.200, waUtility: 0.033, waMarketing: 0.180, email: 0.015 },
    "Ecuador": { calls: 0.821, waUtility: 0.033, waMarketing: 0.180, email: 0.015 }
};

// Calculate Credits: USD * 2
const toCredits = (usd: number) => (usd * 2).toFixed(3);

export default function PricingOSPage() {
    const [selectedCountry, setSelectedCountry] = useState("Colombia");
    
    const currentCosts = pricingData[selectedCountry];

    const actions = [
        {
            title: "Llamada Minuto",
            description: "por minuto",
            icon: Phone,
            credits: toCredits(currentCosts.calls)
        },
        {
            title: "Mensaje de WhatsApp (Marketing)",
            description: "por mensaje promocional",
            icon: MessageSquare,
            credits: toCredits(currentCosts.waMarketing)
        },
        {
            title: "Mensaje de WhatsApp (Utility)",
            description: "por notificación de servicio",
            icon: MessageSquare,
            credits: toCredits(currentCosts.waUtility)
        },
        {
            title: "Correo Electrónico",
            description: "por envío",
            icon: Mail,
            credits: toCredits(currentCosts.email)
        },
        {
            title: "Copiloto AI",
            description: "por lead enriquecido",
            icon: Bot,
            credits: "0.400" // Kept constant as it wasn't in the table
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-neon-blue selection:text-black">
            <Navbar />
            
            <div className="flex-grow flex flex-col items-center justify-center pt-32 pb-20 px-6">
                
                <Link href="/os" className="flex items-center text-sm text-white/60 hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a OS
                </Link>

                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Calculadora de Costos</h1>
                    <p className="text-white/60 text-lg">Conoce cuántos créditos consume cada acción según el país.</p>
                </div>

                <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden">
                    {/* Glowing background effect */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[100px] pointer-events-none" />
                    
                    <div className="relative z-10">
                        <div className="mb-8">
                            <label className="block text-white/70 text-sm font-medium mb-2">Selecciona un país</label>
                            <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-blue" />
                                <select 
                                    className="w-full bg-black/40 border border-white/20 text-white rounded-xl py-4 pl-12 pr-4 appearance-none focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all cursor-pointer font-medium text-lg"
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                >
                                    {Object.keys(pricingData).map(country => (
                                        <option key={country} value={country} className="bg-slate-900 text-white">{country}</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {actions.map((action, idx) => (
                                <div key={idx} className="flex items-center justify-between p-5 bg-black/20 border border-white/10 rounded-2xl hover:border-white/20 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center shrink-0">
                                            <action.icon className="w-5 h-5 text-neon-blue" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">{action.title}</h3>
                                            <p className="text-white/50 text-sm">{action.description}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-3xl font-bold text-neon-blue">{action.credits}</span>
                                        <span className="text-white/50 text-sm ml-1">Créditos</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 text-center border-t border-white/10 pt-6">
                            <p className="text-white/60 text-sm">
                                ¿No ves tu país en la lista? <a href="#" className="text-neon-blue hover:underline">Contáctanos para solicitarlo.</a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <TrustFooter />
        </main>
    );
}

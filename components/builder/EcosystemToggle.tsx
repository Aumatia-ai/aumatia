"use client";

import { useEcosystemContext } from "./EcosystemContext";
import { cn } from "@/lib/utils";

export default function EcosystemToggle() {
    const { currency, setCurrency, trm, isLoadingTRM } = useEcosystemContext();

    return (
        <div className="flex flex-col items-center gap-4 mb-12">
            
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-full backdrop-blur-md">
                <span 
                    className={cn("px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer", currency === 'COP' ? "bg-white text-black shadow-lg" : "text-white/50 hover:text-white")} 
                    onClick={() => setCurrency('COP')}
                >
                    COP (🇨🇴)
                </span>
                
                <span 
                    className={cn("px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer", currency === 'USD' ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]" : "text-white/50 hover:text-white")} 
                    onClick={() => setCurrency('USD')}
                >
                    USD ($)
                </span>
            </div>

        </div>
    );
}

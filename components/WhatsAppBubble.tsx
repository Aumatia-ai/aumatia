"use client";

import { useState } from "react";

const WHATSAPP_URL = "https://wa.me/573118905418?text=";

export default function WhatsAppBubble() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex items-end gap-3">
            {/* Chat bubble tooltip */}
            <div
                className={`
                    transition-all duration-300 ease-out origin-bottom-right
                    ${isHovered 
                        ? "opacity-100 scale-100 translate-y-0" 
                        : "opacity-0 scale-90 translate-y-2 pointer-events-none"
                    }
                `}
            >
                <div className="relative bg-[#0b101e] border border-white/15 backdrop-blur-xl rounded-2xl px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] max-w-[220px]">
                    {/* Speech tail */}
                    <div className="absolute -right-2 bottom-4 w-4 h-4 bg-[#0b101e] border-r border-b border-white/15 transform rotate-[-45deg]" />
                    <p className="text-white/90 text-sm font-medium leading-snug">
                        ¿Necesitas ayuda?{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-bold">
                            Habla con un asesor
                        </span>
                    </p>
                </div>
            </div>

            {/* WhatsApp button */}
            <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsHovered(true)}
                aria-label="Hablar con un asesor por WhatsApp"
                className="
                    group relative w-16 h-16 rounded-full flex items-center justify-center
                    bg-neon-blue
                    shadow-[0_4px_20px_rgba(0,240,255,0.4)]
                    hover:shadow-[0_6px_30px_rgba(0,240,255,0.6)]
                    hover:scale-110 active:scale-95
                    transition-all duration-300 ease-out
                "
            >
                
                {/* WhatsApp Icon */}
                <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 relative z-10 drop-shadow-md"
                >
                    <path
                        d="M16.004 2.667A13.28 13.28 0 0 0 2.73 15.946a13.18 13.18 0 0 0 1.787 6.627L2.667 29.333l6.96-1.824A13.27 13.27 0 0 0 16.004 29.3 13.28 13.28 0 0 0 29.333 16.02 13.32 13.32 0 0 0 16.004 2.667Zm0 24.296a11 11 0 0 1-5.617-1.537l-.403-.24-4.18 1.097 1.116-4.076-.263-.418a10.94 10.94 0 0 1-1.686-5.843 11.03 11.03 0 0 1 11.03-11.03A11.05 11.05 0 0 1 27 15.966a11.05 11.05 0 0 1-10.996 10.997Zm6.04-8.24c-.332-.166-1.963-.968-2.268-1.08-.305-.11-.527-.166-.749.167s-.86 1.08-1.053 1.3c-.194.222-.388.25-.72.084a9.07 9.07 0 0 1-2.672-1.65 10.01 10.01 0 0 1-1.849-2.3c-.194-.333-.02-.513.146-.678.148-.15.332-.388.499-.583.166-.194.221-.332.332-.555.111-.222.055-.417-.028-.583-.083-.167-.749-1.804-1.025-2.47-.27-.648-.546-.56-.749-.572l-.638-.01a1.22 1.22 0 0 0-.887.416c-.305.333-1.163 1.136-1.163 2.77s1.19 3.215 1.357 3.437c.166.222 2.345 3.578 5.682 5.017.794.343 1.414.548 1.897.701.797.253 1.523.218 2.096.132.64-.095 1.963-.803 2.24-1.578.277-.776.277-1.44.194-1.578-.083-.14-.305-.222-.638-.389Z"
                        fill="white"
                    />
                </svg>
            </a>
        </div>
    );
}

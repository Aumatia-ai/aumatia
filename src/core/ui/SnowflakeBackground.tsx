"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function SnowflakeBackground({ children }: { children: React.ReactNode }) {
    const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; duration: number; delay: number; size: number; opacity: number }>>([]);

    useEffect(() => {
        const flakes = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            duration: Math.random() * 15 + 15, // Slower fall (15s - 30s)
            delay: Math.random() * 10,
            size: Math.random() * 3 + 1, // 1px to 4px snowflakes
            opacity: Math.random() * 0.4 + 0.1, // Subtle opacity
        }));
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="relative min-h-screen w-full bg-[#03070d] overflow-hidden">
            {/* Deep gradient background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#03070d] to-[#010409] z-0" />
            
            {/* Animated snowflakes */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {snowflakes.map((flake) => (
                    <motion.div
                        key={flake.id}
                        initial={{ top: "-10%", left: `${flake.left}%`, opacity: 0 }}
                        animate={{ 
                            top: "110%", 
                            left: [`${flake.left}%`, `${flake.left + Math.random() * 20 - 10}%`, `${flake.left}%`],
                            opacity: [0, flake.opacity, flake.opacity, 0]
                        }}
                        transition={{
                            duration: flake.duration,
                            repeat: Infinity,
                            delay: flake.delay,
                            ease: "linear",
                            times: [0, 0.1, 0.9, 1]
                        }}
                        style={{
                            position: "absolute",
                            width: flake.size,
                            height: flake.size,
                            borderRadius: "50%",
                            backgroundColor: "#e0f2fe",
                            boxShadow: "0 0 8px rgba(224, 242, 254, 0.6)"
                        }}
                    />
                ))}
            </div>

            {/* Glowing center orb for ambient lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none z-0" />

            {/* Main Content Area */}
            <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-4">
                {children}
            </div>
        </div>
    );
}

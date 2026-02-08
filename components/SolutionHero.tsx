"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SolutionHeroProps {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    gradient: string; // e.g., "from-blue-500 to-cyan-500"
}

export default function SolutionHero({ title, subtitle, icon, gradient }: SolutionHeroProps) {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background z-0" />

            <div className="container mx-auto relative z-10 flex flex-col items-center text-center gap-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                        "w-20 h-20 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center mb-4 shadow-lg mx-auto",
                        "bg-gradient-to-br opacity-90",
                        gradient.replace("from-", "from-white/10 ").replace("to-", "to-white/5 ") // subtle bg
                    )}
                >
                    {icon}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-6xl font-bold tracking-tighter max-w-4xl mx-auto"
                >
                    <span className={cn("text-transparent bg-clip-text bg-gradient-to-r", gradient)}>
                        {title}
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-muted-foreground text-lg md:text-xl max-w-2xl px-4 mx-auto"
                >
                    {subtitle}
                </motion.p>
            </div>
        </section>
    );
}

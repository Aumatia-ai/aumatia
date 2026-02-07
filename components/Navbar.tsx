"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                    Aumatia<span className="text-neon-blue">.</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {["Plataforma", "Servicios Web", "Casos de Éxito"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                            className="text-sm font-medium text-white/70 hover:text-neon-blue transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <div className="hidden md:block">
                    <button className="bg-neon-blue/10 border border-neon-blue/50 text-neon-blue px-6 py-2 rounded-full text-sm font-semibold hover:bg-neon-blue hover:text-background transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]">
                        Demo del Ecosistema
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-white/10 p-6 flex flex-col gap-4 shadow-xl"
                >
                    {["Plataforma", "Servicios Web", "Casos de Éxito"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                            className="text-lg font-medium text-white/80 hover:text-neon-blue"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <button className="w-full bg-neon-blue text-background py-3 rounded-lg font-bold mt-2">
                        Demo del Ecosistema
                    </button>
                </motion.div>
            )}
        </motion.header>
    );
}

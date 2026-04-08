"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Monitor, ShoppingBag, Activity, Code, Cpu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const solutions = [
    { name: "Smart POS", href: "/solutions/smart-pos", icon: Monitor, color: "text-blue-400" },
    { name: "Marketplaces", href: "/solutions/marketplace", icon: ShoppingBag, color: "text-purple-400" },
    { name: "Finanzas", href: "/solutions/finances", icon: Activity, color: "text-green-400" },
    { name: "Web & E-commerce", href: "/solutions/web-development", icon: Code, color: "text-orange-400" },
    { name: "Agentes AI", href: "/solutions/agentes", icon: Sparkles, color: "text-fuchsia-400" },
    { name: "ContactIA", href: "/contactia", icon: Cpu, color: "text-cyan-400" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
                <Link href="/" className="flex items-center">
                    <img src="/logo.png" alt="Aumatia" className="h-10 md:h-12 w-auto object-contain" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {/* Solutions Dropdown */}
                    <div
                        className="relative group"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <button className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-neon-blue transition-colors py-2">
                            Soluciones <ChevronDown className={cn("w-4 h-4 transition-transform", dropdownOpen ? "rotate-180" : "")} />
                        </button>

                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 w-64 bg-background border border-white/10 rounded-xl shadow-xl overflow-hidden p-2 flex flex-col gap-1"
                                >
                                    {solutions.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                                        >
                                            <item.icon className={cn("w-5 h-5 group-hover/item:text-neon-blue transition-colors", item.color)} />
                                            <span className="text-sm font-medium text-white/80 group-hover/item:text-white">{item.name}</span>
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link href="/precios" className="text-sm font-medium text-white/70 hover:text-neon-blue transition-colors">
                        Precios
                    </Link>
                    <Link href="/os" className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors border border-cyan-500/30 px-3 py-1 rounded-full bg-cyan-500/10">
                        Aumatia OS
                    </Link>
                </nav>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Link 
                        href="/login"
                        className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                    >
                        Iniciar Sesión
                    </Link>
                    <Link 
                        href="/demo"
                        className="inline-block bg-neon-blue/10 border border-neon-blue/50 text-neon-blue px-6 py-2 rounded-full text-sm font-semibold hover:bg-neon-blue hover:text-background transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]"
                    >
                        Demo
                    </Link>
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
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-white/10 p-6 flex flex-col gap-4 shadow-xl max-h-[80vh] overflow-y-auto"
                    >
                        <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest px-2">Soluciones</span>
                            {solutions.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-3 px-2 py-3 rounded-lg active:bg-white/5"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <item.icon className={cn("w-5 h-5", item.color)} />
                                    <span className="text-lg font-medium text-white/80">{item.name}</span>
                                </Link>
                            ))}
                        </div>

                        <Link
                            href="/precios"
                            className="text-lg font-medium text-white/80 hover:text-neon-blue px-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Precios
                        </Link>
                        
                        <Link
                            href="/os"
                            className="text-lg font-medium text-cyan-400 hover:text-cyan-300 px-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Aumatia OS
                        </Link>

                        <div className="flex flex-col gap-3 mt-2 border-t border-white/10 pt-4">
                            <Link 
                                href="/login"
                                className="w-full text-center border border-white/20 text-white hover:bg-white/5 py-3 rounded-lg font-bold transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Iniciar Sesión
                            </Link>

                            <Link 
                                href="/demo"
                                className="w-full text-center bg-neon-blue text-background py-3 rounded-lg font-bold"
                                onClick={() => setIsOpen(false)}
                            >
                                Demo
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

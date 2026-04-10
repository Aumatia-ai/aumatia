"use client";

import { motion } from "framer-motion";
import { Cpu, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SnowflakeBackground } from "../ui/SnowflakeBackground";
import { supabase } from "../lib/supabaseClient";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            if (isRegister) {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password
                });
                
                if (error) {
                    console.error("Error Registrando:", error.message);
                    alert("Error al crear cuenta: " + error.message);
                } else {
                    console.log("Successfully signed up!");
                    if (data.session) {
                        router.push("/launcher");
                    } else {
                        // In case Auth rules force email confirmation anyway:
                        alert("Cuenta creada con éxito.");
                        // Try redirect, it depends on Auth setting, usually logs them locally.
                        router.push("/launcher");
                    }
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
                
                if (error) {
                    console.error("Error SignInWithPassword:", error.message);
                    alert("Error de acceso: " + error.message);
                } else {
                    console.log("Supabase Auth local success. Navigate to launcher.");
                    router.push("/launcher");
                }
            }
        } catch (err) {
            console.error("Error crítico realizando Auth:", err);
            alert("Ocurrió un error inesperado al procesar la conexión.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SnowflakeBackground>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                {/* Cabecera del Portal */}
                <div className="text-center mb-10 flex flex-col items-center">
                    <Link href="/" className="inline-block relative group">
                        {/* Brillo expandido al hacer hover */}
                        <div className="absolute inset-0 bg-cyan-400/20 rounded-2xl animate-ping group-hover:bg-cyan-400/40 transition-all opacity-50 duration-700" />
                        
                        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#050b14] to-[#0f172a] flex items-center justify-center backdrop-blur-md border border-cyan-500/40 shadow-[0_0_40px_rgba(0,255,255,0.25)] mb-6 z-10">
                            <Cpu className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />
                        </div>
                    </Link>
                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tight">Portal Aumatia</h1>
                    <p className="text-cyan-400/80 text-sm mt-3 font-medium tracking-wide flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        {isRegister ? "Registra tu nueva cuenta" : "Acceso Seguro"}
                    </p>
                </div>

                {/* Tarjeta de Formulario */}
                <div className="bg-[#0b1221]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                    {/* Línea superior brillante */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                    
                    {/* Efecto de resplandor sutil permanente */}
                    <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-1">Correo Electrónico</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="usuario@empresa.com"
                                    className="w-full bg-[#050b14]/60 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all font-medium hover:border-white/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center pl-1">
                                <label className="text-xs font-bold text-white/70 uppercase tracking-widest">Contraseña</label>
                                {!isRegister && (
                                    <Link href="#" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors">¿Olvidaste tu contraseña?</Link>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input 
                                    type="password" 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full bg-[#050b14]/60 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all font-medium hover:border-white/20"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(0,180,255,0.4)] hover:shadow-[0_0_30px_rgba(0,180,255,0.6)] border border-cyan-400/20 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            {isLoading ? (
                                <motion.div 
                                    animate={{ rotate: 360 }} 
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                />
                            ) : (
                                <>
                                    {isRegister ? "Registrarse" : "Entrar a Aumatia OS"}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center relative z-10 flex flex-col gap-3">
                        <button 
                            type="button" 
                            onClick={() => setIsRegister(!isRegister)} 
                            className="text-sm font-semibold text-cyan-400 hover:text-white transition-colors"
                        >
                            {isRegister ? "¿Ya tienes una cuenta? Iniciar sesión" : "¿No tienes cuenta? Regístrate aquí"}
                        </button>
                        <p className="text-[11px] text-white/30 font-medium uppercase tracking-widest mt-1">
                            Conectándote al ecosistema de forma segura
                        </p>
                    </div>
                </div>
            </motion.div>
        </SnowflakeBackground>
    );
}

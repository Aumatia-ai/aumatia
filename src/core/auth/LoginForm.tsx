"use client";

import { motion } from "framer-motion";
import { Cpu, Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, User, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { registerUserAction } from "./registerAction";

const countryCodes = [
    { code: "+57", label: "Colombia (+57)" },
    { code: "+52", label: "México (+52)" },
    { code: "+51", label: "Perú (+51)" },
    { code: "+56", label: "Chile (+56)" },
    { code: "+54", label: "Argentina (+54)" },
    { code: "+1", label: "USA (+1)" },
    { code: "+34", label: "España (+34)" },
    { code: "+593", label: "Ecuador (+593)" },
    { code: "+507", label: "Panamá (+507)" },
    { code: "+58", label: "Venezuela (+58)" },
    { code: "+55", label: "Brasil (+55)" },
    { code: "+591", label: "Bolivia (+591)" },
    { code: "+595", label: "Paraguay (+595)" },
    { code: "+598", label: "Uruguay (+598)" },
    { code: "+506", label: "Costa Rica (+506)" },
    { code: "+502", label: "Guatemala (+502)" },
    { code: "+503", label: "El Salvador (+503)" },
    { code: "+504", label: "Honduras (+504)" },
    { code: "+505", label: "Nicaragua (+505)" },
    { code: "+1", label: "Rep. Dominicana (+1)" },
    { code: "+1", label: "Puerto Rico (+1)" },
];

export function LoginForm() {
    const [nombre, setNombre] = useState("");
    const [codigoPais, setCodigoPais] = useState("+57");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [isLoading, setIsLoading] = useState(false);
    
    // Auth modes
    type AuthMode = 'login' | 'register' | 'forgot_password';
    const [mode, setMode] = useState<AuthMode>('login');
    const [showPassword, setShowPassword] = useState(false);
    
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            if (mode === 'register') {
                // Use Server Action (Admin API) to create user without email confirmation
                const fullPhone = `${codigoPais} ${telefono.trim()}`;
                const result = await registerUserAction({ email, password, nombre, telefono: fullPhone });
                
                if (!result.success) {
                    console.error("Error Registrando:", result.error);
                    alert("Error al crear cuenta: " + result.error);
                } else {
                    // User created & auto-confirmed. Now sign them in immediately.
                    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
                    if (signInError) {
                        console.warn("Cuenta creada pero no se pudo iniciar sesión automáticamente:", signInError.message);
                        alert("Cuenta creada con éxito. Inicia sesión con tus credenciales.");
                        setMode('login');
                    } else {
                        console.log("Registered and signed in successfully.");
                        router.push("/launcher");
                    }
                }
            } else if (mode === 'login') {
                const { error } = await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password
                });
                
                if (error) {
                    console.error("Error SignInWithPassword:", error.message);
                    alert("Error de acceso: " + error.message);
                } else {
                    console.log("Supabase Auth local success. Navigate to launcher.");
                    router.push("/launcher");
                }
            } else if (mode === 'forgot_password') {
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: `${window.location.origin}/reset-password`,
                });
                if (error) {
                    console.error("Error ResetPassword:", error.message);
                    alert("Error al enviar el enlace: " + error.message);
                } else {
                    alert("Te hemos enviado un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada.");
                    setMode('login');
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
        <div className="min-h-screen bg-[#050b14] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                {/* Cabecera del Portal */}
                <div className="text-center mb-10 flex flex-col items-center">
                    <div className="inline-block relative group">
                        <div className="absolute inset-0 bg-cyan-400/20 rounded-2xl animate-ping group-hover:bg-cyan-400/40 transition-all opacity-50 duration-700" />
                        
                        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#050b14] to-[#0f172a] flex items-center justify-center backdrop-blur-md border border-cyan-500/40 shadow-[0_0_40px_rgba(0,255,255,0.25)] mb-6 z-10">
                            <Cpu className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tight">Portal Aumatia</h1>
                    <p className="text-cyan-400/80 text-sm mt-3 font-medium tracking-wide flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        {mode === 'register' ? "Registra tu nueva cuenta SaaS" : mode === 'forgot_password' ? "Recupera tu acceso" : "Acceso Seguro"}
                    </p>
                </div>

                {/* Tarjeta de Formulario */}
                <div className="bg-[#0b1221]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                    <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {mode === 'register' && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-1">Nombre Completo</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                        <input 
                                            type="text" required
                                            value={nombre} onChange={(e) => setNombre(e.target.value)}
                                            placeholder="Ej. Juan Pérez"
                                            className="w-full bg-[#050b14]/60 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all font-medium hover:border-white/20"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-1">Número de Celular</label>
                                    <div className="flex gap-2">
                                        <div className="relative w-[90px] shrink-0">
                                            <select
                                                value={codigoPais}
                                                onChange={(e) => setCodigoPais(e.target.value)}
                                                className="w-full h-full bg-[#050b14]/60 border border-white/10 rounded-xl pl-3 pr-6 py-4 text-white appearance-none focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all font-bold text-sm hover:border-white/20 cursor-pointer text-center"
                                            >
                                                {countryCodes.map((c, i) => (
                                                    <option key={`cc-${c.label}-${i}`} value={c.code} className="bg-[#0b1221] text-white text-left font-normal text-xs">
                                                        {c.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg className="w-3 h-3 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                        <input 
                                            type="tel" required
                                            value={telefono} onChange={(e) => setTelefono(e.target.value)}
                                            placeholder="310 883 4462"
                                            className="flex-1 min-w-0 bg-[#050b14]/60 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all font-medium hover:border-white/20"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-1">Correo Electrónico</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input 
                                    type="email" required
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    placeholder="usuario@empresa.com"
                                    className="w-full bg-[#050b14]/60 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all font-medium hover:border-white/20"
                                />
                            </div>
                        </div>

                        {mode !== 'forgot_password' && (
                            <div className="space-y-2">
                                <div className="flex justify-between items-center pl-1">
                                    <label className="text-xs font-bold text-white/70 uppercase tracking-widest">Contraseña</label>
                                    {mode === 'login' && (
                                        <button type="button" onClick={() => setMode('forgot_password')} className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
                                            ¿Olvidaste tu contraseña?
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                    <input 
                                        type={showPassword ? "text" : "password"} required
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full bg-[#050b14]/60 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all font-medium hover:border-white/20"
                                    />
                                    <button 
                                        type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        )}

                        <button 
                            type="submit" disabled={isLoading}
                            className={`w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(0,180,255,0.4)] hover:shadow-[0_0_30px_rgba(0,180,255,0.6)] border border-cyan-400/20 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            {isLoading ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                            ) : (
                                <>
                                    {mode === 'register' ? "Registrarse" : mode === 'forgot_password' ? "Enviar Enlace" : "Entrar a Aumatia OS"}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center relative z-10 flex flex-col gap-3">
                        {mode === 'login' ? (
                            <button type="button" onClick={() => setMode('register')} className="text-sm font-semibold text-cyan-400 hover:text-white transition-colors">
                                ¿No tienes cuenta? Regístrate aquí
                            </button>
                        ) : (
                            <button type="button" onClick={() => setMode('login')} className="text-sm font-semibold text-cyan-400 hover:text-white transition-colors">
                                Volver al inicio de sesión
                            </button>
                        )}
                        <p className="text-[11px] text-white/30 font-medium uppercase tracking-widest mt-1">
                            Conectándote al ecosistema de forma segura
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

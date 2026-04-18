"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Store, Utensils, ShoppingCart, MessageSquare, LineChart, Settings, LogOut, Cpu, Paintbrush, Save, X, Image as ImageIcon, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { uploadLogoAction } from "../auth/storageBucketAction";

export function Launcher() {
    const { profile, loading, setProfileInternal } = useAuth();
    const router = useRouter();

    const [showBrandModal, setShowBrandModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [brandForm, setBrandForm] = useState({
        brand_name: "",
        logourl: "",
        primary_color: "",
        secondary_color: ""
    });

    const handleLogoUpload = async (file: File) => {
        if (!profile) return;
        setIsUploading(true);
        try {
            // Convert file to base64 for server action
            const arrayBuffer = await file.arrayBuffer();
            const base64 = Buffer.from(arrayBuffer).toString('base64');

            const result = await uploadLogoAction({
                userId: profile.id,
                fileName: file.name,
                fileBase64: base64,
                contentType: file.type
            });

            if (!result.success) throw new Error(result.error);

            setBrandForm(prev => ({ ...prev, logourl: result.publicUrl || "" }));
        } catch (err: any) {
            console.error("Logo upload error:", err);
            alert("Error al subir el logo: " + err.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    useEffect(() => {
        if (!loading && !profile) {
            router.push("/login");
        } else if (profile) {
            setBrandForm({
                brand_name: profile.brand_name || "",
                logourl: profile.logourl || "",
                primary_color: profile.primary_color || "#050b14",
                secondary_color: profile.secondary_color || "#06b6d4"
            });
        }
    }, [loading, profile, router]);

    const handleSaveBrand = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;
        setIsSaving(true);
        try {
            const { error } = await supabase
                .from('usuarios')
                .update({
                    brand_name: brandForm.brand_name,
                    logourl: brandForm.logourl,
                    primary_color: brandForm.primary_color,
                    secondary_color: brandForm.secondary_color
                })
                .eq('id', profile.id);
            
            if (error) {
                throw error;
            }

            setProfileInternal({
                ...profile,
                ...brandForm
            });
            setShowBrandModal(false);
            alert("Marca actualizada con éxito.");
        } catch (err: any) {
            console.error("Error updating brand:", err);
            alert("No se pudieron guardar los cambios: " + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || !profile) {
        return (
            <div className="min-h-screen bg-[#050b14] flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-t-2 border-cyan-500 animate-spin" />
            </div>
        );
    }

    const session = profile; 

    // Pure SaaS Link directly to the domain
    const posUrl = "https://pos.aumatia.com.co";
    const marketplaceUrl = "https://marketplace.aumatia.com.co/";
    const contactiaUrl = "https://contactia.aumatia.com.co/";
    const finanzasUrl = "https://bi.aumatia.com.co/";

    const handleAppLaunch = (url: string) => {
        window.open(url, '_blank');
    };

    const apps: any[] = [];
    
    // Personalizar Marca: siempre disponible para todos los usuarios, siempre primero
    apps.push({ title: "Personalizar Marca", icon: Paintbrush, color: "text-cyan-400", bgGlow: "rgba(6,182,212,0.3)", action: () => setShowBrandModal(true) });

    // Panel Admin: solo para usuarios con role 'admin'
    if (session.role === 'admin') {
        apps.push({ title: "Panel Admin", icon: Settings, color: "text-rose-400", bgGlow: "rgba(244,63,113,0.3)", action: () => router.push("/app/admin") });
    }

    // POS unificado (antes eran pos_retail y pos_restaurant separados)
    apps.push({ title: "POS", icon: ShoppingCart, color: "text-blue-400", bgGlow: "rgba(59,130,246,0.3)", action: () => handleAppLaunch(posUrl) });

    if ((session.allowed_modules || []).includes('marketplace') || session.role === 'admin') {
        apps.push({ title: "Marketplace", icon: Store, color: "text-purple-400", bgGlow: "rgba(168,85,247,0.3)", action: () => handleAppLaunch(marketplaceUrl) });
    }
    
    if ((session.allowed_modules || []).includes('finanzas') || session.role === 'admin') {
        apps.push({ title: "Finanzas", icon: LineChart, color: "text-green-400", bgGlow: "rgba(34,197,94,0.3)", action: () => handleAppLaunch(finanzasUrl) });
    }
    
    if ((session.allowed_modules || []).includes('contactia') || session.role === 'admin') {
        apps.push({ title: "ContactIA", icon: MessageSquare, color: "text-cyan-400", bgGlow: "rgba(6,182,212,0.3)", action: () => handleAppLaunch(contactiaUrl) });
    }

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
    };

    return (
        <div 
            className="min-h-screen relative overflow-hidden bg-[#050b14]"
        >
            <div 
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none opacity-20 bg-cyan-500" 
            />
            {/* Header del OS */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-40 border-b border-white/5 bg-black/20 backdrop-blur-md">
                <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0b1221] to-[#0f172a] flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.15)] overflow-hidden">
                        {session.logourl ? (
                            <img src={session.logourl} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                            <Cpu className="w-6 h-6 text-cyan-400" />
                        )}
                     </div>
                     <div>
                        <div className="text-white font-black text-lg tracking-widest uppercase">{session.brand_name || "Aumatia OS"}</div>
                        <div className="text-white/50 text-xs flex items-center gap-2 font-medium tracking-wide">
                            <span>SaaS: <strong className="text-cyan-400">ACTIVO</strong></span>
                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                            <span>Titular: <span className="capitalize text-green-400">{session.nombre}</span></span>
                        </div>
                     </div>
                </div>
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white/70 hover:text-white transition-all text-sm font-semibold backdrop-blur-lg"
                >
                    <LogOut className="w-4 h-4" /> Salir 
                </button>
            </div>

            {/* Launchpad Grid Area */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center mt-24 mb-10 px-6">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight">
                        Launchpad
                    </h2>
                    <p className="text-lg text-white/60 font-medium mt-3">Accede a tus módulos autorizados.</p>
                </motion.div>

                {/* Grid Apps */}
                <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6 w-full"
                >
                    {apps.map((app, idx) => (
                        <motion.button
                            key={idx}
                            onClick={app.action}
                            variants={item}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative bg-[#0b1221]/60 backdrop-blur-2xl border border-white/10 hover:border-white/30 p-8 rounded-[2rem] flex flex-col items-center justify-center gap-5 transition-all shadow-xl hover:shadow-2xl overflow-hidden cursor-pointer"
                        >
                            <div className="absolute inset-x-0 -bottom-10 h-32 blur-[40px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" style={{ backgroundColor: app.bgGlow }} />
                            
                            <div className="w-20 h-20 rounded-[1.5rem] bg-black/40 flex items-center justify-center border border-white/5 group-hover:border-white/10 transition-colors shadow-inner relative z-10">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[1.5rem] pointer-events-none" />
                                <app.icon className={`w-10 h-10 ${app.color} group-hover:scale-110 transition-transform duration-300 drop-shadow-lg`} />
                            </div>
                            
                            <span className="font-bold text-base text-white/90 group-hover:text-white text-center transition-colors z-10">
                                {app.title}
                            </span>
                        </motion.button>
                    ))}
                </motion.div>
                
                {apps.length === 0 && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-10 p-10 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 max-w-lg">
                         <p className="text-white/60 text-lg font-medium">No hay aplicaciones asignadas a tu cuenta. Contacta a un administrador.</p>
                     </motion.div>
                )}
            </div>

            {/* BRAND MODAL */}
            {showBrandModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-6 p-0">
                    <div 
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setShowBrandModal(false)}
                    />

                    <div className="relative bg-[#080d19]/95 backdrop-blur-2xl border border-white/10 sm:rounded-3xl w-full h-full sm:h-auto max-h-[90vh] sm:max-w-md shadow-2xl overflow-hidden flex flex-col z-50 transform transition-all">
                        <div className="flex justify-between items-start p-6 border-b border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent">
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                                    <Paintbrush className="w-5 h-5" style={{ color: session.secondary_color || '#06b6d4' }} /> 
                                    Personalizar Marca
                                </h2>
                                <p className="text-xs text-white/50 mt-1 font-medium">Configura la apariencia global de tu ecosistema SaaS</p>
                            </div>
                            <button onClick={() => setShowBrandModal(false)} className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSaveBrand} className="flex-1 overflow-y-auto p-6 space-y-5">
                            <div>
                                <label className="text-xs uppercase font-bold text-white/40 mb-1.5 block">Nombre de la Marca</label>
                                <input 
                                    required
                                    value={brandForm.brand_name}
                                    onChange={e => setBrandForm({...brandForm, brand_name: e.target.value})}
                                    placeholder="Ej. Mi Empresa SaaS" 
                                    className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white w-full focus:border-white/30 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase font-bold text-white/40 mb-1.5 flex items-center gap-2">
                                    <ImageIcon className="w-3 h-3" /> Logo de la Marca
                                </label>
                                <label 
                                    className={`flex items-center justify-center gap-3 bg-black/40 border border-dashed border-white/20 hover:border-cyan-500/40 rounded-xl px-4 py-4 cursor-pointer transition-all group ${isUploading ? 'opacity-60 pointer-events-none' : ''}`}
                                >
                                    <input 
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) handleLogoUpload(file);
                                        }}
                                    />
                                    {isUploading ? (
                                        <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
                                            <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                                            Subiendo imagen...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-white/50 group-hover:text-white/70 text-sm font-medium transition-colors">
                                            <Upload className="w-4 h-4" />
                                            {brandForm.logourl ? 'Cambiar logo' : 'Seleccionar logo desde tu computador'}
                                        </div>
                                    )}
                                </label>
                                {brandForm.logourl && (
                                    <div className="mt-3 text-center bg-black/20 p-3 rounded-xl border border-white/5">
                                        <img src={brandForm.logourl} alt="Preview" className="h-12 object-contain mx-auto" />
                                        <p className="text-[10px] text-white/30 mt-2 font-mono truncate">{brandForm.logourl}</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs uppercase font-bold text-white/40 mb-1.5 block">Color de Acento</label>
                                    <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-2 py-2">
                                        <input 
                                            type="color"
                                            value={brandForm.secondary_color}
                                            onChange={e => setBrandForm({...brandForm, secondary_color: e.target.value})}
                                            className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                                        />
                                        <span className="text-white/60 text-xs font-mono">{brandForm.secondary_color}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4 p-4 rounded-xl border border-white/5 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${brandForm.primary_color}, #000000)` }}>
                                <div className="text-sm font-bold text-white mb-2">Vista Previa In-App</div>
                                <div className="w-full py-2 rounded-lg text-center text-xs font-bold shadow-lg" style={{ backgroundColor: brandForm.secondary_color, color: '#fff' }}>
                                    Botón Primario
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5 mt-4">
                                <button type="submit" disabled={isSaving} className="w-full py-3.5 rounded-xl text-black font-bold flex justify-center items-center gap-2 hover:opacity-90 shadow-[0_0_20px_rgba(0,180,255,0.2)] transition-all" style={{ backgroundColor: brandForm.secondary_color || '#06b6d4' }}>
                                    {isSaving ? "Guardando cambios..." : <><Save className="w-4 h-4" /> Guardar Personalización</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

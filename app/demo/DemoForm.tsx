"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";

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

export default function DemoForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        empresa: "",
        cargo: "",
        web: "",
        pais: "",
        codigoPais: "+57",
        celular: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Extract primer_nombre for the payload
            const primerNombre = formData.nombre.trim().split(" ")[0];
            
            // Combine country code and phone number
            const fullPhoneNumber = `${formData.codigoPais} ${formData.celular.trim()}`;

            // Build the specific payload requested by user
            const payload = [
                {
                    "headers": {
                        "content-type": "application/json"
                    },
                    "params": {},
                    "query": {},
                    "body": {
                        "to_number": fullPhoneNumber,
                        "user_name": formData.nombre,
                        "mail": formData.email,
                        "primer_nombre": primerNombre,
                        "id_lead": crypto.randomUUID(), // Dynamic ID for tracking
                        "id_user": "aumatia-landing-web", // Source identifier
                        "cargo": formData.cargo || "N/A",
                        "empresa": formData.empresa || "N/A",
                        "tipo": "Nuevo"
                    },
                    "webhookUrl": "https://n8n.prosgo.co/webhook/llamada-prosgo",
                    "executionMode": "production"
                }
            ];

            const response = await fetch("https://n8n.prosgo.co/webhook/inbound-landing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error("Webhook submission failed");

            setIsSuccess(true);
        } catch (error) {
            console.error("Error submitting demo form:", error);
            alert("Hubo un error al procesar tu solicitud. Por favor intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl w-full max-w-3xl flex flex-col items-center justify-center text-center mx-auto min-h-[400px]">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6">
                    <Calendar className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">¡Solicitud Recibida!</h3>
                <p className="text-white/60 max-w-md">
                    Gracias por tu interés en Aumatia. Nuestro equipo se contactará contigo lo más pronto posible para agendar tu demostración personalizada.
                </p>
                <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 transition-colors"
                >
                    Enviar otra solicitud
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl w-full max-w-3xl mx-auto backdrop-blur-sm shadow-2xl relative z-10 overflow-hidden">
            {/* Background decorative glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                
                {/* 1. Nombre y Correo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/50 flex gap-1">
                            Nombre completo <span className="text-cyan-400 font-black">*</span>
                        </label>
                        <input 
                            required 
                            type="text" 
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Juan Pérez"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/50 flex gap-1">
                            Correo electrónico <span className="text-cyan-400 font-black">*</span>
                        </label>
                        <input 
                            required 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tu@empresa.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-medium"
                        />
                    </div>
                </div>

                {/* 2. Empresa y Cargo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/50 flex gap-1 items-center">
                            Empresa <span className="text-[10px] opacity-40 ml-1 font-normal">(Opcional)</span>
                        </label>
                        <input 
                            type="text" 
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleChange}
                            placeholder="Tu empresa"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/50 flex gap-1 items-center">
                            Cargo <span className="text-[10px] opacity-40 ml-1 font-normal">(Opcional)</span>
                        </label>
                        <input 
                            type="text" 
                            name="cargo"
                            value={formData.cargo}
                            onChange={handleChange}
                            placeholder="Gerente de Ventas"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-medium"
                        />
                    </div>
                </div>

                {/* 3. Sitio Web */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50 flex gap-1 items-center">
                        Link del sitio web <span className="text-[10px] opacity-40 ml-1 font-normal">(Opcional)</span>
                    </label>
                    <input 
                        type="url" 
                        name="web"
                        value={formData.web}
                        onChange={handleChange}
                        placeholder="https://www.tuempresa.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-medium"
                    />
                </div>

                {/* 4. País de la empresa */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50 flex gap-1">
                        País de la empresa <span className="text-cyan-400 font-black">*</span>
                    </label>
                    <div className="relative">
                        <select 
                            required
                            name="pais"
                            value={formData.pais}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-medium"
                        >
                            <option value="" disabled className="bg-slate-900 text-white/20">Selecciona tu país</option>
                            {countryCodes.map(c => (
                                <option key={`pais-select-${c.label}`} value={c.label.split(' (')[0]} className="bg-slate-900">
                                    {c.label.split(' (')[0]}
                                </option>
                            ))}
                            <option value="Otro" className="bg-slate-900">Otro</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                {/* 5. Número de celular */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50 flex gap-1">
                        Número de celular <span className="text-cyan-400 font-black">*</span>
                    </label>
                    <div className="flex gap-2">
                        <div className="relative w-48 shrink-0">
                            <select 
                                name="codigoPais"
                                value={formData.codigoPais}
                                onChange={handleChange}
                                className="w-full h-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white appearance-none focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-medium text-xs text-center"
                            >
                                {countryCodes.map(c => (
                                    <option key={`${c.label}-${c.code}`} value={c.code} className="bg-slate-900">{c.label}</option>
                                ))}
                            </select>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        <input 
                            required 
                            type="tel" 
                            name="celular"
                            value={formData.celular}
                            onChange={handleChange}
                            placeholder="310 883 4462"
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-medium"
                        />
                    </div>
                </div>

                {/* SUBMIT BUTTON - BRAND GRADIENT */}
                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl relative group overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-transform duration-300 group-hover:scale-105" />
                        
                        <div className="relative flex items-center justify-center gap-2 text-white font-black text-lg">
                            {isSubmitting ? (
                                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Calendar className="w-5 h-5" />
                                    Agendar demo
                                </>
                            )}
                        </div>
                    </button>
                    <p className="text-[10px] text-center text-white/30 mt-4 uppercase tracking-tighter">
                        Confirmación inmediata vía canales oficiales
                    </p>
                </div>

            </form>
        </div>
    );
}

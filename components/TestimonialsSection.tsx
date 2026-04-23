"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Andrés G.",
      role: "CEO, Tienda Multicanal",
      text: "Aumatia OS unificó nuestro stock físico con Mercado Libre. Nos ahorró 20 horas de trabajo manual a la semana y eliminó errores de inventario.",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
      name: "Valeria M.",
      role: "Gerente de Finanzas",
      text: "La integración con Siigo y la inteligencia de reportes me permite ver el ROI en tiempo real. Nunca fue tan fácil controlar la liquidez.",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      name: "Carlos P.",
      role: "Fundador B2B",
      text: "El agente de IA en WhatsApp ha incrementado nuestra generación de leads B2B en un 40%. Atiende, perfila y agenda reuniones 24/7.",
      avatar: "https://i.pravatar.cc/150?img=33"
    }
  ];

  return (
    <section className="py-24 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Prueba Social</span>
          <h2 className="text-4xl md:text-5xl font-black text-white">Resultados Reales</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:border-cyan-500/30 transition-colors"
            >
              <p className="text-white/80 mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <Image 
                  src={t.avatar} 
                  alt={`Avatar de ${t.name}`}
                  width={48} 
                  height={48} 
                  className="rounded-full"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-white/50 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

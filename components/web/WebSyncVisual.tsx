"use client";

import { motion } from "framer-motion";
import { Database, Share2, ShoppingCart, RefreshCw, Zap } from "lucide-react";

export default function WebSyncVisual() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center p-8 bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden">
      
      <div className="relative flex items-center justify-between w-full max-w-md gap-12">
        
        {/* Hub / Marketplace side */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center relative shadow-[0_0_20px_rgba(236,72,153,0.2)]">
            <Database className="w-8 h-8 text-fuchsia-400" />
            
            {/* Pulsing indicator */}
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-fuchsia-500 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest">Aumatia Hub</span>
        </div>

        {/* Sync Path */}
        <div className="flex-1 relative h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
                animate={{ 
                    x: ["-100%", "100%"]
                }}
                transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "linear" 
                }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-orange-400 to-transparent"
            />
            
            {/* Centered Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center">
                <RefreshCw className="w-4 h-4 text-orange-400 animate-spin-slow" />
            </div>
        </div>

        {/* E-commerce Storefront side */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center relative shadow-[0_0_20px_rgba(249,115,22,0.2)]">
            <ShoppingCart className="w-8 h-8 text-orange-400" />
          </div>
          <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Tienda Online</span>
        </div>

      </div>

      {/* Floating data particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
                opacity: [0, 1, 0],
                x: [0, (i % 2 === 0 ? 100 : -100)],
                y: [0, -50],
                scale: [0.5, 1, 0.5]
            }}
            transition={{ 
                duration: 3, 
                delay: i * 1, 
                repeat: Infinity, 
                ease: "easeInOut" 
            }}
            className="absolute bottom-1/4 left-1/2 w-2 h-2 rounded-full bg-orange-400/30"
        />
      ))}

      {/* Connection Indicator */}
      <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] text-green-400 font-mono">Sync Active</span>
      </div>
    </div>
  );
}

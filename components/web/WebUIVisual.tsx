"use client";

import { motion } from "framer-motion";
import { Smartphone, Monitor, Layout, Search, ShoppingBag } from "lucide-react";

export default function WebUIVisual() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center p-6 bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Responsive Mockups Container */}
      <div className="relative w-full max-w-sm flex items-end justify-center gap-4">
        
        {/* Mobile Mockup */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-20 w-[140px] h-[280px] bg-black rounded-[2.5rem] border-4 border-slate-800 shadow-2xl p-2"
        >
          <div className="w-full h-full rounded-[2rem] bg-slate-900 overflow-hidden relative">
            {/* Fake Website Content */}
            <div className="h-1/4 bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center p-2">
                <ShoppingBag className="w-8 h-8 text-orange-400" />
            </div>
            <div className="p-3 space-y-3">
              <div className="h-2 w-3/4 bg-white/10 rounded-full" />
              <div className="h-10 w-full bg-white/5 rounded-lg border border-white/5" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-12 bg-white/5 rounded-lg" />
                <div className="h-12 bg-white/5 rounded-lg" />
              </div>
            </div>
          </div>
          {/* Hardware buttons/notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-800 rounded-b-xl" />
        </motion.div>

        {/* Tablet/Desktop Mockup Fragment */}
        <motion.div 
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative z-10 w-[200px] h-[240px] bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden hidden sm:block"
        >
            <div className="p-4 border-b border-white/5 flex items-center gap-2">
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                    <div className="w-2 h-2 rounded-full bg-green-400/50" />
                </div>
            </div>
            <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                    <div className="h-3 w-20 bg-orange-500/30 rounded-full" />
                    <div className="flex gap-2">
                        <div className="w-4 h-4 bg-white/10 rounded" />
                        <div className="w-4 h-4 bg-white/10 rounded" />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-square bg-white/5 rounded-lg" />
                    <div className="aspect-square bg-white/5 rounded-lg" />
                    <div className="aspect-square bg-white/5 rounded-lg" />
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full" />
            </div>
        </motion.div>

        {/* Floating Icons */}
        <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-10 -right-4 w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/50 flex items-center justify-center backdrop-blur-md"
        >
            <Layout className="w-6 h-6 text-orange-400" />
        </motion.div>

      </div>
    </div>
  );
}

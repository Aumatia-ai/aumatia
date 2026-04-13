"use client";

import { useState, useEffect } from "react";
import { Search, X, Save, RefreshCw, ChevronDown } from "lucide-react";
import { fetchAllUsuariosAction, updateUsuarioAction } from "../actions/adminUserActions";
import type { UsuarioServer } from "../actions/adminUserActions";
import { useAuth } from "../../../core/auth/AuthContext";

const AVAILABLE_MODULES = [
    { id: "pos", name: "POS", description: "Punto de Venta unificado (Retail + Restaurante)." },
    { id: "marketplace", name: "Marketplace", description: "Tienda digital para publicar y vender productos." },
    { id: "finanzas", name: "Finanzas", description: "Panel financiero con flujos de caja y balances." },
    { id: "contactia", name: "ContactIA", description: "Asistente IA para atención al cliente." },
];


const Switch = ({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) => (
    <button
        type="button" role="switch" aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors ${checked ? 'bg-cyan-500' : 'bg-white/10'}`}
    >
        <span className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
);

export function UserManagement() {
    const [usuarios, setUsuarios] = useState<UsuarioServer[]>([]);
    const [filtered, setFiltered] = useState<UsuarioServer[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // Edit modal
    const [editing, setEditing] = useState<UsuarioServer | null>(null);
    const [editModules, setEditModules] = useState<Record<string, boolean>>({});
    const [editIndustry, setEditIndustry] = useState("retail");
    const [isSaving, setIsSaving] = useState(false);

    const { profile } = useAuth();

    useEffect(() => {
        loadUsuarios();
    }, []);

    useEffect(() => {
        if (!search.trim()) {
            setFiltered(usuarios);
        } else {
            const q = search.toLowerCase();
            setFiltered(usuarios.filter(u =>
                (u.email || "").toLowerCase().includes(q) ||
                (u.nombre || "").toLowerCase().includes(q) ||
                (u.brand_name || "").toLowerCase().includes(q)
            ));
        }
    }, [search, usuarios]);

    const loadUsuarios = async () => {
        setLoading(true);
        try {
            const data = await fetchAllUsuariosAction();
            setUsuarios(data);
        } catch (err) {
            console.error("Error loading usuarios:", err);
            alert("Error al cargar usuarios.");
        } finally {
            setLoading(false);
        }
    };

    // Normalize active_modules: DB may store as array ["pos","finanzas"] or object {pos:true}
    const normalizeModules = (mods: any): Record<string, boolean> => {
        if (!mods) return {};
        if (Array.isArray(mods)) {
            const obj: Record<string, boolean> = {};
            mods.forEach((m: string) => { obj[m] = true; });
            return obj;
        }
        return mods as Record<string, boolean>;
    };

    const openEdit = (u: UsuarioServer) => {
        setEditing(u);
        setEditModules(normalizeModules(u.active_modules));
        setEditIndustry(u.industry || "retail");
    };

    const handleSave = async () => {
        if (!editing) return;
        setIsSaving(true);
        try {
            await updateUsuarioAction(editing.id, {
                active_modules: editModules,
                industry: editIndustry,
            });
            setUsuarios(prev => prev.map(u => u.id === editing.id ? { ...u, active_modules: editModules, industry: editIndustry } : u));
            alert("Usuario actualizado.");
            setEditing(null);
        } catch (err: any) {
            alert("Error: " + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    // Only these 4 module IDs are valid in the new architecture
    const VALID_MODULE_IDS = ["pos", "marketplace", "finanzas", "contactia"];
    const MODULE_NAMES: Record<string, string> = {
        pos: "POS",
        marketplace: "Marketplace",
        finanzas: "Finanzas",
        contactia: "ContactIA",
    };

    const getActiveModuleNames = (mods: any) => {
        const normalized = normalizeModules(mods);
        const active = VALID_MODULE_IDS.filter(id => normalized[id]);
        if (active.length === 0) return "Ninguno";
        return active.map(m => MODULE_NAMES[m]).join(", ");
    };

    return (
        <div className="w-full min-h-screen p-6 lg:p-12 transition-colors" style={{ backgroundColor: profile?.primary_color || '#050b14' }}>
            <div className="max-w-6xl mx-auto space-y-8 relative z-10">

                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Panel de Administración</h1>
                    <p className="text-white/60 text-sm max-w-xl">Gestiona todos los usuarios SaaS registrados en la plataforma. Edita roles y módulos autorizados.</p>
                </div>

                <div className="bg-[#0b1221]/90 backdrop-blur-2xl border border-white/5 overflow-hidden rounded-2xl shadow-xl">
                    {/* Toolbar */}
                    <div className="p-5 border-b border-white/5 flex flex-col md:flex-row md:justify-between items-start md:items-center bg-white/[0.02] gap-4">
                        <div className="relative w-full md:w-80">
                            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                            <input
                                value={search} onChange={e => setSearch(e.target.value)}
                                placeholder="Buscar por nombre, email o marca..."
                                className="bg-[#050b14]/50 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white w-full focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
                            />
                        </div>
                        <button onClick={loadUsuarios} className="flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors">
                            <RefreshCw className="w-4 h-4" /> Refrescar
                        </button>
                    </div>

                    {loading ? (
                        <div className="p-20 flex justify-center items-center flex-col gap-4">
                            <RefreshCw className="w-8 h-8 animate-spin text-cyan-500" />
                            <p className="text-white/40 text-sm font-medium">Cargando usuarios...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left align-middle border-collapse">
                                <thead className="text-xs text-white/60 tracking-wider uppercase bg-black/20 border-b border-white/5">
                                    <tr>
                                        <th className="px-6 py-5 font-bold">Usuario</th>
                                        <th className="px-6 py-5 font-bold">Marca</th>
                                        <th className="px-6 py-5 font-bold">Industria</th>
                                        <th className="px-6 py-5 font-bold">Módulos</th>
                                        <th className="px-6 py-5 font-bold text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((u) => (
                                        <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-white/90 group-hover:text-white mb-0.5">{u.nombre || "Sin nombre"}</span>
                                                    <span className="text-white/40 text-xs tracking-wide">{u.email}</span>
                                                    {u.telefono && <span className="text-white/30 text-xs mt-0.5">{u.telefono}</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-white/70 text-xs font-medium">{u.brand_name || "—"}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-md text-xs font-bold border ${
                                                    u.industry === 'restaurant' 
                                                        ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' 
                                                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                }`}>
                                                    {u.industry === 'restaurant' ? 'Restaurante' : 'Retail'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-white/50 text-xs font-medium leading-relaxed">
                                                    {getActiveModuleNames(u.active_modules)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => openEdit(u)}
                                                    className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors bg-white/5 hover:bg-white/10 text-white h-9 px-4 py-2 border border-white/10 hover:border-white/20 whitespace-nowrap shadow-sm"
                                                >
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filtered.length === 0 && (
                                <div className="text-center p-10 text-white/50 text-sm font-medium">
                                    {search ? "No se encontraron resultados." : "No hay usuarios registrados."}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* EDIT MODAL */}
            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-6 p-0">
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setEditing(null)} />

                    <div className="relative bg-[#080d19]/95 backdrop-blur-2xl border border-white/10 sm:rounded-3xl w-full h-full sm:h-auto max-h-[90vh] sm:max-w-lg shadow-2xl overflow-hidden flex flex-col z-50">
                        {/* Header */}
                        <div className="flex justify-between items-start p-6 border-b border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent">
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight">Editar Usuario</h2>
                                <p className="text-sm mt-1" style={{ color: profile?.secondary_color || '#06b6d4' }}>{editing.email}</p>
                                {editing.nombre && <p className="text-xs text-white/40 mt-0.5">{editing.nombre}</p>}
                            </div>
                            <button onClick={() => setEditing(null)} className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Industry */}
                            <div>
                                <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-2">Industria</p>
                                <p className="text-[11px] text-white/25 mb-3 font-medium">Define el tipo de negocio para que el POS cargue la interfaz correcta.</p>
                                <div className="relative">
                                    <select
                                        value={editIndustry}
                                        onChange={e => setEditIndustry(e.target.value)}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-500/50 transition-colors"
                                    >
                                        <option value="retail" className="bg-[#0b1221]">Retail (Tienda / Comercio)</option>
                                        <option value="restaurant" className="bg-[#0b1221]">Restaurante</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-white/30 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                            {/* Modules */}
                            <div>
                                <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">Módulos Autorizados</p>
                                <p className="text-[11px] text-white/25 mb-3 font-medium">Define a qué módulos tiene acceso este usuario en el Launcher.</p>
                                <div className="space-y-3">
                                    {AVAILABLE_MODULES.map(mod => (
                                        <div key={mod.id} className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                            <div className="flex flex-col gap-0.5 pr-4">
                                                <label
                                                    className="text-sm font-bold text-white/90 cursor-pointer"
                                                    onClick={() => setEditModules(p => ({ ...p, [mod.id]: !p[mod.id] }))}
                                                >
                                                    {mod.name}
                                                </label>
                                                <p className="text-xs text-white/40 font-medium">{mod.description}</p>
                                            </div>
                                            <Switch
                                                checked={!!editModules[mod.id]}
                                                onChange={val => setEditModules(prev => ({ ...prev, [mod.id]: val }))}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 flex justify-end gap-3 bg-black/40">
                            <button
                                onClick={() => setEditing(null)}
                                className="px-6 py-3 rounded-xl text-sm font-bold text-white/80 border border-white/10 hover:bg-white/5 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-6 py-3 rounded-xl text-sm font-bold text-black flex items-center gap-2 min-w-[150px] justify-center hover:opacity-90 transition-all shadow-lg"
                                style={{ backgroundColor: profile?.secondary_color || '#06b6d4' }}
                            >
                                {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

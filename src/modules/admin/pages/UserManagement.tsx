"use client";

import { useState, useEffect } from "react";
import { Search, X, UserCog, Save, RefreshCw, PlusCircle } from "lucide-react";
import { fetchTenantUsersAction, updateUserModulesAction, createAdminUserAction } from "../actions/adminUserActions";
import type { TenantUserServer } from "../actions/adminUserActions";
import { useAuth } from "../../../core/auth/AuthContext";

// Native Shadcn-like Components
const Card = ({ children, className = "" }: any) => (
  <div className={`bg-background shadow-sm ${className}`}>{children}</div>
);

const Switch = ({ checked, onChange }: { checked: boolean, onChange: (val: boolean) => void }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`
      peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50
      ${checked ? 'bg-cyan-500' : 'bg-muted/30 border-white/10'}
    `}
  >
    <span
      className={`
        pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform
        ${checked ? 'translate-x-5' : 'translate-x-0'}
      `}
    />
  </button>
);

const MODULE_GROUPS = [
    {
        label: "Tipo de POS",
        description: "Define qué vista de Punto de Venta verá este usuario al iniciar sesión. Activa solo uno.",
        modules: [
            { id: "pos_retail", name: "POS Retail", description: "Punto de Venta para tiendas, almacenes y comercio minorista." },
            { id: "pos_restaurant", name: "POS Restaurante", description: "Punto de Venta para restaurantes, cafeterías y servicio de alimentos." },
        ]
    },
    {
        label: "Módulos Internos del POS",
        description: "Sub-módulos operativos disponibles dentro del Punto de Venta.",
        modules: [
            { id: "billing", name: "Facturación", description: "Emisión de recibos, facturas y Notas de Crédito." },
            { id: "inventory", name: "Inventario", description: "Control de inventarios, ajustes y conteos de stock." },
            { id: "credit_notes", name: "Devoluciones", description: "Aprobación y emisión de devoluciones en tienda." },
            { id: "reports", name: "Reportes", description: "Reportes de cierre de caja, transacciones y ventas." },
        ]
    },
    {
        label: "Aplicaciones del Ecosistema",
        description: "Apps externas de Aumatia accesibles desde el Launcher.",
        modules: [
            { id: "marketplace", name: "Marketplace", description: "Tienda digital para publicar y vender productos online." },
            { id: "finanzas", name: "Finanzas", description: "Panel financiero con flujos de caja, balances y proyecciones." },
            { id: "contactia", name: "ContactIA", description: "Asistente de inteligencia artificial para atención al cliente." },
        ]
    }
];

export function UserManagement() {
    const [users, setUsers] = useState<TenantUserServer[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<TenantUserServer | null>(null);
    const [localModules, setLocalModules] = useState<Record<string, boolean>>({});
    const [isSaving, setIsSaving] = useState(false);

    // Create User States
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newUserForm, setNewUserForm] = useState({
        email: "",
        full_name: "",
        password: "",
        role: "cashier"
    });

    const { profile, loading: authLoading } = useAuth();
    const currentTenantId = profile?.tenant_id || ""; 

    useEffect(() => {
        if (!authLoading && currentTenantId) {
            fetchUsers();
        }
    }, [authLoading, currentTenantId]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await fetchTenantUsersAction(currentTenantId);
            setUsers(data);
        } catch (error) {
            console.error("UserManagement.fetchUsers Falló con DB:", error);
            alert("No pudimos cargar los usuarios desde Supabase. Revisa la consola.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenUser = (u: TenantUserServer) => {
        setSelectedUser(u);
        setLocalModules(u.active_modules || {});
    };

    const handleSaveModules = async () => {
        if (!selectedUser) return;
        setIsSaving(true);
        try {
            await updateUserModulesAction(selectedUser.id, localModules);
            setUsers(users.map(u => u.id === selectedUser.id ? { ...u, active_modules: localModules } : u));
            alert("Permisos actualizados y persistidos con éxito.");
            setSelectedUser(null);
        } catch (e: any) {
            console.error("Failed to save modules in DB:", e);
            alert("Error al actualizar permisos DB: " + (e?.message || JSON.stringify(e)));
        } finally {
            setIsSaving(false);
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUserForm.email || !newUserForm.full_name || !newUserForm.password) {
            return alert("Por favor, completa todos los campos del usuario.");
        }
        
        setIsCreating(true);
        try {
            await createAdminUserAction({
                email: newUserForm.email,
                full_name: newUserForm.full_name,
                password: newUserForm.password,
                role: newUserForm.role,
                tenant_id: currentTenantId
            });
            setShowCreateModal(false);
            setNewUserForm({ email: "", full_name: "", password: "", role: "cashier" });
            fetchUsers(); // Refresh list to see the newly created one
        } catch (err: any) {
            console.error("handleCreateUser err:", err);
            alert("Hubo un error al crear el usuario: " + (err.message || JSON.stringify(err)));
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#050b14] p-6 lg:p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Cabecera */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Gestión de Usuarios</h1>
                        <p className="text-white/50 text-sm max-w-xl">Administra los accesos y controla explícitamente cuáles módulos operacionales de Aumatia POS puede ejecutar cada integrante de tu equipo.</p>
                    </div>
                </div>

                {/* Contenedor Principal (Tarjeta estilo Shadcn) */}
                <Card className="bg-[#0b1221] border-white/5 border overflow-hidden rounded-2xl shadow-xl">
                    <div className="p-5 border-b border-white/5 flex flex-col md:flex-row md:justify-between items-start md:items-center bg-white/[0.02] gap-4">
                        <div className="relative w-full md:w-80">
                            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                            <input 
                                placeholder="Buscar usuario por nombre o correo..." 
                                className="bg-[#050b14]/50 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white w-full focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
                            />
                        </div>
                        <button 
                            onClick={() => setShowCreateModal(true)}
                            className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 px-4 py-2 font-bold text-sm rounded-xl transition flex items-center shadow-lg"
                        >
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Crear Usuario
                        </button>
                    </div>

                    {loading ? (
                        <div className="p-20 flex justify-center items-center flex-col gap-4">
                            <RefreshCw className="w-8 h-8 animate-spin text-cyan-500" />
                            <p className="text-white/40 text-sm font-medium">Cargando cuentas...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left align-middle border-collapse">
                                <thead className="text-xs text-white/60 tracking-wider uppercase bg-black/20 border-b border-white/5">
                                    <tr>
                                        <th className="px-6 py-5 font-bold">Usuario</th>
                                        <th className="px-6 py-5 font-bold">Rol en Tenant</th>
                                        <th className="px-6 py-5 font-bold">Estado</th>
                                        <th className="px-6 py-5 font-bold text-right">Permisos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-white/90 group-hover:text-white mb-0.5">{u.users?.full_name || "Usuario del Sistema"}</span>
                                                    <span className="text-white/40 text-xs tracking-wide">{u.users?.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-white/10 border border-white/5 px-3 py-1 flex items-center justify-center w-fit min-w-[80px] rounded-md text-xs font-semibold text-white/80 capitalize">
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${u.is_active ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`} />
                                                    <span className="text-white/80 text-xs font-medium">{u.is_active ? 'Activo' : 'Suspendido'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => handleOpenUser(u)}
                                                    className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors bg-white/5 hover:bg-white/10 text-white h-9 px-4 py-2 border border-white/10 hover:border-white/20 whitespace-nowrap shadow-sm"
                                                >
                                                    <UserCog className="w-4 h-4 mr-2 text-cyan-400" />
                                                    Gestionar Módulos
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {users.length === 0 && (
                                <div className="text-center p-10 text-white/40 text-sm">No existen usuarios registrados en este tenant.</div>
                            )}
                        </div>
                    )}
                </Card>
            </div>

            {/* User Permissions Modal / Drawer */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-6 p-0">
                    <div 
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedUser(null)}
                    />

                    <div className="relative bg-[#080d19] border border-white/10 sm:rounded-3xl w-full h-full sm:h-auto max-h-[90vh] sm:max-w-xl shadow-2xl overflow-hidden flex flex-col z-50 transform transition-all">
                        {/* Header */}
                        <div className="flex justify-between items-start p-6 border-b border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent">
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                                    <ShieldCheckIcon className="w-5 h-5 text-cyan-400" /> Control de Acceso
                                </h2>
                                <p className="text-sm text-cyan-500 mt-1.5 font-medium">{selectedUser.users?.email}</p>
                            </div>
                            <button onClick={() => setSelectedUser(null)} className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Body List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {MODULE_GROUPS.map((group) => (
                                <div key={group.label}>
                                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">{group.label}</p>
                                    <p className="text-[11px] text-white/25 mb-3 font-medium">{group.description}</p>
                                    <div className="space-y-3">
                                        {group.modules.map((mod) => (
                                            <div key={mod.id} className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                                                <div className="flex flex-col gap-1 pr-6">
                                                    <label className="text-sm font-bold text-white/90 group-hover:text-white transition-colors cursor-pointer" onClick={() => setLocalModules(p => ({...p, [mod.id]: !p[mod.id]}))}>
                                                        {mod.name}
                                                    </label>
                                                    <p className="text-xs text-white/40 leading-relaxed font-medium">{mod.description}</p>
                                                </div>
                                                <Switch 
                                                    checked={!!localModules[mod.id]} 
                                                    onChange={(val) => setLocalModules(prev => ({...prev, [mod.id]: val}))}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 flex justify-end gap-3 bg-black/40">
                            <button 
                                onClick={() => setSelectedUser(null)}
                                className="px-6 py-3 rounded-xl text-sm font-bold text-white/80 border border-white/10 hover:bg-white/5 hover:text-white transition-all"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleSaveModules}
                                disabled={isSaving}
                                className="px-6 py-3 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 transition-all flex items-center justify-center gap-2 min-w-[150px] shadow-[0_0_20px_rgba(0,180,255,0.3)] hover:shadow-[0_0_30px_rgba(0,180,255,0.5)]"
                            >
                                {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                {isSaving ? 'Guardando...' : 'Aplicar Cambios'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create User Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-6 p-0">
                    <div 
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setShowCreateModal(false)}
                    />

                    <div className="relative bg-[#080d19] border border-white/10 sm:rounded-3xl w-full h-full sm:h-auto max-h-[90vh] sm:max-w-md shadow-2xl overflow-hidden flex flex-col z-50 transform transition-all">
                        <div className="flex justify-between items-start p-6 border-b border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent">
                            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                                <PlusCircle className="w-5 h-5 text-cyan-400" /> Registrar Integrante
                            </h2>
                            <button onClick={() => setShowCreateModal(false)} className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleCreateUser} className="flex-1 overflow-y-auto p-6 space-y-4">
                            <div>
                                <label className="text-xs uppercase font-bold text-white/40 mb-1.5 block">Nombre Completo</label>
                                <input 
                                    required
                                    value={newUserForm.full_name}
                                    onChange={e => setNewUserForm({...newUserForm, full_name: e.target.value})}
                                    placeholder="Ej. Juan Pérez" 
                                    className="bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white w-full focus:border-cyan-500/50 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase font-bold text-white/40 mb-1.5 block">Correo Electrónico</label>
                                <input 
                                    required type="email"
                                    value={newUserForm.email}
                                    onChange={e => setNewUserForm({...newUserForm, email: e.target.value})}
                                    placeholder="juan@empresa.com" 
                                    className="bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white w-full focus:border-cyan-500/50 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase font-bold text-white/40 mb-1.5 block">Rol en el Tenant</label>
                                <select 
                                    value={newUserForm.role}
                                    onChange={e => setNewUserForm({...newUserForm, role: e.target.value})}
                                    className="bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white w-full focus:border-cyan-500/50 outline-none appearance-none"
                                >
                                    <option value="admin">Administrador (Total)</option>
                                    <option value="manager">Gerente (Parcial)</option>
                                    <option value="cashier">Cajero (Operativo)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs uppercase font-bold text-white/40 mb-1.5 block">Contraseña de Ingreso</label>
                                <input 
                                    required type="text"
                                    value={newUserForm.password}
                                    onChange={e => setNewUserForm({...newUserForm, password: e.target.value})}
                                    placeholder="Ej. Temporal123!" 
                                    className="bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white w-full focus:border-cyan-500/50 outline-none"
                                />
                            </div>

                            <div className="pt-4 border-t border-white/5 flex gap-3 mt-8">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-white/80 font-bold hover:bg-white/5">
                                    Cancelar
                                </button>
                                <button type="submit" disabled={isCreating} className="flex-1 py-3 rounded-xl text-black bg-cyan-500 hover:bg-cyan-400 font-bold flex justify-center items-center gap-2">
                                    {isCreating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Crear
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper para el ícono de escudo en el modal
function ShieldCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

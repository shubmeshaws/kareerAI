"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
    Key,
    Plus,
    Trash2,
    Eye,
    EyeOff,
    Clock,
    Shield,
    Zap,
    AlertCircle,
    Activity as ActivityIcon,
    ChevronRight,
    Play,
    ArrowRight,
    Cpu,
    Unlock,
    Lock
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
    getAIKeys,
    saveAIKey,
    deleteAIKey,
    toggleAIKey,
    AIKey,
    AIProvider,
    callAIWithFallback
} from "@/lib/ai-key-service";
import { getAuditLogs, AuditLog } from "@/lib/audit-service";
import { toast } from "sonner";

const providers: AIProvider[] = ["Anthropic", "OpenAI", "Google Gemini", "Groq", "Putter.js"];

export default function AIKeysPage() {
    const [keys, setKeys] = useState<AIKey[]>([]);
    const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newKey, setNewKey] = useState({ provider: "Anthropic" as AIProvider, label: "", key: "", dailyLimit: 1000 });
    const [showKeyId, setShowKeyId] = useState<string | null>(null);
    const [isTesting, setIsTesting] = useState(false);

    useEffect(() => {
        refreshData();
        const handleStorageChange = () => refreshData();
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('audit-change', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('audit-change', handleStorageChange);
        };
    }, []);

    const refreshData = async () => {
        const keysData = await getAIKeys();
        setKeys(keysData);
        setAuditLogs(getAuditLogs().slice(0, 10));
    };

    const handleAddKey = () => {
        if (!newKey.label || !newKey.key) {
            toast.error("Please fill in all fields");
            return;
        }
        saveAIKey({
            provider: newKey.provider,
            label: newKey.label,
            key: newKey.key,
            enabled: true,
            dailyLimit: newKey.dailyLimit
        });
        setIsAddModalOpen(false);
        setNewKey({ provider: "Anthropic", label: "", key: "", dailyLimit: 1000 });
        toast.success("AI Key added and encrypted");
    };

    const handleTestFallback = async () => {
        setIsTesting(true);
        try {
            const result = await callAIWithFallback("Test prompt for fallback validation");
            toast.success(`Success! Handled by ${result.provider}`);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsTesting(false);
            refreshData();
        }
    };

    return (
        <div className="flex-1 flex overflow-hidden p-3 gap-3 h-full max-h-screen">
            {/* Column 2: Main Workspace */}
            <main className="flex-1 bg-white dark:bg-black/20 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-white/5 flex flex-col overflow-hidden relative">
                {/* Header - Compact */}
                <header className="p-4 flex items-center justify-between shrink-0 border-b border-gray-50 dark:border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
                            <Key className="w-4 h-4" />
                        </div>
                        <div>
                            <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">AI Access Keys</h1>
                            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Vector Governance</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="h-8 px-3 rounded-full border-gray-200 dark:border-white/10 font-bold text-[10px] uppercase tracking-wide hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2"
                            onClick={handleTestFallback}
                            disabled={isTesting}
                        >
                            <Play className={`w-3 h-3 ${isTesting ? 'animate-spin' : ''}`} />
                            {isTesting ? "Testing..." : "Test Fallback"}
                        </Button>

                        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-black dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-200 text-white dark:text-black px-4 h-8 rounded-full font-bold text-[10px] uppercase tracking-wide shadow-md transition-all flex items-center gap-2">
                                    <Plus className="w-3 h-3" />
                                    Add Key
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="rounded-2xl border-gray-100 dark:border-white/10 shadow-2xl p-6 bg-white dark:bg-[#0E121B] max-w-sm">
                                <DialogHeader>
                                    <DialogTitle className="text-base font-black text-slate-900 dark:text-white tracking-tight mb-2">Register Provider</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-2">
                                    <div className="space-y-1">
                                        <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Backbone Provider</Label>
                                        <select
                                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg h-9 px-3 text-xs font-bold focus:ring-black dark:focus:ring-white outline-none appearance-none"
                                            value={newKey.provider}
                                            onChange={(e) => setNewKey({ ...newKey, provider: e.target.value as AIProvider })}
                                        >
                                            {providers.map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Identification Label</Label>
                                        <Input
                                            placeholder="e.g. Master Cluster Production"
                                            className="h-9 rounded-lg bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 font-bold text-xs"
                                            value={newKey.label}
                                            onChange={(e) => setNewKey({ ...newKey, label: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Secret Token</Label>
                                        <div className="relative">
                                            <Input
                                                type="password"
                                                placeholder="••••••••••••••••"
                                                className="h-9 rounded-lg bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 font-bold text-xs pr-8"
                                                value={newKey.key}
                                                onChange={(e) => setNewKey({ ...newKey, key: e.target.value })}
                                            />
                                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300 dark:text-slate-600" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Daily Quota (Calls)</Label>
                                        <Input
                                            type="number"
                                            className="h-9 rounded-lg bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 font-bold text-xs"
                                            value={newKey.dailyLimit}
                                            onChange={(e) => setNewKey({ ...newKey, dailyLimit: parseInt(e.target.value) })}
                                        />
                                    </div>
                                </div>
                                <DialogFooter className="mt-4 gap-2">
                                    <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="flex-1 rounded-lg h-9 font-black uppercase text-[9px] tracking-widest border-gray-200 dark:border-white/10">Abort</Button>
                                    <Button onClick={handleAddKey} className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-gray-200 rounded-lg h-9 font-black uppercase text-[9px] tracking-widest">Commit Key</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </header>

                {/* Content Area - Scrollable */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
                    {providers.map(provider => {
                        const providerKeys = keys.filter(k => k.provider === provider);
                        return (
                            <section key={provider} className={`relative transition-all ${providerKeys.length === 0 ? 'opacity-50 hover:opacity-100 grayscale hover:grayscale-0' : ''}`}>
                                <div className="flex items-center gap-3 mb-3 pl-1">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-black group-hover:text-white transition-all">
                                        <Cpu className="w-4 h-4" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">{provider}</h3>
                                        <p className="text-[10px] font-bold text-slate-900 dark:text-white">{providerKeys.length} Logic Handlers</p>
                                    </div>
                                    <div className="flex-1 border-t border-gray-50 dark:border-white/5 ml-4" />
                                </div>

                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                                    {providerKeys.map(k => (
                                        <Card key={k.id} className="p-4 rounded-[1.25rem] bg-white dark:bg-black/20 border border-gray-100 dark:border-white/5 hover:border-black dark:hover:border-white/20 hover:shadow-lg transition-all group overflow-hidden relative">
                                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform dark:invert">
                                                <Key className="w-10 h-10" strokeWidth={1} />
                                            </div>

                                            <div className="flex justify-between items-start mb-4">
                                                <div className="space-y-0.5">
                                                    <h4 className="font-black text-slate-900 dark:text-white text-sm italic uppercase tracking-tight">{k.label}</h4>
                                                    <div className="flex items-center gap-1.5">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${k.enabled ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]' : 'bg-slate-200 dark:bg-slate-700'}`} />
                                                        <span className="text-[9px] font-black uppercase italic text-slate-400 dark:text-slate-500">{k.enabled ? 'Streaming' : 'Locked'}</span>
                                                    </div>
                                                </div>
                                                <Switch checked={k.enabled} onCheckedChange={() => toggleAIKey(k.id)} className="data-[state=checked]:bg-black dark:data-[state=checked]:bg-white scale-75 origin-right" />
                                            </div>

                                            <div className="space-y-3 relative z-10">
                                                <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                                    <span>Consumption</span>
                                                    <span>{k.usageToday} / {k.dailyLimit}</span>
                                                </div>
                                                <div className="h-1 w-full bg-gray-50 dark:bg-white/5 rounded-full overflow-hidden border border-gray-100/50 dark:border-white/5">
                                                    <div
                                                        className={`h-full transition-all duration-1000 ${k.usageToday >= k.dailyLimit ? 'bg-rose-500' : 'bg-black dark:bg-white'}`}
                                                        style={{ width: `${Math.min(100, (k.usageToday / k.dailyLimit) * 100)}%` }}
                                                    />
                                                </div>

                                                <div className="pt-3 flex items-center justify-between border-t border-gray-50 dark:border-white/5 mt-3">
                                                    <p className="text-[8px] font-bold text-slate-300 dark:text-slate-600 uppercase">
                                                        {k.lastUsed ? `Last Signal: ${new Date(k.lastUsed).toLocaleTimeString()}` : "Idle"}
                                                    </p>
                                                    <div className="flex gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7 rounded-lg text-slate-400 dark:text-slate-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                                                            onClick={() => setShowKeyId(showKeyId === k.id ? null : k.id)}
                                                        >
                                                            {showKeyId === k.id ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7 rounded-lg text-slate-400 dark:text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                                                            onClick={() => deleteAIKey(k.id)}
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            {showKeyId === k.id && (
                                                <div className="mt-3 p-2 bg-slate-900 border border-slate-800 rounded-lg font-mono text-[8px] text-white/60 break-all animate-in slide-in-from-top-2">
                                                    {k.key}
                                                </div>
                                            )}
                                        </Card>
                                    ))}
                                    {providerKeys.length === 0 && (
                                        <div className="col-span-1 xl:col-span-2 py-4 flex items-center justify-center border border-dashed border-gray-100 dark:border-white/10 rounded-[1rem] opacity-30">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 italic">No nodes configured.</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </main>

            {/* Column 3: Security & Governance - Compact */}
            <aside className="w-[280px] hidden xl:flex flex-col gap-3 overflow-hidden">
                <div className="flex-1 bg-white dark:bg-black/20 rounded-[1.5rem] p-5 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col relative overflow-hidden group">
                    {/* Decorative Gradients */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Security Core</h2>
                        <Badge variant="outline" className="text-[8px] font-bold uppercase bg-white/50 dark:bg-white/5 backdrop-blur-sm border-gray-100 dark:border-white/10">Hardened</Badge>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 font-italic">Fallback Chain</h3>
                        <div className="space-y-3">
                            {providers.map((p, i) => (
                                <div key={p} className="flex items-center gap-3 group cursor-help">
                                    <div className="w-6 h-6 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center text-[9px] font-black text-slate-400 dark:text-slate-500 border border-gray-100 dark:border-white/5 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all">
                                        {i + 1}
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-tighter">{p}</span>
                                    {i < providers.length - 1 && (
                                        <div className="flex-1 border-t border-gray-50 dark:border-white/5 border-dashed" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-gray-50 dark:bg-white/5" />

                    <div className="flex-1 min-h-0 flex flex-col pt-4">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Security Events</h3>
                        <div className="space-y-3 overflow-y-auto custom-scrollbar flex-1 pr-2">
                            {auditLogs.map((log) => (
                                <div key={log.id} className="flex flex-col gap-1 group">
                                    <div className="flex justify-between items-center">
                                        <Badge variant="outline" className={`text-[7px] font-black border-0 px-1.5 h-4 ${log.action === 'KEY_DELETE' ? 'bg-rose-50 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400' :
                                            log.action === 'KEY_ADD' ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                                                'bg-gray-50 dark:bg-white/10 text-slate-400 dark:text-slate-500'
                                            }`}>
                                            {log.action}
                                        </Badge>
                                        <span className="text-[8px] font-black text-slate-300 dark:text-slate-600 italic">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                    <p className="text-[9px] font-bold text-slate-600 dark:text-slate-300 leading-tight pl-1">{log.details}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-50 dark:border-white/5">
                        <div className="p-4 bg-[#111] dark:bg-white/5 rounded-2xl text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex justify-between items-center mb-2">
                                <Shield className="w-4 h-4 opacity-40 group-hover:rotate-12 transition-transform" />
                                <Unlock className="w-3 h-3 opacity-40" />
                            </div>
                            <h4 className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Vault Status</h4>
                            <p className="text-sm font-black italic tracking-tighter">AES-256 ROTATION</p>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}

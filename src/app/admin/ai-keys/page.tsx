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
    Activity,
    ChevronDown,
    ChevronUp,
    Play
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

    const refreshData = () => {
        setKeys(getAIKeys());
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
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">AI Multi-Provider Keys</h1>
                    <p className="text-slate-400">Manage fallback chains, daily limits, and encrypted API keys.</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="border-slate-800 text-indigo-400 hover:bg-slate-900 border-2"
                        onClick={handleTestFallback}
                        disabled={isTesting}
                    >
                        <Play className={`w-4 h-4 mr-2 ${isTesting ? 'animate-spin' : ''}`} />
                        {isTesting ? "Testing..." : "Test Fallback Chain"}
                    </Button>
                    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Key
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-900 border-slate-800 text-white">
                            <DialogHeader>
                                <DialogTitle>Add AI Provider Key</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Provider</Label>
                                    <select
                                        className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-sm focus:border-indigo-500 outline-none"
                                        value={newKey.provider}
                                        onChange={(e) => setNewKey({ ...newKey, provider: e.target.value as AIProvider })}
                                    >
                                        {providers.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Key Label</Label>
                                    <Input
                                        placeholder="e.g. Production Main / Backup Key"
                                        className="bg-slate-950 border-slate-800"
                                        value={newKey.label}
                                        onChange={(e) => setNewKey({ ...newKey, label: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>API Key</Label>
                                    <Input
                                        type="password"
                                        placeholder="Paste your key here (will be encrypted)"
                                        className="bg-slate-950 border-slate-800"
                                        value={newKey.key}
                                        onChange={(e) => setNewKey({ ...newKey, key: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Daily Usage Limit (Calls)</Label>
                                    <Input
                                        type="number"
                                        className="bg-slate-950 border-slate-800"
                                        value={newKey.dailyLimit}
                                        onChange={(e) => setNewKey({ ...newKey, dailyLimit: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="border-slate-800">Cancel</Button>
                                <Button onClick={handleAddKey} className="bg-indigo-600 hover:bg-indigo-700">Add & Encrypt</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Fallback Order Visualization */}
                <Card className="lg:col-span-1 p-6 bg-slate-900 border-slate-800 h-fit">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-indigo-400" />
                        Priority Fallback
                    </h3>
                    <div className="space-y-4">
                        {providers.map((p, i) => (
                            <div key={p} className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                    {i + 1}
                                </span>
                                <span className="text-sm font-medium text-slate-200">{p}</span>
                                {i < providers.length - 1 && (
                                    <div className="flex-1 border-t border-slate-800 border-dashed ml-2" />
                                )}
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Provider Keys Management */}
                <div className="lg:col-span-3 space-y-6">
                    {providers.map(provider => {
                        const providerKeys = keys.filter(k => k.provider === provider);
                        return (
                            <Card key={provider} className={`p-6 bg-slate-900 border-slate-800 ${providerKeys.length === 0 ? 'opacity-50 grayscale' : ''}`}>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${providerKeys.length > 0 ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-500'}`}>
                                            <Zap className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white uppercase text-xs tracking-widest">{provider}</h3>
                                            <p className="text-[10px] text-slate-500">{providerKeys.length} configured keys</p>
                                        </div>
                                    </div>
                                    {providerKeys.length === 0 && (
                                        <Badge variant="outline" className="text-[9px] border-slate-800 text-slate-500">UNUSED</Badge>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    {providerKeys.map(k => (
                                        <div key={k.id} className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-4">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-slate-200 text-sm">{k.label}</span>
                                                        <Badge className={`text-[9px] h-4 px-1.5 ${k.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                                                            {k.enabled ? 'ACTIVE' : 'DISABLED'}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-[10px] text-slate-500">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {k.lastUsed ? `Used ${new Date(k.lastUsed).toLocaleTimeString()}` : "Never used"}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Activity className="w-3 h-3" />
                                                            {k.usageToday}/{k.dailyLimit} calls today
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Switch checked={k.enabled} onCheckedChange={() => toggleAIKey(k.id)} />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-slate-500 hover:text-white"
                                                        onClick={() => setShowKeyId(showKeyId === k.id ? null : k.id)}
                                                    >
                                                        {showKeyId === k.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-slate-500 hover:text-rose-400"
                                                        onClick={() => deleteAIKey(k.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            {showKeyId === k.id && (
                                                <div className="p-2 bg-slate-900 rounded border border-slate-800 font-mono text-[10px] text-slate-400 break-all">
                                                    {k.key} <span className="text-slate-600 block mt-1">(Stored Encrypted)</span>
                                                </div>
                                            )}
                                            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-500 ${k.usageToday >= k.dailyLimit ? 'bg-rose-500' : 'bg-indigo-500'}`}
                                                    style={{ width: `${Math.min(100, (k.usageToday / k.dailyLimit) * 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Audit Log Section */}
            <Card className="p-6 bg-slate-900 border-slate-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                    <Clock className="w-5 h-5 text-indigo-400" />
                    Key Change Audit Log
                </h3>
                <div className="space-y-3">
                    {auditLogs.length > 0 ? auditLogs.map((log) => (
                        <div key={log.id} className="flex items-center justify-between py-2 border-b border-slate-800/50 text-[11px] group">
                            <div className="flex items-center gap-4">
                                <span className="text-slate-600 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                <Badge variant="outline" className={`text-[9px] ${log.action === 'KEY_DELETE' ? 'border-rose-500/30 text-rose-500' :
                                        log.action === 'KEY_ADD' ? 'border-emerald-500/30 text-emerald-400' :
                                            'border-slate-800 text-slate-400'
                                    }`}>
                                    {log.action}
                                </Badge>
                                <span className="text-slate-300 font-medium">{log.details}</span>
                            </div>
                            <span className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">by {log.user}</span>
                        </div>
                    )) : (
                        <div className="text-center py-8 text-slate-500">No key changes recorded yet.</div>
                    )}
                </div>
            </Card>
        </div>
    );
}

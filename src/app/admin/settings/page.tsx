"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AdminSettings } from "@/lib/server/settings-storage";
import {
    Save,
    RefreshCw,
    Shield,
    AlertTriangle,
    ChevronRight,
    Settings,
    Globe,
    Lock,
    Database,
    Zap,
    Bell,
    UserCheck,
    ArrowRight,
    Cpu,
    Activity
} from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
    const [settings, setSettings] = useState<AdminSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/settings");
            setSettings(await res.json());
        } catch (error) {
            toast.error("Failed to load settings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleSave = async () => {
        if (!settings) return;
        setSaving(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            if (res.ok) {
                toast.success("Settings updated successfully");
            } else {
                throw new Error("Failed");
            }
        } catch (error) {
            toast.error("Failed to update settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading || !settings) return (
        <div className="flex-1 flex items-center justify-center bg-white dark:bg-black/20 mx-4 my-5 rounded-[2rem] shadow-sm border border-gray-100 dark:border-white/5">
            <div className="flex flex-col items-center gap-6">
                <div className="w-10 h-10 border-4 border-slate-100 dark:border-white/10 border-t-black dark:border-t-white rounded-full animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Loading Configuration...</p>
            </div>
        </div>
    );

    return (
        <div className="flex-1 flex overflow-hidden p-3 gap-3 h-full max-h-screen">
            {/* Column 2: Main Workspace */}
            <main className="flex-1 bg-white dark:bg-black/20 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-white/5 flex flex-col overflow-hidden relative">
                {/* Header - Compact */}
                <header className="p-4 flex items-center justify-between shrink-0 border-b border-gray-50 dark:border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-black dark:from-white dark:to-slate-200 flex items-center justify-center text-white dark:text-black shadow-lg shadow-black/20 dark:shadow-white/20">
                            <Settings className="w-4 h-4" />
                        </div>
                        <div>
                            <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">System Config</h1>
                            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Global Parameters</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-8 px-4 rounded-full border-gray-200 dark:border-white/10 font-bold text-[10px] uppercase tracking-wide hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center gap-2" onClick={fetchSettings} disabled={saving}>
                            <RefreshCw className={`w-3 h-3 ${saving ? 'animate-spin' : ''}`} />
                            Reset
                        </Button>
                        <Button
                            className="bg-black dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-200 text-white dark:text-black px-5 h-8 rounded-full font-bold text-[10px] uppercase tracking-wide shadow-md transition-all flex items-center gap-2"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            <Save className="w-3 h-3" />
                            {saving ? "Syncing..." : "Save Changes"}
                        </Button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-0 custom-scrollbar relative">
                    <div className="p-5 max-w-4xl mx-auto space-y-8">
                        {/* Security Sector */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                    <Shield className="w-4 h-4" strokeWidth={2} />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">Security Core</h3>
                                    <p className="text-xs font-bold text-slate-900 dark:text-white">Access Control</p>
                                </div>
                            </div>

                            <Card className="p-5 rounded-2xl bg-[#F9F9F9] dark:bg-white/5 border border-gray-100 dark:border-white/5 group hover:bg-white dark:hover:bg-black/40 hover:shadow-sm transition-all relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform dark:opacity-10">
                                    <Lock className="w-16 h-16 dark:text-white" />
                                </div>
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="space-y-1">
                                        <Label className="text-sm font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Public Registration</Label>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Toggle sign-up capabilities</p>
                                    </div>
                                    <Switch
                                        checked={settings.registrationsOpen}
                                        onCheckedChange={(c) => setSettings({ ...settings, registrationsOpen: c })}
                                        className="data-[state=checked]:bg-indigo-600 dark:data-[state=checked]:bg-indigo-500 scale-110"
                                    />
                                </div>
                            </Card>
                        </section>

                        {/* Elastic Limits Section */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                    <AlertTriangle className="w-4 h-4" strokeWidth={2} />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">Limits</h3>
                                    <p className="text-xs font-bold text-slate-900 dark:text-white">Usage Quotas</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { key: 'resumesPerWeek', label: 'Resumes/Week', icon: Database },
                                    { key: 'aiCallsPerDay', label: 'AI Calls/Day', icon: Zap },
                                    { key: 'maxUploadSizeMB', label: 'Max Size (MB)', icon: Cpu },
                                ].map((item) => (
                                    <Card key={item.key} className="p-4 rounded-2xl bg-white dark:bg-black/20 border border-gray-100 dark:border-white/5 hover:border-black dark:hover:border-white transition-all group">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all">
                                                <item.icon className="w-3.5 h-3.5" strokeWidth={2} />
                                            </div>
                                            <h4 className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-tight">{item.label}</h4>
                                        </div>
                                        <Input
                                            type="number"
                                            value={(settings.limits as any)[item.key]}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                limits: { ...settings.limits, [item.key]: parseInt(e.target.value) }
                                            })}
                                            className="h-9 rounded-lg bg-[#F9F9F9] dark:bg-white/5 border-gray-100 dark:border-white/10 font-black italic tracking-tighter text-sm px-3 focus:ring-black dark:focus:ring-white dark:text-white"
                                        />
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* Functional Primitives Section */}
                        <section className="space-y-4 pb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                                    <Settings className="w-4 h-4" strokeWidth={2} />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">Modules</h3>
                                    <p className="text-xs font-bold text-slate-900 dark:text-white">Feature Flags</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {Object.entries(settings.features).map(([key, value]) => (
                                    <Card key={key} className="p-4 rounded-xl bg-white dark:bg-black/20 border border-gray-50 dark:border-white/5 flex items-center justify-between hover:bg-[#F9F9F9] dark:hover:bg-white/5 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1 h-5 bg-slate-100 dark:bg-white/10 rounded-full group-hover:bg-black dark:group-hover:bg-white transition-all" />
                                            <Label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-wider cursor-pointer">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </Label>
                                        </div>
                                        <Switch
                                            checked={value}
                                            onCheckedChange={(c) => setSettings({
                                                ...settings,
                                                features: { ...settings.features, [key]: c }
                                            })}
                                            className="data-[state=checked]:bg-black dark:data-[state=checked]:bg-white scale-75"
                                        />
                                    </Card>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Column 3: System Context - Compact */}
            <aside className="w-[280px] hidden xl:flex flex-col gap-3 overflow-hidden">
                <div className="flex-1 bg-white dark:bg-black/20 rounded-[1.5rem] p-5 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 dark:from-indigo-900/10 to-transparent pointer-events-none" />

                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 font-italic">System Integrity</h3>
                        <div className="space-y-4">
                            {[
                                { label: "Config Cohesion", val: "99.2%", status: "Nominal" },
                                { label: "Database Sync", val: "REAL-TIME", status: "Nominal" },
                                { label: "Vault Seal", val: "AES-256", status: "Nominal" },
                            ].map((meta, i) => (
                                <div key={i} className="flex flex-col gap-1 group">
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-[9px] font-black uppercase text-slate-900 dark:text-white tracking-tighter">{meta.label}</span>
                                        <span className="text-[9px] font-black text-emerald-500 italic">{meta.status}</span>
                                    </div>
                                    <div className="h-8 rounded-lg bg-slate-50 dark:bg-white/5 border border-gray-50 dark:border-white/5 flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all cursor-default">
                                        <span className="text-[10px] font-black italic tracking-tighter">{meta.val}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-gray-50 dark:bg-white/5 my-6" />

                    <div className="mt-auto relative">
                        <div className="p-5 bg-black dark:bg-[#111] rounded-2xl text-white shadow-xl relative group cursor-pointer overflow-hidden border-2 border-white/5">
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex justify-between items-center mb-4">
                                <Cpu className="w-5 h-5 opacity-40 group-hover:scale-110 transition-transform text-indigo-400" />
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                            </div>
                            <h4 className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-1">Architecture</h4>
                            <p className="text-lg font-black italic tracking-tighter text-white">ULTRA-FIDELITY CORE</p>
                            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-end">
                                <div className="space-y-0.5">
                                    <p className="text-[8px] font-black text-white/30 uppercase">Build Rev.</p>
                                    <p className="text-[9px] font-bold">4.0.2-BETA</p>
                                </div>
                                <Activity className="w-3 h-3 text-emerald-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}

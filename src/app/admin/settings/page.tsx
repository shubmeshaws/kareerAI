"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AdminSettings } from "@/lib/server/settings-storage";
import { Save, RefreshCw, Shield, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

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

    if (loading || !settings) return <div className="p-8 text-center text-slate-500">Loading settings...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">System Settings</h1>
                    <p className="text-slate-400">Configure global application behavior and limits.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={fetchSettings} disabled={saving}>
                        <RefreshCw className="w-4 h-4 mr-2" /> Reset
                    </Button>
                    <Button onClick={handleSave} disabled={saving} className="bg-indigo-600 hover:bg-indigo-700">
                        <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* General Settings */}
                <Card className="p-6 bg-slate-900 border-slate-800">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-indigo-500" /> General Security
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-slate-800">
                        <div>
                            <Label className="text-white font-medium">User Registration</Label>
                            <p className="text-sm text-slate-400">Allow new users to sign up for the platform.</p>
                        </div>
                        <Switch
                            checked={settings.registrationsOpen}
                            onCheckedChange={(c) => setSettings({ ...settings, registrationsOpen: c })}
                        />
                    </div>
                </Card>

                {/* Limits */}
                <Card className="p-6 bg-slate-900 border-slate-800">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-indigo-500" /> Free Plan Limits
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label className="text-slate-300">Resumes / Week</Label>
                            <Input
                                type="number"
                                value={settings.limits.resumesPerWeek}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    limits: { ...settings.limits, resumesPerWeek: parseInt(e.target.value) }
                                })}
                                className="bg-slate-950 border-slate-800 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">AI Calls / Day</Label>
                            <Input
                                type="number"
                                value={settings.limits.aiCallsPerDay}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    limits: { ...settings.limits, aiCallsPerDay: parseInt(e.target.value) }
                                })}
                                className="bg-slate-950 border-slate-800 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">Max Upload Size (MB)</Label>
                            <Input
                                type="number"
                                value={settings.limits.maxUploadSizeMB}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    limits: { ...settings.limits, maxUploadSizeMB: parseInt(e.target.value) }
                                })}
                                className="bg-slate-950 border-slate-800 text-white"
                            />
                        </div>
                    </div>
                </Card>

                {/* Feature Toggles */}
                <Card className="p-6 bg-slate-900 border-slate-800">
                    <h3 className="text-lg font-bold text-white mb-4">Feature Toggles</h3>
                    <div className="space-y-4">
                        {Object.entries(settings.features).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-3 hover:bg-slate-800/50 rounded-lg transition-colors">
                                <div>
                                    <Label className="text-slate-200 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                                </div>
                                <Switch
                                    checked={value}
                                    onCheckedChange={(c) => setSettings({
                                        ...settings,
                                        features: { ...settings.features, [key]: c }
                                    })}
                                />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}

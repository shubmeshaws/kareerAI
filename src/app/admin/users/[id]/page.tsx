"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    User as UserIcon, Mail, Calendar, Activity,
    Shield, Ban, Zap, History, FileText, Briefcase,
    ChevronLeft
} from "lucide-react";
import { User, UserActivity } from "@/lib/types/admin-user";
import { toast } from "sonner";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function UserDetailPage() {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/admin/users/${id}`);
                if (!res.ok) throw new Error("Failed to fetch user");
                const data = await res.json();
                setUser(data);
            } catch (e) {
                toast.error("User not found");
            } finally {
                setIsLoading(false);
            }
        };
        if (id) fetchUser();
    }, [id]);

    const handleAction = async (action: string, value: any) => {
        if (!user) return;
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: user.id, [action]: value })
            });
            if (res.ok) {
                const updated = await res.json();
                setUser(updated);
                toast.success(`User updated successfully`);
            }
        } catch (e) {
            toast.error("Action failed");
        }
    };

    if (isLoading) return <div className="p-8 text-center text-slate-500">Loading user profile...</div>;
    if (!user) return <div className="p-8 text-center text-slate-500">User not found</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/users">
                    <Button variant="ghost" className="text-slate-400 hover:text-white">
                        <ChevronLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">{user.name}</h1>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <Mail className="w-3 h-3" /> {user.email}
                        <span className="text-slate-600">•</span>
                        <span className="font-mono text-[10px]">ID: {user.id}</span>
                    </div>
                </div>
                <div className="ml-auto flex gap-3">
                    <Button
                        variant="outline"
                        className={`border-slate-800 ${user.status === 'SUSPENDED' ? 'text-emerald-400' : 'text-rose-400 hover:bg-rose-500/10'}`}
                        onClick={() => handleAction('status', user.status === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED')}
                    >
                        {user.status === 'SUSPENDED' ? <><Shield className="w-4 h-4 mr-2" /> Reactivate</> : <><Ban className="w-4 h-4 mr-2" /> Suspend User</>}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile & Stats */}
                <div className="space-y-6 lg:col-span-1">
                    <Card className="p-6 bg-slate-900 border-slate-800 space-y-6">
                        <div className="flex justify-between items-start">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
                                {user.name.charAt(0)}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <Badge className={`text-xs ${user.plan === 'PRO' ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                                    {user.plan} PLAN
                                </Badge>
                                <Badge variant="outline" className={`text-[10px] ${user.status === 'ACTIVE' ? 'text-emerald-400 border-emerald-500/30' : 'text-rose-400 border-rose-500/30'}`}>
                                    {user.status}
                                </Badge>
                            </div>
                        </div>

                        <Separator className="bg-slate-800" />

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Plan Management</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={`border-slate-800 ${user.plan === 'FREE' ? 'bg-slate-800' : ''}`}
                                    onClick={() => handleAction('plan', 'FREE')}
                                >
                                    Free
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={`border-slate-800 ${user.plan === 'PRO' ? 'bg-indigo-600 border-indigo-500 text-white' : ''}`}
                                    onClick={() => handleAction('plan', 'PRO')}
                                >
                                    Pro
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-slate-900 border-slate-800 space-y-6">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Activity className="w-4 h-4 text-indigo-400" /> Usage Stats
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-slate-950 rounded-lg border border-slate-800">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-4 h-4 text-slate-500" />
                                    <span className="text-sm text-slate-300">Resumes</span>
                                </div>
                                <span className="font-mono text-lg font-bold text-white">{user.usage.resumesGenerated}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-950 rounded-lg border border-slate-800">
                                <div className="flex items-center gap-3">
                                    <Briefcase className="w-4 h-4 text-slate-500" />
                                    <span className="text-sm text-slate-300">Jobs Saved</span>
                                </div>
                                <span className="font-mono text-lg font-bold text-white">{user.usage.jobsSaved}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-950 rounded-lg border border-slate-800">
                                <div className="flex items-center gap-3">
                                    <Zap className="w-4 h-4 text-slate-500" />
                                    <span className="text-sm text-slate-300">AI Tokens</span>
                                </div>
                                <span className="font-mono text-lg font-bold text-white">{((user.usage.aiTokensUsed || 0) / 1000).toFixed(1)}k</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Activity Timeline */}
                <div className="lg:col-span-2">
                    <Card className="p-6 bg-slate-900 border-slate-800 h-full">
                        <div className="flex items-center gap-2 mb-6">
                            <History className="w-5 h-5 text-indigo-400" />
                            <h3 className="text-lg font-bold text-white">Activity Timeline</h3>
                        </div>

                        <div className="relative pl-4 border-l border-slate-800 space-y-8">
                            {user.activityLog && user.activityLog.length > 0 ? user.activityLog.map((act) => (
                                <div key={act.id} className="relative">
                                    <span className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-slate-800 border-2 border-indigo-500"></span>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-bold text-slate-200">{act.type.replace('_', ' ')}</span>
                                            <span className="text-xs text-slate-500 font-mono">{new Date(act.timestamp).toLocaleString()}</span>
                                        </div>
                                        <p className="text-sm text-slate-400">{act.details}</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-slate-500 text-sm">No activity recorded yet.</div>
                            )}

                            {/* Mock historical entries for demo if needed */}
                            <div className="relative">
                                <span className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-slate-800 border-2 border-slate-600"></span>
                                <div className="flex flex-col gap-1 opacity-50">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-bold text-slate-200">ACCOUNT CREATED</span>
                                        <span className="text-xs text-slate-500 font-mono">{new Date(user.joinedAt).toLocaleString()}</span>
                                    </div>
                                    <p className="text-sm text-slate-400">User successfully verified email.</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

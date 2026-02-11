"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Activity,
    Search,
    Filter,
    Calendar,
    User,
    FileText,
    Briefcase,
    Zap,
    MessageSquare,
    CheckCircle2,
    RefreshCw,
    ChevronRight,
    ArrowRight,
    SearchX,
    Clock
} from "lucide-react";
import { ActivityLog, ActivityType } from "@/lib/types/admin-activity";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const ActivityIcon = ({ type }: { type: ActivityType }) => {
    switch (type) {
        case "resume_uploaded": return <FileText className="w-5 h-5" strokeWidth={1.5} />;
        case "job_saved": return <Briefcase className="w-5 h-5" strokeWidth={1.5} />;
        case "resume_generated": return <Zap className="w-5 h-5" strokeWidth={1.5} />;
        case "cover_letter_generated": return <FileText className="w-5 h-5" strokeWidth={1.5} />;
        case "linkedin_message_generated": return <MessageSquare className="w-5 h-5" strokeWidth={1.5} />;
        case "auto_match_run": return <RefreshCw className="w-5 h-5" strokeWidth={1.5} />;
        case "application_status_updated": return <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />;
        default: return <Activity className="w-5 h-5" strokeWidth={1.5} />;
    }
};

const ActivityIconBg = (type: ActivityType) => {
    switch (type) {
        case "resume_uploaded": return "bg-blue-50 text-blue-600";
        case "job_saved": return "bg-emerald-50 text-emerald-600";
        case "resume_generated": return "bg-amber-50 text-amber-600";
        case "cover_letter_generated": return "bg-purple-50 text-purple-600";
        case "linkedin_message_generated": return "bg-sky-50 text-sky-600";
        case "auto_match_run": return "bg-indigo-50 text-indigo-600";
        case "application_status_updated": return "bg-pink-50 text-pink-600";
        default: return "bg-slate-50 text-slate-600";
    }
}

const ActivityLabel = ({ type }: { type: ActivityType }) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default function ActivitiesPage() {
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterUser, setFilterUser] = useState("");
    const [filterAction, setFilterAction] = useState<ActivityType | "all">("all");

    const fetchActivities = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filterUser) params.append('userId', filterUser);
            if (filterAction !== 'all') params.append('action', filterAction);

            const res = await fetch(`/api/admin/activities?${params.toString()}`);
            setActivities(await res.json());
        } catch (e) {
            console.error("Failed to fetch activities", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => fetchActivities(), 500);
        return () => clearTimeout(timer);
    }, [filterUser, filterAction]);

    return (
        <div className="flex-1 flex overflow-hidden p-3 gap-3 h-full max-h-screen">
            {/* Column 2: Main Workspace */}
            <main className="flex-1 bg-white dark:bg-black/20 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-white/5 flex flex-col overflow-hidden relative">
                {/* Header - Compact */}
                <header className="p-4 flex items-center justify-between shrink-0 border-b border-gray-50 dark:border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                            <Activity className="w-4 h-4" />
                        </div>
                        <div>
                            <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">System Activities</h1>
                            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Stream Monitor</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-8 px-4 rounded-full border-gray-200 dark:border-white/10 font-bold text-[10px] uppercase tracking-wide hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2" onClick={fetchActivities}>
                            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                            Sync
                        </Button>
                    </div>
                </header>

                {/* Search & Tabs - Compact */}
                <div className="px-4 py-2 border-b border-gray-50 dark:border-white/5 flex items-center gap-3 bg-gray-50/50 dark:bg-white/5">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <Input
                            placeholder="Filter stream..."
                            value={filterUser}
                            onChange={(e) => setFilterUser(e.target.value)}
                            className="pl-9 h-8 rounded-lg bg-white dark:bg-black/20 border-gray-100 dark:border-white/10 focus:ring-indigo-500/20 text-xs font-bold"
                        />
                    </div>
                    <div className="flex bg-white dark:bg-black/20 p-1 rounded-lg border border-gray-100 dark:border-white/5 gap-1">
                        {["all", "resume_uploaded", "resume_generated", "auto_match_run"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilterAction(tab as any)}
                                className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${filterAction === tab
                                    ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                                    : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-gray-50 dark:hover:bg-white/5"
                                    }`}
                            >
                                {tab === 'all' ? 'All' : tab.split('_')[0]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Timeline Content Area */}
                <div className="flex-1 overflow-y-auto p-0 custom-scrollbar relative">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center gap-4">
                            <div className="w-8 h-8 border-4 border-slate-100 dark:border-white/10 border-t-indigo-500 rounded-full animate-spin" />
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 dark:text-slate-600">Filtering...</p>
                        </div>
                    ) : activities.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center gap-4 opacity-40">
                            <SearchX className="w-12 h-12 text-slate-200 dark:text-slate-700" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">No signals found</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50 dark:divide-white/5">
                            {activities.map((activity) => (
                                <div key={activity.id} className="group flex items-start gap-4 p-4 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border border-transparent shadow-sm shrink-0 ${ActivityIconBg(activity.action)} bg-opacity-10 dark:bg-opacity-20`}>
                                        <ActivityIcon type={activity.action} />
                                    </div>

                                    <div className="flex-1 min-w-0 pt-0.5">
                                        <div className="flex justify-between items-start mb-0.5">
                                            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight truncate pr-2">
                                                <ActivityLabel type={activity.action} />
                                            </h3>
                                            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter shrink-0">
                                                {formatDistanceToNow(new Date(activity.timestamp))} ago
                                            </span>
                                        </div>

                                        <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                                            <User className="w-3 h-3" />
                                            <span className="font-bold text-slate-700 dark:text-slate-300">@{activity.userName}</span>
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {activity.metadata?.jobId && (
                                                <Badge variant="outline" className="bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[8px] font-black uppercase px-2 py-0 h-5 border-gray-100 dark:border-white/10">
                                                    Ref: {activity.metadata.jobId.slice(0, 8)}
                                                </Badge>
                                            )}
                                            {activity.metadata?.resumeId && (
                                                <Badge variant="outline" className="bg-slate-900 dark:bg-white text-white dark:text-black text-[8px] font-black uppercase px-2 py-0 h-5 border-transparent">
                                                    Asset: {activity.metadata.resumeId.slice(0, 8)}
                                                </Badge>
                                            )}
                                            {/* Details pill if available */}
                                            {activity.details && (
                                                <span className="text-[9px] font-mono text-slate-400 dark:text-slate-600 truncate max-w-[200px] border border-gray-100 dark:border-white/5 px-2 rounded-md bg-gray-50 dark:bg-white/5">
                                                    {JSON.stringify(activity.details).replace(/{|}|"/g, '').slice(0, 30)}...
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Column 3: Monitor Context - Compact */}
            <aside className="w-[280px] hidden xl:flex flex-col gap-3 overflow-hidden">
                <div className="flex-1 bg-white dark:bg-black/20 rounded-[1.5rem] p-5 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col relative overflow-hidden group">
                    {/* Decorative Gradients */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Node Status</h2>
                        <div className="flex gap-1.5 items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="flex items-end gap-1.5 h-16 mb-6">
                            {[40, 65, 30, 85, 45, 90, 55, 75, 40, 60, 80, 50].map((h, i) => (
                                <div key={i} className="flex-1 bg-slate-100 dark:bg-white/5 rounded-t-sm relative overflow-hidden group/bar">
                                    <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 dark:bg-indigo-500 transition-all duration-1000 origin-bottom rounded-t-sm" style={{ height: `${h}%` }} />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center bg-[#F9F9F9] dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                            <div>
                                <p className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 italic">Concurrent Req.</p>
                                <p className="text-sm font-black text-slate-900 dark:text-white tracking-tighter">1,242 <span className="text-[8px] text-slate-300">/sec</span></p>
                            </div>
                            <Activity className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                        </div>
                    </div>

                    <div className="mt-auto space-y-3">
                        <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Top Origins</h4>
                        {[
                            { city: "New York", val: "42%", up: true },
                            { city: "London", val: "28%", up: true },
                            { city: "Singapore", val: "18%", up: false },
                        ].map((loc) => (
                            <div key={loc.city} className="flex items-center justify-between p-2.5 bg-white dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-lg transition-all hover:border-black dark:hover:border-white hover:shadow-sm">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-slate-900 dark:text-white tracking-widest uppercase">{loc.city}</span>
                                </div>
                                <span className={`text-[9px] font-black italic ${loc.up ? 'text-emerald-500' : 'text-slate-300'}`}>{loc.val}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-50 dark:border-white/5">
                        <div className="p-3 bg-black dark:bg-[#111] rounded-xl text-white shadow-xl relative group cursor-pointer overflow-hidden">
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex justify-between items-center mb-1">
                                <Clock className="w-3.5 h-3.5 opacity-40 group-hover:rotate-12 transition-transform" />
                                <span className="text-[8px] font-bold text-white/40 uppercase">Retention</span>
                            </div>
                            <p className="text-sm font-black italic tracking-tighter">30 DAY PURGE</p>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}

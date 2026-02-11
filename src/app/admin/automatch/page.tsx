"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Target,
    Zap,
    AlertCircle,
    CheckCircle2,
    TrendingUp,
    Search,
    RefreshCw,
    ChevronRight,
    ArrowRight,
    SearchX,
    Activity,
    BrainCircuit,
    Cpu,
    ZapOff
} from "lucide-react";
import { MatchLog, MatchStats } from "@/lib/types/admin-automatch";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AutoMatchPage() {
    const [matches, setMatches] = useState<MatchLog[]>([]);
    const [stats, setStats] = useState<MatchStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [filterUser, setFilterUser] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filterUser) params.append('userId', filterUser);

            const [resMatches, resStats] = await Promise.all([
                fetch(`/api/admin/automatch?${params.toString()}`),
                fetch('/api/admin/automatch/stats')
            ]);
            setMatches(await resMatches.json());
            setStats(await resStats.json());
        } catch (e) {
            console.error("Failed to fetch match data", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => fetchData(), 500);
        return () => clearTimeout(timer);
    }, [filterUser]);

    return (
        <div className="flex-1 flex overflow-hidden p-3 gap-3 h-full max-h-screen">
            {/* Column 2: Main Workspace */}
            <main className="flex-1 bg-white dark:bg-black/20 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-white/5 flex flex-col overflow-hidden relative">
                {/* Header - Compact */}
                <header className="p-4 flex items-center justify-between shrink-0 border-b border-gray-50 dark:border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                            <Target className="w-4 h-4" />
                        </div>
                        <div>
                            <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Auto Match Monitor</h1>
                            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Algorithm Watch</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                            <Input
                                placeholder="Filter users..."
                                value={filterUser}
                                onChange={(e) => setFilterUser(e.target.value)}
                                className="pl-9 w-48 h-8 rounded-full bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 focus:bg-white dark:focus:bg-white/10 focus:ring-emerald-500/20 text-xs font-bold transition-all"
                            />
                        </div>
                        <Button className="bg-black dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-200 text-white dark:text-black px-4 h-8 rounded-full font-bold text-[10px] uppercase tracking-wide shadow-md transition-all flex items-center gap-2" onClick={fetchData}>
                            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                            Sync
                        </Button>
                    </div>
                </header>

                {/* Sub-header Stats Grid - Compact */}
                <div className="px-4 py-3 grid grid-cols-3 gap-3 shrink-0 bg-gray-50/50 dark:bg-white/5 border-b border-gray-50 dark:border-white/5">
                    {[
                        { label: "Matches Run", val: stats?.totalMatches || 0, icon: Target, color: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
                        { label: "Avg Score", val: `${stats?.averageScore || 0}%`, icon: Zap, color: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
                        { label: "Neural Load", val: "Optimal", icon: Activity, color: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-black/20 p-2.5 rounded-xl border border-gray-50 dark:border-white/5 flex items-center justify-between group hover:border-gray-200 dark:hover:border-white/10 transition-all shadow-sm">
                            <div className="flex items-center gap-2.5">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                                    <stat.icon className="w-4 h-4" strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">{stat.label}</span>
                                    <span className="text-sm font-black text-slate-900 dark:text-white italic tracking-tighter">{stat.val}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table Content Area - Scrollable */}
                <div className="flex-1 overflow-auto custom-scrollbar p-0">
                    <Table>
                        <TableHeader className="sticky top-0 bg-white dark:bg-[#0E121B] z-10 shadow-sm">
                            <TableRow className="border-gray-100 dark:border-white/5 hover:bg-transparent">
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest px-6 h-10">Entrant / Destination</TableHead>
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest text-center h-10">Fidelity</TableHead>
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest h-10">Logical Blocks</TableHead>
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest text-right px-6 h-10">Delta</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-20 text-slate-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-6 h-6 border-2 border-slate-100 dark:border-white/10 border-t-emerald-500 rounded-full animate-spin" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Computing Vector Spaces...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : matches.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-20 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                        No recent match logs found
                                    </TableCell>
                                </TableRow>
                            ) : matches.map((match) => (
                                <TableRow key={match.id} className="border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                                    <TableCell className="px-6 py-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-8 h-8 rounded-lg ring-1 ring-gray-100 dark:ring-white/10 group-hover:scale-105 transition-transform duration-300">
                                                <AvatarFallback className="bg-slate-50 dark:bg-white/10 font-black uppercase text-[10px] italic text-slate-700 dark:text-slate-300">{match.userName?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col overflow-hidden max-w-[220px]">
                                                <span className="font-bold text-slate-900 dark:text-white text-xs leading-none truncate uppercase tracking-tight">{match.userName}</span>
                                                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold mt-0.5 uppercase tracking-widest truncate">vs {match.jobTitle} @ {match.company}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center py-3">
                                        <div className="flex justify-center">
                                            <Badge variant="outline" className={`text-[9px] font-black italic border px-2 py-0.5 rounded-md ${match.score >= 80 ? 'border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-500/10' :
                                                match.score >= 60 ? 'border-amber-100 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-500/10' :
                                                    'border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-500/10'
                                                }`}>
                                                {match.score}%
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="flex flex-col gap-1 min-w-[180px]">
                                            <div className="flex items-center gap-2 group/tip">
                                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase truncate">Matched: {match.matchedKeywords.length} Nodes</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-rose-500 group/tip">
                                                <AlertCircle className="w-3 h-3" />
                                                <p className="text-[9px] font-bold uppercase truncate group-hover/tip:whitespace-normal">Void: {match.missingKeywords.slice(0, 3).join(", ")}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right px-6 py-3">
                                        <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase italic tracking-tighter">
                                            {formatDistanceToNow(new Date(match.timestamp))} ago
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>

            {/* Column 3: Skill Gap Analysis - Compact */}
            <aside className="w-[280px] hidden xl:flex flex-col gap-3 overflow-hidden">
                <div className="flex-1 bg-white dark:bg-black/20 rounded-[1.5rem] p-5 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col relative overflow-hidden group">
                    {/* Decorative Gradients */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Skill Heatmap</h2>
                        <Badge variant="outline" className="text-[8px] font-bold uppercase bg-white/50 dark:bg-white/5 backdrop-blur-sm border-gray-100 dark:border-white/10">Global</Badge>
                    </div>

                    <div className="relative mb-6">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2 italic">
                            <BrainCircuit className="w-3 h-3" />
                            Macro Scale Voids
                        </h3>
                        <div className="space-y-4">
                            {stats?.topMissingSkills.map((item, i) => (
                                <div key={i} className="space-y-1.5 group/skill cursor-help">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover/skill:text-rose-500 transition-colors">{item.skill}</span>
                                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 italic">{item.count} Entrants</span>
                                    </div>
                                    <div className="h-1 w-full bg-slate-50 dark:bg-white/5 rounded-full overflow-hidden border border-slate-100/50 dark:border-white/5">
                                        <div
                                            className="h-full bg-rose-500 transition-all duration-1000 origin-left"
                                            style={{ width: `${(item.count / (stats.totalMatches || 1)) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                            {(!stats || stats.topMissingSkills.length === 0) && (
                                <div className="text-center py-8 opacity-40 italic font-bold uppercase tracking-widest text-[10px]">No telemetry available.</div>
                            )}
                        </div>
                    </div>

                    <div className="mt-auto">
                        <div className="bg-[#111] dark:bg-white/5 p-4 rounded-2xl text-white dark:text-white shadow-lg group/card relative overflow-hidden mb-3">
                            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover/card:scale-125 transition-transform duration-1000 text-white">
                                <Cpu className="w-20 h-20" />
                            </div>
                            <h4 className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Neural Sensitivity</h4>
                            <p className="text-xl font-black italic tracking-tighter mb-3">OPTIMIZED</p>
                            <div className="flex gap-2">
                                <div className="p-2 bg-white/10 rounded-lg border border-white/5">
                                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                                </div>
                                <div className="p-2 bg-white/10 rounded-lg border border-white/5">
                                    <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                                </div>
                            </div>
                        </div>

                        <Card className="p-3 bg-rose-50 dark:bg-rose-500/10 border-rose-100/50 dark:border-rose-500/20 rounded-2xl flex items-center justify-between group/alert transition-all hover:bg-rose-100 dark:hover:bg-rose-500/20 shadow-sm">
                            <div className="flex items-center gap-3">
                                <ZapOff className="w-5 h-5 text-rose-500 group-hover:animate-bounce" />
                                <div>
                                    <h4 className="text-[9px] font-black uppercase tracking-widest text-rose-900 dark:text-rose-200">Void Alert</h4>
                                    <p className="text-[8px] font-bold text-rose-600 dark:text-rose-300">Major skill gap detected.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </aside>
        </div>
    );
}

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
    RefreshCw
} from "lucide-react";
import { MatchLog, MatchStats } from "@/lib/types/admin-automatch";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

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

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => fetchData(), 500);
        return () => clearTimeout(timer);
    }, [filterUser]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Auto Match Monitor</h1>
                    <p className="text-slate-400">Track resume-job matching performance and skill gaps.</p>
                </div>
                <Button variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-900" onClick={fetchData}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-slate-900 border-slate-800 flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/10 rounded-lg">
                        <Target className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-400">Total Matches Run</p>
                        <h3 className="text-2xl font-bold text-white">{stats?.totalMatches || 0}</h3>
                    </div>
                </Card>
                <Card className="p-4 bg-slate-900 border-slate-800 flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                        <Zap className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-400">Avg Match Score</p>
                        <h3 className="text-2xl font-bold text-white">{stats?.averageScore || 0}%</h3>
                    </div>
                </Card>
                <Card className="p-4 bg-slate-900 border-slate-800 flex items-center gap-4">
                    <div className="p-3 bg-rose-500/10 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-400">Top Missing Skill</p>
                        <h3 className="text-xl font-bold text-white truncate max-w-[150px]">
                            {stats?.topMissingSkills[0]?.skill || "None"}
                        </h3>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Missing Skills Heatmap */}
                <Card className="lg:col-span-1 bg-slate-900 border-slate-800 p-6">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-400" /> Top Missing Skills
                    </h3>
                    <div className="space-y-4">
                        {stats?.topMissingSkills.map((item, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-300">{item.skill}</span>
                                    <span className="text-slate-500">{item.count} users</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-amber-500/70 rounded-full"
                                        style={{ width: `${(item.count / (stats.totalMatches || 1)) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                        {(!stats || stats.topMissingSkills.length === 0) && (
                            <p className="text-sm text-slate-500">No data available.</p>
                        )}
                    </div>
                </Card>

                {/* Right Column: Match History */}
                <Card className="lg:col-span-2 bg-slate-900 border-slate-800 flex flex-col h-[600px]">
                    <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                        <h3 className="font-bold text-white">Match History</h3>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <Input
                                placeholder="Filter by User..."
                                value={filterUser}
                                onChange={(e) => setFilterUser(e.target.value)}
                                className="pl-10 h-8 bg-slate-950 border-slate-800 focus:border-indigo-500 text-white text-xs"
                            />
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-slate-800 hover:bg-transparent">
                                    <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest pl-4">User / Job</TableHead>
                                    <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-center">Score</TableHead>
                                    <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Feedback</TableHead>
                                    <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-right pr-4">Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-slate-500">Loading matches...</TableCell>
                                    </TableRow>
                                ) : matches.map((match) => (
                                    <TableRow key={match.id} className="border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                        <TableCell className="pl-4 py-3">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-200 text-sm">{match.userName}</span>
                                                <span className="text-[10px] text-slate-500">vs {match.jobTitle} @ {match.company}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="outline" className={`border ${match.score >= 80 ? 'border-emerald-500/30 text-emerald-400' :
                                                    match.score >= 60 ? 'border-amber-500/30 text-amber-400' :
                                                        'border-rose-500/30 text-rose-400'
                                                }`}>
                                                {match.score}%
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1 text-[10px] text-rose-400">
                                                    <AlertCircle className="w-3 h-3" />
                                                    Missing: {match.missingKeywords.slice(0, 3).join(", ")}
                                                </div>
                                                <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Matched: {match.matchedKeywords.length} skills
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-4">
                                            <span className="font-mono text-[10px] text-slate-500">
                                                {formatDistanceToNow(new Date(match.timestamp))} ago
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </Card>
            </div>
        </div>
    );
}

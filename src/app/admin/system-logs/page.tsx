"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    AlertTriangle,
    CheckCircle,
    Info,
    Server,
    Activity,
    RefreshCw
} from "lucide-react";
import { SystemLog } from "@/lib/types/admin-activity";

export default function SystemLogsPage() {
    const [health, setHealth] = useState<any>(null);
    const [view, setView] = useState<'logs' | 'health'>('logs');

    const fetchData = async () => {
        setLoading(true);
        try {
            const [logsRes, healthRes] = await Promise.all([
                fetch('/api/admin/system-logs'),
                fetch('/api/admin/health')
            ]);
            setLogs(await logsRes.json());
            setHealth(await healthRes.json());
        } catch (e) {
            console.error("Failed to fetch data", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const errorCount = logs.filter(l => l.severity === 'ERROR').length;
    const avgLatency = logs.filter(l => l.component === 'AI_ROUTER' && l.details?.latency)
        .reduce((acc, l) => acc + (l.details.latency || 0), 0) / (logs.filter(l => l.component === 'AI_ROUTER').length || 1);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">System Diagnostics</h1>
                    <p className="text-slate-400">Real-time server logs, health checks, and performance metrics.</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                        <button
                            onClick={() => setView('logs')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'logs' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Logs
                        </button>
                        <button
                            onClick={() => setView('health')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'health' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Health
                        </button>
                    </div>
                    <Button variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-900" onClick={fetchData}>
                        <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                    </Button>
                </div>
            </div>

            {view === 'logs' ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-4 bg-slate-900 border-slate-800 flex items-center gap-4">
                            <div className="p-3 bg-rose-500/10 rounded-lg">
                                <AlertTriangle className="w-6 h-6 text-rose-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400">Total Errors</p>
                                <h3 className="text-2xl font-bold text-white">{errorCount}</h3>
                            </div>
                        </Card>
                        <Card className="p-4 bg-slate-900 border-slate-800 flex items-center gap-4">
                            <div className="p-3 bg-amber-500/10 rounded-lg">
                                <Activity className="w-6 h-6 text-amber-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400">Avg AI Latency</p>
                                <h3 className="text-2xl font-bold text-white">{Math.round(avgLatency)} ms</h3>
                            </div>
                        </Card>
                        <Card className="p-4 bg-slate-900 border-slate-800 flex items-center gap-4">
                            <div className="p-3 bg-indigo-500/10 rounded-lg">
                                <Server className="w-6 h-6 text-indigo-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400">Total Requests</p>
                                <h3 className="text-2xl font-bold text-white">{logs.length}</h3>
                            </div>
                        </Card>
                    </div>

                    <Card className="bg-slate-900 border-slate-800">
                        <div className="p-4 border-b border-slate-800">
                            <h3 className="font-bold text-white">Log Stream</h3>
                        </div>
                        <div className="max-h-[600px] overflow-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-slate-800 hover:bg-transparent">
                                        <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest w-[180px]">Timestamp</TableHead>
                                        <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest w-[100px]">Level</TableHead>
                                        <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest w-[150px]">Component</TableHead>
                                        <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Message</TableHead>
                                        <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-right">Details</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-slate-500">Loading logs...</TableCell>
                                        </TableRow>
                                    ) : logs.map((log) => (
                                        <TableRow key={log.id} className="border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                            <TableCell className="font-mono text-xs text-slate-500">
                                                {new Date(log.timestamp).toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={`border ${log.severity === 'ERROR' ? 'border-rose-500/30 text-rose-400' :
                                                    log.severity === 'WARN' ? 'border-amber-500/30 text-amber-400' :
                                                        'border-emerald-500/30 text-emerald-400'
                                                    }`}>
                                                    {log.severity}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-xs font-bold text-slate-300">{log.component}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm text-slate-300">{log.message}</span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <span className="font-mono text-[10px] text-slate-500">
                                                    {JSON.stringify(log.details).substring(0, 50)}...
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Storage Monitor */}
                    <Card className="p-6 bg-slate-900 border-slate-800">
                        <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                            <Server className="w-5 h-5 text-indigo-500" /> Storage Usage
                        </h3>
                        <div className="flex items-center justify-center py-8">
                            <div className="relative w-48 h-48 flex items-center justify-center rounded-full border-8 border-slate-800">
                                <div className="text-center">
                                    <span className="text-3xl font-bold text-white">{health?.storage?.usedMB || 0}</span>
                                    <span className="block text-xs text-slate-500 uppercase tracking-widest">MB Used</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <Badge variant="outline" className={`border ${health?.storage?.status === 'Healthy' ? 'border-emerald-500/30 text-emerald-400' : 'border-rose-500/30 text-rose-400'}`}>
                                Status: {health?.storage?.status || 'Unknown'}
                            </Badge>
                        </div>
                    </Card>

                    {/* Provider Status */}
                    <Card className="p-6 bg-slate-900 border-slate-800">
                        <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-indigo-500" /> AI Provider Status
                        </h3>
                        <div className="space-y-4">
                            {health?.providers?.map((p: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${p.status === 'Operational' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`} />
                                        <span className="font-bold text-slate-200">{p.name}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-mono text-slate-500">{p.latency}ms</span>
                                        <Badge variant="outline" className={`text-[10px] border ${p.status === 'Operational' ? 'border-emerald-500/30 text-emerald-400' : 'border-rose-500/30 text-rose-400'}`}>
                                            {p.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

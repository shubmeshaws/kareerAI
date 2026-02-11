"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import {
    Zap,
    AlertTriangle,
    DollarSign,
    RefreshCw,
    Activity,
    ChevronRight,
    TrendingUp,
    TrendingDown,
    BrainCircuit,
    ArrowRight,
    Cpu,
    ExternalLink
} from "lucide-react";
import { AIUsageDashboardData, AIUsageAlert } from "@/lib/types/admin-ai-usage";
import { Separator } from "@/components/ui/separator";

const COLORS = ['#000000', '#6366f1', '#10b981', '#f59e0b', '#ec4899'];

export default function AIUsagePage() {
    const [data, setData] = useState<AIUsageDashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/ai-usage/stats');
            setData(await res.json());
        } catch (e) {
            console.error("Failed to fetch usage data", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex-1 flex items-center justify-center bg-white mx-4 my-5 rounded-[2rem] shadow-xl">
            <div className="flex flex-col items-center gap-6">
                <div className="w-10 h-10 border-4 border-slate-100 border-t-black rounded-full animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Synchronizing Telemetry...</p>
            </div>
        </div>
    );
    if (!data) return <div className="p-6 text-center text-slate-500 font-black uppercase text-xs tracking-widest">No telemetry buffer received</div>;

    // Prepare chart data
    const providerData = data.dailyStats.reduce((acc, day) => {
        Object.entries(day.providerBreakdown).forEach(([provider, count]) => {
            const existing = acc.find(p => p.name === provider);
            if (existing) existing.value += count;
            else acc.push({ name: provider, value: count });
        });
        return acc;
    }, [] as { name: string, value: number }[]);

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Column 2: Main Workspace */}
            <main className="flex-1 bg-white mx-4 my-5 rounded-[2rem] shadow-xl border border-gray-100 flex flex-col overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent pointer-events-none" />

                {/* Header */}
                <header className="p-6 pb-3 flex items-center justify-between relative">
                    <div>
                        <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                            <span>Admin</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-slate-900 border-b-2 border-black pb-0.5">Consumption Metrics</span>
                        </nav>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Resource Intelligence</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-10 px-5 rounded-full border-gray-200 font-bold text-xs hover:bg-gray-50 flex items-center gap-2" onClick={fetchData}>
                            <RefreshCw className="w-3.5 h-3.5" />
                            Reload Logs
                        </Button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 pt-3 custom-scrollbar relative space-y-6">
                    {/* Alerts View */}
                    {data.alerts.length > 0 && (
                        <div className="bg-rose-50 border-2 border-rose-100 rounded-[2rem] p-6 space-y-4 animate-in slide-in-from-top-4">
                            <div className="flex items-center gap-3 text-rose-600">
                                <AlertTriangle className="w-5 h-5" />
                                <h3 className="text-xs font-black uppercase tracking-widest">Anomaly Detection Alerts</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.alerts.map(alert => (
                                    <div key={alert.id} className="bg-white/60 p-4 rounded-2xl border border-rose-200 flex items-center justify-between group">
                                        <div>
                                            <p className="text-[10px] font-black text-rose-400 uppercase tracking-tighter mb-1">{alert.metric}</p>
                                            <p className="text-sm font-bold text-rose-900">{alert.message}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-rose-300 group-hover:translate-x-1 transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-5">
                        {[
                            { label: "Total Tokens", val: `~${(data.totalTokens / 1000).toFixed(1)}k`, icon: Zap, color: "bg-indigo-50 text-indigo-600", trend: "+12%" },
                            { label: "Est. Burn Rate", val: `$${data.totalCost.toFixed(3)}`, icon: DollarSign, color: "bg-emerald-50 text-emerald-600", trend: "-5.4%" },
                            { label: "Avg Latency", val: `${data.averageLatency}ms`, icon: Activity, color: "bg-amber-50 text-amber-600", trend: "Stable" },
                            { label: "Neural Voids", val: data.fallbackCount, icon: AlertTriangle, color: "bg-rose-50 text-rose-600", trend: "0 Fixed" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-[#F9F9F9] p-5 rounded-[2rem] border border-gray-100 flex flex-col justify-between group hover:bg-white hover:shadow-lg transition-all">
                                <div className="flex justify-between items-start mb-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color} shadow-sm border border-black/5`}>
                                        <stat.icon className="w-5 h-5" strokeWidth={1.5} />
                                    </div>
                                    <Badge variant="outline" className="text-[8px] font-black uppercase border-gray-100 italic">{stat.trend}</Badge>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
                                    <p className="text-xl font-black text-slate-900 tracking-tighter italic">{stat.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm h-[400px] relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5">
                                <TrendingUp className="w-20 h-20" />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 italic">Spectral Intensity (Tokens)</h3>
                            <ResponsiveContainer width="100%" height="80%">
                                <BarChart data={data.dailyStats}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ backgroundColor: '#ffffff', borderRadius: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '0.75rem' }}
                                        labelStyle={{ fontWeight: '900', color: '#000000', marginBottom: '0.4rem', fontSize: '10px', textTransform: 'uppercase' }}
                                    />
                                    <Bar dataKey="totalTokens" name="Tokens" fill="#000000" radius={[15, 15, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>

                        <Card className="p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm h-[400px] relative overflow-hidden">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 italic">Signal vs Collision Rates</h3>
                            <ResponsiveContainer width="100%" height="80%">
                                <LineChart data={data.dailyStats}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#ffffff', borderRadius: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '15px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }} />
                                    <Line type="stepAfter" dataKey="totalCalls" name="Total Signals" stroke="#6366f1" strokeWidth={3} dot={false} animationDuration={2000} />
                                    <Line type="stepAfter" dataKey="errors" name="Collisions (Errors)" stroke="#f43f5e" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>
                    </div>

                    {/* Top Users Visualization */}
                    <Card className="rounded-[2rem] bg-white border border-gray-100 shadow-sm overflow-hidden border-2 border-black/5">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-[#F9F9F9]/50">
                            <div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Heavy Consumers</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Identity Mapping: High Usage Nodes</p>
                            </div>
                            <Button variant="ghost" className="rounded-full h-8 text-[10px] font-black uppercase tracking-widest">Global Export</Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#F9F9F9]/50">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Identity Cluster</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Total Signals</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Spectral Load</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Fiscal Impact</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Last Sync</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.topUsers.map((user) => (
                                        <tr key={user.userId} className="border-b border-gray-50 last:border-0 hover:bg-[#F9F9F9] transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-center text-[10px] font-black group-hover:bg-black group-hover:text-white transition-all">
                                                        {user.userId.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{user.userId}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm font-bold text-slate-600 italic">{user.totalCalls} Req.</td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-12 bg-slate-100 h-1 rounded-full overflow-hidden">
                                                        <div className="bg-black h-full" style={{ width: `${Math.min(100, user.totalTokens / 500)}%` }} />
                                                    </div>
                                                    <span className="text-[10px] font-black text-slate-400">{(user.totalTokens / 1000).toFixed(1)}k</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-sm font-black text-emerald-600 italic tracking-tighter">${user.totalCost.toFixed(4)}</span>
                                            </td>
                                            <td className="px-6 py-5 text-right text-[10px] font-black text-slate-300 uppercase italic">
                                                {new Date(user.lastActive).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </main>

            {/* Column 3: Telemetry Context */}
            <aside className="w-[305px] hidden xl:flex flex-col py-5 pr-3 overflow-hidden relative">
                <div className="px-6 mb-4 flex items-center justify-between">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Neural Context</h2>
                    <Badge variant="outline" className="text-[10px] font-black uppercase bg-white border-gray-100 italic">Live Feed</Badge>
                </div>

                <div className="flex-1 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col p-6 space-y-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 to-transparent pointer-events-none" />

                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 font-italic">Provider Saturation</h3>
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie
                                    data={providerData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {providerData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="focus:outline-none transition-all duration-500 hover:opacity-80" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', paddingTop: '10px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <Separator className="bg-gray-50" />

                    <div className="relative group">
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] -m-4 pointer-events-none" />
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-between italic">
                            Fiscal Projections
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                        </h3>
                        <div className="space-y-5">
                            {[
                                { label: "Current Cycle", val: `$${data.totalCost.toFixed(2)}`, accent: "text-slate-900" },
                                { label: "Projected 30D", val: `$${(data.totalCost * 30).toFixed(2)}`, accent: "text-indigo-600" },
                                { label: "Potential Savings", val: `$${(data.totalCost * 0.15).toFixed(2)}`, accent: "text-emerald-500" },
                            ].map((proj) => (
                                <div key={proj.label} className="flex justify-between items-end border-b border-gray-50 pb-2">
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{proj.label}</span>
                                    <span className={`text-base font-black italic tracking-tighter ${proj.accent}`}>{proj.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto relative">
                        <div className="p-5 bg-black rounded-2xl text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                                <BrainCircuit className="w-16 h-16" />
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Algorithm Efficiency</h4>
                            <p className="text-lg font-black italic tracking-tighter mb-4">98.4% STABLE</p>
                            <Button className="w-full bg-white/10 hover:bg-white/20 border-white/5 text-[9px] font-black uppercase tracking-widest h-10 rounded-xl">View Logic Stack</Button>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}

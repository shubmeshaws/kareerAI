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
    Activity
} from "lucide-react";
import { AIUsageDashboardData, AIUsageAlert } from "@/lib/types/admin-ai-usage";

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

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

    if (loading) return <div className="p-8 text-center text-slate-500">Loading usage analytics...</div>;
    if (!data) return <div className="p-8 text-center text-slate-500">No data available</div>;

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
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">AI Consumption & Costs</h1>
                    <p className="text-slate-400">Monitor token usage, estimated costs, and provider performance.</p>
                </div>
                <Button variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-900" onClick={fetchData}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Refresh Data
                </Button>
            </div>

            {/* Alerts Banner */}
            {data.alerts.length > 0 && (
                <div className="space-y-2">
                    {data.alerts.map(alert => (
                        <div key={alert.id} className={`p-4 rounded-lg border flex items-center gap-3 ${alert.severity === 'high' ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' :
                            'bg-amber-500/10 border-amber-500/30 text-amber-300'
                            }`}>
                            <AlertTriangle className="w-5 h-5 shrink-0" />
                            <div>
                                <span className="font-bold uppercase text-xs tracking-wider opacity-70">{alert.metric} Alert</span>
                                <p className="text-sm font-medium">{alert.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4 bg-slate-900 border-slate-800 flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/10 rounded-lg">
                        <Zap className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-400">Total Tokens</p>
                        <h3 className="text-2xl font-bold text-white">{(data.totalTokens / 1000).toFixed(1)}k</h3>
                    </div>
                </Card>
                <Card className="p-4 bg-slate-900 border-slate-800 flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                        <DollarSign className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-400">Est. Cost</p>
                        <h3 className="text-2xl font-bold text-white">${data.totalCost.toFixed(4)}</h3>
                    </div>
                </Card>
                <Card className="p-4 bg-slate-900 border-slate-800 flex items-center gap-4">
                    <div className="p-3 bg-sky-500/10 rounded-lg">
                        <Activity className="w-6 h-6 text-sky-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-400">Avg Latency</p>
                        <h3 className="text-2xl font-bold text-white">{data.averageLatency}ms</h3>
                    </div>
                </Card>
                <Card className="p-4 bg-slate-900 border-slate-800 flex items-center gap-4">
                    <div className="p-3 bg-rose-500/10 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-400">Fallbacks/Errors</p>
                        <h3 className="text-2xl font-bold text-white">{data.fallbackCount}</h3>
                    </div>
                </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6 bg-slate-900 border-slate-800 h-[400px]">
                    <h3 className="font-bold text-white mb-6">Daily Token Usage</h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={data.dailyStats}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                            <Legend />
                            <Bar dataKey="totalTokens" name="Tokens" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                <Card className="p-6 bg-slate-900 border-slate-800 h-[400px]">
                    <h3 className="font-bold text-white mb-6">Daily Calls & Errors</h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <LineChart data={data.dailyStats}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="totalCalls" name="Total Calls" stroke="#10b981" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="errors" name="Errors" stroke="#f43f5e" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6 bg-slate-900 border-slate-800 h-[400px]">
                    <h3 className="font-bold text-white mb-6">Provider Distribution (Tokens)</h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <PieChart>
                            <Pie
                                data={providerData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {providerData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div>
            {/* Top Users Table */}
            <Card className="bg-slate-900 border-slate-800">
                <div className="p-6 border-b border-slate-800">
                    <h3 className="font-bold text-white">Top Users by Consumption</h3>
                </div>
                <div className="p-6">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-950/50">
                            <tr>
                                <th className="px-4 py-3 rounded-l-lg">User ID</th>
                                <th className="px-4 py-3">Total Calls</th>
                                <th className="px-4 py-3">Total Tokens</th>
                                <th className="px-4 py-3">Est. Cost</th>
                                <th className="px-4 py-3 rounded-r-lg text-right">Last Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.topUsers.map((user) => (
                                <tr key={user.userId} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/20 transition-colors">
                                    <td className="px-4 py-3 font-medium text-slate-200">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs text-indigo-400">
                                                {user.userId.charAt(0).toUpperCase()}
                                            </div>
                                            {user.userId}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-slate-400">{user.totalCalls}</td>
                                    <td className="px-4 py-3 text-slate-400">{(user.totalTokens / 1000).toFixed(1)}k</td>
                                    <td className="px-4 py-3 text-emerald-400 font-mono">${user.totalCost.toFixed(4)}</td>
                                    <td className="px-4 py-3 text-right text-slate-500">
                                        {new Date(user.lastActive).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

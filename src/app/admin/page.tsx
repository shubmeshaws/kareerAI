"use client";

import React from "react";
import {
    Users,
    Zap,
    FileText,
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    ChevronRight,
    Plus,
    ArrowRight,
    Globe,
    ZapOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const stats = [
    {
        label: "Total Users",
        value: "1,284",
        change: "+12.5%",
        trend: "up",
        icon: Users,
    },
    {
        label: "Job Applications",
        value: "4,592",
        change: "+8.2%",
        trend: "up",
        icon: Zap,
    },
    {
        label: "Resumes Built",
        value: "8,201",
        change: "+24.1%",
        trend: "up",
        icon: FileText,
    },
    {
        label: "MTD Revenue",
        value: "$12,450",
        change: "-2.4%",
        trend: "down",
        icon: DollarSign,
    }
];

export default function AdminDashboard() {
    return (
        <div className="flex-1 flex overflow-hidden p-3 gap-3 h-full max-h-screen">
            {/* Column 2: Main Workspace - Flexible Grid */}
            <main className="flex-1 bg-white dark:bg-black/20 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-white/5 flex flex-col overflow-hidden relative">
                {/* Header - Compact */}
                <header className="p-4 flex items-center justify-between shrink-0 border-b border-gray-50 dark:border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                            <Activity className="w-4 h-4" />
                        </div>
                        <div>
                            <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">System Grid</h1>
                            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Live Telemetry</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-slate-400">
                            <ZapOff className="w-4 h-4" />
                        </Button>
                        <Button className="bg-black dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-200 text-white dark:text-black px-4 h-8 rounded-full font-bold text-[10px] uppercase tracking-wide shadow-md transition-all flex items-center gap-2">
                            <Plus className="w-3 h-3" />
                            Invite
                        </Button>
                    </div>
                </header>

                {/* Content Area - No Scroll Grid */}
                <div className="flex-1 p-4 grid grid-rows-[auto_1fr_auto] gap-4 overflow-hidden">

                    {/* Top Row: Mini Stats */}
                    <div className="grid grid-cols-4 gap-3">
                        {stats.map((stat) => (
                            <div key={stat.label} className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-between group hover:bg-white dark:hover:bg-white/10 hover:shadow-md transition-all cursor-default">
                                <div>
                                    <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
                                    <div className="flex items-baseline gap-1 mt-0.5">
                                        <p className="text-base font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</p>
                                        <span className={`text-[8px] font-bold ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>{stat.change}</span>
                                    </div>
                                </div>
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                    }`}>
                                    <stat.icon className="w-4 h-4" strokeWidth={2} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Middle Row: Main Visuals */}
                    <div className="grid grid-cols-3 gap-4 min-h-0">
                        {/* Live Log - 2 Cols */}
                        <div className="col-span-2 bg-white dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5 p-4 flex flex-col relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowUpRight className="w-4 h-4 text-slate-300" />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Realtime Stream
                            </h3>
                            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
                                {[
                                    { user: "Sarah Jenkins", action: "upgraded plan", target: "Pro", time: "2m" },
                                    { user: "Michael Chen", action: "generated resume", target: "Dev", time: "15m" },
                                    { user: "System", action: "scaled nodes", target: "US-East", time: "1h" },
                                    { user: "Auto-Apply", action: "submitted to", target: "Google", time: "2h" },
                                    { user: "Alex Wong", action: "viewed job", target: "Netflix", time: "3h" },
                                ].map((activity, i) => (
                                    <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase">
                                            {activity.user.charAt(0)}{activity.target.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{activity.user}</span>
                                                <span className="text-[10px] font-medium text-slate-400 truncate">{activity.action}</span>
                                            </div>
                                            <p className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 truncate">{activity.target}</p>
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-300 dark:text-slate-600 whitespace-nowrap">{activity.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Status Card - 1 Col */}
                        <div className="rounded-2xl bg-black dark:bg-[#111] text-white p-5 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-[50px] opacity-20 -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500 rounded-full blur-[40px] opacity-20 translate-y-1/2 -translate-x-1/2" />

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <Activity className="w-5 h-5 text-indigo-400" />
                                    <Badge className="bg-white/10 hover:bg-white/20 text-white border-none text-[8px] px-2">STABLE</Badge>
                                </div>
                                <h3 className="text-2xl font-black tracking-tight mt-1">98.2<span className="text-lg text-white/50">%</span></h3>
                                <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Uptime Metric</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[9px] font-bold text-white/60 uppercase">
                                    <span>Database</span>
                                    <span className="text-emerald-400">Good</span>
                                </div>
                                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[92%] bg-emerald-500 rounded-full" />
                                </div>

                                <div className="flex justify-between text-[9px] font-bold text-white/60 uppercase mt-2">
                                    <span>API Latency</span>
                                    <span className="text-amber-400">Fair</span>
                                </div>
                                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[65%] bg-amber-500 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Quick Regions */}
                    <div className="bg-[#F9F9F9] dark:bg-white/5 rounded-2xl p-3 border border-gray-100 dark:border-white/5 flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-4">
                            <span className="font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 pl-2">Active Regions</span>
                            <div className="flex gap-2">
                                {['US-East', 'EU-West', 'IN-South', 'JP-East'].map(region => (
                                    <span key={region} className="px-2 py-1 bg-white dark:bg-white/10 rounded-md border border-gray-200 dark:border-white/5 font-bold text-slate-700 dark:text-slate-300">{region}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pr-2">
                            <Globe className="w-3.5 h-3.5 text-slate-400" />
                            <span className="font-black text-slate-900 dark:text-white">Global Mesh Active</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Column 3: Context Panel - Fixed Width */}
            <aside className="w-[280px] hidden xl:flex flex-col rounded-[1.5rem] bg-white dark:bg-black/20 border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm relative">
                <div className="p-5 flex-1 flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Resource Context</h2>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </div>

                    {/* AI Usage Circular Mock */}
                    <div className="relative aspect-square mb-6 flex items-center justify-center">
                        {/* Simple CSS-only chart representation */}
                        <div className="w-40 h-40 rounded-full border-[12px] border-gray-100 dark:border-white/5 border-t-indigo-500 border-r-purple-500 border-l-cyan-500 rotate-45 transition-all hover:rotate-90 duration-700" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">78<span className="text-sm align-top">%</span></span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Token Limit</span>
                        </div>
                    </div>

                    <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar">
                        {[
                            { label: "OpenAI GPT-4", val: "42%", color: "bg-indigo-500" },
                            { label: "Claude 3.5", val: "28%", color: "bg-purple-500" },
                            { label: "Llama 3", val: "18%", color: "bg-cyan-500" },
                        ].map(item => (
                            <div key={item.label} className="bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase">{item.label}</span>
                                    <span className="text-[10px] font-black text-slate-900 dark:text-white">{item.val}</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.val }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-[9px] font-medium text-white/60 uppercase tracking-widest mb-1">Projected Cost</p>
                                    <p className="text-xl font-black tracking-tight">$452.80</p>
                                </div>
                                <DollarSign className="w-5 h-5 text-white/40" />
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}

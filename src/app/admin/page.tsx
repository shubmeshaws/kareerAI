"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Users,
    Zap,
    FileText,
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Activity
} from "lucide-react";

const stats = [
    {
        label: "Total Users",
        value: "1,284",
        change: "+12.5%",
        trend: "up",
        icon: Users,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        label: "Active Applications",
        value: "4,592",
        change: "+8.2%",
        trend: "up",
        icon: Zap,
        color: "text-amber-500",
        bg: "bg-amber-500/10"
    },
    {
        label: "Resumes Generated",
        value: "8,201",
        change: "+24.1%",
        trend: "up",
        icon: FileText,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        label: "Est. Revenue",
        value: "$12,450",
        change: "-2.4%",
        trend: "down",
        icon: DollarSign,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
    }
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-white tracking-tight">Admin Overview</h1>
                <p className="text-slate-400">Welcome back, Administrator. Here's what's happening with KareerAI.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.label} className="p-6 bg-slate-900 border-slate-800 hover:border-slate-700 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {stat.change}
                                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <Card className="lg:col-span-2 p-6 bg-slate-900 border-slate-800">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Activity className="w-5 h-5 text-indigo-400" />
                            System Activity
                        </h3>
                        <Button variant="outline" size="sm" className="text-xs border-slate-700 text-slate-300 hover:bg-slate-800">
                            View All
                        </Button>
                    </div>

                    <div className="space-y-6">
                        {[
                            { user: "Sarah Jenkins", action: "upgraded to", target: "Premium Plan", time: "2 mins ago" },
                            { user: "Michael Chen", action: "generated", target: "Senior Dev Resume", time: "15 mins ago" },
                            { user: "System", action: "auto-scaled", target: "Production Nodes", time: "1 hour ago" },
                            { user: "Emma Wilson", action: "applied to", target: "Google via Auto-Apply", time: "2 hours ago" },
                            { user: "Admin", action: "rotated", target: "OpenAI API Keys", time: "4 hours ago" }
                        ].map((activity, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 capitalize">
                                        {activity.user.charAt(0)}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-bold text-slate-200">{activity.user}</span>
                                        <span className="text-slate-400 mx-1.5">{activity.action}</span>
                                        <span className="font-bold text-indigo-400">{activity.target}</span>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-500 whitespace-nowrap">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* AI Token Usage */}
                <Card className="p-6 bg-slate-900 border-slate-800">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                        <TrendingUp className="w-5 h-5 text-purple-400" />
                        AI Token Usage
                    </h3>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-400">OpenAI (GPT-4o)</span>
                                <span className="text-slate-200 font-bold">78%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[78%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-400">Anthropic (Claude 3.5)</span>
                                <span className="text-slate-200 font-bold">42%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 w-[42%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-400">DeepSeek (V3)</span>
                                <span className="text-slate-200 font-bold">12%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[12%]" />
                            </div>
                        </div>
                    </div>

                    <Separator className="my-6 bg-slate-800" />

                    <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Cost (MTD)</p>
                        <p className="text-xl font-bold text-white">$452.80</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}

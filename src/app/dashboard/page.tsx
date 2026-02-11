import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    FileText,
    MessageSquare,
    Briefcase,
    TrendingUp,
    Plus,
    ArrowRight
} from "lucide-react";

import Link from "next/link";

const stats = [
    {
        label: "Resumes Created",
        value: "3",
        change: "+1 this week",
        icon: FileText,
        color: "from-cyan-500 to-blue-600"
    },
    {
        label: "Interview Sessions",
        value: "12",
        change: "+4 this week",
        icon: MessageSquare,
        color: "from-indigo-500 to-purple-600"
    },
    {
        label: "Jobs Applied",
        value: "24",
        change: "+8 this week",
        icon: Briefcase,
        color: "from-cyan-400 to-cyan-600"
    },
    {
        label: "Profile Score",
        value: "85%",
        change: "+5% improvement",
        icon: TrendingUp,
        color: "from-indigo-400 to-indigo-600"
    },
];

const quickActions = [
    { label: "New Resume", icon: FileText, href: "/dashboard/resumes" },
    { label: "Practice Interview", icon: MessageSquare, href: "/dashboard/interviews" },
    { label: "Browse Jobs", icon: Briefcase, href: "/dashboard/jobs" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                        Welcome back, <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-500 bg-clip-text text-transparent italic">John</span>! 👋
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Your neural career engine is optimized and ready for deployment.</p>
                </div>
                <div className="flex gap-3">
                    {quickActions.map((action) => (
                        <Link key={action.label} href={action.href}>
                            <Button
                                variant="outline"
                                className="gap-2 border-gray-200 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-gray-700 dark:text-white rounded-xl transition-all h-11 px-6 font-bold shadow-sm dark:shadow-none"
                            >
                                <Plus className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                                {action.label}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.label} className="p-6 bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-cyan-500/50 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 group rounded-[2rem] relative overflow-hidden backdrop-blur-sm shadow-sm dark:shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-start justify-between">
                            <div>
                                <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-3xl font-black text-gray-900 dark:text-white mt-1 tracking-tighter">{stat.value}</p>
                                <p className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 mt-1 uppercase tracking-wider">{stat.change}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Resumes */}
                <Card className="p-6 bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-[2.5rem] backdrop-blur-sm shadow-sm dark:shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,1)]" />
                            <h2 className="text-sm font-black text-gray-600 dark:text-gray-300 uppercase tracking-widest">Recent Neural Resumes</h2>
                        </div>
                        <Button variant="ghost" size="sm" className="text-cyan-600 dark:text-cyan-400 gap-1 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-cyan-700 dark:hover:text-cyan-300 font-bold uppercase text-[10px] tracking-widest">
                            View all <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {["Software Engineer Resume", "Product Manager CV", "Data Analyst Resume"].map((resume, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-white/20 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl hover:border-cyan-500/30 hover:bg-white dark:hover:bg-white/10 transition-all cursor-pointer group shadow-sm dark:shadow-none">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-600/20 flex items-center justify-center ring-1 ring-gray-200 dark:ring-white/10 group-hover:ring-cyan-500/50 transition-all">
                                    <FileText className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-black text-gray-900 dark:text-gray-100 group-hover:text-cyan-600 dark:group-hover:text-white transition-colors tracking-tight">{resume}</p>
                                    <p className="text-[11px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Optimized 2 days ago • 92% Match</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-600 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-all transform group-hover:translate-x-1" />
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Upcoming Interviews */}
                <Card className="p-6 bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-[2.5rem] backdrop-blur-sm shadow-sm dark:shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(129,140,248,1)]" />
                            <h2 className="text-sm font-black text-gray-600 dark:text-gray-300 uppercase tracking-widest">Predictive Interview Prep</h2>
                        </div>
                        <Button variant="ghost" size="sm" className="text-indigo-600 dark:text-indigo-400 gap-1 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold uppercase text-[10px] tracking-widest">
                            Simulate <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { title: "Technical Architecture", company: "Google", date: "Tomorrow", score: "88%" },
                            { title: "Scale & Reliability", company: "Meta", date: "In 3 days", score: "94%" },
                            { title: "System Synthesis", company: "Amazon", date: "Next week", score: "82%" },
                        ].map((interview, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-white/20 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl hover:border-indigo-500/30 hover:bg-white dark:hover:bg-white/10 transition-all cursor-pointer group shadow-sm dark:shadow-none">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-pink-600/20 flex items-center justify-center ring-1 ring-gray-200 dark:ring-white/10 group-hover:ring-indigo-500/50 transition-all">
                                    <MessageSquare className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-black text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors tracking-tight">{interview.title}</p>
                                    <p className="text-[11px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">{interview.company} • {interview.date} • Readiness: {interview.score}</p>
                                </div>
                                <div className="h-2 w-16 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500" style={{ width: interview.score }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}

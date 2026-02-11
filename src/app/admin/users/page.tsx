"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    MoreHorizontal,
    UserPlus,
    Shield,
    Mail,
    Filter,
    ChevronRight,
    ArrowUpRight,
    UserCheck,
    AlertCircle,
    Activity,
    Users
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to load users", err);
                setIsLoading(false);
            });
    }, []);

    const filteredUsers = users.filter((u: any) =>
        u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 flex overflow-hidden p-3 gap-3 h-full max-h-screen">
            {/* Column 2: Main Workspace */}
            <main className="flex-1 bg-white dark:bg-black/20 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-white/5 flex flex-col overflow-hidden relative">
                {/* Header - Compact */}
                <header className="p-4 flex items-center justify-between shrink-0 border-b border-gray-50 dark:border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                            <Users className="w-4 h-4" />
                        </div>
                        <div>
                            <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">User Directory</h1>
                            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Active Members: {filteredUsers.length}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                            <Input
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 w-48 h-8 rounded-full bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 focus:bg-white dark:focus:bg-white/10 focus:ring-emerald-500/20 text-xs font-bold transition-all"
                            />
                        </div>
                        <Button className="bg-black dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-200 text-white dark:text-black px-4 h-8 rounded-full font-bold text-[10px] uppercase tracking-wide shadow-md transition-all flex items-center gap-2">
                            <UserPlus className="w-3 h-3" />
                            Add
                        </Button>
                    </div>
                </header>

                {/* Table Content Area - Scrollable */}
                <div className="flex-1 overflow-auto custom-scrollbar p-0">
                    <Table>
                        <TableHeader className="sticky top-0 bg-white dark:bg-[#0E121B] z-10 shadow-sm">
                            <TableRow className="border-gray-100 dark:border-white/5 hover:bg-transparent">
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest px-6 h-10">Identity</TableHead>
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest h-10">Tier</TableHead>
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest h-10">Status</TableHead>
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest h-10">Usage Metric</TableHead>
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest text-right px-6 h-10">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-20 text-slate-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-6 h-6 border-2 border-slate-100 border-t-emerald-500 rounded-full animate-spin" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Loading...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-20 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                        No users found
                                    </TableCell>
                                </TableRow>
                            ) : filteredUsers.map((user: any) => (
                                <TableRow key={user.id} className="border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                                    <TableCell className="px-6 py-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-8 h-8 rounded-lg group-hover:scale-105 transition-transform duration-300 ring-2 ring-white dark:ring-white/10 shadow-sm">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                                                <AvatarFallback className="bg-gray-100 dark:bg-white/10 rounded-lg text-xs font-bold dark:text-white">{user.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 dark:text-white text-xs leading-none">{user.name}</span>
                                                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold mt-0.5 uppercase tracking-tighter">{user.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <Badge variant="outline" className={`text-[9px] font-black border px-2 py-0.5 rounded-md uppercase tracking-wider ${user.plan === 'PRO' ? 'border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/10' :
                                            user.plan === 'FREE' ? 'border-gray-100 dark:border-white/10 text-slate-400 dark:text-slate-500 bg-gray-50 dark:bg-white/5' : 'border-slate-200 dark:border-white/20 text-slate-700 dark:text-slate-300'
                                            }`}>
                                            {user.plan}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="flex items-center gap-1.5">
                                            <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'ACTIVE' ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]' : 'bg-rose-500'}`} />
                                            <span className="text-[9px] font-bold text-slate-700 dark:text-slate-300 uppercase">
                                                {user.status}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="w-24 space-y-1">
                                            <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase">
                                                <span>Usage</span>
                                                <span>{user.usage?.resumesGenerated || 0}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 dark:bg-white/10 h-1 rounded-full overflow-hidden">
                                                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (user.usage?.resumesGenerated || 0) * 10)}%` }} />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right px-6 py-3">
                                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-slate-400 dark:text-slate-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>

            {/* Column 3: Stats - Compact */}
            <aside className="w-[280px] hidden xl:flex flex-col gap-3 overflow-hidden">
                {/* Insights Card */}
                <div className="flex-1 bg-white dark:bg-black/20 rounded-[1.5rem] p-5 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col relative overflow-hidden group">
                    {/* Decorative Gradients */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="flex items-center justify-between mb-6 relative">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Insights</h2>
                        <Badge variant="outline" className="text-[8px] font-bold uppercase bg-white/50 dark:bg-white/5 backdrop-blur-sm border-gray-100 dark:border-white/10">Live</Badge>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="bg-[#F9F9F9] dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/5 group/card hover:border-emerald-500/20 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div className="w-8 h-8 bg-white dark:bg-black/20 rounded-lg border border-gray-100 dark:border-white/10 flex items-center justify-center shadow-sm">
                                    <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">+12%</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">94.2%</h3>
                            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Active Retention</p>

                            <div className="mt-3 flex -space-x-2 pl-1">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-5 h-5 rounded-full border-2 border-white dark:border-[#111] bg-slate-100 overflow-hidden ring-1 ring-black/5">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-black dark:bg-[#111] rounded-2xl p-4 text-white relative overflow-hidden group/security">
                            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover/security:scale-110 transition-transform duration-700">
                                <Shield className="w-16 h-16" fill="white" />
                            </div>
                            <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-1">Security Level</p>
                            <h3 className="text-xl font-black tracking-tight italic mb-4">MAXIMUM</h3>

                            <div className="flex items-center justify-between bg-white/10 p-2.5 rounded-xl border border-white/5 backdrop-blur-sm">
                                <span className="text-[9px] font-bold uppercase text-white/60">Threats</span>
                                <span className="text-xs font-black">0</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 relative z-10">
                        <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Recent Signals</h4>
                        <div className="space-y-3">
                            {[
                                { icon: UserPlus, text: "New user from Seattle", time: "2m" },
                                { icon: Activity, text: "High usage alert", time: "15m" },
                            ].map((signal, i) => (
                                <div key={i} className="flex gap-3 items-center">
                                    <div className="w-6 h-6 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-100 dark:border-white/5">
                                        <signal.icon className="w-3 h-3 text-slate-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate">{signal.text}</p>
                                        <p className="text-[8px] font-bold text-slate-300 dark:text-slate-600 uppercase">{signal.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Button variant="outline" className="w-full rounded-2xl border-gray-200 dark:border-white/10 h-10 font-bold uppercase tracking-wide text-[10px] transition-all hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-black dark:hover:border-white shadow-sm">
                    Export Data
                </Button>
            </aside>
        </div>
    );
}

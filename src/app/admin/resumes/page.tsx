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
    FileText,
    Search,
    Download,
    Eye,
    Trash2,
    Plus,
    ChevronRight,
    TrendingUp,
    Zap,
    Clock,
    User,
    ShieldAlert,
    BarChart3,
    ArrowUpRight
} from "lucide-react";
import { Resume, ResumeStats } from "@/lib/types/admin-resume";
import Link from "next/link";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AdminResumesPage() {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [stats, setStats] = useState<ResumeStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = async () => {
        try {
            const [resResumes, resStats] = await Promise.all([
                fetch('/api/admin/resumes'),
                fetch('/api/admin/resumes/stats')
            ]);
            setResumes(await resResumes.json());
            setStats(await resStats.json());
        } catch (e) {
            console.error("Failed to load data", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/resumes/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success("Resume deleted");
                fetchData();
            } else {
                toast.error("Failed to delete");
            }
        } catch (e) {
            toast.error("Error deleting resume");
        }
    };

    const filteredResumes = resumes.filter(r =>
        r.fileName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.userName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    function formatBytes(bytes: number, decimals = 2) {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    return (
        <div className="flex-1 flex overflow-hidden p-3 gap-3 h-full max-h-screen">
            {/* Column 2: Main Workspace */}
            <main className="flex-1 bg-white dark:bg-black/20 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-white/5 flex flex-col overflow-hidden relative">
                {/* Header - Compact */}
                <header className="p-4 flex items-center justify-between shrink-0 border-b border-gray-50 dark:border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                            <FileText className="w-4 h-4" />
                        </div>
                        <div>
                            <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Global Resumes</h1>
                            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Vault: {filteredResumes.length} Files</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                            <Input
                                placeholder="Search vault..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 w-48 h-8 rounded-full bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 focus:bg-white dark:focus:bg-white/10 focus:ring-orange-500/20 text-xs font-bold transition-all"
                            />
                        </div>
                        <Button className="bg-black dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-200 text-white dark:text-black px-4 h-8 rounded-full font-bold text-[10px] uppercase tracking-wide shadow-md transition-all flex items-center gap-2">
                            <BarChart3 className="w-3 h-3" />
                            Audit
                        </Button>
                    </div>
                </header>

                {/* Table Content Area - Scrollable */}
                <div className="flex-1 overflow-auto custom-scrollbar p-0">
                    <Table>
                        <TableHeader className="sticky top-0 bg-white dark:bg-[#0E121B] z-10 shadow-sm">
                            <TableRow className="border-gray-100 dark:border-white/5 hover:bg-transparent">
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest px-6 h-10">Asset</TableHead>
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest h-10">Owner</TableHead>
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest h-10">Fidelity</TableHead>
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest text-center h-10">Meta</TableHead>
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest text-right px-6 h-10">Control</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-20 text-slate-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-6 h-6 border-2 border-slate-100 dark:border-white/10 border-t-orange-500 rounded-full animate-spin" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Scanning Vault...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredResumes.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-20 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                        No resumes found
                                    </TableCell>
                                </TableRow>
                            ) : filteredResumes.map((res) => (
                                <TableRow key={res.id} className="border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                                    <TableCell className="px-6 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                                                <FileText className="w-4 h-4 opacity-70 group-hover:opacity-100" strokeWidth={1.5} />
                                            </div>
                                            <div className="flex flex-col overflow-hidden max-w-[180px]">
                                                <span className="font-bold text-slate-900 dark:text-white text-xs leading-none truncate">{res.fileName}</span>
                                                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold mt-0.5 uppercase tracking-widest italic">{new Date(res.uploadDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="w-5 h-5 rounded-md ring-1 ring-gray-100 dark:ring-white/10">
                                                <AvatarFallback className="text-[8px] font-black uppercase bg-slate-50 dark:bg-white/10 dark:text-white">{res.userName?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 truncate max-w-[100px]">{res.userName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-12 bg-slate-100 dark:bg-white/10 h-1 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full transition-all duration-1000 ${res.atsScore >= 80 ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{ width: `${res.atsScore}%` }} />
                                            </div>
                                            <span className={`text-[9px] font-black italic ${res.atsScore >= 80 ? 'text-emerald-500' : 'text-amber-500'}`}>{res.atsScore}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center font-mono text-[9px] text-slate-400 dark:text-slate-500 font-bold py-3">
                                        {formatBytes(res.fileSize, 0)}
                                    </TableCell>
                                    <TableCell className="text-right px-6 py-3">
                                        <div className="flex justify-end gap-1">
                                            <Link href={`/admin/resumes/${res.id}`}>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-slate-300 dark:text-slate-600 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
                                                    <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                                                </Button>
                                            </Link>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all">
                                                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="rounded-2xl border-gray-100 dark:border-white/10 bg-white dark:bg-[#0E121B] max-w-sm">
                                                    <AlertDialogHeader>
                                                        <div className="w-10 h-10 bg-rose-50 dark:bg-rose-500/10 rounded-xl flex items-center justify-center mb-3 text-rose-500">
                                                            <ShieldAlert className="w-5 h-5" />
                                                        </div>
                                                        <AlertDialogTitle className="text-base font-black text-slate-900 dark:text-white tracking-tight">Purge Asset?</AlertDialogTitle>
                                                        <AlertDialogDescription className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                                                            Permanently remove <span className="text-black dark:text-white font-bold">"{res.fileName}"</span>? This is irreversible.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter className="mt-4 gap-2">
                                                        <AlertDialogCancel className="rounded-xl border-gray-100 dark:border-white/10 h-8 px-4 font-black uppercase text-[9px] tracking-widest text-slate-900 dark:text-white">Abort</AlertDialogCancel>
                                                        <AlertDialogAction className="bg-rose-600 hover:bg-rose-700 rounded-xl h-8 px-4 font-black uppercase text-[9px] tracking-widest text-white shadow-lg shadow-rose-500/20" onClick={() => handleDelete(res.id)}>Confirm</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>

            {/* Column 3: Analytics - Compact */}
            <aside className="w-[280px] hidden xl:flex flex-col gap-3 overflow-hidden">
                <div className="flex-1 bg-white dark:bg-black/20 rounded-[1.5rem] p-5 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col relative overflow-hidden group">
                    {/* Decorative Gradients */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Metrics</h2>
                        <Badge variant="outline" className="text-[8px] font-bold uppercase bg-white/50 dark:bg-white/5 backdrop-blur-sm border-gray-100 dark:border-white/10">Real-time</Badge>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <div className="bg-[#F9F9F9] dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/5 group/card hover:border-orange-500/20 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div className="p-2 bg-white dark:bg-black/20 rounded-lg border border-gray-100 dark:border-white/10 shadow-sm">
                                    <BarChart3 className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <span className="text-[10px] font-bold text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-1.5 py-0.5 rounded">High</span>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">84.2</h3>
                            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Avg ATS Score</p>
                        </div>

                        <div className="space-y-3 pt-2">
                            {[
                                { label: "Optimized PDF", value: 65, color: "bg-black dark:bg-white" },
                                { label: "Legacy DOCX", value: 25, color: "bg-slate-300 dark:bg-slate-600" },
                                { label: "System Artifacts", value: 10, color: "bg-slate-100 dark:bg-slate-800" },
                            ].map((item) => (
                                <div key={item.label} className="space-y-1">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">{item.label}</span>
                                        <span className="text-[9px] font-black text-slate-900 dark:text-white">{item.value}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-slate-50 dark:bg-white/5 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto pt-6">
                        <div className="p-4 bg-black dark:bg-[#111] rounded-2xl text-white shadow-xl relative group cursor-pointer overflow-hidden border-2 border-white/5">
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <h4 className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-1">Total Payload</h4>
                            <p className="text-xl font-black italic tracking-tighter">{stats ? formatBytes(stats.totalSize, 1) : '0 MB'}</p>
                            <div className="mt-3 flex items-center gap-2 text-[9px] font-medium text-white/60">
                                <Zap className="w-3 h-3 text-orange-400" />
                                <span>Optimization Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}

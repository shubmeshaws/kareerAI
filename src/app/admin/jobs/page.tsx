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
    Briefcase,
    Search,
    Building2,
    Calendar,
    User,
    ListFilter,
    RefreshCw,
    ExternalLink,
    Eye,
    TrendingUp
} from "lucide-react";
import { Job, JobStats, DuplicateGroup } from "@/lib/types/admin-job";
import Link from "next/link";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";

export default function AdminJobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [stats, setStats] = useState<JobStats | null>(null);
    const [duplicates, setDuplicates] = useState<DuplicateGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [scanning, setScanning] = useState(false);

    const fetchData = async () => {
        try {
            const [resJobs, resStats] = await Promise.all([
                fetch('/api/admin/jobs'),
                fetch('/api/admin/jobs/stats')
            ]);
            setJobs(await resJobs.json());
            setStats(await resStats.json());
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleScanDuplicates = async () => {
        setScanning(true);
        try {
            const res = await fetch('/api/admin/jobs/merge');
            const data = await res.json();
            setDuplicates(data);
            if (data.length === 0) toast.success("No duplicates found");
            else toast.info(`Found ${data.length} potential duplicate groups`);
        } catch (e) {
            toast.error("Scan failed");
        } finally {
            setScanning(false);
        }
    };

    const handleMerge = async (masterId: string, duplicateIds: string[]) => {
        try {
            const res = await fetch('/api/admin/jobs/merge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ masterId, duplicateIds })
            });
            if (res.ok) {
                toast.success("Jobs merged successfully");
                setDuplicates(prev => prev.filter(d => !d.ids.includes(masterId)));
                fetchData();
            } else {
                toast.error("Merge failed");
            }
        } catch (e) {
            toast.error("Merge error");
        }
    };

    const filteredJobs = jobs.filter(j =>
        j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 flex overflow-hidden p-3 gap-3 h-full max-h-screen">
            {/* Column 2: Main Workspace */}
            <main className="flex-1 bg-white dark:bg-black/20 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-white/5 flex flex-col overflow-hidden relative">
                {/* Header - Compact */}
                <header className="p-4 flex items-center justify-between shrink-0 border-b border-gray-50 dark:border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                            <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                            <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Job Listings</h1>
                            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">DB: {stats?.totalJobs || 0} Positions</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <Input
                                placeholder="Search roles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 w-48 h-8 rounded-full bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 focus:bg-white dark:focus:bg-white/10 focus:ring-indigo-500/20 text-xs font-bold transition-all"
                            />
                        </div>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="h-8 px-3 rounded-full border-gray-200 dark:border-white/10 font-bold text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all"
                                    onClick={handleScanDuplicates}
                                >
                                    <RefreshCw className={`w-3 h-3 mr-2 ${scanning ? 'animate-spin' : ''}`} />
                                    Scan Dupes
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-slate-900 border-slate-800 text-slate-200">
                                <DialogHeader>
                                    <DialogTitle>Duplicate Detection</DialogTitle>
                                    <DialogDescription className="text-slate-400">
                                        Scanning job listings for similar company and role combinations.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                                    {duplicates.length > 0 ? duplicates.map((group, i) => (
                                        <div key={i} className="p-4 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800">
                                            <div className="flex justify-between items-start mb-3">
                                                <span className="font-bold text-white text-sm">{group.key}</span>
                                                <Badge variant="secondary">{group.count} Potential matches</Badge>
                                            </div>
                                            <div className="text-xs text-slate-500 mb-4">
                                                IDs: {group.ids.join(", ")}
                                            </div>
                                            <Button
                                                size="sm"
                                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                                onClick={() => handleMerge(group.ids[0], group.ids)}
                                            >
                                                Merge All into {group.ids[0]}
                                            </Button>
                                        </div>
                                    )) : (
                                        <div className="text-center py-8 text-slate-500">
                                            {scanning ? "Scanning..." : "No duplicates found."}
                                        </div>
                                    )}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </header>

                {/* Table Content Area - Scrollable */}
                <div className="flex-1 overflow-auto custom-scrollbar p-0">
                    <Table>
                        <TableHeader className="sticky top-0 bg-white dark:bg-[#0E121B] z-10 shadow-sm">
                            <TableRow className="border-gray-100 dark:border-white/5 hover:bg-transparent">
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest px-6 h-10">Company</TableHead>
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest h-10">Position</TableHead>
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest h-10">Meta</TableHead>
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest h-10">Origin</TableHead>
                                <TableHead className="text-slate-400 dark:text-slate-500 font-black uppercase text-[9px] tracking-widest text-right px-6 h-10">View</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-20 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                                        Loading jobs database...
                                    </TableCell>
                                </TableRow>
                            ) : filteredJobs.map((job) => (
                                <TableRow key={job.id} className="border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                                    <TableCell className="px-6 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center font-bold text-slate-400 dark:text-slate-500 border border-gray-100 dark:border-white/10 group-hover:bg-white dark:group-hover:bg-white/10 group-hover:shadow-sm transition-all">
                                                <Building2 className="w-4 h-4" strokeWidth={1.5} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 dark:text-white text-xs leading-none">{job.company}</span>
                                                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold mt-0.5 uppercase tracking-tighter">{new Date(job.createdDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{job.role}</span>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <Badge variant="outline" className="border-gray-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-[9px] font-bold uppercase tracking-wider rounded-md">
                                            {job.companyType}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <User className="w-3 h-3 text-slate-400" />
                                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{job.savedByUserName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right px-6 py-3">
                                        <Link href={`/admin/jobs/${job.id}`}>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-slate-300 dark:text-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>

            {/* Column 3: Quick Stats - Compact */}
            <aside className="w-[280px] hidden xl:flex flex-col gap-3 overflow-hidden">
                <div className="bg-white dark:bg-black/20 rounded-[1.5rem] p-5 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col relative overflow-hidden group">
                    {/* Decorative Gradients */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Pipeline</h2>
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                    </div>

                    <div className="space-y-3">
                        <div className="bg-[#F9F9F9] dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5 transition-all hover:border-indigo-500/20 group/stat">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">New Listings</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{stats?.newJobsToday || 0}</span>
                                <span className="text-[9px] font-bold text-emerald-500 uppercase">Today</span>
                            </div>
                        </div>

                        <div className="bg-[#F9F9F9] dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Total Active</p>
                            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{stats?.totalJobs || 0}</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-6">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-20">
                                <Briefcase className="w-12 h-12 rotate-12" />
                            </div>
                            <p className="text-[9px] font-medium text-white/60 uppercase tracking-widest mb-1">Top Source</p>
                            <p className="text-xl font-black tracking-tight">LinkedIn</p>
                            <div className="w-full bg-white/20 h-1 rounded-full mt-3 overflow-hidden">
                                <div className="bg-white h-full w-[72%]" />
                            </div>
                            <p className="text-[8px] font-bold text-white/50 mt-1 text-right">72% of volume</p>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}

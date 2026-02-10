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
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Job Management</h1>
                    <p className="text-slate-400">Track and manage {stats?.totalJobs || 0} saved positions.</p>
                </div>
                <div className="flex gap-3">
                    <Card className="px-4 py-2 bg-slate-900 border-slate-800 flex items-center gap-3">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">New Today</span>
                            <span className="text-xl font-bold text-white leading-none">{stats?.newJobsToday || 0}</span>
                        </div>
                    </Card>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="border-slate-800 text-slate-300 hover:bg-slate-900 h-full"
                                onClick={handleScanDuplicates}
                            >
                                <RefreshCw className={`w-4 h-4 mr-2 ${scanning ? 'animate-spin' : ''}`} />
                                Scan Duplicates
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
                                    <div key={i} className="p-4 rounded-lg bg-slate-950 border border-slate-800">
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
            </div>

            <Card className="bg-slate-900 border-slate-800">
                <div className="p-4 border-b border-slate-800">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <Input
                            placeholder="Search company or role..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-slate-950 border-slate-800 focus:border-indigo-500 text-white"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-800 hover:bg-transparent">
                                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest px-6">Company</TableHead>
                                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Role</TableHead>
                                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Type</TableHead>
                                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Saved By</TableHead>
                                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-right px-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">Loading jobs...</TableCell>
                                </TableRow>
                            ) : filteredJobs.map((job) => (
                                <TableRow key={job.id} className="border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center font-bold text-slate-400 border border-slate-700">
                                                <Building2 className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-200 text-sm">{job.company}</span>
                                                <span className="text-[10px] text-slate-500">{new Date(job.createdDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm font-medium text-slate-300">{job.role}</span>
                                        <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1">
                                            <span>via {job.source}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="border-slate-800 text-slate-400 text-[10px]">
                                            {job.companyType}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <User className="w-3 h-3 text-slate-500" />
                                            <span className="text-sm text-slate-400">{job.savedByUserName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right px-6">
                                        <Link href={`/admin/jobs/${job.id}`}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}

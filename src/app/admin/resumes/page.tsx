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
    ExternalLink,
    Clock,
    User,
    CheckCircle2,
    ShieldAlert,
    Trash2,
    Eye,
    BarChart3
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
        r.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.userName.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">System Resumes</h1>
                    <p className="text-slate-400">Total {stats?.totalCount || 0} resumes stored ({stats ? formatBytes(stats.totalSize) : '0 MB'}).</p>
                </div>
                <div className="flex gap-2">
                    <Card className="px-4 py-2 bg-slate-900 border-slate-800 flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-slate-300">
                            {stats?.optimizedCount || 0} Optimized
                        </span>
                    </Card>
                    <Card className="px-4 py-2 bg-slate-900 border-slate-800 flex items-center gap-3">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-slate-300">
                            {stats?.pendingCount || 0} Pending
                        </span>
                    </Card>
                </div>
            </div>

            <Card className="bg-slate-900 border-slate-800">
                <div className="p-4 border-b border-slate-800">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <Input
                            placeholder="Search by user or filename..."
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
                                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest px-6">Resume</TableHead>
                                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">User</TableHead>
                                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Score</TableHead>
                                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-center">Size</TableHead>
                                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-right px-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">Loading resumes...</TableCell>
                                </TableRow>
                            ) : filteredResumes.map((res) => (
                                <TableRow key={res.id} className="border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded bg-slate-800/50 border border-slate-700">
                                                <FileText className="w-4 h-4 text-indigo-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-200 text-sm">{res.fileName}</span>
                                                <span className="text-[10px] text-slate-500">{new Date(res.uploadDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <User className="w-3 h-3 text-slate-500" />
                                            <span className="text-sm text-slate-300">{res.userName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`border ${res.atsScore >= 80 ? 'border-emerald-500/30 text-emerald-400' : 'border-amber-500/30 text-amber-400'}`}>
                                            {res.atsScore} ATS
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className="text-xs font-mono text-slate-400">{formatBytes(res.fileSize, 0)}</span>
                                    </TableCell>
                                    <TableCell className="text-right px-6">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/resumes/${res.id}`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </Link>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="bg-slate-900 border-slate-800 text-slate-200">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Resume?</AlertDialogTitle>
                                                        <AlertDialogDescription className="text-slate-400">
                                                            This action cannot be undone. This will permanently delete the file from the server.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className="bg-slate-800 border-slate-700 hover:bg-slate-700 hover:text-white">Cancel</AlertDialogCancel>
                                                        <AlertDialogAction className="bg-rose-600 hover:bg-rose-700 border-0" onClick={() => handleDelete(res.id)}>Delete</AlertDialogAction>
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
            </Card>
        </div>
    );
}

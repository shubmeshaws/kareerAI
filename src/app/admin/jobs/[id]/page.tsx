"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Building2,
    Calendar,
    User,
    ChevronLeft,
    Briefcase,
    Globe,
    Users
} from "lucide-react";
import { Job } from "@/lib/types/admin-job";
import Link from "next/link";

export default function JobDetailPage() {
    const { id } = useParams();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`/api/admin/jobs/${id}`);
                if (!res.ok) throw new Error("Job not found");
                setJob(await res.json());
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    if (loading) return <div className="p-8 text-center text-slate-500">Loading job details...</div>;
    if (!job) return <div className="p-8 text-center text-slate-500">Job not found</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/jobs">
                    <Button variant="ghost" className="text-slate-400 hover:text-white">
                        <ChevronLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">{job.role}</h1>
                    <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
                        <Building2 className="w-3 h-3" /> {job.company}
                        <span className="text-slate-600">•</span>
                        <Calendar className="w-3 h-3" /> {new Date(job.createdDate).toLocaleString()}
                        <span className="text-slate-600">•</span>
                        <span className="font-mono text-xs">ID: {job.id}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Stats & Metadata */}
                <div className="space-y-6 lg:col-span-1">
                    <Card className="p-6 bg-slate-900 border-slate-800 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Metadata</h3>
                            <Badge variant="outline" className="border-slate-800 text-slate-400">
                                {job.status}
                            </Badge>
                        </div>

                        <Separator className="bg-slate-800" />

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-400">Source</span>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-3 h-3 text-indigo-400" />
                                    <span className="text-sm text-white">{job.source}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-400">Company Type</span>
                                <span className="text-sm text-white">{job.companyType}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-400">Total Applicants</span>
                                <div className="flex items-center gap-2">
                                    <Users className="w-3 h-3 text-emerald-400" />
                                    <span className="text-sm font-bold text-white">{job.applicantsCount}</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-slate-900 border-slate-800 space-y-6">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <User className="w-4 h-4 text-indigo-400" /> Saved By
                        </h3>

                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                                {job.savedByUserName.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-slate-200 text-sm">{job.savedByUserName}</div>
                                <div className="text-[10px] text-slate-500">ID: {job.savedByUserId}</div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Job Description */}
                <div className="lg:col-span-2">
                    <Card className="flex flex-col h-[600px] bg-slate-900 border-slate-800">
                        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-indigo-400" /> Job Description
                            </h3>
                        </div>
                        <ScrollArea className="flex-1 p-6">
                            <div className="font-serif text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                                {job.description}
                            </div>
                        </ScrollArea>
                    </Card>
                </div>
            </div>
        </div>
    );
}

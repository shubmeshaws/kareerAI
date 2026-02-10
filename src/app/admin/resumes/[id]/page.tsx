"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    FileText,
    Calendar,
    User,
    Download,
    ChevronLeft,
    Briefcase,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { Resume } from "@/lib/types/admin-resume";
import Link from "next/link";

export default function ResumeDetailPage() {
    const { id } = useParams();
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const res = await fetch(`/api/admin/resumes/${id}`);
                if (!res.ok) throw new Error("Resume not found");
                setResume(await res.json());
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchResume();
    }, [id]);

    if (loading) return <div className="p-8 text-center text-slate-500">Loading resume details...</div>;
    if (!resume) return <div className="p-8 text-center text-slate-500">Resume not found</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/resumes">
                    <Button variant="ghost" className="text-slate-400 hover:text-white">
                        <ChevronLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">{resume.fileName}</h1>
                    <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
                        <User className="w-3 h-3" /> {resume.userName}
                        <span className="text-slate-600">•</span>
                        <Calendar className="w-3 h-3" /> {new Date(resume.uploadDate).toLocaleString()}
                        <span className="text-slate-600">•</span>
                        <span className="font-mono text-xs">ID: {resume.id}</span>
                    </div>
                </div>
                <div className="ml-auto">
                    <Button variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-900">
                        <Download className="w-4 h-4 mr-2" /> Download Original
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Stats & Metadata */}
                <div className="space-y-6 lg:col-span-1">
                    <Card className="p-6 bg-slate-900 border-slate-800 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">ATS Analysis</h3>
                            <Badge variant="outline" className={`border ${resume.atsScore >= 80 ? 'border-emerald-500/30 text-emerald-400' : 'border-amber-500/30 text-amber-400'}`}>
                                {resume.atsScore} / 100
                            </Badge>
                        </div>

                        <Separator className="bg-slate-800" />

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-400">File Size</span>
                                <span className="font-mono text-sm text-white">{(resume.fileSize / 1024).toFixed(2)} KB</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-400">Processing Status</span>
                                <div className="flex items-center gap-2">
                                    {resume.textStatus === 'Optimized' ? (
                                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                    ) : (
                                        <AlertCircle className="w-3 h-3 text-amber-400" />
                                    )}
                                    <span className={`text-sm ${resume.textStatus === 'Optimized' ? 'text-emerald-400' : 'text-amber-400'}`}>
                                        {resume.textStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-slate-900 border-slate-800 space-y-6">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-indigo-400" /> Linked Jobs
                        </h3>

                        <div className="space-y-4">
                            {resume.linkedJobs.length > 0 ? resume.linkedJobs.map(job => (
                                <div key={job.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                                    <div className="font-bold text-slate-200 text-sm">{job.title}</div>
                                    <div className="text-xs text-slate-500">{job.company}</div>
                                    <div className="text-[10px] text-slate-600 mt-2 font-mono">{new Date(job.date).toLocaleDateString()}</div>
                                </div>
                            )) : (
                                <p className="text-sm text-slate-500 italic">No linked jobs found.</p>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Right Column: Extracted Text Preview */}
                <div className="lg:col-span-2">
                    <Card className="flex flex-col h-[600px] bg-slate-900 border-slate-800">
                        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <FileText className="w-4 h-4 text-indigo-400" /> Extracted Text Content
                            </h3>
                            <Badge variant="outline" className="border-slate-800 text-slate-500 text-[10px]">
                                READ ONLY
                            </Badge>
                        </div>
                        <ScrollArea className="flex-1 p-6">
                            <div className="font-mono text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                                {resume.extractedText}
                            </div>
                        </ScrollArea>
                    </Card>
                </div>
            </div>
        </div>
    );
}

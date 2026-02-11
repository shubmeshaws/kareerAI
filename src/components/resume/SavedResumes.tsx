"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Trash2, Download, Clock, ShieldCheck, Database } from "lucide-react";
import { StoredResume, getStoredResumes, deleteStoredResume, downloadResume } from "@/lib/resume-generator";

interface SavedResumesProps {
    onRefresh?: number; // Trigger refresh when this changes
}

export function SavedResumes({ onRefresh }: SavedResumesProps) {
    const [resumes, setResumes] = useState<StoredResume[]>([]);

    useEffect(() => {
        setResumes(getStoredResumes());
    }, [onRefresh]);

    const handleDelete = (id: string) => {
        deleteStoredResume(id);
        setResumes(getStoredResumes());
    };

    const handleDownload = async (resume: StoredResume) => {
        await downloadResume(resume.content, resume.jobTitle);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
        });
    };

    const getScoreStyles = (score: number) => {
        if (score >= 80) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
        if (score >= 60) return "text-cyan-400 border-cyan-500/30 bg-cyan-500/10";
        return "text-orange-400 border-orange-500/30 bg-orange-500/10";
    };

    if (resumes.length === 0) {
        return (
            <Card className="p-16 text-center bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/5 border-dashed rounded-[3rem] backdrop-blur-sm shadow-sm dark:shadow-none">
                <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100 dark:border-white/5 shadow-inner">
                    <Database className="w-10 h-10 text-gray-400 dark:text-gray-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Vault Empty</h3>
                <p className="text-gray-500 mt-3 max-w-xs mx-auto text-sm font-medium">No resume artifacts detected in local storage protocols.</p>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumes.map((resume) => (
                <Card key={resume.id} className="p-6 bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-cyan-500/50 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 group rounded-[2rem] relative overflow-hidden backdrop-blur-sm shadow-sm dark:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                    <FileText className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight line-clamp-1">{resume.jobTitle}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <Badge className={`text-[8px] font-black uppercase tracking-widest px-2 py-0 border transition-all ${getScoreStyles(resume.score)}`}>
                                            {resume.score}% MATCH
                                        </Badge>
                                        <span className="flex items-center gap-1 text-[8px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
                                            <Clock className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                                            {formatDate(resume.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                className="flex-1 h-10 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-black uppercase tracking-widest text-[9px] rounded-xl transition-all shadow-sm dark:shadow-none"
                                onClick={() => handleDownload(resume)}
                            >
                                <Download className="w-4 h-4 mr-2" />
                                DOWNLOAD
                            </Button>
                            <Button
                                variant="ghost"
                                className="h-10 w-10 bg-gray-100 dark:bg-white/5 hover:bg-red-500/10 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded-xl transition-all shadow-sm dark:shadow-none"
                                onClick={() => handleDelete(resume.id)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

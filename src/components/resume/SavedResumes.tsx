"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Trash2, Download, Clock } from "lucide-react";
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
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getScoreBadgeColor = (score: number) => {
        if (score >= 80) return "bg-green-100 text-green-700";
        if (score >= 60) return "bg-yellow-100 text-yellow-700";
        if (score >= 40) return "bg-orange-100 text-orange-700";
        return "bg-red-100 text-red-700";
    };

    if (resumes.length === 0) {
        return (
            <Card className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No saved resumes yet</h3>
                <p className="text-sm text-gray-500">
                    Generate an ATS-optimized resume and save it to see it here
                </p>
            </Card>
        );
    }

    return (
        <div className="space-y-3">
            {resumes.map((resume) => (
                <Card key={resume.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">{resume.jobTitle}</h4>
                                <div className="flex items-center gap-3 mt-1">
                                    <Badge className={getScoreBadgeColor(resume.score)}>
                                        {resume.score}% match
                                    </Badge>
                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                        <Clock className="w-3 h-3" />
                                        {formatDate(resume.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDownload(resume)}
                                className="text-gray-500 hover:text-indigo-600"
                            >
                                <Download className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(resume.id)}
                                className="text-gray-500 hover:text-red-600"
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

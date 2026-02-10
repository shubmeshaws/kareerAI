"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileText, Save } from "lucide-react";
import { downloadResume } from "@/lib/resume-generator";

interface ResumePreviewProps {
    content: string;
    jobTitle: string;
    onSave: () => void;
    isSaving?: boolean;
}

export function ResumePreview({ content, jobTitle, onSave, isSaving }: ResumePreviewProps) {
    const handleDownload = async () => {
        await downloadResume(content, jobTitle);
    };

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-900">ATS-Optimized Resume</h3>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onSave}
                        disabled={isSaving}
                        className="gap-2"
                    >
                        <Save className="w-4 h-4" />
                        {isSaving ? "Saving..." : "Save"}
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleDownload}
                        className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                        <Download className="w-4 h-4" />
                        Download DOCX
                    </Button>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 max-h-[500px] overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                    {content}
                </pre>
            </div>

            <p className="text-xs text-gray-500 mt-3">
                This resume has been optimized for ATS systems. Download and customize before submitting.
            </p>
        </Card>
    );
}

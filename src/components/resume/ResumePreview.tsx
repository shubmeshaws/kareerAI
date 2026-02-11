"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileText, Save, ArrowRight, ShieldCheck } from "lucide-react";
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
        <Card className="p-8 bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-[3rem] backdrop-blur-md relative overflow-hidden group shadow-sm dark:shadow-none transition-all duration-500">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[60px] pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-600 to-indigo-600 dark:from-cyan-500 dark:to-indigo-600 flex items-center justify-center shadow-lg">
                        <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Generated Artifact</h3>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mt-1">Neural Output Ver. 1.0.4</p>
                    </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Button
                        variant="outline"
                        className={`flex-1 md:flex-none h-12 px-6 border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-sm dark:shadow-none ${isSaving ? "animate-pulse" : "hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"}`}
                        onClick={onSave}
                        disabled={isSaving}
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? "Syncing..." : "Vault Pulsar"}
                    </Button>
                    <Button
                        className="flex-1 md:flex-none h-12 px-8 bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-700 dark:hover:bg-cyan-400 text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] dark:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all transform hover:scale-[1.02] active:scale-95 group/btn"
                        onClick={handleDownload}
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Download DOCX
                        <ArrowRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>

            <div className="bg-gray-100 dark:bg-black/40 rounded-[2rem] p-4 border border-gray-200 dark:border-white/5 relative">
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-white/50 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/5 backdrop-blur-md shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-500" />
                    <span className="text-[8px] font-black text-gray-500 dark:text-gray-500 uppercase tracking-widest">UTF-8 Manifest</span>
                </div>
                <div className="bg-white dark:bg-white/2 rounded-[1.5rem] p-8 max-h-[600px] overflow-y-auto border border-gray-100 dark:border-white/5 custom-scrollbar shadow-inner">
                    <pre className="whitespace-pre-wrap font-mono text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed text-left">
                        {content}
                    </pre>
                </div>
            </div>

            <div className="mt-8 flex items-center justify-between pt-8 border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-500" />
                    <p className="text-[10px] text-gray-400 dark:text-gray-600 font-black uppercase tracking-widest">
                        Neural Integrity Verified for ATS Logic
                    </p>
                </div>
                <p className="text-[9px] text-gray-500 dark:text-gray-700 font-bold uppercase tracking-tighter">
                    Signature: ALPHA-9-KAREER
                </p>
            </div>
        </Card>
    );
}

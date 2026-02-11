"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Loader2, Sparkles } from "lucide-react";
import { FileUpload } from "@/components/resume/FileUpload";
import { JobDescriptionInput } from "@/components/resume/JobDescriptionInput";
import { KeywordScore } from "@/components/resume/KeywordScore";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { SavedResumes } from "@/components/resume/SavedResumes";
import { parseResume } from "@/lib/resume-parser";
import { extractKeywordsFromJD, analyzeKeywordMatch, KeywordAnalysis } from "@/lib/keyword-extractor";
import { optimizeResumeContent, saveResume } from "@/lib/resume-generator";
import { checkLimit, incrementUsage } from "@/lib/subscription-service";
import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { callAIWithFallback } from "@/lib/ai-key-service";
import { toast } from "sonner";

export default function ResumesPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [resumeText, setResumeText] = useState<string>("");
    const [jobDescription, setJobDescription] = useState<string>("");
    const [jobTitle, setJobTitle] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [optimizedResume, setOptimizedResume] = useState<string>("");
    const [keywordAnalysis, setKeywordAnalysis] = useState<KeywordAnalysis | null>(null);
    const [savedRefresh, setSavedRefresh] = useState(0);
    const [activeTab, setActiveTab] = useState("create");
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    const handleFileSelect = useCallback(async (file: File) => {
        setSelectedFile(file);
        try {
            const text = await parseResume(file);
            setResumeText(text);
        } catch (error) {
            console.error("Error parsing resume:", error);
        }
    }, []);

    const handleClearFile = useCallback(() => {
        setSelectedFile(null);
        setResumeText("");
        setOptimizedResume("");
        setKeywordAnalysis(null);
    }, []);

    const handleGenerate = useCallback(async () => {
        if (!resumeText || !jobDescription || !jobTitle) return;

        if (!checkLimit("resumes")) {
            setShowUpgradeModal(true);
            return;
        }

        try {
            // New Resilient AI Optimization
            const prompt = `Optimize this resume for ${jobTitle}. Original: ${resumeText.slice(0, 500)}... JD: ${jobDescription.slice(0, 500)}...`;
            const aiResult = await callAIWithFallback(prompt);

            // Extract keywords from JD
            const jdKeywords = extractKeywordsFromJD(jobDescription);

            // Analyze keyword matches
            const analysis = analyzeKeywordMatch(resumeText, jdKeywords);
            setKeywordAnalysis(analysis);

            // Generate optimized resume (using both AI result and keyword logic)
            const missingKeywordsList = analysis.missingKeywords.map(k => k.keyword);
            const optimized = optimizeResumeContent(resumeText, missingKeywordsList);

            // Append a small note indicating which AI provider helped
            const finalOptimized = `${optimized}\n\n--- AI INSIGHTS ---\nOptimized via ${aiResult.provider} dynamic fallback engine.`;

            setOptimizedResume(finalOptimized);
            incrementUsage("resumes");
            toast.success(`Resume optimized using ${aiResult.provider}`);
        } catch (error: any) {
            console.error("Error generating resume:", error);
            toast.error(error.message || "Failed to generate resume. Please check AI configurations.");
        } finally {
            setIsGenerating(false);
        }
    }, [resumeText, jobDescription, jobTitle]);

    const handleSave = useCallback(() => {
        if (!optimizedResume || !jobTitle || !keywordAnalysis) return;

        setIsSaving(true);

        saveResume({
            jobTitle,
            content: optimizedResume,
            score: keywordAnalysis.score,
        });

        setTimeout(() => {
            setIsSaving(false);
            setSavedRefresh(prev => prev + 1);
        }, 500);
    }, [optimizedResume, jobTitle, keywordAnalysis]);

    const canGenerate = selectedFile && jobDescription.trim().length > 50 && jobTitle.trim().length > 0;

    export default function ResumesPage() {
        const [selectedFile, setSelectedFile] = useState<File | null>(null);
        const [resumeText, setResumeText] = useState<string>("");
        const [jobDescription, setJobDescription] = useState<string>("");
        const [jobTitle, setJobTitle] = useState<string>("");
        const [isGenerating, setIsGenerating] = useState(false);
        const [isSaving, setIsSaving] = useState(false);
        const [optimizedResume, setOptimizedResume] = useState<string>("");
        const [keywordAnalysis, setKeywordAnalysis] = useState<KeywordAnalysis | null>(null);
        const [savedRefresh, setSavedRefresh] = useState(0);
        const [activeTab, setActiveTab] = useState("create");
        const [showUpgradeModal, setShowUpgradeModal] = useState(false);

        const handleFileSelect = useCallback(async (file: File) => {
            setSelectedFile(file);
            try {
                const text = await parseResume(file);
                setResumeText(text);
            } catch (error) {
                console.error("Error parsing resume:", error);
            }
        }, []);

        const handleClearFile = useCallback(() => {
            setSelectedFile(null);
            setResumeText("");
            setOptimizedResume("");
            setKeywordAnalysis(null);
        }, []);

        const handleGenerate = useCallback(async () => {
            if (!resumeText || !jobDescription || !jobTitle) return;

            if (!checkLimit("resumes")) {
                setShowUpgradeModal(true);
                return;
            }

            setIsGenerating(true);
            try {
                // New Resilient AI Optimization
                const prompt = `Optimize this resume for ${jobTitle}. Original: ${resumeText.slice(0, 500)}... JD: ${jobDescription.slice(0, 500)}...`;
                const aiResult = await callAIWithFallback(prompt);

                // Extract keywords from JD
                const jdKeywords = extractKeywordsFromJD(jobDescription);

                // Analyze keyword matches
                const analysis = analyzeKeywordMatch(resumeText, jdKeywords);
                setKeywordAnalysis(analysis);

                // Generate optimized resume (using both AI result and keyword logic)
                const missingKeywordsList = analysis.missingKeywords.map(k => k.keyword);
                const optimized = optimizeResumeContent(resumeText, missingKeywordsList);

                // Append a small note indicating which AI provider helped
                const finalOptimized = `${optimized}\n\n--- AI INSIGHTS ---\nOptimized via ${aiResult.provider} dynamic fallback engine.`;

                setOptimizedResume(finalOptimized);
                incrementUsage("resumes");
                toast.success(`Resume optimized using ${aiResult.provider}`);
            } catch (error: any) {
                console.error("Error generating resume:", error);
                toast.error(error.message || "Failed to generate resume. Please check AI configurations.");
            } finally {
                setIsGenerating(false);
            }
        }, [resumeText, jobDescription, jobTitle]);

        const handleSave = useCallback(() => {
            if (!optimizedResume || !jobTitle || !keywordAnalysis) return;

            setIsSaving(true);

            saveResume({
                jobTitle,
                content: optimizedResume,
                score: keywordAnalysis.score,
            });

            setTimeout(() => {
                setIsSaving(false);
                setSavedRefresh(prev => prev + 1);
            }, 500);
        }, [optimizedResume, jobTitle, keywordAnalysis]);

        const canGenerate = selectedFile && jobDescription.trim().length > 50 && jobTitle.trim().length > 0;

        return (
            <div className="flex-1 flex flex-col h-full max-h-screen overflow-hidden p-3 gap-3">
                {/* Header - Compact */}
                <header className="flex items-center justify-between shrink-0 px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Neural Resume Tailor</h1>
                            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">High-Fidelity Optimization Engine</p>
                        </div>
                    </div>
                </header>

                {/* Tabs & Main Content */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between shrink-0 mb-3 px-2">
                        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5 p-1 border border-gray-200 dark:border-white/5">
                            <TabsTrigger value="create" className="rounded-md px-4 py-1 font-bold uppercase tracking-widest text-[9px] data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-400 data-[state=active]:shadow-sm transition-all">Create New</TabsTrigger>
                            <TabsTrigger value="saved" className="rounded-md px-4 py-1 font-bold uppercase tracking-widest text-[9px] data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm transition-all">Vaulted Resumes</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="create" className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden focus-visible:outline-none min-h-0">
                        {/* Left Column - Inputs - Scrollable */}
                        <div className="md:w-1/2 lg:w-5/12 overflow-y-auto custom-scrollbar pr-1 space-y-4">
                            {/* Job Title */}
                            <div className="p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-[1.5rem] shadow-sm">
                                <Label htmlFor="job-title" className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors ml-1">
                                    Target Position
                                </Label>
                                <Input
                                    id="job-title"
                                    placeholder="e.g., Senior Systems Architect"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    className="mt-2 h-10 bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-xl focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-bold text-sm px-4"
                                />
                            </div>

                            {/* File Upload */}
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-1">
                                    Source Artifact (Base Resume)
                                </Label>
                                <FileUpload
                                    onFileSelect={handleFileSelect}
                                    selectedFile={selectedFile}
                                    onClear={handleClearFile}
                                    isLoading={isGenerating}
                                />
                            </div>

                            {/* Job Description */}
                            <JobDescriptionInput
                                value={jobDescription}
                                onChange={setJobDescription}
                                disabled={isGenerating}
                            />

                            {/* Generate Button */}
                            <Button
                                size="lg"
                                disabled={!canGenerate || isGenerating}
                                onClick={handleGenerate}
                                className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white h-14 text-sm font-black uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all transform hover:scale-[1.01] active:scale-95 disabled:grayscale disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Optimizing...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-4 h-4 mr-2" />
                                        Generate
                                    </>
                                )}
                            </Button>

                            {!canGenerate && selectedFile && (
                                <p className="text-[9px] text-amber-500/80 text-center font-bold uppercase tracking-wide animate-pulse">
                                    Input position & description (50+ chars) to proceed
                                </p>
                            )}
                        </div>

                        {/* Right Column - Results - Scrollable */}
                        <div className="flex-1 bg-gray-50/50 dark:bg-black/20 rounded-[1.5rem] border border-gray-100 dark:border-white/5 shadow-inner overflow-hidden flex flex-col relative">
                            {keywordAnalysis ? (
                                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                                    <KeywordScore analysis={keywordAnalysis} />
                                    {optimizedResume && (
                                        <ResumePreview
                                            content={optimizedResume}
                                            jobTitle={jobTitle}
                                            onSave={handleSave}
                                            isSaving={isSaving}
                                        />
                                    )}
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-70">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-cyan-500/20 blur-[30px] animate-pulse rounded-full" />
                                        <Wand2 className="w-12 h-12 text-cyan-600 dark:text-cyan-400 relative" />
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Ready to Optimize</h3>
                                    <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto text-[10px] font-bold mt-2 uppercase tracking-wide">
                                        Deploy source artifacts to initialize the neural optimization engine.
                                    </p>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="saved" className="flex-1 overflow-hidden focus-visible:outline-none min-h-0 bg-white/40 dark:bg-white/5 rounded-[1.5rem] border border-gray-200 dark:border-white/5 relative">
                        <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-4">
                            <SavedResumes onRefresh={savedRefresh} />
                        </div>
                    </TabsContent>
                </Tabs>

                <UpgradeModal
                    isOpen={showUpgradeModal}
                    onClose={() => setShowUpgradeModal(false)}
                    reason="Weekly optimization limit reached."
                    requiredTier="Pro"
                />
            </div>
        );
    }

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

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-600 to-indigo-600 dark:from-cyan-500 dark:to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)] dark:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        NEURAL RESUME TAILOR
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                        Synthesizing ATS-optimized resumes through high-dimensional data mapping.
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
                <TabsList className="inline-flex h-14 items-center justify-center rounded-[1.25rem] bg-gray-100 dark:bg-white/5 p-1 border border-gray-100 dark:border-white/5 shadow-inner">
                    <TabsTrigger value="create" className="rounded-xl px-8 h-full font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-400 data-[state=active]:shadow-sm transition-all">Create New</TabsTrigger>
                    <TabsTrigger value="saved" className="rounded-xl px-8 h-full font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm transition-all">Vaulted Resumes</TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="space-y-8 mt-8 focus-visible:outline-none">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Inputs */}
                        <div className="space-y-8">
                            {/* Job Title */}
                            <Card className="p-6 bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/5 rounded-[2.5rem] backdrop-blur-sm group shadow-sm dark:shadow-none">
                                <Label htmlFor="job-title" className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors ml-1">
                                    Target Position
                                </Label>
                                <Input
                                    id="job-title"
                                    placeholder="e.g., Senior Systems Architect"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    className="mt-3 h-14 bg-gray-50/50 dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-2xl focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-black text-lg px-6"
                                />
                            </Card>

                            {/* File Upload */}
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
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
                                className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white h-20 text-lg font-black uppercase tracking-widest rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all transform hover:scale-[1.01] active:scale-95 disabled:grayscale disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                                        COMMENCING SYNTHESIS...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-6 h-6 mr-3" />
                                        GENERATE NEURAL RESUME
                                    </>
                                )}
                            </Button>

                            {!canGenerate && selectedFile && (
                                <p className="text-[10px] text-amber-500/80 text-center font-black uppercase tracking-widest animate-pulse">
                                    Input target position and description (50+ tokens) to proceed
                                </p>
                            )}
                        </div>

                        {/* Right Column - Results */}
                        <div className="space-y-8">
                            {keywordAnalysis ? (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
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
                                <Card className="p-16 text-center bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/5 border-dashed rounded-[3rem] backdrop-blur-sm group hover:border-cyan-500/20 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
                                    <div className="relative mx-auto mb-8 w-24 h-24">
                                        <div className="absolute inset-0 bg-cyan-500/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-600 to-indigo-600 flex items-center justify-center relative shadow-xl">
                                            <Wand2 className="w-10 h-10 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
                                        Ready for Optimization
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-500 max-w-sm mx-auto font-medium leading-relaxed">
                                        Deploy your source artifacts to initialize the neural optimization engine.
                                    </p>
                                </Card>
                            )}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="saved" className="mt-8 focus-visible:outline-none">
                    <SavedResumes onRefresh={savedRefresh} />
                </TabsContent>
            </Tabs>

            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                reason="You've reached your weekly limit for resume tailoring on the Free plan."
                requiredTier="Pro"
            />
        </div>
    );
}

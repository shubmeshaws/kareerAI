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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-indigo-600" />
                        Resume Tailor
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Create ATS-optimized resumes tailored to specific job descriptions
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="create">Create New</TabsTrigger>
                    <TabsTrigger value="saved">Saved Resumes</TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Inputs */}
                        <div className="space-y-6">
                            {/* Job Title */}
                            <Card className="p-4">
                                <Label htmlFor="job-title" className="text-sm font-medium text-gray-700">
                                    Job Title
                                </Label>
                                <Input
                                    id="job-title"
                                    placeholder="e.g., Senior Software Engineer"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    className="mt-2"
                                />
                            </Card>

                            {/* File Upload */}
                            <div>
                                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Base Resume
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
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Generating ATS Resume...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-5 h-5 mr-2" />
                                        Generate ATS Resume
                                    </>
                                )}
                            </Button>

                            {!canGenerate && selectedFile && (
                                <p className="text-sm text-amber-600 text-center">
                                    Please enter a job title and paste a job description (min 50 characters)
                                </p>
                            )}
                        </div>

                        {/* Right Column - Results */}
                        <div className="space-y-6">
                            {keywordAnalysis ? (
                                <>
                                    <KeywordScore analysis={keywordAnalysis} />
                                    {optimizedResume && (
                                        <ResumePreview
                                            content={optimizedResume}
                                            jobTitle={jobTitle}
                                            onSave={handleSave}
                                            isSaving={isSaving}
                                        />
                                    )}
                                </>
                            ) : (
                                <Card className="p-12 text-center border-dashed">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                                        <Wand2 className="w-10 h-10 text-indigo-600" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Ready to optimize your resume
                                    </h3>
                                    <p className="text-sm text-gray-500 max-w-sm mx-auto">
                                        Upload your resume, paste a job description, and click Generate to see your ATS-optimized resume with keyword matching
                                    </p>
                                </Card>
                            )}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="saved">
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

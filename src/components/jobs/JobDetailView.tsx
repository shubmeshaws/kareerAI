"use client";

import { useState, useEffect } from "react";
import { Job } from "@/lib/job-service";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    MapPin,
    Building2,
    Calendar,
    Globe,
    ExternalLink,
    Sparkles,
    Copy,
    Check,
    Zap,
    Mail,
    Linkedin,
    FileText
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutreachKit, generateOutreachKit } from "@/lib/kit-generator";
import { addApplication } from "@/lib/application-service";
import { checkLimit } from "@/lib/subscription-service";
import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface JobDetailViewProps {
    job: Job | null;
    isOpen: boolean;
    onClose: () => void;
}

export function JobDetailView({ job, isOpen, onClose }: JobDetailViewProps) {
    const [kit, setKit] = useState<OutreachKit | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    const [isSaved, setIsSaved] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    useEffect(() => {
        if (isOpen && job) {
            handleGenerate();
            setIsSaved(false);
        } else {
            setKit(null);
        }
    }, [isOpen, job]);

    const handleSaveToTracker = () => {
        if (!job) return;
        addApplication({
            companyName: job.companyName,
            role: job.title,
            status: "Saved",
            jd: job.description,
            companyType: job.companyType,
            matchScore: 85 // Mock match score
        });
        setIsSaved(true);
    };

    const handleGenerate = async () => {
        if (!job) return;
        setIsGenerating(true);
        // Simulate AI delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const generatedKit = generateOutreachKit(
            job.companyName,
            job.title,
            job.companyType,
            job.description
        );
        setKit(generatedKit);
        setIsGenerating(false);
    };

    const copyToClipboard = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    if (!job) return null;

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="sm:max-w-xl w-full overflow-y-auto">
                <SheetHeader className="text-left space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
                            <Building2 className="w-8 h-8 text-indigo-600" />
                        </div>
                        <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                            {job.source}
                        </Badge>
                    </div>
                    <div>
                        <SheetTitle className="text-2xl font-bold">{job.title}</SheetTitle>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                            <span className="text-gray-600 flex items-center gap-1 font-medium">
                                {job.companyName}
                            </span>
                            <span className="text-gray-400 flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                            </span>
                            <span className="text-gray-400 flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(job.postedDate).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                            {job.companyType}
                        </Badge>
                        <Badge variant="secondary">
                            {job.type}
                        </Badge>
                        {job.remote && (
                            <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">
                                Remote Friendly
                            </Badge>
                        )}
                    </div>
                </SheetHeader>

                <div className="mt-8 space-y-8">
                    {/* Smart Apply Kit Section */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sparkles className="w-24 h-24" />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                                <Sparkles className="w-5 h-5" />
                                Smart Apply Kit
                            </h3>
                            <p className="text-indigo-100 text-sm mb-6">
                                Personalized outreach templates generated for this role.
                            </p>

                            {isGenerating ? (
                                <div className="flex flex-col items-center justify-center py-8 space-y-3">
                                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <p className="text-sm font-medium">Personalizing templates...</p>
                                </div>
                            ) : kit ? (
                                <Accordion type="single" collapsible className="w-full space-y-3 border-none">
                                    <AccordionItem value="cover-letter" className="border-none bg-white/10 rounded-xl px-4 overflow-hidden">
                                        <AccordionTrigger className="hover:no-underline py-4 text-white hover:text-indigo-100 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-4 h-4" />
                                                <span className="text-sm font-semibold">Cover Letter</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-4">
                                            <div className="bg-white/90 rounded-lg p-3 text-gray-900 text-xs font-mono mb-3 max-h-40 overflow-y-auto leading-relaxed">
                                                {kit.coverLetter}
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                className="w-full h-9 gap-2 font-bold"
                                                onClick={() => copyToClipboard(kit.coverLetter, "cl")}
                                            >
                                                {copiedKey === "cl" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                                {copiedKey === "cl" ? "Copied!" : "Copy Cover Letter"}
                                            </Button>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="linkedin-dm" className="border-none bg-white/10 rounded-xl px-4 overflow-hidden">
                                        <AccordionTrigger className="hover:no-underline py-4 text-white hover:text-indigo-100 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <Linkedin className="w-4 h-4" />
                                                <span className="text-sm font-semibold">LinkedIn DM</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-4">
                                            <div className="bg-white/90 rounded-lg p-3 text-gray-900 text-xs font-mono mb-3 leading-relaxed">
                                                {kit.linkedinDM}
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                className="w-full h-9 gap-2 font-bold"
                                                onClick={() => copyToClipboard(kit.linkedinDM, "li")}
                                            >
                                                {copiedKey === "li" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                                {copiedKey === "li" ? "Copied!" : "Copy LinkedIn DM"}
                                            </Button>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="recruiter-email" className="border-none bg-white/10 rounded-xl px-4 overflow-hidden">
                                        <AccordionTrigger className="hover:no-underline py-4 text-white hover:text-indigo-100 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <Mail className="w-4 h-4" />
                                                <span className="text-sm font-semibold">Recruiter Email</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-4">
                                            <div className="bg-white/90 rounded-lg p-3 text-gray-900 text-xs font-mono mb-3 max-h-40 overflow-y-auto leading-relaxed">
                                                {kit.recruiterEmail}
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                className="w-full h-9 gap-2 font-bold"
                                                onClick={() => copyToClipboard(kit.recruiterEmail, "em")}
                                            >
                                                {copiedKey === "em" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                                {copiedKey === "em" ? "Copied!" : "Copy Email Template"}
                                            </Button>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                        <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {job.description}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                        <h4 className="font-semibold text-sm">Quick Info</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Experience</p>
                                <p className="font-medium">Mid-Senior Level</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Work Setup</p>
                                <p className="font-medium">{job.remote ? "Remote" : "On-site"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <SheetFooter className="mt-8 flex gap-3 sm:flex-row flex-col">
                    <Button
                        variant="outline"
                        className={`flex-1 gap-2 ${isSaved ? "text-green-600 border-green-200 bg-green-50" : ""}`}
                        onClick={handleSaveToTracker}
                        disabled={isSaved}
                    >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                        {isSaved ? "Saved to Tracker" : "Save to Tracker"}
                    </Button>
                    <Button
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white gap-2 font-bold shadow-lg shadow-indigo-200"
                        onClick={() => {
                            if (!checkLimit("autoApply")) {
                                setShowUpgradeModal(true);
                                return;
                            }
                            window.postMessage({
                                type: 'KAREERAI_FILL_FORM',
                                platform: job?.source || 'Other',
                                profile: { fullName: "John Doe", email: "john.doe@example.com" }
                            }, '*');
                            alert("Auto-Apply Assistant triggered! Please ensure the extension is installed.");
                        }}
                    >
                        <Zap className="w-4 h-4" />
                        Auto Apply
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                        <a href={`https://www.google.com/search?q=${job.companyName}`} target="_blank" rel="noopener noreferrer">
                            <Globe className="w-4 h-4 mr-2" />
                            Company Website
                        </a>
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md transition-all active:scale-95" asChild>
                        <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Apply on {job.source}
                        </a>
                    </Button>
                </SheetFooter>

                <UpgradeModal
                    isOpen={showUpgradeModal}
                    onClose={() => setShowUpgradeModal(false)}
                    reason="The Auto Apply Assistant is an exclusive feature for Premium members."
                    requiredTier="Premium"
                />
            </SheetContent>
        </Sheet>
    );
}

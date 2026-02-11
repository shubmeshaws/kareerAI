"use client";

import { useState, useEffect } from "react";
import { Job } from "@/lib/job-service";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
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
    FileText,
    Bookmark,
    BookmarkCheck,
    Shield
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { OutreachKit, generateOutreachKit } from "@/lib/kit-generator";
import { addApplication } from "@/lib/application-service";
import { checkLimit } from "@/lib/subscription-service";
import { UpgradeModal } from "@/components/billing/UpgradeModal";

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
            <SheetContent className="sm:max-w-xl w-full p-0 border-none bg-white dark:bg-[#0E121B] text-gray-900 dark:text-white transition-colors duration-500">
                <div className="h-full flex flex-col relative">
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-500/10 blur-[100px] pointer-events-none transition-opacity" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/10 blur-[100px] pointer-events-none transition-opacity" />

                    {/* Sticky Header */}
                    <div className="sticky top-0 z-20 p-8 bg-white/80 dark:bg-[#0E121B]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center shadow-inner group transition-all">
                                <Building2 className="w-8 h-8 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest px-3 py-1 text-gray-500 dark:text-gray-400">
                                    NODE: {job.source.toUpperCase()}
                                </Badge>
                                <Badge className="bg-cyan-600 dark:bg-cyan-500 text-white border-none text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-sm">
                                    VERIFIED
                                </Badge>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white mb-3 uppercase leading-tight">
                                {job.title}
                            </h1>
                            <div className="flex flex-wrap gap-x-6 gap-y-3">
                                <div className="flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 font-bold">
                                    <Shield className="w-4 h-4" />
                                    {job.companyName}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 font-bold">
                                    <MapPin className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                                    {job.location}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 font-bold">
                                    <Calendar className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                                    {new Date(job.postedDate).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                        {/* Outreach Kit Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Neural Outreach Vectors</h3>
                                <div className="h-0.5 flex-1 bg-gray-100 dark:bg-white/5 mx-4" />
                                <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-500" />
                            </div>

                            <div className="bg-gradient-to-br from-gray-50 to-transparent dark:from-white/5 dark:to-transparent border border-gray-100 dark:border-white/10 rounded-[2.5rem] p-6 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500 shadow-sm dark:shadow-none">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />

                                {isGenerating ? (
                                    <div className="flex flex-col items-center justify-center py-10 space-y-4">
                                        <div className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                                        <p className="text-[10px] font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-widest animate-pulse">Initializing Synthesis...</p>
                                    </div>
                                ) : kit ? (
                                    <Accordion type="single" collapsible className="w-full space-y-4">
                                        <AccordionItem value="cl" className="border-none bg-gray-100/50 dark:bg-white/5 rounded-2xl px-6 hover:bg-gray-100 dark:hover:bg-white/[0.07] transition-all">
                                            <AccordionTrigger className="hover:no-underline py-5 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 group/item hover:text-gray-900 dark:hover:text-white">
                                                <div className="flex items-center gap-4">
                                                    <FileText className="w-4 h-4 text-indigo-500 dark:text-indigo-400 group-item-hover:text-cyan-500 dark:group-item-hover:text-cyan-400 transition-colors" />
                                                    PRO-RESUME COVER
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-6">
                                                <div className="bg-white dark:bg-black/40 rounded-xl p-4 text-gray-600 dark:text-gray-400 text-[11px] font-mono mb-4 border border-gray-100 dark:border-white/5 max-h-48 overflow-y-auto leading-relaxed custom-scrollbar shadow-inner">
                                                    {kit.coverLetter}
                                                </div>
                                                <Button size="sm" className="w-full h-11 bg-gray-900 dark:bg-white/5 hover:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-black uppercase tracking-widest text-[9px] rounded-xl shadow-sm transition-all" onClick={() => copyToClipboard(kit.coverLetter, "cl")}>
                                                    {copiedKey === "cl" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                                    {copiedKey === "cl" ? "BUFFERED" : "Copy to Buffer"}
                                                </Button>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="li" className="border-none bg-gray-100/50 dark:bg-white/5 rounded-2xl px-6 hover:bg-gray-100 dark:hover:bg-white/[0.07] transition-all">
                                            <AccordionTrigger className="hover:no-underline py-5 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 group/item hover:text-gray-900 dark:hover:text-white">
                                                <div className="flex items-center gap-4">
                                                    <Linkedin className="w-4 h-4 text-indigo-500 dark:text-indigo-400 group-item-hover:text-cyan-500 dark:group-item-hover:text-cyan-400 transition-colors" />
                                                    Direct Message Vector
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-6">
                                                <div className="bg-white dark:bg-black/40 rounded-xl p-4 text-gray-600 dark:text-gray-400 text-[11px] font-mono mb-4 border border-gray-100 dark:border-white/5 leading-relaxed shadow-inner">
                                                    {kit.linkedinDM}
                                                </div>
                                                <Button size="sm" className="w-full h-11 bg-gray-900 dark:bg-white/5 hover:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-black uppercase tracking-widest text-[9px] rounded-xl shadow-sm transition-all" onClick={() => copyToClipboard(kit.linkedinDM, "li")}>
                                                    {copiedKey === "li" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                                    {copiedKey === "li" ? "BUFFERED" : "Copy to Buffer"}
                                                </Button>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ) : null}
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Operational parameters</h3>
                                <div className="h-0.5 flex-1 bg-gray-100 dark:bg-white/5 mx-4" />
                            </div>
                            <div className="prose dark:prose-invert prose-sm max-w-none text-gray-600 dark:text-gray-400 font-medium leading-relaxed bg-gray-50 dark:bg-white/2 p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 italic shadow-inner transition-colors duration-500">
                                {job.description}
                            </div>
                        </div>

                        {/* Quick Info Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 group hover:border-indigo-500/30 transition-all shadow-sm dark:shadow-none">
                                <p className="text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-1">Entity Logic</p>
                                <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">{job.companyType}</p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 group hover:border-cyan-500/30 transition-all shadow-sm dark:shadow-none">
                                <p className="text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-1">Network Access</p>
                                <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">{job.remote ? "SATELLITE/REMOTE" : "CORE/ON-SITE"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-8 bg-white/80 dark:bg-[#0E121B]/80 backdrop-blur-xl border-t border-gray-100 dark:border-white/5 grid grid-cols-2 gap-4">
                        <Button
                            variant="ghost"
                            className={`h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border ${isSaved ? "text-cyan-600 dark:text-cyan-400 border-cyan-500/30 bg-cyan-500/10" : "text-gray-400 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"}`}
                            onClick={handleSaveToTracker}
                            disabled={isSaved}
                        >
                            {isSaved ? <BookmarkCheck className="w-5 h-5 mr-3" /> : <Bookmark className="w-5 h-5 mr-3" />}
                            {isSaved ? "Vaulted" : "Vault Pulse"}
                        </Button>
                        <Button
                            className="h-14 bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-500 dark:to-indigo-600 hover:scale-[1.02] active:scale-95 transition-all text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.2)] dark:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                            onClick={() => {
                                if (!checkLimit("autoApply")) {
                                    setShowUpgradeModal(true);
                                    return;
                                }
                                alert("Auto-Apply Assistant triggered!");
                            }}
                        >
                            <Zap className="w-4 h-4 mr-3" />
                            Auto Deploy
                        </Button>
                        <Button variant="ghost" className="col-span-2 h-12 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white font-black uppercase tracking-widest text-[9px] border border-gray-100 dark:border-white/5 rounded-xl mt-2 transition-all" asChild>
                            <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                                External Uplink: {job.source} <ExternalLink className="w-3 h-3 ml-2" />
                            </a>
                        </Button>
                    </div>
                </div>

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

"use client";

import React, { useState } from "react";
import {
    Plus,
    ChevronRight,
    MoreHorizontal,
    MapPin,
    Clock,
    Globe,
    Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function RecruitmentAdminPanel() {
    const [activeTab, setActiveTab] = useState("Job Details");

    const tabs = ["Job Details", "Requirements", "Application Form", "Pipeline"];

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Column 2: Main Workspace */}
            <main className="flex-1 bg-white mx-4 my-5 rounded-[2rem] shadow-xl border border-gray-100 flex flex-col overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent pointer-events-none" />

                {/* Workspace Header */}
                <header className="p-6 pb-3 flex items-center justify-between relative">
                    <div>
                        <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                            <span>Jobs</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-slate-900 border-b-2 border-black pb-0.5">Senior Designer</span>
                        </nav>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Job Settings</h1>
                    </div>

                    <Button className="bg-black hover:bg-slate-800 text-white px-6 h-10 rounded-full font-bold text-xs shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Post New Job
                    </Button>
                </header>

                {/* Sub-navigation Tabs */}
                <div className="px-6 flex items-center gap-8 border-b border-gray-100 relative">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
                    <div className="max-w-3xl space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Job Title</Label>
                                <Input
                                    defaultValue="Senior Designer"
                                    className="rounded-xl h-10 bg-[#F9F9F9] border-gray-100 focus:bg-white focus:ring-black transition-all font-semibold"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Location</Label>
                                <Input
                                    defaultValue="New York City, NY"
                                    className="rounded-xl h-10 bg-[#F9F9F9] border-gray-100 focus:bg-white focus:ring-black transition-all font-semibold"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Job Description</Label>
                            <Textarea
                                className="rounded-2xl min-h-[180px] bg-[#F9F9F9] border-gray-100 focus:bg-white focus:ring-black transition-all p-4 font-medium leading-relaxed"
                                defaultValue="We are looking for a Senior Product Designer to join our rapidly growing recruitment platform. You will be responsible for leading the design of our key recruitment flows..."
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-6 items-end">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Brand Color</Label>
                                <div className="flex items-center gap-3 p-1 pl-3 bg-[#F9F9F9] border border-gray-100 rounded-xl h-10">
                                    <div className="w-5 h-5 rounded-full bg-[#DCC28D] shadow-inner" />
                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">#DCC28D</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Work Type</Label>
                                <Select defaultValue="full-time">
                                    <SelectTrigger className="rounded-xl h-10 bg-[#F9F9F9] border-gray-100 font-semibold text-xs">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="full-time">Full-time</SelectItem>
                                        <SelectItem value="contract">Contract</SelectItem>
                                        <SelectItem value="freelance">Freelance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Visibility</Label>
                                <Select defaultValue="public">
                                    <SelectTrigger className="rounded-xl h-10 bg-[#F9F9F9] border-gray-100 font-semibold text-xs">
                                        <SelectValue placeholder="Select visibility" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="public">Public</SelectItem>
                                        <SelectItem value="private">Private</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Section */}
                <footer className="p-6 bg-[#F9F9F9] border-t border-gray-100 flex items-center justify-between gap-5 overflow-x-auto relative shrink-0">
                    <div className="flex items-center gap-4 bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm min-w-[200px]">
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <svg className="w-10 h-10 transform -rotate-90">
                                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-100" />
                                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray={100} strokeDashoffset={100 * (1 - 35 / 50)} className="text-black transition-all duration-1000" />
                            </svg>
                            <span className="absolute text-[9px] font-black italic">70%</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Applicants</p>
                            <p className="text-base font-black text-slate-900 tracking-tighter">35<span className="text-slate-300 mx-1">/</span>50</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm min-w-[200px]">
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <svg className="w-10 h-10 transform -rotate-90">
                                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-100" />
                                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray={100} strokeDashoffset={100 * (1 - 0.5)} className="text-black transition-all duration-1000" />
                            </svg>
                            <span className="absolute text-[9px] font-black italic">50%</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Shortlisted</p>
                            <p className="text-base font-black text-slate-900 tracking-tighter">01<span className="text-slate-300 mx-1">/</span>02</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm min-w-[200px]">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-lg">
                            <Clock className="w-5 h-5" strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Avg. Time to Hire</p>
                            <p className="text-base font-black text-slate-900 tracking-tighter">23 <span className="text-[10px] uppercase font-bold text-slate-400">Days</span></p>
                        </div>
                    </div>
                </footer>
            </main>

            {/* Column 3: Preview */}
            <aside className="w-[305px] hidden xl:flex flex-col py-5 pr-3 overflow-hidden relative">
                <div className="px-6 mb-4 flex items-center justify-between">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Live Preview</h2>
                    <div className="flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
                        <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                    </div>
                </div>

                <div className="flex-1 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col group relative">
                    {/* Header section with specific color */}
                    <div className="h-44 bg-[#DCC28D] flex items-center justify-center relative transition-colors duration-500">
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-16 h-1 rounded-full bg-white/30 absolute top-4 shadow-sm" />
                        <MoreHorizontal className="absolute top-4 right-6 text-white w-6 h-6 opacity-60" />
                    </div>

                    <div className="flex-1 px-6 relative -mt-16 flex flex-col">
                        {/* Floating content card */}
                        <div className="bg-white rounded-2xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-50 mb-6 transform group-hover:translate-y-[-8px] transition-transform duration-500">
                            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-xl mb-5 ring-4 ring-white">
                                <span className="text-white font-black text-xl uppercase">K</span>
                            </div>
                            <h3 className="text-xl font-black tracking-tight text-slate-900 mb-2 leading-none uppercase">Senior<br />Designer</h3>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">KareerAI • New York City</p>

                            <Button className="w-full bg-black hover:bg-slate-800 text-white rounded-xl h-12 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-gray-200 transition-all active:scale-95">
                                Apply Now
                            </Button>
                        </div>

                        <div className="space-y-6 opacity-60 group-hover:opacity-100 transition-all duration-700">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                    <Globe className="w-5 h-5 text-slate-400" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Website</h4>
                                    <p className="text-xs font-bold text-slate-900">kareer.ai</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                    <Monitor className="w-5 h-5 text-slate-400" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Work Type</h4>
                                    <p className="text-xs font-bold text-slate-900 uppercase">Full-Time / Remote</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto px-6 py-6 border-t border-slate-50">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-300">
                                <span>Posted 2H Ago</span>
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                                    <span className="text-emerald-500">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}

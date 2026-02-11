"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Calendar, ExternalLink, ArrowRight } from "lucide-react";
import { Job } from "@/lib/job-service";

interface JobCardProps {
    job: Job;
    onClick: (job: Job) => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
    return (
        <Card
            className="p-6 bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-cyan-500/50 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 group rounded-[2rem] relative overflow-hidden backdrop-blur-sm cursor-pointer shadow-sm dark:shadow-xl flex flex-col h-full"
            onClick={() => onClick(job)}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-2xl font-black text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform shadow-inner">
                            {job.companyName[0]}
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors tracking-tight line-clamp-1">
                                {job.title}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">
                                <Building2 className="w-3.5 h-3.5 text-cyan-500/50" />
                                {job.companyName}
                            </div>
                        </div>
                    </div>
                    {job.source === 'Wellfound' && (
                        <Badge className="bg-cyan-500 text-white border-none text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                            HOT
                        </Badge>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-wider group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">
                        <MapPin className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                        {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-wider group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                        {new Date(job.postedDate).toLocaleDateString()}
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 flex gap-3">
                    <Button
                        variant="ghost"
                        className="flex-1 h-11 rounded-xl font-black uppercase tracking-widest text-[9px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick(job);
                        }}
                    >
                        PROTOCOL VIEW
                    </Button>
                    <Button
                        className="flex-1 h-11 bg-gray-900 dark:bg-white/10 hover:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-black uppercase tracking-widest text-[9px] rounded-xl transition-all group/btn"
                        asChild
                        onClick={(e) => e.stopPropagation()}
                    >
                        <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                            DEPLOY
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                    </Button>
                </div>
            </div>
        </Card>
    );
}

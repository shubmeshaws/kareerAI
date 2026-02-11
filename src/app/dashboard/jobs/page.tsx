"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, SlidersHorizontal, Loader2, Briefcase, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobFilters as JobFiltersComp } from "@/components/jobs/JobFilters";
import { JobCard } from "@/components/jobs/JobCard";
import { JobDetailView } from "@/components/jobs/JobDetailView";
import { fetchJobs, Job, JobFilters } from "@/lib/job-service";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [filters, setFilters] = useState<JobFilters>({
        role: "",
        location: "All",
        experience: "All",
        remoteOnly: false,
        companyType: "All"
    });

    const loadJobs = useCallback(async () => {
        setIsLoading(true);
        try {
            const results = await fetchJobs(filters);
            setJobs(results);
        } catch (error) {
            console.error("Failed to load jobs", error);
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        loadJobs();
    }, [loadJobs]);

    const handleJobClick = (job: Job) => {
        setSelectedJob(job);
        setIsDetailOpen(true);
    };

    const handleFilterChange = (newFilters: JobFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="flex-1 flex overflow-hidden p-3 gap-3 h-full max-h-screen">
            {/* Column 2: Filters - Sidebar */}
            <aside className="w-[320px] hidden xl:flex flex-col gap-3 overflow-hidden">
                <div className="flex-1 bg-white dark:bg-black/20 rounded-[1.5rem] p-5 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col relative overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-500">Search Protocol</h2>
                        <Badge variant="outline" className="text-[8px] font-bold uppercase bg-white/50 dark:bg-white/5 backdrop-blur-sm border-gray-100 dark:border-white/10">Active</Badge>
                    </div>

                    <div className="overflow-y-auto custom-scrollbar flex-1 pr-2 space-y-6">
                        <JobFiltersComp filters={filters} onFilterChange={handleFilterChange} />
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
                        <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-indigo-600/10 rounded-2xl border border-cyan-500/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-[40px]" />
                            <h4 className="text-[9px] font-black text-cyan-600 dark:text-cyan-400 flex items-center gap-2 mb-2 uppercase tracking-widest">
                                <Briefcase className="w-3.5 h-3.5" />
                                Pro Tip
                            </h4>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-bold">
                                Connect your <span className="text-gray-900 dark:text-white">Neural Hub</span> to refine recommendations based on active skill vectors.
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Column 3: Main Workspace - Job Grid */}
            <main className="flex-1 bg-gray-50/50 dark:bg-black/20 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-white/5 flex flex-col overflow-hidden relative">
                {/* Decorative Gradients */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                {/* Header - Compact */}
                <header className="p-4 flex items-center justify-between shrink-0 bg-white dark:bg-[#0E121B] border-b border-gray-50 dark:border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                            <Search className="w-4 h-4" />
                        </div>
                        <div>
                            <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Neural Job Finder</h1>
                            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Opportunity Latency: {isLoading ? 'Scanning...' : 'Minimal'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Mobile Filter Trigger */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className="xl:hidden h-8 w-8 p-0 rounded-full border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">
                                    <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 border-none bg-white dark:bg-[#0E121B] text-gray-900 dark:text-white">
                                <div className="p-6 h-full overflow-y-auto">
                                    <JobFiltersComp filters={filters} onFilterChange={handleFilterChange} />
                                </div>
                            </SheetContent>
                        </Sheet>

                        <Button
                            variant="outline"
                            onClick={loadJobs}
                            disabled={isLoading}
                            className="h-8 px-3 rounded-full border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-700 dark:text-white font-bold text-[10px] uppercase tracking-wide shadow-sm dark:shadow-none transition-all gap-2"
                        >
                            <RefreshCw className={`w-3 h-3 text-cyan-600 dark:text-cyan-400 ${isLoading ? 'animate-spin' : ''}`} />
                            Resync
                        </Button>
                    </div>
                </header>

                {/* Content Area - Scrollable */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar relative">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="relative">
                                <div className="absolute inset-0 bg-cyan-500/20 blur-[30px] animate-pulse rounded-full" />
                                <Loader2 className="w-8 h-8 text-cyan-600 dark:text-cyan-400 animate-spin relative" />
                            </div>
                            <p className="text-cyan-600/60 dark:text-cyan-400/60 animate-pulse font-black mt-4 uppercase tracking-widest text-[10px]">Scanning Vector Space...</p>
                        </div>
                    ) : jobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                            {jobs.map((job) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    onClick={handleJobClick}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-gray-200 dark:border-white/10">
                                <Briefcase className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                            </div>
                            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">Zero Anomalies Detected</h3>
                            <p className="text-gray-500 mt-2 max-w-xs mx-auto text-[10px] font-bold uppercase tracking-wide">
                                Adjust your search parameters to detect alternative job signatures.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-6 border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 rounded-full h-8 px-6 font-black uppercase tracking-widest text-[9px]"
                                onClick={() => setFilters({
                                    role: "",
                                    location: "All",
                                    experience: "All",
                                    remoteOnly: false,
                                    companyType: "All"
                                })}
                            >
                                Clear Protocols
                            </Button>
                        </div>
                    )}
                </div>
            </main>

            {/* Job Detail Overlay */}
            <JobDetailView
                job={selectedJob}
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
            />
        </div>
    );
}

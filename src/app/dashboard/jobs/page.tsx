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
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-600 to-indigo-600 dark:from-cyan-500 dark:to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)] dark:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                            <Search className="w-6 h-6 text-white" />
                        </div>
                        NEURAL JOB FINDER
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                        Optimizing opportunity discovery through high-fidelity neural matching.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={loadJobs}
                        disabled={isLoading}
                        className="hidden md:flex items-center gap-2 border-gray-200 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-gray-700 dark:text-white rounded-xl h-12 px-6 font-bold shadow-sm dark:shadow-none transition-all"
                    >
                        <RefreshCw className={`w-4 h-4 text-cyan-600 dark:text-cyan-400 ${isLoading ? 'animate-spin' : ''}`} />
                        RESYNC ENGINE
                    </Button>

                    {/* Mobile Filter Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="sm" className="md:hidden flex items-center gap-2 border-gray-200 dark:border-white/10 bg-white/40 dark:bg-white/5 text-gray-700 dark:text-white rounded-xl shadow-sm dark:shadow-none">
                                <SlidersHorizontal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                                FILTERS
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 border-none bg-white dark:bg-[#0E121B] text-gray-900 dark:text-white">
                            <JobFiltersComp filters={filters} onFilterChange={handleFilterChange} />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Desktop Sidebar Filters */}
                <aside className="hidden lg:block w-72 flex-shrink-0">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-white/40 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-6 backdrop-blur-md shadow-sm dark:shadow-xl">
                            <JobFiltersComp filters={filters} onFilterChange={handleFilterChange} />
                        </div>

                        <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-indigo-600/10 rounded-[2.5rem] border border-cyan-500/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-[40px]" />
                            <h4 className="text-[10px] font-black text-cyan-600 dark:text-cyan-400 flex items-center gap-2 mb-3 uppercase tracking-widest">
                                <Briefcase className="w-3.5 h-3.5" />
                                PRO TIP
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-bold">
                                Connect your <span className="text-gray-900 dark:text-white">Neural Hub</span> to refine recommendations based on active skill vectors.
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Results Grid */}
                <main className="flex-1">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white/40 dark:bg-white/5 rounded-[2.5rem] border border-gray-100 dark:border-white/5 backdrop-blur-sm shadow-sm dark:shadow-none">
                            <div className="relative">
                                <div className="absolute inset-0 bg-cyan-500/20 blur-[30px] animate-pulse" />
                                <Loader2 className="w-12 h-12 text-cyan-600 dark:text-cyan-400 animate-spin relative" />
                            </div>
                            <p className="text-gray-400 dark:text-gray-500 animate-pulse font-black mt-6 uppercase tracking-widest text-xs">Scanning Opportunity Latency...</p>
                        </div>
                    ) : jobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {jobs.map((job) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    onClick={handleJobClick}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white/40 dark:bg-white/5 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-white/10 p-20 text-center backdrop-blur-sm shadow-sm dark:shadow-none">
                            <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100 dark:border-white/5">
                                <Briefcase className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Zero Anomalies Detected</h3>
                            <p className="text-gray-500 mt-3 max-w-xs mx-auto text-sm font-medium">
                                Adjust your search parameters to detect alternative job signatures in the network.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-8 border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-700 dark:text-white rounded-xl h-12 px-8 font-black uppercase tracking-widest text-[10px] shadow-sm dark:shadow-none"
                                onClick={() => setFilters({
                                    role: "",
                                    location: "All",
                                    experience: "All",
                                    remoteOnly: false,
                                    companyType: "All"
                                })}
                            >
                                CLEAR PROTOCOLS
                            </Button>
                        </div>
                    )}
                </main>
            </div>

            {/* Job Detail Overlay */}
            <JobDetailView
                job={selectedJob}
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
            />
        </div>
    );
}

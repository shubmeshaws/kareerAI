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
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                            <Search className="w-6 h-6 text-white" />
                        </span>
                        Job Finder
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Discover opportunities from top product companies and startups.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={loadJobs}
                        disabled={isLoading}
                        className="hidden md:flex items-center gap-2"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>

                    {/* Mobile Filter Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="sm" className="md:hidden flex items-center gap-2">
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 border-none">
                            <JobFiltersComp filters={filters} onFilterChange={handleFilterChange} />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Desktop Sidebar Filters */}
                <aside className="hidden lg:block w-72 flex-shrink-0">
                    <div className="sticky top-24">
                        <JobFiltersComp filters={filters} onFilterChange={handleFilterChange} />

                        <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                            <h4 className="text-sm font-semibold text-indigo-900 flex items-center gap-2 mb-2">
                                <Briefcase className="w-4 h-4" />
                                Pro Tip
                            </h4>
                            <p className="text-xs text-indigo-700 leading-relaxed">
                                Connect your LinkedIn profile to get personalized job recommendations based on your skills.
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Results Grid */}
                <main className="flex-1">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                            <p className="text-gray-500 animate-pulse font-medium">Fetching matching jobs...</p>
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
                        <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-20 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Briefcase className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">No jobs found</h3>
                            <p className="text-gray-500 mt-2 max-w-xs mx-auto text-sm">
                                Try adjusting your filters or search keywords to find more opportunities.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-6"
                                onClick={() => setFilters({
                                    role: "",
                                    location: "All",
                                    experience: "All",
                                    remoteOnly: false,
                                    companyType: "All"
                                })}
                            >
                                Clear all filters
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

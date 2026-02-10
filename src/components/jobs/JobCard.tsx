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
    const getCompanyTypeColor = (type: string) => {
        switch (type) {
            case "Startup": return "bg-purple-100 text-purple-700 border-purple-200";
            case "Product": return "bg-blue-100 text-blue-700 border-blue-200";
            case "Service": return "bg-orange-100 text-orange-700 border-orange-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const getSourceColor = (source: string) => {
        switch (source) {
            case "Greenhouse": return "text-green-600";
            case "Lever": return "text-blue-600";
            case "Wellfound": return "text-orange-600";
            default: return "text-gray-600";
        }
    };

    return (
        <Card className="p-5 hover:shadow-lg transition-all duration-300 border-gray-100 group">
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:scale-110 transition-transform">
                            <Building2 className="w-6 h-6 text-gray-400 group-hover:text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {job.title}
                            </h3>
                            <p className="text-sm text-gray-600 flex items-center gap-1 mt-0.5">
                                {job.companyName}
                                <span className="text-gray-300">•</span>
                                <span className={`text-xs font-medium ${getSourceColor(job.source)}`}>
                                    via {job.source}
                                </span>
                            </p>
                        </div>
                    </div>
                    <Badge className={`${getCompanyTypeColor(job.companyType)} font-medium border`}>
                        {job.companyType}
                    </Badge>
                </div>

                <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        {job.location} {job.remote && <span className="text-indigo-600 font-medium">(Remote)</span>}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        Posted on {new Date(job.postedDate).toLocaleDateString()}
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="flex-1 text-xs"
                        onClick={() => onClick(job)}
                    >
                        View Details
                    </Button>
                    <Button
                        className="flex-1 text-xs bg-gray-900 hover:bg-indigo-600 group/btn"
                        asChild
                    >
                        <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                            Apply Now
                            <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                    </Button>
                </div>
            </div>
        </Card>
    );
}

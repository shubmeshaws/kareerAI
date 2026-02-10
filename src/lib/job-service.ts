"use client";

import { CompanyType, detectCompanyType } from "./company-detector";
export type { CompanyType };

export interface Job {
    id: string;
    title: string;
    companyName: string;
    location: string;
    type: string; // Full-time, Contract, etc.
    remote: boolean;
    companyType: CompanyType;
    postedDate: string;
    description: string;
    applyLink: string;
    source: "Greenhouse" | "Lever" | "Wellfound" | "Direct";
}

export interface JobFilters {
    role: string;
    location: string;
    experience: string;
    remoteOnly: boolean;
    companyType: CompanyType | "All";
}

const MOCK_JOBS: Job[] = [
    {
        id: "gh-101",
        title: "Senior Frontend Engineer",
        companyName: "Stripe",
        location: "San Francisco, CA",
        type: "Full-time",
        remote: true,
        companyType: "Product",
        postedDate: "2026-02-08",
        description: "Join the Stripe frontend team to build the future of online payments. We use React, TypeScript, and GraphQL. You will be responsible for building highly performant and accessible web interfaces used by millions of businesses.",
        applyLink: "https://boards.greenhouse.io/stripe/jobs/101",
        source: "Greenhouse"
    },
    {
        id: "lvr-201",
        title: "Product Manager",
        companyName: "Figma",
        location: "New York, NY",
        type: "Full-time",
        remote: false,
        companyType: "Product",
        postedDate: "2026-02-09",
        description: "Figma is seeking a Product Manager to lead our collaboration tools. You'll work closely with designers and engineers to create features that help teams create together. Experience with SaaS products is a plus.",
        applyLink: "https://jobs.lever.co/figma/201",
        source: "Lever"
    },
    {
        id: "wf-301",
        title: "Software Engineer (Founding Team)",
        companyName: "Nova AI",
        location: "Seattle, WA",
        type: "Full-time",
        remote: true,
        companyType: "Startup",
        postedDate: "2026-02-10",
        description: "Nova AI is a venture-backed seed stage start-up disrupting the legal tech industry. We are looking for a scrappy engineer to join our founding team. You will have a huge impact on our product and culture, plus generous equity.",
        applyLink: "https://wellfound.com/jobs/301",
        source: "Wellfound"
    },
    {
        id: "gh-401",
        title: "Cloud Solutions Architect",
        companyName: "Accenture",
        location: "Chicago, IL",
        type: "Contract",
        remote: false,
        companyType: "Service",
        postedDate: "2026-02-05",
        description: "Accenture is a leading global professional services company. We are looking for a Cloud Solutions Architect for one of our enterprise clients. You will be responsible for designing and implementing complex Azure architectures.",
        applyLink: "https://boards.greenhouse.io/accenture/jobs/401",
        source: "Greenhouse"
    },
    {
        id: "lvr-501",
        title: "Full Stack Developer",
        companyName: "Airbnb",
        location: "Remote",
        type: "Full-time",
        remote: true,
        companyType: "Product",
        postedDate: "2026-02-07",
        description: "Airbnb is looking for a Full Stack Developer to join our Host experience team. You will work on a variety of features across our web and mobile applications to help hosts succeed.",
        applyLink: "https://jobs.lever.co/airbnb/501",
        source: "Lever"
    },
    {
        id: "wf-601",
        title: "Backend Engineer",
        companyName: "SolarFlow",
        location: "Austin, TX",
        type: "Full-time",
        remote: false,
        companyType: "Startup",
        postedDate: "2026-02-09",
        description: "SolarFlow is an early-stage startup building the operating system for residential solar. We are looking for a backend engineer with experience in Node.js and PostgreSQL to help us scale our platform.",
        applyLink: "https://wellfound.com/jobs/601",
        source: "Wellfound"
    }
];

export async function fetchJobs(filters: JobFilters): Promise<Job[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    let filteredJobs = [...MOCK_JOBS];

    if (filters.role) {
        const roleLower = filters.role.toLowerCase();
        filteredJobs = filteredJobs.filter(job =>
            job.title.toLowerCase().includes(roleLower) ||
            job.description.toLowerCase().includes(roleLower)
        );
    }

    if (filters.location && filters.location !== "All") {
        const locLower = filters.location.toLowerCase();
        filteredJobs = filteredJobs.filter(job =>
            job.location.toLowerCase().includes(locLower)
        );
    }

    if (filters.remoteOnly) {
        filteredJobs = filteredJobs.filter(job => job.remote);
    }

    if (filters.companyType !== "All") {
        filteredJobs = filteredJobs.filter(job => job.companyType === filters.companyType);
    }

    // Detect and update company types for all results (even mock data) 
    // to ensure consistency with the detector logic
    return filteredJobs.map(job => ({
        ...job,
        companyType: detectCompanyType(job.description, job.companyName)
    }));
}

export async function getJobById(id: string): Promise<Job | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_JOBS.find(j => j.id === id) || null;
}

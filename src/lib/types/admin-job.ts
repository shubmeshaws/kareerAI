export type CompanyType = "Startup" | "Product" | "Service" | "Corporate";
export type JobSource = "LinkedIn" | "Indeed" | "Glassdoor" | "Company Site" | "Referral";

export interface Job {
    id: string;
    company: string;
    role: string;
    source: JobSource;
    createdDate: string;
    savedByUserId: string;
    savedByUserName: string; // Denormalized
    companyType: CompanyType;
    applicantsCount: number;
    description: string;
    status: "Active" | "Closed" | "Merged";
    mergedIntoId?: string;
}

export interface JobStats {
    totalJobs: number;
    newJobsToday: number;
    activeJobs: number;
    duplicatesFound: number;
}

export interface DuplicateGroup {
    key: string; // "Company - Role"
    ids: string[];
    count: number;
}

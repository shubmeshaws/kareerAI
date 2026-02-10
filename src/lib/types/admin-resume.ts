export type ResumeStatus = "Optimized" | "Analysis Pending" | "Failed";

export interface Resume {
    id: string;
    userId: string;
    userName: string; // Denormalized for easier display
    fileName: string;
    fileSize: number; // in bytes
    uploadDate: string;
    textStatus: ResumeStatus;
    extractedText: string;
    atsScore: number;
    linkedJobs: {
        id: string;
        title: string;
        company: string;
        date: string;
    }[];
}

export interface ResumeStats {
    totalCount: number;
    totalSize: number;
    optimizedCount: number;
    pendingCount: number;
}

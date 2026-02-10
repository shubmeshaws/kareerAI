export interface MatchLog {
    id: string;
    userId: string;
    userName: string;
    jobId: string;
    jobTitle: string;
    company: string;
    resumeId: string;
    score: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    recommendedActions: string[];
    timestamp: string;
    status: "Success" | "Partial" | "Failed";
}

export interface MatchStats {
    totalMatches: number;
    averageScore: number;
    topMissingSkills: { skill: string; count: number }[];
    matchesOverTime: { date: string; count: number }[];
}

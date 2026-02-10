export type UserRole = "ADMIN" | "USER";
export type UserPlan = "FREE" | "PRO";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "INACTIVE";

export interface UserActivity {
    id: string;
    type: "LOGIN" | "GENERATE_RESUME" | "SAVE_JOB" | "UPGRADE_PLAN" | "API_CALL";
    details: string;
    timestamp: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    plan: UserPlan;
    status: UserStatus;
    joinedAt: string;
    lastActiveAt: string;
    usage: {
        resumesGenerated: number;
        jobsSaved: number;
        aiTokensUsed: number;
    };
    activityLog: UserActivity[];
}

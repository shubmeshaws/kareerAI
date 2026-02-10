export type ActivityType =
    | "resume_uploaded"
    | "job_saved"
    | "resume_generated"
    | "cover_letter_generated"
    | "linkedin_message_generated"
    | "auto_match_run"
    | "application_status_updated";

export interface ActivityLog {
    id: string;
    userId: string;
    userName: string;
    action: ActivityType;
    details: any; // Flexible JSON structure
    timestamp: string;
    metadata?: {
        resumeId?: string;
        jobId?: string;
        status?: string;
        [key: string]: any;
    };
}

export type SystemLogSeverity = "INFO" | "WARN" | "ERROR" | "CRITICAL";

export interface SystemLog {
    id: string;
    timestamp: string;
    component: "AI_ROUTER" | "DATABASE" | "AUTH" | "SYSTEM";
    severity: SystemLogSeverity;
    message: string;
    details?: any;
    stackTrace?: string;
}

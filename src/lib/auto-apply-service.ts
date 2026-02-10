"use client";

export interface ApplicationLog {
    id: string;
    companyName: string;
    role: string;
    platform: "Lever" | "Greenhouse" | "Other";
    status: "Success" | "Failed";
    timestamp: string;
    error?: string;
}

const LOGS_KEY = "kareerai_auto_apply_logs";

export function getApplicationLogs(): ApplicationLog[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(LOGS_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function logApplication(log: Omit<ApplicationLog, "id" | "timestamp">) {
    if (typeof window === "undefined") return;
    const logs = getApplicationLogs();
    const newLog: ApplicationLog = {
        ...log,
        id: Math.random().toString(36).substring(2, 11),
        timestamp: new Date().toISOString()
    };
    localStorage.setItem(LOGS_KEY, JSON.stringify([newLog, ...logs].slice(0, 50)));
}

export function getProfileForAutoFill() {
    // In a real app, this would fetch from a database or a rich user profile state
    // For now, we'll mock it based on common application fields
    return {
        firstName: "John",
        lastName: "Doe",
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 8900",
        location: "San Francisco, CA",
        portfolioUrl: "https://johndoe.dev",
        linkedinUrl: "https://linkedin.com/in/johndoe",
        githubUrl: "https://github.com/johndoe",
        summary: "Senior Frontend Engineer with 8+ years of experience building scalable web applications.",
        currentCompany: "Tech Corp",
        currentTitle: "Lead Engineer"
    };
}

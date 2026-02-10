"use client";

import { CompanyType } from "./company-detector";

export type ApplicationStatus = "Saved" | "Applied" | "Interview" | "Offer" | "Rejected";

export interface Application {
    id: string;
    companyName: string;
    role: string;
    status: ApplicationStatus;
    appliedDate?: string;
    jd?: string;
    resumeVersion?: string;
    coverLetter?: string;
    notes?: string;
    companyType?: CompanyType;
    lastUpdated: string;
    matchScore?: number;
}

const STORAGE_KEY = "kareerai_applications";

export function getApplications(): Application[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function saveApplications(apps: Application[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

export function addApplication(app: Omit<Application, "id" | "lastUpdated">): Application {
    const apps = getApplications();
    const newApp: Application = {
        ...app,
        id: Math.random().toString(36).substring(2, 11),
        lastUpdated: new Date().toISOString()
    };
    saveApplications([...apps, newApp]);
    return newApp;
}

export function updateApplication(id: string, updates: Partial<Application>): Application | null {
    const apps = getApplications();
    const index = apps.findIndex(a => a.id === id);
    if (index === -1) return null;

    const updatedApp = {
        ...apps[index],
        ...updates,
        lastUpdated: new Date().toISOString()
    };
    apps[index] = updatedApp;
    saveApplications(apps);
    return updatedApp;
}

export function deleteApplication(id: string) {
    const apps = getApplications();
    const filtered = apps.filter(a => a.id !== id);
    saveApplications(filtered);
}

export function moveApplication(id: string, newStatus: ApplicationStatus) {
    return updateApplication(id, { status: newStatus });
}

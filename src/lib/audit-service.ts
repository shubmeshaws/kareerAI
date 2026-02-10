"use client";

export type AuditAction = "KEY_ADD" | "KEY_DELETE" | "KEY_TOGGLE" | "KEY_LIMIT_CHANGE" | "KEY_ROTATE" | "SYSTEM_SETTING";

export interface AuditLog {
    id: string;
    timestamp: string;
    user: string;
    action: AuditAction;
    details: string;
    status: "SUCCESS" | "FAILURE";
}

const AUDIT_STORAGE_KEY = "kareerai_audit_logs";

export function logAdminAction(action: AuditAction, details: string, status: "SUCCESS" | "FAILURE" = "SUCCESS") {
    if (typeof window === "undefined") return;

    const logs = getAuditLogs();
    const newLog: AuditLog = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
        user: "Admin", // In a real app, get from auth-service
        action,
        details,
        status
    };

    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify([newLog, ...logs].slice(0, 100)));
    window.dispatchEvent(new Event('audit-change'));
}

export function getAuditLogs(): AuditLog[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(AUDIT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

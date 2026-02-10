"use client";

export type UserRole = "USER" | "ADMIN";

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
    avatar?: string;
}

const AUTH_KEY = "kareerai_auth_user";

// Default mock admin for development/demo
const DEFAULT_USER: User = {
    id: "user_123",
    email: "shubham@example.com",
    fullName: "Shubham Meshram",
    role: "ADMIN" // Setting as ADMIN by default to let user access admin panel
};

export function getCurrentUser(): User | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) {
        // Initialize with default admin if nothing exists
        localStorage.setItem(AUTH_KEY, JSON.stringify(DEFAULT_USER));
        return DEFAULT_USER;
    }
    return JSON.parse(stored);
}

export function isAdmin(): boolean {
    const user = getCurrentUser();
    return user?.role === "ADMIN";
}

export function setRole(role: UserRole) {
    const user = getCurrentUser();
    if (user) {
        const updated = { ...user, role };
        localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
        // Dispatch event for other components (like Sidebar) to react
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new Event('auth-change'));
    }
}

export function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = "/";
}

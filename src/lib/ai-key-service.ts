"use client";

import { logAdminAction } from "./audit-service";

export type AIProvider = "Anthropic" | "OpenAI" | "Google Gemini" | "Groq" | "Putter.js";

export interface AIKey {
    id: string;
    provider: AIProvider;
    label: string;
    key: string; // Stored encrypted on server, rarely sent back fully in list if real app
    enabled: boolean;
    dailyLimit: number;
    usageToday: number;
    lastUsed?: string;
}

// API Client Functions

export async function getAIKeys(): Promise<AIKey[]> {
    if (typeof window === "undefined") return [];
    try {
        const res = await fetch('/api/admin/ai-keys');
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error("Failed to fetch keys", e);
        return [];
    }
}

export async function saveAIKey(keyData: Omit<AIKey, "id" | "usageToday">) {
    try {
        const res = await fetch('/api/admin/ai-keys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(keyData)
        });
        if (res.ok) {
            logAdminAction("KEY_ADD", `Added new ${keyData.provider} key: ${keyData.label}`);
            window.dispatchEvent(new Event('storage')); // Trigger UI refresh
        }
    } catch (e) {
        console.error("Failed to save key", e);
    }
}

export async function deleteAIKey(id: string) {
    try {
        const res = await fetch(`/api/admin/ai-keys?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
            logAdminAction("KEY_DELETE", `Deleted key ${id}`);
            window.dispatchEvent(new Event('storage'));
        }
    } catch (e) {
        console.error("Failed to delete key", e);
    }
}

export async function toggleAIKey(id: string) {
    try {
        const res = await fetch('/api/admin/ai-keys', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, action: 'toggle' })
        });
        if (res.ok) {
            logAdminAction("KEY_TOGGLE", `Toggled key ${id}`);
            window.dispatchEvent(new Event('storage'));
        }
    } catch (e) {
        console.error("Failed to toggle key", e);
    }
}

export async function callAIWithFallback(prompt: string, userId: string = "anon") {
    // Now calls the Unified Backend API
    const res = await fetch('/api/ai/completion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, userId, feature: "client_feature" })
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "AI Service Verification Failed");
    }

    return await res.json();
}

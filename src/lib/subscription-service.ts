"use client";

export type PlanTier = "Free" | "Pro" | "Premium";

export interface PlanDetails {
    id: PlanTier;
    name: string;
    price: string;
    priceId?: string;
    features: string[];
    limits: {
        resumesPerWeek: number;
        coverLettersPerWeek: number;
        autoApply: boolean;
    };
}

export const PLANS: Record<PlanTier, PlanDetails> = {
    Free: {
        id: "Free",
        name: "Free",
        price: "$0",
        features: ["2 Resumes / week", "Limited Cover Letters", "Basic Tracking"],
        limits: {
            resumesPerWeek: 2,
            coverLettersPerWeek: 5,
            autoApply: false
        }
    },
    Pro: {
        id: "Pro",
        name: "Pro",
        price: "$19",
        features: ["Unlimited Resumes", "Unlimited Cover Letters", "Advanced Tracking", "Priority Support"],
        limits: {
            resumesPerWeek: 9999,
            coverLettersPerWeek: 9999,
            autoApply: false
        }
    },
    Premium: {
        id: "Premium",
        name: "Premium",
        price: "$49",
        features: ["Everything in Pro", "Auto Apply Assistant", "Direct Recruiter Access", "AI Interview Prep"],
        limits: {
            resumesPerWeek: 9999,
            coverLettersPerWeek: 9999,
            autoApply: true
        }
    }
};

export interface SubscriptionStatus {
    tier: PlanTier;
    usage: {
        resumesThisWeek: number;
        coverLettersThisWeek: number;
    };
    expiryDate?: string;
}

const STORAGE_KEY = "kareerai_subscription";

export function getSubscription(): SubscriptionStatus {
    if (typeof window === "undefined") return { tier: "Free", usage: { resumesThisWeek: 0, coverLettersThisWeek: 0 } };
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { tier: "Free", usage: { resumesThisWeek: 0, coverLettersThisWeek: 0 } };
}

export function saveSubscription(sub: SubscriptionStatus) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sub));
}

export function checkLimit(feature: "resumes" | "coverLetters" | "autoApply"): boolean {
    const sub = getSubscription();
    const plan = PLANS[sub.tier];

    if (feature === "resumes") {
        return sub.usage.resumesThisWeek < plan.limits.resumesPerWeek;
    }
    if (feature === "coverLetters") {
        return sub.usage.coverLettersThisWeek < plan.limits.coverLettersPerWeek;
    }
    if (feature === "autoApply") {
        return plan.limits.autoApply;
    }
    return false;
}

export function incrementUsage(feature: "resumes" | "coverLetters") {
    const sub = getSubscription();
    if (feature === "resumes") sub.usage.resumesThisWeek += 1;
    if (feature === "coverLetters") sub.usage.coverLettersThisWeek += 1;
    saveSubscription(sub);
}

export function upgradePlan(tier: PlanTier) {
    const sub = getSubscription();
    sub.tier = tier;
    saveSubscription(sub);
}

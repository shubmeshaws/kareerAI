import { getActivityLogs } from "@/lib/server/activity-storage";
import { getAIUsageStats } from "@/lib/server/ai-usage-service";

export interface RiskProfile {
    score: number;
    level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    reasons: string[];
    isBot: boolean;
}

export async function calculateUserRisk(userId: string): Promise<RiskProfile> {
    const reasons: string[] = [];
    let score = 0;

    // 1. Check AI Usage
    const aiStats = getAIUsageStats();
    const userAiStats = aiStats.topUsers.find(u => u.userId === userId);

    if (userAiStats) {
        if (userAiStats.totalCalls > 50) {
            score += 30;
            reasons.push("High daily AI usage (>50 calls)");
        } else if (userAiStats.totalCalls > 20) {
            score += 10;
        }

        if (userAiStats.totalTokens > 100000) {
            score += 20;
            reasons.push("Excessive token consumption (>100k)");
        }
    }

    // 2. Check Activity Velocity (Bot Detection)
    const logs = await getActivityLogs({ userId, limit: 20 });
    if (logs.length > 5) {
        let fastActions = 0;
        for (let i = 0; i < logs.length - 1; i++) {
            const t1 = new Date(logs[i].timestamp).getTime();
            const t2 = new Date(logs[i + 1].timestamp).getTime();
            if (Math.abs(t1 - t2) < 1000) { // Less than 1 second between actions
                fastActions++;
            }
        }

        if (fastActions > 3) {
            score += 40;
            reasons.push("Bot-like activity detected (Rapid actions)");
        }
    }

    // 3. Login Patterns (Mock - assume single IP for now)
    // In real app, check for multiple IPs or countries

    let level: RiskProfile["level"] = "LOW";
    if (score >= 80) level = "CRITICAL";
    else if (score >= 50) level = "HIGH";
    else if (score >= 20) level = "MEDIUM";

    return {
        score,
        level,
        reasons,
        isBot: score >= 80 || reasons.some(r => r.includes("Bot"))
    };
}

import fs from 'fs';
import path from 'path';
import { DailyUsageStats, AIUsageAlert, AIUsageDashboardData } from '@/lib/types/admin-ai-usage';

const LOGS_FILE = path.join(process.cwd(), 'data', 'ai-logs.json');

// Approximate Cost per 1K tokens (Blended Input/Output)
const PROVIDER_RATES: Record<string, number> = {
    "Anthropic": 0.015, // Claude 3.5 Sonnet approx
    "OpenAI": 0.010,    // GPT-4o approx
    "Google Gemini": 0.005,
    "Groq": 0.001,
    "Putter.js": 0.020
};

export function getAIUsageStats(): AIUsageDashboardData {
    try {
        if (!fs.existsSync(LOGS_FILE)) {
            return { dailyStats: [], totalCost: 0, totalTokens: 0, averageLatency: 0, fallbackCount: 0, alerts: [] };
        }

        const rawLogs = JSON.parse(fs.readFileSync(LOGS_FILE, 'utf-8'));
        const dailyMap = new Map<string, DailyUsageStats>();

        let totalCost = 0;
        let totalTokens = 0;
        let totalLatency = 0;
        let successCount = 0;
        let fallbackEvents = 0; // Simple heuristic: 2 requests with same ID or short interval? 
        // Actually, router doesn't log "fallback" explicity yet, 
        // but we can count errors as potential trigger.
        // For now, let's just count distinct errors as potential fallback scenarios.

        rawLogs.forEach((log: any) => {
            const date = log.timestamp.split('T')[0];

            if (!dailyMap.has(date)) {
                dailyMap.set(date, {
                    date,
                    totalTokens: 0,
                    totalCalls: 0,
                    totalCost: 0,
                    errors: 0,
                    providerBreakdown: {}
                });
            }

            const stats = dailyMap.get(date)!;
            stats.totalCalls++;
            stats.totalTokens += (log.tokens || 0);

            // Cost Calc
            const rate = PROVIDER_RATES[log.provider] || 0.01; // Default fallback rate
            const cost = ((log.tokens || 0) / 1000) * rate;
            stats.totalCost += cost;
            totalCost += cost;
            totalTokens += (log.tokens || 0);

            // Breakdowns
            stats.providerBreakdown[log.provider] = (stats.providerBreakdown[log.provider] || 0) + (log.tokens || 0);

            if (log.status === "FAILURE") {
                stats.errors++;
            } else {
                totalLatency += (log.latency || 0);
                successCount++;
            }
        });

        const dailyStats = Array.from(dailyMap.values()).sort((a, b) => a.date.localeCompare(b.date));

        // Spike Detection
        const alerts: AIUsageAlert[] = [];
        if (dailyStats.length > 1) {
            const lastDay = dailyStats[dailyStats.length - 1];
            const prevDay = dailyStats[dailyStats.length - 2];

            if (lastDay.totalTokens > prevDay.totalTokens * 2 && lastDay.totalTokens > 1000) {
                alerts.push({
                    id: 'spike_tok',
                    type: 'SPIKE',
                    severity: 'medium',
                    message: `Token usage doubled compared to yesterday (${lastDay.totalTokens} vs ${prevDay.totalTokens})`,
                    timestamp: new Date().toISOString(),
                    metric: 'tokens',
                    value: lastDay.totalTokens,
                    threshold: prevDay.totalTokens * 2
                });
            }

            if (lastDay.errors > 0 && (lastDay.errors / lastDay.totalCalls) > 0.1) {
                alerts.push({
                    id: 'high_err',
                    type: 'ERROR_RATE',
                    severity: 'high',
                    message: `High error rate detected today (${Math.round((lastDay.errors / lastDay.totalCalls) * 100)}%)`,
                    timestamp: new Date().toISOString(),
                    metric: 'error_rate',
                    value: lastDay.errors / lastDay.totalCalls,
                    threshold: 0.1
                });
            }
        }

        return {
            dailyStats,
            topUsers,
            totalCost,
            totalTokens,
            averageLatency: successCount > 0 ? Math.round(totalLatency / successCount) : 0,
            fallbackCount: rawLogs.filter((l: any) => l.status === "FAILURE").length,
            alerts
        };

    } catch (e) {
        console.error("Failed to calc usage", e);
        return { dailyStats: [], topUsers: [], totalCost: 0, totalTokens: 0, averageLatency: 0, fallbackCount: 0, alerts: [] };
    }
}

export interface DailyUsageStats {
    date: string;
    totalTokens: number;
    totalCalls: number;
    totalCost: number;
    errors: number;
    providerBreakdown: Record<string, number>; // Provider Name -> Token Count
}

export interface AIUsageAlert {
    id: string;
    type: "SPIKE" | "ERROR_RATE" | "COST_LIMIT";
    severity: "low" | "medium" | "high";
    message: string;
    timestamp: string;
    metric: string;
    value: number;
    threshold: number;
}

export interface UserUsageStats {
    userId: string;
    totalTokens: number;
    totalCalls: number;
    totalCost: number;
    lastActive: string;
}

export interface AIUsageDashboardData {
    dailyStats: DailyUsageStats[];
    topUsers: UserUsageStats[];
    totalCost: number;
    totalTokens: number;
    averageLatency: number;
    fallbackCount: number;
    alerts: AIUsageAlert[];
}

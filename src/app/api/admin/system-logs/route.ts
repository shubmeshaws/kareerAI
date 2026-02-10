import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import { SystemLog } from "@/lib/types/admin-activity";

export async function GET() {
    try {
        const logsFile = path.join(process.cwd(), 'data', 'ai-logs.json');

        // Read AI Router Logs
        let aiLogs: any[] = [];
        if (fs.existsSync(logsFile)) {
            aiLogs = JSON.parse(fs.readFileSync(logsFile, 'utf-8'));
        }

        // Map to SystemLog format
        const systemLogs: SystemLog[] = aiLogs.map(log => ({
            id: log.id,
            timestamp: log.timestamp,
            component: "AI_ROUTER",
            severity: log.status === "FAILURE" ? "ERROR" : "INFO",
            message: log.error ? `AI Request Failed: ${log.error}` : `AI Request Success (${log.provider})`,
            details: {
                provider: log.provider,
                tokens: log.tokens,
                latency: log.latency,
                keyId: log.keyId,
                feature: log.feature
            }
        }));

        // Sort by most recent
        systemLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        return NextResponse.json(systemLogs);
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
    }
}

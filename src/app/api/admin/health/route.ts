import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function GET() {
    // 1. Check Storage Usage
    const dataDir = path.join(process.cwd(), 'data');
    let totalSize = 0;

    try {
        if (fs.existsSync(dataDir)) {
            const files = fs.readdirSync(dataDir);
            files.forEach(file => {
                const stats = fs.statSync(path.join(dataDir, file));
                totalSize += stats.size;
            });
        }
    } catch (e) {
        console.error("Storage check failed", e);
    }

    // 2. Mock AI Provider Health (In real world, ping their endpoints)
    const providers = [
        { name: "OpenAI", status: "Operational", latency: 145 },
        { name: "Anthropic", status: "Operational", latency: 210 },
        { name: "Google Gemini", status: "Degraded", latency: 850 }, // Mock issue
    ];

    return NextResponse.json({
        storage: {
            usedMB: (totalSize / (1024 * 1024)).toFixed(2),
            status: totalSize > 500 * 1024 * 1024 ? "Warning" : "Healthy" // Warn if > 500MB
        },
        providers
    });
}

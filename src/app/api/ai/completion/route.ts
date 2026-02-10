import { NextResponse } from "next/server";
import { routeAIRequest } from "@/lib/server/ai-router";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { prompt, userId, feature } = body;

        if (!prompt) {
            return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
        }

        // Call the optimized router
        const result = await routeAIRequest(
            prompt,
            userId || "anonymous",
            feature || "general_completion"
        );

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("[API] AI Completion Failed:", error);
        return NextResponse.json({
            error: error.message || "AI Service Unavailable",
            provider: "fallback_failed"
        }, { status: 503 });
    }
}

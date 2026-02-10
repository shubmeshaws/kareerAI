import { NextResponse } from "next/server";
import { routeAIRequest } from "@/lib/server/ai-router";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Force specific parameters for debugging
        const result = await routeAIRequest(
            "Debug Test Prompt: " + (body.prompt || "Hello AI"),
            "admin_debug_user",
            "debug_console"
        );
        return NextResponse.json({
            status: "success",
            ...result
        });
    } catch (error: any) {
        return NextResponse.json({
            status: "error",
            message: error.message
        }, { status: 500 });
    }
}

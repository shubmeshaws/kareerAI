import { NextResponse } from "next/server";
import { getAIUsageStats } from "@/lib/server/ai-usage-service";

export async function GET() {
    return NextResponse.json(getAIUsageStats());
}

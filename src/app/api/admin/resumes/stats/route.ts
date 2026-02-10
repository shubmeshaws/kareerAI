import { NextResponse } from "next/server";
import { getResumeStats } from "@/lib/server/resume-storage";

export async function GET() {
    return NextResponse.json(getResumeStats());
}

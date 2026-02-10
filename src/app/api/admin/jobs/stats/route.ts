import { NextResponse } from "next/server";
import { getJobStats } from "@/lib/server/job-storage";

export async function GET() {
    return NextResponse.json(getJobStats());
}

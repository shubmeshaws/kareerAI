import { NextResponse } from "next/server";
import { getJobById } from "@/lib/server/job-storage";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const job = getJobById(params.id);
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
    return NextResponse.json(job);
}

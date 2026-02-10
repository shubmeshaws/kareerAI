import { NextResponse } from "next/server";
import { getJobs } from "@/lib/server/job-storage";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase();

    let jobs = getJobs();

    // Filter out Merged jobs unless specifically requested
    jobs = jobs.filter(j => j.status !== 'Merged');

    if (query) {
        jobs = jobs.filter(j =>
            j.company.toLowerCase().includes(query) ||
            j.role.toLowerCase().includes(query)
        );
    }

    // Sort by recent first
    jobs.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

    return NextResponse.json(jobs);
}

import { NextResponse } from "next/server";
import { getResumes } from "@/lib/server/resume-storage";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase();

    let resumes = getResumes();

    if (query) {
        resumes = resumes.filter(r =>
            r.userName.toLowerCase().includes(query) ||
            r.fileName.toLowerCase().includes(query)
        );
    }

    // Sort by recent first
    resumes.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

    return NextResponse.json(resumes);
}

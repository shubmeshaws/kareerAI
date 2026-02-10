import { NextResponse } from "next/server";
import { getResumeById, deleteResume } from "@/lib/server/resume-storage";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const resume = getResumeById(params.id);
    if (!resume) return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    return NextResponse.json(resume);
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const success = deleteResume(params.id);
    if (!success) return NextResponse.json({ error: "Failed to delete" }, { status: 400 });
    return NextResponse.json({ success: true });
}

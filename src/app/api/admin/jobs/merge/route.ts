import { NextResponse } from "next/server";
import { findDuplicateGroups, mergeDuplicates } from "@/lib/server/job-storage";

export async function GET() {
    const duplicates = findDuplicateGroups();
    return NextResponse.json(duplicates);
}

export async function POST(request: Request) {
    try {
        const { masterId, duplicateIds } = await request.json();
        if (!masterId || !duplicateIds || !Array.isArray(duplicateIds)) {
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
        }

        const success = mergeDuplicates(masterId, duplicateIds);
        if (success) return NextResponse.json({ success: true });
        return NextResponse.json({ error: "Merge failed" }, { status: 500 });
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

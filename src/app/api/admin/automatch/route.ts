import { NextResponse } from "next/server";
import { getMatches } from "@/lib/server/automatch-storage";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let matches = getMatches();

    if (userId) {
        matches = matches.filter(m => m.userId === userId || m.userName.toLowerCase().includes(userId.toLowerCase()));
    }

    // Sort by most recent
    matches.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json(matches);
}

import { NextResponse } from "next/server";
import { getMatchStats } from "@/lib/server/automatch-storage";

export async function GET() {
    return NextResponse.json(getMatchStats());
}

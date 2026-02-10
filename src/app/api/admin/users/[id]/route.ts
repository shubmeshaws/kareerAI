import { NextResponse } from "next/server";
import { getUserById } from "@/lib/server/user-storage";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const user = getUserById(params.id);
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
}

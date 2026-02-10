import { NextResponse } from "next/server";
import { getUsers, updateUser } from "@/lib/server/user-storage";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase();

    let users = getUsers();

    if (query) {
        users = users.filter(u =>
            u.name.toLowerCase().includes(query) ||
            u.email.toLowerCase().includes(query)
        );
    }

    return NextResponse.json(users);
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        const updated = updateUser(id, updates);
        if (!updated) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (e) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

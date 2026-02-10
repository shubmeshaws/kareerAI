import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/server/settings-storage";
import { storeActivity } from "@/lib/server/activity-storage";

export async function GET() {
    return NextResponse.json(getSettings());
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const updated = updateSettings(body);

        // Audit Log
        // In a real app, we'd get the admin ID from the session. 
        // For now, we'll use a generic "admin" user or try to get it from headers if we had auth.
        await storeActivity({
            userId: "admin_user", // Placeholder or from session
            userName: "Administrator",
            action: "Updated System Settings",
            type: "SYSTEM",
            details: { changes: Object.keys(body) },
            timestamp: new Date().toISOString()
        });

        return NextResponse.json(updated);
    } catch (e) {
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}

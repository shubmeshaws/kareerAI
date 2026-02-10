import { NextResponse } from "next/server";
import { getKeys, addKey, saveKeys, AIKey } from "@/lib/server/ai-storage";

// GET: List all keys (Admin only - validation skipped for prototype)
export async function GET() {
    const keys = getKeys();
    return NextResponse.json(keys);
}

// POST: Add a new key
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { provider, label, key, dailyLimit } = body;

        if (!provider || !label || !key) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newKey = addKey({
            provider,
            label,
            key, // In real app, encrypt here before passing to storage
            dailyLimit: Number(dailyLimit) || 1000,
            enabled: true,
            lastUsed: undefined
        });

        return NextResponse.json(newKey);
    } catch (error) {
        return NextResponse.json({ error: "Failed to add key" }, { status: 500 });
    }
}

// PUT: Toggle key status or delete (Simulating DELETE via PUT for simplicity if client prefers, but better to use DELETE method)
// Actually let's just handle Toggle here.
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, action } = body; // action: 'toggle'

        if (action === 'toggle') {
            const keys = getKeys();
            const updated = keys.map(k => k.id === id ? { ...k, enabled: !k.enabled } : k);
            saveKeys(updated);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update key" }, { status: 500 });
    }
}

// DELETE: Remove a key
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 });
        }

        const keys = getKeys();
        const filtered = keys.filter(k => k.id !== id);
        saveKeys(filtered); // This uses saveKeys from ai-storage to persist

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete key" }, { status: 500 });
    }
}

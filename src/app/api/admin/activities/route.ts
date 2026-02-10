import { NextResponse } from "next/server";
import { getActivities } from "@/lib/server/activity-storage";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const action = searchParams.get('action');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let activities = getActivities();

    if (userId && userId !== 'all') {
        activities = activities.filter(a => a.userId === userId || a.userName.includes(userId));
    }

    if (action && action !== 'all') {
        activities = activities.filter(a => a.action === action);
    }

    if (startDate) {
        activities = activities.filter(a => new Date(a.timestamp) >= new Date(startDate));
    }

    if (endDate) {
        // Add one day to include the end date fully
        const end = new Date(endDate);
        end.setDate(end.getDate() + 1);
        activities = activities.filter(a => new Date(a.timestamp) < end);
    }

    // Sort by most recent
    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json(activities);
}

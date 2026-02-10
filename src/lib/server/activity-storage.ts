import fs from 'fs';
import path from 'path';
import { ActivityLog, ActivityType } from '@/lib/types/admin-activity';

const DATA_DIR = path.join(process.cwd(), 'data');
const ACTIVITIES_FILE = path.join(DATA_DIR, 'activities.json');

// Ensure data existence
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(ACTIVITIES_FILE)) {
    // Seed with initial data
    const initialActivities: ActivityLog[] = Array.from({ length: 50 }).map((_, i) => {
        const actions: ActivityType[] = [
            "resume_uploaded", "job_saved", "resume_generated",
            "cover_letter_generated", "linkedin_message_generated",
            "auto_match_run", "application_status_updated"
        ];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const userId = `user_${Math.floor(Math.random() * 20) + 1}`;

        return {
            id: `act_${i + 1}`,
            userId: userId,
            userName: `User ${userId.split('_')[1]}`,
            action: action,
            details: { snippet: "Action details here..." },
            timestamp: new Date(Date.now() - Math.floor(Math.random() * 604800000)).toISOString(), // Last 7 days
            metadata: {
                resumeId: action.includes('resume') ? `res_${Math.floor(Math.random() * 10)}` : undefined,
                jobId: action.includes('job') ? `job_${Math.floor(Math.random() * 10)}` : undefined,
            }
        };
    });
    fs.writeFileSync(ACTIVITIES_FILE, JSON.stringify(initialActivities, null, 2));
}

export function getActivities(): ActivityLog[] {
    try {
        if (!fs.existsSync(ACTIVITIES_FILE)) return [];
        const data = fs.readFileSync(ACTIVITIES_FILE, 'utf-8');
        return JSON.parse(data);
    } catch { return []; }
}

export function logActivity(log: Omit<ActivityLog, 'id' | 'timestamp'>) {
    try {
        const activities = getActivities();
        const newActivity: ActivityLog = {
            ...log,
            id: Math.random().toString(36).substring(7),
            timestamp: new Date().toISOString()
        };
        // Keep last 2000 activities
        const updated = [newActivity, ...activities].slice(0, 2000);
        fs.writeFileSync(ACTIVITIES_FILE, JSON.stringify(updated, null, 2));
    } catch (e) {
        console.error("Failed to log activity", e);
    }
}

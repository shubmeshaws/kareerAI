import fs from 'fs';
import path from 'path';
import { User, UserActivity, UserRole, UserPlan, UserStatus } from '@/lib/types/admin-user';

export type { User, UserActivity, UserRole, UserPlan, UserStatus };

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data existence
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(USERS_FILE)) {
    // Seed with initial data if empty
    const initialUsers: User[] = Array.from({ length: 20 }).map((_, i) => ({
        id: `user_${i + 1}`,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: i === 0 ? "ADMIN" : "USER",
        plan: Math.random() > 0.7 ? "PRO" : "FREE",
        status: Math.random() > 0.9 ? "SUSPENDED" : "ACTIVE",
        joinedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        lastActiveAt: new Date(Date.now() - Math.random() * 100000000).toISOString(),
        usage: {
            resumesGenerated: Math.floor(Math.random() * 50),
            jobsSaved: Math.floor(Math.random() * 100),
            aiTokensUsed: Math.floor(Math.random() * 50000),
        },
        activityLog: [
            {
                id: `act_${Math.random()}`,
                type: "LOGIN",
                details: "Logged in from Chrome on MacOS",
                timestamp: new Date().toISOString()
            }
        ]
    }));
    fs.writeFileSync(USERS_FILE, JSON.stringify(initialUsers, null, 2));
}

export function getUsers(): User[] {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch { return []; }
}

export function saveUsers(users: User[]) {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (e) {
        console.error("Failed to save users", e);
    }
}

export function getUserById(id: string): User | undefined {
    const users = getUsers();
    return users.find(u => u.id === id);
}

export function updateUser(id: string, updates: Partial<User>) {
    const users = getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updates };
        saveUsers(users);
        return users[index];
    }
    return null;
}

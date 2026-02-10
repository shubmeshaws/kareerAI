import fs from 'fs';
import path from 'path';
import { MatchLog, MatchStats } from '@/lib/types/admin-automatch';

const DATA_DIR = path.join(process.cwd(), 'data');
const MATCH_FILE = path.join(DATA_DIR, 'automatch.json');

// Ensure data existence
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(MATCH_FILE)) {
    // Seed with initial data
    const initialMatches: MatchLog[] = Array.from({ length: 50 }).map((_, i) => {
        const score = Math.floor(Math.random() * 40) + 50; // 50-90
        const missing = ["React", "TypeScript", "Node.js", "AWS", "Python", "Docker"].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);

        return {
            id: `match_${i + 1}`,
            userId: `user_${Math.floor(Math.random() * 20) + 1}`,
            userName: `User ${Math.floor(Math.random() * 20) + 1}`,
            jobId: `job_${Math.floor(Math.random() * 10) + 1}`,
            jobTitle: ["Frontend Dev", "Backend Engineer", "Full Stack", "DevOps"][Math.floor(Math.random() * 4)],
            company: ["TechCorp", "StartupInc", "GlobalSys"][Math.floor(Math.random() * 3)],
            resumeId: `res_${Math.floor(Math.random() * 10) + 1}`,
            score: score,
            matchedKeywords: ["JavaScript", "HTML", "CSS", "Git", "Agile"],
            missingKeywords: missing,
            recommendedActions: score < 70 ? ["Add missing skills to resume", "Take a course on AWS"] : ["Apply now", "Customize cover letter"],
            timestamp: new Date(Date.now() - Math.floor(Math.random() * 604800000)).toISOString(),
            status: score > 75 ? "Success" : "Partial"
        };
    });
    fs.writeFileSync(MATCH_FILE, JSON.stringify(initialMatches, null, 2));
}

export function getMatches(): MatchLog[] {
    try {
        if (!fs.existsSync(MATCH_FILE)) return [];
        const data = fs.readFileSync(MATCH_FILE, 'utf-8');
        return JSON.parse(data);
    } catch { return []; }
}

export function getMatchStats(): MatchStats {
    const matches = getMatches();

    // Top Missing Skills
    const skillCounts: Record<string, number> = {};
    matches.forEach(m => {
        m.missingKeywords.forEach(skill => {
            skillCounts[skill] = (skillCounts[skill] || 0) + 1;
        });
    });

    const topMissing = Object.entries(skillCounts)
        .map(([skill, count]) => ({ skill, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    // Matches Over Time (Last 7 Days)
    const days: Record<string, number> = {};
    matches.forEach(m => {
        const date = m.timestamp.split('T')[0];
        days[date] = (days[date] || 0) + 1;
    });
    const matchesOverTime = Object.entries(days).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date));

    return {
        totalMatches: matches.length,
        averageScore: Math.round(matches.reduce((acc, m) => acc + m.score, 0) / matches.length),
        topMissingSkills: topMissing,
        matchesOverTime
    };
}

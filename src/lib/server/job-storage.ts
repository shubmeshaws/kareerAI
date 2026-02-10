import fs from 'fs';
import path from 'path';
import { Job, JobStats, DuplicateGroup, CompanyType, JobSource } from '@/lib/types/admin-job';

const DATA_DIR = path.join(process.cwd(), 'data');
const JOBS_FILE = path.join(DATA_DIR, 'jobs.json');

// Ensure data existence
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(JOBS_FILE)) {
    // Seed with initial data
    const initialJobs: Job[] = Array.from({ length: 40 }).map((_, i) => {
        const company = ["TechCorp", "InnovateAI", "DevStudio", "GlobalSys", "StartupDiff"][Math.floor(Math.random() * 5)];
        const role = ["Senior Frontend Dev", "Backend Engineer", "Product Manager", "DevOps Specialist", "Full Stack Dev"][Math.floor(Math.random() * 5)];

        return {
            id: `job_${i + 1}`,
            company: company,
            role: role,
            source: ["LinkedIn", "Indeed", "Glassdoor", "Company Site"][Math.floor(Math.random() * 4)] as JobSource,
            createdDate: new Date(Date.now() - Math.floor(Math.random() * 259200000)).toISOString(), // Last 3 days
            savedByUserId: `user_${Math.floor(Math.random() * 20) + 1}`,
            savedByUserName: `User ${Math.floor(Math.random() * 20) + 1}`,
            companyType: ["Startup", "Product", "Service", "Corporate"][Math.floor(Math.random() * 4)] as CompanyType,
            applicantsCount: Math.floor(Math.random() * 50),
            description: "We are looking for a talented individual to join our team. Responsibilities include building scalable applications...",
            status: "Active"
        };
    });
    fs.writeFileSync(JOBS_FILE, JSON.stringify(initialJobs, null, 2));
}

export function getJobs(): Job[] {
    try {
        if (!fs.existsSync(JOBS_FILE)) return [];
        const data = fs.readFileSync(JOBS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch { return []; }
}

export function saveJobs(jobs: Job[]) {
    try {
        fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
    } catch (e) {
        console.error("Failed to save jobs", e);
    }
}

export function getJobById(id: string): Job | undefined {
    return getJobs().find(j => j.id === id);
}

export function getJobStats(): JobStats {
    const jobs = getJobs();
    const today = new Date().toISOString().split('T')[0];

    // Simple duplicate detection for stats
    const signatures = jobs.filter(j => j.status === 'Active').map(j => `${j.company.toLowerCase()}|${j.role.toLowerCase()}`);
    const uniqueSignatures = new Set(signatures);
    const duplicates = signatures.length - uniqueSignatures.size;

    return {
        totalJobs: jobs.length,
        newJobsToday: jobs.filter(j => j.createdDate.startsWith(today)).length,
        activeJobs: jobs.filter(j => j.status === 'Active').length,
        duplicatesFound: duplicates
    };
}

export function findDuplicateGroups(): DuplicateGroup[] {
    const jobs = getJobs().filter(j => j.status === 'Active');
    const groups: Record<string, string[]> = {};

    jobs.forEach(job => {
        const key = `${job.company} - ${job.role}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(job.id);
    });

    return Object.entries(groups)
        .filter(([_, ids]) => ids.length > 1)
        .map(([key, ids]) => ({ key, ids, count: ids.length }));
}

export function mergeDuplicates(masterId: string, duplicateIds: string[]): boolean {
    const jobs = getJobs();
    let updated = false;

    const newJobs = jobs.map(job => {
        if (duplicateIds.includes(job.id) && job.id !== masterId) {
            updated = true;
            return { ...job, status: "Merged" as const, mergedIntoId: masterId };
        }
        if (job.id === masterId) {
            // In a real app, we might merge applicants count here
            return job;
        }
        return job;
    });

    if (updated) {
        saveJobs(newJobs);
        return true;
    }
    return false;
}

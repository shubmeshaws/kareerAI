import fs from 'fs';
import path from 'path';
import { Resume, ResumeStats } from '@/lib/types/admin-resume';

const DATA_DIR = path.join(process.cwd(), 'data');
const RESUMES_FILE = path.join(DATA_DIR, 'resumes.json');

// Ensure data existence
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(RESUMES_FILE)) {
    // Seed with initial data
    const initialResumes: Resume[] = Array.from({ length: 50 }).map((_, i) => ({
        id: `res_${i + 1}`,
        userId: `user_${Math.floor(Math.random() * 20) + 1}`,
        userName: `User ${Math.floor(Math.random() * 20) + 1}`,
        fileName: `Resume_Version_${i + 1}.pdf`,
        fileSize: Math.floor(Math.random() * 2000000) + 500000,
        uploadDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        textStatus: Math.random() > 0.8 ? "Analysis Pending" : "Optimized",
        extractedText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Experience: Senior Developer at Tech Corp...",
        atsScore: Math.floor(Math.random() * 40) + 60,
        linkedJobs: Array.from({ length: Math.floor(Math.random() * 3) }).map((_, j) => ({
            id: `job_${j}`,
            title: "Software Engineer",
            company: "Tech Company Inc",
            date: new Date().toISOString()
        }))
    }));
    fs.writeFileSync(RESUMES_FILE, JSON.stringify(initialResumes, null, 2));
}

export function getResumes(): Resume[] {
    try {
        if (!fs.existsSync(RESUMES_FILE)) return [];
        const data = fs.readFileSync(RESUMES_FILE, 'utf-8');
        return JSON.parse(data);
    } catch { return []; }
}

export function saveResumes(resumes: Resume[]) {
    try {
        fs.writeFileSync(RESUMES_FILE, JSON.stringify(resumes, null, 2));
    } catch (e) {
        console.error("Failed to save resumes", e);
    }
}

export function getResumeById(id: string): Resume | undefined {
    return getResumes().find(r => r.id === id);
}

export function deleteResume(id: string): boolean {
    const resumes = getResumes();
    const newResumes = resumes.filter(r => r.id !== id);
    if (newResumes.length < resumes.length) {
        saveResumes(newResumes);
        return true;
    }
    return false;
}

export function getResumeStats(): ResumeStats {
    const resumes = getResumes();
    return {
        totalCount: resumes.length,
        totalSize: resumes.reduce((acc, r) => acc + r.fileSize, 0),
        optimizedCount: resumes.filter(r => r.textStatus === 'Optimized').length,
        pendingCount: resumes.filter(r => r.textStatus === 'Analysis Pending').length
    };
}

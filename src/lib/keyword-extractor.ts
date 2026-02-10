// Common tech keywords for ATS matching
const techKeywords = [
    "javascript", "typescript", "react", "angular", "vue", "node", "python", "java",
    "aws", "azure", "gcp", "docker", "kubernetes", "ci/cd", "git", "agile", "scrum",
    "sql", "nosql", "mongodb", "postgresql", "mysql", "redis", "graphql", "rest",
    "html", "css", "sass", "tailwind", "bootstrap", "webpack", "vite", "npm",
    "testing", "jest", "cypress", "selenium", "unit testing", "integration",
    "api", "microservices", "serverless", "cloud", "devops", "linux", "unix"
];

// Common soft skills
const softSkills = [
    "leadership", "communication", "teamwork", "problem-solving", "analytical",
    "project management", "time management", "collaboration", "mentoring",
    "stakeholder", "cross-functional", "strategic", "innovative", "detail-oriented"
];

export interface KeywordMatch {
    keyword: string;
    found: boolean;
    category: "technical" | "soft" | "custom";
}

export interface KeywordAnalysis {
    score: number;
    matchedKeywords: KeywordMatch[];
    missingKeywords: KeywordMatch[];
    allKeywords: KeywordMatch[];
}

// Extract keywords from job description
export function extractKeywordsFromJD(jobDescription: string): string[] {
    const words = jobDescription.toLowerCase()
        .replace(/[^\w\s-]/g, " ")
        .split(/\s+/)
        .filter(word => word.length > 2);

    // Find multi-word phrases
    const phrases: string[] = [];
    const jdLower = jobDescription.toLowerCase();

    [...techKeywords, ...softSkills].forEach(keyword => {
        if (jdLower.includes(keyword.toLowerCase())) {
            phrases.push(keyword);
        }
    });

    // Extract years of experience patterns
    const experiencePattern = /(\d+)\+?\s*years?/gi;
    const experienceMatches = jobDescription.match(experiencePattern);
    if (experienceMatches) {
        phrases.push(...experienceMatches.map(m => m.toLowerCase()));
    }

    // Extract degree requirements
    const degreePatterns = ["bachelor", "master", "phd", "degree", "bs", "ms", "mba"];
    degreePatterns.forEach(degree => {
        if (jdLower.includes(degree)) {
            phrases.push(degree);
        }
    });

    // Add unique words that appear multiple times (likely important)
    const wordCount: Record<string, number> = {};
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    Object.entries(wordCount).forEach(([word, count]) => {
        if (count >= 2 && word.length > 4 && !phrases.includes(word)) {
            phrases.push(word);
        }
    });

    return [...new Set(phrases)];
}

// Match keywords between resume and job description
export function analyzeKeywordMatch(resumeText: string, jdKeywords: string[]): KeywordAnalysis {
    const resumeLower = resumeText.toLowerCase();
    const matches: KeywordMatch[] = [];

    jdKeywords.forEach(keyword => {
        const found = resumeLower.includes(keyword.toLowerCase());
        const category = techKeywords.includes(keyword.toLowerCase())
            ? "technical"
            : softSkills.includes(keyword.toLowerCase())
                ? "soft"
                : "custom";

        matches.push({ keyword, found, category });
    });

    const matchedKeywords = matches.filter(m => m.found);
    const missingKeywords = matches.filter(m => !m.found);
    const score = matches.length > 0
        ? Math.round((matchedKeywords.length / matches.length) * 100)
        : 0;

    return {
        score,
        matchedKeywords,
        missingKeywords,
        allKeywords: matches
    };
}

// Get score color based on percentage
export function getScoreColor(score: number): string {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    if (score >= 40) return "text-orange-600";
    return "text-red-600";
}

// Get score label
export function getScoreLabel(score: number): string {
    if (score >= 80) return "Excellent Match";
    if (score >= 60) return "Good Match";
    if (score >= 40) return "Fair Match";
    return "Needs Improvement";
}

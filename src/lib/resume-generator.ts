import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

export interface ResumeSection {
    title: string;
    content: string;
}

export interface OptimizedResume {
    name: string;
    email: string;
    phone: string;
    summary: string;
    experience: string[];
    education: string[];
    skills: string[];
}

// Generate optimized resume content based on original resume and keywords
export function optimizeResumeContent(
    originalText: string,
    missingKeywords: string[]
): string {
    let optimizedText = originalText;

    // Add suggestions for missing keywords
    if (missingKeywords.length > 0) {
        optimizedText += "\n\n--- SUGGESTED ADDITIONS ---\n";
        optimizedText += "Consider adding these keywords to improve your ATS score:\n";
        missingKeywords.forEach(keyword => {
            optimizedText += `• ${keyword}\n`;
        });
    }

    return optimizedText;
}

// Generate a DOCX file from resume content
export async function generateDocx(
    resumeContent: string,
    jobTitle: string
): Promise<Blob> {
    const lines = resumeContent.split("\n").filter(line => line.trim());

    const children: Paragraph[] = [
        new Paragraph({
            children: [
                new TextRun({
                    text: "ATS-Optimized Resume",
                    bold: true,
                    size: 32,
                }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 },
        }),
        new Paragraph({
            children: [
                new TextRun({
                    text: `Tailored for: ${jobTitle}`,
                    italics: true,
                    size: 22,
                    color: "666666",
                }),
            ],
            spacing: { after: 400 },
        }),
    ];

    lines.forEach(line => {
        const isHeading = line.startsWith("---") ||
            line.toUpperCase() === line && line.length > 3 &&
            !line.startsWith("•");

        if (isHeading && !line.startsWith("---")) {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: line,
                            bold: true,
                            size: 26,
                        }),
                    ],
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 300, after: 100 },
                })
            );
        } else if (line.startsWith("•")) {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: line,
                            size: 22,
                        }),
                    ],
                    spacing: { after: 50 },
                })
            );
        } else if (!line.startsWith("---")) {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: line,
                            size: 22,
                        }),
                    ],
                    spacing: { after: 100 },
                })
            );
        }
    });

    const doc = new Document({
        sections: [
            {
                properties: {},
                children,
            },
        ],
    });

    return await Packer.toBlob(doc);
}

// Download DOCX file
export async function downloadResume(
    resumeContent: string,
    jobTitle: string
): Promise<void> {
    const blob = await generateDocx(resumeContent, jobTitle);
    const fileName = `Resume_${jobTitle.replace(/[^a-zA-Z0-9]/g, "_")}_${Date.now()}.docx`;
    saveAs(blob, fileName);
}

// Stored resume type
export interface StoredResume {
    id: string;
    jobTitle: string;
    content: string;
    score: number;
    createdAt: string;
}

// Save resume to localStorage
export function saveResume(resume: Omit<StoredResume, "id" | "createdAt">): StoredResume {
    const stored = getStoredResumes();
    const newResume: StoredResume = {
        ...resume,
        id: `resume_${Date.now()}`,
        createdAt: new Date().toISOString(),
    };
    stored.unshift(newResume);
    localStorage.setItem("kareerai_resumes", JSON.stringify(stored));
    return newResume;
}

// Get stored resumes
export function getStoredResumes(): StoredResume[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("kareerai_resumes");
    return stored ? JSON.parse(stored) : [];
}

// Delete a stored resume
export function deleteStoredResume(id: string): void {
    const stored = getStoredResumes();
    const filtered = stored.filter(r => r.id !== id);
    localStorage.setItem("kareerai_resumes", JSON.stringify(filtered));
}

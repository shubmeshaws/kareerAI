import mammoth from "mammoth";

export interface ParsedResume {
    text: string;
    sections: {
        contact?: string;
        summary?: string;
        experience?: string;
        education?: string;
        skills?: string;
    };
}

// Parse DOCX file to text
export async function parseDocx(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
}

// Parse PDF file to text (client-side using pdf.js would require more setup)
// For now, we'll use a simpler approach with FileReader
export async function parsePdf(file: File): Promise<string> {
    // In a production app, you'd use pdf.js or a server-side solution
    // For demo purposes, we'll simulate PDF parsing
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                // For demo, we'll extract text from the file name and show a message
                // In production, integrate pdf-parse on the server or pdf.js on client
                const text = `[PDF Content from: ${file.name}]\n\nNote: For full PDF parsing, please upload a DOCX file or integrate a PDF parsing library.`;
                resolve(text);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

// Main parse function
export async function parseResume(file: File): Promise<string> {
    const fileType = file.name.toLowerCase();

    if (fileType.endsWith(".docx")) {
        return parseDocx(file);
    } else if (fileType.endsWith(".pdf")) {
        return parsePdf(file);
    } else {
        throw new Error("Unsupported file format. Please upload a PDF or DOCX file.");
    }
}

// Extract sections from resume text
export function extractSections(text: string): ParsedResume["sections"] {
    const sections: ParsedResume["sections"] = {};
    const lowerText = text.toLowerCase();

    // Simple section detection based on common headers
    const sectionPatterns = [
        { name: "summary", patterns: ["summary", "objective", "profile", "about"] },
        { name: "experience", patterns: ["experience", "employment", "work history", "professional experience"] },
        { name: "education", patterns: ["education", "academic", "qualifications"] },
        { name: "skills", patterns: ["skills", "technical skills", "competencies", "expertise"] },
    ];

    sectionPatterns.forEach(({ name, patterns }) => {
        patterns.forEach((pattern) => {
            if (lowerText.includes(pattern)) {
                sections[name as keyof typeof sections] = `Contains ${name} section`;
            }
        });
    });

    return sections;
}

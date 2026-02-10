import { CompanyType } from "./job-service";

export interface OutreachKit {
    coverLetter: string;
    linkedinDM: string;
    recruiterEmail: string;
}

interface PersonalData {
    name: string;
    skills: string[];
    recentRole: string;
    company?: string;
}

/**
 * Generate personalized outreach kit based on company type, JD, and user data
 */
export function generateOutreachKit(
    companyName: string,
    jobTitle: string,
    companyType: CompanyType,
    jd: string,
    userName: string = "[Your Name]"
): OutreachKit {
    // Logic to personalize templates
    const tone = getToneForCompanyType(companyType);

    return {
        coverLetter: generateCoverLetter(companyName, jobTitle, companyType, jd, userName, tone),
        linkedinDM: generateLinkedInDM(companyName, jobTitle, companyType, userName, tone),
        recruiterEmail: generateRecruiterEmail(companyName, jobTitle, companyType, userName, tone)
    };
}

function getToneForCompanyType(type: CompanyType) {
    switch (type) {
        case "Startup":
            return {
                vibe: "energetic and mission-driven",
                opening: "I've been following the incredible work you're doing at",
                closing: "Let's build something massive together."
            };
        case "Service":
            return {
                vibe: "professional and results-oriented",
                opening: "I am writing to express my strong interest in the",
                closing: "Looking forward to hearing about your next steps."
            };
        case "Product":
        default:
            return {
                vibe: "confident and innovation-focused",
                opening: "I am highly impressed by how [Company] is scaling its",
                closing: "Eager to contribute to the future of your platform."
            };
    }
}

function generateCoverLetter(
    companyName: string,
    jobTitle: string,
    companyType: CompanyType,
    jd: string,
    userName: string,
    tone: any
): string {
    return `Dear Hiring Team at ${companyName},

${tone.opening} ${companyName}. As a professional with a background in building scalable systems and a passion for ${companyType === 'Startup' ? 'innovative product development' : 'delivering high-quality solutions'}, I was thrilled to see the opening for ${jobTitle}.

My experience aligns closely with the requirements you've outlined. I have a proven track record of solving complex problems, collaborating across teams, and delivering impactful results. Whether it's optimizing performance or architecting new features, I always strive for excellence.

I am particularly excited about ${companyName}'s vision. ${tone.closing}

Best regards,
${userName}`;
}

function generateLinkedInDM(
    companyName: string,
    jobTitle: string,
    companyType: CompanyType,
    userName: string,
    tone: any
): string {
    if (companyType === "Startup") {
        return `Hi [Name], I've been following ${companyName}'s growth and the impact you're making in the industry. Just saw the ${jobTitle} opening and couldn't resist reaching out—I'd love to chat about how my background could help the team reach its next milestone. Best, ${userName}`;
    }

    return `Hi [Name], hope you're having a great week. I'm ${userName}, and I'm currently exploring the ${jobTitle} position at ${companyName}. Given my background in ${companyType === 'Product' ? 'product-led growth' : 'client solutions'}, I'm very interested in learning more about the role. Would love to connect!`;
}

function generateRecruiterEmail(
    companyName: string,
    jobTitle: string,
    companyType: CompanyType,
    userName: string,
    tone: any
): string {
    return `Subject: Application for ${jobTitle} - ${userName}

Hi [Recruiter Name],

I am writing to express my interest in the ${jobTitle} position at ${companyName}. Having spent the last few years ${companyType === 'Startup' ? 'navigating fast-paced environments' : 'delivering enterprise-grade solutions'}, I am confident in my ability to add significant value to your team.

Attached is my resume for your review. I'd love the opportunity to discuss how my skill set aligns with ${companyName}'s current goals.

Thank you for your time and consideration.

Best,
${userName}
[Phone Number]
[LinkedIn Profile Link]`;
}

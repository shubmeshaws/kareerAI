export interface FollowUpTemplate {
    subject: string;
    body: string;
}

export function getFollowUpTemplate(
    companyName: string,
    role: string,
    status: string,
    daysSince: number
): FollowUpTemplate {
    if (status === "Applied") {
        return {
            subject: `Follow-up: ${role} application at ${companyName}`,
            body: `Hi [Name],\n\nI hope you're having a great week. I'm reaching out to follow up on my application for the ${role} position at ${companyName} which I submitted ${daysSince} days ago.\n\nI remain very interested in the role and the work ${companyName} is doing, particularly in [mention something specific]. I'd love to hear if there are any updates on the next steps.\n\nBest regards,\n[Your Name]`
        };
    }

    if (status === "Interview") {
        return {
            subject: `Thank you for the interview - ${role} at ${companyName}`,
            body: `Hi [Name],\n\nThank you again for the opportunity to interview for the ${role} role today. I really enjoyed our conversation and learning more about how ${companyName} is tackling [mention a specific problem discussed].\n\nOur discussion further confirmed my excitement about the role and my belief that my skills in [mention a skill] would be a great fit for the team. Looking forward to hearing from you soon.\n\nBest regards,\n[Your Name]`
        };
    }

    return {
        subject: `Checking in: ${role} at ${companyName}`,
        body: `Hi [Name],\n\nHope all is well. I'm checking back in regarding the ${role} position. Is there any additional information I can provide as you move through your selection process?\n\nBest,\n[Your Name]`
    };
}

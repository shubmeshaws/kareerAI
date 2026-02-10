"use client";

export type CompanyType = "Startup" | "Product" | "Service" | "Unknown";

/**
 * Heuristics to detect company type based on description keywords
 */
export function detectCompanyType(description: string, companyName: string): CompanyType {
    const text = (description + " " + companyName).toLowerCase();

    // Service company keywords
    const serviceKeywords = [
        "consulting", "agency", "outsourcing", "service-based", "clients",
        "staffing", "recruitment", "solutions provider", "development shop",
        "digital transformation partner", "managed services"
    ];

    // Startup keywords
    const startupKeywords = [
        "equity", "series a", "series b", "series c", "seed", "venture-backed",
        "fast-paced", "disrupt", "early stage", "founding", "scrappy", "stealth"
    ];

    // Product company keywords
    const productKeywords = [
        "our product", "internal tool", "saas platform", "users", "subscriptions",
        "proprietary", "ecosystem", "marketplace"
    ];

    if (serviceKeywords.some(keyword => text.includes(keyword))) {
        return "Service";
    }

    if (startupKeywords.some(keyword => text.includes(keyword))) {
        return "Startup";
    }

    if (productKeywords.some(keyword => text.includes(keyword))) {
        return "Product";
    }

    // Default to Product if it seems professional but doesn't fit others perfectly, 
    // or Startup if it mentions growth
    if (text.includes("growth") || text.includes("joining the team")) {
        return "Startup";
    }

    return "Product";
}

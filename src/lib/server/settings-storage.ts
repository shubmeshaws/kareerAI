import fs from 'fs';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'data', 'settings.json');

export interface AdminSettings {
    registrationsOpen: boolean;
    limits: {
        resumesPerWeek: number;
        aiCallsPerDay: number;
        maxUploadSizeMB: number;
    };
    features: {
        jobFinder: boolean;
        autoApply: boolean;
        coverLetter: boolean;
        resumeTailor: boolean;
    };
}

const DEFAULT_SETTINGS: AdminSettings = {
    registrationsOpen: true,
    limits: {
        resumesPerWeek: 3,
        aiCallsPerDay: 20,
        maxUploadSizeMB: 5
    },
    features: {
        jobFinder: true,
        autoApply: true,
        coverLetter: true,
        resumeTailor: true
    }
};

export function getSettings(): AdminSettings {
    try {
        if (!fs.existsSync(SETTINGS_FILE)) {
            // Ensure data directory exists
            const dataDir = path.dirname(SETTINGS_FILE);
            if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

            fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2));
            return DEFAULT_SETTINGS;
        }
        return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'));
    } catch (e) {
        console.error("Failed to read settings", e);
        return DEFAULT_SETTINGS;
    }
}

export function updateSettings(newSettings: Partial<AdminSettings>): AdminSettings {
    const current = getSettings();
    const updated = { ...current, ...newSettings }; // Deep merge might be better, but this works for top-level keys. 
    // For nested objects like 'limits', we need to be careful.

    // Correctly merge nested objects
    if (newSettings.limits) updated.limits = { ...current.limits, ...newSettings.limits };
    if (newSettings.features) updated.features = { ...current.features, ...newSettings.features };

    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2));
    return updated;
}

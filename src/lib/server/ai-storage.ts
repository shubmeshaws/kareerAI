import fs from 'fs';
import path from 'path';

// Types (Shared with client, but verified on server)
export type AIProvider = "Anthropic" | "OpenAI" | "Google Gemini" | "Groq" | "Putter.js";

export interface AIKey {
    id: string;
    provider: AIProvider;
    label: string;
    key: string;
    enabled: boolean;
    dailyLimit: number;
    usageToday: number;
    lastUsed?: string;
    createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const KEYS_FILE = path.join(DATA_DIR, 'ai-keys.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure keys file exists
if (!fs.existsSync(KEYS_FILE)) {
    fs.writeFileSync(KEYS_FILE, JSON.stringify([]));
}

export function getKeys(): AIKey[] {
    try {
        const fileContent = fs.readFileSync(KEYS_FILE, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Failed to read keys file:", error);
        return [];
    }
}

export function saveKeys(keys: AIKey[]) {
    try {
        fs.writeFileSync(KEYS_FILE, JSON.stringify(keys, null, 2));
    } catch (error) {
        console.error("Failed to save keys file:", error);
        throw new Error("Failed to save keys");
    }
}

export function addKey(keyData: Omit<AIKey, "id" | "createdAt" | "usageToday">) {
    const keys = getKeys();
    const newKey: AIKey = {
        ...keyData,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date().toISOString(),
        usageToday: 0
    };
    keys.push(newKey);
    saveKeys(keys);
    return newKey;
}

export function updateKeyUsage(id: string) {
    const keys = getKeys();
    const updated = keys.map(k => {
        if (k.id === id) {
            return {
                ...k,
                usageToday: k.usageToday + 1,
                lastUsed: new Date().toISOString()
            };
        }
        return k;
    });
    saveKeys(updated);
}

export function deleteKey(id: string) {
    const keys = getKeys();
    const filtered = keys.filter(k => k.id !== id);
    saveKeys(filtered);
}

export function toggleKey(id: string) {
    const keys = getKeys();
    const updated = keys.map(k => {
        if (k.id === id) {
            return { ...k, enabled: !k.enabled };
        }
        return k;
    });
    saveKeys(updated);
}

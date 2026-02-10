import { getKeys, updateKeyUsage, AIProvider, AIKey } from "./ai-storage";
import fs from 'fs';
import path from 'path';

// Priority Configuration
const PRIORITY_ORDER: AIProvider[] = ["Anthropic", "OpenAI", "Google Gemini", "Groq", "Putter.js"];

interface AIRequestLog {
    id: string;
    timestamp: string;
    provider: string;
    keyId: string;
    userId: string;
    feature: string;
    tokens: number;
    latency: number;
    status: "SUCCESS" | "FAILURE";
    error?: string;
}

const LOGS_FILE = path.join(process.cwd(), 'data', 'ai-logs.json');

// Ensure logs file exists
if (!fs.existsSync(LOGS_FILE)) {
    fs.writeFileSync(LOGS_FILE, JSON.stringify([]));
}

function logRequest(log: AIRequestLog) {
    try {
        const content = fs.readFileSync(LOGS_FILE, 'utf-8');
        const logs: AIRequestLog[] = JSON.parse(content);
        // Keep last 1000 logs
        const updatedLogs = [log, ...logs].slice(0, 1000);
        fs.writeFileSync(LOGS_FILE, JSON.stringify(updatedLogs, null, 2));
    } catch (e) {
        console.error("Failed to log AI request:", e);
    }
}

async function startAIRequest(
    provider: AIProvider,
    key: AIKey,
    prompt: string
): Promise<{ text: string; tokens: number }> {
    // Simulate latency and network call
    const latencyBase = {
        "Anthropic": 800,
        "OpenAI": 600,
        "Google Gemini": 400, // Faster
        "Groq": 150, // Fastest
        "Putter.js": 1200 // Slowest (Simulated)
    }[provider] || 500;

    await new Promise(resolve => setTimeout(resolve, latencyBase + Math.random() * 200));

    // Simulate random failure (10% chance) for demo purposes
    if (Math.random() < 0.1 && provider !== "Putter.js") {
        throw new Error(`Provider ${provider} internal server error`);
    }

    // Decrypt key (Simulation: remove salt)
    const salt = "kareer_secret_2024";
    // Real implementation would decrypt here. 
    // Since we store "encrypted" in file, we act as if we use it.

    return {
        text: `[${provider} Response] Processed with key ${key.label}. Analysis: ${prompt.substring(0, 50)}...`,
        tokens: Math.floor(Math.random() * 500) + 50
    };
}

export async function routeAIRequest(
    prompt: string,
    userId: string,
    feature: string
): Promise<{ provider: string; result: string; latency: number }> {
    const allKeys = getKeys();
    const startTime = Date.now();

    for (const provider of PRIORITY_ORDER) {
        // 1. Filter enabled keys for this provider
        const validKeys = allKeys.filter(k =>
            k.provider === provider &&
            k.enabled &&
            k.usageToday < k.dailyLimit
        );

        if (validKeys.length === 0) continue;

        // 2. Load Balancing (Round-Robin simulation: Pick random for now)
        // In real app, we'd track last used index in memory/Redis
        const selectedKey = validKeys[Math.floor(Math.random() * validKeys.length)];

        try {
            console.log(`[AI Router] Routing to ${provider} (Key: ${selectedKey.label})`);

            const response = await startAIRequest(provider, selectedKey, prompt);
            const latency = Date.now() - startTime;

            // 3. Update Usage & Log
            updateKeyUsage(selectedKey.id);
            logRequest({
                id: Math.random().toString(36).substring(7),
                timestamp: new Date().toISOString(),
                provider,
                keyId: selectedKey.id,
                userId,
                feature,
                tokens: response.tokens,
                latency,
                status: "SUCCESS"
            });

            return {
                provider,
                result: response.text,
                latency
            };

        } catch (error: any) {
            console.warn(`[AI Router] ${provider} failed:`, error.message);
            // Log failure
            logRequest({
                id: Math.random().toString(36).substring(7),
                timestamp: new Date().toISOString(),
                provider,
                keyId: selectedKey.id,
                userId,
                feature,
                tokens: 0,
                latency: Date.now() - startTime,
                status: "FAILURE",
                error: error.message
            });
            // Continue to next provider in loop
        }
    }

    throw new Error("AI Router Exhausted: All providers failed or no active keys available.");
}

import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});

async function main() {
    const mockFile = path.join(process.cwd(), '.mock', 'mock_users.txt');
    const fileContent = fs.readFileSync(mockFile, 'utf-8');

    const lines = fileContent.split('\n');
    let currentUser: any = {};

    console.log("Seeding users...");

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
            if (currentUser.email) {
                await upsertUser(currentUser);
                currentUser = {};
            }
            continue;
        }

        if (trimmed.startsWith('Name :')) {
            currentUser.name = trimmed.replace('Name :', '').trim();
        } else if (trimmed.startsWith('Email :')) {
            currentUser.email = trimmed.replace('Email :', '').trim();
        } else if (trimmed.startsWith('Password :')) {
            currentUser.password = trimmed.replace('Password :', '').trim(); // Ideally hash this
        }
    }

    // Handle last user if no trailing newline
    if (currentUser.email) {
        await upsertUser(currentUser);
    }

    console.log("Seeding complete.");
}

async function upsertUser(user: any) {
    try {
        const upserted = await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: {
                name: user.name,
                email: user.email,
                password: user.password,
                role: "USER",
                plan: "FREE",
            },
        });
        console.log(`Upserted user: ${upserted.email}`);
    } catch (e) {
        console.error(`Failed to upsert ${user.email}:`, e);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

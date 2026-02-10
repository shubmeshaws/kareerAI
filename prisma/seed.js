const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function main() {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);

    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    console.log("Prisma client created with PostgreSQL adapter");

    const mockFile = path.join(process.cwd(), '.mock', 'mock_users.txt');
    const fileContent = fs.readFileSync(mockFile, 'utf-8');

    const lines = fileContent.split('\n');
    let currentUser = {};

    console.log("Seeding users...");

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
            if (currentUser.email) {
                await upsertUser(prisma, currentUser);
                currentUser = {};
            }
            continue;
        }

        if (trimmed.startsWith('Name :')) {
            currentUser.name = trimmed.replace('Name :', '').trim();
        } else if (trimmed.startsWith('Email :')) {
            currentUser.email = trimmed.replace('Email :', '').trim();
        } else if (trimmed.startsWith('Password :')) {
            currentUser.password = trimmed.replace('Password :', '').trim();
        }
    }

    if (currentUser.email) {
        await upsertUser(prisma, currentUser);
    }

    console.log("Seeding complete.");
    await prisma.$disconnect();
    await pool.end();
}

async function upsertUser(prisma, user) {
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
        console.error(`Failed to upsert ${user.email}:`, e.message);
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});

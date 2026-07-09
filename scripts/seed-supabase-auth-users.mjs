#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const AUTH_EMAIL_DOMAIN = process.env.SUPABASE_AUTH_EMAIL_DOMAIN || 'brushing-master.example.com';
const inputPath = process.argv[2];

function usage() {
    console.error('Usage: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-supabase-auth-users.mjs prototype/docs/supabase_auth_users.example.json');
}

function normalizeSupabaseUrl(url) {
    return String(url || '').trim().replace(/\/$/, '');
}

function accountToAuthEmail(account) {
    const normalized = String(account || '').trim().toLowerCase();
    if (!normalized) {
        throw new Error('Account cannot be empty');
    }

    const bytes = new TextEncoder().encode(normalized);
    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
    return `bm-${hex}@${AUTH_EMAIL_DOMAIN}`;
}

async function readUsers(path) {
    const raw = await readFile(path, 'utf8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
        throw new Error('Input JSON must be an array of users');
    }
    return parsed;
}

async function createUser(user) {
    if (!user.account || !user.password) {
        throw new Error('Each user needs account and password fields');
    }

    const email = user.email || accountToAuthEmail(user.account);
    const response = await fetch(`${normalizeSupabaseUrl(SUPABASE_URL)}/auth/v1/admin/users`, {
        method: 'POST',
        headers: {
            apikey: SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password: String(user.password),
            email_confirm: true,
            user_metadata: {
                account: String(user.account),
                display_name: user.display_name || user.account,
                avatar_url: user.avatar_url || null
            }
        })
    });

    const text = await response.text();
    let payload = null;
    try {
        payload = text ? JSON.parse(text) : null;
    } catch {
        payload = { message: text };
    }

    if (!response.ok) {
        const message = payload?.message || payload?.msg || response.statusText;
        const lowerMessage = String(message).toLowerCase();
        if (response.status === 422 && (lowerMessage.includes('already') || lowerMessage.includes('registered'))) {
            return {
                account: user.account,
                email,
                id: null,
                skipped: true
            };
        }
        throw new Error(`${user.account}: ${message}`);
    }

    return {
        account: user.account,
        email,
        id: payload?.id || payload?.user?.id || null
    };
}

async function main() {
    if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !inputPath) {
        usage();
        process.exit(1);
    }

    const users = await readUsers(inputPath);
    const results = [];

    for (const user of users) {
        try {
            const result = await createUser(user);
            results.push(result);
            console.log(`${result.skipped ? 'skipped existing' : 'created'} ${result.account} -> ${result.email}`);
        } catch (error) {
            console.error(`failed ${user.account || '(missing account)'}: ${error.message}`);
            process.exitCode = 1;
        }
    }

    if (results.length > 0) {
        console.log(`done: ${results.length} user(s) created`);
    }
}

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});

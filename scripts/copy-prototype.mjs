import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, 'prototype');
const targetDir = path.join(rootDir, 'dist', 'prototype');

function shouldCopy(source) {
    const name = path.basename(source);

    if (name === '.env' || name.startsWith('.env.')) {
        return false;
    }

    if (name === 'supabase_config.local.js') {
        return false;
    }

    return true;
}

await fs.rm(targetDir, { recursive: true, force: true });
await fs.mkdir(path.dirname(targetDir), { recursive: true });
await fs.cp(sourceDir, targetDir, {
    recursive: true,
    filter: shouldCopy
});

console.log(`Copied prototype to ${path.relative(rootDir, targetDir)} without local database overrides.`);

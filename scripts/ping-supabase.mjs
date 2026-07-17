const supabaseUrl = process.env.SUPABASE_URL;
const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
    throw new Error('Missing SUPABASE_URL');
}

if (!publishableKey) {
    throw new Error('Missing SUPABASE_PUBLISHABLE_KEY');
}

function readLegacyJwtRole(key) {
    const parts = key.split('.');
    if (parts.length !== 3) return null;

    try {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
        return payload.role || null;
    } catch {
        return null;
    }
}

const legacyJwtRole = readLegacyJwtRole(publishableKey);
const isPublishableKey = publishableKey.startsWith('sb_publishable_') || legacyJwtRole === 'anon';

if (!isPublishableKey) {
    throw new Error('SUPABASE_PUBLISHABLE_KEY must be a publishable key or legacy anon key');
}

const projectUrl = new URL(supabaseUrl);
if (projectUrl.protocol !== 'https:' || projectUrl.username || projectUrl.password) {
    throw new Error('SUPABASE_URL must be a credential-free HTTPS URL');
}

const probeUrl = new URL('/rest/v1/rpc/keepalive_probe', projectUrl);
const response = await fetch(probeUrl, {
    method: 'POST',
    headers: {
        accept: 'application/json',
        apikey: publishableKey,
        'content-type': 'application/json'
    },
    body: '{}',
    signal: AbortSignal.timeout(30_000)
});

const responseBody = await response.text();

if (!response.ok) {
    throw new Error(
        `Supabase keepalive failed with HTTP ${response.status}: ${responseBody.slice(0, 500)}`
    );
}

if (responseBody.trim() !== '1') {
    throw new Error(`Unexpected Supabase keepalive response: ${responseBody.slice(0, 500)}`);
}

console.log(`Supabase keepalive succeeded at ${new Date().toISOString()}`);

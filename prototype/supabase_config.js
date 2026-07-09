/**
 * Supabase runtime configuration for the static prototype.
 *
 * The URL and publishable key point at the current live Supabase project.
 * The publishable key is safe for browser use, but it still needs to be paired
 * with RLS and grants.
 *
 * For local-only overrides, copy `supabase_config.local.example.js` to
 * `supabase_config.local.js` and fill the publishable key there.
 */
(function setupBrushingMasterSupabaseConfig(window) {
    const DEFAULT_SUPABASE_URL = 'https://bwfpcgdopalydkxydntv.supabase.co';
    const DEFAULT_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_voBqv7EF7tq0Wgn061bCdQ_uXulzdZU';
    const DEFAULT_AUTH_EMAIL_DOMAIN = 'brushing-master.example.com';

    window.BrushingMasterSupabaseConfig = window.BrushingMasterSupabaseConfig || {
        url: DEFAULT_SUPABASE_URL,
        publishableKey: DEFAULT_SUPABASE_PUBLISHABLE_KEY,
        authEmailDomain: DEFAULT_AUTH_EMAIL_DOMAIN
    };

    function getRawConfig() {
        return window.BrushingMasterSupabaseConfig || {};
    }

    function getConfig() {
        const raw = getRawConfig();
        const url = raw.url || raw.supabaseUrl || raw.SUPABASE_URL || DEFAULT_SUPABASE_URL;
        const publishableKey =
            raw.publishableKey ||
            raw.anonKey ||
            raw.supabaseAnonKey ||
            raw.SUPABASE_ANON_KEY ||
            DEFAULT_SUPABASE_PUBLISHABLE_KEY;
        const authEmailDomain = raw.authEmailDomain || DEFAULT_AUTH_EMAIL_DOMAIN;

        if (!url || !publishableKey || publishableKey === 'REPLACE_WITH_SUPABASE_PUBLISHABLE_KEY') {
            throw new Error('Supabase 配置未完成：请填写 Supabase URL 和 publishable/anon key');
        }

        return { url, publishableKey, authEmailDomain };
    }

    function accountToAuthEmail(account) {
        const normalized = String(account || '').trim().toLowerCase();
        if (!normalized) {
            throw new Error('请输入账号');
        }

        const raw = getRawConfig();
        const authEmailDomain = raw.authEmailDomain || DEFAULT_AUTH_EMAIL_DOMAIN;
        const bytes = new TextEncoder().encode(normalized);
        const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
        return `bm-${hex}@${authEmailDomain}`;
    }

    function createClient() {
        if (!window.supabase) {
            throw new Error('Supabase SDK 未加载');
        }

        const { url, publishableKey } = getConfig();
        return window.supabase.createClient(url, publishableKey);
    }

    window.BrushingMasterSupabase = {
        getConfig,
        createClient,
        accountToAuthEmail,
        defaultUrl: DEFAULT_SUPABASE_URL
    };
})(window);

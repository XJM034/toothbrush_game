-- ============================================
-- Brushing Master Supabase initial schema
-- Migrated from the previous Memfire schema.
-- ============================================
--
-- Scope:
-- - Recreates the runtime schema required by the current prototype.
-- - Does not migrate historical Memfire row data.
-- - Replaces the old custom public.users login model with Supabase Auth.
--
-- Run this in the Supabase SQL Editor for the new live Supabase project.
-- The old project hcsullmeeyiuomrsbcpv is paused past the restore window.
--
-- Auth model:
-- The login UI still asks for the legacy account string, but the browser maps
-- it to an internal Supabase Auth email. See `supabase_config.js` and
-- `scripts/seed-supabase-auth-users.mjs`.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- If an earlier prototype created a custom public.users table, keep its data
-- but remove browser-facing access. Current login must use Supabase Auth.
DO $$
BEGIN
    IF to_regclass('public.users') IS NOT NULL THEN
        EXECUTE 'REVOKE ALL ON TABLE public.users FROM PUBLIC, anon, authenticated';
        EXECUTE 'ALTER TABLE public.users ENABLE ROW LEVEL SECURITY';
    END IF;
END $$;

-- ============================================
-- User profiles
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    profile_name VARCHAR(50) NOT NULL DEFAULT '玩家',
    avatar_id VARCHAR(50) DEFAULT 'owl',

    level INTEGER DEFAULT 1,
    current_xp INTEGER DEFAULT 0,
    total_xp INTEGER DEFAULT 0,
    diamonds INTEGER DEFAULT 0,

    streak_days INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_brush_date DATE,

    total_sessions INTEGER DEFAULT 0,
    total_germs_killed INTEGER DEFAULT 0,
    total_brush_minutes INTEGER DEFAULT 0,

    selected_skin VARCHAR(50) DEFAULT 'owl',

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    is_active BOOLEAN DEFAULT TRUE,

    UNIQUE(user_id, profile_name)
);

ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS diamonds INTEGER DEFAULT 0;
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_active ON public.user_profiles(user_id, is_active);

-- ============================================
-- Brushing sessions
-- ============================================

CREATE TABLE IF NOT EXISTS public.brushing_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,

    duration_minutes INTEGER NOT NULL CHECK (duration_minutes IN (1, 2, 3)),
    germs_killed INTEGER DEFAULT 0,

    base_xp INTEGER DEFAULT 0,
    streak_bonus_xp INTEGER DEFAULT 0,
    germ_bonus_xp INTEGER DEFAULT 0,
    total_xp INTEGER DEFAULT 0,

    skin_drop VARCHAR(50),
    sticker_drop VARCHAR(50),

    session_date DATE NOT NULL DEFAULT CURRENT_DATE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,

    streak_at_session INTEGER DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_brushing_sessions_profile ON public.brushing_sessions(profile_id);
CREATE INDEX IF NOT EXISTS idx_brushing_sessions_date ON public.brushing_sessions(profile_id, session_date);

-- ============================================
-- Catalog tables
-- ============================================

CREATE TABLE IF NOT EXISTS public.achievements_catalog (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    unlock_condition TEXT,
    icon VARCHAR(50),
    icon_color VARCHAR(50),
    bg_color VARCHAR(50),
    xp_reward INTEGER DEFAULT 50,
    category VARCHAR(50) CHECK (category IN ('newbie', 'streak', 'combat', 'level', 'collection', 'skill', 'ultimate')),
    sort_order INTEGER DEFAULT 0
);

INSERT INTO public.achievements_catalog (id, name, description, unlock_condition, icon, icon_color, bg_color, xp_reward, category, sort_order) VALUES
('newbie', '刷牙新手', '欢迎加入刷牙特工队！这是你迈向健康牙齿的第一步。', '完成首次刷牙', 'fa-medal', 'text-yellow-500', 'bg-green-100', 50, 'newbie', 1),
('streak7', '连续7天', '坚持就是胜利！你已经连续一周保护了牙齿。', '连续刷牙7天', 'fa-calendar-check', 'text-blue-500', 'bg-blue-100', 100, 'streak', 2),
('streak30', '连续30天', '太棒了！刷牙已经成为了你的好习惯。', '连续刷牙30天', 'fa-fire', 'text-orange-500', 'bg-orange-100', 200, 'streak', 3),
('streak60', '全勤冠军', '风雨无阻，你是最勤勉的刷牙小冠军！', '连续刷牙60天', 'fa-gem', 'text-purple-500', 'bg-purple-100', 500, 'streak', 4),
('germbuster', '细菌克星', '细菌看到你都瑟瑟发抖！你是牙齿的守护神。', '累计消灭1000个细菌', 'fa-trophy', 'text-purple-500', 'bg-purple-100', 100, 'combat', 5),
('germlord', '细菌大帝', '你已经消灭了一万个细菌！', '累计消灭10000个细菌', 'fa-crown', 'text-yellow-500', 'bg-yellow-100', 300, 'combat', 6),
('master', '刷牙大师', '你的刷牙技巧已经达到了大师级别！', '等级达到10', 'fa-star', 'text-yellow-500', 'bg-yellow-100', 200, 'level', 7),
('legend', '传奇刷手', '超越极限，成为传奇！', '等级达到20', 'fa-rocket', 'text-red-500', 'bg-red-100', 500, 'level', 8),
('collector_skins', '皮肤收藏家', '收集所有皮肤！', '收集所有皮肤', 'fa-box', 'text-pink-500', 'bg-pink-100', 300, 'collection', 9),
('collector_stickers', '贴纸收藏家', '收集所有贴纸', '收集所有贴纸', 'fa-palette', 'text-cyan-500', 'bg-cyan-100', 300, 'collection', 10),
('super', '超级刷手', '完美刷牙！', '单次刷牙评分SS', 'fa-bolt', 'text-yellow-500', 'bg-yellow-100', 150, 'skill', 11),
('king', '刷牙王者', '至高无上的荣耀！', '获得所有其他成就', 'fa-crown', 'text-yellow-500', 'bg-gradient-to-r from-yellow-100 to-orange-100', 1000, 'ultimate', 12)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.skins_catalog (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_path VARCHAR(255),
    bg_color VARCHAR(50),
    rarity VARCHAR(20) CHECK (rarity IN ('common', 'rare', 'epic', 'legendary', 'mythic', 'limited')),
    drop_weight INTEGER DEFAULT 100,
    unlock_level INTEGER DEFAULT 0,
    is_default BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0
);

INSERT INTO public.skins_catalog (id, name, description, icon_path, bg_color, rarity, drop_weight, unlock_level, is_default, sort_order) VALUES
('owl', '猫头鹰', '智慧的化身，夜视能力让细菌无所遁形！', 'SkinSet/owl.webp', 'bg-amber-50', 'common', 100, 0, TRUE, 1),
('cat', '小猫咪', '优雅又可爱的小猫咪，用猫爪般的灵巧清洁每一颗牙齿！', 'SkinSet/cat.webp', 'bg-pink-50', 'rare', 30, 5, FALSE, 2),
('dog', '小狗狗', '忠诚勇敢的小狗狗，用坚定的毅力守护牙齿健康！', 'SkinSet/dog.webp', 'bg-orange-50', 'rare', 30, 8, FALSE, 3),
('rabbit', '小兔子', '活泼可爱的小兔子，蹦蹦跳跳地消灭所有细菌！', 'SkinSet/rabbit.webp', 'bg-blue-50', 'epic', 20, 10, FALSE, 4),
('dragon', '小龙龙', '神秘的小龙龙，喷出火焰消灭一切细菌！', 'SkinSet/dragon.png', 'bg-red-50', 'legendary', 10, 0, FALSE, 5),
('unicorn', '独角兽', '传说中的独角兽，用魔法净化口腔！', 'SkinSet/unicorn.png', 'bg-purple-50', 'mythic', 5, 0, FALSE, 6)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.stickers_catalog (
    id VARCHAR(50) PRIMARY KEY,
    emoji VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    rarity VARCHAR(20) CHECK (rarity IN ('common', 'rare', 'epic', 'legendary', 'limited')),
    drop_weight INTEGER DEFAULT 100,
    unlock_level INTEGER DEFAULT 0,
    is_default BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0
);

INSERT INTO public.stickers_catalog (id, emoji, name, rarity, drop_weight, unlock_level, is_default, sort_order) VALUES
('star', '⭐️', '金星', 'common', 100, 0, TRUE, 1),
('heart', '💖', '爱心', 'common', 100, 0, TRUE, 2),
('sparkle', '✨', '闪闪', 'common', 100, 0, TRUE, 3),
('rainbow', '🌈', '彩虹', 'common', 100, 0, TRUE, 4),
('cupcake', '🧁', '杯子蛋糕', 'common', 100, 0, TRUE, 5),
('crown', '👑', '皇冠', 'rare', 25, 3, FALSE, 6),
('rocket', '🚀', '火箭', 'rare', 25, 6, FALSE, 7),
('trophy', '🏆', '奖杯', 'epic', 20, 9, FALSE, 8),
('unicorn', '🦄', '独角兽', 'legendary', 15, 0, FALSE, 9),
('dragon', '🐲', '小龙', 'legendary', 10, 0, FALSE, 10),
('snowflake', '❄️', '雪花', 'limited', 0, 0, FALSE, 11),
('pumpkin', '🎃', '南瓜', 'limited', 0, 0, FALSE, 12)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- User-owned collection/progress tables
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    achievement_id VARCHAR(50) NOT NULL REFERENCES public.achievements_catalog(id),
    progress_current INTEGER DEFAULT 0,
    progress_target INTEGER DEFAULT 0,
    is_unlocked BOOLEAN DEFAULT FALSE,
    unlocked_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(profile_id, achievement_id)
);

CREATE INDEX IF NOT EXISTS idx_user_achievements_profile ON public.user_achievements(profile_id);

CREATE TABLE IF NOT EXISTS public.user_skins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    skin_id VARCHAR(50) NOT NULL REFERENCES public.skins_catalog(id),
    obtained_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    obtained_from VARCHAR(50) CHECK (obtained_from IN ('default', 'drop', 'level_unlock', 'purchase', 'event')),
    UNIQUE(profile_id, skin_id)
);

CREATE INDEX IF NOT EXISTS idx_user_skins_profile ON public.user_skins(profile_id);

CREATE TABLE IF NOT EXISTS public.user_stickers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    sticker_id VARCHAR(50) NOT NULL REFERENCES public.stickers_catalog(id),
    obtained_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    obtained_from VARCHAR(50) CHECK (obtained_from IN ('default', 'drop', 'level_unlock', 'purchase', 'event')),
    UNIQUE(profile_id, sticker_id)
);

CREATE INDEX IF NOT EXISTS idx_user_stickers_profile ON public.user_stickers(profile_id);

-- ============================================
-- updated_at trigger
-- ============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- RLS and Data API grants
-- ============================================

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brushing_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skins_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stickers_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stickers ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE
    public.user_profiles,
    public.brushing_sessions,
    public.user_achievements,
    public.user_skins,
    public.user_stickers,
    public.achievements_catalog,
    public.skins_catalog,
    public.stickers_catalog
FROM PUBLIC, anon;

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE
    public.user_profiles,
    public.brushing_sessions,
    public.user_achievements,
    public.user_skins,
    public.user_stickers
TO authenticated;
GRANT SELECT ON TABLE
    public.achievements_catalog,
    public.skins_catalog,
    public.stickers_catalog
TO authenticated;

REVOKE INSERT, UPDATE, DELETE ON TABLE
    public.achievements_catalog,
    public.skins_catalog,
    public.stickers_catalog
FROM authenticated;

DROP POLICY IF EXISTS "own_profiles_select" ON public.user_profiles;
CREATE POLICY "own_profiles_select"
ON public.user_profiles FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "own_profiles_insert" ON public.user_profiles;
CREATE POLICY "own_profiles_insert"
ON public.user_profiles FOR INSERT
TO authenticated
WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "own_profiles_update" ON public.user_profiles;
CREATE POLICY "own_profiles_update"
ON public.user_profiles FOR UPDATE
TO authenticated
USING (user_id = (SELECT auth.uid()))
WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "own_profiles_delete" ON public.user_profiles;
CREATE POLICY "own_profiles_delete"
ON public.user_profiles FOR DELETE
TO authenticated
USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "own_sessions_all" ON public.brushing_sessions;
CREATE POLICY "own_sessions_all"
ON public.brushing_sessions FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE user_profiles.id = brushing_sessions.profile_id
          AND user_profiles.user_id = (SELECT auth.uid())
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE user_profiles.id = brushing_sessions.profile_id
          AND user_profiles.user_id = (SELECT auth.uid())
    )
);

DROP POLICY IF EXISTS "own_user_achievements_all" ON public.user_achievements;
CREATE POLICY "own_user_achievements_all"
ON public.user_achievements FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE user_profiles.id = user_achievements.profile_id
          AND user_profiles.user_id = (SELECT auth.uid())
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE user_profiles.id = user_achievements.profile_id
          AND user_profiles.user_id = (SELECT auth.uid())
    )
);

DROP POLICY IF EXISTS "own_user_skins_all" ON public.user_skins;
CREATE POLICY "own_user_skins_all"
ON public.user_skins FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE user_profiles.id = user_skins.profile_id
          AND user_profiles.user_id = (SELECT auth.uid())
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE user_profiles.id = user_skins.profile_id
          AND user_profiles.user_id = (SELECT auth.uid())
    )
);

DROP POLICY IF EXISTS "own_user_stickers_all" ON public.user_stickers;
CREATE POLICY "own_user_stickers_all"
ON public.user_stickers FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE user_profiles.id = user_stickers.profile_id
          AND user_profiles.user_id = (SELECT auth.uid())
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE user_profiles.id = user_stickers.profile_id
          AND user_profiles.user_id = (SELECT auth.uid())
    )
);

DROP POLICY IF EXISTS "catalog_authenticated_select" ON public.achievements_catalog;
CREATE POLICY "catalog_authenticated_select"
ON public.achievements_catalog FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "skins_catalog_authenticated_select" ON public.skins_catalog;
CREATE POLICY "skins_catalog_authenticated_select"
ON public.skins_catalog FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "stickers_catalog_authenticated_select" ON public.stickers_catalog;
CREATE POLICY "stickers_catalog_authenticated_select"
ON public.stickers_catalog FOR SELECT
TO authenticated
USING (true);

-- Minimal public RPC for external Free project activity checks. It performs a
-- real query without reading or mutating application data.
CREATE OR REPLACE FUNCTION public.keepalive_probe()
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
    SELECT 1;
$$;

COMMENT ON FUNCTION public.keepalive_probe() IS
    'Returns 1 for low-impact scheduled project activity checks.';

REVOKE ALL ON FUNCTION public.keepalive_probe() FROM PUBLIC, authenticated;
GRANT USAGE ON SCHEMA public TO anon;
GRANT EXECUTE ON FUNCTION public.keepalive_probe() TO anon;

-- Reload PostgREST schema cache after DDL/grant changes.
NOTIFY pgrst, 'reload schema';

-- Optional smoke checks after running:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
-- SELECT id, name FROM public.skins_catalog ORDER BY sort_order;

-- ============================================
-- 刷牙大师 (Brushing Master) 数据库结构
-- Memfire (Supabase) 完整版 v2.0
-- ============================================

-- 注意：请按顺序在 Memfire SQL 编辑器中执行以下语句
-- 每个部分可以单独执行，建议逐步执行并检查结果

-- ============================================
-- 第一部分：扩展 users 表 (如果需要)
-- ============================================

-- 检查 users 表是否存在必要字段，如果没有则添加
-- 注意：如果字段已存在会报错，可以忽略

ALTER TABLE public.users ADD COLUMN IF NOT EXISTS avatar_id VARCHAR(50) DEFAULT 'owl';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ============================================
-- 第二部分：用户档案表 (user_profiles)
-- 存储用户等级、经验值等游戏进度
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    profile_name VARCHAR(50) NOT NULL DEFAULT '玩家',
    avatar_id VARCHAR(50) DEFAULT 'owl',
    
    -- 等级系统
    level INTEGER DEFAULT 1,
    current_xp INTEGER DEFAULT 0,
    total_xp INTEGER DEFAULT 0,
    
    -- 连续刷牙
    streak_days INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_brush_date DATE,
    
    -- 统计数据
    total_sessions INTEGER DEFAULT 0,
    total_germs_killed INTEGER DEFAULT 0,
    total_brush_minutes INTEGER DEFAULT 0,
    
    -- 选中的皮肤
    selected_skin VARCHAR(50) DEFAULT 'owl',
    
    -- 时间戳
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- 是否为当前激活的档案
    is_active BOOLEAN DEFAULT TRUE,
    
    UNIQUE(user_id, profile_name)
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_active ON public.user_profiles(user_id, is_active);

-- ============================================
-- 第三部分：刷牙会话记录表 (brushing_sessions)
-- 记录每次刷牙的详细数据
-- ============================================

CREATE TABLE IF NOT EXISTS public.brushing_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    
    -- 会话数据
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes IN (1, 2, 3)),
    germs_killed INTEGER DEFAULT 0,
    
    -- XP 计算明细
    base_xp INTEGER DEFAULT 0,
    streak_bonus_xp INTEGER DEFAULT 0,
    germ_bonus_xp INTEGER DEFAULT 0,
    total_xp INTEGER DEFAULT 0,
    
    -- 掉落
    skin_drop VARCHAR(50),
    sticker_drop VARCHAR(50),
    
    -- 时间
    session_date DATE NOT NULL DEFAULT CURRENT_DATE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    
    -- 连续天数（记录时的快照）
    streak_at_session INTEGER DEFAULT 1
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_brushing_sessions_profile ON public.brushing_sessions(profile_id);
CREATE INDEX IF NOT EXISTS idx_brushing_sessions_date ON public.brushing_sessions(profile_id, session_date);

-- ============================================
-- 第四部分：成就定义表 (achievements_catalog)
-- 定义所有可用成就
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

-- 插入成就数据
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
('collector_stickers', '贴纸收藏家', '收集所有贴纸！', '收集所有贴纸', 'fa-palette', 'text-cyan-500', 'bg-cyan-100', 300, 'collection', 10),
('super', '超级刷手', '完美刷牙！', '单次刷牙评分SS', 'fa-bolt', 'text-yellow-500', 'bg-yellow-100', 150, 'skill', 11),
('king', '刷牙王者', '至高无上的荣耀！', '获得所有其他成就', 'fa-crown', 'text-yellow-500', 'bg-gradient-to-r from-yellow-100 to-orange-100', 1000, 'ultimate', 12)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 第五部分：用户成就表 (user_achievements)
-- 记录用户解锁的成就
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    achievement_id VARCHAR(50) NOT NULL REFERENCES public.achievements_catalog(id),
    
    -- 进度追踪（用于可累计的成就）
    progress_current INTEGER DEFAULT 0,
    progress_target INTEGER DEFAULT 0,
    
    -- 状态
    is_unlocked BOOLEAN DEFAULT FALSE,
    unlocked_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(profile_id, achievement_id)
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_user_achievements_profile ON public.user_achievements(profile_id);

-- ============================================
-- 第六部分：皮肤目录表 (skins_catalog)
-- 定义所有可用皮肤
-- ============================================

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

-- 插入皮肤数据
INSERT INTO public.skins_catalog (id, name, description, icon_path, bg_color, rarity, drop_weight, unlock_level, is_default, sort_order) VALUES
('owl', '猫头鹰', '智慧的化身，夜视能力让细菌无所遁形！', 'SkinSet/owl.webp', 'bg-amber-50', 'common', 100, 0, TRUE, 1),
('cat', '小猫咪', '优雅又可爱的小猫咪，用猫爪般的灵巧清洁每一颗牙齿！', 'SkinSet/cat.webp', 'bg-pink-50', 'rare', 30, 5, FALSE, 2),
('dog', '小狗狗', '忠诚勇敢的小狗狗，用坚定的毅力守护牙齿健康！', 'SkinSet/dog.webp', 'bg-orange-50', 'rare', 30, 8, FALSE, 3),
('rabbit', '小兔子', '活泼可爱的小兔子，蹦蹦跳跳地消灭所有细菌！', 'SkinSet/rabbit.webp', 'bg-blue-50', 'epic', 20, 10, FALSE, 4),
('dragon', '小龙龙', '神秘的小龙龙，喷出火焰消灭一切细菌！', 'SkinSet/dragon.png', 'bg-red-50', 'legendary', 10, 0, FALSE, 5),
('unicorn', '独角兽', '传说中的独角兽，用魔法净化口腔！', 'SkinSet/unicorn.png', 'bg-purple-50', 'mythic', 5, 0, FALSE, 6)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 第七部分：用户皮肤表 (user_skins)
-- 记录用户拥有的皮肤
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_skins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    skin_id VARCHAR(50) NOT NULL REFERENCES public.skins_catalog(id),
    
    obtained_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    obtained_from VARCHAR(50) CHECK (obtained_from IN ('default', 'drop', 'level_unlock', 'purchase', 'event')),
    
    UNIQUE(profile_id, skin_id)
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_user_skins_profile ON public.user_skins(profile_id);

-- ============================================
-- 第八部分：贴纸目录表 (stickers_catalog)
-- 定义所有可用贴纸
-- ============================================

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

-- 插入贴纸数据
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
-- 第九部分：用户贴纸表 (user_stickers)
-- 记录用户拥有的贴纸
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_stickers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    sticker_id VARCHAR(50) NOT NULL REFERENCES public.stickers_catalog(id),
    
    obtained_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    obtained_from VARCHAR(50) CHECK (obtained_from IN ('default', 'drop', 'level_unlock', 'purchase', 'event')),
    
    UNIQUE(profile_id, sticker_id)
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_user_stickers_profile ON public.user_stickers(profile_id);

-- ============================================
-- 第十部分：RLS (Row Level Security) 策略
-- 确保用户只能访问自己的数据
-- ============================================

-- 启用 RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brushing_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stickers ENABLE ROW LEVEL SECURITY;

-- 由于使用自定义 users 表而非 Supabase Auth，我们允许匿名读写
-- 在实际生产环境中应该使用更严格的策略

CREATE POLICY "允许所有操作 profiles" ON public.user_profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "允许所有操作 sessions" ON public.brushing_sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "允许所有操作 achievements" ON public.user_achievements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "允许所有操作 skins" ON public.user_skins FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "允许所有操作 stickers" ON public.user_stickers FOR ALL USING (true) WITH CHECK (true);

-- 目录表只允许读取
CREATE POLICY "只读成就目录" ON public.achievements_catalog FOR SELECT USING (true);
CREATE POLICY "只读皮肤目录" ON public.skins_catalog FOR SELECT USING (true);
CREATE POLICY "只读贴纸目录" ON public.stickers_catalog FOR SELECT USING (true);

-- ============================================
-- 第十一部分：触发器函数
-- 自动更新 updated_at 字段
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为 user_profiles 创建触发器
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 完成！
-- ============================================
-- 执行完成后，你应该看到以下表：
-- 1. user_profiles - 用户档案/等级
-- 2. brushing_sessions - 刷牙记录
-- 3. achievements_catalog - 成就目录
-- 4. user_achievements - 用户成就
-- 5. skins_catalog - 皮肤目录
-- 6. user_skins - 用户皮肤
-- 7. stickers_catalog - 贴纸目录
-- 8. user_stickers - 用户贴纸

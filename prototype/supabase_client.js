/**
 * Supabase/Memfire 客户端模块
 * 所有页面共享使用
 */

// Memfire 配置
const SUPABASE_URL = 'https://d555hb0g91htqli40010.baseapi.memfiredb.com';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImV4cCI6MzM0MzI4MDA0NCwiaWF0IjoxNzY2NDgwMDQ0LCJpc3MiOiJzdXBhYmFzZSJ9.KvoeBCiyrUNKBP7PDDLyMvl6Wc0POZR-HDaiFHPcgiI';

// Supabase 客户端实例（延迟初始化）
let _supabaseClient = null;

function getSupabaseClient() {
    if (!_supabaseClient && typeof window !== 'undefined' && window.supabase) {
        _supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return _supabaseClient;
}

// ============================================
// 用户认证相关
// ============================================

/**
 * 获取当前登录用户
 * @returns {Object|null} 用户信息或 null
 */
function getCurrentUser() {
    const userStr = localStorage.getItem('brushing_user');
    if (!userStr) return null;
    try {
        return JSON.parse(userStr);
    } catch (e) {
        return null;
    }
}

/**
 * 检查是否已登录
 * @returns {boolean}
 */
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// ============================================
// 用户档案 (Profile) 相关
// ============================================

/**
 * 获取用户的活跃档案（不自动创建）
 * @param {number} userId - 用户ID
 * @returns {Promise<Object|null>} 档案数据或 null
 */
async function getActiveProfile(userId) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase 未初始化');

    // 查询活跃档案
    let { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .single();

    if (error && error.code === 'PGRST116') {
        // 没有活跃档案，返回 null（用户需要去设置页面创建）
        return null;
    }

    if (error) throw error;
    return profile;
}

/**
 * 获取用户的所有档案
 * @param {number} userId - 用户ID
 * @returns {Promise<Array>} 档案列表
 */
async function getAllProfiles(userId) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase 未初始化');

    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
}

/**
 * 创建新档案
 * @param {number} userId - 用户ID
 * @param {string} profileName - 档案名称
 * @param {string} avatarId - 头像ID
 * @returns {Promise<Object>} 新创建的档案
 */
async function createProfile(userId, profileName, avatarId = 'owl') {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase 未初始化');

    // 检查是否是第一个档案（如果是则设为活跃）
    const existingProfiles = await getAllProfiles(userId);
    const isFirst = existingProfiles.length === 0;

    const { data: newProfile, error: createError } = await supabase
        .from('user_profiles')
        .insert({
            user_id: userId,
            profile_name: profileName,
            avatar_id: avatarId,
            level: 1,
            current_xp: 0,
            total_xp: 0,
            streak_days: 0,
            selected_skin: 'owl',
            is_active: isFirst  // 第一个档案自动设为活跃
        })
        .select()
        .single();

    if (createError) throw createError;

    // 为新档案添加默认皮肤
    await supabase.from('user_skins').insert({
        profile_id: newProfile.id,
        skin_id: 'owl',
        obtained_from: 'default'
    });

    // 添加默认贴纸
    const defaultStickers = ['star', 'heart', 'sparkle', 'rainbow', 'cupcake'];
    for (const stickerId of defaultStickers) {
        await supabase.from('user_stickers').insert({
            profile_id: newProfile.id,
            sticker_id: stickerId,
            obtained_from: 'default'
        });
    }

    return newProfile;
}

/**
 * 切换活跃档案
 * @param {number} userId - 用户ID
 * @param {string} profileId - 要激活的档案ID
 * @returns {Promise<Object>} 激活的档案
 */
async function setActiveProfile(userId, profileId) {
    const supabase = getSupabaseClient();

    // 先将所有档案设为非活跃
    await supabase
        .from('user_profiles')
        .update({ is_active: false })
        .eq('user_id', userId);

    // 设置指定档案为活跃
    const { data, error } = await supabase
        .from('user_profiles')
        .update({ is_active: true })
        .eq('id', profileId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * 更新用户档案
 * @param {string} profileId - 档案ID
 * @param {Object} updates - 要更新的字段
 * @returns {Promise<Object>} 更新后的档案
 */
async function updateProfile(profileId, updates) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', profileId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * 计算升级所需XP
 * @param {number} level - 当前等级
 * @returns {number} 升级所需XP
 */
function getMaxXPForLevel(level) {
    return 100 + (level - 1) * 50;
}

// ============================================
// 刷牙会话相关
// ============================================

/**
 * 保存刷牙会话
 * @param {string} profileId - 档案ID
 * @param {Object} sessionData - 会话数据
 * @returns {Promise<Object>} 保存的会话
 */
async function saveBrushingSession(profileId, sessionData) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('brushing_sessions')
        .insert({
            profile_id: profileId,
            duration_minutes: sessionData.duration,
            germs_killed: sessionData.germsKilled,
            base_xp: sessionData.baseXP,
            streak_bonus_xp: sessionData.streakBonusXP,
            germ_bonus_xp: sessionData.germBonusXP,
            total_xp: sessionData.totalXP,
            skin_drop: sessionData.skinDrop,
            sticker_drop: sessionData.stickerDrop,
            streak_at_session: sessionData.streakDays,
            completed_at: new Date().toISOString()
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * 获取用户的刷牙记录（用于日历显示）
 * @param {string} profileId - 档案ID
 * @param {number} year - 年份
 * @param {number} month - 月份 (0-11)
 * @returns {Promise<Object>} 日期->状态 的映射
 */
async function getBrushingRecords(profileId, year, month) {
    const supabase = getSupabaseClient();

    const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('brushing_sessions')
        .select('session_date')
        .eq('profile_id', profileId)
        .gte('session_date', startDate)
        .lte('session_date', endDate);

    if (error) throw error;

    // 转换为日期->状态映射
    const records = {};
    if (data) {
        data.forEach(session => {
            records[session.session_date] = 'done';
        });
    }
    return records;
}

// ============================================
// 皮肤相关
// ============================================

/**
 * 获取用户拥有的皮肤
 * @param {string} profileId - 档案ID
 * @returns {Promise<Array>} 皮肤列表
 */
async function getUserSkins(profileId) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('user_skins')
        .select('skin_id, obtained_at, obtained_from')
        .eq('profile_id', profileId);

    if (error) throw error;
    return data || [];
}

/**
 * 添加皮肤到用户收藏
 * @param {string} profileId - 档案ID
 * @param {string} skinId - 皮肤ID
 * @param {string} obtainedFrom - 获取方式
 * @returns {Promise<Object>}
 */
async function addUserSkin(profileId, skinId, obtainedFrom = 'drop') {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('user_skins')
        .insert({
            profile_id: profileId,
            skin_id: skinId,
            obtained_from: obtainedFrom
        })
        .select()
        .single();

    if (error && error.code !== '23505') throw error; // 忽略重复键错误
    return data;
}

// ============================================
// 成就相关
// ============================================

/**
 * 获取用户的成就进度
 * @param {string} profileId - 档案ID
 * @returns {Promise<Array>} 成就列表
 */
async function getUserAchievements(profileId) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('user_achievements')
        .select(`
            achievement_id,
            progress_current,
            progress_target,
            is_unlocked,
            unlocked_at
        `)
        .eq('profile_id', profileId);

    if (error) throw error;
    return data || [];
}

/**
 * 解锁成就
 * @param {string} profileId - 档案ID
 * @param {string} achievementId - 成就ID
 * @returns {Promise<Object>}
 */
async function unlockAchievement(profileId, achievementId) {
    const supabase = getSupabaseClient();

    // 先检查是否已存在
    const { data: existing } = await supabase
        .from('user_achievements')
        .select('id, is_unlocked')
        .eq('profile_id', profileId)
        .eq('achievement_id', achievementId)
        .single();

    if (existing && existing.is_unlocked) {
        return existing; // 已解锁
    }

    if (existing) {
        // 更新为已解锁
        const { data, error } = await supabase
            .from('user_achievements')
            .update({
                is_unlocked: true,
                unlocked_at: new Date().toISOString()
            })
            .eq('id', existing.id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    // 创建新记录
    const { data, error } = await supabase
        .from('user_achievements')
        .insert({
            profile_id: profileId,
            achievement_id: achievementId,
            is_unlocked: true,
            unlocked_at: new Date().toISOString()
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

// ============================================
// 贴纸相关
// ============================================

/**
 * 获取用户拥有的贴纸
 * @param {string} profileId - 档案ID
 * @returns {Promise<Array>} 贴纸列表
 */
async function getUserStickers(profileId) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('user_stickers')
        .select('sticker_id, obtained_at, obtained_from')
        .eq('profile_id', profileId);

    if (error) throw error;
    return data || [];
}

/**
 * 添加贴纸到用户收藏
 * @param {string} profileId - 档案ID
 * @param {string} stickerId - 贴纸ID
 * @param {string} obtainedFrom - 获取方式
 * @returns {Promise<Object>}
 */
async function addUserSticker(profileId, stickerId, obtainedFrom = 'drop') {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('user_stickers')
        .insert({
            profile_id: profileId,
            sticker_id: stickerId,
            obtained_from: obtainedFrom
        })
        .select()
        .single();

    if (error && error.code !== '23505') throw error; // 忽略重复键错误
    return data;
}

// ============================================
// 导出全局对象
// ============================================

window.BrushingMasterDB = {
    // 认证
    getCurrentUser,
    isLoggedIn,

    // 档案
    getActiveProfile,
    getAllProfiles,
    createProfile,
    setActiveProfile,
    updateProfile,
    getMaxXPForLevel,

    // 刷牙会话
    saveBrushingSession,
    getBrushingRecords,

    // 皮肤
    getUserSkins,
    addUserSkin,

    // 成就
    getUserAchievements,
    unlockAchievement,

    // 贴纸
    getUserStickers,
    addUserSticker,

    // Supabase 客户端
    getSupabaseClient
};

console.log('BrushingMasterDB 模块已加载');

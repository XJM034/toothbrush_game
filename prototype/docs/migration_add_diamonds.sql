-- ============================================
-- 刷牙大师 (Brushing Master) 数据库迁移
-- 添加 diamonds (金币) 字段到 user_profiles 表
-- ============================================

-- 执行步骤：
-- 1. 登录 Memfire 数据库控制台
-- 2. 打开 SQL 编辑器
-- 3. 复制并执行以下 SQL 语句

-- 添加 diamonds 列（如果不存在）
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS diamonds INTEGER DEFAULT 0;

-- 验证列已添加
-- SELECT id, profile_name, total_xp, diamonds FROM public.user_profiles LIMIT 5;

-- ============================================
-- 完成！
-- 现在可以正确保存和读取金币数据了
-- ============================================

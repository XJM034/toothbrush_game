-- 添加新用户
INSERT INTO public.users (account, password, display_name) 
VALUES ('新账号', '新密码', '用户名称');

-- 修改密码
UPDATE public.users SET password = '新密码' WHERE account = '13800138000';

-- 禁用用户
UPDATE public.users SET is_active = FALSE WHERE account = '13800138000';
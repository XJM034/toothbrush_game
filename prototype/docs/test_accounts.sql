-- Legacy Memfire/custom-users seed reference only.
--
-- Current Supabase login uses Supabase Auth. Seed test users with:
-- SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
--   node scripts/seed-supabase-auth-users.mjs prototype/docs/supabase_auth_users.example.json
--
-- Do not apply this file to the current Supabase project.

INSERT INTO public.users (account, password, created_at, updated_at) VALUES
('REPLACE_WITH_TEST_ACCOUNT_1', 'REPLACE_WITH_LOCAL_TEST_PASSWORD_1', NOW(), NOW()),
('REPLACE_WITH_TEST_ACCOUNT_2', 'REPLACE_WITH_LOCAL_TEST_PASSWORD_2', NOW(), NOW()),
('REPLACE_WITH_TEST_ACCOUNT_3', 'REPLACE_WITH_LOCAL_TEST_PASSWORD_3', NOW(), NOW()),
('REPLACE_WITH_TEST_ACCOUNT_4', 'REPLACE_WITH_LOCAL_TEST_PASSWORD_4', NOW(), NOW()),
('REPLACE_WITH_TEST_ACCOUNT_5', 'REPLACE_WITH_LOCAL_TEST_PASSWORD_5', NOW(), NOW());

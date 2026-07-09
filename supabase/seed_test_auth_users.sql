-- Prototype-only Auth test users.
--
-- This seed is intentionally not part of migrations. It creates the same
-- placeholder accounts documented in prototype/docs/supabase_auth_users.example.json
-- for local QA and prototype demos. Replace placeholders in a local copy before
-- applying this seed; do not commit real test passwords.

WITH input(account, password, display_name) AS (
    VALUES
        ('REPLACE_WITH_TEST_ACCOUNT_1', 'REPLACE_WITH_LOCAL_TEST_PASSWORD_1', '测试玩家 1'),
        ('REPLACE_WITH_TEST_ACCOUNT_2', 'REPLACE_WITH_LOCAL_TEST_PASSWORD_2', '测试玩家 2'),
        ('REPLACE_WITH_TEST_ACCOUNT_3', 'REPLACE_WITH_LOCAL_TEST_PASSWORD_3', '测试玩家 3'),
        ('REPLACE_WITH_TEST_ACCOUNT_4', 'REPLACE_WITH_LOCAL_TEST_PASSWORD_4', '测试玩家 4'),
        ('REPLACE_WITH_TEST_ACCOUNT_5', 'REPLACE_WITH_LOCAL_TEST_PASSWORD_5', '测试玩家 5')
), prepared AS (
    SELECT
        COALESCE(existing.id, gen_random_uuid()) AS id,
        input.account,
        input.password,
        input.display_name,
        'bm-' || encode(convert_to(lower(input.account), 'UTF8'), 'hex') || '@brushing-master.example.com' AS email
    FROM input
    LEFT JOIN auth.users existing
        ON existing.raw_user_meta_data ->> 'account' = input.account
), inserted_users AS (
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        confirmation_token,
        recovery_token,
        email_change_token_new,
        email_change,
        reauthentication_token,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        is_sso_user,
        is_anonymous
    )
    SELECT
        '00000000-0000-0000-0000-000000000000'::uuid,
        prepared.id,
        'authenticated',
        'authenticated',
        prepared.email,
        crypt(prepared.password, gen_salt('bf')),
        NOW(),
        '',
        '',
        '',
        '',
        '',
        '{"provider":"email","providers":["email"]}'::jsonb,
        jsonb_build_object('account', prepared.account, 'display_name', prepared.display_name),
        NOW(),
        NOW(),
        FALSE,
        FALSE
    FROM prepared
    WHERE NOT EXISTS (
        SELECT 1 FROM auth.users existing
        WHERE existing.id = prepared.id OR existing.email = prepared.email
    )
    RETURNING id, email
), updated_users AS (
    UPDATE auth.users
    SET confirmation_token = COALESCE(confirmation_token, ''),
        recovery_token = COALESCE(recovery_token, ''),
        email_change_token_new = COALESCE(email_change_token_new, ''),
        email_change = COALESCE(email_change, ''),
        reauthentication_token = COALESCE(reauthentication_token, ''),
        updated_at = NOW()
    WHERE raw_user_meta_data ? 'account'
    RETURNING id
), ensured_identities AS (
    INSERT INTO auth.identities (
        provider_id,
        user_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    )
    SELECT
        prepared.id::text,
        prepared.id,
        jsonb_build_object(
            'sub', prepared.id::text,
            'email', prepared.email,
            'email_verified', true,
            'phone_verified', false
        ),
        'email',
        NOW(),
        NOW(),
        NOW()
    FROM prepared
    ON CONFLICT (provider_id, provider) DO UPDATE
    SET identity_data = EXCLUDED.identity_data,
        updated_at = NOW()
    RETURNING user_id
)
SELECT
    (SELECT COUNT(*) FROM inserted_users) AS inserted_users,
    (SELECT COUNT(*) FROM updated_users) AS updated_users,
    (SELECT COUNT(*) FROM ensured_identities) AS ensured_identities,
    (SELECT COUNT(*) FROM prepared) AS requested_users;

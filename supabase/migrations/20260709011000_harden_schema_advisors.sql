-- Address Supabase advisor findings after the initial Auth/RLS migration.

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id
    ON public.user_achievements(achievement_id);

CREATE INDEX IF NOT EXISTS idx_user_skins_skin_id
    ON public.user_skins(skin_id);

CREATE INDEX IF NOT EXISTS idx_user_stickers_sticker_id
    ON public.user_stickers(sticker_id);

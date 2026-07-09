-- Tighten Data API grants for read-only catalog tables.
--
-- RLS already prevented authenticated users from mutating catalog rows because
-- only SELECT policies exist. These revokes also make the table privileges
-- match the intended access model: user-owned tables are writable, catalog
-- tables are read-only.

REVOKE ALL ON TABLE
    public.achievements_catalog,
    public.skins_catalog,
    public.stickers_catalog
FROM PUBLIC, anon;

REVOKE INSERT, UPDATE, DELETE ON TABLE
    public.achievements_catalog,
    public.skins_catalog,
    public.stickers_catalog
FROM authenticated;

GRANT SELECT ON TABLE
    public.achievements_catalog,
    public.skins_catalog,
    public.stickers_catalog
TO authenticated;

NOTIFY pgrst, 'reload schema';

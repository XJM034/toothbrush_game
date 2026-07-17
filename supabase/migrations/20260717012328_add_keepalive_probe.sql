-- Minimal public RPC used by the scheduled keepalive workflow.
--
-- The function performs a real database query without reading or mutating
-- application data. It intentionally uses the low-privilege anon role so the
-- workflow only needs the browser-safe publishable key.

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

NOTIFY pgrst, 'reload schema';

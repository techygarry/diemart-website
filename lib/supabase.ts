import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

/**
 * Server-side Supabase client. Only ever imported from API routes.
 *
 * Prefers server-only env vars (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY) so the
 * key never ships to the browser bundle. Falls back to the NEXT_PUBLIC_* anon
 * pair for backwards compatibility — if you are still on the anon key, the
 * `inquiries` table MUST have RLS enabled with insert-only access for `anon`
 * (no select/update/delete), otherwise submitted customer PII is publicly
 * readable via the Supabase REST API.
 */
export function getSupabase() {
  if (!_supabase) {
    const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.SUPABASE_SERVICE_ROLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error('Supabase URL and key must be set in environment variables');
    }
    _supabase = createClient(url, key, {
      auth: { persistSession: false },
    });
  }
  return _supabase;
}

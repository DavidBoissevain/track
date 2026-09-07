/**
 * Read as static property access, never `process.env[name]`. Next inlines
 * NEXT_PUBLIC_ vars at build time by matching the literal text, so a dynamic
 * lookup silently comes back undefined in the browser.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY,
);

/** Checked when a client is built, not at import time, so a missing key does
 *  not take down pages that have nothing to do with auth. */
export function assertSupabaseEnv() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured. Copy .env.example to .env.local and fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    );
  }
}

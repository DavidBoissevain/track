import { createBrowserClient } from "@supabase/ssr";

import {
  assertSupabaseEnv,
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_URL,
} from "./env";

/** Supabase client for Client Components, running in the browser. */
export function createClient() {
  assertSupabaseEnv();
  return createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}

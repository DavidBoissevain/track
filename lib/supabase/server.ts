import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import {
  assertSupabaseEnv,
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_URL,
} from "./env";

/**
 * Supabase client for Server Components, Server Actions and Route Handlers.
 * Build a fresh one per request, never share it across requests.
 *
 * `cookies()` is async in Next 16, so it is awaited here and this function
 * has to be awaited by its callers.
 */
export async function createClient() {
  assertSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Components are not allowed to write cookies. Server
          // Actions and Route Handlers are, so this only swallows the
          // render case, where proxy.ts has already refreshed the session.
        }
      },
    },
  });
}

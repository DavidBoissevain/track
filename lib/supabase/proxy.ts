import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import {
  isSupabaseConfigured,
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_URL,
} from "./env";

/** Signed out visitors are sent to /login from here. */
const PROTECTED_PREFIXES = ["/app"];
/** Signed in visitors are sent to /app from here. */
const AUTH_ROUTES = ["/login", "/register"];

/**
 * Refreshes the auth token on every request and writes the new cookies back.
 * Without this, Server Components would keep reading an expired session,
 * which shows up as random logouts rather than as an obvious error.
 *
 * The redirects here are an optimistic check only. Next's own docs are clear
 * that Proxy is not an authorisation layer, so /app checks again on the
 * server before it renders anything.
 */
export async function updateSession(request: NextRequest) {
  // Without keys there is nothing to refresh, and the marketing pages should
  // still render rather than throwing on every request.
  if (!isSupabaseConfigured) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
        // These are no-cache headers. A response that carries a Set-Cookie
        // for a session must never be cached by a CDN, or one visitor gets
        // served another visitor's token.
        Object.entries(headers).forEach(([key, value]) =>
          response.headers.set(key, value),
        );
      },
    },
  });

  // Has to run before the response is finished. A refresh that lands after
  // the response is committed cannot be written to cookies and is lost.
  const { data } = await supabase.auth.getClaims();
  const signedIn = Boolean(data?.claims);

  const { pathname } = request.nextUrl;
  const wantsApp = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  const wantsAuthPage = AUTH_ROUTES.includes(pathname);

  if (!signedIn && wantsApp) {
    return redirectKeepingCookies(request, response, "/login");
  }
  if (signedIn && wantsAuthPage) {
    return redirectKeepingCookies(request, response, "/app");
  }

  return response;
}

/**
 * A redirect is a brand new response, so any cookies the refresh just set
 * have to be copied onto it or the fresh session is thrown away.
 */
function redirectKeepingCookies(
  request: NextRequest,
  response: NextResponse,
  pathname: string,
) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";

  const redirectResponse = NextResponse.redirect(url);
  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });
  return redirectResponse;
}

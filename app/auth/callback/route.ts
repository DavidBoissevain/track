import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

/**
 * Where Google sends people back to. Trades the one time code for a session
 * and writes it to cookies. Route Handlers are allowed to set cookies, so the
 * server client's setAll does the real work here.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const oauthError = searchParams.get("error_description") ?? searchParams.get("error");

  // Only ever redirect somewhere inside this site. "//evil.com" is a valid
  // path start to the URL parser but leaves the origin, so it is rejected.
  const requested = searchParams.get("next") ?? "/app";
  const next =
    requested.startsWith("/") && !requested.startsWith("//") ? requested : "/app";

  if (oauthError) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(oauthError)}`,
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}`,
    );
  }

  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent("Sign in did not complete. Try again.")}`,
  );
}

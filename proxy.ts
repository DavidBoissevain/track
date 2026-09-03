import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

/**
 * Next 16 calls this Proxy. It is the same thing older versions called
 * Middleware, and the file has to sit in the project root next to app/.
 */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Everything except static assets and image files. The session still has
     * to refresh on plain page loads, so this cannot be narrowed to /app.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|mp4)$).*)",
  ],
};

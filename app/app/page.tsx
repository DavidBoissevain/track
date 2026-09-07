import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AppHeader } from "@/components/app/app-header";
import { CapacityPreview } from "@/components/landing/capacity-preview";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Your week",
  robots: { index: false, follow: false },
};

export default async function AppPage() {
  const supabase = await createClient();

  // proxy.ts already turns signed out visitors away, but that is an
  // optimistic check. This is the one that actually decides.
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) {
    redirect("/login");
  }

  const email =
    typeof data.claims.email === "string" ? data.claims.email : undefined;

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <AppHeader email={email} />

      <main className="mx-auto w-full max-w-4xl flex-grow px-6 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            You are in
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Nothing to track yet. Projects and hours are the next thing being
            built, and this is where your week will show up.
          </p>
        </div>

        <div className="relative mt-10">
          <CapacityPreview showLegend={false} />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-[2px] dark:bg-slate-900/70">
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Example data. Yours goes here.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";

import { Logo } from "@/components/pointly-logo";

/**
 * Route group, so /login and /register get a bare centred card instead of the
 * marketing header and footer.
 */
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 px-6 py-12 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex justify-center">
          <Logo href="/" textClassName="text-slate-900 dark:text-white" />
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl sm:p-8 dark:border-slate-700 dark:bg-slate-800">
          {children}
        </div>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="underline-offset-4 hover:underline">
            Back to the home page
          </Link>
        </p>
      </div>
    </div>
  );
}

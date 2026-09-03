import { LogOut } from "lucide-react";

import { signOut } from "@/app/(auth)/actions";
import { Logo } from "@/components/pointly-logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export function AppHeader({ email }: { email?: string }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white/60 px-6 py-4 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/60">
      <Logo href="/app" textClassName="text-slate-900 dark:text-white" />

      <div className="flex items-center gap-3">
        {email ? (
          <span className="hidden max-w-50 truncate text-sm text-slate-500 sm:inline dark:text-slate-400">
            {email}
          </span>
        ) : null}
        <ModeToggle />
        <form action={signOut}>
          <Button
            type="submit"
            variant="outline"
            className="h-11 cursor-pointer gap-2 rounded-lg border-2 border-slate-200 bg-white/80 shadow-lg transition-all hover:shadow-xl md:h-13 md:rounded-xl dark:border-slate-700 dark:bg-slate-800/80"
          >
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </form>
      </div>
    </header>
  );
}

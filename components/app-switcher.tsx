"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoMark } from "@/components/pointly-logo";
import { site, siblingApps } from "@/lib/site";

const siblingMarks: Record<string, string> = {
  SprintVotes: "from-red-500 to-red-600",
  SprintRetro: "from-emerald-600 to-emerald-700",
};

export function AppSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="size-11 rounded-xl border-2 border-slate-200 bg-white/80 shadow-sm backdrop-blur-sm transition-all hover:shadow-md md:size-13 dark:border-slate-700 dark:bg-slate-800/80"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 md:size-6">
              <circle cx="5" cy="5" r="2" />
              <circle cx="12" cy="5" r="2" />
              <circle cx="19" cy="5" r="2" />
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
              <circle cx="5" cy="19" r="2" />
              <circle cx="12" cy="19" r="2" />
              <circle cx="19" cy="19" r="2" />
            </svg>
            <span className="sr-only">Switch apps</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-auto p-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex w-20 flex-col items-center gap-2 rounded-xl bg-muted p-3">
            <LogoMark size="lg" />
            <span className="text-center text-xs font-medium">
              {site.shortName}
            </span>
          </div>
          {siblingApps.map((app) => (
            <a
              key={app.name}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-20 flex-col items-center gap-2 rounded-xl p-3 transition-colors hover:bg-muted"
            >
              <div
                className={`flex size-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-md ${siblingMarks[app.name]}`}
              >
                <span className="text-lg font-bold text-white">
                  {app.name.replace("Sprint", "").charAt(0)}
                </span>
              </div>
              <span className="text-center text-xs font-medium text-muted-foreground">
                {app.name}
              </span>
            </a>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

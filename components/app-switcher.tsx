"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoMark } from "@/components/pointly-logo";
import { SiblingAppMark } from "@/components/app-icons";
import { site, siblingApps } from "@/lib/site";

export function AppSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="size-11 cursor-pointer rounded-lg border-2 border-slate-200 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 md:size-13 md:rounded-xl dark:border-slate-700 dark:bg-slate-800/80"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-[1.4rem] w-[1.4rem] md:size-6"
            >
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
      <DropdownMenuContent
        align="end"
        className="w-auto border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="flex w-20 cursor-default flex-col items-center gap-2 rounded-xl p-3">
            <LogoMark size="lg" />
            <span className="text-center text-xs font-medium text-slate-700 dark:text-slate-300">
              {site.shortName}
            </span>
          </div>
          {siblingApps.map((app) => (
            <a
              key={app.name}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-20 cursor-pointer flex-col items-center gap-2 rounded-xl p-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <SiblingAppMark name={app.name} className="size-12 rounded-xl" />
              <span className="text-center text-xs font-medium text-slate-700 dark:text-slate-300">
                {app.name}
              </span>
            </a>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

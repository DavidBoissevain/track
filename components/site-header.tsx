import { AppSwitcher } from "@/components/app-switcher";
import { Logo } from "@/components/pointly-logo";
import { ModeToggle } from "@/components/mode-toggle";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between p-6">
      <Logo
        href="/"
        textClassName="text-slate-900 dark:text-white"
      />
      <div className="flex items-center gap-3">
        <a
          href={site.author.coffee}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 items-center gap-2 rounded-xl bg-yellow-400 px-4 font-semibold text-slate-900 shadow-md transition-all hover:bg-yellow-500 hover:shadow-lg md:h-13"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path d="M18.5 3H6a3 3 0 0 0-3 3v6a6 6 0 0 0 6 6h2a6 6 0 0 0 5.917-5H18.5a3.5 3.5 0 1 0 0-7Zm0 5H17V5h1.5a1.5 1.5 0 1 1 0 3ZM3 20.5A1.5 1.5 0 0 1 4.5 19h12a1.5 1.5 0 0 1 0 3h-12A1.5 1.5 0 0 1 3 20.5Z" />
          </svg>
          <span className="hidden sm:inline">Buy me a coffee</span>
        </a>
        <ModeToggle />
        <AppSwitcher />
      </div>
    </header>
  );
}

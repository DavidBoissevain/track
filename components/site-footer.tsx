import { Logo } from "@/components/pointly-logo";
import { site, siblingApps } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative mt-auto pt-24">
      {/* Curved edge, same shape as the other apps in the suite. */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative -ml-px block h-24 w-[calc(100%+2px)] md:h-32"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,160 C240,280 480,280 720,160 C960,40 1200,40 1440,160 L1440,320 L0,320 Z"
            className="fill-slate-800 dark:fill-slate-950"
          />
        </svg>
      </div>

      <div className="relative bg-slate-800 px-6 pt-8 pb-12 text-white dark:bg-slate-950">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3 md:gap-16">
            <div className="space-y-4">
              <Logo size="md" textClassName="text-xl text-white" />
              <p className="text-sm text-slate-400">
                Hours against your capacity, per week or per month.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Connect</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={site.author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={site.author.coffee}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    Buy me a coffee
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">More {site.suite} tools</h3>
              <ul className="space-y-3">
                {siblingApps.map((app) => (
                  <li key={app.name}>
                    <a
                      href={app.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      {app.name}
                      <span className="text-slate-500"> · {app.description}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-700 pt-8 text-center">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} {site.name}. Part of the {site.suite}{" "}
              suite. Free, no ads, no tracking.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

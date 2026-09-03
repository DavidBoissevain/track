import { cn } from "@/lib/utils";

const entries = [
  { name: "Acme Bank", hours: "6" },
  { name: "Northwind", hours: "1.5" },
  { name: "Internal work", hours: "" },
];

/**
 * Mock of the day entry screen. Static, no state, no inputs that do anything.
 */
export function EntryPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xl sm:p-8 dark:border-slate-700 dark:bg-slate-800",
        className,
      )}
    >
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Tuesday 3 March
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          7.5 hours in total
        </span>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.name}
            className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-700"
          >
            <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
              {entry.name}
            </span>
            <span
              className={cn(
                "w-20 shrink-0 rounded-md bg-slate-50 px-3 py-1.5 text-right text-sm tabular-nums dark:bg-slate-900/60",
                entry.hours
                  ? "font-medium text-slate-900 dark:text-white"
                  : "text-slate-400 dark:text-slate-500",
              )}
            >
              {entry.hours || "0"}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
        Type the hours, move on with your day.
      </p>
    </div>
  );
}

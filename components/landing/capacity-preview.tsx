import { CapacityChart, type CapacityRow } from "@/components/capacity-chart";
import { cn } from "@/lib/utils";

/**
 * Hero and feature visual. Hard coded on purpose: it stands in for the real
 * period view until the app exists, and doubles as the spec for what that
 * view looks like.
 */
const exampleWeek: CapacityRow[] = [
  { name: "Acme Bank", logged: 20, capacity: 32 },
  { name: "Northwind", logged: 25, capacity: 16 },
  { name: "Internal", logged: 0, capacity: 8 },
];

export function CapacityPreview({
  title = "This week",
  subtitle = "Mon 2 Mar to Fri 6 Mar",
  rows = exampleWeek,
  height,
  showLegend = true,
  className,
}: {
  title?: string;
  subtitle?: string;
  rows?: CapacityRow[];
  height?: number;
  showLegend?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xl sm:p-8 dark:border-slate-700 dark:bg-slate-800",
        className,
      )}
    >
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          {title}
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {subtitle}
        </span>
      </div>

      <CapacityChart rows={rows} height={height} />

      {showLegend ? (
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 pt-5 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-capacity-filled" />
            Hours you did
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-capacity-track" />
            Still to do
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-capacity-over" />
            Over capacity
          </span>
        </div>
      ) : null}
    </div>
  );
}

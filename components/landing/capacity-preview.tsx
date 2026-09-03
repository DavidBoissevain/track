import { CapacityChart, type CapacityRow } from "@/components/capacity-chart";
import { cn } from "@/lib/utils";

/**
 * Hero and feature visual. Hard coded on purpose: it stands in for the real
 * period view until the app exists, and doubles as the spec for what that
 * view looks like.
 */
/* Hours are the stored unit, so these are hours. In days at 8h that reads:
   12d of 16d, 9.5d of 8d, 2.5d of 6d, 3d of 4d. Two whole days logged, two
   halves, every capacity a whole number of days, and nothing on zero. */
export const exampleMonth: CapacityRow[] = [
  { name: "Acme Bank", logged: 96, capacity: 128 },
  { name: "Northwind", logged: 76, capacity: 64 },
  { name: "Riverstone", logged: 20, capacity: 48 },
  { name: "Internal", logged: 24, capacity: 32 },
];

/* 3d of 4d, 1.5d of 3d, 2.5d of 2d, 1d of 1d. Internal lands exactly on
   capacity, which is the one case that is full blue with no red at all. */
export const exampleWeek: CapacityRow[] = [
  { name: "Acme Bank", logged: 24, capacity: 32 },
  { name: "Riverstone", logged: 12, capacity: 24 },
  { name: "Northwind", logged: 20, capacity: 16 },
  { name: "Internal", logged: 8, capacity: 8 },
];

export function CapacityPreview({
  title = "March",
  subtitle = "Capacity set per month",
  rows = exampleMonth,
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
        "rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xl sm:p-6 dark:border-slate-700 dark:bg-slate-800",
        className,
      )}
    >
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          {title}
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {subtitle}
        </span>
      </div>

      <CapacityChart rows={rows} height={height} />

      {showLegend ? (
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
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

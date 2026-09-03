import { cn } from "@/lib/utils";

const DEFAULT_HOURS_PER_DAY = 8;

export type CapacityRow = {
  /** Project name shown under the column. */
  name: string;
  /** Hours actually logged. Hours are always the stored unit. */
  logged: number;
  /** Hours of capacity for the period. */
  capacity: number;
};

export type CapacityChartProps = {
  rows: CapacityRow[];
  /** Capacity can be thought about in days or in hours, per project. */
  display?: "days" | "hours";
  hoursPerDay?: number;
  /** Pixel height of the tallest possible column. */
  height?: number;
  className?: string;
};

function formatAmount(
  hours: number,
  display: "days" | "hours",
  hoursPerDay: number,
) {
  const value = display === "days" ? hours / hoursPerDay : hours;
  const rounded = Math.round(value * 10) / 10;
  return `${rounded}${display === "days" ? "d" : "h"}`;
}

/** Below this the hours label will not fit inside the blue, so it goes above it. */
const LABEL_MIN_PX = 22;

/**
 * One project, one column. Grey is what is left, blue is what you did, red
 * sticks out above the top for what you did too much of.
 *
 * Every column is measured against the same scale, so a project with twice
 * the capacity gets a column twice as tall. That is the point: height tells
 * you how big a commitment is before you read a single number.
 *
 * The hours label sits at the top of the blue, not at the top of the column.
 * Above the column it read as the capacity, which is the one number it is not:
 * capacity is the grey top, and it is written under the project name. Only an
 * over capacity project keeps its label at the very top, in red, where it
 * labels the red tip.
 */
export function CapacityChart({
  rows,
  display = "days",
  hoursPerDay = DEFAULT_HOURS_PER_DAY,
  height = 200,
  className,
}: CapacityChartProps) {
  const maxValue = Math.max(
    ...rows.map((row) => Math.max(row.capacity, row.logged)),
    1,
  );

  return (
    <div
      className={cn("flex items-end justify-center gap-4 sm:gap-6", className)}
    >
      {rows.map((row) => {
        const over = Math.max(0, row.logged - row.capacity);
        const hasCapacity = row.capacity > 0;

        // Column heights share one scale across all projects.
        const capacityPx = hasCapacity
          ? Math.max((row.capacity / maxValue) * height, 4)
          : 0;
        const overPx = (over / maxValue) * height;
        // Blue is a share of its own column, so it stops exactly at capacity.
        const filledPct = hasCapacity
          ? (Math.min(row.logged, row.capacity) / row.capacity) * 100
          : 0;
        const isOver = over > 0;
        // Room for the label inside the blue, or does it go just above it?
        const filledPx = (capacityPx * filledPct) / 100;
        const labelFitsInside = filledPx >= LABEL_MIN_PX;

        const loggedLabel = formatAmount(row.logged, display, hoursPerDay);
        const capacityLabel = formatAmount(row.capacity, display, hoursPerDay);

        return (
          <div
            key={row.name}
            className="flex max-w-32 min-w-0 flex-1 flex-col items-center"
          >
            <div
              role="img"
              aria-label={`${row.name}: ${loggedLabel} logged of ${capacityLabel} capacity`}
              className="flex w-full flex-col justify-end"
            >
              {isOver ? (
                <>
                  <span className="mb-1.5 text-center text-xs font-semibold tabular-nums text-capacity-over">
                    {loggedLabel}
                  </span>
                  <div
                    className="w-full rounded-t-md bg-capacity-over"
                    style={{ height: `${overPx.toFixed(2)}px` }}
                  />
                </>
              ) : null}
              <div
                className={cn(
                  "relative w-full overflow-hidden bg-capacity-track",
                  isOver ? "rounded-t-none" : "rounded-t-md",
                )}
                style={{ height: `${capacityPx.toFixed(2)}px` }}
              >
                <div
                  className="absolute inset-x-0 bottom-0 bg-capacity-filled"
                  style={{ height: `${filledPct.toFixed(2)}%` }}
                >
                  {!isOver && labelFitsInside ? (
                    <span className="absolute inset-x-0 top-1 text-center text-xs font-semibold tabular-nums text-white dark:text-slate-900">
                      {loggedLabel}
                    </span>
                  ) : null}
                </div>
                {!isOver && !labelFitsInside ? (
                  <span
                    className="absolute inset-x-0 text-center text-xs tabular-nums text-slate-500 dark:text-slate-400"
                    style={{ bottom: `${filledPct.toFixed(2)}%` }}
                  >
                    {loggedLabel}
                  </span>
                ) : null}
              </div>
            </div>

            {/* Fixed height keeps every column sitting on the same baseline.
                It has to clear both lines of text or the names get clipped. */}
            <div className="mt-2 flex h-11 w-full flex-col items-center gap-0.5 border-t border-slate-200 pt-2 leading-tight dark:border-slate-700">
              <span className="w-full truncate text-center text-xs font-medium text-slate-700 dark:text-slate-200">
                {row.name}
              </span>
              <span className="text-[0.6875rem] text-slate-400 dark:text-slate-500">
                {capacityLabel}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

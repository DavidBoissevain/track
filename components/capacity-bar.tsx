import { cn } from "@/lib/utils";

const DEFAULT_HOURS_PER_DAY = 8;

export type CapacityBarProps = {
  /** Project name shown on the left of the row. */
  name: string;
  /** Hours actually logged. Hours are always the stored unit. */
  logged: number;
  /** Hours of capacity for the period. */
  capacity: number;
  /** Capacity can be thought about in days or in hours, per project. */
  display?: "days" | "hours";
  hoursPerDay?: number;
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

/**
 * One project, one bar. Grey is what is left, blue is what you did, red is
 * what you did too much of.
 *
 * When you go over capacity the whole row is squeezed so that the capacity
 * line still fits on screen, which is why every width is divided by `scale`.
 * A bar that is exactly on capacity is fully blue with no red at all.
 */
export function CapacityBar({
  name,
  logged,
  capacity,
  display = "days",
  hoursPerDay = DEFAULT_HOURS_PER_DAY,
  className,
}: CapacityBarProps) {
  const hasCapacity = capacity > 0;
  const scale = hasCapacity ? Math.max(1, logged / capacity) : 1;
  const filledPct = hasCapacity
    ? (Math.min(logged, capacity) / capacity / scale) * 100
    : 0;
  const overPct = hasCapacity
    ? (Math.max(0, logged - capacity) / capacity / scale) * 100
    : 0;
  const isOver = overPct > 0;

  const loggedLabel = formatAmount(logged, display, hoursPerDay);
  const capacityLabel = formatAmount(capacity, display, hoursPerDay);

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
          {name}
        </span>
        <span
          className={cn(
            "shrink-0 text-xs tabular-nums",
            isOver
              ? "font-semibold text-capacity-over"
              : "text-slate-500 dark:text-slate-400",
          )}
        >
          {loggedLabel} / {capacityLabel}
        </span>
      </div>

      <div
        role="img"
        aria-label={`${name}: ${loggedLabel} logged of ${capacityLabel} capacity`}
        className="relative h-3 w-full overflow-hidden rounded-full bg-capacity-track"
      >
        <div
          className="absolute inset-y-0 left-0 bg-capacity-filled"
          style={{ width: `${filledPct.toFixed(2)}%` }}
        />
        {isOver ? (
          <>
            <div
              className="absolute inset-y-0 bg-capacity-over"
              style={{
                left: `${filledPct.toFixed(2)}%`,
                width: `${overPct.toFixed(2)}%`,
              }}
            />
            {/* The line where capacity sits, so the overshoot is readable. */}
            <div
              className="absolute inset-y-0 w-0.5 bg-white/80 dark:bg-slate-900/70"
              style={{ left: `${filledPct.toFixed(2)}%` }}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

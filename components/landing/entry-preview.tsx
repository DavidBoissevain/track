"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

const projects = ["Acme Bank", "Northwind", "Riverstone", "Internal"];
const initialHours = ["6", "1.5", "", ""];

/** Keeps what you type to a plain number, at most one decimal point. */
function sanitise(value: string) {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const [whole, ...rest] = cleaned.split(".");
  const trimmed = rest.length ? `${whole}.${rest.join("")}` : whole;
  return trimmed.slice(0, 4);
}

/**
 * Mock of the day entry screen, and it really does take input. The point of
 * the landing page is that filling hours in is quick, so letting people type
 * in the card says that better than a screenshot of one.
 */
export function EntryPreview({ className }: { className?: string }) {
  const [hours, setHours] = useState(initialHours);

  const total = hours.reduce(
    (sum, value) => sum + (Number.parseFloat(value) || 0),
    0,
  );
  const totalLabel = Math.round(total * 10) / 10;

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xl sm:p-6 dark:border-slate-700 dark:bg-slate-800",
        className,
      )}
    >
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Tuesday 3 March
        </h2>
        <span className="text-xs tabular-nums text-slate-500 dark:text-slate-400">
          {totalLabel} hours in total
        </span>
      </div>

      <div className="space-y-2.5">
        {projects.map((project, index) => (
          <label
            key={project}
            className="flex cursor-text items-center justify-between gap-4 rounded-lg border border-slate-200 px-4 py-2.5 transition-colors focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/30 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
          >
            <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
              {project}
            </span>
            <span className="flex shrink-0 items-center gap-1.5">
              <input
                type="text"
                inputMode="decimal"
                value={hours[index]}
                placeholder="0"
                aria-label={`Hours on ${project}`}
                onChange={(event) =>
                  setHours((current) =>
                    current.map((value, i) =>
                      i === index ? sanitise(event.target.value) : value,
                    ),
                  )
                }
                className="w-14 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-right text-sm font-medium tabular-nums text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand focus:bg-white dark:border-slate-600 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-900"
              />
              <span className="w-2 text-xs text-slate-400 dark:text-slate-500">
                h
              </span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

/**
 * The real marks for the other apps in the suite, kept identical to the ones
 * they use themselves so the switcher looks like the switcher over there.
 */
const marks = {
  SprintVotes: {
    gradient: "from-red-500 to-red-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="size-[58%] text-white"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
  },
  SprintRetro: {
    gradient: "from-emerald-600 to-emerald-700",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-[58%] text-white"
        aria-hidden="true"
      >
        <g
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="1.5" y="2.5" width="8" height="8" rx="1.5" />
          <rect x="14" y="2.5" width="8" height="8" rx="1.5" />
          <rect x="1.5" y="14.5" width="8" height="8" rx="1.5" />
        </g>
      </svg>
    ),
  },
} as const;

export type SiblingAppName = keyof typeof marks;

export function SiblingAppMark({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const mark = marks[name as SiblingAppName];
  if (!mark) return null;

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center bg-linear-to-br shadow-md",
        mark.gradient,
        className,
      )}
    >
      {mark.icon}
    </div>
  );
}

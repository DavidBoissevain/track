import Link from "next/link";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/* Shadow follows sprintvotes: shadow-lg on the header mark, shadow-md on the
   larger tile in the app switcher. */
const markSizes = {
  sm: "size-8 rounded-md shadow-md",
  md: "size-10 rounded-lg shadow-lg",
  lg: "size-12 rounded-xl shadow-md",
} as const;

const textSizes = {
  sm: "text-base",
  md: "text-lg sm:text-2xl",
  lg: "text-xl",
} as const;

/**
 * Three columns of different heights: the capacity chart in miniature, and
 * the same shape the app itself draws. White glyph on the brand gradient,
 * matching the marks the other apps in the suite use.
 */
export function LogoMark({
  size = "md",
  className,
}: {
  size?: keyof typeof markSizes;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center bg-linear-to-br from-brand to-brand-strong",
        markSizes[size],
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-[58%] text-brand-foreground"
        aria-hidden="true"
      >
        <rect x="4" y="4" width="4" height="16" rx="2" />
        <rect x="10" y="9" width="4" height="11" rx="2" />
        <rect x="16" y="13" width="4" height="7" rx="2" />
      </svg>
    </div>
  );
}

export function Logo({
  size = "md",
  showText = true,
  href,
  className,
  textClassName,
}: {
  size?: keyof typeof markSizes;
  showText?: boolean;
  href?: string;
  className?: string;
  textClassName?: string;
}) {
  const content = (
    <>
      <LogoMark size={size} />
      {showText ? (
        <span
          className={cn(
            "font-bold tracking-tight",
            textSizes[size],
            textClassName,
          )}
        >
          {site.name}
        </span>
      ) : null}
    </>
  );

  const classes = cn("flex items-center gap-3", className);

  if (!href) {
    return <div className={classes}>{content}</div>;
  }

  return href.startsWith("http") ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(classes, "transition-opacity hover:opacity-80")}
    >
      {content}
    </a>
  ) : (
    <Link
      href={href}
      className={cn(classes, "transition-opacity hover:opacity-80")}
    >
      {content}
    </Link>
  );
}

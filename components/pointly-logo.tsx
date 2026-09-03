import Link from "next/link";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const markSizes = {
  sm: "size-8 rounded-md",
  md: "size-10 rounded-lg",
  lg: "size-12 rounded-xl",
} as const;

const textSizes = {
  sm: "text-base",
  md: "text-lg sm:text-2xl",
  lg: "text-xl",
} as const;

/**
 * The three horizontal bars are the product in miniature: one nearly full,
 * one short, one in between. Same language as the capacity bars on the page.
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
        "flex shrink-0 items-center justify-center bg-linear-to-br from-brand to-brand-strong shadow-md",
        markSizes[size],
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-[60%] text-brand-foreground"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="3.5" rx="1.75" fill="currentColor" />
        <rect x="3" y="10.25" width="9" height="3.5" rx="1.75" fill="currentColor" />
        <rect x="3" y="15.5" width="14" height="3.5" rx="1.75" fill="currentColor" />
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

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="size-11 cursor-pointer rounded-lg border-2 border-slate-200 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl md:size-13 md:rounded-xl dark:border-slate-700 dark:bg-slate-800/80"
    >
      <Sun className="size-5 rotate-0 scale-100 transition-all md:size-6 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-5 rotate-90 scale-0 transition-all md:size-6 dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

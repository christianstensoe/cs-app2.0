"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="rounded-md p-2 text-muted transition-colors hover:text-foreground"
    >
      {/* Both icons render on the server; CSS picks one, so no hydration flash. */}
      <SunIcon className="hidden size-4 dark:block" />
      <MoonIcon className="size-4 dark:hidden" />
    </button>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background print:hidden">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label="Christian Stensøe — home"
          className="font-semibold tracking-tight"
        >
          <span className="hidden sm:inline" aria-hidden="true">
            Christian Stensøe
          </span>
          <span className="sm:hidden" aria-hidden="true">
            CS
          </span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                  active
                    ? "font-medium text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { RunningStats } from "@/lib/strava";

// useLayoutEffect on the client, no-op on the server (avoids SSR warning).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const POLL_INTERVAL_MS = 5 * 60 * 1000; // 5 min
const COUNT_UP_MS = 1500;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function formatKm(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

/** easeOutCubic — fast start, gentle settle. */
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Animated running-distance ticker. Counts up from `from` to the current
 * year-to-date total on mount, then polls /api/running so a freshly-logged
 * run visibly ticks the number up without a page reload.
 */
export function RunningTicker({ initial }: { initial: RunningStats }) {
  const [stats, setStats] = useState<RunningStats>(initial);
  // Initialise to the real value so server-render / no-JS shows the true
  // number; the count-up (below) resets to 0 on the client before paint.
  const [display, setDisplay] = useState<number>(initial.ytdKm);
  const rafRef = useRef<number | null>(null);

  // Animate `display` from its current value to `target`.
  function animateTo(from: number, target: number) {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    if (prefersReducedMotion() || from === target) {
      setDisplay(target);
      return;
    }

    setDisplay(from); // start exactly at `from`, no first-frame flash
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / COUNT_UP_MS, 1);
      setDisplay(from + (target - from) * easeOut(t));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  // Count up from zero on first mount (client only, before paint).
  useIsoLayoutEffect(() => {
    animateTo(0, initial.ytdKm);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Poll for updates; re-animate when the YTD total changes.
  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      try {
        const res = await fetch("/api/running", { cache: "no-store" });
        if (!res.ok) return;
        const next = (await res.json()) as RunningStats;
        if (cancelled) return;
        setStats((prev) => {
          if (next.ytdKm !== prev.ytdKm) animateTo(prev.ytdKm, next.ytdKm);
          return next;
        });
      } catch {
        // Transient network errors are ignored; the next poll will retry.
      }
    }

    const id = setInterval(refresh, POLL_INTERVAL_MS);
    const onFocus = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updated = new Date(stats.updatedAt).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-widest text-muted">
        Total distance run this year
      </p>

      <p
        aria-live="polite"
        className="mt-3 flex items-baseline gap-3 font-semibold tracking-tight tabular-nums"
      >
        <span className="text-6xl sm:text-7xl">{formatKm(display)}</span>
        <span className="text-2xl text-muted sm:text-3xl">km</span>
      </p>

      <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
        <div className="bg-background p-5">
          <dt className="text-sm text-muted">All time</dt>
          <dd className="mt-1 text-2xl font-semibold tabular-nums">
            {formatKm(stats.allTimeKm)}{" "}
            <span className="text-base font-normal text-muted">km</span>
          </dd>
        </div>
        <div className="bg-background p-5">
          <dt className="text-sm text-muted">Last 4 weeks</dt>
          <dd className="mt-1 text-2xl font-semibold tabular-nums">
            {formatKm(stats.recentKm)}{" "}
            <span className="text-base font-normal text-muted">km</span>
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-xs text-muted">
        Synced from Strava · updated {updated}
      </p>
    </div>
  );
}

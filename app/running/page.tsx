import type { Metadata } from "next";
import { getRunningStats } from "@/lib/activities";
import { RunningTicker } from "@/components/running-ticker";

export const metadata: Metadata = {
  title: "Running",
  description:
    "A live ticker of my total running distance this year, synced from Strava.",
};

// Re-read from the database at most once every ~15 min.
export const revalidate = 900;

export default async function RunningPage() {
  let stats;
  try {
    stats = await getRunningStats();
  } catch (error) {
    console.error("[/running] failed to load running stats:", error);
  }

  return (
    <div className="animate-enter pt-8 sm:pt-16">
      <h1 className="text-3xl font-semibold tracking-tight">Running</h1>

      <p className="mt-4 max-w-prose leading-relaxed text-muted">
        A live tally of every kilometre I&rsquo;ve run this year, counted up
        straight from Strava.
      </p>

      <div className="mt-12">
        {stats ? (
          <RunningTicker initial={stats} />
        ) : (
          <p className="text-muted">
            Running stats are unavailable right now — check back soon.
          </p>
        )}
      </div>
    </div>
  );
}

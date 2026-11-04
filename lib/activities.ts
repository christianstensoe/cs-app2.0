import { sql } from "@/lib/db";
import type { StravaActivity } from "@/lib/strava";

/**
 * Running totals in kilometres (1 decimal). `updatedAt` is an ISO timestamp
 * of the most recent change synced from Strava.
 */
export type RunningStats = {
  ytdKm: number;
  allTimeKm: number;
  recentKm: number;
  updatedAt: string;
};

/** Strava sport types we count as "running" (treadmill runs are type Run). */
const RUN_SPORT_TYPES = ["Run", "TrailRun", "VirtualRun"];

function metresToKm(metres: number): number {
  return Math.round((metres / 1000) * 10) / 10;
}

/**
 * Insert an activity, or overwrite it if its Strava ID already exists — so
 * receiving the same event twice is harmless. Returns the query un-awaited
 * so callers can either await it or batch several in one transaction.
 */
export function upsertActivity(a: StravaActivity) {
  return sql()`
    INSERT INTO activities (
      id, name, sport_type, start_date, distance_m, moving_time_s,
      elapsed_time_s, elevation_gain_m, average_heartrate, trainer
    ) VALUES (
      ${a.id}, ${a.name}, ${a.sport_type}, ${a.start_date}, ${a.distance},
      ${a.moving_time}, ${a.elapsed_time}, ${a.total_elevation_gain ?? null},
      ${a.average_heartrate ?? null}, ${a.trainer ?? false}
    )
    ON CONFLICT (id) DO UPDATE SET
      name              = EXCLUDED.name,
      sport_type        = EXCLUDED.sport_type,
      start_date        = EXCLUDED.start_date,
      distance_m        = EXCLUDED.distance_m,
      moving_time_s     = EXCLUDED.moving_time_s,
      elapsed_time_s    = EXCLUDED.elapsed_time_s,
      elevation_gain_m  = EXCLUDED.elevation_gain_m,
      average_heartrate = EXCLUDED.average_heartrate,
      trainer           = EXCLUDED.trainer,
      updated_at        = now()
  `;
}

export function deleteActivity(id: number) {
  return sql()`DELETE FROM activities WHERE id = ${id}`;
}

/**
 * YTD / all-time / last-4-weeks running totals in one query. "This year"
 * starts at midnight on 1 January Norwegian time, not UTC.
 */
export async function getRunningStats(): Promise<RunningStats> {
  const [row] = (await sql()`
    SELECT
      COALESCE(SUM(distance_m) FILTER (
        WHERE start_date >= date_trunc('year', now() AT TIME ZONE 'Europe/Oslo')
                            AT TIME ZONE 'Europe/Oslo'
      ), 0) AS ytd_m,
      COALESCE(SUM(distance_m), 0) AS all_time_m,
      COALESCE(SUM(distance_m) FILTER (
        WHERE start_date >= now() - interval '28 days'
      ), 0) AS recent_m,
      MAX(updated_at) AS updated_at
    FROM activities
    WHERE sport_type = ANY(${RUN_SPORT_TYPES})
  `) as {
    ytd_m: number;
    all_time_m: number;
    recent_m: number;
    updated_at: Date | null;
  }[];

  return {
    ytdKm: metresToKm(row.ytd_m),
    allTimeKm: metresToKm(row.all_time_m),
    recentKm: metresToKm(row.recent_m),
    updatedAt: (row.updated_at ? new Date(row.updated_at) : new Date()).toISOString(),
  };
}

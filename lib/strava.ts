import { unstable_cache } from "next/cache";

/**
 * Running totals derived from Strava, distances in kilometres (1 decimal).
 * `updatedAt` is an ISO timestamp of when the figures were fetched from Strava.
 */
export type RunningStats = {
  ytdKm: number;
  allTimeKm: number;
  recentKm: number;
  updatedAt: string;
};

const OAUTH_URL = "https://www.strava.com/oauth/token";
const API_BASE = "https://www.strava.com/api/v3";

/** How long a computed result is reused before we hit Strava again (seconds). */
const REVALIDATE_SECONDS = 900; // 15 min — well inside Strava's rate limits.

/** Strava sport types we count as "running". */
const RUN_SPORT_TYPES = new Set(["Run", "TrailRun", "VirtualRun"]);

const FOUR_WEEKS_MS = 28 * 24 * 60 * 60 * 1000;

type StravaActivity = {
  distance: number; // metres
  start_date: string; // ISO 8601 UTC
  sport_type?: string;
  type?: string;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function metresToKm(metres: number): number {
  return Math.round((metres / 1000) * 10) / 10;
}

function isRun(a: StravaActivity): boolean {
  return RUN_SPORT_TYPES.has(a.sport_type ?? a.type ?? "");
}

/**
 * Exchange the long-lived refresh token for a short-lived access token.
 * Strava access tokens expire ~every 6h, so we always mint a fresh one.
 */
async function fetchAccessToken(): Promise<string> {
  const res = await fetch(OAUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: requireEnv("STRAVA_CLIENT_ID"),
      client_secret: requireEnv("STRAVA_CLIENT_SECRET"),
      refresh_token: requireEnv("STRAVA_REFRESH_TOKEN"),
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Strava token refresh failed (${res.status})`);
  }

  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Strava token refresh returned no access_token");
  }
  return data.access_token;
}

/**
 * Page through the athlete's full activity list. Sum activities myslf
 * (rather than using /athletes/{id}/stats) because the stats endpoint only
 * counts activities set to "Everyone" visibility — it silently drops private
 * ("Only You"/"Followers") runs. This requires the `activity:read_all` scope.
 */
async function fetchAllActivities(
  accessToken: string,
): Promise<StravaActivity[]> {
  const perPage = 200;
  const activities: StravaActivity[] = [];

  for (let page = 1; page <= 50; page++) {
    const res = await fetch(
      `${API_BASE}/athlete/activities?per_page=${perPage}&page=${page}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      },
    );
    if (!res.ok) {
      throw new Error(`Strava activities request failed (${res.status})`);
    }
    const batch = (await res.json()) as StravaActivity[];
    activities.push(...batch);
    if (batch.length < perPage) break; // last page reached
  }

  return activities;
}

/** Fetch every run and derive YTD / all-time / last-4-weeks totals. */
async function fetchRunningStats(): Promise<RunningStats> {
  const accessToken = await fetchAccessToken();
  const runs = (await fetchAllActivities(accessToken)).filter(isRun);

  const now = Date.now();
  const yearStart = Date.UTC(new Date().getUTCFullYear(), 0, 1);
  const recentCutoff = now - FOUR_WEEKS_MS;

  let ytd = 0;
  let allTime = 0;
  let recent = 0;
  for (const run of runs) {
    allTime += run.distance;
    const start = new Date(run.start_date).getTime();
    if (start >= yearStart) ytd += run.distance;
    if (start >= recentCutoff) recent += run.distance;
  }

  return {
    ytdKm: metresToKm(ytd),
    allTimeKm: metresToKm(allTime),
    recentKm: metresToKm(recent),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Cached entry point used by both the /running page and the /api/running route.
 * The result is shared across requests and refreshed at most once per
 * REVALIDATE_SECONDS, keeping us comfortably within Strava's rate limits.
 */
export const getRunningStats = unstable_cache(
  fetchRunningStats,
  ["strava-running-stats"],
  { revalidate: REVALIDATE_SECONDS },
);

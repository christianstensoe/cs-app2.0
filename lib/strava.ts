import { sql } from "@/lib/db";

const OAUTH_URL = "https://www.strava.com/oauth/token";
const API_BASE = "https://www.strava.com/api/v3";

/** Refresh a little before expiry so a token never runs out mid-request. */
const EXPIRY_MARGIN_MS = 5 * 60 * 1000;

/** The Strava activity fields we store (list and detail responses share them). */
export type StravaActivity = {
  id: number;
  name: string;
  sport_type: string;
  start_date: string; // ISO 8601 UTC
  distance: number; // metres
  moving_time: number; // seconds
  elapsed_time: number; // seconds
  total_elevation_gain?: number; // metres
  average_heartrate?: number;
  trainer?: boolean; // indoor, e.g. treadmill
};

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_at: number; // Unix seconds
};

type StoredToken = {
  refresh_token: string;
  access_token: string;
  expires_at: Date;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Exchange a refresh token for a new access token. Returns null if Strava
 * rejects the refresh token (e.g. it was revoked or replaced).
 */
async function refreshAccessToken(
  refreshToken: string,
): Promise<TokenResponse | null> {
  const res = await fetch(OAUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: requireEnv("STRAVA_CLIENT_ID"),
      client_secret: requireEnv("STRAVA_CLIENT_SECRET"),
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });

  if (res.status === 400 || res.status === 401) return null;
  if (!res.ok) {
    throw new Error(`Strava token refresh failed (${res.status})`);
  }

  const data = (await res.json()) as Partial<TokenResponse>;
  if (!data.access_token || !data.refresh_token || !data.expires_at) {
    throw new Error("Strava token refresh returned an incomplete response");
  }
  return data as TokenResponse;
}

/**
 * Return a valid access token, refreshing only when the stored one is about
 * to expire (Strava access tokens last ~6 h). Strava may hand back a new
 * refresh token on each refresh, so the latest one is saved in the database.
 *
 * If the stored refresh token is rejected — e.g. after you rotate the app's
 * credentials — it falls back to STRAVA_REFRESH_TOKEN from the environment.
 */
export async function getAccessToken(): Promise<string> {
  const db = sql();
  const [stored] = (await db`
    SELECT refresh_token, access_token, expires_at
    FROM strava_tokens WHERE id = 1
  `) as StoredToken[];

  if (
    stored &&
    new Date(stored.expires_at).getTime() - EXPIRY_MARGIN_MS > Date.now()
  ) {
    return stored.access_token;
  }

  const envToken = requireEnv("STRAVA_REFRESH_TOKEN");
  let token = stored ? await refreshAccessToken(stored.refresh_token) : null;
  if (!token && stored?.refresh_token !== envToken) {
    token = await refreshAccessToken(envToken);
  }
  if (!token) {
    throw new Error(
      "Strava rejected the refresh token — generate a new one with activity:read_all scope",
    );
  }

  await db`
    INSERT INTO strava_tokens (id, refresh_token, access_token, expires_at)
    VALUES (1, ${token.refresh_token}, ${token.access_token}, to_timestamp(${token.expires_at}))
    ON CONFLICT (id) DO UPDATE SET
      refresh_token = EXCLUDED.refresh_token,
      access_token  = EXCLUDED.access_token,
      expires_at    = EXCLUDED.expires_at,
      updated_at    = now()
  `;
  return token.access_token;
}

/** Fetch one activity. Returns null if it no longer exists (404). */
export async function fetchActivity(
  id: number,
  accessToken: string,
): Promise<StravaActivity | null> {
  const res = await fetch(`${API_BASE}/activities/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Strava activity request failed (${res.status})`);
  }
  return (await res.json()) as StravaActivity;
}

/**
 * Page through the athlete's full activity list. Sum activities myslf
 * (rather than using /athletes/{id}/stats) because the stats endpoint only
 * counts activities set to "Everyone" visibility — it silently drops private
 * ("Only You"/"Followers") runs. This requires the `activity:read_all` scope.
 *
 * Used for the one-time import / manual re-sync (npm run db:sync); new
 * activities arrive one at a time through the webhook instead.
 */
export async function fetchAllActivities(
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

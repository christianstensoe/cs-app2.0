-- Schema for the Strava sync. Safe to run repeatedly (npm run db:sync does).

-- One row per Strava activity. All sport types are stored; queries filter for
-- runs. Raw values only — pace/speed are derived when needed so they can never
-- disagree with distance and time.
CREATE TABLE IF NOT EXISTS activities (
  id                BIGINT PRIMARY KEY,           -- Strava activity ID
  name              TEXT NOT NULL,
  sport_type        TEXT NOT NULL,
  start_date        TIMESTAMPTZ NOT NULL,
  distance_m        DOUBLE PRECISION NOT NULL,
  moving_time_s     INTEGER NOT NULL,
  elapsed_time_s    INTEGER NOT NULL,
  elevation_gain_m  DOUBLE PRECISION,
  average_heartrate DOUBLE PRECISION,
  trainer           BOOLEAN NOT NULL DEFAULT false, -- indoor / treadmill
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS activities_start_date_idx ON activities (start_date);

-- Single-row table holding the current Strava OAuth tokens. Strava may issue
-- a new refresh token on each refresh, so the latest one is stored here
-- rather than in a fixed environment variable.
CREATE TABLE IF NOT EXISTS strava_tokens (
  id            INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  refresh_token TEXT NOT NULL,
  access_token  TEXT NOT NULL,
  expires_at    TIMESTAMPTZ NOT NULL,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

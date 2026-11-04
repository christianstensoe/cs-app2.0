# christianstensoe.com

Personal CV / portfolio site. Minimalist, dark-by-default, statically rendered, with a small Postgres-backed Strava sync.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · next-themes · Postgres (Neon). Deployed on Vercel; pushes to `main` go straight to production.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

### Strava running ticker

The `/running` page shows a live count-up of total running distance this year.
Activities are stored in Postgres (Neon) and kept in sync by a Strava webhook:

```
Strava ──POST event──▶ /api/strava/webhook ──fetch activity──▶ Strava API
                              │
                              └─ upsert / delete ─▶ Postgres ◀─ SUM() ─ /running
```

- `db/schema.sql` — `activities` (one row per Strava activity) and `strava_tokens` (the latest OAuth tokens, since Strava can rotate the refresh token).
- `app/api/strava/webhook` — answers Strava's subscription check (`GET`) and activity events (`POST`). It replies 200 immediately and syncs in `after()`; it only acts on `STRAVA_ATHLETE_ID`'s events and always re-fetches from the API, so forged events can't inject data. Duplicate events are harmless because writes are upserts keyed on the Strava ID.
- `lib/activities.ts` — upsert/delete and the totals query ("this year" uses Norwegian time).
- `npm run db:sync` — creates the tables and imports every activity. Run once to backfill, and again any time as a manual re-sync.

Environment variables (server-side only — never prefix with `NEXT_PUBLIC_`):

| Variable | Where to find it |
| --- | --- |
| `STRAVA_CLIENT_ID` | Strava API settings — https://www.strava.com/settings/api |
| `STRAVA_CLIENT_SECRET` | Same page |
| `STRAVA_REFRESH_TOKEN` | OAuth token with `activity:read_all` scope (used until a newer one is stored in the database) |
| `STRAVA_ATHLETE_ID` | Numeric ID in your `strava.com/athletes/<id>` URL |
| `STRAVA_VERIFY_TOKEN` | Any random string you choose |
| `DATABASE_URL` | Set by Vercel when the Neon database is connected; copy it to `.env.local` for dev |

Copy [`.env.local.example`](.env.local.example) to `.env.local` for local dev, and set the same values in Vercel → Project → Settings → Environment Variables.

**Registering the webhook** (once, after the endpoint is deployed — Strava allows one subscription per app):

```bash
curl -X POST https://www.strava.com/api/v3/push_subscriptions \
  -F client_id=$STRAVA_CLIENT_ID \
  -F client_secret=$STRAVA_CLIENT_SECRET \
  -F callback_url=https://www.christianstensoe.com/api/strava/webhook \
  -F verify_token=$STRAVA_VERIFY_TOKEN
```

Use the `www` host: the apex domain redirects, and Strava's check doesn't follow redirects.

## Editing content

All CV content — roles, education, volunteering, social links, site metadata — lives in a single typed file: [`lib/cv.ts`](lib/cv.ts). Edit it there; the pages render from it.

## Structure

- `app/` — routes (`/`, `/resume`, `/running`, `/contact`), plus `app/api/running` (running stats JSON), `app/api/strava/webhook` (Strava events) and metadata assets (favicon, Open Graph image, sitemap, robots)
- `components/` — header, footer, theme toggle, print button, scroll-spy section nav, running ticker
- `lib/cv.ts` — the content
- `lib/strava.ts` — Strava API client (token storage/refresh, activity fetches)
- `lib/activities.ts`, `lib/db.ts`, `db/schema.sql` — Postgres storage and totals
- `scripts/sync.ts` — full import / manual re-sync (`npm run db:sync`)

The resume page has a print stylesheet: the "Save as PDF" button (or ⌘P) produces a clean printable CV.

# christianstensoe.com

Personal CV / portfolio site. Minimalist, dark-by-default, statically rendered.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · next-themes. Deployed on Vercel; pushes to `main` go straight to production.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

### Strava running ticker

The `/running` page shows a live count-up of total running distance this year,
pulled from the Strava API. It needs four **server-side** environment variables
(never prefix them with `NEXT_PUBLIC_` — they must not reach the browser):

| Variable | Where to find it |
| --- | --- |
| `STRAVA_CLIENT_ID` | Strava API settings — https://www.strava.com/settings/api |
| `STRAVA_CLIENT_SECRET` | Same page |
| `STRAVA_REFRESH_TOKEN` | OAuth token with at least `activity:read_all` scope |
| `STRAVA_ATHLETE_ID` | Numeric ID in your `strava.com/athletes/<id>` URL |

For local dev, copy [`.env.local.example`](.env.local.example) to `.env.local`
(gitignored) and fill in the values. For production, add the same four in
Vercel → Project → Settings → Environment Variables. Results are cached ~15 min
server-side, so new runs appear within minutes and Strava rate limits are safe.

## Editing content

All CV content — roles, education, volunteering, social links, site metadata — lives in a single typed file: [`lib/cv.ts`](lib/cv.ts). Edit it there; the pages render from it.

## Structure

- `app/` — routes (`/`, `/resume`, `/running`, `/contact`), plus `app/api/running` (Strava JSON endpoint) and metadata assets (favicon, Open Graph image, sitemap, robots)
- `components/` — header, footer, theme toggle, print button, scroll-spy section nav, running ticker
- `lib/cv.ts` — the content
- `lib/strava.ts` — cached Strava fetch (token refresh + athlete stats)

The resume page has a print stylesheet: the "Save as PDF" button (or ⌘P) produces a clean printable CV.

# christianstensoe.com

Personal CV / portfolio site. Minimalist, dark-by-default, statically rendered.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · next-themes. Deployed on Vercel; pushes to `main` go straight to production.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content

All CV content — roles, education, volunteering, social links, site metadata — lives in a single typed file: [`lib/cv.ts`](lib/cv.ts). Edit it there; the pages render from it.

## Structure

- `app/` — routes (`/`, `/resume`, `/contact`), plus metadata assets (favicon, Open Graph image, sitemap, robots)
- `components/` — header, footer, theme toggle, print button, scroll-spy section nav
- `lib/cv.ts` — the content

The resume page has a print stylesheet: the "Save as PDF" button (or ⌘P) produces a clean printable CV.

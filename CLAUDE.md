# CLAUDE.md — diemart-website

> **Ownership:** Built for a friend (not Adsol Digital, not a paying client).
> **Status:** Completed. Don't ship new features without explicit ask from Garry.

## What this is

Heavy-animation marketing site — uses Three.js + React Three Fiber + GSAP + Framer Motion + simplex-noise for an immersive landing experience. Multilingual via `next-intl` with `messages/en.json`. Supabase wired for backend/data.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14.2.35 (App Router) — NOT Next 16 (no `proxy.ts` migration needed) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 |
| 3D | Three.js 0.160 + `@react-three/fiber` + `@react-three/drei` |
| Animation | GSAP 3.14 + `@gsap/react` + Framer Motion 12 |
| Procedural noise | simplex-noise |
| i18n | `next-intl` 4.8 |
| Theme | `next-themes` |
| DB | Supabase JS client |

## Repo layout

```
app/                  # Next App Router
components/           # UI + 3D scenes
lib/                  # Helpers
messages/             # i18n JSON (en.json present)
middleware.ts         # next-intl locale routing
public/
tailwind.config.ts
```

## Commands

```bash
npm install
npm run dev           # localhost:3000
npm run build
npm run start
npm run lint
```

## Conventions

- Tailwind 3 (NOT 4) — config is in `tailwind.config.ts`, not `@tailwindcss/postcss`
- React 18, NOT 19 — don't auto-upgrade
- 3D content is heavy — lazy-load with dynamic imports + `ssr: false`
- Supabase env: `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Don't touch

- Don't bump Next 14 → 16 without testing the i18n middleware (next-intl's API may change)
- Don't strip dynamic imports around Three.js code — first paint regressions are immediate
- Don't switch the noise lib — simplex-noise output is referenced visually in design specs

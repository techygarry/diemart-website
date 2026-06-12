# Die Mart Website

Luxury jewellery die manufacturing company website built with Next.js 14, featuring scroll-driven animations, 3D product visualization, multilingual support, and a dark/light theme system.

**Live**: [diemart.co.in](https://diemart.co.in)

## Tech Stack

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS 3.4 + CSS Variables (dark/light themes)
- **Animation**: GSAP 3.14 (ScrollTrigger) + Framer Motion 12
- **3D**: Three.js 0.160 + React Three Fiber + Drei
- **i18n**: next-intl (English, Hindi, Arabic with RTL)
- **Backend**: Supabase (contact form submissions)
- **Theming**: next-themes (dark/light toggle)
- **Deployment**: Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
app/
  [locale]/
    page.tsx              # Homepage (Hero, About, Products, Services, 3D Viewer, Globe, Legacy, Contact)
    about/page.tsx        # About + Legacy
    products/page.tsx     # Product grid + Specs + How to Order
    services/page.tsx     # Service cards
    process/page.tsx      # 6-step manufacturing process
    legacy/page.tsx       # Heritage timeline (1980-2026)
    contact/page.tsx      # 5-step contact form + FAQ
    viewer/page.tsx       # Interactive 3D die viewer
  api/contact/route.ts    # POST endpoint (Supabase)

components/               # 28 components (sections, UI, 3D/canvas)
lib/                      # Utilities, hooks, brand constants, animations
messages/                 # i18n JSON files (en, hi, ar)
public/
  models/                 # STL files (bridge, flower, kairi, rectangle)
  sequence/               # 360 frame images (die explosion animation)
```

## Key Features

- **Scroll-driven Hero**: 3-beat animation synced to 120-frame die sequence
- **3D Die Viewer**: Interactive Three.js model with wireframe/solid toggle
- **Globe Visualization**: Geographic reach with animated markers
- **Multilingual**: Full translations in English, Hindi, Arabic (RTL)
- **Dark/Light Theme**: Persistent toggle with CSS variable system
- **Contact Form**: 5-step validated form with Supabase backend
- **Custom Cursor**: Smooth-follow cursor on desktop
- **SEO**: JSON-LD schema, Open Graph, security headers
- **Performance**: Device detection, adaptive particle counts, mobile-optimized frames

## Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm run start     # Production server
npm run lint      # Next.js linting
```

## Documentation

See [PROJECT.md](./PROJECT.md) for full project documentation including architecture, component details, and roadmap.

## Business

**Die Mart** - Jewellery die manufacturing, Tarapur, Maharashtra, India
- WhatsApp: +91 74997 49770
- Instagram: [@die_mart_](https://instagram.com/die_mart_)

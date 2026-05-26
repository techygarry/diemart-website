# Die Mart Website - Project Documentation

## Overview

Die Mart is a luxury jewellery die manufacturing company based in Tarapur, Maharashtra, India. This website serves as the digital storefront, showcasing the company's 30+ year legacy in die craftsmanship, its product range, manufacturing process, and global reach.

**Owner**: Hussain Nagavadria | **Co-founder**: Elyas Nagavadria
**Domain**: [diemart.co.in](https://diemart.co.in)
**Branch**: `hussain/website-rebuild`

---

## What We've Achieved

### Phase 1: Foundation (commit `c4ec3a9`)
- Scaffolded Next.js 14 project with App Router
- Set up TypeScript, Tailwind CSS, PostCSS
- Configured path aliases (`@/*`)

### Phase 2: Complete Website Build (commit `f764d9b`)
- Built all page sections: Hero, About, Products, Services, Process, Legacy, Contact, Footer
- Created 8 standalone pages under `[locale]/` routing
- Added internationalization with next-intl (English, Hindi, Arabic with RTL)
- Integrated Supabase for contact form submissions
- Implemented SEO: JSON-LD structured data, Open Graph, security headers
- Built responsive navigation with mobile slide-out panel
- Added WhatsApp floating button, custom cursor, scroll indicators
- Created all i18n translation files (en.json, hi.json, ar.json)

### Phase 3: Landing Page Rebuild (commit `31a463a`)
- Redesigned homepage flow with scroll-driven 3-beat hero system
- Built `ScrollSequence` canvas component (120-frame die explosion animation)
- Added `DieViewer3D` - interactive Three.js model viewer with STL loading
- Created `GlobalReach` - 3D globe visualization with geographic markers
- Cleaned up and consolidated component architecture
- Added device capability detection for performance adaptation
- Created `/viewer` page for standalone 3D die viewing

### Phase 4: Bug Fixes & Polish (commits `77d093f`, `a9e98c7`, `92394af`)
- Fixed MotionValue type error in Hero beat counter
- Added light/dark theme toggle with `next-themes`
- Fixed mobile scroll sequence rendering
- Fixed hero text visibility in light mode
- Updated navigation colors for both themes
- Configured theme-aware CSS variables for full color system

---

## Architecture

### Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 14.2.35 |
| Language | TypeScript | 5.x |
| UI | React | 18.x |
| Styling | Tailwind CSS | 3.4.1 |
| Animation | GSAP + @gsap/react | 3.14.2 |
| Motion | Framer Motion | 12.38.0 |
| 3D | Three.js + R3F + Drei | 0.160.0 |
| i18n | next-intl | 4.8.3 |
| Theming | next-themes | 0.4.6 |
| Backend | Supabase | 2.100.0 |
| Utilities | clsx + tailwind-merge | - |
| Noise | simplex-noise | 4.0.3 |

### Directory Structure

```
diemart-website/
├── app/
│   ├── layout.tsx                    # Root layout (fonts, metadata, ThemeProvider)
│   ├── globals.css                   # CSS variables, animations, utility classes
│   ├── page.tsx                      # Root redirect
│   ├── [locale]/
│   │   ├── layout.tsx                # i18n wrapper (NextIntlClientProvider, RTL)
│   │   ├── page.tsx                  # Homepage
│   │   ├── about/page.tsx
│   │   ├── catalog/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── legacy/page.tsx
│   │   ├── process/page.tsx
│   │   ├── products/page.tsx
│   │   ├── services/page.tsx
│   │   └── viewer/page.tsx
│   └── api/
│       └── contact/route.ts          # POST: contact form → Supabase
│
├── components/
│   ├── About.tsx                     # Founder story, 2-column layout
│   ├── CTASection.tsx                # Call-to-action banner
│   ├── CatalogTeaser.tsx             # Catalog access CTA
│   ├── Contact.tsx                   # 5-step validated contact form
│   ├── CustomCursor.tsx              # Mouse-follow cursor (desktop only)
│   ├── DieViewer3D.tsx               # Interactive Three.js STL viewer
│   ├── Footer.tsx                    # 4-column footer with socials
│   ├── GeometricPattern.tsx          # SVG background patterns
│   ├── GlobalReach.tsx               # 3D globe with geographic markers
│   ├── Hero.tsx                      # 3-beat scroll-driven hero
│   ├── LanguageSwitcher.tsx          # en/hi/ar language dropdown
│   ├── Legacy.tsx                    # Timeline 1980-2026
│   ├── Navigation.tsx                # Fixed nav + mobile panel
│   ├── PageHero.tsx                  # Sub-page hero with parallax
│   ├── Process.tsx                   # 6-step manufacturing timeline
│   ├── Products.tsx                  # 6-product grid with SVG icons
│   ├── ScrollIndicator.tsx           # Bouncing scroll chevron
│   ├── SectionDivider.tsx            # Decorative separators
│   ├── Services.tsx                  # 3 service cards
│   ├── Stats.tsx                     # 6 animated stat counters
│   ├── ThemeProvider.tsx             # next-themes wrapper
│   ├── ThemeToggle.tsx               # Dark/light mode toggle
│   ├── TrustBar.tsx                  # Scrolling stats marquee
│   ├── WhatsAppFloat.tsx             # Floating WhatsApp button
│   ├── canvas/
│   │   └── ScrollSequence.tsx        # 120-frame die animation canvas
│   └── three/
│       ├── DieWireframe.tsx          # Wireframe icosahedron
│       ├── HeroR3FOverlay.tsx        # R3F canvas for hero
│       └── ParticleSystem.tsx        # Gold particle effects
│
├── lib/
│   ├── brand.ts                      # All brand constants, product data, timeline
│   ├── animations.ts                 # GSAP animation helpers
│   ├── supabase.ts                   # Supabase client (singleton)
│   ├── i18n/config.ts                # next-intl locale config
│   ├── utils/
│   │   ├── cn.ts                     # clsx + tailwind-merge
│   │   └── deviceCapability.ts       # GPU/device performance detection
│   └── hooks/
│       ├── useDeviceDetect.ts        # Mobile/desktop + perf tier
│       ├── useIntersection.ts        # IntersectionObserver hook
│       ├── useReducedMotion.ts       # prefers-reduced-motion
│       └── useScrollProgress.ts      # Scroll progress with spring smoothing
│
├── messages/
│   ├── en.json                       # English translations (12KB)
│   ├── hi.json                       # Hindi translations (31KB)
│   └── ar.json                       # Arabic translations (24KB)
│
├── public/
│   ├── logo.png                      # Die Mart logo
│   ├── robots.txt
│   ├── models/                       # STL files (bridge, flower, kairi, rectangle)
│   │   └── world.geojson             # Globe geographic data
│   └── sequence/                     # Die animation frames
│       ├── dis/                      # 120 frames (desktop)
│       ├── dis-mobile/               # 120 frames (mobile, lower res)
│       └── asm/                      # 120 frames (assembly alternate)
│
├── middleware.ts                      # next-intl locale routing
├── tailwind.config.ts                # Custom theme (colors, fonts, animations)
├── next.config.mjs                   # Image optimization, security headers, i18n
├── tsconfig.json                     # Strict mode, path aliases
└── postcss.config.mjs
```

### Design System

**Fonts**:
- **Cormorant SC** (700) - Display headlines, brand name
- **Cormorant Garamond** (400, 600, 700 + italic) - Section headings, body text
- **DM Sans** (300, 400, 500) - Navigation, labels, UI text

**Color Palette** (CSS variables, theme-aware):

| Token | Dark Mode | Light Mode |
|-------|-----------|------------|
| `--black-deep` | #0A0906 | #FFFFFF |
| `--black-warm` | #110E08 | #FAF8F5 |
| `--gold-primary` | #D4AF37 | #B8941E |
| `--gold-bright` | #E8C547 | #D4AF37 |
| `--gold-muted` | #B8941E | #8A6D14 |
| `--white-warm` | #FAF8F5 | #1A1508 |

**Animations**:
- `trust-scroll` - 30s linear marquee
- `pulse-glow` - 8s breathing glow
- `chevron-bounce` - 2s scroll indicator
- `fade-up` - 0.8s entrance
- `gold-shimmer` - 2s shimmer effect
- `gold-particle` - 3s particle pulse

**Layout Constants**:
- Nav height: 72px
- Section padding: 120px
- Container max: 1280px
- Ease function: cubic-bezier(0.25, 0.46, 0.45, 0.94)

---

## Homepage Flow

The homepage uses a scroll-driven narrative structure:

### Hero Section (300vh tall, sticky viewport)
Three beats synchronized to a 120-frame die animation canvas:

| Beat | Scroll Range | Content | Die State |
|------|-------------|---------|-----------|
| 1 | 0% - 30% | Brand intro: "DIE MART" title, location, tagline | Whole die |
| 2 | 30% - 65% | "THE DIE" - anatomy description, 3,600+ designs | Exploded view |
| 3 | 65% - 100% | "YOUR DIE" - CTA with WhatsApp + explore buttons | Reassembled |

**Visual layers**: Canvas animation (base) → Gold accent lines → Beat content cards

### Section Sequence
1. **Hero** - Scroll-driven 3-beat animation
2. **About** - Founder story with image, quote block
3. **Products** - 6-card grid (Bangle, Flower, Thappad, Cutting, Emboss, Custom)
4. **Services** - 3 cards (Wirecut Machining, Master Embossing, Quality Testing)
5. **DieViewer3D** - Interactive Three.js STL model viewer
6. **GlobalReach** - 3D globe with India/Middle East/Europe markers
7. **Legacy** - Timeline from 1980 to 2026
8. **Contact** - 5-step form with Supabase backend

---

## Sub-Pages

| Route | Content |
|-------|---------|
| `/about` | About section + Legacy timeline |
| `/products` | Product grid + Specifications + How to Order guide |
| `/services` | Service cards (Wirecut, Embossing, QC) |
| `/process` | 6-step manufacturing process + Services |
| `/legacy` | Heritage stats + About + Timeline + Milestones |
| `/contact` | 5-step form + Get in Touch + Visit Factory + FAQ |
| `/viewer` | Standalone 3D die model viewer |
| `/catalog` | Product catalog grid |

All sub-pages include Navigation, Footer, and WhatsAppFloat.

---

## API

### POST `/api/contact`

Handles contact form submissions.

**Request**:
```json
{
  "inquiry_type": "Bangle Dies | Decorative Dies | Custom Dies | General Inquiry",
  "name": "string (required)",
  "email": "string (required, validated)",
  "country": "string (optional)",
  "requirement": "string (optional)"
}
```

**Response**: `{ "success": true }` (200) or `{ "error": "..." }` (400/500)

**Storage**: Supabase `inquiries` table

---

## Performance Optimizations

**Implemented**:
- Device/GPU detection → adaptive particle counts and DPR caps
- Mobile-specific lower-res frame sequences (dis-mobile/)
- Next.js Image optimization (WebP, AVIF)
- Google Fonts with `display: swap`
- Tailwind CSS purging
- Per-locale lazy message loading
- `prefers-reduced-motion` detection
- Canvas-based frame rendering (not DOM)

**Performance Tiers**:
| Tier | Particles | DPR Cap |
|------|-----------|---------|
| High | 120 | 2.0 |
| Medium | 60 | 1.5 |
| Low | 40 | 1.0 |
| Fallback | 0 | 1.0 |

---

## Security

**Implemented**:
- Security headers: X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy
- Server-side input validation on contact API
- Environment variables for Supabase credentials
- TypeScript strict mode

---

## Business Data

| Metric | Value |
|--------|-------|
| Designs in Archive | 3,600+ |
| Dies Manufactured | 10 Lakh+ |
| Master Karigars | 100+ |
| Factory Locations | 3 |
| Machine Uptime | 24/7 |
| Years of Craft | 30+ |
| Wirecut Rate | Rs.100/box |

**Contact**:
- WhatsApp: +91 74997 49770
- Instagram: @die_mart_
- Location: Tarapur, Maharashtra

**Timeline**:
- 1980: Elyas learns the craft
- 1995: Growing with gold (expansion)
- 2008: CNC revolution (machines)
- 2016: Three factories (scale)
- 2022: Die Mart brand is born
- 2026: Intelligence meets craft (AI/digital)

---

## Git History

```
92394af - Fix hero text visibility and nav for light mode
a9e98c7 - Add light/dark theme toggle and fix mobile scroll sequence
77d093f - Fix MotionValue type error in Hero beat counter
31a463a - Rebuild landing page: new flow, 3D viewer, globe, cleanup
f764d9b - feat: complete Die Mart website with enhanced UI, animations, and standalone pages
c4ec3a9 - Initial commit from Create Next App
```

---

## Current Status

### Fully Complete
- Homepage with all 8 sections
- Scroll-driven 3-beat hero with 120-frame canvas animation
- 28 components (sections, UI, 3D/canvas)
- Dark/light theme with full CSS variable system
- Multilingual support (English, Hindi, Arabic with RTL)
- Responsive design (mobile-first)
- 3D die model viewer (4 STL models)
- Contact form with Supabase backend
- SEO (JSON-LD, Open Graph, security headers)
- Custom cursor, WhatsApp float, scroll indicators
- Navigation with mobile slide-out panel
- All sub-pages with dedicated content

### Partially Complete
- Globe visualization (GlobalReach) - basic implementation, could be enhanced
- Social media links in footer - YouTube/Facebook point to `#`
- Root `app/page.tsx` - still has default Next.js template (redirects to locale)

### Not Started
- Email confirmation after contact form submission
- Admin dashboard for viewing inquiries
- Rate limiting / CAPTCHA on contact API
- Analytics integration (GA, Hotjar)
- PWA support (service worker, offline)
- Blog / News section
- Customer testimonials section
- Live chat integration
- Image gallery / portfolio page
- Video showcase section

---

## Future Roadmap

### Priority 1: Production Polish
- [ ] Fix social media links (YouTube, Facebook URLs)
- [ ] Add loading states / skeleton screens for 3D components
- [ ] Add error boundaries around Three.js components
- [ ] Implement rate limiting on `/api/contact`
- [ ] Add CAPTCHA (reCAPTCHA/hCaptcha) to contact form
- [ ] Optimize frame sequence images (compression, lazy loading)
- [ ] Add analytics (Google Analytics 4)

### Priority 2: Content & Engagement
- [ ] Customer testimonials / reviews section
- [ ] Image gallery showcasing finished dies
- [ ] Video showcase of manufacturing process
- [ ] Blog section for industry news and updates
- [ ] Case studies from notable karigar projects

### Priority 3: Functionality
- [ ] Email notifications on new contact submissions (SendGrid/Resend)
- [ ] Admin panel for managing inquiries
- [ ] WhatsApp Business API integration (direct chat)
- [ ] Live chat widget
- [ ] Product catalog with search and filters

### Priority 4: Technical Improvements
- [ ] PWA support (manifest, service worker, offline)
- [ ] Content Security Policy headers
- [ ] Automated testing (Jest/Vitest + Playwright)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Performance monitoring (Web Vitals)
- [ ] Static generation for sub-pages (ISR)

### Priority 5: Expansion
- [ ] Online order placement system
- [ ] Integration with Die Mart Portal (factory management PWA)
- [ ] Integration with Die Mart Studio (AI 3D design tool)
- [ ] Customer login portal (order tracking)
- [ ] Multi-currency pricing display

---

## Related Projects

| Project | Description | Stack |
|---------|-------------|-------|
| [diemart-portal](../diemart-portal/) | Factory workflow management PWA | Next.js 14, Supabase |
| [diemart-studio](../diemart-studio/) | AI 3D design studio | Next.js 16, Tripo3D/Meshy |
| [Diemart-Api](../Diemart-Api/) | Backend API | FastAPI, Railway |
| [DieMartSearch](../DieMartSearch/) | Image search frontend | Vite, React, Vercel |
| [DieMart_Website](../DieMart_Website/) | Old static website (replaced by this) | HTML, Three.js, GSAP |

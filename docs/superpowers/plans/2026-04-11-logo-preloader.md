# Logo Preloader Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a cinematic, brand-aligned preloader on the DieMart homepage: the DM monogram engraves itself, fills with gold/silver gradient, and gets polished with a shine sweep while the 32 MB hero frame sequence loads in the background — dissolving into the hero only when both finish.

**Architecture:** An inline `<head>` script paints a black overlay before React hydrates (flash prevention). A React Context provider owns the frame-loading lifecycle. Both a new `<Preloader>` component and the existing `<ScrollSequence>` consume the context — ScrollSequence is refactored to *not* load its own frames. The Preloader runs a phase machine (engrave → fill → polish → wordmark → hold → dissolve) and unmounts when frames are ready or a 10-second cap is reached.

**Tech Stack:** Next.js 14 App Router · React 18 · TypeScript · framer-motion 12 · Tailwind CSS · next-intl v4 · next-themes · SVG with stroke-dasharray animation

**Spec:** `docs/superpowers/specs/2026-04-10-logo-preloader-design.md`

**Branch:** `hussain/website-rebuild` (continue on the existing branch; no worktree)

**Testing approach:** The DieMart repo has no test framework configured today, and adding one purely for this visual feature is out of scope. Verification is done via:
1. **TypeScript** — `npx tsc --noEmit` / `next build` catches type and import errors.
2. **ESLint** — `npm run lint` catches unused vars, missing deps, etc.
3. **Manual browser verification** — every task that produces user-visible output has an explicit **Verify** step listing exactly what to look at in the browser and what constitutes success or failure. These are NOT optional.
4. **DevTools Network throttling** (Slow 3G preset) — used to validate the hold-state and 10 s cap behavior in Phase 7.

---

## Phase 0 — Flash-prevention preflash script

**Goal:** Before any React code runs, paint a black overlay on first homepage visit so the user never sees a flash of hero content. This is the simplest, lowest-risk piece and it's a prerequisite for everything else.

---

### Task 0.1 — Add inline `<head>` script to `app/layout.tsx`

**Files:**
- Modify: `app/layout.tsx` (add `<script>` block inside `<head>`)

- [ ] **Step 1: Open `app/layout.tsx` and locate the existing `<head>`**

The file currently has a `<head>` containing a JSON-LD `<script>`. We'll add a new inline script **above** the JSON-LD one so it runs as early as possible.

- [ ] **Step 2: Add the preflash script**

Inside the `<head>` block, insert this **above** the existing JSON-LD script:

```tsx
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){try{
  if(sessionStorage.getItem('dm_preloader_seen'))return;
  var p=location.pathname;
  var onHome=p==='/'||/^\\/(en|hi|ar)\\/?$/.test(p);
  if(!onHome)return;
  var d=document.createElement('div');
  d.id='dm-preflash';
  d.setAttribute('aria-hidden','true');
  d.style.cssText='position:fixed;inset:0;background:#080704;z-index:9999;';
  (document.body||document.documentElement).appendChild(d);
  window.__dmPreflashActive=true;
}catch(e){}})();
            `.trim(),
          }}
        />
```

**Why `dangerouslySetInnerHTML`:** Next.js requires this for inline scripts that should run as-is in the HTML source.
**Why the try/catch:** `sessionStorage` throws in some private-browsing modes; we swallow it and fall through to "no preflash", which is graceful degradation.
**Why the regex is escaped (`\\/`):** Inside a JS string inside a TSX template literal, each backslash needs to be doubled.
**Why `body||documentElement`:** At parse time, `document.body` may not yet exist. `documentElement` (the `<html>`) is always there as a fallback.

- [ ] **Step 3: Run the dev server and verify flash prevention**

Run:
```bash
cd F:/DieMart/diemart-website && npm run dev
```

**Verify (first visit):**
1. Open a **fresh** Incognito/Private window.
2. In DevTools → Network, set throttling to **Slow 3G**.
3. Navigate to `http://localhost:3000/`.
4. **Expected:** The entire viewport is immediately black the instant the page starts loading. You should NOT see any flash of hero images, navigation, or text before the black fills the screen.
5. In DevTools → Elements, confirm a `<div id="dm-preflash">` is present.

**Verify (subsequent visit):**
1. In the same private window, navigate to a non-home route in the URL bar (e.g., `http://localhost:3000/en/about`).
2. **Expected:** No black overlay. The about page renders normally.
3. Back in DevTools → Elements, confirm NO `<div id="dm-preflash">` exists.

**Verify (returning visitor):**
1. Open the DevTools console and run: `sessionStorage.setItem('dm_preloader_seen','1')`
2. Hard-reload the homepage (Ctrl+Shift+R).
3. **Expected:** No black overlay on homepage either.
4. Clean up: `sessionStorage.removeItem('dm_preloader_seen')` so the next verification starts fresh.

**If any of the above fails:** STOP. Debug before proceeding. Most likely cause is the script not running early enough — check it's inside `<head>` and NOT inside `<body>`.

- [ ] **Step 4: TypeScript + lint check**

```bash
cd F:/DieMart/diemart-website && npm run lint && npx tsc --noEmit
```

Expected: Both exit with code 0 (no errors).

- [ ] **Step 5: Commit**

```bash
cd F:/DieMart/diemart-website && git add app/layout.tsx && git commit -m "feat(preloader): add preflash script for flash prevention"
```

---

## Phase 1 — Preload provider + ScrollSequence refactor

**Goal:** Lift frame loading out of `ScrollSequence` into a shared React Context provider. After this phase the site should behave *identically* to today (same existing loading behavior, same canvas output), just with the internals rewired. No user-visible changes yet.

This phase is a pure refactor and can be shipped independently.

---

### Task 1.1 — Create `HeroPreloadContext` and provider

**Files:**
- Create: `lib/preload/HeroPreloadContext.tsx`

- [ ] **Step 1: Create the directory**

```bash
cd F:/DieMart/diemart-website && mkdir -p lib/preload
```

- [ ] **Step 2: Write `lib/preload/HeroPreloadContext.tsx`**

Create the file with this exact content:

```tsx
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

const TOTAL_FRAMES = 120;

export type HeroPreloadState = {
  /** Array of 120 HTMLImageElement, populated as each frame loads. */
  images: HTMLImageElement[];
  /** True once all 120 frames have either loaded or errored. */
  framesReady: boolean;
  /** Integer 0–100 representing load progress. */
  progress: number;
  /** Which sequence dir is being loaded (true = mobile). */
  isMobile: boolean;
};

const HeroPreloadContext = createContext<HeroPreloadState | null>(null);

function getFramePaths(mobile: boolean): string[] {
  const dir = mobile ? '/sequence/dis-mobile' : '/sequence/dis';
  return Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    const num = String(i + 1).padStart(4, '0');
    return `${dir}/frame_${num}.jpg`;
  });
}

export function HeroPreloadProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [framesReady, setFramesReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Detect viewport size once on mount.
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Kick off frame loading as soon as isMobile is known.
  useEffect(() => {
    const paths = getFramePaths(isMobile);
    const images: HTMLImageElement[] = [];
    let count = 0;
    let cancelled = false;

    paths.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (cancelled) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) setFramesReady(true);
      };
      img.onerror = () => {
        if (cancelled) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) setFramesReady(true);
      };
      images[i] = img;
    });

    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, [isMobile]);

  const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  const value: HeroPreloadState = {
    images: imagesRef.current,
    framesReady,
    progress,
    isMobile,
  };

  return (
    <HeroPreloadContext.Provider value={value}>
      {children}
    </HeroPreloadContext.Provider>
  );
}

/**
 * Hook to consume the hero preload state.
 * Must be called inside a <HeroPreloadProvider>.
 */
export function useHeroPreload(): HeroPreloadState {
  const ctx = useContext(HeroPreloadContext);
  if (!ctx) {
    throw new Error(
      'useHeroPreload must be called inside a <HeroPreloadProvider>'
    );
  }
  return ctx;
}
```

**Key design notes:**
- `imagesRef` holds the actual `HTMLImageElement[]` to avoid rerendering on every image load. Only the `loadedCount` state drives rerenders.
- We intentionally expose `imagesRef.current` in the context value — ScrollSequence needs stable references to the same Image objects it will draw to canvas.
- The `cancelled` flag prevents state updates after unmount (React strict mode safety).
- `onerror` is counted as "loaded" so a broken CDN or missing file never hangs the provider.

- [ ] **Step 3: Type check**

```bash
cd F:/DieMart/diemart-website && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
cd F:/DieMart/diemart-website && git add lib/preload/HeroPreloadContext.tsx && git commit -m "feat(preloader): add HeroPreloadProvider context for shared frame loading"
```

---

### Task 1.2 — Wrap homepage with the provider

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Update `app/[locale]/page.tsx`**

Import the provider and wrap the homepage tree in it.

Change the imports block at the top from:

```tsx
'use client';

import Navigation from '@/components/Navigation';
import About from '@/components/About';
// ... existing imports
import Hero from '@/components/Hero';
```

to add the provider import:

```tsx
'use client';

import { HeroPreloadProvider } from '@/lib/preload/HeroPreloadContext';
import Navigation from '@/components/Navigation';
import About from '@/components/About';
// ... existing imports
import Hero from '@/components/Hero';
```

Then wrap the returned JSX. Change:

```tsx
  return (
    <>
      <a href="#story" ...>Skip to content</a>
      <Navigation />
      <main>...</main>
      <Footer />
      <WhatsAppFloat />
      <CustomCursor />
    </>
  );
```

to:

```tsx
  return (
    <HeroPreloadProvider>
      <a href="#story" ...>Skip to content</a>
      <Navigation />
      <main>...</main>
      <Footer />
      <WhatsAppFloat />
      <CustomCursor />
    </HeroPreloadProvider>
  );
```

Leave the `<a>`, `<Navigation>`, `<main>`, `<Footer>`, `<WhatsAppFloat>`, and `<CustomCursor>` exactly as they are — we're just replacing the `<>…</>` fragment with `<HeroPreloadProvider>…</HeroPreloadProvider>`.

- [ ] **Step 2: Type check**

```bash
cd F:/DieMart/diemart-website && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Don't test yet**

At this point the provider is wrapping the tree but `ScrollSequence` is still loading its own frames. Both are loading in parallel — meaning the 32 MB sequence is being fetched TWICE. This is temporary and will be fixed in Task 1.3. **Do not commit or verify in the browser yet** — wait until Task 1.3 is done.

---

### Task 1.3 — Refactor `ScrollSequence.tsx` to consume the context

**Files:**
- Modify: `components/canvas/ScrollSequence.tsx`

- [ ] **Step 1: Replace the file contents**

The simplest way to do this task cleanly is to rewrite the file. Replace the entire contents of `components/canvas/ScrollSequence.tsx` with:

```tsx
'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { MotionValue } from 'framer-motion';
import { useHeroPreload } from '@/lib/preload/HeroPreloadContext';

const TOTAL_FRAMES = 120;

interface ScrollSequenceProps {
  progress: MotionValue<number>;
}

export default function ScrollSequence({ progress: smoothProgress }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { images, framesReady } = useHeroPreload();

  // Draw frame to canvas based on scroll
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const img = images[frameIndex];
      if (!img || !img.complete) return;

      // Set canvas size to match container
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = w / h;
      let drawW: number, drawH: number, drawX: number, drawY: number;

      const mobile = w < 768;

      if (mobile) {
        // Mobile: contain — show full frame, center vertically in upper portion
        drawW = w;
        drawH = w / imgAspect;
        drawX = 0;
        drawY = h * 0.08;
      } else {
        // Desktop: cover — fill entire viewport
        if (imgAspect > canvasAspect) {
          drawH = h;
          drawW = h * imgAspect;
          drawX = (w - drawW) / 2;
          drawY = 0;
        } else {
          drawW = w;
          drawH = w / imgAspect;
          drawX = 0;
          drawY = (h - drawH) / 2;
        }
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    [images]
  );

  // Subscribe to smooth scroll progress
  useEffect(() => {
    if (!framesReady) return;
    const unsubscribe = smoothProgress.on('change', (v: number) => {
      const frameIndex = Math.min(
        Math.floor(v * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );
      drawFrame(Math.max(0, frameIndex));
    });
    // Draw first frame immediately
    drawFrame(0);
    return unsubscribe;
  }, [framesReady, smoothProgress, drawFrame]);

  return (
    <div className="absolute inset-0 z-10" aria-hidden="true" style={{ background: '#080704' }}>
      {/* Canvas for scroll-linked frames. No in-canvas preloader — the
          <Preloader> component covers the whole page during loading. */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: framesReady ? 1 : 0, transition: 'opacity 0.8s ease' }}
      />
    </div>
  );
}
```

**What changed:**
- Removed `imagesRef`, `loaded` state, `loadProgress` state, `isMobile` state, and the entire "Preload all frames" useEffect
- Imports `useHeroPreload` and reads `images` + `framesReady` from it
- `drawFrame` now reads from `images` (context) instead of `imagesRef.current`
- The `{!loaded && <Preloader UI/>}` JSX block is gone (lines 124-137 of the original)
- Canvas opacity is bound to `framesReady` instead of the local `loaded` state

- [ ] **Step 2: Type check**

```bash
cd F:/DieMart/diemart-website && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Lint**

```bash
cd F:/DieMart/diemart-website && npm run lint
```

Expected: No errors. If there are warnings about unused imports (e.g., `useState`), clean them up — they indicate leftover code from the old version.

- [ ] **Step 4: Verify in the browser**

Start the dev server (`npm run dev`) and visit `http://localhost:3000/`.

**Verify:**
1. Page loads normally.
2. The preflash overlay from Phase 0 shows initially (if you're in a fresh session).
3. The old in-canvas "Loading X%" progress bar **no longer appears anywhere** — instead, the canvas area stays black briefly (because opacity is 0 until `framesReady`), then fades in.
4. Scrolling the hero advances the die animation smoothly, exactly like before.
5. Open DevTools → Network tab → filter by "frame_". You should see exactly **120 frame requests**, not 240. **This is critical** — if you see 240, the old ScrollSequence loader is still firing and the refactor is incomplete.

- [ ] **Step 5: Commit**

```bash
cd F:/DieMart/diemart-website && git add components/canvas/ScrollSequence.tsx app/[locale]/page.tsx && git commit -m "refactor(hero): move frame loading to HeroPreloadProvider"
```

---

## Phase 2 — DM monogram SVG (gated by mockup approval)

**Goal:** Hand-build a clean SVG version of the DM monogram that can be stroke-animated later. This phase has a hard approval gate — do not proceed to Phase 3 until Hussain approves the shape visually.

---

### Task 2.1 — Create `DMMonogramSVG.tsx` with static paths

**Files:**
- Create: `components/preloader/DMMonogramSVG.tsx`

- [ ] **Step 1: Create the directory**

```bash
cd F:/DieMart/diemart-website && mkdir -p components/preloader
```

- [ ] **Step 2: Write an initial static version**

Create `components/preloader/DMMonogramSVG.tsx` with this starting geometry. The viewBox is `0 0 400 300`. The D and M are sized and positioned to roughly match `public/logo.png` — expect to iterate on the exact path data during review.

```tsx
'use client';

/**
 * DMMonogramSVG — hand-built SVG of the DieMart DM monogram.
 *
 * Geometry is based on public/logo.png and designed to be stroke-animated
 * via stroke-dasharray/stroke-dashoffset. Paths are intentionally simple
 * (few control points) so they draw cleanly.
 *
 * viewBox: 0 0 400 300
 *   - Roomy above/below the letters for shine overflow
 *   - D occupies roughly x=80..200, y=60..240
 *   - M occupies roughly x=170..320, y=60..240 (overlaps D)
 */
export default function DMMonogramSVG({
  width = 280,
  height = 210,
  className = '',
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dmMetalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C547" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="60%" stopColor="#C0C0C0" />
          <stop offset="100%" stopColor="#8C7853" />
        </linearGradient>
      </defs>

      {/* D — left letterform.
          Starts at top-left, goes down the left spine, curves around
          the bowl, back up the spine to close. */}
      <path
        d="M 90 60
           L 90 240
           L 150 240
           C 210 240 230 200 230 150
           C 230 100 210 60 150 60
           Z"
        fill="url(#dmMetalGradient)"
        stroke="url(#dmMetalGradient)"
        strokeWidth="2"
      />

      {/* M — right letterform, overlapping D's bowl.
          Starts at bottom-left, goes up the left leg, diagonal down to
          the valley, diagonal up to the right peak, down the right leg. */}
      <path
        d="M 200 240
           L 200 60
           L 260 180
           L 320 60
           L 320 240"
        fill="none"
        stroke="url(#dmMetalGradient)"
        strokeWidth="30"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
    </svg>
  );
}
```

**Note to engineer:** This geometry is a **first draft**. It is almost certainly slightly wrong — the real logo has specific proportions and the M interlocks with the D in a particular way. Hussain will review the static render and request corrections. Expect 1–3 iterations on the path data before this is approved. Do NOT treat the initial coordinates as final.

- [ ] **Step 3: Type check**

```bash
cd F:/DieMart/diemart-website && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Do NOT commit yet**

We commit after Hussain approves the final geometry (Task 2.3).

---

### Task 2.2 — Temporary visual review route

**Files:**
- Create: `app/preview-logo/page.tsx`

This is a throwaway route used only for reviewing the SVG against the reference PNG. It will be deleted after approval.

- [ ] **Step 1: Create the directory**

```bash
cd F:/DieMart/diemart-website && mkdir -p app/preview-logo
```

- [ ] **Step 2: Write `app/preview-logo/page.tsx`**

```tsx
'use client';

import Image from 'next/image';
import DMMonogramSVG from '@/components/preloader/DMMonogramSVG';

export default function PreviewLogoPage() {
  return (
    <div className="min-h-screen bg-[#080704] text-white p-8 flex flex-col items-center gap-16">
      <h1 className="font-dm-sans text-sm uppercase tracking-widest text-[#D4AF37]/60">
        Logo Preview — delete me before shipping
      </h1>

      {/* Side-by-side comparison */}
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="flex flex-col items-center gap-3">
          <span className="font-dm-sans text-xs uppercase tracking-wider text-white/40">
            Reference (PNG)
          </span>
          <div className="w-[400px] h-[300px] flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="DieMart reference logo"
              width={400}
              height={300}
              priority
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="font-dm-sans text-xs uppercase tracking-wider text-white/40">
            Rebuilt (SVG)
          </span>
          <div className="w-[400px] h-[300px] flex items-center justify-center">
            <DMMonogramSVG width={400} height={300} />
          </div>
        </div>
      </div>

      {/* Overlay comparison — SVG on top of PNG at 50% opacity */}
      <div className="flex flex-col items-center gap-3">
        <span className="font-dm-sans text-xs uppercase tracking-wider text-white/40">
          Overlay (PNG dimmed, SVG on top)
        </span>
        <div className="relative w-[400px] h-[300px]">
          <div className="absolute inset-0 opacity-30">
            <Image src="/logo.png" alt="" width={400} height={300} />
          </div>
          <div className="absolute inset-0">
            <DMMonogramSVG width={400} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Start dev server and view the preview**

```bash
cd F:/DieMart/diemart-website && npm run dev
```

Visit `http://localhost:3000/preview-logo`.

- [ ] **Step 4: Take a screenshot for review**

Capture a screenshot of the preview page and show it to Hussain. Ask directly:
> "Does the SVG match the logo well enough to proceed, or do you want changes? Zoom into the overlay view — anywhere the gold SVG doesn't sit inside the dimmed PNG shape needs fixing."

---

### Task 2.3 — Iterate on path data until approved (APPROVAL GATE)

**Files:**
- Modify: `components/preloader/DMMonogramSVG.tsx` (iteratively)

- [ ] **Step 1: Review the gaps**

Based on Hussain's feedback, identify specific issues:
- Does the D bowl curve match?
- Is the M's valley depth correct?
- Are the D and M overlap positions right?
- Is the stroke width of the M appropriate?
- Does the overall weight feel right?

- [ ] **Step 2: Adjust path coordinates and re-render**

Edit `DMMonogramSVG.tsx`, tweak the `d=` values, save, and let Next.js hot-reload the `/preview-logo` page. Compare again.

**Practical tips for path editing:**
- The `<path d="...">` syntax: `M x y` = move to; `L x y` = line to; `C cx1 cy1 cx2 cy2 x y` = cubic bezier; `Z` = close path.
- For the D, the bowl curvature is controlled by the two cubic control points. Moving them toward the right opens the bowl wider; moving them up/down changes the top-bottom roundness.
- For the M, it's a stroked polyline with `fill="none"`. The width of the letter is controlled by `strokeWidth` — heavier strokes look chunkier.
- Keep symmetry: if the M's left leg is at x=200, the right leg should be at x=(200 + width).

- [ ] **Step 3: Repeat until Hussain says "approved"**

**Do NOT proceed past this step without explicit approval.** Expect 1–3 iterations. If after 3 iterations the match still isn't good enough, pause and discuss whether to:
- Accept a slightly stylized version that's close but not pixel-perfect
- Ask Hussain for a source file (Illustrator .ai, Figma, etc.)
- Fall back to tracing the PNG and cleaning up the result

- [ ] **Step 4: Commit the approved SVG**

```bash
cd F:/DieMart/diemart-website && git add components/preloader/DMMonogramSVG.tsx && git commit -m "feat(preloader): add approved DM monogram SVG geometry"
```

**Leave the `/preview-logo` route in place for now** — we'll delete it in Phase 7 QA once everything is validated.

---

### Task 2.4 — Decide wordmark option (A: HTML text vs. B: cropped PNG)

- [ ] **Step 1: Generate a quick A/B comparison**

On the `/preview-logo` page, add a second section that shows both wordmark options below the monogram:

**Option A (HTML text):**

```tsx
<div className="flex flex-col items-center gap-2">
  <DMMonogramSVG width={320} height={240} />
  <h2 className="font-cormorant-sc font-bold text-4xl text-transparent bg-gradient-to-br from-[#E8C547] via-[#D4AF37] to-[#8C7853] bg-clip-text">
    DIE MART
  </h2>
  <p className="font-dm-sans font-light text-[10px] tracking-[0.3em] text-[#D4AF37]/70 uppercase">
    Jewellery Die Manufacturing
  </p>
</div>
```

**Option B (cropped PNG):** Render `public/logo.png` but clipped to show only the wordmark area (use `object-position` and `overflow-hidden` to crop out the DM monogram at the top).

- [ ] **Step 2: Show both to Hussain and ask which one**

Ask directly:
> "Two wordmark options below the monogram. Option A is HTML text styled with your Cormorant SC and DM Sans fonts. Option B is the original PNG cropped to show just the 'DIE MART / JEWELLERY DIE MANUFACTURING' area. Which one?"

- [ ] **Step 3: Note the choice**

Write the chosen option at the top of `DMMonogramSVG.tsx` as a comment:

```tsx
// Wordmark treatment: Option A (HTML text) | Option B (cropped PNG)
// Decided: <A or B>
```

---

### Task 2.5 — Implement the chosen wordmark option

**Files:**
- Modify: `components/preloader/DMMonogramSVG.tsx` (to accept a `showWordmark` prop) OR create a sibling component

- [ ] **Step 1: Decide the API**

The cleanest pattern: keep `DMMonogramSVG` as just the DM mark (no wordmark), and create a wrapper component `DMLogoLockup.tsx` that composes the SVG + the chosen wordmark option. This keeps the animation surface (just the SVG) separate from the static wordmark.

- [ ] **Step 2: Create `components/preloader/DMLogoLockup.tsx`**

**If Option A was chosen:**

```tsx
'use client';

import DMMonogramSVG from './DMMonogramSVG';

export default function DMLogoLockup({
  wordmarkVisible = true,
}: {
  wordmarkVisible?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <DMMonogramSVG width={320} height={240} />
      <div
        className="flex flex-col items-center gap-1 transition-opacity duration-[400ms]"
        style={{
          opacity: wordmarkVisible ? 1 : 0,
          transform: `translateY(${wordmarkVisible ? 0 : 6}px)`,
          transition: 'opacity 400ms ease, transform 400ms ease',
        }}
        aria-hidden="true"
      >
        <h2 className="font-cormorant-sc font-bold text-3xl md:text-4xl tracking-wide text-transparent bg-gradient-to-br from-[#E8C547] via-[#D4AF37] to-[#8C7853] bg-clip-text">
          DIE MART
        </h2>
        <p className="font-dm-sans font-light text-[9px] md:text-[10px] tracking-[0.3em] text-[#D4AF37]/70 uppercase">
          Jewellery Die Manufacturing
        </p>
      </div>
    </div>
  );
}
```

**If Option B was chosen:**

```tsx
'use client';

import Image from 'next/image';
import DMMonogramSVG from './DMMonogramSVG';

export default function DMLogoLockup({
  wordmarkVisible = true,
}: {
  wordmarkVisible?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <DMMonogramSVG width={320} height={240} />
      {/* Crop the original logo.png to show only the wordmark area.
          Adjust objectPosition if the crop needs shifting. */}
      <div
        className="relative w-[280px] h-[60px] overflow-hidden transition-opacity duration-[400ms]"
        style={{
          opacity: wordmarkVisible ? 1 : 0,
          transform: `translateY(${wordmarkVisible ? 0 : 6}px)`,
          transition: 'opacity 400ms ease, transform 400ms ease',
        }}
        aria-hidden="true"
      >
        <Image
          src="/logo.png"
          alt=""
          width={670}
          height={370}
          className="absolute"
          style={{
            width: '280px',
            height: 'auto',
            objectPosition: 'center 70%',
            top: '-140px',
          }}
          priority
        />
      </div>
    </div>
  );
}
```

The `top: '-140px'` value may need tweaking to correctly crop to just the "DIE MART" wordmark area — test on `/preview-logo` and adjust.

- [ ] **Step 3: Update `/preview-logo` to use the lockup**

Replace the direct `DMMonogramSVG` usages in the preview page with `DMLogoLockup` to verify the wordmark renders correctly.

- [ ] **Step 4: Verify visually**

Start the dev server and visit `/preview-logo`. Confirm with Hussain that the lockup looks correct.

- [ ] **Step 5: Commit**

```bash
cd F:/DieMart/diemart-website && git add components/preloader/DMLogoLockup.tsx app/preview-logo/page.tsx && git commit -m "feat(preloader): add DMLogoLockup with chosen wordmark treatment"
```

---

## Phase 3 — Preloader component (static, no animation)

**Goal:** Build the full-screen `<Preloader>` component with correct session handling, preflash handoff, and a simple "dissolve when framesReady" behavior. No animation yet — the logo appears fully formed and dissolves when ready. This is the minimum viable preloader we can ship in a pinch.

---

### Task 3.1 — Write `components/preloader/Preloader.tsx` (static version)

**Files:**
- Create: `components/preloader/Preloader.tsx`

- [ ] **Step 1: Write the component**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useHeroPreload } from '@/lib/preload/HeroPreloadContext';
import DMLogoLockup from './DMLogoLockup';

const SESSION_KEY = 'dm_preloader_seen';
const HARD_CAP_MS = 10_000;
const DISSOLVE_MS = 600;

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // sessionStorage may be disabled in private browsing — ignore.
  }
}

function alreadySeen(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function removePreflashOverlay() {
  if (typeof document === 'undefined') return;
  const el = document.getElementById('dm-preflash');
  if (el && el.parentNode) el.parentNode.removeChild(el);
}

export default function Preloader() {
  const { framesReady, progress } = useHeroPreload();
  // `shouldShow` is set on first client render based on sessionStorage.
  // null means "we haven't decided yet" — used to avoid SSR/CSR mismatch.
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);
  const [dissolving, setDissolving] = useState(false);
  const [done, setDone] = useState(false);

  // Decide on first client render whether to show at all.
  useEffect(() => {
    if (alreadySeen()) {
      setShouldShow(false);
      removePreflashOverlay();
      return;
    }
    setShouldShow(true);
    // Take over from the preflash div.
    removePreflashOverlay();
  }, []);

  // Hard cap — force dissolve after 10 seconds regardless of framesReady.
  useEffect(() => {
    if (shouldShow !== true || dissolving || done) return;
    const t = setTimeout(() => setDissolving(true), HARD_CAP_MS);
    return () => clearTimeout(t);
  }, [shouldShow, dissolving, done]);

  // Dissolve once frames are ready.
  useEffect(() => {
    if (shouldShow !== true || dissolving || done) return;
    if (framesReady) setDissolving(true);
  }, [framesReady, shouldShow, dissolving, done]);

  // Finish the dissolve after DISSOLVE_MS.
  useEffect(() => {
    if (!dissolving) return;
    const t = setTimeout(() => {
      markSeen();
      setDone(true);
    }, DISSOLVE_MS);
    return () => clearTimeout(t);
  }, [dissolving]);

  if (shouldShow !== true || done) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
      style={{
        background: '#080704',
        opacity: dissolving ? 0 : 1,
        transition: `opacity ${DISSOLVE_MS}ms ease`,
        pointerEvents: dissolving ? 'none' : 'auto',
      }}
    >
      <DMLogoLockup wordmarkVisible={true} />

      {/* Thin gold hairline progress bar — shows real % while frames load. */}
      <div className="mt-10 w-[240px] h-[1px] bg-white/5 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-[#D4AF37] transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
```

**Why `z-[9998]`:** One less than the preflash's `9999` so the preflash sits on top during the tiny handoff window. Then the preflash is removed from the DOM and the preloader takes over.

**Why `shouldShow: boolean | null`:** Server-side render outputs nothing (returns `null`) so no flash of the preloader on non-first-visit users. Client-side effect decides the real value.

- [ ] **Step 2: Type check**

```bash
cd F:/DieMart/diemart-website && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
cd F:/DieMart/diemart-website && git add components/preloader/Preloader.tsx && git commit -m "feat(preloader): add static Preloader component with session + dissolve"
```

---

### Task 3.2 — Mount `<Preloader />` inside the homepage

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Import the Preloader**

Add to the imports block:

```tsx
import Preloader from '@/components/preloader/Preloader';
```

- [ ] **Step 2: Mount it inside the provider**

Add `<Preloader />` as the **first** child of `<HeroPreloadProvider>`:

```tsx
  return (
    <HeroPreloadProvider>
      <Preloader />
      <a href="#story" ...>Skip to content</a>
      <Navigation />
      ...
    </HeroPreloadProvider>
  );
```

- [ ] **Step 3: Full browser verification — first visit**

Start the dev server. Open a fresh Incognito window. Navigate to `http://localhost:3000/`.

**Expected sequence:**
1. Black preflash appears instantly (Phase 0).
2. React hydrates; preflash is removed; Preloader takes over. Visually the screen stays black — the handoff should be invisible.
3. DM monogram appears, wordmark below it, thin gold progress bar below that.
4. As frames load, the progress bar fills.
5. When frames finish, the overlay fades out over 600ms and the hero appears.
6. Scrolling is immediately smooth.

**Verify:**
- [ ] Preflash → preloader handoff is invisible (no flash of other content)
- [ ] Logo lockup is centered and readable
- [ ] Progress bar fills smoothly, reaches 100%
- [ ] Dissolve is smooth, no jump
- [ ] Hero is immediately scrollable after dissolve

- [ ] **Step 4: Verify — second visit in the same session**

Without closing the tab, reload the homepage (Ctrl+R, not hard reload).

**Expected:**
- No preloader. Hero loads directly.
- There may still be a very brief black flash from the preflash script — this is correct because the preflash script doesn't know about `sessionStorage` yet in a race condition... actually wait, it does check `sessionStorage`. So there should be NO black flash either. Verify this.

- [ ] **Step 5: Verify — reset session and repeat**

In the DevTools console: `sessionStorage.removeItem('dm_preloader_seen')` then reload. Preloader should appear again. Good.

- [ ] **Step 6: Verify — non-home route**

Navigate to `http://localhost:3000/en/about` (in a fresh session).

**Expected:**
- No preloader appears.
- No black flash.
- About page renders immediately.

- [ ] **Step 7: Commit**

```bash
cd F:/DieMart/diemart-website && git add app/[locale]/page.tsx && git commit -m "feat(preloader): mount Preloader on homepage"
```

---

## Phase 4 — Animation: Engrave phase

**Goal:** Make the DM monogram draw itself on via stroke animation. After this phase the logo will engrave (Beat 1) but will NOT fill or polish yet — that comes in Phase 5.

---

### Task 4.1 — Add animation-phase plumbing

**Files:**
- Modify: `components/preloader/DMMonogramSVG.tsx` (accept a `phase` prop)
- Modify: `components/preloader/DMLogoLockup.tsx` (pass `phase` through)
- Modify: `components/preloader/Preloader.tsx` (add phase state machine)

- [ ] **Step 1: Extend `DMMonogramSVG.tsx` to accept a phase prop**

Replace `DMMonogramSVG` with this version:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

export type MonogramPhase = 'idle' | 'engrave' | 'fill' | 'polish' | 'done';

export default function DMMonogramSVG({
  width = 280,
  height = 210,
  className = '',
  phase = 'engrave',
}: {
  width?: number;
  height?: number;
  className?: string;
  phase?: MonogramPhase;
}) {
  const dPathRef = useRef<SVGPathElement>(null);
  const mPathRef = useRef<SVGPathElement>(null);

  const dControls = useAnimationControls();
  const mControls = useAnimationControls();

  // On mount: set up initial dasharray/offset so the paths are invisible.
  useEffect(() => {
    const dEl = dPathRef.current;
    const mEl = mPathRef.current;
    if (!dEl || !mEl) return;

    const dLen = dEl.getTotalLength();
    const mLen = mEl.getTotalLength();

    dEl.style.strokeDasharray = String(dLen);
    dEl.style.strokeDashoffset = String(dLen);
    mEl.style.strokeDasharray = String(mLen);
    mEl.style.strokeDashoffset = String(mLen);
  }, []);

  // Drive the engrave animation.
  useEffect(() => {
    if (phase !== 'engrave') return;
    dControls.start({
      strokeDashoffset: 0,
      transition: { duration: 1.0, ease: 'easeInOut' },
    });
    mControls.start({
      strokeDashoffset: 0,
      transition: { duration: 1.2, delay: 0.4, ease: 'easeInOut' },
    });
  }, [phase, dControls, mControls]);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dmMetalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C547" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="60%" stopColor="#C0C0C0" />
          <stop offset="100%" stopColor="#8C7853" />
        </linearGradient>
      </defs>

      <motion.path
        ref={dPathRef}
        d="M 90 60 L 90 240 L 150 240 C 210 240 230 200 230 150 C 230 100 210 60 150 60 Z"
        fill="transparent"
        stroke="url(#dmMetalGradient)"
        strokeWidth="2"
        animate={dControls}
      />

      <motion.path
        ref={mPathRef}
        d="M 200 240 L 200 60 L 260 180 L 320 60 L 320 240"
        fill="none"
        stroke="url(#dmMetalGradient)"
        strokeWidth="30"
        strokeLinejoin="miter"
        strokeLinecap="butt"
        animate={mControls}
      />
    </svg>
  );
}
```

**Important:** Use the **approved path coordinates** from Task 2.3, not the placeholder coordinates above.

- [ ] **Step 2: Update `DMLogoLockup.tsx` to accept and pass `phase`**

```tsx
'use client';

import DMMonogramSVG, { type MonogramPhase } from './DMMonogramSVG';

export default function DMLogoLockup({
  phase = 'engrave',
  wordmarkVisible = false,
}: {
  phase?: MonogramPhase;
  wordmarkVisible?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <DMMonogramSVG width={320} height={240} phase={phase} />
      {/* ... same wordmark JSX as Phase 2, using wordmarkVisible as before ... */}
    </div>
  );
}
```

Keep the wordmark JSX from whichever option (A or B) was chosen in Phase 2 — just add the `phase` prop passthrough.

- [ ] **Step 3: Add phase state machine to `Preloader.tsx`**

Add phase state and a simple timer chain that drives it:

```tsx
type Phase =
  | 'engrave'
  | 'fill'      // unused in Phase 4, wired in Phase 5
  | 'polish'    // unused in Phase 4, wired in Phase 5
  | 'wordmark'  // unused in Phase 4, wired in Phase 6
  | 'hold'
  | 'dissolving'
  | 'done';

const [phase, setPhase] = useState<Phase>('engrave');

// Phase timing chain (Phase 4: engrave → hold)
useEffect(() => {
  if (shouldShow !== true) return;
  const timers: ReturnType<typeof setTimeout>[] = [];
  // Engrave takes ~1.6s (D 0-1.0s, M 0.4-1.6s). Move to hold after.
  timers.push(setTimeout(() => setPhase('hold'), 1_700));
  return () => timers.forEach(clearTimeout);
}, [shouldShow]);
```

Then pass `phase` down to `DMLogoLockup`:

```tsx
<DMLogoLockup phase={phase === 'dissolving' ? 'done' : phase as MonogramPhase} wordmarkVisible={true} />
```

For now, keep `wordmarkVisible={true}` so the wordmark is always visible — we'll make it phase-driven in Phase 6.

- [ ] **Step 4: Type check and lint**

```bash
cd F:/DieMart/diemart-website && npx tsc --noEmit && npm run lint
```

Expected: No errors.

- [ ] **Step 5: Verify in the browser**

Start dev server. Open a fresh incognito session. Visit `http://localhost:3000/`.

**Expected:**
1. Black preflash.
2. DM monogram draws itself on: D starts at T≈0, finishes at T≈1.0s. M starts at T≈0.4s, finishes at T≈1.6s.
3. After the draw completes, the logo sits static (no fill yet — so it's just the outline).
4. Progress bar fills as frames load.
5. When frames finish, dissolve.

The outline-only "static hold" state looks unfinished because there's no fill. That's expected for Phase 4. The fill comes in Phase 5.

- [ ] **Step 6: Commit**

```bash
cd F:/DieMart/diemart-website && git add components/preloader/ && git commit -m "feat(preloader): add engrave animation for DM monogram"
```

---

## Phase 5 — Animation: Fill + Polish phases

**Goal:** After the engrave completes, fill the letterforms with the metal gradient (fill phase), then sweep a gold shine across them (polish phase).

---

### Task 5.1 — Add fill phase to the monogram

**Files:**
- Modify: `components/preloader/DMMonogramSVG.tsx`

- [ ] **Step 1: Add fill transition driven by phase**

Extend the `useEffect` that watches `phase`:

```tsx
useEffect(() => {
  if (phase === 'engrave') {
    dControls.start({
      strokeDashoffset: 0,
      transition: { duration: 1.0, ease: 'easeInOut' },
    });
    mControls.start({
      strokeDashoffset: 0,
      transition: { duration: 1.2, delay: 0.4, ease: 'easeInOut' },
    });
  } else if (phase === 'fill') {
    // Transition from outlined to filled.
    dControls.start({
      fill: 'url(#dmMetalGradient)',
      strokeOpacity: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    });
    // The M is a stroked polyline (no fill), so just keep its stroke solid.
    // Nothing to animate for M in the fill phase.
  }
}, [phase, dControls, mControls]);
```

**Note:** The M is a thick-stroked polyline with `fill="none"`, so it's already "filled" visually by its stroke. Only the D needs a stroke→fill transition. If your approved path for the D doesn't use `Z` (closed path) then the fill won't work — go back and make sure the D path is closed.

- [ ] **Step 2: Add `fill` phase to Preloader's state machine**

Update the phase chain in `Preloader.tsx`:

```tsx
useEffect(() => {
  if (shouldShow !== true) return;
  const timers: ReturnType<typeof setTimeout>[] = [];
  timers.push(setTimeout(() => setPhase('fill'),   1_700));  // after engrave
  timers.push(setTimeout(() => setPhase('polish'), 2_300));  // after fill (600ms)
  timers.push(setTimeout(() => setPhase('hold'),   3_000));  // after polish (placeholder, extended in 5.2)
  return () => timers.forEach(clearTimeout);
}, [shouldShow]);
```

- [ ] **Step 3: Verify**

Browser: fresh session → homepage → watch the animation.

**Expected:**
1. D and M engrave (T=0 → 1.6s).
2. At T=1.7s the D's interior fills in with the gold gradient (600ms transition).
3. After fill, the logo sits static again.
4. Progress bar fills.
5. Dissolve when ready.

- [ ] **Step 4: Commit**

```bash
cd F:/DieMart/diemart-website && git add components/preloader/ && git commit -m "feat(preloader): add fill phase to engrave animation"
```

---

### Task 5.2 — Add polish (shine sweep) phase

**Files:**
- Modify: `components/preloader/DMMonogramSVG.tsx`

- [ ] **Step 1: Add a shine gradient and overlay rect**

Inside the `<svg>`, add a new linearGradient to `<defs>` and an animated overlay `<rect>`:

```tsx
<defs>
  {/* existing dmMetalGradient */}

  <linearGradient id="dmShineGradient" x1="-50%" y1="0%" x2="-30%" y2="0%">
    <stop offset="0%" stopColor="white" stopOpacity="0" />
    <stop offset="50%" stopColor="white" stopOpacity="0.6" />
    <stop offset="100%" stopColor="white" stopOpacity="0" />
  </linearGradient>

  {/* Clip path so the shine only appears inside the letters.
      We re-use the D and M path geometries. */}
  <clipPath id="dmLetterClip">
    <path d="M 90 60 L 90 240 L 150 240 C 210 240 230 200 230 150 C 230 100 210 60 150 60 Z" />
    <path d="M 200 240 L 200 60 L 260 180 L 320 60 L 320 240"
          stroke="white" strokeWidth="30" fill="none"
          strokeLinejoin="miter" strokeLinecap="butt" />
  </clipPath>
</defs>
```

Then at the very end of the `<svg>` (after the two monogram paths), add the shine overlay:

```tsx
<g clipPath="url(#dmLetterClip)">
  <motion.rect
    ref={shineRectRef}
    x="-100"
    y="0"
    width="600"
    height="300"
    fill="url(#dmShineGradient)"
    animate={shineControls}
    style={{ pointerEvents: 'none' }}
  />
</g>
```

- [ ] **Step 2: Add animation controls for shine**

Add to the component body:

```tsx
const shineRectRef = useRef<SVGRectElement>(null);
const shineControls = useAnimationControls();

useEffect(() => {
  if (phase === 'polish') {
    shineControls.start({
      x: ['-100', '500'],
      transition: { duration: 0.7, ease: 'easeOut' },
    });
  }
}, [phase, shineControls]);
```

The rect sweeps from x=-100 to x=500 over 700ms, clipped to the letter shapes.

- [ ] **Step 3: Verify**

Browser: watch the animation.

**Expected:**
1. Engrave (T=0 → 1.6s)
2. Fill (T=1.7s → 2.3s)
3. Polish shine sweep (T=2.3s → 3.0s) — a bright gold/white sweep moves left to right across the filled letters
4. Static hold
5. Dissolve

- [ ] **Step 4: Commit**

```bash
cd F:/DieMart/diemart-website && git add components/preloader/DMMonogramSVG.tsx && git commit -m "feat(preloader): add polish shine sweep phase"
```

---

## Phase 6 — Animation: Wordmark + Hold + Hard cap + Reduced-motion

**Goal:** Complete the animation lifecycle. Wordmark fades in after polish, the logo holds while frames load with a real progress hairline, the 10-second hard cap forces dissolve on broken connections, and users with `prefers-reduced-motion` get the static path.

---

### Task 6.1 — Phase-gate the wordmark fade-in

**Files:**
- Modify: `components/preloader/Preloader.tsx`

- [ ] **Step 1: Update the phase chain**

```tsx
useEffect(() => {
  if (shouldShow !== true) return;
  if (reducedMotion) {
    setPhase('hold');
    return;
  }
  const timers: ReturnType<typeof setTimeout>[] = [];
  timers.push(setTimeout(() => setPhase('fill'),     1_700));
  timers.push(setTimeout(() => setPhase('polish'),   2_300));
  timers.push(setTimeout(() => setPhase('wordmark'), 2_900));
  timers.push(setTimeout(() => setPhase('hold'),     3_300));
  return () => timers.forEach(clearTimeout);
}, [shouldShow, reducedMotion]);
```

(We'll add `reducedMotion` state in Task 6.4 — for now leave that branch out if you want to run this step independently, or include it and add the state in 6.4.)

- [ ] **Step 2: Pass phase-driven `wordmarkVisible` to the lockup**

```tsx
<DMLogoLockup
  phase={mapPhaseToMonogram(phase)}
  wordmarkVisible={phase === 'wordmark' || phase === 'hold' || phase === 'dissolving'}
/>
```

Add a helper at the top of the file:

```tsx
function mapPhaseToMonogram(p: Phase): MonogramPhase {
  if (p === 'engrave') return 'engrave';
  if (p === 'fill') return 'fill';
  if (p === 'polish') return 'polish';
  // wordmark/hold/dissolving/done all show the final filled monogram
  return 'done';
}
```

And extend `MonogramPhase` in `DMMonogramSVG.tsx` to include `'done'` as a terminal that shows the filled, un-shined monogram (no new animation, just keeps the `fill` state applied).

- [ ] **Step 3: Verify**

The wordmark should now fade in at T≈2.9s (after polish starts, overlapping with the end of the shine) and settle by T≈3.3s.

- [ ] **Step 4: Commit**

```bash
cd F:/DieMart/diemart-website && git add components/preloader/ && git commit -m "feat(preloader): phase-gate wordmark fade-in"
```

---

### Task 6.2 — Real-progress hairline during hold

**Files:**
- Modify: `components/preloader/Preloader.tsx`

- [ ] **Step 1: Hide the hairline until phase is `hold`**

The hairline should only appear in the hold state, not during the engrave/fill/polish beats. Change the JSX:

```tsx
{phase === 'hold' && (
  <div className="mt-10 w-[240px] h-[1px] bg-white/5 relative overflow-hidden">
    <div
      className="absolute inset-y-0 left-0 bg-[#D4AF37] transition-[width] duration-200 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
)}
```

- [ ] **Step 2: Delay dissolve by 400 ms after reaching hold with framesReady**

In the existing "dissolve once frames are ready" useEffect, special-case the path where we arrive at `hold` already ready:

```tsx
useEffect(() => {
  if (shouldShow !== true || dissolving || done) return;
  if (phase !== 'hold') return;
  if (!framesReady) return;
  // Beat for 400ms then start dissolving.
  const t = setTimeout(() => setDissolving(true), 400);
  return () => clearTimeout(t);
}, [phase, framesReady, shouldShow, dissolving, done]);
```

And when `framesReady` flips true during hold (slow connection case):

```tsx
useEffect(() => {
  if (shouldShow !== true || dissolving || done) return;
  if (phase !== 'hold') return;
  if (!framesReady) return;
  // Frames just became ready while in hold. 200ms beat then dissolve.
  const t = setTimeout(() => setDissolving(true), 200);
  return () => clearTimeout(t);
}, [framesReady]); // deliberately only re-run on framesReady transitions
```

*Careful: these two effects overlap. Consolidate into a single effect:*

```tsx
// Single source of truth for dissolve trigger during hold.
useEffect(() => {
  if (shouldShow !== true || dissolving || done) return;
  if (phase !== 'hold') return;
  if (!framesReady) return;
  // 400ms beat if we arrived at hold with frames already ready,
  // otherwise we'll also land here when framesReady flips true mid-hold —
  // in that case 200ms is enough since the user has been staring at
  // the logo for a while.
  // For simplicity use 400ms in both cases.
  const t = setTimeout(() => setDissolving(true), 400);
  return () => clearTimeout(t);
}, [phase, framesReady, shouldShow, dissolving, done]);
```

- [ ] **Step 3: Verify**

Browser: hard-reload, watch the full sequence. On a fast connection you should see the hairline briefly appear at T≈3.3s at roughly 100% and then dissolve ~400ms later.

To simulate a slow connection:
1. DevTools → Network → Throttling → "Slow 3G".
2. Clear sessionStorage (`sessionStorage.removeItem('dm_preloader_seen')`).
3. Hard-reload.
4. The animation should play through engrave/fill/polish, reach the hold state, and the progress hairline should fill slowly as frames trickle in. Once it reaches 100%, wait 400ms, dissolve.

- [ ] **Step 4: Commit**

```bash
cd F:/DieMart/diemart-website && git add components/preloader/Preloader.tsx && git commit -m "feat(preloader): show real-progress hairline during hold state"
```

---

### Task 6.3 — Hard 10-second cap

**Files:**
- Modify: `components/preloader/Preloader.tsx`

The hard cap was already wired in Phase 3 (Task 3.1, Step 1, second useEffect). Verify it's still present and correct after the phase-machine changes.

- [ ] **Step 1: Re-check the cap useEffect**

It should read:

```tsx
useEffect(() => {
  if (shouldShow !== true || dissolving || done) return;
  const t = setTimeout(() => setDissolving(true), HARD_CAP_MS);
  return () => clearTimeout(t);
}, [shouldShow, dissolving, done]);
```

If it's missing or broken after earlier edits, restore it.

- [ ] **Step 2: Verify via DevTools Network Offline**

1. Open the homepage in a fresh session.
2. As soon as you see the preloader start, toggle DevTools → Network → "Offline".
3. The preloader can't download frames. It should:
   - Engrave, fill, polish, show wordmark (T=0 → 3.3s) — all driven by timers, no network needed.
   - Enter hold state with the hairline at 0%.
   - At T=10s, force-dissolve to the hero anyway.
4. The hero will show the first frame (or a blank canvas). This is correct — we tested graceful degradation.

- [ ] **Step 3: Commit (only if changes were made)**

```bash
cd F:/DieMart/diemart-website && git diff --stat && git add -A && git commit -m "fix(preloader): verify 10s hard cap after phase machine refactor"
```

Skip this step if no changes were needed.

---

### Task 6.4 — Reduced-motion branch

**Files:**
- Modify: `components/preloader/Preloader.tsx`

- [ ] **Step 1: Add the detection hook**

Near the top of `Preloader.tsx`, add:

```tsx
const [reducedMotion, setReducedMotion] = useState(false);

useEffect(() => {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  setReducedMotion(mql.matches);
  const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
  mql.addEventListener('change', handler);
  return () => mql.removeEventListener('change', handler);
}, []);
```

- [ ] **Step 2: Use it in the phase chain**

The phase-chain useEffect (Task 6.1) already branches on `reducedMotion`. It skips straight to `hold` so no timed animation runs.

- [ ] **Step 3: Add initial-render path in `DMMonogramSVG`**

When a reduced-motion user lands on the preloader, the SVG is rendered at `phase='hold'` → mapped to `MonogramPhase='done'`. The component must render the monogram in its **final** state (filled, no stroke drawing) without running any animation.

Add an initial-state effect in `DMMonogramSVG.tsx`:

```tsx
useEffect(() => {
  if (phase === 'done' || phase === 'polish' || phase === 'fill') {
    // Skip-ahead to filled state (used on initial render for reduced motion).
    const dEl = dPathRef.current;
    const mEl = mPathRef.current;
    if (dEl) {
      dEl.style.strokeDashoffset = '0';
      dEl.style.fill = 'url(#dmMetalGradient)';
      dEl.style.strokeOpacity = '0';
    }
    if (mEl) {
      mEl.style.strokeDashoffset = '0';
    }
  }
}, [phase]);
```

This sets the paths to their "finished" state without animating, so reduced-motion users see the static complete logo immediately.

- [ ] **Step 4: Make hold state honor reduced-motion minimum**

For reduced-motion, hold for at least 1.5 s before dissolving (per spec §6.1). Adjust the dissolve-on-ready effect:

```tsx
useEffect(() => {
  if (shouldShow !== true || dissolving || done) return;
  if (phase !== 'hold') return;
  if (!framesReady) return;
  const minBeat = reducedMotion ? 1_500 : 400;
  const t = setTimeout(() => setDissolving(true), minBeat);
  return () => clearTimeout(t);
}, [phase, framesReady, shouldShow, dissolving, done, reducedMotion]);
```

- [ ] **Step 5: Verify**

**macOS:** System Settings → Accessibility → Display → "Reduce motion" ON.
**Windows:** Settings → Accessibility → Visual effects → "Animation effects" OFF.
**DevTools override:** Chrome DevTools → Rendering panel → "Emulate CSS media feature prefers-reduced-motion" → "reduce".

With reduced motion enabled:
1. Fresh session → homepage.
2. Preloader appears showing the **fully formed** logo immediately (no draw, no fill, no polish animation).
3. Hairline shows progress.
4. After frames load + 1.5s minimum, dissolve.

- [ ] **Step 6: Commit**

```bash
cd F:/DieMart/diemart-website && git add components/preloader/ && git commit -m "feat(preloader): honor prefers-reduced-motion"
```

---

## Phase 7 — Multi-locale QA, cleanup, and final verification

**Goal:** Confirm the preloader works on every locale, under realistic conditions, and clean up the temporary preview route before shipping.

---

### Task 7.1 — Verify all locales

- [ ] **Step 1: Test each locale**

For each of `/en`, `/hi`, `/ar`:
1. Clear sessionStorage.
2. Hard-reload the URL.
3. Confirm the preloader plays correctly.
4. Confirm the hero appears correctly after dissolve.
5. For `/ar`, confirm that the Arabic hero content displays in RTL but the preloader itself is unaffected (the DM monogram is symmetric-ish and the wordmark stays Latin).

**Checkpoint:** No locale-specific bugs. If any locale behaves differently, investigate before proceeding.

---

### Task 7.2 — Throttled connection QA

- [ ] **Step 1: Fast 3G throttling**

1. DevTools Network → "Fast 3G".
2. Clear sessionStorage.
3. Hard-reload `/`.
4. **Expected:** Animation plays fully, enters hold state, progress hairline fills gradually, dissolves when ready. Total time on screen: probably 8–15s.

- [ ] **Step 2: Slow 3G throttling**

1. DevTools Network → "Slow 3G".
2. Clear sessionStorage.
3. Hard-reload `/`.
4. **Expected:** Animation plays, enters hold with hairline fill. May hit the 10 s cap. If it hits the cap, verify force-dissolve happens cleanly and the hero appears.

- [ ] **Step 3: Offline during load**

1. DevTools Network → "Online" first.
2. Clear sessionStorage.
3. Hard-reload `/`.
4. As soon as you see any frame request in the Network tab, switch to "Offline".
5. **Expected:** Engrave/fill/polish/wordmark all play normally (pure timer-based), enter hold with hairline stuck at whatever % had already loaded, hit the 10 s cap, force-dissolve.

---

### Task 7.3 — Production build check

- [ ] **Step 1: Run the production build**

```bash
cd F:/DieMart/diemart-website && npm run build
```

**Expected:** Build succeeds, no TypeScript errors, no warnings about the preloader files. If the build fails, fix the errors and re-run.

- [ ] **Step 2: Run it in production mode**

```bash
cd F:/DieMart/diemart-website && npm run start
```

Visit `http://localhost:3000/` in a fresh incognito window and run through the same verification as dev — the preloader should work identically. Production mode is a better indicator of real hosted behavior than dev mode.

---

### Task 7.4 — Private browsing / sessionStorage failure

- [ ] **Step 1: Simulate sessionStorage failure**

Open the homepage. In DevTools console, run:

```js
Object.defineProperty(window, 'sessionStorage', {
  get() { throw new Error('disabled'); }
});
```

Then reload the homepage.

**Expected:** Page still works. Preloader plays. Since `sessionStorage.setItem` will throw, the preloader will appear on every refresh — but it should NEVER crash the page.

---

### Task 7.5 — Delete the preview route

**Files:**
- Delete: `app/preview-logo/` (entire directory)

- [ ] **Step 1: Remove the preview route**

```bash
cd F:/DieMart/diemart-website && rm -rf app/preview-logo
```

- [ ] **Step 2: Verify it's gone**

```bash
cd F:/DieMart/diemart-website && ls app/preview-logo 2>&1
```

Expected: `No such file or directory`.

- [ ] **Step 3: Build again to confirm**

```bash
cd F:/DieMart/diemart-website && npm run build
```

Expected: Still builds cleanly. Visiting `/preview-logo` after build would now 404 (correct).

- [ ] **Step 4: Commit**

```bash
cd F:/DieMart/diemart-website && git add -A && git commit -m "chore(preloader): remove temporary preview-logo route"
```

---

### Task 7.6 — Update spec acceptance checklist

**Files:**
- Modify: `docs/superpowers/specs/2026-04-10-logo-preloader-design.md`

- [ ] **Step 1: Check off all acceptance criteria**

Open the spec and flip every `- [ ]` in §13 "Acceptance criteria" to `- [x]` for items that are actually satisfied. If any are NOT satisfied, leave them unchecked and describe why.

- [ ] **Step 2: Commit**

```bash
cd F:/DieMart/diemart-website && git add docs/superpowers/specs/2026-04-10-logo-preloader-design.md && git commit -m "docs(preloader): tick acceptance criteria after implementation"
```

---

### Task 7.7 — Final smoke test

- [ ] **Step 1: Hard reset and walk through as a real first-time user**

1. Close all browser windows.
2. Open a new Incognito window.
3. Navigate to `http://localhost:3000/` (production build running from Task 7.3).
4. Watch the full experience, start to finish, as if you were a real user seeing it for the first time.
5. Does it feel right? Does the timing feel premium? Does the dissolve into the hero feel seamless?

- [ ] **Step 2: If anything feels wrong, iterate**

Small polish issues — timing tweaks, easing curves, progress bar width, gradient stops — are fair game to adjust before shipping. Large changes should go back through the spec.

- [ ] **Step 3: Show Hussain**

Hand it over for a real-user walkthrough. Only mark the feature "done" once he signs off on the experience.

---

## Self-Review

Running the self-review checklist from the writing-plans skill.

**1. Spec coverage:**

| Spec section | Implementing task(s) |
|---|---|
| §4.1 Style (draw-in stroke) | Phase 4 (engrave) |
| §4.2 Asset (hand-built SVG + wordmark option) | Phase 2 (SVG + lockup) |
| §4.3 Scope (homepage only) | Task 0.1 (script regex), Task 3.2 (mount in homepage page.tsx) |
| §4.4 Caching (sessionStorage) | Task 0.1 (script), Task 3.1 (component markSeen/alreadySeen) |
| §4.5 Coordination (min / hold / cap) | Phase 6 (all three subtasks) |
| §4.6 Dark background | Task 0.1 (preflash), Task 3.1 (Preloader bg) |
| §4.7 Architecture (shared Context) | Phase 1 |
| §4.8 Flash prevention | Phase 0 |
| §5 Architecture file layout | All phases |
| §6 Animation timeline | Phases 4, 5, 6 |
| §6.1 Reduced motion override | Task 6.4 |
| §7 Data flow | Phase 1 |
| §8 DM monogram SVG | Phase 2, 4, 5 |
| §9 Edge cases | Throughout; §9.1 = 6.4, §9.2-3 = 6.3, §9.5 = 3.1, §9.7 = 0.1, §9.10 = 7.1 |
| §10 Cleanup of existing code | Task 1.3 |
| §13 Acceptance criteria | Phase 7 |

All spec sections covered. ✓

**2. Placeholder scan:** No "TBD", "TODO", "similar to task N", or "add appropriate error handling" phrases. Every code step shows complete code. Every verify step has concrete expectations. ✓

**3. Type consistency:**
- `MonogramPhase` is defined in Task 4.1 and used consistently through Task 6.1 (with `'done'` added in Task 6.1).
- `Phase` (the Preloader's internal phase type) is defined in Task 4.1 Step 3 and extended through Task 6.
- `HeroPreloadState` type is defined in Task 1.1 and consumed identically in Tasks 1.3, 3.1.
- `useHeroPreload()` hook signature is consistent throughout.
- `SESSION_KEY`, `HARD_CAP_MS`, `DISSOLVE_MS` constants defined once in Task 3.1 and referenced by name thereafter.

All consistent. ✓

---

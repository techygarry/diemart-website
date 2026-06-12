# Logo Preloader — Design Spec

**Date:** 2026-04-10
**Status:** Design (pre-implementation)
**Owner:** Hussain
**Related files:** `components/canvas/ScrollSequence.tsx`, `app/[locale]/page.tsx`, `app/layout.tsx`, `public/logo.png`

---

## 1. Problem

The DieMart homepage hero is a 120-frame scroll-linked image sequence (`/public/sequence/dis/frame_0001..0120.jpg`) totaling **~32 MB on desktop** and ~7 MB on mobile. On a typical connection these frames take several seconds to download. Today (`components/canvas/ScrollSequence.tsx:124-137`) a small in-canvas progress bar shows "Loading X%" inside the hero area while the rest of the page renders behind it.

This is functional but is not a brand moment, and it does not effectively hide the load — text and navigation are visible during the slow paint, and the user can begin scrolling before the hero is interactive, producing a janky first impression.

We are preparing the site for hosting and want a polished first-load experience.

## 2. Goal

When a first-time visitor lands on the homepage, they see a full-screen branded animation of the DieMart "DM" monogram being **engraved** (drawn stroke-by-stroke), then **filled** with a gold/silver gradient, then **polished** by a gold shine sweep. While they watch this, the 32 MB hero image sequence loads in the background. When both the animation and the frame loading have completed, the preloader dissolves smoothly into the hero, and scrolling is immediately fluid.

The engraving metaphor was chosen deliberately to evoke die-cutting and engineering, which is DieMart's core business.

## 3. Non-goals

- Reducing the actual file size of the hero image sequence (separate optimization opportunity, see §11).
- Showing the preloader on routes other than the homepage. Other routes have no heavy assets and should load instantly.
- Showing the preloader on every visit. Once per session is enough; returning visitors get straight to the site.
- Reworking any other animation, page, or component on the site.
- Sound or audio of any kind.

## 4. Locked decisions

| # | Decision | Rationale |
|---|---|---|
| 1 | **Style:** Draw-in stroke (engraving metaphor) | Aligns directly with DieMart's die-manufacturing business |
| 2 | **Asset:** Manually rebuild DM monogram as clean SVG paths (no auto-tracing); wordmark and tagline either as plain HTML text in existing brand fonts OR as a cropped strip of `public/logo.png` (decided at mockup review) | No SVG of the logo exists; auto-tracing would produce messy paths that draw poorly |
| 3 | **Scope:** Homepage only (`/`, `/en`, `/hi`, `/ar`) | Heavy frame sequence only lives on the homepage |
| 4 | **Caching:** Once per session, persisted in `sessionStorage` under key `dm_preloader_seen` | Returning visitors should not be walled off |
| 5 | **Coordination:** ~3s of animation (engrave + fill + polish + wordmark) → hold final logo with thin gold hairline progress until frames load → 600ms dissolve. Minimum ~4.3s total on screen for a fast connection; hard cap at 10s. | Guaranteed brand moment + graceful slow-connection handling + escape hatch |
| 6 | **Background:** Always dark `#080704` (matches existing hero `ScrollSequence` background) | Cinematic, high contrast for gold mark, seamless dissolve into hero |
| 7 | **Architecture:** Shared React Context provider owns frame loading; both `<Preloader>` and `<ScrollSequence>` consume it | Single source of truth, no double-fetching, cleanest separation |
| 8 | **Flash prevention:** Inline `<script>` in `<head>` paints a black overlay div before React hydrates | Eliminates the 100–400ms window where homepage content would otherwise flash before the React preloader mounts |

## 5. Architecture

### 5.1 File layout

```
app/[locale]/page.tsx                    [MODIFIED]
  - Wrap homepage tree in <HeroPreloadProvider>
  - Mount <Preloader /> as a sibling of <Navigation>/<Hero>/...

app/layout.tsx                           [MODIFIED]
  - Add inline <script> in <head> that synchronously inserts a
    fixed black <div id="dm-preflash"> if:
      (a) sessionStorage.dm_preloader_seen is not set, AND
      (b) location.pathname matches /^\/(en|hi|ar)?\/?$/
  - Script also sets a global window flag the React Preloader reads

components/preloader/
  Preloader.tsx                          [NEW]
    - 'use client' fullscreen overlay
    - Mounts on top of #dm-preflash, then removes #dm-preflash from the DOM
    - Runs the phase machine (engrave → fill → polish → wordmark → hold → dissolving → done)
    - Reads { framesReady, progress } from useHeroPreload()
    - On 'done': sets sessionStorage.dm_preloader_seen='1' and unmounts itself
    - Honors prefers-reduced-motion
    - aria-hidden="true"

  DMMonogramSVG.tsx                      [NEW]
    - Two hand-built <path> elements (D and M) inside a single <svg>
    - <linearGradient id="dmMetalGradient"> for the gold/silver fill
    - <linearGradient id="dmShineGradient"> for the shine sweep
    - Receives a `phase` prop and animates via framer-motion accordingly

lib/preload/
  HeroPreloadProvider.tsx                [NEW]
    - 'use client' Context provider
    - Picks /sequence/dis or /sequence/dis-mobile based on window.innerWidth
    - Loads all 120 frames using new Image()
    - Exposes { images, framesReady, progress, isMobile } via Context

  useHeroPreload.ts                      [NEW]
    - Tiny hook: useContext(HeroPreloadContext) with a clear error if used outside provider

components/canvas/ScrollSequence.tsx     [MODIFIED]
  - Delete the local image-loading useEffect (lines 31-55 in current file)
  - Delete the imagesRef and use images from useHeroPreload() instead
  - Delete the in-canvas {!loaded && <preloader UI>} block (lines 124-137)
  - drawFrame() reads from context-provided images[]
  - Canvas opacity binding becomes: opacity: framesReady ? 1 : 0
```

### 5.2 Component tree on homepage

```
<HeroPreloadProvider>
  <Preloader />                          ◄── reads { framesReady, progress }
  <Navigation />
  <main>
    <Hero>
      <ScrollSequence />                 ◄── reads { images, framesReady }
      ...
    </Hero>
    <About /> <Products /> ...
  </main>
  <Footer />
  <WhatsAppFloat />
  <CustomCursor />
</HeroPreloadProvider>
```

### 5.3 State shape (HeroPreloadProvider)

```ts
type HeroPreloadState = {
  images: HTMLImageElement[];   // length 120, populated as each loads
  loadedCount: number;          // 0..120
  framesReady: boolean;         // loadedCount === 120
  progress: number;             // round((loadedCount / 120) * 100)
  isMobile: boolean;            // determines which sequence dir
};
```

### 5.4 Two-stage flash prevention

**Stage 1 (pre-hydration, runs before any pixel paints):**

The inline `<head>` script executes synchronously during HTML parse. Pseudocode:

```js
(function () {
  try {
    var seen = sessionStorage.getItem('dm_preloader_seen');
    if (seen) return;
    var p = location.pathname;
    var onHome = p === '/' || /^\/(en|hi|ar)\/?$/.test(p);
    if (!onHome) return;
    var d = document.createElement('div');
    d.id = 'dm-preflash';
    d.style.cssText = 'position:fixed;inset:0;background:#080704;z-index:9999;';
    (document.body || document.documentElement).appendChild(d);
    window.__dmPreflashActive = true;
  } catch (e) { /* sessionStorage may throw in private mode — fall through */ }
})();
```

**Stage 2 (post-hydration):** The React `<Preloader>` mounts on top of `#dm-preflash` (same `z-index` family), then in its first effect removes `#dm-preflash` from the DOM. The transition is invisible because both have the same background color.

When the preloader finishes its phase machine, it dissolves itself (600ms opacity 1→0), sets `sessionStorage.dm_preloader_seen = '1'`, and unmounts.

## 6. Animation timeline

```
T=0.000s   Black overlay paints (inline <head> script)
T=0.000s   Frame loading starts (HeroPreloadProvider mounts)
T~0.050s   React Preloader hydrates, takes over the black background
T~0.100s   #dm-preflash removed from the DOM

T=0.100s   ─── BEAT 1: ENGRAVE ───
           D path stroke draws in (1.0s)
           M path stroke starts at +0.4s offset, finishes at T=2.0s
           Both paths use stroke-dasharray = pathLength,
           animate stroke-dashoffset from pathLength → 0

T=2.000s   ─── BEAT 2: FILL ───
           Stroke→fill transition (600ms)
           Each path's fill transitions from "transparent" → "url(#dmMetalGradient)"
           Stroke fades to 0 opacity simultaneously

T=2.600s   ─── BEAT 3: POLISH ───
           Gold shine sweep (700ms)
           A linearGradient mask with animated x1/x2 sweeps left→right across the mark

T=2.900s   Wordmark + tagline fade in (400ms, opacity 0→1, translateY 6px → 0)

T=3.300s   ─── HOLD STATE ───
           Logo at full opacity. Beneath it, a 240px-wide × 1px gold hairline
           shows real frame load progress (0–100%, bound to context).

           Three branches:
           (a) framesReady === true at this point:
               Hold 400ms beat → setPhase('dissolving')
               600ms opacity fade → setPhase('done') → unmount
               User sees hero at T ≈ 4.300s

           (b) framesReady === false:
               Wait for framesReady to flip true
               When it does: hold 200ms → dissolve → done
               User sees hero at T = (framesReadyAt + 0.800s)

           (c) T reaches 10.000s and framesReady is still false:
               Hard cap. Force-dissolve regardless.
               ScrollSequence's existing img.onerror handling
               (current ScrollSequence.tsx:47-50) will gracefully
               handle any missing frames during scroll.
```

**Total minimum time on screen: ~4.3s** (fast connection)
**Typical: ~5–7s** (typical connection, frames complete during hold state)
**Hard cap: 10s** (broken connection escape hatch)

### 6.1 Reduced motion override

If `window.matchMedia('(prefers-reduced-motion: reduce)').matches`:

- Skip the engrave/fill/polish/wordmark sequence entirely
- Render the static, fully-formed logo immediately
- Hold for `max(1.5s, until framesReady)`, capped at 10s
- Dissolve normally

Same gate semantics, no motion.

## 7. Data flow

```
HeroPreloadProvider
  │
  │ owns: images[], loadedCount, framesReady, progress
  │
  ├──── Context.Provider ────┐
  │                          │
  │                          ▼
  │           ┌───────────────────────┐
  │           │      Preloader        │
  │           │ reads framesReady,    │
  │           │       progress        │
  │           │ runs phase machine    │
  │           │ unmounts when done    │
  │           └───────────────────────┘
  │                          │
  │                          ▼
  │           ┌───────────────────────┐
  │           │    ScrollSequence     │
  │           │ reads images[],       │
  │           │       framesReady     │
  │           │ draws to canvas       │
  │           │ NO local loading      │
  │           └───────────────────────┘
```

The Preloader and ScrollSequence are siblings of each other in the React tree, but both are descendants of `HeroPreloadProvider`. The Preloader sits above ScrollSequence visually (higher z-index) and dissolves from above.

## 8. The DM monogram SVG

### 8.1 Construction approach

A single `<svg>` element with two `<path>` elements — one for D, one for M. Built by hand to match the geometry of `public/logo.png` as closely as possible. **No auto-tracing.** Auto-traced paths from the existing PNG would have too many control points and would not draw cleanly with `stroke-dasharray`.

**Mockup-first workflow (mandatory):**

1. First implementation step: render the static, finished SVG monogram on screen (no animation) and save a screenshot.
2. Show the screenshot to Hussain.
3. Iterate on the geometry until it matches the brand (expect 1–3 iterations).
4. Only after approval, write the animation code.

The wordmark and tagline are NOT rebuilt as SVG. Two options to be chosen at mockup review:

- **Option A:** Plain HTML `<p>` and `<h1>` elements using the existing `Cormorant_SC` and `DM_Sans` fonts already loaded by `app/layout.tsx`. Sharper, scales perfectly, no asset to maintain.
- **Option B:** A cropped strip of `public/logo.png` showing only the wordmark + tagline area, displayed as a `<Image>`. Preserves the exact original look of the existing logo.

### 8.2 SVG gradient definitions

```svg
<defs>
  <linearGradient id="dmMetalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%"   stop-color="#E8C547" />   <!-- bright gold -->
    <stop offset="40%"  stop-color="#D4AF37" />   <!-- dm-gold-primary -->
    <stop offset="60%"  stop-color="#C0C0C0" />   <!-- silver -->
    <stop offset="100%" stop-color="#8C7853" />   <!-- dark gold -->
  </linearGradient>

  <linearGradient id="dmShineGradient" x1="-50%" y1="0%" x2="-30%" y2="0%">
    <stop offset="0%"   stop-color="rgba(255,255,255,0)" />
    <stop offset="50%"  stop-color="rgba(255,255,255,0.6)" />
    <stop offset="100%" stop-color="rgba(255,255,255,0)" />
  </linearGradient>
</defs>
```

The shine animation moves the `dmShineGradient` x1/x2 from `(-50%, -30%)` to `(130%, 150%)` over 700ms.

### 8.3 Stroke draw mechanics

For each `<path>`:

- Compute `pathLength` once on mount via `pathRef.current.getTotalLength()`
- Set `stroke-dasharray = pathLength`
- Animate `stroke-dashoffset` from `pathLength` → `0` using framer-motion
- D path: 0.0s → 1.0s (1000ms)
- M path: 0.4s → 1.6s (1200ms), starts mid-D draw for visual continuity

Stroke styling: `stroke-width: 1.5`, `stroke="url(#dmMetalGradient)"`, `fill: transparent` initially. After T=2.0s, `fill` transitions to `url(#dmMetalGradient)` and `stroke-opacity` fades to 0.

## 9. Edge cases and error handling

| # | Scenario | Behavior |
|---|---|---|
| 1 | `prefers-reduced-motion: reduce` | Skip animation, show static logo, dissolve when ready (see §6.1) |
| 2 | Slow connection | Hold state shows real progress, dissolves when frames ready |
| 3 | Broken connection / frames never load | 10-second hard cap, force-dissolve. ScrollSequence's existing `img.onerror` handler counts errors as "loaded" so the canvas never hangs. |
| 4 | Individual frame fails to load | Already counted via `loadedCount++` in `onerror` (preserved from current behavior) |
| 5 | `sessionStorage` disabled / private mode / quota exceeded | Both the inline `<head>` script and the React component wrap their `sessionStorage` access in `try/catch`. On failure: preloader plays every visit (graceful degradation, never crashes). |
| 6 | User navigates away mid-animation | Preloader cleanup effect: clear all timeouts, set `sessionStorage` flag to prevent replay on back-navigation |
| 7 | Hydration mismatch (SSR thinks no overlay, client wants one) | The inline `<head>` script paints `#dm-preflash` before React mounts. React's first render of `<Preloader>` finds an existing dark overlay and fades in over it — no SSR/CSR diff because the overlay is created outside React's tree. |
| 8 | Tab loses focus during preload | Browser pauses image loading naturally; the 10s hard cap protects us if the user comes back. |
| 9 | Keyboard accessibility | Preloader is `aria-hidden="true"`. The skip-to-content link in `app/[locale]/page.tsx:18-23` remains in the DOM and works (it's just behind the overlay). After dissolve, focus returns to `<body>`. |
| 10 | i18n / RTL (Arabic locale `/ar`) | The DM monogram is identical in any language. If we go with Option B (cropped PNG wordmark), no RTL concerns. If Option A (HTML text), the wordmark stays Latin (it's a brand mark, not translatable copy). |
| 11 | User refreshes mid-animation | First refresh: preloader replays (sessionStorage flag was not yet set). Second refresh: flag is set, no preloader. |
| 12 | Canvas frame redraw needed before context provides images | ScrollSequence's `drawFrame()` already guards with `if (!img \|\| !img.complete) return;` (current line 64) — preserved after refactor. |

## 10. Cleanup of existing code

The following code is **deleted** as part of this work:

- `components/canvas/ScrollSequence.tsx`:
  - The `imagesRef` declaration
  - The "Preload all frames" useEffect (current lines 31-55)
  - The `loaded` and `loadProgress` local state
  - The `{!loaded && <Preloader UI>}` JSX block (current lines 124-137)
  - The `setLoaded(true)` calls
- ScrollSequence becomes a pure consumer: it gets images from context, draws them based on scroll, and binds canvas opacity to `framesReady`.

This is a strict reduction in responsibility for `ScrollSequence` — it no longer concerns itself with loading, only with rendering.

## 11. Future optimizations (out of scope)

These are NOT part of this feature but should be tracked:

1. **Re-encode JPGs as WebP or AVIF.** Current ~32 MB desktop sequence could shrink ~40% with no visual loss. Would meaningfully reduce the time the user spends in the preloader hold state.
2. **Reduce frame count from 120 to 60** (or use frame interpolation). Would halve bytes; visual smoothness depends on scroll speed.
3. **Progressive sequence loading.** Load the first 30 frames first, start hero rendering as soon as those are done, lazy-load the remaining 90.
4. **Use a video instead of a frame sequence.** Modern browsers can scrub video on scroll with much lower bandwidth, but the technique is more brittle on iOS.

These are recorded here so they aren't forgotten, not because they should be done now.

## 12. Open questions

None. All clarifying questions answered during brainstorming on 2026-04-10.

## 13. Acceptance criteria

The feature is complete when all of the following are true:

- [ ] On a fresh session (no `sessionStorage.dm_preloader_seen`), visiting `/`, `/en`, `/hi`, or `/ar` shows the full-screen dark preloader with the animated DM monogram.
- [ ] The DM monogram visually matches `public/logo.png` to Hussain's satisfaction (mockup approval gate).
- [ ] The animation plays its full beat sequence (engrave → fill → polish → wordmark) regardless of connection speed.
- [ ] On a fast connection, the preloader is on screen for ~4 seconds and dissolves smoothly into the hero.
- [ ] On a slow connection, the preloader holds at the finished logo with a visible thin gold progress hairline showing real percentage.
- [ ] If frame loading is still incomplete after 10 seconds, the preloader force-dissolves to the hero anyway.
- [ ] After dissolving, scrolling the hero is immediately smooth (frames are drawn from context, no further loading).
- [ ] After the first visit, refreshing or navigating back to the homepage in the same browser session does NOT show the preloader again.
- [ ] On non-homepage routes (`/products`, `/about`, etc.) the preloader never appears.
- [ ] Users with `prefers-reduced-motion: reduce` see a static logo for 1.5s (or until ready), then dissolve.
- [ ] No flash of homepage content before the preloader appears (verified visually on a throttled connection).
- [ ] No double-loading of the 32 MB frame sequence (verified in DevTools network tab — exactly 120 image requests, not 240).
- [ ] The existing in-canvas progress bar inside `ScrollSequence` is removed.
- [ ] The page works fine with `sessionStorage` disabled (private browsing edge case).
- [ ] Build passes, no TypeScript errors, no console errors.

## 14. Out of scope confirmation

This feature does NOT include:

- Image format optimization (WebP/AVIF conversion)
- Reducing the frame count
- Any change to the hero animation itself
- Any change to other pages or components
- Any change to the language switcher, theme toggle, or navigation
- Sound or audio
- Analytics events for preloader views (could be added later)

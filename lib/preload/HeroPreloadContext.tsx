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
// How many frames download in parallel. Low enough to leave bandwidth for
// fonts/JS on first load, high enough to finish the sequence in seconds.
const CONCURRENCY = 6;
// If frame 1 hasn't arrived by then, land the user anyway.
const FIRST_FRAME_TIMEOUT_MS = 4000;

export type HeroPreloadState = {
  /** Array of 120 HTMLImageElement, populated as each frame loads. */
  images: HTMLImageElement[];
  /** True as soon as the FIRST frame is decoded — the page is ready to show. */
  firstFrameReady: boolean;
  /** True once all 120 frames have either loaded or errored. */
  framesReady: boolean;
  /** Integer 0–100 representing background load progress. */
  progress: number;
  /** Which sequence dir is being loaded (true = mobile). */
  isMobile: boolean;
};

const HeroPreloadContext = createContext<HeroPreloadState | null>(null);

function getFramePaths(mobile: boolean): string[] {
  const dir = mobile ? '/sequence/dis-mobile' : '/sequence/dis';
  return Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    const num = String(i + 1).padStart(4, '0');
    return `${dir}/frame_${num}.webp`;
  });
}

/**
 * Priority order: frame 0 first (it unblocks the landing), then coarse
 * keyframes across the whole sequence (so early scrolling has something
 * close to show), then everything else in order.
 */
function buildLoadOrder(): number[] {
  const order: number[] = [0];
  const seen = new Set(order);
  for (let i = 0; i < TOTAL_FRAMES; i += 10) {
    if (!seen.has(i)) {
      order.push(i);
      seen.add(i);
    }
  }
  if (!seen.has(TOTAL_FRAMES - 1)) {
    order.push(TOTAL_FRAMES - 1);
    seen.add(TOTAL_FRAMES - 1);
  }
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    if (!seen.has(i)) order.push(i);
  }
  return order;
}

export function HeroPreloadProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [framesReady, setFramesReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Detect viewport size once on mount.
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Kick off progressive frame loading as soon as isMobile is known.
  useEffect(() => {
    setFramesReady(false);
    setFirstFrameReady(false);
    setLoadedCount(0);

    const paths = getFramePaths(isMobile);
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    const queue = buildLoadOrder();
    let count = 0;
    let cursor = 0;
    let cancelled = false;

    // Never hold the page hostage: if the first frame is slow or fails,
    // land the user on the styled fallback background.
    const firstFrameTimer = setTimeout(() => {
      if (!cancelled) setFirstFrameReady(true);
    }, FIRST_FRAME_TIMEOUT_MS);

    const loadNext = () => {
      if (cancelled || cursor >= queue.length) return;
      const index = queue[cursor++];
      const img = new Image();
      images[index] = img;
      const onSettled = () => {
        if (cancelled) return;
        count++;
        setLoadedCount(count);
        if (index === 0) setFirstFrameReady(true);
        if (count === TOTAL_FRAMES) setFramesReady(true);
        loadNext();
      };
      img.onload = onSettled;
      img.onerror = onSettled;
      img.src = paths[index];
    };

    for (let i = 0; i < CONCURRENCY; i++) loadNext();

    imagesRef.current = images;

    return () => {
      cancelled = true;
      clearTimeout(firstFrameTimer);
    };
  }, [isMobile]);

  // Update the preflash progress bar while the first frame downloads.
  const pctLoaded = Math.round((loadedCount / TOTAL_FRAMES) * 100);
  useEffect(() => {
    const bar = document.getElementById('dm-preflash-bar');
    const pct = document.getElementById('dm-preflash-pct');
    if (bar) bar.style.width = `${pctLoaded}%`;
    if (pct) pct.textContent = `${pctLoaded}%`;
  }, [pctLoaded]);

  // Remove the preflash overlay as soon as the first frame can be shown —
  // the remaining frames keep downloading in the background.
  useEffect(() => {
    if (!firstFrameReady) return;
    const el = document.getElementById('dm-preflash');
    if (el) {
      const bar = document.getElementById('dm-preflash-bar');
      if (bar) bar.style.width = '100%';
      el.style.transition = 'opacity 0.5s ease';
      el.style.opacity = '0';
      setTimeout(() => {
        el.remove();
        try {
          sessionStorage.setItem('dm_preloader_seen', '1');
        } catch {
          // sessionStorage may throw in private browsing mode — safe to ignore.
        }
      }, 500);
    }
  }, [firstFrameReady]);

  const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  const value: HeroPreloadState = {
    images: imagesRef.current,
    firstFrameReady,
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

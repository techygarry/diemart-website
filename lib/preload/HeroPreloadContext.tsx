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
    // Reset state so that Strict-Mode remounts (or isMobile changes) produce a
    // fresh false → true transition, which re-triggers downstream effects.
    setFramesReady(false);
    setLoadedCount(0);

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

  // Update the preflash progress bar as frames load.
  const pctLoaded = Math.round((loadedCount / TOTAL_FRAMES) * 100);
  useEffect(() => {
    const bar = document.getElementById('dm-preflash-bar');
    const pct = document.getElementById('dm-preflash-pct');
    if (bar) bar.style.width = `${pctLoaded}%`;
    if (pct) pct.textContent = `${pctLoaded}%`;
  }, [pctLoaded]);

  // Remove the preflash overlay once frames are ready to display.
  useEffect(() => {
    if (!framesReady) return;
    const el = document.getElementById('dm-preflash');
    if (el) {
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
  }, [framesReady]);

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

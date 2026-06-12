'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { MotionValue } from 'framer-motion';
import { useHeroPreload } from '@/lib/preload/HeroPreloadContext';

const TOTAL_FRAMES = 120;

// Tiny blurred version of frame 1, painted instantly while the real frame
// downloads so the hero never shows a black void.
const PLACEHOLDER =
  'data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAADwAwCdASoYAA4APtFUpEuoJKOhsAgBABoJZQDDNCFsFqJu9pmwM/KAAP73gM72Z3GebHBB+hkqdWfGzeElYPcCBYRA7lGwwDssMEFySP5EnMtAXPfJgsXD7qKwwYx/PrPsL8gBj55JqSIJd2nlJwtr2gAAAA==';

interface ScrollSequenceProps {
  progress: MotionValue<number>;
}

function isFrameUsable(img: HTMLImageElement | undefined): img is HTMLImageElement {
  return !!img && img.complete && img.naturalWidth > 0;
}

export default function ScrollSequence({ progress: smoothProgress }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { images, firstFrameReady, framesReady, progress } = useHeroPreload();

  // While frames are still streaming in, draw the nearest frame that has
  // already loaded instead of dropping the draw entirely.
  const resolveFrame = useCallback(
    (target: number): HTMLImageElement | null => {
      if (isFrameUsable(images[target])) return images[target];
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const below = target - offset;
        const above = target + offset;
        if (below >= 0 && isFrameUsable(images[below])) return images[below];
        if (above < TOTAL_FRAMES && isFrameUsable(images[above])) return images[above];
      }
      return null;
    },
    [images]
  );

  // Draw frame to canvas based on scroll
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const img = resolveFrame(frameIndex);
      if (!img) return;

      // Set canvas size to match container
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
      }

      // Opaque fill (not clearRect) so the letterbox areas around a
      // `contain`-mode draw stay solid dark instead of exposing the blurred
      // placeholder behind the canvas.
      ctx.fillStyle = '#080704';
      ctx.fillRect(0, 0, w, h);
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = w / h;
      const isMobileViewport = w < 768;
      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (isMobileViewport) {
        // Mobile: contain — show the full die, centered vertically.
        // Dark background blends seamlessly above and below.
        drawW = w;
        drawH = w / imgAspect;
        drawX = 0;
        drawY = (h - drawH) / 2;
      } else if (imgAspect > canvasAspect) {
        // Desktop: cover — fill entire viewport
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

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    [resolveFrame]
  );

  const frameForProgress = (v: number) =>
    Math.max(0, Math.min(Math.floor(v * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1));

  // Subscribe to smooth scroll progress as soon as the first frame exists.
  useEffect(() => {
    if (!firstFrameReady) return;
    const unsubscribe = smoothProgress.on('change', (v: number) => {
      drawFrame(frameForProgress(v));
    });
    // Draw the current frame immediately
    drawFrame(frameForProgress(smoothProgress.get()));
    return unsubscribe;
  }, [firstFrameReady, smoothProgress, drawFrame]);

  // Once ALL frames are in, redraw the current position with the exact frame
  // (the user may be parked on a frame that was only a nearest-match before).
  useEffect(() => {
    if (!framesReady) return;
    drawFrame(frameForProgress(smoothProgress.get()));
  }, [framesReady, smoothProgress, drawFrame]);

  // Redraw current frame on window resize
  useEffect(() => {
    if (!firstFrameReady) return;
    const handleResize = () => {
      drawFrame(frameForProgress(smoothProgress.get()));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [firstFrameReady, smoothProgress, drawFrame]);

  return (
    <div
      className="absolute inset-0 z-10"
      aria-hidden="true"
      style={{
        background: `#080704 url(${PLACEHOLDER}) center / cover no-repeat`,
      }}
    >
      {/* Unobtrusive hairline while remaining frames stream in */}
      {firstFrameReady && !framesReady && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-20 bg-black/40">
          <div
            className="h-full bg-[#D4AF37]/50 transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: firstFrameReady ? 1 : 0, transition: 'opacity 0.8s ease' }}
      />
    </div>
  );
}

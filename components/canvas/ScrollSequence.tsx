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
  const { images, framesReady, progress } = useHeroPreload();

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

  // Redraw current frame on window resize
  useEffect(() => {
    if (!framesReady) return;
    const handleResize = () => {
      const v = smoothProgress.get();
      const frameIndex = Math.min(
        Math.floor(v * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );
      drawFrame(Math.max(0, frameIndex));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [framesReady, smoothProgress, drawFrame]);

  return (
    <div className="absolute inset-0 z-10" aria-hidden="true" style={{ background: '#080704' }}>
      {/* Loading indicator while frames download */}
      {!framesReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <p
            className="font-cormorant-sc text-[28px] md:text-[36px] text-[#D4AF37] tracking-[0.15em] mb-6"
            style={{ textShadow: '0 2px 20px rgba(212,175,55,0.3)' }}
          >
            DIE MART
          </p>
          <div className="w-[120px] h-[1px] bg-[#D4AF37]/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D4AF37] transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-dm-sans text-[11px] text-[#D4AF37]/50 mt-3 tracking-[0.2em]">
            {progress}%
          </p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: framesReady ? 1 : 0, transition: 'opacity 0.8s ease' }}
      />
    </div>
  );
}

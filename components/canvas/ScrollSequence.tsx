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
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: framesReady ? 1 : 0, transition: 'opacity 0.8s ease' }}
      />
    </div>
  );
}

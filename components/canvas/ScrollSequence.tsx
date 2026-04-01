'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { MotionValue } from 'framer-motion';

const TOTAL_FRAMES = 120;

function getFramePaths(mobile: boolean) {
  const dir = mobile ? '/sequence/dis-mobile' : '/sequence/dis';
  return Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    const num = String(i + 1).padStart(4, '0');
    return `${dir}/frame_${num}.jpg`;
  });
}

interface ScrollSequenceProps {
  progress: MotionValue<number>;
}

export default function ScrollSequence({ progress: smoothProgress }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Preload all frames
  useEffect(() => {
    const paths = getFramePaths(isMobile);
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    paths.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) setLoaded(true);
      };
      images[i] = img;
    });

    imagesRef.current = images;
  }, [isMobile]);

  // Draw frame to canvas based on scroll
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imagesRef.current[frameIndex];
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
      drawY = h * 0.08; // push down slightly from top to leave room for nav
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
  }, []);

  // Subscribe to smooth scroll progress
  useEffect(() => {
    if (!loaded) return;
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
  }, [loaded, smoothProgress, drawFrame]);

  return (
    <div className="absolute inset-0 z-10" aria-hidden="true" style={{ background: '#080704' }}>
      {/* Preloader */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="w-48 h-[2px] bg-dm-black-light rounded-full overflow-hidden">
            <div
              className="h-full bg-dm-gold-primary transition-all duration-200 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="font-dm-sans font-light text-dm-white-ghost text-xs mt-3 tracking-wider">
            Loading {loadProgress}%
          </p>
        </div>
      )}

      {/* Canvas for scroll-linked frames */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}
      />
    </div>
  );
}

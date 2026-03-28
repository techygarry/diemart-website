'use client';

import { useState, useEffect } from 'react';
import { detectPerfTier, type PerfTier } from '@/lib/utils/deviceCapability';

export function useDeviceDetect() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [perfTier, setPerfTier] = useState<PerfTier>('medium');

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsDesktop(width >= 1024);
    };
    checkDevice();
    setPerfTier(detectPerfTier());
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isDesktop, perfTier };
}

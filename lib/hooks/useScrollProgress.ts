'use client';

import { useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

export function useScrollProgress(options?: { offset?: Parameters<typeof useScroll>[0] extends { offset?: infer O } ? O : never }) {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const offset = (options?.offset || ['start start', 'end end']) as any;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return { ref, scrollYProgress, smoothProgress };
}

export function useScrollRange(progress: MotionValue<number>, inputRange: [number, number], outputRange: [number, number]) {
  return useTransform(progress, inputRange, outputRange);
}

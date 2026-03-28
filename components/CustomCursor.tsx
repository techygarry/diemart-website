'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useDeviceDetect } from '@/lib/hooks/useDeviceDetect';

const CURSOR_SIZE = 16;
const CURSOR_HOVER_SIZE = 48;
const LERP_FACTOR = 0.15;

export default function CustomCursor() {
  const { isMobile } = useDeviceDetect();
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);

  const animate = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Lerp towards target
    posRef.current.x += (targetRef.current.x - posRef.current.x) * LERP_FACTOR;
    posRef.current.y += (targetRef.current.y - posRef.current.y) * LERP_FACTOR;

    const size = isHoveringRef.current ? CURSOR_HOVER_SIZE : CURSOR_SIZE;
    const half = size / 2;

    cursor.style.transform = `translate3d(${posRef.current.x - half}px, ${posRef.current.y - half}px, 0)`;
    cursor.style.width = `${size}px`;
    cursor.style.height = `${size}px`;

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Don't render on mobile
    if (isMobile) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      if (!visibleRef.current) {
        visibleRef.current = true;
        cursor.style.opacity = '1';
        // Set initial position immediately to avoid cursor jumping from 0,0
        posRef.current.x = e.clientX;
        posRef.current.y = e.clientY;
      }
    };

    const handleMouseEnterInteractive = () => {
      isHoveringRef.current = true;
      if (cursor) cursor.style.borderColor = 'rgba(212, 175, 55, 0.6)';
    };

    const handleMouseLeaveInteractive = () => {
      isHoveringRef.current = false;
      if (cursor) cursor.style.borderColor = '#D4AF37';
    };

    const handleMouseLeaveWindow = () => {
      visibleRef.current = false;
      if (cursor) cursor.style.opacity = '0';
    };

    // Track interactive elements
    const addInteractiveListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [tabindex]');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      return interactives;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    const interactives = addInteractiveListeners();

    // Observe DOM changes to re-attach listeners for dynamically added elements
    const observer = new MutationObserver(() => {
      // Re-add listeners for any new interactive elements
      const newInteractives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [tabindex]');
      newInteractives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, animate]);

  // Don't render anything on mobile
  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 start-0 rounded-full
                 border-2 border-dm-gold-primary
                 opacity-0 mix-blend-difference"
      style={{
        zIndex: 9999,
        width: `${CURSOR_SIZE}px`,
        height: `${CURSOR_SIZE}px`,
        transition: 'width 0.3s cubic-bezier(0.25,0.46,0.45,0.94), height 0.3s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.3s ease, opacity 0.3s ease',
        willChange: 'transform, width, height',
      }}
      aria-hidden="true"
    />
  );
}

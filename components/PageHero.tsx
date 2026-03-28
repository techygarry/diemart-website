'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface PageHeroProps {
  label: string;
  title: string;
  subtitle: string;
}

/* ------------------------------------------------------------------ */
/*  Floating gold particles configuration                             */
/* ------------------------------------------------------------------ */
const particles = [
  { size: 3, left: '12%', delay: '0s',   duration: '18s', startY: '80%' },
  { size: 2, left: '28%', delay: '2s',   duration: '22s', startY: '90%' },
  { size: 4, left: '44%', delay: '4s',   duration: '16s', startY: '70%' },
  { size: 2, left: '58%', delay: '1s',   duration: '20s', startY: '85%' },
  { size: 3, left: '72%', delay: '3s',   duration: '19s', startY: '75%' },
  { size: 2, left: '86%', delay: '5s',   duration: '21s', startY: '95%' },
  { size: 3, left: '36%', delay: '6s',   duration: '17s', startY: '88%' },
  { size: 2, left: '64%', delay: '7s',   duration: '23s', startY: '82%' },
];

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLParagraphElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  /* ---- Entrance animations ---- */
  useEffect(() => {
    if (reducedMotion) {
      [labelRef, titleRef, subtitleRef].forEach((r) => {
        if (r.current) r.current.style.opacity = '1';
      });
      if (lineRef.current) {
        lineRef.current.style.opacity = '1';
        lineRef.current.style.transform = 'scaleX(1)';
      }
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.15,
      });

      // Label — fade in from top
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: -24 },
        { opacity: 1, y: 0, duration: 0.8 },
        0,
      );

      // Title — scale up from 0.9 with opacity
      tl.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1 },
        0.2,
      );

      // Subtitle — fade in from bottom
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.5,
      );

      // Gold decorative line — draw in from center
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 1 },
        { scaleX: 1, duration: 0.9, ease: 'power2.inOut' },
        0.7,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[50vh] flex flex-col items-center justify-center bg-dm-black-warm overflow-hidden"
    >
      {/* ========== Animated shifting gradient background ========== */}
      <div
        className="absolute inset-0 pointer-events-none animate-[gradientShift_12s_ease_infinite]"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(135deg, rgba(15,13,6,1) 0%, rgba(30,25,10,1) 25%, rgba(15,13,6,1) 50%, rgba(25,20,8,1) 75%, rgba(15,13,6,1) 100%)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Radial gold glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 45%, rgba(212,175,55,0.07) 0%, transparent 70%)',
        }}
      />

      {/* ========== Floating gold particle dots ========== */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {particles.map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full animate-[particleFloat_linear_infinite]"
              style={{
                width: p.size,
                height: p.size,
                left: p.left,
                top: p.startY,
                background:
                  'radial-gradient(circle, #D4AF37 0%, rgba(212,175,55,0.3) 100%)',
                animationDelay: p.delay,
                animationDuration: p.duration,
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* ========== Content ========== */}
      <div className="relative z-10 text-center px-6 py-24 max-w-3xl mx-auto">
        {/* Decorative L-shaped corner elements */}
        <div className="absolute inset-6 pointer-events-none" aria-hidden="true">
          {/* Top-left */}
          <span className="absolute top-0 left-0 w-7 h-7 border-t border-l border-dm-gold-primary/25" />
          {/* Top-right */}
          <span className="absolute top-0 right-0 w-7 h-7 border-t border-r border-dm-gold-primary/25" />
          {/* Bottom-left */}
          <span className="absolute bottom-0 left-0 w-7 h-7 border-b border-l border-dm-gold-primary/25" />
          {/* Bottom-right */}
          <span className="absolute bottom-0 right-0 w-7 h-7 border-b border-r border-dm-gold-primary/25" />
        </div>

        {/* Label */}
        <p
          ref={labelRef}
          className="font-dm-sans font-light uppercase tracking-[0.3em] text-dm-gold-muted text-sm mb-4 opacity-0"
        >
          {label}
        </p>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-cormorant-sc font-bold text-5xl md:text-7xl text-dm-white-warm mb-4 opacity-0"
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-cormorant italic text-xl text-dm-gold-muted opacity-0"
        >
          {subtitle}
        </p>

        {/* Decorative horizontal element: gold line — diamond — gold line */}
        <div
          ref={lineRef}
          className="flex items-center justify-center gap-3 mt-10 origin-center opacity-0"
          style={{ transform: 'scaleX(0)' }}
          aria-hidden="true"
        >
          {/* Left gradient line */}
          <span
            className="block h-px w-16 md:w-24"
            style={{
              background: 'linear-gradient(to right, transparent, #D4AF37)',
            }}
          />
          {/* Center diamond */}
          <span className="block w-2 h-2 rotate-45 border border-dm-gold-primary/60 flex-shrink-0" />
          {/* Right gradient line */}
          <span
            className="block h-px w-16 md:w-24"
            style={{
              background: 'linear-gradient(to left, transparent, #D4AF37)',
            }}
          />
        </div>
      </div>

      {/* ========== Scroll-down indicator ========== */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-[scrollHint_2.4s_ease-in-out_infinite]"
        aria-hidden="true"
      >
        <span className="block text-[10px] uppercase tracking-[0.25em] text-dm-gold-muted/50 font-dm-sans">
          Scroll
        </span>
        <svg
          className="w-4 h-4 text-dm-gold-primary/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* ========== CSS Keyframe animations ========== */}
      <style jsx>{`
        @keyframes particleFloat {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0);
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
            transform: translateY(-110vh) translateX(30px);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes scrollHint {
          0%,
          100% {
            opacity: 0.5;
            transform: translateX(-50%) translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) translateY(6px);
          }
        }
      `}</style>
    </section>
  );
}

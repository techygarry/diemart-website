'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

/* Counter Animation Hook */
function useCountUp(target: number, duration: number, isVisible: boolean): number {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [isVisible, target, duration]);

  return count;
}

/* Intersection Observer Hook */
function useIntersection(threshold = 0.3): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

/* Individual Stat Components */

interface AnimatedCountStatProps {
  target: number;
  suffix?: string;
  label: string;
  duration: number;
  isVisible: boolean;
}

function AnimatedCountStat({ target, suffix = '', label, duration, isVisible }: AnimatedCountStatProps) {
  const count = useCountUp(target, duration, isVisible);

  return (
    <div className="bg-dm-black-mid border border-dm-black-light rounded-xl p-8 text-center relative overflow-hidden">
      {/* Subtle gold top border */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-dm-gold-primary/40" aria-hidden="true" />

      <div className="font-cormorant font-bold text-5xl md:text-6xl text-dm-gold-primary mb-3" style={{ textShadow: '0 0 20px rgba(212,175,55,0.15)' }}>
        {count.toLocaleString()}
        {suffix && (
          <span className="text-3xl md:text-4xl text-dm-gold-muted ms-0.5">{suffix}</span>
        )}
      </div>

      {/* Gold separator line */}
      <div className="w-8 h-px bg-dm-gold-primary/40 mx-auto mb-3" aria-hidden="true" />

      <div className="font-dm-sans text-sm text-dm-white-soft uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

interface FadeInStatProps {
  value: string;
  label: string;
  isVisible: boolean;
}

function FadeInStat({ value, label, isVisible }: FadeInStatProps) {
  // Split value for "+" suffix styling
  const hasPlus = value.endsWith('+');
  const displayValue = hasPlus ? value.slice(0, -1) : value;

  return (
    <div
      className={`bg-dm-black-mid border border-dm-black-light rounded-xl p-8 text-center relative overflow-hidden transition-all duration-1000 ease-luxury ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Subtle gold top border */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-dm-gold-primary/40" aria-hidden="true" />

      <div className="font-cormorant font-bold text-5xl md:text-6xl text-dm-gold-primary mb-3" style={{ textShadow: '0 0 20px rgba(212,175,55,0.15)' }}>
        {displayValue}
        {hasPlus && (
          <span className="text-3xl md:text-4xl text-dm-gold-muted ms-0.5">+</span>
        )}
      </div>

      {/* Gold separator line */}
      <div className="w-8 h-px bg-dm-gold-primary/40 mx-auto mb-3" aria-hidden="true" />

      <div className="font-dm-sans text-sm text-dm-white-soft uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

/* Stats Section */
export default function Stats() {
  const t = useTranslations('stats');
  const [sectionRef, isVisible] = useIntersection(0.2);

  return (
    <section
      id="stats"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-[120px] bg-dm-black-warm"
      aria-labelledby="stats-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Heading */}
        <h2 id="stats-heading" className="font-cormorant font-semibold text-4xl md:text-5xl text-dm-gold-primary text-center mb-16">
          {t('heading')}
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {/* 3,600+ Designs */}
          <AnimatedCountStat
            target={3600}
            suffix="+"
            label={t('designs')}
            duration={2000}
            isVisible={isVisible}
          />

          {/* 10 Lakh+ Dies */}
          <FadeInStat
            value="10 Lakh+"
            label={t('dies')}
            isVisible={isVisible}
          />

          {/* 100+ Karigars */}
          <AnimatedCountStat
            target={100}
            suffix="+"
            label={t('karigars')}
            duration={1500}
            isVisible={isVisible}
          />

          {/* 3 Factories */}
          <AnimatedCountStat
            target={3}
            label={t('factories')}
            duration={1000}
            isVisible={isVisible}
          />

          {/* 24/7 Uptime */}
          <FadeInStat
            value="24/7"
            label={t('uptime')}
            isVisible={isVisible}
          />

          {/* 30+ Years */}
          <AnimatedCountStat
            target={30}
            suffix="+"
            label={t('years')}
            duration={1500}
            isVisible={isVisible}
          />
        </div>

        {/* Supporting line */}
        <p className="font-cormorant text-dm-white-soft text-lg md:text-xl text-center max-w-3xl mx-auto italic">
          {t('supporting')}
        </p>
      </div>
    </section>
  );
}

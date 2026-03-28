'use client';

import { useEffect, useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollProgress } from '@/lib/hooks/useScrollProgress';
import { animateHeroOverlay } from '@/lib/animations';
import { BRAND } from '@/lib/brand';
import ScrollIndicator from '@/components/ScrollIndicator';
import ScrollSequence from '@/components/canvas/ScrollSequence';

export default function Hero() {
  const t = useTranslations('hero');
  const { ref, smoothProgress } = useScrollProgress();
  const hasAnimated = useRef(false);

  // GSAP staggered entrance for Beat 1
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const tl = animateHeroOverlay();
    return () => {
      tl.kill();
    };
  }, []);

  /* ─── Beat opacities with WIDER ranges & smoother fades ─── */
  // Beat 1: 0 → 0.18 (main hero)
  const beat1Opacity = useTransform(
    smoothProgress,
    [0, 0.01, 0.14, 0.18],
    [1, 1, 1, 0]
  );
  const beat1Y = useTransform(smoothProgress, [0, 0.18], [0, -60]);

  // Beat 2: 0.15 → 0.35 (ORIGIN) — wider with smooth fade
  const beat2Opacity = useTransform(
    smoothProgress,
    [0.14, 0.18, 0.31, 0.35],
    [0, 1, 1, 0]
  );

  // Beat 3: 0.33 → 0.53 (CRAFT)
  const beat3Opacity = useTransform(
    smoothProgress,
    [0.33, 0.37, 0.50, 0.54],
    [0, 1, 1, 0]
  );

  // Beat 4: 0.52 → 0.72 (THE DIE)
  const beat4Opacity = useTransform(
    smoothProgress,
    [0.52, 0.56, 0.68, 0.72],
    [0, 1, 1, 0]
  );

  // Beat 5: 0.70 → 0.90 (REVOLUTION)
  const beat5Opacity = useTransform(
    smoothProgress,
    [0.70, 0.74, 0.86, 0.90],
    [0, 1, 1, 0]
  );

  // Beat 6: 0.88 → 1.0 (THE WORLD)
  const beat6Opacity = useTransform(
    smoothProgress,
    [0.88, 0.92, 1],
    [0, 1, 1]
  );

  /* ─── Persistent golden branding elements ─── */
  // Logo/brand watermark: visible from 0.15 to 0.92 (during all middle beats)
  const brandWatermarkOpacity = useTransform(
    smoothProgress,
    [0.14, 0.20, 0.86, 0.92],
    [0, 0.12, 0.12, 0]
  );

  // Bottom stats bar: visible during middle beats
  const bottomBarOpacity = useTransform(
    smoothProgress,
    [0.14, 0.20, 0.86, 0.92],
    [0, 1, 1, 0]
  );

  // Side gold accent lines: visible during middle beats
  const sideAccentOpacity = useTransform(
    smoothProgress,
    [0.14, 0.20, 0.86, 0.92],
    [0, 0.5, 0.5, 0]
  );

  // Scroll progress indicator line
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Beat counter (which beat is active)
  const beatNumberOpacity = useTransform(
    smoothProgress,
    [0.14, 0.20, 0.86, 0.92],
    [0, 0.7, 0.7, 0]
  );

  // Calculate which beat number to show
  const beatNumber = useTransform(smoothProgress, (v: number) => {
    if (v < 0.18) return '';
    if (v < 0.35) return '01';
    if (v < 0.54) return '02';
    if (v < 0.72) return '03';
    if (v < 0.90) return '04';
    return '05';
  });

  const beatLabel = useTransform(smoothProgress, (v: number) => {
    if (v < 0.18) return '';
    if (v < 0.35) return 'ORIGIN';
    if (v < 0.54) return 'CRAFT';
    if (v < 0.72) return 'THE DIE';
    if (v < 0.90) return 'REVOLUTION';
    return 'THE WORLD';
  });

  const textShadowStyle = {
    textShadow: '0 2px 30px rgba(0,0,0,0.9), 0 4px 60px rgba(0,0,0,0.5)',
  };

  const beatCardStyle = 'backdrop-blur-sm bg-dm-black-deep/30 border border-dm-gold-primary/10 rounded-lg p-6 md:p-8 lg:p-10';

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[500vh]"
      aria-label="Hero"
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 z-30 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* ── Layer 1: Scroll-driven video/frames ── */}
        <ScrollSequence progress={smoothProgress} />

        {/* ── Layer 2: Persistent golden branding elements ── */}

        {/* Large watermark "DM" in center — always visible during scroll */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          style={{ opacity: brandWatermarkOpacity }}
          aria-hidden="true"
        >
          <span
            className="font-cormorant-sc font-bold text-[180px] md:text-[280px] lg:text-[360px] text-dm-gold-primary select-none leading-none"
            style={{ textShadow: '0 0 80px rgba(212,175,55,0.1)' }}
          >
            DM
          </span>
        </motion.div>

        {/* Left vertical gold accent line */}
        <motion.div
          className="absolute top-[15%] bottom-[15%] start-6 md:start-10 w-[1px] bg-gradient-to-b from-transparent via-dm-gold-primary to-transparent pointer-events-none z-20"
          style={{ opacity: sideAccentOpacity }}
          aria-hidden="true"
        />

        {/* Right vertical gold accent line */}
        <motion.div
          className="absolute top-[15%] bottom-[15%] end-6 md:end-10 w-[1px] bg-gradient-to-b from-transparent via-dm-gold-primary to-transparent pointer-events-none z-20"
          style={{ opacity: sideAccentOpacity }}
          aria-hidden="true"
        />

        {/* Bottom persistent stats bar */}
        <motion.div
          className="absolute bottom-8 md:bottom-10 left-0 right-0 z-20 pointer-events-none"
          style={{ opacity: bottomBarOpacity }}
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between">
            {/* Left: Beat counter */}
            <motion.div className="flex items-center gap-3" style={{ opacity: beatNumberOpacity }}>
              <motion.span className="font-cormorant font-bold text-3xl md:text-4xl text-dm-gold-primary/70">
                {beatNumber}
              </motion.span>
              <div className="flex flex-col">
                <motion.span className="font-dm-sans text-[10px] uppercase tracking-[0.2em] text-dm-gold-primary/60">
                  {beatLabel}
                </motion.span>
                <span className="font-dm-sans text-[9px] uppercase tracking-[0.15em] text-dm-white-ghost/40">
                  of 05
                </span>
              </div>
            </motion.div>

            {/* Center: Progress bar */}
            <div className="hidden md:block flex-1 mx-8 max-w-xs">
              <div className="h-[1px] bg-dm-white-ghost/20 relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-dm-gold-primary"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>

            {/* Right: Company tagline */}
            <span className="hidden md:block font-cormorant italic text-xs text-dm-gold-muted/50">
              The Die Behind Every Jewellery
            </span>
          </div>
        </motion.div>

        {/* Top-right corner frame decoration */}
        <motion.div
          className="absolute top-6 md:top-10 end-6 md:end-10 w-12 h-12 pointer-events-none z-20"
          style={{ opacity: sideAccentOpacity }}
          aria-hidden="true"
        >
          <div className="absolute top-0 end-0 w-full h-[1px] bg-dm-gold-primary/60" />
          <div className="absolute top-0 end-0 h-full w-[1px] bg-dm-gold-primary/60" />
        </motion.div>

        {/* Bottom-left corner frame decoration */}
        <motion.div
          className="absolute bottom-20 md:bottom-24 start-6 md:start-10 w-12 h-12 pointer-events-none z-20"
          style={{ opacity: sideAccentOpacity }}
          aria-hidden="true"
        >
          <div className="absolute bottom-0 start-0 w-full h-[1px] bg-dm-gold-primary/60" />
          <div className="absolute bottom-0 start-0 h-full w-[1px] bg-dm-gold-primary/60" />
        </motion.div>

        {/* ── Layer 3: Beat content (z-30) ── */}

        {/* ═══ BEAT 1: Main Hero ═══ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-30"
          style={{ opacity: beat1Opacity, y: beat1Y }}
        >
          <p className="hero-location font-dm-sans font-light uppercase text-dm-white-ghost text-xs md:text-sm tracking-[0.25em] mb-6">
            {t('location')}
          </p>
          <h1 className="hero-title font-cormorant-sc font-bold text-[42px] md:text-[72px] text-dm-white-warm leading-none mb-4" style={textShadowStyle}>
            {t('title')}
          </h1>
          <p className="hero-tagline font-cormorant italic text-dm-gold-muted text-lg md:text-2xl mb-6" style={textShadowStyle}>
            {t('tagline')}
          </p>
          <div className="w-16 h-px bg-dm-gold-primary/40 mb-6" aria-hidden="true" />
          <p className="hero-stats font-dm-sans font-light text-dm-white-soft text-xs md:text-sm tracking-wider mb-10" style={textShadowStyle}>
            {t('stats')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href="#about"
              className="hero-cta group relative inline-flex items-center justify-center px-8 py-3 border border-dm-gold-primary/60 text-dm-gold-primary font-dm-sans font-light text-sm uppercase tracking-widest transition-all duration-[350ms] ease-luxury hover:border-dm-gold-primary hover:bg-dm-gold-primary/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] backdrop-blur-sm"
            >
              {t('cta_explore')}
            </a>
            <a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta group relative inline-flex items-center justify-center px-8 py-3 bg-dm-gold-primary text-dm-black-deep font-dm-sans font-medium text-sm uppercase tracking-widest transition-all duration-[350ms] ease-luxury hover:bg-dm-gold-bright hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              {t('cta_contact')}
            </a>
          </div>
          <p className="hero-established font-dm-sans font-light text-dm-white-ghost text-xs tracking-wider mb-8">
            {t('established')}
          </p>
          <ScrollIndicator />
        </motion.div>

        {/* ═══ BEAT 2: ORIGIN — LEFT ═══ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-start justify-center ps-6 md:ps-16 lg:ps-24 pe-6 z-30"
          style={{ opacity: beat2Opacity }}
        >
          <div className={`max-w-lg ${beatCardStyle}`}>
            {/* Gold accent top bar */}
            <div className="w-12 h-[2px] bg-dm-gold-primary mb-5" aria-hidden="true" />
            <span className="font-dm-sans font-medium uppercase text-dm-gold-primary text-xs tracking-[0.3em] mb-3 block">
              {t('beat_origin_title')}
            </span>
            <p className="font-cormorant text-dm-white-warm text-lg md:text-xl lg:text-2xl leading-relaxed" style={textShadowStyle}>
              {t('beat_origin')}
            </p>
            {/* Decorative bottom element */}
            <div className="flex items-center gap-2 mt-5" aria-hidden="true">
              <div className="h-px flex-1 bg-gradient-to-r from-dm-gold-primary/30 to-transparent" />
              <span className="font-cormorant text-xs text-dm-gold-primary/40">1980</span>
            </div>
          </div>
        </motion.div>

        {/* ═══ BEAT 3: CRAFT — RIGHT ═══ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-end justify-center pe-6 md:pe-16 lg:pe-24 ps-6 z-30"
          style={{ opacity: beat3Opacity }}
        >
          <div className={`max-w-lg ${beatCardStyle}`}>
            <div className="w-12 h-[2px] bg-dm-gold-primary mb-5 ms-auto" aria-hidden="true" />
            <div className="text-end">
              <span className="font-dm-sans font-medium uppercase text-dm-gold-primary text-xs tracking-[0.3em] mb-3 block">
                {t('beat_craft_title')}
              </span>
              <p className="font-cormorant text-dm-white-warm text-lg md:text-xl lg:text-2xl leading-relaxed" style={textShadowStyle}>
                {t('beat_craft')}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-5" aria-hidden="true">
              <span className="font-cormorant text-xs text-dm-gold-primary/40">3 Factories</span>
              <div className="h-px flex-1 bg-gradient-to-l from-dm-gold-primary/30 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* ═══ BEAT 4: THE DIE — LEFT ═══ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-start justify-center ps-6 md:ps-16 lg:ps-24 pe-6 z-30"
          style={{ opacity: beat4Opacity }}
        >
          <div className={`max-w-lg ${beatCardStyle}`}>
            <div className="w-12 h-[2px] bg-dm-gold-primary mb-5" aria-hidden="true" />
            <span className="font-dm-sans font-medium uppercase text-dm-gold-primary text-xs tracking-[0.3em] mb-3 block">
              {t('beat_die_title')}
            </span>
            <p className="font-cormorant text-dm-white-warm text-lg md:text-xl lg:text-2xl leading-relaxed" style={textShadowStyle}>
              {t('beat_die')}
            </p>
            <div className="flex items-center gap-2 mt-5" aria-hidden="true">
              <div className="h-px flex-1 bg-gradient-to-r from-dm-gold-primary/30 to-transparent" />
              <span className="font-cormorant text-xs text-dm-gold-primary/40">3,600+ Designs</span>
            </div>
          </div>
        </motion.div>

        {/* ═══ BEAT 5: REVOLUTION — RIGHT ═══ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-end justify-center pe-6 md:pe-16 lg:pe-24 ps-6 z-30"
          style={{ opacity: beat5Opacity }}
        >
          <div className={`max-w-lg ${beatCardStyle}`}>
            <div className="w-12 h-[2px] bg-dm-gold-primary mb-5 ms-auto" aria-hidden="true" />
            <div className="text-end">
              <span className="font-dm-sans font-medium uppercase text-dm-gold-primary text-xs tracking-[0.3em] mb-3 block">
                {t('beat_revolution_title')}
              </span>
              <p className="font-cormorant text-dm-white-warm text-lg md:text-xl lg:text-2xl leading-relaxed" style={textShadowStyle}>
                {t('beat_revolution')}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-5" aria-hidden="true">
              <span className="font-cormorant text-xs text-dm-gold-primary/40">Est. 2022</span>
              <div className="h-px flex-1 bg-gradient-to-l from-dm-gold-primary/30 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* ═══ BEAT 6: THE WORLD + CTA — CENTER ═══ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center z-30"
          style={{ opacity: beat6Opacity }}
        >
          <div className={`max-w-2xl ${beatCardStyle} text-center`}>
            <div className="w-12 h-[2px] bg-dm-gold-primary mb-5 mx-auto" aria-hidden="true" />
            <span className="font-dm-sans font-medium uppercase text-dm-gold-primary text-xs tracking-[0.3em] mb-3 block">
              {t('beat_world_title')}
            </span>
            <p className="font-cormorant text-dm-white-warm text-lg md:text-xl lg:text-2xl leading-relaxed mb-8" style={textShadowStyle}>
              {t('beat_world')}
            </p>
            <a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-dm-gold-primary text-dm-black-deep font-dm-sans font-medium text-sm uppercase tracking-widest transition-all duration-[350ms] ease-luxury hover:bg-dm-gold-bright hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t('beat_world_cta')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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

  /* ─── 3 beats matched to die animation ─── */

  // Beat 1: 0 → 0.30 — Brand intro (die is whole)
  const beat1Opacity = useTransform(
    smoothProgress,
    [0, 0.01, 0.22, 0.30],
    [1, 1, 1, 0]
  );
  const beat1Y = useTransform(smoothProgress, [0, 0.30], [0, -50]);

  // Beat 2: 0.28 → 0.65 — Die explodes (components visible)
  const beat2Opacity = useTransform(
    smoothProgress,
    [0.28, 0.35, 0.58, 0.65],
    [0, 1, 1, 0]
  );

  // Beat 3: 0.63 → 1.0 — Die reassembles (CTA)
  const beat3Opacity = useTransform(
    smoothProgress,
    [0.63, 0.70, 1],
    [0, 1, 1]
  );

  /* ─── Persistent golden elements (visible during beats 2-3) ─── */
  const accentOpacity = useTransform(
    smoothProgress,
    [0.28, 0.35, 0.92, 1],
    [0, 0.5, 0.5, 0]
  );

  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  const beatNumber = useTransform(smoothProgress, (v: number): string => {
    if (v < 0.30) return '';
    if (v < 0.65) return '01';
    return '02';
  });

  const beatLabel = useTransform(smoothProgress, (v: number): string => {
    if (v < 0.30) return '';
    if (v < 0.65) return 'THE DIE';
    return 'YOUR DIE';
  });

  const textShadowStyle = {
    textShadow: '0 2px 30px rgba(0,0,0,0.9), 0 4px 60px rgba(0,0,0,0.5)',
  };

  const beatCardStyle = 'backdrop-blur-md bg-black/40 border border-white/10 rounded-lg p-6 md:p-8 lg:p-10';

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[300vh]"
      aria-label="Hero"
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 z-30 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* ── Layer 1: Scroll-driven die animation ── */}
        <ScrollSequence progress={smoothProgress} />

        {/* ── Layer 2: Gold accent lines ── */}
        <motion.div
          className="absolute top-[15%] bottom-[15%] start-6 md:start-10 w-[1px] bg-gradient-to-b from-transparent via-dm-gold-primary to-transparent pointer-events-none z-20"
          style={{ opacity: accentOpacity }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute top-[15%] bottom-[15%] end-6 md:end-10 w-[1px] bg-gradient-to-b from-transparent via-dm-gold-primary to-transparent pointer-events-none z-20"
          style={{ opacity: accentOpacity }}
          aria-hidden="true"
        />

        {/* Top-right corner frame */}
        <motion.div
          className="absolute top-6 md:top-10 end-6 md:end-10 w-12 h-12 pointer-events-none z-20"
          style={{ opacity: accentOpacity }}
          aria-hidden="true"
        >
          <div className="absolute top-0 end-0 w-full h-[1px] bg-dm-gold-primary/60" />
          <div className="absolute top-0 end-0 h-full w-[1px] bg-dm-gold-primary/60" />
        </motion.div>

        {/* Bottom-left corner frame */}
        <motion.div
          className="absolute bottom-20 md:bottom-24 start-6 md:start-10 w-12 h-12 pointer-events-none z-20"
          style={{ opacity: accentOpacity }}
          aria-hidden="true"
        >
          <div className="absolute bottom-0 start-0 w-full h-[1px] bg-dm-gold-primary/60" />
          <div className="absolute bottom-0 start-0 h-full w-[1px] bg-dm-gold-primary/60" />
        </motion.div>

        {/* Bottom progress bar */}
        <motion.div
          className="absolute bottom-8 md:bottom-10 left-0 right-0 z-20 pointer-events-none"
          style={{ opacity: accentOpacity }}
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between">
            <motion.div className="flex items-center gap-3">
              <motion.span className="font-cormorant font-bold text-3xl md:text-4xl text-dm-gold-primary/70">
                {beatNumber}
              </motion.span>
              <div className="flex flex-col">
                <motion.span className="font-dm-sans text-[10px] uppercase tracking-[0.2em] text-dm-gold-primary/60">
                  {beatLabel}
                </motion.span>
                <span className="font-dm-sans text-[9px] uppercase tracking-[0.15em] text-dm-white-ghost/40">
                  of 02
                </span>
              </div>
            </motion.div>

            <div className="hidden md:block flex-1 mx-8 max-w-xs">
              <div className="h-[1px] bg-dm-white-ghost/20 relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-dm-gold-primary"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>

            <span className="hidden md:block font-cormorant italic text-xs text-dm-gold-muted/50">
              {t('tagline')}
            </span>
          </div>
        </motion.div>

        {/* ── Layer 3: Beat content ── */}

        {/* ═══ BEAT 1: Brand Intro ═══ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-30"
          style={{ opacity: beat1Opacity, y: beat1Y }}
        >
          <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl px-8 py-10 md:px-16 md:py-14">
            <p className="hero-location font-dm-sans font-light uppercase text-white/60 text-xs md:text-sm tracking-[0.25em] mb-6">
              {t('location')}
            </p>
            <h1 className="hero-title font-cormorant-sc font-bold text-[48px] md:text-[80px] lg:text-[96px] text-white leading-none mb-4" style={textShadowStyle}>
              {t('title')}
            </h1>
            <p className="hero-tagline font-cormorant italic text-[#D4AF37] text-xl md:text-3xl mb-8" style={textShadowStyle}>
              {t('tagline')}
            </p>
            <div className="w-20 h-px bg-[#D4AF37]/40 mb-8 mx-auto" aria-hidden="true" />
            <p className="hero-established font-dm-sans font-light text-white/50 text-xs md:text-sm tracking-wider mb-10">
              {t('established')}
            </p>
            <ScrollIndicator />
          </div>
        </motion.div>

        {/* ═══ BEAT 2: The Die (exploded) ═══ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-start justify-center ps-6 md:ps-16 lg:ps-24 pe-6 z-30"
          style={{ opacity: beat2Opacity }}
        >
          <div className={`max-w-lg ${beatCardStyle}`}>
            <div className="w-12 h-[2px] bg-dm-gold-primary mb-5" aria-hidden="true" />
            <span className="font-dm-sans font-medium uppercase text-[#D4AF37] text-xs tracking-[0.3em] mb-3 block">
              {t('beat_die_title')}
            </span>
            <p className="font-cormorant text-white text-lg md:text-xl lg:text-2xl leading-relaxed" style={textShadowStyle}>
              {t('beat_die')}
            </p>
            <div className="flex items-center gap-2 mt-5" aria-hidden="true">
              <div className="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/30 to-transparent" />
              <span className="font-cormorant text-xs text-[#D4AF37]/40">3,600+ Designs</span>
            </div>
          </div>
        </motion.div>

        {/* ═══ BEAT 3: Your Die (reassembled + CTA) ═══ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center z-30"
          style={{ opacity: beat3Opacity }}
        >
          <div className={`max-w-2xl ${beatCardStyle} text-center`}>
            <div className="w-12 h-[2px] bg-dm-gold-primary mb-5 mx-auto" aria-hidden="true" />
            <span className="font-dm-sans font-medium uppercase text-[#D4AF37] text-xs tracking-[0.3em] mb-3 block">
              {t('beat_world_title')}
            </span>
            <p className="font-cormorant text-white text-lg md:text-xl lg:text-2xl leading-relaxed mb-8" style={textShadowStyle}>
              {t('beat_world')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#products"
                className="group inline-flex items-center justify-center px-8 py-3.5 border border-[#D4AF37]/60 text-[#D4AF37] font-dm-sans font-light text-sm uppercase tracking-widest transition-all duration-[350ms] ease-luxury hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] backdrop-blur-sm"
              >
                {t('cta_explore')}
              </a>
              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#D4AF37] text-black font-dm-sans font-medium text-sm uppercase tracking-widest transition-all duration-[350ms] ease-luxury hover:bg-[#E8C547] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t('beat_world_cta')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

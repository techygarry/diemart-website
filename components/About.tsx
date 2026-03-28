'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

/* ------------------------------------------------------------------ */
/*  Gold-bordered image frame with shimmer placeholder & parallax     */
/* ------------------------------------------------------------------ */

function FounderImage() {
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  const handleLoad = useCallback(() => setLoaded(true), []);

  return (
    <div ref={frameRef} className="relative">
      {/* ---- Decorative floating gold particles ---- */}
      <div
        className="absolute -top-4 -end-4 w-2.5 h-2.5 rounded-full bg-dm-gold-primary/60 animate-gold-particle"
        style={{ animationDelay: '0s' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 -start-5 w-2 h-2 rounded-full bg-dm-gold-bright/50 animate-gold-particle"
        style={{ animationDelay: '0.8s' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-16 -end-3 w-1.5 h-1.5 rounded-full bg-dm-gold-primary/50 animate-gold-particle"
        style={{ animationDelay: '1.6s' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-3 start-1/3 w-2 h-2 rounded-full bg-dm-gold-muted/60 animate-gold-particle"
        style={{ animationDelay: '2.4s' }}
        aria-hidden="true"
      />

      {/* ---- Gold border frame with corner accents ---- */}
      <div className="relative border-2 border-dm-gold-primary/30 p-2">
        {/* Corner: top-left */}
        <span className="absolute -top-[6px] -start-[6px] w-5 h-5" aria-hidden="true">
          <span className="absolute top-0 start-0 w-full h-[2px] bg-dm-gold-primary" />
          <span className="absolute top-0 start-0 h-full w-[2px] bg-dm-gold-primary" />
        </span>
        {/* Corner: top-right */}
        <span className="absolute -top-[6px] -end-[6px] w-5 h-5" aria-hidden="true">
          <span className="absolute top-0 end-0 w-full h-[2px] bg-dm-gold-primary" />
          <span className="absolute top-0 end-0 h-full w-[2px] bg-dm-gold-primary" />
        </span>
        {/* Corner: bottom-left */}
        <span className="absolute -bottom-[6px] -start-[6px] w-5 h-5" aria-hidden="true">
          <span className="absolute bottom-0 start-0 w-full h-[2px] bg-dm-gold-primary" />
          <span className="absolute bottom-0 start-0 h-full w-[2px] bg-dm-gold-primary" />
        </span>
        {/* Corner: bottom-right */}
        <span className="absolute -bottom-[6px] -end-[6px] w-5 h-5" aria-hidden="true">
          <span className="absolute bottom-0 end-0 w-full h-[2px] bg-dm-gold-primary" />
          <span className="absolute bottom-0 end-0 h-full w-[2px] bg-dm-gold-primary" />
        </span>

        {/* Image wrapper with overflow hidden for parallax */}
        <div ref={imgWrapRef} className="relative aspect-[3/4] overflow-hidden bg-dm-black-mid">
          {/* Shimmer placeholder — visible until real image loads */}
          <div
            className={`absolute inset-0 z-10 transition-opacity duration-700 ease-luxury ${
              loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-hidden="true"
          >
            {/* Base dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-dm-black-mid via-dm-black-warm to-dm-black-mid" />
            {/* Animated shimmer sweep */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-gold-shimmer bg-gradient-to-r from-transparent via-dm-gold-primary/10 to-transparent" />
            </div>
            {/* Pulse glow centre */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-dm-gold-primary/5 animate-pulse" />
            </div>
          </div>

          {/* Actual founder image */}
          <Image
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=800&fit=crop"
            alt="Artisan craftsman at work — Die Mart workshop"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={`object-cover transition-opacity duration-700 ease-luxury ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            unoptimized
          />

          {/* Subtle gold vignette overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-dm-black-deep/60 via-transparent to-dm-black-deep/20 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main About Section                                                 */
/* ------------------------------------------------------------------ */

export default function About() {
  const t = useTranslations('about');

  return (
    <section
      id="story"
      className="py-[120px] bg-dm-black-deep"
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section label */}
        <p className="font-dm-sans font-light uppercase tracking-[0.25em] text-dm-gold-muted text-base md:text-lg mb-6">
          {t('label')}
        </p>

        {/* Heading */}
        <h2
          id="about-heading"
          className="font-cormorant font-semibold text-5xl md:text-6xl lg:text-7xl text-dm-gold-primary mb-16 leading-tight"
        >
          {t('heading')}
        </h2>

        {/* Two-column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* =========  LEFT COLUMN: Story Text  ========= */}
          <div className="relative">
            {/* Subtle gold gradient accent line on the left margin */}
            <div
              className="absolute start-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-dm-gold-primary/40 via-dm-gold-primary/20 to-transparent"
              aria-hidden="true"
            />

            <div className="ps-6 md:ps-8 space-y-8 bg-dm-black-deep/40 backdrop-blur-sm rounded-lg p-6 md:p-8">
              <p
                id="about-p1"
                className="font-cormorant text-xl md:text-2xl text-dm-white-warm font-light leading-relaxed"
              >
                {t('p1')}
              </p>

              <p
                id="about-p2"
                className="font-cormorant text-xl md:text-2xl text-dm-white-warm font-light leading-relaxed"
              >
                {t('p2')}
              </p>

              <p
                id="about-p3"
                className="font-cormorant text-xl md:text-2xl text-dm-white-warm font-light leading-relaxed"
              >
                {t('p3')}
              </p>

              {/* Visual separator: centered gold diamond shape */}
              <div className="flex items-center justify-center py-4" aria-hidden="true">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-dm-gold-primary/40" />
                <div className="mx-4 w-3 h-3 rotate-45 border border-dm-gold-primary/60 bg-dm-gold-primary/10" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-dm-gold-primary/40" />
              </div>

              {/* Closing line */}
              <p
                id="about-closing"
                className="font-cormorant text-xl md:text-2xl text-dm-white-warm font-light leading-relaxed"
              >
                {t('closing')}
              </p>
            </div>
          </div>

          {/* =========  RIGHT COLUMN: Founder Image  ========= */}
          <div className="flex flex-col gap-8">
            {/* Image frame */}
            <div id="about-founder-frame">
              <FounderImage />
            </div>

            {/* Caption: Founder name + quote */}
            <div className="text-center space-y-4">
              <p className="font-cormorant-sc text-2xl md:text-3xl tracking-widest text-dm-gold-primary">
                Elyas Nagavadria
              </p>
              <p className="font-dm-sans text-sm uppercase tracking-[0.2em] text-dm-white-ghost">
                Founder
              </p>
              <p className="font-cormorant italic text-xl md:text-2xl text-dm-gold-muted/80 leading-relaxed max-w-md mx-auto pt-3">
                {t('quote')}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

'use client';

import { useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [1, 2, 3, 4, 5, 6] as const;

function padNum(n: number): string {
  return String(n).padStart(2, '0');
}

export default function Process() {
  const t = useTranslations('process');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const sectionRef = useRef<HTMLElement>(null);
  const lineTrackRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineFillRef.current || !stepsContainerRef.current) return;

    const nodeEls = stepsContainerRef.current.querySelectorAll<HTMLElement>('[data-node]');

    const ctx = gsap.context(() => {
      /* Gold line draws as user scrolls */
      gsap.fromTo(
        lineFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: stepsContainerRef.current,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 0.6,
          },
        }
      );

      /* Step nodes pop in with bounce */
      nodeEls.forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0.5 },
          {
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            onComplete: () => {
              gsap.to(node, {
                scale: 1.15,
                duration: 0.3,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1,
              });
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-dm-black-deep py-[120px]"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        {/* Section header */}
        <div className="mb-20 text-center">
          <span className="mb-4 block font-dm-sans text-xs uppercase tracking-widest text-dm-gold-muted">
            {t('label')}
          </span>
          <h2 id="process-heading" className="font-cormorant text-4xl font-semibold text-dm-gold-primary md:text-5xl">
            {t('heading')}
          </h2>
        </div>

        {/* Steps timeline */}
        <div ref={stepsContainerRef} className="relative">
          {/* Background track line - thicker */}
          <div
            ref={lineTrackRef}
            className="absolute top-0 bottom-0 w-1 bg-dm-gold-primary/20
                       start-[21px] md:start-1/2 md:-ms-0.5"
            aria-hidden="true"
          />

          {/* Animated fill line - thicker */}
          <div
            ref={lineFillRef}
            className="absolute top-0 bottom-0 w-1 bg-dm-gold-primary
                       start-[21px] md:start-1/2 md:-ms-0.5 origin-top"
            aria-hidden="true"
            style={{ transform: 'scaleY(0)' }}
          />

          {/* Steps */}
          <div className="flex flex-col gap-16 md:gap-20">
            {STEPS.map((num, i) => (
              <div
                key={num}
                data-step
                className="relative"
              >
                {/* Mobile: node on the left, content beside it */}
                <div className="flex items-start gap-6 md:hidden">
                  {/* Node circle - larger with glow */}
                  <div
                    data-node
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center
                               rounded-full border-2 border-dm-gold-primary bg-dm-black-deep
                               shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                  >
                    <span className="font-cormorant text-lg font-bold text-dm-gold-primary">
                      {num}
                    </span>
                  </div>

                  {/* Content card with background */}
                  <div className="relative flex-1 bg-dm-black-mid/50 rounded-xl p-6">
                    {/* Large faded step counter behind content */}
                    <span
                      className="absolute top-2 end-4 font-cormorant font-bold text-7xl text-dm-gold-primary/[0.07] leading-none select-none pointer-events-none"
                      aria-hidden="true"
                    >
                      {padNum(num)}
                    </span>
                    <h3 className="relative mb-1.5 font-dm-sans text-sm font-medium uppercase tracking-wider text-dm-gold-bright">
                      {t(`step${num}_title` as any)}
                    </h3>
                    <p className="relative font-cormorant text-lg leading-relaxed text-dm-white-warm">
                      {t(`step${num}_desc` as any)}
                    </p>
                  </div>
                </div>

                {/* Connecting dot between steps (mobile) */}
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute -bottom-10 start-[19px] w-2 h-2 rounded-full bg-dm-gold-primary/30 md:hidden"
                    aria-hidden="true"
                  />
                )}

                {/* Desktop: center-line layout */}
                <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-10">
                  {/* Left column */}
                  <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
                    {(isRTL ? (i % 2 === 1) : (i % 2 === 0)) ? (
                      <div className={`relative max-w-md bg-dm-black-mid/50 rounded-xl p-8 ${isRTL ? 'text-start' : 'text-end'}`}>
                        {/* Large faded step counter */}
                        <span
                          className="absolute top-2 end-4 font-cormorant font-bold text-8xl text-dm-gold-primary/[0.07] leading-none select-none pointer-events-none"
                          aria-hidden="true"
                        >
                          {padNum(num)}
                        </span>
                        <h3 className="relative mb-1.5 font-dm-sans text-sm font-medium uppercase tracking-wider text-dm-gold-bright">
                          {t(`step${num}_title` as any)}
                        </h3>
                        <p className="relative font-cormorant text-lg leading-relaxed text-dm-white-warm">
                          {t(`step${num}_desc` as any)}
                        </p>
                      </div>
                    ) : (
                      <div aria-hidden="true" />
                    )}
                  </div>

                  {/* Center node - larger with glow */}
                  <div
                    data-node
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center
                               rounded-full border-2 border-dm-gold-primary bg-dm-black-deep
                               shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                  >
                    <span className="font-cormorant text-lg font-bold text-dm-gold-primary">
                      {num}
                    </span>
                  </div>

                  {/* Right column */}
                  <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
                    {(isRTL ? (i % 2 === 0) : (i % 2 === 1)) ? (
                      <div className={`relative max-w-md bg-dm-black-mid/50 rounded-xl p-8 ${isRTL ? 'text-end' : 'text-start'}`}>
                        {/* Large faded step counter */}
                        <span
                          className="absolute top-2 end-4 font-cormorant font-bold text-8xl text-dm-gold-primary/[0.07] leading-none select-none pointer-events-none"
                          aria-hidden="true"
                        >
                          {padNum(num)}
                        </span>
                        <h3 className="relative mb-1.5 font-dm-sans text-sm font-medium uppercase tracking-wider text-dm-gold-bright">
                          {t(`step${num}_title` as any)}
                        </h3>
                        <p className="relative font-cormorant text-lg leading-relaxed text-dm-white-warm">
                          {t(`step${num}_desc` as any)}
                        </p>
                      </div>
                    ) : (
                      <div aria-hidden="true" />
                    )}
                  </div>
                </div>

                {/* Connecting dot between steps (desktop) */}
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute -bottom-12 start-1/2 -ms-1 w-2 h-2 rounded-full bg-dm-gold-primary/30"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

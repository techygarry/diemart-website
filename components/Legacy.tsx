'use client';

import { useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BEATS = [1, 2, 3, 4, 5, 6] as const;

export default function Legacy() {
  const t = useTranslations('legacy');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const sectionRef = useRef<HTMLElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineFillRef.current || !timelineRef.current) return;

    const dotEls = timelineRef.current.querySelectorAll<HTMLElement>('[data-dot]');

    const ctx = gsap.context(() => {
      /* Gold line scrubs with scroll */
      gsap.fromTo(
        lineFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 0.6,
          },
        }
      );

      /* Timeline dots pop in */
      dotEls.forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 85%',
              toggleActions: 'play none none none',
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
      id="legacy"
      className="relative bg-dm-black-warm py-[120px]"
      aria-labelledby="legacy-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        {/* Section heading */}
        <div className="mb-20 text-center">
          <h2 id="legacy-heading" className="font-cormorant text-4xl font-semibold text-dm-gold-primary md:text-5xl">
            {t('heading')}
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Background track line */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-dm-gold-primary/20
                       start-[7px] md:start-1/2 md:-ms-px"
            aria-hidden="true"
          />

          {/* Animated fill line */}
          <div
            ref={lineFillRef}
            className="absolute top-0 bottom-0 w-[2px] bg-dm-gold-primary
                       start-[7px] md:start-1/2 md:-ms-px origin-top"
            aria-hidden="true"
            style={{ transform: 'scaleY(0)' }}
          />

          {/* Timeline beats */}
          <div className="flex flex-col gap-16 md:gap-24">
            {BEATS.map((num, i) => {
              const isOdd = i % 2 === 0;
              const contentOnLeft = isRTL ? !isOdd : isOdd;

              return (
                <div key={num}>
                  <div
                    data-beat
                    className="relative"
                  >
                    {/* Mobile layout: dot on left, content on right */}
                    <div className="flex items-start gap-6 md:hidden">
                      {/* Gold dot with pulse/glow */}
                      <div
                        data-dot
                        className="relative z-10 mt-2 h-4 w-4 shrink-0 rounded-full bg-dm-gold-primary shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                      >
                        {/* Pulse ring */}
                        <div
                          className="absolute inset-0 rounded-full bg-dm-gold-primary/30 animate-ping"
                          style={{ animationDuration: '3s' }}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Content card with background */}
                      <div className="flex-1 bg-dm-black-mid/30 rounded-xl p-6">
                        {/* Year badge in gold-bordered pill */}
                        <span className="inline-block mb-3 font-cormorant text-2xl font-bold text-dm-gold-primary border border-dm-gold-primary/40 rounded-full px-4 py-0.5">
                          {t(`beat${num}_year` as any)}
                        </span>
                        <h3 className="mb-2 font-cormorant text-xl font-semibold text-dm-white-warm">
                          {t(`beat${num}_heading` as any)}
                        </h3>
                        <p className="font-cormorant text-base leading-relaxed text-dm-white-soft">
                          {t(`beat${num}_body` as any)}
                        </p>
                      </div>
                    </div>

                    {/* Desktop layout: alternating left/right */}
                    <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-10">
                      {/* Left column */}
                      <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
                        {contentOnLeft ? (
                          <div className={`max-w-md bg-dm-black-mid/30 rounded-xl p-8 ${isRTL ? 'text-start' : 'text-end'}`}>
                            {/* Year badge in gold-bordered pill */}
                            <span className="inline-block mb-3 font-cormorant text-2xl font-bold text-dm-gold-primary border border-dm-gold-primary/40 rounded-full px-5 py-0.5">
                              {t(`beat${num}_year` as any)}
                            </span>
                            <h3 className="mb-2 font-cormorant text-xl font-semibold text-dm-white-warm">
                              {t(`beat${num}_heading` as any)}
                            </h3>
                            <p className="font-cormorant text-base leading-relaxed text-dm-white-soft">
                              {t(`beat${num}_body` as any)}
                            </p>
                          </div>
                        ) : (
                          <div aria-hidden="true" />
                        )}
                      </div>

                      {/* Center dot with pulse/glow */}
                      <div className="flex items-start justify-center pt-2">
                        <div
                          data-dot
                          className="relative z-10 h-4 w-4 shrink-0 rounded-full bg-dm-gold-primary shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                        >
                          {/* Pulse ring */}
                          <div
                            className="absolute inset-0 rounded-full bg-dm-gold-primary/30 animate-ping"
                            style={{ animationDuration: '3s' }}
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      {/* Right column */}
                      <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
                        {!contentOnLeft ? (
                          <div className={`max-w-md bg-dm-black-mid/30 rounded-xl p-8 ${isRTL ? 'text-end' : 'text-start'}`}>
                            {/* Year badge in gold-bordered pill */}
                            <span className="inline-block mb-3 font-cormorant text-2xl font-bold text-dm-gold-primary border border-dm-gold-primary/40 rounded-full px-5 py-0.5">
                              {t(`beat${num}_year` as any)}
                            </span>
                            <h3 className="mb-2 font-cormorant text-xl font-semibold text-dm-white-warm">
                              {t(`beat${num}_heading` as any)}
                            </h3>
                            <p className="font-cormorant text-base leading-relaxed text-dm-white-soft">
                              {t(`beat${num}_body` as any)}
                            </p>
                          </div>
                        ) : (
                          <div aria-hidden="true" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Gold decorative element between beats */}
                  {i < BEATS.length - 1 && (
                    <div className="flex items-center justify-center my-4 md:my-0 md:mt-6" aria-hidden="true">
                      <div className="hidden md:flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-dm-gold-primary/30" />
                        <div className="w-1.5 h-1.5 rounded-full bg-dm-gold-primary/20" />
                        <div className="w-1 h-1 rounded-full bg-dm-gold-primary/30" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing quote - much more prominent */}
        <div
          className="mx-auto mt-24 max-w-2xl text-center"
        >
          {/* Gold decorative line above */}
          <div className="flex items-center justify-center mb-8" aria-hidden="true">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-dm-gold-primary/50" />
            <div className="mx-3 w-2 h-2 rotate-45 border border-dm-gold-primary/50" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-dm-gold-primary/50" />
          </div>

          <p className="font-cormorant text-2xl md:text-3xl italic text-dm-gold-muted leading-relaxed">
            {t('closing_quote')}
          </p>

          {/* Gold decorative line below */}
          <div className="flex items-center justify-center mt-8" aria-hidden="true">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-dm-gold-primary/50" />
            <div className="mx-3 w-2 h-2 rotate-45 border border-dm-gold-primary/50" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-dm-gold-primary/50" />
          </div>
        </div>
      </div>
    </section>
  );
}

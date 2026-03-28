'use client';

import { useTranslations } from 'next-intl';
import GeometricPattern from '@/components/GeometricPattern';

const WHATSAPP_LINK =
  'https://wa.me/917499749770?text=' +
  encodeURIComponent(
    "Hi Die Mart, I found you on diemart.co.in and I'm interested in your catalog."
  );

const WHATSAPP_CALL_LINK = 'https://wa.me/917499749770';

const DIE_TYPES: Array<'hexagon' | 'circle' | 'square' | 'diamond' | 'triangle' | 'star'> = [
  'hexagon',
  'circle',
  'square',
  'diamond',
  'triangle',
  'star',
];

export default function CatalogTeaser() {
  const t = useTranslations('catalog');

  return (
    <section id="catalog" className="relative py-[120px] bg-dm-black-warm overflow-hidden" aria-labelledby="catalog-heading">
      {/* Subtle background noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Split layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side: Text content */}
          <div>
            {/* Section label */}
            <span className="font-dm-sans uppercase tracking-widest text-dm-gold-muted text-sm block mb-4">
              {t('label')}
            </span>

            {/* Heading */}
            <h2 id="catalog-heading" className="font-cormorant font-semibold text-4xl md:text-5xl text-dm-gold-primary mb-6">
              {t('heading')}
            </h2>

            {/* Body text */}
            <p className="font-cormorant text-dm-white-soft text-lg md:text-xl leading-relaxed mb-10">
              {t('body')}
            </p>

            {/* Specialist callout with gold left border */}
            <div className="border-s-2 border-dm-gold-primary border border-dm-gold-primary/20 rounded-lg ps-6 pe-8 py-6 mb-12 bg-dm-black-mid/30">
              <p className="font-cormorant italic text-dm-gold-muted text-lg">
                {t('specialist')}
              </p>
            </div>

            {/* CTA Button - larger and more prominent */}
            <div className="flex flex-col items-start gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-3
                  bg-dm-gold-primary text-dm-black-deep
                  font-dm-sans font-semibold
                  px-10 py-5 text-lg
                  rounded
                  hover:bg-dm-gold-bright
                  transition-all duration-[var(--duration-hover)]
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dm-gold-primary
                "
              >
                {t('cta')}
                {/* Arrow icon */}
                <svg
                  className="w-5 h-5 rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              {/* Secondary WhatsApp link */}
              <a
                href={WHATSAPP_CALL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="font-dm-sans text-sm text-dm-gold-muted hover:text-dm-gold-primary transition-colors duration-300 inline-flex items-center gap-1.5"
              >
                Or call us on WhatsApp
                <svg
                  className="w-4 h-4 rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right side: Decorative geometric grid */}
          <div className="hidden lg:flex items-center justify-center" aria-hidden="true">
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] scale-150" />

              {/* 3x2 grid of die type shapes */}
              <div className="relative grid grid-cols-3 gap-8">
                {DIE_TYPES.map((type, idx) => (
                  <div
                    key={type}
                    className="group flex items-center justify-center w-28 h-28 border border-dm-gold-primary/10 rounded-lg bg-dm-black-mid/20 hover:bg-dm-black-mid/40 transition-all duration-500"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <GeometricPattern pattern={type} />
                  </div>
                ))}
              </div>

              {/* Decorative corner accents */}
              <div className="absolute -top-4 -start-4 w-8 h-8" aria-hidden="true">
                <div className="absolute top-0 start-0 w-full h-[1px] bg-dm-gold-primary/30" />
                <div className="absolute top-0 start-0 h-full w-[1px] bg-dm-gold-primary/30" />
              </div>
              <div className="absolute -bottom-4 -end-4 w-8 h-8" aria-hidden="true">
                <div className="absolute bottom-0 end-0 w-full h-[1px] bg-dm-gold-primary/30" />
                <div className="absolute bottom-0 end-0 h-full w-[1px] bg-dm-gold-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useTranslations } from 'next-intl';

export default function TrustBar() {
  const t = useTranslations('trust');

  const items = [
    t('designs'),
    t('dies'),
    t('karigars'),
    t('factories'),
    t('operations'),
    t('est'),
    t('craft_since'),
    t('india'),
    t('middle_east'),
    t('europe'),
  ];

  return (
    <section
      id="trust-bar"
      className="relative overflow-hidden bg-dm-black-warm border-t border-b border-dm-gold-primary/20 py-6"
      aria-label="Company statistics"
    >
      {/* Subtle gold gradient glow behind text */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div
        className="group relative flex w-max animate-trust-scroll hover:[animation-play-state:paused]"
        style={{
          animationDirection: 'var(--trust-scroll-direction, normal)' as string,
        }}
      >
        {/* Duplicate content for seamless infinite scroll */}
        {[0, 1].map((i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap px-4"
            aria-hidden={i === 1}
          >
            {items.map((item, idx) => (
              <span key={idx} className="flex items-center">
                <span className="font-dm-sans font-light text-dm-gold-primary text-sm uppercase tracking-[0.25em]">
                  {item}
                </span>
                {/* Gold dot separator */}
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-dm-gold-primary/50 mx-5 shrink-0"
                  aria-hidden="true"
                />
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  );
}

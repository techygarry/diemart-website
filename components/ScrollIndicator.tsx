'use client';

import { useTranslations } from 'next-intl';

export default function ScrollIndicator() {
  const t = useTranslations('hero');

  return (
    <div className="hero-scroll-indicator flex flex-col items-center gap-3">
      {/* Animated gold chevron */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="animate-chevron-bounce"
        aria-hidden="true"
      >
        <path
          d="M6 9L12 15L18 9"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="font-dm-sans font-light text-dm-white-ghost text-xs uppercase tracking-widest">
        {t('scroll')}
      </span>
    </div>
  );
}

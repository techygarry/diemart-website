'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

/* ------------------------------------------------------------------ */
/*  SVG Icons                                                         */
/* ------------------------------------------------------------------ */

function WirecutIcon({ className }: { className?: string }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Machine frame */}
      <rect x="10" y="14" width="60" height="52" rx="3" stroke="#D4AF37" strokeWidth="1.5" />
      <rect x="14" y="18" width="52" height="44" rx="1.5" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />

      {/* Upper spool */}
      <circle cx="40" cy="10" r="4" stroke="#D4AF37" strokeWidth="1.5" />
      <line x1="40" y1="14" x2="40" y2="28" stroke="#D4AF37" strokeWidth="1" />

      {/* Lower spool */}
      <circle cx="40" cy="70" r="4" stroke="#D4AF37" strokeWidth="1.5" />
      <line x1="40" y1="52" x2="40" y2="66" stroke="#D4AF37" strokeWidth="1" />

      {/* Wire (vertical cutting wire) */}
      <line x1="40" y1="28" x2="40" y2="52" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" />

      {/* Metal workpiece being cut */}
      <rect x="24" y="34" width="32" height="12" rx="1" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
      {/* Cut kerf line */}
      <line x1="40" y1="34" x2="40" y2="46" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="1.5 1" opacity="0.6" />

      {/* Spark effects around cut point */}
      <g className="service-icon-sparks" opacity="0.9">
        <line x1="40" y1="38" x2="34" y2="32" stroke="#F0CC55" strokeWidth="1" strokeLinecap="round" />
        <line x1="40" y1="38" x2="46" y2="32" stroke="#F0CC55" strokeWidth="1" strokeLinecap="round" />
        <line x1="40" y1="42" x2="33" y2="47" stroke="#F0CC55" strokeWidth="1" strokeLinecap="round" />
        <line x1="40" y1="42" x2="47" y2="47" stroke="#F0CC55" strokeWidth="1" strokeLinecap="round" />
        <circle cx="35" cy="33" r="1" fill="#F0CC55" opacity="0.7" />
        <circle cx="45" cy="33" r="1" fill="#F0CC55" opacity="0.7" />
        <circle cx="34" cy="46" r="0.8" fill="#F0CC55" opacity="0.5" />
        <circle cx="46" cy="46" r="0.8" fill="#F0CC55" opacity="0.5" />
      </g>

      {/* Guide rails */}
      <line x1="18" y1="22" x2="18" y2="58" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
      <line x1="62" y1="22" x2="62" y2="58" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />

      {/* Control knobs */}
      <circle cx="22" cy="22" r="2" stroke="#D4AF37" strokeWidth="1" />
      <circle cx="58" cy="22" r="2" stroke="#D4AF37" strokeWidth="1" />
    </svg>
  );
}

function EmbossingIcon({ className }: { className?: string }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Hammer handle */}
      <line x1="18" y1="12" x2="36" y2="36" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
      {/* Hammer head */}
      <rect x="30" y="30" width="18" height="10" rx="2" stroke="#D4AF37" strokeWidth="1.5" transform="rotate(-30 39 35)" />
      {/* Hammer face detail */}
      <line x1="40" y1="38" x2="44" y2="42" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />

      {/* Chisel tool */}
      <line x1="60" y1="16" x2="48" y2="42" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
      {/* Chisel tip */}
      <path d="M46 40 L48 46 L50 40" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Metal surface / die plate */}
      <rect x="12" y="52" width="56" height="10" rx="1.5" stroke="#D4AF37" strokeWidth="1.5" />

      {/* Embossed pattern on surface */}
      <g opacity="0.8">
        {/* Diamond pattern */}
        <path d="M24 57 L28 54 L32 57 L28 60 Z" stroke="#F0CC55" strokeWidth="1" fill="none" />
        <path d="M36 57 L40 54 L44 57 L40 60 Z" stroke="#F0CC55" strokeWidth="1" fill="none" />
        <path d="M48 57 L52 54 L56 57 L52 60 Z" stroke="#F0CC55" strokeWidth="1" fill="none" />
        {/* Center dots in diamonds */}
        <circle cx="28" cy="57" r="0.8" fill="#F0CC55" />
        <circle cx="40" cy="57" r="0.8" fill="#F0CC55" />
        <circle cx="52" cy="57" r="0.8" fill="#F0CC55" />
      </g>

      {/* Impact lines from chisel to surface */}
      <g className="service-icon-impact" opacity="0.6">
        <line x1="40" y1="46" x2="40" y2="50" stroke="#F0CC55" strokeWidth="1" strokeLinecap="round" />
        <line x1="36" y1="48" x2="34" y2="51" stroke="#F0CC55" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="44" y1="48" x2="46" y2="51" stroke="#F0CC55" strokeWidth="0.8" strokeLinecap="round" />
      </g>

      {/* Material base */}
      <line x1="8" y1="66" x2="72" y2="66" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
      <line x1="12" y1="69" x2="68" y2="69" stroke="#D4AF37" strokeWidth="0.8" opacity="0.15" />
    </svg>
  );
}

function QualityIcon({ className }: { className?: string }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Magnifying glass */}
      <circle cx="34" cy="34" r="16" stroke="#D4AF37" strokeWidth="1.8" />
      <circle cx="34" cy="34" r="12" stroke="#D4AF37" strokeWidth="0.8" opacity="0.3" />
      {/* Handle */}
      <line x1="46" y1="46" x2="60" y2="60" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
      {/* Grip rings */}
      <line x1="50" y1="52" x2="52" y2="50" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
      <line x1="53" y1="55" x2="55" y2="53" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />

      {/* Checkmark inside magnifying glass */}
      <path
        d="M26 34 L32 40 L43 27"
        stroke="#F0CC55"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Caliper measuring lines (bottom-left area) */}
      <g opacity="0.7">
        {/* Horizontal caliper jaw */}
        <line x1="6" y1="68" x2="38" y2="68" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" />
        {/* Upper jaw */}
        <line x1="10" y1="64" x2="10" y2="72" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
        {/* Lower jaw */}
        <line x1="34" y1="64" x2="34" y2="72" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
        {/* Scale marks */}
        <line x1="16" y1="66" x2="16" y2="70" stroke="#D4AF37" strokeWidth="0.6" opacity="0.4" />
        <line x1="22" y1="66" x2="22" y2="70" stroke="#D4AF37" strokeWidth="0.6" opacity="0.4" />
        <line x1="28" y1="66" x2="28" y2="70" stroke="#D4AF37" strokeWidth="0.6" opacity="0.4" />
      </g>

      {/* Quality seal (top-right) */}
      <g transform="translate(58, 8)">
        <circle cx="8" cy="8" r="8" stroke="#D4AF37" strokeWidth="1.2" />
        {/* Star / quality star inside seal */}
        <path
          d="M8 2 L9.5 6 L14 6.5 L10.5 9.5 L11.5 14 L8 11.5 L4.5 14 L5.5 9.5 L2 6.5 L6.5 6 Z"
          stroke="#F0CC55"
          strokeWidth="0.8"
          fill="none"
          strokeLinejoin="round"
        />
      </g>

      {/* Lens glare */}
      <path d="M26 24 Q30 22 34 24" stroke="#D4AF37" strokeWidth="0.6" opacity="0.3" fill="none" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

interface ServiceCard {
  titleKey: string;
  descKey: string;
  tagKey: string;
  number: string;
  icon: 'wirecut' | 'embossing' | 'quality';
  highlightLabel: string;
  highlightType: 'pulse' | 'dots' | 'check';
  dotCount?: number;
}

const cards: ServiceCard[] = [
  {
    titleKey: 'wirecut_title',
    descKey: 'wirecut_desc',
    tagKey: 'wirecut_tag',
    number: '01',
    icon: 'wirecut',
    highlightLabel: '24/7 Operations',
    highlightType: 'pulse',
  },
  {
    titleKey: 'embossing_title',
    descKey: 'embossing_desc',
    tagKey: 'embossing_tag',
    number: '02',
    icon: 'embossing',
    highlightLabel: '3 Techniques',
    highlightType: 'dots',
    dotCount: 3,
  },
  {
    titleKey: 'quality_title',
    descKey: 'quality_desc',
    tagKey: 'quality_tag',
    number: '03',
    icon: 'quality',
    highlightLabel: '3-Point Protocol',
    highlightType: 'check',
  },
];

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  wirecut: WirecutIcon,
  embossing: EmbossingIcon,
  quality: QualityIcon,
};

/* ------------------------------------------------------------------ */
/*  Highlight badge sub-component                                     */
/* ------------------------------------------------------------------ */

function HighlightBadge({
  label,
  type,
  dotCount,
}: {
  label: string;
  type: 'pulse' | 'dots' | 'check';
  dotCount?: number;
}) {
  return (
    <div className="flex items-center gap-2.5 font-dm-sans text-xs tracking-wider uppercase text-dm-gold-bright/80">
      {type === 'pulse' && (
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
      )}

      {type === 'dots' && (
        <span className="flex items-center gap-1">
          {Array.from({ length: dotCount ?? 3 }).map((_, i) => (
            <span
              key={i}
              className="inline-block h-1.5 w-1.5 rounded-full bg-dm-gold-primary/70"
            />
          ))}
        </span>
      )}

      {type === 'check' && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="text-dm-gold-bright"
          aria-hidden="true"
        >
          <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
          <path d="M4 7 L6 9.5 L10 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}

      <span>{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */

export default function Services() {
  const t = useTranslations('services');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="py-[120px] bg-dm-black-deep relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-dm-gold-primary/[0.02] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] mx-auto px-6">
        {/* Section label */}
        <p className="font-dm-sans font-light uppercase tracking-[0.25em] text-dm-gold-muted text-sm mb-6">
          {t('label')}
        </p>

        {/* Heading */}
        <h2
          id="services-heading"
          className="font-cormorant font-semibold text-4xl md:text-5xl text-dm-gold-primary mb-4 leading-tight"
        >
          {t('heading')}
        </h2>

        {/* Subheading */}
        <p
          id="services-subheading"
          className="font-cormorant text-lg text-dm-white-warm leading-relaxed mb-16 max-w-[700px]"
        >
          {t('subheading')}
        </p>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card, index) => {
            const IconComponent = iconMap[card.icon];
            const isHovered = hoveredIndex === index;

            return (
              <article
                key={card.titleKey}
                className="service-card group relative bg-dm-black-mid border border-dm-black-light rounded-sm overflow-hidden card-hover-lift min-h-[520px]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Gold hover line at top */}
                <div
                  className="absolute top-0 inset-x-0 h-[2px] bg-dm-gold-primary origin-center scale-x-0 transition-transform duration-[0.6s] ease-luxury group-hover:scale-x-100"
                  aria-hidden="true"
                />

                {/* Subtle gradient overlay on hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dm-gold-primary/0 group-hover:to-dm-gold-primary/[0.05] transition-all duration-[0.6s] ease-luxury pointer-events-none"
                  aria-hidden="true"
                />

                {/* Number watermark */}
                <span
                  className="absolute top-4 end-4 font-cormorant font-bold text-8xl text-dm-gold-primary/[0.06] leading-none select-none pointer-events-none transition-colors duration-[0.6s] ease-luxury group-hover:text-dm-gold-primary/[0.1]"
                  aria-hidden="true"
                >
                  {card.number}
                </span>

                {/* Bottom border that draws in on hover (gold line from center outward) */}
                <div
                  className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-dm-gold-primary to-transparent origin-center scale-x-0 transition-transform duration-[0.6s] ease-luxury group-hover:scale-x-100"
                  aria-hidden="true"
                />

                <div className="relative p-10 flex flex-col h-full">
                  {/* Icon with gold glow behind on hover */}
                  <div className="relative flex justify-center mb-8">
                    {/* Glow circle behind icon */}
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      aria-hidden="true"
                    >
                      <div
                        className={`w-24 h-24 rounded-full transition-all duration-[0.6s] ease-luxury ${
                          isHovered
                            ? 'bg-dm-gold-primary/[0.08] shadow-[0_0_40px_rgba(212,175,55,0.12)]'
                            : 'bg-transparent shadow-none'
                        }`}
                      />
                    </div>
                    <div className="service-icon relative transition-transform duration-[0.6s] ease-luxury group-hover:scale-105 group-hover:rotate-[3deg]">
                      <IconComponent />
                    </div>
                  </div>

                  {/* Highlight badge */}
                  <div className="service-highlight mb-5">
                    <HighlightBadge
                      label={card.highlightLabel}
                      type={card.highlightType}
                      dotCount={card.dotCount}
                    />
                  </div>

                  {/* Card title */}
                  <h3 className="font-cormorant font-semibold text-2xl text-dm-gold-primary mb-4 transition-colors duration-[0.6s] ease-luxury group-hover:text-dm-gold-bright">
                    {t(card.titleKey)}
                  </h3>

                  {/* Decorative gold separator line */}
                  <div
                    className="service-separator w-12 h-px bg-dm-gold-primary/40 mb-6 transition-all duration-[0.6s] ease-luxury group-hover:w-20 group-hover:bg-dm-gold-primary/70"
                    aria-hidden="true"
                  />

                  {/* Card description */}
                  <p className="font-cormorant text-dm-white-warm leading-relaxed mb-8 flex-1">
                    {t(card.descKey)}
                  </p>

                  {/* Tag pill */}
                  <span className="inline-block self-start font-dm-sans text-sm text-dm-gold-muted italic border border-dm-gold-primary/20 rounded-full px-4 py-1.5 transition-all duration-[0.6s] ease-luxury group-hover:border-dm-gold-primary/40 group-hover:text-dm-gold-primary">
                    {t(card.tagKey)}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

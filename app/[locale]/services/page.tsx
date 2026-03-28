'use client';

import Navigation from '@/components/Navigation';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CustomCursor from '@/components/CustomCursor';

/* ================================================================== */
/*  SVG Icon Components                                               */
/* ================================================================== */

function RulerIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="6" y="16" width="36" height="16" rx="2" stroke="#D4AF37" strokeWidth="1.5" />
      <line x1="12" y1="16" x2="12" y2="22" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
      <line x1="18" y1="16" x2="18" y2="25" stroke="#D4AF37" strokeWidth="1.2" />
      <line x1="24" y1="16" x2="24" y2="22" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
      <line x1="30" y1="16" x2="30" y2="25" stroke="#D4AF37" strokeWidth="1.2" />
      <line x1="36" y1="16" x2="36" y2="22" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
      {/* Crosshair / precision indicator */}
      <circle cx="24" cy="36" r="4" stroke="#F0CC55" strokeWidth="1" opacity="0.5" />
      <line x1="24" y1="33" x2="24" y2="39" stroke="#F0CC55" strokeWidth="0.8" opacity="0.5" />
      <line x1="21" y1="36" x2="27" y2="36" stroke="#F0CC55" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="18" stroke="#D4AF37" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="15" stroke="#D4AF37" strokeWidth="0.6" opacity="0.3" strokeDasharray="2 2" />
      {/* Hour hand */}
      <line x1="24" y1="24" x2="24" y2="14" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
      {/* Minute hand */}
      <line x1="24" y1="24" x2="32" y2="18" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="24" cy="24" r="2" fill="#D4AF37" />
      {/* Hour markers */}
      <circle cx="24" cy="8" r="1" fill="#F0CC55" opacity="0.6" />
      <circle cx="40" cy="24" r="1" fill="#F0CC55" opacity="0.6" />
      <circle cx="24" cy="40" r="1" fill="#F0CC55" opacity="0.6" />
      <circle cx="8" cy="24" r="1" fill="#F0CC55" opacity="0.6" />
    </svg>
  );
}

function DispatchIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* Truck body */}
      <rect x="4" y="18" width="26" height="16" rx="2" stroke="#D4AF37" strokeWidth="1.5" />
      {/* Truck cab */}
      <path d="M30 22 L38 22 L42 28 L42 34 L30 34 L30 22Z" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Windshield */}
      <line x1="34" y1="22" x2="39" y2="28" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
      {/* Wheels */}
      <circle cx="14" cy="36" r="3.5" stroke="#D4AF37" strokeWidth="1.5" />
      <circle cx="14" cy="36" r="1" fill="#F0CC55" opacity="0.6" />
      <circle cx="36" cy="36" r="3.5" stroke="#D4AF37" strokeWidth="1.5" />
      <circle cx="36" cy="36" r="1" fill="#F0CC55" opacity="0.6" />
      {/* Speed lines */}
      <line x1="1" y1="24" x2="4" y2="24" stroke="#F0CC55" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <line x1="0" y1="28" x2="4" y2="28" stroke="#F0CC55" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <line x1="1" y1="32" x2="3" y2="32" stroke="#F0CC55" strokeWidth="1" opacity="0.2" strokeLinecap="round" />
      {/* Clock on body */}
      <circle cx="17" cy="26" r="4" stroke="#F0CC55" strokeWidth="0.8" opacity="0.5" />
      <line x1="17" y1="26" x2="17" y2="23.5" stroke="#F0CC55" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
      <line x1="17" y1="26" x2="19" y2="27" stroke="#F0CC55" strokeWidth="0.6" opacity="0.5" strokeLinecap="round" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* Outer gear teeth */}
      <path
        d="M24 4 L26.5 10 L33 8 L32 15 L39 16 L35.5 22 L42 26 L36 30 L40 36 L33.5 34.5 L33 42 L27 38 L24 44 L21 38 L15 42 L14.5 34.5 L8 36 L12 30 L6 26 L12.5 22 L9 16 L16 15 L15 8 L21.5 10 Z"
        stroke="#D4AF37"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Inner circle */}
      <circle cx="24" cy="24" r="8" stroke="#D4AF37" strokeWidth="1.5" />
      {/* Center hex */}
      <circle cx="24" cy="24" r="3" fill="none" stroke="#F0CC55" strokeWidth="1.2" />
      {/* Center dot */}
      <circle cx="24" cy="24" r="1.2" fill="#F0CC55" opacity="0.7" />
    </svg>
  );
}

function IndiaIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* Map pin style */}
      <path d="M20 4 C13 4 8 9 8 16 C8 26 20 36 20 36 C20 36 32 26 32 16 C32 9 27 4 20 4Z" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="16" r="5" stroke="#F0CC55" strokeWidth="1.2" fill="none" />
      {/* Chakra-inspired spokes */}
      <line x1="20" y1="12" x2="20" y2="20" stroke="#F0CC55" strokeWidth="0.6" opacity="0.5" />
      <line x1="16" y1="16" x2="24" y2="16" stroke="#F0CC55" strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}

function MiddleEastIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* Crescent moon */}
      <path d="M24 8 C18 10 14 16 14 22 C14 28 18 32 24 34 C18 33 12 28 12 22 C12 14 18 9 24 8Z" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
      {/* Star */}
      <path d="M28 16 L29 19 L32 19 L29.5 21 L30.5 24 L28 22 L25.5 24 L26.5 21 L24 19 L27 19Z" stroke="#F0CC55" strokeWidth="1" fill="none" />
    </svg>
  );
}

function EuropeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* Circle of stars */}
      <circle cx="20" cy="20" r="14" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 20 + 10 * Math.cos(rad - Math.PI / 2);
        const cy = 20 + 10 * Math.sin(rad - Math.PI / 2);
        return (
          <circle key={i} cx={cx} cy={cy} r="1.5" fill="#F0CC55" opacity="0.7" />
        );
      })}
    </svg>
  );
}

function WorldwideIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* Globe */}
      <circle cx="20" cy="20" r="15" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
      {/* Meridians */}
      <ellipse cx="20" cy="20" rx="8" ry="15" stroke="#D4AF37" strokeWidth="0.8" opacity="0.4" fill="none" />
      {/* Equator & tropics */}
      <line x1="5" y1="20" x2="35" y2="20" stroke="#D4AF37" strokeWidth="0.8" opacity="0.4" />
      <line x1="8" y1="13" x2="32" y2="13" stroke="#D4AF37" strokeWidth="0.5" opacity="0.25" />
      <line x1="8" y1="27" x2="32" y2="27" stroke="#D4AF37" strokeWidth="0.5" opacity="0.25" />
      {/* Highlight dot */}
      <circle cx="20" cy="20" r="2" fill="#F0CC55" opacity="0.6" />
    </svg>
  );
}

/* ================================================================== */
/*  Mini Stat Icons                                                   */
/* ================================================================== */

function OperationsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="10" stroke="#D4AF37" strokeWidth="1.2" />
      <line x1="14" y1="14" x2="14" y2="7" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="14" x2="20" y2="14" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" />
      <circle cx="14" cy="14" r="1.5" fill="#F0CC55" />
    </svg>
  );
}

function TechniquesIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="9" cy="18" r="5" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
      <circle cx="19" cy="18" r="5" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
      <circle cx="14" cy="10" r="5" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
      <circle cx="14" cy="15" r="1.5" fill="#F0CC55" opacity="0.7" />
    </svg>
  );
}

function QCIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="20" height="20" rx="2" stroke="#D4AF37" strokeWidth="1.2" />
      <path d="M9 14 L12.5 17.5 L19 10.5" stroke="#F0CC55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ================================================================== */
/*  Section Divider (inline)                                          */
/* ================================================================== */

function GoldDivider() {
  return (
    <div className="flex items-center justify-center py-2" aria-hidden="true">
      <div className="h-px w-24 bg-gradient-to-r from-transparent to-dm-gold-primary/30" />
      <div className="mx-3 w-2.5 h-2.5 rotate-45 border border-dm-gold-primary/40 bg-dm-gold-primary/5" />
      <div className="h-px w-24 bg-gradient-to-l from-transparent to-dm-gold-primary/30" />
    </div>
  );
}

/* ================================================================== */
/*  Main Page                                                         */
/* ================================================================== */

export default function ServicesPage() {

  /* ================================================================ */
  /*  Render                                                          */
  /* ================================================================ */

  return (
    <>
      <Navigation />
      <main className="pt-[72px]">
        {/* ========================================================== */}
        {/*  INTRO SECTION                                             */}
        {/* ========================================================== */}
        <section
          className="relative py-[100px] md:py-[120px] bg-dm-black-deep overflow-hidden"
        >
          {/* Ambient glow */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-dm-gold-primary/[0.025] blur-[100px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
            {/* --- Large Quote --- */}
            <blockquote
              className="max-w-4xl mx-auto text-center mb-20 md:mb-24"
            >
              <div className="flex justify-center mb-6" aria-hidden="true">
                <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
                  <path
                    d="M0 28V17.5C0 12.3 1.1 8.2 3.3 5.2C5.5 2.2 8.8 0.3 13.2 0L14.4 4.8C11.6 5.4 9.5 6.6 8.1 8.4C6.7 10.2 6 12.3 6 14.7H13.2V28H0ZM21.6 28V17.5C21.6 12.3 22.7 8.2 24.9 5.2C27.1 2.2 30.4 0.3 34.8 0L36 4.8C33.2 5.4 31.1 6.6 29.7 8.4C28.3 10.2 27.6 12.3 27.6 14.7H34.8V28H21.6Z"
                    fill="#D4AF37"
                    opacity="0.15"
                  />
                </svg>
              </div>
              <p className="font-cormorant italic text-2xl md:text-3xl lg:text-4xl text-dm-white-warm leading-relaxed">
                We do not merely manufacture dies. We engineer the invisible architecture
                behind every piece of jewellery that leaves a karigar&apos;s hands &mdash;
                precision that the eye cannot see, but the gold always remembers.
              </p>
              <div className="flex items-center justify-center gap-3 mt-8" aria-hidden="true">
                <span className="block h-px w-12 bg-gradient-to-r from-transparent to-dm-gold-primary/50" />
                <span className="block w-1.5 h-1.5 rotate-45 bg-dm-gold-primary/40" />
                <span className="block h-px w-12 bg-gradient-to-l from-transparent to-dm-gold-primary/50" />
              </div>
            </blockquote>

            {/* --- Two-Column: What We Do + Stats --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left: What We Do */}
              <div>
                <p className="fade-child font-dm-sans font-light uppercase tracking-[0.25em] text-dm-gold-muted text-sm mb-5">
                  WHAT WE DO
                </p>
                <h2 className="fade-child font-cormorant font-semibold text-3xl md:text-4xl text-dm-gold-primary mb-6 leading-tight">
                  Three Disciplines Under One Roof
                </h2>
                <div className="fade-child w-16 h-px bg-dm-gold-primary/40 mb-8" aria-hidden="true" />
                <p className="fade-child font-cormorant text-lg text-dm-white-warm leading-relaxed mb-6">
                  Die Mart operates at the intersection of three precision disciplines:
                  CNC wirecut machining, master embossing, and rigorous quality testing.
                  Each die passes through all three before it leaves our factory.
                </p>
                <p className="fade-child font-cormorant text-lg text-dm-white-soft leading-relaxed mb-6">
                  Our 100+ karigars work across 3 factory floors in Chinchani, running
                  machines 24 hours a day, 7 days a week. Every die requires three separate
                  CNC programs &mdash; cutting punch, emboss punch, and cavity &mdash; each
                  machined to micron tolerances and verified before moving to the next stage.
                </p>
                <p className="fade-child font-cormorant text-lg text-dm-white-soft leading-relaxed">
                  From bangle progressive cutting dies to intricate flower patterns
                  and custom bespoke orders &mdash; if it can be stamped in gold,
                  we have built the die for it.
                </p>
              </div>

              {/* Right: Mini Stat Boxes */}
              <div className="grid grid-cols-1 gap-5 lg:pt-12">
                {/* Stat: 24/7 Operations */}
                <div className="stat-box group relative bg-dm-black-mid border border-dm-black-light rounded-sm p-6 flex items-center gap-5 overflow-hidden transition-all duration-[0.5s] ease-luxury hover:border-dm-gold-primary/30">
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-dm-gold-primary/30 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.6s] ease-luxury" aria-hidden="true" />
                  <div className="flex-shrink-0 w-14 h-14 rounded-full border border-dm-gold-primary/20 flex items-center justify-center bg-dm-gold-primary/[0.04] group-hover:bg-dm-gold-primary/[0.08] transition-colors duration-[0.5s]">
                    <OperationsIcon />
                  </div>
                  <div>
                    <p className="font-cormorant font-bold text-2xl text-dm-gold-primary leading-none mb-1">
                      24/7
                    </p>
                    <p className="font-dm-sans text-sm text-dm-white-soft uppercase tracking-wider">
                      Operations
                    </p>
                  </div>
                </div>

                {/* Stat: 3 Techniques */}
                <div className="stat-box group relative bg-dm-black-mid border border-dm-black-light rounded-sm p-6 flex items-center gap-5 overflow-hidden transition-all duration-[0.5s] ease-luxury hover:border-dm-gold-primary/30">
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-dm-gold-primary/30 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.6s] ease-luxury" aria-hidden="true" />
                  <div className="flex-shrink-0 w-14 h-14 rounded-full border border-dm-gold-primary/20 flex items-center justify-center bg-dm-gold-primary/[0.04] group-hover:bg-dm-gold-primary/[0.08] transition-colors duration-[0.5s]">
                    <TechniquesIcon />
                  </div>
                  <div>
                    <p className="font-cormorant font-bold text-2xl text-dm-gold-primary leading-none mb-1">
                      3 Techniques
                    </p>
                    <p className="font-dm-sans text-sm text-dm-white-soft uppercase tracking-wider">
                      Hand &middot; Machine &middot; Laser
                    </p>
                  </div>
                </div>

                {/* Stat: 3-Point QC */}
                <div className="stat-box group relative bg-dm-black-mid border border-dm-black-light rounded-sm p-6 flex items-center gap-5 overflow-hidden transition-all duration-[0.5s] ease-luxury hover:border-dm-gold-primary/30">
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-dm-gold-primary/30 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.6s] ease-luxury" aria-hidden="true" />
                  <div className="flex-shrink-0 w-14 h-14 rounded-full border border-dm-gold-primary/20 flex items-center justify-center bg-dm-gold-primary/[0.04] group-hover:bg-dm-gold-primary/[0.08] transition-colors duration-[0.5s]">
                    <QCIcon />
                  </div>
                  <div>
                    <p className="font-cormorant font-bold text-2xl text-dm-gold-primary leading-none mb-1">
                      3-Point QC
                    </p>
                    <p className="font-dm-sans text-sm text-dm-white-soft uppercase tracking-wider">
                      Chaap &middot; Pisur &middot; Faat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GoldDivider />

        {/* ========================================================== */}
        {/*  SERVICES COMPONENT (the enhanced one)                     */}
        {/* ========================================================== */}
        <Services />

        <GoldDivider />

        {/* ========================================================== */}
        {/*  WHY CHOOSE US                                             */}
        {/* ========================================================== */}
        <section
          className="relative py-[100px] md:py-[120px] bg-dm-black-warm overflow-hidden"
        >
          {/* Background texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,175,55,0.03) 0%, transparent 70%)',
            }}
          />

          <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
            {/* Section header */}
            <div className="text-center mb-16">
              <p className="font-dm-sans font-light uppercase tracking-[0.25em] text-dm-gold-muted text-sm mb-5">
                THE DIE MART DIFFERENCE
              </p>
              <h2 className="why-heading font-cormorant font-semibold text-4xl md:text-5xl text-dm-gold-primary mb-4 leading-tight">
                Why Choose Us
              </h2>
              <p className="why-sub font-cormorant italic text-lg text-dm-white-soft max-w-2xl mx-auto">
                Four decades of relentless focus on one craft &mdash; jewellery die manufacturing.
                No diversification. No distractions. Only precision.
              </p>
              <div className="flex items-center justify-center gap-3 mt-8" aria-hidden="true">
                <span className="block h-px w-16 bg-gradient-to-r from-transparent to-dm-gold-primary/40" />
                <span className="block w-2 h-2 rotate-45 border border-dm-gold-primary/30" />
                <span className="block h-px w-16 bg-gradient-to-l from-transparent to-dm-gold-primary/40" />
              </div>
            </div>

            {/* 2x2 Feature Cards Grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {/* Card 1: Precision Engineering */}
              <article className="why-card group relative bg-dm-black-mid border border-dm-black-light rounded-sm overflow-hidden transition-all duration-[0.6s] ease-luxury hover:border-dm-gold-primary/30">
                {/* Gold top line on hover */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-dm-gold-primary origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.6s] ease-luxury" aria-hidden="true" />
                {/* Left gold accent bar */}
                <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-dm-gold-primary/60 via-dm-gold-primary/20 to-transparent" aria-hidden="true" />
                <div className="p-8 ps-10">
                  <div className="mb-5 transition-transform duration-[0.5s] ease-luxury group-hover:scale-105">
                    <RulerIcon />
                  </div>
                  <h3 className="font-cormorant font-semibold text-xl text-dm-gold-primary mb-3 transition-colors duration-[0.5s] group-hover:text-dm-gold-bright">
                    Precision Engineering
                  </h3>
                  <div className="w-10 h-px bg-dm-gold-primary/30 mb-4 transition-all duration-[0.5s] group-hover:w-16 group-hover:bg-dm-gold-primary/60" aria-hidden="true" />
                  <p className="font-cormorant text-dm-white-soft leading-relaxed">
                    Every die is machined to micron-level tolerance using CNC wirecut technology.
                    Three separate programs &mdash; cutting punch, emboss punch, cavity &mdash;
                    each verified independently before assembly.
                  </p>
                </div>
              </article>

              {/* Card 2: 40+ Years Experience */}
              <article className="why-card group relative bg-dm-black-mid border border-dm-black-light rounded-sm overflow-hidden transition-all duration-[0.6s] ease-luxury hover:border-dm-gold-primary/30">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-dm-gold-primary origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.6s] ease-luxury" aria-hidden="true" />
                <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-dm-gold-primary/60 via-dm-gold-primary/20 to-transparent" aria-hidden="true" />
                <div className="p-8 ps-10">
                  <div className="mb-5 transition-transform duration-[0.5s] ease-luxury group-hover:scale-105">
                    <ClockIcon />
                  </div>
                  <h3 className="font-cormorant font-semibold text-xl text-dm-gold-primary mb-3 transition-colors duration-[0.5s] group-hover:text-dm-gold-bright">
                    40+ Years Experience
                  </h3>
                  <div className="w-10 h-px bg-dm-gold-primary/30 mb-4 transition-all duration-[0.5s] group-hover:w-16 group-hover:bg-dm-gold-primary/60" aria-hidden="true" />
                  <p className="font-cormorant text-dm-white-soft leading-relaxed">
                    From Elyas Nagavadria&apos;s first workshop in 1980 to three factories today.
                    Decades of accumulated knowledge in die metallurgy, pattern design, and
                    production engineering &mdash; passed from master to master.
                  </p>
                </div>
              </article>

              {/* Card 3: On-Time Delivery */}
              <article className="why-card group relative bg-dm-black-mid border border-dm-black-light rounded-sm overflow-hidden transition-all duration-[0.6s] ease-luxury hover:border-dm-gold-primary/30">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-dm-gold-primary origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.6s] ease-luxury" aria-hidden="true" />
                <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-dm-gold-primary/60 via-dm-gold-primary/20 to-transparent" aria-hidden="true" />
                <div className="p-8 ps-10">
                  <div className="mb-5 transition-transform duration-[0.5s] ease-luxury group-hover:scale-105">
                    <DispatchIcon />
                  </div>
                  <h3 className="font-cormorant font-semibold text-xl text-dm-gold-primary mb-3 transition-colors duration-[0.5s] group-hover:text-dm-gold-bright">
                    On-Time Delivery
                  </h3>
                  <div className="w-10 h-px bg-dm-gold-primary/30 mb-4 transition-all duration-[0.5s] group-hover:w-16 group-hover:bg-dm-gold-primary/60" aria-hidden="true" />
                  <p className="font-cormorant text-dm-white-soft leading-relaxed">
                    24/7 factory operations mean your order never waits. WhatsApp tracking
                    at every stage &mdash; order confirmed, material received, machining complete,
                    tested and dispatched. You always know where your die is.
                  </p>
                </div>
              </article>

              {/* Card 4: Custom Solutions */}
              <article className="why-card group relative bg-dm-black-mid border border-dm-black-light rounded-sm overflow-hidden transition-all duration-[0.6s] ease-luxury hover:border-dm-gold-primary/30">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-dm-gold-primary origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.6s] ease-luxury" aria-hidden="true" />
                <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-dm-gold-primary/60 via-dm-gold-primary/20 to-transparent" aria-hidden="true" />
                <div className="p-8 ps-10">
                  <div className="mb-5 transition-transform duration-[0.5s] ease-luxury group-hover:scale-105">
                    <GearIcon />
                  </div>
                  <h3 className="font-cormorant font-semibold text-xl text-dm-gold-primary mb-3 transition-colors duration-[0.5s] group-hover:text-dm-gold-bright">
                    Custom Solutions
                  </h3>
                  <div className="w-10 h-px bg-dm-gold-primary/30 mb-4 transition-all duration-[0.5s] group-hover:w-16 group-hover:bg-dm-gold-primary/60" aria-hidden="true" />
                  <p className="font-cormorant text-dm-white-soft leading-relaxed">
                    Bring any design &mdash; a sketch, a photo, a reference piece. Our team
                    will engineer the die to exact specifications. 3,600+ designs in archive
                    and growing. If it does not exist, we create it.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <GoldDivider />

        {/* ========================================================== */}
        {/*  PROCESS COMPONENT                                         */}
        {/* ========================================================== */}
        <Process />

        <GoldDivider />

        {/* ========================================================== */}
        {/*  CLIENTS TRUST US — Social Proof                           */}
        {/* ========================================================== */}
        <section
          className="relative py-[100px] md:py-[140px] bg-dm-black-deep overflow-hidden"
        >
          {/* Deep radial glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-dm-gold-primary/[0.03] blur-[120px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Decorative corner brackets */}
          <div className="absolute inset-8 md:inset-16 pointer-events-none" aria-hidden="true">
            <span className="absolute top-0 left-0 w-10 h-10 border-t border-l border-dm-gold-primary/15" />
            <span className="absolute top-0 right-0 w-10 h-10 border-t border-r border-dm-gold-primary/15" />
            <span className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-dm-gold-primary/15" />
            <span className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-dm-gold-primary/15" />
          </div>

          <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 text-center">
            {/* Section label */}
            <p className="font-dm-sans font-light uppercase tracking-[0.25em] text-dm-gold-muted text-sm mb-8">
              CLIENTS TRUST US
            </p>

            {/* Big animated heading */}
            <div className="mb-6">
              <h2 className="font-cormorant-sc font-bold text-5xl md:text-7xl lg:text-8xl text-dm-gold-primary leading-none">
                10 Lakh+
              </h2>
              <p className="font-cormorant font-semibold text-2xl md:text-3xl text-dm-white-warm mt-3">
                Dies Delivered
              </p>
            </div>

            {/* Supporting text */}
            <p className="font-cormorant italic text-lg text-dm-white-soft max-w-2xl mx-auto mb-4">
              From Chinchani to the world &mdash; trusted by jewellers, manufacturers,
              and master karigars across four continents.
            </p>

            {/* Gold line separator */}
            <div className="flex items-center justify-center gap-3 mb-16" aria-hidden="true">
              <span className="block h-px w-20 bg-gradient-to-r from-transparent to-dm-gold-primary/40" />
              <span className="block w-2 h-2 rotate-45 border border-dm-gold-primary/30" />
              <span className="block h-px w-20 bg-gradient-to-l from-transparent to-dm-gold-primary/40" />
            </div>

            {/* Market Icons Row */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-3xl mx-auto"
            >
              {/* India */}
              <div className="market-item flex flex-col items-center gap-3 group">
                <div className="w-20 h-20 rounded-full border border-dm-gold-primary/20 flex items-center justify-center bg-dm-gold-primary/[0.03] transition-all duration-[0.5s] ease-luxury group-hover:border-dm-gold-primary/40 group-hover:bg-dm-gold-primary/[0.07] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                  <IndiaIcon />
                </div>
                <p className="font-dm-sans text-sm text-dm-white-soft uppercase tracking-wider">
                  India
                </p>
              </div>

              {/* Middle East */}
              <div className="market-item flex flex-col items-center gap-3 group">
                <div className="w-20 h-20 rounded-full border border-dm-gold-primary/20 flex items-center justify-center bg-dm-gold-primary/[0.03] transition-all duration-[0.5s] ease-luxury group-hover:border-dm-gold-primary/40 group-hover:bg-dm-gold-primary/[0.07] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                  <MiddleEastIcon />
                </div>
                <p className="font-dm-sans text-sm text-dm-white-soft uppercase tracking-wider">
                  Middle East
                </p>
              </div>

              {/* Europe */}
              <div className="market-item flex flex-col items-center gap-3 group">
                <div className="w-20 h-20 rounded-full border border-dm-gold-primary/20 flex items-center justify-center bg-dm-gold-primary/[0.03] transition-all duration-[0.5s] ease-luxury group-hover:border-dm-gold-primary/40 group-hover:bg-dm-gold-primary/[0.07] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                  <EuropeIcon />
                </div>
                <p className="font-dm-sans text-sm text-dm-white-soft uppercase tracking-wider">
                  Europe
                </p>
              </div>

              {/* Worldwide */}
              <div className="market-item flex flex-col items-center gap-3 group">
                <div className="w-20 h-20 rounded-full border border-dm-gold-primary/20 flex items-center justify-center bg-dm-gold-primary/[0.03] transition-all duration-[0.5s] ease-luxury group-hover:border-dm-gold-primary/40 group-hover:bg-dm-gold-primary/[0.07] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                  <WorldwideIcon />
                </div>
                <p className="font-dm-sans text-sm text-dm-white-soft uppercase tracking-wider">
                  Worldwide
                </p>
              </div>
            </div>
          </div>
        </section>

        <GoldDivider />

        {/* ========================================================== */}
        {/*  CTA                                                       */}
        {/* ========================================================== */}
      </main>
      <Footer />
      <WhatsAppFloat />
      <CustomCursor />
    </>
  );
}

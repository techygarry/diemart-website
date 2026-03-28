'use client';

import Navigation from '@/components/Navigation';
import Products from '@/components/Products';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CustomCursor from '@/components/CustomCursor';

/* ================================================================== */
/*  Inline SVG Icons                                                   */
/* ================================================================== */

function CNCIcon({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* CNC wirecut machine silhouette */}
      <rect x="4" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <line x1="8" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 1.5" />
      <line x1="14" y1="4" x2="14" y2="18" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 1.5" />
      <circle cx="14" cy="11" r="2.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="14" cy="11" r="0.8" fill="currentColor" />
      <rect x="6" y="20" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1" />
      <line x1="10" y1="22" x2="18" y2="22" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

function ChiselIcon({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Chisel / embossing tool */}
      <path d="M8 4L14 2L20 4L18 16H10L8 4Z" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <line x1="10" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="0.6" />
      <line x1="10.5" y1="12" x2="17.5" y2="12" stroke="currentColor" strokeWidth="0.6" />
      <rect x="9" y="16" width="10" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" />
      <path d="M10 19L8 26" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M18 19L20 26" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="7" y1="26" x2="21" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Shield with checkmark */}
      <path
        d="M14 2L4 7V14C4 20.1 8.3 25.6 14 27C19.7 25.6 24 20.1 24 14V7L14 2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="none"
      />
      <path
        d="M9.5 14L12.5 17L18.5 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MaterialIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Steel block / ingot */}
      <path d="M4 22L8 26H24L28 22V10L24 6H8L4 10V22Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4 10L16 14L28 10" stroke="currentColor" strokeWidth="0.8" />
      <path d="M16 14V26" stroke="currentColor" strokeWidth="0.8" />
      <path d="M8 6L16 10" stroke="currentColor" strokeWidth="0.6" />
      <path d="M24 6L16 10" stroke="currentColor" strokeWidth="0.6" />
      {/* Cross-hatch for steel texture */}
      <line x1="9" y1="17" x2="13" y2="21" stroke="currentColor" strokeWidth="0.4" />
      <line x1="11" y1="16" x2="15" y2="20" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  );
}

function ToleranceIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Micrometer / precision gauge */}
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
      <circle cx="16" cy="16" r="2" fill="currentColor" />
      {/* Crosshairs */}
      <line x1="16" y1="4" x2="16" y2="10" stroke="currentColor" strokeWidth="0.8" />
      <line x1="16" y1="22" x2="16" y2="28" stroke="currentColor" strokeWidth="0.8" />
      <line x1="4" y1="16" x2="10" y2="16" stroke="currentColor" strokeWidth="0.8" />
      <line x1="22" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="0.8" />
      {/* Tick marks */}
      <line x1="16" y1="4" x2="16" y2="6" stroke="currentColor" strokeWidth="1.2" />
      <line x1="28" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function TurnaroundIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Clock / turnaround */}
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
      {/* Hour hand */}
      <line x1="16" y1="16" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Minute hand */}
      <line x1="16" y1="16" x2="22" y2="13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      {/* Hour markers */}
      <line x1="16" y1="3" x2="16" y2="5" stroke="currentColor" strokeWidth="1" />
      <line x1="29" y1="16" x2="27" y2="16" stroke="currentColor" strokeWidth="1" />
      <line x1="16" y1="29" x2="16" y2="27" stroke="currentColor" strokeWidth="1" />
      <line x1="3" y1="16" x2="5" y2="16" stroke="currentColor" strokeWidth="1" />
      {/* Speed arc */}
      <path d="M24 6A13 13 0 0 1 28 12" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
    </svg>
  );
}

function CustomDieIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Gear + pencil — custom work */}
      <circle cx="14" cy="16" r="8" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="14" cy="16" r="3" stroke="currentColor" strokeWidth="0.8" />
      {/* Gear teeth */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <rect
          key={angle}
          x="13"
          y="5"
          width="2"
          height="4"
          rx="0.5"
          stroke="currentColor"
          strokeWidth="0.7"
          transform={`rotate(${angle} 14 16)`}
        />
      ))}
      {/* Pencil overlay */}
      <line x1="23" y1="5" x2="27" y2="9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M22 6L26 10L24 12L20 8Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <path d="M20 8L19 11" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Chat bubble */}
      <path
        d="M6 8C6 6.9 6.9 6 8 6H28C29.1 6 30 6.9 30 8V22C30 23.1 29.1 24 28 24H14L8 30V24H8C6.9 24 6 23.1 6 22V8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Message lines */}
      <line x1="11" y1="12" x2="25" y2="12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="11" y1="16" x2="21" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="11" y1="20" x2="17" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function FactoryIcon({ className }: { className?: string }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Factory building */}
      <rect x="4" y="16" width="10" height="16" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="10" width="18" height="22" stroke="currentColor" strokeWidth="1.5" />
      {/* Chimney */}
      <rect x="6" y="8" width="4" height="8" stroke="currentColor" strokeWidth="1" />
      {/* Smoke */}
      <path d="M8 8C8 6 6 5 6 3" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M8 8C8 5 10 4 10 2" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      {/* Windows */}
      <rect x="18" y="14" width="4" height="4" stroke="currentColor" strokeWidth="0.8" />
      <rect x="24" y="14" width="4" height="4" stroke="currentColor" strokeWidth="0.8" />
      <rect x="18" y="22" width="4" height="4" stroke="currentColor" strokeWidth="0.8" />
      <rect x="24" y="22" width="4" height="4" stroke="currentColor" strokeWidth="0.8" />
      {/* Door */}
      <rect x="7" y="26" width="4" height="6" rx="2" stroke="currentColor" strokeWidth="0.8" />
      {/* Gear accent */}
      <circle cx="21" cy="16" r="1" fill="currentColor" />
      <circle cx="27" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

function PackageIcon({ className }: { className?: string }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* 3D Package / box */}
      <path d="M18 4L4 12V28L18 36L32 28V12L18 4Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M4 12L18 20L32 12" stroke="currentColor" strokeWidth="1" />
      <path d="M18 20V36" stroke="currentColor" strokeWidth="1" />
      {/* Ribbon / tape */}
      <path d="M11 8L18 12L25 8" stroke="currentColor" strokeWidth="1" />
      <path d="M11 8L11 24" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
      <path d="M25 8L25 24" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
      {/* Checkmark on front face */}
      <path d="M14 26L17 29L22 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ================================================================== */
/*  Section: What We Manufacture                                       */
/* ================================================================== */

function WhatWeManufactureSection() {
  return (
    <section className="relative py-24 bg-dm-black-warm overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[900px] mx-auto px-6 md:px-10 text-center">
        {/* Section label */}
        <p className="font-dm-sans font-light uppercase tracking-[0.3em] text-dm-gold-muted text-xs mb-5">
          Our Expertise
        </p>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-8" aria-hidden="true">
          <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-dm-gold-primary/40" />
          <div className="w-2 h-2 rotate-45 border border-dm-gold-primary/50" />
          <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-dm-gold-primary/40" />
        </div>

        {/* Heading */}
        <h2 className="font-cormorant font-semibold text-3xl md:text-4xl lg:text-[2.75rem] text-dm-gold-primary mb-6 leading-tight">
          What We Manufacture
        </h2>

        {/* Description */}
        <p className="font-cormorant text-dm-white-soft text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
          From intricate bangle dies to precision cutting tools, Die Mart manufactures
          the full spectrum of jewellery dies. Every piece is crafted by our master karigars
          using a blend of time-honoured hand techniques and modern CNC wirecut technology --
          delivering micron-level accuracy that jewellers across India trust.
        </p>

        {/* Feature badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Badge 1: Wirecut Precision */}
          <div className="flex items-center gap-3 px-6 py-3 border border-dm-gold-primary/30 rounded-full bg-dm-black-mid/40 transition-all duration-500 hover:border-dm-gold-primary/60 hover:bg-dm-black-mid/60">
            <CNCIcon className="text-dm-gold-primary flex-shrink-0" />
            <span className="font-dm-sans text-sm uppercase tracking-wider text-dm-white-warm">
              Wirecut Precision
            </span>
          </div>

          {/* Badge 2: Master Embossing */}
          <div className="flex items-center gap-3 px-6 py-3 border border-dm-gold-primary/30 rounded-full bg-dm-black-mid/40 transition-all duration-500 hover:border-dm-gold-primary/60 hover:bg-dm-black-mid/60">
            <ChiselIcon className="text-dm-gold-primary flex-shrink-0" />
            <span className="font-dm-sans text-sm uppercase tracking-wider text-dm-white-warm">
              Master Embossing
            </span>
          </div>

          {/* Badge 3: Quality Tested */}
          <div className="flex items-center gap-3 px-6 py-3 border border-dm-gold-primary/30 rounded-full bg-dm-black-mid/40 transition-all duration-500 hover:border-dm-gold-primary/60 hover:bg-dm-black-mid/60">
            <CheckShieldIcon className="text-dm-gold-primary flex-shrink-0" />
            <span className="font-dm-sans text-sm uppercase tracking-wider text-dm-white-warm">
              Quality Tested
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Section: Product Specifications                                    */
/* ================================================================== */

const SPECS = [
  {
    icon: MaterialIcon,
    value: 'Hardened Tool Steel',
    label: 'Material',
  },
  {
    icon: ToleranceIcon,
    value: '\u00B10.01mm',
    label: 'Tolerance',
  },
  {
    icon: TurnaroundIcon,
    value: '5\u20137 Days Standard',
    label: 'Turnaround',
  },
  {
    icon: CustomDieIcon,
    value: 'Any Design Possible',
    label: 'Custom',
  },
];

function SpecificationsSection() {
  return (
    <section className="relative py-24 bg-dm-black-deep overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 80%, rgba(212,175,55,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-dm-sans font-light uppercase tracking-[0.3em] text-dm-gold-muted text-xs mb-5">
            Engineering Standards
          </p>
          <h2 className="font-cormorant font-semibold text-3xl md:text-4xl lg:text-[2.75rem] text-dm-gold-primary mb-4 leading-tight">
            Product Specifications
          </h2>
          <p className="font-cormorant text-dm-white-soft text-lg max-w-xl mx-auto">
            Every die meets exacting industrial standards, ensuring flawless results with every press.
          </p>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SPECS.map((spec) => {
            const IconComp = spec.icon;
            return (
              <div
                key={spec.label}
                className="group relative bg-dm-black-mid border border-dm-black-light rounded-xl p-8 text-center transition-all duration-500 hover:border-dm-gold-primary/30 card-hover-lift overflow-hidden"
              >
                {/* Gold hover line at top */}
                <div
                  className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-dm-gold-primary to-transparent origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-luxury rounded-t-xl"
                  aria-hidden="true"
                />

                {/* Icon with radial glow */}
                <div className="relative mb-6 flex items-center justify-center h-16">
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18)_0%,transparent_70%)] transition-all duration-700 rounded-full scale-75 group-hover:scale-100"
                    aria-hidden="true"
                  />
                  <IconComp className="relative z-10 text-dm-gold-primary transition-all duration-500 group-hover:text-dm-gold-bright group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] group-hover:scale-110" />
                </div>

                {/* Value */}
                <div className="font-cormorant font-bold text-2xl md:text-[1.7rem] text-dm-white-warm mb-2 leading-snug transition-colors duration-300 group-hover:text-dm-gold-bright">
                  {spec.value}
                </div>

                {/* Gold separator */}
                <div className="w-8 h-px bg-dm-gold-primary/40 mx-auto mb-3" aria-hidden="true" />

                {/* Label */}
                <div className="font-dm-sans text-xs text-dm-gold-muted uppercase tracking-[0.2em]">
                  {spec.label}
                </div>

                {/* Corner accents */}
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-dm-gold-primary/0 group-hover:border-dm-gold-primary/20 transition-all duration-700 rounded-tr-lg" aria-hidden="true" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-dm-gold-primary/0 group-hover:border-dm-gold-primary/20 transition-all duration-700 rounded-bl-lg" aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Section: How to Order                                              */
/* ================================================================== */

const STEPS = [
  {
    number: '01',
    icon: MessageIcon,
    title: 'Share Your Design',
    description: 'Send us your design via WhatsApp',
  },
  {
    number: '02',
    icon: FactoryIcon,
    title: 'We Manufacture',
    description: 'Our karigars craft your die',
  },
  {
    number: '03',
    icon: PackageIcon,
    title: 'Receive & Press',
    description: 'Quality tested and dispatched',
  },
];

function HowToOrderSection() {
  return (
    <section className="relative py-24 bg-dm-black-warm overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[1000px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="font-dm-sans font-light uppercase tracking-[0.3em] text-dm-gold-muted text-xs mb-5">
            Simple Process
          </p>

          <div className="flex items-center justify-center gap-4 mb-8" aria-hidden="true">
            <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-dm-gold-primary/40" />
            <div className="w-2 h-2 rotate-45 border border-dm-gold-primary/50" />
            <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-dm-gold-primary/40" />
          </div>

          <h2 className="font-cormorant font-semibold text-3xl md:text-4xl lg:text-[2.75rem] text-dm-gold-primary mb-4 leading-tight">
            How to Order
          </h2>
          <p className="font-cormorant text-dm-white-soft text-lg max-w-xl mx-auto">
            Three simple steps from design to delivery. Start with a WhatsApp message.
          </p>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col md:flex-row items-center md:items-start justify-between gap-16 md:gap-8">
          {/* Connecting dotted lines (desktop only) */}
          <div className="hidden md:block absolute top-[60px] left-[calc(16.66%+40px)] right-[calc(16.66%+40px)] h-0 pointer-events-none" aria-hidden="true">
            <div
              className="w-full h-[2px]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to right, rgba(212,175,55,0.35) 0px, rgba(212,175,55,0.35) 6px, transparent 6px, transparent 14px)',
              }}
            />
          </div>

          {/* Connecting dotted lines (mobile only) */}
          <div className="md:hidden absolute top-[140px] bottom-[140px] left-1/2 -translate-x-1/2 w-0 pointer-events-none" aria-hidden="true">
            <div
              className="h-full w-[2px] mx-auto"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, rgba(212,175,55,0.35) 0px, rgba(212,175,55,0.35) 6px, transparent 6px, transparent 14px)',
              }}
            />
          </div>

          {STEPS.map((step) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.number}
                className="group relative z-10 flex-1 flex flex-col items-center text-center max-w-[280px]"
              >
                {/* Step number */}
                <span className="font-dm-sans text-[11px] font-light uppercase tracking-[0.3em] text-dm-gold-muted/60 mb-4">
                  Step {step.number}
                </span>

                {/* Icon circle */}
                <div className="relative mb-6">
                  {/* Outer ring */}
                  <div className="w-[120px] h-[120px] rounded-full border border-dm-gold-primary/20 flex items-center justify-center transition-all duration-500 group-hover:border-dm-gold-primary/50 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                    {/* Inner background */}
                    <div className="w-[96px] h-[96px] rounded-full bg-dm-black-mid border border-dm-black-light flex items-center justify-center transition-all duration-500 group-hover:bg-dm-black-mid/80 group-hover:border-dm-gold-primary/30">
                      <IconComp className="text-dm-gold-primary transition-all duration-500 group-hover:text-dm-gold-bright group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                    </div>
                  </div>
                  {/* Glow behind */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="font-cormorant font-semibold text-xl md:text-2xl text-dm-white-warm mb-2 transition-colors duration-300 group-hover:text-dm-gold-bright">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-cormorant text-dm-white-soft/80 text-[1.05rem] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA below steps */}
        <div className="text-center mt-16">
          <a
            href="https://wa.me/917499749770"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-dm-gold-primary text-dm-black-deep font-dm-sans font-semibold text-sm uppercase tracking-widest transition-all duration-[350ms] ease-luxury hover:bg-dm-gold-bright hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] focus-visible:ring-2 focus-visible:ring-dm-gold-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dm-black-warm"
          >
            {/* WhatsApp icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Start Your Order
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Section Dividers (inline for this page)                            */
/* ================================================================== */

function GoldDivider({ variant = 'line' }: { variant?: 'line' | 'diamond' | 'dots' }) {
  if (variant === 'diamond') {
    return (
      <div className="flex items-center justify-center py-2" aria-hidden="true">
        <div className="h-px w-24 bg-gradient-to-r from-transparent to-dm-gold-primary/30" />
        <div className="mx-3 w-2.5 h-2.5 rotate-45 border border-dm-gold-primary/40 bg-dm-gold-primary/5" />
        <div className="h-px w-24 bg-gradient-to-l from-transparent to-dm-gold-primary/30" />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex items-center justify-center gap-3 py-2" aria-hidden="true">
        <div className="w-1.5 h-1.5 rounded-full bg-dm-gold-primary/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-dm-gold-primary/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-dm-gold-primary/30" />
      </div>
    );
  }

  return (
    <div
      className="h-px mx-auto max-w-[1280px] bg-gradient-to-r from-transparent via-dm-gold-primary/30 to-transparent"
      aria-hidden="true"
    />
  );
}

/* ================================================================== */
/*  Products Page                                                      */
/* ================================================================== */

export default function ProductsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-[72px]">
        {/* Products (6-card grid component) */}
        <Products />

        <GoldDivider variant="dots" />

        {/* 4. Product Specifications */}
        <SpecificationsSection />

        <GoldDivider variant="line" />

        {/* 5. How to Order */}
        <HowToOrderSection />

      </main>
      <Footer />
      <WhatsAppFloat />
      <CustomCursor />
    </>
  );
}

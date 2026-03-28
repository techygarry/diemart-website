'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CustomCursor from '@/components/CustomCursor';

/* ================================================================== */
/*  FAQ data                                                          */
/* ================================================================== */
const FAQ_ITEMS = [
  {
    question: 'What is the minimum order quantity?',
    answer:
      'We accept orders of any size, from a single bespoke die to large-scale production runs of thousands. Every order receives the same attention to detail and quality assurance.',
  },
  {
    question: 'How long does manufacturing take?',
    answer:
      'Standard turnaround is 5\u20137 business days for most die types. Complex custom designs may require 10\u201314 days. Rush orders can be accommodated\u2014reach out on WhatsApp for expedited timelines.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, we proudly serve clients across India, the Middle East, and Europe. All international shipments are fully insured and tracked door-to-door.',
  },
  {
    question: 'Can I visit the factory?',
    answer:
      'Absolutely! We welcome visits to our Chinchani facility. See our karigars at work, review materials, and discuss your project face-to-face. Schedule a visit via WhatsApp.',
  },
  {
    question: 'How do I track my order?',
    answer:
      'You\u2019ll receive real-time updates via WhatsApp at every stage\u2014design approval, production start, quality check, and dispatch\u2014so you always know exactly where your order stands.',
  },
];

/* ================================================================== */
/*  Inline SVG icon components                                        */
/* ================================================================== */

function IconMessageBubble() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function IconEnvelope() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="#D4AF37" stroke="none" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22V12h6v10" />
      <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M8 18h.01" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function IconClockLarge() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function IconMinus() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* ================================================================== */
/*  FAQ Accordion Item                                                */
/* ================================================================== */
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-dm-black-light rounded-sm overflow-hidden transition-colors duration-300 hover:border-dm-gold-primary/30">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 group"
        aria-expanded={isOpen}
      >
        <span className="font-cormorant font-semibold text-lg md:text-xl text-dm-white-warm group-hover:text-dm-gold-primary transition-colors duration-300">
          {question}
        </span>
        <span
          className={`flex-shrink-0 text-dm-gold-primary transition-transform duration-300 ${
            isOpen ? 'rotate-0' : 'rotate-0'
          }`}
        >
          {isOpen ? <IconMinus /> : <IconPlus />}
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 font-dm-sans text-dm-white-soft text-[15px] leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Contact Page                                                      */
/* ================================================================== */
export default function ContactPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <Navigation />
      <main className="pt-[72px]">
        {/* ──────────────── Contact Form (5-step) ──────────────── */}
        <section className="bg-dm-black-warm">
          <Contact />
        </section>

        {/* ──────────────── Get in Touch Section ──────────────── */}
        <section className="bg-dm-black-deep py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section heading */}
            <div className="text-center mb-16">
              <p className="font-dm-sans font-light uppercase tracking-[0.3em] text-dm-gold-muted text-sm mb-4">
                REACH OUT
              </p>
              <h2 className="font-cormorant font-semibold text-4xl md:text-5xl text-dm-white-warm mb-4">
                Get in Touch
              </h2>
              <p className="font-cormorant text-dm-white-soft text-lg max-w-xl mx-auto">
                Choose the channel that suits you best. We&apos;re always a message away.
              </p>
              {/* Decorative line */}
              <div className="flex items-center justify-center gap-3 mt-8" aria-hidden="true">
                <span
                  className="block h-px w-12 md:w-20"
                  style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }}
                />
                <span className="block w-1.5 h-1.5 rotate-45 border border-dm-gold-primary/60" />
                <span
                  className="block h-px w-12 md:w-20"
                  style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }}
                />
              </div>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* LEFT — Contact Methods */}
              <div className="space-y-5">
                <h3 className="font-cormorant font-semibold text-2xl text-dm-gold-primary mb-6">
                  Contact Methods
                </h3>

                {/* WhatsApp Chat */}
                <a
                  href="https://wa.me/917499749770"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 p-5 border border-dm-black-light rounded-sm
                             bg-dm-black-warm/50 hover:border-dm-gold-primary/40 hover:bg-dm-black-mid/60
                             transition-all duration-300"
                >
                  <span className="flex-shrink-0 w-12 h-12 rounded-sm bg-dm-black-mid flex items-center justify-center
                                   border border-dm-gold-primary/20 group-hover:border-dm-gold-primary/50 transition-colors duration-300">
                    <IconMessageBubble />
                  </span>
                  <div>
                    <p className="font-dm-sans text-sm text-dm-gold-muted uppercase tracking-wider mb-1">
                      WhatsApp Chat
                    </p>
                    <p className="font-cormorant text-lg text-dm-white-warm group-hover:text-dm-gold-primary transition-colors duration-300">
                      Chat on WhatsApp
                    </p>
                  </div>
                </a>

                {/* WhatsApp Call */}
                <a
                  href="https://wa.me/917499749770"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 p-5 border border-dm-black-light rounded-sm
                             bg-dm-black-warm/50 hover:border-dm-gold-primary/40 hover:bg-dm-black-mid/60
                             transition-all duration-300"
                >
                  <span className="flex-shrink-0 w-12 h-12 rounded-sm bg-dm-black-mid flex items-center justify-center
                                   border border-dm-gold-primary/20 group-hover:border-dm-gold-primary/50 transition-colors duration-300">
                    <IconPhone />
                  </span>
                  <div>
                    <p className="font-dm-sans text-sm text-dm-gold-muted uppercase tracking-wider mb-1">
                      WhatsApp Call
                    </p>
                    <p className="font-cormorant text-lg text-dm-white-warm group-hover:text-dm-gold-primary transition-colors duration-300">
                      Call us on WhatsApp
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@diemart.co.in"
                  className="group flex items-center gap-5 p-5 border border-dm-black-light rounded-sm
                             bg-dm-black-warm/50 hover:border-dm-gold-primary/40 hover:bg-dm-black-mid/60
                             transition-all duration-300"
                >
                  <span className="flex-shrink-0 w-12 h-12 rounded-sm bg-dm-black-mid flex items-center justify-center
                                   border border-dm-gold-primary/20 group-hover:border-dm-gold-primary/50 transition-colors duration-300">
                    <IconEnvelope />
                  </span>
                  <div>
                    <p className="font-dm-sans text-sm text-dm-gold-muted uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <p className="font-cormorant text-lg text-dm-white-warm group-hover:text-dm-gold-primary transition-colors duration-300">
                      info@diemart.co.in
                    </p>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/die_mart_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 p-5 border border-dm-black-light rounded-sm
                             bg-dm-black-warm/50 hover:border-dm-gold-primary/40 hover:bg-dm-black-mid/60
                             transition-all duration-300"
                >
                  <span className="flex-shrink-0 w-12 h-12 rounded-sm bg-dm-black-mid flex items-center justify-center
                                   border border-dm-gold-primary/20 group-hover:border-dm-gold-primary/50 transition-colors duration-300">
                    <IconInstagram />
                  </span>
                  <div>
                    <p className="font-dm-sans text-sm text-dm-gold-muted uppercase tracking-wider mb-1">
                      Instagram
                    </p>
                    <p className="font-cormorant text-lg text-dm-white-warm group-hover:text-dm-gold-primary transition-colors duration-300">
                      @die_mart_
                    </p>
                  </div>
                </a>
              </div>

              {/* RIGHT — Business Hours & Response Info */}
              <div className="space-y-5">
                <h3 className="font-cormorant font-semibold text-2xl text-dm-gold-primary mb-6">
                  Availability
                </h3>

                {/* Business Hours */}
                <div className="flex items-center gap-5 p-5 border border-dm-black-light rounded-sm bg-dm-black-warm/50">
                  <span className="flex-shrink-0 w-12 h-12 rounded-sm bg-dm-black-mid flex items-center justify-center
                                   border border-dm-gold-primary/20">
                    <IconClock />
                  </span>
                  <div>
                    <p className="font-dm-sans text-sm text-dm-gold-muted uppercase tracking-wider mb-1">
                      Business Hours
                    </p>
                    <p className="font-cormorant text-lg text-dm-white-warm">
                      6 AM &ndash; 10 PM IST
                    </p>
                    <p className="font-dm-sans text-xs text-dm-white-ghost mt-0.5">
                      Monday through Saturday
                    </p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-center gap-5 p-5 border border-dm-black-light rounded-sm bg-dm-black-warm/50">
                  <span className="flex-shrink-0 w-12 h-12 rounded-sm bg-dm-black-mid flex items-center justify-center
                                   border border-dm-gold-primary/20">
                    <IconBolt />
                  </span>
                  <div>
                    <p className="font-dm-sans text-sm text-dm-gold-muted uppercase tracking-wider mb-1">
                      Response Time
                    </p>
                    <p className="font-cormorant text-lg text-dm-white-warm">
                      Within 4 Hours
                    </p>
                    <p className="font-dm-sans text-xs text-dm-white-ghost mt-0.5">
                      During business hours
                    </p>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex items-center gap-5 p-5 border border-dm-black-light rounded-sm bg-dm-black-warm/50">
                  <span className="flex-shrink-0 w-12 h-12 rounded-sm bg-dm-black-mid flex items-center justify-center
                                   border border-dm-gold-primary/20">
                    <IconGlobe />
                  </span>
                  <div>
                    <p className="font-dm-sans text-sm text-dm-gold-muted uppercase tracking-wider mb-1">
                      Languages
                    </p>
                    <p className="font-cormorant text-lg text-dm-white-warm">
                      English, Hindi, Gujarati
                    </p>
                    <p className="font-dm-sans text-xs text-dm-white-ghost mt-0.5">
                      Speak your preferred language
                    </p>
                  </div>
                </div>

                {/* Quick CTA */}
                <div className="mt-8 pt-6 border-t border-dm-black-light">
                  <p className="font-cormorant text-dm-white-soft text-base mb-4">
                    Need an immediate response? Message us directly.
                  </p>
                  <a
                    href="https://wa.me/917499749770"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-dm-gold-primary text-dm-black-deep
                               font-dm-sans font-medium px-7 py-3.5 rounded-sm min-h-[48px]
                               hover:bg-dm-gold-bright transition-colors duration-300"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Message on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── Visit Our Factory ──────────────── */}
        <section className="bg-dm-black-deep py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section heading */}
            <div className="text-center mb-16">
              <p className="font-dm-sans font-light uppercase tracking-[0.3em] text-dm-gold-muted text-sm mb-4">
                OUR LOCATION
              </p>
              <h2 className="font-cormorant font-semibold text-4xl md:text-5xl text-dm-white-warm mb-4">
                Visit Our Factory
              </h2>
              <p className="font-cormorant text-dm-white-soft text-lg max-w-xl mx-auto">
                Experience the art of die-making first-hand at our Chinchani facility.
              </p>
              {/* Decorative line */}
              <div className="flex items-center justify-center gap-3 mt-8" aria-hidden="true">
                <span
                  className="block h-px w-12 md:w-20"
                  style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }}
                />
                <span className="block w-1.5 h-1.5 rotate-45 border border-dm-gold-primary/60" />
                <span
                  className="block h-px w-12 md:w-20"
                  style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }}
                />
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="relative w-full h-[320px] md:h-[400px] rounded-sm border border-dm-black-light
                         bg-dm-black-mid overflow-hidden"
            >
              {/* Dark textured background */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(212,175,55,0.04) 0%, transparent 70%), linear-gradient(135deg, rgba(15,13,6,1) 0%, rgba(25,22,12,1) 50%, rgba(15,13,6,1) 100%)',
                }}
              />
              {/* Grid lines for map feel */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
                  backgroundSize: '60px 60px',
                }}
              />
              {/* Center content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <div className="mb-4 animate-bounce" style={{ animationDuration: '3s' }}>
                  <IconPin />
                </div>
                <h3 className="font-cormorant font-semibold text-2xl md:text-3xl text-dm-gold-primary mb-2">
                  Die Mart
                </h3>
                <p className="font-cormorant text-dm-white-soft text-lg mb-1">
                  Chinchani, Tarapur
                </p>
                <p className="font-dm-sans text-dm-white-ghost text-sm">
                  Maharashtra, India
                </p>
                <a
                  href="https://wa.me/917499749770?text=Hi%20Die%20Mart%2C%20I%27d%20like%20to%20visit%20your%20factory."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 border border-dm-gold-primary/40 text-dm-gold-primary
                             font-dm-sans text-sm px-5 py-2.5 rounded-sm
                             hover:bg-dm-gold-primary hover:text-dm-black-deep transition-all duration-300"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Schedule a Visit
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ──────────────── Frequently Asked Questions ──────────────── */}
        <section className="bg-dm-black-warm py-20 md:py-28 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Section heading */}
            <div className="text-center mb-16">
              <p className="font-dm-sans font-light uppercase tracking-[0.3em] text-dm-gold-muted text-sm mb-4">
                COMMON QUERIES
              </p>
              <h2 className="font-cormorant font-semibold text-4xl md:text-5xl text-dm-white-warm mb-4">
                Frequently Asked Questions
              </h2>
              <p className="font-cormorant text-dm-white-soft text-lg max-w-xl mx-auto">
                Everything you need to know before placing an order.
              </p>
              {/* Decorative line */}
              <div className="flex items-center justify-center gap-3 mt-8" aria-hidden="true">
                <span
                  className="block h-px w-12 md:w-20"
                  style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }}
                />
                <span className="block w-1.5 h-1.5 rotate-45 border border-dm-gold-primary/60" />
                <span
                  className="block h-px w-12 md:w-20"
                  style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }}
                />
              </div>
            </div>

            {/* Accordion */}
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFAQ === index}
                  onToggle={() => toggleFAQ(index)}
                />
              ))}
            </div>

            {/* Bottom note */}
            <div className="mt-12 text-center">
              <p className="font-cormorant text-dm-white-ghost text-base mb-4">
                Have a question that&apos;s not listed here?
              </p>
              <a
                href="https://wa.me/917499749770?text=Hi%20Die%20Mart%2C%20I%20have%20a%20question."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-dm-gold-primary font-dm-sans text-sm
                           hover:text-dm-gold-bright transition-colors duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Ask us on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
      <CustomCursor />
    </>
  );
}

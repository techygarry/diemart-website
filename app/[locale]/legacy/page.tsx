'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import PageHero from '@/components/PageHero';
import Legacy from '@/components/Legacy';
import About from '@/components/About';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CustomCursor from '@/components/CustomCursor';

/* ================================================================== */
/*  Intersection Observer Hook                                        */
/* ================================================================== */
function useIntersection(threshold = 0.2): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

/* ================================================================== */
/*  Count-Up Animation Hook                                           */
/* ================================================================== */
function useCountUp(target: number, duration: number, isVisible: boolean): number {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isVisible, target, duration]);

  return count;
}

/* ================================================================== */
/*  Heritage Stat Card                                                */
/* ================================================================== */
interface HeritageCardProps {
  value: string;
  label: string;
  index: number;
  isVisible: boolean;
  isAnimatedNumber?: boolean;
  animTarget?: number;
}

function HeritageCard({
  value,
  label,
  index,
  isVisible,
  isAnimatedNumber = false,
  animTarget = 0,
}: HeritageCardProps) {
  const count = useCountUp(animTarget, 1800, isVisible && isAnimatedNumber);

  return (
    <div
      className="group relative bg-dm-black-mid/50 border border-dm-black-light rounded-xl p-8 text-center overflow-hidden transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Gold top accent line */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-dm-gold-primary/60 to-transparent"
        aria-hidden="true"
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Number */}
      <div
        className="font-cormorant font-bold text-4xl sm:text-5xl text-dm-gold-primary mb-3"
        style={{ textShadow: '0 0 24px rgba(212,175,55,0.12)' }}
      >
        {isAnimatedNumber ? count.toLocaleString() : value}
      </div>

      {/* Gold separator */}
      <div
        className="w-8 h-px bg-dm-gold-primary/40 mx-auto mb-3"
        aria-hidden="true"
      />

      {/* Label */}
      <div className="font-dm-sans text-xs sm:text-sm text-dm-white-soft uppercase tracking-[0.15em]">
        {label}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Founder Image with Shimmer                                        */
/* ================================================================== */
function FounderImage() {
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);

  return (
    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-dm-black-light">
      {/* Shimmer placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-dm-black-mid animate-pulse" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.06) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s ease-in-out infinite',
            }}
          />
        </div>
      )}

      <Image
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop"
        alt="Die Mart craft workshop — the forge where precision meets heritage"
        fill
        className={`object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        sizes="(max-width: 768px) 100vw, 640px"
        onLoad={handleLoad}
        priority={false}
      />

      {/* Gold gradient overlay on bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(15,13,6,0.7) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />
    </div>
  );
}

/* ================================================================== */
/*  Gold Divider                                                      */
/* ================================================================== */
function GoldDivider() {
  return (
    <div
      className="flex items-center justify-center gap-3 my-8"
      aria-hidden="true"
    >
      <span
        className="block h-px w-16 md:w-24"
        style={{
          background: 'linear-gradient(to right, transparent, #D4AF37)',
        }}
      />
      <span className="block w-2 h-2 rotate-45 border border-dm-gold-primary/50" />
      <span
        className="block h-px w-16 md:w-24"
        style={{
          background: 'linear-gradient(to left, transparent, #D4AF37)',
        }}
      />
    </div>
  );
}

/* ================================================================== */
/*  Milestone Card                                                    */
/* ================================================================== */
interface MilestoneCardProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}

function MilestoneCard({
  number,
  icon,
  title,
  description,
  index,
  isVisible,
}: MilestoneCardProps) {
  return (
    <div
      className="group relative bg-dm-black-mid/40 border border-dm-black-light rounded-xl p-8 overflow-hidden transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Gold top accent */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-dm-gold-primary/50 to-transparent"
        aria-hidden="true"
      />

      {/* Background decorative number */}
      <span
        className="absolute -top-4 -right-2 font-cormorant font-bold text-[100px] leading-none text-dm-gold-primary/[0.04] select-none pointer-events-none"
        aria-hidden="true"
      >
        {number}
      </span>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(212,175,55,0.05) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-lg bg-dm-black-deep/60 border border-dm-gold-primary/20 mb-5">
        <div className="text-dm-gold-primary">{icon}</div>
      </div>

      {/* Title */}
      <h3 className="relative z-10 font-cormorant font-semibold text-xl text-dm-white-warm mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 font-cormorant text-base leading-relaxed text-dm-white-soft">
        {description}
      </p>
    </div>
  );
}

/* ================================================================== */
/*  Inline SVG Icons                                                  */
/* ================================================================== */
function TrainIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Train body */}
      <rect x="4" y="3" width="16" height="14" rx="2" />
      {/* Window */}
      <rect x="7" y="6" width="10" height="5" rx="1" />
      {/* Wheels */}
      <circle cx="8" cy="20" r="1.5" />
      <circle cx="16" cy="20" r="1.5" />
      {/* Connectors to wheels */}
      <path d="M8 17v1.5" />
      <path d="M16 17v1.5" />
      {/* Front light */}
      <line x1="12" y1="14" x2="12" y2="15" />
    </svg>
  );
}

function MachineIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Gear outer */}
      <path d="M12 2l1.5 2.1a7 7 0 0 1 2.4 1l2.3-.8 1 1.7-1.8 1.5a7 7 0 0 1 0 2.6l1.8 1.5-1 1.7-2.3-.8a7 7 0 0 1-2.4 1L12 15l-1.5-2.1a7 7 0 0 1-2.4-1l-2.3.8-1-1.7 1.8-1.5a7 7 0 0 1 0-2.6L4.8 5.4l1-1.7 2.3.8a7 7 0 0 1 2.4-1L12 2z" />
      {/* Center circle */}
      <circle cx="12" cy="8.5" r="2.5" />
      {/* Base */}
      <path d="M6 17h12" />
      <path d="M8 17v4" />
      <path d="M16 17v4" />
      <path d="M6 21h12" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Building */}
      <rect x="4" y="2" width="16" height="20" rx="1" />
      {/* Door */}
      <rect x="10" y="16" width="4" height="6" />
      {/* Windows row 1 */}
      <rect x="7" y="5" width="3" height="3" rx="0.5" />
      <rect x="14" y="5" width="3" height="3" rx="0.5" />
      {/* Windows row 2 */}
      <rect x="7" y="11" width="3" height="3" rx="0.5" />
      <rect x="14" y="11" width="3" height="3" rx="0.5" />
      {/* Roof accent */}
      <path d="M4 2h16" />
    </svg>
  );
}

/* ================================================================== */
/*  Heritage Stats Data                                               */
/* ================================================================== */
const HERITAGE_STATS = [
  { value: '1980', label: 'Craft Began', isAnimated: false, target: 0 },
  { value: '2022', label: 'Die Mart Founded', isAnimated: false, target: 0 },
  { value: '3', label: 'Factories Built', isAnimated: true, target: 3 },
  { value: '3,600+', label: 'Designs Created', isAnimated: false, target: 0 },
  { value: '10 Lakh+', label: 'Dies Manufactured', isAnimated: false, target: 0 },
  { value: '100+', label: 'Master Karigars', isAnimated: false, target: 0 },
];

/* ================================================================== */
/*  Milestones Data                                                   */
/* ================================================================== */
const MILESTONES = [
  {
    number: '01',
    title: 'From Kurla to Chinchani',
    description:
      'The Nagavadria family began their craft in Kurla, Mumbai \u2014 a one-room workshop where gold met hand and hammer. As the city grew, so did their ambition. They migrated to Chinchani in the Palghar belt, where land, labour, and legacy could breathe and expand.',
    icon: <TrainIcon />,
  },
  {
    number: '02',
    title: 'First CNC Machine',
    description:
      'While the industry still relied entirely on manual chiselling, the family invested in their first CNC engraving machine. It was a bold, expensive bet \u2014 but it brought a new level of precision and repeatability that hand-work alone could never achieve.',
    icon: <MachineIcon />,
  },
  {
    number: '03',
    title: 'Die Mart is Born',
    description:
      'In 2022, Hussain Nagavadria formalised decades of knowledge into a brand. Die Mart was founded not as a startup, but as the natural evolution of a family that had been shaping gold dies for over four decades. Three factories, 100+ karigars, one name.',
    icon: <BuildingIcon />,
  },
];

/* ================================================================== */
/*  Section Heading Component                                         */
/* ================================================================== */
function SectionHeading({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-16">
      <p className="font-dm-sans font-light uppercase tracking-[0.3em] text-dm-gold-muted text-xs mb-4">
        {label}
      </p>
      <h2 className="font-cormorant font-semibold text-3xl md:text-5xl text-dm-gold-primary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="font-cormorant italic text-lg text-dm-white-ghost max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
      <GoldDivider />
    </div>
  );
}

/* ================================================================== */
/*  MAIN PAGE                                                         */
/* ================================================================== */
export default function LegacyPage() {
  /* Intersection refs for scroll-triggered animations */
  const [heritageRef, heritageVisible] = useIntersection(0.15);
  const [founderRef, founderVisible] = useIntersection(0.15);
  const [milestonesRef, milestonesVisible] = useIntersection(0.15);


  return (
    <>
      <Navigation />

      <main className="pt-[72px]">
        {/* ============================================================ */}
        {/*  1. PAGE HERO                                                */}
        {/* ============================================================ */}
        <PageHero
          label="HERITAGE"
          title="Our Legacy"
          subtitle="From 1980 to the Future"
        />

        {/* ============================================================ */}
        {/*  2. HERITAGE AT A GLANCE                                     */}
        {/* ============================================================ */}
        <section
          ref={heritageRef as React.RefObject<HTMLElement>}
          className="relative bg-dm-black-deep py-24 md:py-32 overflow-hidden"
          aria-labelledby="heritage-glance-heading"
        >
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(212,175,55,0.04) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12">
            <SectionHeading
              label="BY THE NUMBERS"
              title="Heritage at a Glance"
              subtitle="Four decades of mastery, distilled into milestones"
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
              {HERITAGE_STATS.map((stat, i) => (
                <HeritageCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  index={i}
                  isVisible={heritageVisible}
                  isAnimatedNumber={stat.isAnimated}
                  animTarget={stat.target}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  3. THE FOUNDER'S JOURNEY                                    */}
        {/* ============================================================ */}
        <section
          ref={founderRef as React.RefObject<HTMLElement>}
          className="relative bg-dm-black-warm py-24 md:py-32 overflow-hidden"
          aria-labelledby="founder-journey-heading"
        >
          {/* Decorative corner elements */}
          <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-dm-gold-primary/10 pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-dm-gold-primary/10 pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12">
            <SectionHeading
              label="THE STORY"
              title="The Founder&rsquo;s Journey"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div>
                <FounderImage />
              </div>

              {/* Text */}
              <div>
                <p className="font-cormorant text-lg md:text-xl leading-relaxed text-dm-white-soft mb-8">
                  The story of Die Mart does not begin in a boardroom. It begins in the narrow
                  lanes of Kurla, Mumbai, where Elyas Nagavadria first held a chisel at the age of
                  fourteen. What started as a family trade became a lifelong obsession with
                  precision. For over four decades, the Nagavadria family has shaped the dies that
                  shape India&rsquo;s gold jewellery \u2014 from temple designs to modern geometric
                  patterns, from hand-carved masters to CNC-engraved moulds.
                </p>

                <p className="font-cormorant text-lg md:text-xl leading-relaxed text-dm-white-soft mb-8">
                  In 2022, Hussain Nagavadria \u2014 Elyas&rsquo;s son \u2014 formalised this
                  legacy into Die Mart. He brought digital cataloguing, modern machinery, and a
                  relentless drive for quality that the next generation of jewellers demands. Today,
                  Die Mart operates three factories, employs over 100 master karigars, and has an
                  archive of 3,600+ original designs.
                </p>

                {/* Gold divider */}
                <div className="flex items-center gap-3 mb-8" aria-hidden="true">
                  <span
                    className="block h-px flex-1"
                    style={{
                      background:
                        'linear-gradient(to right, #D4AF37, transparent)',
                    }}
                  />
                  <span className="block w-1.5 h-1.5 rotate-45 bg-dm-gold-primary/60" />
                </div>

                {/* Quote */}
                <blockquote className="relative pl-6 border-l-2 border-dm-gold-primary/30">
                  <p className="font-cormorant italic text-xl md:text-2xl text-dm-gold-muted leading-relaxed">
                    &ldquo;A die is not just a tool. It is the first impression a jeweller makes on
                    gold. We make sure that impression is perfect.&rdquo;
                  </p>
                  <footer className="mt-4 font-dm-sans text-sm text-dm-white-ghost uppercase tracking-wider">
                    &mdash; Hussain Nagavadria, Founder
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  4. LEGACY TIMELINE (component)                              */}
        {/* ============================================================ */}
        <Legacy />

        {/* ============================================================ */}
        {/*  5. MILESTONES                                               */}
        {/* ============================================================ */}
        <section
          ref={milestonesRef as React.RefObject<HTMLElement>}
          className="relative bg-dm-black-deep py-24 md:py-32 overflow-hidden"
          aria-labelledby="milestones-heading"
        >
          {/* Background grid pattern (subtle) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            aria-hidden="true"
            style={{
              backgroundImage:
                'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12">
            <SectionHeading
              label="DEFINING MOMENTS"
              title="Milestones"
              subtitle="Three turning points that shaped the Die Mart story"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {MILESTONES.map((milestone, i) => (
                <MilestoneCard
                  key={milestone.number}
                  number={milestone.number}
                  icon={milestone.icon}
                  title={milestone.title}
                  description={milestone.description}
                  index={i}
                  isVisible={milestonesVisible}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  6. ABOUT (component — founder detail)                       */}
        {/* ============================================================ */}
        <About />

        {/* ============================================================ */}
        {/*  7. CTA + FOOTER + FLOATING ELEMENTS                        */}
        {/* ============================================================ */}
        <CTASection />
      </main>

      <Footer />
      <WhatsAppFloat />
      <CustomCursor />

      {/* Shimmer keyframe for founder image placeholder */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </>
  );
}

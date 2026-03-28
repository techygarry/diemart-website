'use client';

import { useTranslations } from 'next-intl';

/* ─────────────────────────── SVG Icons ─────────────────────────── */

function BangleIcon({ className }: { className?: string }) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer bangle ring */}
      <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="1.5" />
      {/* Inner bangle ring */}
      <circle cx="28" cy="28" r="18" stroke="currentColor" strokeWidth="1" />
      {/* Decorative bangle ridges */}
      <circle cx="28" cy="28" r="21" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4" />
      {/* Top jewel accent */}
      <circle cx="28" cy="4" r="2" stroke="currentColor" strokeWidth="1" />
      <circle cx="28" cy="4" r="0.8" fill="currentColor" />
      {/* Bottom jewel accent */}
      <circle cx="28" cy="52" r="2" stroke="currentColor" strokeWidth="1" />
      <circle cx="28" cy="52" r="0.8" fill="currentColor" />
      {/* Side jewel accents */}
      <circle cx="4" cy="28" r="2" stroke="currentColor" strokeWidth="1" />
      <circle cx="4" cy="28" r="0.8" fill="currentColor" />
      <circle cx="52" cy="28" r="2" stroke="currentColor" strokeWidth="1" />
      <circle cx="52" cy="28" r="0.8" fill="currentColor" />
      {/* Cross hatch pattern on bangle body */}
      <path d="M10 18 L14 14" stroke="currentColor" strokeWidth="0.5" />
      <path d="M42 42 L46 38" stroke="currentColor" strokeWidth="0.5" />
      <path d="M42 14 L46 18" stroke="currentColor" strokeWidth="0.5" />
      <path d="M10 38 L14 42" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

function FlowerIcon({ className }: { className?: string }) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Center pistil */}
      <circle cx="28" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="28" cy="28" r="1.5" fill="currentColor" />
      {/* Petals — 8 petals radiating outward */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="28"
          cy="12"
          rx="5"
          ry="10"
          stroke="currentColor"
          strokeWidth="1"
          transform={`rotate(${angle} 28 28)`}
        />
      ))}
      {/* Inner petal details */}
      {[0, 90, 180, 270].map((angle) => (
        <line
          key={`detail-${angle}`}
          x1="28"
          y1="20"
          x2="28"
          y2="8"
          stroke="currentColor"
          strokeWidth="0.5"
          transform={`rotate(${angle} 28 28)`}
        />
      ))}
    </svg>
  );
}

function ThappadIcon({ className }: { className?: string }) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Top press plate */}
      <rect x="10" y="6" width="36" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Press shaft */}
      <rect x="24" y="14" width="8" height="10" stroke="currentColor" strokeWidth="1" />
      {/* Pressure arrows */}
      <path d="M28 16 L28 22" stroke="currentColor" strokeWidth="0.8" />
      <path d="M25 20 L28 23 L31 20" stroke="currentColor" strokeWidth="0.8" fill="none" />
      {/* Die stamp face */}
      <rect x="14" y="26" width="28" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      {/* Stamp pattern dots */}
      <circle cx="20" cy="29" r="1" fill="currentColor" />
      <circle cx="28" cy="29" r="1" fill="currentColor" />
      <circle cx="36" cy="29" r="1" fill="currentColor" />
      {/* Bottom base / workpiece */}
      <rect x="12" y="36" width="32" height="4" rx="1" stroke="currentColor" strokeWidth="1" />
      {/* Base platform */}
      <rect x="8" y="42" width="40" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      {/* Base texture lines */}
      <line x1="14" y1="46" x2="42" y2="46" stroke="currentColor" strokeWidth="0.5" />
      <line x1="16" y1="48" x2="40" y2="48" stroke="currentColor" strokeWidth="0.3" />
    </svg>
  );
}

function CuttingIcon({ className }: { className?: string }) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Main blade body */}
      <path
        d="M8 12 L48 12 L48 28 L8 28 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Blade cutting edge — sharp angled bottom */}
      <path
        d="M8 28 L4 38 L52 38 L48 28"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Cutting edge highlight */}
      <line x1="6" y1="37" x2="50" y2="37" stroke="currentColor" strokeWidth="0.5" />
      {/* Precision alignment marks on blade */}
      <line x1="18" y1="12" x2="18" y2="28" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="28" y1="12" x2="28" y2="28" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="38" y1="12" x2="38" y2="28" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      {/* Material being cut below */}
      <rect x="10" y="42" width="36" height="6" rx="1" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
      {/* Cut line spark marks */}
      <path d="M24 39 L22 41" stroke="currentColor" strokeWidth="0.6" />
      <path d="M28 39 L28 41" stroke="currentColor" strokeWidth="0.6" />
      <path d="M32 39 L34 41" stroke="currentColor" strokeWidth="0.6" />
      {/* Mounting holes */}
      <circle cx="13" cy="20" r="2" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="43" cy="20" r="2" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

function EmbossIcon({ className }: { className?: string }) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Base plate with perspective */}
      <path
        d="M4 40 L14 48 L52 48 L52 32 L42 24 L4 24 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Back face for 3D depth */}
      <path d="M4 24 L4 40 L14 48 L14 32 Z" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M14 32 L52 32" stroke="currentColor" strokeWidth="0.8" />
      <path d="M14 32 L14 48" stroke="currentColor" strokeWidth="0.8" />
      {/* Raised emboss pattern — 3D relief rectangle */}
      <path
        d="M22 28 L22 20 L30 14 L44 14 L44 22 L36 28 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path d="M22 20 L36 20 L44 14" stroke="currentColor" strokeWidth="0.8" />
      <path d="M36 20 L36 28" stroke="currentColor" strokeWidth="0.8" />
      {/* Emboss pattern detail inside the raised area */}
      <circle cx="33" cy="17" r="2" stroke="currentColor" strokeWidth="0.6" />
      {/* Depth shadow lines */}
      <line x1="18" y1="36" x2="48" y2="36" stroke="currentColor" strokeWidth="0.3" />
      <line x1="18" y1="40" x2="48" y2="40" stroke="currentColor" strokeWidth="0.3" />
      <line x1="18" y1="44" x2="48" y2="44" stroke="currentColor" strokeWidth="0.3" />
      {/* Top highlight for 3D effect */}
      <path d="M24 14 L24 8 L26 6" stroke="currentColor" strokeWidth="0.5" />
      <path d="M40 14 L40 8 L42 6" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

function CustomIcon({ className }: { className?: string }) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Main gear body */}
      <circle cx="28" cy="28" r="12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="28" cy="28" r="5" stroke="currentColor" strokeWidth="1" />
      <circle cx="28" cy="28" r="2" fill="currentColor" />
      {/* Gear teeth — 8 teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <rect
          key={angle}
          x="26"
          y="4"
          width="4"
          height="8"
          rx="1"
          stroke="currentColor"
          strokeWidth="1"
          transform={`rotate(${angle} 28 28)`}
        />
      ))}
      {/* Pencil / customization tool overlay — bottom right */}
      <line x1="40" y1="40" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" />
      <path d="M38 42 L40 38 L44 42 L42 44 Z" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M49 49 L51 51 L50 52 L48 50 Z" fill="currentColor" />
      {/* Small secondary gear — top left */}
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="0.5" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <rect
          key={`sm-${angle}`}
          x="11"
          y="4"
          width="2"
          height="3.5"
          rx="0.5"
          stroke="currentColor"
          strokeWidth="0.5"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </svg>
  );
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  bangle: BangleIcon,
  flower: FlowerIcon,
  thappad: ThappadIcon,
  cutting: CuttingIcon,
  emboss: EmbossIcon,
  custom: CustomIcon,
};

/* ────────────────────────── Product Data ────────────────────────── */

interface ProductItem {
  number: string;
  nameKey: string;
  catKey: string;
  descKey: string;
  iconKey: string;
}

const PRODUCTS: ProductItem[] = [
  { number: '01', nameKey: 'bangle_name', catKey: 'bangle_cat', descKey: 'bangle_desc', iconKey: 'bangle' },
  { number: '02', nameKey: 'flower_name', catKey: 'flower_cat', descKey: 'flower_desc', iconKey: 'flower' },
  { number: '03', nameKey: 'thappad_name', catKey: 'thappad_cat', descKey: 'thappad_desc', iconKey: 'thappad' },
  { number: '04', nameKey: 'cutting_name', catKey: 'cutting_cat', descKey: 'cutting_desc', iconKey: 'cutting' },
  { number: '05', nameKey: 'emboss_name', catKey: 'emboss_cat', descKey: 'emboss_desc', iconKey: 'emboss' },
  { number: '06', nameKey: 'custom_name', catKey: 'custom_cat', descKey: 'custom_desc', iconKey: 'custom' },
];

/* ─────────────────────── Product Card ─────────────────────── */

function ProductCard({
  product,
  t,
}: {
  product: ProductItem;
  t: ReturnType<typeof useTranslations>;
}) {
  const IconComponent = ICON_MAP[product.iconKey];

  return (
    <div className="product-card group relative bg-dm-black-mid border border-dm-black-light rounded-xl p-8 transition-all duration-500 hover:border-dm-gold-primary/30 card-hover-lift">
      {/* Gold hover line at top */}
      <div
        className="
          absolute top-0 inset-x-0 h-[2px]
          bg-gradient-to-r from-transparent via-dm-gold-primary to-transparent
          rounded-t-xl
          origin-center scale-x-0 group-hover:scale-x-100
          transition-transform duration-700 ease-luxury
        "
        aria-hidden="true"
      />

      {/* Icon area with radial glow */}
      <div className="relative mb-8 flex items-center justify-center h-20">
        {/* Radial glow behind icon */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]
            group-hover:bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18)_0%,transparent_70%)]
            transition-all duration-700
            rounded-full
            scale-75 group-hover:scale-100
          "
          aria-hidden="true"
        />
        {/* SVG Icon */}
        {IconComponent && (
          <IconComponent
            className="
              relative z-10 text-dm-gold-primary
              transition-all duration-500
              group-hover:text-dm-gold-bright group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]
              group-hover:scale-110
            "
          />
        )}
      </div>

      {/* Product number */}
      <span className="font-dm-sans text-[11px] font-light uppercase tracking-[0.3em] text-dm-gold-muted/60 block mb-3">
        {product.number}
      </span>

      {/* Product name */}
      <h3 className="font-cormorant font-semibold text-[1.65rem] leading-tight text-dm-white-warm mb-1.5 transition-colors duration-300 group-hover:text-dm-gold-bright">
        {t(product.nameKey)}
      </h3>

      {/* Category */}
      <span className="font-dm-sans text-xs text-dm-gold-primary uppercase tracking-[0.2em] block mb-4">
        {t(product.catKey)}
      </span>

      {/* Description */}
      <p className="font-cormorant text-dm-white-soft/80 leading-relaxed text-[1.05rem] mb-6">
        {t(product.descKey)}
      </p>

      {/* Learn More indicator — appears on hover */}
      <div
        className="
          flex items-center gap-2
          opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-500 ease-luxury
        "
      >
        <span className="font-dm-sans text-xs uppercase tracking-[0.15em] text-dm-gold-primary">
          Learn More
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-dm-gold-primary transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path
            d="M3 8H13M13 8L9 4M13 8L9 12"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-dm-gold-primary/0 group-hover:border-dm-gold-primary/20 transition-all duration-700 rounded-tr-lg" aria-hidden="true" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-dm-gold-primary/0 group-hover:border-dm-gold-primary/20 transition-all duration-700 rounded-bl-lg" aria-hidden="true" />
    </div>
  );
}

/* ──────────────────────── Main Component ──────────────────────── */

export default function Products() {
  const t = useTranslations('products');

  return (
    <section
      id="products"
      className="relative py-[120px] bg-dm-black-deep overflow-hidden"
      aria-labelledby="products-heading"
    >
      {/* Subtle background gradient accent */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(212,175,55,0.03)_0%,transparent_60%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        {/* ── Header Area ── */}
        <div className="relative text-center mb-20">
          <div className="relative z-10">
            {/* Section label */}
            <p className="font-dm-sans font-light uppercase tracking-[0.3em] text-dm-gold-muted text-base md:text-lg mb-5">
              {t('label')}
            </p>

            {/* Heading */}
            <h2
              id="products-heading"
              className="font-cormorant font-semibold text-5xl md:text-6xl lg:text-7xl text-dm-gold-primary mb-6 leading-tight"
            >
              {t('heading')}
            </h2>

            {/* Subtext */}
            <p
              id="products-subtext"
              className="font-cormorant text-dm-white-soft text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-10"
            >
              {t('subtext')}
            </p>

            {/* Stats badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <div className="flex items-center gap-3 border border-dm-gold-primary/20 bg-dm-black-mid/60 backdrop-blur-sm px-6 py-3 rounded-sm">
                <span className="font-cormorant font-bold text-3xl md:text-4xl text-dm-gold-primary">{t('stats_categories')}</span>
                <span className="font-dm-sans text-xs uppercase tracking-[0.15em] text-dm-white-ghost">{t('stats_categories_label')}</span>
              </div>
              <div className="flex items-center gap-3 border border-dm-gold-primary/20 bg-dm-black-mid/60 backdrop-blur-sm px-6 py-3 rounded-sm">
                <span className="font-cormorant font-bold text-3xl md:text-4xl text-dm-gold-primary">{t('stats_designs')}</span>
                <span className="font-dm-sans text-xs uppercase tracking-[0.15em] text-dm-white-ghost">{t('stats_designs_label')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Product Grid ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {PRODUCTS.map((product) => (
            <ProductCard key={product.number} product={product} t={t} />
          ))}
        </div>

        {/* Bottom flourish */}
        <div className="flex items-center justify-center gap-3 mt-16" aria-hidden="true">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-dm-gold-primary/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-dm-gold-primary/30" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-dm-gold-primary/20" />
        </div>
      </div>
    </section>
  );
}

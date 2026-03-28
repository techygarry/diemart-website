'use client';

type DividerVariant = 'line' | 'diamond' | 'dots';

interface SectionDividerProps {
  variant?: DividerVariant;
}

export default function SectionDivider({ variant = 'line' }: SectionDividerProps) {
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

  // Default: gold gradient line
  return (
    <div
      className="h-px mx-auto max-w-[1280px] bg-gradient-to-r from-transparent via-dm-gold-primary/30 to-transparent"
      aria-hidden="true"
    />
  );
}

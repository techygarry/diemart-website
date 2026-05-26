'use client';

import Image from 'next/image';
import DMMonogramSVG from '@/components/preloader/DMMonogramSVG';

export default function PreviewLogoPage() {
  return (
    <div className="min-h-screen bg-[#080704] text-white p-8 flex flex-col items-center gap-16">
      <h1 className="font-dm-sans text-sm uppercase tracking-widest text-[#D4AF37]/60">
        Logo Preview — delete me before shipping
      </h1>

      {/* Side-by-side comparison */}
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="flex flex-col items-center gap-3">
          <span className="font-dm-sans text-xs uppercase tracking-wider text-white/40">
            Reference (PNG)
          </span>
          <div className="w-[400px] h-[300px] flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="DieMart reference logo"
              width={400}
              height={300}
              priority
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="font-dm-sans text-xs uppercase tracking-wider text-white/40">
            Rebuilt (SVG)
          </span>
          <div className="w-[400px] h-[300px] flex items-center justify-center">
            <DMMonogramSVG width={400} height={300} />
          </div>
        </div>
      </div>

      {/* Overlay comparison — SVG on top of PNG at 50% opacity */}
      <div className="flex flex-col items-center gap-3">
        <span className="font-dm-sans text-xs uppercase tracking-wider text-white/40">
          Overlay (PNG dimmed, SVG on top)
        </span>
        <div className="relative w-[400px] h-[300px]">
          <div className="absolute inset-0 opacity-30">
            <Image src="/logo.png" alt="" width={400} height={300} />
          </div>
          <div className="absolute inset-0">
            <DMMonogramSVG width={400} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
}

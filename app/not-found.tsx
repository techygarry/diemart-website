import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080704] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-dm-sans font-light uppercase text-[#D4AF37]/60 text-xs tracking-[0.3em] mb-6">
        Page Not Found
      </p>
      <h1 className="font-cormorant-sc font-bold text-white text-5xl md:text-7xl mb-4">
        404
      </h1>
      <p className="font-cormorant italic text-white/60 text-lg md:text-xl mb-10 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-8 py-3.5 border border-[#D4AF37]/60 text-[#D4AF37] font-dm-sans font-light text-sm uppercase tracking-widest transition-all duration-[350ms] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
      >
        Back to Home
      </Link>
    </div>
  );
}

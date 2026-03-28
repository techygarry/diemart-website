'use client';

import Navigation from '@/components/Navigation';
import TrustBar from '@/components/TrustBar';
import About from '@/components/About';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Legacy from '@/components/Legacy';
import Products from '@/components/Products';
import Stats from '@/components/Stats';
import CatalogTeaser from '@/components/CatalogTeaser';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CustomCursor from '@/components/CustomCursor';
import Hero from '@/components/Hero';
import SectionDivider from '@/components/SectionDivider';

export default function HomePage() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-dm-gold-primary focus:text-dm-black-deep focus:px-4 focus:py-2 focus:font-dm-sans"
      >
        Skip to content
      </a>
      <Navigation />
      <main>
        <Hero />
        <TrustBar />
        <SectionDivider variant="line" />
        <About />
        <SectionDivider variant="diamond" />
        <Services />
        <SectionDivider variant="dots" />
        <Process />
        <SectionDivider variant="line" />
        <Legacy />
        <SectionDivider variant="diamond" />
        <Products />
        <SectionDivider variant="line" />
        <Stats />
        <SectionDivider variant="dots" />
        <CatalogTeaser />
        <SectionDivider variant="diamond" />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CustomCursor />
    </>
  );
}

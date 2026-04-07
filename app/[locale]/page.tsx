'use client';

import Navigation from '@/components/Navigation';
import About from '@/components/About';
import Services from '@/components/Services';
import DieViewer3D from '@/components/DieViewer3D';
import GlobalReach from '@/components/GlobalReach';
import Products from '@/components/Products';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CustomCursor from '@/components/CustomCursor';
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <>
      <a
        href="#story"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-dm-gold-primary focus:text-dm-black-deep focus:px-4 focus:py-2 focus:font-dm-sans"
      >
        Skip to content
      </a>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Products />
        <Services />
        <DieViewer3D />
        <GlobalReach />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CustomCursor />
    </>
  );
}

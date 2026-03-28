'use client';

import Navigation from '@/components/Navigation';
import About from '@/components/About';
import Legacy from '@/components/Legacy';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-[72px]">
        <About />
        <Legacy />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

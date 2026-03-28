'use client';

import Navigation from '@/components/Navigation';
import PageHero from '@/components/PageHero';
import About from '@/components/About';
import Legacy from '@/components/Legacy';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-[72px]">
        <PageHero
          label="OUR STORY"
          title="About Die Mart"
          subtitle="Rooted in Craft Since 1980"
        />
        <About />
        <Legacy />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

'use client';

import Navigation from '@/components/Navigation';
import PageHero from '@/components/PageHero';
import Process from '@/components/Process';
import Services from '@/components/Services';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function ProcessPage() {
  return (
    <>
      <Navigation />
      <main className="pt-[72px]">
        <PageHero
          label="THE JOURNEY"
          title="Our Process"
          subtitle="From Order to Dispatch"
        />
        <Process />
        <Services />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

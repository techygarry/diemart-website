'use client';

import Navigation from '@/components/Navigation';
import Process from '@/components/Process';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function ProcessPage() {
  return (
    <>
      <Navigation />
      <main className="pt-[72px]">
        <Process />
        <Services />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

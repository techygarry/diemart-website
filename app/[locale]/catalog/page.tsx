'use client';

import Navigation from '@/components/Navigation';
import PageHero from '@/components/PageHero';
import CatalogTeaser from '@/components/CatalogTeaser';
import Products from '@/components/Products';
import Stats from '@/components/Stats';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function CatalogPage() {
  return (
    <>
      <Navigation />
      <main className="pt-[72px]">
        <PageHero
          label="OUR ARCHIVE"
          title="Catalog"
          subtitle="3,600+ Designs"
        />
        <CatalogTeaser />
        <Products />
        <Stats />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

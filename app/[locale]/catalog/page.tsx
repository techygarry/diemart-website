'use client';

import Navigation from '@/components/Navigation';
import Products from '@/components/Products';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function CatalogPage() {
  return (
    <>
      <Navigation />
      <main className="pt-[72px]">
        <Products />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

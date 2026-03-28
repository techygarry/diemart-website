'use client';

import Navigation from '@/components/Navigation';
import DieViewer3D from '@/components/DieViewer3D';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CustomCursor from '@/components/CustomCursor';

export default function ViewerPage() {
  return (
    <>
      <Navigation />
      <main className="pt-[72px]">
        <DieViewer3D />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CustomCursor />
    </>
  );
}

'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';

const DieViewer3D = dynamic(() => import('@/components/DieViewer3D'), {
  ssr: false,
  loading: () => (
    <section className="relative py-[100px] bg-dm-black-deep min-h-[60vh]" aria-hidden="true" />
  ),
});
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

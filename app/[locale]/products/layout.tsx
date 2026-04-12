import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products — Jewellery Dies | Bangle, Flower, Cutting, Emboss Dies',
  description:
    'Die Mart manufactures 30+ categories of jewellery dies — bangle, flower, thappad, cutting, emboss, and custom dies. Hardened tool steel, ±0.01mm tolerance, 5-7 day turnaround.',
  openGraph: {
    title: 'Die Mart Products — Precision Jewellery Dies',
    description:
      'Bangle, flower, cutting, emboss, and custom dies. 25,000+ designs in archive.',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

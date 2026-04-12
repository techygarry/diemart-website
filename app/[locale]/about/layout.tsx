import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Die Mart — Our Story | Jewellery Die Manufacturers',
  description:
    'Die Mart was built by Elyas Nagavadria — from the slums of Kurla to 3 factories in Chinchani. 30+ years of jewellery die craftsmanship, 3,600+ designs, 100+ karigars.',
  openGraph: {
    title: 'About Die Mart — Our Story',
    description:
      'From nothing to 3 factories. The story of Elyas Nagavadria and Die Mart.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

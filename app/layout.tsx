import type { Metadata } from 'next';
import { Cormorant_SC, Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { SEO } from '@/lib/brand';

const cormorantSC = Cormorant_SC({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-cormorant-sc',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  metadataBase: new URL(SEO.canonical),
  alternates: { canonical: SEO.canonical },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: SEO.canonical,
    siteName: 'Die Mart',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SEO.jsonLd) }}
        />
      </head>
      <body className={`${cormorantSC.variable} ${cormorantGaramond.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

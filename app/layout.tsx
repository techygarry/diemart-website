import type { Metadata } from 'next';
import { Cormorant_SC, Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { SEO } from '@/lib/brand';
import ThemeProvider from '@/components/ThemeProvider';
import { Analytics } from '@vercel/analytics/react';

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
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  const locale = params?.locale || 'en';
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D4AF37" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){try{
  if(sessionStorage.getItem('dm_preloader_seen'))return;
  var p=location.pathname;
  var onHome=p==='/'||/^\\/(en|hi|ar)\\/?$/.test(p);
  if(!onHome)return;
  var d=document.createElement('div');
  d.id='dm-preflash';
  d.setAttribute('aria-hidden','true');
  d.style.cssText='position:fixed;inset:0;background:#080704;z-index:9999;';
  (document.body||document.documentElement).appendChild(d);
  window.__dmPreflashActive=true;
}catch(e){}})();
            `.trim(),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SEO.jsonLd) }}
        />
      </head>
      <body className={`${cormorantSC.variable} ${cormorantGaramond.variable} ${dmSans.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

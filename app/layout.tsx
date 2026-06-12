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
  keywords: [...SEO.keywords],
  alternates: { canonical: SEO.canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: SEO.canonical,
    siteName: 'Die Mart',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: SEO.ogImage.url,
        width: SEO.ogImage.width,
        height: SEO.ogImage.height,
        alt: SEO.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
    images: [SEO.ogImage.url],
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
        {/* First hero frame — the only asset the landing waits for */}
        <link
          rel="preload"
          as="image"
          href="/sequence/dis/frame_0001.webp"
          media="(min-width: 768px)"
        />
        <link
          rel="preload"
          as="image"
          href="/sequence/dis-mobile/frame_0001.webp"
          media="(max-width: 767px)"
        />
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
  d.style.cssText='position:fixed;inset:0;background:#080704;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;';
  d.innerHTML='<div style="text-align:center"><p style="font-family:Cormorant Garamond,Cormorant,serif;font-size:28px;color:#D4AF37;letter-spacing:0.15em;margin:0 0 24px">DIE MART</p><div style="width:120px;height:1px;background:rgba(212,175,55,0.2);margin:0 auto;overflow:hidden;border-radius:1px"><div id="dm-preflash-bar" style="width:0%;height:100%;background:#D4AF37;transition:width 0.3s ease"></div></div><p id="dm-preflash-pct" style="font-family:sans-serif;font-size:11px;color:rgba(212,175,55,0.5);margin-top:12px;letter-spacing:0.2em">0%</p></div>';
  (document.body||document.documentElement).appendChild(d);
  window.__dmPreflashActive=true;
  setTimeout(function(){var el=document.getElementById('dm-preflash');if(el){el.style.transition='opacity 0.5s ease';el.style.opacity='0';setTimeout(function(){el.remove();},500);}},7000);
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

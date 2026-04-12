import type { MetadataRoute } from 'next';

const BASE_URL = 'https://diemart.co.in';
const LOCALES = ['en', 'hi', 'ar'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Homepage for each locale
  const homePages = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 1,
  }));

  // Sub-pages for each locale
  const SUB_PAGES = ['about', 'products', 'services', 'contact'];
  const subPages = LOCALES.flatMap((locale) =>
    SUB_PAGES.map((page) => ({
      url: `${BASE_URL}/${locale}/${page}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  // Root URL
  const root = {
    url: BASE_URL,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 1,
  };

  return [root, ...homePages, ...subPages];
}

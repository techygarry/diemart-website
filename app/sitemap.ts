import type { MetadataRoute } from 'next';

const BASE_URL = 'https://diemart.co.in';
const LOCALES = ['en', 'hi', 'ar'] as const;

type RouteDef = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
};

const ROUTES: RouteDef[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/products', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/catalog', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/process', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/viewer', changeFrequency: 'monthly', priority: 0.6 },
];

function languageAlternates(path: string): Record<string, string> {
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, `${BASE_URL}/${locale}${path}`])
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${BASE_URL}/${locale}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: locale === 'en' ? route.priority : route.priority - 0.1,
      alternates: {
        languages: languageAlternates(route.path),
      },
    }))
  );
}

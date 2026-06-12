import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  return pageMetadata(locale, 'about');
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

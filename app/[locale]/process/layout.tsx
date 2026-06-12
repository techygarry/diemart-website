import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  return pageMetadata(locale, 'process');
}

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return children;
}

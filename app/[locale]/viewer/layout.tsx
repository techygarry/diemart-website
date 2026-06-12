import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  return pageMetadata(locale, 'viewer');
}

export default function ViewerLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Die Mart — Get in Touch | WhatsApp, Email, Visit',
  description:
    'Contact Die Mart for jewellery die inquiries. WhatsApp: +91 7499749770. Response within 4 hours. Visit our factory in Chinchani, Tarapur, Maharashtra.',
  openGraph: {
    title: 'Contact Die Mart',
    description:
      'Reach us on WhatsApp, email, or visit our Chinchani factory. We respond within 4 hours.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

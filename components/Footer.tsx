'use client';

import { useTranslations, useLocale } from 'next-intl';
import { BRAND } from '@/lib/brand';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const FOOTER_LINKS = [
  { key: 'craft', page: '/services' },
  { key: 'about', page: '/about' },
  { key: 'services', page: '/services' },
  { key: 'legacy', page: '/legacy' },
  { key: 'products', page: '/products' },
  { key: 'contact', page: '/contact' },
] as const;

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: BRAND.instagramUrl,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
] as const;

export default function Footer() {
  const tFooter = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  return (
    <footer className="bg-dm-black-warm" role="contentinfo">
      {/* Gold separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-dm-gold-primary/40 to-transparent" />

      <div className="mx-auto max-w-[var(--container-max)] px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <a
              href={`/${locale}`}
              className="inline-block"
            >
              <img src="/logo.png" alt="Die Mart" className="h-12 w-auto" />
            </a>
            <p className="mt-3 font-cormorant text-base italic text-dm-white-ghost leading-relaxed">
              {tFooter('tagline')}
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex items-center justify-center min-w-[48px] min-h-[48px]
                             text-dm-white-ghost transition-all duration-[var(--duration-hover)]
                             hover:text-dm-gold-primary hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-dm-sans text-[11px] font-medium uppercase tracking-[0.2em] text-dm-gold-muted mb-5">
              {tFooter('quick_links')}
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {FOOTER_LINKS.map(({ key, page }) => (
                <li key={key}>
                  <a
                    href={`/${locale}${page}`}
                    className="font-dm-sans text-sm text-dm-white-soft
                               transition-colors duration-[var(--duration-hover)]
                               hover:text-dm-gold-primary"
                  >
                    {tNav(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact via WhatsApp */}
          <div>
            <h3 className="font-dm-sans text-[11px] font-medium uppercase tracking-[0.2em] text-dm-gold-muted mb-5">
              {tFooter('get_in_touch')}
            </h3>
            <a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-dm-sans text-sm text-dm-white-soft
                         transition-colors duration-[var(--duration-hover)]
                         hover:text-dm-gold-primary"
            >
              {/* WhatsApp icon */}
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {tFooter('chat_whatsapp')}
            </a>
            <p className="mt-4 font-dm-sans text-xs text-dm-white-ghost">
              {BRAND.location}
            </p>
            <p className="mt-1 font-dm-sans text-xs text-dm-white-ghost">
              {BRAND.hours}
            </p>
          </div>

          {/* Column 4: Language */}
          <div>
            <h3 className="font-dm-sans text-[11px] font-medium uppercase tracking-[0.2em] text-dm-gold-muted mb-5">
              {tFooter('language')}
            </h3>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-dm-gold-muted/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-dm-sans text-xs text-dm-white-ghost text-center md:text-start">
            {tFooter('copyright')}
          </p>
          <a
            href={BRAND.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm-sans text-xs text-dm-white-ghost
                       transition-colors duration-[var(--duration-hover)]
                       hover:text-dm-gold-primary"
          >
            {BRAND.domain}
          </a>
        </div>
      </div>
    </footer>
  );
}

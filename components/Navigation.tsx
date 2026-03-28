'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { BRAND } from '@/lib/brand';

const NAV_SECTIONS = [
  { key: 'craft', href: '#services', page: '/services' },
  { key: 'about', href: '#about', page: '/about' },
  { key: 'services', href: '#services', page: '/services' },
  { key: 'legacy', href: '#legacy', page: '/legacy' },
  { key: 'products', href: '#products', page: '/products' },
  { key: 'contact', href: '#contact', page: '/contact' },
] as const;

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Determine if we're on the homepage (pathname is just /<locale> or /<locale>/)
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  // Track scroll for background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false);
    }
    if (mobileOpen) {
      document.addEventListener('keydown', handleKey);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    () => {
      setMobileOpen(false);
    },
    []
  );

  const getNavHref = (_href: string, page: string) => {
    return `/${locale}${page}`; // always navigate to dedicated page
  };

  const isActive = (_href: string, page: string) => {
    // Check if current pathname matches the page route
    return pathname === `/${locale}${page}` || pathname === `/${locale}${page}/`;
  };

  const logoHref = isHomePage ? '#' : `/${locale}`;

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // On other pages, let the link navigate to homepage
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 inset-inline-start-0 inset-inline-end-0 z-40
                    transition-all duration-500 ease-luxury
                    ${
                      scrolled
                        ? 'bg-dm-black-deep/90 backdrop-blur-md shadow-[0_1px_0_rgba(212,175,55,0.08)]'
                        : 'bg-transparent'
                    }`}
        style={{ height: 'var(--nav-height)' }}
      >
        <div className="mx-auto flex h-full max-w-[var(--container-max)] items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <a
            href={logoHref}
            onClick={handleLogoClick}
            className="transition-opacity duration-[var(--duration-hover)] hover:opacity-80"
            aria-label="Die Mart - Back to top"
          >
            <img src="/logo.png" alt="Die Mart" className="h-10 md:h-12 w-auto" />
          </a>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-8" role="list">
            {NAV_SECTIONS.map(({ key, href, page }) => (
              <li key={key}>
                <a
                  href={getNavHref(href, page)}
                  onClick={() => handleNavClick()}
                  className={`relative font-dm-sans text-[13px] font-medium uppercase tracking-[0.15em]
                             transition-colors duration-[var(--duration-hover)]
                             ${
                               isActive(href, page)
                                 ? 'text-dm-gold-primary'
                                 : 'text-dm-white-soft hover:text-dm-gold-primary'
                             }`}
                >
                  {t(key)}
                  {/* Active underline */}
                  <span
                    className={`absolute -bottom-1 inset-inline-start-0 h-px bg-dm-gold-primary
                               transition-all duration-300 ease-luxury
                               ${isActive(href, page) ? 'inset-inline-end-0' : 'inset-inline-end-full'}`}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop right: Language + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <LanguageSwitcher />
            <a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-dm-sans text-[12px] font-medium uppercase tracking-[0.15em]
                         border border-dm-gold-primary/60 text-dm-gold-primary
                         rounded px-4 py-2
                         transition-all duration-[var(--duration-hover)]
                         hover:bg-dm-gold-primary/10 hover:border-dm-gold-primary"
            >
              {t('contact')}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden relative z-50 flex h-12 w-12 flex-col items-center justify-center gap-[5px]"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block h-[1.5px] w-5 bg-dm-gold-primary transition-all duration-300
                         ${mobileOpen ? 'translate-y-[6.5px] rotate-45' : ''}`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-dm-gold-primary transition-all duration-300
                         ${mobileOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-dm-gold-primary transition-all duration-300
                         ${mobileOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile slide-in panel */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-dm-black-deep/60 backdrop-blur-sm
                    transition-opacity duration-300 lg:hidden
                    ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 inset-inline-end-0 z-40 h-full w-[280px]
                    bg-dm-black-deep/98 backdrop-blur-xl
                    border-s border-dm-gold-muted/10
                    transition-transform duration-500 ease-luxury lg:hidden
                    ${mobileOpen ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'}`}
        aria-label="Mobile navigation"
      >
        <div className="flex h-full flex-col px-8 pt-24 pb-10">
          <ul className="flex flex-col gap-1" role="list">
            {NAV_SECTIONS.map(({ key, href, page }, i) => (
              <li key={key}>
                <a
                  href={getNavHref(href, page)}
                  onClick={() => handleNavClick()}
                  className={`block py-3 font-dm-sans text-[15px] font-medium uppercase tracking-[0.12em]
                             transition-all duration-300
                             ${
                               isActive(href, page)
                                 ? 'text-dm-gold-primary'
                                 : 'text-dm-white-soft hover:text-dm-gold-primary hover:ps-2'
                             }`}
                  style={{
                    animationDelay: mobileOpen ? `${i * 60}ms` : '0ms',
                  }}
                >
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-5">
            {/* Language switcher in mobile */}
            <div className="border-t border-dm-gold-muted/10 pt-5">
              <LanguageSwitcher />
            </div>

            {/* WhatsApp CTA */}
            <a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2
                         font-dm-sans text-[13px] font-medium uppercase tracking-[0.12em]
                         border border-dm-gold-primary/60 text-dm-gold-primary
                         rounded py-3
                         transition-all duration-[var(--duration-hover)]
                         hover:bg-dm-gold-primary/10"
            >
              {/* WhatsApp icon */}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t('contact')}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

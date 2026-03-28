'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { BRAND } from '@/lib/brand';

const NAV_SECTIONS = [
  { key: 'about', href: '#story', page: '/about' },
  { key: 'products', href: '#products', page: '/products' },
  { key: 'services', href: '#services', page: '/services' },
  { key: '3d_viewer', href: '#viewer', page: '/viewer' },
  { key: 'legacy', href: '#legacy', page: '/legacy' },
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
        className={`fixed top-0 left-0 right-0 w-full z-40
                    transition-all duration-500 ease-luxury
                    ${
                      scrolled
                        ? 'bg-dm-black-deep/90 backdrop-blur-md shadow-[0_1px_0_rgba(212,175,55,0.08)]'
                        : 'bg-transparent'
                    }`}
        style={{ height: 'var(--nav-height)' }}
      >
        <div className="w-full flex h-full items-center justify-between px-6 lg:px-10">
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
              href={`/${locale}/contact`}
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
        className={`fixed inset-0 z-[42] bg-dm-black-deep/60 backdrop-blur-sm
                    transition-opacity duration-300 lg:hidden
                    ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 z-[45] h-full w-[280px]
                    bg-dm-black-deep backdrop-blur-xl
                    border-l border-dm-gold-muted/10
                    transition-transform duration-500 ease-luxury lg:hidden
                    ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
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

            {/* Contact CTA */}
            <a
              href={`/${locale}/contact`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2
                         font-dm-sans text-[13px] font-medium uppercase tracking-[0.12em]
                         border border-dm-gold-primary/60 text-dm-gold-primary
                         rounded py-3
                         transition-all duration-[var(--duration-hover)]
                         hover:bg-dm-gold-primary/10"
            >
              {t('contact')}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

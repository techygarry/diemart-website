'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const LOCALES = ['en', 'hi', 'ar'] as const;
type Locale = (typeof LOCALES)[number];

const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  hi: '\u0939\u093f',
  ar: 'AR',
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('language');

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const switchLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) {
        setOpen(false);
        return;
      }

      // Save preference to localStorage
      try {
        localStorage.setItem('dm-locale', newLocale);
      } catch {
        // Storage may be unavailable
      }

      // Strip current locale prefix and navigate to same page in new locale
      const segments = pathname.split('/');
      // If path starts with /en, /hi, /ar remove it
      if (LOCALES.includes(segments[1] as Locale)) {
        segments.splice(1, 1);
      }
      const newPath = `/${newLocale}${segments.join('/') || ''}`;
      router.push(newPath);
      setOpen(false);
    },
    [locale, pathname, router]
  );

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Language: ${LOCALE_LABELS[locale]}`}
        className="flex items-center gap-1.5 font-dm-sans text-sm text-dm-white-soft
                   border border-transparent hover:border-dm-gold-primary/50
                   rounded px-2.5 py-1.5 transition-colors duration-[var(--duration-hover)]
                   focus-visible:outline-2 focus-visible:outline-dm-gold-primary"
      >
        <span>{LOCALE_LABELS[locale]}</span>
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute top-full mt-1 inset-inline-end-0
                     min-w-[72px] rounded border border-dm-gold-muted/30
                     bg-dm-black-deep/95 backdrop-blur-md shadow-lg
                     py-1 z-50 animate-fade-up"
          style={{ animationDuration: '0.2s' }}
        >
          {LOCALES.map((loc) => (
            <li key={loc}>
              <button
                role="option"
                aria-selected={loc === locale}
                onClick={() => switchLocale(loc)}
                className={`w-full text-start px-3 py-1.5 font-dm-sans text-sm
                           transition-colors duration-200 cursor-pointer
                           ${
                             loc === locale
                               ? 'text-dm-gold-primary bg-dm-gold-primary/10'
                               : 'text-dm-white-soft hover:text-dm-gold-primary hover:bg-dm-white-soft/5'
                           }`}
              >
                {LOCALE_LABELS[loc]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

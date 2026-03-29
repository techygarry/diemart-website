import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dm-black': {
          deep: 'var(--black-deep)',
          warm: 'var(--black-warm)',
          mid: 'var(--black-mid)',
          light: 'var(--black-light)',
        },
        'dm-gold': {
          primary: 'var(--gold-primary)',
          bright: 'var(--gold-bright)',
          muted: 'var(--gold-muted)',
        },
        'dm-white': {
          warm: 'var(--white-warm)',
          soft: 'var(--white-soft)',
          ghost: 'var(--white-ghost)',
        },
      },
      fontFamily: {
        'cormorant-sc': ['var(--font-cormorant-sc)', 'serif'],
        'cormorant': ['var(--font-cormorant)', 'serif'],
        'dm-sans': ['var(--font-dm-sans)', 'sans-serif'],
      },
      animation: {
        'trust-scroll': 'trust-scroll 30s linear infinite',
        'pulse-glow': 'pulse-glow 8s ease-in-out infinite',
        'chevron-bounce': 'chevron-bounce 2s ease-in-out infinite',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
        'dot-pulse': 'dot-pulse 2s ease-in-out infinite',
        'gold-shimmer': 'gold-shimmer 2s ease-in-out infinite',
        'gold-particle': 'gold-particle 3s ease-in-out infinite',
      },
      keyframes: {
        'trust-scroll': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'pulse-glow': { '0%, 100%': { boxShadow: '0 0 20px rgba(37,211,102,0.3)' }, '50%': { boxShadow: '0 0 40px rgba(37,211,102,0.6)' } },
        'chevron-bounce': { '0%, 100%': { transform: 'translateY(0)', opacity: '1' }, '50%': { transform: 'translateY(8px)', opacity: '0.6' } },
        'fade-up': { '0%': { transform: 'translateY(40px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        'gold-line-draw': { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
        'dot-pulse': { '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,175,55,0.4)' }, '50%': { boxShadow: '0 0 0 8px rgba(212,175,55,0)' } },
        'gold-shimmer': { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
        'gold-particle': { '0%, 100%': { opacity: '0.3', transform: 'scale(1)' }, '50%': { opacity: '1', transform: 'scale(1.5)' } },
      },
      transitionTimingFunction: { 'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
export default config;

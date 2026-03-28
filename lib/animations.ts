'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function animateHeading(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  const text = el.textContent || '';
  el.textContent = '';
  el.setAttribute('aria-label', text);
  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00a0' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(20px)';
    el.appendChild(span);
  });
  gsap.to(el.querySelectorAll('span'), {
    opacity: 1,
    y: 0,
    stagger: 0.03,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
}

export function animateFadeUp(selector: string, delay = 0) {
  gsap.from(selector, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay,
    immediateRender: false,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: selector,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
}

export function animateGoldLine(selector: string) {
  gsap.from(selector, {
    scaleX: 0,
    transformOrigin: 'center center',
    duration: 1.2,
    immediateRender: false,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: selector,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
}

export function animateHeroOverlay() {
  const tl = gsap.timeline({ delay: 0.5 });
  tl.from('.hero-location', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.out' })
    .from('.hero-title', { opacity: 0, scale: 0.9, duration: 0.8, ease: 'power2.out' }, '-=0.3')
    .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    .from('.hero-stats', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .from('.hero-cta', { opacity: 0, y: 20, duration: 0.5, stagger: 0.15, ease: 'power2.out' }, '-=0.2')
    .from('.hero-established', { opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
    .from('.hero-scroll-indicator', { opacity: 0, y: -10, duration: 0.6, ease: 'power2.out' }, '-=0.1');
  return tl;
}

export function animateFormStep(direction: 'left' | 'right', ref: HTMLElement) {
  const xFrom = direction === 'left' ? -60 : 60;
  gsap.fromTo(ref, { opacity: 0, x: xFrom }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
}

export function createScrollTrigger(trigger: string | Element, animation: gsap.core.Timeline | gsap.core.Tween) {
  ScrollTrigger.create({
    trigger,
    start: 'top 80%',
    toggleActions: 'play none none none',
    animation,
  });
}

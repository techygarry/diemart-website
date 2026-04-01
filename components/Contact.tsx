'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';

/* ─────────────────────── types ─────────────────────── */
interface FormData {
  inquiry_type: string;
  name: string;
  email: string;
  country: string;
  requirement: string;
}

const INITIAL_DATA: FormData = {
  inquiry_type: '',
  name: '',
  email: '',
  country: '',
  requirement: '',
};

const INQUIRY_OPTIONS = [
  'option_bangle',
  'option_decorative',
  'option_custom',
  'option_general',
] as const;

const TOTAL_STEPS = 5;

/* ─────────────────── checkmark SVG ─────────────────── */
function AnimatedCheckmark() {
  return (
    <svg
      className="mx-auto mb-6"
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="36"
        cy="36"
        r="33"
        stroke="#D4AF37"
        strokeWidth="2"
        fill="none"
        className="animate-draw-circle"
        style={{
          strokeDasharray: 208,
          strokeDashoffset: 208,
          animation: 'draw-circle 0.6s ease-out forwards',
        }}
      />
      <path
        d="M22 36L32 46L50 28"
        stroke="#D4AF37"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{
          strokeDasharray: 44,
          strokeDashoffset: 44,
          animation: 'draw-check 0.4s ease-out 0.5s forwards',
        }}
      />
      <style>{`
        @keyframes draw-circle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes draw-check {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}

/* ─────────────────── step dots ──────────────────────── */
function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total} aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const isActive = step <= current;
        return (
          <span
            key={step}
            className={`block h-2 rounded-full transition-all duration-500 ${
              isActive
                ? 'w-6 bg-dm-gold-primary'
                : 'w-2 bg-dm-black-light'
            }`}
          />
        );
      })}
    </div>
  );
}

/* ─────────────────── main component ─────────────────── */
export default function Contact() {
  const t = useTranslations('contact');

  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [animating, setAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* ── auto-focus inputs on step change ── */
  useEffect(() => {
    if (animating) return;
    const timer = setTimeout(() => {
      if (step === 2) nameRef.current?.focus();
      if (step === 3) emailRef.current?.focus();
      if (step === 4) countryRef.current?.focus();
      if (step === 5) textareaRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [step, animating]);

  /* ── transition helper ── */
  const goTo = useCallback(
    (next: number) => {
      if (animating || next < 1 || next > TOTAL_STEPS) return;
      setDirection(next > step ? 'left' : 'right');
      setAnimating(true);
      setTimeout(() => {
        setStep(next);
        setAnimating(false);
      }, 350);
    },
    [step, animating],
  );

  /* ── validation helpers ── */
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canAdvance = (): boolean => {
    switch (step) {
      case 1:
        return data.inquiry_type !== '';
      case 2:
        return data.name.trim().length > 0;
      case 3:
        return isValidEmail(data.email);
      case 4:
        return data.country.trim().length > 0;
      case 5:
        return true;
      default:
        return false;
    }
  };

  /* ── keyboard: Enter to advance ── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && step >= 2 && step <= 4 && canAdvance()) {
        e.preventDefault();
        if (step === 3 && !isValidEmail(data.email)) {
          setEmailError('Please enter a valid email address');
          return;
        }
        goTo(step + 1);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step, data, goTo],
  );

  /* ── handle next click ── */
  const handleNext = () => {
    if (step === 3 && !isValidEmail(data.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    if (canAdvance()) goTo(step + 1);
  };

  /* ── handle back click ── */
  const handleBack = () => {
    setEmailError('');
    goTo(step - 1);
  };

  /* ── submit ── */
  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiry_type: data.inquiry_type,
          name: data.name.trim(),
          email: data.email.trim(),
          country: data.country.trim(),
          requirement: data.requirement.trim(),
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || 'Failed to submit');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ── WhatsApp link ── */
  const waLink = `https://wa.me/917499749770?text=${encodeURIComponent(
    `Hi Die Mart, I found you on diemart.co.in and I'm interested in ${data.inquiry_type}`,
  )}`;

  /* ── select inquiry type (step 1) ── */
  const selectInquiry = (type: string) => {
    setData((prev) => ({ ...prev, inquiry_type: type }));
    setTimeout(() => goTo(2), 200);
  };

  /* ── slide animation classes ── */
  const slideClass = animating
    ? direction === 'left'
      ? 'translate-x-[-40px] opacity-0'
      : 'translate-x-[40px] opacity-0'
    : 'translate-x-0 opacity-100';

  /* ────────────────────── THANK YOU SCREEN ────────────────────── */
  if (submitted) {
    return (
      <section id="contact" className="py-[120px] px-4">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedCheckmark />

          <h2 className="font-cormorant font-semibold text-4xl md:text-5xl text-dm-gold-primary mb-4">
            {t('thank_you_title')}
          </h2>

          <p className="font-cormorant text-dm-white-soft text-lg mb-10 max-w-md mx-auto">
            {t('thank_you_message')}
          </p>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-dm-gold-primary text-dm-black-deep
                       font-dm-sans font-medium px-8 py-4 rounded-sm min-h-[48px]
                       hover:bg-dm-gold-bright transition-colors duration-300"
          >
            {/* WhatsApp icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t('whatsapp_cta')}
          </a>
        </div>
      </section>
    );
  }

  /* ────────────────────── FORM ────────────────────── */
  return (
    <section id="contact" className="py-[120px] px-4" aria-labelledby="contact-heading">
      <div className="max-w-2xl mx-auto">
        {/* ── Section heading ── */}
        <h2 id="contact-heading" className="font-cormorant font-semibold text-4xl md:text-5xl text-dm-gold-primary text-center mb-3">
          {t('heading')}
        </h2>
        <p className="font-cormorant text-dm-white-soft text-center mb-12 text-lg">
          {t('subtext')}
        </p>

        {/* ── Step dots ── */}
        <StepDots current={step} total={TOTAL_STEPS} />

        {/* ── Step content (animated container) ── */}
        <div
          className={`transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${slideClass}`}
          onKeyDown={handleKeyDown}
        >
          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div>
              <h3 className="font-cormorant font-semibold text-2xl md:text-3xl text-dm-white-warm text-center mb-8">
                {t('step1_question')}
              </h3>

              <div className="grid grid-cols-2 gap-4" role="radiogroup" aria-label={t('step1_question')}>
                {INQUIRY_OPTIONS.map((key) => {
                  const label = t(key);
                  const selected = data.inquiry_type === label;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => selectInquiry(label)}
                      className={`p-6 text-center rounded-sm cursor-pointer min-h-[48px]
                                  font-cormorant text-lg transition-all duration-300
                                  ${
                                    selected
                                      ? 'border border-dm-gold-primary glow-gold text-dm-gold-primary bg-dm-black-mid'
                                      : 'border border-dm-black-light bg-dm-black-mid text-dm-white-soft hover:border-dm-gold-muted hover:text-dm-white-warm'
                                  }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div>
              <h3 className="font-cormorant font-semibold text-2xl md:text-3xl text-dm-white-warm text-center mb-8">
                {t('step2_question')}
              </h3>

              <label htmlFor="contact-name" className="sr-only">
                {t('step2_placeholder')}
              </label>
              <input
                ref={nameRef}
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder={t('step2_placeholder')}
                value={data.name}
                onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-transparent border-b-2 border-dm-gold-primary/40 focus:border-dm-gold-primary
                           text-dm-white-warm font-cormorant text-xl py-3 w-full outline-none
                           placeholder:text-dm-white-ghost transition-colors duration-300"
              />
            </div>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <div>
              <h3 className="font-cormorant font-semibold text-2xl md:text-3xl text-dm-white-warm text-center mb-8">
                {t('step3_question')}
              </h3>

              <label htmlFor="contact-email" className="sr-only">
                {t('step3_placeholder')}
              </label>
              <input
                ref={emailRef}
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder={t('step3_placeholder')}
                value={data.email}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, email: e.target.value }));
                  if (emailError) setEmailError('');
                }}
                aria-describedby={emailError ? 'email-error' : undefined}
                aria-invalid={emailError ? true : undefined}
                className={`bg-transparent border-b-2 focus:border-dm-gold-primary
                           text-dm-white-warm font-cormorant text-xl py-3 w-full outline-none
                           placeholder:text-dm-white-ghost transition-colors duration-300
                           ${emailError ? 'border-red-400' : 'border-dm-gold-primary/40'}`}
              />
              {emailError && (
                <p id="email-error" className="mt-2 font-dm-sans text-sm text-red-400" role="alert">
                  {emailError}
                </p>
              )}
            </div>
          )}

          {/* ── STEP 4 ── */}
          {step === 4 && (
            <div>
              <h3 className="font-cormorant font-semibold text-2xl md:text-3xl text-dm-white-warm text-center mb-8">
                {t('step4_question')}
              </h3>

              <label htmlFor="contact-country" className="sr-only">
                {t('step4_placeholder')}
              </label>
              <input
                ref={countryRef}
                id="contact-country"
                type="text"
                autoComplete="country-name"
                placeholder={t('step4_placeholder')}
                value={data.country}
                onChange={(e) => setData((prev) => ({ ...prev, country: e.target.value }))}
                className="bg-transparent border-b-2 border-dm-gold-primary/40 focus:border-dm-gold-primary
                           text-dm-white-warm font-cormorant text-xl py-3 w-full outline-none
                           placeholder:text-dm-white-ghost transition-colors duration-300"
              />
            </div>
          )}

          {/* ── STEP 5 ── */}
          {step === 5 && (
            <div>
              <h3 className="font-cormorant font-semibold text-2xl md:text-3xl text-dm-white-warm text-center mb-8">
                {t('step5_question')}
              </h3>

              <label htmlFor="contact-requirement" className="sr-only">
                {t('step5_placeholder')}
              </label>
              <textarea
                ref={textareaRef}
                id="contact-requirement"
                rows={4}
                placeholder={t('step5_placeholder')}
                value={data.requirement}
                onChange={(e) => setData((prev) => ({ ...prev, requirement: e.target.value }))}
                className="bg-transparent border-2 border-dm-gold-primary/40 focus:border-dm-gold-primary
                           text-dm-white-warm font-cormorant text-lg p-4 w-full outline-none resize-none
                           rounded-sm placeholder:text-dm-white-ghost transition-colors duration-300"
              />

              {error && (
                <p id="submit-error" className="mt-3 font-dm-sans text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── Navigation buttons ── */}
        {step >= 1 && (
          <div className="flex items-center justify-between mt-10">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={animating}
                className="font-dm-sans text-dm-white-soft hover:text-dm-white-warm
                           transition-colors duration-300 min-h-[48px] px-4 py-3"
              >
                {t('back')}
              </button>
            ) : (
              <span />
            )}

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canAdvance() || animating}
                className="bg-dm-gold-primary text-dm-black-deep font-dm-sans font-medium
                           px-6 py-3 min-h-[48px] rounded-sm
                           hover:bg-dm-gold-bright transition-colors duration-300
                           disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t('next')}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || animating}
                aria-describedby={error ? 'submit-error' : undefined}
                className="bg-dm-gold-primary text-dm-black-deep font-dm-sans font-medium
                           px-6 py-3 min-h-[48px] rounded-sm
                           hover:bg-dm-gold-bright transition-colors duration-300
                           disabled:opacity-40 disabled:cursor-not-allowed
                           flex items-center gap-2"
              >
                {submitting && (
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-25"
                    />
                    <path
                      d="M4 12a8 8 0 018-8"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="opacity-75"
                    />
                  </svg>
                )}
                {t('submit')}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

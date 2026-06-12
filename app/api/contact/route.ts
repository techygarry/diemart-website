import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter: max 5 requests per 60 s per IP.
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

// Must match INQUIRY_OPTIONS in components/Contact.tsx.
const ALLOWED_INQUIRY_TYPES = new Set([
  'option_bangle',
  'option_decorative',
  'option_custom',
  'option_general',
]);

const rateLimitMap = new Map<string, number[]>();

// Periodically purge stale entries so the map doesn't grow forever.
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((timestamps, ip) => {
    const recent = timestamps.filter((t: number) => now - t < RATE_LIMIT_WINDOW_MS);
    if (recent.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, recent);
    }
  });
}, RATE_LIMIT_WINDOW_MS);

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    // --- Rate limiting ---------------------------------------------------
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // --- Parse & validate ------------------------------------------------
    const body = await request.json();
    const { inquiry_type, name, email, country, requirement } = body;

    if (
      typeof name !== 'string' ||
      name.trim().length === 0 ||
      typeof email !== 'string' ||
      email.trim().length === 0
    ) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    if (typeof inquiry_type !== 'string' || !ALLOWED_INQUIRY_TYPES.has(inquiry_type)) {
      return NextResponse.json(
        { error: 'Invalid inquiry type' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // --- Sanitize: enforce max lengths -----------------------------------
    const sanitized = {
      inquiry_type: String(inquiry_type).slice(0, 100),
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 320),
      country: country ? String(country).slice(0, 100) : null,
      requirement: requirement ? String(requirement).slice(0, 5000) : null,
    };

    // --- Persist ---------------------------------------------------------
    const supabase = getSupabase();
    const { error } = await supabase.from('inquiries').insert(sanitized);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

'use client';

import { Component, type ReactNode, useState, useEffect } from 'react';

/* ── WebGL support detection ── */
function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return true; // SSR: assume available
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return gl !== null;
  } catch {
    return false;
  }
}

/* ── Default fallback UI ── */
function DefaultFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-dm-black-mid rounded-sm">
      <div className="text-center px-6 py-10">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="mx-auto mb-4 text-dm-gold-muted"
          aria-hidden="true"
        >
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
        <p className="font-dm-sans text-sm text-dm-white-ghost">
          3D viewer requires WebGL support.
        </p>
        <p className="font-dm-sans text-xs text-dm-white-ghost/60 mt-1">
          Try a different browser or update your graphics drivers.
        </p>
      </div>
    </div>
  );
}

/* ── Error boundary (catches runtime errors) ── */
interface BoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}
interface BoundaryState {
  hasError: boolean;
}

class WebGLCatchBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <DefaultFallback />;
    }
    return this.props.children;
  }
}

/* ── Main export: checks WebGL before rendering + error boundary as safety net ── */
export default function WebGLErrorBoundary({ children, fallback }: BoundaryProps) {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(isWebGLAvailable());
  }, []);

  // SSR / initial render: render nothing (avoid hydration mismatch)
  if (supported === null) return null;

  // WebGL not available: show fallback immediately (no error thrown)
  if (!supported) return <>{fallback ?? <DefaultFallback />}</>;

  // WebGL available: render children with error boundary as safety net
  return (
    <WebGLCatchBoundary fallback={fallback}>
      {children}
    </WebGLCatchBoundary>
  );
}

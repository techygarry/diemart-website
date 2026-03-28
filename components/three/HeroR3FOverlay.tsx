'use client';

import { Canvas } from '@react-three/fiber';
import { useMemo, Component, type ReactNode } from 'react';
import ParticleSystem from './ParticleSystem';
import DieWireframe from './DieWireframe';
import { detectPerfTier, DPR_CAPS, PARTICLE_COUNTS } from '@/lib/utils/deviceCapability';

/* ─── Error Boundary so R3F errors don't crash the page ─── */
class R3FErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn('R3F overlay disabled:', error.message);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function HeroR3FOverlay() {
  const tier = useMemo(() => {
    if (typeof window === 'undefined') return 'medium' as const;
    return detectPerfTier();
  }, []);

  const dpr = DPR_CAPS[tier];

  // Don't render if fallback tier (no WebGL)
  if (tier === 'fallback' || PARTICLE_COUNTS[tier] === 0) return null;

  return (
    <R3FErrorBoundary>
      <div
        className="absolute inset-0 z-20"
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <ParticleSystem />
          <DieWireframe />
        </Canvas>
      </div>
    </R3FErrorBoundary>
  );
}

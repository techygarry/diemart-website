export type PerfTier = 'high' | 'medium' | 'low' | 'fallback';

const LOW_GPU_RE = /mali-4|adreno 3|powervr sgx/i;

export const PARTICLE_COUNTS: Record<PerfTier, number> = {
  high: 120,
  medium: 60,
  low: 40,
  fallback: 0,
};

export const DPR_CAPS: Record<PerfTier, number> = {
  high: 2,
  medium: 1.5,
  low: 1,
  fallback: 1,
};

export function detectPerfTier(): PerfTier {
  if (typeof window === 'undefined') return 'medium';

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) return 'fallback';

  const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
  if (debugInfo) {
    const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    if (LOW_GPU_RE.test(renderer)) return 'low';
  }

  const width = window.innerWidth;
  if (width >= 1024) return 'high';
  if (width >= 768) return 'medium';
  return 'low';
}

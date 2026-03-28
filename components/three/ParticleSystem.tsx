'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { detectPerfTier, PARTICLE_COUNTS } from '@/lib/utils/deviceCapability';

export default function ParticleSystem() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const timeRef = useRef(0);

  const count = useMemo(() => {
    if (typeof window === 'undefined') return PARTICLE_COUNTS.medium;
    const tier = detectPerfTier();
    return PARTICLE_COUNTS[tier];
  }, []);

  // Generate initial particle data
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        // Spread particles across the viewport
        x: (Math.random() - 0.5) * 12,
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 6,
        // Unique phase offsets for Perlin-like movement
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        phaseZ: Math.random() * Math.PI * 2,
        // Speed multipliers
        speedX: 0.15 + Math.random() * 0.25,
        speedY: 0.1 + Math.random() * 0.2,
        speedZ: 0.05 + Math.random() * 0.15,
        // Amplitude of movement
        ampX: 0.3 + Math.random() * 0.5,
        ampY: 0.2 + Math.random() * 0.4,
        ampZ: 0.1 + Math.random() * 0.3,
        // Opacity phase
        opacityPhase: Math.random() * Math.PI * 2,
        opacitySpeed: 0.3 + Math.random() * 0.5,
        // Gold color variant (alternate between two golds)
        isGold: Math.random() > 0.4,
      });
    }
    return data;
  }, [count]);

  // Pre-allocate matrix and color
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  // Set initial colors on mount
  useMemo(() => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      tempColor.set(p.isGold ? '#D4AF37' : '#F0CC55');
      meshRef.current!.setColorAt(i, tempColor);
    });
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [particles, tempColor]);

  useFrame((_, delta) => {
    if (!meshRef.current || count === 0) return;
    timeRef.current += delta;
    const t = timeRef.current;

    particles.forEach((p, i) => {
      // Perlin-like noise motion using layered sin/cos
      const nx =
        p.x +
        Math.sin(t * p.speedX + p.phaseX) * p.ampX +
        Math.cos(t * p.speedY * 0.7 + p.phaseY * 1.3) * p.ampX * 0.3;
      const ny =
        p.y +
        Math.cos(t * p.speedY + p.phaseY) * p.ampY +
        Math.sin(t * p.speedX * 0.5 + p.phaseX * 0.7) * p.ampY * 0.25;
      const nz =
        p.z +
        Math.sin(t * p.speedZ + p.phaseZ) * p.ampZ;

      // Pulsing opacity via scale (InstancedMesh doesn't support per-instance opacity easily)
      const opacityFactor =
        0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * p.opacitySpeed + p.opacityPhase));
      const scale = 0.008 + 0.012 * opacityFactor;

      tempMatrix.makeScale(scale, scale, scale);
      tempMatrix.setPosition(nx, ny, nz);
      meshRef.current!.setMatrixAt(i, tempMatrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update colors with opacity pulsing (darken/lighten)
    particles.forEach((p, i) => {
      const opacityFactor =
        0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * p.opacitySpeed + p.opacityPhase));
      const baseColor = p.isGold ? '#D4AF37' : '#F0CC55';
      tempColor.set(baseColor).multiplyScalar(opacityFactor);
      meshRef.current!.setColorAt(i, tempColor);
    });

    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  if (count === 0) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color="#D4AF37"
        transparent
        opacity={0.8}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

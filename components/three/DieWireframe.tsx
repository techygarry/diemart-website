'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DieWireframe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Slow, deliberate rotation — like a luxury watch mechanism
    meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial
        color="#D4AF37"
        wireframe
        transparent
        opacity={0.6}
        toneMapped={false}
      />
    </mesh>
  );
}

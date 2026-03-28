'use client';

import { Suspense, useState, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useProgress, Html } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

/* ─────────────────── Model Data ─────────────────── */

const MODELS = [
  { id: 'rectangle', label: 'Bangle Die', file: '/models/rectangle.stl' },
  { id: 'flower', label: 'Flower Die', file: '/models/flower.stl' },
  { id: 'bridge', label: 'Bridge Die', file: '/models/bridge.stl' },
  { id: 'kairi', label: 'Kairi Die', file: '/models/kairi.stl' },
];

/* ─────────────────── Loader Indicator ─────────────────── */

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-32 h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#D4AF37] transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[#D4AF37] text-xs tracking-wider font-light">
          {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  );
}

/* ─────────────────── STL Model Component ─────────────────── */

function STLModel({ url }: { url: string }) {
  const geometry = useLoader(STLLoader, url);
  const meshRef = useRef<THREE.Mesh>(null);

  // Center and normalize the geometry
  const processedGeometry = useCallback(() => {
    const geo = geometry.clone();
    geo.computeBoundingBox();
    geo.computeVertexNormals();

    if (geo.boundingBox) {
      const center = new THREE.Vector3();
      geo.boundingBox.getCenter(center);
      geo.translate(-center.x, -center.y, -center.z);

      // Normalize to fit in a 3-unit box
      const size = new THREE.Vector3();
      geo.boundingBox.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) {
        const scale = 3 / maxDim;
        geo.scale(scale, scale, scale);
      }
    }

    return geo;
  }, [geometry]);

  return (
    <mesh ref={meshRef} geometry={processedGeometry()} castShadow receiveShadow>
      <meshPhysicalMaterial
        color="#D4AF37"
        metalness={0.85}
        roughness={0.15}
        clearcoat={0.3}
        clearcoatRoughness={0.2}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

/* ─────────────────── Main Component ─────────────────── */

export default function DieViewer3D() {
  const [activeModel, setActiveModel] = useState(0);

  return (
    <section
      id="viewer"
      className="relative py-[100px] bg-dm-black-deep overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,175,55,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-dm-sans font-light uppercase tracking-[0.3em] text-dm-gold-muted text-base md:text-lg mb-5">
            INTERACTIVE 3D
          </p>
          <h2 className="font-cormorant font-semibold text-5xl md:text-6xl lg:text-7xl text-dm-gold-primary mb-6 leading-tight">
            Inspect Every Detail
          </h2>
          <p className="font-cormorant text-dm-white-soft text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            Rotate, zoom, and explore our dies in full 3D. See the precision that goes into every piece.
          </p>
        </div>

        {/* Category selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {MODELS.map((model, i) => (
            <button
              key={model.id}
              onClick={() => setActiveModel(i)}
              className={`
                px-6 py-3 font-dm-sans text-sm uppercase tracking-[0.15em]
                border rounded-sm transition-all duration-300
                ${activeModel === i
                  ? 'border-dm-gold-primary bg-dm-gold-primary/10 text-dm-gold-primary'
                  : 'border-dm-black-light text-dm-white-ghost hover:border-dm-gold-primary/40 hover:text-dm-gold-primary'
                }
              `}
            >
              {model.label}
            </button>
          ))}
        </div>

        {/* 3D Viewport */}
        <div className="relative w-full aspect-[16/10] md:aspect-[16/8] rounded-sm border border-dm-black-light bg-dm-black-mid overflow-hidden">
          {/* Corner accents */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-dm-gold-primary/30 pointer-events-none z-10" aria-hidden="true" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-dm-gold-primary/30 pointer-events-none z-10" aria-hidden="true" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-dm-gold-primary/30 pointer-events-none z-10" aria-hidden="true" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-dm-gold-primary/30 pointer-events-none z-10" aria-hidden="true" />

          {/* Active model label */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="font-dm-sans text-[11px] uppercase tracking-[0.2em] text-dm-gold-primary/60 bg-dm-black-deep/80 px-4 py-1.5 rounded-sm backdrop-blur-sm">
              {MODELS[activeModel].label}
            </span>
          </div>

          {/* Drag hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="font-dm-sans text-[10px] uppercase tracking-[0.2em] text-dm-white-ghost/40">
              Drag to rotate &middot; Scroll to zoom
            </span>
          </div>

          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 2, 6], fov: 40 }}
            gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
          >
            <color attach="background" args={['#0a0908']} />
            <fog attach="fog" args={['#0a0908', 8, 20]} />

            <Suspense fallback={<Loader />}>
              <Stage
                intensity={0.6}
                environment="city"
                shadows={{ type: 'contact', opacity: 0.4, blur: 2 }}
                adjustCamera={false}
              >
                <STLModel
                  key={MODELS[activeModel].file}
                  url={MODELS[activeModel].file}
                />
              </Stage>
            </Suspense>

            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={3}
              maxDistance={12}
              autoRotate
              autoRotateSpeed={1.5}
              maxPolarAngle={Math.PI / 1.8}
              minPolarAngle={Math.PI / 6}
            />
          </Canvas>
        </div>

        {/* Bottom info bar */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-dm-sans text-xs uppercase tracking-wider text-dm-white-ghost">
              Real Die Geometry
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="font-dm-sans text-xs uppercase tracking-wider text-dm-white-ghost">
              Micron-Level Detail
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" aria-hidden="true">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            </svg>
            <span className="font-dm-sans text-xs uppercase tracking-wider text-dm-white-ghost">
              From Our CNC Machines
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

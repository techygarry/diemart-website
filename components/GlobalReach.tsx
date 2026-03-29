'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

/* ─────────────────── Pin Data ─────────────────── */

interface MapPin {
  name: string;
  country: string;
  lat: number;
  lng: number;
  type: 'hq' | 'major' | 'international';
}

const PINS: MapPin[] = [
  // HQ
  { name: 'Chinchani', country: 'India', lat: 19.87, lng: 72.68, type: 'hq' },

  // India — Major cities
  { name: 'Mumbai', country: 'India', lat: 19.08, lng: 72.88, type: 'major' },
  { name: 'Delhi', country: 'India', lat: 28.61, lng: 77.21, type: 'major' },
  { name: 'Rajkot', country: 'India', lat: 22.30, lng: 70.80, type: 'major' },
  { name: 'Kolkata', country: 'India', lat: 22.57, lng: 88.36, type: 'major' },
  { name: 'Bangalore', country: 'India', lat: 12.97, lng: 77.59, type: 'major' },
  { name: 'Chennai', country: 'India', lat: 13.08, lng: 80.27, type: 'major' },
  { name: 'Coimbatore', country: 'India', lat: 11.01, lng: 76.96, type: 'major' },
  { name: 'Hyderabad', country: 'India', lat: 17.38, lng: 78.49, type: 'major' },
  { name: 'Ahmedabad', country: 'India', lat: 23.02, lng: 72.57, type: 'major' },
  { name: 'Jaipur', country: 'India', lat: 26.91, lng: 75.79, type: 'major' },
  { name: 'Meerut', country: 'India', lat: 28.98, lng: 77.71, type: 'major' },
  { name: 'Amritsar', country: 'India', lat: 31.63, lng: 74.87, type: 'major' },
  { name: 'Pune', country: 'India', lat: 18.52, lng: 73.86, type: 'major' },
  { name: 'Surat', country: 'India', lat: 21.17, lng: 72.83, type: 'major' },
  { name: 'Lucknow', country: 'India', lat: 26.85, lng: 80.95, type: 'major' },

  // UAE
  { name: 'Dubai', country: 'UAE', lat: 25.20, lng: 55.27, type: 'international' },
  { name: 'Sharjah', country: 'UAE', lat: 25.34, lng: 55.41, type: 'international' },
  { name: 'Abu Dhabi', country: 'UAE', lat: 24.45, lng: 54.65, type: 'international' },

  // Italy
  { name: 'Milan', country: 'Italy', lat: 45.46, lng: 9.19, type: 'international' },
  { name: 'Arezzo', country: 'Italy', lat: 43.46, lng: 11.88, type: 'international' },
  { name: 'Vicenza', country: 'Italy', lat: 45.55, lng: 11.55, type: 'international' },
];

/* ─────────────────── Helpers ─────────────────── */

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/* ─────────────────── Globe Mesh ─────────────────── */

// Highlighted countries
const HIGHLIGHT_COUNTRIES = new Set(['India', 'Italy', 'United Arab Emirates']);

function Globe({ isDark }: { isDark: boolean }) {
  const globeRef = useRef<THREE.Group>(null);
  const [countryLines, setCountryLines] = useState<{ points: THREE.Vector3[]; highlight: boolean }[]>([]);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.08;
    }
  });

  // Load GeoJSON country boundaries
  useEffect(() => {
    fetch('/models/world.geojson')
      .then((r) => r.json())
      .then((geojson) => {
        const lines: { points: THREE.Vector3[]; highlight: boolean }[] = [];
        const radius = 2.005;

        for (const feature of geojson.features) {
          const name = feature.properties?.name || '';
          const isHighlight = HIGHLIGHT_COUNTRIES.has(name);
          const geom = feature.geometry;

          const processRing = (ring: number[][]) => {
            const pts: THREE.Vector3[] = [];
            for (let i = 0; i < ring.length; i++) {
              const [lng, lat] = ring[i];
              pts.push(latLngToVector3(lat, lng, radius));
            }
            if (pts.length > 1) {
              lines.push({ points: pts, highlight: isHighlight });
            }
          };

          if (geom.type === 'Polygon') {
            for (const ring of geom.coordinates) {
              processRing(ring);
            }
          } else if (geom.type === 'MultiPolygon') {
            for (const polygon of geom.coordinates) {
              for (const ring of polygon) {
                processRing(ring);
              }
            }
          }
        }

        setCountryLines(lines);
      })
      .catch(() => {});
  }, []);

  // Subtle grid lines (fewer, just for orientation)
  const gridLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    const radius = 2;

    for (let lat = -60; lat <= 60; lat += 30) {
      const points: THREE.Vector3[] = [];
      for (let lng = 0; lng <= 360; lng += 4) {
        points.push(latLngToVector3(lat, lng, radius));
      }
      lines.push(points);
    }

    for (let lng = 0; lng < 360; lng += 30) {
      const points: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 4) {
        points.push(latLngToVector3(lat, lng, radius));
      }
      lines.push(points);
    }

    return lines;
  }, []);

  // Pin positions
  const pinPositions = useMemo(() => {
    return PINS.map((pin) => ({
      ...pin,
      position: latLngToVector3(pin.lat, pin.lng, 2.02),
      outerPosition: latLngToVector3(pin.lat, pin.lng, 2.15),
    }));
  }, []);

  return (
    <group ref={globeRef}>
      {/* Globe sphere */}
      <mesh>
        <sphereGeometry args={[1.98, 64, 64]} />
        <meshPhysicalMaterial
          color={isDark ? '#1a1510' : '#F5F0E8'}
          metalness={isDark ? 0.4 : 0.15}
          roughness={isDark ? 0.6 : 0.7}
          transparent
          opacity={isDark ? 0.9 : 0.95}
        />
      </mesh>

      {/* Subtle grid lines */}
      {gridLines.map((points, i) => (
        <line key={`grid-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points.length}
              array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#B8941E" transparent opacity={0.12} />
        </line>
      ))}

      {/* Country borders */}
      {countryLines.map((line, i) => (
        <line key={`country-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={line.points.length}
              array={new Float32Array(line.points.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={line.highlight ? '#B8941E' : '#8B7535'}
            transparent
            opacity={line.highlight ? 0.8 : 0.35}
          />
        </line>
      ))}

      {/* Glow ring around equator */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.005, 8, 128]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.4} />
      </mesh>

      {/* Outer atmosphere glow */}
      <mesh>
        <sphereGeometry args={[2.08, 64, 64]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>

      {/* Pins */}
      {pinPositions.map((pin) => (
        <group key={pin.name}>
          {/* Pin dot */}
          <mesh position={pin.position}>
            <sphereGeometry args={[pin.type === 'hq' ? 0.045 : pin.type === 'international' ? 0.035 : 0.025, 12, 12]} />
            <meshBasicMaterial
              color={pin.type === 'hq' ? '#FFD700' : pin.type === 'international' ? '#D4AF37' : '#B8962E'}
              toneMapped={false}
            />
          </mesh>

          {/* Pin glow */}
          <mesh position={pin.position}>
            <sphereGeometry args={[pin.type === 'hq' ? 0.08 : 0.05, 12, 12]} />
            <meshBasicMaterial color="#D4AF37" transparent opacity={0.15} toneMapped={false} />
          </mesh>

          {/* Connecting line from surface */}
          {(pin.type === 'hq' || pin.type === 'international') && (
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    pin.position.x, pin.position.y, pin.position.z,
                    pin.outerPosition.x, pin.outerPosition.y, pin.outerPosition.z,
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#D4AF37" transparent opacity={0.4} />
            </line>
          )}

          {/* Label for HQ and international */}
          {(pin.type === 'hq' || pin.type === 'international') && (
            <Html
              position={[pin.outerPosition.x, pin.outerPosition.y, pin.outerPosition.z]}
              distanceFactor={8}
              style={{ pointerEvents: 'none' }}
            >
              <div className={`whitespace-nowrap px-2 py-0.5 rounded-sm backdrop-blur-sm border shadow-sm ${isDark ? 'bg-[#0a0908]/80 border-[#D4AF37]/20' : 'bg-white/80 border-[#B8941E]/30'}`}>
                <span className={`text-[10px] font-sans tracking-wider uppercase ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6D14]'}`}>
                  {pin.type === 'hq' ? '★ ' : ''}{pin.name}
                </span>
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
}

/* ─────────────────── Stats Sidebar ─────────────────── */

const COUNTRY_STATS = [
  { country: 'India', cities: '16+ Cities', flag: '🇮🇳' },
  { country: 'UAE', cities: 'Dubai · Sharjah · Abu Dhabi', flag: '🇦🇪' },
  { country: 'Italy', cities: 'Milan · Arezzo · Vicenza', flag: '🇮🇹' },
];

/* ─────────────────── Main Component ─────────────────── */

export default function GlobalReach() {
  const { theme } = useTheme();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && theme === 'dark';

  return (
    <section
      id="global"
      className="relative py-[100px] bg-dm-black-warm"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-dm-sans font-light uppercase tracking-[0.3em] text-dm-gold-muted text-base md:text-lg mb-5">
            GLOBAL PRESENCE
          </p>
          <h2 className="font-cormorant font-semibold text-5xl md:text-6xl lg:text-7xl text-dm-gold-primary mb-6 leading-tight">
            From Chinchani to the World
          </h2>
          <p className="font-cormorant text-dm-white-soft text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            Our dies reach jewellers across 3 countries and 20+ cities. Every pin on this globe is a customer who trusts our craft.
          </p>
        </div>

        {/* Globe + Stats layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-center">
          {/* Globe */}
          <div className="relative w-full aspect-square max-w-[480px] mx-auto lg:mx-0">
            {/* Outer glow ring */}
            <div
              className="absolute inset-[-10%] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(212,175,55,0.06) 0%, rgba(212,175,55,0.02) 40%, transparent 70%)',
              }}
              aria-hidden="true"
            />

            <Canvas
              camera={{ position: [0, 1.5, 6], fov: 38 }}
              dpr={[1, 2]}
              gl={{ antialias: true }}
            >
              <color attach="background" args={[isDark ? '#0f0d06' : '#FAF8F5']} />
              <ambientLight intensity={0.8} />
              <pointLight position={[5, 5, 5]} intensity={1.5} color="#D4AF37" />
              <pointLight position={[-5, -3, -5]} intensity={0.6} color="#B8962E" />
              <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />

              <Globe isDark={isDark} />

              <OrbitControls
                enablePan={false}
                enableZoom={false}
                autoRotate={false}
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 4}
              />
            </Canvas>
          </div>

          {/* Country cards */}
          <div className="flex flex-col gap-4">
            {COUNTRY_STATS.map((stat) => (
              <div
                key={stat.country}
                className={`
                  group p-6 border rounded-sm transition-all duration-300 cursor-default
                  ${hoveredCountry === stat.country
                    ? 'border-dm-gold-primary/50 bg-dm-gold-primary/5'
                    : 'border-dm-black-light bg-dm-black-mid/40 hover:border-dm-gold-primary/30'
                  }
                `}
                onMouseEnter={() => setHoveredCountry(stat.country)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-3xl">{stat.flag}</span>
                  <h3 className="font-cormorant font-semibold text-2xl text-dm-gold-primary">
                    {stat.country}
                  </h3>
                </div>
                <p className="font-dm-sans text-sm text-dm-white-ghost tracking-wider">
                  {stat.cities}
                </p>
              </div>
            ))}

            {/* Total stat */}
            <div className="mt-2 p-6 border border-dm-gold-primary/20 bg-dm-black-deep/60 rounded-sm text-center">
              <span className="font-cormorant font-bold text-4xl text-dm-gold-primary block mb-1">
                3
              </span>
              <span className="font-dm-sans text-xs uppercase tracking-[0.2em] text-dm-white-ghost">
                Countries Served
              </span>
              <div className="w-8 h-px bg-dm-gold-primary/30 mx-auto my-3" aria-hidden="true" />
              <span className="font-cormorant font-bold text-4xl text-dm-gold-primary block mb-1">
                20+
              </span>
              <span className="font-dm-sans text-xs uppercase tracking-[0.2em] text-dm-white-ghost">
                Cities Reached
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

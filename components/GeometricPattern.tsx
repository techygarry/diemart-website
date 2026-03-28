'use client';

type PatternType = 'hexagon' | 'circle' | 'square' | 'diamond' | 'triangle' | 'star';

interface GeometricPatternProps {
  pattern: PatternType;
}

function renderPattern(pattern: PatternType) {
  const stroke = '#D4AF37';
  const sw = 1;

  switch (pattern) {
    case 'hexagon':
      return (
        <polygon
          points="32,4 56,18 56,46 32,60 8,46 8,18"
          stroke={stroke}
          strokeWidth={sw}
          fill="none"
        />
      );
    case 'circle':
      return (
        <circle
          cx="32"
          cy="32"
          r="26"
          stroke={stroke}
          strokeWidth={sw}
          fill="none"
        />
      );
    case 'square':
      return (
        <rect
          x="8"
          y="8"
          width="48"
          height="48"
          stroke={stroke}
          strokeWidth={sw}
          fill="none"
        />
      );
    case 'diamond':
      return (
        <polygon
          points="32,4 60,32 32,60 4,32"
          stroke={stroke}
          strokeWidth={sw}
          fill="none"
        />
      );
    case 'triangle':
      return (
        <polygon
          points="32,6 58,58 6,58"
          stroke={stroke}
          strokeWidth={sw}
          fill="none"
        />
      );
    case 'star':
      return (
        <polygon
          points="32,4 38,24 58,24 42,36 48,56 32,44 16,56 22,36 6,24 26,24"
          stroke={stroke}
          strokeWidth={sw}
          fill="none"
        />
      );
  }
}

export default function GeometricPattern({ pattern }: GeometricPatternProps) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      className="opacity-30 group-hover:opacity-60 transition-opacity duration-500"
      aria-hidden="true"
    >
      {renderPattern(pattern)}
    </svg>
  );
}

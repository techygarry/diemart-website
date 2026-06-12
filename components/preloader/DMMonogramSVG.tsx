'use client';

/**
 * DMMonogramSVG — hand-built SVG of the DieMart DM monogram.
 *
 * Geometry is based on public/logo.png and designed to be stroke-animated
 * via stroke-dasharray/stroke-dashoffset. Paths are intentionally simple
 * (few control points) so they draw cleanly.
 *
 * viewBox: 0 0 400 300
 *   - D occupies roughly x=65..220, y=40..240
 *   - M occupies roughly x=175..340, y=40..240 (overlaps D)
 *   - D renders first (background), M renders on top (foreground)
 *     to create the interlock effect visible in the original logo
 */
export default function DMMonogramSVG({
  width = 280,
  height = 210,
  className = '',
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dmMetalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C547" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="60%" stopColor="#C0C0C0" />
          <stop offset="100%" stopColor="#8C7853" />
        </linearGradient>
      </defs>

      {/* D — left letterform.
          A solid filled shape: wide flat top (serif bar), curved right bowl,
          slightly tapered toward the bottom. No counter (hole) — the original
          logo fills the entire D shape with gradient. */}
      <path
        d={`
          M 65 40
          L 210 40
          C 245 40, 260 85, 260 145
          C 260 205, 245 245, 200 245
          L 90 245
          Z
        `}
        fill="url(#dmMetalGradient)"
        stroke="url(#dmMetalGradient)"
        strokeWidth="1.5"
      />

      {/* M — right letterform, overlapping D's bowl.
          Stroked polyline (no fill): left leg up to left peak, diagonal
          down to the center valley, diagonal up to right peak, right leg
          down. The thick stroke creates the visual weight matching the logo.
          Renders on top of D to create the interlock. */}
      <path
        d={`
          M 185 245
          L 185 40
          L 260 180
          L 335 40
          L 335 245
        `}
        fill="none"
        stroke="url(#dmMetalGradient)"
        strokeWidth="28"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
    </svg>
  );
}

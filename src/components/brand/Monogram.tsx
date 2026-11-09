import React from 'react';

interface MonogramProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

/**
 * Editorial geometric monogram for Fatima Mansoor (FM).
 * Features interlocking vector geometry of 'F' and 'M', technical notch cuts,
 * and precision alignment indicators inspired by the reference editorial aesthetic.
 */
export const Monogram: React.FC<MonogramProps> = ({
  className = '',
  size = 72,
  glow = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer corner bounding crosshairs */}
      <div className="absolute -top-2 -left-2 w-2 h-2 border-t border-l border-[rgba(255,255,255,0.25)]" />
      <div className="absolute -top-2 -right-2 w-2 h-2 border-t border-r border-[rgba(255,255,255,0.25)]" />
      <div className="absolute -bottom-2 -left-2 w-2 h-2 border-b border-l border-[rgba(255,255,255,0.25)]" />
      <div className="absolute -bottom-2 -right-2 w-2 h-2 border-b border-r border-[rgba(255,255,255,0.25)]" />

      {/* SVG Monogram Emblem: Interlocking F & M */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-500 ${glow ? 'drop-shadow-[0_0_24px_rgba(0,102,255,0.65)]' : ''}`}
      >
        <defs>
          <linearGradient id="fm-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#0066ff" />
            <stop offset="100%" stopColor="#0044cc" />
          </linearGradient>
          <linearGradient id="fm-coral-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b8b" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>

        {/* Outer subtle concentric circle guides */}
        <circle cx="40" cy="40" r="38" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="40" cy="40" r="31" stroke="rgba(0,102,255,0.2)" strokeWidth="1" />

        {/* Stylized 'F' Column & Bars */}
        {/* Left vertical spine of F */}
        <path
          d="M23 20H30V60H23V20Z"
          fill="url(#fm-blue-grad)"
        />
        {/* Top crossbar of F */}
        <path
          d="M28 20H45C47.2 20 49 21.8 49 24V25C49 27.2 47.2 29 45 29H30V20H28Z"
          fill="url(#fm-blue-grad)"
        />
        {/* Mid crossbar of F */}
        <path
          d="M30 36H42C43.6 36 45 37.4 45 39V40C45 41.6 43.6 43 42 43H30V36Z"
          fill="url(#fm-blue-grad)"
        />

        {/* Stylized 'M' Geometry Intersecting */}
        {/* Right vertical spine of M */}
        <path
          d="M50 24H57V60H50V24Z"
          fill="url(#fm-blue-grad)"
        />
        {/* Center chevron of M dipping to center */}
        <path
          d="M38 38L44 48L50 38L53 41L45 54C44.4 55 43.6 55 43 54L35 41L38 38Z"
          fill="url(#fm-blue-grad)"
        />

        {/* Geometric Accent Cutout Bar in Coral */}
        <rect x="18" y="39.5" width="44" height="1.5" fill="#f43f5e" opacity="0.85" />

        {/* Center alignment notch dots */}
        <circle cx="40" cy="11" r="1.5" fill="#38bdf8" />
        <circle cx="40" cy="69" r="1.5" fill="#38bdf8" />
        <circle cx="11" cy="40" r="1.5" fill="#f43f5e" />
        <circle cx="69" cy="40" r="1.5" fill="#0066ff" />
      </svg>
    </div>
  );
};

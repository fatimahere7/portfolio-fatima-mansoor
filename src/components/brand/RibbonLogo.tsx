import React from 'react';

interface RibbonLogoProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

/**
 * Aerodynamic geometric ribbon 'S' emblem recreated from user reference.
 * Features dual interlocking racetrack bands with parallel 45° diagonal sheared terminals.
 */
export const RibbonLogo: React.FC<RibbonLogoProps> = ({
  className = '',
  size = 38,
  glow = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-300 ${
          glow ? 'drop-shadow-[0_0_16px_rgba(180,205,223,0.6)]' : 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
        }`}
      >
        <defs>
          <linearGradient id="ribbon-gradient-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="50%" stopColor="#b4cddf" />
            <stop offset="100%" stopColor="#93b9d6" />
          </linearGradient>
          <linearGradient id="ribbon-gradient-bottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b4cddf" />
            <stop offset="50%" stopColor="#93b9d6" />
            <stop offset="100%" stopColor="#7ba5c4" />
          </linearGradient>
        </defs>

        {/* TOP PIECE: Top bar, left turnaround arc, and middle bar with 45° sheared terminals */}
        <path
          d="M 23 14 L 46 14 L 40 22 L 23 22 A 2 2 0 0 0 23 26 L 35 26 L 29 34 L 23 34 A 10 10 0 0 1 23 14 Z"
          fill="url(#ribbon-gradient-top)"
        />

        {/* BOTTOM PIECE: 180° rotation of top piece */}
        <g transform="rotate(180 30 30)">
          <path
            d="M 23 14 L 46 14 L 40 22 L 23 22 A 2 2 0 0 0 23 26 L 35 26 L 29 34 L 23 34 A 10 10 0 0 1 23 14 Z"
            fill="url(#ribbon-gradient-bottom)"
          />
        </g>
      </svg>
    </div>
  );
};

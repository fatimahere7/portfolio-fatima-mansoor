import React from 'react';
import type { GridVariant } from '../../types';

interface GridBackgroundProps {
  variant?: GridVariant;
  className?: string;
  showVignette?: boolean;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  variant = 'default',
  className = '',
  showVignette = true,
}) => {
  const getPatternClass = () => {
    switch (variant) {
      case 'dense':
        return 'bg-technical-grid-dense';
      case 'minimal':
        return 'bg-transparent';
      case 'architectural':
        return 'bg-technical-dots opacity-40';
      case 'default':
      default:
        return 'bg-technical-grid';
    }
  };

  return (
    <div
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Base deep background */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Very faint deep oceanic glow in upper center (reminiscent of Simon Sparks reference) */}
      <div
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20 blur-[130px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,255,0.4) 0%, rgba(244,63,94,0.15) 50%, transparent 75%)',
        }}
      />

      {/* Technical Grid lines layer */}
      <div className={`absolute inset-0 ${getPatternClass()}`} />

      {/* Subtle perimeter vignette to focus content */}
      {showVignette && (
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(3,7,18,0.7) 100%)',
          }}
        />
      )}
    </div>
  );
};

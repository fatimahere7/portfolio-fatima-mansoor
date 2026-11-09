import React from 'react';
import { Crosshair } from './Crosshair';

interface GridGuideLinesProps {
  columns?: number;
  showCrosshairs?: boolean;
  showLabels?: boolean;
  className?: string;
  variant?: 'subtle' | 'highlight';
}

export const GridGuideLines: React.FC<GridGuideLinesProps> = ({
  columns = 4,
  showCrosshairs = true,
  showLabels = false,
  className = '',
  variant = 'subtle',
}) => {
  const lineStyle =
    variant === 'highlight'
      ? 'border-r border-[rgba(0,102,255,0.14)]'
      : 'border-r border-[rgba(255,255,255,0.04)]';

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
      aria-hidden="true"
    >
      <div className="h-full w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-l border-[rgba(255,255,255,0.04)]">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className={`relative h-full ${lineStyle}`}>
            {showCrosshairs && (
              <>
                <div className="absolute top-12 -right-1.5 text-sky-400">
                  <Crosshair size={12} color="#0066ff" />
                </div>
                <div className="absolute bottom-12 -right-1.5 text-sky-400">
                  <Crosshair size={12} color="#0066ff" />
                </div>
              </>
            )}
            {showLabels && (
              <div className="absolute top-6 left-2 font-mono text-[9px] text-slate-600 tracking-widest uppercase">
                COL 0{i + 1}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

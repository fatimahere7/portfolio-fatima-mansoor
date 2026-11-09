import React from 'react';

interface TechnicalLabelProps {
  children: React.ReactNode;
  prefix?: string;
  index?: string;
  accent?: 'blue' | 'pink' | 'muted' | 'monochrome';
  isLight?: boolean;
  className?: string;
}

export const TechnicalLabel: React.FC<TechnicalLabelProps> = ({
  children,
  prefix,
  index,
  isLight = false,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase select-none ${className}`}
    >
      {index && (
        <span className={`tabular-nums font-semibold ${isLight ? 'text-[#222222]' : 'text-white'}`}>
          {index}
        </span>
      )}
      {prefix && <span className="text-[#858585]">{prefix}</span>}
      <span className="text-[#858585]">{children}</span>
    </div>
  );
};

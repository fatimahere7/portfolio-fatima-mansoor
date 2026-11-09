import React from 'react';

interface CrosshairProps {
  className?: string;
  size?: number;
  color?: string;
}

export const Crosshair: React.FC<CrosshairProps> = ({
  className = '',
  size = 12,
  color = 'currentColor',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <line x1="6" y1="0" x2="6" y2="12" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
      <line x1="0" y1="6" x2="12" y2="6" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  );
};

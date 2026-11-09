import React from 'react';
import { useCursorTrigger } from '../cursor/CursorContext';
import { Magnetic } from '../motion/Magnetic';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'outline' | 'outline-dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  magnetic = false,
  className = '',
  children,
  ...props
}) => {
  const cursorProps = useCursorTrigger('button');

  const baseStyles =
    'relative inline-flex items-center justify-center font-mono text-xs uppercase tracking-widest transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7B7B7B] disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap select-none rounded-none';

  const sizeStyles = {
    sm: 'px-3.5 py-2 text-[11px] gap-1.5',
    md: 'px-5 py-2.5 text-xs gap-2',
    lg: 'px-7 py-3 text-xs gap-2.5',
  };

  // Strict Monochrome Button Variants:
  // - primary (on dark): White button with #222222 text, inverting on hover to #222222 with white text
  // - dark (on light): Dark #222222 button with white text, inverting on hover to white with #222222 text
  // - outline (on dark): Subtle #7B7B7B outline with white text, inverting on hover to white with #222222 text
  // - outline-dark (on light): Subtle #7B7B7B outline with #222222 text, inverting on hover to #222222 with white text
  // - ghost: Muted #7B7B7B text with subtle hover
  const variantStyles = {
    primary:
      'bg-white text-[#222222] border border-white hover:bg-[#222222] hover:text-white hover:border-[#7B7B7B] active:bg-[#1a1a1a]',
    dark:
      'bg-[#222222] text-white border border-[#222222] hover:bg-white hover:text-[#222222] hover:border-[#7B7B7B] active:bg-[#F8F8F8]',
    outline:
      'border border-[#7B7B7B] text-white bg-transparent hover:bg-white hover:text-[#222222] hover:border-white',
    'outline-dark':
      'border border-[#7B7B7B] text-[#222222] bg-transparent hover:bg-[#222222] hover:text-white hover:border-[#222222]',
    ghost:
      'text-[#7B7B7B] hover:text-white hover:bg-white/5 border border-transparent',
  };

  const buttonElement = (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...cursorProps}
      {...props}
    >
      {children}
    </button>
  );

  if (magnetic) {
    return <Magnetic strength={0.25}>{buttonElement}</Magnetic>;
  }

  return buttonElement;
};

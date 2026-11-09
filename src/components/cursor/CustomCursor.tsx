import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useCursor } from './CursorContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const CustomCursor: React.FC = () => {
  const { cursorState } = useCursor();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor follow physics
  const springConfigInner = { damping: 45, stiffness: 800, mass: 0.1 };
  const springConfigOuter = { damping: 30, stiffness: 320, mass: 0.3 };

  const smoothXInner = useSpring(mouseX, springConfigInner);
  const smoothYInner = useSpring(mouseY, springConfigInner);
  const smoothXOuter = useSpring(mouseX, springConfigOuter);
  const smoothYOuter = useSpring(mouseY, springConfigOuter);

  useEffect(() => {
    // Detect touch-only screen
    const isTouchDevice = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  // Don't render cursor on touch screens or when user prefers reduced motion
  if (isTouch || prefersReducedMotion) return null;

  // Determine size, color and label based on active cursor state
  const { variant, text } = cursorState;

  const getVariantStyles = () => {
    // If text is provided, display circular badge with label
    if (text) {
      return {
        size: text.length > 5 ? 76 : 64,
        borderColor: 'rgba(217, 75, 75, 0.85)',
        backgroundColor: 'rgba(8, 8, 8, 0.92)',
        scale: 1,
        showText: true,
        label: text,
      };
    }

    switch (variant) {
      case 'link':
        return {
          size: 44,
          borderColor: 'rgba(217, 75, 75, 0.85)',
          backgroundColor: 'rgba(217, 75, 75, 0.08)',
          scale: 1.1,
          showText: false,
        };
      case 'button':
        return {
          size: 38,
          borderColor: 'rgba(233, 229, 216, 0.85)',
          backgroundColor: 'rgba(233, 229, 216, 0.08)',
          scale: 1.05,
          showText: false,
        };
      case 'image':
        return {
          size: 72,
          borderColor: 'rgba(217, 75, 75, 0.8)',
          backgroundColor: 'rgba(8, 8, 8, 0.88)',
          scale: 1,
          showText: true,
          label: 'VIEW',
        };
      case 'project':
        return {
          size: 80,
          borderColor: 'rgba(217, 75, 75, 0.9)',
          backgroundColor: 'rgba(8, 8, 8, 0.9)',
          scale: 1,
          showText: true,
          label: 'EXPLORE',
        };
      default:
        return {
          size: 28,
          borderColor: 'rgba(233, 229, 216, 0.3)',
          backgroundColor: 'transparent',
          scale: 1,
          showText: false,
        };
    }
  };

  const style = getVariantStyles();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      {/* Outer subtle following ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center backdrop-blur-[1px] transition-colors duration-200"
        style={{
          x: smoothXOuter,
          y: smoothYOuter,
          width: style.size,
          height: style.size,
          marginLeft: -style.size / 2,
          marginTop: -style.size / 2,
          border: `1px solid ${style.borderColor}`,
          backgroundColor: style.backgroundColor,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {style.showText && (
          <span className="text-[9px] font-mono tracking-widest text-[#f8fafc] uppercase select-none">
            {style.label}
          </span>
        )}
      </motion.div>

      {/* Center sharp pinpoint dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none"
        style={{
          x: smoothXInner,
          y: smoothYInner,
          marginLeft: -3,
          marginTop: -3,
          backgroundColor: '#D94B4B',
          opacity: isVisible ? (style.showText ? 0 : 1) : 0,
        }}
      />
    </div>
  );
};

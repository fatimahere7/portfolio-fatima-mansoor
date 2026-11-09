import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { useCursorTrigger } from '../cursor/CursorContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface ContactCTAProps {
  onActivate?: () => void;
  email?: string;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onActivate, email = 'hello@example.com' }) => {
  const ctaHover = useCursorTrigger('button', 'TOUCH');
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = Math.max(-10, Math.min(10, (e.clientX - centerX) * 0.15));
    const distanceY = Math.max(-6, Math.min(6, (e.clientY - centerY) * 0.15));
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    ctaHover.onMouseEnter();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    ctaHover.onMouseLeave();
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onActivate) {
      e.preventDefault();
      onActivate();
    }
  };

  return (
    <motion.a
      ref={containerRef}
      href={`mailto:${email}?subject=Project%20Inquiry%20%E2%80%94%20Fatima%20Mansoor`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: smoothX,
        y: smoothY,
      }}
      className="group inline-flex flex-col items-start focus:outline-none focus-visible:ring-1 focus-visible:ring-[#222222] cursor-pointer"
      aria-label="Start a conversation with Fatima Mansoor"
    >
      <div className="flex items-center gap-3">
        <span className="font-sans text-2xl sm:text-3xl lg:text-4xl text-[#222222] font-bold tracking-tight group-hover:text-[#858585] transition-colors duration-200">
          START A CONVERSATION
        </span>
        <motion.span
          animate={{ x: isHovered ? 6 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="font-sans text-2xl sm:text-3xl lg:text-4xl text-[#222222] group-hover:text-[#858585] transition-colors duration-200"
        >
          →
        </motion.span>
      </div>

      <div className="w-full h-px bg-[#858585]/30 mt-3 group-hover:bg-[#222222] transition-colors duration-200" />
    </motion.a>
  );
};

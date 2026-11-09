import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface ParallaxProps {
  children: React.ReactNode;
  offset?: number; // Pixels to shift along Y axis
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  offset = 40,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

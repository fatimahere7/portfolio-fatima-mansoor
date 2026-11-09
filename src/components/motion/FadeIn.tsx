import React from 'react';
import { motion } from 'motion/react';
import { fadeInVariants } from './MotionVariants';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      custom={delay}
      variants={fadeInVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

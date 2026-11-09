import React from 'react';
import { motion } from 'motion/react';
import { slideUpVariants } from './MotionVariants';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface SlideUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  viewportOnce?: boolean;
}

export const SlideUp: React.FC<SlideUpProps> = ({
  children,
  delay = 0,
  className = '',
  viewportOnce = true,
}) => {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: '-50px' }}
      custom={delay}
      variants={slideUpVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

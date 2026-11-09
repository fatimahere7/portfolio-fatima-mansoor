import React from 'react';
import { motion } from 'motion/react';
import { clipPathRevealVariants } from './MotionVariants';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  delay = 0,
  className = '',
  as = 'div',
}) => {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    const Component = as;
    return <Component className={className}>{children}</Component>;
  }

  const MotionComponent = motion[as] as typeof motion.div;

  return (
    <div className="overflow-hidden">
      <MotionComponent
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        custom={delay}
        variants={clipPathRevealVariants}
        className={className}
      >
        {children}
      </MotionComponent>
    </div>
  );
};

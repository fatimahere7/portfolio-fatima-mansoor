import React from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const FooterVisual: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Outer Concentric Hairline Ring */}
      <div className="absolute inset-0 rounded-full border border-[#7B7B7B]/20" />

      {/* Primary Orbiting Ring with Dashes */}
      <motion.div
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-2 sm:inset-4 rounded-full border border-dashed border-[#7B7B7B]/30"
      >
        {/* Orbiting White Node */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
        {/* Subtle Decorative Warm Yellow Node */}
        <div className="absolute top-1/2 -right-0.5 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#D6B36A]" />
      </motion.div>

      {/* Secondary Counter-Rotating Hairline Ring */}
      <motion.div
        animate={prefersReducedMotion ? {} : { rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-8 sm:inset-10 rounded-full border border-[#7B7B7B]/20"
      >
        {/* Subtle Red Accent Marker */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
      </motion.div>

      {/* Innermost Ring */}
      <div className="absolute inset-16 sm:inset-20 rounded-full border border-[#7B7B7B]/30 flex items-center justify-center">
        {/* Center Core Dot */}
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
      </div>

      {/* Cardinal Technical Ticks */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2.5 bg-[#7B7B7B]/40" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-2.5 bg-[#7B7B7B]/40" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-2.5 bg-[#7B7B7B]/40" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-2.5 bg-[#7B7B7B]/40" />

      {/* Corner Technical Crosshairs */}
      <div className="absolute top-2 left-2 font-mono text-[7px] text-[#7B7B7B]/50 tracking-widest">
        SYS_NODE
      </div>
      <div className="absolute bottom-2 right-2 font-mono text-[7px] text-[#7B7B7B]/50 tracking-widest">
        06//END
      </div>
    </div>
  );
};

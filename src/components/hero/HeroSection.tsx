import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useScroll } from '../../context/ScrollContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { HeroAtmosphere } from './HeroAtmosphere';
import { InteractiveName } from './InteractiveName';
import { HeroEditorialMeta } from './HeroEditorialMeta';

export const HeroSection: React.FC = () => {
  const { scrollY, scrollTo } = useScroll();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [secondWordColor, setSecondWordColor] = useState<'warm' | 'crimson'>('warm');

  const handleScrollClick = (target: string) => {
    scrollTo(target, { behavior: 'smooth' });
  };

  const contentTranslateY = prefersReducedMotion ? 0 : -Math.min(scrollY, 500) * 0.12;

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] min-h-[660px] max-h-[100dvh] flex flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-6 px-4 sm:px-8 lg:px-12 bg-[#080808] select-none overflow-hidden"
      aria-label="Fatima Mansoor - Hero Introduction"
    >
      {/* ATMOSPHERIC BACKGROUND: Deep Charcoal, Directional Spotlight, Blueprint & Cryptographic Constellations */}
      <HeroAtmosphere />

      {/* FOREGROUND EDITORIAL COMPOSITION */}
      <motion.div
        style={{
          transform: `translateY(${contentTranslateY}px)`,
        }}
        className="relative z-20 w-full flex flex-col justify-between flex-1 my-auto max-w-7xl mx-auto"
      >
        {/* Subtle Palette Switcher (Quiet editorial feature in top right corner for design discretion) */}
        <div className="absolute top-1 right-2 sm:right-6 z-40 hidden xl:flex items-center gap-1.5 font-mono text-[8px] tracking-[0.25em] text-[#888888]/40 hover:text-[#888888] transition-colors">
          <button
            onClick={() => setSecondWordColor(secondWordColor === 'warm' ? 'crimson' : 'warm')}
            className="hover:text-[#E9E5D8] focus:outline-none uppercase cursor-pointer"
            title="Toggle Two-Tone Editorial Contrast"
          >
            [ CONTRAST: {secondWordColor === 'warm' ? 'ALEXANDER' : 'CRIMSON'} ]
          </button>
        </div>

        {/* Hero Editorial Composition with Interactive Typography as Centerpiece */}
        <HeroEditorialMeta onScrollTo={handleScrollClick}>
          <InteractiveName secondWordColor={secondWordColor} />
        </HeroEditorialMeta>
      </motion.div>
    </section>
  );
};

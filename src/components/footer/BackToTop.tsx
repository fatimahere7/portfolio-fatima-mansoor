import React from 'react';
import { motion } from 'motion/react';
import { useCursorTrigger } from '../cursor/CursorContext';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const buttonHover = useCursorTrigger('button');

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      {...buttonHover}
      className="group inline-flex items-center gap-2.5 font-mono text-xs tracking-wider text-[#7B7B7B] hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white uppercase py-1"
      aria-label="Scroll back to top of page"
    >
      <span className="underline underline-offset-4 decoration-[#7B7B7B] group-hover:decoration-white">
        BACK TO TOP
      </span>
      <ArrowUp className="w-3.5 h-3.5 text-[#7B7B7B] group-hover:text-white group-hover:-translate-y-1 transition-all duration-200" />
    </button>
  );
};

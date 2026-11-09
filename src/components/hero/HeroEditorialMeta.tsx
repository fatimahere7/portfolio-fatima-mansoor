import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useCursorTrigger } from '../cursor/CursorContext';
import { useScroll } from '../../context/ScrollContext';

interface HeroEditorialMetaProps {
  onScrollTo: (target: string) => void;
  children: React.ReactNode;
}

export const HeroEditorialMeta: React.FC<HeroEditorialMetaProps> = ({ onScrollTo, children }) => {
  const { scrollY } = useScroll();
  const workHover = useCursorTrigger('button', 'WORK');
  const contactHover = useCursorTrigger('button', 'CONNECT');
  const scrollHover = useCursorTrigger('button', 'SCROLL');

  const indicatorOpacity = Math.max(0, 1 - Math.min(scrollY, 160) * 0.0065);

  return (
    <div className="relative z-30 w-full flex flex-col justify-between flex-1 h-full min-h-[580px]">
      {/* TOP ROW: Heraldic Crest (Echoing the crest atop the Alexander reference) */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl mx-auto flex items-center justify-center pt-2 sm:pt-4 text-center select-none"
      >
        <div className="flex items-center justify-center text-[#E9E5D8] opacity-75">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" stroke="#D94B4B" strokeWidth="0.8" fill="rgba(217, 75, 75, 0.1)" />
            <circle cx="12" cy="12" r="3" stroke="#E9E5D8" strokeWidth="0.75" />
            <line x1="12" y1="4" x2="12" y2="20" stroke="#888888" strokeWidth="0.5" strokeDasharray="1 2" />
          </svg>
        </div>
      </motion.div>

      {/* CENTERPIECE CONTAINER WITH FLANKING EDITORIAL SPECS & INTERACTIVE NAME */}
      <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center my-auto py-2 sm:py-4">
        {/* STRATEGIC SURROUNDING DETAILS: Floating Editorial Technical Chips */}
        <div className="w-full max-w-6xl px-4 hidden lg:flex items-center justify-between text-[9px] font-mono tracking-[0.22em] text-[#888888] uppercase pointer-events-none -mb-3 sm:-mb-6">
          {/* Left Side Note: Solidity / Smart Contracts */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col gap-1 text-left border-l border-[#888888]/30 pl-3"
          >
            <span className="text-[#E9E5D8] font-medium">SOLIDITY / SMART CONTRACTS</span>
            <span className="text-[#888888]/70 text-[8px] tracking-[0.26em]">EVM PROTOCOLS · ARCHITECTURAL AUDITING</span>
          </motion.div>

          {/* Right Side Note: Backend Systems / API Development */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col gap-1 text-right border-r border-[#888888]/30 pr-3"
          >
            <span className="text-[#E9E5D8] font-medium">BACKEND SYSTEMS / API DEVELOPMENT</span>
            <span className="text-[#888888]/70 text-[8px] tracking-[0.26em]">DISTRIBUTED NODES · HIGH-THROUGHPUT SERVICES</span>
          </motion.div>
        </div>

        {/* Centerpiece Hero Name */}
        {children}

        {/* UNDER-TITLE STATEMENT & CTA BUTTONS */}
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center mt-1 sm:mt-2 px-4 select-none">
          {/* Professional Statement */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mx-auto"
          >
            <p className="font-mono text-[9.5px] sm:text-[11px] tracking-[0.22em] text-[#E9E5D8] uppercase font-normal mb-1.5">
              BUILDING DECENTRALIZED &amp; SCALABLE SYSTEMS
            </p>
            <p className="font-sans text-xs sm:text-[13px] text-[#888888] leading-relaxed max-w-md sm:max-w-lg mx-auto font-light">
              Architecting high-assurance smart contracts, cryptographic protocols, and fault-tolerant backend infrastructure designed for deterministic scale.
            </p>
          </motion.div>

          {/* Action Buttons: Minimal Luxury Editorial Aesthetics */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 pointer-events-auto"
          >
            {/* CTA 1: View Selected Work */}
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                onScrollTo('#work');
              }}
              {...workHover}
              className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 sm:py-3 bg-[#E9E5D8] text-[#080808] font-mono text-[10.5px] sm:text-xs tracking-[0.18em] uppercase border border-[#E9E5D8] hover:bg-[#D94B4B] hover:text-[#FFFFFF] hover:border-[#D94B4B] transition-all duration-300 shadow-lg shadow-black/40"
            >
              <span>VIEW SELECTED WORK</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </a>

            {/* CTA 2: Let's Connect */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onScrollTo('#contact');
              }}
              {...contactHover}
              className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 sm:py-3 bg-transparent text-[#E9E5D8] font-mono text-[10.5px] sm:text-xs tracking-[0.18em] uppercase border border-[#888888]/40 hover:border-[#E9E5D8] hover:bg-[#171717] hover:text-[#FFFFFF] transition-all duration-300"
            >
              <span>LET&apos;S CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#D94B4B] transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM ROW: Technical Telemetry & Cinematic Animated Scroll Indicator */}
      <div className="w-full max-w-7xl mx-auto flex items-end justify-between pt-3 sm:pt-4 pb-1 sm:pb-2 px-4 sm:px-6 border-t border-[#888888]/20 select-none">
        {/* Left Side: System Telemetry */}
        <div className="hidden sm:flex items-center gap-2.5 font-mono text-[9px] tracking-[0.25em] text-[#888888] uppercase">
          <span className="w-1.5 h-1.5 bg-[#D94B4B] rotate-45 inline-block shrink-0" />
          <span className="text-[#E9E5D8] font-medium">SYS_ID // FM-2026</span>
          <span className="text-[#888888]/50">·</span>
          <span>DISTRIBUTED ARCHITECTURE</span>
        </div>

        {/* Center: Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ opacity: indicatorOpacity }}
          className="mx-auto sm:mx-0 flex flex-col items-center"
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              onScrollTo('#about');
            }}
            {...scrollHover}
            aria-label="Scroll to introduction"
            className="group flex flex-col items-center gap-1.5 font-mono text-[8.5px] sm:text-[9px] tracking-[0.3em] text-[#888888] hover:text-[#E9E5D8] transition-colors focus:outline-none"
          >
            <span className="uppercase">SCROLL</span>

            {/* Vertical Animated Line Indicator */}
            <div className="relative w-[1.5px] h-6 bg-[#888888]/25 overflow-hidden">
              <motion.div
                animate={{
                  y: ['-100%', '100%'],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: 'easeInOut',
                }}
                className="w-full h-1/2 bg-[#D94B4B]"
              />
            </div>
          </a>
        </motion.div>

        {/* Right Side: Coordinates / Technology Spec */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-[#888888] uppercase text-right">
          <span>LAT 31° 32&apos; N · LON 74° 20&apos; E</span>
        </div>
      </div>
    </div>
  );
};

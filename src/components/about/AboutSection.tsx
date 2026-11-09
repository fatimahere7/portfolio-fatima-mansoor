import React from 'react';
import { motion } from 'motion/react';
import { NetworkDiagram } from './NetworkDiagram';
import { useCursorTrigger } from '../cursor/CursorContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const STACK_KEYWORDS = [
  { name: 'NODE.JS & EXPRESS', category: 'BACKEND ARCHITECTURE' },
  { name: 'PYTHON & FASTAPI', category: 'API & AI SERVICES' },
  { name: 'POSTGRESQL & SUPABASE', category: 'DATABASE' },
  { name: 'SOLIDITY & FOUNDRY', category: 'SMART CONTRACTS' },
  { name: 'ETHERS.JS & EVM', category: 'WEB3 PROTOCOLS' },
  { name: 'STRIGA & STRIPE', category: 'FINTECH INTEGRATION' },
  { name: 'DISTILBERT & GEMINI', category: 'AI & NLP PIPELINES' },
  { name: 'MONGODB & MYSQL', category: 'PERSISTENCE' },
  { name: 'RAG & SEMANTIC SEARCH', category: 'INTELLIGENT SYSTEMS' },
];

export const AboutSection: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();
  const linkHover = useCursorTrigger('link');

  return (
    <section
      id="about"
      className="relative w-full pt-28 sm:pt-36 pb-28 sm:pb-36 px-4 sm:px-8 lg:px-12 scroll-mt-20 bg-[#F5F5F5] text-[#222222] border-t border-[#858585]/20"
      aria-label="About Fatima Mansoor"
    >
      <div className="max-w-7xl mx-auto">
        {/* UPPER ASYMMETRICAL GRID: Section Label & Editorial Statement */}
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12 mb-20 sm:mb-24">
          {/* LEFT COLUMN: Section Identifier & Technical Profile Card */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Section Technical Marker */}
              <motion.div
                initial={prefersReduced ? {} : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="font-mono text-xs text-[#222222] font-bold tracking-widest">
                  02
                </span>
                <span className="h-px w-6 bg-[#D6B36A]" />
                <span className="font-mono text-[11px] tracking-[0.25em] text-[#7B7B7B] uppercase">
                  ABOUT
                </span>
              </motion.div>

              {/* Minimal Monochrome Profile Spec Panel */}
              <motion.div
                initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 rounded-none bg-white border border-[#7B7B7B]/20 font-mono text-[10px] tracking-[0.18em] space-y-4 max-w-xs shadow-sm"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-[#7B7B7B]/15">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#222222] flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#D6B36A]" />
                    PROFILE SPEC
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-[#7B7B7B]/15">
                  <span className="text-[#7B7B7B] uppercase font-medium">LOCATION</span>
                  <span className="text-[#222222] font-semibold tracking-wider">LAHORE, PK</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-[#7B7B7B]/15">
                  <span className="text-[#7B7B7B] uppercase font-medium">DISCIPLINE</span>
                  <span className="text-[#222222] font-semibold tracking-wider text-right">BACKEND &amp; WEB3</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-[#7B7B7B]/15">
                  <span className="text-[#7B7B7B] uppercase font-medium">FOCUS</span>
                  <span className="text-[#222222] font-semibold tracking-wider">EVM &amp; ARCHITECTURE</span>
                </div>

                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-[#7B7B7B] uppercase font-medium">STATUS</span>
                  <span className="text-[#EF4444] font-semibold flex items-center gap-2 tracking-wide">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]" />
                    </span>
                    AVAILABLE
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Subtle Reference Mark */}
            <div className="hidden lg:flex items-center gap-2 font-mono text-[9px] text-[#7B7B7B] tracking-widest mt-12">
              <span>REF · FATIMA.DEV</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Large Editorial Statement & Personal Introduction */}
          <div className="col-span-12 lg:col-span-8">
            {/* Large Statement with Clip-Path Entrance */}
            <div className="overflow-hidden">
              <motion.h2
                initial={prefersReduced ? {} : { clipPath: 'inset(100% 0 0 0)', y: 30, opacity: 0 }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-3xl sm:text-5xl lg:text-6xl font-light text-[#222222] leading-[1.12] tracking-tight"
              >
                I build digital systems where{' '}
                <span className="italic font-normal">blockchain infrastructure</span> meets{' '}
                <span className="font-semibold">resilient backend architecture</span>.
              </motion.h2>
            </div>

            {/* Personal Introduction Paragraph */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 max-w-2xl"
            >
              <p className="font-sans text-base sm:text-lg text-[#7B7B7B] font-normal leading-relaxed">
                I am a backend and blockchain developer based in Lahore, Pakistan, focused on
                translating complex distributed mechanics into robust, secure production software.
                My work bridges EVM smart contract logic, high-throughput REST and WebSocket APIs,
                and persistent database architectures. I solve performance bottlenecks, harden
                cryptographic protocols, and build verifiable digital systems from inception to
                mainnet.
              </p>
            </motion.div>
          </div>
        </div>

        {/* STRUCTURAL TECHNICAL DIVIDER LINE */}
        <div className="w-full h-px bg-[#7B7B7B]/20 my-16 sm:my-20" />

        {/* INFRASTRUCTURE TOPOLOGY & TECH STACK SUMMARY */}
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12 items-start">
          {/* LEFT: Abstract System Network Visual Diagram */}
          <div className="col-span-12 lg:col-span-5">
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <NetworkDiagram />
              <div className="mt-3 flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-[#7B7B7B] uppercase">
                <span>FIGURE 01 · TOPOLOGICAL CONSENSUS MATRIX</span>
                <span className="text-[#222222] font-semibold">VERIFIED</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Current Technical Stack (Interactive Unboxed Grid) */}
          <div className="col-span-12 lg:col-span-7 lg:pl-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-5 font-mono text-[10px] tracking-[0.25em] text-[#222222] uppercase font-bold">
                <div className="flex items-center gap-2">
                  <span>CURRENT TECH STACK</span>
                  <span className="text-[#7B7B7B]">·</span>
                  <span className="text-[#7B7B7B]">PROFILE SUMMARY</span>
                </div>
                <span className="hidden sm:inline font-mono text-[9px] tracking-widest text-[#7B7B7B] px-2 py-0.5 border border-[#7B7B7B]/20 bg-white">
                  SPEC
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {STACK_KEYWORDS.map((tech, idx) => (
                  <motion.div
                    key={tech.name}
                    initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.35, delay: 0.03 * idx }}
                    {...linkHover}
                    className="p-4 rounded-none bg-white border border-[#7B7B7B]/20 hover:border-[#222222] shadow-sm hover:shadow transition-all duration-150 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs tracking-wider text-[#222222] font-semibold">
                        {tech.name}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#7B7B7B]" />
                    </div>
                    <span className="font-mono text-[9px] tracking-[0.16em] text-[#7B7B7B] uppercase">
                      {tech.category}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

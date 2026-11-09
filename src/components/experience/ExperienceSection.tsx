import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { EXPERIENCES } from '../../data/experience';
import { ExperienceEntry } from './ExperienceEntry';
import { ArrowDown, Briefcase } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Dynamic scroll-driven progress for the central timeline glowing line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 35%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative z-10 w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-8 lg:px-12 bg-[#222222] text-[#FFFFFF] select-none border-t border-[#858585]/20 overflow-hidden"
      aria-label="Professional Experience & Where I've Built"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* ================= SECTION INTRO ================= */}
        <div className="mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-4"
          >
            {/* Subtle numbering accent in warm yellow #D6B36A */}
            <span className="font-mono text-xs text-[#D6B36A] font-bold tracking-widest">
              05
            </span>
            {/* Small decorative line in warm yellow #D6B36A */}
            <span className="h-px w-6 bg-[#D6B36A]/60" />
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#858585] uppercase">
              PROFESSIONAL EXPERIENCE
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-2 pb-8 border-b border-[#858585]/20">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-4xl sm:text-6xl lg:text-7xl font-bold text-[#FFFFFF] tracking-tight uppercase leading-[0.95]"
              >
                WHERE<br />
                <span className="text-[#858585] font-normal italic">I'VE BUILT</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md"
            >
              <p className="font-sans text-xs sm:text-sm text-[#858585] font-normal leading-relaxed mb-3">
                A chronological record of full-stack systems engineering, high-throughput fintech pipelines, and production platforms.
              </p>
              <div className="flex items-center gap-3 font-mono text-[10px] text-[#FFFFFF] tracking-widest uppercase font-semibold">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3 text-[#D6B36A]" />
                  {EXPERIENCES.length} ROLES
                </span>
                <span className="text-[#858585]/40">·</span>
                <span className="text-[#858585]">2024 — PRESENT</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================= EDITORIAL TIMELINE CONTAINER ================= */}
        <div ref={timelineRef} className="relative w-full">
          {/* DESKTOP CENTRAL VERTICAL LINE */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-16 w-[2px] bg-[#858585]/25 pointer-events-none -translate-x-1/2">
            {/* Dynamic Warm Yellow Progress Beam */}
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-[#D6B36A] shadow-[0_0_10px_rgba(214,179,106,0.6)] relative"
            >
              <div className="absolute -bottom-1 -left-[3px] w-2 h-2 rounded-full bg-[#D6B36A]" />
            </motion.div>
          </div>

          {/* MOBILE VERTICAL TIMELINE LINE */}
          <div className="lg:hidden absolute left-6 top-10 bottom-12 w-[2px] bg-[#858585]/25 pointer-events-none -translate-x-1/2">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-[#D6B36A] shadow-[0_0_10px_rgba(214,179,106,0.6)] relative"
            >
              <div className="absolute -bottom-1 -left-[3px] w-2 h-2 rounded-full bg-[#D6B36A]" />
            </motion.div>
          </div>

          {/* TIMELINE ENTRIES */}
          <div className="space-y-4 sm:space-y-6">
            {EXPERIENCES.map((exp, index) => (
              <ExperienceEntry
                key={exp.id}
                experience={exp}
                index={index}
                isLast={index === EXPERIENCES.length - 1}
              />
            ))}
          </div>
        </div>

        {/* ================= BOTTOM MARKER ================= */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#858585]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-xs text-[#858585]">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A]" />
            <span className="tracking-wider uppercase text-[10px] text-[#FFFFFF]">
              TIMELINE COMPLETE · 2024 — PRESENT
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#858585]">
            <span>CONTINUING TO NEXT SECTION</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#D6B36A]" />
          </div>
        </div>
      </div>
    </section>
  );
};

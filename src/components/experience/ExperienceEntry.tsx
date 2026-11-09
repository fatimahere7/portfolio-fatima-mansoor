import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import type { ExperienceItem } from '../../types/experience';
import { useCursorTrigger } from '../cursor/CursorContext';

interface ExperienceEntryProps {
  experience: ExperienceItem;
  index: number;
  isLast: boolean;
}

export const ExperienceEntry: React.FC<ExperienceEntryProps> = ({
  experience,
  index,
  isLast,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const linkHover = useCursorTrigger('link');

  // Alternating sides on desktop:
  // Index 0: Right
  // Index 1: Left
  // Index 2: Right
  // Index 3: Left
  const isRight = index % 2 === 0;

  return (
    <div className="relative w-full py-6 sm:py-8 lg:py-12 group">
      {/* ============================================================== */}
      {/* CENTRAL TIMELINE NODE (Desktop: exact center; Mobile: left-6) */}
      {/* ============================================================== */}
      <div className="absolute left-6 lg:left-1/2 top-10 sm:top-12 -translate-x-1/2 z-20 pointer-events-none">
        <motion.div
          initial={{ scale: 0.6, opacity: 0.3 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
        >
          {/* Outer Ring with Warm Yellow Accent */}
          <div
            className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center bg-[#222222] ${
              isHovered
                ? 'border-[#D6B36A] shadow-[0_0_14px_rgba(214,179,106,0.5)] scale-110'
                : 'border-[#D6B36A]/80 shadow-[0_0_8px_rgba(214,179,106,0.3)]'
            }`}
          >
            {/* Inner Solid Warm Yellow Dot */}
            <div
              className={`w-2 h-2 rounded-full bg-[#D6B36A] transition-transform duration-300 ${
                isHovered ? 'scale-125' : ''
              }`}
            />
          </div>

          {/* Subtle Ambient Halo */}
          <div className="absolute inset-0 -m-1.5 rounded-full bg-[#D6B36A]/10 animate-ping pointer-events-none opacity-40" />
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP LAYOUT (>= lg): Alternating Left / Right Columns        */}
      {/* ============================================================== */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-16 xl:gap-24 items-start w-full">
        {/* LEFT COLUMN */}
        {isRight ? (
          <div className="w-full" aria-hidden="true" />
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.25, margin: '-40px 0px -40px 0px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full flex justify-end"
          >
            <TimelineCard
              experience={experience}
              isHovered={isHovered}
              linkHover={linkHover}
            />
          </motion.div>
        )}

        {/* RIGHT COLUMN */}
        {isRight ? (
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.25, margin: '-40px 0px -40px 0px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full flex justify-start"
          >
            <TimelineCard
              experience={experience}
              isHovered={isHovered}
              linkHover={linkHover}
            />
          </motion.div>
        ) : (
          <div className="w-full" aria-hidden="true" />
        )}
      </div>

      {/* ============================================================== */}
      {/* MOBILE / TABLET LAYOUT (< lg): All cards on right of line       */}
      {/* ============================================================== */}
      <div className="lg:hidden pl-12 sm:pl-16 w-full">
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15, margin: '-30px 0px -30px 0px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-full"
        >
          <TimelineCard
            experience={experience}
            isHovered={isHovered}
            linkHover={linkHover}
          />
        </motion.div>
      </div>
    </div>
  );
};

interface TimelineCardProps {
  experience: ExperienceItem;
  isHovered: boolean;
  linkHover: Record<string, unknown>;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  experience,
  isHovered,
  linkHover,
}) => {
  return (
    <article
      className={`relative w-full max-w-xl bg-[#1a1a1a] rounded-2xl p-6 sm:p-7 lg:p-8 border transition-all duration-300 select-text ${
        isHovered
          ? 'border-[#858585]/50 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.5)] -translate-y-1'
          : 'border-[#858585]/20 shadow-xl shadow-black/40'
      }`}
    >
      {/* TOP HEADER: Date Badge + Location Badge */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono tracking-wider uppercase">
        {/* Date / Period Badge with Calendar Icon in Warm Yellow #D6B36A */}
        <div className="flex items-center gap-2 text-[#D6B36A] font-bold">
          <Calendar className="w-3.5 h-3.5 text-[#D6B36A] shrink-0" />
          <span>{experience.period}</span>
        </div>

        {/* Location Badge with MapPin Icon: Secondary text #858585 */}
        <div className="flex items-center gap-1.5 text-[#858585] font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#858585] shrink-0" />
          <span>{experience.location}</span>
        </div>
      </div>

      {/* JOB TITLE: Primary text #FFFFFF */}
      <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight leading-snug mt-3.5">
        {experience.role}
      </h3>

      {/* COMPANY NAME in Warm Yellow #D6B36A */}
      <div className="font-mono text-xs sm:text-[13px] font-bold text-[#D6B36A] tracking-wider uppercase mt-1">
        {experience.company}
      </div>

      {/* DELIVERABLES / BULLET LIST: Secondary text #858585 */}
      {experience.deliverables && experience.deliverables.length > 0 && (
        <ul className="mt-4 sm:mt-5 space-y-2.5">
          {experience.deliverables.map((deliv, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 font-sans text-xs sm:text-[13.5px] text-[#858585] leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#858585]/60 mt-2 shrink-0 transition-colors duration-200 group-hover:bg-[#D6B36A]" />
              <span>{deliv}</span>
            </li>
          ))}
        </ul>
      )}

      {/* TECHNOLOGIES TAGS: Background #222222, Border #858585/25, Text #858585 */}
      {experience.technologies && experience.technologies.length > 0 && (
        <div className="mt-5 pt-4 border-t border-[#858585]/20 flex flex-wrap gap-1.5">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider text-[#858585] bg-[#222222] border border-[#858585]/25 hover:border-[#858585]/60 hover:text-[#FFFFFF] transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* OPTIONAL VERIFIED LINK */}
      {experience.verifiedUrl && (
        <div className="mt-4 pt-3 border-t border-[#858585]/20">
          <a
            href={experience.verifiedUrl}
            target="_blank"
            rel="noopener noreferrer"
            {...linkHover}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#D6B36A] hover:text-[#FFFFFF] transition-colors"
          >
            <span>Verify Deployment</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </article>
  );
};

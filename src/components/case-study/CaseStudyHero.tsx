import React from 'react';
import { motion } from 'motion/react';
import type { ProjectItem } from '../../types/project';
import { useCursorTrigger } from '../cursor/CursorContext';
import { Github, ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface CaseStudyHeroProps {
  project: ProjectItem;
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ project }) => {
  const linkHover = useCursorTrigger('link');

  return (
    <header className="relative pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-[#7B7B7B]/20">
      {/* Top Small Technical Marker */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.24em] text-[#7B7B7B] uppercase mb-4"
      >
        <span className="text-white font-semibold text-xs tabular-nums">{project.number}</span>
        <span>//</span>
        <span className="text-white font-medium">{project.category}</span>
        {project.status && (
          <>
            <span className="text-[#7B7B7B] hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-1.5 text-[#EF4444] font-mono text-[9px] tracking-widest font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />
              {project.status}
            </span>
          </>
        )}
      </motion.div>

      {/* Large Editorial Title */}
      <div className="overflow-hidden mb-3">
        <motion.h1
          initial={{ clipPath: 'inset(100% 0 0 0)', y: 40, opacity: 0 }}
          animate={{ clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="editorial-title text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1] max-w-5xl uppercase"
        >
          {project.title}
        </motion.h1>
      </div>

      {/* Subtitle */}
      {project.subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-xs sm:text-sm text-[#7B7B7B] tracking-wide uppercase mb-6 max-w-3xl font-medium"
        >
          {project.subtitle}
        </motion.p>
      )}

      {/* 2. Concise, Impactful Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mb-8"
      >
        <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed font-normal">
          {project.introduction}
        </p>
      </motion.div>

      {/* Repository Links Banner (if available) */}
      {(project.github || project.githubClient || project.githubServer) && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          {project.githubClient && (
            <a
              href={project.githubClient}
              target="_blank"
              rel="noopener noreferrer"
              {...linkHover}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-white hover:text-[#222222] border border-[#7B7B7B]/30 font-mono text-xs text-white uppercase tracking-wider transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>CLIENT REPOSITORY (EXPO / REACT NATIVE)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}

          {project.githubServer && (
            <a
              href={project.githubServer}
              target="_blank"
              rel="noopener noreferrer"
              {...linkHover}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-white hover:text-[#222222] border border-[#7B7B7B]/30 font-mono text-xs text-white uppercase tracking-wider transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>SERVER REPOSITORY (FASTAPI / AI)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}

          {project.github && !project.githubClient && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              {...linkHover}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-white hover:text-[#222222] border border-[#7B7B7B]/30 font-mono text-xs text-white uppercase tracking-wider transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>OPEN SOURCE REPOSITORY</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </motion.div>
      )}

      {/* Metadata Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="pt-6 border-t border-[#7B7B7B]/20 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono"
      >
        <div>
          <div className="text-[9px] tracking-[0.25em] text-[#7B7B7B] uppercase mb-1">
            YEAR
          </div>
          <div className="text-xs sm:text-sm text-white font-medium tabular-nums">
            {project.year || '2025'}
          </div>
        </div>

        <div>
          <div className="text-[9px] tracking-[0.25em] text-[#7B7B7B] uppercase mb-1">
            ROLE &amp; FOCUS
          </div>
          <div className="text-xs sm:text-sm text-white font-medium">
            {project.role || 'Backend & Blockchain Developer'}
          </div>
        </div>

        <div>
          <div className="text-[9px] tracking-[0.25em] text-[#7B7B7B] uppercase mb-1">
            CATEGORY GROUP
          </div>
          <div className="text-xs sm:text-sm text-white font-medium">
            {project.primaryGroup}
          </div>
        </div>

        <div>
          <div className="text-[9px] tracking-[0.25em] text-[#7B7B7B] uppercase mb-1">
            SYSTEM STATUS
          </div>
          <div className="text-xs sm:text-sm text-[#EF4444] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
            {project.status || 'VERIFIED'}
          </div>
        </div>
      </motion.div>
    </header>
  );
};

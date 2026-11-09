import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../../data/projects';
import type { ProjectCategoryGroup, ProjectItem } from '../../types/project';
import { ProjectCardFeatured } from './ProjectCardFeatured';
import { ProjectCardStandard } from './ProjectCardStandard';
import { useCursorTrigger } from '../cursor/CursorContext';
import { ArrowUpRight, Github, Code, Cpu, Terminal, Filter } from 'lucide-react';

interface WorkSectionProps {
  onOpenCaseStudy?: (projectId: string) => void;
}

const CATEGORIES: ProjectCategoryGroup[] = [
  'ALL',
  'BACKEND & FINTECH',
  'BLOCKCHAIN & WEB3',
  'AI & INTELLIGENT SYSTEMS',
  'FULL-STACK APPLICATIONS',
];

export const WorkSection: React.FC<WorkSectionProps> = ({ onOpenCaseStudy }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategoryGroup>('ALL');
  const linkHover = useCursorTrigger('link');
  const buttonHover = useCursorTrigger('button');

  // Filter projects according to selected category
  const filteredProjects =
    selectedCategory === 'ALL'
      ? PROJECTS
      : PROJECTS.filter((p) => p.primaryGroup === selectedCategory);

  // Groupings for the curated default ("ALL") view:
  const featuredOmegaPay = PROJECTS.find((p) => p.id === 'omegapay-fintech-backend') || PROJECTS[0];
  const featuredBCT = PROJECTS.find((p) => p.id === 'bct-staking-platform') || PROJECTS[1];
  const aiProjects = PROJECTS.filter((p) => p.primaryGroup === 'AI & INTELLIGENT SYSTEMS');
  const secondarySystems = PROJECTS.filter(
    (p) =>
      p.id === 'tycoonz-payslip-hrms' ||
      p.id === 'appointment-scheduler' ||
      p.id === 'laravel-ecommerce-platform'
  );

  return (
    <section
      id="work"
      className="relative z-10 w-full py-28 sm:py-36 lg:py-44 px-4 sm:px-8 lg:px-12 bg-[#222222] text-white select-none border-t border-[#7B7B7B]/20"
      aria-label="Selected Projects & Engineering Architecture"
    >
      <div className="max-w-7xl mx-auto">
        {/* SECTION INTRO HEADER */}
        <div className="mb-14 sm:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="font-mono text-xs text-white font-bold tracking-widest">
              03
            </span>
            <span className="h-px w-6 bg-[#D6B36A]" />
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#7B7B7B] uppercase">
              PORTFOLIO PROJECTS
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-2 pb-8 border-b border-[#7B7B7B]/20">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ clipPath: 'inset(100% 0 0 0)', y: 30, opacity: 0 }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight uppercase leading-[0.95]"
              >
                FEATURED<br />
                <span className="text-[#7B7B7B] font-normal italic">PROJECTS</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-lg"
            >
              <p className="font-sans text-xs sm:text-sm text-[#7B7B7B] font-normal leading-relaxed mb-3">
                Production-grade systems, EVM smart contracts, fintech integrations, AI pipelines, and backend architectures built by Fatima Mansoor.
              </p>
              <div className="flex items-center gap-3 font-mono text-[10px] text-white tracking-widest uppercase font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                  SEVEN VERIFIED SYSTEMS
                </span>
                <span className="text-[#7B7B7B]">·</span>
                <span className="text-[#7B7B7B]">REAL TECHNICAL SCOPE</span>
              </div>
            </motion.div>
          </div>

          {/* CATEGORY FILTER BAR */}
          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs">
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-[#7B7B7B] tracking-wider uppercase mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>CATEGORY:</span>
            </div>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  {...buttonHover}
                  className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs tracking-wider uppercase border transition-all duration-200 focus:outline-none ${
                    isSelected
                      ? 'bg-white text-[#222222] border-white font-semibold'
                      : 'bg-[#1a1a1a] text-[#7B7B7B] border-[#7B7B7B]/25 hover:border-white hover:text-white'
                  }`}
                >
                  {cat}
                  <span className="ml-1.5 text-[9px] opacity-70">
                    ({cat === 'ALL' ? PROJECTS.length : PROJECTS.filter((p) => p.primaryGroup === cat).length})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PROJECTS CONTAINER */}
        <AnimatePresence mode="wait">
          {selectedCategory === 'ALL' ? (
            /* Curated Hierarchical Presentation */
            <motion.div
              key="all-curated-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-16 sm:space-y-24"
            >
              {/* LEVEL 1: Top 2 Primary Projects (OmegaPay & BCT) */}
              <div className="space-y-12">
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-[#7B7B7B] uppercase">
                  <span className="text-[#EF4444] font-semibold">// 01</span>
                  <span className="text-white font-semibold">CORE ARCHITECTURAL FOCUS</span>
                  <span className="text-[#7B7B7B]">· FINTECH &amp; BLOCKCHAIN</span>
                </div>

                <div className="space-y-10">
                  {/* Project 01: OmegaPay */}
                  <ProjectCardFeatured
                    project={featuredOmegaPay}
                    onOpenCaseStudy={onOpenCaseStudy}
                  />

                  {/* Project 02: BCT Staking Platform */}
                  <ProjectCardFeatured
                    project={featuredBCT}
                    onOpenCaseStudy={onOpenCaseStudy}
                  />
                </div>
              </div>

              {/* LEVEL 2: AI & Intelligent Systems (Semantiscope & Resume RAG) */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-[#7B7B7B] uppercase">
                  <span className="text-[#EF4444] font-semibold">// 02</span>
                  <span className="text-white font-semibold">AI &amp; INTELLIGENT SYSTEMS</span>
                  <span className="text-[#7B7B7B]">· NLP &amp; RAG ARCHITECTURES</span>
                </div>

                <div className="space-y-10">
                  {aiProjects.map((project) => (
                    <ProjectCardFeatured
                      key={project.id}
                      project={project}
                      onOpenCaseStudy={onOpenCaseStudy}
                    />
                  ))}
                </div>
              </div>

              {/* LEVEL 3: Backend & Full-Stack Systems (Tycoonz, Scheduler, Laravel) */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-[#7B7B7B] uppercase">
                  <span className="text-[#EF4444] font-semibold">// 03</span>
                  <span className="text-white font-semibold">BACKEND &amp; FULL-STACK APPLICATIONS</span>
                  <span className="text-[#7B7B7B]">· BUSINESS SYSTEMS</span>
                </div>

                <div className="space-y-10">
                  {secondarySystems.map((project) => (
                    <ProjectCardFeatured
                      key={project.id}
                      project={project}
                      onOpenCaseStudy={onOpenCaseStudy}
                    />
                  ))}
                </div>
              </div>

              {/* LEVEL 4: GitHub Repository Index Callout */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 bg-[#181a20]/40 rounded-3xl border border-white/5 hover:border-white/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#222222] border border-[#7B7B7B]/30 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.2em] text-[#7B7B7B] uppercase">
                      OPEN SOURCE ARCHIVES
                    </div>
                    <h4 className="font-sans text-xl sm:text-2xl text-white font-bold">
                      Explore Open Repositories
                    </h4>
                    <p className="font-sans text-xs text-[#7B7B7B] font-normal mt-0.5">
                      Review smart contracts, API codebases, and experimental AI projects on GitHub.
                    </p>
                  </div>
                </div>

                <a
                  href="https://github.com/fatimahere7"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...linkHover}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#222222] hover:bg-[#222222] hover:text-white border border-white hover:border-[#7B7B7B] rounded-xl font-mono text-xs uppercase tracking-wider transition-colors font-semibold shrink-0"
                >
                  <span>github.com/fatimahere7</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>
          ) : (
            /* Filtered Category Grid: side-by-side equal-level layout */
            <motion.div
              key={`filtered-view-${selectedCategory}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {filteredProjects.map((project) => (
                <ProjectCardFeatured
                  key={project.id}
                  project={project}
                  onOpenCaseStudy={onOpenCaseStudy}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

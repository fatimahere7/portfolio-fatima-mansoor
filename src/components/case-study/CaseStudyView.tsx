import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../../data/projects';
import type { ProjectItem } from '../../types/project';
import { CaseStudyHero } from './CaseStudyHero';
import { CaseStudyInteractiveVisual } from './CaseStudyInteractiveVisual';
import { CaseStudyNarrative } from './CaseStudyNarrative';
import { CaseStudyNavigation } from './CaseStudyNavigation';
import { useCursorTrigger } from '../cursor/CursorContext';
import { ArrowLeft, X, Github, ExternalLink, ArrowUpRight } from 'lucide-react';

interface CaseStudyViewProps {
  project: ProjectItem;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({
  project,
  onClose,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linkHover = useCursorTrigger('link');
  const buttonHover = useCursorTrigger('button');

  // Compute previous and next project indices
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? PROJECTS[currentIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject =
    currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : PROJECTS[0];

  // Scroll to top upon project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [project.id]);

  // Keyboard navigation: Escape to close, Left/Right arrows to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && !e.metaKey && !e.ctrlKey) {
        onSelectProject(nextProject.id);
      } else if (e.key === 'ArrowLeft' && !e.metaKey && !e.ctrlKey) {
        onSelectProject(prevProject.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onSelectProject, nextProject.id, prevProject.id]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-40 w-full min-h-screen bg-[#222222] text-white selection:bg-[#7B7B7B]/30 selection:text-white"
      role="main"
      aria-label={`Case Study: ${project.title}`}
    >
      {/* TOP FIXED CASE STUDY TELEMETRY BAR */}
      <div className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#222222]/95 border-b border-[#7B7B7B]/20 px-4 sm:px-8 lg:px-12 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 font-mono text-xs">
          {/* Back Action */}
          <button
            type="button"
            onClick={onClose}
            {...buttonHover}
            className="group inline-flex items-center gap-2 text-[#7B7B7B] hover:text-white transition-colors focus:outline-none"
            aria-label="Return to Selected Work"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-white group-hover:-translate-x-1 transition-transform" />
            <span className="tracking-wider text-[11px] uppercase">
              RETURN TO WORK
            </span>
            <span className="hidden sm:inline text-[#7B7B7B]/60 text-[10px] tracking-normal">
              [ESC]
            </span>
          </button>

          {/* Breadcrumb Info */}
          <div className="hidden md:flex items-center gap-2 text-[10px] tracking-widest text-[#7B7B7B] uppercase">
            <span className="text-white font-semibold">{project.number}</span>
            <span>//</span>
            <span className="text-white truncate max-w-xs">{project.title}</span>
          </div>

          {/* Shortcuts & Close Button */}
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                {...linkHover}
                title="View GitHub Repository"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1a1a1a] hover:bg-white hover:text-[#222222] border border-[#7B7B7B]/20 text-[#7B7B7B] text-[10px] tracking-wider uppercase transition-colors"
              >
                <Github className="w-3 h-3" />
                <span>REPO</span>
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                {...linkHover}
                title="View Live Deployment"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1a1a1a] hover:bg-white hover:text-[#222222] border border-[#EF4444]/40 text-[#EF4444] text-[10px] tracking-wider uppercase transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />
                <ExternalLink className="w-3 h-3" />
                <span>LIVE</span>
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              {...buttonHover}
              className="p-1.5 rounded text-[#7B7B7B] hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              title="Close Case Study"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CASE STUDY CONTENT BODY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Project Hero Header */}
        <CaseStudyHero project={project} />

        {/* Interactive Architecture & Code Inspector */}
        <CaseStudyInteractiveVisual project={project} />

        {/* Narrative Chapters (Problem, Architecture, Invariants, Benchmarks) */}
        <CaseStudyNarrative project={project} />

        {/* Bottom Project Navigation (Prev / Next / Return) */}
        <CaseStudyNavigation
          currentProject={project}
          prevProject={prevProject}
          nextProject={nextProject}
          onSelectProject={onSelectProject}
          onClose={onClose}
        />
      </div>
    </motion.div>
  );
};

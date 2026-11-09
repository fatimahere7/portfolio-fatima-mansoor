import React from 'react';
import type { ProjectItem } from '../../types/project';
import { useCursorTrigger } from '../cursor/CursorContext';
import { ArrowLeft, ArrowRight, Grid } from 'lucide-react';

interface CaseStudyNavigationProps {
  currentProject: ProjectItem;
  prevProject: ProjectItem;
  nextProject: ProjectItem;
  onSelectProject: (projectId: string) => void;
  onClose: () => void;
}

export const CaseStudyNavigation: React.FC<CaseStudyNavigationProps> = ({
  currentProject,
  prevProject,
  nextProject,
  onSelectProject,
  onClose,
}) => {
  const linkHover = useCursorTrigger('link');
  const buttonHover = useCursorTrigger('button');

  return (
    <footer className="pt-16 sm:pt-20 pb-20" aria-label="Case Study Project Navigation">
      {/* Return Button Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-12 border-b border-[#7B7B7B]/20">
        <div>
          <span className="font-mono text-[9px] tracking-[0.24em] text-[#7B7B7B] uppercase block mb-1">
            END OF CASE STUDY // {currentProject.title}
          </span>
          <span className="font-sans text-lg sm:text-xl text-white font-light">
            Continue exploring Fatima Mansoor's verified engineering systems
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          {...buttonHover}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#1a1a1a] hover:bg-white hover:text-[#222222] border border-[#7B7B7B]/30 text-xs font-mono tracking-wider text-white transition-all duration-200 uppercase font-semibold"
        >
          <Grid className="w-3.5 h-3.5" />
          <span>RETURN TO SELECTED WORK</span>
        </button>
      </div>

      {/* Prev / Next Dual Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
        {/* PREVIOUS PROJECT */}
        <button
          type="button"
          onClick={() => onSelectProject(prevProject.id)}
          {...linkHover}
          className="group text-left p-6 sm:p-8 bg-[#1a1a1a] border border-[#7B7B7B]/20 hover:border-white transition-colors duration-200 flex flex-col justify-between"
        >
          <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-[#7B7B7B] uppercase mb-4">
            <ArrowLeft className="w-3 h-3 text-white group-hover:-translate-x-1 transition-transform" />
            <span>PREVIOUS PROJECT</span>
            <span>·</span>
            <span className="tabular-nums text-white font-semibold">{prevProject.number}</span>
          </div>

          <div>
            <span className="font-mono text-[9.5px] text-[#7B7B7B] uppercase tracking-wider block mb-1">
              {prevProject.category}
            </span>
            <h4 className="font-sans text-xl sm:text-2xl text-white font-bold group-hover:text-[#7B7B7B] transition-colors leading-snug">
              {prevProject.title}
            </h4>
          </div>
        </button>

        {/* NEXT PROJECT */}
        <button
          type="button"
          onClick={() => onSelectProject(nextProject.id)}
          {...linkHover}
          className="group text-left p-6 sm:p-8 bg-[#1a1a1a] border border-[#7B7B7B]/20 hover:border-white transition-colors duration-200 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-[#7B7B7B] uppercase mb-4">
            <div className="flex items-center gap-2">
              <span>NEXT PROJECT</span>
              <span>·</span>
              <span className="tabular-nums text-white font-semibold">{nextProject.number}</span>
            </div>
            <ArrowRight className="w-3 h-3 text-white group-hover:translate-x-1 transition-transform" />
          </div>

          <div>
            <span className="font-mono text-[9.5px] text-[#7B7B7B] uppercase tracking-wider block mb-1">
              {nextProject.category}
            </span>
            <h4 className="font-sans text-xl sm:text-2xl text-white font-bold group-hover:text-[#7B7B7B] transition-colors leading-snug">
              {nextProject.title}
            </h4>
          </div>
        </button>
      </div>
    </footer>
  );
};

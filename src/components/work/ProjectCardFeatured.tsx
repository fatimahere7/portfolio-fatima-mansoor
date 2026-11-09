import React from 'react';
import { motion } from 'motion/react';
import { ProjectVisual } from './ProjectVisual';
import { useCursorTrigger } from '../cursor/CursorContext';
import type { ProjectItem } from '../../types/project';
import { Github } from 'lucide-react';

interface ProjectCardFeaturedProps {
  project: ProjectItem;
  onOpenCaseStudy?: (projectId: string) => void;
  className?: string;
}

export const ProjectCardFeatured: React.FC<ProjectCardFeaturedProps> = ({
  project,
  onOpenCaseStudy,
  className = '',
}) => {
  const projectHover = useCursorTrigger('project', 'EXPLORE');
  const linkHover = useCursorTrigger('link');

  const handleCaseStudyClick = (e: React.MouseEvent) => {
    if (onOpenCaseStudy) {
      e.preventDefault();
      onOpenCaseStudy(project.id);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative w-full bg-[#181a20]/40 hover:bg-[#181a20]/70 rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/5 hover:border-white/20 transition-all duration-300 ${className}`}
      aria-labelledby={`featured-project-${project.id}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Dominant Visual Showcase (6 Columns on Desktop) - Equal level, aspect 4:3, no text on image */}
        <div className="lg:col-span-6 w-full cursor-pointer" {...projectHover} onClick={handleCaseStudyClick}>
          <a
            href={project.caseStudyUrl || project.github || '#'}
            onClick={handleCaseStudyClick}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-2xl sm:rounded-3xl"
            tabIndex={0}
            aria-label={`View ${project.title} case study`}
          >
            <ProjectVisual
              type={project.visualType || 'fintech'}
              image={project.image}
              title={project.title}
              category={project.category}
              number={project.number}
              aspectRatio="aspect-[4/3]"
              className="rounded-2xl sm:rounded-3xl shadow-2xl"
            />
          </a>
        </div>

        {/* Narrative & Engineering Overview Column (6 Columns on Desktop) - Equal level side by side */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
          {/* Top Meta Tag matching reference: 02 / FINTECH / REMITTANCE */}
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#A1A1AA] uppercase">
            {project.number === '01' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A] shrink-0" aria-hidden="true" />
            )}
            <span className="font-semibold text-white/90">{project.number}</span>
            <span className="text-[#7B7B7B]">/</span>
            <span className="text-[#D4D4D8] truncate">{project.category}</span>
          </div>

          {/* Huge Title in Reference Typographic Style */}
          <div>
            <a
              href={project.caseStudyUrl || project.github || '#'}
              onClick={handleCaseStudyClick}
              {...linkHover}
              className="group/title inline-block focus:outline-none"
            >
              <h3
                id={`featured-project-${project.id}`}
                className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black italic tracking-tight text-white uppercase group-hover/title:text-white/80 transition-colors leading-[0.95]"
              >
                {project.title}
              </h3>
            </a>

            {project.subtitle && (
              <p className="font-mono text-[11px] text-[#7B7B7B] mt-2.5 tracking-wider uppercase font-medium">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Clean Narrative Description */}
          <p className="font-sans text-sm sm:text-base text-[#A1A1AA] font-normal leading-relaxed">
            {project.description}
          </p>

          {/* Technology Stack Badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {project.technologies.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-[#222222] border border-white/10 rounded text-[10px] sm:text-[11px] font-mono tracking-wider text-white/90"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Row matching reference: VIEW CASE STUDY ────── */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-6 border-t border-white/10">
            <button
              type="button"
              onClick={handleCaseStudyClick}
              {...linkHover}
              className="group/cta inline-flex items-center gap-4 font-mono text-xs sm:text-sm tracking-[0.2em] text-white uppercase transition-colors"
            >
              <span className="font-bold tracking-widest group-hover/cta:text-[#EF4444] transition-colors">
                VIEW CASE STUDY
              </span>
              <span className="w-12 sm:w-16 h-px bg-white/40 group-hover/cta:w-20 group-hover/cta:bg-[#EF4444] transition-all duration-300" />
            </button>

            <div className="flex items-center gap-3">
              {(project.github || project.githubServer) && (
                <a
                  href={project.github || project.githubServer}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...linkHover}
                  title="Source Repository"
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-[#A1A1AA] hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span className="hidden sm:inline">GITHUB</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

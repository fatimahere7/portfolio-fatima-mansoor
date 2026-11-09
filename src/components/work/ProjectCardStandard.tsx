import React from 'react';
import { motion } from 'motion/react';
import { ProjectVisual } from './ProjectVisual';
import { useCursorTrigger } from '../cursor/CursorContext';
import type { ProjectItem } from '../../types/project';
import { Github, ArrowUpRight, GitBranch } from 'lucide-react';

interface ProjectCardStandardProps {
  project: ProjectItem;
  layoutVariant?: 'offset' | 'split' | 'standard';
  className?: string;
  onOpenCaseStudy?: (projectId: string) => void;
}

export const ProjectCardStandard: React.FC<ProjectCardStandardProps> = ({
  project,
  layoutVariant = 'standard',
  className = '',
  onOpenCaseStudy,
}) => {
  const projectHover = useCursorTrigger('project', 'VIEW');
  const linkHover = useCursorTrigger('link');

  const handleCaseStudyClick = (e: React.MouseEvent) => {
    if (onOpenCaseStudy) {
      e.preventDefault();
      onOpenCaseStudy(project.id);
    }
  };

  if (layoutVariant === 'split') {
    // Horizontal Split Layout (Used for Semantiscope / Resume RAG)
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative w-full bg-[#1a1a1a] border border-[#7B7B7B]/20 hover:border-white transition-colors duration-200 overflow-hidden ${className}`}
        aria-labelledby={`project-${project.id}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center p-6 sm:p-8">
          {/* Visual on Left (6 Columns on Desktop) */}
          <div className="lg:col-span-6 w-full cursor-pointer" {...projectHover} onClick={handleCaseStudyClick}>
            <a
              href={project.caseStudyUrl || project.github || '#'}
              onClick={handleCaseStudyClick}
              className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
              tabIndex={0}
              aria-label={`View ${project.title} case study`}
            >
              <ProjectVisual
                type={project.visualType || 'fintech'}
                image={project.image}
                title={project.title}
                category={project.category}
                number={project.number}
                aspectRatio="aspect-[16/10]"
              />
            </a>
          </div>

          {/* Details on Right (6 Columns on Desktop) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 font-mono text-[9px] tracking-[0.2em] text-[#7B7B7B] uppercase mb-1">
                <span className="font-bold text-white text-xs tabular-nums">{project.number}</span>
                <span>·</span>
                <span className="text-white font-semibold">{project.category}</span>
                {project.year && <span className="tabular-nums">[{project.year}]</span>}
              </div>

              <a
                href={project.caseStudyUrl || project.github || '#'}
                onClick={handleCaseStudyClick}
                {...linkHover}
                className="group/title inline-block focus:outline-none"
              >
                <h3
                  id={`project-${project.id}`}
                  className="font-sans text-2xl sm:text-3xl text-white font-bold tracking-tight hover:text-[#7B7B7B] transition-colors"
                >
                  {project.title}
                </h3>
              </a>

              {project.subtitle && (
                <p className="font-mono text-[9.5px] tracking-wider text-[#7B7B7B] mt-1 uppercase font-medium">
                  {project.subtitle}
                </p>
              )}

              <p className="font-sans text-xs sm:text-sm text-[#7B7B7B] font-normal leading-relaxed mt-3">
                {project.description}
              </p>
            </div>

            {/* Role & Core Contributions Snippet */}
            {project.roleAndContributions && (
              <div className="p-3 bg-[#222222] border border-[#7B7B7B]/15 font-mono text-[11px] text-[#7B7B7B]">
                <span className="text-white font-semibold block mb-1">
                  ROLE // {project.roleAndContributions.roleTitle}
                </span>
                <p className="text-[#FFFFFF]/80 font-sans leading-relaxed text-[11.5px]">
                  {project.roleAndContributions.summary}
                </p>
              </div>
            )}

            {/* Tech Stack */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[9px] tracking-wider">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-2 py-0.5 bg-[#222222] border border-[#7B7B7B]/20 text-white">
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Bar with Multi-repo links (e.g. Semantiscope Client + Server) */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#7B7B7B]/15">
              <button
                type="button"
                onClick={handleCaseStudyClick}
                {...linkHover}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#222222] hover:bg-[#222222] hover:text-white border border-white hover:border-[#7B7B7B] font-mono text-[11px] tracking-wider uppercase transition-colors font-semibold"
              >
                <span>EXPLORE CASE STUDY</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>

              <div className="flex items-center gap-2">
                {project.githubClient && (
                  <a
                    href={project.githubClient}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...linkHover}
                    title="Client GitHub Repository"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-[#7B7B7B]/25 text-white hover:border-white transition-colors font-mono text-[10px]"
                  >
                    <Github className="w-3 h-3" />
                    <span>CLIENT REPO</span>
                  </a>
                )}

                {project.githubServer && (
                  <a
                    href={project.githubServer}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...linkHover}
                    title="Server GitHub Repository"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-[#7B7B7B]/25 text-white hover:border-white transition-colors font-mono text-[10px]"
                  >
                    <Github className="w-3 h-3" />
                    <span>SERVER REPO</span>
                  </a>
                )}

                {project.github && !project.githubClient && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...linkHover}
                    title="Source Repository"
                    className="p-1.5 border border-[#7B7B7B]/25 text-white hover:border-white transition-colors font-mono text-[10px] flex items-center gap-1"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">REPO</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Standard Card Layout
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col justify-between bg-[#1a1a1a] border border-[#7B7B7B]/20 hover:border-white transition-colors duration-200 overflow-hidden ${className}`}
      aria-labelledby={`project-${project.id}`}
    >
      {/* Top Header */}
      <div className="p-4 sm:p-5 pb-3 flex items-center justify-between border-b border-[#7B7B7B]/15 font-mono text-[9px] tracking-[0.2em] text-[#7B7B7B] uppercase bg-[#222222]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white text-xs tabular-nums">{project.number}</span>
          <span>·</span>
          <span className="text-white font-medium">{project.category}</span>
        </div>
        {project.year && <span className="tabular-nums">[{project.year}]</span>}
      </div>

      {/* Visual Component */}
      <div className="w-full cursor-pointer p-4 pb-2" {...projectHover} onClick={handleCaseStudyClick}>
        <a
          href={project.caseStudyUrl || project.github || '#'}
          onClick={handleCaseStudyClick}
          className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          tabIndex={0}
          aria-label={`View ${project.title} case study`}
        >
          <ProjectVisual
            type={project.visualType || 'fintech'}
            image={project.image}
            title={project.title}
            category={project.category}
            number={project.number}
            aspectRatio="aspect-[16/10]"
          />
        </a>
      </div>

      {/* Content Body */}
      <div className="p-5 pt-2 flex flex-col justify-between flex-1 space-y-4">
        <div>
          <a
            href={project.caseStudyUrl || project.github || '#'}
            onClick={handleCaseStudyClick}
            {...linkHover}
            className="group/title inline-block focus:outline-none"
          >
            <h3
              id={`project-${project.id}`}
              className="font-sans text-xl sm:text-2xl text-white font-bold tracking-tight hover:text-[#7B7B7B] transition-colors"
            >
              {project.title}
            </h3>
          </a>

          {project.subtitle && (
            <p className="font-mono text-[9px] tracking-wider text-[#7B7B7B] mt-1 uppercase font-medium">
              {project.subtitle}
            </p>
          )}

          <p className="font-sans text-xs text-[#7B7B7B] font-normal leading-relaxed mt-2.5">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[9px] tracking-wider pt-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-2 py-0.5 bg-[#222222] border border-[#7B7B7B]/20 text-white">
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-[#7B7B7B]/15 flex items-center justify-between">
          <button
            type="button"
            onClick={handleCaseStudyClick}
            {...linkHover}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#222222] hover:bg-[#222222] hover:text-white border border-white hover:border-[#7B7B7B] font-mono text-[10px] tracking-wider uppercase transition-colors font-semibold"
          >
            <span>CASE STUDY</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              {...linkHover}
              title="GitHub Repository"
              className="p-1.5 border border-[#7B7B7B]/25 text-white hover:border-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

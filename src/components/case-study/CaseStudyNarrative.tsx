import React from 'react';
import { motion } from 'motion/react';
import type { ProjectItem } from '../../types/project';
import {
  ShieldAlert,
  Target,
  UserCheck,
  Cpu,
  Layers,
  Wrench,
  GitBranch,
  CheckCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface CaseStudyNarrativeProps {
  project: ProjectItem;
}

export const CaseStudyNarrative: React.FC<CaseStudyNarrativeProps> = ({ project }) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-12 border-b border-[#7B7B7B]/20">
      {/* 3. PROBLEM STATEMENT */}
      <section className="relative" aria-labelledby="section-problem">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.24em] text-[#7B7B7B] uppercase mb-3">
          <span className="text-[#EF4444] font-semibold">01</span>
          <span>//</span>
          <span>CHALLENGE</span>
          <span>·</span>
          <span className="text-white">PROBLEM STATEMENT</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <h2
              id="section-problem"
              className="editorial-title text-2xl sm:text-4xl text-white font-bold leading-tight uppercase"
            >
              The Problem &amp;
              <br />
              <span className="font-normal italic text-[#7B7B7B]">Domain Complexity</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#7B7B7B] font-normal leading-relaxed mt-4">
              {project.problemStatement}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-5">
            {project.caseStudy?.challenge.bottlenecks && (
              <div className="p-6 bg-[#1a1a1a] border border-[#7B7B7B]/20">
                <div className="font-mono text-[9px] tracking-[0.2em] text-[#7B7B7B] uppercase mb-4 flex items-center justify-between">
                  <span>IDENTIFIED TECHNICAL BOTTLENECKS</span>
                  <span className="text-[#EF4444] font-mono text-[9px] font-semibold">CRITICAL</span>
                </div>
                <ul className="space-y-3">
                  {project.caseStudy.challenge.bottlenecks.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-sans text-xs text-white/90">
                      <span className="text-[#EF4444] font-mono text-xs mt-0.5">✕</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.caseStudy?.challenge.constraints && (
              <div className="p-6 bg-[#1a1a1a] border border-[#7B7B7B]/20">
                <div className="font-mono text-[9px] tracking-[0.2em] text-[#7B7B7B] uppercase mb-4 flex items-center justify-between">
                  <span>SYSTEM &amp; SECURITY INVARIANTS</span>
                  <span className="text-white font-mono text-[9px] font-semibold">ENFORCED</span>
                </div>
                <ul className="space-y-3">
                  {project.caseStudy.challenge.constraints.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-sans text-xs text-white/90">
                      <span className="text-white font-mono text-xs mt-0.5">✓</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. PROJECT OBJECTIVES */}
      <section className="relative" aria-labelledby="section-objectives">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.24em] text-[#7B7B7B] uppercase mb-3">
          <span className="text-[#EF4444] font-semibold">02</span>
          <span>//</span>
          <span>GOALS</span>
          <span>·</span>
          <span className="text-white">PROJECT OBJECTIVES</span>
        </div>

        <div className="max-w-3xl mb-6">
          <h2
            id="section-objectives"
            className="editorial-title text-2xl sm:text-4xl text-white font-bold leading-tight uppercase"
          >
            Engineering Objectives &amp;
            <br />
            <span className="font-normal italic text-[#7B7B7B]">Design Milestones</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.objectives.map((obj, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#1a1a1a] border border-[#7B7B7B]/20 flex items-start gap-3.5"
            >
              <div className="font-mono text-xs font-bold text-white tabular-nums px-2 py-0.5 bg-[#222222] border border-[#7B7B7B]/30 shrink-0">
                0{idx + 1}
              </div>
              <p className="font-sans text-xs sm:text-sm text-white/90 font-normal leading-relaxed">
                {obj}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MY ROLE AND CONTRIBUTIONS */}
      <section className="relative" aria-labelledby="section-role">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.24em] text-[#7B7B7B] uppercase mb-3">
          <span className="text-[#EF4444] font-semibold">03</span>
          <span>//</span>
          <span>OWNERSHIP</span>
          <span>·</span>
          <span className="text-white">MY ROLE &amp; CONTRIBUTIONS</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <h2
              id="section-role"
              className="editorial-title text-2xl sm:text-4xl text-white font-bold leading-tight uppercase"
            >
              Personal Ownership &amp;
              <br />
              <span className="font-normal italic text-[#7B7B7B]">Scope Breakdown</span>
            </h2>

            <div className="mt-4 p-4 bg-[#1a1a1a] border border-[#7B7B7B]/20 font-mono text-xs space-y-2">
              <span className="text-[#EF4444] font-semibold block">
                {project.roleAndContributions.roleTitle}
              </span>
              <p className="font-sans text-xs text-white/90 leading-relaxed font-normal">
                {project.roleAndContributions.summary}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-6 bg-[#1a1a1a] border border-[#7B7B7B]/20 space-y-4">
              <div className="font-mono text-[9px] tracking-[0.2em] text-[#7B7B7B] uppercase flex items-center justify-between border-b border-[#7B7B7B]/20 pb-3">
                <span>SPECIFIC DELIVERABLES DEVELOPED PERSONALLY</span>
                <span className="text-white font-semibold">FATIMA MANSOOR</span>
              </div>
              <ul className="space-y-3 pt-2">
                {project.roleAndContributions.personalContributions.map((contrib, idx) => (
                  <li key={idx} className="flex items-start gap-3 font-sans text-xs text-white/90">
                    <span className="text-[#EF4444] font-mono mt-0.5 font-bold">›</span>
                    <span className="leading-relaxed">{contrib}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TECHNICAL IMPLEMENTATION */}
      <section className="relative" aria-labelledby="section-implementation">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.24em] text-[#7B7B7B] uppercase mb-3">
          <span className="text-[#EF4444] font-semibold">04</span>
          <span>//</span>
          <span>ARCHITECTURE</span>
          <span>·</span>
          <span className="text-white">TECHNICAL IMPLEMENTATION</span>
        </div>

        <div className="max-w-3xl mb-8">
          <h2
            id="section-implementation"
            className="editorial-title text-2xl sm:text-4xl text-white font-bold leading-tight uppercase"
          >
            Workflow Pipeline &amp;
            <br />
            <span className="font-normal italic text-[#7B7B7B]">Execution Mechanics</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#7B7B7B] font-normal leading-relaxed mt-4">
            {project.technicalImplementation.overview}
          </p>
        </div>

        {/* Step-by-Step Workflow Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {project.technicalImplementation.workflowSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#1a1a1a] border border-[#7B7B7B]/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[9px] font-mono text-[#7B7B7B] uppercase tracking-widest mb-3">
                  <span className="text-white font-bold">{step.step}</span>
                  <span className="text-[#EF4444]">STAGE</span>
                </div>
                <h3 className="font-sans text-base text-white font-bold mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-xs text-[#7B7B7B] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Highlights */}
        {project.technicalImplementation.architecturalHighlights.length > 0 && (
          <div className="p-6 bg-[#1a1a1a] border border-[#7B7B7B]/20">
            <div className="font-mono text-[9px] tracking-[0.2em] text-[#7B7B7B] uppercase mb-3 font-semibold">
              KEY ARCHITECTURAL HIGHLIGHTS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              {project.technicalImplementation.architecturalHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 7. MAIN FEATURES */}
      <section className="relative" aria-labelledby="section-features">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.24em] text-[#7B7B7B] uppercase mb-3">
          <span className="text-[#EF4444] font-semibold">05</span>
          <span>//</span>
          <span>CAPABILITIES</span>
          <span>·</span>
          <span className="text-white">MAIN FEATURES</span>
        </div>

        <div className="max-w-3xl mb-8">
          <h2
            id="section-features"
            className="editorial-title text-2xl sm:text-4xl text-white font-bold leading-tight uppercase"
          >
            Core Features &amp;
            <br />
            <span className="font-normal italic text-[#7B7B7B]">Functional Matrix</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.mainFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#1a1a1a] border border-[#7B7B7B]/20 flex items-start gap-3"
            >
              <CheckCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
              <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
                {feat}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. TECHNOLOGIES AND TOOLS */}
      <section className="relative" aria-labelledby="section-tech">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.24em] text-[#7B7B7B] uppercase mb-3">
          <span className="text-[#EF4444] font-semibold">06</span>
          <span>//</span>
          <span>STACK</span>
          <span>·</span>
          <span className="text-white">TECHNOLOGIES &amp; TOOLS</span>
        </div>

        <div className="max-w-3xl mb-8">
          <h2
            id="section-tech"
            className="editorial-title text-2xl sm:text-4xl text-white font-bold leading-tight uppercase"
          >
            Categorized Stack &amp;
            <br />
            <span className="font-normal italic text-[#7B7B7B]">Engineering Tools</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {project.techCategories?.map((grp, idx) => (
            <div key={idx} className="p-5 bg-[#1a1a1a] border border-[#7B7B7B]/20 space-y-3">
              <div className="font-mono text-[10px] tracking-wider text-white uppercase font-bold border-b border-[#7B7B7B]/20 pb-2">
                {grp.categoryName}
              </div>
              <ul className="space-y-2">
                {grp.items.map((item) => (
                  <li key={item} className="font-mono text-xs text-[#7B7B7B] flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-white" />
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FUTURE ROADMAP (IF APPLICABLE, e.g. RESUME RAG) */}
      {project.futureRoadmap && project.futureRoadmap.length > 0 && (
        <section className="relative" aria-labelledby="section-roadmap">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.24em] text-[#7B7B7B] uppercase mb-3">
            <span className="text-[#EF4444] font-semibold">07</span>
            <span>//</span>
            <span>ROADMAP</span>
            <span>·</span>
            <span className="text-white">FUTURE ARCHITECTURAL ENHANCEMENTS</span>
          </div>

          <div className="p-6 sm:p-8 bg-[#1a1a1a] border border-[#7B7B7B]/20 space-y-4">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-white font-semibold">COMPLETED (V1–V4) VS. PLANNED CAPABILITIES</span>
              <span className="text-[#EF4444] font-mono text-[10px] tracking-wider">ROADMAP</span>
            </div>
            <p className="font-sans text-xs text-[#7B7B7B] leading-relaxed">
              While V1–V4 demonstrate bare-metal keyword, chunking, semantic embedding, and sliding-window PDF retrieval, the following capabilities represent the planned production roadmap:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {project.futureRoadmap.map((item, idx) => (
                <div key={idx} className="p-3 bg-[#222222] border border-[#7B7B7B]/20 flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#EF4444] shrink-0" />
                  <span className="font-mono text-xs text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

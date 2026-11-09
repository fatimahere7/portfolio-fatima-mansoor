import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { ProjectItem } from '../../types/project';
import { ProjectVisual } from '../work/ProjectVisual';
import { useCursorTrigger } from '../cursor/CursorContext';
import {
  Layers,
  Code2,
  Check,
  Copy,
  Terminal,
} from 'lucide-react';

interface CaseStudyInteractiveVisualProps {
  project: ProjectItem;
}

type TabMode = 'topology' | 'code';

export const CaseStudyInteractiveVisual: React.FC<CaseStudyInteractiveVisualProps> = ({
  project,
}) => {
  const [activeTab, setActiveTab] = useState<TabMode>('topology');
  const [copied, setCopied] = useState(false);
  const linkHover = useCursorTrigger('link');
  const buttonHover = useCursorTrigger('button');

  const caseStudy = project.caseStudy;
  const hasCodeSpecimen = Boolean(caseStudy?.codeSpecimen?.code);

  const handleCopyCode = () => {
    if (caseStudy?.codeSpecimen?.code) {
      navigator.clipboard.writeText(caseStudy.codeSpecimen.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="my-10 sm:my-14" aria-label="Interactive Architecture & Code Explorer">
      {/* Interactive Tabs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#7B7B7B]/20">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#7B7B7B] uppercase">
            ARCHITECTURAL INSPECTOR //
          </span>
          <span className="font-mono text-[10px] text-white uppercase font-semibold">
            {activeTab.toUpperCase()}
          </span>
        </div>

        {/* Tab Switcher Controls */}
        {hasCodeSpecimen && (
          <div className="inline-flex items-center p-1 rounded bg-[#1a1a1a] border border-[#7B7B7B]/25">
            <button
              type="button"
              onClick={() => setActiveTab('topology')}
              {...buttonHover}
              className={`px-3 py-1.5 rounded text-[10px] sm:text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'topology'
                  ? 'bg-white text-[#222222] font-semibold shadow-sm'
                  : 'text-[#7B7B7B] hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>01 TOPOLOGY</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('code')}
              {...buttonHover}
              className={`px-3 py-1.5 rounded text-[10px] sm:text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'code'
                  ? 'bg-white text-[#222222] font-semibold shadow-sm'
                  : 'text-[#7B7B7B] hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>02 CODE SPECIMEN</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Interactive Stage Container */}
      <div className="mt-6 rounded bg-[#1a1a1a] border border-[#7B7B7B]/20 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'topology' && (
            <motion.div
              key="topology"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-8 lg:p-10 space-y-8"
            >
              {/* Primary 3D / Geometric Visual Preview */}
              <div className="w-full rounded border border-[#7B7B7B]/20 overflow-hidden">
                <ProjectVisual
                  type={project.visualType || 'fintech'}
                  image={project.image}
                  title={project.title}
                  category={project.category}
                  number={project.number}
                  aspectRatio="aspect-[21/9] sm:aspect-[24/9]"
                />
              </div>

              {/* Topology Node Matrix */}
              {caseStudy?.architecture?.nodes && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-[#7B7B7B] uppercase">
                      ACTIVE SYSTEM NODES &amp; SUBSYSTEMS
                    </span>
                    <span className="font-mono text-[9px] text-[#EF4444] uppercase font-semibold">
                      VERIFIED ARCHITECTURE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {caseStudy.architecture.nodes.map((node, i) => (
                      <div
                        key={i}
                        className="p-4 rounded bg-[#222222] border border-[#7B7B7B]/20 hover:border-white transition-colors"
                      >
                        <div className="flex items-center justify-between text-[9px] font-mono text-[#7B7B7B] mb-2">
                          <span>NODE_0{i + 1}</span>
                          <span className="text-[#EF4444] font-semibold">{node.status || 'ACTIVE'}</span>
                        </div>
                        <h4 className="font-mono text-sm text-white font-semibold truncate mb-1">
                          {node.name}
                        </h4>
                        <p className="font-sans text-xs text-[#7B7B7B] font-normal leading-relaxed">
                          {node.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architectural Execution Pipeline Steps */}
              {caseStudy?.architecture?.flowSteps && (
                <div className="pt-4 border-t border-[#7B7B7B]/20">
                  <div className="font-mono text-[9px] tracking-[0.2em] text-[#7B7B7B] uppercase mb-4">
                    EXECUTION PIPELINE &amp; STATE FLOW
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {caseStudy.architecture.flowSteps.map((step, idx) => (
                      <div key={idx} className="relative space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded flex items-center justify-center font-mono text-xs text-white bg-[#222222] border border-[#7B7B7B]/40">
                            {step.step}
                          </span>
                          <h5 className="font-sans text-sm text-white font-bold">
                            {step.title}
                          </h5>
                        </div>
                        <p className="font-sans text-xs text-[#7B7B7B] leading-relaxed pl-9">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'code' && hasCodeSpecimen && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-8 space-y-6"
            >
              {/* Code Header Bar */}
              <div className="flex items-center justify-between font-mono text-xs pb-4 border-b border-[#7B7B7B]/20">
                <div className="flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-white" />
                  <span className="text-white font-semibold">
                    {caseStudy?.codeSpecimen?.filename || 'SystemCore.sol'}
                  </span>
                  <span className="text-[#7B7B7B]">|</span>
                  <span className="text-[#7B7B7B] uppercase">
                    {caseStudy?.codeSpecimen?.language || 'SOLIDITY'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  {...buttonHover}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#222222] hover:bg-white hover:text-[#222222] border border-[#7B7B7B]/30 text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#EF4444]" />
                      <span className="text-[#EF4444] font-semibold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY SOURCE</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Description */}
              {caseStudy?.codeSpecimen?.description && (
                <p className="font-sans text-xs text-[#7B7B7B] leading-relaxed max-w-3xl">
                  {caseStudy.codeSpecimen.description}
                </p>
              )}

              {/* Syntax Display Block */}
              <div className="relative rounded bg-[#222222] border border-[#7B7B7B]/20 p-4 sm:p-6 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200">
                <pre className="selection:bg-white/20 selection:text-white">
                  <code>{caseStudy?.codeSpecimen?.code}</code>
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

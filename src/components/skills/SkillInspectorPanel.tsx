import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { SkillItem, SkillCategory } from '../../types/skills';
import { SKILL_ITEMS } from '../../data/skills';
import { Network } from 'lucide-react';
import { useCursorTrigger } from '../cursor/CursorContext';

interface SkillInspectorPanelProps {
  activeSkill: SkillItem | null;
  activeCategory: SkillCategory;
  onSelectSkill: (skill: SkillItem) => void;
}

export const SkillInspectorPanel: React.FC<SkillInspectorPanelProps> = ({
  activeSkill,
  activeCategory,
  onSelectSkill,
}) => {
  const buttonHover = useCursorTrigger('button');

  const relatedSkills = activeSkill
    ? SKILL_ITEMS.filter((s) => activeSkill.related.includes(s.id))
    : [];

  return (
    <div className="relative rounded-none bg-white border border-[#7B7B7B]/20 p-6 shadow-sm">
      <AnimatePresence mode="wait">
        {activeSkill ? (
          <motion.div
            key={activeSkill.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Header: Index & Category */}
            <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-[#7B7B7B] uppercase border-b border-[#7B7B7B]/15 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#222222]" />
                <span className="text-[#222222] font-semibold">{activeSkill.category}</span>
              </div>
              {activeSkill.tag && (
                <span className="text-[#7B7B7B] font-mono text-[9px]">[{activeSkill.tag}]</span>
              )}
            </div>

            {/* Title & Type */}
            <div>
              <h4 className="font-sans text-2xl text-[#222222] font-bold tracking-tight">
                {activeSkill.name}
              </h4>
              <p className="font-mono text-[10px] tracking-wider text-[#7B7B7B] uppercase mt-0.5 font-medium">
                {activeSkill.type}
              </p>
            </div>

            {/* Metadata Fields */}
            <div className="py-2.5 border-y border-[#7B7B7B]/15 space-y-2.5 font-mono text-xs">
              <div>
                <span className="text-[8.5px] tracking-widest text-[#7B7B7B] uppercase block font-medium">
                  ECOSYSTEM &amp; RUNTIME
                </span>
                <span className="text-[#222222] text-xs font-semibold mt-0.5 block">
                  {activeSkill.ecosystem}
                </span>
              </div>

              <div>
                <span className="text-[8.5px] tracking-widest text-[#7B7B7B] uppercase block font-medium">
                  ARCHITECTURAL APPLICATION
                </span>
                <p className="text-[#7B7B7B] font-sans text-xs font-normal leading-relaxed mt-0.5">
                  {activeSkill.use}
                </p>
              </div>
            </div>

            {/* Related Mesh Nodes */}
            {relatedSkills.length > 0 && (
              <div className="pt-1">
                <span className="font-mono text-[8.5px] tracking-[0.2em] text-[#7B7B7B] uppercase block mb-2 font-medium">
                  TOPOLOGICALLY CONNECTED
                </span>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[9.5px]">
                  {relatedSkills.map((rel, idx) => (
                    <button
                      key={rel.id}
                      type="button"
                      onClick={() => onSelectSkill(rel)}
                      {...buttonHover}
                      className="text-[#222222] hover:text-[#7B7B7B] hover:underline underline-offset-4 transition-colors focus:outline-none font-medium"
                    >
                      {rel.name}
                      {idx < relatedSkills.length - 1 && (
                        <span className="text-[#7B7B7B] pl-2">·</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-[#7B7B7B] uppercase border-b border-[#7B7B7B]/15 pb-2.5">
              <Network className="w-3.5 h-3.5 text-[#222222]" />
              <span className="text-[#222222] font-semibold">SKILL INSPECTOR</span>
            </div>

            <div>
              <h4 className="font-sans text-xl text-[#222222] font-bold">
                Distributed Technical Stack
              </h4>
              <p className="font-sans text-xs text-[#7B7B7B] font-normal leading-relaxed mt-2">
                Select any technology to inspect its ecosystem runtime, architectural application, and connected systems.
              </p>
            </div>

            <div className="py-2.5 border-t border-[#7B7B7B]/15 font-mono text-[10px] text-[#7B7B7B] space-y-1.5">
              <div className="flex items-center justify-between">
                <span>FILTER SCOPE</span>
                <span className="text-[#222222] font-semibold uppercase">{activeCategory}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>TOTAL MODULES</span>
                <span className="text-[#222222] font-semibold">{SKILL_ITEMS.length} ACTIVE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

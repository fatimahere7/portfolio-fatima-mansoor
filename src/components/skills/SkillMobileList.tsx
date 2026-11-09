import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { SkillItem, SkillCategory } from '../../types/skills';
import { SKILL_GROUPS } from '../../data/skills';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { useCursorTrigger } from '../cursor/CursorContext';

interface SkillMobileListProps {
  activeSkill: SkillItem | null;
  activeCategory: SkillCategory;
  onSelectSkill: (skill: SkillItem | null) => void;
}

export const SkillMobileList: React.FC<SkillMobileListProps> = ({
  activeSkill,
  activeCategory,
  onSelectSkill,
}) => {
  const buttonHover = useCursorTrigger('button');

  const filteredGroups =
    activeCategory === 'ALL'
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => g.category === activeCategory);

  return (
    <div className="w-full space-y-8" aria-label="Mobile Categorized Technology List">
      {filteredGroups.map((group) => (
        <div key={group.category} className="space-y-3">
          {/* Category Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.08)]">
            <span className="font-mono text-xs text-[#38bdf8] font-medium tracking-[0.2em] uppercase">
              {group.label}
            </span>
            <span className="font-mono text-[9px] text-[#8fa0b8]/60 uppercase tracking-widest">
              {group.items.length} MODULES
            </span>
          </div>

          <p className="font-sans text-xs text-[#8fa0b8] font-light leading-relaxed mb-3">
            {group.description}
          </p>

          {/* Group Items Grid / List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {group.items.map((item) => {
              const isSelected = activeSkill?.id === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-md border transition-all duration-200 overflow-hidden ${
                    isSelected
                      ? 'bg-[#030816] border-[#0066ff]'
                      : 'bg-[#020612]/60 border-[rgba(255,255,255,0.06)]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectSkill(isSelected ? null : item)}
                    {...buttonHover}
                    className="w-full p-3.5 flex items-center justify-between text-left focus:outline-none"
                    aria-expanded={isSelected}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          isSelected ? 'bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]' : 'bg-[#8fa0b8]/50'
                        }`}
                      />
                      <div>
                        <span className="font-mono text-xs sm:text-sm text-[#f8fafc] font-medium block">
                          {item.name}
                        </span>
                        <span className="font-mono text-[9px] text-[#8fa0b8]/70 uppercase block">
                          {item.type}
                        </span>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 text-[#8fa0b8] transition-transform duration-200 ${
                        isSelected ? 'rotate-180 text-[#38bdf8]' : ''
                      }`}
                    />
                  </button>

                  {/* Expanded Detail Panel */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-3.5 pb-3.5 pt-1 border-t border-[rgba(255,255,255,0.04)] font-mono text-xs space-y-2 text-[#8fa0b8]"
                      >
                        <div>
                          <span className="text-[8px] tracking-widest text-[#8fa0b8]/60 uppercase block">
                            ECOSYSTEM:
                          </span>
                          <span className="text-[#f8fafc] text-[11px] block">{item.ecosystem}</span>
                        </div>
                        <div>
                          <span className="text-[8px] tracking-widest text-[#8fa0b8]/60 uppercase block">
                            USE:
                          </span>
                          <span className="font-sans text-[11px] text-[#8fa0b8] block leading-relaxed">
                            {item.use}
                          </span>
                        </div>
                        {item.tag && (
                          <div className="pt-1 flex items-center justify-between text-[9px]">
                            <span className="text-[#38bdf8]">[{item.tag}]</span>
                            <span className="text-emerald-400">OPERATIONAL</span>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

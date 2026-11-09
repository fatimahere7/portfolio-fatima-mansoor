import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import type { SkillItem, SkillCategory, SkillConnection } from '../../types/skills';
import { SKILL_ITEMS, SKILL_CONNECTIONS } from '../../data/skills';
import { useCursorTrigger } from '../cursor/CursorContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface SkillConstellationProps {
  activeSkill: SkillItem | null;
  activeCategory: SkillCategory;
  onSelectSkill: (skill: SkillItem | null) => void;
}

export const SkillConstellation: React.FC<SkillConstellationProps> = ({
  activeSkill,
  activeCategory,
  onSelectSkill,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeHover = useCursorTrigger('button');
  const prefersReduced = usePrefersReducedMotion();

  // Subtle physical parallax state
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      setMouseOffset({ x: relX * 14, y: relY * 14 });
    },
    [prefersReduced]
  );

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  // Determine if a node matches category filter
  const isCategoryMatch = useCallback(
    (item: SkillItem) => {
      if (activeCategory === 'ALL') return true;
      return item.category === activeCategory;
    },
    [activeCategory]
  );

  // Determine if a connection line is currently active
  const isConnectionActive = useCallback(
    (conn: SkillConnection) => {
      if (!activeSkill) return false;
      if (conn.from === activeSkill.id || conn.to === activeSkill.id) return true;
      // Core hub active connection
      if (conn.from === 'core' && conn.to === activeSkill.id) return true;
      return false;
    },
    [activeSkill]
  );

  // Determine if a connection matches active category
  const isConnectionInFilter = useCallback(
    (conn: SkillConnection) => {
      if (activeCategory === 'ALL') return true;
      const fromItem = SKILL_ITEMS.find((s) => s.id === conn.from);
      const toItem = SKILL_ITEMS.find((s) => s.id === conn.to);
      return fromItem?.category === activeCategory || toItem?.category === activeCategory;
    },
    [activeCategory]
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] min-h-[520px] lg:min-h-[580px] rounded-lg bg-[#020510]/80 border border-[rgba(255,255,255,0.07)] overflow-hidden select-none"
      role="region"
      aria-label="Interactive Technology Constellation"
    >
      {/* Background Architectural Coordinate Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Subtle Central Core Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full pointer-events-none opacity-25 blur-[90px]"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,255,0.6) 0%, rgba(56,189,248,0.2) 45%, transparent 75%)',
        }}
      />

      {/* SVG Vector Connections Layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px, 0)`,
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="activeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066ff" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#0066ff" stopOpacity="0.85" />
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Core Hub Rays to Layer Anchors */}
        {SKILL_CONNECTIONS.filter((c) => c.from === 'core').map((conn, idx) => {
          const target = SKILL_ITEMS.find((s) => s.id === conn.to);
          if (!target) return null;
          const active = isConnectionActive(conn);
          const inFilter = isConnectionInFilter(conn);

          return (
            <g key={`core-${idx}`}>
              <line
                x1={50}
                y1={50}
                x2={target.x}
                y2={target.y}
                stroke={active ? 'url(#activeLineGrad)' : 'rgba(0,102,255,0.2)'}
                strokeWidth={active ? 0.35 : 0.18}
                strokeDasharray={active ? 'none' : '0.8 0.8'}
                strokeOpacity={!inFilter ? 0.08 : active ? 1 : 0.4}
                filter={active ? 'url(#glowEffect)' : undefined}
                className="transition-all duration-300"
              />
            </g>
          );
        })}

        {/* 2. Inter-Technology Mesh Connections */}
        {SKILL_CONNECTIONS.filter((c) => c.from !== 'core').map((conn, idx) => {
          const fromItem = SKILL_ITEMS.find((s) => s.id === conn.from);
          const toItem = SKILL_ITEMS.find((s) => s.id === conn.to);
          if (!fromItem || !toItem) return null;

          const active = isConnectionActive(conn);
          const inFilter = isConnectionInFilter(conn);
          const isCrossLayer = conn.type === 'cross-layer';

          let strokeColor = 'rgba(255,255,255,0.08)';
          if (active) strokeColor = '#38bdf8';
          else if (isCrossLayer) strokeColor = 'rgba(56,189,248,0.12)';

          return (
            <g key={`conn-${idx}`}>
              <line
                x1={fromItem.x}
                y1={fromItem.y}
                x2={toItem.x}
                y2={toItem.y}
                stroke={active ? 'url(#activeLineGrad)' : strokeColor}
                strokeWidth={active ? 0.4 : isCrossLayer ? 0.15 : 0.2}
                strokeDasharray={isCrossLayer && !active ? '0.6 0.6' : undefined}
                strokeOpacity={!inFilter ? 0.05 : active ? 1 : 0.35}
                filter={active ? 'url(#glowEffect)' : undefined}
                className="transition-all duration-300"
              />
            </g>
          );
        })}
      </svg>

      {/* DOM Interactive Nodes Layer */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
      >
        {/* CENTRAL CORE NODE [ CORE ARCHITECTURE ] */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none"
          aria-hidden="true"
        >
          {/* Concentric Pulsing Ring */}
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-[#0066ff]/40 animate-ping opacity-20" />
            <div className="absolute w-8 h-8 rounded-full border border-[#38bdf8]/40 bg-[#0066ff]/20 backdrop-blur-sm" />
            <div className="absolute w-3 h-3 rounded-full bg-[#f8fafc] shadow-[0_0_12px_#38bdf8]" />
          </div>

          <div className="mt-2 text-center">
            <span className="font-mono text-[9px] tracking-[0.28em] text-[#38bdf8] uppercase font-semibold block">
              [ CORE ]
            </span>
            <span className="font-mono text-[7px] tracking-widest text-[#8fa0b8]/60 uppercase block">
              ARCHITECTURE
            </span>
          </div>
        </div>

        {/* MESH SKILL NODES */}
        {SKILL_ITEMS.map((item) => {
          const inFilter = isCategoryMatch(item);
          const isSelected = activeSkill?.id === item.id;
          const isRelated = activeSkill?.related.includes(item.id);

          // Calculate opacity and scale based on states
          let opacity = 1;
          let scale = 1;
          let isHighlighted = false;

          if (!inFilter) {
            opacity = 0.2;
            scale = 0.9;
          } else if (activeSkill) {
            if (isSelected) {
              opacity = 1;
              scale = 1.15;
              isHighlighted = true;
            } else if (isRelated) {
              opacity = 0.95;
              scale = 1.05;
              isHighlighted = true;
            } else {
              opacity = 0.3;
              scale = 0.95;
            }
          }

          const isPrimary = item.level === 'primary';

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSkill(isSelected ? null : item)}
              onMouseEnter={() => {
                nodeHover.onMouseEnter();
                onSelectSkill(item);
              }}
              onMouseLeave={() => nodeHover.onMouseLeave()}
              onFocus={() => onSelectSkill(item)}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                opacity,
                transform: `translate(-50%, -50%) scale(${scale})`,
              }}
              className="absolute z-10 group focus:outline-none transition-all duration-300 flex flex-col items-center cursor-pointer p-1"
              aria-label={`${item.name} (${item.category}): ${item.type}`}
            >
              {/* Node Marker Dot */}
              <div className="relative flex items-center justify-center">
                {/* Active Halo on Hover/Selection */}
                {isHighlighted && (
                  <div
                    className={`absolute rounded-full animate-pulse ${
                      isSelected
                        ? 'w-7 h-7 bg-[#0066ff]/40 border border-[#38bdf8]'
                        : 'w-5 h-5 bg-[#0066ff]/20 border border-[#38bdf8]/50'
                    }`}
                  />
                )}

                <div
                  className={`rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'w-3 h-3 bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]'
                      : isRelated
                      ? 'w-2.5 h-2.5 bg-[#0066ff] shadow-[0_0_6px_#0066ff]'
                      : isPrimary
                      ? 'w-2 h-2 bg-[#f8fafc]/90 group-hover:bg-[#38bdf8]'
                      : 'w-1.5 h-1.5 bg-[#8fa0b8]/70 group-hover:bg-[#38bdf8]'
                  }`}
                />
              </div>

              {/* Node Typographic Label */}
              <div className="mt-1.5 text-center">
                <span
                  className={`font-mono transition-colors duration-200 block whitespace-nowrap ${
                    isSelected
                      ? 'text-[#38bdf8] font-semibold text-[11px] sm:text-xs tracking-wider'
                      : isRelated
                      ? 'text-[#f8fafc] font-medium text-[10px] sm:text-[11px] tracking-wide'
                      : isPrimary
                      ? 'text-[#f8fafc]/90 group-hover:text-[#38bdf8] text-[9.5px] sm:text-[10px] tracking-tight'
                      : 'text-[#8fa0b8]/75 group-hover:text-[#f8fafc] text-[8.5px] sm:text-[9px]'
                  }`}
                >
                  {item.name}
                </span>

                {/* Sub-label coordinates/index */}
                <span className="font-mono text-[7px] text-[#8fa0b8]/40 tracking-widest block uppercase">
                  {item.category.slice(0, 3)}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Technical Coordinate Telemetry */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[8px] sm:text-[9px] text-[#8fa0b8]/50 uppercase tracking-widest pointer-events-none">
        <span>TOPOLOGY: DISTRIBUTED MESH</span>
        <span>LAT: 31.52° N · LON: 74.35° E</span>
        <span>STATUS: SYNCHRONIZED</span>
      </div>
    </div>
  );
};

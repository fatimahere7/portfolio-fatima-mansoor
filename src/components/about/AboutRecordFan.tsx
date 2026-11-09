import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Disc3,
  Play,
  Pause,
  Sparkles,
  Terminal,
  Database,
  Cpu,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  RotateCw,
} from 'lucide-react';
import { useCursorTrigger } from '../cursor/CursorContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export interface RecordSleeve {
  id: string;
  catNumber: string;
  title: string;
  subtitle: string;
  year: string;
  format: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tags: string[];
  description: string;
  tracks: { num: string; title: string; length: string }[];
  accent: string;
}

const SLEEVES: RecordSleeve[] = [
  {
    id: 'evm',
    catNumber: 'FM-01',
    title: 'SMART CONTRACT ARCHITECTURE',
    subtitle: 'EVM Invariants & Protocol Security',
    year: '2026',
    format: '33⅓ RPM · 12" MASTER LP',
    icon: ShieldCheck,
    tags: ['SOLIDITY', 'FOUNDRY', 'FORMAL SPECS', 'DEFI'],
    description:
      'Rigorous mathematical invariant design for high-assurance decentralized protocols, secure tokenomics, and zero-defect staking pools.',
    tracks: [
      { num: 'A1', title: 'Formal Verification & Reentrancy Barriers', length: '04:18' },
      { num: 'A2', title: 'Gas-Optimized Packed Storage Slots', length: '03:42' },
      { num: 'B1', title: 'Automated Market Maker Curve Math', length: '05:12' },
      { num: 'B2', title: 'Timelock Governance & Access Matrices', length: '04:05' },
    ],
    accent: '#8AB6F9',
  },
  {
    id: 'backend',
    catNumber: 'FM-02',
    title: 'HIGH-THROUGHPUT BACKENDS',
    subtitle: 'Concurrent Relays & Event Engines',
    year: '2026',
    format: '33⅓ RPM · 12" MASTER LP',
    icon: Cpu,
    tags: ['NODE.JS', 'EXPRESS', 'FASTAPI', 'WEBSOCKETS'],
    description:
      'Fault-tolerant server architecture orchestrating concurrent microservices, real-time telemetry relays, and ultra-low-latency transaction feeds.',
    tracks: [
      { num: 'A1', title: 'Asynchronous Event Loop Orchestration', length: '04:30' },
      { num: 'A2', title: 'WebSocket Multi-Tenant Broadcast Mesh', length: '03:55' },
      { num: 'B1', title: 'In-Memory State & Redis Cache Pipeline', length: '05:04' },
      { num: 'B2', title: 'Resilient Queue Workers & Backpressure', length: '04:22' },
    ],
    accent: '#CADCFC',
  },
  {
    id: 'data',
    catNumber: 'FM-03',
    title: 'DATA MODELING & PERSISTENCE',
    subtitle: 'ACID Guarantees & Real-Time Streams',
    year: '2026',
    format: '33⅓ RPM · 12" MASTER LP',
    icon: Database,
    tags: ['POSTGRESQL', 'SUPABASE', 'ACID', 'EVENT SOURCING'],
    description:
      'Strict normalized schemas, partition strategies, and real-time streaming architectures ensuring uninterrupted data integrity under write stress.',
    tracks: [
      { num: 'A1', title: 'Normalized Relational Data Partitions', length: '04:12' },
      { num: 'A2', title: 'Change-Data-Capture & Event Streaming', length: '03:48' },
      { num: 'B1', title: 'Atomic Transaction Locks & Deadlock Defense', length: '05:20' },
      { num: 'B2', title: 'Supabase Real-Time Client Subscriptions', length: '04:15' },
    ],
    accent: '#8AB6F9',
  },
  {
    id: 'network',
    catNumber: 'FM-04',
    title: 'DISTRIBUTED CONSENSUS & RPCS',
    subtitle: 'Nodes, Indexers & Cryptographic Proofs',
    year: '2026',
    format: '33⅓ RPM · 12" MASTER LP',
    icon: Terminal,
    tags: ['RPC NODES', 'SUBGRAPHS', 'INDEXERS', 'ORACLES'],
    description:
      'High-reliability infrastructure linking blockchain validator clusters, decentralized indexers, and trust-minimized cryptographic proofs.',
    tracks: [
      { num: 'A1', title: 'Resilient RPC Cluster Failover Routing', length: '04:45' },
      { num: 'A2', title: 'Decentralized Subgraph Indexing Pipeline', length: '04:02' },
      { num: 'B1', title: 'ECDSA Signature Verification Gateway', length: '03:38' },
      { num: 'B2', title: 'Cross-Chain Cryptographic Relays', length: '05:15' },
    ],
    accent: '#CADCFC',
  },
];

export const AboutRecordFan: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const prefersReduced = usePrefersReducedMotion();
  const linkHover = useCursorTrigger('button');

  const dragStartX = useRef<number | null>(null);
  const isWheelLocked = useRef<boolean>(false);

  const selectSleeve = useCallback((idx: number) => {
    setSelectedIdx(Math.max(0, Math.min(SLEEVES.length - 1, idx)));
  }, []);

  const stepSleeve = useCallback(
    (direction: number) => {
      setSelectedIdx((prev) => Math.max(0, Math.min(SLEEVES.length - 1, prev + direction)));
    },
    []
  );

  // Allow natural vertical page scrolling; only respond when the user scrolls HORIZONTALLY (e.g. trackpad right/left swipe or Shift+wheel)
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 18) {
      if (isWheelLocked.current) return;
      isWheelLocked.current = true;
      if (e.deltaX > 0) {
        stepSleeve(1);
      } else {
        stepSleeve(-1);
      }
      setTimeout(() => {
        isWheelLocked.current = false;
      }, 350);
    }
  };

  // Drag / swipe gesture support on the fan stage
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (delta < -40) {
      stepSleeve(1); // Swiped left -> move to next sleeve (right)
    } else if (delta > 40) {
      stepSleeve(-1); // Swiped right -> move to previous sleeve (left)
    }
  };

  const activeSleeve = SLEEVES[selectedIdx];

  return (
    <div className="w-full space-y-10 select-none">
      {/* 1. RECORD LABEL STORY MANIFESTO */}
      <div className="relative overflow-hidden rounded-2xl border border-[#8AB6F9]/30 bg-gradient-to-br from-[rgba(138,182,249,0.12)] via-[rgba(2,7,26,0.92)] to-[rgba(202,220,252,0.06)] p-6 sm:p-10 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(2,7,26,0.9),0_0_24px_-4px_rgba(138,182,249,0.2),inset_0_1px_0_rgba(202,220,252,0.3)]">
        {/* Subtle Top Gradient Hairline */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#8AB6F9] to-transparent" />

        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8AB6F9]/40 bg-[#8AB6F9]/15 font-mono text-[9.5px] tracking-[0.22em] text-[#CADCFC] uppercase font-bold shadow-[0_0_12px_rgba(138,182,249,0.25)]">
                <span className="w-2 h-2 rounded-full bg-[#8AB6F9] animate-pulse" />
                RECORD LABEL // ARCHITECTURAL MASTERS
              </span>
              <span className="font-mono text-[9px] tracking-widest text-[#8AB6F9]/80 uppercase">
                CATALOGUE · PRESSINGS 2026
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#f8fafc] font-light leading-[1.18] tracking-[-0.01em]">
              Engineering decentralized architecture like{' '}
              <span className="italic text-[#CADCFC] font-normal underline decoration-[#8AB6F9]/50 underline-offset-4">
                master recordings
              </span>
              —precise, immutable, built to play without skips under heavy load.
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#CADCFC]/80 leading-relaxed max-w-2xl font-light">
              Just like master vinyl pressings demand microscopic tolerance so physical grooves never jump or distort,
              smart contract protocols and backend engines require bulletproof invariants, predictable gas schedules,
              and low-latency event synchronization. Every track in this catalogue reflects a battle-tested engineering pillar.
            </p>
          </div>

          {/* Right Label Stamp / Hi-Fi Vinyl Badge */}
          <div className="col-span-12 lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3 font-mono text-right">
            <div className="p-4 rounded-xl border border-[#8AB6F9]/30 bg-[#02071a]/80 backdrop-blur-md flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-full border border-[#8AB6F9]/40 bg-[#8AB6F9]/10 flex items-center justify-center shrink-0">
                <Disc3 className="w-5 h-5 text-[#8AB6F9] animate-[spin_6s_linear_infinite]" />
              </div>
              <div className="text-left font-mono">
                <div className="text-[10px] text-[#CADCFC] font-bold tracking-wider">
                  FATIMA MANSOOR STUDIOS
                </div>
                <div className="text-[8.5px] text-[#8AB6F9]/80 tracking-widest">
                  HI-FI EVM &amp; BACKEND RECORDINGS
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[9px] text-[#CADCFC]/70 tracking-widest">
              <Sparkles size={11} className="text-[#8AB6F9]" />
              <span>33⅓ RPM · LOSSLESS RELIABILITY</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE FAN OF SLEEVES WITH SPINNING VINYL RECORD + SPECIFICATIONS */}
      <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* LEFT / CENTER: True Fanned Sleeves Stage with Sliding Vinyl Record */}
        <div className="col-span-12 lg:col-span-7 flex flex-col items-center">
          {/* Main Visual Stage: Fixed Aspect Stage with Overlapping Fan */}
          <div
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            className="relative w-full max-w-[560px] h-[320px] sm:h-[370px] flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing touch-pan-y"
            title="Click or drag to explore architectural records"
          >
            {/* Ambient Radiance Glow behind vinyl */}
            <div
              className="absolute inset-0 rounded-full blur-[100px] opacity-25 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(138,182,249,0.5) 0%, rgba(202,220,252,0.2) 50%, transparent 80%)',
              }}
            />

            {/* THE SPINNING 12" VINYL RECORD (Emerged from the Active Sleeve) */}
            <motion.div
              key={`vinyl-${activeSleeve.id}`}
              animate={{
                x: 82,
                y: -6,
                scale: 1,
                opacity: 1,
              }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              className="absolute z-15 cursor-pointer select-none"
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Click to pause vinyl' : 'Click to spin vinyl'}
            >
              <motion.div
                animate={{
                  rotate: isPlaying && !prefersReduced ? 360 : 0,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: 'linear',
                }}
                className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-[#070b14] shadow-[0_20px_45px_rgba(0,0,0,0.95),0_0_35px_rgba(138,182,249,0.35)] border border-[rgba(255,255,255,0.12)] flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, #0e1424 0%, #060912 55%, #020408 100%)',
                }}
              >
                {/* Physical Vinyl Micro-Grooves */}
                <div className="absolute inset-2.5 rounded-full border border-white/[0.06] pointer-events-none" />
                <div className="absolute inset-5 rounded-full border border-white/[0.06] pointer-events-none" />
                <div className="absolute inset-7.5 rounded-full border border-white/[0.06] pointer-events-none" />
                <div className="absolute inset-10 rounded-full border border-white/[0.06] pointer-events-none" />
                <div className="absolute inset-12.5 rounded-full border border-white/[0.06] pointer-events-none" />
                <div className="absolute inset-15 rounded-full border border-white/[0.06] pointer-events-none" />
                <div className="absolute inset-17.5 rounded-full border border-white/[0.06] pointer-events-none" />

                {/* Grooved Light Reflection Sheen */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      'conic-gradient(from 45deg, transparent 0deg, rgba(202,220,252,0.14) 55deg, transparent 110deg, transparent 180deg, rgba(138,182,249,0.16) 235deg, transparent 290deg)',
                  }}
                />

                {/* Center Record Label / Sticker */}
                <div
                  className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#8AB6F9]/50 flex flex-col items-center justify-center p-1 text-center shadow-[0_0_18px_rgba(138,182,249,0.35)]"
                  style={{
                    background: 'radial-gradient(circle, #8AB6F9 0%, #0d1b40 70%, #03081a 100%)',
                  }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#02071a] border border-[#CADCFC] shadow-inner mb-0.5" />
                  <span className="font-mono text-[7px] font-bold text-[#CADCFC] tracking-tighter truncate max-w-[85%]">
                    {activeSleeve.catNumber}
                  </span>
                  <span className="font-mono text-[6px] text-[#8AB6F9] uppercase tracking-widest font-semibold">
                    FATIMA
                  </span>
                  <span className="font-mono text-[5.5px] text-[#CADCFC]/85 uppercase tracking-tight">
                    33⅓ RPM
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* THE FAN OF ALBUM SLEEVES (Layered Overlapping Fan) */}
            <div className="relative w-full h-full flex items-center justify-center">
              {SLEEVES.map((sleeve, idx) => {
                const diff = idx - selectedIdx;
                const isSelected = diff === 0;
                const IconComponent = sleeve.icon;

                // Fanned positioning calculations
                // Shift the active sleeve slightly left (-40px) so the vinyl emerges nicely on the right
                const offsetX = isSelected ? -45 : -45 + diff * 46;
                const rotateDeg = isSelected ? 0 : diff * 5.5;
                const scale = isSelected ? 1.05 : Math.max(0.88, 1 - Math.abs(diff) * 0.05);
                const zIndex = isSelected ? 25 : 20 - Math.abs(diff);
                const opacity = Math.abs(diff) > 2 ? 0.35 : 1 - Math.abs(diff) * 0.12;

                return (
                  <motion.div
                    key={sleeve.id}
                    animate={{
                      x: offsetX,
                      y: isSelected ? -4 : Math.abs(diff) * 3,
                      rotate: rotateDeg,
                      scale,
                      opacity,
                    }}
                    transition={{ type: 'spring', damping: 22, stiffness: 230 }}
                    onClick={() => selectSleeve(idx)}
                    className={`absolute cursor-pointer transition-shadow duration-300 w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-2xl border p-4 sm:p-5 flex flex-col justify-between overflow-hidden select-none backdrop-blur-md ${
                      isSelected
                        ? 'border-[#CADCFC] shadow-[0_24px_50px_-8px_rgba(2,7,26,0.95),0_0_35px_rgba(138,182,249,0.45)]'
                        : 'border-[#8AB6F9]/35 hover:border-[#8AB6F9]/80 shadow-[0_14px_30px_rgba(0,0,0,0.85)]'
                    }`}
                    style={{
                      zIndex,
                      background:
                        'linear-gradient(145deg, rgba(138,182,249,0.18) 0%, rgba(3,8,26,0.97) 65%, rgba(202,220,252,0.08) 100%)',
                    }}
                  >
                    {/* Spine Crease & Sleeve Texture Sheen */}
                    <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/60 via-white/5 to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />

                    {/* Header of Album Jacket */}
                    <div className="relative z-10 flex items-center justify-between border-b border-[#8AB6F9]/20 pb-1.5">
                      <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#8AB6F9] tracking-widest">
                        {sleeve.catNumber}
                      </span>
                      <span className="font-mono text-[8px] sm:text-[9px] tracking-wider text-[#CADCFC]/85 font-semibold">
                        VOL. 0{idx + 1}
                      </span>
                    </div>

                    {/* Center Visual: Architectural Monogram & Title */}
                    <div className="relative z-10 flex flex-col items-center justify-center my-auto py-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-[#8AB6F9]/40 bg-[#8AB6F9]/10 flex items-center justify-center mb-1.5 shadow-[0_0_14px_rgba(138,182,249,0.25)]">
                        <IconComponent className="w-5 h-5 text-[#CADCFC]" />
                      </div>
                      <h4 className="font-mono text-[10px] sm:text-[11.5px] font-bold text-[#CADCFC] text-center tracking-wider uppercase leading-snug line-clamp-2">
                        {sleeve.title}
                      </h4>
                      <span className="font-mono text-[7.5px] sm:text-[8px] text-[#8AB6F9] tracking-widest mt-1 text-center font-medium truncate max-w-full">
                        {sleeve.subtitle}
                      </span>
                    </div>

                    {/* Footer of Album Jacket */}
                    <div className="relative z-10 pt-1.5 border-t border-[#8AB6F9]/20 flex items-center justify-between font-mono text-[7.5px] sm:text-[8.5px] text-[#CADCFC]/75 font-medium">
                      <span className="tracking-wider">{sleeve.format}</span>
                      <span className="text-[#8AB6F9] font-bold">FATIMA // REC</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls & Telemetry */}
          <div className="w-full max-w-xl mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#8AB6F9]/20">
            {/* Direct Sleeve Indicator Dots */}
            <div className="flex items-center gap-2">
              {SLEEVES.map((sleeve, idx) => (
                <button
                  key={sleeve.id}
                  onClick={() => selectSleeve(idx)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[9px] tracking-wider transition-all ${
                    selectedIdx === idx
                      ? 'bg-[#8AB6F9] text-[#02071a] font-bold shadow-[0_0_12px_#8AB6F9]'
                      : 'bg-[#8AB6F9]/10 text-[#CADCFC]/70 hover:bg-[#8AB6F9]/20 hover:text-[#CADCFC] border border-[#8AB6F9]/25'
                  }`}
                  title={`View ${sleeve.title}`}
                >
                  <span>0{idx + 1}</span>
                  <span className="hidden sm:inline text-[8px] opacity-80">{sleeve.id.toUpperCase()}</span>
                </button>
              ))}
            </div>

            {/* Left/Right Steppers & Play/Pause */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => stepSleeve(-1)}
                disabled={selectedIdx === 0}
                className="p-2 rounded-lg border border-[#8AB6F9]/30 bg-[#8AB6F9]/10 text-[#CADCFC] hover:bg-[#8AB6F9]/20 hover:border-[#CADCFC] disabled:opacity-30 disabled:pointer-events-none transition-all"
                title="Previous Record"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => stepSleeve(1)}
                disabled={selectedIdx === SLEEVES.length - 1}
                className="p-2 rounded-lg border border-[#8AB6F9]/30 bg-[#8AB6F9]/10 text-[#CADCFC] hover:bg-[#8AB6F9]/20 hover:border-[#CADCFC] disabled:opacity-30 disabled:pointer-events-none transition-all"
                title="Next Record"
              >
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#8AB6F9]/40 bg-[#8AB6F9]/15 text-[#CADCFC] hover:bg-[#8AB6F9]/25 font-mono text-[9.5px] tracking-wider font-semibold uppercase transition-colors"
                title={isPlaying ? 'Pause Vinyl Rotation' : 'Spin Vinyl'}
              >
                {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                <span>{isPlaying ? 'PAUSE' : 'SPIN'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Active Record Specifications & Tracklist */}
        <div className="col-span-12 lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSleeve.id}
              initial={prefersReduced ? {} : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl border border-[#8AB6F9]/35 bg-gradient-to-br from-[rgba(138,182,249,0.12)] via-[rgba(2,7,26,0.92)] to-[rgba(202,220,252,0.06)] p-6 sm:p-7 backdrop-blur-xl shadow-[0_16px_40px_-8px_rgba(2,7,26,0.85),0_0_24px_-4px_rgba(138,182,249,0.2),inset_0_1px_0_rgba(202,220,252,0.3)]"
            >
              {/* Top Accent Hairline */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#8AB6F9] to-transparent" />

              {/* Volume Badge and Catalog Number */}
              <div className="flex items-center justify-between pb-3 border-b border-[#8AB6F9]/20 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8AB6F9] shadow-[0_0_8px_#8AB6F9] animate-pulse" />
                  <span className="font-mono text-[11px] font-bold text-[#8AB6F9] tracking-widest uppercase">
                    {activeSleeve.catNumber} // MASTER RECORDING
                  </span>
                </div>
                <span className="font-mono text-[9px] text-[#CADCFC] bg-[#8AB6F9]/15 border border-[#8AB6F9]/30 px-2.5 py-0.5 rounded-full font-semibold">
                  33⅓ RPM
                </span>
              </div>

              {/* Volume Title & Subtitle */}
              <h4 className="font-mono text-base sm:text-lg font-bold text-[#CADCFC] tracking-wider uppercase mb-1">
                {activeSleeve.title}
              </h4>
              <p className="font-mono text-[10.5px] text-[#8AB6F9] tracking-widest uppercase mb-4 font-semibold">
                {activeSleeve.subtitle}
              </p>

              {/* Description */}
              <p className="font-sans text-xs sm:text-[13px] text-[#CADCFC]/85 font-light leading-relaxed mb-6">
                {activeSleeve.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {activeSleeve.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] tracking-wider font-semibold text-[#8AB6F9] px-2.5 py-1 rounded bg-[#8AB6F9]/15 border border-[#8AB6F9]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* TRACKLIST (Architectural Invariants & Specs) */}
              <div className="space-y-2 border-t border-[#8AB6F9]/20 pt-4">
                <div className="flex items-center justify-between font-mono text-[9px] text-[#8AB6F9] tracking-widest uppercase mb-2 font-bold">
                  <span>SIDE A/B // TRACKLIST (SPECIFICATIONS)</span>
                  <span>RUN TIME</span>
                </div>

                {activeSleeve.tracks.map((track) => (
                  <div
                    key={track.num}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-[#040a20]/60 border border-[#8AB6F9]/20 hover:border-[#CADCFC]/60 transition-colors group"
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-[10px] font-bold text-[#8AB6F9] group-hover:text-[#CADCFC] transition-colors">
                        {track.num}
                      </span>
                      <span className="font-mono text-[11px] text-[#CADCFC] group-hover:text-white transition-colors font-medium">
                        {track.title}
                      </span>
                    </div>
                    <span className="font-mono text-[9.5px] text-[#8AB6F9]/80 tabular-nums">
                      {track.length}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

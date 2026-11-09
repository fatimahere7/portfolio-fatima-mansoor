import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useCursorTrigger } from '../cursor/CursorContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface Node {
  id: string;
  label: string;
  role: string;
  x: number;
  y: number;
}

const NODES: Node[] = [
  { id: 'evm', label: 'EVM CONTRACTS', role: 'Solidity Core', x: 220, y: 70 },
  { id: 'rpc', label: 'RPC VALIDATOR', role: 'Consensus Feed', x: 90, y: 140 },
  { id: 'api', label: 'GATEWAY API', role: 'Node.js Express', x: 350, y: 130 },
  { id: 'db', label: 'DATA PERSISTENCE', role: 'PostgreSQL · Supabase', x: 290, y: 240 },
  { id: 'ws', label: 'EVENT STREAMS', role: 'Event Telemetry', x: 120, y: 230 },
  { id: 'hub', label: 'STATE ROUTING', role: 'Core Orchestration', x: 210, y: 165 },
];

const EDGES: [string, string][] = [
  ['evm', 'rpc'],
  ['evm', 'hub'],
  ['rpc', 'hub'],
  ['hub', 'api'],
  ['api', 'db'],
  ['hub', 'ws'],
  ['ws', 'db'],
  ['hub', 'db'],
  ['evm', 'api'],
];

export const NetworkDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const cursorTrigger = useCursorTrigger('link', 'EXAMINE');
  const prefersReduced = usePrefersReducedMotion();

  const getNode = (id: string) => NODES.find((n) => n.id === id);

  return (
    <div className="relative w-full rounded-md bg-[#FFFFFF] border border-[#7B7B7B]/20 p-5 sm:p-6 overflow-hidden select-none">
      {/* Header Readout */}
      <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-[#7B7B7B] uppercase mb-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#222222]">TOPOLOGY</span>
          <span>·</span>
          <span>SYSTEM ARCHITECTURE</span>
        </div>
        <span className="font-mono tabular-nums text-[#7B7B7B]">
          LATENCY ~ 14ms
        </span>
      </div>

      {/* Interactive SVG Network Map */}
      <div className="relative w-full aspect-[440/300] max-h-[320px]">
        <svg
          viewBox="0 0 440 300"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Concentric Radar Rings in Subtle Gray */}
          <circle cx="210" cy="165" r="130" stroke="#7B7B7B" strokeOpacity="0.15" strokeWidth="1" />
          <circle
            cx="210"
            cy="165"
            r="85"
            stroke="#7B7B7B"
            strokeOpacity="0.25"
            strokeWidth="1"
            strokeDasharray="3 4"
          />

          {/* Network Edges (Connections) */}
          {EDGES.map(([fromId, toId], idx) => {
            const from = getNode(fromId);
            const to = getNode(toId);
            if (!from || !to) return null;

            const isHighlighted =
              activeNode === fromId || activeNode === toId || activeNode === null;

            return (
              <g key={`edge-${idx}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={isHighlighted ? '#7B7B7B' : '#7B7B7B'}
                  strokeOpacity={isHighlighted && activeNode !== null ? 0.8 : 0.25}
                  strokeWidth={isHighlighted && activeNode !== null ? 1.5 : 1}
                  className="transition-all duration-200"
                />

                {/* Traveling Data Packet */}
                {!prefersReduced && (
                  <motion.circle
                    r={isHighlighted ? 2 : 1.25}
                    fill="#222222"
                    animate={{
                      cx: [from.x, to.x],
                      cy: [from.y, to.y],
                      opacity: [0, 0.9, 0],
                    }}
                    transition={{
                      duration: 3 + (idx % 3) * 0.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: (idx * 0.4) % 2,
                    }}
                  />
                )}
              </g>
            );
          })}

          {/* Network Nodes */}
          {NODES.map((node) => {
            const isHovered = activeNode === node.id;
            const isConnected =
              isHovered ||
              (activeNode &&
                EDGES.some(
                  ([a, b]) =>
                    (a === activeNode && b === node.id) || (b === activeNode && a === node.id)
                ));

            return (
              <g
                key={node.id}
                onMouseEnter={() => {
                  setActiveNode(node.id);
                  cursorTrigger.onMouseEnter();
                }}
                onMouseLeave={() => {
                  setActiveNode(null);
                  cursorTrigger.onMouseLeave();
                }}
                className="cursor-pointer"
              >
                {/* Node Target Halo on Hover */}
                {isHovered && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={16}
                    fill="none"
                    stroke="#222222"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Outer Node Ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.id === 'hub' ? 7 : 5.5}
                  fill="#FFFFFF"
                  stroke={isConnected ? '#222222' : '#7B7B7B'}
                  strokeWidth="1.5"
                  className="transition-colors duration-150"
                />

                {/* Center Core Dot */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.id === 'hub' ? 3 : 2}
                  fill={isConnected ? '#222222' : '#7B7B7B'}
                  className="transition-colors duration-150"
                />

                {/* Text Label */}
                <text
                  x={node.x}
                  y={node.y + (node.y > 200 ? 18 : -14)}
                  textAnchor="middle"
                  className={`font-mono text-[8.5px] tracking-[0.14em] uppercase transition-colors duration-150 ${
                    isConnected ? 'fill-[#222222] font-semibold' : 'fill-[#7B7B7B]'
                  }`}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Status Readout */}
      <div className="mt-3.5 pt-2.5 border-t border-[#7B7B7B]/15 flex items-center justify-between font-mono text-[8.5px] tracking-[0.18em] text-[#7B7B7B] uppercase">
        <div className="flex items-center gap-2">
          <span className="text-[#222222] font-semibold">
            {activeNode ? getNode(activeNode)?.role : 'DISTRIBUTED ARCHITECTURE'}
          </span>
        </div>
        <span className="tabular-nums text-[#7B7B7B]">EVM + NODE PIPELINE</span>
      </div>
    </div>
  );
};

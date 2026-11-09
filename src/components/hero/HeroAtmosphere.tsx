import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const HeroAtmosphere: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Gentle spring physics for subtle parallax of background artwork
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion, mouseX, mouseY]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Deep Obsidian Foundation */}
      <div className="absolute inset-0 bg-[#080808]" />

      {/* 2. Cinematic Charcoal & Vignette Gradient */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(ellipse 85% 65% at 50% 45%, #171717 0%, #0c0c0c 55%, #080808 100%)',
        }}
      />

      {/* 3. Directional Dramatic Spotlight from Top-Right (Echoing the Alexander Lighting) */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[80vw] h-[80vh] max-w-[900px] max-h-[900px] rounded-full opacity-25 blur-[120px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 40% 40%, rgba(217, 75, 75, 0.28) 0%, rgba(233, 229, 216, 0.12) 35%, transparent 75%)',
        }}
      />

      {/* 4. Fine Atmospheric Film Grain */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.038] mix-blend-screen pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="hero-film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-film-grain)" />
      </svg>

      {/* 5. Architectural & Cryptographic Monolith Silhouette (The Centerpiece Silhouette) */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute inset-0 flex items-center justify-center opacity-30 transition-opacity duration-1000"
      >
        <svg
          viewBox="0 0 1200 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[1300px] h-auto max-h-[92vh] object-contain text-[#888888]"
        >
          <defs>
            {/* Charcoal Engraving Shadow */}
            <radialGradient id="monolithGlow" cx="50%" cy="45%" r="45%">
              <stop offset="0%" stopColor="#1c1c1c" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#141414" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#080808" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="blueprintHairline" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E9E5D8" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#888888" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#D94B4B" stopOpacity="0.25" />
            </linearGradient>

            <pattern id="hatchGrid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 0 16 L 16 0" stroke="rgba(233, 229, 216, 0.04)" strokeWidth="0.5" />
            </pattern>
          </defs>

          {/* Core Central Architectural Silhouette Mass */}
          <path
            d="M 600 120 L 780 280 L 860 480 L 760 760 L 600 810 L 440 760 L 340 480 L 420 280 Z"
            fill="url(#monolithGlow)"
          />
          <path
            d="M 600 140 L 760 290 L 830 470 L 740 730 L 600 780 L 460 730 L 370 470 L 440 290 Z"
            fill="url(#hatchGrid)"
          />

          {/* Classical Architectural Elevation: Arches, Caliper Proportions & Pediment Lines */}
          <g stroke="url(#blueprintHairline)" strokeWidth="0.65" opacity="0.75">
            {/* Concentric Cryptographic Vault Arches */}
            <path d="M 380 520 A 220 220 0 0 1 820 520" strokeDasharray="3 3" />
            <path d="M 430 520 A 170 170 0 0 1 770 520" />
            <path d="M 480 520 A 120 120 0 0 1 720 520" strokeDasharray="4 2" />
            <path d="M 530 520 A 70 70 0 0 1 670 520" />

            {/* Vertical Blueprint Datum Lines */}
            <line x1="600" y1="90" x2="600" y2="820" stroke="#888888" strokeWidth="0.6" strokeDasharray="4 6" opacity="0.4" />
            <line x1="440" y1="200" x2="440" y2="760" stroke="#888888" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.25" />
            <line x1="760" y1="200" x2="760" y2="760" stroke="#888888" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.25" />

            {/* Horizontal Golden Ratio Guides */}
            <line x1="200" y1="360" x2="1000" y2="360" stroke="#888888" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.3" />
            <line x1="200" y1="520" x2="1000" y2="520" stroke="#888888" strokeWidth="0.5" opacity="0.35" />
            <line x1="260" y1="640" x2="940" y2="640" stroke="#888888" strokeWidth="0.4" strokeDasharray="3 3" opacity="0.25" />
          </g>

          {/* Blockchain Directed Acyclic Graph (DAG) Network Constellation */}
          <g stroke="rgba(233, 229, 216, 0.22)" strokeWidth="0.75">
            {/* Merkle Network Edges */}
            <line x1="600" y1="160" x2="490" y2="250" />
            <line x1="600" y1="160" x2="710" y2="250" />
            <line x1="490" y1="250" x2="380" y2="360" />
            <line x1="490" y1="250" x2="540" y2="360" />
            <line x1="710" y1="250" x2="660" y2="360" />
            <line x1="710" y1="250" x2="820" y2="360" />
            <line x1="380" y1="360" x2="320" y2="490" />
            <line x1="380" y1="360" x2="440" y2="490" />
            <line x1="820" y1="360" x2="760" y2="490" />
            <line x1="820" y1="360" x2="880" y2="490" />
            <line x1="540" y1="360" x2="660" y2="360" strokeDasharray="3 3" stroke="rgba(217, 75, 75, 0.4)" />
            <line x1="440" y1="490" x2="600" y2="610" />
            <line x1="760" y1="490" x2="600" y2="610" />
            <line x1="600" y1="610" x2="600" y2="740" stroke="#D94B4B" strokeWidth="1" strokeDasharray="4 2" />

            {/* Distributed Nodes */}
            <circle cx="600" cy="160" r="4.5" fill="#D94B4B" />
            <circle cx="490" cy="250" r="3.5" fill="#E9E5D8" />
            <circle cx="710" cy="250" r="3.5" fill="#E9E5D8" />
            <rect x="376" y="356" width="8" height="8" transform="rotate(45 380 360)" fill="#171717" stroke="#E9E5D8" strokeWidth="0.8" />
            <rect x="536" y="356" width="8" height="8" transform="rotate(45 540 360)" fill="#171717" stroke="#E9E5D8" strokeWidth="0.8" />
            <rect x="656" y="356" width="8" height="8" transform="rotate(45 660 360)" fill="#171717" stroke="#E9E5D8" strokeWidth="0.8" />
            <rect x="816" y="356" width="8" height="8" transform="rotate(45 820 360)" fill="#171717" stroke="#E9E5D8" strokeWidth="0.8" />

            <circle cx="320" cy="490" r="3" fill="#888888" />
            <circle cx="440" cy="490" r="3" fill="#888888" />
            <circle cx="760" cy="490" r="3" fill="#888888" />
            <circle cx="880" cy="490" r="3" fill="#888888" />
            <circle cx="600" cy="610" r="5" fill="#171717" stroke="#D94B4B" strokeWidth="1.2" />
            <circle cx="600" cy="740" r="3.5" fill="#D94B4B" />
          </g>

          {/* Precision Blueprint Crosshairs & Dimensional Calipers */}
          <g stroke="rgba(233, 229, 216, 0.16)" strokeWidth="0.5">
            {/* Top-Left Quadrant Spec */}
            <path d="M 220 220 L 260 220 M 220 220 L 220 260" />
            <circle cx="220" cy="220" r="1.5" fill="#E9E5D8" opacity="0.4" />

            {/* Top-Right Quadrant Spec */}
            <path d="M 980 220 L 940 220 M 980 220 L 980 260" />
            <circle cx="980" cy="220" r="1.5" fill="#E9E5D8" opacity="0.4" />

            {/* Bottom-Left Quadrant Spec */}
            <path d="M 220 720 L 260 720 M 220 720 L 220 680" />
            <circle cx="220" cy="720" r="1.5" fill="#E9E5D8" opacity="0.4" />

            {/* Bottom-Right Quadrant Spec */}
            <path d="M 980 720 L 940 720 M 980 720 L 980 680" />
            <circle cx="980" cy="720" r="1.5" fill="#E9E5D8" opacity="0.4" />
          </g>

          {/* Micro Technical Blueprint Typography */}
          <g fill="#888888" opacity="0.4" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', letterSpacing: '0.2em' }}>
            <text x="230" y="210">GENESIS_HASH // 0x9f4a...c7b1</text>
            <text x="230" y="228">COORD // LAT 31° 32' 59" N</text>
            <text x="790" y="210" textAnchor="start">CONSENSUS // PROOF-OF-STAKE</text>
            <text x="790" y="228" textAnchor="start">STATE_MACHINE // EVM-64</text>
            <text x="230" y="738">TOPOLOGY // PEER-TO-PEER MESH</text>
            <text x="770" y="738" textAnchor="start">ZERO_KNOWLEDGE // SNARK_VERIFIER</text>
          </g>

          {/* Orbiting Ring with Crimson Coordinate Node */}
          <circle
            cx="600"
            cy="460"
            r="320"
            stroke="rgba(217, 75, 75, 0.12)"
            strokeWidth="0.75"
            strokeDasharray="6 8"
          />
        </svg>
      </motion.div>

      {/* 6. Subtle Vignette Edge Mask (ensuring pure #080808 around viewport edges) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 160px 80px #080808',
        }}
      />
    </div>
  );
};


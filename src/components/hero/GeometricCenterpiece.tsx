import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { useCursorTrigger } from '../cursor/CursorContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface RibbonSegment {
  p1: Point3D;
  p2: Point3D;
  p3: Point3D;
  p4: Point3D;
  centerZ: number;
  normalZ: number;
  colorRatio: number;
}

export const GeometricCenterpiece: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const cursorTrigger = useCursorTrigger('image', 'EXPLORE');

  // Micro technical telemetry state for visual authenticity
  const [telemetry, setTelemetry] = useState({ pitch: '12.4°', yaw: '-18.6°' });

  // Internal physics & mouse tracking refs (no re-renders for 60fps loop)
  const isVisibleRef = useRef<boolean>(true);
  const rotXRef = useRef<number>(0.35);
  const rotYRef = useRef<number>(-0.45);
  const targetRotXRef = useRef<number>(0.35);
  const targetRotYRef = useRef<number>(-0.45);
  const timeRef = useRef<number>(0);

  // Handle subtle mouse interaction on desktop
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Subtly influence target rotation (physically responsive, elegant and measured)
    targetRotXRef.current = 0.35 + y * 0.55;
    targetRotYRef.current = -0.45 + x * 0.75;

    // Update telemetry sparingly
    const pitchVal = (targetRotXRef.current * (180 / Math.PI)).toFixed(1);
    const yawVal = (targetRotYRef.current * (180 / Math.PI)).toFixed(1);
    setTelemetry({ pitch: `${pitchVal}°`, yaw: `${yawVal}°` });
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetRotXRef.current = 0.35;
    targetRotYRef.current = -0.45;
  }, []);

  // IntersectionObserver to pause loop when Hero is out of viewport (Performance rule)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Parametric Torus Knot (2, 3) ribbon with aerodynamic volumetric twist
    const NUM_STEPS = 120;
    const RIBBON_WIDTH = 28;

    const sampleCurve = (u: number): { pos: Point3D; tangent: Point3D; normal: Point3D; binormal: Point3D } => {
      const p = 2;
      const q = 3;
      const R = 110;
      const r = 46;

      const rU = R + r * Math.cos(q * u);
      const x = rU * Math.cos(p * u);
      const y = rU * Math.sin(p * u);
      const z = -r * Math.sin(q * u) * 1.35;

      const du = 0.001;
      const rU2 = R + r * Math.cos(q * (u + du));
      const x2 = rU2 * Math.cos(p * (u + du));
      const y2 = rU2 * Math.sin(p * (u + du));
      const z2 = -r * Math.sin(q * (u + du)) * 1.35;

      const tx = x2 - x;
      const ty = y2 - y;
      const tz = z2 - z;
      const tLen = Math.hypot(tx, ty, tz) || 1;
      const tangent = { x: tx / tLen, y: ty / tLen, z: tz / tLen };

      const twist = u * 1.5;
      const nx = Math.cos(twist);
      const ny = Math.sin(twist);
      const nz = 0;

      const bx = tangent.y * nz - tangent.z * ny;
      const by = tangent.z * nx - tangent.x * nz;
      const bz = tangent.x * ny - tangent.y * nx;
      const bLen = Math.hypot(bx, by, bz) || 1;

      return {
        pos: { x, y, z },
        tangent,
        normal: { x: nx, y: ny, z: nz },
        binormal: { x: bx / bLen, y: by / bLen, z: bz / bLen },
      };
    };

    let animationId: number;

    const render = () => {
      if (!isVisibleRef.current) {
        animationId = requestAnimationFrame(render);
        return;
      }

      // Smooth lerp mouse physics
      rotXRef.current += (targetRotXRef.current - rotXRef.current) * 0.04;
      rotYRef.current += (targetRotYRef.current - rotYRef.current) * 0.04;

      if (!prefersReducedMotion) {
        timeRef.current += 0.006;
      }

      const t = timeRef.current;
      // Ambient slow floating rotation and gentle oscillation
      const currentRotX = rotXRef.current + Math.sin(t * 0.7) * 0.05;
      const currentRotY = rotYRef.current + t * 0.32; // continuous slow graceful revolution
      const floatY = Math.sin(t * 1.1) * 9;

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2 + floatY;

      ctx.clearRect(0, 0, width, height);

      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);

      const transform = (p: Point3D): { px: number; py: number; pz: number } => {
        const x1 = p.x * cosY + p.z * sinY;
        const y1 = p.y;
        const z1 = -p.x * sinY + p.z * cosY;

        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        const fov = 420;
        const cameraZ = 520;
        const scale = fov / (cameraZ + z2);

        return {
          px: centerX + x2 * scale,
          py: centerY + y2 * scale,
          pz: z2,
        };
      };

      const segments: RibbonSegment[] = [];

      for (let i = 0; i < NUM_STEPS; i++) {
        const u1 = (i / NUM_STEPS) * Math.PI * 2;
        const u2 = ((i + 1) / NUM_STEPS) * Math.PI * 2;

        const c1 = sampleCurve(u1);
        const c2 = sampleCurve(u2);

        const halfW = RIBBON_WIDTH * 0.5;

        const p1: Point3D = {
          x: c1.pos.x + c1.binormal.x * halfW,
          y: c1.pos.y + c1.binormal.y * halfW,
          z: c1.pos.z + c1.binormal.z * halfW,
        };
        const p2: Point3D = {
          x: c1.pos.x - c1.binormal.x * halfW,
          y: c1.pos.y - c1.binormal.y * halfW,
          z: c1.pos.z - c1.binormal.z * halfW,
        };
        const p3: Point3D = {
          x: c2.pos.x - c2.binormal.x * halfW,
          y: c2.pos.y - c2.binormal.y * halfW,
          z: c2.pos.z - c2.binormal.z * halfW,
        };
        const p4: Point3D = {
          x: c2.pos.x + c2.binormal.x * halfW,
          y: c2.pos.y + c2.binormal.y * halfW,
          z: c2.pos.z + c2.binormal.z * halfW,
        };

        const centerZ = (p1.z + p2.z + p3.z + p4.z) / 4;

        const nx = c1.normal.x;
        const ny = c1.normal.y;
        const nz = c1.normal.z;
        const normalZ = -nx * sinY * sinX + ny * cosX + nz * cosY * sinX;

        segments.push({
          p1,
          p2,
          p3,
          p4,
          centerZ,
          normalZ,
          colorRatio: i / NUM_STEPS,
        });
      }

      // Painter's algorithm depth sort
      segments.sort((a, b) => a.centerZ - b.centerZ);

      // Light vectors: Primary Cyan/Blue from top-left, secondary Coral/Purple rim from bottom-right
      const l1 = { x: -0.4, y: -0.7, z: 0.6 };
      const l2 = { x: 0.6, y: 0.5, z: -0.5 };

      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        const proj1 = transform(seg.p1);
        const proj2 = transform(seg.p2);
        const proj3 = transform(seg.p3);
        const proj4 = transform(seg.p4);

        const dotLight1 = Math.max(0, -seg.normalZ * l1.z + 0.35);
        const dotLight2 = Math.max(0, seg.normalZ * l2.z + 0.2);

        // Palette mapping: Royal Blue -> Cyan -> Purple -> Coral highlights
        const ratio = (seg.colorRatio + t * 0.08) % 1;

        let rVal = 5;
        let gVal = 18;
        let bVal = 40;

        if (ratio < 0.38) {
          // Electric Blue to Cyan
          const localR = ratio / 0.38;
          rVal = Math.round(0 + localR * 56);
          gVal = Math.round(102 + localR * 87);
          bVal = Math.round(255 - localR * 7);
        } else if (ratio < 0.72) {
          // Cyan to Violet / Purple
          const localR = (ratio - 0.38) / 0.34;
          rVal = Math.round(56 + localR * 115);
          gVal = Math.round(189 - localR * 110);
          bVal = Math.round(248 - localR * 25);
        } else {
          // Purple to Subtle Coral / Pink accent flash
          const localR = (ratio - 0.72) / 0.28;
          rVal = Math.round(171 + localR * 73);
          gVal = Math.round(79 - localR * 16);
          bVal = Math.round(223 - localR * 129);
        }

        const depthFactor = Math.max(0.28, Math.min(1.2, (seg.centerZ + 150) / 300));
        const lightIntensity = Math.min(1.4, dotLight1 * 1.1 + dotLight2 * 0.45);

        rVal = Math.min(255, Math.round(rVal * lightIntensity * depthFactor + dotLight2 * 45));
        gVal = Math.min(255, Math.round(gVal * lightIntensity * depthFactor));
        bVal = Math.min(255, Math.round(bVal * lightIntensity * depthFactor + dotLight1 * 30));

        const alpha = Math.min(0.98, Math.max(0.45, 0.5 + depthFactor * 0.45));

        ctx.beginPath();
        ctx.moveTo(proj1.px, proj1.py);
        ctx.lineTo(proj2.px, proj2.py);
        ctx.lineTo(proj3.px, proj3.py);
        ctx.lineTo(proj4.px, proj4.py);
        ctx.closePath();

        ctx.fillStyle = `rgba(${rVal}, ${gVal}, ${bVal}, ${alpha})`;
        ctx.fill();

        ctx.strokeStyle = `rgba(56, 189, 248, ${0.16 * depthFactor})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [prefersReducedMotion]);

  // Responsive canvas sizing with DPR scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeObserver = new ResizeObserver(() => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = Math.min(rect.width, rect.height > 0 ? rect.height * 1.25 : 460, 480);

      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={cursorTrigger.onMouseEnter}
      onMouseLeave={() => {
        handleMouseLeave();
        cursorTrigger.onMouseLeave();
      }}
      className="relative flex items-center justify-center select-none w-full max-w-[420px] sm:max-w-[460px] md:max-w-[500px] h-[220px] sm:h-[270px] md:h-[320px] lg:h-[360px] max-h-[44vh] mx-auto pointer-events-auto"
      aria-label="3D Parametric Loop Centerpiece"
    >
      {/* Ambient Radial Glowing Ambiance behind the object */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[380px] md:w-[440px] h-[220px] sm:h-[280px] md:h-[320px] rounded-full pointer-events-none opacity-40 blur-[80px]"
        style={{
          background:
            'radial-gradient(circle, rgba(0,102,255,0.45) 0%, rgba(56,189,248,0.2) 35%, rgba(147,51,234,0.15) 55%, rgba(244,63,94,0.1) 75%, transparent 85%)',
        }}
      />

      {/* Decorative Technical Orbital Guide Rings */}
      <div className="absolute w-[240px] sm:w-[300px] md:w-[360px] h-[240px] sm:h-[300px] md:h-[360px] rounded-full border border-[rgba(255,255,255,0.04)] pointer-events-none" />

      {/* Interactive Orbit with Moving Marker */}
      <div className="absolute w-[280px] sm:w-[350px] md:w-[410px] h-[280px] sm:h-[350px] md:h-[410px] rounded-full border border-[rgba(0,102,255,0.1)] border-dashed pointer-events-none animate-[spin_80s_linear_infinite] flex items-center justify-start">
        <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] shadow-[0_0_10px_#f43f5e] -translate-x-1/2" />
      </div>

      {/* Subtle Micro Crosshairs at Cardinal Coordinates */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[7.5px] text-[#38bdf8]/30 tracking-widest uppercase pointer-events-none">
        + 00° N
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[7.5px] text-[#38bdf8]/30 tracking-widest uppercase pointer-events-none">
        - 00° S
      </div>

      {/* Real-time 3D Parametric Object Canvas */}
      <canvas
        ref={canvasRef}
        width={440}
        height={440}
        className="relative z-10 block transition-transform duration-200"
      />

      {/* Precision Floating Telemetry Badge (Quiet technical metadata) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-1 right-3 sm:right-6 z-20 flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] text-[#8fa0b8]/35 uppercase pointer-events-none"
      >
        <span className="w-1 h-1 rounded-full bg-[#f43f5e]/80 animate-pulse" />
        <span>SYS // P:{telemetry.pitch} Y:{telemetry.yaw}</span>
      </motion.div>
    </div>
  );
};

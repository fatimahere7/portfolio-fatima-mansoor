'use client';

import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';
import './WarpText.css';

const vertex = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;

uniform sampler2D uTextTexture;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uPointerActive;
uniform float uTime;
uniform float uWarpStrength;
uniform float uWarpScale;
uniform float uSpeed;
uniform float uPointerInfluence;
uniform float uPointerStrength;
uniform float uRefraction;
uniform float uRipple;
uniform float uMotion;

in vec2 vUv;
out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.02;
    amplitude *= 0.5;
  }
  return value;
}

vec4 sampleText(vec2 uv) {
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    return vec4(0.0);
  }
  return texture(uTextTexture, uv);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  float time = uTime * uSpeed;
  float scale = max(uWarpScale, 0.001);

  vec2 drift = vec2(time * 0.055, -time * 0.045);
  float n1 = fbm(uv * scale * 3.1 + drift);
  float n2 = fbm((uv + 19.17) * scale * 3.4 - drift.yx);
  vec2 ambient = (vec2(n1, n2) - 0.5) * uWarpStrength * 0.045 * uMotion;

  vec2 pointerDelta = uv - uPointer;
  vec2 aspectDelta = vec2(pointerDelta.x * aspect, pointerDelta.y);
  float dist = length(aspectDelta);
  float radius = max(uPointerInfluence, 0.001);
  float t = clamp(dist / radius, 0.0, 1.0);
  float lens = smoothstep(radius, 0.0, dist) * uPointerActive;
  float bulge = t * (1.0 - t) * (1.0 - t) * 6.75 * uPointerActive;
  vec2 dir = dist > 0.0001 ? vec2(aspectDelta.x / aspect, aspectDelta.y) / dist : vec2(0.0);

  float rippleWave = sin(dist * 28.0 - time * 4.2) * 0.5 + 0.5;
  float rippleRing = (rippleWave - 0.5) * uRipple;
  vec2 pointerWarp = -dir * bulge * uPointerStrength * 0.045;
  pointerWarp += dir * rippleRing * bulge * uPointerStrength * 0.016;

  vec2 displaced = uv + ambient + pointerWarp;
  vec2 splitDir = ambient + pointerWarp;
  float splitLen = length(splitDir);
  splitDir = splitLen > 0.00001 ? splitDir / splitLen : vec2(0.7071, 0.7071);
  vec2 split = splitDir * uRefraction * 0.16 * (0.35 + lens * 1.65);

  vec4 base = sampleText(displaced);
  float r = sampleText(displaced + split).r;
  float g = base.g;
  float b = sampleText(displaced - split).b;
  float a = max(max(sampleText(displaced + split).a, base.a), sampleText(displaced - split).a);

  vec3 color = vec3(r, g, b) + lens * base.a * 0.055;
  fragColor = vec4(color, a);
}
`;

const getFontValue = (value: string | number | undefined): string =>
  typeof value === 'number' ? `${value}px` : (value ?? '');

const measureLine = (ctx: CanvasRenderingContext2D, line: string, letterSpacing: number): number => {
  const chars = Array.from(line);
  const textWidth = chars.reduce((width, char) => width + ctx.measureText(char).width, 0);
  return textWidth + Math.max(0, chars.length - 1) * letterSpacing;
};

const drawLine = (
  ctx: CanvasRenderingContext2D,
  line: string,
  x: number,
  y: number,
  letterSpacing: number
): void => {
  const chars = Array.from(line);
  let cursor = x - measureLine(ctx, line, letterSpacing) / 2;

  chars.forEach((char, index) => {
    ctx.fillText(char, cursor, y);
    cursor += ctx.measureText(char).width + (index === chars.length - 1 ? 0 : letterSpacing);
  });
};

export interface WarpTextProps {
  text?: string;
  color?: string;
  warpStrength?: number;
  warpScale?: number;
  speed?: number;
  pointerInfluence?: number;
  pointerStrength?: number;
  refraction?: number;
  ripple?: boolean;
  fontSize?: string | number;
  fontWeight?: string | number;
  fontFamily?: string;
  letterSpacing?: string | number;
  lineHeight?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const parseFontSizePx = (val: string | number | undefined, viewportWidth: number = 1200): number => {
  if (typeof val === 'number') return val;
  if (!val) return 72;
  const str = String(val).trim();
  if (str.startsWith('clamp(') && str.endsWith(')')) {
    const parts = str.slice(6, -1).split(',').map(s => s.trim());
    if (parts.length === 3) {
      const min = parseFontSizePx(parts[0], viewportWidth);
      const pref = parseFontSizePx(parts[1], viewportWidth);
      const max = parseFontSizePx(parts[2], viewportWidth);
      return Math.min(Math.max(min, pref), max);
    }
  }
  if (str.endsWith('rem') || str.endsWith('em')) {
    return (parseFloat(str) || 4.5) * 16;
  }
  if (str.endsWith('vw')) {
    return ((parseFloat(str) || 7.6) / 100) * viewportWidth;
  }
  if (str.endsWith('px')) {
    return parseFloat(str) || 72;
  }
  const parsed = parseFloat(str);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 72;
};

const parseLetterSpacingPx = (val: string | number | undefined, baseFontSize: number): number => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  const str = String(val).trim();
  if (str.endsWith('em') || str.endsWith('rem')) {
    return (parseFloat(str) || 0) * baseFontSize;
  }
  if (str.endsWith('px')) {
    return parseFloat(str) || 0;
  }
  return (parseFloat(str) || 0) * baseFontSize;
};

interface BuildCanvasOptions {
  width: number;
  height: number;
  dpr: number;
  props: Required<Omit<WarpTextProps, 'className' | 'style'>>;
}

const buildTextCanvas = ({ width, height, dpr, props }: BuildCanvasOptions): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  let fontSizePx = parseFontSizePx(props.fontSize, viewportWidth);
  const fontFamily = props.fontFamily || "'Montserrat', sans-serif";
  const fontWeight = String(props.fontWeight || 500);
  let letterSpacing = parseLetterSpacingPx(props.letterSpacing, fontSizePx);
  let lineHeight = typeof props.lineHeight === 'number'
    ? fontSizePx * props.lineHeight
    : (parseFloat(String(props.lineHeight)) || 0.92) * fontSizePx;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = props.color;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const lines = String(props.text || '').split('\n');
  const applyFont = () => {
    ctx.font = `${fontWeight} ${fontSizePx}px ${fontFamily}`;
  };
  applyFont();

  const maxWidth = Math.max(width * 0.9, 100);
  const maxHeight = Math.max(height * 0.88, 60);
  const widest = Math.max(...lines.map(line => measureLine(ctx, line, letterSpacing)), 1);
  const blockHeight = Math.max(lineHeight * lines.length, 1);
  const fit = Math.max(0.3, Math.min(1, maxWidth / widest, maxHeight / blockHeight));

  if (fit < 1) {
    fontSizePx = Math.max(24, fontSizePx * fit);
    letterSpacing *= fit;
    lineHeight *= fit;
    applyFont();
  }

  const startY = height / 2 - (lineHeight * (lines.length - 1)) / 2;
  lines.forEach((line, index) => drawLine(ctx, line, width / 2, startY + index * lineHeight, letterSpacing));

  return canvas;
};

const syncUniforms = (program: Program, props: Required<Omit<WarpTextProps, 'className' | 'style'>>) => {
  const uniforms = program.uniforms as Record<string, { value: unknown }>;
  if (uniforms.uWarpStrength) uniforms.uWarpStrength.value = props.warpStrength;
  if (uniforms.uWarpScale) uniforms.uWarpScale.value = props.warpScale;
  if (uniforms.uSpeed) uniforms.uSpeed.value = props.speed;
  if (uniforms.uPointerInfluence) uniforms.uPointerInfluence.value = props.pointerInfluence;
  if (uniforms.uPointerStrength) uniforms.uPointerStrength.value = props.pointerStrength;
  if (uniforms.uRefraction) uniforms.uRefraction.value = props.refraction;
  if (uniforms.uRipple) uniforms.uRipple.value = props.ripple ? 1 : 0;
};

export const WarpText: React.FC<WarpTextProps> = ({
  text = 'Bend the moment',
  color = '#f8f5ff',
  warpStrength = 0.08,
  warpScale = 1.7,
  speed = 0.55,
  pointerInfluence = 0.42,
  pointerStrength = 0.38,
  refraction = 0.018,
  ripple = true,
  fontSize = 'clamp(3rem, 10vw, 9rem)',
  fontWeight = 800,
  fontFamily = 'inherit',
  letterSpacing = '-0.06em',
  lineHeight = 0.9,
  className = '',
  style
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const propsRef = useRef<Required<Omit<WarpTextProps, 'className' | 'style'>>>({
    text,
    color,
    fontSize,
    fontWeight,
    fontFamily,
    letterSpacing,
    lineHeight,
    warpStrength,
    warpScale,
    speed,
    pointerInfluence,
    pointerStrength,
    refraction,
    ripple
  });
  const contextRef = useRef<{ program: Program; rasterize: () => void } | null>(null);

  useEffect(() => {
    propsRef.current = {
      text,
      color,
      fontSize,
      fontWeight,
      fontFamily,
      letterSpacing,
      lineHeight,
      warpStrength,
      warpScale,
      speed,
      pointerInfluence,
      pointerStrength,
      refraction,
      ripple
    };

    if (contextRef.current) {
      syncUniforms(contextRef.current.program, propsRef.current);
      contextRef.current.rasterize();
    }
  }, [
    text,
    color,
    fontSize,
    fontWeight,
    fontFamily,
    letterSpacing,
    lineHeight,
    warpStrength,
    warpScale,
    speed,
    pointerInfluence,
    pointerStrength,
    refraction,
    ripple
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return undefined;

    let renderer: any;
    let gl: any;
    let program: any;
    let geometry: any;
    let mesh: any;
    let texture: any;
    let resizeObserver: ResizeObserver | undefined;
    let raf = 0;
    let disposed = false;
    let contextLost = false;
    let pageVisible = !document.hidden;
    let reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    let rasterVersion = 0;

    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, active: 0, activeTarget: 0 };
    const startTime = performance.now();

    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        premultipliedAlpha: false,
        antialias: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
        dpr: Math.min(window.devicePixelRatio || 1, 2)
      });
      gl = renderer.gl;
    } catch (error) {
      console.warn('WarpText: WebGL could not be initialized.', error);
      return undefined;
    }

    if (!gl) return undefined;

    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas as HTMLCanvasElement;
    if (canvas) {
      canvas.style.position = 'absolute';
      canvas.style.inset = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      canvas.style.zIndex = '1';
      canvas.style.pointerEvents = 'auto';
      canvas.setAttribute('aria-hidden', 'true');
      container.appendChild(canvas);
    }

    texture = new Texture(gl, {
      generateMipmaps: false,
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
      wrapS: gl.CLAMP_TO_EDGE,
      wrapT: gl.CLAMP_TO_EDGE
    });

    geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTextTexture: { value: texture },
        uResolution: { value: new Float32Array([1, 1]) },
        uPointer: { value: new Float32Array([0.5, 0.5]) },
        uPointerActive: { value: 0 },
        uTime: { value: 0 },
        uWarpStrength: { value: propsRef.current.warpStrength },
        uWarpScale: { value: propsRef.current.warpScale },
        uSpeed: { value: propsRef.current.speed },
        uPointerInfluence: { value: propsRef.current.pointerInfluence },
        uPointerStrength: { value: propsRef.current.pointerStrength },
        uRefraction: { value: propsRef.current.refraction },
        uRipple: { value: propsRef.current.ripple ? 1 : 0 },
        uMotion: { value: reduceMotion ? 0 : 1 }
      }
    });
    mesh = new Mesh(gl, { geometry, program });

    const renderOnce = () => {
      if (disposed || contextLost || !renderer || !mesh) return;
      try {
        renderer.render({ scene: mesh });
      } catch (e) {
        // Prevent transient draw frame errors from terminating state
      }
    };

    const rasterize = () => {
      if (disposed || contextLost || !texture) return;

      const width = container.clientWidth || container.offsetWidth || 820;
      const height = container.clientHeight || container.offsetHeight || 260;
      if (width <= 0 || height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const textCanvas = buildTextCanvas({
        width,
        height,
        dpr,
        props: propsRef.current
      });
      texture.image = textCanvas;
      texture.needsUpdate = true;
      renderOnce();
    };

    let lastWidth = 0;
    let lastHeight = 0;
    const resize = () => {
      if (disposed || contextLost || !renderer || !program || !gl) return;
      const width = container.clientWidth || container.offsetWidth;
      const height = container.clientHeight || container.offsetHeight;
      if (width <= 0 || height <= 0) return;
      // Guard: do not re-clear canvas or re-rasterize if width and height have not genuinely changed
      if (Math.abs(width - lastWidth) < 2 && Math.abs(height - lastHeight) < 2) return;
      lastWidth = width;
      lastHeight = height;

      renderer.dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setSize(width, height);
      const res = program.uniforms.uResolution.value as Float32Array;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
      rasterize();
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!disposed && !contextLost) {
          rasterize();
        }
      });
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      pointer.tx = (event.clientX - rect.left) / rect.width;
      pointer.ty = 1 - (event.clientY - rect.top) / rect.height;
      pointer.activeTarget = 1;
    };

    const onPointerLeave = () => {
      pointer.activeTarget = 0;
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onContextRestored = () => {
      contextLost = false;
      if (texture) texture.needsUpdate = true;
      lastWidth = 0;
      lastHeight = 0;
      resize();
      if (pageVisible && !raf) {
        raf = requestAnimationFrame(loop);
      }
    };

    const onWindowScroll = () => {
      // Clear pointer active target during scrolling so cursor distortion resets smoothly
      pointer.activeTarget = 0;
    };

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible && !raf) {
        renderOnce();
        raf = requestAnimationFrame(loop);
      }
      if (!pageVisible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const onReducedMotion = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      if (program?.uniforms?.uMotion) {
        (program.uniforms.uMotion as { value: number }).value = reduceMotion ? 0 : 1;
      }
      renderOnce();
    };

    const loop = (now: number) => {
      if (disposed || contextLost || !program) return;

      try {
        const elapsed = (now - startTime) * 0.001;
        const idleX = 0.5 + Math.sin(elapsed * 0.33) * 0.12;
        const idleY = 0.5 + Math.cos(elapsed * 0.27) * 0.1;
        const targetX = pointer.activeTarget > 0 ? pointer.tx : idleX;
        const targetY = pointer.activeTarget > 0 ? pointer.ty : idleY;
        const damping = pointer.activeTarget > 0 ? 0.12 : 0.035;

        pointer.x += (targetX - pointer.x) * damping;
        pointer.y += (targetY - pointer.y) * damping;
        pointer.active += ((pointer.activeTarget > 0 ? 1 : 0.18) - pointer.active) * 0.06;

        const ptr = program.uniforms.uPointer.value as Float32Array;
        ptr[0] = pointer.x;
        ptr[1] = pointer.y;

        const ptrActive = program.uniforms.uPointerActive as { value: number };
        ptrActive.value = reduceMotion ? pointer.active * 0.35 : pointer.active;

        const uTimeVal = program.uniforms.uTime as { value: number };
        uTimeVal.value = reduceMotion ? 0 : elapsed;

        renderOnce();
      } catch (err) {
        // Prevent momentary errors from stopping RAF loop
      }

      if (!disposed && !contextLost && pageVisible) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    if (canvas) {
      canvas.addEventListener('pointermove', onPointerMove);
      canvas.addEventListener('pointerleave', onPointerLeave);
      canvas.addEventListener('webglcontextlost', onContextLost as EventListener, false);
      canvas.addEventListener('webglcontextrestored', onContextRestored as EventListener, false);
    }
    window.addEventListener('scroll', onWindowScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    mediaQuery?.addEventListener('change', onReducedMotion);

    syncUniforms(program, propsRef.current);
    contextRef.current = { program, rasterize };
    resize();
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      contextRef.current = null;
      if (raf) cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
      if (canvas) {
        canvas.removeEventListener('pointermove', onPointerMove);
        canvas.removeEventListener('pointerleave', onPointerLeave);
        canvas.removeEventListener('webglcontextlost', onContextLost as EventListener);
        canvas.removeEventListener('webglcontextrestored', onContextRestored as EventListener);
      }
      window.removeEventListener('scroll', onWindowScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      mediaQuery?.removeEventListener('change', onReducedMotion);

      if (!contextLost && gl) {
        try {
          if (texture?.texture) gl.deleteTexture(texture.texture);
          geometry?.remove?.();
          program?.remove?.();
          gl.getExtension('WEBGL_lose_context')?.loseContext();
        } catch (error) {
          void error;
        }
      }

      if (canvas && canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`warp-text relative overflow-hidden select-none ${className}`.trim()}
      style={{
        ...style,
        position: 'relative',
      }}
      role="heading"
      aria-level={1}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
    </div>
  );
};

export default WarpText;

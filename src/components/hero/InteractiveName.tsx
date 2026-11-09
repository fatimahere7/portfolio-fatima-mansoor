import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface InteractiveNameProps {
  onHoverChange?: (isHovered: boolean) => void;
  // Allows user to toggle whether second word is Warm Off-White (exact Alexander reference match) or Crimson
  secondWordColor?: 'warm' | 'crimson';
}

export const InteractiveName: React.FC<InteractiveNameProps> = ({
  onHoverChange,
  secondWordColor = 'warm',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // The Exact Reference Title Case Lettering
  const word1 = 'Fatima';
  const word2 = 'Mansoor';

  // Active hover states
  const [hoveredLetterId, setHoveredLetterId] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isContainerHovered, setIsContainerHovered] = useState<boolean>(false);
  const [ambientOffset, setAmbientOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Ambient micro-oscillation for mobile/touch or idle state
  useEffect(() => {
    if (prefersReducedMotion) return;

    let frameId: number;
    let t = 0;

    const animateAmbient = () => {
      t += 0.025;
      const x = Math.sin(t * 0.8) * 2.5;
      const y = Math.cos(t * 0.9) * 1.5;
      setAmbientOffset({ x, y });
      frameId = requestAnimationFrame(animateAmbient);
    };

    frameId = requestAnimationFrame(animateAmbient);
    return () => cancelAnimationFrame(frameId);
  }, [prefersReducedMotion]);

  // Track mouse coordinates across the container for organic letter influence
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
  }, []);

  const handleMouseEnter = () => {
    setIsContainerHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsContainerHovered(false);
    setHoveredLetterId(null);
    setCursorPos(null);
    onHoverChange?.(false);
  };

  // Touch device alternative: tap to trigger ghost separation
  const handleTouch = (letterId: string) => {
    setHoveredLetterId(letterId);
    setTimeout(() => {
      setHoveredLetterId(null);
    }, 1800);
  };

  // Render an individual interactive glyph using exact Playfair Display anatomy
  const renderLetter = (
    char: string,
    index: number,
    wordPrefix: string,
    textColor: string,
    strokeColor: string = '#D94B4B'
  ) => {
    const letterId = `${wordPrefix}-${index}`;
    const isDirectlyHovered = hoveredLetterId === letterId;

    let displacementX = 0;
    let displacementY = 0;
    let ghostOpacity = 0;
    let baseParallaxX = 0;
    let baseParallaxY = 0;

    if (isDirectlyHovered) {
      // Full displacement as in Reference 3 (exact ~14px offset on letter 'r')
      displacementX = 14;
      displacementY = -3.5;
      ghostOpacity = 1;
      baseParallaxX = -2;
      baseParallaxY = 1;
    } else if (isContainerHovered && cursorPos && containerRef.current) {
      const letterElement = document.getElementById(letterId);
      if (letterElement && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const letterRect = letterElement.getBoundingClientRect();
        const letterCenterX = letterRect.left - containerRect.left + letterRect.width / 2;
        const letterCenterY = letterRect.top - containerRect.top + letterRect.height / 2;

        const dx = cursorPos.x - letterCenterX;
        const dy = cursorPos.y - letterCenterY;
        const distance = Math.hypot(dx, dy);

        const maxDist = 140;
        if (distance < maxDist) {
          const proximity = Math.pow(1 - distance / maxDist, 1.5);
          const angle = Math.atan2(dy, dx);
          displacementX = Math.cos(angle) * 12 * proximity + 3 * proximity;
          displacementY = Math.sin(angle) * 6 * proximity - 2 * proximity;
          ghostOpacity = Math.max(0.2, proximity * 0.95);
          baseParallaxX = -displacementX * 0.15;
          baseParallaxY = -displacementY * 0.15;
        }
      }
    } else {
      displacementX = ambientOffset.x;
      displacementY = ambientOffset.y;
      ghostOpacity = 0.08;
    }

    return (
      <span
        key={letterId}
        id={letterId}
        onMouseEnter={() => setHoveredLetterId(letterId)}
        onMouseLeave={() => setHoveredLetterId(null)}
        onTouchStart={() => handleTouch(letterId)}
        className="relative inline-block select-none cursor-pointer group/glyph"
      >
        {/* Layer 1: Solid Main Letter in Exact Playfair Display Bold (700) */}
        <span
          className="relative z-10 block transition-transform duration-300 ease-out font-serif font-bold"
          style={{
            transform: `translate3d(${baseParallaxX}px, ${baseParallaxY}px, 0)`,
            color: textColor,
          }}
        >
          {char}
        </span>

        {/* Layer 2: The Interactive Ghost Outline Duplicate (Reference 3) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 z-20 pointer-events-none transition-all duration-300 ease-out font-serif font-bold"
          style={{
            WebkitTextStroke: `1.2px ${strokeColor}`,
            color: 'transparent',
            transform: `translate3d(${displacementX}px, ${displacementY}px, 0)`,
            opacity: ghostOpacity,
            filter:
              isDirectlyHovered || ghostOpacity > 0.5
                ? `drop-shadow(0 0 10px ${strokeColor === '#D94B4B' ? 'rgba(217, 75, 75, 0.45)' : 'rgba(233, 229, 216, 0.35)'})`
                : 'none',
          }}
        >
          {char}
        </span>

        {/* Layer 3: Faint Secondary Echo for Luxury Editorial Depth */}
        <span
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none transition-all duration-500 ease-out font-serif font-bold"
          style={{
            WebkitTextStroke: `0.8px ${strokeColor === '#D94B4B' ? 'rgba(217, 75, 75, 0.35)' : 'rgba(233, 229, 216, 0.25)'}`,
            color: 'transparent',
            transform: `translate3d(${displacementX * 1.55}px, ${displacementY * 1.55}px, 0)`,
            opacity: ghostOpacity > 0.5 ? 0.3 : 0,
          }}
        >
          {char}
        </span>
      </span>
    );
  };

  const word2TextColor = secondWordColor === 'warm' ? '#E9E5D8' : '#D94B4B';
  const word2StrokeColor = secondWordColor === 'warm' ? '#E9E5D8' : '#D94B4B';

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-20 flex flex-col items-start justify-center w-full max-w-6xl mx-auto py-2 sm:py-4 px-4 sm:px-8 select-none"
      aria-label="Fatima Mansoor"
    >
      <h1 className="sr-only">Fatima Mansoor — Blockchain and Backend Developer</h1>

      {/* Main Editorial Composition: Nested Label + Exact Playfair Display Bold Layout */}
      <div className="w-full flex flex-col items-start font-serif font-bold tracking-[-0.025em] leading-[0.82]">
        
        {/* LINE 1 CONTAINER: Nested Sub-Caption + FATIMA */}
        <div className="relative w-full flex flex-col items-start">
          
          {/* Nested Editorial Caption matching reference "Macedonian Conqueror // 356-323 BC" */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-3 sm:gap-6 font-serif text-[11px] sm:text-[13px] md:text-[14px] text-[#E9E5D8]/85 tracking-[0.06em] font-normal mb-1 sm:mb-2 ml-14 sm:ml-24 md:ml-32 select-none"
          >
            <span className="text-[#E9E5D8]">Blockchain &amp; Backend Developer</span>
            <span className="text-[#888888] font-light italic text-xs">//</span>
            <span className="text-[#888888]">Lahore, Pakistan</span>
          </motion.div>

          {/* LINE 1: "Fatima" in Exact Playfair Display Bold Crimson (#D94B4B) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(4.2rem,14.5vw,13.5rem)] whitespace-nowrap flex items-center justify-start gap-x-[0.01em]"
          >
            {word1.split('').map((char, idx) =>
              renderLetter(char, idx, 'word1', '#D94B4B', '#D94B4B')
            )}
          </motion.div>
        </div>

        {/* LINE 2: "Mansoor" (Slightly Indented under the capital 'F', echoing "the Great" in reference) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(3.8rem,13vw,12rem)] whitespace-nowrap flex items-center justify-start gap-x-[0.01em] pl-6 sm:pl-16 md:pl-24 -mt-2 sm:-mt-4"
        >
          {word2.split('').map((char, idx) =>
            renderLetter(char, idx, 'word2', word2TextColor, word2StrokeColor)
          )}
        </motion.div>
      </div>
    </div>
  );
};

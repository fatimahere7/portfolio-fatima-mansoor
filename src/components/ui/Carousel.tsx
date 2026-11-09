import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Terminal, Activity, Layers } from 'lucide-react';

export interface CarouselItem {
  title: string;
  description: string;
  image?: string;
  id?: string | number;
  tag?: string;
  badge?: string;
  stats?: { label: string; value: string }[];
  accentColor?: string;
  content?: React.ReactNode;
}

export interface CarouselProps {
  items: CarouselItem[];
  baseWidth?: number | string;
  aspectRatio?: number;
  effect?: 'tilt' | 'slide' | 'scale' | 'fade' | 'cube';
  indicator?: 'dots' | 'bars' | 'counter' | 'none';
  frame?: boolean;
  arrows?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  theme?: 'dark' | 'light';
  peek?: number;
  gap?: number;
  radius?: number;
  draggable?: boolean;
  round?: boolean;
  initialIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Carousel: React.FC<CarouselProps> = ({
  items = [],
  baseWidth = 300,
  aspectRatio = 1.25,
  effect = 'tilt',
  indicator = 'dots',
  frame = true,
  arrows = false,
  loop = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  theme = 'dark',
  peek = 0,
  gap = 16,
  radius = 12,
  draggable = true,
  round = false,
  initialIndex = 0,
  onChange,
  className = '',
  style = {},
}) => {
  const [activeIndex, setActiveIndex] = useState(
    Math.min(Math.max(0, initialIndex), Math.max(0, items.length - 1))
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [activeTilt, setActiveTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Parse base width
  const parsedBaseWidth =
    typeof baseWidth === 'number'
      ? baseWidth
      : parseInt(String(baseWidth), 10) || 300;

  // Calculate card dimensions
  const cardWidth = parsedBaseWidth;
  const cardHeight = round ? cardWidth : Math.round(cardWidth / aspectRatio);

  const totalItems = items.length;

  const goToSlide = useCallback(
    (index: number) => {
      let nextIndex = index;
      if (loop) {
        nextIndex = (index + totalItems) % totalItems;
      } else {
        nextIndex = Math.max(0, Math.min(index, totalItems - 1));
      }
      setActiveIndex(nextIndex);
      onChange?.(nextIndex);
    },
    [loop, totalItems, onChange]
  );

  const prevSlide = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  const nextSlide = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  // Autoplay handler
  useEffect(() => {
    if (!autoplay || totalItems <= 1) return;
    if (pauseOnHover && isHovered) return;

    autoplayTimerRef.current = setInterval(() => {
      goToSlide(activeIndex + 1);
    }, autoplayDelay);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [autoplay, autoplayDelay, pauseOnHover, isHovered, activeIndex, totalItems, goToSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(totalItems - 1);
    }
  };

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!draggable) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging && draggable) {
      const deltaX = e.clientX - dragStartX;
      setDragOffset(deltaX);
    }

    // Active card 3D tilt tracking
    if (!isDragging && effect === 'tilt') {
      const rect = e.currentTarget.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
      setActiveTilt({
        x: relativeY * -12, // vertical tilt
        y: relativeX * 16,  // horizontal tilt
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = cardWidth * 0.22;
    if (dragOffset < -threshold) {
      nextSlide();
    } else if (dragOffset > threshold) {
      prevSlide();
    }
    setDragOffset(0);
    setActiveTilt({ x: 0, y: 0 });
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if capture already released
    }
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setDragOffset(0);
    setActiveTilt({ x: 0, y: 0 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setActiveTilt({ x: 0, y: 0 });
  };

  // Calculate transformation and style for each slide
  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const dragProgress = dragOffset / cardWidth;
    const effectiveDiff = diff - dragProgress;

    // Base horizontal offset
    const xOffset = effectiveDiff * (cardWidth + gap);

    // Z-Index: center is highest
    const zIndex = 50 - Math.min(Math.abs(Math.round(effectiveDiff)), 20);

    // Transition styles based on effect
    let transform = '';
    let opacity = 1;
    let filter = '';

    if (effect === 'tilt') {
      const rotateY = Math.max(-42, Math.min(42, -effectiveDiff * 26 + (Math.abs(effectiveDiff) < 0.5 ? activeTilt.y : 0)));
      const rotateX = Math.abs(effectiveDiff) < 0.5 ? activeTilt.x : 0;
      const rotateZ = Math.max(-8, Math.min(8, effectiveDiff * -2.5));
      const scale = Math.max(0.78, 1 - Math.abs(effectiveDiff) * 0.12);
      const translateZ = Math.max(-200, -Math.abs(effectiveDiff) * 120);

      transform = `perspective(1000px) translateX(${xOffset}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
      opacity = Math.max(0.2, 1 - Math.abs(effectiveDiff) * 0.35);
      filter = Math.abs(effectiveDiff) > 0.4 ? 'brightness(0.72) contrast(0.95)' : 'brightness(1) contrast(1)';
    } else if (effect === 'slide') {
      transform = `translateX(${xOffset}px)`;
      opacity = Math.max(0.3, 1 - Math.abs(effectiveDiff) * 0.3);
    } else if (effect === 'scale') {
      const scale = Math.max(0.65, 1 - Math.abs(effectiveDiff) * 0.22);
      transform = `translateX(${xOffset}px) scale(${scale})`;
      opacity = Math.max(0.25, 1 - Math.abs(effectiveDiff) * 0.4);
    } else if (effect === 'fade') {
      transform = `translateX(${xOffset * 0.15}px)`;
      opacity = Math.max(0, 1 - Math.abs(effectiveDiff));
    } else if (effect === 'cube') {
      const rotateY = Math.max(-90, Math.min(90, -effectiveDiff * 90));
      const translateZ = -cardWidth / 2;
      transform = `perspective(1000px) translateX(${xOffset}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
      opacity = Math.max(0.1, 1 - Math.abs(effectiveDiff) * 0.5);
    }

    return {
      transform,
      zIndex,
      opacity,
      filter,
    };
  };

  const isDark = theme === 'dark';

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full flex flex-col items-center justify-between select-none outline-none ${
        frame
          ? isDark
            ? 'rounded-2xl border border-[#8AB6F9]/25 bg-[#080C14]/90 shadow-[0_16px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl'
            : 'rounded-2xl border border-gray-200 bg-white/95 shadow-xl'
          : ''
      } ${className}`}
      style={style}
    >
      {/* FRAME HEADER & TECHNICAL DECORATION */}
      {frame && (
        <div className="w-full px-5 py-3.5 flex items-center justify-between border-b border-[#8AB6F9]/15 font-mono text-[10px] tracking-widest uppercase">
          <div className="flex items-center gap-2 text-[#CADCFC]">
            <span className="w-2 h-2 rounded-full bg-[#8AB6F9] shadow-[0_0_10px_#8AB6F9] animate-pulse" />
            <span className="font-semibold text-[#8AB6F9]">CAROUSEL_VIEWPORT</span>
            <span className="text-[#CADCFC]/40">//</span>
            <span className="text-[#CADCFC]/70 hidden sm:inline">
              MODE: {effect.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[#CADCFC]/70">
            <span className="hidden md:inline text-[9px] text-[#CADCFC]/50">
              [DRAG / ARROW KEYS TO NAVIGATE]
            </span>
            <span className="px-2 py-0.5 rounded bg-[#8AB6F9]/10 border border-[#8AB6F9]/30 text-[#8AB6F9] font-bold">
              {String(activeIndex + 1).padStart(2, '0')} / {String(totalItems).padStart(2, '0')}
            </span>
          </div>
        </div>
      )}

      {/* STAGE CONTAINER WITH PERSPECTIVE */}
      <div
        className={`relative w-full flex-1 flex items-center justify-center overflow-hidden py-6 ${
          draggable ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
        style={{ perspective: 1200 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {/* Soft edge masking gradients for cinematic fade if frame enabled */}
        {frame && (
          <>
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#080C14] via-[#080C14]/80 to-transparent z-40" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#080C14] via-[#080C14]/80 to-transparent z-40" />
          </>
        )}

        {/* TRACK OF CARDS */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: cardWidth,
            height: cardHeight,
          }}
        >
          {items.map((item, index) => {
            const cardStyle = getCardStyle(index);
            const isActive = index === activeIndex;

            return (
              <div
                key={item.id ?? index}
                onClick={() => {
                  if (!isDragging && !isActive) {
                    goToSlide(index);
                  }
                }}
                className={`absolute top-0 left-0 transition-transform duration-300 ease-out will-change-transform ${
                  round ? 'rounded-full overflow-hidden' : ''
                }`}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  borderRadius: round ? '9999px' : `${radius}px`,
                  ...cardStyle,
                }}
              >
                {/* CARD SHELL */}
                <div
                  className={`relative w-full h-full overflow-hidden flex flex-col justify-end p-5 sm:p-6 transition-all duration-300 border ${
                    isActive
                      ? 'border-[#8AB6F9]/70 shadow-[0_0_30px_rgba(138,182,249,0.35),0_12px_36px_rgba(0,0,0,0.85)] ring-1 ring-[#8AB6F9]/40'
                      : 'border-[#8AB6F9]/20 shadow-[0_8px_24px_rgba(0,0,0,0.6)]'
                  } ${
                    isDark
                      ? 'bg-gradient-to-b from-[#111726]/95 to-[#070A10]/98 text-white'
                      : 'bg-white text-gray-900'
                  }`}
                  style={{
                    borderRadius: round ? '9999px' : `${radius}px`,
                  }}
                >
                  {/* BACKGROUND IMAGE / ABSTRACT GENERATIVE VISUAL */}
                  {item.image ? (
                    <div className="absolute inset-0 z-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        onError={(e) => {
                          // Graceful fallback to abstract tech visual on error
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      {/* Vignette Overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06080F] via-[#06080F]/65 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#06080F]/40 via-transparent to-transparent" />
                    </div>
                  ) : (
                    /* High-tech circuit background when image is absent */
                    <div className="absolute inset-0 z-0 opacity-40">
                      <div className="absolute inset-0 bg-[radial-gradient(#8AB6F9_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
                      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#8AB6F9]/10 blur-2xl" />
                      <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#CADCFC]/10 blur-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06080F] via-[#06080F]/70 to-transparent" />
                    </div>
                  )}

                  {/* SPECULAR SHINE FOR ACTIVE TILT EFFECT */}
                  {isActive && effect === 'tilt' && (
                    <div
                      className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at ${
                          50 + activeTilt.y * 2
                        }% ${
                          50 - activeTilt.x * 2
                        }%, rgba(202, 220, 252, 0.18) 0%, transparent 65%)`,
                      }}
                    />
                  )}

                  {/* CARD TOP META */}
                  <div className="relative z-10 mb-auto flex items-center justify-between w-full">
                    {item.badge ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-semibold tracking-wider uppercase bg-[#8AB6F9]/15 border border-[#8AB6F9]/40 text-[#CADCFC] shadow-[0_0_12px_rgba(138,182,249,0.3)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8AB6F9] animate-pulse" />
                        {item.badge}
                      </span>
                    ) : item.tag ? (
                      <span className="text-[10px] font-mono tracking-widest text-[#8AB6F9] uppercase font-semibold">
                        // {item.tag}
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono tracking-widest text-[#8AB6F9] uppercase font-semibold">
                        // ITEM {String(index + 1).padStart(2, '0')}
                      </span>
                    )}

                    <span className="font-mono text-[9px] text-[#CADCFC]/60 font-semibold tracking-wider">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* CARD BODY CONTENT */}
                  <div className="relative z-10 space-y-2 mt-4">
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center justify-between group">
                      <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        {item.title}
                      </span>
                      {isActive && (
                        <Sparkles className="w-4 h-4 text-[#8AB6F9] shrink-0 drop-shadow-[0_0_8px_#8AB6F9]" />
                      )}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#CADCFC]/90 line-clamp-3 leading-relaxed font-sans font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                      {item.description}
                    </p>

                    {/* OPTIONAL STATS / METRICS PILLS */}
                    {item.stats && item.stats.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-2">
                        {item.stats.map((st, i) => (
                          <div
                            key={i}
                            className="px-2 py-0.5 rounded bg-black/50 border border-[#8AB6F9]/30 text-[9px] font-mono text-[#CADCFC] flex items-center gap-1.5"
                          >
                            <span className="text-[#8AB6F9] font-bold">{st.label}:</span>
                            <span>{st.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* OPTIONAL NAVIGATION ARROWS */}
        {arrows && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              disabled={!loop && activeIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full bg-[#080C14]/85 border border-[#8AB6F9]/30 text-[#CADCFC] hover:text-white hover:border-[#8AB6F9] hover:bg-[#8AB6F9]/20 transition-all disabled:opacity-20 disabled:pointer-events-none shadow-lg cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              disabled={!loop && activeIndex === totalItems - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full bg-[#080C14]/85 border border-[#8AB6F9]/30 text-[#CADCFC] hover:text-white hover:border-[#8AB6F9] hover:bg-[#8AB6F9]/20 transition-all disabled:opacity-20 disabled:pointer-events-none shadow-lg cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* BOTTOM CONTROLS & INDICATORS */}
      {indicator !== 'none' && totalItems > 0 && (
        <div className="w-full pb-4 pt-2 flex items-center justify-center gap-4 z-40">
          {indicator === 'dots' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#06080F]/70 border border-[#8AB6F9]/20 shadow-md">
              {items.map((_, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? 'w-7 bg-[#8AB6F9] shadow-[0_0_10px_#8AB6F9]'
                        : 'w-2 bg-[#CADCFC]/30 hover:bg-[#CADCFC]/70'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                );
              })}
            </div>
          )}

          {indicator === 'bars' && (
            <div className="flex items-center gap-1.5 w-48 max-w-xs">
              {items.map((_, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`flex-1 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#8AB6F9] shadow-[0_0_8px_#8AB6F9]'
                        : 'bg-[#CADCFC]/20 hover:bg-[#CADCFC]/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                );
              })}
            </div>
          )}

          {indicator === 'counter' && (
            <div className="px-3 py-1 rounded bg-[#06080F]/80 border border-[#8AB6F9]/20 font-mono text-xs text-[#CADCFC]">
              <span className="text-[#8AB6F9] font-bold">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-[#CADCFC]/40 mx-1.5">/</span>
              <span>{String(totalItems).padStart(2, '0')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Carousel;

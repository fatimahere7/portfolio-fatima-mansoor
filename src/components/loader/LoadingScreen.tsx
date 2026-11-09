import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface KineticTextLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

const LETTERS = ['L', 'o', 'a', 'd', 'i', 'n', 'g'];

export const LoadingScreen: React.FC<KineticTextLoaderProps> = ({
  onComplete,
  minDuration = 1800,
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    // Complete after minimum duration without artificial lag
    const timer = setTimeout(() => {
      setIsFinished(true);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onComplete, prefersReduced]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isFinished && (
        <motion.div
          key="kinetic-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#222222] select-none pointer-events-auto"
          aria-live="polite"
          aria-busy="true"
        >
          {/* Main Kinetic Typography Stage */}
          <div className="relative flex items-center justify-center">
            {/* Kinetic Red Jumping Dot */}
            {!prefersReduced && (
              <motion.div
                className="absolute w-2.5 h-2.5 rounded-full bg-[#EF4444] shadow-[0_0_12px_rgba(239,68,68,0.7)] z-10 pointer-events-none"
                animate={{
                  x: [-80, -52, -26, 0, 26, 52, 80, 52, 26, 0, -26, -52, -80],
                  y: [-28, -6, -28, -6, -28, -6, -28, -6, -28, -6, -28, -6, -28],
                  scaleY: [1.2, 0.7, 1.2, 0.7, 1.2, 0.7, 1.2, 0.7, 1.2, 0.7, 1.2, 0.7, 1.2],
                  scaleX: [0.8, 1.3, 0.8, 1.3, 0.8, 1.3, 0.8, 1.3, 0.8, 1.3, 0.8, 1.3, 0.8],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* Kinetic Letter Sequence */}
            <div className="flex items-baseline gap-1 sm:gap-1.5 font-sans font-light text-4xl sm:text-6xl text-white tracking-wide">
              {LETTERS.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  className="inline-block origin-bottom font-sans"
                  animate={
                    prefersReduced
                      ? {}
                      : {
                          y: [0, -8, 0, 2, 0],
                          scaleY: [1, 1.15, 0.9, 1.05, 1],
                          scaleX: [1, 0.92, 1.08, 0.96, 1],
                        }
                  }
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: index * 0.14,
                    ease: 'easeInOut',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

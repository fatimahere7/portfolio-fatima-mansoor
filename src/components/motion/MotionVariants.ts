export const TRANSITION_EASE = [0.16, 1, 0.3, 1] as const;

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: TRANSITION_EASE,
      delay,
    },
  }),
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: TRANSITION_EASE,
      delay,
    },
  }),
};

export const clipPathRevealVariants = {
  hidden: {
    clipPath: 'inset(100% 0% 0% 0%)',
    opacity: 0,
    y: 16,
  },
  visible: (delay: number = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: TRANSITION_EASE,
      delay,
    },
  }),
};

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: TRANSITION_EASE,
      delay,
    },
  }),
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

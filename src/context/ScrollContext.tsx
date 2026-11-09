import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ScrollContextValue } from '../types';

const ScrollContext = createContext<ScrollContextValue>({
  scrollY: 0,
  scrollProgress: 0,
  isScrolling: false,
  scrollTo: () => {},
});

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(currentY / docHeight, 0), 1) : 0;

      setScrollY(currentY);
      setScrollProgress(progress);
      setIsScrolling(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const scrollTo = useCallback((target: number | string, options?: ScrollToOptions) => {
    if (typeof target === 'number') {
      window.scrollTo({
        top: target,
        behavior: options?.behavior || 'smooth',
      });
    } else if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({
          behavior: options?.behavior || 'smooth',
          block: 'start',
        });
      }
    }
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollY, scrollProgress, isScrolling, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useScroll } from '../../context/ScrollContext';
import { useCursorTrigger } from '../cursor/CursorContext';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'HOME', href: '#hero' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'work', label: 'WORK', href: '#work' },
  { id: 'skills', label: 'STACK', href: '#skills' },
  { id: 'experience', label: 'EXPERIENCE', href: '#experience' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const { scrollTo } = useScroll();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);
  const linkHover = useCursorTrigger('link');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      // Special check for bottom of page -> contact
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        setActiveSection('contact');
        return;
      }

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.querySelector(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            return;
          }
        }
      }

      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition(null);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#hero') {
      scrollTo(0, { behavior: 'smooth' });
      return;
    }
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 select-none">
      <nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#171717]/90 border border-[#888888]/25 shadow-2xl shadow-black/60 backdrop-blur-md overflow-hidden transition-all duration-200"
        aria-label="Spotlight Navigation"
      >
        {/* Pointer Spotlight Overlay */}
        {isHovered && mousePosition && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-200"
            style={{
              background: `radial-gradient(130px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(217, 75, 75, 0.15), transparent 80%)`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Navigation Items */}
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              {...linkHover}
              className={`relative px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono tracking-wider uppercase rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-white flex items-center gap-1.5 ${
                isActive ? 'text-[#E9E5D8] font-medium' : 'text-[#888888] hover:text-[#E9E5D8]'
              }`}
            >
              {/* Spring Active Indicator Background */}
              {isActive && (
                <motion.div
                  layoutId="spotlight-active-indicator"
                  className="absolute inset-0 rounded-full bg-white/10 border border-[#D94B4B]/30"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}

              {/* Status Crimson Accent for Contact or Live Indicator */}
              {item.id === 'contact' && (
                <span className="relative flex h-1.5 w-1.5 z-10">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D94B4B] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D94B4B]" />
                </span>
              )}

              <span className="relative z-10">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};

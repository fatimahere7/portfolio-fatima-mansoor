import React from 'react';
import { motion } from 'motion/react';
import { useCursorTrigger } from '../cursor/CursorContext';
import type { FooterNavItem } from '../../data/footer';

interface FooterNavigationProps {
  items: FooterNavItem[];
}

export const FooterNavigation: React.FC<FooterNavigationProps> = ({ items }) => {
  const linkHover = useCursorTrigger('link');

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', target);
    }
  };

  return (
    <nav className="space-y-4" aria-label="Footer Navigation">
      <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.24em] text-[#7B7B7B] uppercase">
        <span className="text-white font-semibold">//</span>
        <span>INDEX CHANNELS</span>
      </div>

      <ul className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-x-8 gap-y-3 font-mono text-xs sm:text-[13px] tracking-wider text-[#7B7B7B]">
        {items.map((item) => (
          <li key={item.target}>
            <a
              href={item.target}
              onClick={(e) => handleScroll(e, item.target)}
              {...linkHover}
              className="group relative inline-flex items-center gap-2 text-[#7B7B7B] hover:text-white transition-colors py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              <span className="font-mono text-[9px] text-[#7B7B7B] tabular-nums font-semibold group-hover:text-white">
                {item.index}
              </span>
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                {item.label}
              </span>
              {/* Expanding micro-line on hover */}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

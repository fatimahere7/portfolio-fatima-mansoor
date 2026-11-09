import React from 'react';
import { useCursorTrigger } from '../cursor/CursorContext';
import type { FooterSocialItem } from '../../data/footer';

interface FooterSocialProps {
  socials: FooterSocialItem[];
}

export const FooterSocial: React.FC<FooterSocialProps> = ({ socials }) => {
  const linkHover = useCursorTrigger('link', 'OPEN →');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.24em] text-[#7B7B7B] uppercase">
        <span className="text-white font-semibold">//</span>
        <span>NETWORK REPOSITORIES</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-x-8 gap-y-3 font-mono text-xs sm:text-[13px] tracking-wider">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            {...linkHover}
            className="group relative inline-flex items-center gap-2 text-[#7B7B7B] hover:text-white transition-colors py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
              {social.label}
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { useCursorTrigger } from '../cursor/CursorContext';
import type { SocialLinkItem } from '../../types/contact';
import { ArrowUpRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';

interface SocialLinksProps {
  socials: SocialLinkItem[];
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ socials }) => {
  const linkHover = useCursorTrigger('link', 'OPEN →');

  const getIcon = (id: string) => {
    switch (id) {
      case 'github':
        return <Github className="w-3.5 h-3.5" />;
      case 'linkedin':
        return <Linkedin className="w-3.5 h-3.5" />;
      case 'x':
        return <Twitter className="w-3.5 h-3.5" />;
      default:
        return <Mail className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-[#858585] uppercase mb-2">
        <span>PROFILES &amp; REPOSITORIES</span>
        <span>INDEX 04</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            {...linkHover}
            className="group flex items-center justify-between p-4 bg-[#FFFFFF] border border-[#858585]/20 hover:border-[#222222] shadow-sm transition-all duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#222222]"
            aria-label={`${social.name} profile`}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-[#858585] tabular-nums font-semibold">
                {social.index}
              </span>
              <span className="text-[#222222] group-hover:text-[#858585] transition-colors">
                {getIcon(social.id)}
              </span>
              <div>
                <span className="font-mono text-xs text-[#222222] font-semibold tracking-wider uppercase block group-hover:text-[#858585] transition-colors">
                  {social.label}
                </span>
                {social.handle && (
                  <span className="font-mono text-[9.5px] text-[#858585] block">
                    {social.handle}
                  </span>
                )}
              </div>
            </div>

            <ArrowUpRight className="w-4 h-4 text-[#858585] group-hover:text-[#222222] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        ))}
      </div>
    </div>
  );
};

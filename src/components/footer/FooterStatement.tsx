import React from 'react';
import { motion } from 'motion/react';
import { FooterVisual } from './FooterVisual';
import type { FooterConfig } from '../../data/footer';

interface FooterStatementProps {
  config: FooterConfig;
}

export const FooterStatement: React.FC<FooterStatementProps> = ({ config }) => {
  const { statement, marker } = config;

  return (
    <div className="pt-16 sm:pt-24 pb-16 sm:pb-20 border-b border-[#7B7B7B]/20">
      {/* Small Section Marker */}
      <div className="flex items-center gap-3 font-mono text-[9.5px] tracking-[0.25em] text-[#7B7B7B] uppercase mb-8">
        <span className="text-white font-semibold">{marker}</span>
        <div className="w-12 h-px bg-[#7B7B7B]/40" />
        <span className="text-[#7B7B7B] hidden sm:inline">END OF TRANSMISSION</span>
      </div>

      {/* Main Grid: Headline on Left, Abstract Geometric Visual on Right */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-16">
        <div className="max-w-3xl">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ clipPath: 'inset(100% 0 0 0)', y: 40, opacity: 0 }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-[-0.03em] leading-[0.92] uppercase"
            >
              {statement.line1}
              <br />
              {statement.line2}
              <br />
              <span className="relative inline-block text-[#7B7B7B] font-serif italic">
                {statement.accent}
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-3 mt-6 font-mono text-[9px] sm:text-[10px] text-[#7B7B7B] tracking-[0.2em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>{statement.annotation}</span>
          </motion.div>
        </div>

        {/* Abstract Orbiting Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="self-center lg:self-auto shrink-0"
        >
          <FooterVisual />
        </motion.div>
      </div>
    </div>
  );
};

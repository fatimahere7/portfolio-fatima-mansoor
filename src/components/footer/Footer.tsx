import React from 'react';
import { motion } from 'motion/react';
import { FooterStatement } from './FooterStatement';
import { FooterNavigation } from './FooterNavigation';
import { FooterSocial } from './FooterSocial';
import { FooterStatus } from './FooterStatus';
import { FooterMeta } from './FooterMeta';
import { FOOTER_DATA } from '../../data/footer';

export const Footer: React.FC = () => {
  return (
    <footer
      className="relative z-10 w-full min-h-[50vh] flex flex-col justify-between pt-16 sm:pt-20 px-4 sm:px-8 lg:px-12 bg-[#222222] border-t border-[#858585]/20 select-none overflow-hidden"
      aria-label="Portfolio Footer and Colophon"
    >

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        {/* LAYER A: Closing Statement & Abstract Orbital Visual */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <FooterStatement config={FOOTER_DATA} />
        </motion.div>

        {/* LAYER B: Navigation + Network Socials + System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="py-12 sm:py-16 border-b border-[rgba(255,255,255,0.06)] grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          {/* Column 1: Footer Navigation (5 Cols) */}
          <div className="md:col-span-5">
            <FooterNavigation items={FOOTER_DATA.navigation} />
          </div>

          {/* Column 2: External Repositories / Socials (4 Cols) */}
          <div className="md:col-span-4">
            <FooterSocial socials={FOOTER_DATA.socials} />
          </div>

          {/* Column 3: Live System Status Indicator (3 Cols) */}
          <div className="md:col-span-3 md:justify-self-end">
            <FooterStatus status={FOOTER_DATA.status} />
          </div>
        </motion.div>

        {/* LAYER C: Bottom Technical Bar & Back To Top */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <FooterMeta metadata={FOOTER_DATA.metadata} />
        </motion.div>
      </div>
    </footer>
  );
};

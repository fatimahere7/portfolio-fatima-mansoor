import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { CONTACT_DATA } from '../../data/contact';

export const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative z-10 w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-8 lg:px-12 bg-[#F5F5F5] text-[#222222] border-t border-[#858585]/20 overflow-hidden select-none"
      aria-label="Contact and Collaboration Inquiries"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-start">
          {/* ============================================================== */}
          {/* LEFT COLUMN: Eyebrow + Headline + Supportive Copy               */}
          {/* ============================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-5"
          >
            {/* Top Eyebrow Tag matching reference */}
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#222222] tracking-wider uppercase">
              <span>Contact Fatima</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D6B36A]" />
            </div>

            {/* Bold Headline matching reference */}
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#222222] tracking-tight leading-[1.15]">
              Your message<br />means a lot to me!
            </h2>

            {/* Subtext Paragraph */}
            <p className="font-sans text-xs sm:text-sm text-[#858585] leading-relaxed max-w-sm">
              I'd love to hear from you! Whether you have questions about blockchain protocols, need backend systems engineering, or want to discuss technical collaboration.
            </p>

            {/* Direct Email Link Badge */}
            <div className="pt-2">
              <a
                href={`mailto:${CONTACT_DATA.email}`}
                className="inline-flex items-center gap-2 font-mono text-xs text-[#222222] hover:text-[#858585] transition-colors font-medium border-b border-[#858585]/30 pb-0.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#858585]" />
                <span>{CONTACT_DATA.email}</span>
                <ArrowUpRight className="w-3 h-3 text-[#D6B36A]" />
              </a>
            </div>
          </motion.div>

          {/* ============================================================== */}
          {/* CENTER COLUMN: Elevated White Card with Contact Form            */}
          {/* ============================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <ContactForm />
          </motion.div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: Stacked Contact Info Blocks matching reference    */}
          {/* ============================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 space-y-8 lg:pt-3"
          >
            {/* Block 1: Chat to sales / Direct Contact */}
            <div className="space-y-1.5">
              <h3 className="font-sans font-bold text-base text-[#222222]">
                Direct Contact
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#858585] leading-relaxed">
                Speak directly regarding engineering contracts, architecture, or core roles.
              </p>
              <a
                href={`mailto:${CONTACT_DATA.email}`}
                className="font-mono text-xs sm:text-sm text-[#222222] hover:text-[#858585] transition-colors font-semibold block pt-0.5 break-all"
              >
                {CONTACT_DATA.email}
              </a>
            </div>

            {/* Block 2: Location & Availability (with Red Accent) */}
            <div className="space-y-1.5">
              <h3 className="font-sans font-bold text-base text-[#222222]">
                Location &amp; Base
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#858585] leading-relaxed">
                {CONTACT_DATA.location}
              </p>
              <p className="font-mono text-xs text-[#858585]">
                {CONTACT_DATA.coordinates} · {CONTACT_DATA.timezone}
              </p>

              {/* Status Indicator with Red Accent #EF4444 */}
              <div className="flex items-center gap-2 pt-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]" />
                </span>
                <span className="font-mono text-[10px] tracking-wider text-[#EF4444] font-semibold uppercase">
                  {CONTACT_DATA.availability}
                </span>
              </div>
            </div>

            {/* Block 3: Profiles & Repositories */}
            <div className="space-y-2">
              <h3 className="font-sans font-bold text-base text-[#222222]">
                Profiles &amp; Repositories
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#858585] leading-relaxed">
                Explore active production code and professional networks.
              </p>
              <div className="flex flex-col gap-2 pt-1 font-mono text-xs">
                <a
                  href="https://github.com/fatimahere7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#222222] hover:text-[#858585] transition-colors font-medium"
                >
                  <Github className="w-3.5 h-3.5 text-[#858585]" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D6B36A]" />
                </a>

                <a
                  href="https://www.linkedin.com/in/fatima-mansoor-129104285/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#222222] hover:text-[#858585] transition-colors font-medium"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#858585]" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D6B36A]" />
                </a>

                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#222222] hover:text-[#858585] transition-colors font-medium"
                >
                  <Twitter className="w-3.5 h-3.5 text-[#858585]" />
                  <span>X / Twitter</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D6B36A]" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

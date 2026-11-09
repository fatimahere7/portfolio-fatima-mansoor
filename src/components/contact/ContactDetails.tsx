import React, { useState } from 'react';
import { useCursorTrigger } from '../cursor/CursorContext';
import type { ContactData } from '../../types/contact';
import { Copy, Check, Clock, Globe } from 'lucide-react';

interface ContactDetailsProps {
  contactData: ContactData;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({ contactData }) => {
  const [copied, setCopied] = useState(false);
  const copyHover = useCursorTrigger('button', 'COPY');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div className="space-y-6">
      {/* Availability Status Header (Red accent preserved) */}
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-[#EF4444] uppercase font-semibold">
          {contactData.availability}
        </span>
      </div>

      {/* Primary Email Block with 1-Click Copy (Clean White Card on #F5F5F5) */}
      <div className="p-6 bg-[#FFFFFF] border border-[#858585]/20 hover:border-[#222222]/40 shadow-sm transition-all duration-200">
        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-[#858585] uppercase mb-3">
          <span>DIRECT CONTACT</span>
          <span>PRIMARY EMAIL</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <button
            type="button"
            onClick={handleCopyEmail}
            {...copyHover}
            className="group/mail text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#222222]"
            aria-label={`Copy email address ${contactData.email}`}
          >
            <div className="font-sans text-2xl sm:text-3xl text-[#222222] font-bold group-hover/mail:text-[#858585] transition-colors leading-tight">
              {contactData.email}
            </div>
            <div className="font-mono text-[10px] text-[#858585] mt-1.5 flex items-center gap-2">
              <span className="underline underline-offset-4 decoration-[#858585]">
                {copied ? 'COPIED TO CLIPBOARD' : 'CLICK TO COPY ADDRESS'}
              </span>
            </div>
          </button>

          {/* Copy confirmation button */}
          <button
            type="button"
            onClick={handleCopyEmail}
            {...copyHover}
            className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-150 border focus:outline-none ${
              copied
                ? 'bg-[#222222] text-white border-[#222222] font-semibold'
                : 'bg-[#F5F5F5] hover:bg-[#222222] hover:text-white border-[#858585]/30 text-[#222222]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#858585]" />
                <span>COPY</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Location & Timezone Telemetry Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
        <div className="p-4 bg-[#FFFFFF] border border-[#858585]/20 shadow-sm flex items-start gap-3">
          <Globe className="w-4 h-4 text-[#858585] shrink-0 mt-0.5" />
          <div>
            <div className="text-[9px] tracking-widest text-[#858585] uppercase mb-0.5">
              LOCATION BASE
            </div>
            <div className="text-[#222222] text-xs font-semibold">
              {contactData.location}
            </div>
            <div className="text-[9.5px] text-[#858585] mt-1">
              {contactData.coordinates}
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#FFFFFF] border border-[#858585]/20 shadow-sm flex items-start gap-3">
          <Clock className="w-4 h-4 text-[#858585] shrink-0 mt-0.5" />
          <div>
            <div className="text-[9px] tracking-widest text-[#858585] uppercase mb-0.5">
              TIMEZONE &amp; RESPONSE
            </div>
            <div className="text-[#222222] text-xs font-semibold">
              {contactData.timezone}
            </div>
            <div className="text-[9.5px] text-[#858585] mt-1">
              TYPICAL RESPONSE: &lt; 24 HOURS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

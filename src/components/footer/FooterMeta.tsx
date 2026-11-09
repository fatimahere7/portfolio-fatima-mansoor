import React from 'react';
import { BackToTop } from './BackToTop';
import type { FooterConfig } from '../../data/footer';

interface FooterMetaProps {
  metadata: FooterConfig['metadata'];
}

export const FooterMeta: React.FC<FooterMetaProps> = ({ metadata }) => {
  return (
    <div className="pt-8 pb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 font-mono text-[10px] text-[#7B7B7B] uppercase tracking-wider">
      {/* Copyright & System Build Specification */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-white font-medium">{metadata.copyright}</span>
        <span className="w-1 h-1 rounded-full bg-[#D6B36A] inline-block" />
        <span>{metadata.specification}</span>
      </div>

      {/* Geolocation, Timezone & Back To Top */}
      <div className="flex flex-wrap items-center justify-between md:justify-end gap-x-6 gap-y-3">
        <span className="hidden lg:inline">{metadata.coordinates}</span>
        <span className="hidden sm:inline text-[#7B7B7B]/40">·</span>
        <span className="text-white">{metadata.timezone}</span>
        <span className="text-[#7B7B7B]/40">·</span>
        <BackToTop />
      </div>
    </div>
  );
};

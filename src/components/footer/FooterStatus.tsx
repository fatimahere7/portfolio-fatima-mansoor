import React from 'react';

interface FooterStatusProps {
  status: {
    label: string;
    state: string;
    code: string;
  };
}

export const FooterStatus: React.FC<FooterStatusProps> = ({ status }) => {
  return (
    <div className="space-y-2 font-mono">
      <div className="flex items-center gap-2 text-[9px] tracking-[0.24em] text-[#7B7B7B] uppercase">
        <span className="text-[#EF4444] font-semibold">//</span>
        <span>{status.label}</span>
      </div>

      <div className="flex items-center gap-2.5 text-xs text-white">
        <span className="text-[#7B7B7B]">[</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]" />
        </span>
        <span className="text-[#EF4444] font-medium tracking-wider">{status.state}</span>
        <span className="text-[#7B7B7B]/60">·</span>
        <span className="text-[#7B7B7B] text-[11px] tabular-nums">{status.code}</span>
        <span className="text-[#7B7B7B]">[</span>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Award, ShieldCheck, MapPin, ExternalLink, Sparkles, Building2 } from 'lucide-react';
import { INSTITUTION } from '../data/eventData';

export const InstitutionalBanner: React.FC = () => {
  const [expImgError, setExpImgError] = useState(false);
  const [founderImgError, setFounderImgError] = useState(false);

  return (
    <div className="relative w-full z-40 bg-[#050505] border-b-2 border-[#262626] text-[#F2F2EA] overflow-hidden">
      {/* Subtle radial amber background glow without harsh white glare */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(253, 181, 21, 0.15), transparent 70%)',
        }}
      />

      {/* Cyber Grid Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto max-w-[1750px] w-full px-3 sm:px-6 lg:px-12 xl:px-16 py-2.5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-6">
          
          {/* Top row on mobile / Left on desktop: 25 Years Celebration & Founder Badges side-by-side or stacked cleanly */}
          <div className="w-full lg:w-auto flex items-center justify-between lg:justify-start gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex items-center justify-center shrink-0">
                {!expImgError ? (
                  <img
                    src="/brand/exp25.webp"
                    alt="25 Years of Excellence"
                    className="h-12 sm:h-16 lg:h-20 w-auto object-contain drop-shadow-[0_0_12px_rgba(253,181,21,0.35)] transition-transform hover:scale-105"
                    onError={() => setExpImgError(true)}
                  />
                ) : (
                  /* Fallback Neo-Brutalist Vector Crest if image fails */
                  <div className="flex flex-col items-center justify-center h-12 w-12 sm:h-16 sm:w-16 border-2 border-[#FDB515] bg-[#0A0806] shadow-[2px_2px_0_#7A0606] p-1 text-center">
                    <Award className="h-4 w-4 text-[#FDB515] animate-pulse" />
                    <span className="font-display text-[10px] font-black text-[#FDB515] leading-tight">25 YRS</span>
                    <span className="text-[6px] font-mono text-[#F2F2EA]/80 uppercase">EXCELLENCE</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col border-l border-[#262626] pl-2 sm:pl-3 py-0.5">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-[#FDB515] font-bold uppercase flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5 text-[#FF4A12]" />
                  Silver Jubilee
                </span>
                <span className="font-heading text-xs sm:text-sm font-black tracking-tight text-[#F2F2EA] uppercase">
                  25 Years
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono text-[#F2F2EA]/60 tracking-wider">
                  Of Excellence
                </span>
              </div>
            </div>

            {/* Mobile-only compact Founder frame on top-right */}
            <div className="flex lg:hidden items-center gap-2 border border-[#262626] bg-[#0A0806] px-2 py-1 shadow-[2px_2px_0_#7A0606]">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#FDB515] bg-[#120E0A] overflow-hidden">
                {!founderImgError ? (
                  <img
                    src="/brand/founder-kandasami-circle.png"
                    alt="Sri A. M. Kandaswami"
                    referrerPolicy="no-referrer"
                    className="h-full w-full rounded-full object-cover"
                    onError={() => setFounderImgError(true)}
                  />
                ) : (
                  <div className="text-center font-display font-black text-[9px] leading-none text-[#FDB515]">
                    AMK
                  </div>
                )}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading text-[10px] font-black tracking-tight text-[#F2F2EA] leading-tight">
                  Sri A. M. KANDASWAMI
                </span>
                <span className="text-[7.5px] font-mono text-[#FDB515] font-semibold uppercase">
                  Founder & Chairman
                </span>
              </div>
            </div>
          </div>

          {/* CENTER: Main Institutional Identity */}
          <div className="flex-1 text-center flex flex-col items-center justify-center w-full px-1">
            
            {/* Trust Name Kicker */}
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 mb-1 border border-[#FDB515]/30 bg-[#0A0806]/80 text-[#FDB515]">
              <Building2 className="h-2.5 w-2.5 text-[#FDB515]" />
              <span className="font-mono text-[8.5px] sm:text-[10px] tracking-widest uppercase font-bold">
                {INSTITUTION.trust}
              </span>
            </div>

            {/* College Name & Autonomous Tag */}
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mb-1">
              <h1 className="font-display text-sm xs:text-base sm:text-2xl md:text-3xl font-black tracking-tight text-[#F2F2EA] uppercase hover:text-[#FDB515] transition-colors text-center leading-tight">
                SASURIE COLLEGE OF ENGINEERING
              </h1>
              <span className="inline-flex items-center px-1.5 py-0.5 border border-[#FF4A12] bg-[#FF4A12]/15 text-[#FF4A12] font-mono text-[8px] sm:text-[10px] font-extrabold tracking-wider uppercase shadow-[2px_2px_0_#7A0606]">
                AUTONOMOUS
              </span>
            </div>

            {/* Accreditations & Approvals */}
            <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-0.5 text-[9px] sm:text-xs text-[#F2F2EA]/80 font-heading">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#FDB515] shrink-0" />
                <span>Approved by <strong className="text-[#F2F2EA]">AICTE</strong> & Affiliated to <strong className="text-[#F2F2EA]">Anna University</strong></span>
              </span>
              <span className="hidden sm:inline text-[#262626]">|</span>
              <span className="flex items-center gap-1">
                <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#FF4A12] shrink-0" />
                <span>Accredited <strong className="text-[#FDB515]">NAAC 'A' Grade</strong> · ISO 9001:2015</span>
              </span>
            </div>

            {/* Location Line */}
            <div className="mt-0.5 flex items-center justify-center gap-1 text-[8.5px] sm:text-[10px] font-mono text-[#F2F2EA]/60">
              <MapPin className="h-2.5 w-2.5 text-[#FDB515]/80 shrink-0" />
              <span>{INSTITUTION.location}</span>
            </div>
          </div>

          {/* RIGHT: Founder & Chairman Commemoration Frame (Desktop only, mobile has it in top row) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 border border-[#262626] bg-[#0A0806] px-2.5 py-1.5 sm:px-3 shadow-[2px_2px_0_#7A0606]">
              {/* Golden circular frame with official photo */}
              <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#FDB515] bg-[#120E0A] shadow-[0_0_12px_rgba(253,181,21,0.35)] overflow-visible group">
                {!founderImgError ? (
                  <img
                    src="/brand/founder-kandasami-circle.png"
                    alt="Sri A. M. Kandaswami - Founder & Chairman"
                    referrerPolicy="no-referrer"
                    className="h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={() => setFounderImgError(true)}
                  />
                ) : (
                  <div className="text-center font-display font-black text-xs leading-none text-[#FDB515]">
                    AMK
                  </div>
                )}
              </div>

              <div className="flex flex-col text-left">
                <span className="font-heading text-xs font-black tracking-tight text-[#F2F2EA] leading-tight">
                  Sri A. M. KANDASWAMI
                </span>
                <span className="text-[9px] font-mono text-[#FDB515] font-semibold uppercase tracking-wider">
                  Founder & Chairman
                </span>
                <a
                  href="https://sasurieengg.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[8px] font-mono text-[#F2F2EA]/60 hover:text-[#FDB515] transition-colors mt-0.5"
                >
                  sasurieengg.com
                  <ExternalLink className="h-2 w-2" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* High-Voltage bottom border line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FDB515]/60 to-transparent" />
    </div>
  );
};

import React from 'react';
import { Zap, Target, Users2, Award, FileCheck, Coffee, Cpu, Flame } from 'lucide-react';
import { BENEFITS, EVENT_DETAILS } from '../data/eventData';

export const AboutAndBenefits: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-24 border-b border-[#222] bg-[#050505]">
      <div className="mx-auto max-w-[1750px] w-full px-3 sm:px-6 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#FF4A12] mb-1">
            <Flame className="h-3.5 w-3.5" />
            <span>THE EMBEDDED ARENA</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            8 HOURS. UNLIMITED IDEAS. <span className="text-[#FDB515]">REAL IMPACT.</span>
          </h2>
          <p className="mt-3 sm:mt-4 font-body text-sm sm:text-lg text-[#F2F2EA]/80 leading-relaxed">
            Organized by the Department of Electronics and Communication Engineering, <strong>EMBEDATHON 2026</strong> brings together ambitious engineering teams to build, code, and deploy physical embedded systems. Tackle real problems in edge robotics, automotive electronics, smart sensors, and connected IoT grids.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
          <div className="border-2 border-[#262626] bg-[#0A0806] p-4 sm:p-6 shadow-brutal hover:border-[#FDB515] transition-all space-y-2.5 sm:space-y-3">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center border-2 border-[#333] bg-[#050505] text-[#FDB515]">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
              Hardware Prototyping
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#F2F2EA]/75 leading-relaxed">
              Work with microcontrollers, sensors, communication shields, and breakout modules. Turn schematics and firmware into live physical machines.
            </p>
          </div>

          <div className="border-2 border-[#262626] bg-[#0A0806] p-4 sm:p-6 shadow-brutal hover:border-[#FDB515] transition-all space-y-2.5 sm:space-y-3">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center border-2 border-[#333] bg-[#050505] text-[#FF4A12]">
              <Target className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
              Real Impact
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#F2F2EA]/75 leading-relaxed">
              Evaluation is focused on practical utility, power efficiency, hardware integration depth, and deployability rather than generic slide presentations.
            </p>
          </div>

          <div className="border-2 border-[#262626] bg-[#0A0806] p-4 sm:p-6 shadow-brutal hover:border-[#FDB515] transition-all space-y-2.5 sm:space-y-3">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center border-2 border-[#333] bg-[#050505] text-[#FDB515]">
              <Users2 className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
              Expert Mentorship
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#F2F2EA]/75 leading-relaxed">
              Hands-on architectural guidance from seasoned embedded system professors and jury members during mid-sprint engineering reviews.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="border-2 sm:border-4 border-[#262626] bg-[#0A0806] p-4 sm:p-10 shadow-brutal sm:shadow-brutal-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#222] pb-4 sm:pb-6 mb-6 sm:mb-8">
            <div>
              <span className="font-mono text-xs uppercase font-bold text-[#FF4A12]">PARTICIPANT PERKS</span>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-white mt-1">
                EVERY REGISTERED TEAM RECEIVES
              </h3>
            </div>
            <div className="font-mono text-xs text-[#888]">
              Fee: <span className="font-display text-base sm:text-lg text-[#FDB515]">₹300 / HEAD</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="border-2 border-[#222] bg-[#050505] p-3.5 sm:p-5 space-y-1.5 sm:space-y-2">
                <div className="font-mono text-[10px] sm:text-xs font-bold text-[#FDB515] uppercase tracking-wider">
                  [{benefit.stat}]
                </div>
                <h4 className="font-display text-lg sm:text-xl font-black uppercase text-white">
                  {benefit.title}
                </h4>
                <p className="font-body text-xs text-[#F2F2EA]/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

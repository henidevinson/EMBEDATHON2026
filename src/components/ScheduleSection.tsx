import React from 'react';
import { Clock, MapPin, Calendar, Flame } from 'lucide-react';
import { SCHEDULE_ITEMS, EVENT_DETAILS } from '../data/eventData';

export const ScheduleSection: React.FC = () => {
  return (
    <section id="schedule" className="py-12 sm:py-24 border-b border-[#222] bg-[#050505]">
      <div className="mx-auto max-w-[1750px] w-full px-3 sm:px-6 lg:px-12 xl:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#222] pb-4 sm:pb-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#FF4A12] mb-1">
              <Flame className="h-3.5 w-3.5" />
              <span>TIME CRITICAL SPRINT</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              8-HOUR <span className="text-[#FDB515]">TIMELINE</span>
            </h2>
            <p className="mt-2 font-body text-sm sm:text-base text-[#F2F2EA]/75 max-w-xl">
              Strictly scheduled to give your team maximum hands-on build time, power testing, and jury interactions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs text-[#888]">
            <span className="text-[#FDB515] font-bold">{EVENT_DETAILS.date}</span>
            <span>·</span>
            <span>{EVENT_DETAILS.venue}</span>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 sm:border-l-4 border-[#222] ml-3 sm:ml-8 pl-4 sm:pl-10 space-y-5 sm:space-y-8">
          {SCHEDULE_ITEMS.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Bullet Node */}
              <div className="absolute -left-[24px] sm:-left-[48px] top-1.5 h-4 w-4 sm:h-5 sm:w-5 border-2 border-[#050505] bg-[#FDB515] group-hover:bg-[#FF4A12] shadow-[1.5px_1.5px_0_#7A0606] sm:shadow-[2px_2px_0_#7A0606] transition-colors" />

              <div className="border-2 border-[#262626] bg-[#0A0806] hover:border-[#FDB515] p-3.5 sm:p-6 shadow-brutal transition-all">
                <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 border-b border-[#1c1c1c] pb-2.5 sm:pb-3 mb-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs sm:text-sm font-black text-[#FDB515]">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>{item.time}</span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold text-[#FF4A12] border border-[#FF4A12]/30 bg-[#FF4A12]/10 px-1.5 sm:px-2 py-0.5">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-2xl font-black uppercase text-white">
                  {item.title}
                </h3>
                <p className="mt-1 font-body text-xs sm:text-sm text-[#F2F2EA]/75 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

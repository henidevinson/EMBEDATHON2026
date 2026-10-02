import React from 'react';
import { Clock, MapPin, Calendar, Flame } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData';

export const ScheduleSection: React.FC = () => {
  return (
    <section id="schedule" className="py-12 sm:py-20 border-b border-[#222] bg-[#050505]">
      <div className="mx-auto max-w-[1750px] w-full px-3 sm:px-6 lg:px-12 xl:px-16">
        
        {/* Header */}
        <div className="border-b-2 border-[#222] pb-4 sm:pb-6 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#FF4A12] mb-1">
            <Clock className="h-3.5 w-3.5" />
            <span>OFFICIAL TIMINGS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            EVENT <span className="text-[#FDB515]">TIMING</span>
          </h2>
          <p className="mt-2 font-body text-sm sm:text-base text-[#F2F2EA]/75 max-w-xl">
            Mark your schedule for EMBEDATHON 2026. All activities will be hosted at Abinantham Hall, Sasurie College of Engineering.
          </p>
        </div>

        {/* Big Brutalist Timing Feature Card */}
        <div className="border-2 sm:border-4 border-[#262626] bg-[#0A0806] p-6 sm:p-10 shadow-brutal hover:border-[#FDB515] transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Main Hero Timing */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 border border-[#FDB515]/40 bg-[#FDB515]/10 px-3 py-1 font-mono text-xs font-bold text-[#FDB515] uppercase tracking-wider">
                <Flame className="h-4 w-4 text-[#FF4A12]" />
                <span>OFFICIAL HACKATHON SCHEDULE</span>
              </div>

              <div>
                <span className="font-mono text-xs sm:text-sm text-[#888] uppercase tracking-widest block mb-1">
                  Event Timing
                </span>
                <div className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight flex flex-wrap items-baseline gap-2">
                  <span className="text-[#FDB515]">9:30 AM</span>
                  <span className="text-[#FF4A12] text-2xl sm:text-4xl">TO</span>
                  <span className="text-[#FDB515]">5:30 PM</span>
                </div>
              </div>

              <p className="font-body text-sm sm:text-base text-[#F2F2EA]/80 leading-relaxed max-w-xl">
                The event runs promptly from <strong className="text-white font-bold">9:30 AM to 5:30 PM</strong> on <strong className="text-[#FDB515] font-bold">{EVENT_DETAILS.date}</strong>. Registered participants will have full access to dedicated workstations, power test benches, high-speed Wi-Fi, and expert faculty mentorship.
              </p>
            </div>

            {/* Right Side Quick Details */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <div className="border-2 border-[#262626] bg-[#050505] p-4 flex items-start gap-3">
                <div className="h-9 w-9 rounded border border-[#FDB515]/40 bg-[#FDB515]/10 flex items-center justify-center text-[#FDB515] shrink-0 mt-0.5">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#888] uppercase font-bold tracking-wider block">
                    Event Date
                  </span>
                  <span className="font-heading text-base font-bold text-white uppercase">
                    {EVENT_DETAILS.date}
                  </span>
                </div>
              </div>

              <div className="border-2 border-[#262626] bg-[#050505] p-4 flex items-start gap-3">
                <div className="h-9 w-9 rounded border border-[#FF4A12]/40 bg-[#FF4A12]/10 flex items-center justify-center text-[#FF4A12] shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#888] uppercase font-bold tracking-wider block">
                    Venue
                  </span>
                  <span className="font-heading text-base font-bold text-white uppercase">
                    {EVENT_DETAILS.venue}
                  </span>
                  <span className="font-mono text-xs text-[#888] block">
                    Sasurie College of Engineering
                  </span>
                </div>
              </div>

              <div className="border-2 border-[#262626] bg-[#050505] p-4 flex items-start gap-3 sm:col-span-2 lg:col-span-1">
                <div className="h-9 w-9 rounded border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#888] uppercase font-bold tracking-wider block">
                    Reporting Time
                  </span>
                  <span className="font-heading text-base font-bold text-emerald-400 uppercase">
                    8:30 AM Recommended
                  </span>
                  <span className="font-mono text-xs text-[#888] block">
                    For attendance verification and bench setup
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

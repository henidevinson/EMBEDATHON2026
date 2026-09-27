import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight, QrCode, AlertTriangle, ShieldCheck, Flame, Zap } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData';

interface HeroProps {
  onRegisterClick: () => void;
  onOpenQR: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onOpenQR }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-10-13T23:59:59').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, targetDate - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 lg:min-h-[calc(100vh-4.5rem)] lg:flex lg:flex-col lg:justify-center border-b border-[#222]">
      <div className="relative mx-auto max-w-[1750px] w-full px-3 sm:px-6 lg:px-12 xl:px-16">
        
        {/* Academic Kicker - Neo-Brutalist Stamp */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-[#FDB515] bg-[#0A0806] text-[#FDB515] font-mono text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0_#7A0606]">
            <Flame className="h-3.5 w-3.5 text-[#FF4A12] animate-pulse" />
            <span>{EVENT_DETAILS.department}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#333] bg-[#111] text-[#F2F2EA]/70 font-mono text-xs uppercase tracking-wider">
            <span>8-Hour Hardware Hackathon</span>
          </div>
        </div>

        {/* Main Brutalist Display Headline */}
        <div className="space-y-3 mb-8">
          <h1 className="font-display text-4xl xs:text-5xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10.5rem] font-black uppercase tracking-tight text-[#F2F2EA] leading-[0.9] break-words">
            EMBEDATHON <span className="text-[#FDB515] drop-shadow-[0_0_25px_rgba(253,181,21,0.35)]">2026</span>
          </h1>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="h-0.5 w-6 sm:w-8 bg-[#FF4A12] shrink-0" />
            <p className="font-heading text-lg sm:text-3xl lg:text-4xl font-black uppercase tracking-wide text-[#FF4A12]">
              "{EVENT_DETAILS.tagline}"
            </p>
          </div>
        </div>

        {/* Subtitle & Concept */}
        <p className="font-body text-sm sm:text-xl text-[#F2F2EA]/85 max-w-4xl leading-relaxed mb-8 sm:mb-10">
          <strong className="text-white font-bold">{EVENT_DETAILS.description}</strong> A premier national-level embedded engineering sprint. Architect, assemble, program, and demonstrate working hardware prototypes across 7 cutting-edge domains.
        </p>

        {/* Key Event Badges Grid - Neo Brutalist Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 mb-8 sm:mb-10">
          <div className="border-2 border-[#262626] bg-[#0A0806] p-2.5 sm:p-3 shadow-brutal-sm hover:border-[#FDB515] transition-all">
            <div className="flex items-center gap-1.5 text-[#FDB515] mb-1">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">Date</span>
            </div>
            <div className="font-heading text-base sm:text-xl font-bold text-white uppercase">{EVENT_DETAILS.date}</div>
          </div>

          <div className="border-2 border-[#262626] bg-[#0A0806] p-2.5 sm:p-3 shadow-brutal-sm hover:border-[#FDB515] transition-all">
            <div className="flex items-center gap-1.5 text-[#FDB515] mb-1">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">Duration</span>
            </div>
            <div className="font-heading text-base sm:text-xl font-bold text-white uppercase">{EVENT_DETAILS.duration} Sprint</div>
          </div>

          <div className="border-2 border-[#262626] bg-[#0A0806] p-2.5 sm:p-3 shadow-brutal-sm hover:border-[#FDB515] transition-all">
            <div className="flex items-center gap-1.5 text-[#FDB515] mb-1">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">Timing</span>
            </div>
            <div className="font-heading text-base sm:text-xl font-bold text-white uppercase">{EVENT_DETAILS.timing}</div>
          </div>

          <div className="border-2 border-[#262626] bg-[#0A0806] p-2.5 sm:p-3 shadow-brutal-sm hover:border-[#FDB515] transition-all">
            <div className="flex items-center gap-1.5 text-[#FDB515] mb-1">
              <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">Venue</span>
            </div>
            <div className="font-heading text-base sm:text-xl font-bold text-white uppercase">{EVENT_DETAILS.venue}</div>
          </div>

          <div className="border-2 border-[#262626] bg-[#0A0806] p-2.5 sm:p-3 shadow-brutal-sm hover:border-[#FDB515] transition-all">
            <div className="flex items-center gap-1.5 text-[#FDB515] mb-1">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">Team Size</span>
            </div>
            <div className="font-heading text-base sm:text-xl font-bold text-white uppercase">1–4 Members</div>
          </div>

          <div className="border-2 border-[#FF4A12] bg-[#0A0806] p-2.5 sm:p-3 shadow-brutal-sm hover:border-[#FDB515] transition-all">
            <div className="flex items-center gap-1.5 text-[#FF4A12] mb-1">
              <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">Fee / Head</span>
            </div>
            <div className="font-heading text-lg sm:text-2xl font-black text-[#FDB515] uppercase">₹300</div>
          </div>
        </div>

        {/* Dual Column: Countdown Block + Main CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Left: Action Buttons & Warning */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onRegisterClick}
                className="group relative flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FDB515] hover:bg-[#ffb703] text-[#050505] font-display text-base sm:text-xl uppercase tracking-wider border-2 border-[#050505] shadow-[4px_4px_0_#7A0606] sm:shadow-[6px_6px_0_#7A0606] hover:shadow-[7px_7px_0_#FF4A12] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer w-full sm:w-auto"
              >
                <span>Register Your Team</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1.5" />
              </button>

              <button
                onClick={onOpenQR}
                className="flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 sm:py-4 bg-[#0A0806] hover:bg-[#161412] text-[#FDB515] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-[#FDB515] shadow-[3px_3px_0_#7A0606] sm:shadow-[4px_4px_0_#7A0606] hover:shadow-[5px_5px_0_#D99A00] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer w-full sm:w-auto"
              >
                <QrCode className="h-4 w-4 text-[#FDB515]" />
                <span>UPI Payment QR</span>
              </button>
            </div>

            {/* Warning Tape box */}
            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 border-l-4 border-l-[#FF4A12] border-y border-r border-[#333] bg-[#0A0806] text-xs font-mono text-[#F2F2EA]/90">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF4A12] shrink-0" />
              <div className="text-[11px] sm:text-xs">
                Registration strictly closes on <strong className="text-[#FDB515]">{EVENT_DETAILS.deadlineDisplay}</strong>. Limited physical lab benches at Abinantham Hall.
              </div>
            </div>
          </div>

          {/* Right: Brutalist Countdown Timer Block */}
          <div className="lg:col-span-6">
            <div className="border-4 border-[#262626] bg-[#0A0806] p-4 sm:p-6 shadow-brutal-lg">
              <div className="flex items-center justify-between border-b-2 border-[#222] pb-3 mb-4">
                <span className="font-heading text-xs sm:text-base font-black uppercase tracking-widest text-[#FDB515] flex items-center gap-1.5 sm:gap-2">
                  <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF4A12]" />
                  Registration Closes In
                </span>
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[#FF4A12] bg-[#7A0606]/20 border border-[#7A0606] px-1.5 sm:px-2 py-0.5">
                  13 OCT 2026
                </span>
              </div>

              {/* Digits Grid */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-4 text-center font-mono">
                <div className="border-2 border-[#333] bg-[#050505] p-2 sm:p-4 shadow-[2px_2px_0_#7A0606] sm:shadow-[3px_3px_0_#7A0606]">
                  <span className="block font-mono text-2xl xs:text-3xl sm:text-5xl font-black text-white tabular-nums leading-none">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="block font-heading text-[10px] sm:text-xs uppercase tracking-widest text-[#888] mt-1">
                    DAYS
                  </span>
                </div>

                <div className="border-2 border-[#333] bg-[#050505] p-2 sm:p-4 shadow-[2px_2px_0_#7A0606] sm:shadow-[3px_3px_0_#7A0606]">
                  <span className="block font-mono text-2xl xs:text-3xl sm:text-5xl font-black text-white tabular-nums leading-none">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="block font-heading text-[10px] sm:text-xs uppercase tracking-widest text-[#888] mt-1">
                    HOURS
                  </span>
                </div>

                <div className="border-2 border-[#333] bg-[#050505] p-2 sm:p-4 shadow-[2px_2px_0_#7A0606] sm:shadow-[3px_3px_0_#7A0606]">
                  <span className="block font-mono text-2xl xs:text-3xl sm:text-5xl font-black text-white tabular-nums leading-none">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="block font-heading text-[10px] sm:text-xs uppercase tracking-widest text-[#888] mt-1">
                    MINS
                  </span>
                </div>

                <div className="border-2 border-[#FF4A12] bg-[#050505] p-2 sm:p-4 shadow-[2px_2px_0_#FF4A12] sm:shadow-[3px_3px_0_#FF4A12]">
                  <span className="block font-mono text-2xl xs:text-3xl sm:text-5xl font-black text-[#FDB515] tabular-nums leading-none">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="block font-heading text-[10px] sm:text-xs uppercase tracking-widest text-[#FF4A12] mt-1">
                    SECS
                  </span>
                </div>
              </div>

              {/* Mini Highlights */}
              <div className="mt-4 pt-3 border-t border-[#222] flex flex-wrap items-center justify-between text-[11px] sm:text-xs font-mono text-[#888] gap-1">
                <span>₹300 / Head</span>
                <span>·</span>
                <span>Certificates for All</span>
                <span>·</span>
                <span>Lunch Provided</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

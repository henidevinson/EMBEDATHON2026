import React from 'react';
import { Zap, AlertTriangle, Flame, Clock, Award, ShieldCheck } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData';

export const TickerTape: React.FC = () => {
  const tickerItems = [
    { text: 'EMBEDATHON 2026', icon: <Flame className="h-3.5 w-3.5 text-[#FF4A12]" /> },
    { text: '8 HOURS UNSTOPPABLE SPRINT', icon: <Clock className="h-3.5 w-3.5 text-[#050505]" /> },
    { text: '15TH OCTOBER 2026', icon: <Zap className="h-3.5 w-3.5 text-[#7A0606]" /> },
    { text: 'VENUE: ABINANTHAM HALL', icon: <AlertTriangle className="h-3.5 w-3.5 text-[#050505]" /> },
    { text: 'REGISTRATION: ₹300 / HEAD', icon: <Award className="h-3.5 w-3.5 text-[#FF4A12]" /> },
    { text: 'DEADLINE: 13/10/2026', icon: <Clock className="h-3.5 w-3.5 text-[#7A0606]" /> },
    { text: 'EXCITING CASH PRIZES & TROPHIES', icon: <Flame className="h-3.5 w-3.5 text-[#050505]" /> },
    { text: 'DEPT OF ELECTRONICS & COMMUNICATION ENGINEERING', icon: <ShieldCheck className="h-3.5 w-3.5 text-[#FF4A12]" /> },
  ];

  return (
    <div className="relative z-10 w-full overflow-hidden border-y-2 border-[#FDB515] bg-[#FDB515] text-[#050505] shadow-brutal select-none">
      <div className="flex py-2.5">
        <div className="animate-marquee flex items-center gap-6 whitespace-nowrap font-heading text-sm sm:text-base font-extrabold uppercase tracking-wider">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="font-display tracking-normal">{item.text}</span>
              <span className="inline-flex items-center justify-center p-0.5 rounded-full bg-[#050505]/10">
                {item.icon}
              </span>
              <span className="text-[#7A0606] font-mono font-bold">★</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

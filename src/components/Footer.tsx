import React from 'react';
import { Lock, QrCode, Flame, ExternalLink } from 'lucide-react';
import { EVENT_DETAILS, COMMITTEE } from '../data/eventData';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenQR: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenQR }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t-2 border-[#222] bg-[#050505] py-10 sm:py-14 text-[#888] font-body text-xs relative z-10">
      <div className="mx-auto max-w-[1750px] w-full px-3 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-10 pb-6 sm:pb-10 border-b border-[#1c1c1c]">
          
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border-2 border-[#FDB515] bg-[#050505] text-[#FDB515] font-display text-lg font-black shadow-[2px_2px_0_#7A0606]">
                E
              </div>
              <span className="font-display text-2xl font-black uppercase text-white tracking-tight">
                {EVENT_DETAILS.name}
              </span>
            </div>

            <p className="font-heading text-sm text-[#F2F2EA] uppercase font-bold tracking-wider">
              Sasurie College of Engineering (Autonomous)
            </p>
            <p className="font-body text-xs text-[#F2F2EA]/75 max-w-md leading-relaxed">
              {EVENT_DETAILS.department}
            </p>
            <p className="font-heading text-sm uppercase text-[#FF4A12] font-black">
              "{EVENT_DETAILS.tagline}"
            </p>
            <div className="font-mono text-xs text-[#FDB515] pt-1">
              15th October 2026 · {EVENT_DETAILS.venue} · {EVENT_DETAILS.timing}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white block">
              [ NAVIGATION ]
            </span>
            <ul className="space-y-2 font-heading text-sm uppercase tracking-wider text-[#ccc]">
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-[#FDB515] transition-colors cursor-pointer"
                >
                  About Hackathon
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('domains')}
                  className="hover:text-[#FDB515] transition-colors cursor-pointer"
                >
                  7 Tech Domains
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('schedule')}
                  className="hover:text-[#FDB515] transition-colors cursor-pointer"
                >
                  Event Timing (9 AM – 5 PM)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('register')}
                  className="hover:text-[#FF4A12] transition-colors cursor-pointer text-[#FDB515] font-bold"
                >
                  Register Team (G-Form)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('committee')}
                  className="hover:text-[#FDB515] transition-colors cursor-pointer"
                >
                  Organizing Committee
                </button>
              </li>
            </ul>
          </div>

          {/* Support Portals */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white block">
              [ ADMIN & CONTACT ]
            </span>
            <div className="space-y-2.5">
              <a
                href={EVENT_DETAILS.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 border border-[#333] hover:border-[#FDB515] bg-[#0A0806] hover:bg-[#111] text-[#F2F2EA] hover:text-[#FDB515] font-mono text-xs font-bold w-full cursor-pointer shadow-[2px_2px_0_#7A0606]"
              >
                <ExternalLink className="h-4 w-4 text-[#FDB515]" />
                <span>Official Google Form ↗</span>
              </a>

              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-2 px-3 py-2 border border-[#333] hover:border-[#FDB515] bg-[#0A0806] hover:bg-[#111] text-[#ccc] hover:text-[#FDB515] font-mono text-xs font-bold w-full cursor-pointer shadow-[2px_2px_0_#222] transition-colors"
              >
                <Lock className="h-4 w-4 text-[#FDB515]" />
                <span>Admin / Organizer Portal</span>
              </button>

              <button
                onClick={onOpenQR}
                className="flex items-center gap-2 px-3 py-2 border border-[#333] hover:border-[#FDB515] bg-[#0A0806] hover:bg-[#111] text-[#FDB515] font-mono text-xs font-bold w-full cursor-pointer shadow-[2px_2px_0_#7A0606]"
              >
                <QrCode className="h-4 w-4" />
                <span>UPI QR Payment Card</span>
              </button>

              <div className="pt-2 font-mono text-xs text-[#888] space-y-1">
                <div>Helpline 1: <span className="text-white">+91 9840831058</span></div>
                <div>Helpline 2: <span className="text-white">+91 97894 37018</span></div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-[#666]">
          <div>
            © 2026 EMBEDATHON · Department of Electronics & Communication Engineering. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#888]">UPI: mrkandasamy1983-6@oksbi</span>
            <span>·</span>
            <span className="text-[#FDB515] font-bold">Fee: ₹300 / Head</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

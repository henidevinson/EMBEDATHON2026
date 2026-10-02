import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Flame, QrCode } from 'lucide-react';
import { EVENT_DETAILS, INSTITUTION } from '../data/eventData';

interface FooterProps {
  onRegisterClick?: () => void;
  onOpenQR?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRegisterClick, onOpenQR }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegister = () => {
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      window.open(EVENT_DETAILS.registrationFormUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="border-t-4 border-[#222] bg-[#050505] text-[#F2F2EA] py-12 sm:py-16">
      <div className="mx-auto max-w-[1750px] w-full px-3 sm:px-6 lg:px-12 xl:px-16 space-y-10 sm:space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center border border-[#FDB515] bg-[#050505] text-[#FDB515] font-display text-sm font-black">
                E26
              </div>
              <span className="font-display text-lg font-black uppercase text-white">
                EMBEDATHON 2026
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-[#F2F2EA]/70 leading-relaxed">
              State-level embedded hardware and firmware hackathon fostering industrial prototyping, AI interfacing, and IoT architecture design.
            </p>
            <div className="font-mono text-xs text-[#FDB515]">
              15th October 2026 · {EVENT_DETAILS.venue} · {EVENT_DETAILS.timing}
            </div>
          </div>

          {/* Col 2: Institution */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FDB515] block">
              [ HOST CAMPUS ]
            </span>
            <div className="font-body text-xs text-[#F2F2EA]/85 space-y-1.5 leading-relaxed">
              <div className="font-bold text-white uppercase">{INSTITUTION.name} ({INSTITUTION.autonomous})</div>
              <div className="text-[#888]">{INSTITUTION.anniversary}</div>
              <div className="text-[#888]">{INSTITUTION.certifications}</div>
              <div className="text-[#888]">{INSTITUTION.location}</div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FDB515] block">
              [ QUICK NAVIGATION ]
            </span>
            <ul className="space-y-2 font-mono text-xs text-[#aaa]">
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
                  Event Timing (9:30 AM – 5:30 PM)
                </button>
              </li>
              <li>
                <button
                  onClick={handleRegister}
                  className="hover:text-[#FF4A12] transition-colors cursor-pointer text-[#FDB515] font-bold flex items-center gap-1.5"
                >
                  <span>Register Team (Official Form)</span>
                  <ExternalLink className="h-3 w-3" />
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

          {/* Col 4: Official Registration & Helplines */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white block">
              [ REGISTRATION & PAYMENT ]
            </span>
            <div className="space-y-2.5">
              <button
                onClick={handleRegister}
                className="flex items-center justify-between px-3.5 py-2.5 border-2 border-[#FDB515] bg-[#FDB515] text-[#050505] font-heading text-xs font-black uppercase tracking-wider w-full cursor-pointer shadow-[3px_3px_0_#7A0606] hover:bg-[#ffb703] transition-colors"
              >
                <span>OPEN REGISTRATION FORM</span>
                <ExternalLink className="h-4 w-4" />
              </button>

              {onOpenQR && (
                <button
                  onClick={onOpenQR}
                  className="flex items-center justify-between px-3.5 py-2 border border-[#FDB515]/60 bg-[#0A0806] hover:bg-[#111] text-[#FDB515] font-mono text-xs font-bold uppercase tracking-wider w-full cursor-pointer shadow-[2px_2px_0_#7A0606] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <QrCode className="h-4 w-4" />
                    <span>Scan Official UPI QR</span>
                  </span>
                  <span className="text-[10px] text-[#aaa]">GPay / PhonePe</span>
                </button>
              )}

              <div className="pt-2 font-mono text-xs text-[#888] space-y-1.5 border-t border-[#222]">
                <div>Helpline 1: <a href="tel:+919840831058" className="text-white hover:text-[#FDB515] font-bold">+91 9840831058</a> (Athish)</div>
                <div>Helpline 2: <a href="tel:+919789437018" className="text-white hover:text-[#FDB515] font-bold">+91 97894 37018</a> (Kishore)</div>
                <div>Department: <span className="text-[#bbb]">ECE, Sasurie College of Engineering</span></div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-[#666] pt-6 border-t border-[#1a1a1a]">
          <div>
            © 2026 EMBEDATHON · Department of Electronics & Communication Engineering. All rights reserved.
          </div>
          <div className="text-right">
            Sasurie College of Engineering (Autonomous), Vijayamangalam, Tirupur
          </div>
        </div>

      </div>
    </footer>
  );
};

import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, QrCode, Flame, Ticket, Maximize2, Minimize2 } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenQR: () => void;
  registrationsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenQR }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.warn('Exit fullscreen failed:', err);
      });
    }
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#262626] bg-[#050505]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 sm:h-18 max-w-[1750px] w-full items-center justify-between px-3 sm:px-6 lg:px-12 xl:px-16">
        
        {/* Brand / Logo - Neo-Brutalist Badge */}
        <a
          href="#"
          className="flex items-center gap-2 sm:gap-3 group cursor-pointer shrink-0"
        >
          <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-none border-2 border-[#FDB515] bg-[#050505] text-[#FDB515] font-display text-sm sm:text-lg font-black shadow-[2px_2px_0_#7A0606] sm:shadow-[3px_3px_0_#7A0606] group-hover:bg-[#FDB515] group-hover:text-[#050505] transition-all">
            E26
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base sm:text-xl md:text-2xl font-black tracking-tight text-[#F2F2EA] group-hover:text-[#FDB515] transition-colors leading-none">
              EMBEDATHON <span className="text-[#FF4A12]">2026</span>
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider sm:tracking-widest text-[#FDB515]/70 mt-0.5">
              ECE · 15 OCT 2026 · SASURIE
            </span>
          </div>
        </a>

        {/* Navigation Links - Condensed Uppercase */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-heading text-sm uppercase tracking-wider font-bold text-[#F2F2EA]/75">
          <button
            onClick={() => scrollTo('about')}
            className="hover:text-[#FDB515] transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('domains')}
            className="hover:text-[#FDB515] transition-colors cursor-pointer"
          >
            Domains
          </button>
          <button
            onClick={() => scrollTo('schedule')}
            className="hover:text-[#FDB515] transition-colors cursor-pointer"
          >
            Schedule
          </button>
          <button
            onClick={() => scrollTo('guidelines')}
            className="hover:text-[#FDB515] transition-colors cursor-pointer"
          >
            Guidelines
          </button>
          <button
            onClick={() => scrollTo('committee')}
            className="hover:text-[#FDB515] transition-colors cursor-pointer"
          >
            Committee
          </button>
          <button
            onClick={() => scrollTo('register')}
            className="hover:text-[#FF4A12] transition-colors cursor-pointer flex items-center gap-1 text-[#FDB515]"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF4A12] animate-pulse" />
            Register
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 shrink-0">
          {/* Full Screen Desktop Toggle */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Full Screen' : 'Toggle Full Screen View'}
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-bold text-[#aaa] hover:text-[#FDB515] bg-[#050505] hover:bg-[#111] border border-[#333] hover:border-[#FDB515] rounded-none shadow-[2px_2px_0_#222] transition-all cursor-pointer"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-3.5 w-3.5 text-[#FDB515]" />
                <span>Exit Full</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3.5 w-3.5 text-[#FDB515]" />
                <span>Full Screen</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenQR}
            title="Scan Payment QR"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-mono font-bold text-[#FDB515] bg-[#050505] hover:bg-[#FDB515]/10 border border-[#FDB515]/40 rounded-none shadow-[2px_2px_0_#7A0606] transition-all cursor-pointer"
          >
            <QrCode className="h-3.5 w-3.5 text-[#FDB515]" />
            <span>UPI QR</span>
          </button>

          <button
            onClick={onOpenAdmin}
            title="Organizer & Admin Portal (Restricted Access)"
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-mono font-bold text-[#aaa] hover:text-[#FDB515] bg-[#050505] hover:bg-[#111] border border-[#333] hover:border-[#FDB515] rounded-none shadow-[2px_2px_0_#222] transition-all cursor-pointer"
          >
            <Lock className="h-3.5 w-3.5 text-[#FDB515]" />
            <span className="hidden sm:inline">Admin Portal</span>
            <span className="sm:hidden">Admin</span>
          </button>

          <button
            onClick={() => scrollTo('register')}
            className="relative px-2.5 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-display uppercase tracking-wider text-[#050505] bg-[#FDB515] hover:bg-[#ffb703] border-2 border-[#050505] shadow-[2px_2px_0_#7A0606] sm:shadow-[4px_4px_0_#7A0606] hover:shadow-[5px_5px_0_#FF4A12] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            <span className="hidden xs:inline">Register Now</span>
            <span className="xs:hidden">Register</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 text-[#F2F2EA] hover:text-[#FDB515] border border-[#333] bg-[#111]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b-2 border-[#FDB515] bg-[#0A0806] px-4 sm:px-5 py-4 sm:py-5 space-y-3 font-heading uppercase text-sm tracking-wider max-h-[82vh] overflow-y-auto">
          <button
            onClick={() => scrollTo('about')}
            className="block w-full text-left py-2 text-[#F2F2EA] hover:text-[#FDB515] border-b border-[#222]"
          >
            About Hackathon
          </button>
          <button
            onClick={() => scrollTo('domains')}
            className="block w-full text-left py-2 text-[#F2F2EA] hover:text-[#FDB515] border-b border-[#222]"
          >
            7 Technology Domains
          </button>
          <button
            onClick={() => scrollTo('schedule')}
            className="block w-full text-left py-2 text-[#F2F2EA] hover:text-[#FDB515] border-b border-[#222]"
          >
            8-Hour Timeline
          </button>
          <button
            onClick={() => scrollTo('guidelines')}
            className="block w-full text-left py-2 text-[#F2F2EA] hover:text-[#FDB515] border-b border-[#222]"
          >
            Guidelines & Rules
          </button>
          <button
            onClick={() => scrollTo('committee')}
            className="block w-full text-left py-2 text-[#F2F2EA] hover:text-[#FDB515] border-b border-[#222]"
          >
            Organizing Committee
          </button>
          <button
            onClick={() => scrollTo('register')}
            className="block w-full text-left py-2 text-[#FDB515] font-bold"
          >
            ★ Event Registration
          </button>
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQR();
              }}
              className="flex-1 py-2 text-xs font-mono font-bold bg-[#050505] border border-[#FDB515] text-[#FDB515]"
            >
              Scan UPI QR
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex-1 py-2 text-xs font-mono font-bold bg-[#050505] border border-[#333] text-[#aaa] hover:text-[#FDB515] hover:border-[#FDB515] flex items-center justify-center gap-1.5"
            >
              <Lock className="h-3.5 w-3.5 text-[#FDB515]" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import React from 'react';
import {
  Cpu,
  Wifi,
  Bot,
  Sparkles,
  Radio,
  Car,
  HeartPulse,
  ArrowUpRight,
  Flame,
} from 'lucide-react';
import { DOMAINS } from '../data/eventData';
import { TechnologyDomain } from '../types';

interface DomainsSectionProps {
  onSelectDomain: (domain: TechnologyDomain) => void;
}

export const DomainsSection: React.FC<DomainsSectionProps> = ({ onSelectDomain }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="h-6 w-6 text-[#FDB515]" />;
      case 'Wifi':
        return <Wifi className="h-6 w-6 text-[#FF4A12]" />;
      case 'Bot':
        return <Bot className="h-6 w-6 text-[#FDB515]" />;
      case 'Sparkles':
        return <Sparkles className="h-6 w-6 text-[#FF4A12]" />;
      case 'Radio':
        return <Radio className="h-6 w-6 text-[#FDB515]" />;
      case 'Car':
        return <Car className="h-6 w-6 text-[#FF4A12]" />;
      case 'HeartPulse':
        return <HeartPulse className="h-6 w-6 text-[#FDB515]" />;
      default:
        return <Cpu className="h-6 w-6 text-[#FDB515]" />;
    }
  };

  return (
    <section id="domains" className="py-12 sm:py-24 border-b border-[#222] bg-[#050505]">
      <div className="mx-auto max-w-[1750px] w-full px-3 sm:px-6 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#222] pb-4 sm:pb-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#FF4A12] mb-1">
              <Flame className="h-3.5 w-3.5" />
              <span>INNOVATION TRACKS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              7 TECHNOLOGY <span className="text-[#FDB515]">DOMAINS</span>
            </h2>
            <p className="mt-2 font-body text-sm sm:text-base text-[#F2F2EA]/75 max-w-2xl">
              Choose your arena and build real physical systems. Bring your own ARM Cortex, STM32, ESP32, Raspberry Pi, sensors, or custom PCB boards.
            </p>
          </div>
          <div className="font-mono text-xs text-[#888]">
            <span>OPEN HARDWARE</span>
            <span className="mx-2 text-[#FDB515]">/</span>
            <span>8 HOURS BUILD</span>
          </div>
        </div>

        {/* Bento Grid: 7 Domains */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {DOMAINS.map((domain, index) => {
            return (
              <div
                key={domain.id}
                className="group relative border-2 border-[#262626] bg-[#0A0806] hover:border-[#FDB515] p-4 sm:p-6 shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Number Index */}
                  <div className="flex items-center justify-between border-b border-[#1c1c1c] pb-3 mb-4">
                    <div className="flex h-11 w-11 items-center justify-center border-2 border-[#333] bg-[#050505] group-hover:border-[#FDB515] transition-colors">
                      {getIcon(domain.iconName)}
                    </div>
                    <span className="font-mono text-2xl font-black text-[#333] group-hover:text-[#FDB515] transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#FDB515] transition-colors">
                    {domain.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 font-body text-sm text-[#F2F2EA]/75 leading-relaxed">
                    {domain.description}
                  </p>

                  {/* Suggested Hardware Chips */}
                  <div className="mt-4 pt-3 border-t border-[#1a1a1a]">
                    <div className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#FF4A12] mb-1.5">
                      Suggested Tools:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {domain.suggestedHardware.map((hw, i) => (
                        <span
                          key={i}
                          className="font-mono text-[10px] text-[#F2F2EA] bg-[#141210] border border-[#2a2724] px-2 py-0.5"
                        >
                          {hw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sample problem spaces */}
                  <div className="mt-3">
                    <div className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#888] mb-1">
                      Problem Spaces:
                    </div>
                    <ul className="space-y-1 font-body text-xs text-[#F2F2EA]/60">
                      {domain.sampleUseCases.map((useCase, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#FDB515]">›</span>
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="mt-6 pt-4 border-t border-[#222]">
                  <button
                    onClick={() => onSelectDomain(domain.title)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 font-heading text-sm font-black uppercase tracking-wider text-[#050505] bg-[#FDB515] hover:bg-[#ffb703] border border-[#050505] shadow-[3px_3px_0_#7A0606] transition-all cursor-pointer"
                  >
                    <span>Register for Domain</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

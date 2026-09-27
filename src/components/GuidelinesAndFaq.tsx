import React, { useState } from 'react';
import { ChevronDown, MapPin, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';
import { GUIDELINES, EVENT_DETAILS } from '../data/eventData';

export const GuidelinesAndFaq: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Can team members belong to different colleges or departments?',
      a: 'Yes. Cross-departmental and inter-college teams are fully permitted as long as all members carry valid student identity cards from an accredited institution.',
    },
    {
      q: 'What hardware components will be provided at Abinantham Hall?',
      a: 'Each team workstation has high-speed Wi-Fi, multi-pin 230V power sockets, common soldering stations, and digital multimeters. Teams must bring their own laptops, microcontrollers (STM32, ESP32, Arduino, Raspberry Pi, etc.), sensors, and actuators.',
    },
    {
      q: 'Can we use pre-written libraries or pre-built firmware?',
      a: 'Standard open-source libraries, sensor drivers, and RTOS kernels are allowed. However, the core firmware logic, sensor synthesis, and hardware breadboarding must be developed during the 8-hour sprint window. Pre-built complete projects are strictly prohibited.',
    },
    {
      q: 'How does the payment confirmation and gate pass work?',
      a: 'Once you transfer ₹300 per head to UPI ID mrkandasamy1983-6@oksbi and submit your 12-digit UTR and screenshot, our committee verifies the bank transaction and your team is issued an approved Gate Pass for entry.',
    },
    {
      q: 'Will lunch and refreshments be provided?',
      a: 'Yes, morning high-tea refreshments, hot buffet lunch, and afternoon tea snacks are provided for all registered participants without additional fee.',
    },
  ];

  return (
    <section id="guidelines" className="py-12 sm:py-24 border-b border-[#222] bg-[#050505]">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#FF4A12] mb-1">
            <Flame className="h-3.5 w-3.5" />
            <span>OPERATIONAL PROTOCOL</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            RULES & <span className="text-[#FDB515]">GUIDELINES</span>
          </h2>
          <p className="mt-2 font-body text-sm sm:text-base text-[#F2F2EA]/75">
            Review event regulations and venue logistics for seamless registration and check-in.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Venue & Rules */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            
            {/* Venue Highlight Card */}
            <div className="border-2 sm:border-4 border-[#262626] bg-[#0A0806] p-4 sm:p-6 shadow-brutal space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center border-2 border-[#333] bg-[#050505] text-[#FDB515]">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase font-bold text-[#FF4A12]">OFFICIAL VENUE</span>
                  <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
                    {EVENT_DETAILS.venue}
                  </h3>
                </div>
              </div>

              <p className="font-body text-xs sm:text-sm text-[#F2F2EA]/75 leading-relaxed">
                Fully air-conditioned auditorium hall featuring high-speed optical Wi-Fi, dual projection demonstration screens, individual team cubicles, and surge-protected multi-socket power strips.
              </p>

              <div className="border-t border-[#1c1c1c] pt-2.5 sm:pt-3 font-mono text-xs text-[#888] grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                <div>Reporting: 8:30 AM – 9:15 AM</div>
                <div>Kickoff: 9:30 AM Sharp</div>
              </div>
            </div>

            {/* Official Guidelines List */}
            <div className="border-2 sm:border-4 border-[#262626] bg-[#0A0806] p-4 sm:p-6 shadow-brutal space-y-3 sm:space-y-4">
              <h3 className="font-display text-lg sm:text-xl font-black uppercase text-white flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#FDB515]" />
                <span>Hackathon Rules</span>
              </h3>

              <ul className="space-y-2.5 sm:space-y-3 font-body text-xs sm:text-sm text-[#F2F2EA]/85">
                {GUIDELINES.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="font-mono text-xs font-bold text-[#FDB515] mt-0.5 shrink-0">[{idx + 1}]</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-6 space-y-2.5 sm:space-y-3">
            <div className="mb-2 sm:mb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF4A12]">FAQ SECTION</span>
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white mt-1">
                Frequently Asked Questions
              </h3>
            </div>

            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border-2 border-[#262626] bg-[#0A0806] overflow-hidden shadow-brutal-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left font-heading text-sm sm:text-base font-bold uppercase tracking-wider text-white hover:text-[#FDB515] transition-colors cursor-pointer gap-2"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#888] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#FDB515]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 font-body text-xs sm:text-sm text-[#F2F2EA]/75 leading-relaxed border-t border-[#1c1c1c] pt-2.5 sm:pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

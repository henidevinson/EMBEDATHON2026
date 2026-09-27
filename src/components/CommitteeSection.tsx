import React from 'react';
import { Phone, MessageSquare, Flame, Shield, Award } from 'lucide-react';
import { COMMITTEE } from '../data/eventData';

export const CommitteeSection: React.FC = () => {
  return (
    <section id="committee" className="py-12 sm:py-24 border-b border-[#222] bg-[#050505]">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#FF4A12] mb-1">
            <Flame className="h-3.5 w-3.5" />
            <span>ORGANIZATIONAL LEADERSHIP</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            ORGANIZING <span className="text-[#FDB515]">COMMITTEE</span>
          </h2>
          <p className="mt-2 font-body text-sm sm:text-base text-[#F2F2EA]/75">
            Steered by the visionary faculty, heads of department, and student coordinators of ECE.
          </p>
        </div>

        {/* Patrons & Convenor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          
          {/* Chief Patron */}
          <div className="border-2 border-[#262626] bg-[#0A0806] p-4 sm:p-6 shadow-brutal space-y-2.5 sm:space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF4A12] block">
              [ CHIEF PATRON ]
            </span>
            <div className="space-y-1">
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
                {COMMITTEE.chiefPatron.name}
              </h3>
              <p className="font-mono text-xs text-[#FDB515]">{COMMITTEE.chiefPatron.designation}</p>
            </div>
            <p className="font-body text-xs text-[#888] pt-2.5 sm:pt-3 border-t border-[#1c1c1c]">
              Leading institution-wide technical innovation, hardware hackathons, and research.
            </p>
          </div>

          {/* Patron */}
          <div className="border-2 border-[#262626] bg-[#0A0806] p-4 sm:p-6 shadow-brutal space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF4A12] block">
                [ PATRON ]
              </span>
              <img
                src={COMMITTEE.patron.photo}
                alt={COMMITTEE.patron.name}
                referrerPolicy="no-referrer"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-[#FDB515] object-cover shadow-[0_0_10px_rgba(253,181,21,0.3)]"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
                {COMMITTEE.patron.name}
              </h3>
              <p className="font-mono text-xs text-[#FDB515]">{COMMITTEE.patron.designation}</p>
            </div>
            <p className="font-body text-xs text-[#888] pt-2.5 sm:pt-3 border-t border-[#1c1c1c]">
              Providing state-of-the-art laboratory infrastructure, computing resources, and institutional visionary patronage.
            </p>
          </div>

          {/* Convenor - Highlighted */}
          <div className="border-2 sm:border-4 border-[#FDB515] bg-[#0A0806] p-4 sm:p-6 shadow-brutal sm:shadow-brutal-lg space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FDB515] block">
                [ CONVENOR ]
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#050505] bg-[#FDB515] font-black px-1.5 sm:px-2 py-0.5">
                UPI BENEFICIARY
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
                {COMMITTEE.convenor.name}
              </h3>
              <p className="font-mono text-xs text-[#FDB515]">{COMMITTEE.convenor.designation}</p>
            </div>
            <div className="pt-2.5 sm:pt-3 border-t border-[#222] font-mono text-xs text-[#888] space-y-1">
              <div className="break-all">UPI: <span className="text-white font-bold">{COMMITTEE.convenor.upiId}</span></div>
              <p className="text-[11px] text-[#666]">Convening event operations and department vision.</p>
            </div>
          </div>

        </div>

        {/* Faculty & Student Coordinators */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Faculty Coordinators */}
          <div className="border-2 sm:border-4 border-[#262626] bg-[#0A0806] p-4 sm:p-8 shadow-brutal space-y-3 sm:space-y-4">
            <div className="border-b-2 border-[#222] pb-2.5 sm:pb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FDB515]">
                ACADEMIC LEADS
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
                Faculty Coordinators
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {COMMITTEE.facultyCoordinators.map((faculty, i) => (
                <div key={i} className="border-2 border-[#222] bg-[#050505] p-3 sm:p-4 space-y-1">
                  <div className="font-display text-base sm:text-lg font-bold text-white uppercase">{faculty.name}</div>
                  <div className="font-mono text-xs text-[#FDB515]">{faculty.designation}</div>
                  <div className="font-mono text-[10px] text-[#666]">Dept of ECE</div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Coordinators */}
          <div className="border-2 sm:border-4 border-[#262626] bg-[#0A0806] p-4 sm:p-8 shadow-brutal space-y-3 sm:space-y-4">
            <div className="border-b-2 border-[#222] pb-2.5 sm:pb-3 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF4A12]">
                  24/7 STUDENT DESK
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
                  Student Coordinators
                </h3>
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800 px-1.5 sm:px-2 py-0.5">
                Direct Helpline
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {COMMITTEE.studentCoordinators.map((student, i) => (
                <div key={i} className="border-2 border-[#222] bg-[#050505] p-3 sm:p-4 space-y-2.5 sm:space-y-3">
                  <div>
                    <div className="font-display text-base sm:text-lg font-bold text-white uppercase">{student.name}</div>
                    <div className="font-mono text-xs text-[#FDB515]">{student.role}</div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#1c1c1c]">
                    <a
                      href={`tel:${student.phoneClean}`}
                      className="flex items-center gap-2 font-mono text-xs text-white hover:text-[#FDB515]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#FDB515]" />
                      <span>{student.phone}</span>
                    </a>

                    <a
                      href={`https://wa.me/91${student.phoneClean}?text=${encodeURIComponent(
                        `Hi ${student.name}, I have an inquiry regarding EMBEDATHON 2026 registration.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0A2E1A] hover:bg-[#104829] text-emerald-400 font-heading text-xs uppercase font-bold border border-emerald-700/60 shadow-[2px_2px_0_#065f46]"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>WhatsApp Coordinator</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

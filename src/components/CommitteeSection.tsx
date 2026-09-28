import React from 'react';
import { Phone, MessageSquare, Flame } from 'lucide-react';
import { COMMITTEE } from '../data/eventData';
import { safeGetItem } from '../utils/storage';

interface CoordinatorAvatarProps {
  id: string;
  defaultPhoto: string;
  name: string;
  borderColor?: string;
}

const CoordinatorAvatar: React.FC<CoordinatorAvatarProps> = ({
  id,
  defaultPhoto,
  name,
  borderColor = '#FDB515',
}) => {
  const photo =
    safeGetItem(`embedathon_photo_${id}`) ||
    (id === 'coconvener' ? safeGetItem('embedathon_coconvener_photo') : null) ||
    defaultPhoto;

  return (
    <div className="flex flex-col items-center my-3 sm:my-4">
      <div
        title={name}
        className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full border-2 p-1 bg-[#120E0A] shadow-[0_0_15px_rgba(253,181,21,0.25)] group-hover:scale-105 transition-all overflow-hidden"
        style={{ borderColor }}
      >
        <img
          src={photo}
          alt={name}
          referrerPolicy="no-referrer"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
    </div>
  );
};

const getPhoto = (id: string, defaultPhoto: string) => {
  return (
    safeGetItem(`embedathon_photo_${id}`) ||
    (id === 'coconvener' ? safeGetItem('embedathon_coconvener_photo') : null) ||
    defaultPhoto
  );
};

export const CommitteeSection: React.FC = () => {
  return (
    <section id="committee" className="py-12 sm:py-24 border-b border-[#222] bg-[#050505]">
      <div className="mx-auto max-w-[1750px] w-full px-3 sm:px-6 lg:px-12 xl:px-16">
        
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

        {/* Core Leadership Grid: Chairman (Chief Patron) -> Secretary (Patron) -> Principal (Convener) -> HOD (Co-convener) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          
          {/* 1. Chairman - Sri A.M.Kandaswami, Chief patron */}
          <div className="border-2 border-[#262626] bg-[#0A0806] p-5 sm:p-6 shadow-brutal flex flex-col justify-between hover:border-[#FDB515] transition-all group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF4A12] block">
                  [ CHIEF PATRON ]
                </span>
                <span className="font-mono text-[9px] text-[#FDB515] bg-[#FDB515]/10 border border-[#FDB515]/30 font-bold px-1.5 py-0.5 uppercase">
                  CHAIRMAN
                </span>
              </div>
              
              {/* Picture UP */}
              <div className="flex justify-center my-3 sm:my-4">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full border-2 border-[#FDB515] p-1 bg-[#120E0A] shadow-[0_0_15px_rgba(253,181,21,0.25)] group-hover:shadow-[0_0_20px_rgba(253,181,21,0.45)] group-hover:scale-105 transition-all">
                  <img
                    src={COMMITTEE.chiefPatron.photo}
                    alt={COMMITTEE.chiefPatron.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Names DOWN the picture */}
              <div className="text-center space-y-1">
                <h3 className="font-display text-lg sm:text-xl font-black uppercase text-white leading-tight">
                  {COMMITTEE.chiefPatron.name}
                </h3>
                <p className="font-mono text-xs text-[#FDB515] font-semibold">Chairman</p>
                <p className="font-mono text-[11px] text-[#888]">Sasurie Institutions</p>
              </div>
            </div>
            
            <p className="font-body text-xs text-[#888] pt-3 mt-4 border-t border-[#1c1c1c] leading-relaxed text-center sm:text-left">
              Founder & Chairman of Sasurie Institutions, offering visionary patronage and world-class laboratory infrastructure.
            </p>
          </div>

          {/* 2. Secretary - Smt. K. Savitha Moganraj, Patron */}
          <div className="border-2 border-[#262626] bg-[#0A0806] p-5 sm:p-6 shadow-brutal flex flex-col justify-between hover:border-[#FDB515] transition-all group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF4A12] block">
                  [ PATRON ]
                </span>
                <span className="font-mono text-[9px] text-[#FDB515] bg-[#FDB515]/10 border border-[#FDB515]/30 font-bold px-1.5 py-0.5 uppercase">
                  SECRETARY
                </span>
              </div>
              
              {/* Picture UP */}
              <div className="flex justify-center my-3 sm:my-4">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full border-2 border-[#FDB515] p-1 bg-[#120E0A] shadow-[0_0_15px_rgba(253,181,21,0.25)] group-hover:shadow-[0_0_20px_rgba(253,181,21,0.45)] group-hover:scale-105 transition-all">
                  <img
                    src={COMMITTEE.patron.photo}
                    alt={COMMITTEE.patron.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Names DOWN the picture */}
              <div className="text-center space-y-1">
                <h3 className="font-display text-lg sm:text-xl font-black uppercase text-white leading-tight">
                  {COMMITTEE.patron.name}
                </h3>
                <p className="font-mono text-xs text-[#FDB515] font-semibold">Secretary</p>
                <p className="font-mono text-[11px] text-[#888]">Sasurie College of Engineering</p>
              </div>
            </div>
            
            <p className="font-body text-xs text-[#888] pt-3 mt-4 border-t border-[#1c1c1c] leading-relaxed text-center sm:text-left">
              Executive leadership fostering research culture, student technical advancement, and autonomous excellence.
            </p>
          </div>

          {/* 3. Principal - Dr.R. Kiruba Shankar, Convener */}
          <div className="border-2 border-[#262626] bg-[#0A0806] p-5 sm:p-6 shadow-brutal flex flex-col justify-between hover:border-[#FDB515] transition-all group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FDB515] block">
                  [ CONVENER ]
                </span>
                <span className="font-mono text-[9px] text-[#FDB515] bg-[#FDB515]/10 border border-[#FDB515]/30 font-bold px-1.5 py-0.5 uppercase">
                  PRINCIPAL
                </span>
              </div>
              
              {/* Picture UP */}
              <div className="flex justify-center my-3 sm:my-4">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full border-2 border-[#FDB515] p-1 bg-[#120E0A] shadow-[0_0_15px_rgba(253,181,21,0.25)] group-hover:shadow-[0_0_20px_rgba(253,181,21,0.45)] group-hover:scale-105 transition-all">
                  <img
                    src={COMMITTEE.convener.photo}
                    alt={COMMITTEE.convener.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Names DOWN the picture */}
              <div className="text-center space-y-1">
                <h3 className="font-display text-lg sm:text-xl font-black uppercase text-white leading-tight">
                  {COMMITTEE.convener.name}
                </h3>
                <p className="font-mono text-xs text-[#FDB515] font-semibold">Principal</p>
                <p className="font-mono text-[11px] text-[#888]">Sasurie College of Engineering</p>
              </div>
            </div>
            
            <p className="font-body text-xs text-[#888] pt-3 mt-4 border-t border-[#1c1c1c] leading-relaxed text-center sm:text-left">
              Academic convener steering autonomous curricula, national engineering conclaves, and industry partnerships.
            </p>
          </div>

          {/* 4. HOD - Mr.R. Kandasamy, Co-convener */}
          <div className="border-2 border-[#262626] bg-[#0A0806] p-5 sm:p-6 shadow-brutal flex flex-col justify-between hover:border-[#FDB515] transition-all group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FDB515] block">
                  [ CO-CONVENER ]
                </span>
                <span className="font-mono text-[9px] text-[#FDB515] bg-[#FDB515]/10 border border-[#FDB515]/30 font-bold px-1.5 py-0.5 uppercase">
                  HOD
                </span>
              </div>
              
              {/* Picture UP */}
              <div className="flex justify-center my-3 sm:my-4">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full border-2 border-[#FDB515] p-1 bg-[#120E0A] shadow-[0_0_15px_rgba(253,181,21,0.25)] group-hover:shadow-[0_0_20px_rgba(253,181,21,0.45)] group-hover:scale-105 transition-all overflow-hidden">
                  <img
                    src={getPhoto('coconvener', COMMITTEE.coConvener.photo)}
                    alt={COMMITTEE.coConvener.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Names DOWN the picture */}
              <div className="text-center space-y-1">
                <h3 className="font-display text-lg sm:text-xl font-black uppercase text-white leading-tight">
                  {COMMITTEE.coConvener.name}
                </h3>
                <p className="font-mono text-xs text-[#FDB515] font-semibold">HOD, Dept of ECE</p>
                <p className="font-mono text-[11px] text-[#888]">Sasurie College of Engineering</p>
              </div>
            </div>
            
            <p className="font-body text-xs text-[#888] pt-3 mt-4 border-t border-[#1c1c1c] leading-relaxed text-center sm:text-left">
              Co-convening EMBEDATHON 2026 operations, hardware jury coordination, and ECE lab facilities.
            </p>
          </div>

        </div>

        {/* 5 & 6: Staffs Coordinator & Students Coordinator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* 5. Staffs Coordinator - Dr.G. Sivarama Subramanium, Prof.T. Manickam */}
          <div className="border-2 sm:border-4 border-[#262626] bg-[#0A0806] p-4 sm:p-6 shadow-brutal space-y-4">
            <div className="border-b-2 border-[#222] pb-2.5 sm:pb-3 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FDB515]">
                  ACADEMIC FACULTY
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
                  Staffs Coordinator
                </h3>
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#FDB515] border border-[#FDB515]/30 bg-[#FDB515]/10 px-2 py-0.5 uppercase">
                Dept of ECE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMMITTEE.staffCoordinators.map((faculty, i) => (
                <div
                  key={i}
                  className="border-2 border-[#262626] bg-[#050505] p-4 sm:p-5 shadow-brutal flex flex-col justify-between hover:border-[#FDB515] transition-all group text-center"
                >
                  <div>
                    {/* Picture UP */}
                    <CoordinatorAvatar
                      id={`staff-${i}`}
                      defaultPhoto={faculty.photo}
                      name={faculty.name}
                      borderColor="#FDB515"
                    />

                    {/* Names DOWN the picture */}
                    <div className="text-center space-y-1">
                      <h4 className="font-display text-base sm:text-lg font-bold uppercase text-white leading-tight">
                        {faculty.name}
                      </h4>
                      <p className="font-mono text-xs text-[#FDB515] font-semibold">{faculty.designation}</p>
                      <p className="font-mono text-[11px] text-[#888]">Sasurie College of Engineering</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Students Coordinator - S. Athish, K. Kishore Kumar */}
          <div className="border-2 sm:border-4 border-[#262626] bg-[#0A0806] p-4 sm:p-6 shadow-brutal space-y-4">
            <div className="border-b-2 border-[#222] pb-2.5 sm:pb-3 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF4A12]">
                  STUDENT DESK & HELPLINE
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
                  Students Coordinator
                </h3>
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800 px-1.5 sm:px-2 py-0.5">
                Direct Contact
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMMITTEE.studentCoordinators.map((student, i) => (
                <div
                  key={i}
                  className="border-2 border-[#262626] bg-[#050505] p-4 sm:p-5 shadow-brutal flex flex-col justify-between hover:border-[#FF4A12] transition-all group text-center"
                >
                  <div>
                    {/* Picture UP */}
                    <CoordinatorAvatar
                      id={`student-${i}`}
                      defaultPhoto={student.photo}
                      name={student.name}
                      borderColor="#FF4A12"
                    />

                    {/* Names DOWN the picture */}
                    <div className="text-center space-y-1">
                      <h4 className="font-display text-base sm:text-lg font-bold uppercase text-white leading-tight">
                        {student.name}
                      </h4>
                      <p className="font-mono text-xs text-[#FF4A12] font-semibold">{student.role}</p>
                      <p className="font-mono text-[11px] text-[#888]">Dept of ECE · Student Desk</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 mt-3 border-t border-[#1c1c1c]">
                    <a
                      href={`tel:${student.phoneClean}`}
                      className="flex items-center justify-center gap-2 font-mono text-xs text-white hover:text-[#FDB515] py-1 transition-colors"
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
                      className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0A2E1A] hover:bg-[#104829] text-emerald-400 font-heading text-xs uppercase font-bold border border-emerald-700/60 shadow-[2px_2px_0_#065f46] transition-all"
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

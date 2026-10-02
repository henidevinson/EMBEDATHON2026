import React from 'react';
import { ExternalLink, Flame, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData';
import { PaymentQRCard } from './PaymentQRCard';

interface RegistrationPortalProps {
  selectedDomainFromCard?: string | null;
  onOpenQRModal?: () => void;
}

export const RegistrationPortal: React.FC<RegistrationPortalProps> = ({
  selectedDomainFromCard,
}) => {
  const handleRedirect = () => {
    window.open(EVENT_DETAILS.registrationFormUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="register" className="py-12 sm:py-24 bg-[#080606] border-b border-[#222]">
      <div className="mx-auto max-w-[1750px] w-full px-3 sm:px-6 lg:px-12 xl:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#222] pb-4 sm:pb-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#FF4A12] mb-1">
              <Flame className="h-3.5 w-3.5" />
              <span>OFFICIAL REGISTRATION & PAYMENT</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              REGISTER & <span className="text-[#FDB515]">PAY VIA UPI</span>
            </h2>
            <p className="mt-2 font-body text-sm sm:text-base text-[#F2F2EA]/75 max-w-xl">
              Pay registration fee via official UPI QR and submit team details directly through the official registration form. Deadline: <strong className="text-[#FDB515] font-black">{EVENT_DETAILS.deadlineDisplay}</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs">
            <span className="text-[#FDB515] font-bold">Fee: ₹300 / Head</span>
            <span className="text-[#666]">·</span>
            <span className="text-[#888]">1 to 4 Members</span>
            <span className="text-[#666]">·</span>
            <span className="text-emerald-400 font-bold">Official GPay UPI</span>
          </div>
        </div>

        {/* 2-Column Grid: Registration Guidelines & Direct Button vs. Official UPI QR Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Big Registration CTA + Instructions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Big Action Box */}
            <div className="border-2 sm:border-4 border-[#FF4A12] bg-[#120703] p-6 sm:p-8 shadow-[0_0_30px_rgba(255,74,18,0.2)]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-xs font-bold uppercase bg-[#FF4A12]/20 border border-[#FF4A12] text-[#FF4A12]">
                  <Flame className="h-3.5 w-3.5" />
                  <span>ONLINE REGISTRATION PORTAL</span>
                </div>
                
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-snug">
                  Complete Your Team Registration on the Official Form
                </h3>
                
                <p className="font-body text-xs sm:text-sm text-[#F2F2EA]/85 leading-relaxed">
                  Click the button below to be automatically redirected to the official form. Enter participant details, select your technology domain, and submit your UPI payment transaction ID / screenshot.
                </p>

                {selectedDomainFromCard && (
                  <div className="inline-block px-3 py-1.5 bg-[#FDB515]/20 border border-[#FDB515] font-mono text-xs text-[#FDB515] font-bold">
                    Target Domain: {selectedDomainFromCard}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={handleRedirect}
                    className="group relative flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FDB515] hover:bg-[#ffb703] text-[#050505] font-display text-base sm:text-xl uppercase tracking-wider border-2 border-[#050505] shadow-[4px_4px_0_#7A0606] hover:shadow-[6px_6px_0_#FF4A12] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer w-full sm:w-auto"
                  >
                    <span>OPEN OFFICIAL REGISTRATION FORM</span>
                    <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* 3 Step Instruction Guide */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="border border-[#262626] bg-[#0A0806] p-4">
                <div className="font-mono text-[11px] font-black text-[#FDB515] uppercase tracking-widest mb-1">
                  01. SCAN & PAY
                </div>
                <p className="font-body text-xs text-[#888] leading-relaxed">
                  Scan the UPI QR code on the right with any UPI app (GPay, PhonePe, Paytm, BHIM) at ₹300 per member.
                </p>
              </div>

              <div className="border border-[#262626] bg-[#0A0806] p-4">
                <div className="font-mono text-[11px] font-black text-[#FDB515] uppercase tracking-widest mb-1">
                  02. SAVE PROOF
                </div>
                <p className="font-body text-xs text-[#888] leading-relaxed">
                  Capture a payment screenshot and copy the 12-digit UPI Transaction / UTR reference number.
                </p>
              </div>

              <div className="border border-[#262626] bg-[#0A0806] p-4">
                <div className="font-mono text-[11px] font-black text-[#FDB515] uppercase tracking-widest mb-1">
                  03. COMPLETE FORM
                </div>
                <p className="font-body text-xs text-[#888] leading-relaxed">
                  Submit participant details, attach payment proof, and receive confirmation for physical reporting!
                </p>
              </div>
            </div>

            {/* Fee Schedule Quick Matrix */}
            <div className="border border-[#262626] bg-[#0A0806] p-4 font-mono text-xs">
              <div className="text-[#FDB515] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#FDB515]" />
                <span>Transparent Fee Calculation (₹300 / Head):</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="bg-[#141210] p-2 border border-[#222]">
                  <div className="text-[#aaa] text-[10px]">1 Member</div>
                  <div className="text-white font-bold text-sm">₹300</div>
                </div>
                <div className="bg-[#141210] p-2 border border-[#222]">
                  <div className="text-[#aaa] text-[10px]">2 Members</div>
                  <div className="text-white font-bold text-sm">₹600</div>
                </div>
                <div className="bg-[#141210] p-2 border border-[#222]">
                  <div className="text-[#aaa] text-[10px]">3 Members</div>
                  <div className="text-white font-bold text-sm">₹900</div>
                </div>
                <div className="bg-[#141210] p-2 border border-[#222]">
                  <div className="text-[#aaa] text-[10px]">4 Members</div>
                  <div className="text-white font-bold text-sm">₹1200</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Authentic Google Pay UPI QR Card */}
          <div className="lg:col-span-5 flex justify-center">
            <PaymentQRCard />
          </div>

        </div>

      </div>
    </section>
  );
};

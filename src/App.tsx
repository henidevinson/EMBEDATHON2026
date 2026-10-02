import React, { useState } from 'react';
import { InstitutionalBanner } from './components/InstitutionalBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TickerTape } from './components/TickerTape';
import { EmbersBackground } from './components/EmbersBackground';
import { AboutAndBenefits } from './components/AboutAndBenefits';
import { DomainsSection } from './components/DomainsSection';
import { ScheduleSection } from './components/ScheduleSection';
import { RegistrationPortal } from './components/RegistrationPortal';
import { CommitteeSection } from './components/CommitteeSection';
import { GuidelinesAndFaq } from './components/GuidelinesAndFaq';
import { Footer } from './components/Footer';
import { PaymentQRCard } from './components/PaymentQRCard';
import { TechnologyDomain } from './types';
import { EVENT_DETAILS } from './data/eventData';

export default function App() {
  const [selectedDomain, setSelectedDomain] = useState<TechnologyDomain | null>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  // Universal handler: Automatically redirects the user to the official registration form
  const handleRegisterRedirect = () => {
    window.open(EVENT_DETAILS.registrationFormUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSelectDomain = (domain: TechnologyDomain) => {
    setSelectedDomain(domain);
    // Automatically redirect to the registration form when user clicks register on a domain
    handleRegisterRedirect();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F2F2EA] flex flex-col font-body selection:bg-[#FDB515] selection:text-[#050505] relative overflow-x-hidden">
      {/* Floating Atmospheric Embers & Circuit Grid */}
      <EmbersBackground />

      {/* Official College Institutional Master Header Banner */}
      <InstitutionalBanner />

      {/* High-Voltage Announcement Ticker Tape */}
      <TickerTape />

      {/* Navigation Header */}
      <Navbar
        onRegisterClick={handleRegisterRedirect}
        onOpenQR={() => setQrModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* Hero Section with Brutalist Typography and Countdown */}
        <Hero
          onRegisterClick={handleRegisterRedirect}
          onOpenQR={() => setQrModalOpen(true)}
        />

        {/* Secondary Ticker Tape between Hero and About */}
        <TickerTape />

        {/* About Hackathon & Key Perks */}
        <AboutAndBenefits />

        {/* 7 Technology Domains */}
        <DomainsSection onSelectDomain={handleSelectDomain} />

        {/* Event Timing (9:30 AM – 5:30 PM) */}
        <ScheduleSection />

        {/* Official Registration & UPI QR Section (Direct Access + Payment Card + Live Form) */}
        <RegistrationPortal
          selectedDomainFromCard={selectedDomain}
          onOpenQRModal={() => setQrModalOpen(true)}
        />

        {/* Leadership & Organizing Committee */}
        <CommitteeSection />

        {/* Rules, Guidelines & Venue FAQ */}
        <GuidelinesAndFaq />
      </main>

      {/* Footer */}
      <Footer
        onRegisterClick={handleRegisterRedirect}
        onOpenQR={() => setQrModalOpen(true)}
      />

      {/* Official Google Pay UPI QR Modal Popup */}
      {qrModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={() => setQrModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <PaymentQRCard
              memberCount={2}
              showModalClose={true}
              onClose={() => setQrModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
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
import { OrganizerSheetModal } from './components/OrganizerSheetModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { PaymentQRCard } from './components/PaymentQRCard';
import { RegistrationRecord, TechnologyDomain } from './types';
import { INITIAL_REGISTRATIONS } from './data/eventData';

export default function App() {
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('embedathon_2026_registrations');
      if (saved) {
        const parsed: RegistrationRecord[] = JSON.parse(saved);
        // Clean out any legacy mock demo records
        return parsed.filter(
          (r) => !['EMB26-1042', 'EMB26-1087', 'EMB26-1123'].includes(r.id)
        );
      }
    } catch (e) {
      console.error('Failed to load registrations from local storage', e);
    }
    return INITIAL_REGISTRATIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('embedathon_2026_registrations', JSON.stringify(registrations));
    } catch (e) {
      console.error('Failed to save registrations to local storage', e);
    }
  }, [registrations]);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('embedathon_admin_auth') === 'true';
  });
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [sheetModalOpen, setSheetModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<TechnologyDomain | null>(null);

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setSheetModalOpen(true);
    } else {
      setAdminLoginModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setAdminLoginModalOpen(false);
    setSheetModalOpen(true);
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('embedathon_admin_auth');
    sessionStorage.removeItem('embedathon_admin_email');
    setIsAdminLoggedIn(false);
    setSheetModalOpen(false);
  };

  const handleRegistrationSuccess = (newRecord: RegistrationRecord) => {
    setRegistrations((prev) => [newRecord, ...prev]);
  };

  const handleUpdateStatus = (
    id: string,
    newStatus: 'Pending Verification' | 'Verified' | 'Flagged'
  ) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleDeleteRecord = (id: string) => {
    setRegistrations((prev) => prev.filter((r) => r.id !== id));
  };

  const handleResetData = () => {
    if (confirm('Clear registrations and start completely fresh?')) {
      setRegistrations([]);
      localStorage.removeItem('embedathon_2026_registrations');
    }
  };

  const handleSelectDomain = (domain: TechnologyDomain) => {
    setSelectedDomain(domain);
    const registerEl = document.getElementById('register');
    if (registerEl) {
      registerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F2F2EA] flex flex-col font-body selection:bg-[#FDB515] selection:text-[#050505] relative overflow-x-hidden">
      {/* Vyugam-style Floating Atmospheric Embers & Circuit Grid */}
      <EmbersBackground />

      {/* Official College Institutional Master Header Banner (Dark Theme - Seamless, No White Background) */}
      <InstitutionalBanner />

      {/* High-Voltage Announcement Ticker Tape */}
      <TickerTape />

      {/* Navigation Header */}
      <Navbar
        onOpenAdmin={handleOpenAdmin}
        onOpenQR={() => setQrModalOpen(true)}
        registrationsCount={registrations.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* Hero Section with Massive Brutalist Typography and Countdown */}
        <Hero
          onRegisterClick={() => {
            const el = document.getElementById('register');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenQR={() => setQrModalOpen(true)}
        />

        {/* Secondary Ticker Tape between Hero and About */}
        <TickerTape />

        {/* About Hackathon & Key Perks */}
        <AboutAndBenefits />

        {/* 7 Technology Domains */}
        <DomainsSection onSelectDomain={handleSelectDomain} />

        {/* 8-Hour Industrial Schedule */}
        <ScheduleSection />

        {/* Official Registration Portal (Interactive G-Form + Live Iframe G-Form + Apps Script) */}
        <RegistrationPortal
          selectedDomainFromCard={selectedDomain}
          onRegistrationSuccess={handleRegistrationSuccess}
          registrationsCount={registrations.length}
        />

        {/* Leadership & Organizing Committee */}
        <CommitteeSection />

        {/* Rules, Guidelines & Venue FAQ */}
        <GuidelinesAndFaq />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={handleOpenAdmin}
        onOpenQR={() => setQrModalOpen(true)}
      />

      {/* Admin Authentication Modal */}
      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => setAdminLoginModalOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* Responses Sheet Modal (Accessible only after Admin Login) */}
      <OrganizerSheetModal
        isOpen={sheetModalOpen}
        onClose={() => setSheetModalOpen(false)}
        registrations={registrations}
        onUpdateStatus={handleUpdateStatus}
        onDeleteRecord={handleDeleteRecord}
        onResetData={handleResetData}
        onLogout={handleAdminLogout}
      />

      {/* Standalone UPI QR Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md">
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

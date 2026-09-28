import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  AlertCircle,
  Upload,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  QrCode,
  Flame,
  Printer,
  Smartphone,
  Eye,
} from 'lucide-react';
import { DOMAINS, EVENT_DETAILS } from '../data/eventData';
import { RegistrationRecord, TeamSize, TechnologyDomain } from '../types';
import { PaymentQRCard } from './PaymentQRCard';
import { sendRegistrationToGoogleSheet } from '../utils/googleSheetsSync';
import { compressImage, safeGetItem } from '../utils/storage';

interface RegistrationPortalProps {
  selectedDomainFromCard?: TechnologyDomain | null;
  onRegistrationSuccess: (record: RegistrationRecord) => void;
  onOpenSheet?: () => void;
  registrationsCount?: number;
}

export const RegistrationPortal: React.FC<RegistrationPortalProps> = ({
  selectedDomainFromCard,
  onRegistrationSuccess,
  onOpenSheet,
  registrationsCount = 0,
}) => {
  // Form State - Team & Leader (Member 1)
  const [email, setEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [teamSize, setTeamSize] = useState<TeamSize>('2 Members');
  const [leaderName, setLeaderName] = useState('');
  const [leaderMobile, setLeaderMobile] = useState('');
  const [member1Department, setMember1Department] = useState('ECE');
  const [member1Year, setMember1Year] = useState('3rd Year');

  // Member 2
  const [member2Name, setMember2Name] = useState('');
  const [member2Email, setMember2Email] = useState('');
  const [member2Phone, setMember2Phone] = useState('');
  const [member2College, setMember2College] = useState('');
  const [member2Department, setMember2Department] = useState('ECE');
  const [member2Year, setMember2Year] = useState('3rd Year');

  // Member 3
  const [member3Name, setMember3Name] = useState('');
  const [member3Email, setMember3Email] = useState('');
  const [member3Phone, setMember3Phone] = useState('');
  const [member3College, setMember3College] = useState('');
  const [member3Department, setMember3Department] = useState('ECE');
  const [member3Year, setMember3Year] = useState('3rd Year');

  // Member 4
  const [member4Name, setMember4Name] = useState('');
  const [member4Email, setMember4Email] = useState('');
  const [member4Phone, setMember4Phone] = useState('');
  const [member4College, setMember4College] = useState('');
  const [member4Department, setMember4Department] = useState('ECE');
  const [member4Year, setMember4Year] = useState('3rd Year');

  // Domain
  const [domain, setDomain] = useState<TechnologyDomain>(
    selectedDomainFromCard || 'Embedded Systems and Microcontrollers'
  );

  // Payment
  const [transactionId, setTransactionId] = useState('');
  const [screenshotDataUrl, setScreenshotDataUrl] = useState<string>('');
  const [screenshotName, setScreenshotName] = useState<string>('');
  
  // Declaration
  const [declared, setDeclared] = useState(false);

  // Status & Validation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRecord, setSubmittedRecord] = useState<RegistrationRecord | null>(null);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  // Sync when domain is selected externally
  useEffect(() => {
    if (selectedDomainFromCard) {
      setDomain(selectedDomainFromCard);
    }
  }, [selectedDomainFromCard]);

  // Derived participant count & amount
  const participantCount =
    teamSize === '1 Member'
      ? 1
      : teamSize === '2 Members'
      ? 2
      : teamSize === '3 Members'
      ? 3
      : 4;
  const totalAmount = participantCount * EVENT_DETAILS.feePerHead;

  // Handle Screenshot Upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, screenshot: 'File size must be under 15MB' }));
        return;
      }
      setScreenshotName(file.name);
      try {
        const compressed = await compressImage(file, 800, 800, 0.78);
        setScreenshotDataUrl(compressed);
        setErrors((prev) => {
          const rest = { ...prev };
          delete rest.screenshot;
          return rest;
        });
      } catch (err) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setScreenshotDataUrl(event.target?.result as string);
          setErrors((prev) => {
            const rest = { ...prev };
            delete rest.screenshot;
            return rest;
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeScreenshot = () => {
    setScreenshotDataUrl('');
    setScreenshotName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid leader email address';
    }
    if (!teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }
    if (!collegeName.trim()) {
      newErrors.collegeName = 'College name is required';
    }
    if (!leaderName.trim()) {
      newErrors.leaderName = 'Team leader name is required';
    }
    if (!leaderMobile.trim() || leaderMobile.length < 8) {
      newErrors.leaderMobile = 'Valid leader contact number is required';
    }

    // Member 2 (required for 2+ members)
    if (participantCount >= 2) {
      if (!member2Name.trim()) {
        newErrors.member2Name = 'Member 2 full name is required';
      }
      if (!member2Email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member2Email)) {
        newErrors.member2Email = 'Valid Member 2 email address is required';
      }
      if (!member2Phone.trim() || member2Phone.length < 8) {
        newErrors.member2Phone = 'Valid Member 2 phone number is required';
      }
    }

    // Member 3 (if applicable)
    if (participantCount >= 3) {
      if (!member3Name.trim()) {
        newErrors.member3Name = 'Member 3 full name is required';
      }
      if (!member3Email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member3Email)) {
        newErrors.member3Email = 'Valid Member 3 email address is required';
      }
      if (!member3Phone.trim() || member3Phone.length < 8) {
        newErrors.member3Phone = 'Valid Member 3 phone number is required';
      }
    }

    // Member 4 (if applicable)
    if (participantCount === 4) {
      if (!member4Name.trim()) {
        newErrors.member4Name = 'Member 4 full name is required';
      }
      if (!member4Email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member4Email)) {
        newErrors.member4Email = 'Valid Member 4 email address is required';
      }
      if (!member4Phone.trim() || member4Phone.length < 8) {
        newErrors.member4Phone = 'Valid Member 4 phone number is required';
      }
    }

    if (!transactionId.trim() || transactionId.length < 6) {
      newErrors.transactionId = 'Valid 12-digit UTR or Transaction ID is required';
    }
    if (!screenshotDataUrl) {
      newErrors.screenshot = 'Please upload your payment confirmation screenshot';
    }
    if (!declared) {
      newErrors.declared = 'You must confirm the participation statement';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(firstErrorKey);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(async () => {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const newId = `EMB26-${randomSuffix}`;

      const newRecord: RegistrationRecord = {
        id: newId,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        email,
        teamName,
        collegeName,
        teamSize,
        leaderName,
        leaderMobile,
        member1: {
          fullName: leaderName,
          email,
          phoneNumber: leaderMobile,
          college: collegeName,
          department: member1Department,
          yearOfStudy: member1Year,
        },
        member2: participantCount >= 2 ? {
          fullName: member2Name,
          email: member2Email,
          phoneNumber: member2Phone,
          college: member2College || collegeName,
          department: member2Department,
          yearOfStudy: member2Year,
        } : undefined,
        member3: participantCount >= 3 ? {
          fullName: member3Name,
          email: member3Email,
          phoneNumber: member3Phone,
          college: member3College || collegeName,
          department: member3Department,
          yearOfStudy: member3Year,
        } : undefined,
        member4: participantCount === 4 ? {
          fullName: member4Name,
          email: member4Email,
          phoneNumber: member4Phone,
          college: member4College || collegeName,
          department: member4Department,
          yearOfStudy: member4Year,
        } : undefined,
        member2Name: participantCount >= 2 ? member2Name : undefined,
        member2Contact: participantCount >= 2 ? `${member2Email} / ${member2Phone}` : undefined,
        member3Name: participantCount >= 3 ? member3Name : undefined,
        member3Contact: participantCount >= 3 ? `${member3Email} / ${member3Phone}` : undefined,
        member4Name: participantCount === 4 ? member4Name : undefined,
        member4Contact: participantCount === 4 ? `${member4Email} / ${member4Phone}` : undefined,
        domain,
        participantCount,
        totalAmount,
        transactionId,
        screenshotUrl: screenshotDataUrl,
        screenshotName: screenshotName || 'payment_screenshot.jpg',
        status: 'Pending Verification',
        declared: true,
      };

      // Automatic Google Sheet sync to organizer's Google Sheet
      try {
        const webhookUrl = safeGetItem('embedathon_sheet_webhook') || undefined;
        const res = await sendRegistrationToGoogleSheet(newRecord, webhookUrl);
        if (res.success) {
          setSyncNotice('Row automatically appended to your linked Google Sheet!');
        }
      } catch (err) {
        console.warn('Webhook sync error:', err);
      }

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FDB515', '#FF4A12', '#7A0606', '#F2F2EA'],
      });

      setIsSubmitting(false);
      setSubmittedRecord(newRecord);
      onRegistrationSuccess(newRecord);
    }, 800);
  };

  const resetForm = () => {
    setSubmittedRecord(null);
    setSyncNotice(null);
    setEmail('');
    setTeamName('');
    setCollegeName('');
    setLeaderName('');
    setLeaderMobile('');
    setMember1Department('ECE');
    setMember1Year('3rd Year');
    setMember2Name('');
    setMember2Email('');
    setMember2Phone('');
    setMember2College('');
    setMember2Department('ECE');
    setMember2Year('3rd Year');
    setMember3Name('');
    setMember3Email('');
    setMember3Phone('');
    setMember3College('');
    setMember3Department('ECE');
    setMember3Year('3rd Year');
    setMember4Name('');
    setMember4Email('');
    setMember4Phone('');
    setMember4College('');
    setMember4Department('ECE');
    setMember4Year('3rd Year');
    setTransactionId('');
    setScreenshotDataUrl('');
    setScreenshotName('');
    setDeclared(false);
    setErrors({});
  };

  return (
    <section id="register" className="py-12 sm:py-24 bg-[#080606] border-b border-[#222]">
      <div className="mx-auto max-w-6xl w-full px-3 sm:px-6 lg:px-12 xl:px-16">
        
        {/* Section Header with Neo-Brutalist Heading */}
        <div className="text-center space-y-2.5 sm:space-y-3 mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#FDB515] border border-[#FDB515]/30 bg-[#0A0806] px-2.5 py-1 shadow-[2px_2px_0_#7A0606]">
            <Flame className="h-3.5 w-3.5 text-[#FF4A12]" />
            <span>OFFICIAL REGISTRATION GATEWAY</span>
          </div>

          <h2 className="font-display text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white break-words leading-tight">
            EMBEDATHON 2026 <span className="text-[#FDB515]">REGISTRATION</span>
          </h2>

          <p className="font-body text-xs sm:text-base text-[#F2F2EA]/80 max-w-xl mx-auto">
            Fee: <strong className="text-[#FDB515] font-black">₹300 / Head</strong> (Solo or Teams of 2, 3, or 4 members). Secure your bench at Abinantham Hall.
          </p>

          <div className="pt-1.5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <a
              href={EVENT_DETAILS.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#12100e] hover:bg-[#1a1714] text-[#FDB515] border border-[#FDB515]/50 shadow-[2px_2px_0_#7A0606] sm:shadow-[3px_3px_0_#7A0606] font-mono text-xs font-bold uppercase transition-all cursor-pointer text-center"
            >
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              <span>Or Register via Official Google Form ↗</span>
            </a>
          </div>
        </div>

        {submittedRecord ? (
              /* VYUGAM PASS STYLE CONFIRMATION CARD */
              <div className="border-4 border-[#FDB515] bg-[#0A0806] p-4 sm:p-10 shadow-brutal-xl text-center space-y-5 sm:space-y-6 animate-fadeIn">
                <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center border-2 border-[#FDB515] bg-[#FDB515] text-[#050505]">
                  <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#FF4A12] font-bold">
                    [ REGISTRATION SUBMITTED ]
                  </span>
                  <h3 className="font-display text-2xl xs:text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                    THANK YOU FOR REGISTERING!
                  </h3>
                  <p className="font-body text-xs sm:text-base text-[#F2F2EA]/85 max-w-lg mx-auto">
                    Your registration for <strong>EMBEDATHON 2026</strong> has been received successfully. The organizing committee will audit your transaction and approve your team pass.
                  </p>
                  {syncNotice && (
                    <div className="p-2.5 bg-emerald-950/70 border border-emerald-500/80 font-mono text-xs text-emerald-300 max-w-md mx-auto flex items-center justify-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{syncNotice}</span>
                    </div>
                  )}
                </div>

                {/* Vyugam-style Ticket Pass Preview */}
                <div className="relative border-4 border-[#222] bg-[#050505] p-3.5 sm:p-6 text-left w-full max-w-md mx-auto space-y-3 font-mono shadow-[4px_4px_0_#7A0606] sm:shadow-[6px_6px_0_#7A0606]">
                  {/* Top Bar with Stamp */}
                  <div className="flex items-center justify-between border-b-2 border-[#222] pb-3 gap-2">
                    <div>
                      <div className="font-display text-base sm:text-lg font-black text-white">EMBEDATHON 2026</div>
                      <div className="text-[9px] sm:text-[10px] text-[#888]">15 OCT 2026 · ABINANTHAM HALL</div>
                    </div>
                    <span className="font-mono text-[10px] sm:text-xs font-bold text-[#FDB515] bg-[#FDB515]/10 border border-[#FDB515] px-1.5 sm:px-2 py-0.5 shrink-0">
                      {submittedRecord.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between border-b border-[#1a1a1a] pb-1">
                      <span className="text-[#888]">TEAM ID:</span>
                      <span className="font-black text-[#FDB515]">{submittedRecord.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1a1a1a] pb-1">
                      <span className="text-[#888]">TEAM NAME:</span>
                      <span className="font-bold text-white uppercase truncate max-w-[160px] sm:max-w-[220px] text-right">{submittedRecord.teamName}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1a1a1a] pb-1">
                      <span className="text-[#888]">COLLEGE:</span>
                      <span className="text-[#ccc] truncate max-w-[140px] sm:max-w-[200px] text-right">{submittedRecord.collegeName}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1a1a1a] pb-1">
                      <span className="text-[#888]">LEADER:</span>
                      <span className="text-white font-bold truncate max-w-[150px] sm:max-w-[200px] text-right">{submittedRecord.leaderName}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1a1a1a] pb-1">
                      <span className="text-[#888]">DOMAIN:</span>
                      <span className="text-[#FDB515] truncate max-w-[140px] sm:max-w-[200px] text-right">{submittedRecord.domain}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1a1a1a] pb-1">
                      <span className="text-[#888]">SIZE & AMOUNT:</span>
                      <span className="text-emerald-400 font-bold">{submittedRecord.teamSize} (₹{submittedRecord.totalAmount})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#888]">UTR REF:</span>
                      <span className="text-white select-all font-bold">{submittedRecord.transactionId}</span>
                    </div>
                  </div>

                  {/* Stylized Barcode */}
                  <div className="pt-3 border-t-2 border-dashed border-[#333] text-center">
                    <div className="h-8 w-full bg-[repeating-linear-gradient(90deg,#fff,#fff_2px,#000_2px,#000_6px)] opacity-70 mb-1" />
                    <div className="text-[10px] text-[#666] tracking-[0.25em]">*{submittedRecord.id}*</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
                  <button
                    onClick={() => {
                      const iframe = document.createElement('iframe');
                      iframe.style.position = 'fixed';
                      iframe.style.right = '0';
                      iframe.style.bottom = '0';
                      iframe.style.width = '0';
                      iframe.style.height = '0';
                      iframe.style.border = '0';
                      document.body.appendChild(iframe);
                      const doc = iframe.contentWindow?.document;
                      if (doc) {
                        doc.open();
                        doc.write(`
                          <html>
                            <head>
                              <title>EMBEDATHON 2026 - Gate Pass (${submittedRecord.id})</title>
                              <style>
                                body { font-family: monospace; padding: 40px; background: #fff; color: #000; }
                                .pass { border: 4px solid #000; padding: 30px; max-width: 600px; margin: auto; box-shadow: 8px 8px 0px #000; }
                                .head { border-bottom: 3px solid #000; padding-bottom: 15px; margin-bottom: 20px; }
                                .title { font-size: 28px; font-weight: 900; margin: 0; text-transform: uppercase; }
                                .sub { font-size: 13px; color: #333; margin-top: 5px; }
                                .row { display: flex; justify-content: space-between; margin: 10px 0; font-size: 14px; border-bottom: 1px dotted #ccc; padding-bottom: 4px; }
                                .label { color: #555; }
                                .val { font-weight: bold; }
                                .barcode { margin-top: 25px; height: 35px; background: repeating-linear-gradient(90deg,#000,#000 2px,#fff 2px,#fff 5px); }
                                .foot { margin-top: 15px; font-size: 11px; text-align: center; color: #444; }
                              </style>
                            </head>
                            <body>
                              <div class="pass">
                                <div class="head">
                                  <div style="font-size: 12px; font-weight: bold; color: #c1121f;">DEPARTMENT OF ELECTRONICS & COMMUNICATION ENGINEERING</div>
                                  <h1 class="title">EMBEDATHON 2026 — OFFICIAL PASS</h1>
                                  <div class="sub">15th October 2026 · Event Timing: 9:00 AM – 5:00 PM · Abinantham Hall</div>
                                </div>
                                <div class="row"><span class="label">PASS ID:</span><span class="val">${submittedRecord.id}</span></div>
                                <div class="row"><span class="label">TEAM NAME:</span><span class="val">${submittedRecord.teamName}</span></div>
                                <div class="row"><span class="label">COLLEGE:</span><span class="val">${submittedRecord.collegeName}</span></div>
                                <div class="row"><span class="label">LEADER:</span><span class="val">${submittedRecord.leaderName} (${submittedRecord.leaderMobile})</span></div>
                                <div class="row"><span class="label">DOMAIN:</span><span class="val">${submittedRecord.domain}</span></div>
                                <div class="row"><span class="label">TEAM SIZE:</span><span class="val">${submittedRecord.teamSize}</span></div>
                                <div class="row"><span class="label">AMOUNT PAID:</span><span class="val">₹${submittedRecord.totalAmount} (UTR: ${submittedRecord.transactionId})</span></div>
                                ${submittedRecord.member2Name ? `<div class="row"><span class="label">MEMBER 2:</span><span class="val">${submittedRecord.member2Name}</span></div>` : ''}
                                ${submittedRecord.member3Name ? `<div class="row"><span class="label">MEMBER 3:</span><span class="val">${submittedRecord.member3Name}</span></div>` : ''}
                                ${submittedRecord.member4Name ? `<div class="row"><span class="label">MEMBER 4:</span><span class="val">${submittedRecord.member4Name}</span></div>` : ''}
                                <div class="barcode"></div>
                                <div class="foot">
                                  Present this e-ticket pass at Abinantham Hall reception along with college ID cards.<br/>
                                  Convener: Dr. R. Kiruba Shankar · Co-convener: Mr. R. Kandasamy · Helplines: +91 9840831058 / +91 97894 37018
                                </div>
                              </div>
                            </body>
                          </html>
                        `);
                        doc.close();
                        setTimeout(() => {
                          iframe.contentWindow?.focus();
                          iframe.contentWindow?.print();
                          setTimeout(() => {
                            if (document.body.contains(iframe)) {
                              document.body.removeChild(iframe);
                            }
                          }, 2000);
                        }, 400);
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 font-heading text-sm font-black uppercase tracking-wider text-[#050505] bg-[#FDB515] hover:bg-[#ffb703] border-2 border-[#050505] shadow-[4px_4px_0_#7A0606] cursor-pointer"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print / Save Gate Pass</span>
                  </button>

                  <button
                    onClick={resetForm}
                    className="px-6 py-3 font-heading text-sm font-black uppercase tracking-wider text-white bg-[#1a1a1a] hover:bg-[#262626] border-2 border-[#333] cursor-pointer"
                  >
                    Register Another Team
                  </button>
                </div>
              </div>
            ) : (
              /* THE INTERACTIVE GOOGLE FORM */
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Header Card */}
                <div className="border-4 border-[#262626] bg-[#0A0806] p-4 sm:p-8 shadow-brutal space-y-4">
                  <div className="border-b-2 border-[#222] pb-3 sm:pb-4">
                    <div className="font-mono text-xs uppercase font-bold text-[#FF4A12] mb-1">
                      GOOGLE APPS SCRIPT FORM
                    </div>
                    <h3 className="font-display text-2xl xs:text-3xl font-black uppercase text-white">
                      EMBEDATHON 2026 – Registration Form
                    </h3>
                  </div>

                  <div className="font-body text-xs sm:text-sm text-[#F2F2EA]/80 space-y-1.5 border-b border-[#222] pb-3 sm:pb-4">
                    <p className="font-bold text-[#FDB515]">Explore the Future with Embedded Technologies</p>
                    <p>Department of Electronics and Communication Engineering</p>
                    <div className="pt-2 font-mono text-xs text-[#888] grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      <div>📅 15th October 2026</div>
                      <div>⏰ Event Timing: 9:00 AM – 5:00 PM</div>
                      <div>📍 ABINANTHAM HALL</div>
                      <div>👥 Team Size: 1–4 Members (Solo / Team)</div>
                      <div>💰 Fee: ₹300 / Head</div>
                      <div>⏳ Last Date: 13/10/2026</div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-heading text-xs sm:text-sm uppercase font-bold text-white mb-1.5">
                      Email Address <span className="text-[#FF4A12]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. teamleader@institution.edu"
                      className={`w-full bg-[#050505] border-2 px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-base sm:text-sm text-white placeholder-[#555] focus:outline-none ${
                        errors.email
                          ? 'border-[#FF4A12]'
                          : 'border-[#333] focus:border-[#FDB515]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 font-mono text-xs text-[#FF4A12] flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* SECTION 1: TEAM DETAILS & LEADER (MEMBER 1) */}
                <div className="border-4 border-[#262626] bg-[#0A0806] p-4 sm:p-8 shadow-brutal space-y-5">
                  <div className="border-b-2 border-[#222] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FDB515]">
                        SECTION 1
                      </span>
                      <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
                        TEAM & LEADER DETAILS (MEMBER 1)
                      </h4>
                    </div>
                    <span className="font-mono text-[10px] sm:text-[11px] text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 font-bold self-start sm:self-auto">
                      GOOGLE SHEET FORMAT
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-heading text-xs sm:text-sm uppercase font-bold text-white mb-1.5">
                        Team Name <span className="text-[#FF4A12]">*</span>
                      </label>
                      <input
                        type="text"
                        id="teamName"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g. Embedded Titans"
                        className={`w-full bg-[#050505] border-2 px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-base sm:text-sm text-white placeholder-[#555] focus:outline-none ${
                          errors.teamName ? 'border-[#FF4A12]' : 'border-[#333] focus:border-[#FDB515]'
                        }`}
                      />
                      {errors.teamName && (
                        <p className="mt-1 font-mono text-xs text-[#FF4A12] flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" /> {errors.teamName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-heading text-xs sm:text-sm uppercase font-bold text-white mb-1.5">
                        Member 1 College / Institution <span className="text-[#FF4A12]">*</span>
                      </label>
                      <input
                        type="text"
                        id="collegeName"
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        placeholder="e.g. Sasurie College of Engineering, Vijayamangalam"
                        className={`w-full bg-[#050505] border-2 px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-base sm:text-sm text-white placeholder-[#555] focus:outline-none ${
                          errors.collegeName ? 'border-[#FF4A12]' : 'border-[#333] focus:border-[#FDB515]'
                        }`}
                      />
                      {errors.collegeName && (
                        <p className="mt-1 font-mono text-xs text-[#FF4A12] flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" /> {errors.collegeName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Team Size Selector (How many members are in your team?) */}
                  <div>
                    <label className="block font-heading text-xs sm:text-sm uppercase font-bold text-white mb-2">
                      How many members are in your team? <span className="text-[#FF4A12]">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {(['1 Member', '2 Members', '3 Members', '4 Members'] as TeamSize[]).map((size) => {
                        const isSelected = teamSize === size;
                        const count = size === '1 Member' ? 1 : size === '2 Members' ? 2 : size === '3 Members' ? 3 : 4;
                        return (
                          <button
                            type="button"
                            key={size}
                            onClick={() => setTeamSize(size)}
                            className={`p-2.5 sm:p-3.5 border-2 text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#FDB515] bg-[#FDB515] text-[#050505] shadow-[2px_2px_0_#7A0606] sm:shadow-[3px_3px_0_#7A0606]'
                                : 'border-[#333] bg-[#050505] text-[#F2F2EA] hover:border-[#888]'
                            }`}
                          >
                            <span className="block font-display text-sm xs:text-base sm:text-lg uppercase font-bold">{size}</span>
                            <span className="block font-mono text-[10px] sm:text-xs mt-0.5">
                              {count === 1 ? 'Solo · ₹300' : `₹${count * EVENT_DETAILS.feePerHead} total`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Leader details (Member 1) */}
                  <div className="border-t-2 border-[#222] pt-4 space-y-4">
                    <span className="font-mono text-xs font-bold uppercase text-[#FDB515] block">
                      Member 1 (Team Leader) Details
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-heading text-xs sm:text-sm uppercase font-bold text-white mb-1.5">
                          Member 1 Full Name (Leader) <span className="text-[#FF4A12]">*</span>
                        </label>
                        <input
                          type="text"
                          id="leaderName"
                          value={leaderName}
                          onChange={(e) => setLeaderName(e.target.value)}
                          placeholder="Leader Full Name"
                          className={`w-full bg-[#050505] border-2 px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-base sm:text-sm text-white placeholder-[#555] focus:outline-none ${
                            errors.leaderName ? 'border-[#FF4A12]' : 'border-[#333] focus:border-[#FDB515]'
                          }`}
                        />
                        {errors.leaderName && (
                          <p className="mt-1 font-mono text-xs text-[#FF4A12]">{errors.leaderName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-heading text-xs sm:text-sm uppercase font-bold text-white mb-1.5">
                          Member 1 Phone Number (Leader) <span className="text-[#FF4A12]">*</span>
                        </label>
                        <input
                          type="tel"
                          id="leaderMobile"
                          value={leaderMobile}
                          onChange={(e) => setLeaderMobile(e.target.value)}
                          placeholder="e.g. +91 98408 12345"
                          className={`w-full bg-[#050505] border-2 px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-base sm:text-sm text-white placeholder-[#555] focus:outline-none ${
                            errors.leaderMobile ? 'border-[#FF4A12]' : 'border-[#333] focus:border-[#FDB515]'
                          }`}
                        />
                        {errors.leaderMobile && (
                          <p className="mt-1 font-mono text-xs text-[#FF4A12]">{errors.leaderMobile}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-heading text-xs sm:text-sm uppercase font-bold text-white mb-1.5">
                          Member 1 Department <span className="text-[#FF4A12]">*</span>
                        </label>
                        <input
                          type="text"
                          value={member1Department}
                          onChange={(e) => setMember1Department(e.target.value)}
                          placeholder="e.g. ECE / EEE / CSE"
                          className="w-full bg-[#050505] border-2 border-[#333] focus:border-[#FDB515] px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-base sm:text-sm text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-heading text-xs sm:text-sm uppercase font-bold text-white mb-1.5">
                          Member 1 Year of Study <span className="text-[#FF4A12]">*</span>
                        </label>
                        <select
                          value={member1Year}
                          onChange={(e) => setMember1Year(e.target.value)}
                          className="w-full bg-[#050505] border-2 border-[#333] focus:border-[#FDB515] px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-base sm:text-sm text-white focus:outline-none"
                        >
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="Final Year">Final Year</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: TEAM MEMBERS (MEMBER 2, 3, 4) */}
                <div className="border-4 border-[#262626] bg-[#0A0806] p-4 sm:p-8 shadow-brutal space-y-5">
                  <div className="border-b-2 border-[#222] pb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FDB515]">
                      SECTION 2
                    </span>
                    <h4 className="font-display text-2xl font-black uppercase text-white">
                      ADDITIONAL TEAM MEMBERS
                    </h4>
                    <p className="font-mono text-xs text-[#888] mt-0.5">
                      Configured for <strong className="text-[#FDB515]">{teamSize}</strong> ({participantCount} participant{participantCount > 1 ? 's' : ''} total).
                    </p>
                  </div>

                  {participantCount === 1 ? (
                    <div className="p-6 bg-emerald-950/30 border-2 border-emerald-800/80 font-mono text-xs text-emerald-300 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="space-y-1.5">
                        <p className="font-bold text-sm text-white">
                          Solo / Individual Registration Selected (1 Member)
                        </p>
                        <p className="text-emerald-200/90 leading-relaxed">
                          No additional team members are required! Your Member 1 details above represent your complete registration. The registration fee is <strong>₹300</strong>.
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Member 2 */
                    <div className="border-2 border-[#333] bg-[#050505] p-3.5 sm:p-5 space-y-3 sm:space-y-4">
                      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1">
                        <span className="font-mono text-xs font-bold uppercase text-[#FDB515] block">
                          Member 2 Details (Required)
                        </span>
                        {collegeName && (
                          <button
                            type="button"
                            onClick={() => setMember2College(collegeName)}
                            className="text-[11px] font-mono text-[#FDB515] hover:underline self-start xs:self-auto"
                          >
                            + Same college as Leader
                          </button>
                        )}
                      </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                          Member 2 Full Name <span className="text-[#FF4A12]">*</span>
                        </label>
                        <input
                          type="text"
                          id="member2Name"
                          value={member2Name}
                          onChange={(e) => setMember2Name(e.target.value)}
                          placeholder="Full Name"
                          className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                        />
                        {errors.member2Name && <p className="mt-1 text-xs text-[#FF4A12]">{errors.member2Name}</p>}
                      </div>

                      <div>
                        <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                          Member 2 Email Address <span className="text-[#FF4A12]">*</span>
                        </label>
                        <input
                          type="email"
                          value={member2Email}
                          onChange={(e) => setMember2Email(e.target.value)}
                          placeholder="member2@example.com"
                          className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                        />
                        {errors.member2Email && <p className="mt-1 text-xs text-[#FF4A12]">{errors.member2Email}</p>}
                      </div>

                      <div>
                        <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                          Member 2 Phone Number <span className="text-[#FF4A12]">*</span>
                        </label>
                        <input
                          type="tel"
                          value={member2Phone}
                          onChange={(e) => setMember2Phone(e.target.value)}
                          placeholder="+91 98408 00000"
                          className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                        />
                        {errors.member2Phone && <p className="mt-1 text-xs text-[#FF4A12]">{errors.member2Phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                          Member 2 College / Institution
                        </label>
                        <input
                          type="text"
                          value={member2College || collegeName}
                          onChange={(e) => setMember2College(e.target.value)}
                          placeholder="College Name"
                          className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                        />
                      </div>

                      <div>
                        <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                          Member 2 Department
                        </label>
                        <input
                          type="text"
                          value={member2Department}
                          onChange={(e) => setMember2Department(e.target.value)}
                          placeholder="e.g. ECE"
                          className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                        />
                      </div>

                      <div>
                        <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                          Member 2 Year of Study
                        </label>
                        <select
                          value={member2Year}
                          onChange={(e) => setMember2Year(e.target.value)}
                          className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                        >
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="Final Year">Final Year</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  )}

                  {/* Member 3 */}
                  {participantCount >= 3 && (
                    <div className="border-2 border-[#333] bg-[#050505] p-3.5 sm:p-5 space-y-3 sm:space-y-4">
                      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1">
                        <span className="font-mono text-xs font-bold uppercase text-[#FDB515] block">
                          Member 3 Details
                        </span>
                        {collegeName && (
                          <button
                            type="button"
                            onClick={() => setMember3College(collegeName)}
                            className="text-[11px] font-mono text-[#FDB515] hover:underline self-start xs:self-auto"
                          >
                            + Same college as Leader
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                            Member 3 Full Name <span className="text-[#FF4A12]">*</span>
                          </label>
                          <input
                            type="text"
                            id="member3Name"
                            value={member3Name}
                            onChange={(e) => setMember3Name(e.target.value)}
                            placeholder="Full Name"
                            className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                          />
                          {errors.member3Name && <p className="mt-1 text-xs text-[#FF4A12]">{errors.member3Name}</p>}
                        </div>

                        <div>
                          <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                            Member 3 Email Address <span className="text-[#FF4A12]">*</span>
                          </label>
                          <input
                            type="email"
                            value={member3Email}
                            onChange={(e) => setMember3Email(e.target.value)}
                            placeholder="member3@example.com"
                            className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                          />
                          {errors.member3Email && <p className="mt-1 text-xs text-[#FF4A12]">{errors.member3Email}</p>}
                        </div>

                        <div>
                          <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                            Member 3 Phone Number <span className="text-[#FF4A12]">*</span>
                          </label>
                          <input
                            type="tel"
                            value={member3Phone}
                            onChange={(e) => setMember3Phone(e.target.value)}
                            placeholder="+91 98408 00000"
                            className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                          />
                          {errors.member3Phone && <p className="mt-1 text-xs text-[#FF4A12]">{errors.member3Phone}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                            Member 3 College / Institution
                          </label>
                          <input
                            type="text"
                            value={member3College || collegeName}
                            onChange={(e) => setMember3College(e.target.value)}
                            placeholder="College Name"
                            className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                          />
                        </div>

                        <div>
                          <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                            Member 3 Department
                          </label>
                          <input
                            type="text"
                            value={member3Department}
                            onChange={(e) => setMember3Department(e.target.value)}
                            placeholder="e.g. ECE"
                            className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                          />
                        </div>

                        <div>
                          <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                            Member 3 Year of Study
                          </label>
                          <select
                            value={member3Year}
                            onChange={(e) => setMember3Year(e.target.value)}
                            className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                          >
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="Final Year">Final Year</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Member 4 */}
                  {participantCount === 4 && (
                    <div className="border-2 border-[#333] bg-[#050505] p-3.5 sm:p-5 space-y-3 sm:space-y-4">
                      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1">
                        <span className="font-mono text-xs font-bold uppercase text-[#FDB515] block">
                          Member 4 Details
                        </span>
                        {collegeName && (
                          <button
                            type="button"
                            onClick={() => setMember4College(collegeName)}
                            className="text-[11px] font-mono text-[#FDB515] hover:underline self-start xs:self-auto"
                          >
                            + Same college as Leader
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                            Member 4 Full Name <span className="text-[#FF4A12]">*</span>
                          </label>
                          <input
                            type="text"
                            id="member4Name"
                            value={member4Name}
                            onChange={(e) => setMember4Name(e.target.value)}
                            placeholder="Full Name"
                            className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                          />
                          {errors.member4Name && <p className="mt-1 text-xs text-[#FF4A12]">{errors.member4Name}</p>}
                        </div>

                        <div>
                          <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                            Member 4 Email Address <span className="text-[#FF4A12]">*</span>
                          </label>
                          <input
                            type="email"
                            value={member4Email}
                            onChange={(e) => setMember4Email(e.target.value)}
                            placeholder="member4@example.com"
                            className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                          />
                          {errors.member4Email && <p className="mt-1 text-xs text-[#FF4A12]">{errors.member4Email}</p>}
                        </div>

                        <div>
                          <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                            Member 4 Phone Number <span className="text-[#FF4A12]">*</span>
                          </label>
                          <input
                            type="tel"
                            value={member4Phone}
                            onChange={(e) => setMember4Phone(e.target.value)}
                            placeholder="+91 98408 00000"
                            className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                          />
                          {errors.member4Phone && <p className="mt-1 text-xs text-[#FF4A12]">{errors.member4Phone}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                            Member 4 College / Institution
                          </label>
                          <input
                            type="text"
                            value={member4College || collegeName}
                            onChange={(e) => setMember4College(e.target.value)}
                            placeholder="College Name"
                            className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                          />
                        </div>

                        <div>
                          <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                            Member 4 Department
                          </label>
                          <input
                            type="text"
                            value={member4Department}
                            onChange={(e) => setMember4Department(e.target.value)}
                            placeholder="e.g. ECE"
                            className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                          />
                        </div>

                        <div>
                          <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                            Member 4 Year of Study
                          </label>
                          <select
                            value={member4Year}
                            onChange={(e) => setMember4Year(e.target.value)}
                            className="w-full bg-[#0A0806] border border-[#333] px-3.5 py-2 font-mono text-base sm:text-sm text-white focus:outline-none focus:border-[#FDB515]"
                          >
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="Final Year">Final Year</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* SECTION 3: TECHNOLOGY DOMAIN */}
                <div className="border-4 border-[#262626] bg-[#0A0806] p-4 sm:p-8 shadow-brutal space-y-4">
                  <div className="border-b-2 border-[#222] pb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FDB515]">
                      SECTION 3
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
                      TECHNOLOGY DOMAIN
                    </h4>
                    <p className="font-mono text-xs text-[#888]">
                      Select your preferred domain for jury evaluation <span className="text-[#FF4A12]">*</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    {DOMAINS.map((d) => {
                      const isSelected = domain === d.title;
                      return (
                        <label
                          key={d.id}
                          className={`flex items-start gap-3 p-3 sm:p-3.5 border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#FDB515] bg-[#141210] shadow-[2px_2px_0_#7A0606]'
                              : 'border-[#222] bg-[#050505] hover:border-[#444]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="domain"
                            value={d.title}
                            checked={isSelected}
                            onChange={() => setDomain(d.title)}
                            className="mt-1 accent-[#FDB515]"
                          />
                          <div>
                            <span className="font-display text-sm sm:text-base font-bold uppercase text-white block">
                              {d.title}
                            </span>
                            <span className="font-body text-xs text-[#888] line-clamp-1">{d.description}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* SECTION 4: PAYMENT DETAILS & QR */}
                <div className="border-4 border-[#262626] bg-[#0A0806] p-4 sm:p-8 shadow-brutal space-y-6">
                  <div className="border-b-2 border-[#222] pb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FDB515]">
                      SECTION 4
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
                      PAYMENT DETAILS
                    </h4>
                    <p className="font-mono text-xs text-[#888]">
                      Registration Fee: <strong className="text-[#FDB515]">₹300 / Head</strong>. Pay via UPI and provide transaction reference below.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-6">
                      <PaymentQRCard memberCount={participantCount} />
                    </div>

                    <div className="md:col-span-6 space-y-4">
                      <div>
                        <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                          Number of Participants
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={`${participantCount} ${participantCount === 1 ? 'Member' : 'Members'}`}
                          className="w-full bg-[#050505] border-2 border-[#222] px-3.5 sm:px-4 py-2 sm:py-2.5 font-mono text-sm text-[#FDB515] font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-heading text-xs uppercase font-bold text-[#888] mb-1">
                          Total Amount Paid (₹)
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={`₹ ${totalAmount}`}
                          className="w-full bg-[#050505] border-2 border-[#222] px-3.5 sm:px-4 py-2 sm:py-2.5 font-mono text-base sm:text-lg text-emerald-400 font-black"
                        />
                      </div>

                      <div>
                        <label className="block font-heading text-xs uppercase font-bold text-white mb-1">
                          Transaction ID / UTR Number <span className="text-[#FF4A12]">*</span>
                        </label>
                        <input
                          type="text"
                          id="transactionId"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          placeholder="e.g. 427189012344 (12 digits)"
                          className={`w-full bg-[#050505] border-2 px-3.5 sm:px-4 py-2 sm:py-2.5 font-mono text-base sm:text-sm text-white placeholder-[#555] ${
                            errors.transactionId ? 'border-[#FF4A12]' : 'border-[#333] focus:border-[#FDB515]'
                          }`}
                        />
                        {errors.transactionId && (
                          <p className="mt-1 font-mono text-xs text-[#FF4A12]">{errors.transactionId}</p>
                        )}
                      </div>

                      {/* Screenshot upload */}
                      <div>
                        <label className="block font-heading text-xs uppercase font-bold text-white mb-1">
                          Upload Payment Screenshot <span className="text-[#FF4A12]">*</span>
                        </label>
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />

                        {screenshotDataUrl ? (
                          <div className="border-2 border-[#333] bg-[#050505] p-3 flex items-center gap-3">
                            <img
                              src={screenshotDataUrl}
                              alt="Payment Preview"
                              className="h-12 w-12 sm:h-14 sm:w-14 object-cover border border-[#444]"
                            />
                            <div className="flex-1 truncate">
                              <span className="font-mono text-xs text-white block truncate">{screenshotName}</span>
                              <span className="font-mono text-[10px] text-emerald-400">✓ Screenshot Attached</span>
                            </div>
                            <button
                              type="button"
                              onClick={removeScreenshot}
                              className="font-mono text-xs text-[#FF4A12] px-2 py-1 bg-[#1a1a1a] border border-[#333] cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full border-2 border-dashed border-[#444] hover:border-[#FDB515] p-3.5 sm:p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors"
                          >
                            <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-[#888] mb-1" />
                            <span className="font-heading text-xs uppercase font-bold text-white">
                              Click to Upload Screenshot
                            </span>
                            <span className="font-mono text-[10px] text-[#666]">
                              PNG, JPG, JPEG up to 8MB
                            </span>
                          </button>
                        )}
                        {errors.screenshot && (
                          <p className="mt-1 font-mono text-xs text-[#FF4A12]">{errors.screenshot}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 5: DECLARATION */}
                <div className="border-4 border-[#262626] bg-[#0A0806] p-4 sm:p-8 shadow-brutal space-y-4">
                  <div className="border-b-2 border-[#222] pb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FDB515]">
                      SECTION 5
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
                      DECLARATION
                    </h4>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="declared"
                      checked={declared}
                      onChange={(e) => setDeclared(e.target.checked)}
                      className="mt-1 h-5 w-5 accent-[#FDB515] shrink-0"
                    />
                    <span className="font-body text-xs sm:text-sm text-[#F2F2EA]/85 leading-relaxed">
                      I confirm that all the information provided is correct and that all listed team members are participating in EMBEDATHON 2026.
                    </span>
                  </label>
                  {errors.declared && (
                    <p className="font-mono text-xs text-[#FF4A12]">{errors.declared}</p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 px-4 sm:px-6 bg-[#FDB515] hover:bg-[#ffb703] text-[#050505] font-display text-base sm:text-xl uppercase tracking-wider border-2 border-[#050505] shadow-[4px_4px_0_#7A0606] sm:shadow-[6px_6px_0_#7A0606] hover:shadow-[7px_7px_0_#FF4A12] active:translate-x-1 active:translate-y-1 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'PROCESSING REGISTRATION...' : 'SUBMIT REGISTRATION FORM (₹' + totalAmount + ')'}
                  </button>
                </div>
              </form>
            )}
      </div>
    </section>
  );
};

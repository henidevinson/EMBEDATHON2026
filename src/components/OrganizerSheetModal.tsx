import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Trash2,
  FileSpreadsheet,
  AlertCircle,
  Eye,
  Flame,
  Copy,
  Check,
  Send,
  HelpCircle,
  Code2,
  ExternalLink,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { RegistrationRecord } from '../types';
import { DOMAINS, EVENT_DETAILS } from '../data/eventData';
import {
  GOOGLE_SHEET_HEADERS,
  generateGoogleSheetCsv,
  generateGoogleSheetTsv,
  sendRegistrationToGoogleSheet,
  GOOGLE_APPS_SCRIPT_WEBAPP_CODE,
  DEFAULT_GOOGLE_SHEET_WEBHOOK_URL,
} from '../utils/googleSheetsSync';

interface OrganizerSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrations: RegistrationRecord[];
  onUpdateStatus: (id: string, newStatus: 'Pending Verification' | 'Verified' | 'Flagged') => void;
  onDeleteRecord: (id: string) => void;
  onResetData: () => void;
  onLogout?: () => void;
}

export const OrganizerSheetModal: React.FC<OrganizerSheetModalProps> = ({
  isOpen,
  onClose,
  registrations,
  onUpdateStatus,
  onDeleteRecord,
  onResetData,
  onLogout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('All');
  const [selectedScreenshot, setSelectedScreenshot] = useState<{ name: string; url: string } | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // Webhook sync state
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [showSyncGuide, setShowSyncGuide] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('embedathon_sheet_webhook') || DEFAULT_GOOGLE_SHEET_WEBHOOK_URL;
    setWebhookUrl(saved);
  }, []);

  if (!isOpen) return null;

  const handleSaveWebhook = (url: string) => {
    setWebhookUrl(url);
    localStorage.setItem('embedathon_sheet_webhook', url.trim());
  };

  const handleSyncAllToGoogleSheet = async () => {
    const targetUrl = webhookUrl.trim() || DEFAULT_GOOGLE_SHEET_WEBHOOK_URL;
    if (!targetUrl) {
      setSyncResult('Please enter your Google Apps Script Webhook URL first.');
      return;
    }

    setIsSyncingAll(true);
    setSyncResult('Syncing records to your Google Sheet...');

    let successCount = 0;
    for (const record of filtered) {
      const res = await sendRegistrationToGoogleSheet(record, targetUrl);
      if (res.success) successCount++;
    }

    setIsSyncingAll(false);
    setSyncResult(`Successfully synced ${successCount} of ${filtered.length} row(s) to your Google Sheet!`);
    setTimeout(() => setSyncResult(null), 6000);
  };

  const filtered = registrations.filter((r) => {
    const matchesSearch =
      r.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.collegeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.leaderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.transactionId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain = selectedDomainFilter === 'All' || r.domain === selectedDomainFilter;

    return matchesSearch && matchesDomain;
  });

  const totalTeams = registrations.length;
  const totalParticipants = registrations.reduce((acc, r) => acc + r.participantCount, 0);
  const totalRevenue = registrations.reduce((acc, r) => acc + r.totalAmount, 0);
  const verifiedCount = registrations.filter((r) => r.status === 'Verified').length;

  const copyToClipboard = () => {
    const tsv = generateGoogleSheetTsv(filtered, true);
    navigator.clipboard.writeText(tsv);
    setCopyStatus('33 columns copied! Paste (Ctrl+V) directly into row 1 of your Google Sheet.');
    setTimeout(() => setCopyStatus(null), 5000);
  };

  const exportToCsv = () => {
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + generateGoogleSheetCsv(filtered);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EMBEDATHON_2026_Google_Sheet_Responses_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative flex flex-col h-full max-h-[96vh] sm:max-h-[92vh] w-full max-w-7xl border-2 sm:border-4 border-[#262626] bg-[#0A0806] shadow-brutal-xl overflow-hidden">
        
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-b-2 border-[#222] bg-[#050505] px-3 sm:px-6 py-2.5 sm:py-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center border-2 border-emerald-500 bg-[#050505] text-emerald-400 shrink-0">
              <FileSpreadsheet className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm sm:text-lg uppercase tracking-tight text-white leading-tight">
                  EMBEDATHON 2026 – Admin Portal
                </h3>
                <span className="font-mono text-[9px] sm:text-[10px] text-emerald-400 border border-emerald-800 bg-emerald-950 px-1.5 sm:px-2 py-0.5 font-bold">
                  33 COLS
                </span>
              </div>
              <p className="font-mono text-[10px] sm:text-xs text-[#888]">
                Google Sheet responses & payment verification
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setShowSyncGuide(!showSyncGuide)}
              className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#141210] hover:bg-[#1f1c19] text-[#FDB515] border border-[#FDB515]/60 font-mono text-[10.5px] sm:text-xs font-bold uppercase cursor-pointer"
              title="View how to auto-sync registrations to Google Sheets via Webhook"
            >
              <Code2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>{showSyncGuide ? 'Hide Setup' : 'Auto-Sync'}</span>
            </button>

            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#1a1a1a] hover:bg-[#252525] text-emerald-300 border border-emerald-500/50 font-mono text-[10.5px] sm:text-xs font-bold uppercase cursor-pointer"
              title="Copy all 33 columns to clipboard to paste directly into Google Sheets"
            >
              {copyStatus ? <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-400" /> : <Copy className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
              <span>{copyStatus ? 'Copied!' : 'Copy Sheet'}</span>
            </button>

            <button
              onClick={exportToCsv}
              className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-emerald-500 hover:bg-emerald-400 text-[#050505] font-mono text-[10.5px] sm:text-xs font-black uppercase cursor-pointer shadow-[2px_2px_0_#065f46]"
              title="Download 33-column CSV spreadsheet file to open in Excel or import to Google Sheets"
            >
              <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>Export CSV</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-red-950/70 hover:bg-red-900 text-red-300 border border-red-600 font-mono text-[10.5px] sm:text-xs font-bold uppercase cursor-pointer transition-colors"
                title="Log out from Admin session"
              >
                <LogOut className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-400" />
                <span>Logout</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1 sm:p-1.5 text-[#888] hover:text-white border border-[#333] hover:border-[#666] bg-[#111] cursor-pointer"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* WEBHOOK LIVE SYNC PANEL (EXPANDABLE) */}
        {showSyncGuide && (
          <div className="bg-[#0f0e0c] border-b-2 border-[#FDB515]/40 p-4 sm:p-5 font-mono text-xs space-y-4 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#222] pb-3">
              <div>
                <span className="text-[#FDB515] font-black uppercase text-sm flex items-center gap-1.5">
                  <Send className="h-4 w-4" />
                  Real-Time Google Sheets Webhook Receiver
                </span>
                <p className="text-[#888] text-[11px] mt-0.5">
                  Whenever someone registers on the website, their data is instantly sent and appended to your Google Sheet!
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_WEBAPP_CODE);
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 3000);
                }}
                className="px-3 py-1.5 bg-[#FDB515] text-black font-black uppercase text-[11px] flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedCode ? 'Apps Script Copied!' : 'Copy Apps Script Code'}</span>
              </button>
            </div>

            {/* Webhook URL input & Sync Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <span className="text-[#aaa] shrink-0 text-[11px] font-bold">Your Webhook URL:</span>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => handleSaveWebhook(e.target.value)}
                placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                className="flex-1 bg-[#050505] border border-[#333] focus:border-[#FDB515] px-3 py-2 text-white font-mono text-xs focus:outline-none"
              />
              <button
                onClick={handleSyncAllToGoogleSheet}
                disabled={isSyncingAll}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-xs shrink-0 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{isSyncingAll ? 'Syncing...' : `Sync All (${filtered.length}) Rows Now`}</span>
              </button>
            </div>

            {syncResult && (
              <div className="p-2.5 bg-emerald-950/80 border border-emerald-500 text-emerald-300 font-bold text-xs flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{syncResult}</span>
              </div>
            )}

            {/* 3 Step Instruction Accordion */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-[11px] text-[#ccc]">
              <div className="p-2.5 bg-[#050505] border border-[#222]">
                <strong className="text-[#FDB515] block mb-1">Step 1: Open Apps Script</strong>
                Open your Google Sheet, go to <span className="text-white font-bold">Extensions &gt; Apps Script</span>.
              </div>
              <div className="p-2.5 bg-[#050505] border border-[#222]">
                <strong className="text-[#FDB515] block mb-1">Step 2: Paste Script &amp; Deploy</strong>
                Paste the copied code, click <span className="text-white font-bold">Deploy &gt; New deployment &gt; Web app</span>, set Who has access to <span className="text-emerald-400 font-bold">Anyone</span>.
              </div>
              <div className="p-2.5 bg-[#050505] border border-[#222]">
                <strong className="text-[#FDB515] block mb-1">Step 3: Paste URL Above</strong>
                Copy the Web app URL and paste it in the box above. Now every website registration sends straight to your Google Sheet!
              </div>
            </div>
          </div>
        )}

        {/* Quick Instructions Banner: What to do */}
        <div className="bg-emerald-950/40 border-b border-emerald-900/60 px-6 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-emerald-300">
            <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-white">Google Sheet Integration:</strong> Click <strong className="text-emerald-400">Copy for Google Sheets</strong>, open your Google Sheet, and press <code className="text-white bg-black/60 px-1 py-0.5 font-bold">Ctrl+V</code>. All 33 columns will paste into row 1 and 2 perfectly aligned!
            </span>
          </div>
          {copyStatus && (
            <span className="text-emerald-300 font-bold bg-emerald-900/90 px-2.5 py-0.5 border border-emerald-400 shrink-0">
              ✓ {copyStatus}
            </span>
          )}
        </div>

        {/* Ticker metrics bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#050505] border-b border-[#222] px-6 py-3 font-mono text-xs">
          <div>
            <span className="text-[#888]">Total Teams:</span>
            <span className="ml-2 font-black text-white">{totalTeams}</span>
          </div>
          <div>
            <span className="text-[#888]">Participants:</span>
            <span className="ml-2 font-black text-[#FDB515]">{totalParticipants}</span>
          </div>
          <div>
            <span className="text-[#888]">Collections:</span>
            <span className="ml-2 font-black text-emerald-400">₹{totalRevenue}</span>
          </div>
          <div>
            <span className="text-[#888]">Verified:</span>
            <span className="ml-2 font-black text-blue-400">{verifiedCount} / {totalTeams}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 px-6 py-3 bg-[#0A0806] border-b border-[#222]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#666]" />
            <input
              type="text"
              placeholder="Search team name, leader, college, ID, or UTR..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050505] border border-[#333] pl-9 pr-4 py-1.5 font-mono text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FDB515]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-[#888] shrink-0" />
            <select
              value={selectedDomainFilter}
              onChange={(e) => setSelectedDomainFilter(e.target.value)}
              className="bg-[#050505] border border-[#333] px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-[#FDB515] cursor-pointer"
            >
              <option value="All">All Domains ({registrations.length})</option>
              {DOMAINS.map((d) => (
                <option key={d.id} value={d.title}>
                  {d.shortTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-[#888] space-y-2">
              <AlertCircle className="mx-auto h-8 w-8 text-[#555]" />
              <p className="font-heading text-base font-bold uppercase">No records found</p>
            </div>
          ) : (
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead className="sticky top-0 bg-[#050505] text-[#888] border-b-2 border-[#222] z-10 uppercase">
                <tr>
                  <th className="py-2.5 px-3 whitespace-nowrap">ID</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Timestamp</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Team Name</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Leader (M1)</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Member 2</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Member 3</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Member 4</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Domain</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Fee (₹)</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">UTR / Ref</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Receipt</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Status</th>
                  <th className="py-2.5 px-3 whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c1c1c] text-[11px]">
                {filtered.map((r) => {
                  const isSolo = r.teamSize === '1 Member' || r.participantCount === 1;
                  const m1 = r.member1 || {
                    fullName: r.leaderName,
                    email: r.email,
                    phoneNumber: r.leaderMobile,
                    college: r.collegeName,
                    department: 'ECE',
                    yearOfStudy: '3rd Year',
                  };
                  const m2 = !isSolo && (r.member2 || (r.member2Name ? {
                    fullName: r.member2Name,
                    email: r.member2Contact?.includes('@') ? r.member2Contact : '',
                    phoneNumber: !r.member2Contact?.includes('@') ? r.member2Contact : '',
                    college: r.collegeName,
                    department: 'ECE',
                    yearOfStudy: '3rd Year',
                  } : null));
                  const m3 = r.member3 || (r.member3Name ? {
                    fullName: r.member3Name,
                    email: r.member3Contact?.includes('@') ? r.member3Contact : '',
                    phoneNumber: !r.member3Contact?.includes('@') ? r.member3Contact : '',
                    college: r.collegeName,
                    department: 'ECE',
                    yearOfStudy: '3rd Year',
                  } : null);
                  const m4 = r.member4 || (r.member4Name ? {
                    fullName: r.member4Name,
                    email: r.member4Contact?.includes('@') ? r.member4Contact : '',
                    phoneNumber: !r.member4Contact?.includes('@') ? r.member4Contact : '',
                    college: r.collegeName,
                    department: 'ECE',
                    yearOfStudy: '3rd Year',
                  } : null);

                  return (
                    <tr key={r.id} className="hover:bg-[#141210] transition-colors">
                      <td className="py-2.5 px-3 text-[#FDB515] font-black whitespace-nowrap">{r.id}</td>
                      <td className="py-2.5 px-3 text-[#666] whitespace-nowrap">{r.timestamp}</td>
                      <td className="py-2.5 px-3 text-white font-bold whitespace-nowrap">
                        <div>{r.teamName}</div>
                        <div className="text-[10px] text-[#888]">{r.teamSize}</div>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <div className="font-bold text-white">{m1.fullName}</div>
                        <div className="text-[10px] text-[#aaa]">{m1.phoneNumber} · {m1.department} ({m1.yearOfStudy})</div>
                        <div className="text-[10px] text-[#666] truncate max-w-[150px]">{m1.college}</div>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        {m2 ? (
                          <>
                            <div className="font-bold text-white">{m2.fullName}</div>
                            <div className="text-[10px] text-[#aaa]">{m2.phoneNumber || m2.email} · {m2.department}</div>
                          </>
                        ) : (
                          <span className="text-[#555] italic">Solo (—)</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        {m3 ? (
                          <>
                            <div className="font-bold text-white">{m3.fullName}</div>
                            <div className="text-[10px] text-[#aaa]">{m3.phoneNumber || m3.email} · {m3.department}</div>
                          </>
                        ) : (
                          <span className="text-[#555]">—</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        {m4 ? (
                          <>
                            <div className="font-bold text-white">{m4.fullName}</div>
                            <div className="text-[10px] text-[#aaa]">{m4.phoneNumber || m4.email} · {m4.department}</div>
                          </>
                        ) : (
                          <span className="text-[#555]">—</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-[#aaa] max-w-[130px] truncate" title={r.domain}>
                        {r.domain}
                      </td>
                      <td className="py-2.5 px-3 font-black text-emerald-400 whitespace-nowrap">
                        ₹{r.totalAmount}
                      </td>
                      <td className="py-2.5 px-3 text-white whitespace-nowrap select-all font-bold">
                        {r.transactionId}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        {r.screenshotUrl ? (
                          <button
                            onClick={() => setSelectedScreenshot({ name: r.screenshotName || 'Screenshot', url: r.screenshotUrl! })}
                            className="flex items-center gap-1 text-[#FDB515] hover:underline cursor-pointer"
                          >
                            <Eye className="h-3 w-3" /> View
                          </button>
                        ) : (
                          <span className="text-[#666]">{r.screenshotName || 'Attached'}</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <button
                          onClick={() =>
                            onUpdateStatus(
                              r.id,
                              r.status === 'Verified' ? 'Pending Verification' : 'Verified'
                            )
                          }
                          className={`inline-flex items-center gap-1 px-2 py-0.5 font-bold cursor-pointer transition-colors ${
                            r.status === 'Verified'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500'
                              : 'bg-yellow-950 text-yellow-400 border border-yellow-600'
                          }`}
                        >
                          {r.status === 'Verified' ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <Clock className="h-3 w-3" />
                          )}
                          <span>{r.status}</span>
                        </button>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-right">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete registration for team "${r.teamName}"?`)) {
                              onDeleteRecord(r.id);
                            }
                          }}
                          className="p-1 text-[#666] hover:text-[#FF4A12] cursor-pointer"
                          title="Delete record"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 border-[#222] bg-[#050505] px-6 py-3 font-mono text-xs">
          <div className="text-[#888]">
            Showing <strong className="text-white">{filtered.length}</strong> of{' '}
            <strong className="text-white">{registrations.length}</strong> recorded registrations.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('Reset registration database back to default initial records?')) {
                  onResetData();
                }
              }}
              className="text-[#666] hover:text-[#FF4A12] underline cursor-pointer"
            >
              Reset Data to Defaults
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#1a1a1a] hover:bg-[#252525] text-white border border-[#333] cursor-pointer font-bold uppercase"
            >
              Close
            </button>
          </div>
        </div>

        {/* Screenshot lightbox modal */}
        {selectedScreenshot && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
            <div className="relative max-w-xl w-full border-4 border-[#FDB515] bg-[#050505] p-5 shadow-brutal-xl space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#222] pb-3">
                <div className="font-heading text-sm uppercase font-bold text-white">
                  Payment Screenshot Preview
                </div>
                <button
                  onClick={() => setSelectedScreenshot(null)}
                  className="p-1 text-[#888] hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex justify-center bg-black border border-[#222] p-2 max-h-[65vh] overflow-auto">
                <img
                  src={selectedScreenshot.url}
                  alt={selectedScreenshot.name}
                  className="max-h-[60vh] object-contain"
                />
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-[#888]">
                <span>{selectedScreenshot.name}</span>
                <button
                  onClick={() => setSelectedScreenshot(null)}
                  className="px-3 py-1 bg-[#FDB515] text-[#050505] font-bold uppercase"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

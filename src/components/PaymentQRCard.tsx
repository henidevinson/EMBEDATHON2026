import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, QrCode, Download, ExternalLink, X, ShieldCheck, Sparkles, Smartphone } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData';
import coconvenerPhoto from '../assets/brand/coconvener-kandasamy-circle.png';
import staticQrImage from '../assets/brand/upi-qr-code.png';

interface PaymentQRCardProps {
  memberCount?: number;
  showModalClose?: boolean;
  onClose?: () => void;
  className?: string;
}

export const PaymentQRCard: React.FC<PaymentQRCardProps> = ({
  memberCount: initialMemberCount = 1,
  showModalClose = false,
  onClose,
  className = '',
}) => {
  const [memberCount, setMemberCount] = useState<number>(initialMemberCount);
  const [copied, setCopied] = useState(false);
  const [dynamicQrUrl, setDynamicQrUrl] = useState<string>('');
  const amount = memberCount * EVENT_DETAILS.feePerHead;

  // UPI deep link
  const upiLink = `upi://pay?pa=${EVENT_DETAILS.upi.id}&pn=${encodeURIComponent(
    EVENT_DETAILS.upi.name
  )}&am=${amount}&cu=INR&tn=EMBEDATHON%202026%20REGISTRATION`;

  // Generate high-resolution QR with high error correction so center logo works
  useEffect(() => {
    QRCode.toDataURL(upiLink, {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 450,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    })
      .then((url) => setDynamicQrUrl(url))
      .catch((err) => {
        console.error('Failed to generate dynamic QR:', err);
        setDynamicQrUrl(staticQrImage);
      });
  }, [upiLink]);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(EVENT_DETAILS.upi.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = dynamicQrUrl || staticQrImage;
    link.download = `Embedathon2026-UPI-QR-₹${amount}.png`;
    link.click();
  };

  return (
    <div
      className={`relative w-full max-w-md mx-auto bg-[#0A0806] border-2 sm:border-4 border-[#FDB515] p-4 sm:p-6 shadow-[6px_6px_0_#7A0606] text-[#F2F2EA] ${className}`}
    >
      {/* Modal Close Button */}
      {showModalClose && onClose && (
        <button
          onClick={onClose}
          aria-label="Close Payment Modal"
          className="absolute top-3 right-3 p-1.5 text-[#aaa] hover:text-white bg-[#1a1a1a] hover:bg-[#FF4A12] border border-[#333] transition-colors cursor-pointer z-20"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {/* Header Banner */}
      <div className="flex items-center justify-between border-b-2 border-[#222] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#FF4A12] animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FDB515]">
            Official UPI Payment
          </span>
        </div>
        <span className="font-mono text-[11px] text-[#888] bg-[#111] px-2 py-0.5 border border-[#333]">
          Instant Transfer
        </span>
      </div>

      {/* Member Selector Tab Buttons */}
      <div className="mb-4">
        <div className="text-[11px] font-mono text-[#aaa] uppercase tracking-wider mb-1.5 flex justify-between items-center">
          <span>Select Team Size:</span>
          <span className="text-[#FDB515] font-bold">₹{EVENT_DETAILS.feePerHead} / Head</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {[1, 2, 3, 4].map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setMemberCount(count)}
              className={`py-1.5 text-xs font-mono font-bold uppercase border transition-all cursor-pointer ${
                memberCount === count
                  ? 'bg-[#FDB515] text-[#050505] border-[#FDB515] shadow-[2px_2px_0_#7A0606]'
                  : 'bg-[#141210] text-[#888] border-[#333] hover:text-white hover:border-[#666]'
              }`}
            >
              {count} {count === 1 ? 'Head' : 'Heads'}
            </button>
          ))}
        </div>
      </div>

      {/* Amount Pill Display */}
      <div className="flex items-center justify-between bg-[#141210] border border-[#333] px-3.5 py-2 mb-4">
        <span className="font-mono text-xs text-[#aaa]">Total Payable Amount:</span>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-2xl font-black text-[#FDB515]">₹{amount}</span>
          <span className="font-mono text-[10px] text-[#888]">({memberCount} × ₹{EVENT_DETAILS.feePerHead})</span>
        </div>
      </div>

      {/* Google Pay Card Replica (White Card with QR) */}
      <div className="bg-[#f0f4f8] rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-gray-900 shadow-md flex flex-col items-center">
        {/* Recipient Profile */}
        <div className="flex items-center gap-2.5 mb-3">
          <img
            src={coconvenerPhoto}
            alt={EVENT_DETAILS.upi.name}
            className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="text-left">
            <h4 className="font-heading font-black text-sm sm:text-base text-gray-900 tracking-tight leading-none uppercase">
              {EVENT_DETAILS.upi.name}
            </h4>
            <span className="text-[10px] font-mono text-gray-500 uppercase">
              {EVENT_DETAILS.upi.role}
            </span>
          </div>
        </div>

        {/* QR Code Container with Google Pay center pill */}
        <div className="relative bg-white p-3 rounded-2xl shadow-sm border border-gray-200">
          <img
            src={dynamicQrUrl || staticQrImage}
            alt={`UPI QR Code for ₹${amount}`}
            className="w-52 h-52 sm:w-56 sm:h-56 object-contain block"
          />

          {/* Centered Google Pay Emblem */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 bg-white rounded-full p-1 shadow-md border border-gray-100 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path
                  d="M12.24 9.9v4.22h-1.28V9.9h1.28zm5.55 2.15c0 1.25-.97 2.17-2.3 2.17-1.32 0-2.3-.92-2.3-2.17 0-1.24.98-2.16 2.3-2.16 1.33 0 2.3.92 2.3 2.16zm-1.28 0c0-.75-.5-1.26-1.02-1.26-.53 0-1.02.51-1.02 1.26 0 .74.49 1.26 1.02 1.26.52 0 1.02-.52 1.02-1.26z"
                  fill="#4285F4"
                />
                <circle cx="12" cy="12" r="10" fill="none" stroke="#4285F4" strokeWidth="1.5" />
                {/* 4-color GPay stylized ribbons */}
                <path
                  d="M10 7.5L14 16.5"
                  stroke="#34A853"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M14 7.5L10 16.5"
                  stroke="#EA4335"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M7.5 12h9"
                  stroke="#FBBC05"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* UPI ID Badge */}
        <div className="mt-3.5 flex items-center gap-1.5 text-xs font-mono font-bold text-gray-800 bg-white/80 px-3 py-1.5 rounded-lg border border-gray-200">
          <span>UPI ID:</span>
          <span className="text-gray-900 select-all">{EVENT_DETAILS.upi.id}</span>
          <button
            type="button"
            onClick={handleCopyUPI}
            title="Copy UPI ID"
            className="ml-1 p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-black transition-colors cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>

        <p className="mt-2 text-[11px] font-mono text-gray-600">
          Scan to pay with any UPI app
        </p>

        {/* Logos indicator */}
        <div className="mt-1 flex items-center gap-2 text-[9px] font-mono font-bold text-gray-500 uppercase">
          <span>GPay</span>
          <span>·</span>
          <span>PhonePe</span>
          <span>·</span>
          <span>Paytm</span>
          <span>·</span>
          <span>BHIM</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Direct UPI App launcher for mobile */}
        <a
          href={upiLink}
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#FDB515] hover:bg-[#ffb703] text-[#050505] font-mono text-xs font-black uppercase border border-[#050505] shadow-[2px_2px_0_#7A0606] transition-all"
        >
          <Smartphone className="h-3.5 w-3.5" />
          <span>Pay via UPI App</span>
        </a>

        {/* Download QR */}
        <button
          type="button"
          onClick={handleDownloadQR}
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#161412] hover:bg-[#222] text-[#F2F2EA] font-mono text-xs font-bold uppercase border border-[#333] hover:border-[#FDB515] transition-all cursor-pointer"
        >
          <Download className="h-3.5 w-3.5 text-[#FDB515]" />
          <span>Save QR Code</span>
        </button>
      </div>

      {/* Copy UPI ID Full Bar */}
      <button
        type="button"
        onClick={handleCopyUPI}
        className="mt-2 w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#111] hover:bg-[#1a1a1a] text-[#888] hover:text-[#FDB515] font-mono text-xs border border-[#222] transition-colors cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-bold">UPI ID Copied to Clipboard!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>Copy UPI ID ({EVENT_DETAILS.upi.id})</span>
          </>
        )}
      </button>

      {/* Payment Note */}
      <div className="mt-3.5 p-2.5 bg-[#120703] border-l-2 border-[#FF4A12] text-[11px] font-mono text-[#F2F2EA]/80 leading-relaxed">
        <div className="text-[#FDB515] font-bold mb-0.5">ℹ️ Registration Form Note:</div>
        Please take a screenshot of the payment confirmation and note the <strong className="text-white">UTR / Transaction ID</strong>. You will need to upload/enter it in the official registration form.
      </div>
    </div>
  );
};

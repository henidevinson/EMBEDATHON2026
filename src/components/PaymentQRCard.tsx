import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, ShieldCheck, Smartphone, Flame } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData';

interface PaymentQRCardProps {
  memberCount?: number;
  showModalClose?: boolean;
  onClose?: () => void;
}

export const PaymentQRCard: React.FC<PaymentQRCardProps> = ({
  memberCount = 2,
  showModalClose = false,
  onClose,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const amount = memberCount * EVENT_DETAILS.feePerHead;

  const upiId = EVENT_DETAILS.upi.id;
  const payeeName = EVENT_DETAILS.upi.name;
  const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`EMBEDATHON 2026 Reg (${memberCount} mem)`)}`;

  useEffect(() => {
    QRCode.toDataURL(upiUri, {
      width: 320,
      margin: 2,
      color: {
        dark: '#050505',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR code', err));
  }, [upiUri]);

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative border-2 sm:border-4 border-[#262626] bg-[#0A0806] p-3 sm:p-6 shadow-brutal max-w-full">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b-2 border-[#222] pb-2.5 sm:pb-4 mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center border-2 border-[#FDB515] bg-[#050505] text-[#FDB515] font-display font-black text-xs sm:text-sm shadow-[2px_2px_0_#7A0606] shrink-0">
            RK
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h4 className="font-display text-sm sm:text-lg uppercase tracking-tight text-white leading-tight">{payeeName}</h4>
              <span className="font-mono text-[8px] sm:text-[10px] text-[#FDB515] border border-[#FDB515]/30 bg-[#FDB515]/10 px-1 sm:px-1.5 py-0.5">
                CO-CONVENER
              </span>
            </div>
            <p className="font-mono text-[10px] sm:text-xs text-[#888]">HOD, ECE · INDIAN OVERSEAS BANK</p>
          </div>
        </div>

        {showModalClose && onClose && (
          <button
            onClick={onClose}
            className="p-1 text-[#888] hover:text-white border border-[#333] hover:border-[#FDB515] cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {/* QR Code Container */}
      <div className="flex flex-col items-center justify-center my-3 sm:my-4">
        <div className="relative border-4 border-white bg-white p-2.5 sm:p-3 shadow-brutal max-w-full">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="EMBEDATHON 2026 UPI Payment QR Code"
              className="h-44 w-44 sm:h-52 sm:w-52 object-contain"
            />
          ) : (
            <div className="h-44 w-44 sm:h-52 sm:w-52 flex items-center justify-center bg-gray-100 font-mono text-xs text-black">
              Generating UPI QR...
            </div>
          )}

          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-200">
              <span className="text-[10px] sm:text-xs font-black text-blue-600">G</span>
            </div>
          </div>
        </div>

        <div className="mt-3 text-center">
          <p className="font-heading text-xs uppercase tracking-wider font-bold text-[#FDB515]">
            Scan to pay with any UPI app
          </p>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] text-[#888]">
            <span>Google Pay</span>
            <span>·</span>
            <span>PhonePe</span>
            <span>·</span>
            <span>Paytm</span>
            <span>·</span>
            <span>BHIM</span>
          </div>
        </div>
      </div>

      {/* Pricing info box */}
      <div className="border-2 border-[#222] bg-[#050505] p-3 sm:p-3.5 space-y-2 font-mono text-xs mb-4">
        <div className="flex items-center justify-between">
          <span className="text-[#888]">Team Size:</span>
          <span className="text-white font-bold">
            {memberCount === 1 ? '1 Member' : `${memberCount} Members`} (₹300/head)
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-[#1c1c1c] pt-2">
          <span className="text-[#888]">Total Amount:</span>
          <span className="font-display text-xl text-[#FDB515] font-black">₹{amount}</span>
        </div>

        {/* Copy UPI ID */}
        <div className="mt-2 flex flex-col xs:flex-row items-stretch xs:items-center justify-between border border-[#333] bg-[#0A0806] p-2 sm:px-3 sm:py-2 gap-2">
          <div className="truncate pr-1">
            <span className="text-[9px] uppercase tracking-wider text-[#888] block">UPI ID</span>
            <span className="font-mono text-xs font-bold text-white select-all break-all">{upiId}</span>
          </div>
          <button
            onClick={copyUpiId}
            className="flex items-center justify-center gap-1 shrink-0 bg-[#FDB515] hover:bg-[#ffb703] text-[#050505] px-2.5 py-1.5 text-[11px] font-heading font-black uppercase cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile intent button */}
      <div>
        <a
          href={upiUri}
          className="flex w-full items-center justify-center gap-2 py-3 px-4 bg-[#FF4A12] hover:bg-[#c1121f] text-white font-heading text-sm font-black uppercase tracking-wider border-2 border-[#050505] shadow-[3px_3px_0_#7A0606] cursor-pointer"
        >
          <Smartphone className="h-4 w-4" />
          <span>Pay via Installed UPI App</span>
        </a>
      </div>

      <div className="mt-3 flex items-start gap-2 text-[11px] font-mono text-[#888] leading-tight">
        <ShieldCheck className="h-4 w-4 text-[#FDB515] shrink-0 mt-0.5" />
        <span>
          Save the 12-digit UTR and payment screenshot to enter into the form.
        </span>
      </div>
    </div>
  );
};

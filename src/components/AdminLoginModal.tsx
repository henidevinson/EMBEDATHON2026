import React, { useState } from 'react';
import { Lock, Mail, KeyRound, Eye, EyeOff, X, AlertCircle, ShieldCheck } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = password.trim();

      if (cleanEmail === 'admin@sasurie.com' && cleanPass === 'Embedathon2026') {
        sessionStorage.setItem('embedathon_admin_auth', 'true');
        sessionStorage.setItem('embedathon_admin_email', 'admin@sasurie.com');
        setIsLoading(false);
        onSuccess();
      } else {
        setIsLoading(false);
        setError('Invalid credentials. Authorized organizer access only.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md border-2 sm:border-4 border-[#262626] bg-[#0A0806] shadow-brutal-xl p-4 sm:p-8 space-y-4 sm:space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b-2 border-[#222] pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center border-2 border-[#FDB515] bg-[#050505] text-[#FDB515] shadow-[2px_2px_0_#7A0606] shrink-0">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#FDB515] uppercase tracking-widest font-bold">
                RESTRICTED ACCESS
              </span>
              <h3 className="font-display text-base sm:text-lg uppercase font-black tracking-tight text-white leading-tight">
                Admin / Organizer Login
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#888] hover:text-white border border-[#333] hover:border-[#666] bg-[#111] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Security Notice */}
        <div className="p-2.5 sm:p-3 bg-[#050505] border border-[#222] flex items-center gap-2 text-xs font-mono text-[#aaa]">
          <ShieldCheck className="h-4 w-4 text-[#FDB515] shrink-0" />
          <span className="text-[11px] sm:text-xs">Authorized Sasurie ECE convenors only.</span>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-2.5 sm:p-3 bg-red-950/80 border-2 border-red-500 font-mono text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
          <div>
            <label className="block font-heading text-xs uppercase font-bold text-white mb-1.5">
              Admin Email <span className="text-[#FF4A12]">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[#666]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sasurie.com"
                className="w-full bg-[#050505] border-2 border-[#333] focus:border-[#FDB515] pl-9 pr-3 py-2 text-white font-mono text-base sm:text-xs focus:outline-none placeholder-[#555]"
              />
            </div>
          </div>

          <div>
            <label className="block font-heading text-xs uppercase font-bold text-white mb-1.5">
              Admin Password <span className="text-[#FF4A12]">*</span>
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-[#666]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#050505] border-2 border-[#333] focus:border-[#FDB515] pl-9 pr-9 py-2 text-white font-mono text-base sm:text-xs focus:outline-none placeholder-[#555]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[#666] hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="pt-1.5">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[#FDB515] hover:bg-[#ffb703] text-black font-display uppercase tracking-wider font-black text-sm border-2 border-black shadow-[3px_3px_0_#7A0606] hover:shadow-[4px_4px_0_#FF4A12] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Lock className="h-4 w-4" />
              <span>{isLoading ? 'Verifying...' : 'Unlock Admin Portal'}</span>
            </button>
          </div>
        </form>

        <div className="border-t border-[#1c1c1c] pt-3 text-center">
          <p className="font-mono text-[11px] text-[#666]">
            Sasurie College of Engineering · Autonomous · Vijayamangalam
          </p>
        </div>

      </div>
    </div>
  );
};

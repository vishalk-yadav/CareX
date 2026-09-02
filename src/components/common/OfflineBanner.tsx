import React from 'react';
import { WifiOff, ShieldCheck } from 'lucide-react';
import { useCareX } from '../../context';

export const OfflineBanner: React.FC = () => {
  const { isOffline } = useCareX();

  if (!isOffline) return null;

  return (
    <div
      role="alert"
      className="sticky top-16 sm:top-20 z-20 w-full bg-amber-500 text-slate-950 px-4 py-2 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-md animate-fade-in border-b border-amber-600"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <WifiOff className="w-4 h-4 flex-shrink-0 animate-pulse" />
          <span>
            <strong>You're offline.</strong> Some live GPS & map features are cached, but your local Emergency Medical ID and statutory emergency numbers remain fully functional.
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-xs bg-amber-600/30 px-2.5 py-0.5 rounded-full font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Offline Ready</span>
        </div>
      </div>
    </div>
  );
};

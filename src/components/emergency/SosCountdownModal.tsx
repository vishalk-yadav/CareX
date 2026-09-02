import React from 'react';
import { X, Zap, ShieldAlert } from 'lucide-react';
import { useCareX } from '../../context';

export const SosCountdownModal: React.FC = () => {
  const { sosCountdown, cancelSosCountdown, forceImmediateSos } = useCareX();

  if (sosCountdown === null) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="sos-countdown-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/80 backdrop-blur-xl animate-fade-in"
    >
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-4 border-red-500 overflow-hidden text-center p-6 sm:p-8">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-500/30 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex p-4 rounded-3xl bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 mb-4 animate-bounce">
          <ShieldAlert className="w-12 h-12" />
        </div>

        <h2 id="sos-countdown-title" className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Emergency Alert Starting...
        </h2>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Gathering precise GPS coordinates and notifying your verified emergency contacts.
        </p>

        <div className="my-6 flex items-center justify-center">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-red-500/20 flex items-center justify-center bg-red-50 dark:bg-red-950/40">
            <span className="text-5xl sm:text-6xl font-black text-red-600 dark:text-red-400 animate-pulse">
              {sosCountdown}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={cancelSosCountdown}
            className="w-full py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-base transition-colors flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 shadow-sm"
          >
            <X className="w-5 h-5 text-slate-500" />
            <span>Cancel Emergency</span>
          </button>

          <button
            onClick={() => forceImmediateSos('manual_sos')}
            className="w-full py-3 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
          >
            <Zap className="w-4 h-4" />
            <span>Skip Countdown • Trigger Now</span>
          </button>
        </div>

        <div className="mt-4 text-[11px] text-slate-400 dark:text-slate-500">
          Press ESC or Cancel if this was an accidental trigger.
        </div>
      </div>
    </div>
  );
};


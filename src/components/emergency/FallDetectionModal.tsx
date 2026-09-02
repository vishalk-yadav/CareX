import React from 'react';
import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useCareX } from '../../context';

export const FallDetectionModal: React.FC = () => {
  const {
    isFallModalOpen,
    fallCountdown,
    dismissFallAlert,
    forceImmediateSos
  } = useCareX();

  if (!isFallModalOpen) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="fall-detection-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-amber-500 overflow-hidden p-6 sm:p-8 text-center">
        {/* Prototype tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-300 dark:border-amber-800">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Prototype Simulation • Fall Detection</span>
        </div>

        <h2 id="fall-detection-title" className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          ⚠️ Possible Fall Detected
        </h2>

        <p className="mt-2 text-base font-medium text-slate-600 dark:text-slate-300">
          Rapid vertical acceleration spike detected. Are you okay?
        </p>

        {/* Circular Countdown */}
        <div className="my-6">
          <div className="inline-flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-amber-500 bg-amber-50 dark:bg-amber-950/40">
            <span className="text-4xl sm:text-5xl font-black text-amber-600 dark:text-amber-400">
              {fallCountdown}s
            </span>
            <span className="text-[10px] uppercase font-bold text-amber-600/80 mt-0.5">
              Auto SOS
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
            Emergency alert will dispatch automatically if no response is given.
          </p>
        </div>

        {/* Big Touch-Friendly Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={dismissFallAlert}
            className="w-full py-4 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>YES, I'M OK</span>
          </button>

          <button
            onClick={() => {
              dismissFallAlert();
              forceImmediateSos('fall_detection');
            }}
            className="w-full py-4 px-5 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all"
          >
            <ShieldAlert className="w-5 h-5" />
            <span>ACTIVATE SOS</span>
          </button>
        </div>
      </div>
    </div>
  );
};


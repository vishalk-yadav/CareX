import React, { useState } from 'react';
import { Shield, Users, FileHeart, MapPin, ArrowRight } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('carex_onboarding_v1');
    }
    return false;
  });

  const handleDismiss = () => {
    localStorage.setItem('carex_onboarding_v1', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-center">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/20">
          <Shield className="w-8 h-8" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Welcome to CareX 👋
        </h2>

        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
          Your Smart Health & Emergency Companion
        </p>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
          CareX empowers you to instantly broadcast SOS emergency alerts, share precise GPS coordinates, monitor physiological vitals, and coordinate with trusted family & physicians.
        </p>

        <div className="my-6 space-y-2.5 text-left text-xs font-semibold text-slate-700 dark:text-slate-200">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900 dark:text-white font-bold">1. Verified Contacts</p>
              <p className="text-[11px] text-slate-500">Automated SMS dispatch configured for primary contacts.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
            <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600">
              <FileHeart className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900 dark:text-white font-bold">2. Emergency Medical ID</p>
              <p className="text-[11px] text-slate-500">Blood group, allergies & medical conditions passport.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900 dark:text-white font-bold">3. Live GPS Coordinates</p>
              <p className="text-[11px] text-slate-500">High accuracy location sharing with 1-tap Google Maps links.</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <span>Get Started with CareX</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

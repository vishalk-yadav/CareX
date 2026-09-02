import React, { useMemo } from 'react';
import { MapPin, Users } from 'lucide-react';
import { useCareX } from '../../context';

export const GreetingCard: React.FC = () => {
  const {
    healthProfile,
    triggerSosCountdown,
    currentLocation,
    contacts
  } = useCareX();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/30 p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-auto text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-safe-pulse" />
            <span>Your Safety Status: 🟢 SAFE</span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {greeting}, {healthProfile.fullName.split(' ')[0]} 👋
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1 max-w-lg">
              CareX is actively monitoring your safety telemetry and verified emergency contacts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-1">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{currentLocation?.city || 'Gurugram, HR'} (GPS Active)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-500" />
              <span>{contacts.length} Emergency Contacts Configured</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto flex flex-col items-center justify-center pt-2 md:pt-0">
          <button
            onClick={() => triggerSosCountdown('manual_sos')}
            className="group relative w-36 h-36 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center p-2 text-white bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-600 active:scale-95 transition-all shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 focus:outline-none focus:ring-4 focus:ring-red-500/50"
            aria-label="Emergency SOS button. Press to start emergency help countdown."
          >
            <span className="absolute inset-0 rounded-full border-4 border-red-400/40 animate-ping pointer-events-none" />

            <span className="text-3xl sm:text-4xl mb-1 group-hover:scale-110 transition-transform">
              🚨
            </span>
            <span className="text-2xl sm:text-3xl font-black tracking-wider uppercase">
              SOS
            </span>
            <span className="text-[11px] font-semibold text-red-100 tracking-wide mt-0.5">
              Emergency Help
            </span>
          </button>

          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-2">
            Tap or press Space / Enter
          </span>
        </div>
      </div>
    </div>
  );
};


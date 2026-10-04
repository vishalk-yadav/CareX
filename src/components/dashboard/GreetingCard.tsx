import React, { useMemo } from 'react';
import { MapPin, Users, ShieldCheck, Activity, AlertOctagon } from 'lucide-react';
import { useCareX } from '../../context';

export const GreetingCard: React.FC = () => {
  const {
    healthProfile,
    triggerSosCountdown,
    currentLocation,
    contacts,
    isEmergencyActive,
    safetyReadiness
  } = useCareX();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const firstName = healthProfile.fullName?.trim()
    ? healthProfile.fullName.trim().split(' ')[0]
    : 'Friend';

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border transition-all ${
        isEmergencyActive
          ? 'bg-gradient-to-br from-rose-950/80 via-red-900/60 to-rose-950/90 border-rose-700 text-white shadow-xl'
          : 'bg-gradient-to-br from-white via-slate-50 to-blue-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/20 border-slate-200/80 dark:border-slate-800 shadow-sm'
      }`}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="w-full lg:max-w-xl text-left space-y-3.5">
          {/* Status Badge */}
          {isEmergencyActive ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-600/30 border border-rose-400/50 text-rose-100 text-xs font-bold tracking-wide animate-pulse">
              <AlertOctagon className="w-4 h-4 text-rose-300" />
              <span>EMERGENCY DISPATCH ACTIVE</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
              <span>YOU&apos;RE SAFE • {safetyReadiness.score}% READINESS</span>
            </div>
          )}

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {greeting}, {firstName} 👋
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              {isEmergencyActive
                ? 'Your emergency protocol is active. Contacts have been dispatched your live GPS coordinates.'
                : 'CareX continuous fall monitoring, emergency contacts, and vital telemetry are standing by.'}
            </p>
          </div>

          {/* Reassurance Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-xs text-slate-700 dark:text-slate-300">
              <Users className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="truncate">{contacts.length} {contacts.length === 1 ? 'Contact' : 'Contacts'} Verified</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-xs text-slate-700 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
              <span className="truncate">{currentLocation?.city || 'GPS Active'}</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-xs text-slate-700 dark:text-slate-300">
              <Activity className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="truncate">Fall Sensor Standby</span>
            </div>
          </div>
        </div>

        {/* SOS Action Button */}
        <div className="w-full lg:w-auto flex flex-col items-center justify-center pt-2 lg:pt-0 self-center">
          <div className="relative flex items-center justify-center">
            {/* Subtle outer breathing ring */}
            <div className="absolute -inset-2 rounded-full border-2 border-rose-500/20 dark:border-rose-500/30 animate-pulse pointer-events-none" />

            <button
              onClick={() => triggerSosCountdown('manual_sos')}
              className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center p-2 text-white bg-gradient-to-tr from-rose-600 via-red-600 to-rose-500 hover:from-rose-500 hover:to-red-600 active:scale-95 transition-all shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 focus:outline-none focus:ring-4 focus:ring-rose-500/40 cursor-pointer group"
              aria-label="Activate Emergency SOS. Initiates automated countdown."
            >
              <span className="text-2xl sm:text-3xl mb-0.5 group-hover:scale-110 transition-transform">
                🚨
              </span>
              <span className="text-2xl sm:text-3xl font-black tracking-wider uppercase">
                SOS
              </span>
              <span className="text-[11px] font-semibold text-rose-100 tracking-wide mt-0.5">
                Press for Help
              </span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 mt-3 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Includes 3s cancellation window</span>
          </div>
        </div>
      </div>
    </div>
  );
};

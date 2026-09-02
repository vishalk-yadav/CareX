import React from 'react';
import {
  AlertTriangle,
  Radio,
  PhoneCall,
  Zap
} from 'lucide-react';
import { useCareX } from '../../context';
import { EmergencySafetyMode } from './EmergencySafetyMode';

export const EmergencyStandbyView: React.FC = () => {
  const {
    isEmergencyActive,
    triggerSosCountdown,
    forceImmediateSos,
    preferences,
    triggerFallSimulation,
    contacts
  } = useCareX();

  if (isEmergencyActive) {
    return <EmergencySafetyMode />;
  }

  const emgNumber = preferences.preferredEmergencyNumber || '112';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 text-white shadow-xl shadow-red-600/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
              Emergency SOS Command Hub
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Instant Safety Dispatch
            </h2>
            <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
              When activated, CareX starts an immediate countdown, captures your precise GPS coordinates, sends simulated automated notifications to your {contacts.length} verified contacts, and opens Emergency Safety Mode.
            </p>
          </div>

          <button
            onClick={() => triggerSosCountdown('manual_sos')}
            className="w-full md:w-auto px-8 py-5 rounded-2xl bg-white text-red-600 font-black text-lg shadow-2xl hover:bg-red-50 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-wider"
          >
            <AlertTriangle className="w-6 h-6 animate-bounce" />
            <span>TRIGGER SOS NOW</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-red-50 dark:bg-red-950/70 text-red-600 dark:text-red-400 flex items-center justify-center mb-3">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Instant SOS Bypass
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Skips the 3-second countdown and launches emergency protocol immediately.
            </p>
          </div>

          <button
            onClick={() => forceImmediateSos('manual_sos')}
            className="mt-6 w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/30 transition-all"
          >
            Launch Emergency Without Delay
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Fall Detection Test
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Simulates a sudden hard fall event with the 10-second interactive timer.
            </p>
          </div>

          <button
            onClick={triggerFallSimulation}
            className="mt-6 w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/30 transition-all"
          >
            Simulate Fall Event
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Dial Emergency Services
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Direct telephone line to your region's police, fire, or ambulance dispatch.
            </p>
          </div>

          <a
            href={`tel:${emgNumber}`}
            className="mt-6 w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-xs text-center shadow-md transition-all block"
          >
            Direct Call ({emgNumber})
          </a>
        </div>
      </div>
    </div>
  );
};


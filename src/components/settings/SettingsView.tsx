import React, { useState } from 'react';
import {
  Settings,
  Eye,
  Shield,
  RotateCcw,
  Check,
  PlayCircle
} from 'lucide-react';
import { useCareX } from '../../context';

export const SettingsView: React.FC = () => {
  const {
    accessibility,
    updateAccessibility,
    preferences,
    updatePreferences,
    resetAllToDefault,
    simulateAbnormalVitals,
    triggerFallSimulation,
    triggerSosCountdown
  } = useCareX();

  const [savedToast, setSavedToast] = useState<string | null>(null);

  const notifyChange = (msg: string) => {
    setSavedToast(msg);
    setTimeout(() => setSavedToast(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            CareX Settings & Accessibility Center
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize assistive controls, SOS safety thresholds, audio sirens, and evaluation simulators.
        </p>
      </div>

      {savedToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-600 text-white text-xs sm:text-sm font-semibold text-center shadow-md animate-fade-in flex items-center justify-center gap-2">
          <Check className="w-4 h-4" />
          <span>{savedToast}</span>
        </div>
      )}

      {/* 1. Accessibility Control Center */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <span>Accessibility Control Center</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Enhanced contrast, enlarged typography, and cognitive ergonomics.
            </p>
          </div>
          <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            WCAG 2.2 AA
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 cursor-pointer hover:border-blue-400 transition-colors">
            <input
              type="checkbox"
              checked={accessibility.largeText}
              onChange={(e) => {
                updateAccessibility({ largeText: e.target.checked });
                notifyChange('Large text mode updated');
              }}
              className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Large Text Mode
              </span>
              <span className="text-xs text-slate-500">
                Increases interface base font size from 16px to 18.5px for enhanced legibility.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 cursor-pointer hover:border-blue-400 transition-colors">
            <input
              type="checkbox"
              checked={accessibility.highContrast}
              onChange={(e) => {
                updateAccessibility({ highContrast: e.target.checked });
                notifyChange('High contrast mode updated');
              }}
              className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                High Contrast Mode
              </span>
              <span className="text-xs text-slate-500">
                Enhances stroke borders, text darks, and highlights key emergency elements.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 cursor-pointer hover:border-blue-400 transition-colors">
            <input
              type="checkbox"
              checked={accessibility.reducedMotion}
              onChange={(e) => {
                updateAccessibility({ reducedMotion: e.target.checked });
                notifyChange('Reduced motion mode updated');
              }}
              className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Reduced Motion
              </span>
              <span className="text-xs text-slate-500">
                Suppresses non-essential transitions and pulsing animations for vestibular sensitivity.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 cursor-pointer hover:border-blue-400 transition-colors">
            <input
              type="checkbox"
              checked={accessibility.simpleLanguage}
              onChange={(e) => {
                updateAccessibility({ simpleLanguage: e.target.checked });
                notifyChange('Simple language mode updated');
              }}
              className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Simple Plain Language
              </span>
              <span className="text-xs text-slate-500">
                Replaces complex medical jargon with accessible everyday phrasing.
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* 2. Emergency Preferences */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            <span>Emergency & SOS Protocol Preferences</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure countdown cancel periods, audio siren behaviors, and statutory numbers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
              SOS Countdown Duration
            </label>
            <select
              value={preferences.countdownDurationSeconds}
              onChange={(e) => {
                updatePreferences({ countdownDurationSeconds: Number(e.target.value) });
                notifyChange(`Countdown set to ${e.target.value} seconds`);
              }}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
            >
              <option value={3}>3 Seconds (Rapid Action)</option>
              <option value={5}>5 Seconds (Recommended Standard)</option>
              <option value={10}>10 Seconds (Extra Cancellation Buffer)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
              Statutory Emergency Number
            </label>
            <input
              type="text"
              value={preferences.preferredEmergencyNumber}
              onChange={(e) => {
                updatePreferences({ preferredEmergencyNumber: e.target.value });
                notifyChange(`Emergency dial number updated to ${e.target.value}`);
              }}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-bold"
              placeholder="e.g. 112 or 911"
            />
          </div>

          <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.sirenSoundEnabled}
              onChange={(e) => {
                updatePreferences({ sirenSoundEnabled: e.target.checked });
                notifyChange(e.target.checked ? 'Audio siren enabled' : 'Audio siren disabled');
              }}
              className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Audible Emergency Siren
              </span>
              <span className="text-xs text-slate-500">
                Plays high-frequency synthesized audio alert when SOS is triggered to draw bystander attention.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.enableFallDetection}
              onChange={(e) => {
                updatePreferences({ enableFallDetection: e.target.checked });
                notifyChange(e.target.checked ? 'Fall detector armed' : 'Fall detector disarmed');
              }}
              className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Fall Detection Sensor Monitor
              </span>
              <span className="text-xs text-slate-500">
                Monitors device accelerometer telemetry for impact shocks and opens automatic 10s countdown.
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* 3. Dedicated Hackathon Demo Simulation Center */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white to-blue-500/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/80 border-2 border-amber-500/40 shadow-md space-y-4">
        <div className="border-b border-amber-200 dark:border-amber-900/60 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Hackathon Evaluation & Demo Simulator
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-amber-500 text-white shadow-sm">
            Judges Panel
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300">
          Walk through the complete 10-step hackathon demo flow with 1-click trigger presets:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <button
            onClick={() => {
              simulateAbnormalVitals('high_hr');
              notifyChange('Simulated Elevated HR (112 BPM) & AI Tachycardia Alert');
            }}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-rose-500 text-left transition-all group shadow-sm"
          >
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 block group-hover:translate-x-1 transition-transform">
              1. Spike Heart Rate (112 BPM) →
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Triggers abnormal vitals & AI Health Insight card.
            </span>
          </button>

          <button
            onClick={triggerFallSimulation}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-500 text-left transition-all group shadow-sm"
          >
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block group-hover:translate-x-1 transition-transform">
              2. Simulate Fall Shock →
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Activates 10-second "Are You Okay?" fall prompt.
            </span>
          </button>

          <button
            onClick={() => triggerSosCountdown('manual_sos')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-red-500 text-left transition-all group shadow-sm"
          >
            <span className="text-xs font-bold text-red-600 dark:text-red-400 block group-hover:translate-x-1 transition-transform">
              3. Trigger Emergency SOS →
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Starts 3s countdown & launches Emergency Mode.
            </span>
          </button>
        </div>
      </div>

      {/* 4. Reset & Data Hygiene */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Reset Demo Environment
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Restores initial contacts, healthy baseline vitals, and clears incident logs.
          </p>
        </div>

        <button
          onClick={() => {
            resetAllToDefault();
            notifyChange('All settings and data reset to initial baseline.');
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset to Factory Defaults</span>
        </button>
      </div>
    </div>
  );
};


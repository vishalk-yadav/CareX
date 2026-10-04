import React, { useState } from 'react';
import {
  Settings,
  Eye,
  Shield,
  RotateCcw,
  Check,
  Cpu,
  ChevronDown,
  ChevronUp,
  FileCode,
  X
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
    triggerSosCountdown,
    lastDispatchedPayload
  } = useCareX();

  const [savedToast, setSavedToast] = useState<string | null>(null);
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);
  const [isPayloadModalOpen, setIsPayloadModalOpen] = useState(false);

  const notifyChange = (msg: string) => {
    setSavedToast(msg);
    setTimeout(() => setSavedToast(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              System Settings & Accessibility
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Configure assistive ergonomics, SOS dispatch rules, and emergency hardware triggers.
            </p>
          </div>
        </div>
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
              <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Accessibility & Ergonomics</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Adaptive contrast, typography scaling, and cognitive ergonomics compliant with WCAG 2.2 AA.
            </p>
          </div>
          <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            WCAG 2.2 AA
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
            <input
              type="checkbox"
              checked={accessibility.largeText}
              onChange={(e) => {
                updateAccessibility({ largeText: e.target.checked });
                notifyChange('Large text mode updated');
              }}
              className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Large Text Mode
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Increases interface base font size from 16px to 18.5px for enhanced legibility.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
            <input
              type="checkbox"
              checked={accessibility.highContrast}
              onChange={(e) => {
                updateAccessibility({ highContrast: e.target.checked });
                notifyChange('High contrast mode updated');
              }}
              className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                High Contrast Mode
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Enhances border strokes and color contrast for optimal readability in varying lighting.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
            <input
              type="checkbox"
              checked={accessibility.reducedMotion}
              onChange={(e) => {
                updateAccessibility({ reducedMotion: e.target.checked });
                notifyChange('Reduced motion mode updated');
              }}
              className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Reduced Motion
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Suppresses decorative transitions and pulsing animations for vestibular sensitivity.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
            <input
              type="checkbox"
              checked={accessibility.simpleLanguage}
              onChange={(e) => {
                updateAccessibility({ simpleLanguage: e.target.checked });
                notifyChange('Simple language mode updated');
              }}
              className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Simple Plain Language
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Replaces complex medical terminology with straightforward everyday language.
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* 2. Emergency Preferences */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <span>Emergency & SOS Protocol Preferences</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure countdown cancellation periods, audible siren alerts, and statutory emergency numbers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
              SOS Countdown Window
            </label>
            <select
              value={preferences.countdownDurationSeconds}
              onChange={(e) => {
                updatePreferences({ countdownDurationSeconds: Number(e.target.value) });
                notifyChange(`Countdown set to ${e.target.value} seconds`);
              }}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold cursor-pointer"
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
              className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Audible Emergency Siren
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
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
              className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Fall Detection Sensor Monitor
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Monitors device accelerometer telemetry for impact shocks and opens automatic 10s confirmation.
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* 3. Collapsible Diagnostics & Sensor Simulation */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <button
          onClick={() => setIsDiagnosticsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between text-left cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 transition-colors">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Hardware Sensor & Protocol Diagnostics
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Verify sensor shock triggers, biometric threshold alert events, and dispatch payloads
              </p>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-colors">
            {isDiagnosticsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isDiagnosticsOpen && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-fade-in">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Run manual sensor simulations to verify that alert modals, sound generators, and notification dispatches function properly on your hardware:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  simulateAbnormalVitals('high_hr');
                  notifyChange('Simulated Elevated HR (112 BPM) & Tachycardia Alert');
                }}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-rose-500 text-left transition-all cursor-pointer group shadow-sm"
              >
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 block group-hover:translate-x-0.5 transition-transform">
                  Test Tachycardia (112 BPM) →
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                  Triggers abnormal vital alert and Safety Intelligence card.
                </span>
              </button>

              <button
                onClick={triggerFallSimulation}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-amber-500 text-left transition-all cursor-pointer group shadow-sm"
              >
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block group-hover:translate-x-0.5 transition-transform">
                  Test Fall Impact Shock →
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                  Triggers automatic 10-second confirmation dialog.
                </span>
              </button>

              <button
                onClick={() => triggerSosCountdown('manual_sos')}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-red-500 text-left transition-all cursor-pointer group shadow-sm"
              >
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 block group-hover:translate-x-0.5 transition-transform">
                  Test SOS Activation →
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                  Initiates 3s emergency countdown and dispatch.
                </span>
              </button>
            </div>

            {lastDispatchedPayload && (
              <div className="pt-2">
                <button
                  onClick={() => setIsPayloadModalOpen(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <FileCode className="w-4 h-4 text-blue-500" />
                  <span>Inspect Dispatched Telemetry Payload</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Reset to Defaults */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Restore Baseline Settings
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Restores default contact list, baseline vitals, and clears local event caches.
          </p>
        </div>

        <button
          onClick={() => {
            resetAllToDefault();
            notifyChange('All settings and data reset to initial baseline.');
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Baseline</span>
        </button>
      </div>

      {/* Payload Modal */}
      {isPayloadModalOpen && lastDispatchedPayload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-blue-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Dispatched Emergency Payload
                </h3>
              </div>
              <button
                onClick={() => setIsPayloadModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 flex-1 overflow-auto bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs border border-slate-800">
              <pre>{JSON.stringify(lastDispatchedPayload, null, 2)}</pre>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsPayloadModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useMemo } from 'react';
import {
  Shield,
  Moon,
  Sun,
  AlertOctagon,
  Eye,
  Type,
  PhoneCall,
  Keyboard
} from 'lucide-react';
import { useCareX } from '../../context';

export const Header: React.FC = () => {
  const {
    theme,
    toggleTheme,
    isEmergencyActive,
    triggerSosCountdown,
    accessibility,
    updateAccessibility,
    demoMode,
    healthProfile,
    setIsKeyboardModalOpen
  } = useCareX();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-colors border-b backdrop-blur-md ${
        isEmergencyActive
          ? 'bg-red-950/90 border-red-800 text-white'
          : 'bg-white/85 dark:bg-slate-900/85 border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shadow-md transition-transform hover:scale-105 ${
              isEmergencyActive
                ? 'bg-red-600 text-white animate-sos-pulse'
                : 'bg-gradient-to-tr from-blue-600 to-teal-500 text-white shadow-blue-500/20'
            }`}
          >
            {isEmergencyActive ? (
              <AlertOctagon className="w-6 h-6 animate-spin-slow" />
            ) : (
              <Shield className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 dark:from-blue-400 dark:via-teal-300 dark:to-indigo-300 bg-clip-text text-transparent">
                CareX
              </span>
              {demoMode && (
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  Demo
                </span>
              )}
            </div>
            <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 font-medium">
              Smart Health & Emergency Companion
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {greeting}, <span className="font-semibold text-slate-800 dark:text-slate-200">{healthProfile.fullName.split(' ')[0]}</span> 👋
            </p>
            <div className="flex items-center justify-end gap-1.5 mt-0.5">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  isEmergencyActive ? 'bg-red-500 animate-ping' : 'bg-emerald-500 animate-safe-pulse'
                }`}
              />
              <span
                className={`text-xs font-bold tracking-wide uppercase ${
                  isEmergencyActive
                    ? 'text-red-500 dark:text-red-400'
                    : 'text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {isEmergencyActive ? '🚨 SOS ACTIVE' : '🟢 SAFE'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-xl p-1 border border-slate-200 dark:border-slate-700/60">
            <button
              onClick={() => updateAccessibility({ largeText: !accessibility.largeText })}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                accessibility.largeText
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title="Toggle Large Text Mode"
              aria-label="Toggle Large Text Mode"
            >
              <Type className="w-4 h-4" />
            </button>
            <button
              onClick={() => updateAccessibility({ highContrast: !accessibility.highContrast })}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                accessibility.highContrast
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title="Toggle High Contrast Mode"
              aria-label="Toggle High Contrast Mode"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsKeyboardModalOpen(true)}
              className="p-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              title="Keyboard Shortcuts (?)"
              aria-label="View Keyboard Shortcuts"
            >
              <Keyboard className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
          </button>

          {!isEmergencyActive ? (
            <button
              onClick={() => triggerSosCountdown('manual_sos')}
              className="relative group flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl sm:rounded-2xl font-bold text-sm tracking-wide shadow-lg shadow-red-500/30 hover:shadow-red-500/50 active:scale-95 transition-all focus:ring-4 focus:ring-red-500/40"
              aria-label="Emergency SOS - Press for Immediate Assistance"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <span className="hidden xs:inline">🚨</span>
              <span>SOS</span>
              <span className="hidden md:inline text-xs font-normal opacity-90">Help</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-black tracking-wider uppercase animate-bounce">
              <PhoneCall className="w-4 h-4" />
              <span>SOS ACTIVE</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

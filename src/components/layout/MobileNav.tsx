import React, { useState } from 'react';
import {
  LayoutDashboard,
  HeartPulse,
  Users,
  Menu,
  X,
  MapPin,
  FileHeart,
  Hospital,
  History,
  Settings,
  AlertTriangle
} from 'lucide-react';
import { useCareX } from '../../context';
import type { NavTab } from '../../types';

export const MobileNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isEmergencyActive,
    triggerSosCountdown
  } = useCareX();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabSelect = (tab: NavTab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-t-3xl p-5 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <span className="font-bold text-base text-slate-900 dark:text-white">
                All CareX Sections
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-4">
              <button
                onClick={() => handleTabSelect('location')}
                className={`p-3.5 rounded-2xl flex items-center gap-3 text-sm font-semibold border ${
                  activeTab === 'location'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                <MapPin className="w-5 h-5" />
                <span>Live Location</span>
              </button>

              <button
                onClick={() => handleTabSelect('profile')}
                className={`p-3.5 rounded-2xl flex items-center gap-3 text-sm font-semibold border ${
                  activeTab === 'profile'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                <FileHeart className="w-5 h-5" />
                <span>Health Profile</span>
              </button>

              <button
                onClick={() => handleTabSelect('services')}
                className={`p-3.5 rounded-2xl flex items-center gap-3 text-sm font-semibold border ${
                  activeTab === 'services'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Hospital className="w-5 h-5" />
                <span>Nearby Services</span>
              </button>

              <button
                onClick={() => handleTabSelect('history')}
                className={`p-3.5 rounded-2xl flex items-center gap-3 text-sm font-semibold border ${
                  activeTab === 'history'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                <History className="w-5 h-5" />
                <span>Emergency History</span>
              </button>

              <button
                onClick={() => handleTabSelect('settings')}
                className={`p-3.5 rounded-2xl flex items-center gap-3 text-sm font-semibold border col-span-2 ${
                  activeTab === 'settings'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Accessibility & Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <nav
        aria-label="Mobile Navigation"
        className={`fixed bottom-0 left-0 right-0 z-40 md:hidden border-t backdrop-blur-xl px-2 py-1.5 transition-colors ${
          isEmergencyActive
            ? 'bg-red-950/95 border-red-800 text-white'
            : 'bg-white/95 dark:bg-slate-900/95 border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-300'
        }`}
      >
        <div className="flex items-center justify-around">
          <button
            onClick={() => handleTabSelect('dashboard')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              activeTab === 'dashboard'
                ? 'text-blue-600 dark:text-blue-400 font-bold scale-105'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px]">Dashboard</span>
          </button>

          <button
            onClick={() => handleTabSelect('health')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              activeTab === 'health'
                ? 'text-blue-600 dark:text-blue-400 font-bold scale-105'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <HeartPulse className="w-5 h-5" />
            <span className="text-[10px]">Health</span>
          </button>

          <div className="-mt-6 flex flex-col items-center">
            <button
              onClick={() => {
                if (isEmergencyActive) {
                  setActiveTab('emergency');
                } else {
                  triggerSosCountdown('manual_sos');
                }
              }}
              className={`w-14 h-14 rounded-full flex flex-col items-center justify-center font-black text-white shadow-xl transition-all active:scale-95 ${
                isEmergencyActive
                  ? 'bg-red-600 animate-sos-pulse shadow-red-600/50'
                  : 'bg-gradient-to-tr from-red-600 to-rose-500 shadow-red-500/40 hover:scale-105'
              }`}
              aria-label="Emergency SOS trigger"
            >
              <AlertTriangle className="w-6 h-6" />
              <span className="text-[9px] tracking-wider uppercase font-extrabold">SOS</span>
            </button>
          </div>

          <button
            onClick={() => handleTabSelect('contacts')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              activeTab === 'contacts'
                ? 'text-blue-600 dark:text-blue-400 font-bold scale-105'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px]">Contacts</span>
          </button>

          <button
            onClick={() => setIsMenuOpen(true)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              isMenuOpen
                ? 'text-blue-600 dark:text-blue-400 font-bold'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px]">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};


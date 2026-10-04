import React from 'react';
import {
  LayoutDashboard,
  HeartPulse,
  AlertTriangle,
  Users,
  MapPin,
  FileHeart,
  Hospital,
  History,
  Settings,
  ShieldCheck,
  Bell,
  ChevronRight
} from 'lucide-react';
import { useCareX } from '../../context';
import type { NavTab } from '../../types';

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isBadgeDynamic?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'health', label: 'Health Vitals', icon: HeartPulse },
  { id: 'emergency', label: 'Emergency Center', icon: AlertTriangle, badge: 'SOS' },
  { id: 'contacts', label: 'Safety Contacts', icon: Users },
  { id: 'location', label: 'Live Location', icon: MapPin },
  { id: 'profile', label: 'Medical ID', icon: FileHeart },
  { id: 'services', label: 'Nearby Care', icon: Hospital },
  { id: 'history', label: 'Safety History', icon: History },
  { id: 'notifications', label: 'Notifications', icon: Bell, isBadgeDynamic: true },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isEmergencyActive,
    contacts,
    safetyReadiness,
    unreadNotificationCount
  } = useCareX();

  return (
    <aside className="w-64 flex-shrink-0 hidden md:flex flex-col justify-between border-r border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 min-h-[calc(100vh-5rem)]">
      <div className="space-y-1.5">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Navigation
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isSosItem = item.id === 'emergency';
          const dynamicBadge = item.isBadgeDynamic && unreadNotificationCount > 0 ? String(unreadNotificationCount) : item.badge;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all text-left cursor-pointer ${
                isActive
                  ? isSosItem && isEmergencyActive
                    ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-600/30'
                    : 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20'
                  : isSosItem && isEmergencyActive
                  ? 'bg-red-500/10 text-red-600 dark:text-red-400 font-bold animate-pulse'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110' : 'opacity-75'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {dynamicBadge && (
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-extrabold rounded-md uppercase tracking-wider ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : isSosItem && isEmergencyActive
                      ? 'bg-red-500 text-white animate-bounce'
                      : item.isBadgeDynamic
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-400'
                      : 'bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400'
                  }`}
                >
                  {dynamicBadge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Safety Readiness Status Footer */}
      <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <div
          onClick={() => {
            if (safetyReadiness.score < 100) {
              if (!safetyReadiness.contactsReady) setActiveTab('contacts');
              else if (!safetyReadiness.profileReady) setActiveTab('profile');
              else if (!safetyReadiness.locationReady) setActiveTab('location');
              else setActiveTab('health');
            }
          }}
          className={`p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-800/60 dark:to-slate-800/30 border border-slate-200/80 dark:border-slate-700/60 transition-colors ${
            safetyReadiness.score < 100 ? 'cursor-pointer hover:border-blue-300 dark:hover:border-blue-700' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
              <ShieldCheck className={`w-4 h-4 ${safetyReadiness.score === 100 ? 'text-emerald-500' : 'text-blue-500'}`} />
              <span>Safety Readiness</span>
            </div>
            <span className={`text-xs font-bold font-mono ${safetyReadiness.score === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
              {safetyReadiness.score}%
            </span>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {contacts.length} {contacts.length === 1 ? 'Contact' : 'Contacts'} • {safetyReadiness.locationReady ? 'GPS Active' : 'Locating...'}
          </p>

          <div className="mt-2.5 w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${safetyReadiness.score === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
              style={{ width: `${safetyReadiness.score}%` }}
            />
          </div>

          {safetyReadiness.score < 100 && (
            <div className="flex items-center justify-between text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-2">
              <span>Complete safety profile</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

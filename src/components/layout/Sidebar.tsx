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
  ChevronRight,
  Radio
} from 'lucide-react';
import { useCareX } from '../../context';
import type { NavTab } from '../../types';

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'health', label: 'Health Monitoring', icon: HeartPulse },
  { id: 'emergency', label: 'Emergency / SOS', icon: AlertTriangle, badge: 'SOS' },
  { id: 'contacts', label: 'Emergency Contacts', icon: Users },
  { id: 'location', label: 'Live Location', icon: MapPin },
  { id: 'profile', label: 'Health Profile', icon: FileHeart },
  { id: 'services', label: 'Nearby Services', icon: Hospital },
  { id: 'history', label: 'Emergency History', icon: History },
  { id: 'settings', label: 'Settings & A11y', icon: Settings }
];

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isEmergencyActive,
    contacts,
    triggerFallSimulation
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

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all text-left ${
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

              {item.badge && (
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-extrabold rounded-md uppercase tracking-wider ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : isEmergencyActive
                      ? 'bg-red-500 text-white animate-bounce'
                      : 'bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-800/60 dark:to-slate-800/30 border border-slate-200/80 dark:border-slate-700/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Emergency Ready</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {contacts.length} Contacts active • GPS tracking active
          </p>
          <div className="mt-2.5 w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[94%]" />
          </div>
        </div>

        <button
          onClick={triggerFallSimulation}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/20 transition-all"
          title="Simulate sudden fall detection"
        >
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 animate-pulse text-amber-500" />
            <span>Simulate Fall</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
        </button>
      </div>
    </aside>
  );
};


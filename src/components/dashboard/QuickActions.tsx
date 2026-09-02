import React, { useState } from 'react';
import {
  PhoneCall,
  Share2,
  Activity,
  Hospital,
  Check
} from 'lucide-react';
import { useCareX } from '../../context';
import { shareLocation } from '../../services/geoService';

export const QuickActions: React.FC = () => {
  const {
    contacts,
    currentLocation,
    healthProfile,
    setActiveTab,
    triggerFallSimulation
  } = useCareX();

  const [shareSuccess, setShareSuccess] = useState(false);

  const primaryContact = contacts.find((c) => c.priority === 'primary') || contacts[0];

  const handleShare = async () => {
    if (!currentLocation) return;
    const res = await shareLocation(currentLocation, healthProfile.fullName);
    if (res.success) {
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
        Quick Actions & Safety Controls
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {primaryContact && (
          <a
            href={`tel:${primaryContact.phone}`}
            className="flex flex-col items-center justify-center text-center p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Call {primaryContact.name.split(' ')[0]}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">Primary Contact</span>
          </a>
        )}

        <button
          onClick={handleShare}
          className="flex flex-col items-center justify-center text-center p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            {shareSuccess ? <Check className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {shareSuccess ? 'Location Copied!' : 'Share Location'}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5">GPS Coordinates</span>
        </button>

        <button
          onClick={triggerFallSimulation}
          className="flex flex-col items-center justify-center text-center p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-amber-500 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Test Fall Alert
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5">Prototype Sensor</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className="flex flex-col items-center justify-center text-center p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-rose-500 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="w-11 h-11 rounded-2xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Hospital className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Nearby Care
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5">Hospitals & Trauma</span>
        </button>
      </div>
    </div>
  );
};


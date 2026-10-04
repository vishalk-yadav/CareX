import React, { useState } from 'react';
import {
  PhoneCall,
  Share2,
  PlusCircle,
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
    setActiveTab
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
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Quick Actions
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          One-tap emergency & health shortcuts
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {primaryContact ? (
          <a
            href={`tel:${primaryContact.phone}`}
            className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-full px-1">
              Call {primaryContact.name.split(' ')[0]}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">Primary Contact</span>
          </a>
        ) : (
          <button
            onClick={() => setActiveTab('contacts')}
            className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 shadow-sm transition-all group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mb-2">
              <PhoneCall className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Add Contact
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">No primary set</span>
          </button>
        )}

        <button
          onClick={handleShare}
          className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-sky-500 shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-2xl bg-sky-50 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            {shareSuccess ? <Check className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {shareSuccess ? 'Location Copied!' : 'Share Live GPS'}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5">Coordinates Link</span>
        </button>

        <button
          onClick={() => setActiveTab('health')}
          className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Log Vital Reading
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5">Heart, SpO₂, BP</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Hospital className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Nearby Emergency Care
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5">Hospitals & Trauma</span>
        </button>
      </div>
    </div>
  );
};

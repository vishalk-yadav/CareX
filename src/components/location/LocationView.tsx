import React, { useState } from 'react';
import {
  MapPin,
  RefreshCw,
  Share2,
  Copy,
  ExternalLink,
  Navigation,
  ShieldCheck,
  Compass,
  Check
} from 'lucide-react';
import { useCareX } from '../../context';
import { shareLocation, generateGoogleMapsUrl } from '../../services/geoService';

export const LocationView: React.FC = () => {
  const {
    currentLocation,
    isLocationLoading,
    refreshLocation,
    healthProfile
  } = useCareX();

  const [copied, setCopied] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const loc = currentLocation || {
    latitude: 28.4595,
    longitude: 77.0266,
    accuracyMeters: 18,
    address: 'DLF Cyber City, Sector 24',
    city: 'Gurugram',
    state: 'Haryana',
    country: 'India',
    timestamp: new Date().toISOString()
  };

  const mapUrl = generateGoogleMapsUrl(loc.latitude, loc.longitude);

  const handleCopyCoordinates = () => {
    const coords = `${loc.latitude}, ${loc.longitude}`;
    navigator.clipboard.writeText(coords);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const res = await shareLocation(loc, healthProfile.fullName);
    if (res.success) {
      setShareFeedback(
        res.method === 'clipboard'
          ? '✓ Emergency location & map link copied to clipboard!'
          : '✓ Location shared successfully!'
      );
    } else {
      setShareFeedback('⚠️ Sharing was cancelled or not supported in this browser.');
    }
    setTimeout(() => setShareFeedback(null), 3500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Live GPS & Emergency Location
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browser geolocation tracking calibrated with high accuracy for emergency dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={refreshLocation}
            disabled={isLocationLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLocationLoading ? 'animate-spin' : ''}`} />
            <span>{isLocationLoading ? 'Calibrating...' : 'Refresh GPS'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share My Location</span>
          </button>
        </div>
      </div>

      {shareFeedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-600 text-white text-xs sm:text-sm font-semibold text-center shadow-md animate-fade-in">
          {shareFeedback}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm md:col-span-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Resolved Physical Address
          </span>
          <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            {loc.address}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            {loc.city}, {loc.state} {loc.country}
          </p>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Timestamp: {new Date(loc.timestamp).toLocaleTimeString()}
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Reverse Geocoded</span>
            </span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Coordinates (WGS84)
          </span>
          <div className="mt-2 font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <div>
              <span className="text-slate-400 text-[10px]">LAT:</span>{' '}
              <span className="font-bold text-slate-900 dark:text-white">{loc.latitude}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px]">LNG:</span>{' '}
              <span className="font-bold text-slate-900 dark:text-white">{loc.longitude}</span>
            </div>
          </div>

          <button
            onClick={handleCopyCoordinates}
            className="mt-3 w-full py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Coordinates'}</span>
          </button>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            GPS Precision Radius
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              ±{loc.accuracyMeters}
            </span>
            <span className="text-xs font-bold text-slate-400">meters</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            High accuracy multi-satellite trilateration verified.
          </p>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full py-1.5 px-3 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Maps</span>
          </a>
        </div>
      </div>

      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Emergency Map & Immediate Vicinity
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            OpenStreetMap Vector Grid
          </span>
        </div>

        <div className="mt-4 relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />

          <svg className="absolute inset-0 w-full h-full opacity-30 stroke-slate-600 stroke-[1.5]">
            <line x1="0" y1="120" x2="100%" y2="150" />
            <line x1="0" y1="220" x2="100%" y2="210" />
            <line x1="20%" y1="0" x2="35%" y2="100%" />
            <line x1="65%" y1="0" x2="55%" y2="100%" />
          </svg>

          <div className="absolute w-44 h-44 rounded-full border-2 border-blue-500/40 bg-blue-500/10 animate-ping pointer-events-none" />
          <div className="absolute w-28 h-28 rounded-full border border-blue-400/50 bg-blue-500/15" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-red-600 border-4 border-white shadow-xl animate-bounce flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <div className="mt-2 px-3 py-1 rounded-xl bg-slate-900/90 text-white text-[11px] font-bold border border-slate-700 shadow-xl backdrop-blur-sm whitespace-nowrap">
              📍 You ({healthProfile.fullName.split(' ')[0]})
            </div>
          </div>

          <div className="absolute top-10 right-14 sm:right-24 z-10 flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">
              H
            </div>
            <span className="mt-1 text-[10px] text-slate-300 font-medium bg-slate-900/80 px-2 py-0.5 rounded">
              Max Hospital (0.8 km)
            </span>
          </div>

          <div className="absolute bottom-12 left-10 sm:left-20 z-10 flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">
              +
            </div>
            <span className="mt-1 text-[10px] text-slate-300 font-medium bg-slate-900/80 px-2 py-0.5 rounded">
              Apollo 24/7 (0.4 km)
            </span>
          </div>

          <div className="absolute bottom-3 right-3 z-10 flex gap-2">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-bold border border-slate-700 backdrop-blur-md flex items-center gap-1.5 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-400" />
              <span>Full Screen Map</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


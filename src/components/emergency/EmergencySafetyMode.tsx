import React, { useState, useEffect } from 'react';
import {
  AlertOctagon,
  PhoneCall,
  Share2,
  CheckCircle,
  XCircle,
  MapPin,
  Heart,
  Volume2,
  VolumeX,
  Clock,
  Terminal,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useCareX } from '../../context';
import { shareLocation, generateGoogleMapsUrl } from '../../services/geoService';
import { PayloadInspectorModal } from './PayloadInspectorModal';

export const EmergencySafetyMode: React.FC = () => {
  const {
    activeEmergency,
    resolveActiveEmergency,
    isSirenMuted,
    toggleSirenMute,
    healthProfile,
    preferences,
    currentLocation
  } = useCareX();

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [resolveNotes, setResolveNotes] = useState('Patient is safe and stable. Emergency alert resolved.');
  const [isPayloadModalOpen, setIsPayloadModalOpen] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Live timer for active alert
  useEffect(() => {
    if (!activeEmergency) return;
    const startMs = new Date(activeEmergency.timestamp).getTime();
    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((Date.now() - startMs) / 1000));
      setElapsedSeconds(diff);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeEmergency]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const loc = activeEmergency?.location || currentLocation || {
    latitude: 28.4595,
    longitude: 77.0266,
    accuracyMeters: 18,
    address: 'DLF Cyber City, Sector 24',
    city: 'Gurugram',
    state: 'Haryana',
    country: 'India',
    timestamp: new Date().toISOString()
  };

  const handleShareLocation = async () => {
    const res = await shareLocation(loc, healthProfile.fullName);
    if (res.success) {
      setShareToast(res.method === 'clipboard' ? '✓ Coordinates & Maps link copied to clipboard!' : '✓ Location shared via system dialog!');
    } else {
      setShareToast('⚠️ Unable to share location. Please copy link manually.');
    }
    setTimeout(() => setShareToast(null), 3500);
  };

  const mapUrl = generateGoogleMapsUrl(loc.latitude, loc.longitude);
  const emgNumber = preferences.preferredEmergencyNumber || '112';

  return (
    <div className="relative min-h-[calc(100vh-6rem)] py-6 px-4 sm:px-6 lg:px-8 bg-red-950/20 rounded-3xl border-2 border-red-500/40 p-4 sm:p-6 shadow-2xl animate-fade-in">
      {/* Flashing Top Alert Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-red-600 text-white shadow-xl shadow-red-600/30">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/20 rounded-2xl animate-sos-pulse">
            <AlertOctagon className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight uppercase">
                🚨 SOS ACTIVE
              </span>
              <span className="px-2 py-0.5 text-[11px] font-extrabold uppercase bg-white text-red-700 rounded-md tracking-wider">
                Live Alert
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-red-100 mt-0.5">
              Emergency assistance activated • Dispatching location & vital signs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Siren Mute Toggle */}
          <button
            onClick={toggleSirenMute}
            className={`p-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all ${
              isSirenMuted
                ? 'bg-red-800 text-red-200 hover:bg-red-700'
                : 'bg-white text-red-600 shadow-md hover:bg-red-50'
            }`}
            title={isSirenMuted ? 'Unmute Emergency Siren' : 'Mute Emergency Siren'}
          >
            {isSirenMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-bounce" />}
            <span className="hidden xs:inline">{isSirenMuted ? 'Muted' : 'Siren On'}</span>
          </button>

          {/* Active Duration Counter */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 border border-white/20 font-mono text-sm sm:text-base font-bold text-white">
            <Clock className="w-4 h-4 text-red-300" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>
        </div>
      </div>

      {shareToast && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-semibold text-center shadow-lg animate-fade-in">
          {shareToast}
        </div>
      )}

      {/* Main Grid: Location, Health, Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
        {/* Card 1: Live Location */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <MapPin className="w-5 h-5 text-red-600" />
              <span>Current GPS Location</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              GPS ±{loc.accuracyMeters}m
            </span>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Street Address</p>
              <p className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                {loc.address}
              </p>
              <p className="text-xs text-slate-500">
                {loc.city}, {loc.state} {loc.country}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 font-mono text-xs text-slate-600 dark:text-slate-300 grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-400 block text-[10px]">LATITUDE</span>
                <span className="font-bold">{loc.latitude}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">LONGITUDE</span>
                <span className="font-bold">{loc.longitude}</span>
              </div>
            </div>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>

        {/* Card 2: Health Snapshot */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <Heart className="w-5 h-5 text-rose-500 animate-pulse" />
              <span>Vitals Snapshot</span>
            </div>
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full">
              Live Telemetry
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
              <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 block">
                Heart Rate
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {activeEmergency?.healthSnapshot.heartRate || 112}
                </span>
                <span className="text-xs font-bold text-rose-500">BPM</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
              <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 block">
                Oxygen (SpO₂)
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {activeEmergency?.healthSnapshot.spo2 || 98}
                </span>
                <span className="text-xs font-bold text-blue-500">%</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
              <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 block">
                Blood Pressure
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {activeEmergency?.healthSnapshot.bloodPressure || '120/80'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
              <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 block">
                Temperature
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {activeEmergency?.healthSnapshot.temperature || 98.4}
                </span>
                <span className="text-xs font-bold text-amber-500">°F</span>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-[11px] text-slate-500">
            Blood Type: <strong className="text-slate-800 dark:text-slate-200">{healthProfile.bloodGroup}</strong> • Allergies: <strong className="text-slate-800 dark:text-slate-200">{healthProfile.allergies}</strong>
          </div>
        </div>

        {/* Card 3: Emergency Contacts Notification Status */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>Contact Dispatch</span>
            </div>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
              Demo Gateways
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            {activeEmergency?.contactsNotified.map((log) => (
              <div
                key={log.contactId}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {log.name}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-slate-400">
                      ({log.priority})
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{log.phone}</p>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Notified</span>
                  </span>
                  <span className="block text-[10px] text-slate-400">{log.sentAt}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsPayloadModalOpen(true)}
            className="w-full mt-3 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Inspect Dispatch Payload (JSON)</span>
          </button>
        </div>
      </div>

      {/* Main Action Command Strip */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* 1. Call Emergency Services */}
        <a
          href={`tel:${emgNumber}`}
          className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-base shadow-xl shadow-red-600/40 active:scale-95 transition-all text-center"
        >
          <PhoneCall className="w-6 h-6 animate-pulse" />
          <span>CALL EMERGENCY ({emgNumber})</span>
        </a>

        {/* 2. Share Live Location */}
        <button
          onClick={handleShareLocation}
          className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-xl shadow-blue-600/30 active:scale-95 transition-all"
        >
          <Share2 className="w-5 h-5" />
          <span>SHARE LIVE LOCATION</span>
        </button>

        {/* 3. Resolve / Cancel Emergency */}
        <button
          onClick={() => setShowResolveModal(true)}
          className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-base shadow-lg active:scale-95 transition-all"
        >
          <XCircle className="w-5 h-5 text-red-400" />
          <span>RESOLVE / CANCEL</span>
        </button>
      </div>

      {/* Resolve Confirmation Modal */}
      {showResolveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Resolve Active Emergency
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Please confirm that you are safe. This will log the event into your Emergency History.
            </p>

            <div className="mt-4 text-left">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Resolution Notes:
              </label>
              <textarea
                value={resolveNotes}
                onChange={(e) => setResolveNotes(e.target.value)}
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowResolveModal(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
              >
                Keep Active
              </button>
              <button
                onClick={() => {
                  setShowResolveModal(false);
                  resolveActiveEmergency(resolveNotes);
                }}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-colors"
              >
                Confirm Safe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inspect Payload Modal */}
      <PayloadInspectorModal
        isOpen={isPayloadModalOpen}
        onClose={() => setIsPayloadModalOpen(false)}
      />
    </div>
  );
};


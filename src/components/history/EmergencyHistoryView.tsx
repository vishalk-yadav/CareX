import React, { useState } from 'react';
import {
  History,
  MapPin,
  Heart,
  Users,
  CheckCircle2,
  Download,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useCareX } from '../../context';

export const EmergencyHistoryView: React.FC = () => {
  const { emergencyHistory, clearHistory } = useCareX();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(emergencyHistory, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `carex-emergency-history-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Emergency Incident History
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Complete audit trail of all manual and automated SOS dispatches, telemetries, and resolutions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {emergencyHistory.length > 0 && (
            <>
              <button
                onClick={handleExportJson}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold transition-colors"
                title="Export complete incident log as JSON"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON</span>
              </button>

              <button
                onClick={clearHistory}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-xs font-bold transition-colors"
                title="Clear incident logs"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear Logs</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* History List */}
      {emergencyHistory.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            No Emergency Incidents Recorded
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Your safety log is completely clear. Any future emergency activations or fall detection alerts will be cataloged here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {emergencyHistory.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-blue-600 dark:text-blue-400">
                        {item.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                        {item.status}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        Trigger: {item.trigger.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {new Date(item.timestamp).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}{' '}
                      at {new Date(item.timestamp).toLocaleTimeString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right text-xs">
                      <span className="text-slate-400 block text-[10px]">DURATION</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {formatDuration(item.durationSeconds)}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                      aria-label="View incident details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                        <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
                          <MapPin className="w-3.5 h-3.5 text-red-500" />
                          <span>Dispatched Location</span>
                        </span>
                        <p className="text-slate-900 dark:text-white font-medium">
                          {item.location.address}
                        </p>
                        <p className="font-mono text-[11px] text-slate-500 mt-0.5">
                          {item.location.latitude}, {item.location.longitude} (±{item.location.accuracyMeters}m)
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                        <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
                          <Heart className="w-3.5 h-3.5 text-rose-500" />
                          <span>Vitals at Alert Time</span>
                        </span>
                        <p className="text-slate-900 dark:text-white font-medium">
                          Heart Rate: <strong>{item.healthSnapshot.heartRate} BPM</strong>
                        </p>
                        <p className="text-slate-500 mt-0.5">
                          SpO₂: {item.healthSnapshot.spo2}% • BP: {item.healthSnapshot.bloodPressure}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                        <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
                          <Users className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Contacts Notified</span>
                        </span>
                        <div className="space-y-1">
                          {item.contactsNotified.map((c) => (
                            <div key={c.contactId} className="flex justify-between text-[11px]">
                              <span>{c.name} ({c.priority})</span>
                              <span className="text-emerald-600 font-semibold">✓ {c.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {item.notes && (
                      <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 text-slate-700 dark:text-slate-300">
                        <strong className="text-blue-700 dark:text-blue-400">Resolution Notes: </strong>
                        {item.notes}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};


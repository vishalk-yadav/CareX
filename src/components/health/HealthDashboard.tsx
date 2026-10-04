import React, { useState } from 'react';
import {
  Plus,
  TrendingUp,
  HeartPulse,
  RotateCcw,
  PlusCircle,
  X
} from 'lucide-react';
import { useCareX } from '../../context';
import { VitalsChart } from './VitalsChart';
import type { HealthMetric } from '../../types';

export const HealthDashboard: React.FC = () => {
  const {
    healthMetrics,
    updateSingleMetric,
    simulateAbnormalVitals
  } = useCareX();

  const [timeframe, setTimeframe] = useState<'today' | '7days' | '30days'>('today');
  const [selectedMetricId, setSelectedMetricId] = useState<string>('metric-hr');
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  const [manualType, setManualType] = useState<HealthMetric['type']>('heartRate');
  const [manualVal, setManualVal] = useState('');

  const selectedMetric = healthMetrics.find((m) => m.id === selectedMetricId) || healthMetrics[0];

  const getChartData = (metric: HealthMetric) => {
    switch (timeframe) {
      case 'today':
        return metric.historyToday;
      case '7days':
        return metric.history7Days;
      case '30days':
        return metric.history30Days;
    }
  };

  const getMetricColor = (type: HealthMetric['type']) => {
    switch (type) {
      case 'heartRate':
        return '#f43f5e';
      case 'spo2':
        return '#3b82f6';
      case 'temperature':
        return '#f59e0b';
      case 'bloodPressure':
        return '#8b5cf6';
    }
  };

  const handleManualSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualVal) return;
    updateSingleMetric(manualType, manualType === 'bloodPressure' ? manualVal : Number(manualVal));
    setIsManualModalOpen(false);
    setManualVal('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Health Vitals & Physiological Telemetry
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Continuous biometric monitoring, trend analysis, and vital anomaly tracking
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => simulateAbnormalVitals('normal')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            title="Restore readings to standard personal baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>

          <button
            onClick={() => setIsManualModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Log Vital Reading</span>
          </button>
        </div>
      </div>

      {/* Grid of 4 Health Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric) => {
          const isSelected = selectedMetric.id === metric.id;
          const isEmpty = metric.hasData === false || metric.value === '--';

          return (
            <div
              key={metric.id}
              onClick={() => setSelectedMetricId(metric.id)}
              className={`cursor-pointer p-5 rounded-3xl transition-all border ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-blue-600 dark:border-blue-500 shadow-lg ring-2 ring-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {metric.label}
                </span>
                {isEmpty ? (
                  <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    Unrecorded
                  </span>
                ) : (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full ${
                      metric.status === 'normal'
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400'
                        : metric.status === 'warning'
                        ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 animate-pulse'
                        : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 animate-pulse'
                    }`}
                  >
                    {metric.status}
                  </span>
                )}
              </div>

              {isEmpty ? (
                <div className="mt-3">
                  <span className="text-3xl font-bold text-slate-300 dark:text-slate-600 tracking-tight">
                    --
                  </span>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                    No recent reading recorded
                  </p>
                </div>
              ) : (
                <div className="mt-3">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      {metric.value}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{metric.unit}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                    {metric.rangeDescription}
                  </p>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>{isEmpty ? 'Standby' : `Updated: ${metric.lastUpdated}`}</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {isSelected ? 'Viewing' : 'Tap to graph'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Interactive Trend Graph Section */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {selectedMetric.label} Trends & History
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Historical readings and physiological fluctuation analysis
            </p>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700/60">
            <button
              onClick={() => setTimeframe('today')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                timeframe === 'today'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeframe('7days')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                timeframe === '7days'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeframe('30days')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                timeframe === '30days'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              30 Days
            </button>
          </div>
        </div>

        <div className="mt-6">
          <VitalsChart
            data={getChartData(selectedMetric)}
            color={getMetricColor(selectedMetric.type)}
            unit={selectedMetric.unit}
            title={selectedMetric.label}
          />
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Recorded an external cuff, oximeter, or thermometer measurement?
          </span>

          <button
            onClick={() => setIsManualModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Log Measurement</span>
          </button>
        </div>
      </div>

      {/* Manual Measurement Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Log Health Measurement
              </h3>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Add a manual reading from your blood pressure monitor, pulse oximeter, or thermometer.
            </p>

            <form onSubmit={handleManualSave} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                  Metric Type
                </label>
                <select
                  value={manualType}
                  onChange={(e) => setManualType(e.target.value as HealthMetric['type'])}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="heartRate">Heart Rate (BPM)</option>
                  <option value="spo2">Blood Oxygen (SpO₂ %)</option>
                  <option value="temperature">Body Temperature (°F)</option>
                  <option value="bloodPressure">Blood Pressure (mmHg, e.g. 120/80)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                  Measurement Value
                </label>
                <input
                  type={manualType === 'bloodPressure' ? 'text' : 'number'}
                  placeholder={manualType === 'bloodPressure' ? '120/80' : 'e.g. 78'}
                  value={manualVal}
                  onChange={(e) => setManualVal(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
                >
                  Save Reading
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

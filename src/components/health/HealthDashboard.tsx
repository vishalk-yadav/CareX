import React, { useState } from 'react';
import {
  Plus,
  Info,
  TrendingUp
} from 'lucide-react';
import { useCareX } from '../../context';
import { VitalsChart } from './VitalsChart';
import type { HealthMetric } from '../../types';

export const HealthDashboard: React.FC = () => {
  const {
    healthMetrics,
    simulateAbnormalVitals,
    updateSingleMetric
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
      {/* Top Banner */}
      <div className="p-4 rounded-3xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-blue-600 text-white">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                Demo Health Data Active
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
                Prototype Telemetry
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Readings are synthesized to demonstrate realtime health analysis & AI risk detection.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => simulateAbnormalVitals('high_hr')}
            className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-900 transition-colors"
          >
            ⚡ HR 112 BPM
          </button>
          <button
            onClick={() => simulateAbnormalVitals('low_spo2')}
            className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-900 transition-colors"
          >
            ⚡ SpO₂ 91%
          </button>
          <button
            onClick={() => simulateAbnormalVitals('normal')}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-900 transition-colors"
          >
            ✓ Reset Normal
          </button>
        </div>
      </div>

      {/* Grid of 4 Health Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric) => {
          const isSelected = selectedMetric.id === metric.id;
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
                <span
                  className={`px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full ${
                    metric.status === 'normal'
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400'
                      : metric.status === 'warning'
                      ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 animate-pulse'
                      : 'bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-400 animate-bounce'
                  }`}
                >
                  {metric.status}
                </span>
              </div>

              <div className="flex items-baseline gap-1.5 mt-3">
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {metric.value}
                </span>
                <span className="text-xs font-bold text-slate-400">{metric.unit}</span>
              </div>

              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                {metric.rangeDescription}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Updated: {metric.lastUpdated}</span>
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
              <TrendingUp className="w-5 h-5 text-blue-600" />
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
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeframe === 'today'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeframe('7days')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeframe === '7days'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeframe('30days')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeframe === '30days'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
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
          <span className="text-xs text-slate-500">
            Need to record an external cuff or finger-pulse reading?
          </span>

          <button
            onClick={() => setIsManualModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Log Manual Reading</span>
          </button>
        </div>
      </div>

      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Log Health Measurement
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Add a manual measurement from your blood pressure monitor, pulse oximeter, or thermometer.
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
                  Value
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
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-colors"
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


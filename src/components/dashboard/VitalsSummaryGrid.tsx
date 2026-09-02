import React from 'react';
import {
  Heart,
  Wind,
  Thermometer,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { useCareX } from '../../context';
import type { HealthMetric } from '../../types';

export const VitalsSummaryGrid: React.FC = () => {
  const { healthMetrics, setActiveTab, demoMode } = useCareX();

  const getMetricIcon = (type: HealthMetric['type']) => {
    switch (type) {
      case 'heartRate':
        return <Heart className="w-5 h-5 text-rose-500" />;
      case 'spo2':
        return <Wind className="w-5 h-5 text-blue-500" />;
      case 'temperature':
        return <Thermometer className="w-5 h-5 text-amber-500" />;
      case 'bloodPressure':
        return <Activity className="w-5 h-5 text-purple-500" />;
    }
  };

  const getStatusBadge = (status: HealthMetric['status']) => {
    switch (status) {
      case 'normal':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
            Normal
          </span>
        );
      case 'warning':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800 animate-pulse">
            Warning
          </span>
        );
      case 'critical':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-800 animate-bounce">
            Critical
          </span>
        );
    }
  };

  const getTrendIcon = (trend: HealthMetric['trend']) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-3.5 h-3.5 text-amber-500" />;
      case 'down':
        return <ArrowDownRight className="w-3.5 h-3.5 text-blue-500" />;
      default:
        return <Minus className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Health Monitoring
          </h2>
          {demoMode && (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
              (Simulated Telemetry)
            </span>
          )}
        </div>
        <button
          onClick={() => setActiveTab('health')}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          View Detailed Trends →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric) => (
          <div
            key={metric.id}
            onClick={() => setActiveTab('health')}
            className="cursor-pointer group p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 group-hover:scale-105 transition-transform">
                {getMetricIcon(metric.type)}
              </div>
              {getStatusBadge(metric.status)}
            </div>

            <div className="mt-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {metric.label}
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {metric.value}
                </span>
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                  {metric.unit}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1 font-medium">
                {getTrendIcon(metric.trend)}
                <span>Trend: {metric.trend}</span>
              </div>
              <span>{metric.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


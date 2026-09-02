import React from 'react';
import {
  Bot,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Phone
} from 'lucide-react';
import { useCareX } from '../../context';

export const AIInsightCard: React.FC = () => {
  const { aiInsight, setActiveTab, contacts } = useCareX();

  const doctor = contacts.find((c) => c.priority === 'doctor') || contacts[0];

  const getRiskBadge = (level: typeof aiInsight.riskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return (
          <span className="px-3 py-1 rounded-full bg-red-500 text-white font-black text-xs uppercase tracking-wider animate-bounce">
            CRITICAL RISK
          </span>
        );
      case 'HIGH':
        return (
          <span className="px-3 py-1 rounded-full bg-rose-500 text-white font-extrabold text-xs uppercase tracking-wider animate-pulse">
            HIGH RISK
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-bold text-xs uppercase tracking-wider">
            MEDIUM RISK
          </span>
        );
      case 'LOW':
      default:
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider">
            LOW RISK • STABLE
          </span>
        );
    }
  };

  const isAlert = aiInsight.riskLevel !== 'LOW';

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 border transition-all ${
        isAlert
          ? 'bg-gradient-to-br from-amber-50/70 via-white to-rose-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20 border-amber-300 dark:border-amber-800 shadow-md'
          : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-sm'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2.5 rounded-2xl ${
              isAlert ? 'bg-amber-500 text-white' : 'bg-blue-600 text-white'
            }`}
          >
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                AI Health Insight
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                Informational
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personal health baseline pattern evaluation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {getRiskBadge(aiInsight.riskLevel)}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {isAlert ? (
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            )}
            <span>{aiInsight.title}</span>
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {aiInsight.reason}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide block">
            Recommended Action:
          </span>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
            {aiInsight.recommendedAction}
          </p>
        </div>

        {aiInsight.metricsImpacted.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 font-semibold">Metrics Analyzed:</span>
            {aiInsight.metricsImpacted.map((m, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
              >
                {m}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('health')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
          >
            <span>Review Health Data</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {doctor && (
            <a
              href={`tel:${doctor.phone}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-500" />
              <span>Contact {doctor.name}</span>
            </a>
          )}
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400 dark:text-slate-500 italic">
          ⚠️ AI-generated health insights are informational and are not a medical diagnosis. In critical situations, contact emergency services directly.
        </div>
      </div>
    </div>
  );
};


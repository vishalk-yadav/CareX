import React from 'react';
import { useCareX } from '../../context';
import { CheckCircle2, AlertTriangle, AlertOctagon, Info, X } from 'lucide-react';
import type { ToastType } from '../../types';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCareX();

  if (toasts.length === 0) return null;

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />;
      case 'error':
        return <AlertOctagon className="w-4 h-4 text-red-500 flex-shrink-0" />;
      case 'info':
      default:
        return <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />;
    }
  };

  const getStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'border-emerald-500/30 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white shadow-emerald-500/10';
      case 'warning':
        return 'border-amber-500/30 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white shadow-amber-500/10';
      case 'error':
        return 'border-red-500/40 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white shadow-red-500/10';
      case 'info':
      default:
        return 'border-blue-500/30 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white shadow-blue-500/10';
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border shadow-xl backdrop-blur-md animate-fade-in transition-all ${getStyles(
            t.type
          )}`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {getIcon(t.type)}
            <span className="text-xs sm:text-sm font-semibold truncate leading-tight">
              {t.message}
            </span>
          </div>

          <button
            onClick={() => removeToast(t.id)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

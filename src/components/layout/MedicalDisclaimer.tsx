import React from 'react';
import { Info } from 'lucide-react';

export const MedicalDisclaimer: React.FC = () => {
  return (
    <footer className="mt-12 py-6 px-4 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
      <div className="max-w-3xl mx-auto flex items-start sm:items-center justify-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50/70 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
        <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5 sm:mt-0" />
        <p className="text-left sm:text-center leading-relaxed">
          <strong className="font-semibold text-slate-700 dark:text-slate-300">Medical Safety Notice: </strong>
          CareX provides informational health assistance and emergency alert automation. It is not a substitute for professional medical diagnosis, treatment, or statutory emergency dispatch (112/911).
        </p>
      </div>
      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3">
        CareX v1.0.0 • Built with WCAG 2.2 AA accessibility standards & Vercel deployment architecture.
      </p>
    </footer>
  );
};

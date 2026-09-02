import React from 'react';
import { Keyboard, X, Command } from 'lucide-react';
import { useCareX } from '../../context';

export const KeyboardShortcutsModal: React.FC = () => {
  const { isKeyboardModalOpen, setIsKeyboardModalOpen } = useCareX();

  if (!isKeyboardModalOpen) return null;

  const shortcuts = [
    { keys: ['Space', '/', 'Enter'], desc: 'Activate SOS Emergency Button when focused' },
    { keys: ['Esc'], desc: 'Cancel SOS countdown or close active modal dialogs' },
    { keys: ['Alt', 'S'], desc: 'Trigger Emergency SOS Countdown directly' },
    { keys: ['Alt', 'D'], desc: 'Navigate directly to Dashboard' },
    { keys: ['Alt', 'H'], desc: 'Navigate to Health Monitoring & Trends' },
    { keys: ['Alt', 'C'], desc: 'Navigate to Emergency Contacts' },
    { keys: ['Alt', 'L'], desc: 'Navigate to Live GPS Location' },
    { keys: ['Alt', 'M'], desc: 'Mute or Unmute Emergency Siren during active SOS' },
    { keys: ['?'], desc: 'Toggle this Keyboard Shortcuts Help modal' }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 id="shortcuts-dialog-title" className="text-base font-bold text-slate-900 dark:text-white">
                Keyboard Shortcuts & Accessibility
              </h3>
              <p className="text-xs text-slate-500">
                Rapid navigation controls for assistive input & WCAG compliance
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsKeyboardModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close shortcuts dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {shortcuts.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
            >
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {item.desc}
              </span>

              <div className="flex items-center gap-1 flex-shrink-0">
                {item.keys.map((k, kIdx) => (
                  <React.Fragment key={kIdx}>
                    {k === '/' ? (
                      <span className="text-xs text-slate-400">or</span>
                    ) : (
                      <kbd className="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200">
                        {k}
                      </kbd>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Command className="w-3.5 h-3.5" />
            <span>Accessible on all keyboards</span>
          </span>
          <button
            onClick={() => setIsKeyboardModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

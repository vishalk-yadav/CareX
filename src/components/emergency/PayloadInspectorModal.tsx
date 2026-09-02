import React, { useState } from 'react';
import { Terminal, Copy, Check, X, ShieldAlert } from 'lucide-react';
import { useCareX } from '../../context';

export const PayloadInspectorModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { lastDispatchedPayload } = useCareX();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const payload = lastDispatchedPayload || {
    status: 'NO_ACTIVE_PAYLOAD',
    message: 'Trigger an SOS or demo event to generate live dispatch payload.'
  };

  const payloadString = JSON.stringify(payload, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(payloadString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-2xl bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                Emergency Dispatch Payload
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Integration Gateway
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Mock payload structure for Twilio / AWS SNS / 911 PSAP integration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs bg-slate-950/80">
          <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed select-all">
            {payloadString}
          </pre>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/60">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Verified format for emergency notification APIs
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied JSON' : 'Copy JSON'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};


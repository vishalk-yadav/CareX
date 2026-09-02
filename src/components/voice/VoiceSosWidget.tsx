import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { speechService } from '../../services/speechService';
import { useCareX } from '../../context';

export const VoiceSosWidget: React.FC = () => {
  const { triggerSosCountdown } = useCareX();
  const [isSupported] = useState(() => speechService.isSupported());
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleListening = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      return;
    }

    setErrorMessage(null);
    setTranscript('');
    setIsListening(true);

    const cleanup = speechService.startListening(
      () => {
        setIsListening(false);
        triggerSosCountdown('voice_sos');
      },
      (text) => {
        setTranscript(text);
      },
      (err) => {
        setErrorMessage(err);
        setIsListening(false);
      }
    );

    return cleanup;
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Mic className="w-5 h-5 text-blue-500" />
          <span>Voice Emergency Trigger</span>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
          Hands-Free SOS
        </span>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={toggleListening}
          disabled={!isSupported}
          className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
            !isSupported
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              : isListening
              ? 'bg-red-600 text-white animate-sos-pulse shadow-lg shadow-red-600/40'
              : 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
          }`}
          aria-label={isListening ? 'Stop voice recognition' : 'Start voice recognition'}
        >
          {isListening ? (
            <Mic className="w-8 h-8 animate-pulse" />
          ) : (
            <MicOff className="w-7 h-7" />
          )}
        </button>

        <div className="flex-1 text-center sm:text-left">
          {isSupported ? (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Voice activation trigger:
              </p>
              <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                Say: <span className="text-blue-600 dark:text-blue-400">"CareX, emergency"</span>
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {isListening
                  ? 'Listening for voice trigger... Speak clearly.'
                  : 'Tap microphone to activate ambient voice listener.'}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                Voice assistance is not supported in this browser.
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                You can still use the physical SOS button, keyboard shortcuts, or mobile touch controls.
              </p>
            </div>
          )}

          {transcript && (
            <div className="mt-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300">
              Heard: "{transcript}"
            </div>
          )}

          {errorMessage && (
            <p className="mt-2 text-xs text-red-500 font-medium">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};


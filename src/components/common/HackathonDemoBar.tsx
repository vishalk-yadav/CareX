import React, { useState } from 'react';
import {
  Play,
  ChevronRight,
  ChevronLeft,
  Minimize2,
  Maximize2,
  Sparkles,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { useCareX } from '../../context';

export const HackathonDemoBar: React.FC = () => {
  const {
    setActiveTab,
    simulateAbnormalVitals,
    triggerSosCountdown,
    resolveActiveEmergency,
    updateAccessibility,
    accessibility,
    resetAllToDefault
  } = useCareX();

  const [currentStep, setCurrentStep] = useState(1);
  const [isMinimized, setIsMinimized] = useState(false);

  const steps = [
    {
      num: 1,
      title: '1. Dashboard Overview',
      desc: 'Verify SAFE status, 78 BPM resting HR, 98% SpO₂, GPS location & 3 contacts.',
      actionLabel: 'Go to Dashboard',
      action: () => {
        simulateAbnormalVitals('normal');
        setActiveTab('dashboard');
      }
    },
    {
      num: 2,
      title: '2. Spike Vitals (112 BPM)',
      desc: 'Simulate abnormal physiological readings to test real-time vitals escalation.',
      actionLabel: 'Spike HR to 112 BPM',
      action: () => {
        simulateAbnormalVitals('high_hr');
        setActiveTab('health');
      }
    },
    {
      num: 3,
      title: '3. AI Health Insight',
      desc: 'Inspect automated non-diagnostic clinical insight warning of elevated tachycardia.',
      actionLabel: 'View AI Insight Card',
      action: () => {
        setActiveTab('dashboard');
      }
    },
    {
      num: 4,
      title: '4. Trigger SOS Alert',
      desc: 'Activate 3-second rapid emergency countdown with native audio beeps.',
      actionLabel: 'Launch SOS Countdown',
      action: () => {
        triggerSosCountdown('manual_sos');
      }
    },
    {
      num: 5,
      title: '5. GPS Trilateration',
      desc: 'Inspect high-precision reverse-geocoded coordinates & OpenStreetMap radar.',
      actionLabel: 'View Live Location',
      action: () => {
        setActiveTab('location');
      }
    },
    {
      num: 6,
      title: '6. Multi-Contact Dispatch',
      desc: 'Review verified contact dispatch logs and multi-channel notification status.',
      actionLabel: 'Review Contacts',
      action: () => {
        setActiveTab('contacts');
      }
    },
    {
      num: 7,
      title: '7. Emergency Safety Mode',
      desc: 'Engage high-urgency red safety mode with statutory 112 calling and live timer.',
      actionLabel: 'Open Emergency Hub',
      action: () => {
        setActiveTab('emergency');
      }
    },
    {
      num: 8,
      title: '8. Medical ID Passport',
      desc: 'Inspect blood group, allergies, conditions & printable emergency responder card.',
      actionLabel: 'View Medical ID',
      action: () => {
        setActiveTab('profile');
      }
    },
    {
      num: 9,
      title: '9. WCAG 2.2 AA Accessibility',
      desc: 'Toggle high-contrast mode, large text, and simple plain language assistance.',
      actionLabel: 'Toggle High Contrast',
      action: () => {
        updateAccessibility({ highContrast: !accessibility.highContrast });
        setActiveTab('settings');
      }
    },
    {
      num: 10,
      title: '10. Resolve & Audit Log',
      desc: 'Deactivate sirens with resolution chime and archive incident to audit log.',
      actionLabel: 'Resolve Emergency & View History',
      action: () => {
        resolveActiveEmergency('Hackathon evaluation demo completed successfully.');
        setActiveTab('history');
      }
    }
  ];

  const activeStepData = steps[currentStep - 1];

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      steps[nextStep - 1].action();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      steps[prevStep - 1].action();
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 text-white text-xs font-bold shadow-2xl border border-amber-500/40 backdrop-blur-md hover:bg-slate-800 transition-all group"
        >
          <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Hackathon Demo Flow (Step {currentStep}/10)</span>
          <Maximize2 className="w-3.5 h-3.5 opacity-70" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-40 animate-fade-in pointer-events-none">
      <div className="pointer-events-auto p-4 rounded-3xl bg-slate-900/95 text-white border-2 border-amber-500/50 shadow-2xl backdrop-blur-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950">
              Evaluator Guide
            </span>
            <span className="text-xs font-bold text-slate-300">
              Step {currentStep} of {steps.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={resetAllToDefault}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Minimize Demo Panel"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>{activeStepData.title}</span>
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {activeStepData.desc}
          </p>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={activeStepData.action}
            className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-500/20 active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{activeStepData.actionLabel}</span>
          </button>

          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === steps.length}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
            title="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

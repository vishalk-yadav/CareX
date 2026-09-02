import React, { useState, useEffect, useCallback, useRef } from 'react';
import type {
  EmergencyContact,
  HealthMetric,
  HealthProfile,
  EmergencyEvent,
  AIHealthInsight,
  AccessibilitySettings,
  EmergencyPreferences,
  NavTab,
  TriggerSource,
  EmergencyLocation,
  ToastMessage,
  ToastType
} from '../types';
import {
  INITIAL_CONTACTS,
  INITIAL_PROFILE,
  INITIAL_METRICS,
  INITIAL_AI_INSIGHT,
  INITIAL_HISTORY
} from '../services/mockData';
import { soundEffects } from '../services/soundEffects';
import { fetchCurrentPosition } from '../services/geoService';
import { motionService } from '../services/motionService';
import { CareXContext } from './careXContextDef';

const STORAGE_KEYS = {
  CONTACTS: 'carex_contacts_v1',
  PROFILE: 'carex_profile_v1',
  METRICS: 'carex_metrics_v1',
  HISTORY: 'carex_history_v1',
  ACCESSIBILITY: 'carex_a11y_v1',
  PREFERENCES: 'carex_prefs_v1',
  THEME: 'carex_theme_v1'
};

export const CareXProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [isEmergencyActive, setIsEmergencyActive] = useState<boolean>(false);
  const [activeEmergency, setActiveEmergency] = useState<EmergencyEvent | null>(null);
  const [sosCountdown, setSosCountdown] = useState<number | null>(null);
  const [pendingTrigger, setPendingTrigger] = useState<TriggerSource>('manual_sos');
  const [isSirenMuted, setIsSirenMuted] = useState<boolean>(false);
  const stopSirenRef = useRef<(() => void) | null>(null);

  const [isFallModalOpen, setIsFallModalOpen] = useState<boolean>(false);
  const [fallCountdown, setFallCountdown] = useState<number>(10);
  const fallTimerRef = useRef<number | null>(null);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? !navigator.onLine : false;
  });
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState<boolean>(false);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration = 3500) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Online / Offline listeners
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      showToast('✓ Network connection restored. Live GPS & map services active.', 'success', 4000);
    };
    const handleOffline = () => {
      setIsOffline(true);
      showToast('⚠️ You are offline. Local Medical ID & statutory dialing remain active.', 'warning', 6000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [showToast]);

  const [contacts, setContacts] = useState<EmergencyContact[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return INITIAL_CONTACTS;
  });

  const [healthProfile, setHealthProfile] = useState<HealthProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return INITIAL_PROFILE;
  });

  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.METRICS);
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return INITIAL_METRICS;
  });

  const [emergencyHistory, setEmergencyHistory] = useState<EmergencyEvent[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return INITIAL_HISTORY;
  });

  const [aiInsight, setAiInsight] = useState<AIHealthInsight>(INITIAL_AI_INSIGHT);
  const [demoMode, setDemoMode] = useState<boolean>(true);
  const [lastDispatchedPayload, setLastDispatchedPayload] = useState<Record<string, unknown> | null>(null);

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.ACCESSIBILITY);
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return {
      largeText: false,
      highContrast: false,
      reducedMotion: false,
      simpleLanguage: false,
      voiceAssistance: true
    };
  });

  const [preferences, setPreferences] = useState<EmergencyPreferences>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return {
      countdownDurationSeconds: 3,
      sirenSoundEnabled: true,
      autoShareLocation: true,
      preferredEmergencyNumber: '112',
      enableFallDetection: true,
      fallCountdownSeconds: 10
    };
  });

  const [currentLocation, setCurrentLocation] = useState<EmergencyLocation | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(healthProfile));
  }, [healthProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(healthMetrics));
  }, [healthMetrics]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(emergencyHistory));
  }, [emergencyHistory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACCESSIBILITY, JSON.stringify(accessibility));
  }, [accessibility]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (accessibility.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    if (accessibility.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (accessibility.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  }, [accessibility]);

  const refreshLocation = useCallback(async () => {
    setIsLocationLoading(true);
    try {
      const loc = await fetchCurrentPosition();
      setCurrentLocation(loc);
      showToast('📍 Location updated successfully', 'success', 2500);
    } catch {
      showToast('⚠️ Unable to access high-accuracy GPS coordinates', 'error', 3000);
    } finally {
      setIsLocationLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    let isMounted = true;
    fetchCurrentPosition().then((loc) => {
      if (isMounted) {
        setCurrentLocation(loc);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const evaluateHealthForAI = useCallback((metrics: HealthMetric[]) => {
    const hr = metrics.find((m) => m.type === 'heartRate')?.numericValue || 78;
    const spo2 = metrics.find((m) => m.type === 'spo2')?.numericValue || 98;
    const bp = metrics.find((m) => m.type === 'bloodPressure')?.value?.toString() || '120/80';

    if (hr >= 110) {
      setAiInsight({
        id: `insight-${Date.now()}`,
        riskLevel: 'MEDIUM',
        title: 'Elevated Resting Heart Rate Detected',
        reason: `Your current heart rate of ${hr} BPM is notably above your resting baseline range (60-100 BPM).`,
        recommendedAction: 'Sit in a calm seated position, take measured deep breaths, drink water, and re-check in 5 minutes.',
        metricsImpacted: [`Heart Rate: ${hr} BPM (Tachycardia zone)`, `SpO₂: ${spo2}%`, `BP: ${bp}`],
        timestamp: 'Just now',
        isDemo: true
      });
    } else if (spo2 <= 92) {
      setAiInsight({
        id: `insight-${Date.now()}`,
        riskLevel: 'HIGH',
        title: 'Low Oxygen Saturation Alert',
        reason: `Your blood oxygen levels dropped to ${spo2}%, which is below the safe threshold of 95%.`,
        recommendedAction: 'Ensure unobstructed airway, maintain upright posture, and consider medical evaluation or alerting your doctor.',
        metricsImpacted: [`SpO₂: ${spo2}% (Low oxygenation)`, `Heart Rate: ${hr} BPM`],
        timestamp: 'Just now',
        isDemo: true
      });
    } else {
      setAiInsight({
        id: `insight-stable`,
        riskLevel: 'LOW',
        title: 'Vitals Stable & Optimal',
        reason: 'Resting heart rate, oxygenation, and blood pressure indicators are currently within your personal baseline bounds.',
        recommendedAction: 'Continue usual daily hydration and routine monitoring. All emergency contacts are verified.',
        metricsImpacted: [`Heart Rate: ${hr} BPM`, `SpO₂: ${spo2}%`, `BP: ${bp}`],
        timestamp: 'Just now',
        isDemo: true
      });
    }
  }, []);

  const activateEmergencyWorkflow = useCallback(async (trigger: TriggerSource) => {
    soundEffects.playEmergencyLiftoff();

    if (preferences.sirenSoundEnabled && !isSirenMuted) {
      stopSirenRef.current = soundEffects.startEmergencySiren();
    }

    let loc = currentLocation;
    if (!loc) {
      loc = await fetchCurrentPosition();
      setCurrentLocation(loc);
    }

    const hr = healthMetrics.find((m) => m.type === 'heartRate')?.numericValue || 80;
    const spo2 = healthMetrics.find((m) => m.type === 'spo2')?.numericValue || 98;
    const bp = healthMetrics.find((m) => m.type === 'bloodPressure')?.value?.toString() || '120/80';
    const temp = healthMetrics.find((m) => m.type === 'temperature')?.numericValue || 98.4;

    const notificationLogs = contacts.map((c, idx) => ({
      contactId: c.id,
      name: c.name,
      phone: c.phone,
      priority: c.priority,
      status: 'delivered' as const,
      sentAt: new Date(Date.now() + idx * 800).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      channel: idx === 0 ? ('SMS (Demo)' as const) : ('WhatsApp (Demo)' as const)
    }));

    const eventId = `EMG-${new Date().getFullYear()}-${String(emergencyHistory.length + 1).padStart(3, '0')}`;

    const newEvent: EmergencyEvent = {
      id: eventId,
      timestamp: new Date().toISOString(),
      durationSeconds: 0,
      status: 'active',
      trigger: trigger,
      location: loc,
      contactsNotified: notificationLogs,
      healthSnapshot: {
        heartRate: hr,
        spo2: spo2,
        bloodPressure: bp,
        temperature: temp
      }
    };

    setActiveEmergency(newEvent);
    setIsEmergencyActive(true);
    setActiveTab('emergency');

    setLastDispatchedPayload({
      event: 'EMERGENCY_DISPATCH_TRIGGERED',
      emergencyId: eventId,
      triggerType: trigger,
      dispatchedAt: new Date().toISOString(),
      patient: {
        name: healthProfile.fullName,
        bloodGroup: healthProfile.bloodGroup,
        allergies: healthProfile.allergies,
        conditions: healthProfile.medicalConditions
      },
      gps: {
        lat: loc.latitude,
        lng: loc.longitude,
        accuracy: `${loc.accuracyMeters}m`,
        address: loc.address
      },
      vitalsSnapshot: {
        heartRate: `${hr} BPM`,
        oxygenSaturation: `${spo2}%`,
        bloodPressure: bp,
        bodyTemp: `${temp} °F`
      },
      recipients: notificationLogs.map((r) => ({
        recipient: r.name,
        phone: r.phone,
        priority: r.priority,
        status: 'DISPATCHED_SIMULATED_GATEWAY'
      }))
    });

    showToast('🚨 Emergency alert activated & dispatched to verified contacts', 'error', 5000);
  }, [contacts, currentLocation, emergencyHistory.length, healthMetrics, healthProfile, isSirenMuted, preferences.sirenSoundEnabled, showToast]);

  useEffect(() => {
    if (sosCountdown === null) return;

    if (sosCountdown > 0) {
      soundEffects.playCountdownBeep(700 + (preferences.countdownDurationSeconds - sosCountdown) * 150);
      const timer = window.setTimeout(() => {
        setSosCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (sosCountdown === 0) {
      const launch = async () => {
        setSosCountdown(null);
        await activateEmergencyWorkflow(pendingTrigger);
      };
      launch();
    }
  }, [sosCountdown, pendingTrigger, preferences.countdownDurationSeconds, activateEmergencyWorkflow]);

  const triggerSosCountdown = useCallback((trigger: TriggerSource = 'manual_sos') => {
    setPendingTrigger(trigger);
    setSosCountdown(preferences.countdownDurationSeconds);
  }, [preferences.countdownDurationSeconds]);

  const cancelSosCountdown = () => {
    setSosCountdown(null);
    showToast('Emergency countdown cancelled by user', 'info', 2000);
  };

  const forceImmediateSos = async (trigger: TriggerSource = 'manual_sos') => {
    setSosCountdown(null);
    await activateEmergencyWorkflow(trigger);
  };

  const resolveActiveEmergency = (notes?: string) => {
    if (stopSirenRef.current) {
      stopSirenRef.current();
      stopSirenRef.current = null;
    }
    soundEffects.stopEmergencySiren();
    soundEffects.playResolveChime();

    if (activeEmergency) {
      const startMs = new Date(activeEmergency.timestamp).getTime();
      const durationSeconds = Math.max(1, Math.round((Date.now() - startMs) / 1000));

      const resolvedEvent: EmergencyEvent = {
        ...activeEmergency,
        status: 'resolved',
        resolvedAt: new Date().toISOString(),
        durationSeconds,
        notes: notes || 'Emergency resolved by user. Situation stabilized.'
      };

      setEmergencyHistory((prev) => [resolvedEvent, ...prev]);
    }

    setIsEmergencyActive(false);
    setActiveEmergency(null);
    setActiveTab('history');
    showToast('✓ Emergency marked as resolved and archived to incident history', 'success', 4000);
  };

  const toggleSirenMute = useCallback(() => {
    setIsSirenMuted((prev) => {
      const next = !prev;
      if (next) {
        if (stopSirenRef.current) stopSirenRef.current();
        soundEffects.stopEmergencySiren();
        showToast('Emergency audio siren muted', 'info', 2000);
      } else {
        if (isEmergencyActive) {
          stopSirenRef.current = soundEffects.startEmergencySiren();
          showToast('Emergency audio siren unmuted', 'warning', 2000);
        }
      }
      return next;
    });
  }, [isEmergencyActive, showToast]);

  const triggerFallSimulation = useCallback(() => {
    setIsFallModalOpen(true);
    setFallCountdown(preferences.fallCountdownSeconds || 10);
    soundEffects.playWarningBeep();
  }, [preferences.fallCountdownSeconds]);

  const dismissFallAlert = () => {
    if (fallTimerRef.current) {
      clearInterval(fallTimerRef.current);
      fallTimerRef.current = null;
    }
    setIsFallModalOpen(false);
    setFallCountdown(preferences.fallCountdownSeconds || 10);
    showToast("✓ Fall alert dismissed: 'I'm OK'", 'success', 2500);
  };

  // Accelerometer motion listener for mobile fall detection
  useEffect(() => {
    if (!preferences.enableFallDetection) return;

    const cleanup = motionService.startListening(() => {
      triggerFallSimulation();
    });

    return () => {
      if (cleanup) motionService.stopListening();
    };
  }, [preferences.enableFallDetection, triggerFallSimulation]);

  useEffect(() => {
    if (!isFallModalOpen) return;

    fallTimerRef.current = window.setInterval(() => {
      setFallCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(fallTimerRef.current!);
          fallTimerRef.current = null;
          setIsFallModalOpen(false);
          triggerSosCountdown('fall_detection');
          return 0;
        }
        soundEffects.playCountdownBeep(600, 0.08);
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (fallTimerRef.current) clearInterval(fallTimerRef.current);
    };
  }, [isFallModalOpen, triggerSosCountdown]);

  const addContact = (newC: Omit<EmergencyContact, 'id'>) => {
    const contact: EmergencyContact = {
      ...newC,
      id: `contact-${Date.now()}`
    };
    setContacts((prev) => [...prev, contact]);
    showToast(`✓ Contact "${contact.name}" added successfully`, 'success', 3000);
  };

  const updateContact = (updated: EmergencyContact) => {
    setContacts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showToast(`✓ Contact "${updated.name}" updated`, 'success', 2500);
  };

  const deleteContact = (id: string) => {
    const name = contacts.find((c) => c.id === id)?.name;
    setContacts((prev) => prev.filter((c) => c.id !== id));
    showToast(`Contact "${name || ''}" removed`, 'info', 2500);
  };

  const setPrimaryContact = (id: string) => {
    setContacts((prev) =>
      prev.map((c) => ({
        ...c,
        priority: c.id === id ? 'primary' : c.priority === 'primary' ? 'secondary' : c.priority
      }))
    );
    const target = contacts.find((c) => c.id === id);
    showToast(`⭐ "${target?.name}" designated as Primary Emergency Contact`, 'success', 3000);
  };

  const updateSingleMetric = (type: HealthMetric['type'], value: number | string) => {
    setHealthMetrics((prev) => {
      const updated = prev.map((m) => {
        if (m.type === type) {
          const numVal = typeof value === 'number' ? value : parseInt(value.toString(), 10) || 0;
          let status: HealthMetric['status'] = 'normal';
          if (type === 'heartRate') {
            status = numVal > 105 ? 'warning' : numVal > 130 ? 'critical' : 'normal';
          } else if (type === 'spo2') {
            status = numVal < 93 ? 'critical' : numVal < 95 ? 'warning' : 'normal';
          }
          return {
            ...m,
            value,
            numericValue: numVal,
            status,
            lastUpdated: 'Just now'
          };
        }
        return m;
      });
      evaluateHealthForAI(updated);
      return updated;
    });
    showToast(`✓ Health reading recorded: ${value}`, 'success', 2500);
  };

  const simulateAbnormalVitals = (scenario: 'high_hr' | 'low_spo2' | 'high_bp' | 'normal') => {
    setHealthMetrics((prev) => {
      let updated: HealthMetric[];
      if (scenario === 'high_hr') {
        updated = prev.map((m) =>
          m.type === 'heartRate'
            ? { ...m, value: 112, numericValue: 112, status: 'warning', trend: 'up', lastUpdated: 'Simulated just now' }
            : m
        );
        showToast('⚡ Simulated Elevated Heart Rate: 112 BPM (Tachycardia trigger)', 'warning', 3500);
      } else if (scenario === 'low_spo2') {
        updated = prev.map((m) =>
          m.type === 'spo2'
            ? { ...m, value: 91, numericValue: 91, status: 'critical', trend: 'down', lastUpdated: 'Simulated just now' }
            : m
        );
        showToast('⚡ Simulated Low Blood Oxygen: 91% SpO₂ (Hypoxia trigger)', 'error', 3500);
      } else if (scenario === 'high_bp') {
        updated = prev.map((m) =>
          m.type === 'bloodPressure'
            ? { ...m, value: '155/96', numericValue: 155, status: 'warning', trend: 'up', lastUpdated: 'Simulated just now' }
            : m
        );
        showToast('⚡ Simulated High Blood Pressure: 155/96 mmHg', 'warning', 3500);
      } else {
        updated = INITIAL_METRICS;
        showToast('✓ Vitals restored to personal baseline bounds', 'success', 2500);
      }
      evaluateHealthForAI(updated);
      return updated;
    });
  };

  const updateHealthProfile = (p: Partial<HealthProfile>) => {
    setHealthProfile((prev) => ({ ...prev, ...p }));
    showToast('✓ Emergency Health Profile saved securely', 'success', 2500);
  };

  const updateAccessibility = (settings: Partial<AccessibilitySettings>) => {
    setAccessibility((prev) => ({ ...prev, ...settings }));
    showToast('Accessibility preferences updated', 'info', 2000);
  };

  const updatePreferences = (prefs: Partial<EmergencyPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...prefs }));
    showToast('Emergency safety preferences updated', 'info', 2000);
  };

  const clearHistory = () => {
    setEmergencyHistory([]);
    showToast('Emergency history logs cleared', 'info', 2500);
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      showToast(`Switched to ${next} theme`, 'info', 1500);
      return next;
    });
  };

  const resetAllToDefault = () => {
    setContacts(INITIAL_CONTACTS);
    setHealthProfile(INITIAL_PROFILE);
    setHealthMetrics(INITIAL_METRICS);
    setEmergencyHistory(INITIAL_HISTORY);
    setAiInsight(INITIAL_AI_INSIGHT);
    localStorage.clear();
    showToast('Factory baseline settings restored', 'info', 3000);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        setIsKeyboardModalOpen((prev) => !prev);
      } else if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        triggerSosCountdown('manual_sos');
      } else if (e.altKey && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        setActiveTab('dashboard');
      } else if (e.altKey && (e.key === 'h' || e.key === 'H')) {
        e.preventDefault();
        setActiveTab('health');
      } else if (e.altKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        setActiveTab('contacts');
      } else if (e.altKey && (e.key === 'l' || e.key === 'L')) {
        e.preventDefault();
        setActiveTab('location');
      } else if (e.altKey && (e.key === 'm' || e.key === 'M')) {
        e.preventDefault();
        toggleSirenMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerSosCountdown, toggleSirenMute]);

  return (
    <CareXContext.Provider
      value={{
        activeTab,
        setActiveTab,
        theme,
        setTheme,
        toggleTheme,

        isEmergencyActive,
        activeEmergency,
        sosCountdown,
        triggerSosCountdown,
        cancelSosCountdown,
        forceImmediateSos,
        resolveActiveEmergency,
        isSirenMuted,
        toggleSirenMute,

        isFallModalOpen,
        fallCountdown,
        triggerFallSimulation,
        dismissFallAlert,

        contacts,
        addContact,
        updateContact,
        deleteContact,
        setPrimaryContact,

        healthMetrics,
        updateSingleMetric,
        simulateAbnormalVitals,

        healthProfile,
        updateHealthProfile,

        aiInsight,
        refreshAiInsight: () => evaluateHealthForAI(healthMetrics),

        emergencyHistory,
        clearHistory,

        accessibility,
        updateAccessibility,
        preferences,
        updatePreferences,

        currentLocation,
        isLocationLoading,
        refreshLocation,

        demoMode,
        setDemoMode,
        resetAllToDefault,

        lastDispatchedPayload,

        toasts,
        showToast,
        removeToast,

        isOffline,

        isKeyboardModalOpen,
        setIsKeyboardModalOpen
      }}
    >
      {children}
    </CareXContext.Provider>
  );
};

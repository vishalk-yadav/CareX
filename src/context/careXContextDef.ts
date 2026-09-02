import { createContext } from 'react';
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

export interface CareXContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  toggleTheme: () => void;

  isEmergencyActive: boolean;
  activeEmergency: EmergencyEvent | null;
  sosCountdown: number | null;
  triggerSosCountdown: (trigger?: TriggerSource) => void;
  cancelSosCountdown: () => void;
  forceImmediateSos: (trigger?: TriggerSource) => Promise<void>;
  resolveActiveEmergency: (notes?: string) => void;
  isSirenMuted: boolean;
  toggleSirenMute: () => void;

  isFallModalOpen: boolean;
  fallCountdown: number;
  triggerFallSimulation: () => void;
  dismissFallAlert: () => void;

  contacts: EmergencyContact[];
  addContact: (c: Omit<EmergencyContact, 'id'>) => void;
  updateContact: (c: EmergencyContact) => void;
  deleteContact: (id: string) => void;
  setPrimaryContact: (id: string) => void;

  healthMetrics: HealthMetric[];
  updateSingleMetric: (type: HealthMetric['type'], value: number | string) => void;
  simulateAbnormalVitals: (scenario: 'high_hr' | 'low_spo2' | 'high_bp' | 'normal') => void;

  healthProfile: HealthProfile;
  updateHealthProfile: (p: Partial<HealthProfile>) => void;

  aiInsight: AIHealthInsight;
  refreshAiInsight: () => void;

  emergencyHistory: EmergencyEvent[];
  clearHistory: () => void;

  accessibility: AccessibilitySettings;
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  preferences: EmergencyPreferences;
  updatePreferences: (prefs: Partial<EmergencyPreferences>) => void;

  currentLocation: EmergencyLocation | null;
  isLocationLoading: boolean;
  refreshLocation: () => Promise<void>;

  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  resetAllToDefault: () => void;

  lastDispatchedPayload: Record<string, unknown> | null;

  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;

  isOffline: boolean;

  isKeyboardModalOpen: boolean;
  setIsKeyboardModalOpen: (open: boolean) => void;
}

export const CareXContext = createContext<CareXContextType | undefined>(undefined);

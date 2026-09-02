export type PriorityLevel = 'primary' | 'secondary' | 'doctor';

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  priority: PriorityLevel;
  avatarUrl?: string;
  isAvailable?: boolean;
}

export type MetricType = 'heartRate' | 'spo2' | 'temperature' | 'bloodPressure';
export type MetricStatus = 'normal' | 'warning' | 'critical';
export type MetricTrend = 'stable' | 'up' | 'down';

export interface MetricDataPoint {
  timestamp: string;
  timeLabel: string;
  value: number;
}

export interface HealthMetric {
  id: string;
  type: MetricType;
  label: string;
  value: number | string;
  numericValue: number;
  unit: string;
  status: MetricStatus;
  trend: MetricTrend;
  lastUpdated: string;
  rangeDescription: string;
  historyToday: MetricDataPoint[];
  history7Days: MetricDataPoint[];
  history30Days: MetricDataPoint[];
}

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface AIHealthInsight {
  id: string;
  riskLevel: RiskLevel;
  title: string;
  reason: string;
  recommendedAction: string;
  metricsImpacted: string[];
  timestamp: string;
  isDemo: boolean;
}

export type TriggerSource = 'manual_sos' | 'voice_sos' | 'fall_detection' | 'demo_trigger';
export type EmergencyStatus = 'active' | 'resolved' | 'cancelled';

export interface EmergencyLocation {
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  address: string;
  city: string;
  state: string;
  country: string;
  timestamp: string;
}

export interface ContactNotificationLog {
  contactId: string;
  name: string;
  phone: string;
  priority: PriorityLevel;
  status: 'sent' | 'pending' | 'delivered';
  sentAt: string;
  channel: 'SMS (Demo)' | 'WhatsApp (Demo)' | 'Automated Call (Demo)';
}

export interface EmergencyEvent {
  id: string;
  timestamp: string;
  resolvedAt?: string;
  durationSeconds: number;
  status: EmergencyStatus;
  trigger: TriggerSource;
  location: EmergencyLocation;
  contactsNotified: ContactNotificationLog[];
  healthSnapshot: {
    heartRate: number;
    spo2: number;
    bloodPressure: string;
    temperature: number;
  };
  notes?: string;
}

export interface HealthProfile {
  fullName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  allergies: string;
  currentMedications: string;
  medicalConditions: string;
  emergencyNotes: string;
  preferredHospital: string;
  primaryDoctor: string;
  doctorPhone: string;
  insuranceProvider: string;
  insuranceId: string;
  emergencyIdCardNumber: string;
}

export type FacilityCategory = 'hospital' | 'ambulance' | 'pharmacy' | 'police' | 'fire';

export interface EmergencyServiceFacility {
  id: string;
  name: string;
  category: FacilityCategory;
  address: string;
  distanceKm: number;
  phone: string;
  isOpen24Hours: boolean;
  rating: number;
  verified: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface AccessibilitySettings {
  largeText: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  simpleLanguage: boolean;
  voiceAssistance: boolean;
}

export interface EmergencyPreferences {
  countdownDurationSeconds: number; // 3, 5, 10
  sirenSoundEnabled: boolean;
  autoShareLocation: boolean;
  preferredEmergencyNumber: string; // "112", "911", "999"
  enableFallDetection: boolean;
  fallCountdownSeconds: number; // 10
}

export type NavTab = 
  | 'dashboard'
  | 'health'
  | 'emergency'
  | 'contacts'
  | 'location'
  | 'profile'
  | 'services'
  | 'history'
  | 'settings';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

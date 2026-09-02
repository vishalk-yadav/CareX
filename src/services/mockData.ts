import type {
  EmergencyContact,
  HealthMetric,
  HealthProfile,
  EmergencyServiceFacility,
  EmergencyEvent,
  AIHealthInsight
} from '../types';

export const INITIAL_CONTACTS: EmergencyContact[] = [
  {
    id: 'contact-1',
    name: 'Sunita Sharma',
    relationship: 'Mother',
    phone: '+91 98765 43210',
    email: 'sunita.sharma@example.com',
    priority: 'primary',
    isAvailable: true
  },
  {
    id: 'contact-2',
    name: 'Rahul Sharma',
    relationship: 'Brother',
    phone: '+91 98111 22334',
    email: 'rahul.s@example.com',
    priority: 'secondary',
    isAvailable: true
  },
  {
    id: 'contact-3',
    name: 'Dr. Priya Sharma',
    relationship: 'Primary Cardiologist',
    phone: '+91 98999 88776',
    email: 'dr.priya.sharma@maxhealthcare.example',
    priority: 'doctor',
    isAvailable: true
  }
];

export const INITIAL_PROFILE: HealthProfile = {
  fullName: 'Aarav Sharma',
  age: 42,
  gender: 'Male',
  bloodGroup: 'O+',
  allergies: 'Penicillin, Peanuts (Mild)',
  currentMedications: 'Metoprolol 25mg (Morning), Aspirin 81mg',
  medicalConditions: 'Mild Hypertension (Under treatment), Prior Arrhythmia episode',
  emergencyNotes: 'Carries emergency medication in laptop backpack. If uncoordinated or unresponsive, dial 112 immediately.',
  preferredHospital: 'Max Super Speciality Hospital, Gurugram',
  primaryDoctor: 'Dr. Priya Sharma',
  doctorPhone: '+91 98999 88776',
  insuranceProvider: 'Star Health Premier Shield',
  insuranceId: 'SH-8921-9942A',
  emergencyIdCardNumber: 'CX-8829-410'
};

export const INITIAL_METRICS: HealthMetric[] = [
  {
    id: 'metric-hr',
    type: 'heartRate',
    label: 'Heart Rate',
    value: 78,
    numericValue: 78,
    unit: 'BPM',
    status: 'normal',
    trend: 'stable',
    lastUpdated: '2 mins ago',
    rangeDescription: 'Normal resting range: 60-100 BPM',
    historyToday: [
      { timestamp: '08:00', timeLabel: '8 AM', value: 72 },
      { timestamp: '10:00', timeLabel: '10 AM', value: 75 },
      { timestamp: '12:00', timeLabel: '12 PM', value: 80 },
      { timestamp: '14:00', timeLabel: '2 PM', value: 74 },
      { timestamp: '16:00', timeLabel: '4 PM', value: 79 },
      { timestamp: '18:00', timeLabel: '6 PM', value: 76 },
      { timestamp: '20:00', timeLabel: '8 PM', value: 78 }
    ],
    history7Days: [
      { timestamp: 'Day 1', timeLabel: 'Wed', value: 74 },
      { timestamp: 'Day 2', timeLabel: 'Thu', value: 76 },
      { timestamp: 'Day 3', timeLabel: 'Fri', value: 73 },
      { timestamp: 'Day 4', timeLabel: 'Sat', value: 71 },
      { timestamp: 'Day 5', timeLabel: 'Sun', value: 75 },
      { timestamp: 'Day 6', timeLabel: 'Mon', value: 77 },
      { timestamp: 'Day 7', timeLabel: 'Today', value: 78 }
    ],
    history30Days: [
      { timestamp: 'Week 1', timeLabel: 'W1', value: 73 },
      { timestamp: 'Week 2', timeLabel: 'W2', value: 75 },
      { timestamp: 'Week 3', timeLabel: 'W3', value: 74 },
      { timestamp: 'Week 4', timeLabel: 'W4', value: 76 }
    ]
  },
  {
    id: 'metric-spo2',
    type: 'spo2',
    label: 'Blood Oxygen (SpO₂)',
    value: 98,
    numericValue: 98,
    unit: '%',
    status: 'normal',
    trend: 'stable',
    lastUpdated: '5 mins ago',
    rangeDescription: 'Healthy baseline: 95 - 100%',
    historyToday: [
      { timestamp: '08:00', timeLabel: '8 AM', value: 99 },
      { timestamp: '11:00', timeLabel: '11 AM', value: 98 },
      { timestamp: '14:00', timeLabel: '2 PM', value: 98 },
      { timestamp: '17:00', timeLabel: '5 PM', value: 97 },
      { timestamp: '20:00', timeLabel: '8 PM', value: 98 }
    ],
    history7Days: [
      { timestamp: 'Day 1', timeLabel: 'Wed', value: 98 },
      { timestamp: 'Day 2', timeLabel: 'Thu', value: 99 },
      { timestamp: 'Day 3', timeLabel: 'Fri', value: 98 },
      { timestamp: 'Day 4', timeLabel: 'Sat', value: 99 },
      { timestamp: 'Day 5', timeLabel: 'Sun', value: 98 },
      { timestamp: 'Day 6', timeLabel: 'Mon', value: 98 },
      { timestamp: 'Day 7', timeLabel: 'Today', value: 98 }
    ],
    history30Days: [
      { timestamp: 'Week 1', timeLabel: 'W1', value: 98 },
      { timestamp: 'Week 2', timeLabel: 'W2', value: 98.5 },
      { timestamp: 'Week 3', timeLabel: 'W3', value: 98 },
      { timestamp: 'Week 4', timeLabel: 'W4', value: 98.2 }
    ]
  },
  {
    id: 'metric-temp',
    type: 'temperature',
    label: 'Body Temperature',
    value: 98.4,
    numericValue: 98.4,
    unit: '°F',
    status: 'normal',
    trend: 'stable',
    lastUpdated: '12 mins ago',
    rangeDescription: 'Normal physiological range: 97.8 - 99.1 °F',
    historyToday: [
      { timestamp: '08:00', timeLabel: '8 AM', value: 98.2 },
      { timestamp: '12:00', timeLabel: '12 PM', value: 98.4 },
      { timestamp: '16:00', timeLabel: '4 PM', value: 98.6 },
      { timestamp: '20:00', timeLabel: '8 PM', value: 98.4 }
    ],
    history7Days: [
      { timestamp: 'Day 1', timeLabel: 'Wed', value: 98.3 },
      { timestamp: 'Day 2', timeLabel: 'Thu', value: 98.4 },
      { timestamp: 'Day 3', timeLabel: 'Fri', value: 98.5 },
      { timestamp: 'Day 4', timeLabel: 'Sat', value: 98.3 },
      { timestamp: 'Day 5', timeLabel: 'Sun', value: 98.4 },
      { timestamp: 'Day 6', timeLabel: 'Mon', value: 98.5 },
      { timestamp: 'Day 7', timeLabel: 'Today', value: 98.4 }
    ],
    history30Days: [
      { timestamp: 'Week 1', timeLabel: 'W1', value: 98.4 },
      { timestamp: 'Week 2', timeLabel: 'W2', value: 98.3 },
      { timestamp: 'Week 3', timeLabel: 'W3', value: 98.5 },
      { timestamp: 'Week 4', timeLabel: 'W4', value: 98.4 }
    ]
  },
  {
    id: 'metric-bp',
    type: 'bloodPressure',
    label: 'Blood Pressure',
    value: '120/80',
    numericValue: 120,
    unit: 'mmHg',
    status: 'normal',
    trend: 'stable',
    lastUpdated: '35 mins ago',
    rangeDescription: 'Optimal standard: <120/80 mmHg',
    historyToday: [
      { timestamp: '08:00', timeLabel: '8 AM', value: 118 },
      { timestamp: '12:00', timeLabel: '12 PM', value: 122 },
      { timestamp: '16:00', timeLabel: '4 PM', value: 121 },
      { timestamp: '20:00', timeLabel: '8 PM', value: 120 }
    ],
    history7Days: [
      { timestamp: 'Day 1', timeLabel: 'Wed', value: 119 },
      { timestamp: 'Day 2', timeLabel: 'Thu', value: 121 },
      { timestamp: 'Day 3', timeLabel: 'Fri', value: 120 },
      { timestamp: 'Day 4', timeLabel: 'Sat', value: 118 },
      { timestamp: 'Day 5', timeLabel: 'Sun', value: 122 },
      { timestamp: 'Day 6', timeLabel: 'Mon', value: 120 },
      { timestamp: 'Day 7', timeLabel: 'Today', value: 120 }
    ],
    history30Days: [
      { timestamp: 'Week 1', timeLabel: 'W1', value: 120 },
      { timestamp: 'Week 2', timeLabel: 'W2', value: 121 },
      { timestamp: 'Week 3', timeLabel: 'W3', value: 119 },
      { timestamp: 'Week 4', timeLabel: 'W4', value: 120 }
    ]
  }
];

export const INITIAL_AI_INSIGHT: AIHealthInsight = {
  id: 'insight-initial',
  riskLevel: 'LOW',
  title: 'Vitals Stable & Normal Baseline',
  reason: 'Resting heart rate, oxygenation, and blood pressure indicators are currently within your personal baseline bounds.',
  recommendedAction: 'Continue usual daily hydration and routine monitoring. All emergency contacts are verified.',
  metricsImpacted: ['Heart Rate: 78 BPM', 'SpO₂: 98%', 'BP: 120/80 mmHg'],
  timestamp: 'Updated just now',
  isDemo: true
};

export const INITIAL_EMERGENCY_SERVICES: EmergencyServiceFacility[] = [
  {
    id: 'srv-1',
    name: 'Max Super Speciality Hospital',
    category: 'hospital',
    address: 'B-Block, Sushant Lok Phase I, Sector 43, Gurugram',
    distanceKm: 0.8,
    phone: '+91 124 662 3000',
    isOpen24Hours: true,
    rating: 4.8,
    verified: true,
    coordinates: { lat: 28.4611, lng: 77.0782 }
  },
  {
    id: 'srv-2',
    name: 'Gurugram Rapid Response Ambulance Station',
    category: 'ambulance',
    address: 'Sector 29 Flyover Emergency Bay, Gurugram',
    distanceKm: 1.2,
    phone: '108',
    isOpen24Hours: true,
    rating: 4.9,
    verified: true,
    coordinates: { lat: 28.4715, lng: 77.0654 }
  },
  {
    id: 'srv-3',
    name: 'Fortis Memorial Research Institute (FMRI)',
    category: 'hospital',
    address: 'Sector 44, Opposite HUDA City Centre Metro, Gurugram',
    distanceKm: 2.1,
    phone: '+91 124 496 2200',
    isOpen24Hours: true,
    rating: 4.7,
    verified: true,
    coordinates: { lat: 28.4578, lng: 77.0734 }
  },
  {
    id: 'srv-4',
    name: 'Apollo 24/7 Pharmacy & Emergency Meds',
    category: 'pharmacy',
    address: 'Shop 12, Ground Floor, DLF Cyber Hub, Gurugram',
    distanceKm: 0.4,
    phone: '+91 124 429 8811',
    isOpen24Hours: true,
    rating: 4.6,
    verified: true,
    coordinates: { lat: 28.4952, lng: 77.0891 }
  },
  {
    id: 'srv-5',
    name: 'Cyber City Police Assistance Booth',
    category: 'police',
    address: 'Gateway Tower Circle, DLF Phase 2, Gurugram',
    distanceKm: 0.6,
    phone: '112',
    isOpen24Hours: true,
    rating: 4.5,
    verified: true,
    coordinates: { lat: 28.4901, lng: 77.0911 }
  },
  {
    id: 'srv-6',
    name: 'Sector 29 Fire & Disaster Response Headquarters',
    category: 'fire',
    address: 'Near Leisure Valley Park, Sector 29, Gurugram',
    distanceKm: 3.2,
    phone: '101',
    isOpen24Hours: true,
    rating: 4.8,
    verified: true,
    coordinates: { lat: 28.4682, lng: 77.0612 }
  }
];

export const INITIAL_HISTORY: EmergencyEvent[] = [
  {
    id: 'EMG-2026-001',
    timestamp: '2026-09-01T18:42:10.000Z',
    resolvedAt: '2026-09-01T18:45:55.000Z',
    durationSeconds: 225,
    status: 'resolved',
    trigger: 'manual_sos',
    location: {
      latitude: 28.4595,
      longitude: 77.0266,
      accuracyMeters: 14,
      address: 'DLF Cyber City, Sector 24',
      city: 'Gurugram',
      state: 'Haryana',
      country: 'India',
      timestamp: '2026-09-01T18:42:15.000Z'
    },
    contactsNotified: [
      {
        contactId: 'contact-1',
        name: 'Sunita Sharma',
        phone: '+91 98765 43210',
        priority: 'primary',
        status: 'delivered',
        sentAt: '18:42:18',
        channel: 'SMS (Demo)'
      },
      {
        contactId: 'contact-2',
        name: 'Rahul Sharma',
        phone: '+91 98111 22334',
        priority: 'secondary',
        status: 'delivered',
        sentAt: '18:42:19',
        channel: 'SMS (Demo)'
      }
    ],
    healthSnapshot: {
      heartRate: 104,
      spo2: 97,
      bloodPressure: '135/88',
      temperature: 98.6
    },
    notes: 'User felt sudden palpitations while working late. Primary contact called back within 2 minutes. Vital signs restabilized after resting.'
  }
];

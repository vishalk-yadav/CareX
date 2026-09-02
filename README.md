# 🚨 CareX — Smart Health & Emergency Companion

<p align="center">
  <b>Smart Health & Emergency Companion</b>
</p>

<p align="center">
  CareX is actively monitoring your safety telemetry and verified emergency contacts.
</p>

<p align="center">
  <a href="https://care-x-nine.vercel.app/">🌐 Live Demo</a> ·
  <a href="https://github.com/vishalk-yadav/CareX">📂 Repository</a>
</p>

---

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![WCAG 2.2 AA](https://img.shields.io/badge/Accessibility-WCAG_2.2_AA-green?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Deployment_Ready-black?style=for-the-badge&logo=vercel)](https://vercel.com)

> **CareX** is an intelligent, high-reliability personal safety and health companion web application designed for elders, solo travelers, chronic patients, and rapid emergency dispatch. It combines instantaneous SOS escalation, fall-detection shock alerts, real-time GPS trilateration, ambient voice activation, physiological vitals tracking, and simulated multi-channel broadcast to verified emergency contacts.

---

## 🌟 Key Highlights & Capabilities

### 1. 🚨 Rapid SOS Emergency Hub
- **3-Second Countdown Buffer**: Prevents accidental triggers while allowing an instant "Skip Countdown" bypass.
- **Synthesized Audio Siren**: Built purely with the native **Web Audio API** (zero external mp3 assets required) — plays escalating countdown beeps, oscillating high-decibel emergency sirens, and harmonic resolution chimes.
- **Emergency Safety Mode**: High-urgency red interface providing quick access to statutory 112/911 dialing, SMS dispatch status, resolved notes, and siren mute/unmute.
- **Incident History & Duration Tracking**: Every emergency session logs elapsed response time, trigger source, GPS location, vitals snapshot, and resolution notes stored in `localStorage`.

### 2. ⚡ Autonomous Fall Detection Simulator
- **Interactive 10-Second "Are You Okay?" Prompt**: Simulates accelerometer shock telemetry.
- **Smart Escalation**: If the user does not dismiss the prompt within 10 seconds, CareX automatically triggers full SOS protocol and dispatches alerts to primary contacts.

### 3. 🎙️ Hands-Free Ambient Voice Emergency Trigger
- Powered by the **Web Speech Recognition API** with browser-compatibility graceful fallback.
- Say: `“CareX, emergency”` to instantly begin emergency dispatch hands-free if immobilized or across the room.

### 4. 📍 Real-Time GPS & OpenStreetMap Vicinity
- **High-Accuracy Geolocation**: Multi-satellite coordinates (`lat`, `lng`, accuracy radius in meters).
- **Reverse Geocoding**: Physical address, sector, city, and state resolution.
- **1-Tap Share**: Direct integration with the **Web Share API** with automatic clipboard fallback containing emergency coordinates and direct Google Maps links.
- **Vicinity Visualizer**: Interactive radar grid showing proximity to nearest hospitals and emergency trauma centers.

### 5. 🩺 Health Monitoring & Physiological Trend Graphing
- Real-time telemetry for **Heart Rate (BPM)**, **Blood Oxygen (SpO₂ %)**, **Blood Pressure (mmHg)**, and **Body Temperature (°F)**.
- **Custom Interactive SVG Chart**: Multi-timeframe view (**Today**, **7 Days**, **30 Days**) with dynamic Min/Max indicators, reference baseline guides, and smooth cubic bezier paths.
- **Manual Measurement Logger**: Allows users to record readings from physical BP cuffs or pulse oximeters.

### 6. 🤖 AI Health Insights Engine
- Evaluates vitals against individualized clinical baselines.
- Flags tachycardia spikes (e.g. HR > 110 BPM) and hypoxemia dips (SpO₂ ≤ 92%) with non-diagnostic lifestyle recommendations and 1-tap physician calling.
- Strictly adheres to clinical disclaimer guardrails.

### 7. 👥 Prioritized Emergency Contacts
- Add, edit, remove, and promote primary, secondary, and physician contacts.
- Direct `tel:` and prefilled `sms:` links.
- **Simulated Test Alert**: Test notifications to individual contacts with zero SMS provider fees.

### 8. 🛡️ Emergency Medical ID & Printable Card
- Critical medical passport containing blood group, known drug/food allergies, current medications, chronic conditions, and physician contacts.
- **Printable Medical ID Card**: Formatted for quick presentation to first responders and emergency paramedics.

### 9. 🔌 Emergency Dispatch Integration Gateway
- **Payload Inspector Modal**: Displays the exact JSON dispatch payload generated when an emergency is activated.
- Ready for seamless plug-and-play connection to **Twilio SMS**, **AWS SNS**, **Firebase Cloud Messaging**, or **911/112 PSAP Dispatch Webhooks**.

### 10. ♿ Accessibility Control Center (WCAG 2.2 AA Compliant)
- **Large Text Mode**: Enlarges typography and touch targets for senior citizens and visually impaired users.
- **High Contrast Mode**: Increases border strokes, contrasts, and high-visibility highlights.
- **Reduced Motion**: Disables vestibular-triggering animations and pulsing lights.
- **Simple Plain Language**: Replaces complex medical terminology with straightforward phrasing.
- **Dark & Light Mode**: Fluid system-preference matching with 1-click override.

---

## 🏆 Hackathon Demo / Evaluation Script

Judges and evaluators can experience the complete application in under 3 minutes using the built-in simulator presets:

| Step | Action | Expected Output |
|:---|:---|:---|
| **1. Explore Dashboard** | Open the CareX home screen | View current safety status (🟢 SAFE), GPS location, quick actions, and vitals summary. |
| **2. Simulate Abnormal Vitals** | Go to **Health Monitoring** or **Settings** → Click **"⚡ HR 112 BPM"** | Heart rate spikes to 112 BPM; AI Insight updates to **"Elevated Resting Heart Rate Detected"** with actionable guidance. |
| **3. Test Fall Detection** | Click **"Simulate Fall"** in the sidebar or quick actions | A 10-second countdown prompt appears with warning beeps. Dismiss it or let it expire. |
| **4. Trigger SOS Emergency** | Press the central **SOS button** (or header SOS) | 3-second countdown modal opens with escalating beeps. Lets you cancel or hit "Trigger Now". |
| **5. Emergency Safety Mode** | Let countdown complete or click **"Skip Countdown"** | Full-screen Emergency Safety Mode engages, native Web Audio siren blares, coordinates are locked, and mock SMS alerts are dispatched to all verified contacts. |
| **6. Inspect Dispatch Payload** | Click **"Inspect Dispatch Payload"** | Displays the full JSON data structure ready for Twilio/AWS SNS/911 PSAP integration. |
| **7. Resolve Emergency** | Click **"Mark Emergency Resolved"** and enter notes | Siren stops, resolution chime plays, and incident is archived into the immutable Emergency History log. |
| **8. Check History** | Navigate to **Emergency History** | View duration, exact timestamp, location snapshot, and notes from the resolved emergency. |
| **9. Test Accessibility** | Toggle **High Contrast** & **Large Text** in Header or Settings | UI transforms with reinforced contrast borders and larger typography. |
| **10. Voice SOS** | On supported browsers (Chrome/Edge), tap mic and say **"CareX, emergency"** | Emergency countdown launches completely hands-free! |

---

## 🏗️ Architecture & Tech Stack

```
cool-meitner/
├── public/
│   ├── favicon.svg          # CareX medical badge SVG icon
│   ├── manifest.json        # Web App Manifest for PWA installation
│   ├── robots.txt           # Search engine crawling rules
│   └── sitemap.xml          # Sitemap for SEO optimization
├── src/
│   ├── components/
│   │   ├── contacts/        # EmergencyContactsView
│   │   ├── dashboard/       # DashboardView, GreetingCard, VitalsSummaryGrid, AIInsightCard, QuickActions
│   │   ├── emergency/       # EmergencySafetyMode, EmergencyStandbyView, SosCountdownModal, FallDetectionModal, PayloadInspectorModal
│   │   ├── health/          # HealthDashboard, VitalsChart (custom SVG chart)
│   │   ├── history/         # EmergencyHistoryView
│   │   ├── layout/          # Header, Sidebar, MobileNav, MedicalDisclaimer
│   │   ├── location/        # LocationView (GPS coordinates & map grid)
│   │   ├── onboarding/      # OnboardingModal (first-time walkthrough)
│   │   ├── profile/         # HealthProfileView (Medical ID & print card)
│   │   ├── services/        # EmergencyServicesView (nearby hospitals & pharmacies)
│   │   ├── settings/        # SettingsView (Accessibility, Siren controls, Demo presets)
│   │   └── voice/           # VoiceSosWidget (Web Speech Hands-Free SOS)
│   ├── context/
│   │   ├── careXContextDef.ts # Context types and React Context instance
│   │   ├── CareXProvider.tsx  # Central state management & localStorage sync
│   │   ├── useCareX.ts        # Custom consumer hook
│   │   └── index.ts           # Clean barrel exports
│   ├── services/
│   │   ├── geoService.ts    # Geolocation API, reverse geocode, Web Share API
│   │   ├── mockData.ts      # Seed contacts, vitals, facilities, and initial history
│   │   ├── soundEffects.ts  # Native Web Audio API synthesizer (no audio assets)
│   │   └── speechService.ts # Web Speech Recognition API wrapper
│   ├── types/
│   │   └── index.ts         # Strict TypeScript domain interfaces
│   ├── App.tsx              # Root application router and modal layer
│   ├── index.css            # Tailwind v4 directives, animations & a11y overrides
│   └── main.tsx             # React 19 entry point
├── package.json             # Scripts and dependencies
├── tsconfig.json            # Strict TypeScript configuration
├── vercel.json              # Vercel SPA rewrites and caching headers
└── vite.config.ts           # Vite + Tailwind CSS v4 configuration
```

---

## 🚀 Quickstart & Development

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Installation & Run
```bash
# Clone or navigate to the repository
cd cool-meitner

# Install dependencies
npm install

# Start development server
npm run dev

# Run oxlint check (Zero warnings!)
npm run lint

# Run clean production build
npm run build

# Preview production build locally
npm run preview
```

---

## ☁️ Vercel Deployment

CareX is pre-configured for one-click deployment on **Vercel**:

1. Push this repository to GitHub / GitLab.
2. Import the project in your [Vercel Dashboard](https://vercel.com/new).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. The included `vercel.json` automatically handles single-page app rewrites and immutable asset caching.

---

## ⚖️ Medical & Regulatory Disclaimer

> **IMPORTANT DISCLAIMER**: CareX is an assistive digital prototype intended for personal health tracking, demonstration, and emergency escalation workflows. **CareX is not a certified medical device, does not provide medical diagnosis or treatment, and does not directly replace statutory public safety answering points (PSAPs like 911, 112, or 999).** In a genuine medical crisis, call local emergency authorities immediately.

---

## 👨‍💻 Developer

**Vishal Kumar Yadav**

- GitHub: https://github.com/vishalk-yadav
- Project Repository: https://github.com/vishalk-yadav/CareX


## 📄 License
MIT License © 2026 CareX Health Technologies. Designed & built for hackathon excellence.

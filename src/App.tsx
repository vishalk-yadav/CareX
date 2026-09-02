import React, { useEffect } from 'react';
import { CareXProvider, useCareX } from './context';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { MedicalDisclaimer } from './components/layout/MedicalDisclaimer';
import { DashboardView } from './components/dashboard/DashboardView';
import { HealthDashboard } from './components/health/HealthDashboard';
import { EmergencyStandbyView } from './components/emergency/EmergencyStandbyView';
import { EmergencyContactsView } from './components/contacts/EmergencyContactsView';
import { LocationView } from './components/location/LocationView';
import { HealthProfileView } from './components/profile/HealthProfileView';
import { EmergencyServicesView } from './components/services/EmergencyServicesView';
import { EmergencyHistoryView } from './components/history/EmergencyHistoryView';
import { SettingsView } from './components/settings/SettingsView';
import { SosCountdownModal } from './components/emergency/SosCountdownModal';
import { FallDetectionModal } from './components/emergency/FallDetectionModal';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { ToastContainer } from './components/common/ToastContainer';
import { OfflineBanner } from './components/common/OfflineBanner';
import { KeyboardShortcutsModal } from './components/common/KeyboardShortcutsModal';
import { HackathonDemoBar } from './components/common/HackathonDemoBar';

const AppContent: React.FC = () => {
  const { activeTab, cancelSosCountdown, sosCountdown } = useCareX();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sosCountdown !== null) {
        cancelSosCountdown();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sosCountdown, cancelSosCountdown]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'health':
        return <HealthDashboard />;
      case 'emergency':
        return <EmergencyStandbyView />;
      case 'contacts':
        return <EmergencyContactsView />;
      case 'location':
        return <LocationView />;
      case 'profile':
        return <HealthProfileView />;
      case 'services':
        return <EmergencyServicesView />;
      case 'history':
        return <EmergencyHistoryView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors">
      <Header />
      <OfflineBanner />

      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar />

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24 md:pb-12 max-w-7xl mx-auto w-full">
          {renderActiveTab()}
          <MedicalDisclaimer />
        </main>
      </div>

      <MobileNav />

      <SosCountdownModal />
      <FallDetectionModal />
      <OnboardingModal />
      <ToastContainer />
      <KeyboardShortcutsModal />
      <HackathonDemoBar />
    </div>
  );
};

export default function App() {
  return (
    <CareXProvider>
      <AppContent />
    </CareXProvider>
  );
}

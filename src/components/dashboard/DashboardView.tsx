import React from 'react';
import { GreetingCard } from './GreetingCard';
import { VitalsSummaryGrid } from './VitalsSummaryGrid';
import { AIInsightCard } from './AIInsightCard';
import { QuickActions } from './QuickActions';
import { VoiceSosWidget } from '../voice/VoiceSosWidget';

export const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Main Greeting & Prominent SOS Button */}
      <GreetingCard />

      {/* 2. Quick Safety Actions Row */}
      <QuickActions />

      {/* 3. AI Health Insight Component */}
      <AIInsightCard />

      {/* 4. Physiological Vitals Grid */}
      <VitalsSummaryGrid />

      {/* 5. Voice Emergency Assistant */}
      <VoiceSosWidget />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AwarenessDashboard } from './components/AwarenessDashboard';
import { KnowYourScamsSection } from './components/KnowYourScamsSection';
import { ScamDetectorView } from './components/ScamDetectorView';
import { WhatToDoView } from './components/WhatToDoView';
import { SafetyTipsView } from './components/SafetyTipsView';
import { ScamDetailModal } from './components/ScamDetailModal';
import { ReportScamModal } from './components/ReportScamModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { Footer } from './components/Footer';
import { ScamCategory } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedScam, setSelectedScam] = useState<ScamCategory | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Sync dark mode class with HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleOpenDetector = () => {
    setActiveTab('detector');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreScams = () => {
    setActiveTab('scams');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAudit = () => {
    setActiveTab('safety-tips');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInspectInDetector = (sampleText: string, sender: string) => {
    setActiveTab('detector');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="cybershield-app-root"
      className={`min-h-screen relative font-body transition-colors duration-300 ${
        isDarkMode
          ? 'bg-[#0a0e14] text-[#dfe2eb]'
          : 'bg-slate-900 text-slate-100'
      }`}
    >
      {/* Grid Background Layer specified in design */}
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0 opacity-80" />

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDetector={handleOpenDetector}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-10 pt-20 pb-16">
        {activeTab === 'home' && (
          <>
            {/* Hero Section matching exact design */}
            <HeroSection
              onExploreScams={handleExploreScams}
              onCheckMessage={handleOpenDetector}
              onOpenReport={() => setIsReportOpen(true)}
            />

            {/* Live Awareness Dashboard matching exact design */}
            <AwarenessDashboard
              onCheckScam={handleOpenDetector}
              onOpenAudit={handleOpenAudit}
            />

            {/* Know Your Enemy Grid matching exact design */}
            <KnowYourScamsSection
              onSelectScam={(scam) => setSelectedScam(scam)}
              showAllExpanded={false}
            />
          </>
        )}

        {activeTab === 'scams' && (
          <KnowYourScamsSection
            onSelectScam={(scam) => setSelectedScam(scam)}
            showAllExpanded={true}
          />
        )}

        {activeTab === 'detector' && (
          <ScamDetectorView
            onNavigateToPlaybooks={() => {
              setActiveTab('what-to-do');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenReport={() => setIsReportOpen(true)}
          />
        )}

        {activeTab === 'what-to-do' && (
          <WhatToDoView />
        )}

        {activeTab === 'safety-tips' && (
          <SafetyTipsView />
        )}
      </main>

      {/* Footer matching design */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Modals */}
      <ScamDetailModal
        scam={selectedScam}
        onClose={() => setSelectedScam(null)}
        onCheckSuspicious={handleInspectInDetector}
      />

      <ReportScamModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectScam={(scam) => setSelectedScam(scam)}
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

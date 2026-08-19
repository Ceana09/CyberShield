import React, { useState } from 'react';
import { Shield, Moon, Sun, Search, Menu, X, ShieldAlert, AlertTriangle } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDetector: () => void;
  onOpenSearch: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDetector,
  onOpenSearch,
  isDarkMode,
  setIsDarkMode,
  onOpenReport
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'scams', label: 'Know the Scams' },
    { id: 'detector', label: 'Scam Detector' },
    { id: 'what-to-do', label: 'What To Do' },
    { id: 'safety-tips', label: 'Safety Tips' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 w-full z-50 transition-colors duration-300 border-b ${
        isDarkMode
          ? 'bg-[#10141a]/85 border-[#3c494e]/30 shadow-xl shadow-[#a8e8ff]/5 backdrop-blur-xl'
          : 'bg-white/90 border-slate-200 shadow-md backdrop-blur-xl'
      }`}
    >
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-5 md:px-12 h-20">
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => handleNavClick('home')}
          className="font-headline text-2xl font-extrabold text-[#a8e8ff] flex items-center gap-2.5 focus:outline-none group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#c7fff0]/10 border border-[#a8e8ff]/30 flex items-center justify-center group-hover:border-[#a8e8ff] transition-all shadow-[0_0_15px_rgba(168,232,255,0.2)]">
            <Shield className="w-5 h-5 text-[#a8e8ff] fill-[#a8e8ff]/40" />
          </div>
          <span className="bg-gradient-to-r from-[#a8e8ff] via-[#b4ebff] to-[#c7fff0] bg-clip-text text-transparent font-bold tracking-tight">
            CyberShield
          </span>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`font-body text-sm font-semibold transition-all py-1 relative cursor-pointer ${
                  isActive
                    ? 'text-[#a8e8ff] font-bold'
                    : isDarkMode
                    ? 'text-[#bbc9cf] hover:text-[#a8e8ff]'
                    : 'text-slate-600 hover:text-cyan-600'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-[-4px] left-0 w-full h-[2.5px] bg-gradient-to-r from-[#a8e8ff] to-[#00d4ff] rounded-full shadow-[0_0_8px_rgba(168,232,255,0.8)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Actions Right */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Quick Search */}
          <button
            id="nav-search-btn"
            onClick={onOpenSearch}
            aria-label="Search scams"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#bbc9cf] hover:text-[#a8e8ff] hover:bg-[#a8e8ff]/10 transition-all cursor-pointer"
            title="Search Scams & Safety Rules (Cmd+K)"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Dark / Light Toggle */}
          <button
            id="nav-theme-toggle-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#bbc9cf] hover:text-[#a8e8ff] hover:bg-[#a8e8ff]/10 transition-all cursor-pointer"
            title={isDarkMode ? 'Switch to Light theme' : 'Switch to Dark theme'}
          >
            {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-500" />}
          </button>

          {/* Check a Scam Primary CTA */}
          <button
            id="nav-check-scam-btn"
            onClick={onOpenDetector}
            className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-[#a8e8ff] via-[#3cd7ff] to-[#c7fff0] text-[#003642] font-headline text-sm font-bold px-5 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(168,232,255,0.5)] transition-all transform hover:scale-[1.02] cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Check a Scam</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-[#bbc9cf] hover:text-[#a8e8ff] hover:bg-[#a8e8ff]/10 transition-all"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="md:hidden border-t border-[#3c494e]/30 bg-[#10141a]/95 backdrop-blur-2xl px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top-2"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left text-base font-semibold py-2.5 px-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-[#a8e8ff]/15 text-[#a8e8ff]'
                  : 'text-[#bbc9cf] hover:bg-[#1c2026] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#3c494e]/30 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onOpenDetector();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-[#a8e8ff] to-[#c7fff0] text-[#003642] font-bold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              Check a Suspicious Message
            </button>
            <button
              onClick={() => {
                onOpenReport();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#1c2026] border border-[#ffb4ab]/30 text-[#ffb4ab] font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#ffb4ab]/10"
            >
              <AlertTriangle className="w-4 h-4" />
              Report a Scam Alert
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

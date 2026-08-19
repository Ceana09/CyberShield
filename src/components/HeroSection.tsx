import React from 'react';
import { ArrowRight, ShieldCheck, ShieldAlert, KeyRound, Lock, Eye, AlertOctagon } from 'lucide-react';

interface HeroSectionProps {
  onExploreScams: () => void;
  onCheckMessage: () => void;
  onOpenReport: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreScams,
  onCheckMessage,
  onOpenReport
}) => {
  return (
    <section
      id="hero-section"
      className="relative max-w-[1280px] mx-auto px-5 md:px-12 pt-8 pb-16 min-h-[640px] lg:min-h-[720px] flex flex-col lg:flex-row items-center justify-between gap-12"
    >
      {/* Left Column: Hero Content */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 relative z-10 text-left">
        {/* Platform Badge */}
        <div
          id="hero-platform-badge"
          className="inline-flex items-center gap-2 bg-[#a8e8ff]/10 text-[#a8e8ff] px-3.5 py-1.5 rounded-full w-fit border border-[#a8e8ff]/25 backdrop-blur-md shadow-[0_0_15px_rgba(168,232,255,0.15)]"
        >
          <span className="material-symbols-outlined text-sm font-semibold text-[#a8e8ff]">
            shield_lock
          </span>
          <span className="font-body text-xs font-semibold uppercase tracking-wider text-[#a8e8ff]">
            Digital Vigilance Platform
          </span>
        </div>

        {/* Hero Title */}
        <h1
          id="hero-title"
          className="font-headline text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#dfe2eb] leading-[1.1] tracking-tight text-glow"
        >
          Think Before You <br />
          <span className="gradient-text text-glow">Click.</span>
        </h1>

        {/* Hero Description */}
        <p
          id="hero-description"
          className="font-body text-lg text-[#bbc9cf] max-w-xl leading-relaxed"
        >
          Learn to recognize cyber scams, protect your digital identity, and navigate the web with confidence. Your first line of defense is awareness.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2">
          <button
            id="hero-explore-scams-btn"
            onClick={onExploreScams}
            className="bg-gradient-to-r from-[#a8e8ff] via-[#3cd7ff] to-[#c7fff0] text-[#003642] font-headline text-sm font-bold px-7 py-3.5 rounded-xl hover:shadow-[0_0_25px_rgba(168,232,255,0.6)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Explore Common Scams</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-check-message-btn"
            onClick={onCheckMessage}
            className="glass-panel text-[#a8e8ff] hover:text-white font-headline text-sm font-bold px-7 py-3.5 rounded-xl hover:bg-[#a8e8ff]/10 hover:border-[#a8e8ff]/50 transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_0_15px_rgba(168,232,255,0.05)]"
          >
            <span className="material-symbols-outlined text-base">policy</span>
            <span>Check Suspicious Message</span>
          </button>
        </div>

        {/* Quick Trust / Threat Badges */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#3c494e]/30 text-xs text-[#bbc9cf]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f2d1] animate-pulse"></span>
            <span>Zero-Log Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3cd7ff]"></span>
            <span>AI Scam Detection</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ffb4ab]"></span>
            <span>Real-Time Threat Feeds</span>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Diamond Shield & Floating Threat Badges */}
      <div className="w-full lg:w-1/2 relative h-[420px] sm:h-[480px] flex items-center justify-center">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-[#a8e8ff]/10 rounded-full blur-[110px] pointer-events-none -z-10 animate-pulse"></div>

        {/* Central Rotated 45-degree Glass Diamond Shield */}
        <div
          id="hero-shield-diamond"
          className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 border-2 border-[#a8e8ff]/35 rounded-3xl rotate-45 flex items-center justify-center glass-panel shadow-[0_0_40px_rgba(0,212,255,0.2)] hover:border-[#a8e8ff]/70 transition-all group"
        >
          {/* Inner un-rotated content */}
          <div className="-rotate-45 text-[#a8e8ff] text-center flex flex-col items-center justify-center select-none">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-[#a8e8ff]/20 to-transparent flex items-center justify-center border border-[#a8e8ff]/30 shadow-[0_0_20px_rgba(168,232,255,0.3)] mb-2 group-hover:scale-105 transition-transform">
              <span
                className="material-symbols-outlined text-[64px] text-[#a8e8ff]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                security
              </span>
            </div>
            <div className="font-headline text-xl sm:text-2xl font-black tracking-widest text-[#dfe2eb] text-glow">
              SECURE
            </div>
            <div className="text-[11px] font-mono text-[#a8e8ff]/80 uppercase tracking-wider mt-0.5">
              Defended 24/7
            </div>
          </div>
        </div>

        {/* Floating Element 1: Phishing Risk (Top Right) */}
        <div
          id="floating-badge-phishing"
          className="absolute top-6 sm:top-12 right-2 sm:right-8 glass-panel border-[#ffb4ab]/30 p-3 sm:p-3.5 rounded-xl flex items-center gap-2.5 shadow-[0_8px_24px_rgba(147,0,10,0.3)] animate-[bounce_4s_infinite] cursor-pointer hover:border-[#ffb4ab] transition-all z-20"
          onClick={onCheckMessage}
          title="Click to check phishing threats"
        >
          <div className="w-8 h-8 rounded-lg bg-[#93000a]/40 border border-[#ffb4ab]/30 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-lg text-[#ffb4ab]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              phishing
            </span>
          </div>
          <div className="text-left">
            <div className="font-headline text-xs font-bold text-[#ffb4ab]">
              Phishing Risk
            </div>
            <div className="font-body text-[10px] text-[#bbc9cf]">
              Threat Level: Active
            </div>
          </div>
        </div>

        {/* Floating Element 2: OTP Alert (Bottom Left) */}
        <div
          id="floating-badge-otp"
          className="absolute bottom-6 sm:bottom-12 left-2 sm:left-6 glass-panel border-[#00f2d1]/30 p-3 sm:p-3.5 rounded-xl flex items-center gap-2.5 shadow-[0_8px_24px_rgba(0,242,209,0.2)] animate-[bounce_5s_infinite_reverse] cursor-pointer hover:border-[#00f2d1] transition-all z-20"
          onClick={onExploreScams}
          title="Never share OTPs"
        >
          <div className="w-8 h-8 rounded-lg bg-[#00382f]/60 border border-[#00f2d1]/30 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-lg text-[#26fedc]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              password
            </span>
          </div>
          <div className="text-left">
            <div className="font-headline text-xs font-bold text-[#c7fff0]">
              OTP Alert
            </div>
            <div className="font-body text-[10px] text-[#bbc9cf]">
              Never Share With Anyone
            </div>
          </div>
        </div>

        {/* Floating Element 3: Verification Verified (Top Left) */}
        <div
          className="hidden sm:flex absolute top-10 left-8 glass-panel border-[#a8e8ff]/20 px-3 py-2 rounded-lg items-center gap-2 text-xs text-[#a8e8ff] z-20 opacity-80 hover:opacity-100 transition-opacity"
        >
          <ShieldCheck className="w-4 h-4 text-[#3cd7ff]" />
          <span>Real-time Inspection</span>
        </div>
      </div>
    </section>
  );
};

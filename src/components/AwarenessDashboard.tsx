import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle2, Radar, ArrowUpRight, ShieldCheck, RefreshCw, Radio } from 'lucide-react';

interface AwarenessDashboardProps {
  onCheckScam: () => void;
  onOpenAudit: () => void;
}

export const AwarenessDashboard: React.FC<AwarenessDashboardProps> = ({
  onCheckScam,
  onOpenAudit
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <section
      id="awareness-dashboard-section"
      className="max-w-[1280px] mx-auto px-5 md:px-12 py-12"
    >
      {/* Section Header with Gradient Divider Line */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-grow">
          <h2
            id="awareness-dashboard-title"
            className="font-headline text-2xl sm:text-3xl font-bold text-[#dfe2eb] tracking-tight shrink-0"
          >
            Awareness Dashboard
          </h2>
          <div className="h-px bg-gradient-to-r from-[#a8e8ff]/60 via-[#a8e8ff]/20 to-transparent flex-grow hidden sm:block" />
        </div>

        {/* Live Refresh & Timeframe Pills */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#181c22] border border-[#3c494e]/40 text-xs font-medium text-[#bbc9cf]">
            <Radio className="w-3.5 h-3.5 text-[#00f2d1] animate-pulse" />
            <span className="text-[#00f2d1] font-semibold">LIVE</span>
            <span className="hidden md:inline text-[11px] text-[#859398]">| Global Telemetry</span>
          </div>

          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-lg bg-[#181c22] border border-[#3c494e]/40 text-[#bbc9cf] hover:text-[#a8e8ff] hover:border-[#a8e8ff]/40 transition-all"
            title="Refresh active metrics"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#a8e8ff]' : ''}`} />
          </button>
        </div>
      </div>

      {/* 4 Stat Cards matching design screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Card 1: Phishing Attempts */}
        <div
          id="stat-card-phishing-attempts"
          className="glass-panel p-6 rounded-2xl flex flex-col justify-between gap-4 relative overflow-hidden group hover:border-[#a8e8ff]/40 transition-all"
        >
          <div className="flex justify-between items-start">
            <span className="font-body text-sm font-semibold text-[#bbc9cf]">
              Phishing Attempts
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#a8e8ff]/10 flex items-center justify-center text-[#a8e8ff] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-lg text-[#a8e8ff]">
                trending_up
              </span>
            </div>
          </div>

          <div>
            <div className="font-headline text-3xl sm:text-4xl font-extrabold text-[#dfe2eb] tracking-tight">
              45%
            </div>
            <div className="text-xs text-[#bbc9cf] mt-1 flex items-center gap-1">
              <span className="text-[#ffb4ab] font-bold">+8.4%</span>
              <span>vs last quarter</span>
            </div>
          </div>

          {/* Glowing Progress Bar */}
          <div className="w-full bg-[#1c2026] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#a8e8ff] h-full w-[45%] rounded-full shadow-[0_0_12px_rgba(168,232,255,0.9)] transition-all duration-700"
            />
          </div>
        </div>

        {/* Stat Card 2: Identity Theft Risk */}
        <div
          id="stat-card-identity-theft"
          className="glass-panel p-6 rounded-2xl flex flex-col justify-between gap-4 relative overflow-hidden group hover:border-[#ffb4ab]/50 transition-all"
        >
          <div className="flex justify-between items-start">
            <span className="font-body text-sm font-semibold text-[#bbc9cf]">
              Identity Theft Risk
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#ffb4ab]/10 flex items-center justify-center text-[#ffb4ab] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-lg text-[#ffb4ab]">
                warning
              </span>
            </div>
          </div>

          <div>
            <div className="font-headline text-3xl sm:text-4xl font-extrabold text-[#ffb4ab] text-glow-red tracking-tight">
              High
            </div>
            <div className="text-xs text-[#bbc9cf] mt-1">
              Top vector: SMS & KYC traps
            </div>
          </div>

          {/* Glowing Progress Bar */}
          <div className="w-full bg-[#1c2026] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#ffb4ab] h-full w-[80%] rounded-full shadow-[0_0_12px_rgba(255,180,171,0.9)] transition-all duration-700"
            />
          </div>
        </div>

        {/* Stat Card 3: Secure Passwords */}
        <div
          id="stat-card-secure-passwords"
          onClick={onOpenAudit}
          className="glass-panel p-6 rounded-2xl flex flex-col justify-between gap-4 relative overflow-hidden group hover:border-[#c7fff0]/40 transition-all cursor-pointer"
          title="Click to assess your password & hygiene strength"
        >
          <div className="flex justify-between items-start">
            <span className="font-body text-sm font-semibold text-[#bbc9cf]">
              Secure Passwords
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#c7fff0]/10 flex items-center justify-center text-[#c7fff0] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-lg text-[#c7fff0]">
                check_circle
              </span>
            </div>
          </div>

          <div>
            <div className="font-headline text-3xl sm:text-4xl font-extrabold text-[#dfe2eb] tracking-tight">
              24%
            </div>
            <div className="text-xs text-[#bbc9cf] mt-1 flex items-center gap-1">
              <span>Average user compliance</span>
              <ArrowUpRight className="w-3 h-3 text-[#c7fff0] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Glowing Progress Bar */}
          <div className="w-full bg-[#1c2026] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#c7fff0] h-full w-[24%] rounded-full shadow-[0_0_12px_rgba(199,255,240,0.9)] transition-all duration-700"
            />
          </div>
        </div>

        {/* Stat Card 4: System Status */}
        <div
          id="stat-card-system-status"
          className="glass-panel p-6 rounded-2xl flex flex-col justify-between gap-4 bg-[#a8e8ff]/5 border-[#a8e8ff]/30 relative overflow-hidden group shadow-[0_0_20px_rgba(168,232,255,0.08)]"
        >
          <div className="flex justify-between items-start">
            <span className="font-body text-sm font-bold text-[#a8e8ff]">
              System Status
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#a8e8ff]/20 flex items-center justify-center text-[#a8e8ff]">
              <span className="material-symbols-outlined text-lg text-[#a8e8ff] animate-pulse">
                radar
              </span>
            </div>
          </div>

          <div>
            <div className="font-headline text-3xl sm:text-4xl font-extrabold text-[#a8e8ff] text-glow tracking-tight flex items-center gap-2">
              <span>Vigilant</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f2d1] animate-ping" />
            </div>
            <p className="font-body text-xs text-[#bbc9cf] mt-1">
              Monitoring active threats...
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#a8e8ff]/80 pt-1 border-t border-[#a8e8ff]/15">
            <span>DEFCON-3</span>
            <span>Neural Radar Active</span>
          </div>
        </div>
      </div>

      {/* Live Community Threat Banner */}
      <div className="mt-6 p-4 rounded-xl glass-panel border-[#3c494e]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#14181f]/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#ffb4ab]/15 border border-[#ffb4ab]/30 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-[#ffb4ab]" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#ffb4ab] flex items-center gap-2">
              <span>Active Spike Detected</span>
              <span className="text-[10px] text-[#bbc9cf]">• Surge in fake parcel redelivery SMS (.top / .xyz domains)</span>
            </div>
            <div className="text-xs text-[#bbc9cf] mt-0.5">
              Over 1,240 reports logged in last 6 hours claiming postal delivery failures.
            </div>
          </div>
        </div>

        <button
          onClick={onCheckScam}
          className="shrink-0 text-xs font-bold text-[#003642] bg-[#a8e8ff] hover:bg-[#c7fff0] px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(168,232,255,0.4)]"
        >
          <span>Scan Suspicious SMS</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};

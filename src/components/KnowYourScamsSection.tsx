import React, { useState, useMemo } from 'react';
import { SCAM_CATEGORIES } from '../data/scamsData';
import { ScamCategory } from '../types';
import { Search, Filter, ArrowRight, ShieldAlert, Sparkles, Grid } from 'lucide-react';

interface KnowYourScamsSectionProps {
  onSelectScam: (scam: ScamCategory) => void;
  showAllExpanded?: boolean;
}

export const KnowYourScamsSection: React.FC<KnowYourScamsSectionProps> = ({
  onSelectScam,
  showAllExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(showAllExpanded);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<'All' | 'High Risk' | 'Med Risk'>('All');

  const filteredScams = useMemo(() => {
    return SCAM_CATEGORIES.filter((scam) => {
      const matchesSearch =
        scam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scam.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scam.keyTactics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesRisk =
        selectedRiskFilter === 'All' || scam.badgeRisk === selectedRiskFilter;
      return matchesSearch && matchesRisk;
    });
  }, [searchQuery, selectedRiskFilter]);

  // Initial 3 featured scams matching the screenshot
  const initialFeaturedScams = SCAM_CATEGORIES.slice(0, 3);

  return (
    <section
      id="know-the-scams-section"
      className="max-w-[1280px] mx-auto px-5 md:px-12 py-16"
    >
      {/* Centered Heading */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a8e8ff]/10 border border-[#a8e8ff]/25 text-[#a8e8ff] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Threat Encyclopedia</span>
        </div>
        <h2
          id="know-your-enemy-title"
          className="font-headline text-3xl sm:text-4xl font-extrabold text-[#dfe2eb] tracking-tight mb-3 text-glow"
        >
          Know Your Enemy
        </h2>
        <p className="font-body text-base text-[#bbc9cf] max-w-2xl mx-auto">
          Familiarize yourself with the most common tactics used by cybercriminals today.
        </p>
      </div>

      {/* Directory Filter Bar (Only visible when fully expanded or in scams tab) */}
      {(isExpanded || showAllExpanded) && (
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border-[#3c494e]/30">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#859398] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="scam-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scams, tactics, keywords..."
              className="w-full bg-[#0a0e14]/70 border border-[#3c494e]/50 rounded-xl pl-10 pr-4 py-2 text-sm text-[#dfe2eb] placeholder-[#859398] focus:outline-none focus:border-[#a8e8ff] transition-all"
            />
          </div>

          {/* Risk Filter Pills */}
          <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
            <span className="text-xs text-[#859398] font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {(['All', 'High Risk', 'Med Risk'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedRiskFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedRiskFilter === filter
                    ? 'bg-[#a8e8ff] text-[#003642] shadow-[0_0_10px_rgba(168,232,255,0.4)]'
                    : 'bg-[#181c22] text-[#bbc9cf] hover:text-white border border-[#3c494e]/40'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cards Grid */}
      {!isExpanded && !showAllExpanded ? (
        /* 4-Column Layout matching design screenshot */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialFeaturedScams.map((scam) => (
            <div
              key={scam.id}
              id={`scam-card-${scam.id}`}
              onClick={() => onSelectScam(scam)}
              className="glass-panel p-6 rounded-2xl group relative overflow-hidden flex flex-col justify-between hover:border-[#a8e8ff]/50 transition-all cursor-pointer"
            >
              {/* Risk Badge Top Right */}
              <div className="absolute top-4 right-4">
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    scam.badgeRisk === 'High Risk'
                      ? 'bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/30'
                      : 'bg-[#005144]/40 text-[#c7fff0] border border-[#00f2d1]/30'
                  }`}
                >
                  {scam.badgeRisk}
                </span>
              </div>

              <div>
                {/* Large Icon */}
                <div className="mb-5 text-[#a8e8ff] group-hover:scale-110 transition-transform origin-left">
                  <span
                    className="material-symbols-outlined text-[40px] text-[#a8e8ff]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {scam.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-headline text-xl font-bold text-[#dfe2eb] mb-2 group-hover:text-[#a8e8ff] transition-colors">
                  {scam.title}
                </h3>

                {/* Summary */}
                <p className="font-body text-sm text-[#bbc9cf] leading-relaxed mb-6 line-clamp-3">
                  {scam.summary}
                </p>
              </div>

              {/* Learn More Link */}
              <div className="text-[#a8e8ff] font-body text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all pt-2 border-t border-[#3c494e]/20">
                <span>Learn More</span>
                <span className="material-symbols-outlined text-sm font-bold">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}

          {/* 4th Card: View All 10 Categories */}
          <div
            id="view-all-categories-card"
            onClick={() => setIsExpanded(true)}
            className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center border-dashed border-[#3c494e]/60 hover:border-[#a8e8ff]/60 hover:bg-[#a8e8ff]/5 cursor-pointer transition-all min-h-[260px] group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#a8e8ff]/10 border border-[#a8e8ff]/20 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#a8e8ff]/20 transition-all shadow-[0_0_15px_rgba(168,232,255,0.1)]">
              <span className="material-symbols-outlined text-3xl text-[#a8e8ff]">
                grid_view
              </span>
            </div>
            <div className="font-headline text-base font-bold text-[#dfe2eb] group-hover:text-[#a8e8ff] transition-colors">
              View All 10 Categories
            </div>
            <div className="font-body text-xs text-[#bbc9cf] mt-1 max-w-[180px]">
              Explore crypto, tech support, courier & AI voice scams
            </div>
          </div>
        </div>
      ) : (
        /* Full 10 Categories Directory */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScams.map((scam) => (
            <div
              key={scam.id}
              id={`full-scam-card-${scam.id}`}
              onClick={() => onSelectScam(scam)}
              className="glass-panel p-6 rounded-2xl group relative overflow-hidden flex flex-col justify-between hover:border-[#a8e8ff]/50 transition-all cursor-pointer hover:shadow-[0_8px_30px_rgba(0,212,255,0.1)]"
            >
              {/* Risk Badge */}
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#a8e8ff]/10 border border-[#a8e8ff]/20 flex items-center justify-center text-[#a8e8ff] group-hover:scale-105 group-hover:border-[#a8e8ff]/50 transition-all">
                  <span
                    className="material-symbols-outlined text-2xl text-[#a8e8ff]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {scam.icon}
                  </span>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    scam.badgeRisk === 'High Risk'
                      ? 'bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/30'
                      : 'bg-[#005144]/40 text-[#c7fff0] border border-[#00f2d1]/30'
                  }`}
                >
                  {scam.badgeRisk}
                </span>
              </div>

              <div>
                <h3 className="font-headline text-lg font-bold text-[#dfe2eb] mb-2 group-hover:text-[#a8e8ff] transition-colors">
                  {scam.title}
                </h3>
                <p className="font-body text-xs text-[#bbc9cf] leading-relaxed mb-4 line-clamp-3">
                  {scam.summary}
                </p>

                {/* Key Tactics Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {scam.keyTactics.slice(0, 2).map((tactic, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#181c22] border border-[#3c494e]/40 text-[#bbc9cf] truncate max-w-full"
                    >
                      {tactic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="text-[#a8e8ff] font-body text-xs font-bold flex items-center justify-between pt-3 border-t border-[#3c494e]/30">
                <span>View Full Threat Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

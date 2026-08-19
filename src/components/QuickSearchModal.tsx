import React, { useState, useEffect, useMemo } from 'react';
import { SCAM_CATEGORIES } from '../data/scamsData';
import { INCIDENT_PLAYBOOKS } from '../data/playbooksData';
import { SAFETY_TIPS } from '../data/securityAuditData';
import { Search, X, ShieldAlert, BookOpen, AlertTriangle, ArrowRight } from 'lucide-react';
import { ScamCategory } from '../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScam: (scam: ScamCategory) => void;
  onNavigateToTab: (tab: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectScam,
  onNavigateToTab
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return { scams: [], playbooks: [], tips: [] };
    const q = query.toLowerCase();

    const scams = SCAM_CATEGORIES.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      s.keyTactics.some(t => t.toLowerCase().includes(q))
    );

    const playbooks = INCIDENT_PLAYBOOKS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q)
    );

    const tips = SAFETY_TIPS.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.rule.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    );

    return { scams, playbooks, tips };
  }, [query]);

  if (!isOpen) return null;

  const hasResults = results.scams.length > 0 || results.playbooks.length > 0 || results.tips.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border-[#a8e8ff]/40 shadow-2xl overflow-hidden">
        {/* Search Header */}
        <div className="p-4 border-b border-[#3c494e]/40 flex items-center gap-3 bg-[#10141a]/90">
          <Search className="w-5 h-5 text-[#a8e8ff] shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search all scams, emergency steps, or tactics..."
            className="w-full bg-transparent text-sm text-[#dfe2eb] placeholder-[#859398] focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-[#859398] hover:text-white">
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#181c22] border border-[#3c494e]/50 flex items-center justify-center text-[#bbc9cf] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query ? (
            <div className="p-6 text-center text-xs text-[#859398]">
              Try searching for: <span className="text-[#a8e8ff]">"UPI PIN"</span>, <span className="text-[#a8e8ff]">"USPS delivery"</span>, <span className="text-[#a8e8ff]">"Clicked a link"</span>, or <span className="text-[#a8e8ff]">"Password manager"</span>
            </div>
          ) : !hasResults ? (
            <div className="p-8 text-center text-xs text-[#bbc9cf]">
              No direct matches found for "{query}". Try checking the <strong>AI Scam Detector</strong> to analyze suspicious text.
            </div>
          ) : (
            <>
              {/* Scams Matches */}
              {results.scams.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#859398] mb-2 px-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#a8e8ff]" />
                    <span>Scam Categories ({results.scams.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.scams.map((scam) => (
                      <div
                        key={scam.id}
                        onClick={() => {
                          onSelectScam(scam);
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-[#181c22]/70 hover:bg-[#a8e8ff]/10 border border-[#3c494e]/30 hover:border-[#a8e8ff]/40 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-lg text-[#a8e8ff]">
                            {scam.icon}
                          </span>
                          <div>
                            <div className="font-headline text-xs font-bold text-[#dfe2eb]">
                              {scam.title}
                            </div>
                            <div className="font-body text-[11px] text-[#bbc9cf] line-clamp-1">
                              {scam.summary}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#a8e8ff] shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Emergency Playbooks Matches */}
              {results.playbooks.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#859398] mb-2 px-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#ffb4ab]" />
                    <span>Emergency Response Guides ({results.playbooks.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.playbooks.map((pb) => (
                      <div
                        key={pb.id}
                        onClick={() => {
                          onNavigateToTab('what-to-do');
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-[#181c22]/70 hover:bg-[#ffb4ab]/10 border border-[#3c494e]/30 hover:border-[#ffb4ab]/40 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-lg text-[#ffb4ab]">
                            {pb.icon}
                          </span>
                          <div>
                            <div className="font-headline text-xs font-bold text-[#dfe2eb]">
                              {pb.title}
                            </div>
                            <div className="font-body text-[11px] text-[#bbc9cf] line-clamp-1">
                              {pb.summary}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#ffb4ab] shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety Tips Matches */}
              {results.tips.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#859398] mb-2 px-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#00f2d1]" />
                    <span>Safety Golden Rules ({results.tips.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.tips.map((tip) => (
                      <div
                        key={tip.id}
                        onClick={() => {
                          onNavigateToTab('safety-tips');
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-[#181c22]/70 hover:bg-[#00f2d1]/10 border border-[#3c494e]/30 hover:border-[#00f2d1]/40 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="font-headline text-xs font-bold text-[#dfe2eb]">
                            {tip.title}
                          </div>
                          <div className="font-body text-[11px] text-[#c7fff0]">
                            {tip.rule}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#00f2d1] shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SAFETY_TIPS, SECURITY_QUESTIONS } from '../data/securityAuditData';
import { SPOT_THE_SCAM_CHALLENGES } from '../data/spotTheScamData';
import { SpotTheScamItem } from '../types';
import { ShieldCheck, Target, Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertTriangle, Lightbulb, Sparkles } from 'lucide-react';

export const SafetyTipsView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'tips' | 'spot-the-scam' | 'hygiene-audit'>('tips');

  // Spot the scam state
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userGuess, setUserGuess] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState(0);

  // Hygiene Audit state
  const [auditAnswers, setAuditAnswers] = useState<Record<string, number>>({});
  const [auditSubmitted, setAuditSubmitted] = useState(false);

  const currentChallenge: SpotTheScamItem = SPOT_THE_SCAM_CHALLENGES[currentChallengeIndex];

  const handleSpotGuess = (isScamGuess: boolean) => {
    if (userGuess !== null) return;
    setUserGuess(isScamGuess);
    setCompletedChallenges(prev => prev + 1);
    if (isScamGuess === currentChallenge.isScam) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextChallenge = () => {
    setUserGuess(null);
    if (currentChallengeIndex < SPOT_THE_SCAM_CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      setCurrentChallengeIndex(0);
    }
  };

  // Hygiene Score Calc
  const totalAuditScore = Object.values(auditAnswers).reduce<number>((acc, p) => acc + (typeof p === 'number' ? p : 0), 0);

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c7fff0]/10 border border-[#c7fff0]/30 text-[#c7fff0] text-xs font-semibold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Vigilance Defense Training</span>
        </div>
        <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-[#dfe2eb] tracking-tight mb-3 text-glow">
          Safety Tips & Interactive Training
        </h1>
        <p className="font-body text-base text-[#bbc9cf] max-w-2xl mx-auto">
          Strengthen your cyber defense reflexes with essential security golden rules, realistic spot-the-scam challenges, and a personal digital hygiene assessment.
        </p>
      </div>

      {/* Sub-Navigation Pills */}
      <div className="flex justify-center mb-10">
        <div className="p-1 rounded-xl bg-[#181c22] border border-[#3c494e]/40 flex flex-wrap gap-1">
          <button
            onClick={() => setActiveSubTab('tips')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'tips'
                ? 'bg-[#a8e8ff] text-[#003642] shadow-[0_0_15px_rgba(168,232,255,0.4)]'
                : 'text-[#bbc9cf] hover:text-white'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Golden Security Rules</span>
          </button>

          <button
            onClick={() => setActiveSubTab('spot-the-scam')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'spot-the-scam'
                ? 'bg-[#a8e8ff] text-[#003642] shadow-[0_0_15px_rgba(168,232,255,0.4)]'
                : 'text-[#bbc9cf] hover:text-white'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Spot the Scam Simulator</span>
          </button>

          <button
            onClick={() => setActiveSubTab('hygiene-audit')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'hygiene-audit'
                ? 'bg-[#a8e8ff] text-[#003642] shadow-[0_0_15px_rgba(168,232,255,0.4)]'
                : 'text-[#bbc9cf] hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Digital Hygiene Score</span>
          </button>
        </div>
      </div>

      {/* 1. Golden Rules Tab */}
      {activeSubTab === 'tips' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAFETY_TIPS.map((tip) => (
            <div
              key={tip.id}
              className="glass-panel p-6 rounded-2xl border-[#3c494e]/40 flex flex-col justify-between hover:border-[#a8e8ff]/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#a8e8ff] px-2.5 py-0.5 rounded bg-[#a8e8ff]/10 border border-[#a8e8ff]/20">
                    {tip.category}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#181c22] border border-[#3c494e]/40 flex items-center justify-center text-[#a8e8ff] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl">
                      {tip.icon}
                    </span>
                  </div>
                </div>

                <h3 className="font-headline text-lg font-bold text-[#dfe2eb] mb-2 group-hover:text-[#a8e8ff] transition-colors">
                  {tip.title}
                </h3>

                <div className="p-3 rounded-xl bg-[#0a0e14]/70 border border-[#3c494e]/30 text-xs font-mono font-bold text-[#c7fff0] mb-3">
                  💡 {tip.rule}
                </div>

                <p className="font-body text-xs text-[#bbc9cf] leading-relaxed">
                  {tip.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#3c494e]/20 flex items-center justify-between text-[11px] text-[#859398]">
                <span>CyberShield Vigilance Standard</span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#00f2d1]" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Spot the Scam Simulator */}
      {activeSubTab === 'spot-the-scam' && (
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar & Score */}
          <div className="flex items-center justify-between mb-4 text-xs font-mono text-[#bbc9cf]">
            <div>
              Challenge {currentChallengeIndex + 1} of {SPOT_THE_SCAM_CHALLENGES.length}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#a8e8ff] font-bold">Score: {score}/{completedChallenges}</span>
            </div>
          </div>

          <div className="w-full bg-[#1c2026] h-1.5 rounded-full mb-6 overflow-hidden">
            <div
              className="bg-[#a8e8ff] h-full transition-all duration-300 shadow-[0_0_10px_rgba(168,232,255,0.8)]"
              style={{ width: `${((currentChallengeIndex + 1) / SPOT_THE_SCAM_CHALLENGES.length) * 100}%` }}
            />
          </div>

          {/* Simulated Inbox Card */}
          <div className="glass-panel rounded-2xl border-[#3c494e]/50 overflow-hidden shadow-2xl">
            {/* Mock Client Top Header */}
            <div className="bg-[#181c22] px-5 py-3 border-b border-[#3c494e]/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-[#bbc9cf] ml-2">
                  Simulation Window • [{currentChallenge.type.toUpperCase()}]
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#31353c] text-[#a8e8ff]">
                Difficulty: {currentChallenge.difficulty}
              </span>
            </div>

            {/* Email / SMS Details Header */}
            <div className="p-6 bg-[#10141a]/90 border-b border-[#3c494e]/30 flex flex-col gap-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="text-[#bbc9cf]">
                  <strong className="text-[#dfe2eb]">From:</strong> {currentChallenge.sender}
                </div>
                <div className="text-[11px] text-[#859398] font-mono">
                  {currentChallenge.timestamp}
                </div>
              </div>
              {currentChallenge.subject && (
                <div className="text-[#dfe2eb] font-semibold text-sm">
                  <span className="text-[#859398]">Subject:</span> {currentChallenge.subject}
                </div>
              )}
            </div>

            {/* Message Body */}
            <div className="p-6 bg-[#0a0e14] min-h-[160px]">
              <p className="font-mono text-xs sm:text-sm text-[#dfe2eb] whitespace-pre-wrap leading-relaxed">
                {currentChallenge.body}
              </p>
            </div>

            {/* Guess Controls (If not guessed yet) */}
            {userGuess === null ? (
              <div className="p-6 bg-[#14181f] border-t border-[#3c494e]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#bbc9cf]">
                  Inspect the sender address, urgency, and links. Is this communication authentic or malicious?
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleSpotGuess(false)}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#00382f] border border-[#00f2d1]/40 text-[#c7fff0] font-headline font-bold text-xs hover:bg-[#00f2d1] hover:text-[#00201a] transition-all cursor-pointer"
                  >
                    ✓ Legitimate
                  </button>
                  <button
                    onClick={() => handleSpotGuess(true)}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#93000a] border border-[#ffb4ab]/40 text-[#ffb4ab] font-headline font-bold text-xs hover:bg-[#ffb4ab] hover:text-[#690005] transition-all cursor-pointer shadow-[0_0_15px_rgba(147,0,10,0.4)]"
                  >
                    ⚠ It's a Scam!
                  </button>
                </div>
              </div>
            ) : (
              /* Feedback reveal card */
              <div
                className={`p-6 border-t ${
                  userGuess === currentChallenge.isScam
                    ? 'bg-[#00382f]/30 border-[#00f2d1]/40'
                    : 'bg-[#93000a]/25 border-[#ffb4ab]/40'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {userGuess === currentChallenge.isScam ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-[#00f2d1]" />
                      <span className="font-headline font-bold text-sm text-[#c7fff0]">
                        Spot on! You correctly identified this as {currentChallenge.isScam ? 'a SCAM' : 'LEGITIMATE'}.
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-[#ffb4ab]" />
                      <span className="font-headline font-bold text-sm text-[#ffb4ab]">
                        Incorrect. This communication is actually {currentChallenge.isScam ? 'a SCAM' : 'LEGITIMATE'}.
                      </span>
                    </>
                  )}
                </div>

                <p className="font-body text-xs text-[#dfe2eb] leading-relaxed mb-4">
                  {currentChallenge.explanation}
                </p>

                {currentChallenge.keyIndicators && currentChallenge.keyIndicators.length > 0 && (
                  <div className="mb-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#859398] mb-1.5">
                      Key Forensic Indicators:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentChallenge.keyIndicators.map((ind, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#181c22] border border-[#3c494e]/50 text-[#a8e8ff]"
                        >
                          • {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleNextChallenge}
                  className="px-5 py-2.5 rounded-xl bg-[#a8e8ff] hover:bg-[#c7fff0] text-[#003642] font-headline text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Next Challenge</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Personal Digital Hygiene Score Audit */}
      {activeSubTab === 'hygiene-audit' && (
        <div className="max-w-3xl mx-auto glass-panel p-6 sm:p-8 rounded-2xl border-[#3c494e]/40">
          <div className="text-center mb-8">
            <h2 className="font-headline text-2xl font-bold text-[#dfe2eb] mb-1">
              Personal Digital Hygiene Audit
            </h2>
            <p className="text-xs text-[#bbc9cf]">
              Answer 4 quick security posture questions to receive an instant cyber defense score and customized roadmap.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            {SECURITY_QUESTIONS.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl bg-[#0a0e14]/70 border border-[#3c494e]/40">
                <div className="text-xs font-mono text-[#a8e8ff] mb-1">
                  Question {idx + 1} • {q.category}
                </div>
                <h3 className="font-headline text-sm font-bold text-[#dfe2eb] mb-3">
                  {q.question}
                </h3>
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = auditAnswers[q.id] === opt.points;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => {
                          setAuditAnswers(prev => ({ ...prev, [q.id]: opt.points }));
                          setAuditSubmitted(false);
                        }}
                        className={`w-full text-left p-3 rounded-xl text-xs font-body transition-all border cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#a8e8ff]/15 border-[#a8e8ff] text-[#dfe2eb] font-semibold'
                            : 'bg-[#181c22] border-[#3c494e]/30 text-[#bbc9cf] hover:border-[#a8e8ff]/40 hover:text-white'
                        }`}
                      >
                        <span>{opt.text}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#00f2d1] shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Audit Results */}
          {Object.keys(auditAnswers).length === SECURITY_QUESTIONS.length && (
            <div className="p-6 rounded-2xl bg-[#00d4ff]/10 border border-[#a8e8ff]/40 text-center animate-in fade-in">
              <div className="text-xs font-mono text-[#a8e8ff] uppercase tracking-wider mb-1">
                Your Security Posture Score
              </div>
              <div className="font-headline text-4xl font-black text-[#a8e8ff] text-glow mb-2">
                {totalAuditScore} / 100
              </div>
              <p className="text-xs text-[#dfe2eb] max-w-md mx-auto mb-4">
                {totalAuditScore >= 80
                  ? '🛡️ Fortified! You maintain exceptional digital hygiene habits and have strong defenses against credential theft.'
                  : totalAuditScore >= 50
                  ? '⚠️ Moderate Risk. You have basic protections but some habits leave you exposed to SMS phishing or credential reuse.'
                  : '🚨 High Vulnerability. Immediate action required. Transition to a password manager and app-based 2FA immediately.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

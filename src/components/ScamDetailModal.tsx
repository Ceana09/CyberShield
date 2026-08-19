import React from 'react';
import { ScamCategory } from '../types';
import { X, ShieldAlert, AlertTriangle, ShieldCheck, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';

interface ScamDetailModalProps {
  scam: ScamCategory | null;
  onClose: () => void;
  onCheckSuspicious: (sampleText: string, sender: string) => void;
}

export const ScamDetailModal: React.FC<ScamDetailModalProps> = ({
  scam,
  onClose,
  onCheckSuspicious
}) => {
  if (!scam) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl border-[#a8e8ff]/30 p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#181c22] border border-[#3c494e]/50 flex items-center justify-center text-[#bbc9cf] hover:text-white hover:border-[#a8e8ff] transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex items-start gap-4 mb-6 pr-10">
          <div className="w-14 h-14 rounded-2xl bg-[#a8e8ff]/10 border border-[#a8e8ff]/30 flex items-center justify-center text-[#a8e8ff] shrink-0">
            <span
              className="material-symbols-outlined text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {scam.icon}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  scam.badgeRisk === 'High Risk'
                    ? 'bg-[#93000a] text-[#ffb4ab]'
                    : 'bg-[#005144] text-[#c7fff0]'
                }`}
              >
                {scam.badgeRisk}
              </span>
              <span className="text-xs font-mono text-[#859398]">
                Threat Index: {scam.riskScore}/100
              </span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#dfe2eb]">
              {scam.title}
            </h2>
          </div>
        </div>

        {/* Full Detailed Description */}
        <p className="text-sm text-[#bbc9cf] font-body leading-relaxed mb-6 bg-[#0a0e14]/60 p-4 rounded-2xl border border-[#3c494e]/30">
          {scam.fullDescription}
        </p>

        {/* Real-World Simulated Scenario */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-[#859398] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#a8e8ff]" />
            <span>Simulated Attack Vector ({scam.simulatedScenario.channel})</span>
          </h3>
          <div className="p-4 rounded-2xl bg-[#0a0e14] border border-[#ffb4ab]/30 flex flex-col gap-3">
            <div className="text-xs text-[#bbc9cf]">
              <strong className="text-[#dfe2eb]">Spoofed Sender:</strong>{' '}
              <span className="font-mono text-[#ffb4ab]">{scam.simulatedScenario.sender}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#14181f] font-mono text-xs text-[#dfe2eb] border border-[#3c494e]/40 whitespace-pre-wrap leading-relaxed">
              {scam.simulatedScenario.messageText}
            </div>
            <div className="text-xs text-[#bbc9cf]">
              <strong className="text-[#00f2d1]">Why It's Dangerous:</strong> {scam.simulatedScenario.explanation}
            </div>

            <button
              onClick={() => {
                onCheckSuspicious(scam.simulatedScenario.messageText, scam.simulatedScenario.sender);
                onClose();
              }}
              className="self-start text-xs font-bold text-[#003642] bg-[#a8e8ff] hover:bg-[#c7fff0] px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer mt-1"
            >
              <span>Inspect in AI Scam Detector</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Red Flags & Psychology Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-[#181c22]/80 border border-[#3c494e]/30">
            <h4 className="text-xs font-bold text-[#ffb4ab] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Red Flags to Spot</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-[#bbc9cf]">
              {scam.redFlags.map((flag, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#ffb4ab] font-bold">•</span>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#181c22]/80 border border-[#3c494e]/30">
            <h4 className="text-xs font-bold text-[#c7fff0] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Protective Actions</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-[#bbc9cf]">
              {scam.preventativeMeasures.map((measure, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00f2d1] shrink-0 mt-0.5" />
                  <span>{measure}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* What to do if trapped */}
        <div className="p-4 rounded-2xl bg-[#00d4ff]/10 border border-[#a8e8ff]/30 text-xs">
          <div className="font-headline font-bold text-[#a8e8ff] text-sm mb-1.5">
            🚨 Immediate Steps If You Fell For This:
          </div>
          <ul className="space-y-1 text-[#dfe2eb]">
            {scam.whatToDoIfTrapped.map((step, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="font-mono text-[#a8e8ff] font-bold">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

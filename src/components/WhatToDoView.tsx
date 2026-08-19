import React, { useState } from 'react';
import { INCIDENT_PLAYBOOKS } from '../data/playbooksData';
import { IncidentPlaybook } from '../types';
import { ShieldAlert, AlertOctagon, PhoneCall, ExternalLink, CheckSquare, Square, Clock, ChevronRight, FileText, Check } from 'lucide-react';

export const WhatToDoView: React.FC = () => {
  const [selectedPlaybookId, setSelectedPlaybookId] = useState<string>(INCIDENT_PLAYBOOKS[0].id);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [copiedSummary, setCopiedSummary] = useState(false);

  const currentPlaybook = INCIDENT_PLAYBOOKS.find(p => p.id === selectedPlaybookId) || INCIDENT_PLAYBOOKS[0];

  const toggleStep = (stepKey: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepKey]: !prev[stepKey]
    }));
  };

  const handleCopyIncidentSummary = () => {
    const text = `INCIDENT TRIAGE CHECKLIST: ${currentPlaybook.title}
Severity: ${currentPlaybook.severity} | Priority Window: ${currentPlaybook.timeWindow}
Summary: ${currentPlaybook.summary}

COMPLETED EMERGENCY ACTIONS:
${currentPlaybook.immediateActions.map(step => {
  const isDone = completedSteps[`${currentPlaybook.id}-${step.stepNumber}`];
  return `[${isDone ? 'X' : ' '}] Step ${step.stepNumber}: ${step.title}\n    ${step.description}`;
}).join('\n\n')}

FOLLOW-UP ACTIONS:
${currentPlaybook.followUpActions.map(f => `- ${f}`).join('\n')}

OFFICIAL EMERGENCY HELPLINES:
${currentPlaybook.officialHelplines.map(h => `${h.region}: ${h.organization} - ${h.contact}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffb4ab]/15 border border-[#ffb4ab]/30 text-[#ffb4ab] text-xs font-semibold uppercase tracking-wider mb-3">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>Emergency Incident Response Center</span>
        </div>
        <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-[#dfe2eb] tracking-tight mb-3 text-glow">
          What To Do If Trapped
        </h1>
        <p className="font-body text-base text-[#bbc9cf] max-w-2xl mx-auto">
          Immediate, minute-by-minute action guides if you clicked a link, entered an OTP, transferred funds, or downloaded remote software.
        </p>
      </div>

      {/* Playbook Category Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {INCIDENT_PLAYBOOKS.map((playbook) => {
          const isSelected = playbook.id === selectedPlaybookId;
          return (
            <button
              key={playbook.id}
              onClick={() => setSelectedPlaybookId(playbook.id)}
              className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'glass-panel border-[#a8e8ff] bg-[#a8e8ff]/10 shadow-[0_0_20px_rgba(168,232,255,0.2)]'
                  : 'bg-[#181c22]/70 border-[#3c494e]/30 hover:border-[#a8e8ff]/40 hover:bg-[#181c22]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="material-symbols-outlined text-2xl text-[#a8e8ff]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {playbook.icon}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    playbook.severity === 'Critical'
                      ? 'bg-[#93000a] text-[#ffb4ab]'
                      : 'bg-amber-900/60 text-amber-300'
                  }`}
                >
                  {playbook.severity}
                </span>
              </div>
              <div>
                <h3 className="font-headline text-sm font-bold text-[#dfe2eb]">
                  {playbook.title}
                </h3>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#a8e8ff] mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{playbook.timeWindow}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Playbook Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Step-by-Step Interactive Actions Checklist */}
        <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-2xl border-[#3c494e]/40 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3c494e]/30">
            <div>
              <div className="text-xs font-mono text-[#a8e8ff] uppercase tracking-wider">
                Active Protocol: {currentPlaybook.category}
              </div>
              <h2 className="font-headline text-2xl font-bold text-[#dfe2eb] mt-0.5">
                {currentPlaybook.title}
              </h2>
            </div>

            <button
              onClick={handleCopyIncidentSummary}
              className="self-start sm:self-auto text-xs font-bold px-3.5 py-2 rounded-xl bg-[#181c22] border border-[#a8e8ff]/30 text-[#a8e8ff] hover:bg-[#a8e8ff]/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-[#00f2d1]" /> : <FileText className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? 'Copied Summary!' : 'Export Incident Report'}</span>
            </button>
          </div>

          <p className="text-sm text-[#bbc9cf] font-body bg-[#0a0e14]/60 p-4 rounded-xl border border-[#3c494e]/30 leading-relaxed">
            {currentPlaybook.summary}
          </p>

          {/* Interactive Steps */}
          <div>
            <h3 className="text-xs font-semibold text-[#859398] uppercase tracking-wider mb-4">
              Immediate Emergency Steps (Execute in Sequence)
            </h3>
            <div className="space-y-4">
              {currentPlaybook.immediateActions.map((step) => {
                const stepKey = `${currentPlaybook.id}-${step.stepNumber}`;
                const isCompleted = !!completedSteps[stepKey];
                return (
                  <div
                    key={step.stepNumber}
                    onClick={() => toggleStep(stepKey)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                      isCompleted
                        ? 'bg-[#00382f]/20 border-[#00f2d1]/30 opacity-75'
                        : 'bg-[#181c22] border-[#3c494e]/40 hover:border-[#a8e8ff]/50'
                    }`}
                  >
                    <div className="pt-0.5 text-[#a8e8ff] shrink-0">
                      {isCompleted ? (
                        <CheckSquare className="w-5 h-5 text-[#00f2d1]" />
                      ) : (
                        <Square className="w-5 h-5 text-[#859398]" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#a8e8ff]">
                          STEP {step.stepNumber}
                        </span>
                        <h4 className={`font-headline text-sm font-bold ${isCompleted ? 'line-through text-[#bbc9cf]' : 'text-[#dfe2eb]'}`}>
                          {step.title}
                        </h4>
                      </div>
                      <p className="font-body text-xs text-[#bbc9cf] mt-1 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="mt-2 text-[11px] font-mono text-[#a8e8ff]/90 bg-[#0a0e14] px-3 py-1.5 rounded-lg border border-[#3c494e]/30">
                        ⚡ Tip: {step.actionDetail}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Follow-up Measures */}
          <div className="pt-4 border-t border-[#3c494e]/30">
            <h3 className="text-xs font-semibold text-[#859398] uppercase tracking-wider mb-3">
              Follow-Up Hardening Measures
            </h3>
            <ul className="space-y-2 text-xs text-[#bbc9cf] font-body">
              {currentPlaybook.followUpActions.map((action, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#a8e8ff] shrink-0 mt-0.5" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Official Hotlines & Emergency Directories */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl border-[#3c494e]/40">
            <h3 className="font-headline text-base font-bold text-[#dfe2eb] flex items-center gap-2 mb-4">
              <PhoneCall className="w-4 h-4 text-[#00f2d1]" />
              <span>Official Cyber Fraud Helplines</span>
            </h3>
            <div className="space-y-3">
              {currentPlaybook.officialHelplines.map((helpline, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#0a0e14] border border-[#3c494e]/40 text-xs flex flex-col gap-1"
                >
                  <div className="text-[10px] font-mono text-[#a8e8ff] font-bold uppercase">
                    {helpline.region}
                  </div>
                  <div className="font-headline font-bold text-[#dfe2eb]">
                    {helpline.organization}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#00f2d1]">
                    {helpline.contact}
                  </div>
                  {helpline.link && (
                    <a
                      href={helpline.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#a8e8ff] hover:underline flex items-center gap-1 mt-1 w-fit"
                    >
                      <span>Visit Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Golden Hour Reminder Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#93000a]/20 to-[#690005]/10 border border-[#ffb4ab]/30 text-xs">
            <div className="font-headline font-bold text-[#ffb4ab] text-sm mb-1.5 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>The "Golden Hour" in Financial Fraud</span>
            </div>
            <p className="text-[#bbc9cf] leading-relaxed">
              If money was transferred via UPI, wire, or card, reporting to your bank fraud department and cyber helpline within the first 60 minutes dramatically increases the chance of freezing funds before cash-out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

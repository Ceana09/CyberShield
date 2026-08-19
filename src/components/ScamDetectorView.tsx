import React, { useState } from 'react';
import { analyzeSuspiciousText } from '../utils/scamAnalyzer';
import { ScamAnalysisResult } from '../types';
import { ShieldAlert, Sparkles, AlertTriangle, CheckCircle, Copy, Check, ExternalLink, RefreshCw, Send, ShieldCheck, ArrowRight } from 'lucide-react';

interface ScamDetectorViewProps {
  onNavigateToPlaybooks?: () => void;
  onOpenReport?: () => void;
}

const PRESET_SAMPLES = [
  {
    title: 'Bank KYC Urgent SMS',
    channel: 'SMS',
    sender: 'HDFC-ALERT-98',
    text: 'Dear Customer, Your HDFC NetBanking will be suspended today due to pending KYC verification. Please click here to upload your PAN card & update credentials within 2 hours: https://hdfc-kyc-update.xyz/login'
  },
  {
    title: 'UPI Collect PIN Request',
    channel: 'Payment App',
    sender: 'OLX Buyer (Major Sharma)',
    text: 'I have transferred an advance payment of $300 for your dining table. Please scan the attached QR code in GooglePay and enter your UPI PIN to approve the credit into your bank account.'
  },
  {
    title: 'USPS Failed Parcel Text',
    channel: 'SMS',
    sender: '+1 (800) 275-8777 [Spoofed]',
    text: 'USPS: Package #US-84920 could not be delivered due to an incorrect house number. Please update your address and pay a $0.95 redelivery fee within 12 hours: https://usps-redeliver-tracking.top'
  },
  {
    title: 'Telegram Job Offer',
    channel: 'WhatsApp',
    sender: 'HR Recruiter Emily (TikTok Global)',
    text: 'Hello! You have been selected for online part-time work. Like 5 YouTube videos to earn $300 daily. Daily payouts via Crypto. Join our VIP Telegram channel to complete prepaid verification tasks now.'
  },
  {
    title: 'Legitimate Google 2FA Code',
    channel: 'SMS',
    sender: 'Google [Verify]',
    text: 'G-829104 is your Google verification code. Do not share this code with anyone. Google employees will never ask for this code.'
  }
];

export const ScamDetectorView: React.FC<ScamDetectorViewProps> = ({
  onNavigateToPlaybooks,
  onOpenReport
}) => {
  const [inputText, setInputText] = useState(PRESET_SAMPLES[0].text);
  const [sender, setSender] = useState(PRESET_SAMPLES[0].sender);
  const [channel, setChannel] = useState(PRESET_SAMPLES[0].channel);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ScamAnalysisResult | null>(null);
  const [copiedReport, setCopiedReport] = useState(false);

  const handleRunAnalysis = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeSuspiciousText({
        text: inputText,
        sender,
        channel
      });
      setAnalysisResult(result);
    } catch (err) {
      console.error('Scan error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSample = (sample: typeof PRESET_SAMPLES[0]) => {
    setInputText(sample.text);
    setSender(sample.sender);
    setChannel(sample.channel);
    setAnalysisResult(null);
  };

  const handleCopyReport = () => {
    if (!analysisResult) return;
    const reportText = `CYBERSHIELD THREAT AUDIT REPORT
Target: ${sender || 'Unknown'} | Channel: ${channel}
Threat Score: ${analysisResult.overallRiskScore}/100 (${analysisResult.riskLevel})
Category: ${analysisResult.scamType}
Summary: ${analysisResult.summary}
Red Flags:
${analysisResult.redFlags.map((r, i) => `${i + 1}. ${r.flag} - ${r.explanation}`).join('\n')}
Recommended Action: ${analysisResult.recommendedAction}
Generated via CyberShield Digital Vigilance Platform`;

    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-10">
      {/* Header Banner */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a8e8ff]/10 border border-[#a8e8ff]/25 text-[#a8e8ff] text-xs font-semibold uppercase tracking-wider mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>AI Threat Forensic Analyzer</span>
        </div>
        <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-[#dfe2eb] tracking-tight mb-3 text-glow">
          Scam & Phishing Detector
        </h1>
        <p className="font-body text-base text-[#bbc9cf] max-w-2xl mx-auto">
          Paste any suspicious SMS, email, WhatsApp message, or payment request. Our multi-vector AI engine inspects URL spoofing, urgency traps, and financial fraud signatures in seconds.
        </p>
      </div>

      {/* Preset Quick Samples Bar */}
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#859398] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#a8e8ff]" />
          <span>Try realistic threat samples:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_SAMPLES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleLoadSample(sample)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#181c22] border border-[#3c494e]/50 text-[#bbc9cf] hover:text-[#a8e8ff] hover:border-[#a8e8ff]/40 hover:bg-[#a8e8ff]/5 transition-all cursor-pointer"
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis Workspace: Input Form & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Console */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border-[#3c494e]/40 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#3c494e]/30">
            <h3 className="font-headline text-base font-bold text-[#dfe2eb] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#a8e8ff]">edit_note</span>
              Inspection Console
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setInputText('')}
                className="text-xs text-[#859398] hover:text-[#ffb4ab] transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Sender & Channel metadata inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#859398] mb-1">
                Sender ID / Header / Phone
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="e.g. +1 (800) 275-8777 or support@service.com"
                className="w-full bg-[#0a0e14] border border-[#3c494e]/50 rounded-xl px-3 py-2 text-xs text-[#dfe2eb] placeholder-[#859398] focus:outline-none focus:border-[#a8e8ff]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#859398] mb-1">
                Communication Medium
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full bg-[#0a0e14] border border-[#3c494e]/50 rounded-xl px-3 py-2 text-xs text-[#dfe2eb] focus:outline-none focus:border-[#a8e8ff]"
              >
                <option value="SMS">SMS / Text Message</option>
                <option value="Email">Email</option>
                <option value="WhatsApp">WhatsApp / Telegram</option>
                <option value="Payment App">Payment App (UPI / Zelle / QR)</option>
                <option value="Social Media">Social Media DM</option>
                <option value="Phone Call">Phone Call Transcript</option>
              </select>
            </div>
          </div>

          {/* Text Area */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-[#859398]">
                Message Content & Links
              </label>
              <span className="text-[11px] font-mono text-[#859398]">
                {inputText.length} characters
              </span>
            </div>
            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste full text, links, or conversation transcripts here..."
              className="w-full bg-[#0a0e14] border border-[#3c494e]/50 rounded-xl p-3.5 text-sm text-[#dfe2eb] placeholder-[#859398] focus:outline-none focus:border-[#a8e8ff] leading-relaxed resize-none"
            />
          </div>

          {/* Action Trigger */}
          <button
            id="run-threat-analysis-btn"
            onClick={handleRunAnalysis}
            disabled={isAnalyzing || !inputText.trim()}
            className="w-full bg-gradient-to-r from-[#a8e8ff] via-[#3cd7ff] to-[#c7fff0] text-[#003642] font-headline text-sm font-bold py-3.5 rounded-xl hover:shadow-[0_0_25px_rgba(168,232,255,0.6)] transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Deep Forensic Inspection...</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4" />
                <span>Analyze Threat & Identify Red Flags</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Results Display */}
        <div className="lg:col-span-6">
          {isAnalyzing ? (
            <div className="glass-panel p-10 rounded-2xl border-[#a8e8ff]/30 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-[#a8e8ff]/10 border border-[#a8e8ff]/30 flex items-center justify-center mb-4 animate-pulse">
                <span className="material-symbols-outlined text-4xl text-[#a8e8ff] animate-spin">
                  radar
                </span>
              </div>
              <h4 className="font-headline text-lg font-bold text-[#dfe2eb] mb-1">
                Forensic Neural Engine at Work
              </h4>
              <p className="font-body text-xs text-[#bbc9cf] max-w-sm">
                Parsing linguistic manipulation, domain spoofing heuristics, and financial credential harvesting vectors...
              </p>
            </div>
          ) : analysisResult ? (
            <div className="glass-panel p-6 rounded-2xl border-[#3c494e]/40 flex flex-col gap-6 animate-in fade-in-50 duration-300">
              {/* Top Threat Score Banner */}
              <div
                className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                  analysisResult.riskLevel === 'Critical' || analysisResult.riskLevel === 'High'
                    ? 'bg-[#93000a]/25 border-[#ffb4ab]/40'
                    : analysisResult.riskLevel === 'Medium'
                    ? 'bg-amber-950/30 border-amber-500/40'
                    : 'bg-[#00382f]/30 border-[#00f2d1]/40'
                }`}
              >
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#bbc9cf]">
                    Threat Assessment
                  </div>
                  <div
                    className={`font-headline text-2xl font-extrabold mt-0.5 ${
                      analysisResult.riskLevel === 'Critical' || analysisResult.riskLevel === 'High'
                        ? 'text-[#ffb4ab] text-glow-red'
                        : analysisResult.riskLevel === 'Medium'
                        ? 'text-amber-400'
                        : 'text-[#c7fff0]'
                    }`}
                  >
                    {analysisResult.riskLevel.toUpperCase()} RISK ({analysisResult.overallRiskScore}/100)
                  </div>
                  <div className="text-xs text-[#dfe2eb] font-semibold mt-1">
                    Detected Type: {analysisResult.scamType}
                  </div>
                </div>

                {/* Circular / Pill Score Meter */}
                <div className="text-right shrink-0">
                  <span
                    className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      analysisResult.riskLevel === 'Critical' || analysisResult.riskLevel === 'High'
                        ? 'bg-[#ffb4ab] text-[#690005]'
                        : analysisResult.riskLevel === 'Medium'
                        ? 'bg-amber-400 text-amber-950'
                        : 'bg-[#00f2d1] text-[#00201a]'
                    }`}
                  >
                    Confidence: {analysisResult.confidence}%
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-xs font-semibold text-[#859398] uppercase tracking-wider mb-1.5">
                  Forensic Summary
                </h4>
                <p className="font-body text-sm text-[#dfe2eb] leading-relaxed bg-[#0a0e14]/60 p-3.5 rounded-xl border border-[#3c494e]/30">
                  {analysisResult.summary}
                </p>
              </div>

              {/* Red Flags Breakdown */}
              <div>
                <h4 className="text-xs font-semibold text-[#859398] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#ffb4ab]" />
                  <span>Red Flags Identified ({analysisResult.redFlags.length})</span>
                </h4>
                {analysisResult.redFlags.length === 0 ? (
                  <div className="text-xs text-[#c7fff0] bg-[#00382f]/20 border border-[#00f2d1]/20 p-3 rounded-xl flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00f2d1]" />
                    <span>No aggressive red flag signatures detected in message text.</span>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {analysisResult.redFlags.map((flag, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#181c22] border border-[#3c494e]/40 text-xs"
                      >
                        <div className="font-headline font-bold text-[#ffb4ab] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]" />
                          <span>{flag.flag}</span>
                        </div>
                        <p className="text-[#bbc9cf] mt-1 leading-normal font-body">
                          {flag.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Extracted URLs Analysis if any */}
              {analysisResult.extractedUrls && analysisResult.extractedUrls.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-[#859398] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-[#a8e8ff]" />
                    <span>Domain & Link Forensics</span>
                  </h4>
                  <div className="space-y-2">
                    {analysisResult.extractedUrls.map((u, i) => (
                      <div
                        key={i}
                        className={`p-2.5 rounded-xl border text-xs font-mono flex flex-col gap-1 ${
                          u.isSuspicious
                            ? 'bg-[#93000a]/15 border-[#ffb4ab]/30 text-[#ffb4ab]'
                            : 'bg-[#181c22] border-[#3c494e]/40 text-[#bbc9cf]'
                        }`}
                      >
                        <div className="flex items-center justify-between break-all">
                          <span className="font-bold">{u.url}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded ${
                              u.isSuspicious ? 'bg-[#ffb4ab]/20 text-[#ffb4ab]' : 'bg-emerald-500/20 text-emerald-300'
                            }`}
                          >
                            {u.isSuspicious ? 'Suspicious Destination' : 'Safe Domain'}
                          </span>
                        </div>
                        <div className="text-[11px] font-sans text-[#bbc9cf]">
                          {u.reason}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Immediate Action */}
              <div className="p-4 rounded-xl bg-[#00d4ff]/10 border border-[#a8e8ff]/30 text-xs">
                <div className="font-headline font-bold text-[#a8e8ff] flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Immediate Recommendation</span>
                </div>
                <p className="text-[#dfe2eb] font-body leading-relaxed">
                  {analysisResult.recommendedAction}
                </p>
              </div>

              {/* Copy Report / Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleCopyReport}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#a8e8ff] bg-[#181c22] border border-[#a8e8ff]/30 hover:bg-[#a8e8ff]/10 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                >
                  {copiedReport ? <Check className="w-3.5 h-3.5 text-[#00f2d1]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedReport ? 'Report Copied!' : 'Copy Incident Report'}</span>
                </button>

                {onNavigateToPlaybooks && (
                  <button
                    onClick={onNavigateToPlaybooks}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#003642] bg-[#a8e8ff] hover:bg-[#c7fff0] px-3.5 py-2 rounded-xl transition-all cursor-pointer ml-auto"
                  >
                    <span>View Response Playbook</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Initial Blank State */
            <div className="glass-panel p-8 rounded-2xl border-[#3c494e]/30 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-[#a8e8ff]/5 border border-[#a8e8ff]/20 flex items-center justify-center mb-4 text-[#a8e8ff]">
                <span className="material-symbols-outlined text-4xl">
                  security_update_good
                </span>
              </div>
              <h4 className="font-headline text-lg font-bold text-[#dfe2eb] mb-1">
                Awaiting Inspection Input
              </h4>
              <p className="font-body text-xs text-[#bbc9cf] max-w-sm">
                Paste suspicious text on the left or select any of the sample scenarios above, then click <strong>Analyze Threat</strong> to run full forensics.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

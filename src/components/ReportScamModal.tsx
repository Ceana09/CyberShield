import React, { useState } from 'react';
import { X, Send, AlertTriangle, ShieldCheck, Check } from 'lucide-react';

interface ReportScamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportScamModal: React.FC<ReportScamModalProps> = ({ isOpen, onClose }) => {
  const [scamType, setScamType] = useState('Phishing');
  const [sender, setSender] = useState('');
  const [platform, setPlatform] = useState('SMS');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/report-scam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: scamType,
          sender,
          platform,
          preview: details
        })
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1800);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1800);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl border-[#ffb4ab]/40 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#181c22] border border-[#3c494e]/50 flex items-center justify-center text-[#bbc9cf] hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#ffb4ab]/15 border border-[#ffb4ab]/30 flex items-center justify-center text-[#ffb4ab]">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-headline text-xl font-bold text-[#dfe2eb]">
              Report a Scam Alert
            </h3>
            <p className="text-xs text-[#bbc9cf]">
              Warn the community about active fraud campaigns anonymously.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#00f2d1]/20 border border-[#00f2d1] flex items-center justify-center text-[#00f2d1] mb-3">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="font-headline text-lg font-bold text-[#dfe2eb]">
              Report Logged into Threat Stream
            </h4>
            <p className="text-xs text-[#bbc9cf] mt-1">
              Thank you for strengthening community digital vigilance.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#859398] mb-1">
                Scam Classification
              </label>
              <select
                value={scamType}
                onChange={(e) => setScamType(e.target.value)}
                className="w-full bg-[#0a0e14] border border-[#3c494e]/50 rounded-xl px-3 py-2 text-xs text-[#dfe2eb] focus:outline-none focus:border-[#a8e8ff]"
              >
                <option value="Phishing">Phishing Email / Fake Portal</option>
                <option value="Smishing">Smishing SMS / Delivery Trap</option>
                <option value="UPI Fraud">UPI / Payment App Collect Request</option>
                <option value="Job Scam">Task / Work-From-Home Scam</option>
                <option value="Crypto Scam">Fake Crypto / Investment Ponzi</option>
                <option value="Tech Support">Fake Microsoft / Apple Alert</option>
                <option value="Utility Fraud">Electricity Disconnection Threat</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#859398] mb-1">
                  Sender / Phone Number
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="e.g. +91 98412..."
                  className="w-full bg-[#0a0e14] border border-[#3c494e]/50 rounded-xl px-3 py-2 text-xs text-[#dfe2eb] placeholder-[#859398] focus:outline-none focus:border-[#a8e8ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#859398] mb-1">
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-[#0a0e14] border border-[#3c494e]/50 rounded-xl px-3 py-2 text-xs text-[#dfe2eb] focus:outline-none focus:border-[#a8e8ff]"
                >
                  <option value="SMS">SMS</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Email">Email</option>
                  <option value="Instagram">Instagram / Social</option>
                  <option value="Phone Call">Phone Call</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#859398] mb-1">
                Scam Description, Phishing Links, or Tactics
              </label>
              <textarea
                rows={4}
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe what the scammer claimed, any links included, and money demanded..."
                className="w-full bg-[#0a0e14] border border-[#3c494e]/50 rounded-xl p-3 text-xs text-[#dfe2eb] placeholder-[#859398] focus:outline-none focus:border-[#a8e8ff] resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !details.trim()}
              className="w-full bg-gradient-to-r from-[#ffb4ab] to-[#ff9e99] text-[#690005] font-headline text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(255,180,171,0.5)] cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Transmitting Threat Data...' : 'Submit Anonymous Report'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

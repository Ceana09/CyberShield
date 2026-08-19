import React from 'react';
import { Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenReport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenReport }) => {
  return (
    <footer
      id="main-footer"
      className="bg-[#0a0e14] w-full py-16 border-t border-[#3c494e]/20 relative z-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-[1280px] mx-auto px-5 md:px-12">
        {/* Brand & Mission Column (spans 2 cols on md) */}
        <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
          <div>
            <button
              onClick={() => onNavigate('home')}
              className="font-headline text-2xl font-bold text-[#a8e8ff] flex items-center gap-2 mb-4 group cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-[#a8e8ff]/10 border border-[#a8e8ff]/20 flex items-center justify-center group-hover:border-[#a8e8ff] transition-all">
                <Shield className="w-4 h-4 text-[#a8e8ff] fill-[#a8e8ff]/30" />
              </div>
              <span className="bg-gradient-to-r from-[#a8e8ff] to-[#c7fff0] bg-clip-text text-transparent">
                CyberShield
              </span>
            </button>
            <p className="font-body text-sm text-[#bbc9cf] max-w-sm mb-6 leading-relaxed">
              Empowering digital vigilance. Educational Purpose Only.
            </p>
          </div>

          <div className="font-body text-xs text-[#859398] opacity-80">
            © 2024 CyberShield. All rights reserved.
          </div>
        </div>

        {/* Resources Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-body text-sm text-[#dfe2eb] font-bold mb-1">
            Resources
          </h4>
          <button
            onClick={() => onNavigate('home')}
            className="text-[#bbc9cf] hover:text-[#c7fff0] hover:underline decoration-[#c7fff0] transition-all font-body text-sm w-fit text-left cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => onNavigate('scams')}
            className="text-[#bbc9cf] hover:text-[#c7fff0] hover:underline decoration-[#c7fff0] transition-all font-body text-sm w-fit text-left cursor-pointer"
          >
            Awareness
          </button>
          <button
            onClick={() => onNavigate('detector')}
            className="text-[#bbc9cf] hover:text-[#c7fff0] hover:underline decoration-[#c7fff0] transition-all font-body text-sm w-fit text-left cursor-pointer"
          >
            Detector
          </button>
          <button
            onClick={() => onNavigate('safety-tips')}
            className="text-[#bbc9cf] hover:text-[#c7fff0] hover:underline decoration-[#c7fff0] transition-all font-body text-sm w-fit text-left cursor-pointer"
          >
            Tips
          </button>
        </div>

        {/* Legal & Support Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-body text-sm text-[#dfe2eb] font-bold mb-1">
            Legal & Support
          </h4>
          <button
            onClick={onOpenReport}
            className="text-[#bbc9cf] hover:text-[#c7fff0] hover:underline decoration-[#c7fff0] transition-all font-body text-sm w-fit text-left cursor-pointer"
          >
            Report
          </button>
          <button
            onClick={() => onNavigate('what-to-do')}
            className="text-[#bbc9cf] hover:text-[#c7fff0] hover:underline decoration-[#c7fff0] transition-all font-body text-sm w-fit text-left cursor-pointer"
          >
            Resources
          </button>
          <a
            href="#privacy"
            onClick={(e) => { e.preventDefault(); alert("Privacy Guarantee: CyberShield operates with zero tracking cookies and client-side privacy. Submitted text is parsed without persistent storage."); }}
            className="text-[#bbc9cf] hover:text-[#c7fff0] hover:underline decoration-[#c7fff0] transition-all font-body text-sm w-fit"
          >
            Privacy
          </a>
          <a
            href="#terms"
            onClick={(e) => { e.preventDefault(); alert("Educational Disclaimer: CyberShield is designed to promote cybersecurity awareness. In active fraud emergencies, immediately contact your bank and local law enforcement."); }}
            className="text-[#bbc9cf] hover:text-[#c7fff0] hover:underline decoration-[#c7fff0] transition-all font-body text-sm w-fit"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

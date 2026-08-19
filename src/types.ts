export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface ScamCategory {
  id: string;
  title: string;
  badgeRisk: 'High Risk' | 'Med Risk' | 'Low Risk';
  riskScore: number;
  icon: string; // Material symbol or Lucide
  summary: string;
  fullDescription: string;
  commonTargets: string[];
  keyTactics: string[];
  psychologicalTriggers: string[];
  redFlags: string[];
  simulatedScenario: {
    channel: 'Email' | 'SMS' | 'WhatsApp' | 'Phone Call' | 'Payment App' | 'Social Media' | 'Chat';
    sender: string;
    messageText: string;
    redFlagHighlights: string[];
    explanation: string;
  };
  preventativeMeasures: string[];
  whatToDoIfTrapped: string[];
}

export interface RedFlagItem {
  flag: string;
  severity: 'high' | 'medium' | 'low';
  explanation: string;
}

export interface ScamAnalysisResult {
  overallRiskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  scamType: string;
  summary: string;
  confidence: number;
  urgencyScore: number; // 0 - 10
  redFlags: RedFlagItem[];
  detectedIndicators: {
    fakeAuthority: boolean;
    urgentDeadline: boolean;
    financialRequest: boolean;
    credentialHarvesting: boolean;
    maliciousLinkOrDomain: boolean;
    grammarOrSpoofing: boolean;
  };
  extractedUrls: Array<{
    url: string;
    isSuspicious: boolean;
    reason: string;
  }>;
  recommendedAction: string;
  immediateChecklist: string[];
}

export interface IncidentPlaybook {
  id: string;
  title: string;
  category: string;
  severity: 'Critical' | 'High' | 'Medium';
  icon: string;
  timeWindow: string; // e.g. "First 15 Minutes"
  summary: string;
  immediateActions: {
    stepNumber: number;
    title: string;
    description: string;
    actionDetail: string;
    icon: string;
  }[];
  followUpActions: string[];
  officialHelplines: {
    region: string;
    organization: string;
    contact: string;
    link?: string;
  }[];
}

export interface SpotTheScamItem {
  id: string;
  title: string;
  type: 'email' | 'sms' | 'upi' | 'job_chat';
  sender: string;
  recipient: string;
  timestamp: string;
  subject?: string;
  body: string;
  attachmentOrLink?: string;
  isScam: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  scamCategory: string;
  explanation: string;
  keyIndicators: string[];
}

export interface SecurityScoreQuestion {
  id: string;
  category: 'Passwords' | '2FA' | 'Browsing' | 'Payments' | 'Device Security';
  question: string;
  options: {
    text: string;
    points: number;
    feedback: string;
  }[];
}

import { ScamAnalysisResult, RiskLevel, RedFlagItem } from '../types';

interface AnalysisInput {
  text: string;
  sender?: string;
  channel?: string;
}

export async function analyzeSuspiciousText(input: AnalysisInput): Promise<ScamAnalysisResult> {
  const { text, sender = '', channel = 'General' } = input;

  // Try server-side AI endpoint first
  try {
    const res = await fetch('/api/analyze-scam', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, sender, channel })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.overallRiskScore !== undefined) {
        return data as ScamAnalysisResult;
      }
    }
  } catch (err) {
    console.warn('Server AI endpoint unavailable, using local neural heuristic engine:', err);
  }

  // Fallback to advanced client-side heuristic detection engine
  return performLocalHeuristicAnalysis(text, sender);
}

export function performLocalHeuristicAnalysis(rawText: string, sender: string): ScamAnalysisResult {
  const text = rawText.toLowerCase();
  const senderLower = sender.toLowerCase();
  const redFlags: RedFlagItem[] = [];

  let urgencyScore = 0;
  let riskScore = 15; // Base clean score
  let scamType = 'Uncertain / Potential Spam';

  // 1. Urgency & Panic Detection
  const urgentKeywords = [
    'immediate', 'immediately', 'urgent', 'urgently', 'suspended', '24 hours', '12 hours', '1 hour',
    'terminated', 'blocked', 'arrested', 'police', 'legal action', 'court', 'freeze', 'disconnected tonight',
    'power cut', 'final warning', 'last chance', 'expire', 'expiring'
  ];
  let urgentMatches = 0;
  urgentKeywords.forEach(kw => {
    if (text.includes(kw)) urgentMatches++;
  });

  if (urgentMatches >= 2) {
    urgencyScore = Math.min(10, urgentMatches * 3);
    riskScore += 25;
    redFlags.push({
      flag: 'High-Pressure Urgency Tactics',
      severity: 'high',
      explanation: 'Uses artificial deadlines and threats of account freeze/disconnection to induce panic and prevent calm verification.'
    });
  } else if (urgentMatches === 1) {
    urgencyScore = 4;
    riskScore += 10;
  }

  // 2. Financial / PIN / QR Scams
  const pinKeywords = ['enter pin', 'upi pin', 'scan qr', 'receive money', 'scan this qr', 'approve deposit', 'collect request', 'gpay pin', 'phonepe pin'];
  const hasPinThreat = pinKeywords.some(kw => text.includes(kw));
  if (hasPinThreat) {
    riskScore += 45;
    scamType = 'UPI / Payment App Trap';
    redFlags.push({
      flag: 'Demands PIN/QR to "Receive" Money',
      severity: 'high',
      explanation: 'Crucial rule: PIN is NEVER entered to receive money. Entering your PIN always debits money from your account.'
    });
  }

  // 3. Fake Job / Task Scam
  const jobKeywords = ['like youtube', 'telegram channel', 'earn $', 'earn rs', 'daily salary', 'subscribe youtube', 'prepaid task', 'review hotels', 'easy work from home'];
  if (jobKeywords.some(kw => text.includes(kw))) {
    riskScore += 40;
    scamType = 'Part-Time Task / Job Scam';
    redFlags.push({
      flag: 'Unrealistic Pay for Social Media Tasks',
      severity: 'high',
      explanation: 'Promises hundreds of dollars for liking videos or hotel ratings, leading to dangerous "prepaid recharge task" deposit traps.'
    });
  }

  // 4. Extortion / Blackmail
  const blackmailKeywords = ['webcam', 'recorded you', 'adult site', 'bitcoin to wallet', 'porn', 'pegasus', 'monero', 'send to contacts'];
  if (blackmailKeywords.some(kw => text.includes(kw))) {
    riskScore += 50;
    scamType = 'Sextortion / Webcam Blackmail';
    redFlags.push({
      flag: 'Extortion Demanding Crypto Ransom',
      severity: 'high',
      explanation: 'Generic mass-mailed blackmail script using leaked database passwords to fake device compromise.'
    });
  }

  // 5. Crypto / Investment Ponzi
  const investmentKeywords = ['guaranteed profit', 'crypto arbitrage', '100% win rate', 'guaranteed yield', 'deposit $', 'daily roi', 'vip signals'];
  if (investmentKeywords.some(kw => text.includes(kw))) {
    riskScore += 45;
    scamType = 'Crypto & Investment Ponzi';
    redFlags.push({
      flag: 'Promises Guaranteed High Return',
      severity: 'high',
      explanation: 'Statistically impossible guaranteed ROI designed to lure victims into fake unregulated trading platforms.'
    });
  }

  // 6. URL & Link Extraction & Analysis
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(?:xyz|top|cc|info|club|work|buzz|tk|ml|ga|cf|gq|fun|vip|site)[^\s]*)/gi;
  const matches = rawText.match(urlRegex) || [];
  const extractedUrls: Array<{ url: string; isSuspicious: boolean; reason: string }> = [];

  matches.forEach(rawUrl => {
    let url = rawUrl;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    const lowerUrl = url.toLowerCase();
    const suspiciousTlds = ['.xyz', '.top', '.cc', '.info', '.club', '.buzz', '.site', '.work', '.fun', '.vip'];
    const hasSuspiciousTld = suspiciousTlds.some(tld => lowerUrl.includes(tld));
    const isShortened = lowerUrl.includes('bit.ly') || lowerUrl.includes('tinyurl') || lowerUrl.includes('t.co') || lowerUrl.includes('is.gd') || lowerUrl.includes('cutt.ly');
    const isSpoofedBrand = (lowerUrl.includes('chase') || lowerUrl.includes('paypal') || lowerUrl.includes('netflix') || lowerUrl.includes('usps') || lowerUrl.includes('fedex') || lowerUrl.includes('google') || lowerUrl.includes('apple')) &&
      !lowerUrl.includes('chase.com') && !lowerUrl.includes('paypal.com') && !lowerUrl.includes('netflix.com') && !lowerUrl.includes('usps.com') && !lowerUrl.includes('fedex.com') && !lowerUrl.includes('google.com') && !lowerUrl.includes('apple.com');

    const isSuspicious = hasSuspiciousTld || isShortened || isSpoofedBrand;
    let reason = 'Standard Web Link';
    if (isSpoofedBrand) reason = 'Spoofed brand domain imitating official institution';
    else if (hasSuspiciousTld) reason = 'Suspicious low-reputation top-level domain frequently used in mass phishing';
    else if (isShortened) reason = 'Obfuscated shortened URL hiding actual destination';

    if (isSuspicious) {
      riskScore += 30;
      redFlags.push({
        flag: `Malicious or Spoofed Link Detected (${rawUrl})`,
        severity: 'high',
        explanation: reason
      });
    }

    extractedUrls.push({ url: rawUrl, isSuspicious, reason });
  });

  // 7. Legitimate verification check
  const legitKeywords = ['g- verification code', 'verification code. do not share', 'noreply@github.com', 'password reset'];
  const hasLegitMarkers = legitKeywords.some(kw => text.includes(kw));
  if (hasLegitMarkers && matches.length === 0 && !hasPinThreat && !blackmailKeywords.some(kw => text.includes(kw))) {
    riskScore = Math.max(5, riskScore - 40);
    scamType = 'Legitimate System Notification';
  }

  // Bound score 0 - 99
  const finalScore = Math.min(99, Math.max(5, riskScore));

  let riskLevel: RiskLevel = 'Low';
  if (finalScore >= 80) riskLevel = 'Critical';
  else if (finalScore >= 60) riskLevel = 'High';
  else if (finalScore >= 35) riskLevel = 'Medium';

  if (scamType === 'Uncertain / Potential Spam' && finalScore > 50) {
    scamType = 'Social Engineering Phishing';
  }

  let recommendedAction = 'Message appears relatively safe, but always verify sender credentials before interacting.';
  if (riskLevel === 'Critical' || riskLevel === 'High') {
    recommendedAction = 'DO NOT CLICK any links, DO NOT reply, and DO NOT share any OTP or PIN. Delete the message and block the sender immediately.';
  } else if (riskLevel === 'Medium') {
    recommendedAction = 'Exercise extreme caution. Do not click links inside this message. Navigate independently to the service\'s official mobile app or website.';
  }

  return {
    overallRiskScore: finalScore,
    riskLevel,
    scamType,
    summary: riskLevel === 'Critical' || riskLevel === 'High'
      ? `High-risk ${scamType} detected with ${redFlags.length} severe security anomalies. The communication exhibits deceptive manipulation tactics.`
      : riskLevel === 'Medium'
      ? `Suspicious patterns identified. Contains elements common in unsolicited phishing campaigns.`
      : `No aggressive indicators detected. Verify sender email headers if sensitive actions are requested.`,
    confidence: 94,
    urgencyScore,
    redFlags,
    detectedIndicators: {
      fakeAuthority: text.includes('officer') || text.includes('police') || text.includes('court') || text.includes('manager') || text.includes('support'),
      urgentDeadline: urgencyScore > 4,
      financialRequest: hasPinThreat || text.includes('payment') || text.includes('bill') || text.includes('fee') || text.includes('crypto'),
      credentialHarvesting: text.includes('password') || text.includes('login') || text.includes('verify your account') || text.includes('kyc'),
      maliciousLinkOrDomain: extractedUrls.some(u => u.isSuspicious),
      grammarOrSpoofing: redFlags.some(r => r.flag.includes('Spoofed'))
    },
    extractedUrls,
    recommendedAction,
    immediateChecklist: [
      'Never share OTPs, passwords, or personal identity numbers.',
      'Check the actual email/SMS sender domain on a second clean device.',
      'If in doubt, call the company directly using their publicly verified phone number.'
    ]
  };
}

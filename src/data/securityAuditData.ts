import { SecurityScoreQuestion } from '../types';

export const SECURITY_QUESTIONS: SecurityScoreQuestion[] = [
  {
    id: 'passwords',
    category: 'Passwords',
    question: 'How do you create and manage your passwords across different accounts?',
    options: [
      { text: 'I use a dedicated password manager (Bitwarden, 1Password, etc.) with unique, complex passwords for every site.', points: 25, feedback: 'Excellent! Unique random passwords eliminate credential stuffing risks.' },
      { text: 'I use 2-3 variations of a strong password that I remember in my head.', points: 10, feedback: 'Moderate risk. If one site suffers a breach, attackers will test variations across all your other logins.' },
      { text: 'I reuse the same 1 or 2 passwords for almost everything.', points: 0, feedback: 'Critical risk! A single breach on an obscure website exposes your primary email and banking.' }
    ]
  },
  {
    id: 'two-factor',
    category: '2FA',
    question: 'What type of Two-Factor Authentication (2FA/MFA) do you use on your primary email and bank?',
    options: [
      { text: 'Hardware Security Key (YubiKey) or Authenticator App (Google/Microsoft Authenticator).', points: 25, feedback: 'Top tier! Hardware tokens and authenticator apps are immune to SIM-swapping.' },
      { text: 'SMS verification codes sent to my phone number.', points: 15, feedback: 'Better than no 2FA, but vulnerable to SIM-swap attacks and SMS smishing.' },
      { text: 'I have not enabled two-factor authentication anywhere.', points: 0, feedback: 'High vulnerability! Passwords alone can be guessed, phished, or leaked.' }
    ]
  },
  {
    id: 'payments-qr',
    category: 'Payments',
    question: 'When receiving money from someone on an instant payment app (UPI, Zelle, Venmo), what do you expect to do?',
    options: [
      { text: 'Nothing! Money is credited automatically without entering my PIN or scanning anything.', points: 25, feedback: '100% correct! You never need to enter a PIN to receive payments.' },
      { text: 'I scan their QR code and enter my PIN to approve the deposit.', points: 0, feedback: 'Danger! Entering your PIN always debits funds from your account. This is the #1 UPI scam.' },
      { text: 'I accept collect requests sent to my payment notifications.', points: 5, feedback: 'Careful! Collect requests withdraw money from you, they do not pay you.' }
    ]
  },
  {
    id: 'links-urgent',
    category: 'Browsing',
    question: 'You receive an urgent text: "Your bank account will be frozen in 2 hours unless you update KYC here: bit.ly/bank-kyc". What do you do?',
    options: [
      { text: 'Delete the SMS and open my bank’s official mobile app or visit the official bank URL independently.', points: 25, feedback: 'Perfect instinct! Never use links sent via unverified SMS.' },
      { text: 'Click the link to check what information is requested, but don\'t enter passwords.', points: 5, feedback: 'Risky! Malicious links can trigger zero-day exploits or track your IP address.' },
      { text: 'Click immediately and update the info so my account isn\'t frozen.', points: 0, feedback: 'Trapped! This is a textbook smishing tactic using artificial urgency.' }
    ]
  }
];

export interface SafetyTipItem {
  id: string;
  category: string;
  title: string;
  rule: string;
  description: string;
  icon: string;
}

export const SAFETY_TIPS: SafetyTipItem[] = [
  {
    id: 'tip-1',
    category: 'Financial Defense',
    title: 'The Golden Rule of Payment Apps',
    rule: 'PIN = PAY (PIN is only entered to DEBIT money)',
    description: 'You never need to enter your PIN, OTP, or password to RECEIVE funds on UPI, Zelle, or Venmo. If someone asks you to enter your PIN to get paid, it is 100% a fraud attempt.',
    icon: 'pin'
  },
  {
    id: 'tip-2',
    category: 'Credential Armor',
    title: 'Ditch SMS 2FA for Authenticator Apps',
    rule: 'Use App-based OTP or Passkeys instead of SMS',
    description: 'SMS verification codes can be intercepted via SIM swapping, rogue telecom towers, or phone notification snooping. Switch to Google Authenticator, 1Password, or YubiKeys for unbreakable security.',
    icon: 'phonelink_lock'
  },
  {
    id: 'tip-3',
    category: 'Social Engineering',
    title: 'The 10-Minute Freeze Technique',
    rule: 'Never act under panic or artificial countdowns',
    description: 'Scammers rely on adrenaline to bypass rational thought. Whenever a message threatens account closure, police arrest, or power disconnection in "1 hour", intentionally pause for 10 minutes to verify directly with official contacts.',
    icon: 'timer'
  },
  {
    id: 'tip-4',
    category: 'URL Inspection',
    title: 'Look at the Root Domain, Not the Subdomain',
    rule: 'Check what comes immediately before the first slash /',
    description: 'In "paypal.com.verify-billing.xyz/login", the real website is verify-billing.xyz, NOT PayPal. Scammers put trusted brand names at the front to fool quick glances.',
    icon: 'link'
  },
  {
    id: 'tip-5',
    category: 'Family Defense',
    title: 'Establish a Secret Family Safe Word',
    rule: 'Defend against AI voice cloning & fake kidnap calls',
    description: 'With AI able to clone any voice in 3 seconds, agree on a private family secret word that only parents and children know. If anyone calls claiming an emergency, ask for the secret safe word before sending any money.',
    icon: 'family_restroom'
  },
  {
    id: 'tip-6',
    category: 'Device Hygiene',
    title: 'Zero Remote Access for Unsolicited Tech Support',
    rule: 'Never install AnyDesk or TeamViewer on stranger requests',
    description: 'No legitimate organization (Microsoft, Apple, Amazon, your bank) will ever call you out of the blue and ask you to install remote desktop control software on your computer or phone.',
    icon: 'desktop_access_disabled'
  }
];

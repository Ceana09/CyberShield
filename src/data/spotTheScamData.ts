import { SpotTheScamItem } from '../types';

export const SPOT_THE_SCAM_CHALLENGES: SpotTheScamItem[] = [
  {
    id: 'challenge-1',
    title: 'Netflix Subscription Expiring Alert',
    type: 'email',
    sender: 'Netflix Support <billing-notice@netfllx-customer-auth.com>',
    recipient: 'you@domain.com',
    timestamp: 'Today, 8:45 AM',
    subject: 'Action Required: Your Netflix membership will be suspended in 24 hours',
    body: 'Dear Member,\n\nWe were unable to process your latest monthly payment for your Netflix Premium plan ($19.99).\n\nTo prevent immediate suspension of your streaming service, please update your billing card information by clicking the link below:\n\n👉 Update Payment Details: https://netfllx-customer-auth.com/renew/card-verify\n\nIf you do not update within 24 hours, your account and watchlist history will be permanently deleted.\n\nThank you,\nThe Netflix Team',
    attachmentOrLink: 'https://netfllx-customer-auth.com/renew/card-verify',
    isScam: true,
    difficulty: 'Easy',
    scamCategory: 'Phishing',
    explanation: 'Notice the typo in the sender domain "netfllx-customer-auth.com" (with "ll" instead of "li"), the artificial 24-hour threat of permanent deletion, and the generic greeting "Dear Member" instead of your actual profile name.',
    keyIndicators: [
      'Spoofed domain (netfllx with double L)',
      'Artificial 24-hour urgency countdown',
      'Generic greeting without customer name'
    ]
  },
  {
    id: 'challenge-2',
    title: 'Google Security Code for 2-Step Verification',
    type: 'sms',
    sender: 'Google [Verify Code]',
    recipient: '+1 (555) 019-2834',
    timestamp: 'Yesterday, 4:12 PM',
    body: 'G-748291 is your Google verification code. Do not share this code with anyone. Google will never call or message you asking for this code.',
    isScam: false,
    difficulty: 'Medium',
    scamCategory: 'Legitimate System Alert',
    explanation: 'This is a genuine 2FA verification message from Google. It contains no clickable external links, includes the standard G- prefix, and explicitly warns never to share the code with anyone.',
    keyIndicators: [
      'No clickable malicious links',
      'Explicit warning: "Do not share with anyone"',
      'Matches official Google SMS pattern'
    ]
  },
  {
    id: 'challenge-3',
    title: 'Facebook Marketplace Furniture Buyer',
    type: 'upi',
    sender: 'Buyer: Ramesh_Deals_24',
    recipient: 'Seller (You)',
    timestamp: 'Today, 11:20 AM',
    body: 'Hello sir, I am ready to buy your dining table for $350 without bargaining. I have sent an instant deposit QR code. Please open your banking / Google Pay app, scan this QR code, and enter your 6-digit PIN to confirm receipt of $350 into your bank account.',
    attachmentOrLink: 'QR_Code_Deposit_350.png',
    isScam: true,
    difficulty: 'Medium',
    scamCategory: 'UPI Fraud',
    explanation: 'You NEVER need to enter your PIN or scan a QR code to RECEIVE money. Entering your PIN in any UPI or banking app will instantly DEBIT $350 from your account.',
    keyIndicators: [
      'Instructing seller to enter PIN to "receive" money',
      'Sending a QR code for a credit transaction',
      'Over-eager buyer agreeing without inspecting the item'
    ]
  },
  {
    id: 'challenge-4',
    title: 'Telegram YouTube Video Like Job',
    type: 'job_chat',
    sender: 'Recruiter Sarah (Global Media HR)',
    recipient: 'You',
    timestamp: 'Yesterday, 2:15 PM',
    body: 'Greetings! We have part-time remote tasks. Earn $30 for every 3 YouTube videos you like & subscribe. After liking 3 videos, join our VIP Telegram Channel to complete pre-paid deposit tasks to withdraw your $300 daily earnings.',
    isScam: true,
    difficulty: 'Easy',
    scamCategory: 'Work-From-Home & Task Scams',
    explanation: 'Legitimate companies do not recruit random phone numbers for high-paying micro-tasks that require "pre-paid deposit tasks" to withdraw salary.',
    keyIndicators: [
      'Unsolicited WhatsApp/Telegram reach out',
      'Absurdly high pay for liking videos',
      'Requirement for "pre-paid tasks" to withdraw funds'
    ]
  },
  {
    id: 'challenge-5',
    title: 'GitHub Password Reset Notification',
    type: 'email',
    sender: 'GitHub <noreply@github.com>',
    recipient: 'developer@example.com',
    timestamp: '3 days ago',
    subject: '[GitHub] Please reset your password',
    body: 'Hi @alex_dev,\n\nWe heard that you lost your GitHub password. Sorry about that!\n\nIf you initiated this request, you can reset your password using the secure link below:\n\nhttps://github.com/password_reset/8492048204820482\n\nIf you did not make this request, you can safely ignore this email.',
    attachmentOrLink: 'https://github.com/password_reset/8492048204820482',
    isScam: false,
    difficulty: 'Hard',
    scamCategory: 'Legitimate System Alert',
    explanation: 'This is a genuine password reset email from GitHub. The domain is exactly @github.com, it addresses the user by their real username (@alex_dev), and links directly to official https://github.com without aggressive threats.',
    keyIndicators: [
      'Exact official sender domain (@github.com)',
      'Mentions user exact handle',
      'Safe ignore advice without fake panic'
    ]
  }
];

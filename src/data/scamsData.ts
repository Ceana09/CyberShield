import { ScamCategory } from '../types';

export const SCAM_CATEGORIES: ScamCategory[] = [
  {
    id: 'phishing',
    title: 'Phishing',
    badgeRisk: 'High Risk',
    riskScore: 92,
    icon: 'mail',
    summary: 'Deceptive emails claiming to be from reputable sources like banks, tax agencies, or tech providers to extract passwords and sensitive data.',
    fullDescription: 'Phishing remains the #1 initial attack vector worldwide. Attackers craft hyper-realistic emails imitating trusted entities (banks, Microsoft, Google, PayPal, Netflix, government tax bureaus). The emails typically declare an urgent issue—such as an unauthorized charge, account suspension, or tax refund—to provoke panic and make victims click a link leading to a cloned credential-harvesting website.',
    commonTargets: ['Online Banking Logins', 'Credit Card Numbers', 'Workplace Single Sign-On (SSO)', 'Tax ID / Social Security Numbers'],
    keyTactics: [
      'Lookalike domain names (e.g., support@paypa1-security.com)',
      'High-urgency warnings (e.g., "Account suspended in 24 hours")',
      'Generic greetings or slightly altered corporate logos',
      'Hidden hyperlink destinations behind legitimate-looking button text'
    ],
    psychologicalTriggers: ['Fear of financial loss', 'Urgency & artificial deadlines', 'Deference to institutional authority'],
    redFlags: [
      'Sender email address domain does not match the official brand domain',
      'Sense of extreme urgency demanding immediate action',
      'Requests to verify passwords or enter payment details via an external link',
      'Generic greeting like "Dear Customer" instead of your actual registered name'
    ],
    simulatedScenario: {
      channel: 'Email',
      sender: 'service-security@chase-bank-verify92.com',
      messageText: 'URGENT SECURITY ALERT: Unauthorized transaction of $1,420.00 detected on your checking account. If you did not authorize this payment, you must verify your identity immediately to cancel the transfer within 1 hour: https://chase-bank-verify92.com/auth/login?ref=secure',
      redFlagHighlights: [
        'Fake domain chase-bank-verify92.com instead of official chase.com',
        'Aggressive 1-hour countdown to prevent logical verification',
        'Direct link to enter login credentials'
      ],
      explanation: 'Official banks never ask you to verify your full credentials through a direct email link. Always navigate independently to your bank portal by typing the URL manually.'
    },
    preventativeMeasures: [
      'Never click links in unexpected security alert emails—always open the app or type the official URL yourself.',
      'Check the actual email header address, not just the display name.',
      'Enable hardware security keys (FIDO2/WebAuthn) or Authenticator apps instead of SMS for 2FA.'
    ],
    whatToDoIfTrapped: [
      'Immediately change your banking/account password from a clean browser session.',
      'Notify your bank fraud department to place a temporary freeze on online transfers.',
      'Enable multi-factor authentication with an authenticator app.'
    ]
  },
  {
    id: 'smishing',
    title: 'Smishing',
    badgeRisk: 'Med Risk',
    riskScore: 84,
    icon: 'sms',
    summary: 'SMS-based phishing attacks designed to trick you into clicking malicious links or calling bogus support numbers regarding parcels, bank KYC, or tolls.',
    fullDescription: 'Smishing leverages short message service (SMS) and instant messaging apps. Because text messages are read on mobile devices where URLs are truncated and senders can be spoofed with alphanumeric caller IDs, victims are 3x more likely to click malicious links sent via SMS than email.',
    commonTargets: ['Bank Account KYC', 'Postal/Delivery Redelivery Fees', 'Toll Road Payment Portals', 'Lottery/Raffle Claims'],
    keyTactics: [
      'Alphanumeric sender ID spoofing (making the SMS appear in the same thread as your real bank)',
      'Shortened URLs (bit.ly, tinyurl, or suspicious .top/.xyz domains)',
      'Fake package delivery failures ("Address missing, pay $1.50 redelivery fee")',
      'Urgent PAN/KYC document update notifications'
    ],
    psychologicalTriggers: ['Curiosity regarding orders', 'Inconvenience avoidance', 'Time pressure on the go'],
    redFlags: [
      'Includes shortened or obfuscated links with strange extensions (.xyz, .top, .cc)',
      'Claims your bank account or SIM card will be blocked unless you click right now',
      'Sent from an unfamiliar 10-digit international or personal mobile number'
    ],
    simulatedScenario: {
      channel: 'SMS',
      sender: '+1 (832) 991-0341 [Spoofed: USPS-ALERT]',
      messageText: 'USPS Notice: Your package #US940283 cannot be delivered due to an incomplete street address. Please update your address and pay a $1.20 redelivery charge within 12h: https://usps-parcel-redelivery.xyz/track',
      redFlagHighlights: [
        'Domain is usps-parcel-redelivery.xyz instead of usps.com',
        'Demands small credit card fee to harvest card numbers and CVVs'
      ],
      explanation: 'Postal services never demand small fees via random text messages to correct an address. The goal is to harvest your credit card details.'
    },
    preventativeMeasures: [
      'Do not click links in unsolicited SMS messages.',
      'Track parcels only via the official carrier application or official website.',
      'Forward suspicious scam texts to your carrier spam line (7726 in US/UK/Canada).'
    ],
    whatToDoIfTrapped: [
      'If you entered credit card details, call your card issuer immediately to lock/replace the card.',
      'Run a mobile security scan if an APK/app was downloaded.',
      'Block the sender number and report as spam.'
    ]
  },
  {
    id: 'upi-fraud',
    title: 'UPI Fraud',
    badgeRisk: 'High Risk',
    riskScore: 95,
    icon: 'currency_exchange',
    summary: 'Fake payment requests, reverse charge scams, and "scan QR to receive money" traps that instantly drain funds from instant payment wallets.',
    fullDescription: 'With the explosion of instant payment rails (UPI, Zelle, Venmo, Pix), scammers exploit the confusion between sending and receiving money. Scammers pretend to be online buyers (on OLX, Facebook Marketplace), refund agents, or lottery officers, convincing the victim that scanning a QR code or entering their UPI PIN is required to "receive" funds.',
    commonTargets: ['Bank Account Balances', 'UPI PINs', 'Online Marketplace Sellers', 'Refund Claimants'],
    keyTactics: [
      'Sending a "Collect Request" instead of paying, disguised as a refund',
      'Sending a QR code claiming "Scan this QR code to receive Rs. 25,000 into your account"',
      'Faking payment screenshots with edited bank transfer confirmations',
      'Overpaying by mistake and begging for an immediate refund before their fake cheque bounces'
    ],
    psychologicalTriggers: ['Greed / Excitement of receiving money', 'Trust in buyer personas', 'Misunderstanding of payment protocol'],
    redFlags: [
      'Golden Rule: You NEVER need to enter your PIN or password to RECEIVE money',
      'Anyone asking you to scan a QR code to credit money into your wallet',
      'Buyer insisting on using an unfamiliar payment link or third-party escort service'
    ],
    simulatedScenario: {
      channel: 'Payment App',
      sender: 'Marketplace Buyer (Vijay_Electronics_Store)',
      messageText: 'I want to purchase your used sofa immediately. I have sent an advance of $200. Please scan the attached QR code in your GooglePay/PhonePe app and enter your UPI PIN to approve receipt into your bank account.',
      redFlagHighlights: [
        'Claiming PIN entry is required to receive funds',
        'QR code sent for receiving money'
      ],
      explanation: 'Entering a PIN on any instant payment app always authorizes a DEBIT from your account, never a credit.'
    },
    preventativeMeasures: [
      'Remember: PIN is only for sending/debiting money. Receiving money is completely automatic.',
      'Never accept collect requests from strangers on marketplace platforms.',
      'Verify money is actually credited by checking your bank statement, not SMS screenshots.'
    ],
    whatToDoIfTrapped: [
      'Call the National Cyber Crime Helpline (e.g. 1930 in India / local fraud hotline) within the "Golden Hour".',
      'Report the transaction immediately to your bank and payment app support to freeze the recipient account.',
      'File an official cyber crime report online.'
    ]
  },
  {
    id: 'tech-support',
    title: 'Tech Support Scams',
    badgeRisk: 'High Risk',
    riskScore: 88,
    icon: 'desktop_windows',
    summary: 'Loud browser popups, fake Microsoft/Apple virus alerts, and fraudulent helpdesk numbers that coerce victims into installing remote access tools.',
    fullDescription: 'Tech support scams begin with browser lockups, alarming sirens, or search ads for customer service numbers. Victims are instructed to call a toll-free helpline where a scammer posing as a Microsoft, Apple, or antivirus technician convinces them to install software like AnyDesk or TeamViewer, claims fake trojans exist, and charges hundreds of dollars or hacks into online banking.',
    commonTargets: ['Remote PC Access', 'Online Banking Portals', 'Gift Cards / Wire Transfers', 'Personal Files & Passwords'],
    keyTactics: [
      'Full-screen browser alerts with fake error codes (e.g., ERR_WINDOWS_DEFENDER_0x8007)',
      'Remote desktop tools (AnyDesk, TeamViewer, UltraViewer) to take mouse control',
      'Inspect Element trickery to manipulate bank balances and claim an "accidental over-refund"',
      'Demanding payment via Apple/Target gift cards, cryptocurrency, or wire transfers'
    ],
    psychologicalTriggers: ['Panic over device compromise', 'Deference to technical authority', 'Confusion caused by flashing sirens'],
    redFlags: [
      'Popups claiming your computer is infected with a phone number to call',
      'Tech companies never display phone numbers in security popups or cold-call you',
      'Technician asking you to log into your bank while they have remote access to your screen'
    ],
    simulatedScenario: {
      channel: 'Phone Call',
      sender: 'Toll-Free Helpline 1-800-555-0199',
      messageText: 'CRITICAL WINDOWS ALERT: Your IP address is broadcasting Russian banking trojans. Do not shut down your computer. Call Microsoft Certified Security immediately at 1-800-555-0199 for diagnostic repair.',
      redFlagHighlights: [
        'Microsoft never provides toll-free call numbers in web popups',
        'Artificial urgency forbidding restarting the PC'
      ],
      explanation: 'Legitimate operating systems never prompt you to call a telephone number to remove a virus. Simply close the browser tab or force-close via Task Manager.'
    },
    preventativeMeasures: [
      'Never call telephone numbers displayed in browser popups.',
      'Never allow an unsolicited caller or popup to install remote desktop tools on your machine.',
      'Use a reputable ad blocker and modern browser with phishing protection.'
    ],
    whatToDoIfTrapped: [
      'Disconnect your computer from Wi-Fi / Ethernet immediately.',
      'Uninstall AnyDesk/TeamViewer and any recently downloaded executables.',
      'Change all critical passwords from a separate clean device (phone/tablet).'
    ]
  },
  {
    id: 'job-scams',
    title: 'Work-From-Home & Task Scams',
    badgeRisk: 'High Risk',
    riskScore: 90,
    icon: 'work',
    summary: 'Fake job offers via WhatsApp/Telegram promising $200-$500/day for liking YouTube videos or rating hotels, ending in prepaid deposit traps.',
    fullDescription: 'Task scams target job seekers and students. Scammers reach out via WhatsApp/Telegram offering easy part-time work (e.g. liking Instagram reels, reviewing hotels). They pay a small real reward ($10-$20) initially to build trust, then require victims to deposit "security deposits" or buy cryptocurrency to unlock higher-tier tasks, ultimately disappearing with all invested funds.',
    commonTargets: ['Job Seekers & Students', 'Cryptocurrency Wallets', 'Personal Identity Documents', 'Bank Account Deposits'],
    keyTactics: [
      'Unsolicited WhatsApp message from "HR Recruiter at Amazon/TikTok"',
      'Initial genuine payout of $10 to make the victim believe it is legit',
      'Progression into "Prepaid Tasks" requiring $100 -> $500 -> $2000 deposits to withdraw salary',
      'Telegram group chats filled with fake bots showing fake withdrawal proofs'
    ],
    psychologicalTriggers: ['Easy money allure', 'Sunk cost fallacy', 'Social proof from fake bot members'],
    redFlags: [
      'Job offers without any formal interview, portfolio review, or legal contract',
      'Requiring the worker to PAY money or buy crypto to receive their salary',
      'Communication conducted exclusively over Telegram or WhatsApp'
    ],
    simulatedScenario: {
      channel: 'WhatsApp',
      sender: 'Recruiter Chloe (TikTok Global Media HR)',
      messageText: 'Hello! We noticed your profile and have an online freelance opportunity. Earn $150-$400 daily by simply subscribing to 5 YouTube channels daily. Daily payout via Crypto/Bank. Reply YES to start our 5-minute onboarding test.',
      redFlagHighlights: [
        'Unrealistic daily income for trivial micro-tasks',
        'Direct contact on WhatsApp with no job application ever submitted'
      ],
      explanation: 'No reputable company pays hundreds of dollars per day for liking social media posts. This is an upfront fee task scam.'
    },
    preventativeMeasures: [
      'Remember: Real employers pay you; you never pay an employer to work.',
      'Ignore unsolicited job invitations on WhatsApp and Telegram.',
      'Research company email domains on LinkedIn and official career portals.'
    ],
    whatToDoIfTrapped: [
      'Stop making any further deposits immediately, regardless of what the scammer promises.',
      'Save all chat transcripts, wallet addresses, and transaction hashes.',
      'File a complaint with law enforcement and cyber crime agencies.'
    ]
  },
  {
    id: 'investment-crypto',
    title: 'Crypto & Investment Ponzi',
    badgeRisk: 'High Risk',
    riskScore: 96,
    icon: 'trending_up',
    summary: 'Fraudulent crypto trading apps, fake AI trading bots, and romance "Pig Butchering" scams promising guaranteed 100%+ weekly returns.',
    fullDescription: 'Investment scams cause the largest financial losses globally. Attackers create sleek fake trading platforms (web and fake iOS/Android test apps) that display fabricated skyrocketing profits. When the victim attempts to withdraw funds, the platform demands extra "taxes", "VIP unlocking fees", or "AML clearance deposits" until the victim is completely drained.',
    commonTargets: ['Life Savings & Retirement Funds', 'Cryptocurrency Holdings', 'High-Net-Worth Individuals'],
    keyTactics: [
      'Promising "Zero Risk" and "Guaranteed 10% daily yield"',
      'Pig Butchering: Months of romance chatting on dating apps before introducing crypto trading',
      'Custom fake trading dashboard where numbers are artificially inflated by scammers',
      'Demanding 20% "liquidity tax" when user tries to initiate a withdrawal'
    ],
    psychologicalTriggers: ['FOMO (Fear of Missing Out)', 'Romance and emotional trust', 'Greed & financial desperation'],
    redFlags: [
      'Guaranteed high returns with zero market risk (statistically impossible)',
      'Unregulated trading exchange hosted on an unknown domain',
      'Requirements to pay hefty "taxes" or "fees" to withdraw your own capital'
    ],
    simulatedScenario: {
      channel: 'Chat',
      sender: 'Crypto Arbitrage VIP Group',
      messageText: 'Our AI algorithmic quantitative bot trades Bitcoin arbitrage with 99.4% win rate. Deposit $1,000 today and receive guaranteed $3,800 in 7 days. Regulated by international blockchain council. Limited slots remaining.',
      redFlagHighlights: [
        'Guaranteed high ROI with no downside',
        'Fake regulatory certifications',
        'Artificial scarcity to force instant deposit'
      ],
      explanation: 'All investments carry risk. Anyone promising guaranteed multi-fold returns in days is running an outright scam.'
    },
    preventativeMeasures: [
      'Only invest through regulated, recognized financial brokerages.',
      'Never send cryptocurrency or wire funds to anyone met online on dating or chat apps.',
      'Verify company licensing with official regulatory bodies (SEC, FCA, SEBI, MAS).'
    ],
    whatToDoIfTrapped: [
      'Do NOT pay any fee to unlock withdrawals—it is a second trap to take more money.',
      'Document all wallet transactions on the blockchain explorer.',
      'Contact specialized cyber law enforcement and file a formal report.'
    ]
  },
  {
    id: 'fake-courier',
    title: 'Fake Delivery & Customs Scams',
    badgeRisk: 'Med Risk',
    riskScore: 78,
    icon: 'local_shipping',
    summary: 'Fake courier notices (FedEx, DHL, Royal Mail, India Post) claiming packages are held due to incomplete address, tax, or illicit contents.',
    fullDescription: 'Scammers exploit the massive volume of modern e-commerce. They blast automated messages stating a delivery attempt failed or customs is holding a valuable parcel. Victims enter their home address and credit card details on a cloned postal site, leading to unauthorized recurring subscription charges or identity theft.',
    commonTargets: ['Credit Card CVVs', 'Full Physical Residential Address', 'Phone & Identity Details'],
    keyTactics: [
      'Timing campaigns during holiday shopping seasons (Black Friday, Diwali, Christmas)',
      'Mimicking official postal branding and tracking UI',
      'Charging small initial amounts ($0.99) that activate hidden $80/month recurring charges'
    ],
    psychologicalTriggers: ['Anticipation of online purchases', 'Relief in resolving minor logistics glitch'],
    redFlags: [
      'Message received when you have not ordered any international package',
      'URL leads to a non-governmental/non-carrier domain (e.g. dhl-parcel-release-customs.co)',
      'Payment requested exclusively in crypto or suspicious web forms'
    ],
    simulatedScenario: {
      channel: 'SMS',
      sender: '+44 7911 123456 [FedEx]',
      messageText: 'FedEx Delivery Issue: Parcel GB-88219 is held at our local depot due to unpaid customs duty of £1.95. Click here to confirm shipping address and release your parcel: https://fedex-clearance-portal.info',
      redFlagHighlights: [
        'Domain fedex-clearance-portal.info is not the official fedex.com domain',
        'Generic tracking number that does not match your purchase receipts'
      ],
      explanation: 'Always inspect the root domain. Genuine FedEx notifications will only ever point to fedex.com.'
    },
    preventativeMeasures: [
      'Cross-check parcel tracking numbers directly on the merchant or official courier app.',
      'Never pay customs fees via links received via random SMS or WhatsApp messages.'
    ],
    whatToDoIfTrapped: [
      'Block and cancel the credit card used immediately.',
      'Monitor credit reports for unauthorized inquiries.'
    ]
  },
  {
    id: 'sextortion-blackmail',
    title: 'Sextortion & Webcam Blackmail',
    badgeRisk: 'High Risk',
    riskScore: 86,
    icon: 'lock_open',
    summary: 'Terrifying emails claiming a hacker recorded your webcam browsing adult websites, quoting old breached passwords to extort Bitcoin.',
    fullDescription: 'In this psychological extortion scam, cybercriminals purchase breached database dumps containing old user passwords. They email the victim, quoting their real past password as "proof" that their device was infected with Pegasus trojans and threatening to email intimate videos to family and colleagues unless a ransom is paid in Bitcoin.',
    commonTargets: ['Individuals using exposed passwords', 'Teens & Young Adults on Social Apps'],
    keyTactics: [
      'Quoting a leaked password from a past website data breach to simulate access',
      'Claiming webcam and dual-screen video recordings exist with zero actual proof',
      'Setting a countdown timer (e.g., "You have 48 hours from opening this email")'
    ],
    psychologicalTriggers: ['Extreme embarrassment & shame', 'Panic over social reputation ruin', 'Isolation'],
    redFlags: [
      'No actual screenshot or video proof provided',
      'Ransom demand strictly in Bitcoin or Monero',
      'The password shown is an old password you used years ago on a forum'
    ],
    simulatedScenario: {
      channel: 'Email',
      sender: 'Hacker_Daemon_Root@anon-mail.org',
      messageText: 'I know your password is "Summer2019!". I infected your device with remote surveillance spyware and recorded your split-screen video while visiting adult sites. Pay $850 in Bitcoin to wallet bc1qxy... within 48 hours or I send the video to all your Facebook contacts.',
      redFlagHighlights: [
        'Mass-blasted generic extortion script',
        'Old password obtained from public historical credential dumps (e.g. HaveIBeenPwned)'
      ],
      explanation: 'Scammers send millions of these automated emails hoping a fraction of recipients panic. They have no recordings.'
    },
    preventativeMeasures: [
      'Check if your email and passwords were leaked using haveibeenpwned.com.',
      'Use a password manager with unique 16+ character passwords for every website.',
      'Never pay blackmail ransoms—paying only invites further extortion.'
    ],
    whatToDoIfTrapped: [
      'Do NOT pay any cryptocurrency. Do not reply to the email.',
      'Change any accounts that still use that old breached password.',
      'Report the email as phishing/extortion and mark as spam.'
    ]
  },
  {
    id: 'ai-voice-cloning',
    title: 'AI Voice Cloning & Deepfake Scams',
    badgeRisk: 'High Risk',
    riskScore: 94,
    icon: 'record_voice_over',
    summary: 'Attackers use 3-second audio clips from social media to clone family members or bosses voices, making fake emergency calls for urgent bail or wire transfers.',
    fullDescription: 'Generative AI audio models can clone an individual\'s unique voice timbre, accent, and cadence from just a few seconds of public Instagram, TikTok, or YouTube audio. Scammers call parents or grandparents pretending to be a distressed grandchild in police custody, car accident, or kidnapping, begging for immediate wire transfer or bail funds.',
    commonTargets: ['Elderly Parents & Grandparents', 'Corporate Finance Officers (CEO Fraud)', 'Family Members of Travelers'],
    keyTactics: [
      'Cloning voice from short social video clips',
      'Simulating sirens, background crying, or airport noise to mask audio glitches',
      'Demanding immediate cash delivery via courier or irreversible wire transfer'
    ],
    psychologicalTriggers: ['Parental panic for child safety', 'Disorientation in emergencies', 'Sense of crisis'],
    redFlags: [
      'Caller demands that you do NOT hang up or call anyone else',
      'Caller claims their original phone was broken or confiscated by authorities',
      'Demands payment via wire, gold, crypto, or gift cards'
    ],
    simulatedScenario: {
      channel: 'Phone Call',
      sender: 'Unknown Number (Voice sounds identical to Son)',
      messageText: '"Mom, I was in a terrible car accident and the police officer is arresting me right now for a broken headlight unless you wire $2,500 bail to the court attorney immediately..."',
      redFlagHighlights: [
        'Voice cloning paired with background panic',
        'Strict demand not to contact other family members'
      ],
      explanation: 'Always hang up and call your family member directly on their trusted saved phone number or ask a pre-agreed secret family safety passphrase.'
    },
    preventativeMeasures: [
      'Establish a private "Family Safe Word / Passphrase" that only your household knows.',
      'Always hang up and call back the person on their known real phone number.',
      'Be cautious sharing high-quality voice audio publicly on open social profiles.'
    ],
    whatToDoIfTrapped: [
      'Immediately verify the safety of your family member by calling their friends or school/office.',
      'If funds were wired, contact the wire department or law enforcement immediately.'
    ]
  },
  {
    id: 'electricity-bill',
    title: 'Utility Disconnection Fraud',
    badgeRisk: 'Med Risk',
    riskScore: 82,
    icon: 'bolt',
    summary: 'Panic-inducing SMS/WhatsApp messages warning that your electricity, water, or internet will be disconnected tonight due to non-payment unless you call a fake officer.',
    fullDescription: 'This scam thrives on the fear of sudden darkness or business disruption. Sent in the late afternoon, the message claims power will be terminated at 9:30 PM due to an unpaid update. When the victim calls the fake power officer, they are instructed to install an app (which steals bank OTPs) or pay a nominal "reconnection test fee".',
    commonTargets: ['Homeowners', 'Small Business Shop Owners', 'Senior Citizens'],
    keyTactics: [
      'Timing messages for evening hours when government customer centers are closed',
      'Providing a personal mobile number of a "Verification Officer"',
      'Asking victim to download a quick utility verification APK or APK link'
    ],
    psychologicalTriggers: ['Urgency of darkness/heat loss', 'Inability to reach official support after hours'],
    redFlags: [
      'Official utility providers never send disconnection warnings from personal 10-digit mobile numbers',
      'Demanding instant payment over phone or APK installation',
      'No mention of your actual consumer/meter account number'
    ],
    simulatedScenario: {
      channel: 'SMS',
      sender: '+91 98412 87192',
      messageText: 'Dear Consumer, Your Electricity power will be disconnected tonight at 9:30 PM from electricity office because your previous month bill was not updated. Please immediately contact our Electricity Officer Mr. Sharma at 9841287192.',
      redFlagHighlights: [
        'Personal mobile number used instead of official utility alphanumeric header',
        'Lacks your consumer/meter account number',
        'Threatens immediate night-time disconnection'
      ],
      explanation: 'Utility companies issue formal printed notices and grace periods. They never threaten same-night disconnection via casual SMS numbers.'
    },
    preventativeMeasures: [
      'Check your actual utility bill status exclusively via the official government portal or app.',
      'Never call the personal phone number provided in such text messages.'
    ],
    whatToDoIfTrapped: [
      'If you installed any APK app, immediately put phone in Airplane Mode and factory reset or uninstall the app.',
      'Check bank balances and alert your bank if any OTPs were intercepted.'
    ]
  }
];

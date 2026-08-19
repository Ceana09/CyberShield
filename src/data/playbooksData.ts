import { IncidentPlaybook } from '../types';

export const INCIDENT_PLAYBOOKS: IncidentPlaybook[] = [
  {
    id: 'clicked-link',
    title: 'I Clicked a Suspicious Link',
    category: 'Browsing & Malware',
    severity: 'Medium',
    icon: 'link_off',
    timeWindow: 'First 5 Minutes',
    summary: 'What to do immediately if you clicked a suspicious link from an unknown email, SMS, or direct message.',
    immediateActions: [
      {
        stepNumber: 1,
        title: 'Close the Browser Tab & Do NOT Enter Information',
        description: 'Immediately close the open tab. If a form asks for login credentials, credit card details, or personal information, leave all fields blank.',
        actionDetail: 'Do not click any buttons on the page, even "Cancel" or "Unsubscribe", as these can trigger drive-by downloads.',
        icon: 'close'
      },
      {
        stepNumber: 2,
        title: 'Disconnect from Wi-Fi / Cellular (If File Downloaded)',
        description: 'If clicking the link triggered an automatic file download (.exe, .dmg, .apk, .zip, .iso), immediately turn on Airplane Mode or disconnect your Wi-Fi.',
        actionDetail: 'This prevents any malicious background script from establishing command-and-control connection to external servers.',
        icon: 'wifi_off'
      },
      {
        stepNumber: 3,
        title: 'Delete Downloaded File Without Opening',
        description: 'Check your Downloads folder. If a file was saved, do NOT double-click or run it. Delete it immediately and empty your trash/recycle bin.',
        actionDetail: 'Simply downloading a file rarely compromises a modern system if you never execute or run it.',
        icon: 'delete_forever'
      },
      {
        stepNumber: 4,
        title: 'Run a Full Antivirus / Malware Scan',
        description: 'Launch Windows Defender, Malwarebytes, or Apple XProtect/CleanMyMac to run a deep scan of your system memory and temporary directories.',
        actionDetail: 'Ensure your security definitions are updated to the latest available version.',
        icon: 'security'
      }
    ],
    followUpActions: [
      'Clear your browser cache, cookies, and active session logins for that browser.',
      'Check browser extensions and remove any newly added or unfamiliar add-ons.',
      'If you entered any credentials, immediately change passwords on all associated accounts.'
    ],
    officialHelplines: [
      { region: 'United States', organization: 'FTC Fraud & Cyber Reporting', contact: 'ReportFraud.ftc.gov', link: 'https://reportfraud.ftc.gov' },
      { region: 'India', organization: 'National Cyber Crime Reporting Portal', contact: 'Dial 1930 / cybercrime.gov.in', link: 'https://cybercrime.gov.in' },
      { region: 'United Kingdom', organization: 'Action Fraud UK', contact: '0300 123 2040 / actionfraud.police.uk', link: 'https://www.actionfraud.police.uk' },
      { region: 'International', organization: 'Anti-Phishing Working Group (APWG)', contact: 'reportphishing@apwg.org', link: 'https://apwg.org' }
    ]
  },
  {
    id: 'shared-otp',
    title: 'I Shared an OTP or 2FA Code',
    category: 'Credential Breach',
    severity: 'Critical',
    icon: 'key_off',
    timeWindow: 'Golden 10 Minutes',
    summary: 'Immediate triage steps if you accidentally verbally disclosed or typed a one-time SMS/Authenticator verification code to someone.',
    immediateActions: [
      {
        stepNumber: 1,
        title: 'Immediately Log Into the Target Account and Change Password',
        description: 'Open a trusted browser or mobile app, log in directly, and trigger "Change Password" to automatically revoke all active sessions.',
        actionDetail: 'Ensure you select "Log out of all other devices/sessions" during the password update.',
        icon: 'lock_reset'
      },
      {
        stepNumber: 2,
        title: 'If It Was a Banking / Payment OTP: Call Bank Fraud Hotline',
        description: 'Call your bank\'s dedicated 24/7 fraud helpline immediately to freeze internet banking, debit cards, and UPI/wire services.',
        actionDetail: 'Inform the agent: "I shared a verification code with a fraudster. Please freeze all outgoing debits immediately."',
        icon: 'phone_in_talk'
      },
      {
        stepNumber: 3,
        title: 'Revoke and Reset 2FA Method',
        description: 'Reconfigure your Two-Factor Authentication. Switch from SMS verification to an Authenticator App (Google Authenticator, Bitwarden, or YubiKey).',
        actionDetail: 'This ensures the scammer cannot reuse SIM-swap or SMS interception tactics against you.',
        icon: 'phonelink_lock'
      },
      {
        stepNumber: 4,
        title: 'Review Account Authorized Devices & Connected Apps',
        description: 'Check "Recent Security Activity" in Google, Apple, or Microsoft settings to verify if any unauthorized IP address has established a session.',
        actionDetail: 'Remove and block any device names or geographical locations you do not recognize.',
        icon: 'devices'
      }
    ],
    followUpActions: [
      'Enable biometric authentication (Touch ID, Face ID) for payment apps.',
      'Check for recent email forwarding rules set up in your email client.',
      'File a formal report on the cybercrime portal with timestamps.'
    ],
    officialHelplines: [
      { region: 'United States', organization: 'FBI Internet Crime Complaint Center (IC3)', contact: 'ic3.gov', link: 'https://www.ic3.gov' },
      { region: 'India', organization: 'Citizen Financial Cyber Fraud Hotline', contact: '1930', link: 'https://cybercrime.gov.in' },
      { region: 'Australia', organization: 'ReportCyber (ACSC)', contact: '1300 CYBER1 (1300 292 371)', link: 'https://www.cyber.gov.au' }
    ]
  },
  {
    id: 'sent-money',
    title: 'I Transferred Money / UPI Fraud',
    category: 'Financial Fraud',
    severity: 'Critical',
    icon: 'payments',
    timeWindow: 'Act within Golden Hour (<60 mins)',
    summary: 'Critical steps to attempt fund recall, freeze beneficiary accounts, and file formal dispute claims after financial fraud.',
    immediateActions: [
      {
        stepNumber: 1,
        title: 'Call the Cyber Fraud Reporting Helpline (1930 / Local)',
        description: 'If you are in India, dial 1930 immediately. If in the US/UK, contact your bank\'s emergency wire recall desk.',
        actionDetail: 'Helpline officers coordinate directly with banks to freeze the destination account before the scammer can withdraw cash at an ATM.',
        icon: 'call'
      },
      {
        stepNumber: 2,
        title: 'Contact Your Bank / Payment App Support with Transaction UTR',
        description: 'Provide the exact Transaction ID (UTR / Reference number), recipient UPI ID or account number, amount, and timestamp.',
        actionDetail: 'Request a formal "Chargeback / Fraud Dispute Ticket Number" for legal records.',
        icon: 'receipt_long'
      },
      {
        stepNumber: 3,
        title: 'Preserve All Evidence & Chat Screenshots',
        description: 'Take high-resolution screenshots of the chat history, phone numbers, payment QR codes, transaction receipts, and call logs.',
        actionDetail: 'Do not delete the conversation or block the fraudster until all evidence is backed up.',
        icon: 'photo_camera'
      },
      {
        stepNumber: 4,
        title: 'File an Online Police / Cybercrime Complaint',
        description: 'Submit an official complaint on your national portal (cybercrime.gov.in / IC3.gov / actionfraud.police.uk) attaching all receipts.',
        actionDetail: 'A formal Acknowledgement Number (FIR/Complaint ID) is required by banks to release recovered frozen funds back to you.',
        icon: 'gavel'
      }
    ],
    followUpActions: [
      'Monitor your bank statements daily for unexpected micro-transactions.',
      'Place a credit freeze with Experian, TransUnion, and Equifax to prevent fraudulent loan applications.',
      'Be alert for "Recovery Scammers" who claim they can hack the money back for an advance fee—they are also scammers.'
    ],
    officialHelplines: [
      { region: 'India', organization: 'Cyber Crime Emergency Hotline', contact: '1930 (24/7 Toll-Free)', link: 'https://cybercrime.gov.in' },
      { region: 'United States', organization: 'Consumer Financial Protection Bureau (CFPB)', contact: 'consumerfinance.gov', link: 'https://www.consumerfinance.gov' },
      { region: 'European Union', organization: 'Europol Cybercrime Centre (EC3)', contact: 'europol.europa.eu', link: 'https://www.europol.europa.eu' }
    ]
  },
  {
    id: 'installed-remote-app',
    title: 'I Installed a Remote Access App',
    category: 'Device Compromise',
    severity: 'High',
    icon: 'screen_share',
    timeWindow: 'Immediate',
    summary: 'Emergency quarantine steps if a tech support or bank scammer instructed you to download AnyDesk, TeamViewer, QuickSupport, or RustDesk.',
    immediateActions: [
      {
        stepNumber: 1,
        title: 'Force Kill & Disconnect Internet Instantly',
        description: 'Pull the power cord, hold the power button to force shutdown, or turn off your Wi-Fi router immediately.',
        actionDetail: 'Without internet connectivity, the scammer\'s remote control session is terminated instantly.',
        icon: 'power_settings_new'
      },
      {
        stepNumber: 2,
        title: 'Boot in Safe Mode / Uninstall Remote Access Software',
        description: 'Turn your device on in Airplane Mode / Safe Mode. Open Control Panel (Windows) or Applications (Mac/Android) and uninstall AnyDesk, TeamViewer, UltraViewer, or AnyViewer.',
        actionDetail: 'Check your Download folder and delete all setup .exe, .dmg, or .apk files.',
        icon: 'app_registration'
      },
      {
        stepNumber: 3,
        title: 'Change All Passwords from a Clean Device',
        description: 'Using a DIFFERENT clean phone or tablet, log into your email, bank, and password manager to change all master credentials.',
        actionDetail: 'Do not enter passwords on the compromised PC until it has been completely sanitized.',
        icon: 'lock'
      },
      {
        stepNumber: 4,
        title: 'Check for Persistent Remote Services & Scheduled Tasks',
        description: 'Scammers frequently create hidden backdoors in Windows Scheduled Tasks or startup services to regain access later.',
        actionDetail: 'Run an offline rescue disk scan with Windows Defender Offline or Bitdefender Rescue CD.',
        icon: 'terminal'
      }
    ],
    followUpActions: [
      'Call your bank to check if any new beneficiaries or transfer limits were scheduled during the remote session.',
      'Check if your browser auto-fill passwords were exported (look for exported passwords.csv in Downloads).'
    ],
    officialHelplines: [
      { region: 'Global', organization: 'AnyDesk Abuse Reporting', contact: 'abuse@anydesk.com', link: 'https://anydesk.com' },
      { region: 'Global', organization: 'TeamViewer Fraud Prevention', contact: 'privacy@teamviewer.com', link: 'https://teamviewer.com' }
    ]
  }
];

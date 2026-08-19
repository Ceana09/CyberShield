import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '5mb' }));

// Lazy Google GenAI Client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    try {
      genAIClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn('Failed to initialize GoogleGenAI client:', e);
    }
  }
  return genAIClient;
}

// In-memory community reports store
const communityReports: Array<{
  id: string;
  type: string;
  sender: string;
  preview: string;
  reportedAt: string;
  riskScore: number;
  platform: string;
}> = [
  {
    id: 'rep-1',
    type: 'UPI Fraud',
    sender: 'OLX Buyer Fake Army Officer',
    preview: 'Sent QR code requesting PIN to credit $400 for sofa set.',
    reportedAt: '10 mins ago',
    riskScore: 95,
    platform: 'GooglePay / OLX'
  },
  {
    id: 'rep-2',
    type: 'Smishing',
    sender: 'USPS-TRACKING-09',
    preview: 'Address update required for failed parcel with shortlink to usps-fix.top',
    reportedAt: '25 mins ago',
    riskScore: 88,
    platform: 'SMS'
  },
  {
    id: 'rep-3',
    type: 'Task Scam',
    sender: 'Global HR Chloe',
    preview: 'Telegram group offering $300/day for subscribing to YouTube videos.',
    reportedAt: '1 hour ago',
    riskScore: 92,
    platform: 'WhatsApp'
  }
];

// Health endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// Community reports endpoint
app.get('/api/community-reports', (_req: Request, res: Response) => {
  res.json({ reports: communityReports });
});

app.post('/api/report-scam', (req: Request, res: Response) => {
  const { type, sender, preview, platform } = req.body;
  const newReport = {
    id: 'rep-' + Date.now(),
    type: type || 'Suspicious Phishing',
    sender: sender || 'Unknown Sender',
    preview: (preview || '').slice(0, 180),
    reportedAt: 'Just now',
    riskScore: 90,
    platform: platform || 'Web/SMS'
  };
  communityReports.unshift(newReport);
  if (communityReports.length > 25) communityReports.pop();
  res.json({ success: true, report: newReport });
});

// AI Scam Analyzer Endpoint
app.post('/api/analyze-scam', async (req: Request, res: Response) => {
  const { text, sender, channel } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text content is required for threat analysis' });
  }

  const ai = getGenAI();
  if (ai) {
    try {
      const prompt = `You are CyberShield AI, an elite cybersecurity threat analyst and digital scam investigator.
Analyze the following user-submitted message/email/text:

SENDER: ${sender || 'Unknown'}
CHANNEL: ${channel || 'General'}
CONTENT:
"""
${text}
"""

Provide a rigorous JSON threat analysis with this exact structure (no markdown formatting, ONLY valid raw JSON):
{
  "overallRiskScore": <number 0 to 100>,
  "riskLevel": "<Safe | Low | Medium | High | Critical>",
  "scamType": "<Specific Scam Category e.g. Phishing / UPI Fraud / Tech Support / Task Scam / Sextortion / Legitimate Notification>",
  "summary": "<2-sentence clear explanation of why this is or isn't a scam>",
  "confidence": <number 80 to 99>,
  "urgencyScore": <number 0 to 10>,
  "redFlags": [
    {
      "flag": "<Short name of red flag>",
      "severity": "<high | medium | low>",
      "explanation": "<Specific detail from text explaining why this is suspicious>"
    }
  ],
  "detectedIndicators": {
    "fakeAuthority": <true/false>,
    "urgentDeadline": <true/false>,
    "financialRequest": <true/false>,
    "credentialHarvesting": <true/false>,
    "maliciousLinkOrDomain": <true/false>,
    "grammarOrSpoofing": <true/false>
  },
  "extractedUrls": [
    {
      "url": "<extracted url>",
      "isSuspicious": <true/false>,
      "reason": "<reason>"
    }
  ],
  "recommendedAction": "<Clear direct instruction on what the user should do right now>",
  "immediateChecklist": [
    "<Checklist step 1>",
    "<Checklist step 2>",
    "<Checklist step 3>"
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.1,
        }
      });

      const rawJson = response.text;
      if (rawJson) {
        const parsed = JSON.parse(rawJson);
        return res.json(parsed);
      }
    } catch (aiErr) {
      console.warn('Gemini API call error in /api/analyze-scam:', aiErr);
    }
  }

  // If no Gemini key or error, return null to let client run local heuristic engine
  return res.status(200).json({ useFallback: true });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CyberShield Server running on port ${PORT}`);
  });
}

startServer();

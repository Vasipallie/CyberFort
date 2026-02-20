// Mock data and types for SafeDigital platform

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  skills: string[];
  confidenceRating: number;
  category: string;
}

export interface UserProgress {
  moduleId: string;
  completed: boolean;
  score: number;
  timeSpent: number;
  errorsReduced: number;
  confidenceBefore: number;
  confidenceAfter: number;
  completedAt?: string;
}

export interface Certificate {
  id: string;
  userName: string;
  moduleTitle: string;
  completedDate: string;
  practiceHours: number;
  confidenceImprovement: number;
  certificateId: string;
}

export interface VolunteerStats {
  hoursContributed: number;
  certificatesIssued: number;
  avgConfidenceImprovement: number;
  seniorsHelped: number;
}

export const modules: Module[] = [
  {
    id: "gov-login",
    title: "Government Login Practice",
    description: "Learn to safely log in to government portals like Singpass or MyGov step by step.",
    icon: "🏛️",
    estimatedTime: "15–20 min",
    difficulty: "Beginner",
    skills: ["Login procedures", "Password entry", "2FA verification", "Security awareness"],
    confidenceRating: 4.2,
    category: "Government",
  },
  {
    id: "healthcare",
    title: "Healthcare Appointment Booking",
    description: "Practice booking medical appointments online in a safe simulated environment.",
    icon: "🏥",
    estimatedTime: "10–15 min",
    difficulty: "Beginner",
    skills: ["Form navigation", "Date selection", "Confirmation reading", "Rescheduling"],
    confidenceRating: 4.5,
    category: "Healthcare",
  },
  {
    id: "pension",
    title: "Pension / CPF Checking",
    description: "Safely practise checking pension balances and CPF statements online.",
    icon: "💰",
    estimatedTime: "10–15 min",
    difficulty: "Beginner",
    skills: ["Balance reading", "Statement navigation", "Transaction history", "Secure logout"],
    confidenceRating: 4.0,
    category: "Finance",
  },
  {
    id: "scam-awareness",
    title: "Scam Awareness Training",
    description: "Identify and avoid common online scams through interactive exercises.",
    icon: "🛡️",
    estimatedTime: "20–25 min",
    difficulty: "Intermediate",
    skills: ["Phishing detection", "Link verification", "Red flag recognition", "Safe reporting"],
    confidenceRating: 4.8,
    category: "Safety",
  },
  {
    id: "banking",
    title: "Online Banking Basics",
    description: "Learn the fundamentals of online banking in a completely safe practice mode.",
    icon: "🏦",
    estimatedTime: "20–25 min",
    difficulty: "Intermediate",
    skills: ["Account navigation", "Transfer basics", "Balance checking", "Security practices"],
    confidenceRating: 4.3,
    category: "Finance",
  },
  {
    id: "digital-payment",
    title: "PayNow / Digital Payment Practice",
    description: "Practise using digital payment systems like PayNow without risking real money.",
    icon: "📱",
    estimatedTime: "15–20 min",
    difficulty: "Intermediate",
    skills: ["QR scanning", "Payment confirmation", "Receipt reading", "Refund requests"],
    confidenceRating: 4.1,
    category: "Finance",
  },
  {
    id: "sms-scam",
    title: "SMS & WhatsApp Scam Detection",
    description: "Learn to spot suspicious messages and protect yourself from messaging scams.",
    icon: "💬",
    estimatedTime: "15–20 min",
    difficulty: "Advanced",
    skills: ["Message analysis", "Link checking", "Number verification", "Blocking techniques"],
    confidenceRating: 4.7,
    category: "Safety",
  },
  {
    id: "form-filling",
    title: "Form Filling Practice",
    description: "Practise filling out common online forms accurately and confidently.",
    icon: "📝",
    estimatedTime: "10–15 min",
    difficulty: "Beginner",
    skills: ["Text input", "Dropdown selection", "Checkbox usage", "Form submission"],
    confidenceRating: 4.4,
    category: "General",
  },
];

export const mockUserProgress: UserProgress[] = [
  { moduleId: "gov-login", completed: true, score: 85, timeSpent: 18, errorsReduced: 60, confidenceBefore: 30, confidenceAfter: 78, completedAt: "2026-02-15" },
  { moduleId: "healthcare", completed: true, score: 92, timeSpent: 12, errorsReduced: 75, confidenceBefore: 25, confidenceAfter: 88, completedAt: "2026-02-16" },
  { moduleId: "scam-awareness", completed: true, score: 78, timeSpent: 22, errorsReduced: 55, confidenceBefore: 20, confidenceAfter: 72, completedAt: "2026-02-18" },
  { moduleId: "banking", completed: false, score: 45, timeSpent: 10, errorsReduced: 30, confidenceBefore: 15, confidenceAfter: 45 },
  { moduleId: "form-filling", completed: true, score: 95, timeSpent: 8, errorsReduced: 80, confidenceBefore: 35, confidenceAfter: 92, completedAt: "2026-02-19" },
];

export const mockCertificates: Certificate[] = [
  { id: "1", userName: "Margaret Chen", moduleTitle: "Government Login Practice", completedDate: "2026-02-15", practiceHours: 2.5, confidenceImprovement: 48, certificateId: "SD-2026-00142" },
  { id: "2", userName: "Margaret Chen", moduleTitle: "Healthcare Appointment Booking", completedDate: "2026-02-16", practiceHours: 1.8, confidenceImprovement: 63, certificateId: "SD-2026-00143" },
  { id: "3", userName: "Margaret Chen", moduleTitle: "Scam Awareness Training", completedDate: "2026-02-18", practiceHours: 3.2, confidenceImprovement: 52, certificateId: "SD-2026-00156" },
  { id: "4", userName: "Margaret Chen", moduleTitle: "Form Filling Practice", completedDate: "2026-02-19", practiceHours: 1.2, confidenceImprovement: 57, certificateId: "SD-2026-00161" },
];

export const scamExamples = {
  phishingEmails: [
    {
      id: "phish-1",
      from: "security@bankk-alert.com",
      subject: "URGENT: Your Account Has Been Compromised!",
      body: "Dear Customer,\n\nWe detected unusual activity on your account. Click below IMMEDIATELY to verify your identity or your account will be SUSPENDED within 24 hours.\n\nVerify Now: http://bankk-secure-login.suspicious-site.com/verify\n\nBank Security Team",
      redFlags: ["Suspicious domain (bankk-alert.com)", "Urgent threatening language", "Suspicious link URL", "Generic greeting", "Pressure to act immediately"],
    },
    {
      id: "phish-2",
      from: "prize-department@win-millions.net",
      subject: "Congratulations! You've Won $500,000!",
      body: "CONGRATULATIONS!!!\n\nYou have been randomly selected as the winner of our International Email Lottery. To claim your $500,000 prize, please send us your:\n- Full Name\n- Bank Account Number\n- Date of Birth\n\nAct fast! This offer expires in 48 hours.\n\nLottery Department",
      redFlags: ["Too good to be true", "Asks for personal/banking details", "Unknown sender", "Time pressure", "Poor formatting"],
    },
  ],
  fakeSMS: [
    {
      id: "sms-1",
      from: "+65 8123 4567",
      message: "DBS Bank: Your account has been locked due to suspicious activty. Click here to unlock: http://dbs-unlock.tk/verify",
      redFlags: ["Spelling error (activty)", "Suspicious short URL (.tk domain)", "Creates urgency", "Banks don't send unlock links via SMS"],
    },
    {
      id: "sms-2",
      from: "Unknown",
      message: "Hi Mum, I lost my phone and this is my new number. Can you transfer $500 to this account urgently? I'll explain later.",
      redFlags: ["Unknown number claiming to be family", "Urgent money request", "No way to verify identity", "Emotional manipulation"],
    },
  ],
  fakePopups: [
    {
      id: "popup-1",
      title: "⚠️ Windows Security Warning",
      message: "Your computer is infected with 3 viruses! Call Microsoft Support NOW at 1-800-XXX-XXXX to prevent data loss!",
      redFlags: ["Real security software doesn't use browser popups", "Phone number requests", "Scare tactics", "Microsoft doesn't contact users this way"],
    },
  ],
};

export const impactStats = {
  totalSeniorsTrained: 12847,
  avgConfidenceImprovement: 67,
  scamDetectionImprovement: 82,
  volunteerHours: 28450,
  certificatesIssued: 9234,
  countriesReached: 12,
};

export const testimonials = [
  {
    name: "Mdm Tan Siew Lian",
    age: 72,
    quote: "I was so afraid of online banking. SafeDigital let me practise without any fear. Now I can check my CPF on my own!",
    improvement: "Confidence: 20% → 85%",
  },
  {
    name: "Mr. Robert Lim",
    age: 68,
    quote: "The scam training saved me. Last week I recognised a phishing email because of what I learned here.",
    improvement: "Scam detection: 15% → 90%",
  },
  {
    name: "Mrs. Kamala Devi",
    age: 75,
    quote: "My grandchildren set this up for me. I can now book my own doctor appointments online. I feel so independent!",
    improvement: "Confidence: 10% → 78%",
  },
];

export const adminStats = {
  totalUsers: 12847,
  totalSessions: 68432,
  certificatesIssued: 9234,
  avgImprovement: 67,
  mostDifficultModule: "SMS & WhatsApp Scam Detection",
  mostCommonMistake: "Clicking suspicious links without checking the URL",
  scamAwarenessAccuracy: 82,
  monthlyData: [
    { month: "Sep", users: 450, sessions: 2100, certificates: 320 },
    { month: "Oct", users: 620, sessions: 3200, certificates: 480 },
    { month: "Nov", users: 890, sessions: 4800, certificates: 710 },
    { month: "Dec", users: 1100, sessions: 5600, certificates: 890 },
    { month: "Jan", users: 1450, sessions: 7200, certificates: 1100 },
    { month: "Feb", users: 1780, sessions: 8900, certificates: 1340 },
  ],
};

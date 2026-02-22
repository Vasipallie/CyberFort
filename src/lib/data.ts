// Module data for CyberFort simulations

export interface Module {
    id: string;
    title: string;
    description: string;
    icon: string;
    estimatedTime: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    confidenceRating: number;
    skills: string[];
    color: string;
}

export const MODULES: Module[] = [
    {
        id: "gov-login",
        title: "Government Login (SingPass)",
        description: "Practise logging into a government portal using SingPass. Learn about usernames, passwords, and two-factor authentication.",
        icon: "🏛️",
        estimatedTime: "10–15 min",
        difficulty: "Beginner",
        confidenceRating: 4.8,
        skills: ["Entering username & password", "Understanding 2FA codes", "Navigating a dashboard", "Logging out safely"],
        color: "bg-blue-50 border-blue-200",
    },
    {
        id: "healthcare",
        title: "Healthcare Appointment Booking",
        description: "Learn how to book a doctor's appointment at a polyclinic. Select a doctor, choose a date and time, and confirm your booking.",
        icon: "🏥",
        estimatedTime: "8–12 min",
        difficulty: "Beginner",
        confidenceRating: 4.7,
        skills: ["Selecting from dropdown menus", "Choosing dates and times", "Reviewing and confirming bookings", "Understanding confirmation pages"],
        color: "bg-green-50 border-green-200",
    },
    {
        id: "pension",
        title: "Pension / CPF Balance Check",
        description: "Check your CPF (Central Provident Fund) balances and view recent contribution history.",
        icon: "💰",
        estimatedTime: "8–10 min",
        difficulty: "Beginner",
        confidenceRating: 4.6,
        skills: ["Logging into CPF portal", "Reading account balances", "Understanding account types", "Viewing contribution history"],
        color: "bg-amber-50 border-amber-200",
    },
    {
        id: "banking",
        title: "Online Banking",
        description: "Navigate an online banking portal. View your balance, check recent transactions, and practise making a transfer.",
        icon: "🏦",
        estimatedTime: "12–15 min",
        difficulty: "Intermediate",
        confidenceRating: 4.5,
        skills: ["Viewing account balances", "Reading transaction history", "Making safe transfers", "Understanding security features"],
        color: "bg-purple-50 border-purple-200",
    },
    {
        id: "paynow",
        title: "PayNow Transfer",
        description: "Practise sending money using PayNow. Select a contact, enter the amount, and confirm the transfer safely.",
        icon: "📱",
        estimatedTime: "8–10 min",
        difficulty: "Intermediate",
        confidenceRating: 4.4,
        skills: ["Selecting a recipient", "Entering transfer amounts", "Reviewing before confirming", "Understanding transfer receipts"],
        color: "bg-teal-50 border-teal-200",
    },
    {
        id: "form-filling",
        title: "Government Form Filling",
        description: "Practise filling out a typical government form. Enter personal details, select options from dropdowns, and submit.",
        icon: "📝",
        estimatedTime: "10–12 min",
        difficulty: "Beginner",
        confidenceRating: 4.6,
        skills: ["Filling in text fields", "Selecting radio buttons and checkboxes", "Using dropdown menus", "Reviewing forms before submission"],
        color: "bg-orange-50 border-orange-200",
    },
    {
        id: "scam",
        title: "Scam Awareness Training",
        description: "Learn to identify phishing emails, suspicious links, and common scam tactics. Practise spotting red flags.",
        icon: "🛡️",
        estimatedTime: "15–20 min",
        difficulty: "Intermediate",
        confidenceRating: 4.9,
        skills: ["Identifying phishing emails", "Spotting suspicious URLs", "Recognising social engineering", "Knowing when to report"],
        color: "bg-red-50 border-red-200",
    },
];

export const HOW_IT_WORKS = [
    {
        step: 1,
        title: "Choose a Module",
        description: "Pick from our practice modules — government login, healthcare booking, banking, and more. Start with what matters most to you.",
        icon: "📚",
    },
    {
        step: 2,
        title: "Learn Step-by-Step",
        description: "Follow guided instructions with highlighted buttons, tooltips, and audio narration. Go at your own pace — no rush!",
        icon: "👆",
    },
    {
        step: 3,
        title: "Build Confidence",
        description: "Practise independently, track your progress, and earn certificates. Every mistake is a safe learning opportunity.",
        icon: "🎓",
    },
];

export const STATS = [
    { label: "Seniors Trained", value: "2,400+", icon: "👵" },
    { label: "Modules Completed", value: "12,800+", icon: "✅" },
    { label: "Certificates Issued", value: "1,950+", icon: "🏆" },
    { label: "Avg. Confidence Boost", value: "+67%", icon: "📈" },
];

export const TESTIMONIALS = [
    {
        name: "Margaret Chen",
        age: 72,
        quote: "I was so scared to use SingPass. Now I log in by myself every month to check my CPF. My children are so proud!",
        improvement: "+85% confidence",
    },
    {
        name: "Ahmad Ibrahim",
        age: 68,
        quote: "The guided practice helped me understand PayNow. I can transfer money to my grandchildren now without asking for help.",
        improvement: "+72% confidence",
    },
    {
        name: "Devi Nair",
        age: 75,
        quote: "I almost fell for a phishing email, but CyberFort taught me to spot the signs. I feel much safer online now.",
        improvement: "+90% confidence",
    },
];

export const SAFETY_FEATURES = [
    {
        icon: "🔒",
        title: "100% Practice Mode",
        desc: "Nothing you do here is real. No real accounts, no real money, no real data.",
    },
    {
        icon: "💚",
        title: "Safe to Make Mistakes",
        desc: "Errors show helpful explanations, not error screens. Every mistake teaches you something.",
    },
    {
        icon: "🔐",
        title: "No Real Data Needed",
        desc: "We provide practice credentials. You never need to enter your real passwords or NRIC.",
    },
    {
        icon: "🌐",
        title: "Works Offline",
        desc: "No internet connection needed after the page loads. Your data stays on your device.",
    },
];

export const SCAM_EMAILS = [
    {
        id: 1,
        from: "noreply@singpass-gov-sg.com",
        subject: "URGENT: Your SingPass Account Will Be Suspended",
        body: "Dear User, Your SingPass account will be suspended in 24 hours due to suspicious activity. Click the link below to verify your identity immediately.\n\n[Verify Now](http://singpass-verify-sg.suspicious-site.com)\n\nFailure to act will result in permanent account suspension.\n\nSingPass Security Team",
        isScam: true,
        redFlags: [
            "Suspicious domain (singpass-gov-sg.com instead of singpass.gov.sg)",
            "Creates urgency with threats of suspension",
            "Link goes to an unrelated domain",
            "Impersonal greeting ('Dear User')",
            "No reference number or official formatting",
        ],
    },
    {
        id: 2,
        from: "appointments@health.gov.sg",
        subject: "Appointment Confirmation — Ang Mo Kio Polyclinic",
        body: "Dear Margaret Chen,\n\nThis is to confirm your appointment at Ang Mo Kio Polyclinic:\n\nDate: Mon, 24 Feb 2026\nTime: 10:00 AM\nDoctor: Dr. Sarah Tan\nRef No: APC-2026-0224-1042\n\nPlease bring your NRIC and appointment slip. If you need to reschedule, call 6355 3000.\n\nMinistry of Health",
        isScam: false,
        redFlags: [],
    },
    {
        id: 3,
        from: "winner@sg-lucky-draw.com",
        subject: "🎉 Congratulations! You've Won $50,000!",
        body: "CONGRATULATIONS!\n\nYou have been selected as the winner of the Singapore National Lucky Draw 2026!\n\nPrize: $50,000 SGD\n\nTo claim your prize, send your:\n- Full Name\n- NRIC Number\n- Bank Account Number\n- Phone Number\n\nReply to this email within 48 hours or your prize will be forfeited.\n\nSG Lucky Draw Committee",
        isScam: true,
        redFlags: [
            "Too good to be true — unsolicited prize",
            "Asks for sensitive personal information (NRIC, bank details)",
            "Suspicious domain (sg-lucky-draw.com)",
            "Creates urgency with time limit",
            "No official government or company branding",
        ],
    },
    {
        id: 4,
        from: "billing@singtel.com",
        subject: "Your Monthly Bill — February 2026",
        body: "Dear Margaret Chen,\n\nYour SingTel bill for February 2026 is ready.\n\nAmount Due: $38.90\nDue Date: 15 March 2026\nAccount No: ****4567\n\nView your bill details at my.singtel.com or call 1688 for assistance.\n\nThank you for choosing SingTel.",
        isScam: false,
        redFlags: [],
    },
    {
        id: 5,
        from: "support@dbs-secure-banking.net",
        subject: "⚠️ Unusual Activity Detected on Your Account",
        body: "Dear Valued Customer,\n\nWe have detected unusual activity on your DBS account. For your protection, your online banking access has been temporarily locked.\n\nClick here to unlock your account: http://dbs-secure-unlock.net/verify\n\nIf you do not verify within 12 hours, your account will be permanently closed.\n\nDBS Security Centre\nCall: +65 9XXX XXXX",
        isScam: true,
        redFlags: [
            "Suspicious domain (dbs-secure-banking.net, not dbs.com.sg)",
            "Link goes to a fake domain",
            "Creates panic with account closure threat",
            "Generic greeting ('Dear Valued Customer')",
            "Unusual phone number format (9XXX)",
        ],
    },
];

export const SCAM_QUIZ = [
    {
        question: "You receive a text message saying 'Your parcel is waiting. Track it here: bit.ly/3xY9z'. What should you do?",
        options: [
            "Click the link to check your parcel",
            "Delete the message — you weren't expecting a parcel",
            "Forward it to your friend to check",
            "Reply STOP to unsubscribe",
        ],
        correct: 1,
        explanation: "Never click links in unexpected text messages. Scammers use fake parcel notifications to steal your information. If you are expecting a parcel, check directly on the courier's official website.",
    },
    {
        question: "Someone calls claiming to be from the police, saying you're involved in a money laundering case and must transfer money to a 'safe account'. What should you do?",
        options: [
            "Transfer the money immediately to stay safe",
            "Give them your bank details so they can 'protect' your account",
            "Hang up immediately — the police never ask for money transfers over the phone",
            "Ask them for their badge number and call back",
        ],
        correct: 2,
        explanation: "The police will NEVER ask you to transfer money over the phone. This is a common scam in Singapore. Hang up, and call the Police hotline at 1800-255-0000 to report it.",
    },
    {
        question: "You see a Facebook ad offering a branded handbag at 90% off from 'www.luxury-bags-sg.com'. What's the safest action?",
        options: [
            "Buy it quickly before the deal expires",
            "Be suspicious — if it seems too good to be true, it probably is",
            "Share the deal with your friends on WhatsApp",
            "Click the link to see more details",
        ],
        correct: 1,
        explanation: "Deals that seem too good to be true usually are. Scam shopping sites steal your credit card information. Only buy from well-known, official retailers.",
    },
    {
        question: "A WhatsApp message from your 'grandson' says: 'Grandma, I lost my phone. This is my new number. Can you send $500 urgently?' What should you do?",
        options: [
            "Send the money right away — family comes first",
            "Ask a personal question only your real grandchild would know, or call their old number",
            "Reply 'OK' and ask for their bank details",
            "Forward the message to other family members",
        ],
        correct: 1,
        explanation: "This is a common impersonation scam. Always verify by calling the person's original number or asking a question only they would know. Never send money based on a text message alone.",
    },
];

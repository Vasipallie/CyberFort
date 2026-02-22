// Fake credentials for CyberFort practice environment
// One user account, one admin account — no database

export interface FakeUser {
    username: string;
    password: string;
    fullName: string;
    nric: string;
    phone: string;
    email: string;
    dob: string;
    address: string;
    role: "user" | "admin";
}

// NOTE: Credentials must be kept secret. Do NOT expose real passwords or OTPs in the repo.
// For local development, populate secrets via a secure server-side method or environment variables.
export const FAKE_CREDENTIALS: Record<string, FakeUser> = {
    user: {
        username: "margaret.chen",
        password: "<REDACTED>",
        fullName: "Margaret Chen Siew Lian",
        nric: "S1234567A",
        phone: "9123 4567",
        email: "margaret.chen@practice-mail.com",
        dob: "15/03/1954",
        address: "Blk 123 Ang Mo Kio Ave 4, #08-456, Singapore 560123",
        role: "user",
    },
    admin: {
        username: "admin.cyberfort",
        password: "<REDACTED>",
        fullName: "CyberFort Administrator",
        nric: "S9876543Z",
        phone: "6123 4567",
        email: "admin@cyberfort.org",
        dob: "01/01/1990",
        address: "CyberFort Centre, Singapore",
        role: "admin",
    },
};

export function validateLogin(username: string, password: string): FakeUser | null {
    for (const key of Object.keys(FAKE_CREDENTIALS)) {
        const user = FAKE_CREDENTIALS[key];
        if (user.username === username && user.password === password) {
            return user;
        }
    }
    return null;
}

// Fake bank data
export const FAKE_BANK = {
    accountNumber: "1234-5678-9012",
    accountType: "Savings Account",
    balance: 15420.75,
    availableBalance: 14920.75,
    recentTransactions: [
        { date: "19 Feb 2026", description: "NTUC FairPrice — Groceries", amount: -45.60, balance: 15420.75 },
        { date: "18 Feb 2026", description: "CPF Board — Pension Credit", amount: 1200.00, balance: 15466.35 },
        { date: "17 Feb 2026", description: "SingTel — Mobile Bill", amount: -38.90, balance: 14266.35 },
        { date: "16 Feb 2026", description: "PayNow — Transfer from Robert Lim", amount: 50.00, balance: 14305.25 },
        { date: "15 Feb 2026", description: "Sheng Siong — Groceries", amount: -32.10, balance: 14255.25 },
    ],
    transactions: [
        { date: "19 Feb 2026", description: "NTUC FairPrice — Groceries", amount: -45.60, balance: 15420.75 },
        { date: "18 Feb 2026", description: "CPF Board — Pension Credit", amount: 1200.00, balance: 15466.35 },
        { date: "17 Feb 2026", description: "SingTel — Mobile Bill", amount: -38.90, balance: 14266.35 },
        { date: "16 Feb 2026", description: "PayNow — Transfer from Robert Lim", amount: 50.00, balance: 14305.25 },
        { date: "15 Feb 2026", description: "Sheng Siong — Groceries", amount: -32.10, balance: 14255.25 },
        { date: "14 Feb 2026", description: "Polyclinic — Co-payment", amount: -12.50, balance: 14287.35 },
        { date: "13 Feb 2026", description: "ATM Withdrawal — Jurong East", amount: -100.00, balance: 14299.85 },
    ],
};

// Fake CPF data
export const FAKE_CPF = {
    ordinaryAccount: 48250.00,
    specialAccount: 32180.00,
    medisaveAccount: 28450.00,
    retirementAccount: 95620.00,
    totalBalance: 204500.00,
    contributions: [
        { month: "Jan 2026", employer: 850.00, employee: 500.00, total: 1350.00 },
        { month: "Dec 2025", employer: 850.00, employee: 500.00, total: 1350.00 },
        { month: "Nov 2025", employer: 850.00, employee: 500.00, total: 1350.00 },
        { month: "Oct 2025", employer: 780.00, employee: 460.00, total: 1240.00 },
    ],
};

// Fake healthcare data
export const FAKE_HEALTHCARE = {
    doctors: [
        { id: 1, name: "Dr. Sarah Tan", specialty: "General Practice", clinic: "Ang Mo Kio Polyclinic", rating: 4.8 },
        { id: 2, name: "Dr. Ahmad bin Hassan", specialty: "General Practice", clinic: "Bedok Polyclinic", rating: 4.6 },
        { id: 3, name: "Dr. Priya Nair", specialty: "Cardiology", clinic: "Tampines Polyclinic", rating: 4.9 },
        { id: 4, name: "Dr. James Wong", specialty: "Orthopaedics", clinic: "Toa Payoh Polyclinic", rating: 4.7 },
    ],
    availableDates: [
        "Mon, 24 Feb 2026",
        "Tue, 25 Feb 2026",
        "Wed, 26 Feb 2026",
        "Thu, 27 Feb 2026",
        "Fri, 28 Feb 2026",
    ],
    timeSlots: [
        "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "2:00 PM", "2:30 PM", "3:00 PM",
        "3:30 PM", "4:00 PM",
    ],
};

// 2FA code (static for practice)
// 2FA code removed from repo. Use secure server-side values if needed for guided demos.

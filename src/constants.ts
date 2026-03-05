import { Type } from "@google/genai";

export enum UserRole {
  ADMIN = "admin",
  CONNECTOR = "connector",
  USER = "user",
  GUEST = "guest"
}

export interface LoanProduct {
  id: string;
  name: string;
  description: string;
  interestRange: string;
  tenureRange: string;
  eligibility: string[];
  documents: string[];
  category: "Retail" | "Business" | "Agri" | "Specialized";
}

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: "personal-loan",
    name: "Personal Loan",
    description: "Unsecured credit for personal needs with minimal documentation.",
    interestRange: "10.5% - 18%",
    tenureRange: "12 - 60 Months",
    eligibility: ["Age 21-60", "Min Income ₹25,000", "Salaried/Self-Employed"],
    documents: ["PAN", "Aadhaar", "3m Salary Slips", "6m Bank Statement"],
    category: "Retail"
  },
  {
    id: "home-loan",
    name: "Home Loan",
    description: "Long-term financing for purchasing or constructing your dream home.",
    interestRange: "8.5% - 12%",
    tenureRange: "Up to 30 Years",
    eligibility: ["Age 21-65", "Stable Income Source", "Property Approval"],
    documents: ["Property Papers", "PAN", "Aadhaar", "ITR (2 Years)"],
    category: "Retail"
  },
  {
    id: "lap",
    name: "Loan Against Property",
    description: "Unlock the value of your property for business or personal needs.",
    interestRange: "9% - 14%",
    tenureRange: "Up to 15 Years",
    eligibility: ["Property Ownership", "Income Proof", "Clear Title"],
    documents: ["Property Documents", "Income Proof", "KYC"],
    category: "Retail"
  },
  {
    id: "msme-term-loan",
    name: "MSME Term Loan",
    description: "Structured term loans for micro, small, and medium enterprises.",
    interestRange: "12% - 22%",
    tenureRange: "12 - 84 Months",
    eligibility: ["Business Vintage 2+ Years", "GST Registered", "Profitable"],
    documents: ["GST Returns", "ITR", "Business Proof", "Bank Statement"],
    category: "Business"
  },
  {
    id: "working-capital",
    name: "Working Capital Loan",
    description: "Manage day-to-day business operations and cash flow gaps.",
    interestRange: "11% - 18%",
    tenureRange: "12 Months (Renewable)",
    eligibility: ["Active Business", "Healthy Turnover", "Good Credit History"],
    documents: ["Stock Audit", "GST Returns", "Financial Statements"],
    category: "Business"
  },
  {
    id: "business-expansion",
    name: "Business Expansion Loan",
    description: "Scale your business to new heights with growth capital.",
    interestRange: "13% - 20%",
    tenureRange: "24 - 60 Months",
    eligibility: ["Proven Business Model", "Expansion Plan", "Collateral may be required"],
    documents: ["Project Report", "Financials", "KYC"],
    category: "Business"
  },
  {
    id: "vehicle-loan",
    name: "Vehicle Loan (Personal)",
    description: "Finance your new or used car with attractive rates.",
    interestRange: "7.5% - 11%",
    tenureRange: "Up to 7 Years",
    eligibility: ["Salaried/Self-Employed", "Good Credit Score"],
    documents: ["Proforma Invoice", "Income Proof", "KYC"],
    category: "Retail"
  },
  {
    id: "commercial-vehicle",
    name: "Commercial Vehicle Loan",
    description: "Financing for trucks, buses, and other commercial transport.",
    interestRange: "10% - 16%",
    tenureRange: "Up to 5 Years",
    eligibility: ["Transport Experience", "Route Permits", "Income Proof"],
    documents: ["Permits", "RC Copy", "Income Proof"],
    category: "Business"
  },
  {
    id: "tractor-loan",
    name: "Tractor Loan",
    description: "Empowering farmers with easy financing for agricultural machinery.",
    interestRange: "12% - 18%",
    tenureRange: "Up to 5 Years",
    eligibility: ["Land Ownership", "Agri Income"],
    documents: ["Land Records", "KYC", "Quotation"],
    category: "Agri"
  },
  {
    id: "equipment-finance",
    name: "Equipment Finance",
    description: "Finance specialized machinery for construction or medical use.",
    interestRange: "11% - 15%",
    tenureRange: "Up to 5 Years",
    eligibility: ["Business Vintage", "Professional Degree (for Medical)"],
    documents: ["Invoice", "Business Proof", "Financials"],
    category: "Business"
  },
  {
    id: "agri-loan",
    name: "Agri Loan",
    description: "Short-term and long-term credit for agricultural activities.",
    interestRange: "7% - 14%",
    tenureRange: "Seasonal / Annual",
    eligibility: ["Farmer Status", "Land Records"],
    documents: ["Kisan Credit Card", "Land Records", "KYC"],
    category: "Agri"
  },
  {
    id: "gold-loan",
    name: "Gold Loan",
    description: "Instant liquidity against your gold ornaments.",
    interestRange: "9% - 24%",
    tenureRange: "3 - 12 Months",
    eligibility: ["Gold Ownership", "Age 18+"],
    documents: ["KYC", "Gold Valuation"],
    category: "Retail"
  },
  {
    id: "education-loan",
    name: "Education Loan",
    description: "Invest in your future with loans for domestic and international studies.",
    interestRange: "9.5% - 13%",
    tenureRange: "Up to 15 Years",
    eligibility: ["Admission Proof", "Co-applicant Income"],
    documents: ["Fee Structure", "Admission Letter", "Co-applicant KYC"],
    category: "Retail"
  },
  {
    id: "credit-card",
    name: "Credit Card",
    description: "Premium credit cards with lifestyle benefits and rewards.",
    interestRange: "Variable",
    tenureRange: "Revolving",
    eligibility: ["Min Income ₹20,000", "Good Credit Score"],
    documents: ["Income Proof", "KYC"],
    category: "Retail"
  },
  {
    id: "overdraft",
    name: "Overdraft Facility",
    description: "Flexible credit limit to manage unexpected expenses.",
    interestRange: "12% - 18%",
    tenureRange: "Annual Renewal",
    eligibility: ["Existing Account", "Collateral/Income Proof"],
    documents: ["Bank Statement", "KYC"],
    category: "Business"
  },
  {
    id: "balance-transfer",
    name: "Balance Transfer Loan",
    description: "Switch your existing high-interest loan to Rupyou for better rates.",
    interestRange: "Lower than existing",
    tenureRange: "Remaining Tenure",
    eligibility: ["Existing Loan", "Clean Repayment History"],
    documents: ["Foreclosure Letter", "Repayment Track", "KYC"],
    category: "Retail"
  },
  {
    id: "top-up-loan",
    name: "Top-up Loan",
    description: "Additional funds on your existing home or property loan.",
    interestRange: "Same as Home Loan + 1%",
    tenureRange: "Remaining Tenure",
    eligibility: ["Existing Loan with us", "Clean Repayment"],
    documents: ["Income Proof", "KYC"],
    category: "Retail"
  },
  {
    id: "construction-loan",
    name: "Construction Loan",
    description: "Financing for self-construction of residential or commercial property.",
    interestRange: "9% - 13%",
    tenureRange: "Up to 20 Years",
    eligibility: ["Approved Plan", "Land Ownership"],
    documents: ["Sanctioned Plan", "Estimate", "KYC"],
    category: "Specialized"
  },
  {
    id: "lap-msme",
    name: "LAP for MSME",
    description: "Specialized property-backed loans for MSME growth.",
    interestRange: "10% - 15%",
    tenureRange: "Up to 10 Years",
    eligibility: ["MSME Registration", "Property Ownership"],
    documents: ["MSME Certificate", "Property Papers", "Financials"],
    category: "Business"
  }
];

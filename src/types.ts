import { LOAN_PRODUCTS } from "./constants";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "connector" | "user";
  status: "active" | "pending" | "suspended";
  createdAt: string;
}

export interface Application {
  id: string;
  userId: string;
  connectorId?: string;
  productId: string;
  loanAmount: number;
  status: "draft" | "submitted" | "underwriting" | "approved" | "rejected" | "disbursed";
  underwritingResult?: {
    lender: string;
    interestRate: string;
    tenure: string;
    message: string;
  };
  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    dob: string;
    pan: string;
    aadhaar: string;
    address: string;
  };
  employmentDetails: {
    type: string;
    company: string;
    income: number;
    businessType?: string;
  };
  financialProfile?: {
    incomeInfo: {
      primarySource: string;
      monthlyNet: number;
      annualIncome: number;
      stability: string;
      employerName?: string;
      designation?: string;
      totalExperience?: string;
      currentTenure?: string;
      businessName?: string;
      businessType?: string;
      yearsInBusiness?: string;
      annualTurnover?: number;
      profitLastYear?: number;
    };
    bankingDetails: {
      bankName: string;
      accountType: string;
      accountNumber: string;
      ifscCode: string;
      branchName: string;
      accountHolderName: string;
      relationshipDuration: string;
      averageBalance: number;
    };
    existingLoans: {
      hasLoans: boolean;
      loans: Array<{
        type: string;
        lender: string;
        amount: number;
        balance: number;
        emi: number;
        startDate: string;
        endDate: string;
      }>;
    };
    creditProfile: {
      knowsScore: boolean;
      score?: number;
      provider?: string;
      historyLength: string;
      hasDefaults: boolean;
      defaultDetails?: string;
    };
    assets: {
      ownsResidential: boolean;
      residentialValue?: number;
      ownsCommercial: boolean;
      investments: {
        mutualFunds: number;
        fixedDeposits: number;
        stocks: number;
        gold: number;
      };
      totalLiquidAssets: number;
    };
    monthlyCommitments: {
      householdExpenses: number;
      rent: number;
      existingEmi: number;
      insurance: number;
      other: number;
      totalObligations: number;
    };
  };
  createdAt: string;
  updatedAt?: string;
}

export interface CommissionRecord {
  id: string;
  loanId: string;
  amount: number;
  rupyouShare: number;
  connectorShare: number;
  status: "pending" | "paid";
  createdAt: string;
}

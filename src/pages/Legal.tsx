import React from "react";
import { motion } from "motion/react";
import { Card } from "../components/UI";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  content: React.ReactNode;
}

const LegalLayout = ({ title, lastUpdated, content }: LegalPageProps) => (
  <div className="min-h-screen bg-slate-50 pt-32 pb-20">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">{title}</h1>
        <p className="text-slate-500 text-sm">Last Updated: {lastUpdated}</p>
      </div>
      <Card className="p-8 md:p-12 prose prose-slate max-w-none">
        {content}
      </Card>
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <LegalLayout 
    title="Privacy Policy"
    lastUpdated="March 2024"
    content={
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          At Rupyou, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information when you use our platform.
        </p>
        <h3 className="text-xl font-bold text-slate-900">1. Information We Collect</h3>
        <p>
          We collect information that you provide directly to us, such as when you create an account, apply for a loan, or contact our support team. This includes your name, email address, phone number, PAN, Aadhaar, and financial details.
        </p>
        <h3 className="text-xl font-bold text-slate-900">2. How We Use Your Information</h3>
        <p>
          We use your information to process loan applications, verify your identity, communicate with you about our services, and improve our platform. We may also share your information with our institutional partners for underwriting purposes.
        </p>
        <h3 className="text-xl font-bold text-slate-900">3. Data Security</h3>
        <p>
          We implement bank-grade security protocols to protect your data from unauthorized access, disclosure, or alteration. All data transfers are encrypted using HTTPS.
        </p>
      </div>
    }
  />
);

export const TermsConditions = () => (
  <LegalLayout 
    title="Terms & Conditions"
    lastUpdated="March 2024"
    content={
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          By accessing or using the Rupyou platform, you agree to be bound by these Terms & Conditions.
        </p>
        <h3 className="text-xl font-bold text-slate-900">1. Eligibility</h3>
        <p>
          You must be at least 18 years old and a resident of India to use our services. You agree to provide accurate and complete information during the application process.
        </p>
        <h3 className="text-xl font-bold text-slate-900">2. Loan Approval</h3>
        <p>
          Loan approval is subject to the discretion of our institutional partners and based on their underwriting criteria. Rupyou does not guarantee loan approval for any applicant.
        </p>
        <h3 className="text-xl font-bold text-slate-900">3. User Conduct</h3>
        <p>
          You agree not to use our platform for any fraudulent or illegal activities. We reserve the right to suspend or terminate your account if we suspect any misuse.
        </p>
      </div>
    }
  />
);

export const ConnectorAgreement = () => (
  <LegalLayout 
    title="Connector Agreement"
    lastUpdated="March 2024"
    content={
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          This agreement governs the relationship between Rupyou and its Connectors.
        </p>
        <h3 className="text-xl font-bold text-slate-900">1. Commission Structure</h3>
        <p>
          Connectors are entitled to a commission on disbursed loans as per the split logic defined in the Admin Dashboard. The default split is 75% for Rupyou and 25% for the Connector.
        </p>
        <h3 className="text-xl font-bold text-slate-900">2. Lead Submission</h3>
        <p>
          Connectors must ensure that all leads submitted are genuine and that the borrower has consented to the application process.
        </p>
        <h3 className="text-xl font-bold text-slate-900">3. Confidentiality</h3>
        <p>
          Connectors must maintain the confidentiality of all borrower data and Rupyou's proprietary information.
        </p>
      </div>
    }
  />
);

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, FileText, User, Briefcase, CreditCard, Landmark, Upload, ArrowLeft, ArrowRight, Plus, Trash2, Info, ShieldCheck, Target, Zap, Award, Users } from "lucide-react";
import { Button, Input, Card, Badge } from "../components/UI";
import { LOAN_PRODUCTS } from "../constants";
import { useParams, useNavigate } from "react-router-dom";
import { formatCurrency, cn } from "../utils";
import { useAuth } from "../hooks/useAuth";
import { applicationService } from "../services/dataService";

const STEPS = [
  { id: "personal", title: "Personal", icon: User },
  { id: "income", title: "Income", icon: Briefcase },
  { id: "banking", title: "Banking", icon: Landmark },
  { id: "credit", title: "Credit", icon: ShieldCheck },
  { id: "assets", title: "Assets", icon: CreditCard },
  { id: "documents", title: "Documents", icon: Upload },
  { id: "review", title: "Review", icon: CheckCircle2 },
];

export const LoanApplication = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const product = LOAN_PRODUCTS.find(p => p.id === productId) || LOAN_PRODUCTS[0];

  const [formData, setFormData] = useState({
    // Personal
    fullName: "",
    email: "",
    phone: "",
    pan: "",
    aadhaar: "",
    city: "",
    dob: "",
    address: "",

    // Income
    primarySource: "Salary",
    monthlyNet: "0",
    annualIncome: "0",
    stability: "1-3 years",
    employerName: "",
    designation: "",
    totalExperience: "",
    currentTenure: "",
    businessName: "",
    businessType: "Proprietorship",
    yearsInBusiness: "",
    annualTurnover: "0",
    profitLastYear: "0",

    // Banking
    bankName: "HDFC Bank",
    accountType: "Savings Account",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    branchName: "",
    accountHolderName: "",
    relationshipDuration: "1-3 years",
    averageBalance: "0",

    // Loans
    hasLoans: "No",
    loans: [] as any[], // { type, lender, amount, balance, emi, startDate, endDate }

    // Credit
    knowsScore: "No",
    score: "",
    provider: "CIBIL",
    historyLength: "1-3 years",
    hasDefaults: "No",
    defaultDetails: "",

    // Assets
    ownsResidential: "No",
    residentialValue: "0",
    ownsCommercial: "No",
    mutualFunds: "0",
    fixedDeposits: "0",
    stocks: "0",
    gold: "0",

    // Commitments
    householdExpenses: "0",
    rent: "0",
    insurance: "0",
    otherObligations: "0",

    loanAmount: "500000",
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    setIsSubmitting(true);
    const totalEmi = formData.loans.reduce((acc, loan) => acc + (parseInt(loan.emi) || 0), 0);
    const totalObligations = (parseInt(formData.householdExpenses) || 0) + 
                             (parseInt(formData.rent) || 0) + 
                             totalEmi + 
                             (parseInt(formData.insurance) || 0) + 
                             (parseInt(formData.otherObligations) || 0);

    const totalLiquidAssets = (parseInt(formData.mutualFunds) || 0) + 
                              (parseInt(formData.fixedDeposits) || 0) + 
                              (parseInt(formData.stocks) || 0) + 
                              (parseInt(formData.gold) || 0);

    try {
      const id = await applicationService.createApplication({
        userId: user.id,
        productId: product.id,
        loanAmount: parseInt(formData.loanAmount),
        status: "submitted",
        connectorId: "",
        personalDetails: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          dob: formData.dob, 
          pan: formData.pan,
          aadhaar: formData.aadhaar,
          address: formData.address 
        },
        employmentDetails: {
          type: formData.primarySource,
          company: formData.employerName || formData.businessName || "", 
          income: parseInt(formData.monthlyNet) || 0,
          businessType: formData.businessType
        },
        financialProfile: {
          incomeInfo: {
            primarySource: formData.primarySource,
            monthlyNet: parseInt(formData.monthlyNet) || 0,
            annualIncome: parseInt(formData.annualIncome) || 0,
            stability: formData.stability,
            employerName: formData.employerName,
            designation: formData.designation,
            totalExperience: formData.totalExperience,
            currentTenure: formData.currentTenure,
            businessName: formData.businessName,
            businessType: formData.businessType,
            yearsInBusiness: formData.yearsInBusiness,
            annualTurnover: parseInt(formData.annualTurnover) || 0,
            profitLastYear: parseInt(formData.profitLastYear) || 0,
          },
          bankingDetails: {
            bankName: formData.bankName,
            accountType: formData.accountType,
            accountNumber: formData.accountNumber,
            ifscCode: formData.ifscCode,
            branchName: formData.branchName,
            accountHolderName: formData.accountHolderName,
            relationshipDuration: formData.relationshipDuration,
            averageBalance: parseInt(formData.averageBalance) || 0,
          },
          existingLoans: {
            hasLoans: formData.hasLoans === "Yes",
            loans: formData.loans.map(l => ({
              ...l,
              amount: parseInt(l.amount) || 0,
              balance: parseInt(l.balance) || 0,
              emi: parseInt(l.emi) || 0,
            })),
          },
          creditProfile: {
            knowsScore: formData.knowsScore === "Yes",
            score: parseInt(formData.score) || undefined,
            provider: formData.provider,
            historyLength: formData.historyLength,
            hasDefaults: formData.hasDefaults === "Yes",
            defaultDetails: formData.defaultDetails,
          },
          assets: {
            ownsResidential: formData.ownsResidential === "Yes",
            residentialValue: parseInt(formData.residentialValue) || 0,
            ownsCommercial: formData.ownsCommercial === "Yes",
            investments: {
              mutualFunds: parseInt(formData.mutualFunds) || 0,
              fixedDeposits: parseInt(formData.fixedDeposits) || 0,
              stocks: parseInt(formData.stocks) || 0,
              gold: parseInt(formData.gold) || 0,
            },
            totalLiquidAssets,
          },
          monthlyCommitments: {
            householdExpenses: parseInt(formData.householdExpenses) || 0,
            rent: parseInt(formData.rent) || 0,
            existingEmi: totalEmi,
            insurance: parseInt(formData.insurance) || 0,
            other: parseInt(formData.otherObligations) || 0,
            totalObligations,
          },
        }
      });
      setApplicationId(id);
      setCurrentStep(STEPS.length - 1);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">{product.name}</h1>
            <p className="text-slate-400 mt-4 text-lg">Complete the steps below to secure your funding.</p>
          </div>
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-[2rem] min-w-[240px]">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Requested Amount</p>
            <p className="text-3xl font-black text-primary tracking-tighter">{formatCurrency(parseInt(formData.loanAmount))}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-16 relative px-4">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-700 ease-out" 
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          />
          <div className="relative z-10 flex justify-between">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isActive = i <= currentStep;
              const isCurrent = i === currentStep;
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <motion.div 
                    animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={cn(
                      "h-12 w-12 rounded-2xl flex items-center justify-center border transition-all duration-500",
                      isActive ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "bg-slate-900 border-white/10 text-slate-500",
                      isCurrent && "ring-4 ring-primary/20"
                    )}
                  >
                    <Icon size={20} />
                  </motion.div>
                  <span className={cn("mt-4 text-[10px] font-black uppercase tracking-widest hidden md:block", isActive ? "text-primary" : "text-slate-600")}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <Card className="p-10 md:p-16 border-white/10 bg-white/5 backdrop-blur-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {currentStep === 0 && (
                <div className="space-y-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white uppercase tracking-widest">Loan Configuration</h3>
                    <Badge variant="primary">Step 1 of 7</Badge>
                  </div>

                  <div className="space-y-8 p-8 rounded-[2rem] bg-white/5 border border-white/10">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Loan Amount</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">₹</span>
                          <input 
                            type="number"
                            value={formData.loanAmount}
                            onChange={e => setFormData({...formData, loanAmount: e.target.value})}
                            className="bg-white/10 border border-white/10 rounded-xl py-2 pl-8 pr-4 text-xl font-black text-white w-48 focus:outline-none focus:border-primary transition-all"
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        min="100000"
                        max="5000000"
                        step="50000"
                        value={formData.loanAmount}
                        onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest">
                        <span>₹ 1 Lakh</span>
                        <span>₹ 50 Lakhs</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <Input 
                      label="Full Name" 
                      placeholder="As per PAN card" 
                      value={formData.fullName} 
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-700"
                    />
                    <Input 
                      label="Email Address" 
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-700"
                    />
                    <Input 
                      label="Phone Number" 
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-700"
                    />
                    <Input 
                      label="City" 
                      placeholder="e.g. Jaipur"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-700"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <Input 
                      label="PAN Number" 
                      placeholder="ABCDE1234F" 
                      value={formData.pan} 
                      onChange={e => setFormData({...formData, pan: e.target.value.toUpperCase()})}
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-700"
                    />
                    <Input 
                      label="Aadhaar Number" 
                      placeholder="XXXX XXXX XXXX" 
                      value={formData.aadhaar} 
                      onChange={e => setFormData({...formData, aadhaar: e.target.value})}
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-700"
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white uppercase tracking-widest">Income Information</h3>
                    <Badge variant="primary">Step 2 of 7</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Primary Source of Income</label>
                      <select 
                        value={formData.primarySource}
                        onChange={e => setFormData({...formData, primarySource: e.target.value})}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white focus:border-primary focus:outline-none transition-all"
                      >
                        {["Salary", "Business Income", "Professional Income", "Freelance Income", "Rental Income", "Agricultural Income", "Other"].map(opt => (
                          <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
                        ))}
                      </select>
                    </div>
                    <Input 
                      label="Monthly Income (Net)" 
                      type="number" 
                      placeholder="₹" 
                      value={formData.monthlyNet} 
                      onChange={e => setFormData({...formData, monthlyNet: e.target.value})}
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-700"
                    />
                    <Input 
                      label="Annual Income" 
                      type="number" 
                      placeholder="₹" 
                      value={formData.annualIncome} 
                      onChange={e => setFormData({...formData, annualIncome: e.target.value})}
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-700"
                    />
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Income Stability</label>
                      <select 
                        value={formData.stability}
                        onChange={e => setFormData({...formData, stability: e.target.value})}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white focus:border-primary focus:outline-none transition-all"
                      >
                        {["Less than 1 year", "1–3 years", "3–5 years", "More than 5 years"].map(opt => (
                          <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {formData.primarySource === "Salary" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="grid md:grid-cols-2 gap-8 p-8 rounded-[2rem] bg-white/5 border border-white/10">
                      <Input label="Employer Name" placeholder="Company Name" value={formData.employerName} onChange={e => setFormData({...formData, employerName: e.target.value})} className="bg-white/5 border-white/10 text-white" />
                      <Input label="Designation" placeholder="Job Title" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} className="bg-white/5 border-white/10 text-white" />
                      <Input label="Total Work Experience" placeholder="Years" value={formData.totalExperience} onChange={e => setFormData({...formData, totalExperience: e.target.value})} className="bg-white/5 border-white/10 text-white" />
                      <Input label="Current Job Tenure" placeholder="Years" value={formData.currentTenure} onChange={e => setFormData({...formData, currentTenure: e.target.value})} className="bg-white/5 border-white/10 text-white" />
                    </motion.div>
                  )}

                  {(formData.primarySource === "Business Income" || formData.primarySource === "Professional Income") && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="grid md:grid-cols-2 gap-8 p-8 rounded-[2rem] bg-white/5 border border-white/10">
                      <Input label="Business Name" placeholder="Entity Name" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} className="bg-white/5 border-white/10 text-white" />
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Business Type</label>
                        <select value={formData.businessType} onChange={e => setFormData({...formData, businessType: e.target.value})} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white focus:border-primary focus:outline-none transition-all">
                          {["Proprietorship", "Partnership", "LLP", "Pvt Ltd", "Other"].map(opt => (
                            <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
                          ))}
                        </select>
                      </div>
                      <Input label="Years in Business" placeholder="Years" value={formData.yearsInBusiness} onChange={e => setFormData({...formData, yearsInBusiness: e.target.value})} className="bg-white/5 border-white/10 text-white" />
                      <Input label="Annual Turnover" type="number" placeholder="₹" value={formData.annualTurnover} onChange={e => setFormData({...formData, annualTurnover: e.target.value})} className="bg-white/5 border-white/10 text-white" />
                      <Input label="Profit After Tax (Last Year)" type="number" placeholder="₹" value={formData.profitLastYear} onChange={e => setFormData({...formData, profitLastYear: e.target.value})} className="bg-white/5 border-white/10 text-white" />
                    </motion.div>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white uppercase tracking-widest">Banking Details</h3>
                    <Badge variant="primary">Step 3 of 7</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Primary Bank Name</label>
                      <select 
                        value={formData.bankName}
                        onChange={e => setFormData({...formData, bankName: e.target.value})}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white focus:border-primary focus:outline-none transition-all"
                      >
                        {["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Bank", "Other"].map(opt => (
                          <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Account Type</label>
                      <select 
                        value={formData.accountType}
                        onChange={e => setFormData({...formData, accountType: e.target.value})}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white focus:border-primary focus:outline-none transition-all"
                      >
                        {["Savings Account", "Current Account", "Salary Account"].map(opt => (
                          <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
                        ))}
                      </select>
                    </div>
                    <Input label="Account Number" type="password" placeholder="Enter Account Number" value={formData.accountNumber} onChange={e => setFormData({...formData, accountNumber: e.target.value})} className="bg-white/5 border-white/10 text-white" />
                    <Input 
                      label="Confirm Account Number" 
                      placeholder="Re-enter Account Number" 
                      value={formData.confirmAccountNumber} 
                      onChange={e => setFormData({...formData, confirmAccountNumber: e.target.value})} 
                      className="bg-white/5 border-white/10 text-white"
                      error={formData.accountNumber && formData.confirmAccountNumber && formData.accountNumber !== formData.confirmAccountNumber ? "Account numbers do not match" : ""}
                    />
                    <Input label="IFSC Code" placeholder="HDFC0001234" value={formData.ifscCode} onChange={e => setFormData({...formData, ifscCode: e.target.value.toUpperCase()})} className="bg-white/5 border-white/10 text-white" />
                    <Input label="Branch Name" placeholder="e.g. Jaipur Main" value={formData.branchName} onChange={e => setFormData({...formData, branchName: e.target.value})} className="bg-white/5 border-white/10 text-white" />
                    <Input label="Account Holder Name" placeholder="As per Bank Records" value={formData.accountHolderName} onChange={e => setFormData({...formData, accountHolderName: e.target.value})} className="bg-white/5 border-white/10 text-white" />
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Relationship Duration</label>
                      <select value={formData.relationshipDuration} onChange={e => setFormData({...formData, relationshipDuration: e.target.value})} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white focus:border-primary focus:outline-none transition-all">
                        {["Less than 1 year", "1–3 years", "3–5 years", "More than 5 years"].map(opt => (
                          <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
                        ))}
                      </select>
                    </div>
                    <Input label="Average Monthly Balance" type="number" placeholder="₹" value={formData.averageBalance} onChange={e => setFormData({...formData, averageBalance: e.target.value})} className="bg-white/5 border-white/10 text-white" />
                  </div>
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start space-x-4">
                    <Info className="text-primary shrink-0 mt-1" size={20} />
                    <p className="text-xs text-slate-400 leading-relaxed">
                      This information helps lenders assess your repayment ability and verify your financial standing. Your data is encrypted and secure.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-12">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white uppercase tracking-widest">Loans & Credit</h3>
                    <Badge variant="primary">Step 4 of 7</Badge>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center justify-between p-8 rounded-[2rem] bg-white/5 border border-white/10">
                      <div>
                        <h4 className="text-lg font-bold text-white">Existing Loans?</h4>
                        <p className="text-xs text-slate-500">Do you currently have any active loans or liabilities?</p>
                      </div>
                      <div className="flex bg-slate-900 rounded-xl p-1">
                        {["Yes", "No"].map(opt => (
                          <button
                            key={opt}
                            onClick={() => setFormData({...formData, hasLoans: opt})}
                            className={cn(
                              "px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                              formData.hasLoans === opt ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-white"
                            )}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {formData.hasLoans === "Yes" && (
                      <div className="space-y-6">
                        {formData.loans.map((loan, idx) => (
                          <Card key={idx} className="p-8 border-white/10 bg-white/5 relative group">
                            <button 
                              onClick={() => {
                                const newLoans = [...formData.loans];
                                newLoans.splice(idx, 1);
                                setFormData({...formData, loans: newLoans});
                              }}
                              className="absolute top-4 right-4 text-slate-600 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Loan Type</label>
                                <select 
                                  value={loan.type}
                                  onChange={e => {
                                    const newLoans = [...formData.loans];
                                    newLoans[idx].type = e.target.value;
                                    setFormData({...formData, loans: newLoans});
                                  }}
                                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-all"
                                >
                                  {["Personal Loan", "Home Loan", "Car Loan", "Business Loan", "Credit Card", "Gold Loan", "Other"].map(opt => (
                                    <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
                                  ))}
                                </select>
                              </div>
                              <Input label="Lender Name" placeholder="Bank/NBFC" value={loan.lender} onChange={e => {
                                const newLoans = [...formData.loans];
                                newLoans[idx].lender = e.target.value;
                                setFormData({...formData, loans: newLoans});
                              }} className="bg-white/10 border-white/10 text-white" />
                              <Input label="Original Amount" type="number" placeholder="₹" value={loan.amount} onChange={e => {
                                const newLoans = [...formData.loans];
                                newLoans[idx].amount = e.target.value;
                                setFormData({...formData, loans: newLoans});
                              }} className="bg-white/10 border-white/10 text-white" />
                              <Input label="Outstanding Balance" type="number" placeholder="₹" value={loan.balance} onChange={e => {
                                const newLoans = [...formData.loans];
                                newLoans[idx].balance = e.target.value;
                                setFormData({...formData, loans: newLoans});
                              }} className="bg-white/10 border-white/10 text-white" />
                              <Input label="Monthly EMI" type="number" placeholder="₹" value={loan.emi} onChange={e => {
                                const newLoans = [...formData.loans];
                                newLoans[idx].emi = e.target.value;
                                setFormData({...formData, loans: newLoans});
                              }} className="bg-white/10 border-white/10 text-white" />
                              <Input label="Loan Start Date" type="date" value={loan.startDate} onChange={e => {
                                const newLoans = [...formData.loans];
                                newLoans[idx].startDate = e.target.value;
                                setFormData({...formData, loans: newLoans});
                              }} className="bg-white/10 border-white/10 text-white" />
                              <Input label="Loan End Date" type="date" value={loan.endDate} onChange={e => {
                                const newLoans = [...formData.loans];
                                newLoans[idx].endDate = e.target.value;
                                setFormData({...formData, loans: newLoans});
                              }} className="bg-white/10 border-white/10 text-white" />
                            </div>
                          </Card>
                        ))}
                        <Button 
                          variant="outline" 
                          onClick={() => setFormData({...formData, loans: [...formData.loans, { type: "Personal Loan", lender: "", amount: "", balance: "", emi: "", startDate: "", endDate: "" }]})}
                          className="w-full border-dashed border-white/10 py-6 rounded-2xl hover:bg-white/5"
                          icon={<Plus size={18} />}
                        >
                          Add Another Loan
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-8 pt-8 border-t border-white/5">
                    <h4 className="text-xl font-black text-white uppercase tracking-widest">Credit Profile</h4>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4 p-8 rounded-[2rem] bg-white/5 border border-white/10">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Do you know your credit score?</label>
                        <div className="flex bg-slate-900 rounded-xl p-1 w-fit">
                          {["Yes", "No"].map(opt => (
                            <button
                              key={opt}
                              onClick={() => setFormData({...formData, knowsScore: opt})}
                              className={cn(
                                "px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                formData.knowsScore === opt ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-white"
                              )}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        {formData.knowsScore === "Yes" && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-4">
                            <Input label="Credit Score" type="number" placeholder="300-900" value={formData.score} onChange={e => setFormData({...formData, score: e.target.value})} className="bg-white/10 border-white/10 text-white" />
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Score Provider</label>
                              <select value={formData.provider} onChange={e => setFormData({...formData, provider: e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-all">
                                {["CIBIL", "Experian", "Equifax", "CRIF High Mark"].map(opt => (
                                  <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
                                ))}
                              </select>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <div className="space-y-4 p-8 rounded-[2rem] bg-white/5 border border-white/10">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Credit History Length</label>
                          <select value={formData.historyLength} onChange={e => setFormData({...formData, historyLength: e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-all">
                            {["Less than 1 year", "1–3 years", "3–5 years", "More than 5 years"].map(opt => (
                              <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-4 pt-4">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Any past loan defaults?</label>
                          <div className="flex bg-slate-900 rounded-xl p-1 w-fit">
                            {["Yes", "No"].map(opt => (
                              <button
                                key={opt}
                                onClick={() => setFormData({...formData, hasDefaults: opt})}
                                className={cn(
                                  "px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                  formData.hasDefaults === opt ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-white"
                                )}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                          {formData.hasDefaults === "Yes" && (
                            <Input label="Details" placeholder="Briefly explain defaults/settlements" value={formData.defaultDetails} onChange={e => setFormData({...formData, defaultDetails: e.target.value})} className="bg-white/10 border-white/10 text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-12">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white uppercase tracking-widest">Assets & Expenses</h3>
                    <Badge variant="primary">Step 5 of 7</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-8 p-8 rounded-[2rem] bg-white/5 border border-white/10">
                      <h4 className="text-lg font-bold text-white">Property & Assets</h4>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">Own Residential Property?</span>
                          <div className="flex bg-slate-900 rounded-xl p-1">
                            {["Yes", "No"].map(opt => (
                              <button key={opt} onClick={() => setFormData({...formData, ownsResidential: opt})} className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest", formData.ownsResidential === opt ? "bg-primary text-white" : "text-slate-500")}>{opt}</button>
                            ))}
                          </div>
                        </div>
                        {formData.ownsResidential === "Yes" && <Input label="Property Value" type="number" placeholder="₹" value={formData.residentialValue} onChange={e => setFormData({...formData, residentialValue: e.target.value})} className="bg-white/10 border-white/10 text-white" />}
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">Own Commercial Property?</span>
                          <div className="flex bg-slate-900 rounded-xl p-1">
                            {["Yes", "No"].map(opt => (
                              <button key={opt} onClick={() => setFormData({...formData, ownsCommercial: opt})} className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest", formData.ownsCommercial === opt ? "bg-primary text-white" : "text-slate-500")}>{opt}</button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4 pt-4">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Investments</label>
                          <div className="grid grid-cols-2 gap-4">
                            <Input label="Mutual Funds" type="number" placeholder="₹" value={formData.mutualFunds} onChange={e => setFormData({...formData, mutualFunds: e.target.value})} className="bg-white/10 border-white/10 text-white" />
                            <Input label="Fixed Deposits" type="number" placeholder="₹" value={formData.fixedDeposits} onChange={e => setFormData({...formData, fixedDeposits: e.target.value})} className="bg-white/10 border-white/10 text-white" />
                            <Input label="Stocks" type="number" placeholder="₹" value={formData.stocks} onChange={e => setFormData({...formData, stocks: e.target.value})} className="bg-white/10 border-white/10 text-white" />
                            <Input label="Gold" type="number" placeholder="₹" value={formData.gold} onChange={e => setFormData({...formData, gold: e.target.value})} className="bg-white/10 border-white/10 text-white" />
                          </div>
                        </div>

                        <div className="pt-6 border-t border-white/5">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Liquid Assets</span>
                            <span className="text-xl font-black text-emerald-500">
                              {formatCurrency(
                                (parseInt(formData.mutualFunds) || 0) + 
                                (parseInt(formData.fixedDeposits) || 0) + 
                                (parseInt(formData.stocks) || 0) + 
                                (parseInt(formData.gold) || 0)
                              )}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-600">Sum of all your liquid investments listed above.</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8 p-8 rounded-[2rem] bg-white/5 border border-white/10">
                      <h4 className="text-lg font-bold text-white">Monthly Obligations</h4>
                      <div className="space-y-6">
                        <Input label="Household Expenses" type="number" placeholder="₹" value={formData.householdExpenses} onChange={e => setFormData({...formData, householdExpenses: e.target.value})} className="bg-white/10 border-white/10 text-white" />
                        <Input label="Rent / Housing" type="number" placeholder="₹" value={formData.rent} onChange={e => setFormData({...formData, rent: e.target.value})} className="bg-white/10 border-white/10 text-white" />
                        <Input label="Insurance Premiums" type="number" placeholder="₹" value={formData.insurance} onChange={e => setFormData({...formData, insurance: e.target.value})} className="bg-white/10 border-white/10 text-white" />
                        <Input label="Other Obligations" type="number" placeholder="₹" value={formData.otherObligations} onChange={e => setFormData({...formData, otherObligations: e.target.value})} className="bg-white/10 border-white/10 text-white" />
                        
                        <div className="pt-6 border-t border-white/5">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Obligations</span>
                            <span className="text-xl font-black text-primary">
                              {formatCurrency(
                                (parseInt(formData.householdExpenses) || 0) + 
                                (parseInt(formData.rent) || 0) + 
                                formData.loans.reduce((acc, l) => acc + (parseInt(l.emi) || 0), 0) + 
                                (parseInt(formData.insurance) || 0) + 
                                (parseInt(formData.otherObligations) || 0)
                              )}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-600">Calculated based on your inputs above and existing EMIs.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white uppercase tracking-widest">Document Vault</h3>
                    <Badge variant="primary">Step 6 of 7</Badge>
                  </div>
                  <div className="grid gap-6">
                    {product.documents.map(doc => (
                      <div key={doc} className="flex items-center justify-between p-8 border border-dashed border-white/10 rounded-3xl hover:bg-white/5 transition-all duration-300 group cursor-pointer">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                            <FileText size={24} />
                          </div>
                          <div className="ml-6">
                            <span className="text-sm font-bold text-white block">{doc}</span>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">PDF, JPG or PNG (Max 5MB)</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl px-6" icon={<Upload size={14} />}>Upload</Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="text-center py-16">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mx-auto h-24 w-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary mb-10 shadow-2xl shadow-primary/20"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                  <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Application Secured</h3>
                  <p className="text-slate-400 mb-12 max-w-md mx-auto text-lg">
                    Your application for {product.name} has been successfully submitted to our underwriting engine.
                  </p>
                  <Card className="bg-white/5 border-white/10 mb-12 text-left p-8">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Application ID</span>
                      <span className="font-mono font-bold text-white text-lg">#{applicationId?.slice(-8).toUpperCase() || "PENDING"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</span>
                      <Badge variant="warning">Underwriting</Badge>
                    </div>
                  </Card>
                  <Button onClick={() => navigate("/dashboard")} className="px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs">Go to Dashboard</Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {currentStep < STEPS.length - 1 && (
            <div className="mt-16 pt-10 border-t border-white/5 flex justify-between">
              <Button variant="ghost" onClick={prevStep} disabled={currentStep === 0} icon={<ArrowLeft size={18} />} className="font-black uppercase tracking-widest text-[10px]">
                Previous Step
              </Button>
              {currentStep === STEPS.length - 2 ? (
                <Button onClick={handleSubmit} isLoading={isSubmitting} className="px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs">
                  Submit Application
                </Button>
              ) : (
                <Button onClick={nextStep} className="px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs">
                  Next Step <ArrowRight size={18} className="ml-2" />
                </Button>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

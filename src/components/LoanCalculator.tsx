import React, { useState } from "react";
import { motion } from "motion/react";
import { Calculator as CalcIcon, Info, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, Button, Input, Slider } from "./UI";
import { formatCurrency } from "../utils";

export const LoanCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [existingEMI, setExistingEMI] = useState(0);
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(5); // years
  const [interestRate, setInterestRate] = useState(10.5);

  const calculateEligibility = () => {
    const disposableIncome = monthlyIncome - existingEMI;
    const maxEMI = disposableIncome * 0.5; // 50% FOIR
    
    // Simple PV formula for max loan
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    const maxLoan = maxEMI * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));
    
    return Math.round(maxLoan);
  };

  const calculateEMI = () => {
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const maxLoan = calculateEligibility();
  const monthlyEMI = calculateEMI();
  const totalPayment = monthlyEMI * tenure * 12;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      <Card className="p-10 border-white/10 bg-white/5 backdrop-blur-3xl space-y-10">
        <div className="space-y-8">
          <Slider 
            label="Monthly Income" 
            min={15000} 
            max={500000} 
            step={5000} 
            value={monthlyIncome} 
            onChange={setMonthlyIncome} 
            prefix="₹"
          />
          <Slider 
            label="Existing Monthly EMIs" 
            min={0} 
            max={200000} 
            step={1000} 
            value={existingEMI} 
            onChange={setExistingEMI} 
            prefix="₹"
          />
          <div className="h-px bg-white/5" />
          <Slider 
            label="Desired Loan Amount" 
            min={50000} 
            max={10000000} 
            step={50000} 
            value={loanAmount} 
            onChange={setLoanAmount} 
            prefix="₹"
          />
          <div className="grid grid-cols-2 gap-8">
            <Slider 
              label="Tenure (Years)" 
              min={1} 
              max={30} 
              step={1} 
              value={tenure} 
              onChange={setTenure} 
            />
            <Slider 
              label="Interest Rate" 
              min={8} 
              max={24} 
              step={0.1} 
              value={interestRate} 
              onChange={setInterestRate} 
              suffix="%"
            />
          </div>
        </div>
      </Card>

      <div className="space-y-8">
        <Card className="p-10 bg-primary border-none text-white shadow-2xl shadow-primary/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <CalcIcon size={120} />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-4">Estimated Eligibility</p>
            <h3 className="text-5xl font-black tracking-tighter mb-8">{formatCurrency(maxLoan)}</h3>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/20">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Monthly EMI</p>
                <p className="text-2xl font-black">{formatCurrency(monthlyEMI)}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Total Interest</p>
                <p className="text-2xl font-black">{formatCurrency(totalInterest)}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-10 border-white/10 bg-white/5 backdrop-blur-3xl">
          <h4 className="text-xl font-black text-white mb-8 uppercase tracking-widest flex items-center">
            <Info size={20} className="mr-3 text-primary" /> Why Borrow with Rupyou?
          </h4>
          <div className="space-y-6">
            {[
              "Lowest interest rates from 30+ partner banks",
              "Instant approval with minimal documentation",
              "No hidden charges or processing fees",
              "Flexible repayment options up to 30 years"
            ].map(item => (
              <div key={item} className="flex items-start space-x-4">
                <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                <p className="text-slate-400 font-medium">{item}</p>
              </div>
            ))}
          </div>
          <Button className="w-full mt-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/20" icon={<ArrowRight size={18} />}>
            Apply for {formatCurrency(loanAmount)}
          </Button>
        </Card>
      </div>
    </div>
  );
};

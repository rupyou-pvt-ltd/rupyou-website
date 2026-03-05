import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Calculator as CalcIcon, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { Button, Card, Slider } from "../components/UI";
import { formatCurrency, cn } from "../utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { LoanCalculator } from "../components/LoanCalculator";

export const Calculator = () => {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white sm:text-5xl mb-6 tracking-tighter uppercase">
              Intelligent <span className="text-primary">Calculators</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Plan your financial future with precision. Our intelligent calculators help you understand your eligibility and monthly commitments in seconds.
            </p>
          </motion.div>
        </div>

        <LoanCalculator />

        {/* Interest Comparison Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-4">Market Comparison</h2>
            <p className="text-slate-400">See how Rupyou helps you save on interest compared to traditional lenders.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { bank: "Traditional Bank", rate: "12.5%", color: "bg-slate-800" },
              { bank: "NBFCs", rate: "14.2%", color: "bg-slate-800" },
              { bank: "Rupyou Marketplace", rate: "8.9%", color: "bg-primary", highlight: true },
            ].map((item, i) => (
              <motion.div
                key={item.bank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={cn(
                  "p-8 text-center border-white/10",
                  item.highlight ? "bg-primary border-none shadow-2xl shadow-primary/40" : "bg-white/5"
                )}>
                  <p className={cn("text-xs font-black uppercase tracking-widest mb-4", item.highlight ? "text-white/70" : "text-slate-500")}>
                    {item.bank}
                  </p>
                  <p className="text-5xl font-black text-white tracking-tighter mb-2">{item.rate}</p>
                  <p className={cn("text-[10px] font-black uppercase tracking-widest", item.highlight ? "text-white/50" : "text-slate-600")}>
                    Starting Interest Rate
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

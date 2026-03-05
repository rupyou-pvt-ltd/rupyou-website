import React from "react";
import { motion } from "motion/react";
import { Handshake, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { Button, Card, Input } from "../components/UI";

export const Partner = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-6xl mb-6">Partner With Rupyou</h1>
          <p className="text-xl text-slate-600">
            Join India's fastest-growing digital credit distribution network. Empower your business with our institutional-grade infrastructure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Why Become a Connector?</h2>
              <p className="text-slate-600">
                As a Rupyou Connector, you gain access to a wide range of loan products from top-tier financial institutions. Our platform handles the heavy lifting of underwriting and disbursement, allowing you to focus on building relationships.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { t: "High Commissions", d: "Earn industry-best commissions with transparent 75/25 split logic.", i: TrendingUp },
                { t: "Real-time Tracking", d: "Monitor every lead's progress through our advanced partner dashboard.", i: Zap },
                { t: "Institutional Support", d: "Get dedicated support from our credit and relationship managers.", i: Handshake },
                { t: "Data Privacy", d: "Your data and your clients' data are protected by bank-grade security.", i: ShieldCheck },
              ].map(item => (
                <div key={item.t} className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <item.i size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.t}</h4>
                    <p className="text-sm text-slate-500">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-8 md:p-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Onboarding Form</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Full Name" placeholder="John Doe" required />
                <Input label="Phone Number" placeholder="+91 XXXXX XXXXX" required />
              </div>
              <Input label="Email Address" type="email" placeholder="john@example.com" required />
              <Input label="Business Name (Optional)" placeholder="Your Agency Name" />
              <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-700">Experience in Financial Services</label>
                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 focus:border-primary focus:outline-none">
                  <option>0-2 Years</option>
                  <option>2-5 Years</option>
                  <option>5-10 Years</option>
                  <option>10+ Years</option>
                </select>
              </div>
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" required />
                <p className="text-xs text-slate-500">
                  I agree to the <Link to="/agreement" className="text-primary font-bold hover:underline">Connector Agreement</Link> and <Link to="/privacy" className="text-primary font-bold hover:underline">Privacy Policy</Link>.
                </p>
              </div>
              <Button className="w-full" size="lg">Submit Application</Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

import { Link } from "react-router-dom";

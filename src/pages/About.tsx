import React from "react";
import { motion } from "motion/react";
import { Shield, Users, Target, Award, Zap } from "lucide-react";
import { Card } from "../components/UI";

export const About = () => {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Reimagining How <br />
              <span className="text-primary">India Borrows</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed">
              Rupyou is a next-generation loan marketplace built to simplify access to finance for individuals, entrepreneurs, and businesses across India.
            </p>
          </motion.div>
        </div>

        {/* Who We Are */}
        <section className="mb-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Who We Are</h2>
              <div className="space-y-6 text-xl text-slate-400 leading-relaxed">
                <p>
                  Rupyou Private Limited is headquartered in Jaipur, Rajasthan. We operate as a growing financial distribution platform focused on connecting borrowers with leading banks and financial institutions.
                </p>
                <p>
                  Our mission is simple: make borrowing easier, faster, and more transparent.
                </p>
                <div className="grid sm:grid-cols-2 gap-6 pt-8">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-white font-bold mb-2">No Direct Lending</p>
                    <p className="text-sm">We do not lend from our own balance sheet.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-white font-bold mb-2">No Lending Decisions</p>
                    <p className="text-sm">We do not take lending decisions.</p>
                  </div>
                </div>
                <p className="pt-8 text-white font-bold">
                  We connect people to the right institutions — and make the journey smooth.
                </p>
              </div>
            </motion.div>
            <div className="relative h-[500px] flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
              
              {/* India Map / Network Animation */}
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute inset-0 flex items-center justify-center opacity-20"
                >
                  <Users size={400} className="text-primary" />
                </motion.div>

                <div className="grid grid-cols-2 gap-6 relative z-10">
                  {[
                    { label: "Partner Network", value: "500+", icon: <Users size={20} />, delay: 0 },
                    { label: "Applications", value: "50k+", icon: <Target size={20} />, delay: 0.2 },
                    { label: "Cities Reached", value: "150+", icon: <Award size={20} />, delay: 0.4 },
                    { label: "Processing Speed", value: "Instant", icon: <Zap size={20} />, delay: 0.6 },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: stat.delay }}
                      className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl min-w-[200px]"
                    >
                      <div className="h-10 w-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-4">
                        {stat.icon}
                      </div>
                      <p className="text-3xl font-black text-white tracking-tighter">{stat.value}</p>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Foundation */}
        <section className="mb-32 py-32 bg-white/[0.02] rounded-[4rem] border border-white/5 px-8 md:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">Our Foundation</h2>
            <div className="space-y-8 text-xl text-slate-400 leading-relaxed text-center">
              <p>
                Rupyou is backed by the operational strength of a well-established financial services ecosystem with deep grassroots presence across Rajasthan.
              </p>
              <p>
                With hundreds of field representatives and district-level outreach, we understand real borrowers — their needs, their challenges, and their ambitions.
              </p>
              <div className="grid md:grid-cols-3 gap-8 pt-12">
                {[
                  { t: "Digital Efficiency", i: <Zap className="text-primary" /> },
                  { t: "Local Relationships", i: <Users className="text-accent" /> },
                  { t: "Institutional Discipline", i: <Shield className="text-primary" /> },
                ].map((item) => (
                  <div key={item.t} className="flex flex-col items-center p-8 rounded-3xl bg-white/5 border border-white/10">
                    <div className="mb-4">{item.i}</div>
                    <span className="text-white font-bold">{item.t}</span>
                  </div>
                ))}
              </div>
              <p className="pt-12 text-2xl font-bold text-white">
                The result is a marketplace that works — both online and on-ground.
              </p>
            </div>
          </div>
        </section>

        {/* The Opportunity */}
        <section className="mb-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-6">
                {[
                  "Entrepreneurs are expanding.",
                  "Families are investing in homes.",
                  "Small businesses are scaling.",
                  "Young professionals are building futures.",
                ].map((text) => (
                  <Card key={text} className="p-8 text-sm font-medium text-slate-300">
                    {text}
                  </Card>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">The Opportunity</h2>
              <p className="text-xl text-slate-400 leading-relaxed mb-8">
                India’s growth story is accelerating beyond metros. Access to the right loan at the right time can change everything.
              </p>
              <p className="text-2xl font-bold text-primary">
                Rupyou exists to bridge opportunity and capital.
              </p>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-32">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">What Makes Us Different</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: "Clarity", d: "We present loan options transparently." },
              { t: "Choice", d: "Multiple lenders. Multiple products. One platform." },
              { t: "Trust", d: "We work with regulated financial institutions." },
              { t: "Speed", d: "Digital processes reduce unnecessary delays." },
              { t: "Support", d: "Guided assistance when you need it." },
            ].map((item) => (
              <Card key={item.t} className="p-10">
                <h4 className="text-2xl font-bold mb-4 text-white">{item.t}</h4>
                <p className="text-slate-400 leading-relaxed">{item.d}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* For Borrowers, Businesses, Institutions */}
        <section className="mb-32 grid lg:grid-cols-3 gap-8">
          <Card className="p-10 bg-primary/10 border-primary/20">
            <h3 className="text-2xl font-bold mb-6 text-white">For Borrowers</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              We simplify your loan journey. You don’t need to run from bank to bank.
            </p>
            <p className="text-white font-bold">Compare. Apply. Track. All in one place.</p>
          </Card>
          <Card className="p-10 bg-accent/10 border-accent/20">
            <h3 className="text-2xl font-bold mb-6 text-white">For Businesses & MSMEs</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Growth requires capital. We help businesses access funding for expansion, working capital, equipment, and scaling operations.
            </p>
            <p className="text-white font-bold">Our marketplace understands entrepreneurial momentum.</p>
          </Card>
          <Card className="p-10 bg-white/5 border-white/10">
            <h3 className="text-2xl font-bold mb-6 text-white">For Financial Institutions</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              We help institutions reach new customers, improve efficiency, and expand their footprint without heavy physical expansion.
            </p>
            <p className="text-white font-bold">We focus on quality, transparency, and sustainable growth.</p>
          </Card>
        </section>

        {/* Vision & Commitment */}
        <section className="text-center max-w-4xl mx-auto mb-32">
          <h2 className="text-4xl md:text-6xl font-bold mb-12">Our Vision</h2>
          <p className="text-2xl md:text-4xl font-medium text-slate-300 leading-tight mb-16">
            To become one of India’s most trusted digital loan marketplaces — serving millions of borrowers while building lasting partnerships with financial institutions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Responsible sourcing", "Data privacy", "Transparent practices", "Long-term partnerships"].map((text) => (
              <div key={text} className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-slate-400">
                {text}
              </div>
            ))}
          </div>
          <p className="mt-16 text-2xl font-bold text-primary italic">
            "We believe access to finance should empower, not complicate."
          </p>
        </section>
      </div>
    </div>
  );
};

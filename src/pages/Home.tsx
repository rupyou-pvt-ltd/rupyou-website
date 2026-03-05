import React from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, CheckCircle2, TrendingUp, Shield, Users, Zap, Clock, PieChart, Wallet, Briefcase, ChevronRight, Menu, X, Star, BarChart3, Globe, Lock, Play, ArrowUpRight, Check, Home as HomeIcon, Truck, Coins } from "lucide-react";
import { Button, Card, Badge } from "../components/UI";
import { formatCurrency, cn } from "../utils";
import { Link } from "react-router-dom";

const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = React.useState(0);
  const nodeRef = React.useRef(null);
  const isInView = useInView(nodeRef, { once: true });

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={nodeRef}>{count}</span>;
};

export const Home = () => {
  const stats = [
    { label: "Growing Partner Network", value: 500, suffix: "+" },
    { label: "Loan Products Available", value: 25, suffix: "+" },
    { label: "Cities & Districts Reached", value: 150, suffix: "+" },
    { label: "Applications Processed", value: 50, suffix: "k+" },
  ];

  const loanCategories = [
    { 
      id: "personal-loan",
      title: "Personal Loans", 
      desc: "Quick access to funds for life’s important moments.",
      icon: <Wallet className="text-primary" size={32} />
    },
    { 
      id: "home-loan",
      title: "Home Loans", 
      desc: "Turn your dream home into reality with competitive options.",
      icon: <HomeIcon className="text-accent" size={32} />
    },
    { 
      id: "business-loan",
      title: "Business & MSME Loans", 
      desc: "Fuel your ambition with capital built for growth.",
      icon: <Briefcase className="text-primary" size={32} />
    },
    { 
      id: "vehicle-loan",
      title: "Vehicle & Equipment Finance", 
      desc: "Move forward with confidence.",
      icon: <Truck className="text-accent" size={32} />
    },
    { 
      id: "gold-loan",
      title: "Gold Loans", 
      desc: "Unlock value instantly and securely.",
      icon: <Coins className="text-primary" size={32} />
    },
    { 
      id: "working-capital",
      title: "Working Capital & Overdraft", 
      desc: "Stay liquid. Stay agile.",
      icon: <Zap className="text-accent" size={32} />
    },
  ];

  const steps = [
    { title: "Tell Us About Yourself", desc: "Share basic details to help us understand your needs." },
    { title: "Choose the Loan That Fits", desc: "Compare multiple offers and select the best one." },
    { title: "Get Matched with Trusted Lenders", desc: "We connect you with the right financial institutions." },
    { title: "Receive Your Approval", desc: "Fast-tracked processing for quicker decisions." },
    { title: "Funds Disbursed Securely", desc: "Direct transfer to your verified bank account." },
  ];

  return (
    <div className="flex flex-col bg-slate-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Layered Background Gradients */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-0 -left-1/4 h-[1000px] w-[1000px] rounded-full bg-primary/20 blur-[150px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute bottom-0 -right-1/4 h-[1000px] w-[1000px] rounded-full bg-accent/10 blur-[150px]" 
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-accent">India’s Intelligent Loan Marketplace</span>
              </div>
              <h1 className="text-7xl md:text-9xl font-bold tracking-tight mb-8 leading-[0.9] text-white">
                Borrow Better. <br />
                <span className="text-primary">Grow Faster.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto">
                Rupyou is India’s modern loan marketplace — connecting individuals, businesses, and entrepreneurs with trusted banks and financial institutions across the country.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/products" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full h-16 px-10 text-lg">Explore Loan Options</Button>
                </Link>
                <Link to="/partner" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full h-16 px-10 text-lg">Become a Partner</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Rupyou */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                One Platform. <br />
                Every Loan You Need.
              </h2>
              <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                Whether you’re buying a home, expanding your business, upgrading equipment, or managing working capital — Rupyou brings together multiple banks and financial institutions in one powerful marketplace.
              </p>
              <div className="space-y-6">
                {[
                  "No confusion.",
                  "No endless branch visits.",
                  "No guesswork.",
                ].map((text, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-2xl font-bold text-white">{text}</span>
                  </div>
                ))}
              </div>
              <p className="mt-12 text-2xl font-bold text-primary">
                Just the right loan. From the right lender. At the right time.
              </p>
            </motion.div>
            <div className="relative h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
              
              {/* Floating Loan Cards Animation */}
              <div className="relative w-full h-full">
                {[
                  { icon: <Wallet size={24} />, title: "Personal", top: "15%", left: "10%", delay: 0 },
                  { icon: <HomeIcon size={24} />, title: "Home", top: "45%", left: "5%", delay: 1 },
                  { icon: <Briefcase size={24} />, title: "Business", top: "75%", left: "15%", delay: 2 },
                  { icon: <Truck size={24} />, title: "Vehicle", top: "10%", right: "10%", delay: 0.5 },
                  { icon: <Coins size={24} />, title: "Gold", top: "40%", right: "5%", delay: 1.5 },
                  { icon: <Zap size={24} />, title: "Working Cap", top: "70%", right: "15%", delay: 2.5 },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: idx % 2 === 0 ? [0, 2, 0] : [0, -2, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: item.delay,
                      ease: "easeInOut"
                    }}
                    className="absolute p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center space-x-4 min-w-[180px]"
                    style={{ 
                      top: item.top, 
                      left: item.left, 
                      right: item.right 
                    }}
                  >
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">{item.title}</p>
                      <p className="text-sm font-bold text-white">Instant Match</p>
                    </div>
                  </motion.div>
                ))}

                {/* Central Logo Glow */}
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-[2.5rem] bg-primary flex items-center justify-center text-white text-5xl font-black shadow-[0_0_100px_rgba(0,82,255,0.5)]"
                >
                  R
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Categories */}
      <section className="py-32 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">Solutions Designed Around You</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">The smarter way to borrow, tailored to your specific needs.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full group hover:bg-white/10 transition-all duration-500">
                  <div className="mb-8 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500">
                    {cat.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{cat.title}</h3>
                  <p className="text-slate-400 leading-relaxed mb-8">{cat.desc}</p>
                  <Link to={`/apply/${cat.id}`}>
                    <Button variant="ghost" className="p-0 hover:bg-transparent text-primary group-hover:translate-x-2 transition-transform font-black uppercase tracking-widest text-[10px]">
                      Apply Now <ArrowRight className="ml-2" size={14} />
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">A Smarter Way to Apply</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">Simple, confident, and completely transparent.</p>
          </div>
          <div className="grid gap-12 lg:grid-cols-5">
            {steps.map((step, i) => (
              <motion.div 
                key={step.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-white/5 text-primary font-bold text-3xl border border-white/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {i + 1}
                </div>
                <h3 className="mb-4 text-xl font-bold text-white">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[calc(50%+70px)] w-[calc(100%-140px)] h-px bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Scale */}
      <section className="py-32 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold mb-8">Built on Trust. <br /> Powered by Reach.</h2>
              <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                Through a strong on-ground network and digital innovation, Rupyou serves borrowers across urban, semi-urban, and emerging markets.
              </p>
              <p className="text-xl text-slate-400 leading-relaxed">
                We combine technology with real human relationships — making access to finance easier than ever.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <Card key={stat.label} className="text-center py-12">
                  <div className="text-5xl font-bold text-white mb-4">
                    <Counter value={stat.value} />
                    <span className="text-primary">{stat.suffix}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Lenders */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] bg-primary/10 blur-[150px] rounded-full" />
        <div className="container relative z-10 mx-auto px-4">
          <Card className="p-16 md:p-24 border-white/10 bg-white/[0.02] backdrop-blur-3xl">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-5xl md:text-7xl font-bold mb-8">Grow Your Loan Portfolio With Us</h2>
                <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                  Rupyou helps banks and financial institutions expand their reach without expanding infrastructure.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-12">
                  {[
                    "Verified applicants",
                    "Complete documentation",
                    "High-intent borrowers",
                    "Transparent processes",
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-3">
                      <CheckCircle2 className="text-primary" size={20} />
                      <span className="text-white font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/partner">
                  <Button size="lg" className="h-16 px-10">Partner With Rupyou</Button>
                </Link>
              </div>
              <div className="space-y-8">
                <p className="text-2xl font-medium text-slate-300 italic leading-relaxed">
                  "Our platform simplifies sourcing while maintaining quality and accountability. We are not just a channel — we are your growth partner."
                </p>
                <div className="h-px w-24 bg-primary" />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[3rem] overflow-hidden bg-primary p-16 md:p-32 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-50" />
            <div className="relative z-10">
              <h2 className="text-5xl md:text-8xl font-bold text-white mb-8">Ready to Move Forward?</h2>
              <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                Whether you are planning your next big purchase or scaling your business — Rupyou helps you move ahead with clarity and confidence.
              </p>
              <Link to="/signup">
                <Button variant="secondary" size="lg" className="h-20 px-16 text-xl rounded-3xl">Start Your Application Today</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from "react";
import { motion } from "motion/react";
import { Shield, Lock, ArrowRight, Mail, Phone } from "lucide-react";
import { Button, Input, Card } from "../components/UI";
import { Link, useNavigate } from "react-router-dom";

import { auth, db } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [seedStatus, setSeedStatus] = React.useState<string | null>(null);

  const handleSeed = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/seed", { method: "POST" });
      const data = await response.json();
      if (data.success) {
        setSeedStatus("System seeded successfully! You can now login with the sample credentials.");
      } else {
        setSeedStatus("Seeding failed: " + data.error);
      }
    } catch (err) {
      setSeedStatus("Error connecting to server for seeding.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === "admin") navigate("/admin");
        else if (userData.role === "connector") navigate("/connector");
        else navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 pt-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center space-x-3 mb-8 group">
            <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-3xl shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform duration-500">R</div>
            <span className="text-3xl font-black tracking-tighter text-white font-display">Rupyou</span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-3">Welcome Back</h1>
          <p className="text-slate-400">Access India's intelligent loan marketplace</p>
        </div>

        <Card className="p-10 border-white/10 bg-white/5 backdrop-blur-2xl">
          <form onSubmit={handleLogin} className="space-y-8">
            <Input 
              label="Email Address" 
              type="email"
              placeholder="name@company.com" 
              required 
              icon={<Mail size={18} />} 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-600"
            />
            <div className="space-y-2">
              <Input 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
                required 
                icon={<Lock size={18} />} 
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={error}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600"
              />
              <div className="text-right">
                <button type="button" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">Forgot Password?</button>
              </div>
            </div>
            <Button type="submit" className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs" isLoading={isLoading}>
              Sign In Securely
            </Button>
          </form>

          {seedStatus && (
            <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-xl text-xs text-primary text-center font-bold">
              {seedStatus}
            </div>
          )}

          <div className="mt-6 flex flex-col space-y-4">
            <button 
              onClick={handleSeed}
              className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors"
            >
              Seed System (Dev Only)
            </button>
          </div>

          <div className="mt-10 pt-10 border-t border-white/5 text-center">
            <p className="text-sm text-slate-400">
              New to Rupyou?{" "}
              <Link to="/signup" className="font-bold text-primary hover:text-primary/80 transition-colors">Apply Now</Link>
            </p>
          </div>
        </Card>

        <div className="mt-12 flex items-center justify-center space-x-8 text-slate-500">
          <div className="flex items-center text-[10px] font-black uppercase tracking-widest">
            <Shield size={14} className="mr-2 text-primary" /> Institutional Grade
          </div>
          <div className="flex items-center text-[10px] font-black uppercase tracking-widest">
            <Lock size={14} className="mr-2 text-primary" /> 256-bit Encryption
          </div>
        </div>
      </div>
    </div>
  );
};

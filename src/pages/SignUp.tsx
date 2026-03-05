import React from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import { Button, Card, Input } from "../components/UI";

import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role: "retail", // Default role
        status: "active",
        createdAt: new Date().toISOString(),
      });

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="hidden lg:block space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight font-display">
                Join the Future of <br />
                <span className="text-primary">Digital Credit.</span>
              </h1>
              <p className="text-2xl text-slate-400 leading-relaxed mt-8">
                Access India's most intelligent loan marketplace. Simple, fast, and secure.
              </p>
            </motion.div>
            
            <div className="space-y-8">
              {[
                { t: "Instant Verification", d: "100% digital process with zero paperwork." },
                { t: "Bank-Grade Security", d: "Your data is protected by institutional encryption." },
                { t: "Smart Matching", d: "Get matched with the best lenders automatically." },
              ].map((item, i) => (
                <motion.div 
                  key={item.t} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start space-x-6"
                >
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{item.t}</h4>
                    <p className="text-slate-400">{item.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-10 md:p-14 border-white/10 bg-white/5 backdrop-blur-3xl">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-white mb-3">Create Account</h2>
                <p className="text-slate-400">Join thousands of borrowers growing with Rupyou.</p>
              </div>

              <form onSubmit={handleSignUp} className="space-y-8">
                <Input 
                  label="Full Name" 
                  placeholder="John Doe" 
                  icon={<User size={18} />}
                  required 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
                <Input 
                  label="Email Address" 
                  type="email" 
                  placeholder="john@example.com" 
                  icon={<Mail size={18} />}
                  required 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
                <Input 
                  label="Password" 
                  type="password" 
                  placeholder="••••••••" 
                  icon={<Lock size={18} />}
                  required 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  error={error}
                  className="bg-white/5 border-white/10 text-white"
                />
                <div className="flex items-start space-x-4">
                  <input type="checkbox" className="mt-1.5 h-5 w-5 rounded-lg border-white/10 bg-white/5 text-primary focus:ring-primary" required />
                  <p className="text-sm text-slate-400 leading-relaxed">
                    I agree to the <Link to="/terms" className="text-primary font-bold hover:text-primary/80">Terms & Conditions</Link> and <Link to="/privacy" className="text-primary font-bold hover:text-primary/80">Privacy Policy</Link>.
                  </p>
                </div>
                <Button className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs" size="lg" isLoading={isLoading}>
                  Create My Account
                </Button>
              </form>

              <div className="mt-12 pt-10 border-t border-white/5 text-center">
                <p className="text-slate-400">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary font-bold hover:text-primary/80">Login here</Link>
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

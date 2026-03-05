import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "./UI";
import { cn } from "../utils";

import { useAuth } from "../hooks/useAuth";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { 
      name: "Learn", 
      path: "/learn",
      dropdown: [
        { name: "Bank Account Types", path: "/learn/bank-accounts" },
        { name: "Card Types", path: "/learn/card-types" },
        { name: "What is CIBIL?", path: "/learn/cibil" },
        { name: "Personal Finance", path: "/learn/finance-guide" },
        { name: "EMI Explained", path: "/learn/emi" },
        { name: "Loan Eligibility", path: "/learn/eligibility-guide" },
        { name: "Blogs", path: "/learn/blogs" },
      ]
    },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled ? "bg-slate-950/80 py-3 shadow-2xl backdrop-blur-2xl border-b border-white/5" : "bg-transparent py-6"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between relative">
          <Link to="/" className="flex items-center space-x-3 group z-10">
            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform duration-500">R</div>
            <span className="text-2xl font-black tracking-tighter text-white font-display">Rupyou</span>
          </Link>

          {/* Desktop Nav - Centered */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 space-x-8">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={cn(
                    "flex items-center text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-primary relative py-2",
                    location.pathname === link.path || (link.path !== "/" && location.pathname.startsWith(link.path)) ? "text-primary" : "text-slate-400"
                  )}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={12} className="ml-1.5 opacity-50" />}
                  
                  {/* Hover Underline Animation */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
                
                {link.dropdown && activeDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 rounded-[2rem] bg-slate-900/95 p-6 shadow-2xl border border-white/10 backdrop-blur-3xl"
                  >
                    <div className="grid gap-3">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="rounded-2xl px-5 py-3 text-sm font-bold text-slate-400 hover:bg-white/5 hover:text-primary transition-all duration-300"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-6 z-10">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="flex items-center space-x-3 group">
                  <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <User size={18} />
                  </div>
                  <span className="text-sm font-bold text-white">{user.name.split(' ')[0]}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all duration-300"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-[11px] font-black uppercase tracking-widest text-white hover:text-primary">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="md" className="px-8 rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20">Apply Now</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 rounded-xl bg-white/5 border border-white/10">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-slate-950 border-b border-white/5 shadow-2xl lg:hidden overflow-hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-4">
                  <Link
                    to={link.path}
                    onClick={() => !link.dropdown && setIsOpen(false)}
                    className="text-2xl font-black text-white flex justify-between items-center"
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown size={20} className="opacity-50" />}
                  </Link>
                  {link.dropdown && (
                    <div className="grid grid-cols-1 gap-3 pl-4 border-l border-white/10">
                      {link.dropdown.map(item => (
                        <Link 
                          key={item.path} 
                          to={item.path} 
                          onClick={() => setIsOpen(false)}
                          className="text-slate-400 font-bold"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-8 border-t border-white/10 space-y-4">
                {user ? (
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                        <User size={20} />
                      </div>
                      <span className="font-bold text-white">{user.name}</span>
                    </div>
                    <button onClick={handleLogout} className="text-red-500"><LogOut size={20} /></button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full py-4 rounded-2xl font-black uppercase tracking-widest">Login</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full py-4 rounded-2xl font-black uppercase tracking-widest">Apply Now</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

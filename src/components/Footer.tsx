import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-500 pt-32 pb-16 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-primary/40">R</div>
              <span className="text-3xl font-black text-white font-display tracking-tighter">Rupyou</span>
            </div>
            <p className="text-lg leading-relaxed font-medium">
              India's intelligent loan marketplace. The smarter way to borrow, the growth partner for lenders.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 border border-white/5">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-black mb-10 uppercase tracking-widest text-xs">Solutions</h4>
            <ul className="space-y-6 text-sm font-bold">
              <li><Link to="/calculator" className="hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" /> Personal Loans</Link></li>
              <li><Link to="/calculator" className="hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" /> Business Loans</Link></li>
              <li><Link to="/calculator" className="hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" /> MSME Loans</Link></li>
              <li><Link to="/calculator" className="hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" /> EMI Calculator</Link></li>
              <li><Link to="/signup" className="hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" /> Partner With Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-black mb-10 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-6 text-sm font-bold">
              <li><Link to="/learn/cibil" className="hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" /> What is CIBIL?</Link></li>
              <li><Link to="/learn/finance-guide" className="hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" /> Finance Guide</Link></li>
              <li><Link to="/learn/blogs" className="hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" /> Our Blog</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" /> About Us</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" /> Contact Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-10">
            <div>
              <h4 className="text-white font-black mb-8 uppercase tracking-widest text-xs">Get in Touch</h4>
              <ul className="space-y-6 text-sm font-bold">
                <li className="flex items-center space-x-4 group cursor-pointer">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Mail size={18} />
                  </div>
                  <span className="group-hover:text-white transition-colors">info.rupyou@gmail.com</span>
                </li>
                <li className="flex items-center space-x-4 group cursor-pointer">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Phone size={18} />
                  </div>
                  <span className="group-hover:text-white transition-colors">+91 12345 67890</span>
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-3xl">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Corporate Office</p>
              <p className="text-sm font-bold text-white leading-relaxed">
                Parasram Nagar, Dher ke Balaji, Sikar Road, <br /> Jaipur, Rajasthan - 302039
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
            © {currentYear} Rupyou Private Limited. All rights reserved.
          </p>
          <div className="flex space-x-10 text-[10px] font-black uppercase tracking-widest">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/about" className="hover:text-white transition-colors">Connector Agreement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

import { ArrowRight as ArrowRightIcon } from "lucide-react";

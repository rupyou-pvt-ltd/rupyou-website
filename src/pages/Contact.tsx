import React from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button, Card, Input } from "../components/UI";

export const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8">Contact Us</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Have questions? We're here to help. Reach out to our team for support or partnership inquiries.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          <Card className="p-10 text-center border-white/10 bg-white/5 backdrop-blur-2xl group hover:bg-white/10 transition-all duration-500">
            <div className="h-16 w-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
              <Mail size={32} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Email Us</h4>
            <p className="text-sm text-slate-500 mb-6">For general inquiries and support</p>
            <a href="mailto:support@rupyou.com" className="text-primary font-bold hover:text-white transition-colors">support@rupyou.com</a>
          </Card>
          <Card className="p-10 text-center border-white/10 bg-white/5 backdrop-blur-2xl group hover:bg-white/10 transition-all duration-500">
            <div className="h-16 w-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
              <Phone size={32} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Call Us</h4>
            <p className="text-sm text-slate-500 mb-6">Mon-Fri from 9am to 6pm</p>
            <a href="tel:+911234567890" className="text-primary font-bold hover:text-white transition-colors">+91 12345 67890</a>
          </Card>
          <Card className="p-10 text-center border-white/10 bg-white/5 backdrop-blur-2xl group hover:bg-white/10 transition-all duration-500">
            <div className="h-16 w-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
              <MapPin size={32} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Visit Us</h4>
            <p className="text-sm text-slate-500 mb-6">Our corporate headquarters</p>
            <p className="text-white font-bold">New Delhi, India</p>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-12 md:p-20 border-white/10 bg-white/5 backdrop-blur-3xl">
            <h3 className="text-3xl font-black text-white mb-12 uppercase tracking-widest">Send us a Message</h3>
            <form className="grid md:grid-cols-2 gap-8">
              <Input label="Full Name" placeholder="John Doe" className="bg-white/5 border-white/10 text-white placeholder:text-slate-700" required />
              <Input label="Email Address" type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 text-white placeholder:text-slate-700" required />
              <div className="md:col-span-2">
                <Input label="Subject" placeholder="How can we help?" className="bg-white/5 border-white/10 text-white placeholder:text-slate-700" required />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Message</label>
                <textarea 
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-white transition-all focus:border-primary focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-primary/10 placeholder:text-slate-700"
                  rows={5}
                  placeholder="Tell us more about your inquiry..."
                  required
                ></textarea>
              </div>
              <div className="md:col-span-2 pt-4">
                <Button className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs" size="lg" icon={<Send size={18} />}>Send Message</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

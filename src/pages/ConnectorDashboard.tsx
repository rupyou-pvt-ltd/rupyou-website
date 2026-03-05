import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Wallet, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  PieChart,
  LogOut,
  Search,
  Bell
} from "lucide-react";
import { Button, Card } from "../components/UI";
import { formatCurrency, cn } from "../utils";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { applicationService, commissionService } from "../services/dataService";
import { Application, CommissionRecord } from "../types";

export const ConnectorDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = React.useState<Application[]>([]);
  const [commissions, setCommissions] = React.useState<CommissionRecord[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const [apps, comms] = await Promise.all([
          applicationService.getApplicationsByConnectorId(user.uid),
          commissionService.getCommissionsByConnectorId(user.uid)
        ]);
        setApplications(apps);
        setCommissions(comms);
      } catch (error) {
        console.error("Error fetching connector data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const totalVolume = applications
    .filter(a => a.status === "disbursed")
    .reduce((sum, a) => sum + a.amount, 0);

  const totalEarnings = commissions.reduce((sum, c) => sum + c.amount, 0);

  const stats = [
    { label: "Leads Submitted", value: applications.length.toString(), icon: FileText, color: "bg-blue-500/10 text-blue-500" },
    { label: "Approved Loans", value: applications.filter(a => a.status === "approved" || a.status === "disbursed").length.toString(), icon: CheckCircle2, color: "bg-green-500/10 text-green-500" },
    { label: "Total Volume", value: formatCurrency(totalVolume), icon: TrendingUp, color: "bg-primary/10 text-primary" },
    { label: "Your Earnings", value: formatCurrency(totalEarnings), icon: Wallet, color: "bg-accent/10 text-accent" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16">
          <div>
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter">Partner Dashboard</h1>
            <p className="text-slate-400 mt-3 text-lg">Track your performance and manage your distribution network.</p>
          </div>
          <div className="mt-8 md:mt-0 flex space-x-4">
            <Button variant="outline" className="rounded-2xl px-8 font-black uppercase tracking-widest text-xs border-white/10 text-white hover:bg-white/5">Download Statement</Button>
            <Button icon={<ArrowRight size={18} />} className="rounded-2xl px-8 font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/40">New Lead</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map(stat => (
            <Card key={stat.label} className="p-10 border-white/10 bg-white/5 backdrop-blur-3xl">
              <div className="flex items-center space-x-6">
                <div className={cn("p-5 rounded-2xl", stat.color)}>
                  <stat.icon size={32} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black text-white mt-2 tracking-tighter">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Leads Table */}
          <Card className="lg:col-span-2 p-0 overflow-hidden border-white/10 bg-white/5 backdrop-blur-3xl">
            <div className="p-10 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="text-xl font-black text-white uppercase tracking-widest">Recent Leads</h3>
              <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:text-primary/80 transition-colors">View All Records</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  <tr>
                    <th className="px-10 py-6">Lead Name</th>
                    <th className="px-10 py-6">Product</th>
                    <th className="px-10 py-6">Amount</th>
                    <th className="px-10 py-6">Status</th>
                    <th className="px-10 py-6">Commission</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {applications.length > 0 ? applications.map(lead => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-10 py-8">
                        <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{lead.applicantName}</p>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{lead.id}</p>
                      </td>
                      <td className="px-10 py-8 text-sm font-bold text-slate-400">{lead.loanType}</td>
                      <td className="px-10 py-8 text-sm font-black text-white">{formatCurrency(lead.amount)}</td>
                      <td className="px-10 py-8">
                        <span className={cn(
                          "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                          lead.status === "disbursed" ? "bg-green-500/10 text-green-500" :
                          lead.status === "approved" ? "bg-blue-500/10 text-blue-500" :
                          lead.status === "rejected" ? "bg-red-500/10 text-red-500" : "bg-yellow-500/10 text-yellow-500"
                        )}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-sm font-black text-primary">
                        {lead.status === "disbursed" ? formatCurrency(lead.amount * 0.005) : "-"}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-10 py-20 text-center text-slate-500 font-bold">No leads found. Start by adding a new lead.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Commission Split Info */}
          <div className="space-y-8">
            <Card className="p-10 bg-gradient-to-br from-slate-900 to-slate-950 text-white border-white/10 shadow-2xl">
              <h3 className="text-xl font-black mb-8 uppercase tracking-widest">Commission Split</h3>
              <div className="flex items-center justify-between mb-10 p-8 rounded-[2rem] bg-white/5 border border-white/5">
                <div className="text-center">
                  <p className="text-5xl font-black text-primary tracking-tighter">25%</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-2">Your Share</p>
                </div>
                <div className="h-16 w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-5xl font-black text-white tracking-tighter">75%</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-2">Rupyou</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                Commissions are automatically calculated upon disbursement and credited to your registered bank account within 48 hours.
              </p>
            </Card>

            <Card className="p-10 border-white/10 bg-white/5 backdrop-blur-3xl">
              <h3 className="text-xl font-black text-white mb-8 uppercase tracking-widest">Payout Status</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-5 rounded-2xl bg-white/5">
                  <span className="text-sm font-bold text-slate-400">Pending Payout</span>
                  <span className="text-lg font-black text-white">{formatCurrency(45000)}</span>
                </div>
                <div className="flex justify-between items-center p-5 rounded-2xl bg-white/5">
                  <span className="text-sm font-bold text-slate-400">Last Payout (Feb)</span>
                  <span className="text-lg font-black text-white">{formatCurrency(125000)}</span>
                </div>
                <Button variant="outline" className="w-full mt-4 py-4 rounded-2xl border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/5">View Payout History</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

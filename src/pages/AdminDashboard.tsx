import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  FileCheck, 
  TrendingUp, 
  Wallet, 
  LayoutDashboard, 
  Percent, 
  Settings, 
  AlertCircle,
  Search,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  Clock,
  LogOut
} from "lucide-react";
import { Button, Card, Slider } from "../components/UI";
import { formatCurrency, cn } from "../utils";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  userService, 
  applicationService, 
  commissionService 
} from "../services/dataService";
import { User, Application, CommissionRecord } from "../types";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [commissionSplit, setCommissionSplit] = useState(75); // Rupyou share
  const [connectors, setConnectors] = useState<User[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const data = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 2000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
  ];

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [allConnectors, allApps] = await Promise.all([
          userService.getAllConnectors(),
          applicationService.getAllApplications()
        ]);
        setConnectors(allConnectors);
        setApplications(allApps);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (uid: string, status: "active" | "suspended" | "pending") => {
    try {
      await userService.updateConnectorStatus(uid, status);
      setConnectors(prev => prev.map(c => c.id === uid ? { ...c, status } : c));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const stats = [
    { label: "Total Applications", value: applications.length.toString(), trend: "+12.5%", positive: true, icon: FileCheck },
    { label: "Disbursed Amount", value: formatCurrency(45000000), trend: "+8.2%", positive: true, icon: Wallet },
    { label: "Active Connectors", value: connectors.filter(c => c.status === "active").length.toString(), trend: "+4.1%", positive: true, icon: Users },
    { label: "Total Commission", value: formatCurrency(1125000), trend: "-2.4%", positive: false, icon: TrendingUp },
  ];

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Applications", icon: FileCheck },
    { name: "Connectors", icon: Users },
    { name: "Commission", icon: Percent },
    { name: "Lender APIs", icon: Settings },
    { name: "Fraud Alerts", icon: AlertCircle },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-slate-900/50 border-r border-white/5 hidden lg:flex flex-col sticky top-0 h-screen backdrop-blur-3xl">
        <div className="p-10 border-b border-white/5">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-primary/40">R</div>
            <span className="text-2xl font-black text-white font-display tracking-tighter">Rupyou Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-8 space-y-3">
          {menuItems.map(item => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300",
                activeTab === item.name ? "bg-primary text-white shadow-2xl shadow-primary/40" : "text-slate-500 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="p-8 border-t border-white/5">
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start text-red-500 hover:bg-red-500/10 font-black uppercase tracking-widest text-xs"
          >
            <LogOut size={18} className="mr-3" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-24 bg-slate-950/50 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between px-10 sticky top-0 z-20">
          <h2 className="text-2xl font-black text-white uppercase tracking-widest">{activeTab}</h2>
          <div className="flex items-center space-x-8">
            <div className="relative w-72 hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                placeholder="Search anything..." 
                className="w-full pl-12 pr-6 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder:text-slate-600 focus:ring-4 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <button className="p-3.5 text-slate-400 hover:text-white relative bg-white/5 rounded-2xl border border-white/10 transition-all">
              <Bell size={20} />
              <span className="absolute top-3 right-3 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-slate-950" />
            </button>
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-accent p-[1px]">
              <div className="h-full w-full rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold">A</div>
            </div>
          </div>
        </header>

        <div className="p-10 space-y-10 overflow-y-auto">
          {activeTab === "Overview" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map(stat => (
                  <Card key={stat.label} className="p-8 border-white/10 bg-white/5">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                        <stat.icon size={28} />
                      </div>
                      <div className={cn("flex items-center text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase", stat.positive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500")}>
                        {stat.positive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                        {stat.trend}
                      </div>
                    </div>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-4xl font-black text-white mt-3 tracking-tighter">{stat.value}</p>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-10">
                <Card className="lg:col-span-2 p-10 border-white/10 bg-white/5">
                  <h3 className="text-xl font-black text-white mb-10 uppercase tracking-widest">Application Volume</h3>
                  <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0052FF" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#0052FF" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b", fontWeight: 900 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b", fontWeight: 900 }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: "#0f172a", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.5)" }}
                          itemStyle={{ color: "#fff", fontWeight: "bold" }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#0052FF" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-10 border-white/10 bg-white/5">
                  <h3 className="text-xl font-black text-white mb-10 uppercase tracking-widest">System Health</h3>
                  <div className="space-y-8">
                    {[
                      { name: "Lender API A", status: "Online", color: "bg-green-500" },
                      { name: "Lender API B", status: "Online", color: "bg-green-500" },
                      { name: "Underwriting Engine", status: "High Load", color: "bg-yellow-500" },
                      { name: "Payment Gateway", status: "Online", color: "bg-green-500" },
                    ].map(item => (
                      <div key={item.name} className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5">
                        <span className="text-sm font-bold text-slate-300">{item.name}</span>
                        <div className="flex items-center">
                          <span className="text-[10px] font-black text-slate-500 mr-4 uppercase tracking-widest">{item.status}</span>
                          <div className={cn("h-3 w-3 rounded-full shadow-2xl", item.color, `shadow-${item.color.split('-')[1]}-500/50`)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </>
          )}

          {activeTab === "Commission" && (
            <div className="max-w-5xl space-y-10">
              <Card className="p-12 border-white/10 bg-white/5">
                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-widest">Commission Management</h3>
                <p className="text-slate-400 mb-12 text-lg">Define the global default split between Rupyou and Connectors.</p>
                
                <div className="space-y-16">
                  <div className="p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl">
                    <div className="flex justify-between items-center mb-12">
                      <div className="text-center">
                        <p className="text-7xl font-black text-primary tracking-tighter">{commissionSplit}%</p>
                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest mt-3">Rupyou Share</p>
                      </div>
                      <div className="h-24 w-px bg-white/10" />
                      <div className="text-center">
                        <p className="text-7xl font-black text-white tracking-tighter">{100 - commissionSplit}%</p>
                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest mt-3">Connector Share</p>
                      </div>
                    </div>
                    
                    <Slider 
                      label="Adjust Global Split" 
                      min={0} 
                      max={100} 
                      step={1} 
                      value={commissionSplit} 
                      onChange={setCommissionSplit} 
                      suffix="%"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-10">
                    <Card className="p-10 border-white/10 bg-white/5">
                      <h4 className="text-xl font-black text-white mb-8 uppercase tracking-widest">Product Overrides</h4>
                      <div className="space-y-6">
                        {["Personal Loan", "Home Loan", "MSME Loan"].map(p => (
                          <div key={p} className="flex items-center justify-between p-5 rounded-2xl bg-white/5">
                            <span className="text-sm font-bold text-slate-300">{p}</span>
                            <Button size="sm" variant="outline" className="px-6 rounded-full text-[10px] font-black uppercase tracking-widest">Edit</Button>
                          </div>
                        ))}
                      </div>
                    </Card>
                    <Card className="p-10 border-white/10 bg-white/5">
                      <h4 className="text-xl font-black text-white mb-8 uppercase tracking-widest">Connector Overrides</h4>
                      <div className="space-y-6">
                        {["Top Connectors", "New Connectors"].map(p => (
                          <div key={p} className="flex items-center justify-between p-5 rounded-2xl bg-white/5">
                            <span className="text-sm font-bold text-slate-300">{p}</span>
                            <Button size="sm" variant="outline" className="px-6 rounded-full text-[10px] font-black uppercase tracking-widest">Edit</Button>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  <Button className="w-full py-6 rounded-[2rem] font-black uppercase tracking-widest text-sm" size="lg">Save Global Configuration</Button>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "Connectors" && (
            <Card className="p-0 overflow-hidden border-white/10 bg-white/5">
              <div className="p-10 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-2xl font-black text-white uppercase tracking-widest">Manage Connectors</h3>
                <Button size="sm" className="px-8 rounded-full font-black uppercase tracking-widest text-[10px]">Add New Connector</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    <tr>
                      <th className="px-10 py-6">Connector Name</th>
                      <th className="px-10 py-6">Email</th>
                      <th className="px-10 py-6">Status</th>
                      <th className="px-10 py-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {connectors.map(c => (
                      <tr key={c.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-10 py-8">
                          <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{c.name}</p>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{c.id}</p>
                        </td>
                        <td className="px-10 py-8 text-sm font-bold text-slate-400">{c.email}</td>
                        <td className="px-10 py-8">
                          <span className={cn(
                            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                            c.status === "active" ? "bg-green-500/10 text-green-500" :
                            c.status === "pending" ? "bg-yellow-500/10 text-yellow-500" : "bg-red-500/10 text-red-500"
                          )}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex space-x-3">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleStatusUpdate(c.id, "active")}
                              className="p-3 rounded-xl hover:bg-green-500/10 text-green-500"
                              icon={<CheckCircle size={18} />} 
                            />
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleStatusUpdate(c.id, "suspended")}
                              className="p-3 rounded-xl hover:bg-red-500/10 text-red-500"
                              icon={<XCircle size={18} />} 
                            />
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleStatusUpdate(c.id, "pending")}
                              className="p-3 rounded-xl hover:bg-blue-500/10 text-blue-500"
                              icon={<Clock size={18} />} 
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

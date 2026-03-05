import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { LoanApplication } from "./pages/LoanApplication";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ConnectorDashboard } from "./pages/ConnectorDashboard";
import { Calculator } from "./pages/Calculator";
import { Learn, CibilGuide, EmiExplained, BankAccounts, CardTypes, PersonalFinance, LoanEligibility, Blogs } from "./pages/Learn";
import { About } from "./pages/About";
import { Partner } from "./pages/Partner";
import { Contact } from "./pages/Contact";
import { PrivacyPolicy, TermsConditions, ConnectorAgreement } from "./pages/Legal";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const DashboardRedirect = () => {
  const { user } = useAuth();
  if (user?.role === "admin") return <Navigate to="/admin" />;
  if (user?.role === "connector") return <Navigate to="/connector" />;
  return <Navigate to="/" />;
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-950">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/apply/:productId" element={<LoanApplication />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Dashboards */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/connector/*" 
              element={
                <ProtectedRoute allowedRoles={["connector"]}>
                  <ConnectorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardRedirect />
                </ProtectedRoute>
              } 
            />
            
            {/* Pages */}
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/about" element={<About />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/contact" element={<Contact />} />

            {/* Learn & Resources */}
            <Route path="/learn" element={<Learn />}>
              <Route index element={<Navigate to="cibil" replace />} />
              <Route path="cibil" element={<CibilGuide />} />
              <Route path="emi" element={<EmiExplained />} />
              <Route path="bank-accounts" element={<BankAccounts />} />
              <Route path="card-types" element={<CardTypes />} />
              <Route path="finance-guide" element={<PersonalFinance />} />
              <Route path="eligibility-guide" element={<LoanEligibility />} />
              <Route path="blogs" element={<Blogs />} />
            </Route>

            {/* Legal */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/agreement" element={<ConnectorAgreement />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

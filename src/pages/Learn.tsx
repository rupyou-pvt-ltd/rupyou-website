import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, ArrowRight, HelpCircle, ShieldCheck, PieChart, Wallet, CreditCard, BookOpen, Info, FileText } from "lucide-react";
import { Button, Card } from "../components/UI";
import { Link, Outlet } from "react-router-dom";

export const Learn = () => (
  <div className="min-h-screen bg-slate-950 pt-32 pb-20">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="lg:w-80 space-y-4">
          <div className="p-8 glass-card sticky top-32">
            <h3 className="text-xl font-bold text-white mb-6">Resources</h3>
            <nav className="space-y-2">
              {[
                { n: "What is CIBIL?", p: "cibil", i: ShieldCheck },
                { n: "EMI Explained", p: "emi", i: PieChart },
                { n: "Bank Accounts", p: "bank-accounts", i: Wallet },
                { n: "Card Types", p: "card-types", i: CreditCard },
                { n: "Finance Guide", p: "finance-guide", i: BookOpen },
                { n: "Eligibility Guide", p: "eligibility-guide", i: Info },
                { n: "Blogs", p: "blogs", i: FileText },
              ].map(item => (
                <Link
                  key={item.p}
                  to={`/learn/${item.p}`}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:bg-white/5 hover:text-primary transition-all"
                >
                  <item.i size={18} />
                  <span>{item.n}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  </div>
);

interface LearnPageProps {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  faqs: { q: string; a: string }[];
}

const LearnLayout = ({ title, subtitle, content, faqs }: LearnPageProps) => (
  <div className="max-w-4xl">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">{title}</h1>
      <p className="text-xl text-slate-400">{subtitle}</p>
    </motion.div>

    <Card className="p-8 md:p-12 mb-12">
      <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed text-lg">
        {content}
      </div>
    </Card>

    <div className="mb-16">
      <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
        <HelpCircle className="mr-3 text-primary" /> Common Questions
      </h2>
      <div className="grid gap-4">
        {faqs.map((faq, i) => (
          <Card key={i} className="p-8">
            <h4 className="text-xl font-bold text-white mb-4">{faq.q}</h4>
            <p className="text-slate-400 leading-relaxed">{faq.a}</p>
          </Card>
        ))}
      </div>
    </div>

    <div className="rounded-[3rem] bg-primary p-12 md:p-20 text-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-50" />
      <div className="relative z-10">
        <h3 className="text-3xl md:text-5xl font-bold mb-6">Ready to take the next step?</h3>
        <p className="text-xl text-white/80 mb-10 max-w-md mx-auto">
          Our experts are here to help you navigate your financial journey with confidence.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/signup"><Button variant="secondary" size="lg" className="px-10">Apply Now</Button></Link>
          <Link to="/contact"><Button variant="outline" size="lg" className="px-10">Contact Support</Button></Link>
        </div>
      </div>
    </div>
  </div>
);

export const CibilGuide = () => (
  <LearnLayout 
    title="What is CIBIL?"
    subtitle="Your credit score shows lenders how reliable you are with money."
    content={
      <div className="space-y-8">
        <p>
          Think of your CIBIL score as your financial report card. It’s a 3-digit number that tells banks how likely you are to pay back a loan on time.
        </p>
        <div className="grid md:grid-cols-2 gap-8 py-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Why it matters</h3>
            <ul className="space-y-4">
              {[
                "It helps you get loans approved faster.",
                "It can get you lower interest rates.",
                "It gives you more power to negotiate.",
                "It shows you are a responsible borrower."
              ].map(item => (
                <li key={item} className="flex items-start text-slate-400">
                  <CheckCircle2 className="text-primary mr-3 mt-1 shrink-0" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">The Scoreboard</h3>
            <div className="space-y-6">
              {[
                { r: "750 - 900", l: "EXCELLENT", c: "text-green-400" },
                { r: "700 - 749", l: "GOOD", c: "text-blue-400" },
                { r: "600 - 699", l: "AVERAGE", c: "text-yellow-400" },
                { r: "Below 600", l: "POOR", c: "text-red-400" },
              ].map(item => (
                <div key={item.r} className="flex justify-between items-center">
                  <span className="font-bold text-white">{item.r}</span>
                  <span className={`text-xs font-black tracking-widest ${item.c}`}>{item.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }
    faqs={[
      { q: "How can I make my score better?", a: "The best way is to pay your bills and loan installments on time, every time. Also, try not to use too much of your credit limit." },
      { q: "Does checking my score hurt it?", a: "No. Checking your own score is perfectly safe and won't affect it at all." }
    ]}
  />
);

export const EmiExplained = () => (
  <LearnLayout 
    title="EMI Explained"
    subtitle="Breaking down your monthly payments into simple parts."
    content={
      <div className="space-y-8">
        <p>
          An EMI (Equated Monthly Installment) is simply the fixed amount you pay back to the bank every month until your loan is fully paid off.
        </p>
        <div className="grid md:grid-cols-3 gap-6 py-4">
          {[
            { t: "The Loan", d: "The actual amount you borrowed." },
            { t: "The Interest", d: "The small fee you pay for using the bank's money." },
            { t: "The Time", d: "How many months you take to pay it back." },
          ].map(item => (
            <Card key={item.t} className="p-8 text-center">
              <h4 className="text-xl font-bold mb-4 text-white">{item.t}</h4>
              <p className="text-sm text-slate-400">{item.d}</p>
            </Card>
          ))}
        </div>
      </div>
    }
    faqs={[
      { q: "What if I miss a payment?", a: "Missing a payment can lead to extra fees and might lower your credit score. It's always best to talk to your bank if you're having trouble." },
      { q: "Can I pay more to finish the loan early?", a: "Yes, most lenders allow you to make extra payments to close your loan faster, though some might have a small fee for this." }
    ]}
  />
);

export const BankAccounts = () => (
  <LearnLayout 
    title="Bank Account Types"
    subtitle="Finding the right place for your money."
    content={
      <div className="space-y-8">
        <p>
          Choosing the right bank account depends on what you want to do with your money—whether you want to save it, spend it, or grow it.
        </p>
        <div className="grid gap-6 py-4">
          {[
            { t: "Savings Account", d: "Best for keeping your personal money safe while earning a little bit of interest." },
            { t: "Current Account", d: "Built for businesses that need to make many transactions every day." },
            { t: "Fixed Deposit (FD)", d: "Lock your money away for a set time to earn a much higher interest rate." },
            { t: "Recurring Deposit (RD)", d: "A great way to save a fixed amount every single month." }
          ].map(item => (
            <div key={item.t} className="flex items-start p-8 glass-card">
              <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mr-6 shrink-0">
                <ArrowRight size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">{item.t}</h4>
                <p className="text-slate-400">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    }
    faqs={[
      { q: "Which account is best for emergency savings?", a: "A savings account is usually best because you can get your money out quickly whenever you need it." },
      { q: "Can I have more than one account?", a: "Absolutely. Many people keep different accounts for different goals, like one for daily spending and one for long-term savings." }
    ]}
  />
);

export const CardTypes = () => (
  <LearnLayout 
    title="Card Types"
    subtitle="Understanding the difference between Debit and Credit."
    content={
      <div className="space-y-8">
        <p>
          Cards might look the same, but they work very differently. One uses your own money, while the other is a short-term loan from the bank.
        </p>
        <div className="grid md:grid-cols-2 gap-8 py-4">
          <Card className="p-10 border-primary/20 bg-primary/5">
            <h3 className="text-3xl font-bold text-white mb-6">Credit Cards</h3>
            <p className="text-slate-400 mb-8">The bank gives you a limit. You spend now and pay the bank back later.</p>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-center"><CheckCircle2 className="text-primary mr-3" size={18} /> Helps build your credit score</li>
              <li className="flex items-center"><CheckCircle2 className="text-primary mr-3" size={18} /> Earn rewards and points</li>
              <li className="flex items-center"><CheckCircle2 className="text-primary mr-3" size={18} /> Buy now, pay in 45 days</li>
            </ul>
          </Card>
          <Card className="p-10 border-accent/20 bg-accent/5">
            <h3 className="text-3xl font-bold text-white mb-6">Debit Cards</h3>
            <p className="text-slate-400 mb-8">Linked directly to your bank account. You spend only what you already have.</p>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-center"><CheckCircle2 className="text-accent mr-3" size={18} /> No risk of overspending</li>
              <li className="flex items-center"><CheckCircle2 className="text-accent mr-3" size={18} /> No interest or monthly bills</li>
              <li className="flex items-center"><CheckCircle2 className="text-accent mr-3" size={18} /> Easy cash from any ATM</li>
            </ul>
          </Card>
        </div>
      </div>
    }
    faqs={[
      { q: "Which one should I use?", a: "Use a debit card for daily needs to stay within your budget. Use a credit card for larger purchases if you can pay it back on time to earn rewards." },
      { q: "Are there any fees?", a: "Most cards have a small annual fee. Credit cards also charge interest if you don't pay your full bill on time." }
    ]}
  />
);

export const PersonalFinance = () => (
  <LearnLayout 
    title="Personal Finance"
    subtitle="Simple rules to help your money grow."
    content={
      <div className="space-y-8">
        <p>
          Managing your money doesn't have to be complicated. It's all about balance—making sure you have enough for today while planning for tomorrow.
        </p>
        <div className="grid gap-6 py-4">
          {[
            { t: "The 50/30/20 Rule", d: "Use 50% for needs, 30% for wants, and save the remaining 20%." },
            { t: "The Emergency Fund", d: "Try to keep 3 to 6 months of expenses aside for unexpected situations." },
            { t: "Start Early", d: "The sooner you start saving and investing, the more your money grows over time." }
          ].map(item => (
            <div key={item.t} className="p-8 glass-card">
              <h4 className="text-2xl font-bold text-white mb-4">{item.t}</h4>
              <p className="text-slate-400 leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    }
    faqs={[
      { q: "How much should I save?", a: "Aim for 20% of your monthly income, but even a small amount saved regularly makes a huge difference." },
      { q: "Is insurance important?", a: "Yes. Insurance protects you and your family from big financial shocks if something goes wrong." }
    ]}
  />
);

export const LoanEligibility = () => (
  <LearnLayout 
    title="Loan Eligibility"
    subtitle="What banks look for when you apply."
    content={
      <div className="space-y-8">
        <p>
          Lenders look at your income, existing loans, and repayment history to decide how much you can borrow.
        </p>
        <div className="space-y-6 py-4">
          {[
            { t: "Your Income", d: "Banks want to see that you have a steady way to pay back the loan." },
            { t: "Your Credit Score", d: "A high score (750+) makes it much easier to get approved." },
            { t: "Your Age", d: "Most lenders prefer borrowers between 21 and 60 years old." },
            { t: "Current Loans", d: "Banks check if you already have too many other monthly payments." }
          ].map(item => (
            <div key={item.t} className="flex items-center p-6 glass-card">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-6 shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">{item.t}</h4>
                <p className="text-slate-400 text-sm">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    }
    faqs={[
      { q: "Can I get a loan with a low score?", a: "It's harder, but possible. You might have to pay a higher interest rate or provide something as security." },
      { q: "How can I increase my eligibility?", a: "Pay off small existing debts, ensure your income is documented, and maintain a good credit score." }
    ]}
  />
);

export const Blogs = () => (
  <div className="max-w-4xl">
    <div className="mb-16">
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Rupyou Blog</h1>
      <p className="text-xl text-slate-400">Insights and stories from the future of finance.</p>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      {[
        { t: "The Future of Borrowing", d: "How technology is making it easier for everyone to access credit.", date: "Mar 15, 2024", category: "Trends" },
        { t: "5 Simple Credit Habits", d: "Small things you can do every day to keep your financial health strong.", date: "Mar 10, 2024", category: "Tips" },
        { t: "Your First Home Loan", d: "Everything you need to know before you sign on the dotted line.", date: "Mar 05, 2024", category: "Guide" },
      ].map(post => (
        <Card key={post.t} className="p-0 overflow-hidden flex flex-col group">
          <div className="h-56 bg-white/5 group-hover:scale-105 transition-transform duration-700" />
          <div className="p-8 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <span className="px-4 py-1.5 bg-primary/20 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">{post.category}</span>
              <span className="text-xs text-slate-500">{post.date}</span>
            </div>
            <h4 className="text-2xl font-bold text-white mb-4 leading-tight">{post.t}</h4>
            <p className="text-slate-400 mb-8 flex-1 leading-relaxed">{post.d}</p>
            <Button variant="ghost" className="w-full justify-between group-hover:bg-white/5 px-4">
              Read More <ArrowRight size={18} />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

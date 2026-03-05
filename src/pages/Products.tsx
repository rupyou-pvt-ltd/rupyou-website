import React from "react";
import { LOAN_PRODUCTS } from "../constants";
import { Card, Button, Badge } from "../components/UI";
import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

export const Products = () => {
  const categories = ["Retail", "Business", "Agri", "Specialized"];

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8">Our Loan Products</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Explore our comprehensive range of credit solutions designed for individuals, businesses, and agricultural needs.
          </p>
        </div>

        {categories.map(category => (
          <div key={category} className="mb-24">
            <div className="flex items-center space-x-6 mb-12">
              <h2 className="text-3xl font-black text-white uppercase tracking-widest">{category} Loans</h2>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {LOAN_PRODUCTS.filter(p => p.category === category).map(product => (
                <Card key={product.id} className="flex flex-col h-full group hover:bg-white/10 transition-all duration-500 border-white/10 bg-white/5 backdrop-blur-2xl p-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="h-16 w-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                      <Zap size={32} />
                    </div>
                    <Badge variant="primary">{product.category}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{product.name}</h3>
                  <p className="text-slate-400 text-sm mb-10 flex-1 leading-relaxed">{product.description}</p>
                  
                  <div className="space-y-8 pt-8 border-t border-white/5">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Interest Rate</p>
                        <p className="text-sm font-bold text-white">{product.interestRange}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Tenure</p>
                        <p className="text-sm font-bold text-white">{product.tenureRange}</p>
                      </div>
                    </div>
                    <Link to={`/apply/${product.id}`} className="block">
                      <Button className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px]" size="sm">Apply Now</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

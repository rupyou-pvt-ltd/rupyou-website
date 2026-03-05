import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "../utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, icon, children, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark btn-gradient",
      secondary: "bg-white text-slate-950 hover:bg-slate-100",
      outline: "border-2 border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white",
      ghost: "bg-transparent hover:bg-white/5 text-slate-400 hover:text-white",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-lg",
      md: "px-6 py-3 text-base rounded-xl",
      lg: "px-8 py-4 text-lg font-semibold rounded-2xl",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : icon ? (
          <span className="mr-2">{icon}</span>
        ) : null}
        {children}
      </motion.button>
    );
  }
);

export const Card = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    {...props} 
    className={cn("glass-card p-6 rounded-[2rem]", className)}
  >
    {children}
  </div>
);

export const Slider = ({ label, min, max, step, value, onChange, prefix = "", suffix = "" }: { label: string; min: number; max: number; step: number; value: number; onChange: (val: number) => void; prefix?: string; suffix?: string }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <label className="text-sm font-semibold text-slate-400">{label}</label>
      <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
        {prefix}{value.toLocaleString()} {suffix}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
    />
  </div>
);

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string; icon?: React.ReactNode }>(
  ({ label, error, icon, className, ...props }, ref) => (
    <div className="w-full space-y-1.5">
      {label && <label className="text-sm font-semibold text-slate-400">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">{icon}</div>}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 text-white transition-all focus:border-primary focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-primary/10 placeholder:text-slate-600",
            icon ? "pl-12 pr-4" : "px-4",
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/10",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs font-medium text-red-500/80">{error}</p>}
    </div>
  )
);

export const Badge = ({ children, className, variant = "primary" }: { children: React.ReactNode; className?: string; variant?: "primary" | "success" | "warning" | "error" }) => {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-green-500/10 text-green-500 border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    error: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border", variants[variant], className)}>
      {children}
    </span>
  );
};

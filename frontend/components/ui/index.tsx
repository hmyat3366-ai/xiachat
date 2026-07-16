"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

// --- Design Tokens ---
// Background: #09090B
// Surface: rgba(255,255,255,0.05) -> bg-white/5
// Glass: rgba(255,255,255,0.08) -> bg-white/[0.08]
// Border: rgba(255,255,255,0.08) -> border-white/[0.08]

export const Button = React.forwardRef<HTMLButtonElement, any>(({ variant = "primary", className = "", children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#09090B] disabled:opacity-50 disabled:pointer-events-none";
  
  const variants: any = {
    primary: "bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-[0_4px_15px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.4)] focus:ring-[#4F46E5]",
    secondary: "bg-white/5 text-[#FAFAFA] border border-white/[0.08] hover:bg-white/10 focus:ring-white/20",
    ghost: "bg-transparent text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/5 focus:ring-white/20",
    outline: "bg-transparent text-[#FAFAFA] border border-white/[0.08] hover:bg-white/5 focus:ring-white/20",
    danger: "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 hover:bg-[#EF4444]/20 focus:ring-[#EF4444]",
    success: "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 hover:bg-[#22C55E]/20 focus:ring-[#22C55E]",
  };

  return (
    <button ref={ref} className={`${baseStyles} ${variants[variant]} px-4 py-2 text-sm ${className}`} {...props}>
      {children}
    </button>
  );
});

export const Input = React.forwardRef<HTMLInputElement, any>(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full px-4 h-11 bg-white/5 border border-white/[0.08] rounded-xl text-sm text-[#FAFAFA] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all shadow-inner ${className}`}
      {...props}
    />
  );
});

export const Textarea = React.forwardRef<HTMLTextAreaElement, any>(({ className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full px-4 py-3 bg-white/5 border border-white/[0.08] rounded-xl text-sm text-[#FAFAFA] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all shadow-inner resize-none ${className}`}
      {...props}
    />
  );
});

export const Card = ({ variant = "standard", className = "", children, ...props }: any) => {
  const variants: any = {
    standard: "bg-[rgba(255,255,255,0.02)] border border-white/[0.08]",
    glass: "bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
    interactive: "bg-[rgba(255,255,255,0.02)] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15] cursor-pointer transition-all duration-200",
  };
  return (
    <div className={`rounded-[24px] overflow-hidden ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-[#09090B]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#09090B]/90 backdrop-blur-2xl rounded-[24px] shadow-[0_24px_48px_rgba(0,0,0,0.8)] border border-white/[0.08] w-full max-w-lg flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {title && (
          <div className="flex justify-between items-center p-5 border-b border-white/[0.08] bg-white/[0.02]">
            <h2 className="text-base font-semibold text-[#FAFAFA]">{title}</h2>
            <button onClick={onClose} className="text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/5 p-1.5 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
        <div className="p-5 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Badge = ({ variant = "primary", className = "", children }: any) => {
  const variants: any = {
    primary: "bg-[#4F46E5]/20 text-[#4F46E5] border border-[#4F46E5]/30",
    success: "bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30",
    warning: "bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30",
    danger: "bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30",
    default: "bg-white/10 text-[#A1A1AA] border border-white/10",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const Avatar = ({ fallback, src, size = "md", className = "" }: any) => {
  const sizes: any = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
  };
  return (
    <div className={`relative rounded-xl flex items-center justify-center font-bold overflow-hidden shadow-inner bg-gradient-to-tr from-[#4F46E5] to-[#818CF8] text-[#FAFAFA] ${sizes[size]} ${className}`}>
      {src ? <img src={src} alt="avatar" className="w-full h-full object-cover" /> : fallback}
    </div>
  );
};

export const Spinner = ({ size = "md", className = "" }: any) => {
  const sizes: any = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" };
  return (
    <svg className={`animate-spin text-[#4F46E5] ${sizes[size]} ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};

export const Divider = ({ className = "" }: any) => (
  <div className={`w-full h-px bg-white/[0.08] my-4 ${className}`} />
);

export const SectionHeader = ({ title, description, actions }: any) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
    <div>
      <h2 className="text-xl font-semibold text-[#FAFAFA]">{title}</h2>
      {description && <p className="text-sm text-[#A1A1AA] mt-1">{description}</p>}
    </div>
    {actions && <div className="flex items-center gap-2">{actions}</div>}
  </div>
);

export const GlassPanel = ({ children, className = "" }: any) => (
  <div className={`bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-[24px] p-6 ${className}`}>
    {children}
  </div>
);

export const EmptyState = ({ icon, title, description, action }: any) => (
  <div className="flex flex-col items-center justify-center p-12 text-center border border-white/[0.08] border-dashed rounded-[24px] bg-white/[0.02]">
    <div className="w-16 h-16 rounded-2xl bg-white/[0.05] flex items-center justify-center text-[#A1A1AA] mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-[#FAFAFA] mb-2">{title}</h3>
    <p className="text-sm text-[#A1A1AA] max-w-sm mb-6">{description}</p>
    {action}
  </div>
);

export const SearchBar = ({ className = "", ...props }: any) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg className="h-5 w-5 text-[#A1A1AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    </div>
    <input
      type="text"
      className="block w-full pl-10 pr-3 h-11 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-[#FAFAFA] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all"
      {...props}
    />
  </div>
);

"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const STEPS = [
  "Connecting to Shopify store...",
  "Fetching PageSpeed data...",
  "Analyzing Core Web Vitals...",
  "Calculating revenue leak...",
  "Finalizing your report..."
];

export default function AnalysisLoading() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Disable scrolling on body
    document.body.style.overflow = "hidden";

    const duration = 15000; // 15 seconds
    const intervalTime = 100;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + increment, 100);
        
        // Update steps based on progress
        const stepIndex = Math.floor((newProgress / 100) * STEPS.length);
        if (stepIndex < STEPS.length) setCurrentStep(stepIndex);
        
        return newProgress;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background px-6 text-center">
      {/* --- Background Effects --- */}
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      {/* --- Scanner Animation --- */}
      <div className="relative mb-12 flex h-32 w-32 items-center justify-center sm:h-44 sm:w-44 sm:mb-16 md:h-52 md:w-52">
        {/* Pulsing Outer Ring */}
        <div className="absolute inset-0 animate-ping rounded-full bg-accent/20" />
        {/* Rotating Radar Line */}
        <div className="absolute inset-0 animate-[spin_3s_linear_infinite] rounded-full border border-accent/30 border-t-accent" />
        
        <svg viewBox="0 0 24 24" fill="none" className="text-accent animate-pulse w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* --- Progress Text --- */}
      <div className="z-10 w-full max-w-xs sm:max-w-sm md:max-w-md">
        <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl">Analyzing Store</h2>
        <p className="mb-8 text-sm text-muted sm:text-base md:mb-12">Please wait while we calculate your results...</p>

        {/* --- Progress Bar --- */}
        <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-white/5 border border-white/5 sm:h-2.5 md:mb-12">
          <div 
            className="h-full bg-accent transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(0,212,126,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* --- Steps List --- */}
        <div className="space-y-4 text-left sm:space-y-5">
          {STEPS.map((step, index) => (
            <div 
              key={step} 
              className={`flex items-center gap-3 text-xs transition-all duration-500 sm:text-sm sm:gap-4 ${
                index <= currentStep ? "text-white opacity-100" : "text-subtle opacity-40"
              }`}
            >
              <div className={`h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2 ${
                index < currentStep ? "bg-accent" : index === currentStep ? "bg-accent animate-pulse" : "bg-white/20"
              }`} />
              <span className={index === currentStep ? "font-bold text-accent" : ""}>
                {step}
              </span>
              {index < currentStep && (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="ml-auto text-accent sm:w-4 sm:h-4">
                  <path d="M13.3 4.3 6 11.6 2.7 8.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- Marketing Fact (Footer) --- */}
      <div className="absolute bottom-8 px-6 sm:bottom-12">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 sm:text-xs">
          Pro Tip: A 1s delay reduces conversion by 7%
        </p>
      </div>
    </div>,
    document.body
  );
}

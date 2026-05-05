"use client";

import { useState, useMemo } from "react";

export default function RevenueCalculator() {
  const [visitors, setVisitors] = useState(50000);
  const [aov, setAov] = useState(85);
  const [cr, setCr] = useState(2.1);

  // Logic: Every 1s improvement in speed can increase CR by ~7% (standard benchmark)
  // Let's assume an "Optimized" store is 2s faster or has a 20% CR lift potential.
  const liftPotential = 0.20; 
  
  const currentMonthlyRev = useMemo(() => visitors * aov * (cr / 100), [visitors, aov, cr]);
  const optimizedMonthlyRev = useMemo(() => currentMonthlyRev * (1 + liftPotential), [currentMonthlyRev]);
  const monthlyLeak = useMemo(() => optimizedMonthlyRev - currentMonthlyRev, [currentMonthlyRev, optimizedMonthlyRev]);
  const annualLeak = useMemo(() => monthlyLeak * 12, [monthlyLeak]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="glass-card mt-12 overflow-hidden border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* --- Inputs --- */}
        <div className="p-8 lg:border-r lg:border-white/10">
          <h3 className="mb-6 text-xl font-bold text-white">Revenue Leak Calculator</h3>
          <p className="mb-8 text-sm text-muted">Adjust the sliders to match your store&apos;s actual performance metrics.</p>
          
          <div className="space-y-8">
            {/* Visitors */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <label className="text-muted">Monthly Visitors</label>
                <span className="font-mono text-accent">{visitors.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="1000" max="500000" step="1000"
                value={visitors} onChange={(e) => setVisitors(Number(e.target.value))}
                className="w-full accent-accent bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* AOV */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <label className="text-muted">Average Order Value (AOV)</label>
                <span className="font-mono text-accent">${aov}</span>
              </div>
              <input 
                type="range" min="10" max="500" step="5"
                value={aov} onChange={(e) => setAov(Number(e.target.value))}
                className="w-full accent-accent bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* CR */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <label className="text-muted">Conversion Rate (%)</label>
                <span className="font-mono text-accent">{cr}%</span>
              </div>
              <input 
                type="range" min="0.1" max="10" step="0.1"
                value={cr} onChange={(e) => setCr(Number(e.target.value))}
                className="w-full accent-accent bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* --- Result --- */}
        <div className="flex flex-col justify-center bg-danger/5 p-8 text-center lg:p-12">
          <span className="mb-2 text-sm font-semibold uppercase tracking-widest text-danger">Estimated Monthly Leak</span>
          <div className="mb-2 text-5xl font-black tracking-tighter text-danger sm:text-6xl">
            {formatCurrency(monthlyLeak)}
          </div>
          <p className="text-muted italic">That&apos;s {formatCurrency(annualLeak)} leaking every year.</p>
          
          <div className="mt-8 rounded-xl bg-white/5 p-4 border border-white/5">
            <p className="text-xs leading-relaxed text-muted/80 font-medium">
              *Calculated based on a 20% conversion lift potential from optimizing Core Web Vitals to recommended benchmarks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

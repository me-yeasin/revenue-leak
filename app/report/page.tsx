import RevenueCalculator from "@/components/RevenueCalculator";

// Mock data for initial design phase
const MOCK_DATA = {
  url: "mystore.myshopify.com",
  score: 42,
  metrics: [
    { label: "LCP", value: "4.8s", status: "Poor", color: "text-danger" },
    { label: "INP", value: "280ms", status: "Needs Work", color: "text-warning" },
    { label: "CLS", value: "0.12", status: "Good", color: "text-accent" },
  ]
};

export default function ReportPage() {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-accent border-accent/20 bg-accent/5";
    if (score >= 50) return "text-warning border-warning/20 bg-warning/5";
    return "text-danger border-danger/20 bg-danger/5";
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* --- Background Elements --- */}
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

      {/* --- Header --- */}
      <nav className="relative z-10 border-b border-white/5 bg-background/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-1.5 text-base font-semibold tracking-tight sm:text-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-accent sm:w-5 sm:h-5">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-white">Revenue<span className="text-accent">Leak</span></span>
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden text-xs text-muted lg:block font-medium mr-2">Auditing: <span className="text-white/80">{MOCK_DATA.url}</span></span>
            
            <button className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/3 px-2.5 py-1.5 text-[10px] font-bold text-white transition-all hover:bg-white/10 hover:border-white/20 cursor-pointer sm:gap-2 sm:px-3 sm:text-xs">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent sm:w-3.5 sm:h-3.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span className="hidden xs:inline">Download</span><span className="inline xs:hidden">PDF</span>
            </button>

            <a href="/" className="rounded-lg border border-white/10 px-2.5 py-1.5 text-[10px] font-bold text-white transition-colors hover:bg-white/5 sm:px-3 sm:text-xs">
              New<span className="hidden xs:inline"> Audit</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12 lg:py-16">
        
        {/* --- Hero Section: Big Score --- */}
        <section className="text-center">
          <div className="animate-fade-in-up mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] font-semibold tracking-wider text-white/70 uppercase sm:text-xs">
            Performance Report
          </div>
          <h1 className="animate-fade-in-up delay-100 mb-8 text-2xl font-bold text-white sm:mb-12 sm:text-3xl md:text-4xl">
            Your Audit Results
          </h1>

          <div className="animate-fade-in-up delay-200 flex flex-col items-center justify-center">
            <div className={`relative flex h-36 w-36 items-center justify-center rounded-full shadow-[0_0_50px_-12px] sm:h-48 sm:w-48 ${getScoreColor(MOCK_DATA.score).split(' border-')[0]} bg-white/5`}>
              <div className="text-center">
                <span className={`block text-4xl font-black sm:text-6xl ${getScoreColor(MOCK_DATA.score).split(' border-')[0].split(' bg-')[0]}`}>{MOCK_DATA.score}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 sm:text-sm">Score</span>
              </div>
              {/* --- Synchronized SVG Rings --- */}
              <svg className="absolute inset-0 -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
                {/* Background Track (Static Border) */}
                <circle
                  cx="50" cy="50" r="46"
                  fill="none" stroke="currentColor" strokeWidth="4"
                  className="opacity-10"
                />
                {/* Progress Ring (Dynamic) */}
                <circle
                  cx="50" cy="50" r="46"
                  fill="none" stroke="currentColor" strokeWidth="4"
                  strokeDasharray="289"
                  strokeDashoffset={289 - (289 * MOCK_DATA.score) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
            </div>
            <p className="mt-6 max-w-md text-sm text-muted sm:mt-8 sm:text-base">
              Your store&apos;s performance is currently <span className={`font-bold ${getScoreColor(MOCK_DATA.score).split(' border-')[0].split(' bg-')[0]}`}>Poor</span>. 
              Customers are likely bouncing before they even see your products.
            </p>
          </div>
        </section>

        {/* --- Metric Grid --- */}
        <section className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {MOCK_DATA.metrics.map((metric, i) => (
            <div 
              key={metric.label} 
              className={`glass-card animate-fade-in-up p-6 text-center delay-${(i + 3) * 100}`}
            >
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/90">
                {metric.label}
              </span>
              <div className={`mb-1 text-3xl font-black ${metric.color}`}>
                {metric.value}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                {metric.status}
              </span>
            </div>
          ))}
        </section>

        {/* --- Revenue Calculator Section --- */}
        <section className="mt-24">
          <div className="animate-fade-in-up delay-600 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">The Cost of Being Slow</h2>
            <p className="mx-auto max-w-xl text-muted">
              Performance isn&apos;t just a tech metric—it&apos;s a financial one. Use the calculator below to see how much your speed is impacting your bottom line.
            </p>
          </div>
          
          <div className="animate-fade-in-up delay-700">
            <RevenueCalculator />
          </div>
        </section>

        {/* --- Benchmark Comparison Section --- */}
        <section className="mt-24">
          <div className="animate-fade-in-up delay-800 text-center mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">The Performance Gap</h2>
            <p className="mx-auto max-w-xl text-muted">
              See how your current Shopify store compares to an optimized Next.js Headless storefront.
            </p>
          </div>

          <div className="animate-fade-in-up delay-900 space-y-8 glass-card p-8 sm:p-10 border-white/10 bg-white/2">
            {/* Current Store Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-white">Your Current Shopify Store</span>
                <span className="text-xl font-bold text-danger">{MOCK_DATA.score} <span className="text-xs text-subtle font-normal">/ 100</span></span>
              </div>
              <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-danger transition-all duration-1000 ease-out"
                  style={{ width: `${MOCK_DATA.score}%` }}
                />
              </div>
            </div>

            {/* Benchmark Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-white">Optimized Next.js Headless Store</span>
                <span className="text-xl font-bold text-accent">98 <span className="text-xs text-subtle font-normal">/ 100</span></span>
              </div>
              <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,212,126,0.4)]"
                  style={{ width: `98%` }}
                />
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="text-center text-sm text-muted">
                <span className="text-white font-semibold">The Gap:</span> By migrating to a modern tech stack, you could improve your speed score by <span className="text-accent font-bold">+{98 - MOCK_DATA.score}%</span>.
              </p>
            </div>
          </div>
        </section>

        {/* --- Booking CTA --- */}
        <section className="mt-24 relative">
          {/* Subtle Glow Background */}
          <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 rounded-2xl bg-white/[0.02] p-8 text-center border border-white/10 shadow-[0_0_40px_-15px_rgba(0,212,126,0.15)] sm:p-12 backdrop-blur-sm overflow-hidden group hover:border-accent/20 transition-colors duration-500">
            {/* Inner Gradient Accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />
            
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">Ready to stop the leak?</h2>
            <p className="mx-auto mb-8 max-w-xl text-muted text-lg leading-relaxed">
              We specialize in building ultra-fast headless Shopify storefronts that consistently hit 90+ scores and maximize revenue.
            </p>
            <button className="relative rounded-xl bg-accent px-8 py-4 text-lg font-bold text-background transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(0,212,126,0.25)] hover:shadow-[0_0_40px_rgba(0,212,126,0.4)] cursor-pointer">
              Book a Free 20-Min Strategy Call
            </button>
            <p className="mt-6 text-xs text-muted/60 font-medium tracking-wide">No obligation. Just a clear roadmap to a faster store.</p>
          </div>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer className="border-t border-white/5 py-12 text-center">
        <p className="text-xs text-subtle">
          &copy; {new Date().getFullYear()} RevenueLeak. Built for Shopify store owners who care about speed.
        </p>
      </footer>
    </div>
  );
}

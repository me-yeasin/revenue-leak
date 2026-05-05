import AuditForm from "@/components/AuditForm";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* ── Background Layers ── */}
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid" />

      {/* ── Navigation ── */}
      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="/" className="flex items-center gap-1.5 text-lg font-semibold tracking-tight sm:text-xl">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-accent">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-white">
            Revenue<span className="text-accent">Leak</span>
          </span>
        </a>
        <a
          href="#features"
          className="text-sm text-muted transition-colors hover:text-white"
        >
          How it works
        </a>
      </nav>

      {/* ── Hero Section ── */}
      <main className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 pt-16 text-center sm:px-8 sm:pt-24 lg:pt-28">
        {/* Badge */}
        <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/6 bg-white/3 px-4 py-1.5 text-xs text-muted sm:text-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Free Shopify Speed &amp; Revenue Audit
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up delay-100 text-[2rem] font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
          How Much Revenue Is{" "}
          <br className="hidden sm:block" />
          Your Slow Store{" "}
          <span className="bg-linear-to-r from-accent to-[#00B86B] bg-clip-text text-transparent">
            Leaking?
          </span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up delay-200 mt-5 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
          Enter your Shopify store URL and get a free, instant report showing
          your speed score, Core Web Vitals, and the exact dollar amount your
          slow load times cost you every month.
        </p>

        {/* Trust Badges */}
        <div className="animate-fade-in-up delay-300 mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-subtle sm:mt-8 sm:text-sm">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13.3 4.3 6 11.6 2.7 8.3" stroke="#00D47E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            100% Free
          </span>
          <span className="text-white/10">•</span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13.3 4.3 6 11.6 2.7 8.3" stroke="#00D47E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            No Sign-up
          </span>
          <span className="text-white/10">•</span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13.3 4.3 6 11.6 2.7 8.3" stroke="#00D47E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            15-Second Analysis
          </span>
        </div>

        {/* ── URL Input (Client Component) ── */}
        <AuditForm />

        {/* Powered-by note */}
        <p className="animate-fade-in-up delay-500 mt-4 text-xs text-subtle/70">
          Powered by Google PageSpeed Insights API
        </p>
      </main>

      {/* ── Feature Preview Cards ── */}
      <section
        id="features"
        className="relative z-10 mx-auto mt-20 max-w-5xl px-5 pb-24 sm:mt-28 sm:px-8"
      >
        <p className="animate-fade-in-up delay-500 mb-8 text-center text-sm font-medium uppercase tracking-widest text-subtle sm:mb-10">
          What You&apos;ll Get in Your Report
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 – Speed Score */}
          <div className="glass-card animate-fade-in-up delay-500 group p-6 sm:p-7">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/15">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">
              Speed Score
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              Get a color-coded 0–100 performance grade for your store — instantly see if you&apos;re in the green, yellow, or red zone.
            </p>
          </div>

          {/* Card 2 – Revenue Calculator */}
          <div className="glass-card animate-fade-in-up delay-600 group p-6 sm:p-7">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-danger/10 text-danger transition-colors group-hover:bg-danger/15">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">
              Revenue Leak Calculator
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              See the exact dollar amount your slow load times are costing you every month — personalized to your traffic and prices.
            </p>
          </div>

          {/* Card 3 – Benchmark Chart */}
          <div className="glass-card animate-fade-in-up delay-700 group p-6 sm:p-7 sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-warning/10 text-warning transition-colors group-hover:bg-warning/15">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="12" width="4" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="10" y="7" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="17" y="3" width="4" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">
              Performance Benchmark
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              Compare your store side-by-side against an optimized headless storefront and see the performance gap at a glance.
            </p>
          </div>
        </div>
      </section>

      {/* ── Bottom Gradient Fade ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-background to-transparent" />
    </div>
  );
}

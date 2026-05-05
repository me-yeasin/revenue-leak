import Link from "next/link";
import RevenueCalculator from "@/components/RevenueCalculator";
import AnalysisLoading from "@/components/AnalysisLoading";
import { fetchPageSpeedData } from "@/lib/data";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<{ url?: string }>;
};

export default function ReportPage({ searchParams }: PageProps) {
  // Next.js 16 best practice: Use Suspense to stream dynamic searchParams and data-heavy report
  // We use the beautiful AnalysisLoading component as the fallback so it shows instantly
  // when the client router pushes to this page.
  return (
    <Suspense fallback={<AnalysisLoading />}>
      <ReportLoader searchParams={searchParams} />
    </Suspense>
  );
}

async function ReportLoader({ searchParams }: PageProps) {
  const { url } = await searchParams;

  if (!url) {
    return <MissingUrlError />;
  }

  return <ReportContent url={url} />;
}

function MissingUrlError() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-5 sm:px-8">
      {/* --- Background Elements --- */}
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

      {/* --- Error Content --- */}
      <div className="glass-card relative z-10 flex w-full max-w-md animate-fade-in-up flex-col items-center p-8 text-center sm:p-12">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 sm:h-20 sm:w-20">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-warning sm:w-10 sm:h-10">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        
        <h1 className="mb-3 text-2xl font-bold text-white sm:text-3xl">Missing Store URL</h1>
        <p className="mb-8 text-sm leading-relaxed text-muted sm:text-base">
          We need a Shopify store URL to run the performance analysis and calculate your potential revenue leak.
        </p>

        <Link 
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/15 active:scale-[0.98] sm:w-auto sm:text-base border border-white/5 hover:border-white/20"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}

async function ReportContent({ url }: { url: string }) {
  const data = await fetchPageSpeedData(url);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-white">
        <p>Failed to analyze store. Please check the URL and try again.</p>
      </div>
    );
  }

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
            <span className="hidden text-xs text-muted lg:block font-medium mr-2">Auditing: <span className="text-white/80">{data.url}</span></span>
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
            <div className={`relative flex h-36 w-36 items-center justify-center rounded-full shadow-[0_0_50px_-12px] sm:h-48 sm:w-48 ${getScoreColor(data.score).split(' border-')[0]} bg-white/5`}>
              <div className="text-center">
                <span className={`block text-4xl font-black sm:text-6xl ${getScoreColor(data.score).split(' border-')[0].split(' bg-')[0]}`}>{data.score}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 sm:text-sm">Score</span>
              </div>
              <svg className="absolute inset-0 -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-10" />
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="289" strokeDashoffset={289 - (289 * data.score) / 100} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
              </svg>
            </div>
            <p className="mt-6 max-w-md text-sm text-muted sm:mt-8 sm:text-base">
              Your store&apos;s performance is currently <span className={`font-bold ${getScoreColor(data.score).split(' border-')[0].split(' bg-')[0]}`}>
                {data.score >= 90 ? "Excellent" : data.score >= 50 ? "Average" : "Poor"}
              </span>. 
              {data.score < 90 && " Customers are likely bouncing before they even see your products."}
            </p>
          </div>
        </section>

        {/* --- Metric Grid --- */}
        <section className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {data.metrics.map((metric, i) => (
            <div key={metric.label} className={`glass-card animate-fade-in-up p-6 text-center delay-${(i + 3) * 100}`}>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/90">{metric.label}</span>
              <div className={`mb-1 text-3xl font-black ${metric.color}`}>{metric.value}</div>
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">{metric.status}</span>
            </div>
          ))}
        </section>

        {/* --- Revenue Calculator Section --- */}
        <section className="mt-24">
          <div className="animate-fade-in-up delay-600 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">The Cost of Being Slow</h2>
            <p className="mx-auto max-w-xl text-muted">Performance isn&apos;t just a tech metric—it&apos;s a financial one.</p>
          </div>
          <div className="animate-fade-in-up delay-700">
            <RevenueCalculator score={data.score} />
          </div>
        </section>

        {/* --- Benchmark Comparison Section --- */}
        <section className="mt-24">
          <div className="animate-fade-in-up delay-800 text-center mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">The Performance Gap</h2>
            <p className="mx-auto max-w-xl text-muted">See how your current Shopify store compares to an optimized Next.js Headless storefront.</p>
          </div>
          <div className="animate-fade-in-up delay-900 space-y-8 glass-card p-8 sm:p-10 border-white/10 bg-white/2">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-white">Your Current Shopify Store</span>
                <span className={`text-xl font-bold ${getScoreColor(data.score).split(' border-')[0].split(' bg-')[0]}`}>{data.score} <span className="text-xs text-subtle font-normal">/ 100</span></span>
              </div>
              <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${getScoreColor(data.score).split(' border-')[0].split(' bg-')[0].replace('text-', 'bg-')} transition-all duration-1000 ease-out`} style={{ width: `${data.score}%` }} />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-white">Optimized Next.js Headless Store</span>
                <span className="text-xl font-bold text-accent">98 <span className="text-xs text-subtle font-normal">/ 100</span></span>
              </div>
              <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-accent transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,212,126,0.4)]" style={{ width: `98%` }} />
              </div>
            </div>
          </div>
        </section>

        {/* --- Booking CTA --- */}
        <section className="mt-24 relative">
          <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative z-10 rounded-2xl bg-white/[0.02] p-8 text-center border border-white/10 shadow-[0_0_40px_-15px_rgba(0,212,126,0.15)] sm:p-12 backdrop-blur-sm overflow-hidden group hover:border-accent/20 transition-colors duration-500">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">Ready to stop the leak?</h2>
            <p className="mx-auto mb-8 max-w-xl text-muted text-lg leading-relaxed">We specialize in building ultra-fast headless Shopify storefronts.</p>
            <a 
              href={`mailto:your@email.com?subject=${encodeURIComponent(`Strategy Call Request: ${data.url}`)}&body=${encodeURIComponent(`Hi,\n\nI just ran an audit on my store (${data.url}) and received a performance score of ${data.score}.\n\nI'd like to book a strategy call to discuss fixing this and plugging my revenue leak.\n\nThanks!`)}`}
              className="relative inline-block rounded-xl bg-accent px-8 py-4 text-lg font-bold text-background transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(0,212,126,0.25)] hover:shadow-[0_0_40px_rgba(0,212,126,0.4)] cursor-pointer"
            >
              Book a Free 20-Min Strategy Call
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

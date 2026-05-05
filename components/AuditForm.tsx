"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import AnalysisLoading from "./AnalysisLoading";

export default function AuditForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get("url") as string;
    
    if (!url) return;

    // Validate URL (simple check)
    let cleanUrl = url;
    if (!url.startsWith("http")) {
      cleanUrl = `https://${url}`;
    }

    // Next.js 16 Best Practice: useTransition for client routing.
    // This instantly shows the loading portal (0ms) and automatically 
    // resets to false when the Next.js router completes the navigation.
    startTransition(() => {
      router.push(`/report?url=${encodeURIComponent(cleanUrl)}`);
    });
  };

  return (
    <>
      {isPending && <AnalysisLoading />}
      <form
        onSubmit={handleSubmit}
        className="animate-fade-in-up delay-400 mt-8 w-full max-w-xl sm:mt-10"
      >
        <div className="input-container animate-pulse-glow flex flex-col gap-2 p-2 sm:flex-row sm:items-center sm:gap-0">
          <div className="flex flex-1 items-center gap-2.5 px-3 sm:px-4">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="shrink-0 text-subtle">
              <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 10h16M10 2a12.3 12.3 0 0 1 3 8 12.3 12.3 0 0 1-3 8 12.3 12.3 0 0 1-3-8 12.3 12.3 0 0 1 3-8Z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input
              type="text"
              name="url"
              id="store-url-input"
              placeholder="yourstore.myshopify.com"
              autoComplete="url"
              required
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-subtle sm:text-base"
            />
          </div>
          <button
            type="submit"
            id="analyze-button"
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-background transition-all hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(0,212,126,0.25)] active:scale-[0.98] sm:px-6 sm:text-base cursor-pointer"
          >
            Analyze My Store
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}

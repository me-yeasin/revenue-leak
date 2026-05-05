"use server";

import { redirect } from "next/navigation";

export async function startAudit(formData: FormData) {
  const url = formData.get("url") as string;
  
  if (!url) return;

  // Validate URL (simple check)
  let cleanUrl = url;
  if (!url.startsWith("http")) {
    cleanUrl = `https://${url}`;
  }

  // We redirect to the report page with the URL as a search parameter.
  // The Report Page (Server Component) will handle the actual API fetching
  // to leverage Next.js 16's "use cache" and Streaming/Suspense.
  redirect(`/report?url=${encodeURIComponent(cleanUrl)}`);
}

export async function fetchPageSpeedData(url: string) {
  const API_KEY = process.env.PAGESPEED_API_KEY;
  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url
  )}&strategy=mobile&category=performance${API_KEY ? `&key=${API_KEY}` : ""}`;

  try {
    const res = await fetch(endpoint, {
      // In Next.js 16, we can use the 'use cache' directive in a separate file,
      // but for this fetch, we'll use a 1-hour revalidation.
      next: { revalidate: 3600 } 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch PageSpeed data");
    }

    const data = await res.json();
    const lighthouse = data.lighthouseResult;

    return {
      url,
      score: Math.round(lighthouse.categories.performance.score * 100),
      metrics: [
        { 
          label: "LCP", 
          value: lighthouse.audits["largest-contentful-paint"].displayValue, 
          status: getStatus(lighthouse.audits["largest-contentful-paint"].score, "LCP"),
          color: getColor(lighthouse.audits["largest-contentful-paint"].score)
        },
        { 
          label: "INP", 
          value: lighthouse.audits["interactive"].displayValue, 
          status: getStatus(lighthouse.audits["interactive"].score, "INP"),
          color: getColor(lighthouse.audits["interactive"].score)
        },
        { 
          label: "CLS", 
          value: lighthouse.audits["cumulative-layout-shift"].displayValue, 
          status: getStatus(lighthouse.audits["cumulative-layout-shift"].score, "CLS"),
          color: getColor(lighthouse.audits["cumulative-layout-shift"].score)
        },
      ]
    };
  } catch (error) {
    console.error("Audit Error:", error);
    return null;
  }
}

function getStatus(score: number, type: string) {
  if (score >= 0.9) return "Good";
  if (score >= 0.5) return "Needs Work";
  return "Poor";
}

function getColor(score: number) {
  if (score >= 0.9) return "text-accent";
  if (score >= 0.5) return "text-warning";
  return "text-danger";
}

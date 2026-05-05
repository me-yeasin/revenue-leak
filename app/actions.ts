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

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Revenue Leak Calculator — How Much Is Your Slow Shopify Store Costing You?",
  description:
    "Free instant speed audit for Shopify stores. Enter your URL and discover exactly how much revenue your slow load times are costing you every month — no sign-up required.",
  keywords: [
    "Shopify speed test",
    "revenue leak calculator",
    "Shopify performance audit",
    "Core Web Vitals",
    "ecommerce speed optimization",
  ],
  openGraph: {
    title: "Revenue Leak Calculator",
    description:
      "Discover how much money your slow Shopify store is leaking every month.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">{children}</body>
    </html>
  );
}

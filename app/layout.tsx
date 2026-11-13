import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import "./globals.css";
import "./resume/resume.css";
import "./refinements.css";
import { resume } from "@/content/resume";

const inter = localFont({
  src: [
    { path: "./fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Inter-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Inter-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});
// Locally available geometric alternative; Space Grotesk awaits visual review.
const geist = localFont({
  src: "./fonts/Geist-Latin.woff2",
  variable: "--font-geist",
  display: "swap",
  weight: "100 900",
  preload: true,
});
const mono = localFont({
  src: "./fonts/GeistMono-Latin.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "100 900",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "BI — Benita Idachaba | Data Analyst",
    template: "%s | BI — Benita Idachaba",
  },
  description:
    "Data Analyst in Abuja, Nigeria, with experience in SQL, Python, Power BI, healthcare analytics and workflow automation.",
  applicationName: "BI — Benita Idachaba",
  openGraph: {
    title: "BI — Benita Idachaba | Data Analyst",
    description:
      "Data analytics, business intelligence and reporting portfolio.",
    type: "website",
  },
  robots: { index: false, follow: false }, // Local checkpoint preview; publication approval is separate.
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geist.variable} ${mono.variable}`}
    >
      <body id="top">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation pdfUrl={resume.pdf.url} filename={resume.pdf.filename} />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { resume } from "@/content/resume";
import { ResumeDocument } from "@/components/resume/resume-document";
import { PrintButton } from "@/components/resume/print-button";

export const metadata: Metadata = {
  title: "Data Analyst Resume",
  description:
    "Read Benita Idachaba’s complete HTML resume or download the ATS-friendly Data Analyst PDF.",
};
export default function ResumePage() {
  return (
    <main id="main" tabIndex={-1} className="container resume-page">
      <div className="resume-page-controls">
        <Link href="/" className="text-link">
          <ArrowLeft size={18} aria-hidden="true" />
          Back to portfolio
        </Link>
      </div>
      <header className="resume-page-heading">
        <p className="eyebrow">Professional experience · Skills · Education</p>
        <h1>Data Analyst Resume</h1>
        <p>
          My complete experience in analytics, business intelligence and data
          operations. Read it below or download a copy.
        </p>
        <div className="resume-page-actions">
          <a
            className="button button-primary"
            href={resume.pdf.url}
            download={resume.pdf.filename}
          >
            <Download size={18} aria-hidden="true" />
            Download Resume<span className="sr-only"> (PDF)</span>
          </a>
          <a className="text-link" href="#html-resume">
            Read HTML resume ↓
          </a>
          <PrintButton />
        </div>
        <p className="resume-file-note">PDF · 2 pages · Selectable text</p>
      </header>
      <section
        id="html-resume"
        className="resume-html-section"
        aria-label="Full HTML resume"
      >
        <ResumeDocument />
      </section>
      <nav className="resume-profile-links" aria-label="Professional profiles">
        {resume.links.map((link) => (
          <a className="text-link" key={link.url} href={link.url}>
            {link.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </main>
  );
}

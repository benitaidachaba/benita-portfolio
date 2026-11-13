import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { resume } from "@/content/resume";
import { ResumeDocument } from "@/components/resume/resume-document";
import { PrintButton } from "@/components/resume/print-button";
import "./resume.css";

export const metadata: Metadata = {
  title: "Data Analyst Resume",
  description:
    "Read or download Benita Idachaba’s Data Analyst resume: reporting, business intelligence, data quality, SQL, Python and Power BI.",
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
          A closer look at my experience in analytics, reporting and data
          operations, with supporting work in automation and digital health
          systems.
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
      <section className="pdf-preview" aria-labelledby="pdf-preview-title">
        <div className="pdf-preview-heading">
          <h2 id="pdf-preview-title">PDF preview</h2>
          <a
            className="text-link"
            href={resume.pdf.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open PDF
            <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className="pdf-desktop-view">
          <iframe
            src={`${resume.pdf.url}#view=FitH`}
            title="Benita Idachaba Data Analyst resume PDF"
            loading="lazy"
          />
          <p className="resume-file-note">
            Viewer unavailable?{" "}
            <a href={resume.pdf.url}>Open the PDF directly</a> or read the
            complete HTML resume below.
          </p>
        </div>
        <p className="pdf-mobile-fallback">
          For the clearest mobile view, read the HTML version below, or use Open
          PDF to view it in your device’s PDF reader.
        </p>
      </section>
      <section
        id="html-resume"
        className="resume-html-section"
        aria-labelledby="html-resume-heading"
      >
        <div className="resume-html-heading">
          <h2 id="html-resume-heading">HTML resume</h2>
          <span>Readable on every screen. Ready to print.</span>
        </div>
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

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "Resume preview" };

export default function ResumePreview() {
  return (
    <main id="main" tabIndex={-1} className="container resume-page">
      <Link href="/" className="text-link">
        <ArrowLeft size={18} aria-hidden="true" />
        Back to portfolio
      </Link>
      <div className="resume-preview-heading">
        <p className="eyebrow">Professional overview · Content preview</p>
        <h1>Experience, at a glance.</h1>
        <p>
          The final resume, printable version and PDF download will be added
          after the dedicated resume content review.
        </p>
      </div>
      <section className="resume-preview-paper" aria-labelledby="resume-name">
        <div className="resume-paper-header">
          <div>
            <h2 id="resume-name">{profile.name}</h2>
            <p>Data Analyst · Abuja, Nigeria</p>
          </div>
          <FileText size={36} strokeWidth={1.2} aria-hidden="true" />
        </div>
        <p>{profile.summary}</p>
        <div className="resume-tool-list">
          {profile.coreTools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
        <div className="resume-scope">
          <h3>What the resume will cover</h3>
          <ul>
            <li>Professional experience in analytics and data management</li>
            <li>Reporting, data quality and supporting technical work</li>
            <li>Teaching, education and verified credentials</li>
          </ul>
        </div>
        <p className="preview-note">
          This is a visual preview, not the final resume. No PDF is available at
          this checkpoint.
        </p>
      </section>
      <a
        href={profile.linkedin}
        className="text-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        View LinkedIn profile
        <ArrowUpRight size={18} aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </main>
  );
}

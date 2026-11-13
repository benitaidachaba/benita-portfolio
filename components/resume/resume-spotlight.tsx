"use client";

import Link from "next/link";
import { ArrowUpRight, FileText, X } from "lucide-react";
import { useState } from "react";

export function ResumeSpotlight() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <aside
      className="resume-spotlight"
      aria-labelledby="resume-spotlight-title"
    >
      <div className="resume-icon" aria-hidden="true">
        <FileText size={26} strokeWidth={1.4} />
      </div>
      <div className="resume-spotlight-copy">
        <p className="eyebrow">The professional overview</p>
        <h2 id="resume-spotlight-title">A clearer view of my experience.</h2>
        <p>Analytics, reporting and the technical skills behind the work.</p>
        <span className="preview-note">
          Content preview · Final resume follows content review
        </span>
      </div>
      <Link href="/resume" className="text-link">
        Preview resume <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
      <button
        className="icon-button dismiss-resume"
        aria-label="Dismiss resume preview"
        onClick={() => setDismissed(true)}
      >
        <X size={18} aria-hidden="true" />
      </button>
    </aside>
  );
}

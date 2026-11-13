"use client";

import Link from "next/link";
import { ArrowUpRight, Download, FileText, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";

const storageKey = "benita-resume-spotlight-v1";
const updateEvent = "resume-spotlight-update";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(updateEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(updateEvent, callback);
  };
}
function snapshot() {
  try {
    return localStorage.getItem(storageKey) === "dismissed";
  } catch {
    return false;
  }
}
function serverSnapshot() {
  return false;
}

type PreviewContent = {
  eyebrow: string;
  heading: string;
  description: string;
  name: string;
  title: string;
  location: string;
  tools: readonly string[];
  pdfUrl: string;
  filename: string;
};

export function ResumeSpotlightPanel({ content }: { content: PreviewContent }) {
  const [dismissed, setDismissed] = useState(false);
  const storedDismissal = useSyncExternalStore(
    subscribe,
    snapshot,
    serverSnapshot,
  );
  if (dismissed || storedDismissal) return null;
  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(storageKey, "dismissed");
      window.dispatchEvent(new Event(updateEvent));
    } catch {
      /* Session dismissal still works if storage is unavailable. */
    }
    document
      .querySelector<HTMLAnchorElement>(".nav-resume")
      ?.focus({ preventScroll: true });
  }
  return (
    <aside
      className="resume-spotlight"
      aria-labelledby="resume-spotlight-title"
    >
      <div className="resume-icon" aria-hidden="true">
        <FileText size={26} strokeWidth={1.4} />
      </div>
      <div className="resume-spotlight-copy">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="resume-spotlight-title">{content.heading}</h2>
        <p>{content.description}</p>
        <details className="resume-mini-preview">
          <summary>Preview resume details</summary>
          <div>
            <strong>{content.name}</strong>
            <p>
              {content.title} · {content.location}
            </p>
            <p>{content.tools.join(" · ")}</p>
            <span>Experience · Teaching · Projects · Education</span>
          </div>
        </details>
      </div>
      <div className="resume-spotlight-actions">
        <Link href="/resume" className="text-link">
          View Resume <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
        <a
          href={content.pdfUrl}
          download={content.filename}
          className="text-link"
        >
          <Download size={16} aria-hidden="true" />
          Download PDF
        </a>
      </div>
      <button
        className="icon-button dismiss-resume"
        aria-label="Dismiss resume preview"
        type="button"
        onClick={dismiss}
      >
        <X size={18} aria-hidden="true" />
      </button>
    </aside>
  );
}

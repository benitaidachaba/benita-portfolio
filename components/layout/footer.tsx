import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <Link href="/" className="footer-name">
          Benita Idachaba<span>Data Analyst · Abuja, Nigeria</span>
        </Link>
        <div className="footer-links">
          <Link href="/resume">Resume</Link>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Benita Idachaba</span>
        <span>Clarity, from data to decision.</span>
      </div>
    </footer>
  );
}

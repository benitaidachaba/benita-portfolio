import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { resume } from "@/content/resume";
import { ActionLink } from "@/components/ui/action-link";
import { GlassStudy } from "./glass-study";
import { GlassMotion } from "./glass-motion";

export function Hero() {
  return (
    <section id="hero" className="hero-shell" aria-labelledby="hero-name">
      <div className="hero container">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">{profile.eyebrow}</p>
            <h1 id="hero-name">
              Benita Idachaba
              <span className="hero-role">
                Data Analyst<span aria-hidden="true">.</span>
              </span>
            </h1>
            <p className="hero-statement">{profile.headline}</p>
            <p className="hero-summary">{profile.summary}</p>
            <div className="hero-actions">
              <ActionLink href="#resume">View Resume</ActionLink>
              <a className="text-link" href="#projects">
                Explore Projects <ArrowDown size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-socials">
              <a href={resume.pdf.url} download={resume.pdf.filename}>
                Download Resume <Download aria-hidden="true" size={14} />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
                <ArrowUpRight aria-hidden="true" size={14} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <ArrowUpRight aria-hidden="true" size={14} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
          <GlassMotion>
            <GlassStudy />
          </GlassMotion>
        </div>
        <div className="hero-baseline">
          <div className="tool-strip" aria-label="Core analytical tools">
            {profile.coreTools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
          <span className="location">
            <MapPin size={14} aria-hidden="true" />
            {profile.location}
          </span>
        </div>
      </div>
    </section>
  );
}

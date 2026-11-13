import { ArrowUpRight, Braces, Layers3, ScanText } from "lucide-react";
import { Hero } from "@/components/hero/hero";
import { ResumeSpotlight } from "@/components/resume/resume-spotlight";
import { ProjectFoundation } from "@/components/projects/project-foundation";
import { SectionHeading } from "@/components/ui/section-heading";
import { capabilities } from "@/content/skills";
import { profile } from "@/content/profile";
import { projectPreviews } from "@/content/project-previews";

export default function Home() {
  const professional = projectPreviews[0];
  return (
    <main id="main" tabIndex={-1} className="homepage">
      <Hero />
      <ProjectFoundation />
      <ResumeSpotlight />
      <section id="systems" className="systems-section">
        <div className="container systems-grid">
          <div>
            <p className="eyebrow">03 / Systems & automation</p>
            <h2>
              Making information
              <br />
              work together.
            </h2>
            <p>
              My application-development work includes analytics and reporting
              components alongside document processing, operational workflows
              and automation.
            </p>
            <article className="professional-collection">
              <h3>{professional.title}</h3>
              <p>{professional.description}</p>
              <span className="systems-note">{professional.status}</span>
            </article>
          </div>
          <div className="systems-list">
            {[
              {
                icon: ScanText,
                title: "Intelligent document workflows",
                copy: "OCR, structured extraction and data validation.",
              },
              {
                icon: Layers3,
                title: "Connected reporting workflows",
                copy: "API integrations, transformation and reconciliation.",
              },
              {
                icon: Braces,
                title: "Purpose-built applications",
                copy: "Requirements, workflow design and reporting components.",
              },
            ].map((item) => (
              <div className="system-item" key={item.title}>
                <item.icon aria-hidden="true" size={24} strokeWidth={1.4} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="capabilities" className="section capabilities-section">
        <div className="container">
          <SectionHeading
            number="04"
            eyebrow="Technical capabilities"
            title="Analytical at the core."
            description="Data analytics first. Engineering, automation and application development add supporting depth."
          />
          <div className="capabilities-grid">
            {capabilities.map((group) => (
              <article className="capability" key={group.number}>
                <span className="capability-number">/{group.number}</span>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul>
                  {group.skills.slice(0, 3).map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="section-footnote">
            The complete skills list is in my resume. Power BI DAX remains an
            area of development.
          </p>
        </div>
      </section>
      <section id="contact" className="section container contact-section">
        <div>
          <p className="eyebrow">05 / Let’s connect</p>
          <h2>
            Clearer decisions
            <br />
            start with a conversation.
          </h2>
          <p>
            Based in Abuja, Nigeria. For Data Analyst opportunities,
            <br className="desktop-break" /> reporting challenges and technical
            conversations.
          </p>
        </div>
        <div className="contact-actions">
          <a className="button button-primary" href={`mailto:${profile.email}`}>
            Contact Me
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a
            className="text-link"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn
            <ArrowUpRight size={18} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>
    </main>
  );
}

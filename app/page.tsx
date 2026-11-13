import {
  ArrowUpRight,
  Braces,
  GraduationCap,
  Layers3,
  ScanText,
} from "lucide-react";
import { Hero } from "@/components/hero/hero";
import { ResumeSpotlight } from "@/components/resume/resume-spotlight";
import { ProjectFoundation } from "@/components/projects/project-foundation";
import { ExperienceSection } from "@/components/experience/experience-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { capabilities } from "@/content/skills";
import { profile } from "@/content/profile";

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      <div className="container">
        <ResumeSpotlight />
      </div>
      <ProjectFoundation />
      <section id="capabilities" className="section capabilities-section">
        <div className="container">
          <SectionHeading
            number="02"
            eyebrow="Technical capabilities"
            title="Analytical at the core."
            description="A practical toolkit for understanding data, communicating findings and building the workflows around them."
          />
          <div className="capabilities-grid">
            {capabilities.map((group) => (
              <article className="capability" key={group.number}>
                <span className="capability-number">/{group.number}</span>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul>
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="section-footnote">
            Skills reflect practical experience across roles. Power BI DAX is an
            area of continued development.
          </p>
        </div>
      </section>
      <ExperienceSection />
      <section className="systems-section">
        <div className="container systems-grid">
          <div>
            <p className="eyebrow">04 / Beyond the dashboard</p>
            <h2>
              Making information
              <br />
              work together.
            </h2>
            <p>
              Reporting is one part of the picture. My supporting experience
              spans intelligent document processing, workflow automation and
              application development.
            </p>
            <span className="systems-note">
              Systems case studies follow publication review.
            </span>
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
      <section className="section container teaching-section">
        <SectionHeading
          number="05"
          eyebrow="Teaching & learning"
          title="Knowledge is more useful shared."
        />
        <div className="teaching-grid">
          <div className="teaching-intro">
            <GraduationCap size={32} strokeWidth={1.4} aria-hidden="true" />
            <p>
              SQL teaching, debugging clinics and practical analytics exercises
              across student cohorts.
            </p>
            <span className="preview-note">
              Teaching dates and cohort totals are being confirmed.
            </span>
          </div>
          <div className="teaching-roles">
            <div>
              <h3>Digitally Drive Bootcamp</h3>
              <p>SQL Tutor</p>
            </div>
            <div>
              <h3>Bivy Tech</h3>
              <p>Lead Data Analysis Mentor</p>
            </div>
          </div>
          <div className="education-block">
            <p className="eyebrow">Education</p>
            <h3>B.Sc. Biological Sciences</h3>
            <p>University of Abuja · January 2025</p>
            <p className="education-note">
              ALX Data Analytics — completed, as supplied. Credential
              verification is pending.
            </p>
          </div>
        </div>
      </section>
      <section id="about" className="about-section">
        <div className="container about-grid">
          <p className="eyebrow">06 / A little context</p>
          <div>
            <h2>
              Curious about the data.
              <br />
              Attentive to the details.
            </h2>
            <p>
              I’m Benita, a Data Analyst based in Abuja, Nigeria. My experience
              brings together organizational reporting, healthcare analytics,
              data quality and the systems that help people use information.
            </p>
            <p>
              My background in biological sciences informs an interest in
              healthcare and the questions behind the numbers. Alongside
              analysis, I teach SQL and contribute to practical applications and
              automation workflows.
            </p>
          </div>
        </div>
      </section>
      <section id="contact" className="section container contact-section">
        <div>
          <p className="eyebrow">07 / Let’s connect</p>
          <h2>
            Have a question?
            <br />
            Let’s start a conversation.
          </h2>
          <p>
            For data analyst opportunities, technical conversations
            <br className="desktop-break" /> or a closer look at my experience.
          </p>
        </div>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          Connect on LinkedIn
          <ArrowUpRight size={28} strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </section>
    </main>
  );
}

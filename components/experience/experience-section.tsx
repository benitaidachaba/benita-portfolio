import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/ui/section-heading";

export function ExperienceSection() {
  return (
    <section id="experience" className="section container experience-section">
      <SectionHeading
        number="03"
        eyebrow="Professional experience"
        title="Analysis in practice."
        description="A foundation in reporting and data management, with experience connecting analytics to operational systems."
      />
      <div className="experience-list">
        {experience.map((job, i) => (
          <article className="experience-row" key={job.organization}>
            <div className="experience-date">
              <span
                className={`timeline-dot ${i === 0 ? "current" : ""}`}
                aria-hidden="true"
              />
              {job.start} — {job.end}
            </div>
            <div className="experience-job">
              <h3>{job.organization}</h3>
              <p className="role-label">{job.role}</p>
            </div>
            <p className="experience-summary">
              {job.summary ?? (
                <span className="pending-copy">
                  Role and dates supplied. Detailed responsibilities awaiting
                  confirmation.
                </span>
              )}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

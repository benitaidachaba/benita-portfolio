import { ArrowRight, ChartNoAxesCombined, Database } from "lucide-react";
import { projectPreviews } from "@/content/project-previews";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProjectFoundation() {
  return (
    <section
      id="projects"
      className="section container"
      aria-labelledby="projects-title"
    >
      <SectionHeading
        id="projects-title"
        number="01"
        eyebrow="Selected work"
        title="The question comes first."
        description="Analytics grounded in business context, careful data preparation and useful reporting."
      />
      <div className="project-grid">
        {projectPreviews.map((project, i) => (
          <article
            className={`project-card project-card-${i + 1}`}
            key={project.number}
          >
            <div className="project-visual" aria-hidden="true">
              <div className="project-visual-top">
                <span>COLLECTION / {project.number}</span>
                {i === 0 ? (
                  <ChartNoAxesCombined size={23} strokeWidth={1.3} />
                ) : (
                  <Database size={23} strokeWidth={1.3} />
                )}
              </div>
              <div className="workflow-illustration">
                {project.steps.map((step, index) => (
                  <div key={step}>
                    <span className="workflow-number">0{index + 1}</span>
                    <span>{step}</span>
                    {index < 2 && <ArrowRight size={16} />}
                  </div>
                ))}
              </div>
              <span className="visual-caption">
                ANALYTICAL APPROACH · CONCEPTUAL ILLUSTRATION
              </span>
            </div>
            <div className="project-card-copy">
              <p className="eyebrow">{project.label}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span className="content-status">
                <span aria-hidden="true" />
                {project.status}
              </span>
            </div>
          </article>
        ))}
      </div>
      <p className="section-footnote">
        Collection previews only. No client records, internal screenshots or
        unverified results are displayed.
      </p>
    </section>
  );
}

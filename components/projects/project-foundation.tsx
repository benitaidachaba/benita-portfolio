import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolioProjects } from "@/content/portfolio-projects";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProjectFoundation({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  return (
    <section
      id="projects"
      className="section container analytics-projects"
      aria-labelledby="projects-title"
    >
      <SectionHeading
        id="projects-title"
        number="01"
        eyebrow="Featured analytics projects"
        title="The question comes first."
        description="Four public portfolio projects, from campaign reporting to the data structures behind analysis."
      />
      <div className="project-grid">
        {portfolioProjects.map((project, index) => (
          <article className="project-card analytics-card" key={project.id}>
            <div className="analytics-card-top">
              <span className="eyebrow">
                0{index + 1} / {project.category}
              </span>
              <ArrowUpRight size={24} strokeWidth={1.3} aria-hidden="true" />
            </div>
            <h3>
              <Link href={`/projects/${project.id}`}>
                {project.displayTitle}
              </Link>
            </h3>
            <p>{project.overview}</p>
            <ul
              className="project-tools"
              aria-label={`${project.displayTitle} tools`}
            >
              {project.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <div className="analytics-card-bottom">
              <span className="content-status">{project.reviewLabel}</span>
              <Link className="text-link" href={`/projects/${project.id}`}>
                Read project
                <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only">: {project.displayTitle}</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="project-section-footer">
        <p className="section-footnote">
          Original source links are preserved. Incomplete evidence and disputed
          methods are identified within each project.
        </p>
        {!standalone && (
          <Link className="text-link" href="/projects">
            All analytics projects
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
}

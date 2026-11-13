import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { portfolioProjects } from "@/content/portfolio-projects";

export const dynamicParams = false;
export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((project) => project.id === slug);
  return project
    ? { title: project.displayTitle, description: project.overview }
    : { title: "Project not found" };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = portfolioProjects.find((project) => project.id === slug);
  if (!project) notFound();
  const dashboard = project.evidence.find((link) => link.kind === "dashboard");
  return (
    <main id="main" tabIndex={-1} className="container project-detail">
      <Link href="/projects" className="text-link">
        <ArrowLeft size={16} aria-hidden="true" />
        All analytics projects
      </Link>
      <header>
        <p className="eyebrow">Public portfolio / {project.category}</p>
        <h1>{project.displayTitle}</h1>
        <p className="project-detail-overview">{project.overview}</p>
        <ul className="project-tools" aria-label="Tools">
          {project.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
        {dashboard && (
          <a
            className="text-link"
            href={dashboard.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Power BI dashboard
            <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </header>
      <aside className="project-review" aria-labelledby="review-title">
        <p className="eyebrow">Evidence status</p>
        <h2 id="review-title">{project.reviewLabel}</h2>
        <p>{project.sourceStatus}</p>
      </aside>
      <div className="project-detail-body">
        <section>
          <h2>Analytical approach</h2>
          <ul>
            {project.methods.map((method) => (
              <li key={method}>{method}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Analytics & reporting</h2>
          <p>{project.reporting}</p>
        </section>
        <section>
          <h2>Data quality considerations</h2>
          <p>{project.dataQuality}</p>
        </section>
        <section>
          <h2>Original sources</h2>
          <ul className="project-evidence-links">
            <li>
              <a href={project.url}>
                Original portfolio project
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </li>
            {project.evidence.map((link) => (
              <li key={link.url}>
                <a href={link.url}>
                  {link.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="project-media-note">
            Source screenshots and records are not reproduced. Linked reports
            document the work; access to a report does not independently
            validate its calculations or outcomes.
          </p>
        </section>
      </div>
      <Link href="/#resume" className="text-link">
        Read my resume →
      </Link>
    </main>
  );
}

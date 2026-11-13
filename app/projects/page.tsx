import type { Metadata } from "next";
import Link from "next/link";
import { ProjectFoundation } from "@/components/projects/project-foundation";

export const metadata: Metadata = { title: "Analytics Projects" };
export default function ProjectsPage() {
  return (
    <main id="main" tabIndex={-1} className="projects-page">
      <div className="container projects-intro">
        <p className="eyebrow">BI / Public portfolio</p>
        <h1>Analysis, with context.</h1>
        <p>Selected analytics work and the evidence behind it.</p>
      </div>
      <ProjectFoundation standalone />
      <aside className="container project-collection-note">
        <h2>Professional systems & automation</h2>
        <p>
          My application work also includes analytics and reporting.
          Professional case studies remain subject to publication review.
        </p>
        <Link className="text-link" href="/#systems">
          Explore supporting experience →
        </Link>
      </aside>
    </main>
  );
}

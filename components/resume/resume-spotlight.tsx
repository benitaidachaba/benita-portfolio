import Link from "next/link";
import { Download } from "lucide-react";
import { resume } from "@/content/resume";
import { SectionHeading } from "@/components/ui/section-heading";
import { ResumeDocument } from "./resume-document";
import { PrintButton } from "./print-button";

// The former miniature spotlight now presents the entire shared HTML resume.
export function ResumeSpotlight() {
  return (
    <section
      id="resume"
      className="section container homepage-resume"
      aria-labelledby="homepage-resume-title"
    >
      <div className="homepage-resume-heading">
        <SectionHeading
          id="homepage-resume-title"
          number="02"
          eyebrow="Resume"
          title="Experience, in full."
          description="Read my professional experience here, or take the ATS-friendly PDF with you."
        />
        <div className="homepage-resume-actions">
          <a
            href={resume.pdf.url}
            download={resume.pdf.filename}
            className="button button-primary"
          >
            <Download size={18} aria-hidden="true" />
            Download Resume PDF
          </a>
          <Link href="/resume" className="text-link">
            Dedicated resume page →
          </Link>
          <PrintButton />
        </div>
      </div>
      <ResumeDocument />
    </section>
  );
}

import { resume } from "@/content/resume";
import { ResumeSpotlightPanel } from "./resume-spotlight-panel";

export function ResumeSpotlight() {
  return (
    <ResumeSpotlightPanel
      content={{
        ...resume.spotlight,
        name: resume.name,
        title: resume.title,
        location: resume.location,
        tools: resume.skills[0].items.slice(0, 5),
        pdfUrl: resume.pdf.url,
        filename: resume.pdf.filename,
      }}
    />
  );
}

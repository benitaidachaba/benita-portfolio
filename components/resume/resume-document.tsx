import { resume, resumePages, type ResumeBlock } from "@/content/resume";

function Block({ block }: { block: ResumeBlock }) {
  switch (block.kind) {
    case "heading":
      return <h3>{block.text}</h3>;
    case "paragraph":
      return <p>{block.text}</p>;
    case "bullet":
      return <li>{block.text}</li>;
    case "link":
      return (
        <p className="resume-project-link">
          <a href={block.url}>
            {block.text}
            <span className="resume-print-url">: {block.url}</span>
          </a>
        </p>
      );
    case "entry":
      return (
        <div className="resume-entry">
          <h4>{block.title}</h4>
          {block.detail && <p className="resume-entry-role">{block.detail}</p>}
          {block.dates && <p className="resume-entry-dates">{block.dates}</p>}
        </div>
      );
  }
}

export function ResumeDocument() {
  return (
    <article className="resume-document" aria-labelledby="resume-document-name">
      <header className="resume-document-header">
        <h2 id="resume-document-name">{resume.name}</h2>
        <p className="resume-document-role">{resume.title}</p>
        <p>
          {resume.location} ·{" "}
          <a href={`mailto:${resume.email}`}>{resume.email}</a>
        </p>
        <ul className="resume-contact-links">
          {resume.links.map((link) => (
            <li key={link.url}>
              <a href={link.url}>
                {link.label}
                <span className="resume-print-url">: {link.url}</span>
              </a>
            </li>
          ))}
        </ul>
      </header>
      {resumePages.map((blocks, pageIndex) => (
        <div className="resume-document-page" key={pageIndex}>
          {blocks.map((block, index) => {
            if (block.kind === "bullet") return null;
            const bullets: ResumeBlock[] = [];
            for (let next = index + 1; blocks[next]?.kind === "bullet"; next++)
              bullets.push(blocks[next]);
            return (
              <div className="resume-block" key={index}>
                <Block block={block} />
                {bullets.length > 0 && (
                  <ul>
                    {bullets.map((bullet, bulletIndex) => (
                      <Block key={bulletIndex} block={bullet} />
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </article>
  );
}

import { profile } from "./profile";
import { experience } from "./experience";
import { portfolioProjects } from "./portfolio-projects";

// Editable source for the HTML resume, PDF and homepage resume spotlight.
// Shared employer names, titles and dates come from the existing experience model.
const roleBullets: Record<
  (typeof experience)[number]["organization"],
  readonly string[]
> = {
  "Zeto Health": [
    "Conducted organizational data analysis and prepared JAR reporting for performance monitoring and management decisions.",
    "Contributed to healthcare programme data operations, including provider reconciliation, data quality, mapping and operational reporting.",
    "Developed or contributed to analytics and reporting components across applications; prepared weekly technical reports and management presentations.",
    "Implemented OCR form-digitization workflows covering structured extraction, validation, storage and deduplication.",
    "Independently designed and developed a healthcare knowledge and learning application using AI-assisted development tools; collaborated on other applications and reporting requirements.",
  ],
  "Atasun Group": [
    "Managed investor, property and investment tracking data; maintained structured spreadsheets for validation and operational reporting.",
    "Conducted market and competitor analysis and improved lead-management workflows.",
  ],
  techiesMAtch: [], // Title/dates only: responsibilities have not been confirmed.
  "HNG Tech": [
    "Performed exploratory data analysis in Python and cleaned and analyzed datasets in Excel.",
    "Created Power BI dashboards, analyzed campaign performance and audience segments, and prepared stakeholder reports.",
  ],
};

export const resume = {
  name: profile.name,
  title: profile.title,
  location: profile.location,
  email: profile.email,
  links: [
    { label: "LinkedIn", url: profile.linkedin },
    { label: "GitHub", url: profile.github },
    { label: "Project portfolio", url: profile.portfolio },
  ],
  summary:
    "Data Analyst with experience in healthcare analytics, organizational reporting, data quality and business intelligence. Skilled in SQL, PostgreSQL, Python, Power BI and spreadsheet analysis, with supporting experience in data-processing workflows, AI-assisted applications and reporting automation. Translates operational requirements into reliable data solutions, dashboards and insights for technical and non-technical stakeholders.",
  skills: [
    {
      label: "Analytics",
      items: [
        "SQL",
        "PostgreSQL",
        "Python",
        "Pandas",
        "Excel",
        "Google Sheets",
        "Power BI",
        "Power Query",
        "exploratory data analysis",
        "data visualization",
        "KPI reporting",
      ],
    },
    {
      label: "Data engineering",
      items: [
        "ETL",
        "data transformation",
        "deduplication",
        "data validation",
        "reconciliation",
        "API integrations",
        "geospatial data processing",
      ],
    },
    {
      label: "Automation",
      items: [
        "Google Apps Script",
        "workflow automation",
        "OCR",
        "structured data extraction",
        "AI-assisted development",
      ],
    },
    {
      label: "Additional",
      items: [
        "React",
        "TypeScript",
        "REST APIs",
        "requirements gathering",
        "PRDs",
        "technical documentation",
      ],
    },
  ],
  experience: experience.map((job) => ({
    ...job,
    location: job.organization === "Zeto Health" ? profile.location : undefined,
    bullets: roleBullets[job.organization],
  })),
  teaching: {
    summary:
      "Taught more than 200 students across cohorts, with a focus on SQL and practical analytical problem-solving.",
    roles: [
      {
        organization: "Bivy Tech",
        role: "Lead Data Analysis Mentor",
        start: "Jul 2025",
        end: "Sep 2026",
        bullets: [
          "Developed SQL learning tracks and conducted live SQL debugging sessions.",
          "Supported learners with practical analytical problem-solving.",
        ],
      },
      {
        organization: "Digitally Drive Bootcamp",
        role: "SQL Tutor",
        start: "Jul 2025",
        end: "Aug 2026",
        bullets: [
          "Taught SQL fundamentals, joins, aggregation and subqueries.",
          "Developed practical exercises and assessments to help learners solve analytical problems.",
        ],
      },
    ],
  },
  projects: portfolioProjects.filter((project) => project.resumeSelected),
  education: {
    qualification: "B.Sc. Biological Sciences",
    institution: "University of Abuja",
    completed: "January 2025",
  },
  certifications: [
    "ALX Data Analytics — completed",
    "ALX Professional Foundations — completed",
    "HNG Tech — Data Analyst Intern",
  ],
  // ALX certificates inspected from owner-supplied local originals. HNG title
  // corroborated on LinkedIn. No dates, IDs or verification URLs are inferred.
  pdf: {
    url: "/resume/Benita_Idachaba_Data_Analyst_Resume.pdf",
    filename: "Benita_Idachaba_Data_Analyst_Resume.pdf",
  },
  spotlight: {
    eyebrow: "The professional overview",
    heading: "A clearer view of my experience.",
    description:
      "Analytics, reporting and the technical skills behind the work.",
  },
} as const;

// Shared semantic text blocks: PDF, HTML and verification use the same order/content.
export type ResumeBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph" | "bullet"; text: string }
  | { kind: "entry"; title: string; detail?: string; dates?: string }
  | { kind: "link"; text: string; url: string };

export const resumePages: readonly (readonly ResumeBlock[])[] = [
  [
    { kind: "heading", text: "Professional Summary" },
    { kind: "paragraph", text: resume.summary },
    { kind: "heading", text: "Technical Skills" },
    ...resume.skills.map((group) => ({
      kind: "paragraph" as const,
      text: `${group.label}: ${group.items.join(", ")}.`,
    })),
    { kind: "heading", text: "Professional Experience" },
    ...resume.experience.flatMap((job) => [
      {
        kind: "entry" as const,
        title: job.organization,
        detail: job.role,
        dates: `${job.start} – ${job.end}${job.location ? ` | ${job.location}` : ""}`,
      },
      ...job.bullets.map((text) => ({ kind: "bullet" as const, text })),
    ]),
  ],
  [
    { kind: "heading", text: "Teaching & Technical Leadership" },
    { kind: "paragraph", text: resume.teaching.summary },
    ...resume.teaching.roles.flatMap((job) => [
      {
        kind: "entry" as const,
        title: job.organization,
        detail: job.role,
        dates: `${job.start} – ${job.end}`,
      },
      ...job.bullets.map((text) => ({ kind: "bullet" as const, text })),
    ]),
    { kind: "heading", text: "Selected Analytics Projects" },
    ...resume.projects.flatMap((project) => [
      { kind: "entry" as const, title: project.title },
      { kind: "paragraph" as const, text: project.summary },
      { kind: "link" as const, text: "View project source", url: project.url },
    ]),
    { kind: "heading", text: "Education" },
    {
      kind: "entry",
      title: resume.education.qualification,
      detail: resume.education.institution,
      dates: `Completed ${resume.education.completed}`,
    },
    { kind: "heading", text: "Certifications" },
    ...resume.certifications.map((text) => ({
      kind: "paragraph" as const,
      text,
    })),
  ],
];

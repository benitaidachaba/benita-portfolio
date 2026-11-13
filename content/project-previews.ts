// Collection placeholders, not case studies. Restricted projects are never imported.
export const projectPreviews = [
  {
    number: "01",
    title: "Professional work",
    label: "Reporting · Data quality · Business intelligence",
    description:
      "A space for selected organizational reporting and analytics work. Case studies will be added after content and publication review.",
    steps: ["Business question", "Reliable data", "Clear reporting"],
    status: "Publication review pending",
  },
  {
    number: "02",
    title: "Independent projects",
    label: "SQL · Python · Power BI",
    description:
      "A space for public analyses, dashboards and practical experiments. Repository selection and project evidence are being reviewed.",
    steps: ["Explore", "Analyze", "Communicate"],
    status: "Project selection in progress",
  },
] as const;

// Public source inventory for the resume; no Checkpoint 4 routes or case studies.
// Descriptions are conservative summaries of the owner's linked public portfolio.
export const portfolioProjects = [
  {
    id: "marketing-campaign-analysis",
    title: "Marketing Campaign Analysis",
    summary:
      "Analyzed campaign performance, conversion, ROI and audience segments; prepared findings and recommendations for reporting.",
    url: "https://www.datascienceportfol.io/benitaid2004/projects/1",
    sourceStatus:
      "Public project description reviewed; underlying artifacts not independently audited.",
    resumeSelected: true,
  },
  {
    id: "geospatial-election-analysis",
    title: "Geospatial Election Analysis",
    summary:
      "Explored polling-unit outliers through geospatial analysis and an interactive Power BI dashboard.",
    url: "https://www.datascienceportfol.io/benitaid2004",
    sourceStatus:
      "Listed on the public profile; direct project URL and underlying artifacts pending review.",
    resumeSelected: true,
  },
  {
    id: "dimensional-modeling",
    title: "Dimensional Modeling",
    summary:
      "Invoice-data modeling topic listed on the public portfolio; implementation evidence requires review.",
    url: "https://www.datascienceportfol.io/benitaid2004",
    sourceStatus: "Inventory only; do not claim a deployed ETL implementation.",
    resumeSelected: false,
  },
  {
    id: "network-analysis",
    title: "Network Analysis",
    summary:
      "Online-community network analysis listed on the public portfolio; ownership and deliverables require review.",
    url: "https://www.datascienceportfol.io/benitaid2004",
    sourceStatus: "Inventory only; collection classification requires review.",
    resumeSelected: false,
  },
] as const;

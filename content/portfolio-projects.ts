// Single registry for the four owner-authorized public portfolio migrations.
// Existing short titles/summaries remain stable for the shared resume.
export type PortfolioProject = {
  id: string;
  title: string;
  displayTitle: string;
  category: string;
  summary: string;
  overview: string;
  tools: readonly string[];
  methods: readonly string[];
  reporting: string;
  dataQuality: string;
  reviewLabel: string;
  sourceStatus: string;
  url: string;
  evidence: readonly {
    label: string;
    url: string;
    kind?: "dashboard" | "report" | "dataset";
  }[];
  resumeSelected: boolean;
};

export const portfolioProjects: readonly PortfolioProject[] = [
  {
    id: "marketing-campaign-analysis",
    title: "Marketing Campaign Analysis",
    displayTitle: "Marketing Campaign Analysis and Insights",
    category: "Data Analytics",
    summary:
      "Analyzed campaign performance, conversion, ROI and audience segments; prepared findings and recommendations for reporting.",
    overview:
      "Campaign and audience analysis using a dataset described by the source as containing over 200,000 rows. The linked presentation identifies an HNG internship dataset.",
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Excel"],
    methods: [
      "Standardized column names and converted dates for analysis.",
      "Used IQR checks on acquisition cost and ROI.",
      "Compared campaign ROI, audience segments and click-through rate.",
    ],
    reporting:
      "A presentation communicates campaign comparisons and proposed marketing actions. Recommendations are not evidence of realized business gains.",
    dataQuality:
      "The source describes schema, missing-value and date checks. Date-parsing assumptions and underlying rows still need inspection.",
    reviewLabel: "CPC method review",
    sourceStatus:
      "The source converts cost per click into a percentage. CPC should be ad spend divided by clicks, expressed in currency per click. Acquisition cost is only suitable if it represents that spend. Zero-click handling and CPC findings require recalculation from the dataset; disputed results are withheld.",
    url: "https://www.datascienceportfol.io/benitaid2004/projects/1",
    evidence: [
      {
        label: "Original analysis presentation",
        url: "https://docs.google.com/presentation/d/1uTzYt1BQrpNWe0NLPln2VmtIMgqOATinhC_sFOKtkDs/edit?usp=sharing",
      },
    ],
    resumeSelected: true,
  },
  {
    id: "geospatial-election-analysis",
    title: "Geospatial Election Analysis",
    displayTitle: "Advanced Geospatial Election Integrity Analysis",
    category: "Business Intelligence",
    summary:
      "Explored polling-unit outliers through geospatial analysis and an interactive Power BI dashboard.",
    overview:
      "A public portfolio analysis of geographic voting patterns and polling-unit outliers, with Power BI visualization and storytelling.",
    tools: ["Python", "Power BI", "Excel", "DAX (source-listed)"],
    methods: [
      "Explore polling-unit outlier scores and comparisons by local government area (LGA).",
      "Compare the dashboard’s 500m, 1km and 2km radius summaries.",
      "Review party-vote, registered-voter and vote-discrepancy charts.",
    ],
    reporting:
      "The inspected Power BI report includes party-vote summaries, polling-unit outlier scores, LGA comparisons, vote-discrepancy views and 500m/1km/2km radius summaries. It exposes polling-unit, party and outlier controls.",
    dataQuality:
      "Validate data provenance, coordinates, polling-unit identifiers, radius definitions and percentage/aggregation units before drawing conclusions. Outlier flags are analytical leads, not proof of electoral misconduct. No election records are reproduced here.",
    reviewLabel: "Dashboard inspected",
    sourceStatus:
      "The owner-supplied Power BI report loaded and populated charts were inspected. Its map area did not visibly populate in the review capture. Underlying DAX, source records and geospatial calculations have not been reproduced. No client commission or verified electoral finding is claimed; source-listed DAX does not imply advanced mastery.",
    url: "https://www.datascienceportfol.io/benitaid2004/projects/0",
    evidence: [
      {
        label: "Interactive Power BI report",
        kind: "dashboard",
        url: "https://app.powerbi.com/view?r=eyJrIjoiNjY4Y2VhYTYtMGU5My00OWFjLTlhODUtOTY3ZDQ3ZjlhY2NkIiwidCI6ImE4Zjc4ZDMzLWU5ODAtNDk5Zi1hM2IwLTEwNWJiYmExZjNmNCJ9",
      },
    ],
    resumeSelected: true,
  },
  {
    id: "dimensional-modeling",
    title: "Dimensional Modeling",
    displayTitle: "Dimensional Modeling",
    category: "Data Engineering",
    summary:
      "Documented an invoice-data star schema, ETL strategy and SCD Type 2 approach for historical reporting.",
    overview:
      "An authored invoice-data modeling report defining line-item sales grain, customer/product/store/time dimensions, an ETL strategy and SCD Type 2 history for analytical reporting.",
    tools: ["SQL", "PostgreSQL"],
    methods: [
      "Define invoice-line-item grain and retain Invoice_ID as a degenerate dimension.",
      "Design sales facts with customer, product, store and time dimensions using surrogate keys.",
      "Specify batch/incremental ETL, staging, reject logs, deduplication and referential checks.",
      "Document SCD Type 2 validity dates/current flags and time, geographic and product drill-down hierarchies.",
    ],
    reporting:
      "The design supports historical sales trends and customer, product and store drill-downs. Partitioning, indexing and materialized views are proposed optimizations, not measured performance improvements.",
    dataQuality:
      "The report specifies validation, deduplication, reject logs and referential checks. Customer-to-fact linkage, non-overlapping SCD validity windows and as-of joins still need executable validation.",
    reviewLabel: "Design report reviewed",
    sourceStatus:
      "The owner-supplied PDF is credited to Benita Idachaba and has been read. It substantiates the documented design and rationale. No database, SQL execution, ETL deployment or benchmark was independently verified.",
    url: "https://www.datascienceportfol.io/benitaid2004/projects/2",
    evidence: [
      {
        label: "Dimensional Modeling Report for Invoice Data (PDF)",
        kind: "report",
        url: "https://drive.google.com/file/d/1MRQBu6zwyhYxiU8Me9dHBffgv2oLy570/view",
      },
    ],
    resumeSelected: false,
  },
  {
    id: "network-analysis",
    title: "Network Analysis",
    displayTitle: "Network Analysis",
    category: "Data Analytics",
    summary:
      "Authored a sampled LiveJournal network analysis covering community structure, centrality and proposed engagement strategies.",
    overview:
      "A LiveJournal social-network analysis of an edge-sampled graph, exploring communities and potential engagement strategies. The full source network has 3,997,962 nodes; this is dataset scope, not the size of the analyzed sample or a Techies Match user count.",
    tools: [
      "Python",
      "NetworkX",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "PyVis",
    ],
    methods: [
      "Use a reported 1% edge sample to construct a manageable NetworkX graph.",
      "Describe Louvain community detection and degree, betweenness and eigenvector centrality.",
      "Analyze clustering, community sizes and bridge users; use static plots and PyVis visualizations.",
    ],
    reporting:
      "The written analysis turns network structure into proposed matchmaking, mentorship and community-engagement actions. It does not establish observed Techies Match behavior or measured retention gains.",
    dataQuality:
      "Edge sampling can distort connectivity and centrality. Distinguish small communities from degree-zero isolated nodes, and clarify how overlap is derived alongside Louvain partitions before reusing quantitative findings. No user-level records are reproduced.",
    reviewLabel: "Analysis report reviewed",
    sourceStatus:
      "The PDF credits Benita Idachaba in a Team Techies Match context and documents the methods above. Stanford SNAP corroborates the full source-network size. Sample construction, code and report findings have not been independently rerun; proposed engagement actions are not verified outcomes.",
    url: "https://www.datascienceportfol.io/benitaid2004/projects/3",
    evidence: [
      {
        label: "LiveJournal Network Analysis Report (PDF)",
        kind: "report",
        url: "https://drive.google.com/file/d/1tAjKUzVAntx_uls3Mm2ci5dWCs3IV-CU/view",
      },
      {
        label: "Stanford SNAP LiveJournal dataset",
        kind: "dataset",
        url: "https://snap.stanford.edu/data/com-LiveJournal.html",
      },
    ],
    resumeSelected: false,
  },
];

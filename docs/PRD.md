# Product requirements: Benita Idachaba portfolio

Status: Checkpoints 1–3 completed; Checkpoint 3.1 refinements implemented for local review. Initial audit: 12 November 2026. The latest owner revision prohibits deployment and limits project migration to four existing public projects.

## Current Checkpoint 3.1 requirements

- Uppercase BI monogram in navigation, mobile menu, footer, favicon and brand metadata.
- Deep navy `#072D50` dominates the site canvas, header, hero and major sections. Ice `#DBF2FC` provides contrast; pink `#FE5C80` remains limited to priority actions.
- Sticky navigation stays visible in both scroll directions. Pathname-based route states and IntersectionObserver-based homepage states share the same active/hover styling. Section offsets account for the header.
- Current homepage order: hero → four analytics projects → full HTML resume → professional systems/automation → capabilities → contact/footer. Experience, teaching, education and credentials live in the shared resume instead of duplicate sections.
- View Resume in the hero opens `/#resume`. The entire resume is readable on the homepage and `/resume`; PDF is a download, not an embedded primary reader. Both HTML views use print styling and the same structured source.
- The existing vector glass fallback is enlarged and label-free. Motion values map scroll position to a restrained 2D rotation; reduced motion and small phones disable rotation. Do not claim a true 3D model.
- `/projects` and four pre-rendered detail routes cover only marketing, geospatial election analysis, dimensional modeling and network analysis, in that order. Source/method gaps are visible. Additional professional case studies and category-filter expansion remain outside this checkpoint.
- No deployment or additional case studies are authorized. This section supersedes conflicting baseline behaviors below.

## Purpose and audience

Position Benita Idachaba as a Data Analyst for Nigerian and internationally remote-eligible roles. Secondary audiences are technical hiring managers, engineering teams and consulting clients. Do not claim work authorization, immediate availability or eligibility for every remote role.

Within ten seconds, a visitor should identify the role, SQL/Python/Power BI/PostgreSQL experience, organizational reporting work, additional systems experience and the route to the resume. Primary conversion: open the resume. Secondary conversion: inspect relevant project evidence. Contact and professional profiles remain easy to find.

Evidence policy: the supplied master prompt is the only available biographical source. Owner-provided claims are distinct from independently verified facts. See [content audit](CONTENT-AUDIT.md) and [confidentiality review](CONFIDENTIALITY-REVIEW.md).

## Scope

Deliver a static-first Next.js App Router site using TypeScript, Tailwind CSS, Motion and Lucide. Use typed content objects rather than MDX initially: the resume, experience and projects need shared fields and publication controls more than editorial tooling. No database, authentication, CMS, contact backend or analytics service is required.

This checkpoint creates planning documents only. Application code, dependencies, artwork generation, resume production and hosting setup follow explicit checkpoint approval.

## Information architecture

| Route | Purpose | Key content |
| --- | --- | --- |
| `/` | Recruiter overview | Ordered sections below; concise evidence and resume access |
| `/projects` | Browse work | Professional Work / Independent Projects collections and category filters |
| `/projects/[slug]` | Inspect evidence | Approved case study, contribution, workflow, analytics, quality, outcomes and public links |
| `/resume` | Read and download | Full HTML resume, printing and PDF download |
| `/about` | Professional context | Analytics approach, education, teaching and supporting technical breadth |

Include a branded 404, route error recovery, sitemap, robots configuration, favicon and Open Graph asset. Navigation: Projects, Experience (`/#experience`), About and prominent View Resume. GitHub and LinkedIn appear in the hero and footer. Page navigation must work when arriving directly on a secondary route.

### Homepage outline, in required order

1. Navigation: compact, translucent navy-on-light bar, resume action and accessible mobile menu.
2. Hero: name, explicit Data Analyst title, supplied copy, primary and secondary actions, profile links; glass artwork on desktop right.
3. Resume spotlight: compact first-visit panel, summary and resume preview affordance; dismissible and expandable without blocking the page.
4. Featured analytics projects: up to three approved studies, selected for analytical evidence rather than technology breadth. Do not fill slots with invented work.
5. Technical capabilities: four concise groups with representative skills and links to detail.
6. Professional experience: reverse chronological timeline, analytics responsibilities first.
7. Selected systems and automation work: at most three approved studies, each explaining its reporting component.
8. Teaching and credentials: 200+ students as an owner-provided claim; verified credentials only.
9. About: short professional context and Abuja location, linking to `/about`.
10. Contact: confirmed email action plus LinkedIn and GitHub.
11. Footer: route links, professional profiles and restrained attribution.

No unrelated sales funnel, invented testimonials, pricing, FAQ section or additional animated tagline section is proposed. The owner's explicit homepage order governs the design.

### Hero copy

- Eyebrow: DATA ANALYST · DATA ENGINEERING · AI AUTOMATION
- Name: Benita Idachaba
- Role: Data Analyst
- Headline: Turning complex data into clear decisions and building systems that make information work.
- Supporting copy: Data Analyst experienced in SQL, Python, business intelligence, healthcare analytics, data quality, intelligent automation and application development.
- Primary CTA: View Resume → `/#resume` (dedicated route retained at `/resume`)
- Secondary CTA: Explore Projects → `/projects`
- Additional links: supplied GitHub and LinkedIn profiles.
- Proof line proposal: SQL · Python · Power BI · PostgreSQL. These are supplied skill claims, not endorsements or proficiency ratings.

### Evidence-led benefits

- Organizational reporting experience connects analysis to stakeholder decisions.
- Data cleaning, reconciliation and validation show attention to reliable inputs.
- Systems and automation experience connects reporting to operational workflows.
- SQL teaching and mentorship demonstrate the ability to explain analytical concepts.

Visitor journey: scan role and skills → inspect resume and approved project evidence → contact through a confirmed public channel. No outcome guarantees or fabricated performance claims.

## Functional acceptance criteria

| Feature | Required behavior |
| --- | --- |
| Navigation | Semantic links, current-page indication, skip link, visible keyboard focus; mobile menu closes on Escape and route selection and restores focus |
| Homepage resume | Complete, always-readable HTML document directly on the homepage; no popup, miniature preview or dismissal required |
| Resume printing | Both HTML views print the resume alone, without site navigation, artwork or other homepage sections |
| Resume | HTML remains available without JavaScript on homepage and dedicated route; PDF is downloadable, with selectable text and consistent content; no embedded reader required |
| Project filtering | Collection and category controls are labeled and keyboard operable; categories use multi-category membership; result count announced politely; clear/reset and empty state provided |
| Project routing | All approved slugs pre-rendered; unknown or restricted slugs return 404; draft content never enters the public bundle or metadata |
| External links | Only confirmed public URLs; descriptive names; new-tab links use appropriate `rel` attributes |
| Contact | Confirmed email produces a working `mailto:` link; omit email action until supplied, with LinkedIn as an available contact route |
| Motion | Subtle transform/opacity only; reduced motion disables movement and smooth scrolling; content readable without animation or JavaScript |
| States | Empty filtered lists, 404, route errors and PDF failure recovery have useful text and working next actions |

## Content and resume requirements

Maintain one typed source for role titles, dates, education, skills, credentials and resume bullets. Generate printable HTML and an ATS-friendly PDF from it. Target one readable A4 page; accept two pages instead of shrinking text excessively. Preserve reverse chronological experience and a separate teaching section. No unverified employment achievements, certificate dates, proficiency scores or metrics.

Every proposed project records title, category, collection, overview, problem, contribution, tools, approved workflow, analytics/reporting, data quality, verified outcomes, media provenance and link status. Missing optional evidence is omitted from the public page; review flags remain private.

Professional project summaries and employment bullets also need a confidentiality check; anonymization alone is insufficient authorization.

## SEO and deployment

Proposed homepage title: `Benita Idachaba | Data Analyst`.

Proposed description: `Benita Idachaba is a Data Analyst in Abuja, Nigeria, with experience in SQL, Python, Power BI, healthcare analytics and workflow automation.`

Index approved evergreen pages after publication approval. Use a confirmed canonical domain for metadata, sitemap and Open Graph URLs; do not invent one. Keep review deployments private: `noindex` is supplementary and does not provide access control. Include only published project routes in sitemap and static generation. Use factual Person structured data if it adds value, without invented endorsements or eligibility claims.

Target Vercel, retaining normal Next.js static pre-rendering rather than forcing static export. Select supported stable package versions and commit a lockfile at implementation time. No hosting registration, Git push or deployment at this checkpoint. Domain, production audience and publication approval remain pending.

## Quality gates

- Responsive review at 320, 390, 768, 1024 and 1440 CSS pixels; also 200% zoom and long content.
- Keyboard navigation, mobile menu focus, filters, resume access and reduced motion verified.
- WCAG AA contrast target: 4.5:1 ordinary text, 3:1 large text and meaningful UI boundaries.
- TypeScript, lint, production build and meaningful end-to-end navigation/filter/download checks pass.
- PDF HTTP response, file validity, selectable text, links, page breaks and HTML consistency checked.
- Lighthouse performance and accessibility target 90+; report actual measured results and conditions only.
- No secrets, internal identifiers, restricted content or unauthorized media in source intended for publication, output assets or repository history.

## Approval sought

Approve the design direction, route structure, content rules and staged implementation approach. Supply or schedule the missing evidence in the content audit. Approval of this plan authorizes Checkpoint 2 only; it does not approve professional case study publication or deployment.

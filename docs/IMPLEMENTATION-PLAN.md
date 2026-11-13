# Checkpoint implementation plan

Status: Checkpoints 1–3 completed. Current work is the owner's bounded Checkpoint 3.1 refinement: navy/BI branding, persistent section-aware navigation, homepage HTML resume, scroll-responsive glass and four existing public project migrations. See [Checkpoint 3.1](CHECKPOINT-3.1.md). Deployment is explicitly prohibited, superseding the prior request. Additional Checkpoint 4 case studies remain unauthorized. The steps below retain the original staged plan.

## Checkpoint 1 — audit and planning

Completed:

- Inspected the workspace, hidden entries and applicable ancestor instruction paths. The workspace was empty and not a Git repository.
- Inventoried the supplied prompt, profile, experience, skills, teaching, credentials and project proposals.
- Distinguished supplied claims, evidence gaps and professional-work release restrictions.
- Specified recruiter-first routes, resume behavior, responsive design, structured content and quality gates.

Deliverables:

- [PRD.md](PRD.md)
- [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)
- [CONTENT-AUDIT.md](CONTENT-AUDIT.md)
- [CONFIDENTIALITY-REVIEW.md](CONFIDENTIALITY-REVIEW.md)
- This implementation plan.

Review locally in a Markdown viewer. No installation or development command is needed. Checks at this stage: confirm five files exist, all local document links resolve, requested routes/sections and checkpoint gates are covered, and no application files were created. No TypeScript, lint, browser, PDF, Lighthouse or build tests are applicable yet.

Approval gate: approve or revise the proposed design, information architecture, evidence policy and implementation decisions before Checkpoint 2. Missing content can be supplied progressively, according to the audit.

## Proposed repository and content model

Use the owner's requested `app/`, `components/`, `content/`, `public/`, `scripts/`, `tests/` and `docs/` structure. Create only what the approved checkpoint requires.

| File or area | Planned responsibility |
| --- | --- |
| `content/profile.ts` | Identity, approved contact details, links, education and summary |
| `content/experience.ts` | Shared employment and teaching records, bullets and dates |
| `content/skills.ts` | Four groups and explicit development areas |
| `content/certifications.ts` | Only confirmed public credential details |
| `content/projects.ts` | Approved public project projections and filter taxonomy |
| `content/resume.ts` | Resume selection/order referencing shared profile and experience records |
| Local review source | Restricted drafts/approval evidence kept outside public import graph and public repository |
| `scripts/` | Deterministic resume generation and content/publication validation |
| `public/resume/` | Generated approved PDF; no private source documents |
| `tests/` | Meaningful route, navigation, filtering, privacy-boundary and resume checks |

Resume composition may select shorter bullets, but shared facts must remain identical. Project records use the six supplied categories and two collections. Tools, metrics, demos and media require their own evidence; do not infer them from the general skills list.

## Checkpoint 2 — visual foundation

After approval:

1. Initialize the Next.js App Router/TypeScript/Tailwind project, selecting current supported versions and a package-manager lockfile. Use Motion sparingly and Lucide consistently. No database or server integration.
2. Implement CSS variables, named typography, responsive layout, skip link, navigation and footer. Use Server Components by default; small client islands handle menu and optional motion.
3. Build the hero with supplied copy, exact brand colors and clear resume/project actions. Generate and optimize original glass artwork using the imagegen skill; document a fallback if generation fails.
4. Build the homepage composition in the required order using supplied general content and explicitly marked local review placeholders where necessary. Do not import restricted narratives. Reserve the resume spotlight layout; actual resume integration belongs to Checkpoint 3.
5. Provide a local preview and mobile/tablet/desktop captures if tooling permits; document actual tooling limitations.

Review: `npm install` after the approved scaffold exists, then `npm run dev` and open the displayed localhost URL. Future scripts are proposed here, not currently runnable. Initial validation: TypeScript/lint, mobile overflow, keyboard menu behavior, contrast, image sizing and reduced motion. Stop for visual approval.

## Checkpoint 3 — resume

1. Confirm contact, role dates, teaching dates and credentials; resolve missing techiesMAtch details or omit unsupported bullets.
2. Build the shared typed content source and an editable resume composition module. Render HTML at `/resume`, with dedicated print styling and an optional desktop PDF viewer.
3. Generate PDF through a development-only headless browser tool, reusing the resume template/content. Prefer Playwright tooling if it also supports the later end-to-end suite. Do not introduce a second resume document library without a need.
4. Produce the downloadable PDF, verify text extraction/reading order and links, and compare facts with HTML. Avoid clipping or tiny text; permit two pages if needed.
5. Integrate the first-visit inline spotlight with guarded local persistence and expansion/dismiss controls. Permanent resume access remains visible.

Validation: valid PDF bytes/response, download filename, embed fallback, mobile access, print layout, selectable text, content consistency and spotlight persistence including unavailable storage. Provide exact generation commands once implemented. Stop for resume content review.

## Checkpoint 4 — projects

1. Verify supplied professional profile and repository/demo links. Select public independent work using evidence; no invented project cards.
2. Obtain professional-work permission and exact contribution/tool/reporting details. Keep blocked projects outside the public import graph.
3. Build filterable `/projects`, approved detail routes, project media and related navigation. Use one primary category plus additional categories if useful; filtering includes all memberships.
4. Add each study's business problem, contribution, tools, conceptual approved workflow, reporting component, data-quality handling and only verified outcomes.
5. Inspect build output as well as source for restricted content. Ensure hidden slugs do not render or leak metadata.

Validation: collection/category combinations, empty/reset states, keyboard controls, static direct-route navigation, unknown slugs, external destinations, media labels and confidentiality allowlist. Stop for approval of the concrete case studies. This approval is separate from deployment approval.

## Checkpoint 5 — QA

Run the implemented scripts for lint, TypeScript, tests and production build. Start the production server for browser verification. Meaningful tests should cover user behavior and publication boundaries rather than mirror markup.

| Area | Planned verification |
| --- | --- |
| Responsive | 320/390px phone, 768px tablet, 1024/1440px desktop, portrait/landscape as relevant, 200% zoom |
| Navigation | All routes, anchors from secondary pages, menu dismissal/focus, skip link, 404 and recovery |
| Projects | Filters, result count, clear state, detail links, blocked slugs absent from outputs |
| Resume | HTML/PDF consistency, validity, download, desktop embed, mobile fallback and first-visit behavior |
| Accessibility | Automated audit plus manual keyboard, contrast, heading/landmark and focus checks |
| Motion | Reduced-motion emulation; content visible with animation or JavaScript unavailable |
| Performance | Optimized responsive art, limited font weights, below-fold lazy loading, minimal client bundles; Lighthouse against production build |
| Metadata | Titles/descriptions, canonical URLs, Open Graph image, sitemap/robots and approved public route list |
| Security/content | No secrets, internal links, sensitive media metadata or draft content; dependencies and lockfile reviewed |

Record exact commands, environments, measured results and remaining limits in `docs/QA-RESULTS.md`. Fix failures before moving on. Never claim a Lighthouse score without a recorded run.

## Checkpoint 6 — Vercel preparation and deployment

Prepare `docs/DEPLOYMENT.md` with Node/package-manager requirements, local setup, build/generation commands, asset caching, confirmed domain, metadata configuration, preview privacy, rollback and release checklist. Add Vercel-specific configuration only where defaults do not meet a demonstrated requirement. No runtime secrets should be necessary.

Keep generated PDFs and media cacheable with versioned filenames or deliberate revalidation. Avoid immutable caching for an unchanged resume filename. Verify direct routes and downloads on an approved private preview if one is authorized.

Present the completed local result, QA evidence and exact release target for explicit deployment approval. No publishing service, remote repository or production release is created before authorization. The requested Vercel target takes precedence over generic Sites publishing defaults; this project remains local until approved.

## Reporting contract

At each checkpoint report completed work, files changed, actual run/review commands, checks performed, outstanding issues and the precise next approval. Approval for one checkpoint does not silently authorize later content publication or deployment. If evidence remains missing, omit the affected claim or keep the artifact private and explain the unresolved requirement.

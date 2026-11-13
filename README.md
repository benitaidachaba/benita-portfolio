# Benita Idachaba — Data Analytics Portfolio

My professional portfolio as a Data Analyst, showcasing my experience in analytics, business intelligence, data quality, healthcare reporting and supporting work in automation and application development.

Built with Next.js App Router, TypeScript, Tailwind CSS, Motion and Lucide, using an ice-blue, deep-navy and restrained pink visual identity.

## Portfolio link

**Website:** [View my current public portfolio][portfolio-url]

The link currently opens my existing data-science portfolio, which also supplies the public project references used here. This Next.js version is prepared locally; a Vercel deployment has not yet succeeded. After deployment, change the single `portfolio-url` reference at the bottom to the confirmed new URL.

## Current status

Checkpoints 1–3 are complete. Checkpoint 3.1 refines the existing design with uppercase BI branding, a dominant navy canvas, sticky section-aware navigation, a large scroll-responsive glass illustration and the complete HTML resume directly on the homepage. The PDF remains a downloadable document, not the main viewing interface.

The resume includes professional experience, skills, SQL teaching, selected analytics projects, education, ALX Data Analytics/Professional Foundations supported by supplied certificates, and the publicly listed HNG credential. Four existing public analytics projects now have source-aware cards and detail routes. Missing evidence and the marketing CPC method issue are explicitly marked for review. Additional professional case studies remain reserved for later approval.

The geospatial dashboard and dimensional-modeling/network reports have now been supplied and inspected. Direct source links and supported methods are included on their existing pages. The network analysis distinguishes an edge-sampled graph from the full LiveJournal dataset; design intentions and engagement recommendations are not presented as verified production outcomes. Raw calculations and the marketing CPC issue remain review items.

See [Checkpoint 3.1 results and screenshots](docs/CHECKPOINT-3.1.md), [content audit](docs/CONTENT-AUDIT.md) and [resume verification](docs/RESUME-VERIFICATION.md).

[Download the Data Analyst resume](public/resume/Benita_Idachaba_Data_Analyst_Resume.pdf) · [Editable resume source](content/resume.ts)

## Professional profiles

- [LinkedIn](https://www.linkedin.com/in/benita-idachaba-24450629b/)
- [GitHub](https://github.com/benitaidachaba)

## Local development

Use Node.js 22 or newer and npm. From this directory:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000, `/resume` and `/projects`. The complete resume is readable directly on the homepage and dedicated route, with download and print actions. The glass artwork is the documented vector fallback, now enlarged and label-free with scroll-driven 2D rotation. It does not use a true 3D model.

## Resume generation

Edit `content/resume.ts` and its shared profile/experience sources, then run:

```sh
npm run resume:generate
```

Generation is deterministic and uses Node, `tsx` and the development-only `pdf-lib` package. No browser, external API or secret is required. `npm run build` regenerates the PDF through `prebuild`. All resume text comes from the shared content model; do not edit the PDF manually.

## Validation

```sh
npm run typecheck
npm run lint
npm run build
npm run resume:verify
python3 scripts/check-foundation.py
```

To review the production build:

```sh
npm run start -- --port 3100
```

For browser checks, build first, then install the Playwright browser and run:

```sh
npx playwright install chromium
npm run test:e2e
```

The suite starts the production server itself if needed. An installed browser can be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`; macOS Chrome is also detected when bundled Chromium is unavailable. Tests cover responsive layout, sticky/active navigation, mobile focus, full HTML resume, PDF delivery, four migrated routes, print isolation, scroll rotation, reduced motion, accessibility and 404 handling. Successful viewport tests save screenshots under `test-results/`; selected review images are retained in `docs/screenshots/checkpoint-3.1/`.

`resume:verify` requires Poppler's `pdftotext` on PATH and checks text consistency, links, file bounds and reproducibility. Poppler is not needed for PDF generation or Vercel builds. PDF audit artifacts are kept separately under ignored `artifacts/resume/`.

## Content and design

- `content/`: shared profile, skills, experience and resume; `portfolio-projects.ts` is the single registry for the four bounded public-project migrations and resume references.
- `components/`: reusable navigation, footer, hero, temporary artwork, resume spotlight and sections.
- `app/globals.css`: established tokens and base components; `app/refinements.css`: navy-first, sticky-navigation and current layout refinements. Tailwind utilities remain available.
- `app/fonts/`: local Inter and Geist assets with licenses, requiring no font-network access at build/runtime.
- `public/resume/`: generated, selectable-text PDF resume.
- `docs/`: planning, checkpoint reports, resume verification, artwork status and deployment instructions.

The Motion library uses its `framer-motion` package entry point. Next.js uses Webpack because Turbopack worker port binding is blocked in the execution environment. Build output remains static-first and ready for later Vercel preparation. The preview metadata is `noindex`; this is not access control or authorization to publish.

Do not add private client material to public content, assets or repository history. See `docs/CONFIDENTIALITY-REVIEW.md` before preparing professional case studies. **Do not deploy this checkpoint:** the latest instruction supersedes the earlier deployment request. [Deployment handoff](docs/DEPLOYMENT.md) is retained for a future approved release. No live Vercel URL is claimed.

<!-- Change only this URL when the portfolio domain changes. -->

[portfolio-url]: https://www.datascienceportfol.io/benitaid2004

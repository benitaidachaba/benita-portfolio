# Benita Idachaba — Data Analytics Portfolio

My professional portfolio as a Data Analyst, showcasing my experience in analytics, business intelligence, data quality, healthcare reporting and supporting work in automation and application development.

Built with Next.js App Router, TypeScript, Tailwind CSS, Motion and Lucide, using an ice-blue, deep-navy and restrained pink visual identity.

## Portfolio link

**Website:** [View my current public portfolio][portfolio-url]

The link currently opens my existing data-science portfolio, which also supplies the public project references used here. This Next.js version is prepared locally; a Vercel deployment has not yet succeeded. After deployment, change the single `portfolio-url` reference at the bottom to the confirmed new URL.

## Current status

Checkpoints 1 and 2 are approved. Checkpoint 3 adds a two-page Data Analyst resume, a complete HTML alternative, PDF viewing/downloading and a nonintrusive homepage spotlight while preserving the visual foundation.

The resume includes professional experience, skills, SQL teaching, selected public analytics projects, education, ALX Data Analytics/Professional Foundations completion supported by supplied certificates, and the publicly listed HNG credential. Live issuer validation, the HNG certificate original and browser verification remain pending; see [resume verification](docs/RESUME-VERIFICATION.md). Detailed case studies are reserved for Checkpoint 4 and require the appropriate content/confidentiality review.

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

Open http://127.0.0.1:3000 and http://127.0.0.1:3000/resume. The resume page offers a desktop PDF viewer, mobile fallback, readable HTML and print control. The homepage artwork remains a labeled temporary study. Detailed project and about routes belong to later checkpoints.

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

The suite starts the production server itself if needed. An installed browser can also be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Its 15 tests cover responsive overflow, menu focus, resume HTTP/download delivery, mobile fallback, spotlight persistence/storage failure, reduced motion, automated accessibility and 404 handling. Successful viewport tests save screenshots under `test-results/`.

`resume:verify` requires Poppler's `pdftotext` on PATH and checks text consistency, links, file bounds and reproducibility. Poppler is not needed for PDF generation or Vercel builds. PDF audit artifacts are kept separately under ignored `artifacts/resume/`.

## Content and design

- `content/`: shared public profile, skills, experience and resume content; `portfolio-projects.ts` inventories the linked portfolio for resume use without creating case-study routes.
- `components/`: reusable navigation, footer, hero, temporary artwork, resume spotlight and sections.
- `app/globals.css`: brand variables, type/spacing/radius tokens, component styling and responsive/reduced-motion rules; Tailwind utilities are available.
- `app/fonts/`: local Inter and Geist assets with licenses, requiring no font-network access at build/runtime.
- `public/resume/`: generated, selectable-text PDF resume.
- `docs/`: planning, checkpoint reports, resume verification, artwork status and deployment instructions.

The Motion library uses its `framer-motion` package entry point. Next.js uses Webpack because Turbopack worker port binding is blocked in the execution environment. Build output remains static-first and ready for later Vercel preparation. The preview metadata is `noindex`; this is not access control or authorization to publish.

Do not add private client material to public content, assets or repository history. See `docs/CONFIDENTIALITY-REVIEW.md` before preparing project case studies. Commit/push and Vercel deployment were requested; network access currently blocks remote completion. See [deployment handoff](docs/DEPLOYMENT.md) for exact setup and status. No live Vercel URL is claimed.

<!-- Change only this URL when the portfolio domain changes. -->

[portfolio-url]: https://www.datascienceportfol.io/benitaid2004

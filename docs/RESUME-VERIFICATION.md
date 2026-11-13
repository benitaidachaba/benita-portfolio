# Checkpoint 3 — resume verification

Review date: 13 November 2026. The owner approved Checkpoints 1–2 and requested resume production, commit/push and Vercel deployment. No Checkpoint 4 case studies were created.

## Implemented

- Editable structured source: `content/resume.ts`, reusing identity/contact from `content/profile.ts`, role facts from `content/experience.ts` and public project summaries from `content/portfolio-projects.ts`.
- Shared semantic `resumePages` blocks drive the HTML document and PDF in the same order; the homepage spotlight receives a small public preview from the same source.
- Sections: Professional Summary, Technical Skills, Professional Experience, Teaching & Technical Leadership, Selected Analytics Projects, Education and Certifications.
- `/resume`: download action, desktop PDF embed with a descriptive title, mobile open/download fallback, complete HTML alternative, print control and professional links.
- Homepage: original hero grid/artwork preserved; download action added to its secondary link row; existing spotlight made expandable and persistently dismissible with a guarded storage fallback. Teaching dates, cohort statement, education and contact now reference shared data.

## Files created or modified

- New content: `content/resume.ts`, `content/portfolio-projects.ts`.
- New resume UI: `components/resume/resume-document.tsx`, `resume-spotlight-panel.tsx`, `print-button.tsx`; new route styles in `app/resume/resume.css`.
- Generated deliverable: `public/resume/Benita_Idachaba_Data_Analyst_Resume.pdf`.
- New tooling: `scripts/generate-resume.ts`, `scripts/verify-resume.ts`, `tests/resume.spec.ts`, `.vercelignore`.
- Updated UI/data: `app/resume/page.tsx`, `app/page.tsx`, `app/globals.css`, `components/resume/resume-spotlight.tsx`, `components/hero/hero.tsx`, `components/layout/footer.tsx`, `content/profile.ts`.
- Updated checks/config: `scripts/check-foundation.py`, `tests/visual-foundation.spec.ts`, `package.json`, `package-lock.json`, `next.config.ts`, `.gitignore`.
- Documentation: this report, `docs/DEPLOYMENT.md`, `docs/CONTENT-AUDIT.md`, `docs/CONFIDENTIALITY-REVIEW.md`, `docs/IMPLEMENTATION-PLAN.md`, `README.md`.

Certificate originals remain outside the repository. PDF render images/layout logs are local, ignored artifacts, not public site assets.

## Content decisions

| Item | Resolution |
| --- | --- |
| Contact email | `idachababenita2@gmail.com`, found in the supplied public portfolio and its marketing project page. No alternate email was found in inspected sources |
| Zeto Health | August 2025–Present, approved role/title and general analytical responsibilities; collaborative work is not described as solely owned |
| Atasun Group | July–August 2025 per explicit owner correction; omit unverified 40% metric |
| techiesMAtch | April–July 2025; title/dates only, no invented responsibilities |
| HNG Tech | January–April 2025 internship, approved Python/Excel/Power BI/reporting responsibilities |
| Teaching | Bivy July 2025–September 2026; Digitally Drive July 2025–August 2026. More than 200 students stated across cohorts |
| Education | B.Sc. Biological Sciences, University of Abuja, completed January 2025 |
| Certifications | ALX Data Analytics and Professional Foundations completion certificates inspected from owner-supplied originals; HNG Tech Data Analyst Intern credential corroborated on LinkedIn. No certificate dates, IDs or verification links added |
| Public projects | Two short analytical summaries from the supplied portfolio; no campaign results, dataset-size metrics or unsupported client outcomes |

Sources: [public portfolio](https://www.datascienceportfol.io/benitaid2004), [marketing project](https://www.datascienceportfol.io/benitaid2004/projects/1), [LinkedIn profile and credentials](https://ng.linkedin.com/in/benita-idachaba-24450629b), the owner's current instructions and the supplied local Certificates folder. ALX certificate images were visually inspected. Claude 101 and AI Fluency certificates were also reviewed but omitted to maintain the analyst focus. No originals, IDs or QR codes are committed. Public-source descriptions are not an independent audit of underlying project artifacts or a live issuer validation of certificates.

## PDF generation

`npm run resume:generate` uses the development-only `pdf-lib` library through Node with the `tsx` import hook. Browser-based generation was impractical because this environment blocks browser/server startup; no runtime PDF library is shipped to website visitors.

Output: `public/resume/Benita_Idachaba_Data_Analyst_Resume.pdf`. It uses two A4 pages, standard selectable Helvetica text, navy headings, one reading column and URI annotations for contact/profile/project links. The generator checks text bounds and fails on overflow. No photo, tables, progress bars, artwork or confidential screenshots are included.

The generation order is fixed; metadata dates are pinned to this content revision (13 November 2026) for reproducibility, not used as credential dates. `prebuild` regenerates the PDF before every production build. A layout audit is written outside public assets to ignored `artifacts/resume/layout.json`. The committed PDF also supports immediate development preview without a browser-generation service.

The PDF is not PDF/UA-tagged. Selectable text and extraction checks support ATS readability, but do not establish compatibility with every ATS or full PDF accessibility. The semantic HTML alternative remains the accessible primary reading option.

## Actual validation

| Check | Result |
| --- | --- |
| TypeScript | `npm run typecheck` passed |
| Lint | `npm run lint` passed without errors or warnings |
| Production | `npm run build` passed, including automatic PDF generation and static `/resume` output |
| PDF validity | `pdfinfo` confirms two A4 pages, unencrypted PDF with no JavaScript |
| Selectable text | `pdftotext -layout` extraction succeeded |
| Source consistency | `npm run resume:verify` passes for 60 source fragments in both extracted PDF text and generated HTML |
| PDF links | Six URI annotations present; expected contact, LinkedIn, GitHub and project destinations found. External destination availability is not guaranteed by this check |
| Download destinations | Generated homepage and resume page contain the actual PDF path and named download attributes; PDF file exists |
| Reproducibility | Two successive generations produce identical SHA-256 hashes |
| Geometry | Every audited text line lies within the PDF's 44pt content margins; footer is separately placed |
| PDF visual inspection | Both pages rendered with Poppler and inspected; no text clipping seen. Preview images can be recreated with the command below |
| HTML structure/contrast | `python3 scripts/check-foundation.py` passed landmarks, headings, references, anchor/asset destinations and specified color-pair calculations |
| Browser tests | 15 tests discovered. Execution blocked before tests: local server fails `listen EPERM` on port 3100 |
| HTTP resume/PDF delivery | Browser/request tests are written but could not execute locally because server startup is prohibited |
| Mobile, keyboard, reduced motion and automated accessibility | Implementation and semantic output checked; actual browser verification remains blocked. No pass or Lighthouse score claimed |

## Remaining uncertainties

- ALX certificate originals were supplied and inspected, resolving the earlier document-evidence gap. There is no HNG certificate file in the supplied folder; its listed title is corroborated on LinkedIn. Live issuer verification has not been performed, and the resume does not claim issuer-verified status. IDs and dates shown on ALX documents are deliberately omitted; no verification links are invented.
- The techiesMAtch achievement details remain unconfirmed; the role is retained without bullets.
- JAR's full name is not confirmed; retain the supplied acronym.
- Project repositories, underlying computations and direct geospatial project URL need later review. The geospatial link deliberately opens the supplied profile rather than an invented route.
- Professional case studies remain restricted; the resume only uses approved general employment statements with no government client name, internal URL, patient/beneficiary data or proprietary architecture.
- Browser rendering, mobile PDF behavior and keyboard operation need a successful browser run outside the restricted environment. Print CSS is provided, but browser print pagination is not verified and may differ from the generated PDF.
- Stored spotlight dismissal is applied after hydration; returning visitors may briefly see the inline panel before local storage is read. It never blocks navigation or resume access.

## Review locally

```sh
npm ci
npm run resume:generate
npm run dev
```

Open http://127.0.0.1:3000/resume or open the PDF directly. To validate after editing shared content:

```sh
npm run typecheck
npm run lint
npm run build
npm run resume:verify
python3 scripts/check-foundation.py
```

`resume:verify` requires Poppler's `pdftotext` on PATH; PDF generation and the production build do not require it. Optional page images:

```sh
pdftoppm -scale-to 1400 -png public/resume/Benita_Idachaba_Data_Analyst_Resume.pdf artifacts/resume/page
```

For actual browser checks: `npx playwright install chromium`, then `npm run test:e2e` after building. Browser screenshots remain separate under `test-results/` so they do not erase the PDF audit artifacts.

Review the wording, missing credential evidence and selected project scope. Stop at Checkpoint 3; deployment is a separately requested action and does not authorize Checkpoint 4 content creation.

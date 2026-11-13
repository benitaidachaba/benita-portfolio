# Benita Idachaba — Data Analytics Portfolio

My professional portfolio as a Data Analyst, showcasing my experience in analytics, business intelligence, data quality, healthcare reporting and supporting work in automation and application development.

Built with Next.js App Router, TypeScript, Tailwind CSS, Motion and Lucide, using an ice-blue, deep-navy and restrained pink visual identity.

## Portfolio link

**Website:** [Portfolio website — placeholder, not yet deployed][portfolio-url]

The website address is changeable. After deployment, replace the `portfolio-url` value at the bottom of this README with the actual portfolio URL. The current `.example` address is an intentional placeholder, not a live website.

## Current status

Checkpoint 2 visual foundation, awaiting visual review. The project includes a responsive homepage, mobile navigation, resume preview, project collection previews, technical capabilities, experience, teaching and contact sections.

The final resume, detailed case studies and website deployment are still pending. Professional case studies will only be published after the relevant content and confidentiality approvals.

## Professional profiles

- [LinkedIn](https://www.linkedin.com/in/benita-idachaba-24450629b/)
- [GitHub](https://github.com/benitaidachaba)

## Local development

Use Node.js 22 or newer and npm. From this directory:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. The homepage includes temporary artwork and explicitly labeled collection/resume previews. `/resume` is a visual overview, not the final resume. No PDF download exists yet. The navigation uses working homepage sections; detailed project and about routes belong to later checkpoints.

## Validation

```sh
npm run typecheck
npm run lint
npm run build
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

The suite starts the production server itself if needed. An installed browser can also be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Browser tests cover responsive overflow, menu keyboard focus and dismissal, resume navigation, reduced motion, automated accessibility and 404 handling. Successful viewport tests save full-page screenshots under `test-results/`.

## Content and design

- `content/`: supplied public profile, skills and experience; project objects are collection previews only.
- `components/`: reusable navigation, footer, hero, temporary artwork, resume spotlight and sections.
- `app/globals.css`: brand variables, type/spacing/radius tokens, component styling and responsive/reduced-motion rules; Tailwind utilities are available.
- `app/fonts/`: local Inter and Geist assets with licenses, requiring no font-network access at build/runtime.
- `docs/`: approved planning documents, Checkpoint 2 report and artwork replacement instructions.

The Motion library uses its `framer-motion` package entry point. Next.js uses Webpack because Turbopack worker port binding is blocked in the execution environment. Build output remains static-first and ready for later Vercel preparation. The preview metadata is `noindex`; this is not access control or authorization to publish.

Do not add private client material to public content, assets or repository history. See `docs/CONFIDENTIALITY-REVIEW.md` before preparing project case studies. The final resume, project evidence, email contact and deployment remain separate approval gates.

<!-- Change only this URL when the portfolio domain changes. -->
[portfolio-url]: https://your-portfolio-domain.example

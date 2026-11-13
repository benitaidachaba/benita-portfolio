# Design specification

Status: Checkpoint 3.1 local review. The current specification below supersedes the historical Checkpoint 2 baseline retained later in this file. Self-hosted Inter, Geist and Geist Mono remain unchanged.

## Current navy-first system

| Token | Value | Role |
| --- | --- | --- |
| `--site-canvas` | `#072D50` | Dominant canvas, hero, header, footer |
| `--site-surface` | `#0B3559` | Supporting navy cards and systems section |
| `--site-text` | `#DBF2FC` | Main text on navy |
| `--site-muted` | `#BDD6E5` | Readable secondary text on navy |
| `--site-border` | `#53748E` | Decorative outlines; focus uses stronger ice/navy contrast |
| Existing `--action` | `#FE5C80` | Resume and contact actions; navy text |
| Existing paper tokens | White / navy | Resume document and print output |

The capabilities section uses ice blue for contrast. Ordinary badges, source-review states and hover states use navy/ice, never unrelated green or decorative pink. The document stays white and readable inside the navy page frame. Font sizes and spacing retain the established scale.

Branding: a shared `BrandMark` renders exactly `BI`, with deliberate letter spacing and a 44px interaction area. The favicon uses uppercase paths. Application, title and Open Graph metadata use uppercase BI branding.

Navigation: a sticky top-level header, never hidden by scroll direction. The current route/section has an ice fill and navy text, matching hover. IntersectionObserver watches a band below the header; it changes state only when the section changes. Observer margins use pixel dimensions to avoid percentage-width ambiguities. Resizing reinitializes observation through requestAnimationFrame. Native mobile dialog includes explicit Tab/Shift+Tab containment, Escape dismissal and trigger-focus restoration. The skip link sits above the header.

Layout order: hero, featured analytics, complete HTML resume, professional systems, capabilities, contact/footer. Shared resume sections replace duplicate employment/teaching/education presentations. The same document renders on `/resume` without a PDF viewer. Print rules isolate the resume on either route.

Artwork: the existing SVG fallback is a large background layer with pointer events disabled, no caption or text overlays, and no layout participation on desktop. A fixed-height region contains it on smaller screens. `useScroll`/`useTransform` map 0–1000px scroll to −12°…38°, with a short spring interpolation; there is no continuous spin or React scroll-state loop. This is **2D rotation of a vector illustration**, not a true 3D asset. At widths ≤599px and under reduced motion, transforms are disabled. Fallback status is documented in `ARTWORK.md` rather than displayed over the art.

Contrast was checked both numerically and with browser accessibility tests; actual results and screenshots are in `CHECKPOINT-3.1.md`. Existing editorial typography, whitespace, responsive structure, focus treatment and token architecture remain in use through a separate `app/refinements.css` layer.

## Historical Checkpoint 2 baseline

## Direction: an editorial analytics portfolio

Use a spacious ice-blue canvas, strong navy typography and one sculptural glass focal point. Hierarchy should feel like a carefully edited analytical report, with small monospace section indexes and clear evidence labels. Avoid simulated dashboards with invented results, decorative charts, proficiency meters, excessive pill badges and a uniform grid of identical cards.

Use a classic split hero followed by varied editorial sections: a narrow resume preview, substantial project panels, compact skill columns, a chronological experience list and a restrained navy systems section. The progression foregrounds analysis, then reveals technical breadth.

The owner's requested Space Grotesk/Inter pairing, navy headings, Lucide icons, brand palette and exact section order take precedence over conflicting generic landing-page skill defaults. Do not add a sales FAQ or word-by-word tagline animation to satisfy an unrelated template.

## Color tokens

Define these semantic CSS variables during implementation; the values below are proposed tokens, not application code.

| Token | Value | Use |
| --- | --- | --- |
| `--color-background` | `#DBF2FC` | Primary canvas |
| `--color-ink` | `#072D50` | Headings, body, navigation, dark panels |
| `--color-action` | `#FE5C80` | View Resume and limited important interactive emphasis |
| `--color-surface` | `#FFFFFF` | Resume paper and content surfaces |
| `--color-surface-muted` | `#F4FAFD` | Quiet supporting panels |
| `--color-text-muted` | `#35546C` | Secondary text, subject to measured contrast |
| `--color-border` | `#B4CBD8` | Decorative card outlines; not the sole control boundary |
| `--color-focus` | `#072D50` | Focus on light surfaces; white on dark |

Use navy text on pink buttons. White text on the pink accent must not be assumed accessible. Measure all final color combinations, including composited glass surfaces, active filters and focus rings. Never reduce body text opacity to suggest hierarchy. Use a clear navy boundary for controls when pale borders do not meet required contrast.

Pink belongs to the highest priority CTA; ordinary filters, skill labels, outlines and hover states use navy and white. The requested very subtle pink reflection may appear within the artwork only. Backgrounds remain flat. Glass effects are limited to navigation, artwork and a small number of surfaces with opaque fallbacks.

## Typography

Self-host through Next.js font tooling where feasible. Heading family: Space Grotesk. Body: Inter. Technical labels: a restrained monospace family such as Geist Mono. Use only the weights required, normally 400, 500 and 600; avoid italics and ultra-heavy weights.

| Named style | Desktop size/line height | Mobile size/line height | Weight |
| --- | --- | --- | --- |
| Heading 1: name | 60/60 | 36/40 | 600 |
| Heading 2: sections | 48/48 | 30/36 | 600 |
| Heading 3: project titles | 30/36 | 24/32 | 600 |
| Heading 4: hero statement | 30/36 | 24/32 | 500 |
| Title 1 | 20/28 | 20/28 | 500 |
| Body 3 | 16/24 | 16/24 | 400 |
| Body 6 | 14/20 | 14/20 | 400 |
| Button-md | 16/24 | 16/24 | 600 |
| Caption 4 | 12/16 | 12/16 | 500 |

Implement named reusable classes and CSS variables for these styles. Use one `h1` per route, balanced heading wrapping and readable body line lengths of approximately 60–70 characters. Keep the hero text block at most 680px wide. Name and explicit Data Analyst role remain immediately readable; the supplied long headline must not dominate the name or hide the CTA.

## Geometry and layout

- Spacing scale: 0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96px, mapped to CSS variables.
- Page width: approximately 1200px maximum. Gutters: 16px compact mobile, 24px tablet, 48px desktop. Section padding: 48px mobile and 80–96px desktop.
- Use a 12-column desktop composition with hero text/art approximately 7/5 columns; collapse below 1024px. Use a six-column tablet and single-column phone reading flow as needed.
- Radius tokens: 4px technical inset, 8px controls, 16px cards, 24px feature panels and full rounding for the compact navigation. Nested corners should reflect their padding.
- Cards use full outlines or no outline. Avoid heavy shadows; use subtle navy-tinted shadows only to lift glass and resume paper.
- Minimum interactive target: 44×44px; button padding increases as necessary to satisfy target size. Never trade tap area for a compact aesthetic.

## Hero and artwork

Desktop: floating navigation above a generous two-column hero. Left reading order: eyebrow → Benita Idachaba → Data Analyst → supplied headline → supporting copy → View Resume / Explore Projects → GitHub / LinkedIn. Right: original interconnected glass rings or ribbon with frosted/transparent material, ice-blue highlights, navy reflections, soft shadows and barely visible pink refraction. No text, data labels or embedded logos.

Mobile: preserve the text and CTAs first; reduce artwork size and place it after the primary content. Do not promise all hero content fits within every first viewport. At 390px prioritize the role and resume action; show the spotlight immediately below the hero when space is constrained.

Artwork plan for Checkpoint 2: use the available image-generation capability under the imagegen skill, then inspect material quality, transparent edges and composition. Derive optimized transparent WebP (AVIF if alpha quality and tooling are suitable), provide responsive sizes and explicit dimensions. Target roughly 250KB for the primary delivered variant, validating visual quality before adopting the budget. Keep an accessible CSS/SVG fallback if generation or optimization fails, documented as a fallback. Do not describe a placeholder as final artwork.

Treat the sculpture as decorative with empty alt text. Meaningful project illustrations receive descriptive alt text and an explicit synthetic-demo caption. Do not generate images that impersonate actual application screenshots. Prioritize the hero image only if measured loading behavior warrants it; lazy-load below-fold media.

## Component behavior

| Component | Specification |
| --- | --- |
| Navigation | Translucent white with strong text contrast and solid fallback. Active page label; prominent resume action. Mobile full-height panel with toggle state, Escape handling, focus containment if modal, restored focus and body-scroll cleanup |
| Resume spotlight | Inline, non-blocking preview with summary, View Resume, expand and dismiss controls; reserved initial space; no PDF loaded on the homepage |
| Featured projects | Large title and business question, role, concise analytics evidence and neutral category labels; imagery only when approved |
| Filters | Two collection choices plus All; category buttons with pressed state; default All; no state conveyed by color alone |
| Skills | Four text groups, no mastery scores. Mark Power BI DAX as a development area if mentioned |
| Experience | Reverse chronological dates, employer and role; confirmed bullets only; teaching separate |
| Resume page | Readable document layout with visible download; optional desktop viewer; print hides navigation and decorative elements |
| Contact | Direct email once confirmed and professional links; no form or backend |

Hover uses navy surface/underline shifts; active controls provide subtle press feedback. Focus rings remain visible and distinct from selection. Route-loading UI is only introduced where real asynchronous work exists; errors and empty states always have clear recovery links. Avoid fake loading delays.

## Motion and accessibility

Use cubic-bezier(0.22, 1, 0.36, 1), around 500ms for positional transitions and 300ms for hover opacity/color. Reveal sections once using small transform/opacity changes. Prefer no continuous artwork animation. Motion is a progressive enhancement; server-rendered content stays visible if JavaScript fails.

For `prefers-reduced-motion`, remove displacement, stagger and smooth scrolling. Disable decorative movement entirely. Do not animate dimensions or attach unthrottled scroll handlers. Include skip navigation, semantic landmarks, correct headings and text alternatives. Ensure content reflows at 200% zoom and keyboard focus is never obscured by the navigation.

## Visual review at Checkpoint 2

Review hero hierarchy, glass quality, brand restraint, resume discoverability, contrast and desktop/mobile composition at 390, 768 and 1440px, with an additional 320px overflow check. Confirm art does not crowd the text, no restricted project evidence is visible and motion preferences work. No measured accessibility or performance score exists at this checkpoint.

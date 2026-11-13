# Vercel and GitHub handoff

The owner's final Checkpoint 3 instruction explicitly requests a commit, GitHub push, Vercel deployment and README URL update. This supersedes earlier instructions to keep the checkpoint local. It does not authorize detailed professional case studies or Checkpoint 4 implementation.

## Current result

GitHub API access fails from this execution environment (`error connecting to api.github.com`). Vercel CLI 62.4.0 is available through the local package cache, but `vercel whoami` fails with `TypeError: fetch failed`. The authorized `vercel deploy --prod --yes` command was also attempted after all code/artifact checks passed; it failed at “Loading teams…” with `TypeError: fetch failed`. No deployment ID or production URL was returned. Neither remote operation can be completed while outbound access is unavailable.

The Vercel connection was offered but has not been confirmed connected. Do not commit authentication files or paste access tokens into source, commands, logs or chat. Existing CLI authentication may need to be renewed from a normal terminal once network access works. The README now links to the owner's supplied, existing public data-science portfolio rather than an invented Vercel address; it explicitly distinguishes that site from this undeployed Next.js version.

## Build settings

- Framework preset: Next.js, repository root directory.
- Node.js: 22.x supported project target (local checks ran on Node 26.8.2).
- Install: `npm ci`, including development dependencies required by the build.
- Build: `npm run build`. Its `prebuild` hook regenerates the PDF deterministically from `content/resume.ts`.
- Output: normal Next.js output; do not force static export or upload `.next` as a generic static folder.
- No database, authentication system, runtime secrets or paid service is required.
- PDF generation uses Node and `pdf-lib`; no browser or Poppler needed on Vercel. Poppler is only a local verification tool.
- The unchanged PDF filename revalidates through `Cache-Control: public, max-age=0, must-revalidate`, configured in `next.config.ts`.
- `.vercelignore` excludes local artifacts, credentials, caches and test output. Existing `.gitignore` also excludes these files.
- The intermediate site retains `noindex` metadata until the full content launch is ready. This does not restrict access to a deployed site.

## Local verification

```sh
npm ci
npm run typecheck
npm run lint
npm run build
npm run resume:verify
python3 scripts/check-foundation.py
```

If Poppler is unavailable, install it for `resume:verify`, or report that text-extraction verification was not run. The production build itself needs no system PDF tools. Run browser checks where loopback networking and Chromium are available.

## Publish from a normal connected terminal

Authenticate through the standard GitHub and Vercel login flows. Reuse an existing `benitaidachaba/benita-portfolio` repository if it was created outside this session; check before creating a duplicate. Likewise reuse an existing Vercel project if one has been linked, and do not change a project's audience or domain settings unnecessarily.

For a new repository from the committed upload copy:

```sh
gh auth login
gh repo create benitaidachaba/benita-portfolio --public --source=. --remote=origin --push
```

For an existing remote, add or verify `origin`, then `git push -u origin main`. Do not force-push or overwrite unrelated history.

Vercel's standard deployment workflow:

```sh
npx vercel login
npx vercel deploy --prod
```

Select the intended account/project, Next.js framework and repository root. The owner has requested deployment; extra approval is only necessary if a paid upgrade or conflicting project setting is required. Confirm the returned deployment/alias before reporting a live URL.

After success, replace only the `[portfolio-url]` reference at the bottom of `README.md` with the literal production URL, update the website-status sentence, commit that change and push. Keep the earlier public data-science portfolio as a separate project source link. Never fabricate a `vercel.app` address.

Verify `/`, `/resume`, a direct PDF open/download and an unknown route on the deployed site. Confirm download headers, readable HTML on mobile, unchanged homepage design and absence of restricted content. Record actual results in this file. If rollback is needed, use the previously verified deployment through the Vercel dashboard; do not delete projects or domains.

References: [Vercel CLI deployment](https://vercel.com/docs/cli/deploy), [Next.js installation/build requirements](https://nextjs.org/docs/app/getting-started/installation).

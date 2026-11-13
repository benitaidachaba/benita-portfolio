import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { PDFDocument, PDFDict, PDFName, PDFString } from "pdf-lib";
import { resume, resumePages } from "../content/resume";

const normalize = (text: string) =>
  text.normalize("NFKC").replace(/[–—]/g, "-").replace(/\s+/g, " ").trim();

async function main() {
  const path = `public${resume.pdf.url}`;
  const bytes = readFileSync(path);
  assert.equal(bytes.subarray(0, 5).toString(), "%PDF-");
  const pdf = await PDFDocument.load(bytes);
  assert.equal(pdf.getPageCount(), 2);
  const rawText = execFileSync("pdftotext", ["-layout", path, "-"], {
    encoding: "utf8",
  });
  const text = normalize(rawText);
  const htmlTexts = [
    ".next/server/app/resume.html",
    ".next/server/app/index.html",
  ].map((file) => {
    const html = readFileSync(file, "utf8");
    const article = html.match(
      /<article\b[^>]*class="resume-document"[\s\S]*?<\/article>/,
    )?.[0];
    assert(article, `Rendered HTML resume missing from ${file}`);
    return normalize(
      article
        .replace(/<[^>]+>/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">"),
    );
  });
  const expectedText = [
    resume.name,
    resume.title,
    resume.location,
    resume.email,
    ...resumePages.flatMap((blocks) =>
      blocks.flatMap((block) =>
        block.kind === "entry"
          ? [block.title, block.detail, block.dates].filter(
              (value): value is string => Boolean(value),
            )
          : [block.text],
      ),
    ),
  ];
  for (const expected of expectedText) {
    assert(
      text.includes(normalize(expected)),
      `PDF missing source text: ${expected}`,
    );
    assert(
      htmlTexts.every((htmlText) => htmlText.includes(normalize(expected))),
      `HTML missing source text: ${expected}`,
    );
  }
  for (const forbidden of [
    /\bTBC\b/i,
    /\bTBD\b/i,
    /40\s*%/,
    /95\s*%/,
    /advanced DAX/i,
    /credential ID/i,
  ])
    assert(
      !forbidden.test(text),
      `Unsupported claim or placeholder: ${forbidden}`,
    );
  let previous = -1;
  for (const job of resume.experience) {
    const at = text.indexOf(normalize(`${job.organization} | ${job.role}`));
    assert(at > previous, "Professional experience order changed");
    previous = at;
  }
  const foundLinks = new Set<string>();
  for (const page of pdf.getPages()) {
    assert(
      Math.abs(page.getWidth() - 595.28) < 0.1 &&
        Math.abs(page.getHeight() - 841.89) < 0.1,
      "Expected A4 pages",
    );
    for (const reference of page.node.Annots()?.asArray() ?? []) {
      const annotation = pdf.context.lookup(reference, PDFDict);
      const action = annotation.get(PDFName.of("A"));
      if (action instanceof PDFDict) {
        const uri = action.get(PDFName.of("URI"));
        if (uri instanceof PDFString) foundLinks.add(uri.decodeText());
      }
    }
  }
  for (const url of [
    `mailto:${resume.email}`,
    ...resume.links.map((link) => link.url),
    ...resume.projects.map((project) => project.url),
  ])
    assert(foundLinks.has(url), `PDF link is missing: ${url}`);
  const layout = JSON.parse(
    readFileSync("artifacts/resume/layout.json", "utf8"),
  );
  assert(
    layout.text.every(
      (line: { y: number; x: number; size: number; width: number }) =>
        line.x >= layout.margin &&
        line.x + line.width <= layout.width - layout.margin + 0.1 &&
        line.y - line.size >= layout.margin &&
        line.y + line.size <= layout.height - layout.margin + 0.1,
    ),
    "PDF text crosses the safe content area",
  );
  for (const file of [
    ".next/server/app/index.html",
    ".next/server/app/resume.html",
  ]) {
    const page = readFileSync(file, "utf8");
    assert(
      page.includes(`href="${resume.pdf.url}"`),
      `No download destination in ${file}`,
    );
    assert(
      page.includes(`download="${resume.pdf.filename}"`),
      `No named download in ${file}`,
    );
  }
  const beforeHash = createHash("sha256").update(bytes).digest("hex");
  execFileSync(process.execPath, [
    "--import",
    "tsx",
    "scripts/generate-resume.ts",
  ]);
  const afterHash = createHash("sha256")
    .update(readFileSync(path))
    .digest("hex");
  assert.equal(
    beforeHash,
    afterHash,
    "Repeated PDF generation is not deterministic",
  );
  console.log(
    `PASS: 2 A4 pages; ${expectedText.length} source text fragments match extracted PDF, homepage HTML and dedicated resume HTML; links and download targets present; no overflow or disputed metrics; deterministic SHA-256 ${beforeHash}.`,
  );
  console.log(
    "HTTP delivery and browser layout/accessibility checks are separate from these artifact checks.",
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

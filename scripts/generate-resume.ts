import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  PDFName,
  PDFString,
  type PDFFont,
} from "pdf-lib";
import { resume, resumePages } from "../content/resume";

async function main() {
  // Browser-independent, deterministic two-page A4 PDF with real text and URI links.
  const document = await PDFDocument.create();
  const regular = await document.embedFont(StandardFonts.Helvetica);
  const bold = await document.embedFont(StandardFonts.HelveticaBold);
  const fixedDate = new Date("2026-11-13T00:00:00Z"); // Reproducible metadata, not a credential/completion date.
  document.setTitle(`${resume.name} — ${resume.title} Resume`);
  document.setAuthor(resume.name);
  document.setSubject("Data analytics, business intelligence and reporting");
  document.setCreator("Benita portfolio structured resume generator");
  document.setProducer("pdf-lib");
  document.setCreationDate(fixedDate);
  document.setModificationDate(fixedDate);
  document.catalog.set(PDFName.of("Lang"), PDFString.of("en-NG"));

  const W = 595.28,
    H = 841.89,
    margin = 44,
    lineHeight = 13.5;
  const ink = rgb(7 / 255, 45 / 255, 80 / 255);
  const body = rgb(0.12, 0.16, 0.2);
  const layout: {
    page: number;
    text: string;
    x: number;
    y: number;
    size: number;
    width: number;
  }[] = [];
  const links: string[] = [];

  for (const [pageIndex, blocks] of resumePages.entries()) {
    const page = document.addPage([W, H]);
    let y = H - margin - 24;

    function drawLine(
      text: string,
      options: {
        x?: number;
        size?: number;
        font?: PDFFont;
        navy?: boolean;
        url?: string;
      } = {},
    ) {
      const x = options.x ?? margin,
        size = options.size ?? 10.5,
        font = options.font ?? regular;
      const width = font.widthOfTextAtSize(text, size);
      if (
        x + width > W - margin + 0.1 ||
        y - size < margin ||
        y + size > H - margin + 0.1
      )
        throw new Error(`Resume overflows page ${pageIndex + 1}: ${text}`);
      page.drawText(text, {
        x,
        y,
        size,
        font,
        color: options.navy ? ink : body,
      });
      layout.push({ page: pageIndex + 1, text, x, y, size, width });
      if (options.url) {
        const annotation = document.context.register(
          document.context.obj({
            Type: "Annot",
            Subtype: "Link",
            Rect: [x, y - 2, x + width, y + size],
            Border: [0, 0, 0],
            A: { Type: "Action", S: "URI", URI: PDFString.of(options.url) },
          }),
        );
        page.node.addAnnot(annotation);
        links.push(options.url);
      }
    }

    function paragraph(
      text: string,
      options: {
        size?: number;
        font?: PDFFont;
        indent?: number;
        bullet?: boolean;
        navy?: boolean;
      } = {},
    ) {
      const font = options.font ?? regular,
        size = options.size ?? 10.5,
        indent = options.indent ?? 0;
      const limit = W - 2 * margin - indent;
      const words = text.split(/\s+/);
      let current = "";
      const lines: string[] = [];
      for (const word of words) {
        const candidate = current ? `${current} ${word}` : word;
        if (font.widthOfTextAtSize(candidate, size) > limit) {
          if (!current) throw new Error(`Unbreakable word: ${word}`);
          lines.push(current);
          current = word;
        } else current = candidate;
      }
      if (current) lines.push(current);
      for (const [index, line] of lines.entries()) {
        if (index === 0 && options.bullet) drawLine("•", { x: margin, size });
        drawLine(line, { x: margin + indent, font, size, navy: options.navy });
        y -= lineHeight;
      }
    }

    drawLine(resume.name, {
      font: bold,
      size: pageIndex === 0 ? 24 : 17,
      navy: true,
    });
    y -= pageIndex === 0 ? 26 : 21;
    drawLine(resume.title, { font: bold, size: 12, navy: true });
    y -= 17;
    if (pageIndex === 0) {
      drawLine(`${resume.location} | ${resume.email}`, {
        size: 10.5,
        url: `mailto:${resume.email}`,
      });
      y -= 16;
      let x = margin;
      for (const link of resume.links) {
        drawLine(link.label, { x, size: 10.5, navy: true, url: link.url });
        x += regular.widthOfTextAtSize(link.label, 10.5) + 22;
      }
      y -= 10;
    }
    y -= 13;

    for (const block of blocks) {
      if (block.kind === "heading") {
        y -= 8;
        paragraph(block.text, { font: bold, size: 11.5, navy: true });
        y -= 5;
      } else if (block.kind === "entry") {
        y -= 4;
        paragraph(
          block.detail ? `${block.title} | ${block.detail}` : block.title,
          { font: bold, size: 10.5, navy: true },
        );
        if (block.dates) paragraph(block.dates, { size: 10 });
        y -= 3;
      } else if (block.kind === "link") {
        drawLine(block.text, { size: 10, navy: true, url: block.url });
        y -= 17;
      } else {
        paragraph(block.text, {
          indent: block.kind === "bullet" ? 12 : 0,
          bullet: block.kind === "bullet",
        });
        y -= block.kind === "bullet" ? 3 : 5;
      }
    }

    // Footer is outside the content boundary and intentionally not part of resume facts.
    page.drawText(
      `${resume.name} | ${pageIndex + 1} of ${resumePages.length}`,
      { x: margin, y: 24, size: 8, font: regular, color: body },
    );
  }

  const outputDirectory = join(process.cwd(), "public/resume");
  await mkdir(outputDirectory, { recursive: true });
  await mkdir(join(process.cwd(), "artifacts/resume"), { recursive: true });
  await writeFile(
    join(outputDirectory, resume.pdf.filename),
    await document.save({
      useObjectStreams: false,
      addDefaultPage: false,
      updateFieldAppearances: false,
    }),
  );
  await writeFile(
    join(process.cwd(), "artifacts/resume/layout.json"),
    JSON.stringify(
      {
        pages: resumePages.length,
        width: W,
        height: H,
        margin,
        links,
        text: layout,
      },
      null,
      2,
    ),
  );
  console.log(
    `Generated ${resume.pdf.url}: ${resumePages.length} A4 pages, ${layout.length} text lines, ${links.length} clickable links.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

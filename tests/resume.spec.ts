import { expect, test } from "@playwright/test";
import { resume } from "../content/resume";

for (const route of ["/", "/resume"]) {
  test(`full resume is readable without a PDF on ${route}`, async ({
    page,
    request,
  }) => {
    await page.goto(route);
    const document = page.locator(".resume-document");
    for (const heading of [
      "Professional Summary",
      "Technical Skills",
      "Professional Experience",
      "Teaching & Technical Leadership",
      "Education",
      "Certifications",
    ])
      await expect(
        document.getByRole("heading", { name: heading, exact: true }),
      ).toBeVisible();
    await expect(
      page.locator(
        "iframe, object[type='application/pdf'], .resume-mini-preview",
      ),
    ).toHaveCount(0);
    const pdfResponse = await request.get(resume.pdf.url);
    expect(pdfResponse.status()).toBe(200);
    expect(pdfResponse.headers()["content-type"]).toContain("application/pdf");
    expect((await pdfResponse.body()).subarray(0, 5).toString()).toBe("%PDF-");
  });
}

test("mobile HTML resume reflows and download is named", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/resume");
  await expect(
    page.getByRole("link", { name: "Download Resume (PDF)" }),
  ).toHaveAttribute("download", resume.pdf.filename);
  await page.getByRole("link", { name: "Read HTML resume" }).click();
  await expect(page).toHaveURL(/#html-resume$/);
  await expect(page.locator(".resume-document")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("printing either route isolates a clean two-page resume", async ({
  page,
}, testInfo) => {
  const { PDFDocument } = await import("pdf-lib");
  for (const route of ["/", "/resume"]) {
    await page.goto(route);
    await page.emulateMedia({ media: "print" });
    await expect(page.locator(".site-header")).not.toBeVisible();
    await expect(page.locator(".site-footer")).not.toBeVisible();
    await expect(page.locator(".resume-document")).toBeVisible();
    if (route === "/") await expect(page.locator("#hero")).not.toBeVisible();
    const bytes = await page.pdf({
      path: testInfo.outputPath(
        route === "/"
          ? "homepage-resume-print.pdf"
          : "dedicated-resume-print.pdf",
      ),
      format: "A4",
      preferCSSPageSize: true,
    });
    expect((await PDFDocument.load(bytes)).getPageCount()).toBe(2);
  }
});

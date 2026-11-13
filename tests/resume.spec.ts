import { expect, test } from "@playwright/test";
import { resume } from "../content/resume";

test("resume route and PDF download return valid content", async ({
  page,
  request,
}) => {
  const response = await page.goto("/resume");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: "Data Analyst Resume" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Download Resume (PDF)" }),
  ).toHaveAttribute("download", resume.pdf.filename);
  const pdfResponse = await request.get(resume.pdf.url);
  expect(pdfResponse.status()).toBe(200);
  expect(pdfResponse.headers()["content-type"]).toContain("application/pdf");
  expect((await pdfResponse.body()).subarray(0, 5).toString()).toBe("%PDF-");
});

test("mobile resume reflows and offers the HTML/PDF fallback", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/resume");
  await expect(page.locator(".pdf-mobile-fallback")).toBeVisible();
  await expect(page.locator("iframe")).not.toBeVisible();
  await page.getByRole("link", { name: "Read HTML resume" }).click();
  await expect(page).toHaveURL(/#html-resume$/);
  await expect(page.getByRole("article")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("spotlight expands by keyboard and dismissal persists", async ({
  page,
}) => {
  await page.goto("/");
  const preview = page.getByText("Preview resume details", { exact: true });
  await preview.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".resume-mini-preview")).toHaveAttribute(
    "open",
    "",
  );
  await page.getByRole("button", { name: "Dismiss resume preview" }).click();
  await expect(page.locator(".nav-resume")).toBeFocused();
  await page.reload();
  await expect(page.locator(".resume-spotlight")).toHaveCount(0);
  await expect(page.locator(".nav-resume")).toBeVisible();
});

test("spotlight remains dismissible when browser storage is blocked", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException("Storage blocked", "SecurityError");
    };
    Storage.prototype.setItem = () => {
      throw new DOMException("Storage blocked", "SecurityError");
    };
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Dismiss resume preview" }).click();
  await expect(page.locator(".resume-spotlight")).toHaveCount(0);
  await expect(page.locator(".nav-resume")).toBeVisible();
});

import { expect, test } from "@playwright/test";
import { portfolioProjects } from "../content/portfolio-projects";

for (const project of portfolioProjects) {
  test(`migrated project route: ${project.id}`, async ({ page }) => {
    const response = await page.goto(`/projects/${project.id}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      project.displayTitle,
    );
    await expect(
      page.getByRole("link", { name: "Original portfolio project" }),
    ).toHaveAttribute("href", project.url);
    await expect(page.locator(".project-review")).toContainText(
      project.reviewLabel,
    );
    for (const evidence of project.evidence) {
      await expect(
        page.getByRole("link", { name: evidence.label, exact: true }),
      ).toHaveAttribute("href", evidence.url);
    }
    const dashboard = project.evidence.find(
      (link) => link.kind === "dashboard",
    );
    if (dashboard) {
      await expect(
        page.getByRole("link", { name: "Open Power BI dashboard" }),
      ).toHaveAttribute("href", dashboard.url);
    }
    await expect(
      page
        .locator(".desktop-links")
        .getByRole("link", { name: "Work", exact: true }),
    ).toHaveAttribute("data-active", "true");
  });
}

test("sticky header and active state follow homepage sections", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const header = page.locator(".site-header");
  for (const [id, label] of [
    ["projects", "Work"],
    ["resume", "Resume"],
    ["systems", "Systems"],
    ["capabilities", "Expertise"],
    ["contact", "Contact"],
  ]) {
    await page
      .locator(`#${id}`)
      .evaluate((element) => element.scrollIntoView());
    const link = page
      .locator(".desktop-links")
      .getByRole("link", { name: label, exact: true });
    await expect(link).toHaveAttribute("data-active", "true");
    await expect(link).toHaveAttribute("aria-current", "location");
    expect((await header.boundingBox())?.y).toBe(0);
    expect(
      (await page.locator(`#${id}`).boundingBox())!.y,
    ).toBeGreaterThanOrEqual((await header.boundingBox())!.height);
    const activeBackground = await link.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    );
    await link.hover();
    expect(
      await link.evaluate(
        (element) => getComputedStyle(element).backgroundColor,
      ),
    ).toBe(activeBackground);
    await page.mouse.move(0, 0);
    await expect(link).toHaveAttribute("data-active", "true");
  }
});

test("dedicated resume route has the correct active link", async ({ page }) => {
  await page.goto("/resume");
  await expect(
    page
      .locator(".desktop-links")
      .getByRole("link", { name: "Resume", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});

test("uppercase branding and label-free artwork", async ({ page }) => {
  await page.goto("/");
  for (const mark of await page.locator(".brand-mark").all())
    await expect(mark).toHaveText("BI");
  await expect(
    page.locator(
      ".hero-artwork figcaption, .hero-artwork text, .hero-artwork .artwork-coordinate, .hero-artwork .artwork-cross",
    ),
  ).toHaveCount(0);
  expect(
    (await page.locator(".hero-artwork").boundingBox())!.width,
  ).toBeGreaterThan(650);
});

test("glass rotation responds to scroll and stops under reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const glass = page.locator(".glass-rotator");
  const initial = await glass.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
  await expect
    .poll(() =>
      glass.evaluate((element) => getComputedStyle(element).transform),
    )
    .not.toBe(initial);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(glass).toHaveCSS("transform", "none");
});

test("four projects appear in the requested order", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".analytics-card h3")).toHaveText(
    portfolioProjects.map((project) => project.displayTitle),
  );
  await expect(page.locator("#systems")).toContainText(
    "analytics and reporting",
  );
});

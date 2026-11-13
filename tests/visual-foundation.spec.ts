import { expect, test } from "@playwright/test";
import { createRequire } from "node:module";

const dependencyRequire = createRequire(`${process.cwd()}/package.json`);

for (const width of [320, 390, 768, 1440]) {
  test(`homepage reflows and captures at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Benita Idachaba",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await expect(
      page
        .locator(".hero")
        .getByRole("link", { name: "View Resume", exact: true }),
    ).toBeVisible();
    // Actual screenshots are generated only by a successful browser run.
    await page.screenshot({
      path: testInfo.outputPath(`homepage-${width}.png`),
      fullPage: true,
    });
  });
}

test("mobile menu contains focus, closes on Escape and restores the trigger", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  const menu = page.getByRole("dialog", { name: "Navigation", exact: true });
  await expect(menu).toBeVisible();
  for (let i = 0; i < 9; i++) {
    await page.keyboard.press("Tab");
    expect(
      await menu.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("menu links navigate to the section and release page scrolling", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Experience" })
    .click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
});

test("resume remains accessible after preview dismissal", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Dismiss resume preview" }).click();
  await expect(
    page.getByRole("complementary", {
      name: "A clearer view of my experience.",
    }),
  ).not.toBeVisible();
  await page
    .locator(".hero")
    .getByRole("link", { name: "View Resume", exact: true })
    .click();
  await expect(page).toHaveURL(/\/resume$/);
  await expect(
    page.getByRole("heading", { name: "Data Analyst Resume" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Download Resume (PDF)" }),
  ).toBeVisible();
  await expect(page.locator("iframe")).toHaveAttribute(
    "title",
    "Benita Idachaba Data Analyst resume PDF",
  );
});

test("keyboard skip link reaches main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  await expect(page.getByRole("main")).toBeFocused();
});

test("reduced motion removes scrolling and CTA movement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  const button = page
    .locator(".hero")
    .getByRole("link", { name: "View Resume", exact: true });
  await button.hover();
  expect(
    await button.evaluate((element) => getComputedStyle(element).transform),
  ).toBe("none");
});

test("homepage and resume preview pass automated accessibility checks", async ({
  page,
}) => {
  for (const route of ["/", "/resume"]) {
    await page.goto(route);
    await page.addScriptTag({
      path: dependencyRequire.resolve("axe-core/axe.min.js"),
    });
    const violations = await page.evaluate(async () => {
      const axe = (
        window as unknown as {
          axe: {
            run: (
              options: object,
            ) => Promise<{ violations: { id: string; description: string }[] }>;
          };
        }
      ).axe;
      return (
        await axe.run({
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
        })
      ).violations;
    });
    expect(violations).toEqual([]);
  }
});

test("unknown and unimplemented project routes return 404", async ({
  page,
}) => {
  const response = await page.goto("/projects/unapproved-case-study");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Back to portfolio" }),
  ).toBeVisible();
});

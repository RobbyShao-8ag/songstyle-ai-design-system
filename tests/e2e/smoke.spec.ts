import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const BASE_PATH = "/songstyle-ai-design-system";
const withBase = (route: string) => `${BASE_PATH}${route}`;

for (const route of ["/", "/reference-ui/"]) {
  test(`${route} renders without WCAG A/AA violations`, async ({ page }) => {
    await page.goto(withBase(route));
    await expect(page.locator("main")).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}

test("home page presents the central thesis", async ({ page }) => {
  await page.goto(withBase("/"));
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "AI 不懂得何时停止"
  );
  await expect(
    page.getByRole("link", { name: "Reference UI", exact: true })
  ).toHaveAttribute("href", withBase("/reference-ui/"));
});

test("reference controls are keyboard reachable", async ({ page }) => {
  await page.goto(withBase("/reference-ui/"));
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus-visible")).toBeVisible();
});

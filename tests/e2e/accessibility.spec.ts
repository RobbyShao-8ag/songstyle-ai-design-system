import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const BASE_PATH = "/songstyle-ai-design-system";
const withBase = (route: string) => `${BASE_PATH}${route}`;
const ROUTES = [
  "/",
  "/manifesto/",
  "/principles/",
  "/reference-ui/",
  "/examples/lifestyle-brand/",
  "/examples/digital-product/",
  "/examples/ecommerce-image/",
  "/examples/comparisons/",
  "/references/song-aesthetics-digital-design-research/"
];

for (const route of ROUTES) {
  test(`${route} has no detectable WCAG A/AA violations`, async ({ page }) => {
    await page.goto(withBase(route));
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

import { expect, test } from "@playwright/test";

const BASE_PATH = "/songstyle-ai-design-system";
const withBase = (route: string) => `${BASE_PATH}${route}`;

export const PUBLIC_ROUTES = [
  "/",
  "/reference-ui/",
  "/manifesto/",
  "/principles/",
  "/principles/less-with-order/",
  "/principles/space-creates-meaning/",
  "/principles/restraint-knows-measure/",
  "/principles/quietness-reveals-truth/",
  "/principles/warmth-makes-technology-approachable/",
  "/principles/suggestion-leaves-resonance/",
  "/foundations/",
  "/design-tokens/",
  "/foundations/color/",
  "/foundations/space/",
  "/foundations/typography/",
  "/foundations/surface/",
  "/foundations/motion/",
  "/references/",
  "/guides/from-brief-to-web-design/",
  "/checklist/",
  "/prompts/",
  "/prompts/web-design/from-brief/",
  "/prompts/web-design/rewrite-existing-page/",
  "/prompts/design-review/review-page/",
  "/prompts/design-review/compare-default-and-songstyle/",
  "/skills/",
  "/skills/songstyle-web-designer/",
  "/skills/songstyle-design-reviewer/",
  "/examples/",
  "/examples/lifestyle-brand/",
  "/examples/digital-product/",
  "/examples/comparisons/",
  "/evaluations/",
  "/contributing/",
  "/en/manifesto/",
  "/en/core-principles/",
  "/en/usage/"
];

for (const route of PUBLIC_ROUTES) {
  test(`${route} is a usable public page`, async ({ page }) => {
    await page.goto(withBase(route));
    await expect(page.locator("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(hasOverflow).toBe(false);
  });
}

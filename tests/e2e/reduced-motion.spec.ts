import { expect, test } from "@playwright/test";

const BASE_PATH = "/songstyle-ai-design-system";
const withBase = (route: string) => `${BASE_PATH}${route}`;

test.use({ contextOptions: { reducedMotion: "reduce" } });

test("home content remains visible with effectively zero reveal transition", async ({ page }) => {
  await page.goto(withBase("/"));
  const reveal = page.locator(".reveal").filter({ hasText: "同一份 Brief，两种移动网站" });
  await expect(reveal).toBeVisible();
  const transitionDurationMs = await reveal.evaluate(
    (element) => {
      const duration = getComputedStyle(element).transitionDuration;
      return parseFloat(duration) * (duration.endsWith("ms") ? 1 : 1000);
    }
  );
  expect(transitionDurationMs).toBeLessThan(1);
  await expect(page.getByText("从原则走向执行", { exact: true })).toBeVisible();
});

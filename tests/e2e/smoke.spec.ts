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
    page.getByRole("link", { name: "查看 Reference UI", exact: true })
  ).toHaveAttribute("href", withBase("/reference-ui/"));
});

test("home page presents the complete exhibition sequence", async ({ page }) => {
  await page.goto(withBase("/"));
  for (const name of ["为什么 AI 设计容易过度", "六条核心原则", "普通 AI 与 SongStyle"]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
  const cases = page.locator(".case-grid");
  await expect(cases.getByText("生活方式品牌", { exact: true })).toBeVisible();
  await expect(cases.getByText("现代数字产品", { exact: true })).toBeVisible();
  const resources = page.locator(".resource-grid");
  for (const text of ["Prompts", "Agent Skills", "设计变量", "审查清单"]) {
    await expect(resources.getByText(text, { exact: true })).toBeVisible();
  }
});

test("reference controls are keyboard reachable", async ({ page }) => {
  await page.goto(withBase("/reference-ui/"));
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus-visible")).toBeVisible();
});

test("checklist content route renders", async ({ page }) => {
  await page.goto(withBase("/checklist/"));
  await expect(page.locator("main")).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 1, name: "SongStyle 审查清单" })
  ).toBeVisible();
});

test("lifestyle case study presents the full comparison", async ({ page }) => {
  await page.goto(withBase("/examples/lifestyle-brand/"));
  await expect(page.getByRole("heading", { level: 1, name: "白汀 Baiting：当代家居饮水器物品牌" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "普通 AI 默认方案" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "SongStyle 改写" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "审查结果" })).toBeVisible();
  for (const testId of ["baiting-default", "baiting-songstyle"]) {
    const section = page.getByTestId(testId);
    await expect(section.getByRole("heading", { level: 3, name: "让水回到桌面，安静地成为日常。" })).toBeVisible();
    await expect(section.getByText("高硼硅玻璃", { exact: true })).toBeVisible();
    await expect(section.getByText("1.2 L", { exact: true })).toBeVisible();
    await expect(section.getByText("宽口易清洁", { exact: true })).toBeVisible();
    await expect(section.getByRole("link", { name: "查看器物与购买信息" })).toBeVisible();
    await expect(section.locator('img[src$="/assets/cases/baiting-carafe.webp"]')).toBeVisible();
  }
});

test("digital product case study presents the full comparison", async ({ page }) => {
  await page.goto(withBase("/examples/digital-product/"));
  await expect(page.getByRole("heading", { level: 1, name: "清序 Qingxu：AI 研究工作台" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "普通 AI 默认方案" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "SongStyle 改写" })).toBeVisible();
  for (const testId of ["qingxu-default", "qingxu-songstyle"]) {
    const section = page.getByTestId(testId);
    await expect(section.getByRole("heading", { level: 3, name: "从来源到叙事，让研究过程清楚可见。" })).toBeVisible();
    for (const feature of ["收集来源", "综合发现", "分享叙事"]) {
      await expect(section.getByText(feature, { exact: true })).toBeVisible();
    }
    await expect(section.getByRole("link", { name: "开始试用" })).toBeVisible();
    await expect(section.locator('img[src$="/assets/cases/qingxu-research.webp"]')).toBeVisible();
  }
});

test("comparisons explain every review dimension", async ({ page }) => {
  await page.goto(withBase("/examples/comparisons/"));
  for (const text of ["信息必要性", "层级清晰度", "功能性留白", "适度停止", "秩序而非符号", "可用性、可访问性与目标"]) {
    await expect(page.getByRole("heading", { level: 2, name: text })).toBeVisible();
  }
});

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Locator } from "@playwright/test";

const BASE_PATH = "/songstyle-ai-design-system";
const withBase = (route: string) => `${BASE_PATH}${route}`;

async function expectTopInsideViewport(locator: Locator, viewportHeight: number) {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeLessThan(viewportHeight - 20);
}

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
    page.getByText("同样的建站内容，SongStyle 让移动网站从不断添加转向准确表达。", { exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "查看移动网站对比", exact: true })
  ).toHaveAttribute("href", "#mobile-showcase");
});

test("home page presents the mobile showcase sequence", async ({ page }) => {
  await page.goto(withBase("/"));
  for (const name of [
    "同一份 Brief，两种移动网站",
    "宋代美学如何变成数字界面",
    "两个虚构品牌案例"
  ]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
  const showcase = page.getByTestId("mobile-showcase-preview");
  for (const text of ["same brief", "same copy", "same image", "same CTA", "same goal"]) {
    await expect(showcase.getByText(text, { exact: true })).toBeVisible();
  }
  for (const label of ["AI 默认移动网站", "SongStyle 移动网站"]) {
    await expect(showcase.getByText(label, { exact: true })).toBeVisible();
  }
  for (const term of ["格物致知", "三远法", "宋版书", "汝窑与墨分五彩", "留白生意", "器以载道"]) {
    await expect(page.getByRole("heading", { level: 3, name: term })).toBeVisible();
  }
  const cases = page.locator(".case-grid");
  await expect(cases.getByText("生活方式品牌", { exact: true })).toBeVisible();
  await expect(cases.getByText("现代数字产品", { exact: true })).toBeVisible();
  const resources = page.locator(".resource-grid");
  for (const text of ["Prompts", "Agent Skills", "设计变量", "审查清单"]) {
    await expect(resources.getByText(text, { exact: true })).toBeVisible();
  }
  await expect(page.getByRole("link", { name: "查看 Roadmap", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "参与首轮用户测试", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "查看白汀完整对比", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "查看清序完整对比", exact: true })).toBeVisible();
});

test("desktop first screen reveals the mobile comparison evidence", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });

  for (const [route, testId] of [
    ["/", "baiting-default-phone"],
    ["/examples/lifestyle-brand/", "baiting-default-phone"],
    ["/examples/digital-product/", "qingxu-default-phone"]
  ] as const) {
    await page.goto(withBase(route));
    await expectTopInsideViewport(page.getByTestId(testId), 720);
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

test("lifestyle case study presents two fair mobile websites", async ({ page }) => {
  await page.goto(withBase("/examples/lifestyle-brand/"));
  await expect(page.getByRole("heading", { level: 1, name: "白汀 Baiting：当代家居饮水器物品牌" })).toBeVisible();
  const comparison = page.getByTestId("mobile-comparison-baiting");
  for (const label of ["AI 默认移动网站", "SongStyle 移动网站"]) {
    await expect(comparison.getByText(label, { exact: true })).toBeVisible();
  }
  for (const invariant of ["same brief", "same copy", "same image", "same CTA", "same goal"]) {
    await expect(comparison.getByText(invariant, { exact: true })).toBeVisible();
  }
  for (const testId of ["baiting-default-mobile", "baiting-songstyle-mobile"]) {
    const section = page.getByTestId(testId);
    await expect(section.getByRole("heading", { name: "让水回到桌面，安静地成为日常。" })).toBeVisible();
    await expect(section.getByText("一只 1.2 L 高硼硅玻璃水壶，薄而稳的壶口，容易清洁的宽口结构，以及适合每日使用的温润手感。", { exact: true })).toBeVisible();
    await expect(section.getByText("高硼硅玻璃", { exact: true })).toBeVisible();
    await expect(section.getByText("1.2 L", { exact: true })).toBeVisible();
    await expect(section.getByText("宽口易清洁", { exact: true })).toBeVisible();
    await expect(section.getByRole("link", { name: "查看器物与购买信息" })).toBeVisible();
    await expect(section.locator('img[src$="/assets/cases/baiting-carafe.webp"]')).toBeVisible();
  }
});

test("digital product case study presents two fair mobile websites", async ({ page }) => {
  await page.goto(withBase("/examples/digital-product/"));
  await expect(page.getByRole("heading", { level: 1, name: "清序 Qingxu：AI 研究工作台" })).toBeVisible();
  const comparison = page.getByTestId("mobile-comparison-qingxu");
  for (const label of ["AI 默认移动网站", "SongStyle 移动网站"]) {
    await expect(comparison.getByText(label, { exact: true })).toBeVisible();
  }
  for (const invariant of ["same brief", "same copy", "same image", "same CTA", "same goal"]) {
    await expect(comparison.getByText(invariant, { exact: true })).toBeVisible();
  }
  for (const testId of ["qingxu-default-mobile", "qingxu-songstyle-mobile"]) {
    const section = page.getByTestId(testId);
    await expect(section.getByRole("heading", { name: "从来源到叙事，让研究过程清楚可见。" })).toBeVisible();
    await expect(section.getByText("收集可信来源，综合带引用的发现，并与团队共同整理一条可以被理解和复核的研究叙事。", { exact: true })).toBeVisible();
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

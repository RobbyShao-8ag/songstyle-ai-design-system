# SongStyle Mobile Website Showcase Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the SongStyle public proof around two fair side-by-side mobile website comparisons that translate Song aesthetics into digital interface decisions.

**Architecture:** Extend the shared case data into mobile-site briefs, then render each case through one reusable phone comparison stage. Case-specific mobile website components provide the visual proof, while homepage, README, and references explain the Song aesthetics to digital design framework.

**Tech Stack:** Astro 6, TypeScript, CSS, Markdown content collections, Node test runner, Playwright, axe-core, GitHub Pages

---

## Approved Source

- Spec: `docs/superpowers/specs/2026-06-05-songstyle-mobile-showcase-redesign.md`
- Research input: `/Users/a1234/projects/empty/宋代美学指导现代设计_深度调研报告.md`
- Target branch: `main`
- Public site base path: `/songstyle-ai-design-system`

## File Map

### Create

- `docs/references/song-aesthetics-digital-design-research.md`: curated research summary and translation framework.
- `docs/assets/mobile-showcase-baiting.png`: README screenshot of the finished Baiting mobile comparison.
- `docs/assets/mobile-showcase-qingxu.png`: README screenshot of the finished Qingxu mobile comparison.
- `website/src/components/examples/PhoneFrame.astro`: reusable accessible mobile phone shell.
- `website/src/components/examples/MobileSiteComparison.astro`: shared comparison stage with labels and invariant strip.
- `website/src/components/examples/BaitingDefaultMobile.astro`: plausible ordinary AI mobile landing page.
- `website/src/components/examples/BaitingSongStyleMobile.astro`: SongStyle Baiting mobile landing page.
- `website/src/components/examples/QingxuDefaultMobile.astro`: plausible ordinary AI SaaS mobile landing page.
- `website/src/components/examples/QingxuSongStyleMobile.astro`: SongStyle Qingxu mobile landing page.
- `website/src/components/home/MobileShowcasePreview.astro`: homepage proof preview.
- `website/src/components/home/SongAestheticFramework.astro`: homepage method bridge from Song aesthetics to interface decisions.

### Modify

- `website/src/data/cases.ts`: extend case data with business goals, mobile briefs, invariants, and SongStyle mappings.
- `website/src/pages/examples/lifestyle-brand.astro`: replace card comparison with mobile website comparison.
- `website/src/pages/examples/digital-product.astro`: replace card comparison with mobile website comparison.
- `website/src/pages/examples/comparisons.astro`: keep overview route, update labels and copy to mobile website comparison.
- `website/src/pages/index.astro`: place mobile proof before resources.
- `website/src/components/HeroStatement.astro`: adjust thesis subtitle and primary action.
- `README.md`: add digital SongStyle positioning, framework, screenshots, and mobile comparison links.
- `docs/references/reading-list.md`: link to the new research summary.
- `tests/content-assets.test.mjs`: add static asset, component, README, and research-summary checks.
- `tests/e2e/smoke.spec.ts`: update homepage and case comparison assertions.
- `tests/e2e/accessibility.spec.ts`: include the new research route.
- `tests/e2e/public-pages.spec.ts`: include the new research route.
- `tests/e2e/reduced-motion.spec.ts`: update homepage reveal text.

## Visual Acceptance Rules

Use these rules during browser QA and do not accept a visually weaker result:

- The case pages show two phone-shaped mobile sites, not cards.
- Each phone feels like a complete landing page with a beginning, middle, and end.
- The default AI versions are professional but busier: gradients, badges, equal cards, repeated emphasis.
- The SongStyle versions are not generic beige minimalism. They must visibly use:
  - 三远法: near, middle, far information distance.
  - 宋版书: composed headline breaks and sparse-dense rhythm.
  - 汝窑与墨分五彩: porcelain, paper, mist gray, celadon, ink tone, tiny accent.
  - 留白生意: at least 30% perceived breathing space in the hero and key pauses.
  - 器以载道: every line, texture, or shape routes attention or groups meaning.
- No version changes the shared headline, description, image, CTA text, features, or business goal.

---

## Task 1: Lock The Mobile Showcase Contract With Failing Tests

**Files:**
- Modify: `tests/content-assets.test.mjs`
- Modify: `tests/e2e/smoke.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `tests/e2e/public-pages.spec.ts`
- Modify: `tests/e2e/reduced-motion.spec.ts`

- [ ] **Step 1: Add static asset and framework tests**

Append this test block to `tests/content-assets.test.mjs` after the existing `evidence-first redesign assets and collaboration files exist` test:

```js
test("mobile showcase redesign assets and components exist", async () => {
  const files = [
    "docs/references/song-aesthetics-digital-design-research.md",
    "docs/assets/mobile-showcase-baiting.png",
    "docs/assets/mobile-showcase-qingxu.png",
    "website/src/components/examples/PhoneFrame.astro",
    "website/src/components/examples/MobileSiteComparison.astro",
    "website/src/components/examples/BaitingDefaultMobile.astro",
    "website/src/components/examples/BaitingSongStyleMobile.astro",
    "website/src/components/examples/QingxuDefaultMobile.astro",
    "website/src/components/examples/QingxuSongStyleMobile.astro",
    "website/src/components/home/MobileShowcasePreview.astro",
    "website/src/components/home/SongAestheticFramework.astro"
  ];

  for (const file of files) {
    await assert.doesNotReject(access(file), `Missing mobile showcase file: ${file}`);
  }
});

test("research summary and README expose the digital SongStyle framework", async () => {
  const research = await readFile(
    "docs/references/song-aesthetics-digital-design-research.md",
    "utf8"
  );
  for (const term of [
    "系统性应用研究几乎空白",
    "格物致知",
    "三远法",
    "宋版书",
    "汝窑",
    "留白生意",
    "器以载道",
    "未经独立验证"
  ]) {
    assert.match(research, new RegExp(term), `Research summary is missing: ${term}`);
  }

  const readme = await readFile("README.md", "utf8");
  for (const term of [
    "Digital SongStyle Framework",
    "same brief",
    "same copy",
    "same image",
    "same CTA",
    "same goal",
    "docs/assets/mobile-showcase-baiting.png",
    "docs/assets/mobile-showcase-qingxu.png"
  ]) {
    assert.match(readme, new RegExp(term, "i"), `README is missing: ${term}`);
  }
});

test("case data declares mobile website briefs and SongStyle mappings", async () => {
  const data = await readFile("website/src/data/cases.ts", "utf8");
  for (const term of [
    "comparisonInvariants",
    "same brief",
    "same copy",
    "same image",
    "same CTA",
    "same goal",
    "businessGoal",
    "mobileBrief",
    "near",
    "middle",
    "far",
    "songMappings"
  ]) {
    assert.match(data, new RegExp(term), `Case data is missing: ${term}`);
  }
});
```

- [ ] **Step 2: Replace homepage smoke assertions**

In `tests/e2e/smoke.spec.ts`, update `home page presents the central thesis` so it expects the mobile-site thesis:

```ts
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
```

Replace `home page presents the complete exhibition sequence` with this mobile proof test:

```ts
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

  await expect(page.getByRole("link", { name: "查看白汀完整对比", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "查看清序完整对比", exact: true })).toBeVisible();
});
```

- [ ] **Step 3: Replace case-page smoke assertions**

Replace the two case tests in `tests/e2e/smoke.spec.ts` with:

```ts
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
    for (const feature of ["高硼硅玻璃", "1.2 L", "宽口易清洁"]) {
      await expect(section.getByText(feature, { exact: true })).toBeVisible();
    }
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
```

- [ ] **Step 4: Add the research page to public route coverage**

In `tests/e2e/accessibility.spec.ts`, add the route:

```ts
"/references/song-aesthetics-digital-design-research/"
```

In `tests/e2e/public-pages.spec.ts`, add the same route immediately after `/references/image-generation-prompts/`.

- [ ] **Step 5: Update the reduced-motion home assertion**

In `tests/e2e/reduced-motion.spec.ts`, replace the reveal text selector with:

```ts
const reveal = page.locator(".reveal").filter({ hasText: "同一份 Brief，两种移动网站" });
```

Keep the final assertion on `从原则走向执行` unchanged if that text still exists after Task 6. If Task 6 removes that exact text, replace it with:

```ts
await expect(page.getByText("宋代美学如何变成数字界面", { exact: true })).toBeVisible();
```

- [ ] **Step 6: Run focused tests and verify failure**

Run:

```bash
node --test tests/content-assets.test.mjs
npx playwright test tests/e2e/smoke.spec.ts --grep "mobile|central thesis"
```

Expected result: FAIL. Missing files and old homepage/case text should be the failures. If the Playwright server cannot bind inside the sandbox, rerun the Playwright command with escalation.

- [ ] **Step 7: Commit**

```bash
git add tests/content-assets.test.mjs tests/e2e/smoke.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/public-pages.spec.ts tests/e2e/reduced-motion.spec.ts
git commit -m "test: lock mobile SongStyle showcase contract"
```

---

## Task 2: Add The Research Summary And Reference Route

**Files:**
- Create: `docs/references/song-aesthetics-digital-design-research.md`
- Modify: `docs/references/reading-list.md`

- [ ] **Step 1: Create the research summary page**

Create `docs/references/song-aesthetics-digital-design-research.md` with this frontmatter and structure:

```md
---
title: 宋代美学与数字设计调研摘要
description: 将宋代美学调研转译为 UI、网页与 APP 设计方法的项目参考。
lang: zh-CN
route: /references/song-aesthetics-digital-design-research/
section: 参考
order: 3
---

# 宋代美学与数字设计调研摘要

本页整理项目作者在 2026 年 6 月 5 日提供的调研报告：
`/Users/a1234/projects/empty/宋代美学指导现代设计_深度调研报告.md`。

报告的核心发现是：宋代美学在室内、家居、文创、建筑、景观和展览中已有较多讨论，但在 UI、网页、APP 与 AI 辅助数字设计中的系统性应用研究几乎空白。SongStyle 的价值不是复刻古代视觉符号，而是把这套审美判断转译为现代数字界面可以执行、审查和迭代的方法。

## 方法来源

本项目优先吸收可转化为设计方法的观点：

- 陈锋关于宋画格物精神、构成技巧和现代设计启示的讨论。
- 张节末关于宋韵的近世感、极简、雅俗兼资和格物致知的分析。
- 朱良志关于生命精神与以小见大的美学路径。
- 宋瓷、宋版书、宋画构图和茶室/空间设计研究中的留白、色彩、材质和秩序经验。

网络文章中的趋势判断和市场数据只作为背景信号；未经独立验证的数字不作为项目结论或宣传语。

## 数字转译框架

### 格物致知

每个界面元素都必须经得起追问：它是否必要、是否准确、是否被打磨到位。数字界面中对应组件精度、文案密度、行距、按钮位置和图片裁切。

### 三远法

把山水画的空间距离转译为信息距离：

- 近景：用户当下要理解和行动的内容。
- 中景：支撑判断的事实、功能和关系。
- 远景：品牌气质、长期承诺和更大的叙事。

### 宋版书

排版应有疏密、停顿和可读节奏。标题断行要像经过构图，而不是随屏幕自然换行；正文应保持温润、清楚和有呼吸。

### 汝窑与墨分五彩

色彩优先使用素白、暖纸、雾灰、天青、淡青、赭石、靛蓝和极少量朱砂。层次主要来自明度、材质、边界和微纹理，而不是高饱和撞色。

### 留白生意

留白不是空，而是聚焦、停顿、引导和想象。关键屏幕应保留至少 30% 的感知呼吸空间，但不能牺牲必要信息。

### 器以载道

线、纹理、边框、印记、渐变和不规则形态必须服务功能：指路、分组、强调尺度、建立触感或稳定气氛。只表演“中国风”的装饰不属于 SongStyle。

### 温润可亲

SongStyle 不等于冷淡极简。数字产品仍要有人的温度、可用性和清楚路径。

## 宋代美学数字设计十诫

1. 色不过五：主色、辅色、强调色受控。
2. 空必有白：关键屏幕保留可感知呼吸空间。
3. 线必简洁：线条承担秩序，不堆叠装饰。
4. 材必自然：用纸、瓷、木、墨的数字类比建立触感。
5. 饰必载道：装饰必须服务功能。
6. 字必有韵：排版有疏密、行气和停顿。
7. 交互含蓄：动效只帮助理解，不抢夺注意。
8. 容错之美：有机微差可以成为温度，而不是噪声。
9. 以人为本：可用性和理解优先。
10. 意境为先：表达充分后停止，给用户留下余韵。

## 项目使用边界

SongStyle 使用这些研究作为数字界面方法来源，不声称宋代存在 Web 网格、Design Tokens、组件库或 AI 设计工作流。本项目的目标是现代转译，不是历史复原。
```

- [ ] **Step 2: Link the research summary from the reference index**

In `docs/references/reading-list.md`, add this section after the introduction:

```md
## 项目调研

- [宋代美学与数字设计调研摘要](/references/song-aesthetics-digital-design-research/)
```

- [ ] **Step 3: Run focused content tests**

Run:

```bash
node --test tests/content-assets.test.mjs
```

Expected result: still FAIL because mobile components and screenshots do not exist yet. Research-summary assertions should pass.

- [ ] **Step 4: Commit**

```bash
git add docs/references/song-aesthetics-digital-design-research.md docs/references/reading-list.md
git commit -m "docs: add Song aesthetics digital design research summary"
```

---

## Task 3: Extend Shared Case Data For Mobile Website Briefs

**Files:**
- Modify: `website/src/data/cases.ts`

- [ ] **Step 1: Replace the case data file**

Replace `website/src/data/cases.ts` with this structure. Keep the exact existing shared headline, description, action, image, and feature values:

```ts
export type CaseFeature = {
  label: string;
  value: string;
};

export type MobileBrief = {
  audience: string;
  businessGoal: string;
  requiredSections: string[];
  near: string;
  middle: string;
  far: string;
  defaultDirection: string[];
  songstyleDirection: string[];
};

export type CaseStudy = {
  id: "baiting" | "qingxu";
  brand: string;
  position: string;
  headline: string;
  description: string;
  action: string;
  image: string;
  imageAlt: string;
  businessGoal: string;
  features: CaseFeature[];
  mobileBrief: MobileBrief;
  songMappings: string[];
};

export const comparisonInvariants = [
  "same brief",
  "same copy",
  "same image",
  "same CTA",
  "same goal"
] as const;

export const baitingCase: CaseStudy = {
  id: "baiting",
  brand: "白汀 Baiting",
  position: "日常饮水器物",
  headline: "让水回到桌面，安静地成为日常。",
  description:
    "一只 1.2 L 高硼硅玻璃水壶，薄而稳的壶口，容易清洁的宽口结构，以及适合每日使用的温润手感。",
  action: "查看器物与购买信息",
  image: "/assets/cases/baiting-carafe.webp",
  imageAlt: "自然光下置于当代居家桌面的透明玻璃水壶",
  businessGoal: "让玻璃水壶显得值得信任、容易理解、适合日常购买，而不是制造虚假的奢侈感。",
  features: [
    { label: "材质", value: "高硼硅玻璃" },
    { label: "容量", value: "1.2 L" },
    { label: "维护", value: "宽口易清洁" }
  ],
  mobileBrief: {
    audience: "正在为家中餐桌选择长期使用饮水器物的移动端访客。",
    businessGoal: "建立材料可信度、日常使用想象和清楚购买路径。",
    requiredSections: ["器物介绍", "材料规格", "日常使用", "购买行动"],
    near: "水壶本身、主标题和查看信息行动。",
    middle: "材质、容量和维护方式。",
    far: "安静、可信、可长期使用的日常生活气质。",
    defaultDirection: ["渐变叠图", "徽章与强按钮", "三张等权规格卡", "重复强调生活精选"],
    songstyleDirection: ["器物留白", "题跋式规格", "纸瓷质感", "行动在停顿后出现"]
  },
  songMappings: ["格物致知", "宋版书", "汝窑与墨分五彩", "留白生意", "器以载道"]
};

export const qingxuCase: CaseStudy = {
  id: "qingxu",
  brand: "清序 Qingxu",
  position: "AI 研究工作台",
  headline: "从来源到叙事，让研究过程清楚可见。",
  description:
    "收集可信来源，综合带引用的发现，并与团队共同整理一条可以被理解和复核的研究叙事。",
  action: "开始试用",
  image: "/assets/cases/qingxu-research.webp",
  imageAlt: "研究者在自然光工作空间中整理来源与研究资料",
  businessGoal: "让 AI 研究产品显得可信、安静、可复核，并适合真实团队协作。",
  features: [
    { label: "01", value: "收集来源" },
    { label: "02", value: "综合发现" },
    { label: "03", value: "分享叙事" }
  ],
  mobileBrief: {
    audience: "需要用 AI 整理研究资料并向团队说明判断过程的移动端访客。",
    businessGoal: "解释研究工作流，建立可信感，并引导开始试用。",
    requiredSections: ["研究承诺", "来源整理", "发现综合", "叙事分享"],
    near: "当前研究任务、主标题和开始试用行动。",
    middle: "来源、发现、引用关系和团队复核路径。",
    far: "从信息到叙事的长期理解能力。",
    defaultDirection: ["深色科技渐变", "AI POWERED 徽章", "发光按钮", "仪表盘式叠层"],
    songstyleDirection: ["三远法叙事", "纸墨工作台", "细线关系", "留白建立可信"]
  },
  songMappings: ["三远法", "格物致知", "宋版书", "汝窑与墨分五彩", "留白生意"]
};
```

- [ ] **Step 2: Run type and content checks**

Run:

```bash
node --test tests/content-assets.test.mjs
npx astro check
```

Expected result: content tests still fail because components and screenshots are missing. `npx astro check` should pass because existing components still use the preserved `CaseStudy` fields.

- [ ] **Step 3: Commit**

```bash
git add website/src/data/cases.ts
git commit -m "feat: extend case data for mobile website briefs"
```

---

## Task 4: Build The Reusable Mobile Comparison Shell

**Files:**
- Create: `website/src/components/examples/PhoneFrame.astro`
- Create: `website/src/components/examples/MobileSiteComparison.astro`

- [ ] **Step 1: Create `PhoneFrame.astro`**

Create `website/src/components/examples/PhoneFrame.astro`:

```astro
---
interface Props {
  label: string;
  note: string;
  testId: string;
  tone?: "default" | "songstyle";
}

const { label, note, testId, tone = "songstyle" } = Astro.props;
---

<figure class={`phone-frame ${tone}`} data-testid={testId}>
  <figcaption>
    <span>{label}</span>
    <small>{note}</small>
  </figcaption>
  <div class="phone-shell" aria-label={label}>
    <div class="phone-status" aria-hidden="true"><span></span><span></span></div>
    <div class="phone-screen">
      <slot />
    </div>
  </div>
</figure>

<style>
  .phone-frame {
    display: grid;
    gap: var(--song-space-scale-3);
    min-width: 0;
    margin: 0;
  }

  figcaption {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--song-space-scale-4);
    color: var(--song-color-text-secondary);
    font-size: var(--song-typography-size-small);
  }

  figcaption span {
    color: var(--song-color-text-primary);
    font-weight: var(--song-typography-weight-medium);
  }

  .phone-shell {
    overflow: hidden;
    border: 1px solid rgb(37 37 34 / 0.2);
    border-radius: 34px;
    background: #11110f;
    box-shadow: 0 24px 70px rgb(37 37 34 / 0.16);
  }

  .default .phone-shell {
    box-shadow: 0 24px 70px rgb(58 26 117 / 0.18);
  }

  .songstyle .phone-shell {
    border-color: rgb(93 106 91 / 0.24);
    background: #20201c;
  }

  .phone-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 34px;
    padding-inline: 28px;
    background: #11110f;
  }

  .phone-status span:first-child {
    width: 54px;
    height: 5px;
    border-radius: 999px;
    background: rgb(255 255 255 / 0.18);
  }

  .phone-status span:last-child {
    width: 36px;
    height: 5px;
    border-radius: 999px;
    background: rgb(255 255 255 / 0.24);
  }

  .phone-screen {
    aspect-ratio: 390 / 844;
    overflow: hidden;
    background: var(--song-color-surface-default);
  }
 </style>
```

- [ ] **Step 2: Create `MobileSiteComparison.astro`**

Create `website/src/components/examples/MobileSiteComparison.astro`:

```astro
---
import type { CaseStudy } from "../../data/cases";
import { comparisonInvariants } from "../../data/cases";
import PhoneFrame from "./PhoneFrame.astro";

interface Props {
  data: CaseStudy;
  compact?: boolean;
}

const { data, compact = false } = Astro.props;
---

<section
  id={`${data.id}-mobile-comparison`}
  class:list={["mobile-comparison", { compact }]}
  data-testid={`mobile-comparison-${data.id}`}
>
  <div class="comparison-summary">
    <p class="eyebrow">公平移动网站对比</p>
    <h2>同一份 Brief，两种移动网站</h2>
    <p>{data.businessGoal}</p>
    <ul aria-label="公平对比不变量">
      {comparisonInvariants.map((item) => <li>{item}</li>)}
    </ul>
  </div>

  <div class="phone-pair">
    <PhoneFrame label="AI 默认移动网站" note="不断添加强调" testId={`${data.id}-default-phone`} tone="default">
      <slot name="default" />
    </PhoneFrame>
    <PhoneFrame label="SongStyle 移动网站" note="准确表达后停止" testId={`${data.id}-songstyle-phone`} tone="songstyle">
      <slot name="songstyle" />
    </PhoneFrame>
  </div>
 </section>

<style>
  .mobile-comparison {
    display: grid;
    gap: var(--song-space-scale-8);
    padding: var(--song-space-scale-6);
    border: var(--song-shape-border-width) solid var(--song-color-border-subtle);
    border-radius: var(--song-shape-radius-large);
    background:
      linear-gradient(135deg, rgb(236 239 231 / 0.72), transparent 42%),
      var(--song-color-background-subtle);
  }

  .comparison-summary {
    max-width: 46rem;
  }

  .comparison-summary h2 {
    max-width: 16ch;
    margin: 0;
    font-family: var(--song-typography-family-display);
    font-size: clamp(var(--song-typography-size-title), 5vw, var(--song-typography-size-display));
    font-weight: var(--song-typography-weight-regular);
    line-height: var(--song-typography-line-height-tight);
  }

  .comparison-summary p:not(.eyebrow) {
    color: var(--song-color-text-secondary);
    line-height: var(--song-typography-line-height-relaxed);
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--song-space-scale-2);
    margin: var(--song-space-scale-5) 0 0;
    padding: 0;
    list-style: none;
  }

  li {
    padding: var(--song-space-scale-2) var(--song-space-scale-3);
    border: var(--song-shape-border-width) solid var(--song-color-border-subtle);
    border-radius: 999px;
    background: rgb(255 255 255 / 0.62);
    color: var(--song-color-text-secondary);
    font-size: var(--song-typography-size-small);
  }

  .phone-pair {
    display: grid;
    gap: var(--song-space-scale-8);
  }

  .compact {
    padding: 0;
    border: 0;
    background: transparent;
  }

  .compact .comparison-summary {
    display: none;
  }

  @media (min-width: 980px) {
    .mobile-comparison {
      padding: var(--song-space-scale-10);
    }

    .phone-pair {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: start;
    }
  }
</style>
```

- [ ] **Step 3: Run Astro check**

Run:

```bash
npx astro check
```

Expected result: PASS. The files are not wired into pages yet, but they should type-check.

- [ ] **Step 4: Commit**

```bash
git add website/src/components/examples/PhoneFrame.astro website/src/components/examples/MobileSiteComparison.astro
git commit -m "feat: add mobile comparison shell"
```

---

## Task 5: Build The Four Mobile Website Treatments

**Files:**
- Create: `website/src/components/examples/BaitingDefaultMobile.astro`
- Create: `website/src/components/examples/BaitingSongStyleMobile.astro`
- Create: `website/src/components/examples/QingxuDefaultMobile.astro`
- Create: `website/src/components/examples/QingxuSongStyleMobile.astro`

- [ ] **Step 1: Create `BaitingDefaultMobile.astro`**

Use the existing image and copy. The design recipe is gradient overlay, dense badges, loud CTA, and equal-weight specs:

```astro
---
import type { CaseStudy } from "../../data/cases";
import { withBase } from "../../lib/paths";

interface Props {
  data: CaseStudy;
}

const { data } = Astro.props;
---

<section class="baiting-default-mobile" data-testid="baiting-default-mobile">
  <div class="hero">
    <img src={withBase(data.image)} alt={data.imageAlt} />
    <div class="overlay" aria-hidden="true"></div>
    <div class="hero-copy">
      <p>{data.brand} · {data.position} · 当代生活精选</p>
      <h3>{data.headline}</h3>
      <p class="description">{data.description}</p>
      <a href="#baiting-mobile-brief">{data.action}</a>
    </div>
  </div>
  <div class="cards">
    {data.features.map((feature) => (
      <article><span>{feature.label}</span><strong>{feature.value}</strong></article>
    ))}
  </div>
  <div class="promise" id="baiting-mobile-brief">
    <strong>安心日常</strong>
    <p>{data.businessGoal}</p>
  </div>
</section>
```

Add scoped CSS in the same file:

```css
.baiting-default-mobile {
  min-height: 100%;
  background: #f8f4ff;
  color: #fff;
  font-family: var(--song-typography-family-body);
}
.hero { position: relative; min-height: 520px; overflow: hidden; }
.hero img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 80% 18%, rgb(255 206 224 / 0.7), transparent 34%),
    linear-gradient(150deg, rgb(37 18 62 / 0.96), rgb(124 58 237 / 0.68), rgb(255 146 111 / 0.34));
}
.hero-copy {
  position: relative;
  display: grid;
  align-content: end;
  min-height: 520px;
  padding: 28px;
}
.hero-copy p:first-child {
  margin: 0 0 14px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.13em;
}
h3 {
  max-width: 9ch;
  margin: 0;
  font-size: 42px;
  line-height: 1.02;
  text-shadow: 0 8px 30px rgb(31 11 43 / 0.5);
}
.description { margin: 18px 0; line-height: 1.65; }
a {
  justify-self: start;
  padding: 12px 18px;
  border-radius: 999px;
  background: #7c3aed;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 12px 28px rgb(52 20 76 / 0.36);
}
.cards {
  display: grid;
  gap: 12px;
  padding: 20px;
  margin-top: -34px;
  position: relative;
}
.cards article,
.promise {
  padding: 18px;
  border: 1px solid rgb(255 255 255 / 0.54);
  border-radius: 22px;
  background: rgb(255 255 255 / 0.22);
  color: #fff;
  backdrop-filter: blur(14px);
}
.cards span { display: block; margin-bottom: 8px; font-size: 12px; opacity: 0.82; }
.cards strong { font-size: 20px; }
.promise { margin: 0 20px 24px; background: #3d245e; }
.promise p { color: rgb(255 255 255 / 0.78); line-height: 1.7; }
```

- [ ] **Step 2: Create `BaitingSongStyleMobile.astro`**

Use a porcelain/paper surface, observed product image, composed headline breaks, annotations, and a quiet CTA:

```astro
---
import type { CaseStudy } from "../../data/cases";
import { withBase } from "../../lib/paths";

interface Props {
  data: CaseStudy;
}

const { data } = Astro.props;
---

<section class="baiting-songstyle-mobile" data-testid="baiting-songstyle-mobile">
  <header>
    <p>{data.brand} · {data.position}</p>
    <h3>{data.headline}</h3>
  </header>
  <figure>
    <img src={withBase(data.image)} alt={data.imageAlt} />
  </figure>
  <p class="description">{data.description}</p>
  <dl>
    {data.features.map((feature) => (
      <div><dt>{feature.label}</dt><dd>{feature.value}</dd></div>
    ))}
  </dl>
  <div class="distance-note">
    <span>近景是器物，中景是规格，远景是安静日常。</span>
  </div>
  <a href="#baiting-mobile-brief">{data.action}</a>
</section>
```

Add scoped CSS:

```css
.baiting-songstyle-mobile {
  min-height: 100%;
  padding: 34px 28px 42px;
  background:
    radial-gradient(circle at 88% 12%, rgb(188 205 192 / 0.28), transparent 28%),
    linear-gradient(180deg, #fbfaf6, #f0eee5);
  color: #25231f;
}
header { min-height: 250px; display: grid; align-content: center; }
header p {
  margin: 0 0 26px;
  color: #5b746b;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
h3 {
  max-width: 8ch;
  margin: 0;
  font-family: var(--song-typography-family-display);
  font-size: 40px;
  font-weight: 400;
  line-height: 1.34;
  letter-spacing: -0.03em;
}
figure {
  margin: 0;
  min-height: 260px;
  overflow: hidden;
  background: #e8e5dc;
}
figure img { display: block; width: 100%; height: 310px; object-fit: cover; object-position: center; }
.description {
  max-width: 25ch;
  margin: 34px 0 52px auto;
  color: #626058;
  line-height: 1.9;
}
dl { display: grid; gap: 18px; margin: 0; }
dl div {
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  gap: 16px;
  padding-top: 14px;
  border-top: 1px solid rgb(91 116 107 / 0.24);
}
dt { color: #7a7a70; font-size: 12px; letter-spacing: 0.08em; }
dd { margin: 0; font-family: var(--song-typography-family-display); font-size: 20px; }
.distance-note {
  margin: 64px 0 26px;
  padding-left: 16px;
  border-left: 1px solid rgb(91 116 107 / 0.34);
  color: #6c756d;
  line-height: 1.8;
}
a {
  color: #425e55;
  font-weight: 600;
  text-decoration-thickness: 1px;
  text-underline-offset: 6px;
}
```

- [ ] **Step 3: Create `QingxuDefaultMobile.astro`**

Use SaaS defaults: dark gradient, AI badge, glowing CTA, dashboard overlays, equal feature cards:

```astro
---
import type { CaseStudy } from "../../data/cases";
import { withBase } from "../../lib/paths";

interface Props {
  data: CaseStudy;
}

const { data } = Astro.props;
---

<section class="qingxu-default-mobile" data-testid="qingxu-default-mobile">
  <header>
    <p>{data.brand} · {data.position} · AI POWERED</p>
    <h3>{data.headline}</h3>
    <p class="description">{data.description}</p>
    <a href="#qingxu-mobile-brief">{data.action}</a>
  </header>
  <div class="dashboard">
    <img src={withBase(data.image)} alt={data.imageAlt} />
    <div class="widgets" aria-hidden="true"><span></span><span></span><span></span></div>
  </div>
  <div class="feature-grid">
    {data.features.map((feature) => (
      <article><span>{feature.label}</span><strong>{feature.value}</strong></article>
    ))}
  </div>
</section>
```

Add scoped CSS:

```css
.qingxu-default-mobile {
  min-height: 100%;
  padding: 30px 22px;
  background:
    radial-gradient(circle at 52% 0%, rgb(124 58 237 / 0.78), transparent 34%),
    linear-gradient(180deg, #120b35, #07152d 64%, #050711);
  color: #fff;
  text-align: center;
}
header p:first-child {
  color: #7df9ff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
}
h3 {
  max-width: 11ch;
  margin: 22px auto;
  font-size: 34px;
  line-height: 1.12;
  text-shadow: 0 0 28px rgb(177 76 255 / 0.72);
}
.description { line-height: 1.72; color: rgb(255 255 255 / 0.82); }
a {
  display: inline-block;
  margin-top: 18px;
  padding: 12px 22px;
  border-radius: 999px;
  background: linear-gradient(90deg, #7c3aed, #2563eb);
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 0 26px rgb(177 76 255 / 0.55);
}
.dashboard {
  position: relative;
  overflow: hidden;
  margin-top: 34px;
  border: 1px solid rgb(125 249 255 / 0.38);
  border-radius: 24px;
}
.dashboard img { display: block; width: 100%; height: 270px; object-fit: cover; opacity: 0.72; filter: saturate(1.2) contrast(1.08); }
.widgets {
  position: absolute;
  inset: auto 16px 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.widgets span {
  height: 66px;
  border: 1px solid rgb(125 249 255 / 0.42);
  border-radius: 16px;
  background: rgb(177 76 255 / 0.28);
  backdrop-filter: blur(10px);
}
.feature-grid { display: grid; gap: 12px; margin-top: 18px; }
.feature-grid article {
  display: grid;
  gap: 8px;
  padding: 18px;
  border: 1px solid rgb(125 249 255 / 0.35);
  border-radius: 18px;
  background: rgb(177 76 255 / 0.16);
}
.feature-grid span { color: #7df9ff; font-size: 12px; }
```

- [ ] **Step 4: Create `QingxuSongStyleMobile.astro`**

Use 三远法 explicitly and keep all shared content visible:

```astro
---
import type { CaseStudy } from "../../data/cases";
import { withBase } from "../../lib/paths";

interface Props {
  data: CaseStudy;
}

const { data } = Astro.props;
---

<section class="qingxu-songstyle-mobile" data-testid="qingxu-songstyle-mobile">
  <header class="near">
    <p>{data.brand} · {data.position}</p>
    <h3>{data.headline}</h3>
    <p class="description">{data.description}</p>
    <a href="#qingxu-mobile-brief">{data.action}</a>
  </header>
  <figure class="evidence">
    <img src={withBase(data.image)} alt={data.imageAlt} />
  </figure>
  <section class="middle" aria-label="研究过程">
    {data.features.map((feature) => (
      <article><span>{feature.label}</span><h4>{feature.value}</h4></article>
    ))}
  </section>
  <aside class="far">
    <span>近景是任务，中景是证据关系，远景是团队能共同理解的叙事。</span>
  </aside>
</section>
```

Add scoped CSS:

```css
.qingxu-songstyle-mobile {
  min-height: 100%;
  padding: 34px 26px 42px;
  background:
    radial-gradient(circle at 88% 8%, rgb(172 193 185 / 0.28), transparent 30%),
    linear-gradient(180deg, #fbfaf5, #ecebe2);
  color: #242521;
}
.near { min-height: 330px; display: grid; align-content: center; }
.near p:first-child {
  margin: 0 0 24px;
  color: #465f58;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
h3 {
  max-width: 9ch;
  margin: 0;
  font-family: var(--song-typography-family-display);
  font-size: 38px;
  font-weight: 400;
  line-height: 1.34;
}
.description {
  margin: 30px 0 24px;
  color: #61635e;
  line-height: 1.9;
}
a {
  justify-self: start;
  color: #425e55;
  font-weight: 600;
  text-decoration-thickness: 1px;
  text-underline-offset: 6px;
}
.evidence {
  margin: 0;
  overflow: hidden;
  border-radius: 2px;
}
.evidence img {
  display: block;
  width: 100%;
  height: 250px;
  object-fit: cover;
  filter: saturate(0.78) contrast(0.96);
}
.middle {
  display: grid;
  gap: 18px;
  margin-top: 46px;
}
.middle article {
  display: grid;
  grid-template-columns: 3.6rem 1fr;
  gap: 18px;
  padding-top: 16px;
  border-top: 1px solid rgb(70 95 88 / 0.24);
}
.middle span { color: #6d7e77; font-size: 12px; }
.middle h4 {
  margin: 0;
  font-family: var(--song-typography-family-display);
  font-size: 22px;
  font-weight: 400;
}
.far {
  margin-top: 68px;
  color: #656b65;
  line-height: 1.9;
}
```

- [ ] **Step 5: Run focused component checks**

Run:

```bash
npx astro check
node --test tests/content-assets.test.mjs
```

Expected result: `npx astro check` passes. Content tests still fail only because screenshots, README text, homepage, and case pages are not finished.

- [ ] **Step 6: Commit**

```bash
git add website/src/components/examples/BaitingDefaultMobile.astro website/src/components/examples/BaitingSongStyleMobile.astro website/src/components/examples/QingxuDefaultMobile.astro website/src/components/examples/QingxuSongStyleMobile.astro
git commit -m "feat: add mobile website case treatments"
```

---

## Task 6: Wire Mobile Comparisons Into Case Pages

**Files:**
- Modify: `website/src/pages/examples/lifestyle-brand.astro`
- Modify: `website/src/pages/examples/digital-product.astro`
- Modify: `website/src/pages/examples/comparisons.astro`
- Modify: `examples/lifestyle-brand/baiting.md`
- Modify: `examples/digital-product/qingxu.md`
- Modify: `examples/comparisons/overview.md`

- [ ] **Step 1: Update the Baiting page imports and comparison block**

In `website/src/pages/examples/lifestyle-brand.astro`, replace the old component imports:

```astro
import BaitingDefaultMobile from "../../components/examples/BaitingDefaultMobile.astro";
import BaitingSongStyleMobile from "../../components/examples/BaitingSongStyleMobile.astro";
import MobileSiteComparison from "../../components/examples/MobileSiteComparison.astro";
```

Replace the `<div class="case-visual-pair">...</div>` block with:

```astro
<MobileSiteComparison data={baitingCase}>
  <BaitingDefaultMobile slot="default" data={baitingCase} />
  <BaitingSongStyleMobile slot="songstyle" data={baitingCase} />
</MobileSiteComparison>
```

Update the intro paragraph to:

```astro
<p>两个版本使用相同建站 Brief、相同文案、相同图片、相同规格、相同行动与相同业务目标。变化只来自移动网站的设计判断。</p>
```

- [ ] **Step 2: Update the Qingxu page imports and comparison block**

In `website/src/pages/examples/digital-product.astro`, replace the old component imports:

```astro
import MobileSiteComparison from "../../components/examples/MobileSiteComparison.astro";
import QingxuDefaultMobile from "../../components/examples/QingxuDefaultMobile.astro";
import QingxuSongStyleMobile from "../../components/examples/QingxuSongStyleMobile.astro";
```

Replace the `<div class="case-visual-pair">...</div>` block with:

```astro
<MobileSiteComparison data={qingxuCase}>
  <QingxuDefaultMobile slot="default" data={qingxuCase} />
  <QingxuSongStyleMobile slot="songstyle" data={qingxuCase} />
</MobileSiteComparison>
```

Update the intro paragraph to:

```astro
<p>两个版本使用相同建站 Brief、相同文案、相同图片、相同功能、相同行动与相同业务目标。变化只来自移动网站的设计判断。</p>
```

- [ ] **Step 3: Simplify page-level case styles**

In both case pages, keep `.case-study`, `.case-intro`, and `.case-links` styles. Remove `.case-visual-pair` and `.visual-section` rules because the new comparison component owns the visual layout.

The remaining style block should include:

```astro
<style is:global>
  .case-study { padding-block: var(--song-space-section-compact); }
  .case-study .case-intro { max-width: 58rem; margin-bottom: var(--song-space-section-compact); }
  .case-study .case-intro h1 { margin: 0; font-family: var(--song-typography-family-display); font-size: clamp(var(--song-typography-size-title), 6vw, var(--song-typography-size-display)); font-weight: 400; line-height: var(--song-typography-line-height-tight); }
  .case-study .case-intro p:not(.eyebrow) { color: var(--song-color-text-secondary); font-size: var(--song-typography-size-lead); line-height: var(--song-typography-line-height-relaxed); }
  .case-study .markdown-prose { margin-top: var(--song-space-section-compact); }
  .case-study .case-links { display: flex; flex-wrap: wrap; gap: var(--song-space-scale-6); margin-top: var(--song-space-section-compact); padding-top: var(--song-space-scale-6); border-top: var(--song-shape-border-width) solid var(--song-color-border-subtle); }
  .case-study .case-links a { color: var(--song-color-accent-primary); }
</style>
```

- [ ] **Step 4: Update case Markdown analysis**

Update `examples/lifestyle-brand/baiting.md` so it describes the mobile website comparison and includes these phrases:

```md
两个版本现在都是完整的移动端建站方案，而不是单个展示卡片。

SongStyle 版本把“器物、光、桌面、留白”作为页面秩序：近景是水壶本身，中景是规格信息，远景是安静日常。
```

Update `examples/digital-product/qingxu.md` so it includes:

```md
两个版本现在都是完整的移动端建站方案，而不是单个展示卡片。

SongStyle 版本把“三远法”转译为研究信息架构：近景是当前任务，中景是来源与发现关系，远景是团队共同理解的叙事。
```

- [ ] **Step 5: Update comparison overview copy**

In `examples/comparisons/overview.md`, replace card-oriented language with mobile-site language. Include:

```md
本页比较的是同一份建站 Brief 下的两个完整移动网站：AI 默认移动网站与 SongStyle 移动网站。
```

- [ ] **Step 6: Update `website/src/pages/examples/comparisons.astro`**

Import the new mobile components and render both cases:

```astro
import BaitingDefaultMobile from "../../components/examples/BaitingDefaultMobile.astro";
import BaitingSongStyleMobile from "../../components/examples/BaitingSongStyleMobile.astro";
import MobileSiteComparison from "../../components/examples/MobileSiteComparison.astro";
import QingxuDefaultMobile from "../../components/examples/QingxuDefaultMobile.astro";
import QingxuSongStyleMobile from "../../components/examples/QingxuSongStyleMobile.astro";
```

Replace the old paired card sections with:

```astro
<section>
  <h2>白汀 Baiting</h2>
  <MobileSiteComparison data={baitingCase}>
    <BaitingDefaultMobile slot="default" data={baitingCase} />
    <BaitingSongStyleMobile slot="songstyle" data={baitingCase} />
  </MobileSiteComparison>
</section>
<section>
  <h2>清序 Qingxu</h2>
  <MobileSiteComparison data={qingxuCase}>
    <QingxuDefaultMobile slot="default" data={qingxuCase} />
    <QingxuSongStyleMobile slot="songstyle" data={qingxuCase} />
  </MobileSiteComparison>
</section>
```

Remove `.pair` CSS and keep only `.comparison-page`, section spacing, heading, and link styles.

- [ ] **Step 7: Run focused browser tests**

Run:

```bash
npx playwright test tests/e2e/smoke.spec.ts --grep "case study|comparisons"
npx playwright test tests/e2e/accessibility.spec.ts --grep "examples"
npx playwright test tests/e2e/public-pages.spec.ts --grep "examples"
```

Expected result: case and example route tests pass. Homepage tests still fail until Task 7.

- [ ] **Step 8: Commit**

```bash
git add website/src/pages/examples examples
git commit -m "feat: present cases as mobile website comparisons"
```

---

## Task 7: Rebuild The Homepage Around The Mobile Proof

**Files:**
- Create: `website/src/components/home/MobileShowcasePreview.astro`
- Create: `website/src/components/home/SongAestheticFramework.astro`
- Modify: `website/src/components/HeroStatement.astro`
- Modify: `website/src/pages/index.astro`
- Modify: `tests/e2e/reduced-motion.spec.ts` if the final text changed in Task 1

- [ ] **Step 1: Create `MobileShowcasePreview.astro`**

Create `website/src/components/home/MobileShowcasePreview.astro`:

```astro
---
import BaitingDefaultMobile from "../examples/BaitingDefaultMobile.astro";
import BaitingSongStyleMobile from "../examples/BaitingSongStyleMobile.astro";
import MobileSiteComparison from "../examples/MobileSiteComparison.astro";
import { baitingCase, comparisonInvariants } from "../../data/cases";
import { withBase } from "../../lib/paths";
---

<section id="mobile-showcase" class="home-section mobile-showcase reveal" data-testid="mobile-showcase-preview">
  <div class="container">
    <div class="showcase-heading">
      <p class="eyebrow">先看移动网站</p>
      <h2>同一份 Brief，两种移动网站</h2>
      <p>左边是 AI 默认完成的移动网站，右边是 SongStyle 完成的移动网站。内容没有变，审美判断变了。</p>
      <ul aria-label="公平对比不变量">
        {comparisonInvariants.map((item) => <li>{item}</li>)}
      </ul>
    </div>
    <MobileSiteComparison data={baitingCase} compact>
      <BaitingDefaultMobile slot="default" data={baitingCase} />
      <BaitingSongStyleMobile slot="songstyle" data={baitingCase} />
    </MobileSiteComparison>
    <div class="showcase-actions">
      <a class="quiet-link" href={withBase("/examples/lifestyle-brand/")}>查看白汀完整对比 <span aria-hidden="true">→</span></a>
      <a class="quiet-link" href={withBase("/examples/digital-product/")}>查看清序完整对比 <span aria-hidden="true">→</span></a>
    </div>
  </div>
</section>

<style>
  .mobile-showcase {
    background:
      radial-gradient(circle at 80% 12%, rgb(188 205 192 / 0.28), transparent 24%),
      var(--song-color-background-subtle);
  }
  .showcase-heading {
    display: grid;
    gap: var(--song-space-scale-6);
    margin-bottom: var(--song-space-scale-8);
  }
  .showcase-heading p:not(.eyebrow) {
    max-width: 42rem;
    margin: 0;
    color: var(--song-color-text-secondary);
    font-size: var(--song-typography-size-lead);
    line-height: var(--song-typography-line-height-relaxed);
  }
  .showcase-heading ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--song-space-scale-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .showcase-heading li {
    padding: var(--song-space-scale-2) var(--song-space-scale-3);
    border: var(--song-shape-border-width) solid var(--song-color-border-subtle);
    border-radius: 999px;
    background: rgb(255 255 255 / 0.64);
    color: var(--song-color-text-secondary);
    font-size: var(--song-typography-size-small);
  }
  .showcase-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--song-space-scale-6);
    margin-top: var(--song-space-scale-8);
  }
  @media (min-width: 900px) {
    .showcase-heading {
      grid-template-columns: 0.9fr 1.1fr;
      align-items: end;
    }
  }
</style>
```

- [ ] **Step 2: Create `SongAestheticFramework.astro`**

Create `website/src/components/home/SongAestheticFramework.astro`:

```astro
---
import { withBase } from "../../lib/paths";

const items = [
  ["格物致知", "每个元素都经得起追问：必要、准确、打磨到位。"],
  ["三远法", "把近景、中景、远景转成任务、证据、叙事的信息距离。"],
  ["宋版书", "标题断行、正文行距与疏密节奏共同建立可读的韵。"],
  ["汝窑与墨分五彩", "用素白、暖纸、雾灰、天青、墨色和极少强调色建立层次。"],
  ["留白生意", "空间承担聚焦、停顿、引导和想象，不只是空。"],
  ["器以载道", "线、纹理和形状必须服务功能，不表演古风。"]
];
---

<section class="home-section reveal">
  <div class="container">
    <p class="eyebrow">再看方法</p>
    <h2>宋代美学如何变成数字界面</h2>
    <div class="framework-grid">
      {items.map(([title, description]) => (
        <article>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>
      ))}
    </div>
    <a class="quiet-link" href={withBase("/references/song-aesthetics-digital-design-research/")}>阅读调研转译摘要 <span aria-hidden="true">→</span></a>
  </div>
</section>

<style>
  .framework-grid {
    display: grid;
    gap: var(--song-space-scale-4);
    margin-bottom: var(--song-space-scale-8);
  }
  article {
    min-height: 190px;
    padding: var(--song-space-scale-6);
    border: var(--song-shape-border-width) solid var(--song-color-border-subtle);
    border-radius: var(--song-shape-radius-large);
    background: linear-gradient(180deg, rgb(255 255 255 / 0.72), rgb(239 238 229 / 0.42));
  }
  h3 {
    margin: 0 0 var(--song-space-scale-4);
    font-family: var(--song-typography-family-display);
    font-size: var(--song-typography-size-title-small);
    font-weight: 400;
  }
  p {
    margin: 0;
    color: var(--song-color-text-secondary);
    line-height: var(--song-typography-line-height-relaxed);
  }
  @media (min-width: 760px) {
    .framework-grid { grid-template-columns: repeat(3, 1fr); }
  }
</style>
```

- [ ] **Step 3: Update `HeroStatement.astro`**

Replace the hero statement line and primary action:

```astro
<p class="hero-statement">同样的建站内容，SongStyle 让移动网站从不断添加转向准确表达。</p>
```

```astro
<a class="primary-link" href="#mobile-showcase">查看移动网站对比</a>
```

Keep the secondary prompt link.

- [ ] **Step 4: Update `website/src/pages/index.astro` imports and sequence**

Replace the old evidence and method imports with:

```astro
import MobileShowcasePreview from "../components/home/MobileShowcasePreview.astro";
import SongAestheticFramework from "../components/home/SongAestheticFramework.astro";
```

Render:

```astro
<HeroStatement />
<MobileShowcasePreview />
<SongAestheticFramework />
<CaseStudyPreview />
<ResourceEntry />
```

Remove `EvidenceComparison` and `MethodSequence` from the homepage import list and render tree.

- [ ] **Step 5: Run homepage focused tests**

Run:

```bash
npx playwright test tests/e2e/smoke.spec.ts --grep "home page|central thesis"
npx playwright test tests/e2e/reduced-motion.spec.ts
npx playwright test tests/e2e/accessibility.spec.ts --grep "^/"
```

Expected result: homepage and reduced-motion tests pass. Content tests still fail until README and screenshots are added.

- [ ] **Step 6: Commit**

```bash
git add website/src/components/HeroStatement.astro website/src/components/home/MobileShowcasePreview.astro website/src/components/home/SongAestheticFramework.astro website/src/pages/index.astro tests/e2e/reduced-motion.spec.ts
git commit -m "feat: lead homepage with mobile SongStyle proof"
```

---

## Task 8: Update README And Commit Browser Screenshots

**Files:**
- Modify: `README.md`
- Create: `docs/assets/mobile-showcase-baiting.png`
- Create: `docs/assets/mobile-showcase-qingxu.png`

- [ ] **Step 1: Update README opening section**

Keep the title and thesis. Replace the paragraph after the thesis with:

```md
SongStyle AI Design System is an open-source design language for turning Song
aesthetics into modern UI, web, and app design decisions. It helps designers,
developers, and AI agents decide what should exist, how information should
relate, and where expression should stop.

宋式 AI 设计系统不是古风素材库，也不是把界面变得空旷。它将宋代美学中的格物致知、
三远法、宋版书排版、汝窑色彩、留白生意与器以载道，转译为现代移动网站和 Web UI
可以执行、审查和讨论的设计判断。

项目调研显示：宋代美学在室内、文创、建筑与展览中已有较多应用讨论，但在 UI、网页、
APP 与 AI 辅助数字设计中的系统性应用研究几乎空白。SongStyle 试图填补的正是这个空白。
```

- [ ] **Step 2: Replace the image table with screenshots**

Replace the current `See The Difference` table with:

```md
## See The Difference / 先看差异

The ordinary AI and SongStyle versions use **the same brief, the same copy,
the same image, the same CTA, and the same goal**. The content did not become
better. The design judgment did.

普通 AI 与 SongStyle 版本使用相同建站要求、相同文案、相同图片、相同行动与相同目标。
变化只来自移动网站的版面、层级、字体、字号、色彩、材质、图片裁切、空间和停止时机。

![白汀移动网站公平对比](docs/assets/mobile-showcase-baiting.png)

[白汀 Baiting 移动网站对比](https://robbyshao-8ag.github.io/songstyle-ai-design-system/examples/lifestyle-brand/)

![清序移动网站公平对比](docs/assets/mobile-showcase-qingxu.png)

[清序 Qingxu 移动网站对比](https://robbyshao-8ag.github.io/songstyle-ai-design-system/examples/digital-product/)
```

- [ ] **Step 3: Add the Digital SongStyle Framework section**

Insert after the screenshot section:

```md
## Digital SongStyle Framework / 数字宋式框架

- **格物致知 / Observed precision**: every visible element must be necessary, accurate, and carefully tuned.
- **三远法 / Information distance**: near, middle, and far distance become task, evidence, and narrative hierarchy.
- **宋版书 / Typographic rhythm**: composed line breaks, generous line-height, and sparse-dense rhythm shape reading.
- **汝窑与墨分五彩 / Color and tone**: porcelain, warm paper, mist gray, celadon, ink tones, and tiny accents replace high-saturation spectacle.
- **留白生意 / Functional breathing space**: negative space focuses, pauses, routes, and leaves room for imagination.
- **器以载道 / Useful ornament**: lines, textures, and shapes must serve grouping, routing, tactility, or meaning.
```

- [ ] **Step 4: Generate screenshots**

Start a local server in one terminal:

```bash
npm run dev -- --host 127.0.0.1
```

In a second terminal, create the screenshot directory and capture both case pages:

```bash
mkdir -p docs/assets
npx playwright screenshot --viewport-size=1440,1100 http://127.0.0.1:4321/songstyle-ai-design-system/examples/lifestyle-brand/ docs/assets/mobile-showcase-baiting.png
npx playwright screenshot --viewport-size=1440,1100 http://127.0.0.1:4321/songstyle-ai-design-system/examples/digital-product/ docs/assets/mobile-showcase-qingxu.png
```

Stop the dev server with `Ctrl-C`.

- [ ] **Step 5: Inspect screenshots**

Open both screenshots visually. Acceptance criteria:

- Both phone frames are visible above the fold.
- Labels `AI 默认移动网站` and `SongStyle 移动网站` are readable.
- The SongStyle side has visible Song-derived qualities, not only empty beige space.
- The default side remains plausible.

If a screenshot cuts off the phone comparison, rerun with:

```bash
npx playwright screenshot --viewport-size=1440,1400 http://127.0.0.1:4321/songstyle-ai-design-system/examples/lifestyle-brand/ docs/assets/mobile-showcase-baiting.png
npx playwright screenshot --viewport-size=1440,1400 http://127.0.0.1:4321/songstyle-ai-design-system/examples/digital-product/ docs/assets/mobile-showcase-qingxu.png
```

- [ ] **Step 6: Run content tests**

Run:

```bash
node --test tests/content-assets.test.mjs
```

Expected result: PASS for all content tests.

- [ ] **Step 7: Commit**

```bash
git add README.md docs/assets/mobile-showcase-baiting.png docs/assets/mobile-showcase-qingxu.png
git commit -m "docs: show mobile SongStyle comparisons in README"
```

---

## Task 9: Full Verification And Manual Visual QA

**Files:**
- No planned source edits. Fix scoped issues found by tests or browser QA in the owning component files.

- [ ] **Step 1: Run formatting and static checks**

Run:

```bash
git diff --check
npx astro check
node --test tests/content-assets.test.mjs
```

Expected result: all commands exit `0`.

- [ ] **Step 2: Run focused Playwright tests**

Run:

```bash
npx playwright test tests/e2e/smoke.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/public-pages.spec.ts tests/e2e/reduced-motion.spec.ts
```

Expected result: all Playwright tests pass. If the server cannot bind to `127.0.0.1:4321` inside the sandbox, rerun with escalation.

- [ ] **Step 3: Run full verification**

Run:

```bash
npm run verify
```

Expected result: all token checks, skills checks, unit tests, Astro checks, build, link checks, and Playwright tests pass.

- [ ] **Step 4: Manual browser QA**

Start the dev server:

```bash
npm run dev -- --host 127.0.0.1
```

Open and inspect:

- `http://127.0.0.1:4321/songstyle-ai-design-system/`
- `http://127.0.0.1:4321/songstyle-ai-design-system/examples/lifestyle-brand/`
- `http://127.0.0.1:4321/songstyle-ai-design-system/examples/digital-product/`
- `http://127.0.0.1:4321/songstyle-ai-design-system/examples/comparisons/`
- `http://127.0.0.1:4321/songstyle-ai-design-system/references/song-aesthetics-digital-design-research/`

Record these observations before final publication:

- Homepage first screen shows the updated thesis and points to mobile proof.
- Baiting and Qingxu case pages show two complete phone websites.
- Desktop comparison uses two columns without horizontal overflow.
- Mobile viewport stacks phones vertically without horizontal overflow.
- SongStyle versions feel visibly richer than generic minimalism.
- Default versions remain credible.

Stop the dev server with `Ctrl-C`.

- [ ] **Step 5: Commit final QA fixes**

If manual QA required changes, commit them:

```bash
git add website README.md docs tests
git commit -m "fix: polish mobile SongStyle showcase QA"
```

If no changes were required, do not create an empty commit.

- [ ] **Step 6: Confirm clean working tree**

Run:

```bash
git status --short
```

Expected result: no output.

---

## Task 10: Publish And Audit The Public Site

**Files:**
- No source edits.

- [ ] **Step 1: Push main**

Run:

```bash
git push origin main
```

- [ ] **Step 2: Watch CI and Pages**

Run:

```bash
gh run list --repo RobbyShao-8ag/songstyle-ai-design-system --limit 6
```

Watch the new CI run and Pages run:

```bash
gh run watch <ci-run-id> --repo RobbyShao-8ag/songstyle-ai-design-system --exit-status
gh run watch <pages-run-id> --repo RobbyShao-8ag/songstyle-ai-design-system --exit-status
```

Expected result: both runs complete with `success`.

- [ ] **Step 3: Verify public URLs**

Run:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' https://robbyshao-8ag.github.io/songstyle-ai-design-system/
curl -sS -o /dev/null -w '%{http_code}\n' https://robbyshao-8ag.github.io/songstyle-ai-design-system/examples/lifestyle-brand/
curl -sS -o /dev/null -w '%{http_code}\n' https://robbyshao-8ag.github.io/songstyle-ai-design-system/examples/digital-product/
curl -sS -o /dev/null -w '%{http_code}\n' https://robbyshao-8ag.github.io/songstyle-ai-design-system/examples/comparisons/
curl -sS -o /dev/null -w '%{http_code}\n' https://robbyshao-8ag.github.io/songstyle-ai-design-system/references/song-aesthetics-digital-design-research/
```

Expected result: every command prints `200`.

- [ ] **Step 4: Verify public homepage content**

Run:

```bash
curl -sS https://robbyshao-8ag.github.io/songstyle-ai-design-system/ | rg -o '同样的建站内容，SongStyle 让移动网站从不断添加转向准确表达。|同一份 Brief，两种移动网站|宋代美学如何变成数字界面'
```

Expected result: all three phrases print.

- [ ] **Step 5: Final report**

Report:

- Final commit hash.
- `npm run verify` result.
- GitHub CI and Pages result.
- Public URLs checked.
- Screenshot asset paths.
- Any visual QA notes that affect future iteration.

---

## Self-Review Checklist

- Spec coverage:
  - Research summary: Task 2.
  - Shared mobile brief data: Task 3.
  - Phone comparison shell: Task 4.
  - Four mobile websites: Task 5.
  - Case pages and comparison overview: Task 6.
  - Homepage proof and framework: Task 7.
  - README and screenshots: Task 8.
  - Verification and publication: Tasks 9 and 10.
- Placeholder scan: no unfinished markers, no unspecified file paths, no unnamed test commands.
- Type consistency:
  - Components consume `CaseStudy`.
  - `comparisonInvariants` is exported from `website/src/data/cases.ts`.
  - Test IDs match the planned components:
    - `mobile-showcase-preview`
    - `mobile-comparison-baiting`
    - `mobile-comparison-qingxu`
    - `baiting-default-mobile`
    - `baiting-songstyle-mobile`
    - `qingxu-default-mobile`
    - `qingxu-songstyle-mobile`
- Verification coverage:
  - Static content tests cover files, README, research summary, and case data.
  - Playwright covers homepage, case pages, accessibility, public routes, reduced motion, and overflow.
  - Manual QA covers the subjective visual bar from the approved spec.

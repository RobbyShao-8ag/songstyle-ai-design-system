# SongStyle Visible Foundation Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make SongStyle's hardened decision model visible on the homepage, README, and a new Quick Reference page so first-time users understand the system quickly.

**Architecture:** Keep the existing Astro content architecture. Add one public Markdown doc for Quick Reference, two focused homepage components for the decision model and anti-pattern corrections, update the hero/resource/README entry points, and extend existing content/e2e tests to prevent drift. Do not add new assets, new case studies, or new prompt/skill behavior.

**Tech Stack:** Astro components, Markdown content collections, existing design tokens, Node.js `node:test`, Playwright e2e tests.

---

## Source Spec

Implement from:

- `docs/superpowers/specs/2026-06-07-songstyle-visible-foundation-layer-design.md`

Current context:

- `main` includes the spec commit `878d3de docs: specify visible foundation layer`.
- The working tree should be clean before starting.
- Existing homepage order is `HeroStatement`, `MobileShowcasePreview`, `SongAestheticFramework`, `CaseStudyPreview`, `ResourceEntry`.

## File Structure

Create:

- `docs/quick-reference.md`
  A concise public one-page reference with frontmatter route `/quick-reference/`.
- `website/src/components/home/DecisionModelPreview.astro`
  A homepage section that presents the four-layer decision model.
- `website/src/components/home/AntiPatternPreview.astro`
  A homepage section that presents failure/correction pairs and links to the anti-pattern guide.

Modify:

- `README.md`
  Add a 30-second operational explanation and Quick Reference link near the top.
- `website/src/pages/index.astro`
  Import and render the two new homepage sections.
- `website/src/components/HeroStatement.astro`
  Make the hero copy and secondary CTA point to the operational model/Quick Reference.
- `website/src/components/home/ResourceEntry.astro`
  Add Quick Reference as the first resource.
- `tests/content-assets.test.mjs`
  Add content drift coverage for Quick Reference, README, homepage components, and links.
- `tests/e2e/smoke.spec.ts`
  Add homepage-visible foundation assertions.
- `tests/e2e/public-pages.spec.ts`
  Add `/quick-reference/` to public route coverage.

Do not modify:

- Existing mobile case components.
- Existing screenshots.
- Prompts, skills, or generated references.
- Design token source or generated dist.

---

### Task 0: Start The Implementation Branch

**Files:**

- No source files changed in this task.

- [ ] **Step 1: Confirm repository state**

Run:

```bash
git status --short --branch
git log --oneline --max-count=4
```

Expected:

- Working tree is clean.
- Current branch is `main`.
- Recent log includes `878d3de docs: specify visible foundation layer`.

- [ ] **Step 2: Create implementation branch**

Run:

```bash
git switch -c codex/songstyle-visible-foundation-layer
```

Expected:

```text
Switched to a new branch 'codex/songstyle-visible-foundation-layer'
```

---

### Task 1: Add Quick Reference Document

**Files:**

- Create: `docs/quick-reference.md`
- Modify: `tests/content-assets.test.mjs`

- [ ] **Step 1: Add failing content test for Quick Reference**

Append this test near the foundation hardening tests in `tests/content-assets.test.mjs`:

```js
test("quick reference exposes the visible foundation model", async () => {
  const file = "docs/quick-reference.md";
  const markdown = await readFile(file, "utf8");
  const data = parseFrontmatter(markdown, file);

  assert.equal(data.route, "/quick-reference/");
  assert.equal(data.lang, "zh-CN");
  assert.equal(data.section, "工具");

  for (const term of [
    "30 秒理解 SongStyle",
    "四层决策顺序",
    "硬约束",
    "任务目标",
    "信息距离",
    "审美表达",
    "六原则一句话",
    "必要密度",
    "常见反模式",
    "如何审查"
  ]) {
    assert.match(markdown, new RegExp(term), `Quick Reference is missing ${term}`);
  }

  for (const link of [
    "principles/priority-and-tradeoffs/",
    "foundations/information-distance/",
    "foundations/accessibility-alignment/",
    "guides/necessary-density-boundary/",
    "guides/anti-patterns/",
    "checklist/",
    "prompts/",
    "skills/"
  ]) {
    assert.match(markdown, new RegExp(link.replaceAll("/", "\\\\/")), `Quick Reference is missing link ${link}`);
  }
});
```

- [ ] **Step 2: Run focused test and verify it fails**

Run:

```bash
node --test tests/content-assets.test.mjs --test-name-pattern "quick reference exposes"
```

Expected: FAIL because `docs/quick-reference.md` does not exist.

- [ ] **Step 3: Create `docs/quick-reference.md`**

Write:

```markdown
---
title: 快速参考
description: 一页掌握 SongStyle 的决策顺序、核心原则、硬约束、反模式与审查方式。
lang: zh-CN
route: /quick-reference/
section: 工具
order: 0
---

# 快速参考

## 30 秒理解 SongStyle

SongStyle 不是把页面做空，而是先守住硬约束，再用近景、中景、远景建立秩序，最后才做留白、克制和余韵。

它帮助设计师、开发者与 AI Agent 判断：什么必须保留，什么应该建立关系，什么表达已经足够。

## 四层决策顺序

1. **硬约束**：可访问性、中文标题可读性、必要内容、真实表述、清楚主行动不能被审美覆盖。
2. **任务目标**：页面首先服务用户任务和业务目标，不同场景允许不同信息密度。
3. **信息距离**：用近景、中景、远景组织即时任务、支持证据和品牌叙事。
4. **审美表达**：留白、克制、温润和余韵只能强化前三层，不能替代它们。

## 六原则一句话

- **少而有序**：减少不是目的，建立清楚关系才是目的。
- **留白生意**：空间必须承担聚焦、分组、节奏、呼吸或联想功能。
- **克制有度**：当信息、色彩、装饰和动效完成任务后，就应停止。
- **平淡见真**：真实内容、准确结构和长期可读性比强刺激更重要。
- **温润可亲**：低饱和和柔和材质不能牺牲清楚对比与操作反馈。
- **含蓄留韵**：可以保留联想空间，但不能隐藏必要信息。

## 硬约束清单

- 正文、主 CTA、焦点状态、错误状态和必要说明保持可访问。
- 中文展示标题不使用装饰性窄列，不制造单字悬挂或破碎语义。
- 必须保留的信息不能为了留白被删除、隐藏或改写到不可理解。
- 产品事实、来源、价格、风险、任务状态和主行动保持真实清楚。

## 信息距离

- **近景**：用户立即要理解或行动的内容，例如标题、主任务、产品、CTA、关键状态。
- **中景**：支持近景成立的证据、规格、引用、流程、控件或反对意见处理。
- **远景**：品牌故事、长期愿景、氛围、哲学和可延后探索的内容。

## 必要密度

- 产品落地页必须保留价值主张、产品事实、购买路径、信任证据和主 CTA。
- 内容阅读页必须保留标题、来源、时效标记、结构、导航和阅读舒适度。
- 数据或专家工具必须保留当前任务、状态、控件、反馈、密集但有序的数据和错误恢复。
- 交易页面必须保留商品或服务、价格、条款、风险、确认动作和支持路径。

## 常见反模式

- **空白崇拜**：大面积空白没有功能。修正为功能性留白。
- **标题破碎**：为了留白压窄中文标题。修正为语义完整标题。
- **柔和但不可访问**：低对比伪装温润。修正为温润但合规。
- **文化符号堆砌**：水墨、印章、纹样和书法字体替代秩序。修正为秩序而非符号。
- **AI 过量生成**：持续加入渐变、徽章、卡片和重复卖点。修正为适度停止。

## 如何审查

先看硬约束，再看任务目标、信息距离和审美表达。使用[审查清单](../checklist/)评分时，每个分数都要引用证据，而不是只给审美判断。

继续阅读：

- [原则优先级与冲突裁决](../principles/priority-and-tradeoffs/)
- [信息距离](../foundations/information-distance/)
- [可访问性对齐](../foundations/accessibility-alignment/)
- [必要密度边界](../guides/necessary-density-boundary/)
- [反模式](../guides/anti-patterns/)
- [Prompt 模板](../prompts/)
- [Agent Skills](../skills/)
```

- [ ] **Step 4: Run focused test**

Run:

```bash
node --test tests/content-assets.test.mjs --test-name-pattern "quick reference exposes"
```

Expected: PASS.

- [ ] **Step 5: Commit Task 1**

Run:

```bash
git add docs/quick-reference.md tests/content-assets.test.mjs
git commit -m "docs: add SongStyle quick reference"
```

---

### Task 2: Update README Entry Narrative

**Files:**

- Modify: `README.md`
- Modify: `tests/content-assets.test.mjs`

- [ ] **Step 1: Add failing README test**

Append this test near other README tests in `tests/content-assets.test.mjs`:

```js
test("README presents the visible foundation model", async () => {
  const readme = await readFile("README.md", "utf8");
  for (const term of [
    "30 秒理解 SongStyle",
    "硬约束",
    "任务目标",
    "近景",
    "中景",
    "远景",
    "审美表达",
    "docs/quick-reference.md"
  ]) {
    assert.match(readme, new RegExp(term), `README is missing ${term}`);
  }
});
```

- [ ] **Step 2: Run focused test and verify it fails**

Run:

```bash
node --test tests/content-assets.test.mjs --test-name-pattern "README presents"
```

Expected: FAIL because README does not yet include the new visible model.

- [ ] **Step 3: Update `README.md`**

Add this section before `## See The Difference / 先看差异`:

```markdown
## 30 秒理解 SongStyle

SongStyle 不是把页面做空，而是先守住硬约束，再用近景、中景、远景建立秩序，最后才做留白、克制和余韵。

四层决策顺序：

1. **硬约束**：可访问性、中文标题可读性、必要内容、真实表述和清楚主行动不能被审美覆盖。
2. **任务目标**：页面首先服务用户任务和业务目标，不同场景允许不同信息密度。
3. **信息距离**：用近景、中景、远景组织即时任务、支持证据和品牌叙事。
4. **审美表达**：留白、克制、温润和余韵只能强化前三层，不能替代它们。

快速入口：[Quick Reference / 快速参考](docs/quick-reference.md)
```

If README feels repetitive after adding this, trim one sentence from the opening Chinese paragraph without changing its meaning.

- [ ] **Step 4: Run focused README test**

Run:

```bash
node --test tests/content-assets.test.mjs --test-name-pattern "README presents"
```

Expected: PASS.

- [ ] **Step 5: Commit Task 2**

Run:

```bash
git add README.md tests/content-assets.test.mjs
git commit -m "docs: explain SongStyle visible foundation in README"
```

---

### Task 3: Add Homepage Decision Model And Anti-Pattern Components

**Files:**

- Create: `website/src/components/home/DecisionModelPreview.astro`
- Create: `website/src/components/home/AntiPatternPreview.astro`
- Modify: `website/src/pages/index.astro`
- Modify: `tests/content-assets.test.mjs`

- [ ] **Step 1: Add failing content test for homepage components**

Append this test to `tests/content-assets.test.mjs`:

```js
test("homepage source exposes visible foundation components", async () => {
  const index = await readFile("website/src/pages/index.astro", "utf8");
  assert.match(index, /DecisionModelPreview/);
  assert.match(index, /AntiPatternPreview/);

  const decision = await readFile(
    "website/src/components/home/DecisionModelPreview.astro",
    "utf8"
  );
  for (const term of ["硬约束", "任务目标", "信息距离", "审美表达", "近景", "中景", "远景"]) {
    assert.match(decision, new RegExp(term), `DecisionModelPreview is missing ${term}`);
  }

  const antiPattern = await readFile(
    "website/src/components/home/AntiPatternPreview.astro",
    "utf8"
  );
  for (const term of [
    "反模式",
    "空白崇拜",
    "功能性留白",
    "标题破碎",
    "语义完整标题",
    "柔和但不可访问",
    "温润但合规",
    "文化符号堆砌",
    "秩序而非符号",
    "/guides/anti-patterns/"
  ]) {
    assert.match(antiPattern, new RegExp(term.replaceAll("/", "\\\\/")), `AntiPatternPreview is missing ${term}`);
  }
});
```

- [ ] **Step 2: Run focused test and verify it fails**

Run:

```bash
node --test tests/content-assets.test.mjs --test-name-pattern "homepage source exposes"
```

Expected: FAIL because components do not exist yet.

- [ ] **Step 3: Create `DecisionModelPreview.astro`**

Write:

```astro
---
import { withBase } from "../../lib/paths";

const layers = [
  ["01", "硬约束", "可访问性、中文标题、必要内容、真实表述和主行动先被保护。", "有没有硬约束被审美选择覆盖？"],
  ["02", "任务目标", "页面首先服务用户任务和业务目标，不同场景允许不同密度。", "用户现在最需要完成什么？"],
  ["03", "信息距离", "用近景、中景、远景组织即时任务、支持证据和品牌叙事。", "近景、中景、远景是否各有位置？"],
  ["04", "审美表达", "留白、克制、温润和余韵只强化前面三层。", "这个表达是在帮助意义，还是只是在制造风格？"]
];
---

<section class="home-section reveal decision-model" data-testid="decision-model-preview">
  <div class="container">
    <p class="eyebrow">先看判断</p>
    <h2>不是把页面做空，而是按顺序做判断</h2>
    <p class="section-lead">
      SongStyle 先守住硬约束，再用近景、中景、远景建立秩序，最后才做留白、克制和余韵。
    </p>
    <div class="model-grid">
      {layers.map(([number, title, description, question]) => (
        <article>
          <span>{number}</span>
          <h3>{title}</h3>
          <p>{description}</p>
          <small>{question}</small>
        </article>
      ))}
    </div>
    <a class="quiet-link" href={withBase("/quick-reference/")}>打开快速参考 <span aria-hidden="true">→</span></a>
  </div>
</section>

<style>
  .model-grid {
    display: grid;
    gap: var(--song-space-scale-4);
    margin-block: var(--song-space-scale-8);
  }

  article {
    padding: var(--song-space-scale-6);
    border: var(--song-shape-border-width) solid var(--song-color-border-subtle);
    border-radius: var(--song-shape-radius-large);
    background: rgb(255 255 255 / 0.62);
  }

  span {
    display: inline-block;
    margin-bottom: var(--song-space-scale-4);
    color: var(--song-color-accent-primary);
    font-size: var(--song-typography-size-small);
    font-weight: var(--song-typography-weight-semibold);
    letter-spacing: 0.12em;
  }

  h3 {
    margin: 0 0 var(--song-space-scale-3);
    font-family: var(--song-typography-family-display);
    font-size: var(--song-typography-size-title-small);
    font-weight: 400;
  }

  p {
    margin: 0 0 var(--song-space-scale-4);
    color: var(--song-color-text-secondary);
    line-height: var(--song-typography-line-height-relaxed);
  }

  small {
    color: var(--song-color-text-muted);
    line-height: var(--song-typography-line-height-body);
  }

  @media (min-width: 860px) {
    .model-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
```

- [ ] **Step 4: Create `AntiPatternPreview.astro`**

Write:

```astro
---
import { withBase } from "../../lib/paths";

const pairs = [
  ["空白崇拜", "大面积空白没有聚焦、分组或节奏功能。", "功能性留白", "空间承担聚焦、分组、停顿和联想。"],
  ["标题破碎", "为了留白压窄中文标题，破坏语义和阅读。", "语义完整标题", "先保证语义短语完整，再调整层级和空间。"],
  ["柔和但不可访问", "用低对比文字和弱状态制造温润感。", "温润但合规", "用清楚对比、焦点和反馈支撑温润表达。"],
  ["文化符号堆砌", "水墨、印章、纹样或书法字体替代秩序。", "秩序而非符号", "用比例、节奏、材料感和信息关系表达气质。"]
];
---

<section class="home-section reveal anti-patterns" data-testid="anti-pattern-preview">
  <div class="container">
    <p class="eyebrow">再看反模式</p>
    <h2>SongStyle 先排除错误的高级感</h2>
    <p class="section-lead">
      反模式不是风格偏好问题，而是会损害理解、可用性或真实性的设计判断。
    </p>
    <div class="pattern-grid">
      {pairs.map(([failure, failureText, correction, correctionText]) => (
        <article>
          <div class="failure">
            <strong>{failure}</strong>
            <p>{failureText}</p>
          </div>
          <span aria-hidden="true">→</span>
          <div class="correction">
            <strong>{correction}</strong>
            <p>{correctionText}</p>
          </div>
        </article>
      ))}
    </div>
    <a class="quiet-link" href={withBase("/guides/anti-patterns/")}>查看完整反模式 <span aria-hidden="true">→</span></a>
  </div>
</section>

<style>
  .pattern-grid {
    display: grid;
    gap: var(--song-space-scale-4);
    margin-block: var(--song-space-scale-8);
  }

  article {
    display: grid;
    gap: var(--song-space-scale-4);
    padding: var(--song-space-scale-6);
    border: var(--song-shape-border-width) solid var(--song-color-border-subtle);
    border-radius: var(--song-shape-radius-large);
    background: linear-gradient(180deg, rgb(255 255 255 / 0.72), rgb(239 238 229 / 0.42));
  }

  strong {
    display: block;
    margin-bottom: var(--song-space-scale-2);
    font-family: var(--song-typography-family-display);
    font-size: var(--song-typography-size-title-small);
    font-weight: 400;
  }

  p {
    margin: 0;
    color: var(--song-color-text-secondary);
    line-height: var(--song-typography-line-height-relaxed);
  }

  article > span {
    color: var(--song-color-accent-primary);
    font-size: var(--song-typography-size-title-small);
  }

  .failure strong {
    color: var(--song-color-text-muted);
  }

  .correction strong {
    color: var(--song-color-text-primary);
  }

  @media (min-width: 860px) {
    .pattern-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    article {
      grid-template-columns: 1fr auto 1fr;
      align-items: start;
    }
  }
</style>
```

- [ ] **Step 5: Update `website/src/pages/index.astro`**

Add imports:

```astro
import DecisionModelPreview from "../components/home/DecisionModelPreview.astro";
import AntiPatternPreview from "../components/home/AntiPatternPreview.astro";
```

Render after `MobileShowcasePreview` and before `SongAestheticFramework`:

```astro
  <DecisionModelPreview />
  <AntiPatternPreview />
```

- [ ] **Step 6: Run focused content test**

Run:

```bash
node --test tests/content-assets.test.mjs --test-name-pattern "homepage source exposes"
```

Expected: PASS.

- [ ] **Step 7: Commit Task 3**

Run:

```bash
git add website/src/components/home/DecisionModelPreview.astro website/src/components/home/AntiPatternPreview.astro website/src/pages/index.astro tests/content-assets.test.mjs
git commit -m "feat: show visible foundation model on homepage"
```

---

### Task 4: Refine Hero And Resource Entry

**Files:**

- Modify: `website/src/components/HeroStatement.astro`
- Modify: `website/src/components/home/ResourceEntry.astro`
- Modify: `tests/content-assets.test.mjs`

- [ ] **Step 1: Add failing content test for hero/resources**

Append this test to `tests/content-assets.test.mjs`:

```js
test("homepage hero and resources point to quick reference", async () => {
  const hero = await readFile("website/src/components/HeroStatement.astro", "utf8");
  for (const term of [
    "硬约束",
    "近景",
    "中景",
    "远景",
    "留白",
    "克制",
    "/quick-reference/"
  ]) {
    assert.match(hero, new RegExp(term.replaceAll("/", "\\\\/")), `Hero is missing ${term}`);
  }

  const resources = await readFile("website/src/components/home/ResourceEntry.astro", "utf8");
  assert.match(resources, /Quick Reference/);
  assert.match(resources, /快速参考/);
  assert.match(resources, /\/quick-reference\//);
});
```

- [ ] **Step 2: Run focused test and verify it fails**

Run:

```bash
node --test tests/content-assets.test.mjs --test-name-pattern "homepage hero and resources"
```

Expected: FAIL because hero/resource entries do not yet include Quick Reference.

- [ ] **Step 3: Update `HeroStatement.astro` copy and CTA**

Replace the body copy paragraph with:

```astro
    <p class="body-copy">
      SongStyle 不是把页面做空，而是先守住硬约束，再用近景、中景、远景建立秩序，
      最后才做留白、克制和余韵。它不是古风装饰，也不是空旷模板。
    </p>
```

Update secondary CTA:

```astro
      <a class="quiet-link" href={withBase("/quick-reference/")}>查看快速参考 <span aria-hidden="true">→</span></a>
```

Do not remove the primary mobile showcase CTA.

- [ ] **Step 4: Update `ResourceEntry.astro`**

Change `resources` to:

```js
const resources = [
  ["Quick Reference / 快速参考", "/quick-reference/", "一页掌握决策顺序、硬约束、反模式与审查方式。"],
  ["Prompts", "/prompts/", "可复制的 Web 设计与审查模板。"],
  ["Agent Skills", "/skills/", "可移植的设计与审查工作流。"],
  ["设计变量", "/design-tokens/", "色彩、空间、字体、形状与动效的可执行变量。"],
  ["审查清单", "/checklist/", "人、Prompt 与 Skill 共享的六项维度。"]
];
```

- [ ] **Step 5: Run focused content test**

Run:

```bash
node --test tests/content-assets.test.mjs --test-name-pattern "homepage hero and resources"
```

Expected: PASS.

- [ ] **Step 6: Commit Task 4**

Run:

```bash
git add website/src/components/HeroStatement.astro website/src/components/home/ResourceEntry.astro tests/content-assets.test.mjs
git commit -m "feat: surface quick reference from homepage"
```

---

### Task 5: Add E2E Coverage For Visible Foundation

**Files:**

- Modify: `tests/e2e/smoke.spec.ts`
- Modify: `tests/e2e/public-pages.spec.ts`

- [ ] **Step 1: Add `/quick-reference/` to public routes**

In `tests/e2e/public-pages.spec.ts`, add `"/quick-reference/"` after `"/prompts/"` or near other tool pages in `PUBLIC_ROUTES`.

- [ ] **Step 2: Add visible foundation e2e test**

Append this test to `tests/e2e/smoke.spec.ts` after `home page presents the central thesis`:

```ts
test("home page presents the visible foundation model", async ({ page }) => {
  await page.goto(withBase("/"));

  await expect(
    page.getByText("SongStyle 不是把页面做空，而是先守住硬约束", { exact: false })
  ).toBeVisible();

  const model = page.getByTestId("decision-model-preview");
  for (const term of ["硬约束", "任务目标", "信息距离", "审美表达"]) {
    await expect(model.getByRole("heading", { level: 3, name: term })).toBeVisible();
  }
  await expect(model.getByRole("link", { name: "打开快速参考", exact: true })).toHaveAttribute(
    "href",
    withBase("/quick-reference/")
  );

  const antiPatterns = page.getByTestId("anti-pattern-preview");
  for (const term of ["空白崇拜", "功能性留白", "标题破碎", "语义完整标题", "柔和但不可访问", "温润但合规"]) {
    await expect(antiPatterns.getByText(term, { exact: true })).toBeVisible();
  }
  await expect(antiPatterns.getByRole("link", { name: "查看完整反模式", exact: true })).toHaveAttribute(
    "href",
    withBase("/guides/anti-patterns/")
  );
});
```

- [ ] **Step 3: Run focused e2e and verify it fails before implementation if needed**

If Task 3 and Task 4 are already implemented, this test should pass. Run:

```bash
npx playwright test tests/e2e/smoke.spec.ts --grep "visible foundation model"
```

Expected after implementation: PASS.

- [ ] **Step 4: Run public page route focused test**

Run:

```bash
npx playwright test tests/e2e/public-pages.spec.ts --grep "/quick-reference/"
```

Expected: PASS.

- [ ] **Step 5: Commit Task 5**

Run:

```bash
git add tests/e2e/smoke.spec.ts tests/e2e/public-pages.spec.ts
git commit -m "test: cover visible foundation homepage"
```

---

### Task 6: Final Verification

**Files:**

- Modify only files needed to fix verification failures.

- [ ] **Step 1: Run content and unit tests**

Run:

```bash
npm run test:unit
```

Expected: PASS with all Node tests.

- [ ] **Step 2: Run check**

Run:

```bash
npm run check
```

Expected: token check, skill check, unit tests, and Astro check pass.

- [ ] **Step 3: Run build**

Run:

```bash
npm run build
```

Expected:

- Astro check reports 0 errors and 0 warnings.
- Static build includes `/quick-reference/`.

- [ ] **Step 4: Run link check**

Run:

```bash
npm run links:check
```

Expected:

```text
Internal links OK
```

- [ ] **Step 5: Run full verification**

Run:

```bash
npm run verify
```

Expected: PASS. This may need sandbox escalation because Playwright starts a local server.

- [ ] **Step 6: Review diff**

Run:

```bash
git diff --stat main...HEAD
git diff --check
git status --short --branch
```

Expected:

- Diff includes only planned docs, homepage components, README, and tests.
- `git diff --check` exits 0.
- Working tree is clean after final commits.

- [ ] **Step 7: Commit verification fixes if needed**

If any fix was required during Task 6:

```bash
git add .
git commit -m "test: verify visible foundation layer"
```

If no fix was required, do not create an empty commit.

---

## Self-Review Checklist

Before asking for integration:

- `docs/quick-reference.md` summarizes existing rules and links deeper docs; it does not redefine them differently.
- Homepage still shows mobile showcase before the deeper framework/case sections.
- Hero copy does not make Chinese heading lines unreadable.
- New homepage cards are readable on mobile and do not require hover.
- All homepage links use `withBase`.
- Markdown links are route-relative and pass `npm run links:check`.
- README remains concise and still includes the fair comparison contract.
- `/quick-reference/` is included in public page e2e coverage.
- `npm run verify` passes.

## Execution Recommendation

Use Subagent-Driven execution. The tasks have separate ownership:

1. Quick Reference doc.
2. README narrative.
3. Homepage components.
4. Hero/resource entry.
5. E2E coverage.
6. Final verification.

If executing inline, commit after each task and run the focused tests before moving on.

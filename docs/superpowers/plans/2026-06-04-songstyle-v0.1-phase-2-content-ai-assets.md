# SongStyle v0.1 Phase 2: Content and AI Assets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the normative SongStyle content, shared review model, four structured prompts, and two portable Agent Skills, and render them through the documentation website.

**Architecture:** Principles and review dimensions are stored as normative data and expanded by human-readable Markdown. Astro Content Collections load documentation and executable assets directly from their repository modules. Agent Skills remain portable by bundling generated reference summaries derived from the normative sources.

**Tech Stack:** Astro Content Collections, Markdown/MDX, JSON, YAML frontmatter, Node test runner, Agent Skills open format

---

## Task 1: Define the Normative Principle and Review Models

**Files:**
- Create: `docs/principles/principles.json`
- Create: `checklists/songstyle-review.json`
- Create: `checklists/songstyle-review.md`
- Create: `evals/briefs.json`
- Modify: `tests/content-assets.test.mjs`

- [ ] **Step 1: Write failing normative-model tests**

Add tests that require:

```js
const PRINCIPLE_IDS = [
  "less-with-order",
  "space-creates-meaning",
  "restraint-knows-measure",
  "quietness-reveals-truth",
  "warmth-makes-technology-approachable",
  "suggestion-leaves-resonance"
];

const REVIEW_DIMENSION_IDS = [
  "information-necessity",
  "hierarchy-clarity",
  "functional-negative-space",
  "appropriate-stopping",
  "order-not-symbols",
  "usability-accessibility-goals"
];

const EVAL_BRIEF_IDS = [
  "lifestyle-landing",
  "digital-product-landing",
  "necessary-density",
  "overdecorated-existing-page"
];
```

The tests must parse the JSON files, assert the IDs exactly match, and assert
that every review dimension defines `question`, `good`, and `risk`.
They must also assert that `checklists/songstyle-review.md` contains every
dimension's Chinese name and question.

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm run content:check
```

Expected:

```text
FAIL because the normative model files do not exist.
```

- [ ] **Step 3: Create `docs/principles/principles.json`**

Each principle object must contain:

```json
{
  "id": "less-with-order",
  "nameZh": "少而有序",
  "nameEn": "Less, With Order",
  "summaryZh": "减少信息不是目的，建立清晰而稳定的关系才是目的。",
  "summaryEn": "Reducing information is not the goal; creating clear and stable relationships is.",
  "reviewQuestionZh": "如果移除这个元素，用户的理解是否会变差？",
  "reviewQuestionEn": "If this element is removed, does the user's understanding become worse?"
}
```

Create all six approved principles using the wording from the specification.

- [ ] **Step 4: Create the shared review model**

Create `checklists/songstyle-review.json` with:

```json
{
  "version": "0.1.0",
  "scale": {
    "0": "Fails the dimension and harms the page goal.",
    "1": "Major problems dominate.",
    "2": "Mixed result with clear improvement needed.",
    "3": "Meets the dimension with minor issues.",
    "4": "Strong, deliberate, and well explained."
  },
  "dimensions": []
}
```

Define the six required dimensions. Each dimension must contain:

```json
{
  "id": "information-necessity",
  "nameZh": "信息必要性",
  "nameEn": "Information Necessity",
  "question": "页面中的每一条信息是否都支持用户任务或业务目标？",
  "good": "保留的信息有明确作用，次要内容被延后或移除。",
  "risk": "为了显得丰富而堆叠模块、卖点和重复文案。"
}
```

Create `checklists/songstyle-review.md` as the human-readable version. It must
explain the 0-4 scale, list all six dimensions, and state:

```text
更空不等于更好。必要的信息密度、可用性、可访问性与业务目标优先于审美偏好。
```

Use frontmatter:

```yaml
---
title: SongStyle 审查清单
description: 用同一套维度审查信息、层级、留白、克制、文化表达与可用性。
lang: zh-CN
route: /checklist/
section: 工具
order: 1
---
```

- [ ] **Step 5: Create fixed evaluation briefs**

Create `evals/briefs.json`. Each brief must contain:

```json
{
  "id": "lifestyle-landing",
  "title": "Contemporary home objects landing page",
  "brief": "Design a landing page for a contemporary home objects brand. Introduce one flagship tabletop object, communicate material quality and daily use, provide a clear purchase path, and establish trust without using ancient-style decoration.",
  "mustPreserve": ["Primary product category", "Purchase path", "Trust information"],
  "risksToDetect": ["Decorative cultural symbols", "Empty space without purpose"]
}
```

Define all four required briefs:

- `lifestyle-landing`: the contemporary home objects landing page above.
- `digital-product-landing`: an AI research workspace landing page that must
  explain source collection, synthesis, collaboration, and a trial path
  without neon AI styling or excessive feature cards.
- `necessary-density`: a research-results workspace containing filters,
  citations, status, and comparison data that must remain information-dense
  enough for expert work.
- `overdecorated-existing-page`: an existing product page with strong
  gradients, decorative particles, competing calls to action, repeated
  selling points, and cultural motifs unrelated to the product.

- [ ] **Step 6: Run tests and commit**

Run:

```bash
npm run content:check
git diff --check
```

Expected:

```text
Normative model tests pass.
```

Commit:

```bash
git add docs/principles/principles.json checklists evals tests/content-assets.test.mjs
git commit -m "feat: define SongStyle principles and review model"
```

## Task 2: Add Astro Content Collections and Dynamic Documentation Routes

**Files:**
- Create: `website/src/content.config.ts`
- Create: `website/src/lib/content.ts`
- Create: `website/src/layouts/DocumentLayout.astro`
- Create: `website/src/layouts/ResourceLayout.astro`
- Create: `website/src/pages/[...route].astro`
- Create: `website/src/components/DocSidebar.astro`
- Create: `website/src/components/MarkdownProse.astro`
- Create: `prompts/.gitkeep`
- Create: `skills/.gitkeep`
- Create: `examples/.gitkeep`
- Modify: `website/src/components/SiteHeader.astro`
- Modify: `website/src/styles/global.css`

- [ ] **Step 1: Create module roots and write a failing route test**

Create `.gitkeep` files so every content-loader base directory exists before
its Markdown assets are added.

Add a Playwright test that expects:

```text
/checklist/
```

to render a visible `<main>` and a level-one heading. Reuse the `withBase()`
helper from `tests/e2e/smoke.spec.ts`.

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm run test:e2e -- --grep "checklist"
```

Expected:

```text
FAIL because the checklist route does not exist.
```

- [ ] **Step 3: Define content collections**

Create `website/src/content.config.ts` with collections:

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
  lang: z.enum(["zh-CN", "en"]),
  route: z.string().startsWith("/"),
  section: z.string(),
  order: z.number()
});

const docs = defineCollection({
  loader: glob({
    pattern: "{manifesto,principles,foundations,references,guides,en}/**/*.{md,mdx}",
    base: "./docs"
  }),
  schema: pageSchema
});

const checklists = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./checklists" }),
  schema: pageSchema
});

const prompts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./prompts" }),
  schema: pageSchema
});

const examples = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./examples" }),
  schema: pageSchema
});

const skills = defineCollection({
  loader: glob({ pattern: "**/SKILL.md", base: "./skills" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    license: z.string().optional(),
    metadata: z.record(z.string(), z.string()).optional()
  })
});

export const collections = { docs, checklists, prompts, examples, skills };
```

- [ ] **Step 4: Implement route aggregation**

Create `website/src/lib/content.ts` that:

- Calls `getCollection()` for all five collections.
- Converts skill IDs into routes `/skills/<name>/`.
- Returns one array of `{ kind, route, title, description, entry }`.
- Sorts documentation by `section` and `order`.
- Throws on duplicate routes.
- Keeps example entries available for custom case-study pages, but excludes
  them from the generic catch-all route to avoid duplicate routes.

- [ ] **Step 5: Implement documentation layouts and catch-all route**

Create:

- `DocumentLayout.astro` for manifesto, principles, foundations, guides,
  references, and checklists.
- `ResourceLayout.astro` for prompts and skills.
- `DocSidebar.astro` using the aggregated documentation navigation.
- `MarkdownProse.astro` for consistent article typography.
- `website/src/pages/[...route].astro` using `getStaticPaths()` and
  `render(entry)`.

The catch-all route must select the correct layout by `kind`.
Its `getStaticPaths()` must exclude entries where `kind === "examples"`.

- [ ] **Step 6: Add document styles and navigation**

Extend `global.css` with:

- Stable desktop sidebar.
- Single-column mobile documentation layout.
- Readable line length.
- Styled headings, paragraphs, lists, blockquotes, tables, and code blocks.
- Copyable-looking code blocks without adding client-side JavaScript.

Update `SiteHeader.astro` links to point to real routes.
At this stage, expose only routes that already exist: the brand home,
`/checklist/`, and `/reference-ui/`. Later tasks add links as their content
becomes available.

- [ ] **Step 7: Run build and tests**

Run:

```bash
npm run build
npm run test:e2e -- --grep "checklist"
```

Expected:

```text
Content collections validate.
The dynamic checklist route renders.
The route test passes.
```

- [ ] **Step 8: Commit**

```bash
git add website tests/e2e prompts/.gitkeep skills/.gitkeep examples/.gitkeep
git commit -m "feat: render repository content in Astro"
```

## Task 3: Write the Chinese Manifesto, Principles, References, and Foundations

**Files:**
- Create: `docs/manifesto/zh.md`
- Create: `docs/principles/index.md`
- Create: `docs/principles/01-less-with-order.md`
- Create: `docs/principles/02-space-creates-meaning.md`
- Create: `docs/principles/03-restraint-knows-measure.md`
- Create: `docs/principles/04-quietness-reveals-truth.md`
- Create: `docs/principles/05-warmth-makes-technology-approachable.md`
- Create: `docs/principles/06-suggestion-leaves-resonance.md`
- Create: `docs/references/reading-list.md`
- Create: `docs/foundations/index.md`
- Create: `docs/foundations/design-tokens.md`
- Create: `docs/foundations/color.md`
- Create: `docs/foundations/space.md`
- Create: `docs/foundations/typography.md`
- Create: `docs/foundations/surface.md`
- Create: `docs/foundations/motion.md`
- Create: `docs/guides/from-brief-to-web-design.md`
- Create: `docs/guides/contributing.md`
- Modify: `website/src/components/SiteHeader.astro`
- Modify: `website/src/pages/index.astro`

- [ ] **Step 1: Add required-content tests**

Extend `tests/content-assets.test.mjs` to assert all files above exist and that:

- Every Markdown file includes all `pageSchema` frontmatter fields.
- Every principle page contains its ID, Chinese name, English name, and review
  question from `principles.json`.
- Every principle page contains headings equivalent to:
  - `这意味着什么`
  - `为什么重要`
  - `如何转译为现代 Web 设计`
  - `常见误区`
  - `审查问题`
  - `参考与延伸阅读`
- Every foundation page links to `design-tokens/`.
- The required index routes exist:
  - `/principles/`
  - `/foundations/`
  - `/design-tokens/`
  - `/contributing/`

Use these routes for the six principle pages:

```text
docs/principles/01-less-with-order.md -> /principles/less-with-order/
docs/principles/02-space-creates-meaning.md -> /principles/space-creates-meaning/
docs/principles/03-restraint-knows-measure.md -> /principles/restraint-knows-measure/
docs/principles/04-quietness-reveals-truth.md -> /principles/quietness-reveals-truth/
docs/principles/05-warmth-makes-technology-approachable.md -> /principles/warmth-makes-technology-approachable/
docs/principles/06-suggestion-leaves-resonance.md -> /principles/suggestion-leaves-resonance/
```

Use these routes for the five foundation pages:

```text
docs/foundations/color.md -> /foundations/color/
docs/foundations/space.md -> /foundations/space/
docs/foundations/typography.md -> /foundations/typography/
docs/foundations/surface.md -> /foundations/surface/
docs/foundations/motion.md -> /foundations/motion/
```

Use these routes for the remaining Chinese pages:

```text
docs/references/reading-list.md -> /references/
docs/guides/from-brief-to-web-design.md -> /guides/from-brief-to-web-design/
docs/guides/contributing.md -> /contributing/
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm run content:check
```

Expected:

```text
FAIL because the Chinese content files do not exist.
```

- [ ] **Step 3: Write the manifesto**

`docs/manifesto/zh.md` must include:

```yaml
---
title: AI 时代的宋式设计宣言
description: 为什么 AI 需要学习克制、秩序与留白。
lang: zh-CN
route: /manifesto/
section: 理念
order: 1
---
```

The manifesto must state:

- AI makes design faster but often makes it excessive.
- SongStyle is not historical reconstruction or decorative ancient style.
- Sparse information can create advanced design when relationships are exact.
- Negative space gives viewers time and room to complete meaning.
- The system teaches AI to stop after expression is sufficient.
- Usability, accessibility, truthfulness, and business goals remain mandatory.

- [ ] **Step 4: Write the six principle pages**

Use the approved wording from `principles.json`. Each page must:

- Use the rule-page template from the specification.
- Explain one principle without claiming that it is the only interpretation of
  Song aesthetics.
- Provide at least two Web design examples.
- Provide at least two common mistakes.
- End with the principle's review question.
- Link to relevant items on the rendered `/references/` page using relative
  URLs.

- [ ] **Step 5: Write principle and foundation index pages**

Create:

- `docs/principles/index.md` at `/principles/`, introducing the six-principle
  system and linking to every principle page.
- `docs/foundations/index.md` at `/foundations/`, explaining how the expression
  layer differs from the adaptable core layer.
- `docs/foundations/design-tokens.md` at `/design-tokens/`, explaining that
  "Design Tokens / 设计变量" means reusable design variables rather than model
  tokens, and linking to source JSON and generated CSS.

Each file must use `pageSchema` frontmatter.
Use relative rendered-page links inside Markdown so links continue to work
under the GitHub Pages base path.

- [ ] **Step 6: Write references and further reading**

`docs/references/reading-list.md` must separate:

```text
博物馆与公共研究资料
进一步阅读
现代转译说明
```

Include at least these public museum sources:

- The Metropolitan Museum of Art, "Northern Song Dynasty (960–1127)"
  - `https://www.metmuseum.org/essays/northern-song-dynasty-960-1127`
- The Metropolitan Museum of Art, "Landscape Painting in Chinese Art"
  - `https://www.metmuseum.org/toah/hd/clpg/hd_clpg.htm`
- The Metropolitan Museum of Art, "Landscape in the style of Fan Kuan"
  - `https://www.metmuseum.org/art/collection/search/40002`

State clearly that SongStyle's digital rules are modern translations, not
historical design specifications.

- [ ] **Step 7: Write the five foundation pages**

Each foundation page must explain:

- The design decision.
- The relevant Design Token groups.
- Appropriate use.
- Discouraged patterns.
- A review question.

Specific requirements:

- `color.md`: low saturation, sufficient contrast, no high-saturation
  "national trend" shortcut.
- `space.md`: functional negative space, not empty space for its own sake.
- `typography.md`: Chinese readability, restrained display type, reliable
  Chinese-English pairing.
- `surface.md`: weak boundaries, soft shadows, low plasticity.
- `motion.md`: calm entry, reduced-motion support, no bounce or explosive
  scaling.

- [ ] **Step 8: Write guides and update available navigation**

`docs/guides/from-brief-to-web-design.md` must teach this workflow:

```text
1. Clarify the page goal and user task.
2. List necessary information.
3. Remove, defer, or combine nonessential information.
4. Establish hierarchy and rhythm.
5. Assign functional negative space.
6. Select expression strength.
7. Apply design foundations.
8. Review against the shared checklist.
```

Create `docs/guides/contributing.md` at `/contributing/`, summarizing the
contribution process and linking to the root `CONTRIBUTING.md` through the
final GitHub repository URL.

Update `SiteHeader.astro` to add the now-available manifesto, principles,
Design Tokens, and contribution routes.
Update the home page to link to `/manifesto/` and `/principles/` through
`withBase()`.

- [ ] **Step 9: Run content and site verification**

Run:

```bash
npm run content:check
npm run build
npm run links:check
```

Expected:

```text
Required Chinese content exists.
Astro validates frontmatter and builds all pages.
Internal links are valid.
```

- [ ] **Step 10: Commit**

```bash
git add docs website/src/components/SiteHeader.astro website/src/pages/index.astro tests/content-assets.test.mjs
git commit -m "docs: add Chinese SongStyle design guidance"
```

## Task 4: Write the Required English Entry Content

**Files:**
- Create: `docs/en/manifesto.md`
- Create: `docs/en/core-principles.md`
- Create: `docs/en/usage.md`
- Modify: `README.md`
- Modify: `tests/content-assets.test.mjs`

- [ ] **Step 1: Add failing English coverage tests**

Require the three files above and assert that `README.md` links to:

```text
docs/manifesto/zh.md
docs/en/manifesto.md
docs/en/core-principles.md
docs/en/usage.md
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm run content:check
```

Expected:

```text
FAIL because the English entry content is incomplete.
```

- [ ] **Step 3: Write the English manifesto**

Use frontmatter:

```yaml
---
title: A SongStyle Design Manifesto for the AI Era
description: Why AI-generated design needs restraint, order, and meaningful space.
lang: en
route: /en/manifesto/
section: English
order: 1
---
```

Translate the thesis carefully rather than mechanically. Preserve:

- "AI does not know when to stop."
- SongStyle is a modern translation, not historical reconstruction.
- Negative space is an active space for association.

- [ ] **Step 4: Write English principles and usage**

`docs/en/core-principles.md` must summarize all six principles and their review
questions.

`docs/en/usage.md` must explain:

- What modules are available.
- How to use Design Tokens, prompts, and Agent Skills.
- What v0.1 does not include.
- How to run the repository locally.

At this task, link only to routes that already exist. Name future prompt and
skill modules in code formatting; later tasks add their links after those
routes are created.

Use routes:

```text
docs/en/core-principles.md -> /en/core-principles/
docs/en/usage.md -> /en/usage/
```

- [ ] **Step 5: Update README links and verify**

Run:

```bash
npm run content:check
npm run build
npm run links:check
```

Expected:

```text
English entry pages build and README links are valid.
```

- [ ] **Step 6: Commit**

```bash
git add docs/en README.md tests/content-assets.test.mjs
git commit -m "docs: add English project entry content"
```

## Task 5: Create Four Structured Prompt Templates

**Files:**
- Create: `prompts/web-design/from-brief.md`
- Create: `prompts/web-design/rewrite-existing-page.md`
- Create: `prompts/design-review/review-page.md`
- Create: `prompts/design-review/compare-default-and-songstyle.md`
- Create: `docs/guides/prompts.md`
- Modify: `docs/en/usage.md`
- Modify: `website/src/components/SiteHeader.astro`
- Modify: `tests/content-assets.test.mjs`

- [ ] **Step 1: Add failing prompt coverage tests**

Require all four prompt files and assert each contains:

```text
Assumptions / 假设
Information hierarchy / 信息层级
Removal decisions / 删减决策
Visual direction / 视觉方向
Implementation constraints / 实现约束
Review / 审查
```

Also assert every prompt links to:

```text
/checklist/
```

Assert the two design-review prompts contain all six review dimension names,
and the two Web design prompts name all six core principles or link to the
principle index.

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm run content:check
```

Expected:

```text
FAIL because prompt files do not exist.
```

- [ ] **Step 3: Write the Web design prompts**

Each prompt must include frontmatter compatible with the Astro collection and
a fenced prompt block that users can copy.

Use these routes:

```text
prompts/web-design/from-brief.md -> /prompts/web-design/from-brief/
prompts/web-design/rewrite-existing-page.md -> /prompts/web-design/rewrite-existing-page/
prompts/design-review/review-page.md -> /prompts/design-review/review-page/
prompts/design-review/compare-default-and-songstyle.md -> /prompts/design-review/compare-default-and-songstyle/
```

`from-brief.md` must accept:

```text
Product, page goal, audience, required content, brand constraints, technical constraints.
```

`rewrite-existing-page.md` must accept:

```text
Existing page description or screenshot, page goal, content that cannot be removed, known problems.
```

Both must instruct the model to preserve necessary information, challenge
decorative cultural shortcuts, and state what it intentionally does not add.
The visible prompt text must name the `/checklist/` website route, while the
surrounding Markdown may name `checklists/songstyle-review.md` as the source
file in code formatting.
Use `../../../checklist/` as the rendered relative link target from all four
prompt routes.

- [ ] **Step 4: Write the review prompts**

`review-page.md` must score all six shared review dimensions from 0 to 4 and
return prioritized changes.

`compare-default-and-songstyle.md` must generate:

```text
Ordinary AI default proposal
Default proposal diagnosis
SongStyle proposal
Decision comparison
Checklist result
```

- [ ] **Step 5: Add the prompt index and navigation entry**

Create `docs/guides/prompts.md` at `/prompts/`, explaining the four prompt
templates and linking to all four rendered prompt routes with relative URLs.
Update `SiteHeader.astro` to add the prompt index route.
Update `docs/en/usage.md` to link to the prompt index.

- [ ] **Step 6: Verify and commit**

Run:

```bash
npm run content:check
npm run build
npm run links:check
```

Expected:

```text
All prompt coverage tests pass and prompt pages render.
```

Commit:

```bash
git add prompts docs/guides/prompts.md docs/en/usage.md website/src/components/SiteHeader.astro tests/content-assets.test.mjs
git commit -m "feat: add SongStyle prompt templates"
```

## Task 6: Create and Validate Two Portable Agent Skills

**Files:**
- Create: `scripts/build-skill-references.mjs`
- Create: `scripts/validate-skills.mjs`
- Create: `skills/songstyle-web-designer/SKILL.md`
- Create: `skills/songstyle-web-designer/references/songstyle-principles.md`
- Create: `skills/songstyle-web-designer/references/review-model.md`
- Create: `skills/songstyle-design-reviewer/SKILL.md`
- Create: `skills/songstyle-design-reviewer/references/songstyle-principles.md`
- Create: `skills/songstyle-design-reviewer/references/review-model.md`
- Create: `docs/guides/skills.md`
- Modify: `docs/en/usage.md`
- Modify: `package.json`
- Modify: `website/src/components/SiteHeader.astro`
- Modify: `tests/content-assets.test.mjs`

- [ ] **Step 1: Add failing skill validation tests**

Extend tests to require:

- Skill folder name equals frontmatter `name`.
- `name` uses lowercase letters, numbers, and hyphens only.
- `description` is non-empty and no longer than 1024 characters.
- `license` is `MIT`.
- Each skill references `references/songstyle-principles.md` and
  `references/review-model.md`.
- The generated reference files contain all six principle IDs and all six
  review dimension IDs.

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm run content:check
```

Expected:

```text
FAIL because the skills and generated references do not exist.
```

- [ ] **Step 3: Implement generated portable references**

Create `scripts/build-skill-references.mjs`. It must:

- Read `docs/principles/principles.json`.
- Read `checklists/songstyle-review.json`.
- Render concise Markdown summaries.
- Write identical generated files into both skill `references/` directories.
- Add a generated-file comment telling contributors not to edit them manually.

Add scripts to `package.json`:

```json
{
  "scripts": {
    "skills:build": "node scripts/build-skill-references.mjs",
    "skills:check": "npm run skills:build && node scripts/validate-skills.mjs && git diff --exit-code -- skills/songstyle-web-designer/references skills/songstyle-design-reviewer/references"
  }
}
```

Update `build`, `check`, and `verify` so `skills:build` and `skills:check` run
before the site build.

Use these exact final script values:

```json
{
  "scripts": {
    "build": "npm run tokens:build && npm run skills:build && astro check && astro build",
    "check": "npm run tokens:check && npm run skills:check && npm run test:unit && astro check",
    "verify": "npm run check && npm run build && npm run links:check && npm run test:e2e"
  }
}
```

- [ ] **Step 4: Implement the skill validator**

Create `scripts/validate-skills.mjs` using the installed `yaml` package. It
must validate the Agent Skills specification requirements used by this
project:

- Required `SKILL.md`.
- YAML frontmatter.
- Required `name` and `description`.
- Name matches parent directory.
- Name is no longer than 64 characters and uses only lowercase letters,
  numbers, and hyphens.
- Description length.
- Referenced files exist.

It must print `Skills OK` on success and exit non-zero with specific messages
on failure.

- [ ] **Step 5: Write `songstyle-web-designer`**

Use frontmatter:

```yaml
---
name: songstyle-web-designer
description: Design or redesign websites and Web UI using SongStyle principles of order, restraint, functional negative space, warmth, and resonance. Use when creating a Web page, landing page, product interface, or design proposal that should feel refined without relying on ancient-style decoration.
license: MIT
metadata:
  author: RobbyShao-8ag
  version: "0.1.0"
---
```

The body must include:

- When to use and when not to use.
- Required inputs.
- The seven-step workflow from the specification.
- A requirement to preserve usability, accessibility, and business goals.
- A requirement to state assumptions.
- A requirement to explain removal decisions.
- An output format with page goal, hierarchy, removals, layout, visual
  direction, implementation constraints, and self-review.
- Links to both generated reference files.

- [ ] **Step 6: Write `songstyle-design-reviewer`**

Use frontmatter:

```yaml
---
name: songstyle-design-reviewer
description: Review websites, Web UI, screenshots, and written design proposals against SongStyle principles. Use when diagnosing overdesign, ineffective negative space, decorative cultural shortcuts, unclear hierarchy, or when prioritizing practical design improvements.
license: MIT
metadata:
  author: RobbyShao-8ag
  version: "0.1.0"
---
```

The body must include:

- Required inputs and assumptions.
- The seven-step review workflow from the specification.
- 0-4 scoring for each shared dimension.
- A rule that intentional density is allowed when the task requires it.
- An output format with summary, scorecard, prioritized issues, preserved
  strengths, and executable changes.
- Links to both generated reference files.

- [ ] **Step 7: Generate, validate, build, and commit**

Create `docs/guides/skills.md` at `/skills/`, explaining installation and
linking to both rendered skill routes. Update `SiteHeader.astro` to add the
skills index route.
Update `docs/en/usage.md` to link to the skills index.

Run:

```bash
npm run skills:build
npm run skills:check
npm run content:check
npm run build
npm run links:check
```

Expected:

```text
Skills OK.
Generated references contain all normative IDs.
Skill pages render in the website.
```

Commit:

```bash
git add skills scripts package.json package-lock.json docs/guides/skills.md docs/en/usage.md website/src/components/SiteHeader.astro tests/content-assets.test.mjs
git commit -m "feat: add portable SongStyle Agent Skills"
```

## Phase 2 Completion Gate

Run:

```bash
npm run verify
git status --short
```

Expected:

```text
All documentation, prompt, skill, and website checks pass.
The working tree is clean.
```

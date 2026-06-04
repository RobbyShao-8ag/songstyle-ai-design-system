# SongStyle v0.1 Phase 3: Examples, Quality, and Release Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prove SongStyle through two complete fictional-brand case studies, finish the public website experience, verify release quality, publish the repository, deploy GitHub Pages, and create v0.1.0.

**Architecture:** Case-study source content lives in `examples/`, while custom Astro components provide the visual demonstrations. The home page becomes the exhibition entry point and the documentation pages remain efficient. Automated and manual checks validate the final static output before publication.

**Tech Stack:** Astro, CSS Variables, Playwright, axe-core, GitHub Actions, GitHub Pages

---

## Task 1: Create the Lifestyle Brand Case Study

**Files:**
- Create: `examples/lifestyle-brand/baiting.md`
- Create: `website/src/components/examples/BaitingDefault.astro`
- Create: `website/src/components/examples/BaitingSongStyle.astro`
- Create: `website/src/pages/examples/lifestyle-brand.astro`
- Modify: `tests/content-assets.test.mjs`
- Modify: `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Add failing case-study tests**

Require:

```text
examples/lifestyle-brand/baiting.md
/examples/lifestyle-brand/
```

The Playwright test must assert the page contains:

```text
白汀 Baiting
普通 AI 默认方案
SongStyle 改写
审查结果
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm run content:check
npm run test:e2e -- --grep "lifestyle"
```

Expected:

```text
FAIL because the lifestyle case study does not exist.
```

- [ ] **Step 3: Write the case-study source**

Create `examples/lifestyle-brand/baiting.md` with:

```yaml
---
title: 白汀 Baiting：当代家居饮水器物品牌
description: 一个不依赖古风符号的生活方式品牌宋式 Web 设计实践。
lang: zh-CN
route: /examples/lifestyle-brand/
section: 案例
order: 1
---
```

The fictional brief:

```text
白汀 Baiting is a contemporary home hydration and tabletop objects brand.
The landing page must introduce the flagship carafe, communicate material
quality and daily use, provide a clear purchase path, and establish trust
without using ancient-style decoration.
```

The Markdown must include:

- Product brief and business goal.
- Ordinary AI default proposal.
- Default diagnosis.
- SongStyle removal, hierarchy, space, color, and copy decisions.
- Shared checklist scorecard.
- Implementation notes.

- [ ] **Step 4: Implement default and SongStyle visual examples**

`BaitingDefault.astro` must intentionally demonstrate:

- Too many badges and selling points.
- Competing calls to action.
- Strong gradient and decorative motifs.
- Dense cards without clear hierarchy.

It must remain accessible enough to compare safely.

`BaitingSongStyle.astro` must demonstrate:

- One clear product story.
- A restrained purchase path.
- Functional negative space around the flagship object.
- Warm material language.
- No ink-wash, seal, traditional pattern, or calligraphic shortcut.

- [ ] **Step 5: Build the custom case-study page**

Create `website/src/pages/examples/lifestyle-brand.astro` using the example
content and both visual components. Load the source with
`getEntry("examples", "lifestyle-brand/baiting")`, render its Markdown, and
include links to the relevant principles, Design Tokens, prompt, and checklist.

- [ ] **Step 6: Verify and commit**

Run:

```bash
npm run content:check
npm run build
npm run links:check
npm run test:e2e -- --grep "lifestyle"
```

Expected:

```text
The lifestyle case-study page builds and its test passes.
```

Commit:

```bash
git add examples/lifestyle-brand website/src/components/examples website/src/pages/examples/lifestyle-brand.astro tests
git commit -m "feat: add Baiting lifestyle case study"
```

## Task 2: Create the Modern Digital Product Case Study

**Files:**
- Create: `examples/digital-product/qingxu.md`
- Create: `website/src/components/examples/QingxuDefault.astro`
- Create: `website/src/components/examples/QingxuSongStyle.astro`
- Create: `website/src/pages/examples/digital-product.astro`
- Modify: `tests/content-assets.test.mjs`
- Modify: `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Add failing case-study tests**

Require:

```text
examples/digital-product/qingxu.md
/examples/digital-product/
```

The Playwright test must assert the page contains:

```text
清序 Qingxu
AI 研究工作台
普通 AI 默认方案
SongStyle 改写
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm run content:check
npm run test:e2e -- --grep "digital product"
```

Expected:

```text
FAIL because the digital-product case study does not exist.
```

- [ ] **Step 3: Write the case-study source**

Create `examples/digital-product/qingxu.md` with:

```yaml
---
title: 清序 Qingxu：AI 研究工作台
description: 一个证明宋式原则可以服务现代数字产品的 Web UI 设计实践。
lang: zh-CN
route: /examples/digital-product/
section: 案例
order: 2
---
```

The fictional brief:

```text
清序 Qingxu is an AI research workspace for teams. The product must help users
collect sources, synthesize findings, and share a clear research narrative.
The landing page must communicate capability without looking futuristic,
overloaded, or historical.
```

The Markdown must include the same seven case-study sections required by the
specification.

- [ ] **Step 4: Implement default and SongStyle visual examples**

`QingxuDefault.astro` must intentionally demonstrate:

- Excessive feature cards.
- Neon AI gradients.
- Unnecessary statistics and badges.
- Competing interface screenshots.

`QingxuSongStyle.astro` must demonstrate:

- A clear research narrative.
- Calm modern technology presentation.
- Useful density where product understanding requires it.
- Order and warmth without historical styling.

- [ ] **Step 5: Build the custom case-study page**

Create `website/src/pages/examples/digital-product.astro`. Load the source with
`getEntry("examples", "digital-product/qingxu")`, render its Markdown, and
present both visual components with links to the relevant resources.

- [ ] **Step 6: Build, verify, and commit**

Run:

```bash
npm run content:check
npm run build
npm run links:check
npm run test:e2e -- --grep "digital product"
```

Expected:

```text
The digital-product case-study page builds and its test passes.
```

Commit:

```bash
git add examples/digital-product website/src/components/examples website/src/pages/examples/digital-product.astro tests
git commit -m "feat: add Qingxu digital product case study"
```

## Task 3: Add the Before-and-After Comparison Page

**Files:**
- Create: `examples/comparisons/overview.md`
- Create: `docs/guides/examples.md`
- Create: `website/src/pages/examples/comparisons.astro`
- Modify: `website/src/components/SiteHeader.astro`
- Modify: `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Add a failing comparison-page test**

Require `/examples/comparisons/` and assert it contains the six review
dimension names.

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm run test:e2e -- --grep "comparisons"
```

Expected:

```text
FAIL because the comparison page does not exist.
```

- [ ] **Step 3: Write comparison content**

Create `examples/comparisons/overview.md` with:

```yaml
---
title: 从普通 AI 默认方案到 SongStyle
description: 两个案例如何通过删减、重组、留白与停止改善设计质量。
lang: zh-CN
route: /examples/comparisons/
section: 案例
order: 3
---
```

Explain improvements by review dimension, not only by visual preference.

- [ ] **Step 4: Build the comparison page**

Create `website/src/pages/examples/comparisons.astro` that presents:

- Baiting default and SongStyle examples.
- Qingxu default and SongStyle examples.
- A dimension-by-dimension explanation.
- Links to the comparison prompt and review checklist.

Load and render `getEntry("examples", "comparisons/overview")` as the
explanatory source.

- [ ] **Step 5: Add the example index and navigation entry**

Create `docs/guides/examples.md` at `/examples/`, explaining the two fictional
brand cases and the comparison page. Link to all three routes with relative
URLs. Update `SiteHeader.astro` to add the examples index route.

- [ ] **Step 6: Verify and commit**

Run:

```bash
npm run build
npm run links:check
npm run test:e2e -- --grep "comparisons"
```

Expected:

```text
The comparison page builds and its test passes.
```

Commit:

```bash
git add examples/comparisons docs/guides/examples.md website/src/pages/examples/comparisons.astro website/src/components/SiteHeader.astro tests/e2e/smoke.spec.ts
git commit -m "feat: add before and after comparisons"
```

## Task 4: Complete the Home Page Exhibition Experience

**Files:**
- Create: `website/src/components/home/ExcessProblem.astro`
- Create: `website/src/components/home/PrincipleSequence.astro`
- Create: `website/src/components/home/ComparisonPreview.astro`
- Create: `website/src/components/home/CaseStudyPreview.astro`
- Create: `website/src/components/home/ResourceEntry.astro`
- Modify: `website/src/pages/index.astro`
- Modify: `website/src/styles/global.css`
- Modify: `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Add failing home-content tests**

Require the home page to contain:

```text
为什么 AI 设计容易过度
六条核心原则
普通 AI 与 SongStyle
生活方式品牌
现代数字产品
Prompts
Agent Skills
设计变量
审查清单
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm run test:e2e -- --grep "home page"
```

Expected:

```text
FAIL because the minimal home page does not contain the complete sequence.
```

- [ ] **Step 3: Implement the home sections**

Create the five focused home components. The final sequence must be:

```text
Hero thesis
Why AI design becomes excessive
What "already enough" means
Six principles
Before-and-after preview
Two case-study previews
Resource entry points
Contribution invitation
```

Keep each section focused on one idea. Do not add a carousel, particle effect,
video background, or animated decorative canvas.

- [ ] **Step 4: Add restrained motion**

Use CSS-only reveal and hover transitions with the motion Design Tokens.
Every motion effect must:

- Remain subtle.
- Preserve content visibility without JavaScript.
- Disable effectively under `prefers-reduced-motion: reduce`.

- [ ] **Step 5: Verify and commit**

Run:

```bash
npm run build
npm run links:check
npm run test:e2e -- --grep "home page"
```

Expected:

```text
The home sequence is complete and tests pass.
```

Commit:

```bash
git add website/src/components/home website/src/pages/index.astro website/src/styles/global.css tests/e2e/smoke.spec.ts
git commit -m "feat: complete SongStyle exhibition home page"
```

## Task 5: Strengthen Release Verification

**Files:**
- Create: `tests/e2e/public-pages.spec.ts`
- Create: `tests/e2e/accessibility.spec.ts`
- Create: `tests/e2e/reduced-motion.spec.ts`
- Modify: `scripts/check-internal-links.mjs`
- Modify: `tests/content-assets.test.mjs`

- [ ] **Step 1: Add the final required public route list**

In `tests/e2e/public-pages.spec.ts`, define:

```ts
const BASE_PATH = "/songstyle-ai-design-system";
const withBase = (route: string) => `${BASE_PATH}${route}`;

const PUBLIC_ROUTES = [
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
  "/contributing/",
  "/en/manifesto/",
  "/en/core-principles/",
  "/en/usage/"
];
```

Test that each route returns visible main content, one level-one heading, and
no horizontal page overflow at desktop and mobile sizes. Navigate with
`page.goto(withBase(route))`.

- [ ] **Step 2: Add accessibility coverage**

In `tests/e2e/accessibility.spec.ts`, run axe WCAG A/AA checks against:

```text
/
/manifesto/
/principles/
/reference-ui/
/examples/lifestyle-brand/
/examples/digital-product/
/examples/comparisons/
```

Navigate through the same `withBase()` helper used by the public-page tests.
Do not suppress violations without an explanatory code comment and a linked
issue.

- [ ] **Step 3: Add reduced-motion coverage**

In `tests/e2e/reduced-motion.spec.ts`:

- Emulate `reducedMotion: "reduce"`.
- Open the home page through `withBase("/")`.
- Assert the computed transition duration of a reveal element is effectively
  zero.
- Assert all content remains visible.

- [ ] **Step 4: Expand static content coverage**

Update `tests/content-assets.test.mjs` to assert:

- Four prompt files.
- Two skills and their references.
- Two case-study source files.
- Comparison source.
- Required English files.
- Required generated Design Token outputs.

- [ ] **Step 5: Run full automated verification**

Run:

```bash
npm run verify
```

Expected:

```text
All unit, content, build, link, Playwright, and axe checks pass.
```

- [ ] **Step 6: Commit**

```bash
git add tests scripts/check-internal-links.mjs
git commit -m "test: strengthen v0.1 release verification"
```

## Task 6: Evaluate Prompts, Skills, and the Website

**Files:**
- Create: `evals/results/lifestyle-landing.md`
- Create: `evals/results/digital-product-landing.md`
- Create: `evals/results/necessary-density.md`
- Create: `evals/results/overdecorated-existing-page.md`
- Create: `evals/results/website-review.md`
- Create: `docs/guides/evaluations.md`
- Modify: `tests/content-assets.test.mjs`
- Modify: `tests/e2e/public-pages.spec.ts`

- [ ] **Step 1: Add failing evaluation coverage tests**

Require all five result files and assert each result contains:

```text
Brief
Asset under test
Required preservation
Risk detection
Shared checklist
Verdict
```

Require `docs/guides/evaluations.md` at `/evaluations/`.
Add `/evaluations/` to the public route list.

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm run content:check
```

Expected:

```text
FAIL because evaluation result files do not exist.
```

- [ ] **Step 3: Evaluate the four fixed briefs**

Use `evals/briefs.json` as the input source.

For each brief:

- Run the most relevant structured prompt.
- Run the most relevant Agent Skill.
- Record the important output decisions, not hidden reasoning.
- Check every `mustPreserve` item.
- Check every `risksToDetect` item.
- Score all six shared review dimensions.
- Mark the result `PASS` only when required information is preserved, risks
  are detected or avoided, and recommendations are actionable.

Use:

```text
lifestyle-landing -> from-brief prompt + songstyle-web-designer
digital-product-landing -> from-brief prompt + songstyle-web-designer
necessary-density -> review-page prompt + songstyle-design-reviewer
overdecorated-existing-page -> review-page prompt + songstyle-design-reviewer
```

If an evaluation fails, improve the prompt or skill, regenerate its portable
references when needed, and repeat the evaluation before continuing.

- [ ] **Step 4: Record the website self-review**

Create `evals/results/website-review.md` using the shared checklist. Record:

- The website goal.
- Scores for all six dimensions.
- Evidence from the home page, documentation pages, and case studies.
- Any remaining limitations.
- A `PASS` verdict only if no dimension scores below 3.

- [ ] **Step 5: Publish evaluation methodology in the documentation**

Create `docs/guides/evaluations.md` with `pageSchema` frontmatter and route
`/evaluations/`. Explain:

- Why fixed briefs exist.
- What is and is not measured.
- How to interpret the saved results.
- Why results are evidence rather than a claim of universal aesthetic truth.
- How contributors should add new evaluation briefs.

- [ ] **Step 6: Verify and commit**

Run:

```bash
npm run content:check
npm run build
npm run links:check
npm run test:e2e
```

Expected:

```text
All evaluation files exist.
The evaluation documentation page builds.
Every saved evaluation verdict is PASS.
The public route test includes /evaluations/.
```

Commit:

```bash
git add evals/results docs/guides/evaluations.md tests/content-assets.test.mjs prompts skills
git commit -m "test: evaluate SongStyle prompts and skills"
```

## Task 7: Perform Final Manual SongStyle and Visual QA

**Files:**
- Modify only files required to fix observed issues.
- Modify: `evals/results/website-review.md`

- [ ] **Step 1: Start the local site**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

- [ ] **Step 2: Review desktop and mobile in the Codex in-app browser**

Inspect:

```text
http://127.0.0.1:4321/songstyle-ai-design-system/
http://127.0.0.1:4321/songstyle-ai-design-system/principles/
http://127.0.0.1:4321/songstyle-ai-design-system/examples/lifestyle-brand/
http://127.0.0.1:4321/songstyle-ai-design-system/examples/digital-product/
http://127.0.0.1:4321/songstyle-ai-design-system/examples/comparisons/
```

Review at desktop and mobile widths.

- [ ] **Step 3: Complete the shared SongStyle checklist**

For the website and both final case-study examples, record a score from 0 to 4
for:

```text
Information necessity
Hierarchy clarity
Functional negative space
Appropriate stopping
Order rather than symbols
Usability, accessibility, and goals
```

No final example may score below 3 in any dimension. Fix the design or explain
why the dimension does not apply.
Update `evals/results/website-review.md` after any visual changes so its
evidence remains accurate.

- [ ] **Step 4: Review against the project thesis**

Confirm:

- The site is clearly not an ancient-style asset library.
- The home page communicates before it asks the viewer to explore.
- Empty space has a function on mobile as well as desktop.
- The digital-product example feels modern rather than historical.
- The lifestyle example does not depend on decorative cultural symbols.
- The reference UI remains small and does not imply production guarantees.

- [ ] **Step 5: Re-run verification after fixes**

Run:

```bash
npm run verify
git diff --check
```

Expected:

```text
All checks pass after visual QA fixes.
```

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "fix: refine SongStyle v0.1 visual quality"
```

Skip the commit only if visual QA required no changes.

## Task 8: Add Continuous Integration and GitHub Pages Deployment

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `.github/workflows/deploy.yml`
- Modify: `tests/content-assets.test.mjs`

- [ ] **Step 1: Create CI workflow**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run verify
```

- [ ] **Step 2: Create GitHub Pages deployment workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: withastro/action@v6
        with:
          node-version: 24

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Verify workflows are covered and commit**

Update `tests/content-assets.test.mjs` to require both workflow files.

Run:

```bash
npm run content:check
git diff --check
```

Expected:

```text
Workflow files exist and content coverage tests pass.
```

Commit:

```bash
git add .github tests/content-assets.test.mjs
git commit -m "ci: add verification and GitHub Pages deployment"
```

## Task 9: Publish the GitHub Repository and Release v0.1.0

**Files:**
- Create: `CHANGELOG.md`
- Modify: `README.md`

- [ ] **Step 1: Confirm GitHub authentication**

Use the GitHub connector account list or:

```bash
gh auth status
```

Expected:

```text
The authenticated account is RobbyShao-8ag.
```

If neither the GitHub connector nor `gh` is authenticated, stop this task and
ask the user to authorize the GitHub connector or install and authenticate
`gh`. Do not publish under another account.

- [ ] **Step 2: Run final local verification**

Run:

```bash
npm run verify
git status --short
```

Expected:

```text
All checks pass.
The working tree is clean.
```

- [ ] **Step 3: Create release notes**

Create `CHANGELOG.md` with:

```markdown
# Changelog

## v0.1.0

### Added
- SongStyle manifesto, principles, foundations, and cultural references.
- DTCG Design Tokens and generated CSS Variables.
- Four structured prompts and two portable Agent Skills.
- Shared SongStyle review checklist and fixed evaluation briefs.
- Astro documentation website and non-production reference UI.
- Baiting lifestyle-brand and Qingxu digital-product case studies.
- Automated build, link, accessibility, and release verification.
```

Update `README.md` with the final GitHub Pages URL:

```text
https://robbyshao-8ag.github.io/songstyle-ai-design-system/
```

- [ ] **Step 4: Commit release notes**

```bash
git add CHANGELOG.md README.md
git commit -m "docs: prepare v0.1.0 release"
```

- [ ] **Step 5: Create and push the repository**

Preferred path: use the authorized GitHub connector to create the public
repository `RobbyShao-8ag/songstyle-ai-design-system`, then push `main`.

CLI fallback:

```bash
gh repo create RobbyShao-8ag/songstyle-ai-design-system --public --source=. --remote=origin --push
```

Expected:

```text
The public repository exists under RobbyShao-8ag.
The main branch is pushed.
```

- [ ] **Step 6: Enable GitHub Pages**

In repository settings, set Pages source to GitHub Actions if it is not already
selected. Wait for the deploy workflow to complete.

Expected site:

```text
https://robbyshao-8ag.github.io/songstyle-ai-design-system/
```

- [ ] **Step 7: Verify the deployed site**

Open the deployed site and verify:

- Home page loads.
- Manifesto, principles, prompts, skills, and case-study routes load.
- CSS and assets load under the repository base path.
- Sitemap files exist.

- [ ] **Step 8: Tag and create the release**

CLI fallback:

```bash
git tag -a v0.1.0 -m "SongStyle AI Design System v0.1.0"
git push origin v0.1.0
gh release create v0.1.0 --title "SongStyle AI Design System v0.1.0" --notes-file CHANGELOG.md
```

Expected:

```text
The v0.1.0 tag and GitHub release exist.
```

## Phase 3 Completion Gate

Run:

```bash
npm run verify
git status --short
git log --oneline --decorate -5
```

Verify:

```text
The working tree is clean.
The GitHub repository is public under RobbyShao-8ag.
GitHub Pages is live.
The v0.1.0 release exists.
The release satisfies every completion condition in the approved specification.
```

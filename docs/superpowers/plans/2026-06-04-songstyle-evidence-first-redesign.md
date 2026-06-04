# SongStyle Evidence-First Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make SongStyle immediately understandable through fair visual evidence, rebuild both fictional-brand comparisons from shared content and images, and add the open-source structures needed for community validation.

**Architecture:** Shared TypeScript case data becomes the source of truth for both visual treatments and case pages. Static generated photography is stored under the website public assets directory and reused by ordinary AI and SongStyle variants. The homepage and README mirror one evidence-first narrative, while Roadmap, GitHub issue forms, and a user-testing plan create a structured feedback loop.

**Tech Stack:** Astro 6, TypeScript, CSS, Markdown, static raster assets, Node test runner, Playwright, axe-core, GitHub issue forms, GitHub Pages

---

## Approved Source

- Design specification: `docs/superpowers/specs/2026-06-04-songstyle-evidence-first-redesign.md`
- Target repository: `RobbyShao-8ag/songstyle-ai-design-system`
- Target branch: `main`

## File Map

### Create

- `ROADMAP.md`: public project direction and scope boundaries.
- `.github/ISSUE_TEMPLATE/bug-report.yml`: reproducible defect reports.
- `.github/ISSUE_TEMPLATE/usage-feedback.yml`: structured SongStyle usage feedback.
- `.github/ISSUE_TEMPLATE/case-study-proposal.yml`: community case submissions.
- `.github/ISSUE_TEMPLATE/design-discussion.yml`: evidence-based design discussions.
- `.github/ISSUE_TEMPLATE/config.yml`: issue form configuration.
- `docs/research/first-round-user-testing.md`: first validation study protocol.
- `docs/references/image-generation-prompts.md`: documented case image prompts.
- `website/src/data/cases.ts`: shared Baiting and Qingxu content contract.
- `website/public/assets/cases/baiting-carafe.webp`: generated Baiting editorial product image.
- `website/public/assets/cases/qingxu-research.webp`: generated Qingxu editorial research image.
- `website/src/components/home/EvidenceComparison.astro`: homepage fair-comparison proof.
- `website/src/components/home/MethodSequence.astro`: code-native four-step method.

### Modify

- `README.md`: evidence-first project introduction and direct action links.
- `docs/guides/contributing.md`: link to Roadmap, feedback forms, and user testing.
- `examples/lifestyle-brand/baiting.md`: document fixed shared content and fair comparison.
- `examples/digital-product/qingxu.md`: document fixed shared content and fair comparison.
- `examples/comparisons/overview.md`: explain content invariants and design-only changes.
- `website/src/components/examples/BaitingDefault.astro`: render shared content and image with plausible over-design.
- `website/src/components/examples/BaitingSongStyle.astro`: render the same content and image with SongStyle judgment.
- `website/src/components/examples/QingxuDefault.astro`: render shared content and image with plausible over-design.
- `website/src/components/examples/QingxuSongStyle.astro`: render the same content and image with SongStyle judgment.
- `website/src/components/home/CaseStudyPreview.astro`: add visual case thumbnails.
- `website/src/pages/index.astro`: place evidence before explanation.
- `website/src/pages/examples/lifestyle-brand.astro`: pass shared data to both variants.
- `website/src/pages/examples/digital-product.astro`: pass shared data to both variants.
- `website/src/styles/global.css`: support evidence-first home sections.
- `tests/content-assets.test.mjs`: verify collaboration assets, images, prompts, and shared content.
- `tests/e2e/smoke.spec.ts`: verify homepage evidence and repeated case content.

## Task 1: Lock The Fair Comparison Contract

- [ ] **Step 1: Write failing content tests**

Add assertions to `tests/content-assets.test.mjs` that require:

```js
const collaborationFiles = [
  "ROADMAP.md",
  "docs/research/first-round-user-testing.md",
  "docs/references/image-generation-prompts.md",
  ".github/ISSUE_TEMPLATE/bug-report.yml",
  ".github/ISSUE_TEMPLATE/usage-feedback.yml",
  ".github/ISSUE_TEMPLATE/case-study-proposal.yml",
  ".github/ISSUE_TEMPLATE/design-discussion.yml",
  ".github/ISSUE_TEMPLATE/config.yml"
];
```

Require `website/src/data/cases.ts`, both case images, and the fairness terms
`same copy`, `same image`, `same features`, and `same goal` in the README.

- [ ] **Step 2: Run the focused test and verify failure**

Run:

```bash
node --test tests/content-assets.test.mjs
```

Expected: FAIL because the collaboration files, shared data, and image assets
do not exist.

- [ ] **Step 3: Create shared case data**

Create `website/src/data/cases.ts` with typed `baitingCase` and `qingxuCase`
objects containing brand, position, headline, description, action, image path,
image alt text, and three features. Both visual components must consume these
objects rather than defining their own copy.

- [ ] **Step 4: Update case Markdown sources**

Update both case source files and the comparison overview to state the fixed
content contract and distinguish invariant content from allowed design changes.

- [ ] **Step 5: Run the focused test**

Run:

```bash
node --test tests/content-assets.test.mjs
```

Expected: the new file-existence assertions still fail only for assets and
collaboration files; shared-data assertions pass.

- [ ] **Step 6: Commit**

```bash
git add website/src/data/cases.ts examples tests/content-assets.test.mjs
git commit -m "feat: define fair case comparison contract"
```

## Task 2: Generate And Document Case Imagery

- [ ] **Step 1: Generate the Baiting image**

Use the built-in image generation tool with this production prompt:

```text
Use case: product-mockup
Asset type: shared case-study editorial photograph for a website comparison
Primary request: a contemporary transparent glass water carafe on a quiet home dining table
Scene/backdrop: modern neutral interior, soft plaster wall, pale natural wood table, uncluttered
Subject: one elegant 1.2 liter borosilicate glass carafe with believable proportions and a wide opening
Style/medium: realistic editorial product photography
Composition/framing: landscape composition with the carafe clearly visible and generous crop flexibility around it
Lighting/mood: soft natural side light, calm, credible, warm but restrained
Color palette: porcelain white, mist gray, pale wood, subtle celadon hint
Constraints: no text, no logo, no traditional motifs, no decorative props that compete with the product, no watermark
Avoid: luxury advertising gloss, dramatic shadows, historical styling, flowers, calligraphy, ink wash
```

Save the selected final asset as
`website/public/assets/cases/baiting-carafe.webp`.

- [ ] **Step 2: Generate the Qingxu image**

Use the built-in image generation tool with this production prompt:

```text
Use case: photorealistic-natural
Asset type: shared case-study editorial photograph for a website comparison
Primary request: a modern researcher organizing trustworthy sources at a desk for an AI research workflow
Scene/backdrop: contemporary quiet studio workspace with a laptop or monitor, printed sources, and notes
Subject: one researcher or a small collaborative moment, focused on reviewing and arranging information
Style/medium: realistic editorial workplace photography
Composition/framing: landscape composition with clear workspace context and flexible crop space
Lighting/mood: soft natural daylight, calm, credible, thoughtful
Color palette: ink tones, mist gray, warm paper, restrained celadon hint
Constraints: no readable screen text, no logos, no watermark, no traditional motifs
Avoid: neon, holograms, futuristic AI imagery, exaggerated dashboards, cyberpunk styling
```

Save the selected final asset as
`website/public/assets/cases/qingxu-research.webp`.

- [ ] **Step 3: Document prompts**

Create `docs/references/image-generation-prompts.md` with the final prompts,
asset paths, purpose, and the rule that both treatments reuse the same image.

- [ ] **Step 4: Validate assets**

Run:

```bash
file website/public/assets/cases/*.webp
node --test tests/content-assets.test.mjs
```

Expected: both files are valid WebP images; image and prompt assertions pass.

- [ ] **Step 5: Commit**

```bash
git add website/public/assets/cases docs/references/image-generation-prompts.md tests/content-assets.test.mjs
git commit -m "feat: add shared case-study imagery"
```

## Task 3: Rebuild Both Case Comparisons

- [ ] **Step 1: Write failing Playwright assertions**

Update `tests/e2e/smoke.spec.ts` so each case page requires the same headline,
description, action, image path, and feature labels to appear in both the
ordinary AI and SongStyle sections.

- [ ] **Step 2: Run the focused tests and verify failure**

Run:

```bash
npx playwright test tests/e2e/smoke.spec.ts --grep "case study"
```

Expected: FAIL because the current components use different content and do not
share the generated image.

- [ ] **Step 3: Rebuild Baiting components**

Update `BaitingDefault.astro` and `BaitingSongStyle.astro` to accept the same
case object. Keep every content field and image identical. Make the default
version plausible but over-emphasized through gradients, overlay badges,
competing cards, and compressed spacing. Make the SongStyle version use
editorial typography, natural image treatment, clear hierarchy, and
functional negative space.

- [ ] **Step 4: Rebuild Qingxu components**

Update `QingxuDefault.astro` and `QingxuSongStyle.astro` with the same shared
data. The default version may use dense dashboard framing, excessive accents,
and equal-weight features. The SongStyle version must preserve all information
while clarifying the research narrative and using the image quietly.

- [ ] **Step 5: Pass shared data from case pages**

Import `baitingCase` and `qingxuCase` in their Astro pages and pass the objects
to both visual components.

- [ ] **Step 6: Run focused verification**

Run:

```bash
npx playwright test tests/e2e/smoke.spec.ts --grep "case study"
npx playwright test tests/e2e/accessibility.spec.ts --grep "examples"
```

Expected: all focused smoke and accessibility tests pass.

- [ ] **Step 7: Commit**

```bash
git add website/src/components/examples website/src/pages/examples tests/e2e/smoke.spec.ts
git commit -m "feat: rebuild fair SongStyle case comparisons"
```

## Task 4: Make Homepage And README Evidence-First

- [ ] **Step 1: Write failing homepage assertions**

Update `tests/e2e/smoke.spec.ts` to require:

- The thesis `同样的内容，SongStyle 让设计从“不断添加”转向“准确表达”`
- A visible fair-comparison statement
- Four method steps
- Direct links to both cases, Roadmap, and user testing

- [ ] **Step 2: Run the homepage test and verify failure**

Run:

```bash
npx playwright test tests/e2e/smoke.spec.ts --grep "home page"
```

Expected: FAIL because the evidence-first sections do not exist.

- [ ] **Step 3: Build homepage evidence components**

Create `EvidenceComparison.astro` using the shared Baiting data and existing
case visual components in a compact side-by-side proof. Create
`MethodSequence.astro` as accessible HTML/CSS for:

1. 必要信息
2. 建立秩序
3. 功能性留白
4. 适度停止

- [ ] **Step 4: Reorder and rewrite the homepage**

Update `index.astro`, `HeroStatement.astro`, `CaseStudyPreview.astro`, and
`global.css` so evidence appears directly after the thesis, followed by the
method, visual case entries, executable resources, and participation paths.

- [ ] **Step 5: Rewrite README**

Make the README mirror the same narrative. Include the generated case images,
the fairness contract, direct usage links, Roadmap, and user-testing entry.
Update project status from development toward `v0.1.0` to released v0.1 and
active v0.2 validation.

- [ ] **Step 6: Run focused verification**

Run:

```bash
node --test tests/content-assets.test.mjs
npx playwright test tests/e2e/smoke.spec.ts --grep "home page"
```

Expected: all focused tests pass.

- [ ] **Step 7: Commit**

```bash
git add README.md website/src/components website/src/pages/index.astro website/src/styles/global.css tests
git commit -m "feat: make SongStyle entry experience evidence-first"
```

## Task 5: Add Roadmap And Community Validation Workflow

- [ ] **Step 1: Create Roadmap**

Create `ROADMAP.md` with shipped v0.1 foundations, immediate validation work,
v0.2 operational goals, and deferred possibilities.

- [ ] **Step 2: Create issue forms**

Create the four YAML issue forms and configuration. Each form must request
context, evidence, expected outcome, and relevant SongStyle review dimensions.

- [ ] **Step 3: Create first-round user testing plan**

Create `docs/research/first-round-user-testing.md` with participant mix,
briefs, default-versus-SongStyle protocol, measures, interview questions,
artifact handling, analysis, and no-premature-claims language.

- [ ] **Step 4: Link participation paths**

Update `docs/guides/contributing.md` and homepage participation links to expose
Roadmap, testing plan, and GitHub feedback paths.

- [ ] **Step 5: Run focused tests**

Run:

```bash
node --test tests/content-assets.test.mjs
```

Expected: collaboration asset and required-content assertions pass.

- [ ] **Step 6: Commit**

```bash
git add ROADMAP.md .github/ISSUE_TEMPLATE docs/research docs/guides/contributing.md tests website
git commit -m "docs: add community validation workflow"
```

## Task 6: Final Verification And Publication

- [ ] **Step 1: Run static and full verification**

Run:

```bash
git diff --check
npm run verify
```

Expected: zero whitespace errors; unit, Astro, build, internal-link, desktop,
mobile, accessibility, and smoke tests pass.

- [ ] **Step 2: Perform manual visual QA**

Start the Astro dev server and inspect:

- `/`
- `/examples/lifestyle-brand/`
- `/examples/digital-product/`
- `/examples/comparisons/`

Confirm the default versions remain credible, the content and images are
visibly identical across treatments, and the SongStyle improvements come from
design judgment.

- [ ] **Step 3: Commit any QA fixes and rerun verification**

If QA requires edits, commit them only after `npm run verify` passes again.

- [ ] **Step 4: Push main**

```bash
git push origin main
```

- [ ] **Step 5: Verify GitHub publication**

Confirm:

- GitHub Actions CI succeeds
- GitHub Pages deployment succeeds
- Public homepage and both case pages return HTTP 200
- Public README, Roadmap, issue forms, and user testing plan are present

- [ ] **Step 6: Audit against the Spec**

Review every requirement in
`docs/superpowers/specs/2026-06-04-songstyle-evidence-first-redesign.md`.
Do not mark completion until every requirement has direct evidence.

# First-Screen Evidence Visibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the mobile comparison evidence visible within the initial `1280 x 720` desktop viewport on the home page and both case-study pages.

**Architecture:** Preserve the existing page and component structure. Add viewport-position regression tests, introduce a compact-summary variant on `MobileSiteComparison`, and apply desktop-only spacing overrides to the hero, showcase heading, and case introductions.

**Tech Stack:** Astro 6, CSS, TypeScript, Playwright

---

## File Map

- `tests/e2e/smoke.spec.ts`: owns desktop first-screen visibility regression coverage.
- `website/src/components/HeroStatement.astro`: owns home hero vertical rhythm.
- `website/src/components/home/MobileShowcasePreview.astro`: owns the spacing before the home phone pair.
- `website/src/components/examples/MobileSiteComparison.astro`: owns full and compact comparison summaries.
- `website/src/pages/examples/lifestyle-brand.astro`: configures the Baiting case page and desktop intro rhythm.
- `website/src/pages/examples/digital-product.astro`: configures the Qingxu case page and desktop intro rhythm.

### Task 1: Lock Desktop Evidence Visibility

**Files:**
- Modify: `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Add the failing viewport-position test**

Add a helper and one regression test:

```ts
async function expectTopInsideViewport(locator: Locator, viewportHeight: number) {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeLessThan(viewportHeight);
}

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
```

Import `Locator` as a type from `@playwright/test`.

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
npx playwright test tests/e2e/smoke.spec.ts --grep "desktop first screen"
```

Expected: FAIL because at least the home-page and case-page phone frames begin below `y = 720`.

- [ ] **Step 3: Commit the regression test**

```bash
git add tests/e2e/smoke.spec.ts
git commit -m "test: require first-screen comparison evidence"
```

### Task 2: Tighten Desktop Vertical Rhythm

**Files:**
- Modify: `website/src/components/HeroStatement.astro`
- Modify: `website/src/components/home/MobileShowcasePreview.astro`
- Modify: `website/src/components/examples/MobileSiteComparison.astro`
- Modify: `website/src/pages/examples/lifestyle-brand.astro`
- Modify: `website/src/pages/examples/digital-product.astro`

- [ ] **Step 1: Add compact-summary support**

Extend the props in `MobileSiteComparison.astro`:

```ts
interface Props {
  data: CaseStudy;
  compact?: boolean;
  compactSummary?: boolean;
}

const { data, compact = false, compactSummary = false } = Astro.props;
```

Add `compact-summary` to the section class list. Replace the summary markup with:

```astro
{!compact && (
  <div class:list={["comparison-summary", { "is-compact": compactSummary }]}>
    {compactSummary ? (
      <h2 class="visually-hidden">同一份 Brief，两种移动网站</h2>
    ) : (
      <>
        <p class="eyebrow">公平移动网站对比</p>
        <h2>同一份 Brief，两种移动网站</h2>
      </>
    )}
    <p>{data.businessGoal}</p>
    <ul aria-label="公平对比不变量">
      {comparisonInvariants.map((item) => <li>{item}</li>)}
    </ul>
  </div>
)}
```

Add desktop compact-summary CSS:

```css
@media (min-width: 900px) {
  .mobile-comparison.compact-summary {
    gap: var(--song-space-scale-5);
    padding-top: var(--song-space-scale-6);
  }

  .comparison-summary.is-compact p:not(.eyebrow) {
    margin-top: 0;
  }

  .comparison-summary.is-compact ul {
    margin-top: var(--song-space-scale-3);
  }
}
```

- [ ] **Step 2: Enable compact summaries on both case pages**

Use:

```astro
<MobileSiteComparison data={baitingCase} compactSummary>
```

and:

```astro
<MobileSiteComparison data={qingxuCase} compactSummary>
```

Do not use this mode on the comparison overview page.

- [ ] **Step 3: Tighten desktop home-page spacing**

In `HeroStatement.astro`, keep current mobile styles and add:

```css
@media (min-width: 900px) {
  .hero {
    min-height: min(60vh, 580px);
    padding-block: var(--song-space-scale-10);
  }

  .hero-statement {
    margin-block: var(--song-space-scale-6) var(--song-space-scale-4);
  }

  .body-copy {
    margin-bottom: var(--song-space-scale-6);
  }
}
```

In `MobileShowcasePreview.astro`, extend the desktop media query with:

```css
.showcase-heading {
  gap: var(--song-space-scale-4) var(--song-space-scale-8);
  margin-bottom: var(--song-space-scale-5);
}

.showcase-heading p:not(.eyebrow) {
  font-size: var(--song-typography-size-body);
}
```

- [ ] **Step 4: Tighten desktop case-page spacing**

On both case pages, add matching desktop overrides:

```css
@media (min-width: 900px) {
  .case-study {
    padding-top: var(--song-space-scale-10);
  }

  .case-study .case-intro {
    margin-bottom: var(--song-space-scale-8);
  }

  .case-study .case-intro h1 {
    font-size: clamp(var(--song-typography-size-title), 5vw, 4.5rem);
  }
}
```

Keep all existing mobile rules unchanged.

- [ ] **Step 5: Run the focused test and verify GREEN**

Run:

```bash
npx playwright test tests/e2e/smoke.spec.ts --grep "desktop first screen|home page presents|case study presents"
```

Expected: PASS on Chromium and mobile Chromium. The desktop viewport-position
test passes, and existing content assertions remain green.

- [ ] **Step 6: Run Astro diagnostics**

Run:

```bash
npx astro check
```

Expected: `0 errors`, `0 warnings`, `0 hints`.

- [ ] **Step 7: Commit the layout change**

```bash
git add website/src/components/HeroStatement.astro website/src/components/home/MobileShowcasePreview.astro website/src/components/examples/MobileSiteComparison.astro website/src/pages/examples/lifestyle-brand.astro website/src/pages/examples/digital-product.astro
git commit -m "feat: reveal comparison evidence in first screen"
```

### Task 3: Verify and Inspect the Result

**Files:**
- Modify only if QA reveals a regression in the files from Task 2.

- [ ] **Step 1: Run full verification**

```bash
npm run verify
```

Expected: unit/content tests, Astro diagnostics, static build, internal links,
accessibility checks, and all Playwright tests pass.

- [ ] **Step 2: Inspect the target viewport locally**

Start:

```bash
npm run dev -- --host 127.0.0.1
```

Inspect at `1280 x 720`:

- `/songstyle-ai-design-system/`
- `/songstyle-ai-design-system/examples/lifestyle-brand/`
- `/songstyle-ai-design-system/examples/digital-product/`

Confirm that the phone frame top is visible without scrolling, the page still
has deliberate breathing room, and no text or controls overlap.

- [ ] **Step 3: Stop the local server and check repository state**

```bash
git diff --check
git status --short
```

Expected: no whitespace errors and a clean working tree. If QA required a
small correction, commit it as:

```bash
git add website/src/components/HeroStatement.astro website/src/components/home/MobileShowcasePreview.astro website/src/components/examples/MobileSiteComparison.astro website/src/pages/examples/lifestyle-brand.astro website/src/pages/examples/digital-product.astro
git commit -m "fix: polish first-screen evidence spacing"
```

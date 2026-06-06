# Chinese Heading Readability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix broken Chinese display-heading line breaks in the SongStyle mobile examples and make heading readability a generated design-system rule.

**Architecture:** Add browser geometry tests for rendered Chinese heading lines, then adjust only the two SongStyle mobile treatments. Source the system rule from public docs, prompt templates, `docs/principles/principles.json`, and `checklists/songstyle-review.json`, then rebuild generated Skill references.

**Tech Stack:** Astro 6, CSS, Playwright, Node test runner, generated Markdown references.

---

## File Map

- `tests/e2e/smoke.spec.ts`: adds rendered-line readability regression coverage.
- `tests/content-assets.test.mjs`: asserts the new typography rule exists in docs, prompts, checklist, and generated references.
- `website/src/components/examples/BaitingSongStyleMobile.astro`: fixes Baiting SongStyle heading width, size, and layout.
- `website/src/components/examples/QingxuSongStyleMobile.astro`: fixes Qingxu SongStyle heading width, size, and layout.
- `docs/foundations/typography.md`: public typography rule.
- `docs/references/song-aesthetics-digital-design-research.md`: research-to-practice rule.
- `checklists/songstyle-review.md`: human review checklist.
- `checklists/songstyle-review.json`: generated review model source.
- `docs/principles/principles.json`: generated principles source.
- `prompts/web-design/from-brief.md`: design prompt constraint.
- `prompts/web-design/rewrite-existing-page.md`: rewrite prompt constraint.
- `prompts/design-review/review-page.md`: review prompt check.
- `prompts/design-review/compare-default-and-songstyle.md`: comparison prompt check.
- `skills/songstyle-web-designer/references/*`: regenerated output.
- `skills/songstyle-design-reviewer/references/*`: regenerated output.

### Task 1: Add Failing Heading Readability Tests

**Files:**
- Modify: `tests/e2e/smoke.spec.ts`
- Modify: `tests/content-assets.test.mjs`

- [ ] **Step 1: Add a Playwright rendered-line helper**

Add this helper to `tests/e2e/smoke.spec.ts`:

```ts
async function expectChineseHeadingLinesAreReadable(locator: Locator) {
  const result = await locator.evaluate((element) => {
    const text = element.textContent?.trim() ?? "";
    const range = document.createRange();
    const lines = Array.from(text).map((character, index) => {
      range.setStart(element.firstChild ?? element, index);
      range.setEnd(element.firstChild ?? element, index + 1);
      const rect = range.getBoundingClientRect();
      return { character, top: Math.round(rect.top), left: rect.left };
    });
    range.detach();

    const grouped = [...new Set(lines.map((line) => line.top))]
      .map((top) => lines.filter((line) => line.top === top).map((line) => line.character).join(""))
      .filter(Boolean);

    return {
      lineCount: grouped.length,
      lines: grouped,
      lastLine: grouped.at(-1) ?? "",
      width: element.getBoundingClientRect().width
    };
  });

  expect(result.width).toBeGreaterThanOrEqual(300);
  expect(result.lineCount).toBeGreaterThanOrEqual(2);
  expect(result.lineCount).toBeLessThanOrEqual(3);
  expect(result.lastLine.replace(/[。！？,.，、\s]/g, "").length).toBeGreaterThan(1);
  for (const line of result.lines) {
    expect(line).not.toMatch(/叙$/);
    expect(line).not.toMatch(/^事/);
    expect(line).not.toMatch(/安$/);
    expect(line).not.toMatch(/^静/);
  }
}
```

- [ ] **Step 2: Add the failing page test**

Add this test to `tests/e2e/smoke.spec.ts`:

```ts
test("SongStyle mobile headings keep readable Chinese line breaks", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });

  await page.goto(withBase("/examples/lifestyle-brand/"));
  await expectChineseHeadingLinesAreReadable(
    page.getByTestId("baiting-songstyle-mobile").getByRole("heading", {
      name: "让水回到桌面，安静地成为日常。"
    })
  );

  await page.goto(withBase("/examples/digital-product/"));
  await expectChineseHeadingLinesAreReadable(
    page.getByTestId("qingxu-songstyle-mobile").getByRole("heading", {
      name: "从来源到叙事，让研究过程清楚可见。"
    })
  );
});
```

- [ ] **Step 3: Add content contract tests**

Add a `Chinese heading readability rule is enforced across guidance and generated references` test to `tests/content-assets.test.mjs`. It should read the files listed in the spec and assert each includes the phrase `中文标题可读性`.

- [ ] **Step 4: Verify RED**

Run:

```bash
npx playwright test tests/e2e/smoke.spec.ts --grep "readable Chinese line breaks"
node --test tests/content-assets.test.mjs
```

Expected: Playwright fails on current `width < 300` and/or fragmented line assertions; content tests fail because the new rule phrase is not present yet.

- [ ] **Step 5: Commit tests**

```bash
git add tests/e2e/smoke.spec.ts tests/content-assets.test.mjs
git commit -m "test: require readable Chinese heading breaks"
```

### Task 2: Fix the Two SongStyle Mobile Headings

**Files:**
- Modify: `website/src/components/examples/BaitingSongStyleMobile.astro`
- Modify: `website/src/components/examples/QingxuSongStyleMobile.astro`

- [ ] **Step 1: Fix Baiting heading layout**

In `BaitingSongStyleMobile.astro`, change the header and `h3` CSS to keep the heading readable:

```css
header {
  display: grid;
  min-height: 178px;
  align-content: end;
  padding-bottom: 30px;
}

h3 {
  max-width: 14ch;
  margin: 0;
  font-family: var(--song-typography-family-display);
  font-size: 30px;
  font-weight: 400;
  line-height: 1.42;
  letter-spacing: -0.02em;
}
```

- [ ] **Step 2: Fix Qingxu heading layout**

In `QingxuSongStyleMobile.astro`, change the `.near` and `h3` CSS:

```css
.near {
  display: grid;
  min-height: 252px;
  align-content: center;
}

h3 {
  max-width: 15ch;
  margin: 0;
  font-family: var(--song-typography-family-display);
  font-size: 28px;
  font-weight: 400;
  line-height: 1.42;
  letter-spacing: -0.02em;
}
```

- [ ] **Step 3: Verify GREEN for layout**

Run:

```bash
npx playwright test tests/e2e/smoke.spec.ts --grep "readable Chinese line breaks|case study presents"
npx astro check
```

Expected: Playwright and Astro diagnostics pass.

- [ ] **Step 4: Commit layout fix**

```bash
git add website/src/components/examples/BaitingSongStyleMobile.astro website/src/components/examples/QingxuSongStyleMobile.astro
git commit -m "fix: preserve readable Chinese heading breaks"
```

### Task 3: Add System Rules and Regenerate Skill References

**Files:**
- Modify: `docs/foundations/typography.md`
- Modify: `docs/references/song-aesthetics-digital-design-research.md`
- Modify: `checklists/songstyle-review.md`
- Modify: `checklists/songstyle-review.json`
- Modify: `docs/principles/principles.json`
- Modify: `prompts/web-design/from-brief.md`
- Modify: `prompts/web-design/rewrite-existing-page.md`
- Modify: `prompts/design-review/review-page.md`
- Modify: `prompts/design-review/compare-default-and-songstyle.md`
- Regenerate: `skills/songstyle-web-designer/references/songstyle-principles.md`
- Regenerate: `skills/songstyle-web-designer/references/review-model.md`
- Regenerate: `skills/songstyle-design-reviewer/references/songstyle-principles.md`
- Regenerate: `skills/songstyle-design-reviewer/references/review-model.md`

- [ ] **Step 1: Add source guidance**

Add this rule sentence to each public doc, prompt, checklist Markdown,
`docs/principles/principles.json`, and `checklists/songstyle-review.json`:

```text
中文标题可读性是硬约束：留白不能制造破碎语义、单字悬挂或为了装饰而变窄的标题列。
```

- [ ] **Step 2: Regenerate Skill references**

Run:

```bash
npm run skills:build
```

Expected: generated Skill reference Markdown includes `中文标题可读性`.

- [ ] **Step 3: Verify content GREEN**

Run:

```bash
node --test tests/content-assets.test.mjs
npm run skills:check
```

Expected: content and generated Skill reference checks pass.

- [ ] **Step 4: Commit system rule updates**

```bash
git add docs/foundations/typography.md docs/references/song-aesthetics-digital-design-research.md checklists/songstyle-review.md checklists/songstyle-review.json docs/principles/principles.json prompts/web-design/from-brief.md prompts/web-design/rewrite-existing-page.md prompts/design-review/review-page.md prompts/design-review/compare-default-and-songstyle.md skills/songstyle-web-designer/references/songstyle-principles.md skills/songstyle-web-designer/references/review-model.md skills/songstyle-design-reviewer/references/songstyle-principles.md skills/songstyle-design-reviewer/references/review-model.md
git commit -m "docs: enforce Chinese heading readability"
```

### Task 4: Full Verification and Visual QA

**Files:**
- Modify only if verification reveals a regression in Task 2 or Task 3 files.

- [ ] **Step 1: Run full verification**

```bash
npm run verify
```

Expected: all unit/content tests, Astro diagnostics, build, internal links, accessibility checks, and Playwright tests pass.

- [ ] **Step 2: Inspect the two case pages at `1280 x 720`**

Start:

```bash
npm run dev -- --host 127.0.0.1
```

Inspect:

- `/songstyle-ai-design-system/examples/lifestyle-brand/`
- `/songstyle-ai-design-system/examples/digital-product/`

Confirm that SongStyle headings keep natural Chinese phrase grouping, do not end in orphaned single characters, and still preserve quiet SongStyle spacing.

- [ ] **Step 3: Stop the server and check repository state**

```bash
git diff --check
git status --short
```

Expected: no whitespace errors and a clean working tree after any required polish commit.

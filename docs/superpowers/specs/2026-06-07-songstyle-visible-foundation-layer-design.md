# SongStyle Visible Foundation Layer Design

## Design Specification

- Status: Pending written-spec review
- Date: 2026-06-07
- Author: RobbyShao-8ag
- Target release: v0.2 visible foundation iteration
- Target repository: `RobbyShao-8ag/songstyle-ai-design-system`
- Source input: user approval after foundation hardening PR #3

## 1. Summary

SongStyle now has a stronger foundation: conflict rules, information distance,
accessibility alignment, necessary density, review rubrics, prompts, skills,
and generated references. The next problem is discoverability. A first-time
visitor can still miss the central operational idea unless they read several
pages.

This iteration turns the hardened foundation into a visible product experience:
the homepage, README, and a new Quick Reference should explain the decision
model quickly, and the site should show common failure modes with direct
corrections. The goal is not more theory. The goal is lower time-to-understand.

## 2. Core Message

Use this as the visible thesis across homepage, README, and Quick Reference:

> SongStyle is not making a page empty. It first protects hard constraints,
> then organizes near, middle, and far information, and only then applies
> whitespace, restraint, warmth, and resonance.

Chinese version:

> SongStyle 不是把页面做空，而是先守住硬约束，再用近景、中景、远景建立秩序，
> 最后才做留白、克制和余韵。

This message should replace vague "Song-inspired design" language wherever the
first-time reader needs operational clarity.

## 3. Goals

1. Make the homepage explain the hardened decision model within the first 30
   seconds.
2. Add a compact Quick Reference that designers, developers, and AI agents can
   use without reading every foundation document.
3. Show common anti-patterns visually enough that users understand what
   SongStyle rejects and how it corrects the problem.
4. Update README so GitHub visitors see the new operational model before
   scanning long documentation links.
5. Keep the existing mobile case-study showcase intact.
6. Add content and e2e tests so visible foundation language does not drift.

## 4. Non-Goals

This iteration will not add:

- A new data-dense dashboard case study.
- New generated images or visual assets.
- A redesign of the full homepage visual system.
- A production component library.
- English parity for every new Quick Reference section.
- New prompts or portable skills.
- Claims that SongStyle can automatically score all aesthetic quality.

The next large case study should come after this visible foundation layer.

## 5. Homepage Design

### 5.1 Hero Refinement

Update `website/src/components/HeroStatement.astro` so the opening copy makes
the operational model explicit.

Required ideas:

- AI tends to keep adding.
- SongStyle helps decide what must remain, what should relate, and when to
  stop.
- It is not ancient-style decoration and not empty minimalism.
- The first CTA remains the mobile comparison; a secondary CTA should point to
  the Quick Reference once it exists.

The hero should not become dense. The four-layer model can appear in a small
supporting strip or compact list below the body copy.

### 5.2 Decision Model Section

Add a focused homepage section, either as a new component or an extension of
`SongAestheticFramework.astro`, that shows:

1. Hard constraints / 硬约束
2. Task goal / 任务目标
3. Information distance / 信息距离
4. Aesthetic expression / 审美表达

Each layer should have one sentence and one review question. This section is a
bridge between the homepage story and the deeper docs.

Recommended new component:

- `website/src/components/home/DecisionModelPreview.astro`

Reason: the decision model is now a separate product concept, not the same as
the Song aesthetic framework cards.

### 5.3 Anti-Pattern Correction Section

Add a homepage section that shows "failure -> correction" pairs:

- Empty prestige / 空白崇拜 -> functional negative space / 功能性留白
- Broken Chinese title / 标题破碎 -> readable semantic title / 语义完整标题
- Soft but inaccessible / 柔和但不可访问 -> warm but compliant / 温润但合规
- Cultural symbol stacking / 文化符号堆砌 -> order, not symbols / 秩序而非符号

Recommended new component:

- `website/src/components/home/AntiPatternPreview.astro`

It should be text-first and lightweight. It may use cards, arrows, and simple
layout contrast, but it should not create new image assets.

Each pair should include:

- The failure label.
- One sentence explaining why it fails.
- The correction label.
- One sentence explaining the SongStyle correction.
- A link to `/guides/anti-patterns/`.

## 6. Quick Reference

Create:

- `docs/quick-reference.md`

Use frontmatter:

- `title: 快速参考`
- `description: 一页掌握 SongStyle 的决策顺序、核心原则、硬约束、反模式与审查方式。`
- `lang: zh-CN`
- `route: /quick-reference/`
- `section: 工具`
- `order: 0`

The page should be concise and practical.

Required sections:

1. **30 秒理解 SongStyle**
   - Include the core message in Chinese.
2. **四层决策顺序**
   - Hard constraints, task goal, information distance, aesthetic expression.
3. **六原则一句话**
   - Reuse the six existing principle names and one-sentence summaries.
4. **硬约束清单**
   - Accessibility, Chinese heading readability, necessary content, truthful
     claims, clear primary action.
5. **信息距离**
   - Near, middle, far definitions.
6. **必要密度**
   - Product, content, data/expert tool, transaction page minimums.
7. **常见反模式**
   - Link to anti-patterns and list the four homepage pairs plus AI excess.
8. **如何审查**
   - Use the checklist score model and cite evidence before scoring.

This page should link to:

- `/principles/priority-and-tradeoffs/`
- `/foundations/information-distance/`
- `/foundations/accessibility-alignment/`
- `/guides/necessary-density-boundary/`
- `/guides/anti-patterns/`
- `/checklist/`
- `/prompts/`
- `/skills/`

Use route-relative links that remain safe under the Astro `base` setting.

## 7. README Update

Update `README.md` so GitHub readers see the visible model quickly.

Required changes:

- Add a "30 秒理解 SongStyle" or "Understand SongStyle In 30 Seconds" section
  near the top, before the mobile screenshots.
- Include the four-layer decision model.
- Link to `docs/quick-reference.md`.
- Keep the current fair-comparison screenshots and links.
- Do not make the README significantly longer; trim duplicated wording if
  needed.

The README should still explain the fair mobile comparison contract:

- same brief;
- same copy;
- same image;
- same CTA;
- same features;
- same goal.

## 8. Resource Navigation

Update `website/src/components/home/ResourceEntry.astro` so Quick Reference is
visible as a first-class entry.

Recommended resource order:

1. Quick Reference / 快速参考
2. Prompts
3. Agent Skills
4. Design Tokens
5. Review Checklist

The existing participation links should remain.

## 9. Tests

Extend existing tests rather than adding a new test framework.

### 9.1 Content Tests

Update `tests/content-assets.test.mjs` to assert:

- `docs/quick-reference.md` exists, has valid frontmatter, and route
  `/quick-reference/`.
- README includes:
  - `30 秒理解 SongStyle` or equivalent;
  - `硬约束`;
  - `近景`;
  - `中景`;
  - `远景`;
  - `docs/quick-reference.md`.
- Homepage components include:
  - `DecisionModelPreview`;
  - `AntiPatternPreview`;
  - `硬约束`;
  - `信息距离`;
  - `反模式`.
- Quick Reference links to the core foundation docs and tools.

### 9.2 E2E Tests

Update `tests/e2e/smoke.spec.ts` or `tests/e2e/public-pages.spec.ts` so the
homepage must render:

- the visible foundation thesis;
- the four decision layers;
- the anti-pattern correction section;
- a link to `/quick-reference/`.

Also ensure `/quick-reference/` is a usable public page through existing public
page route coverage. If route coverage is hardcoded, add this route.

## 10. Accessibility And Layout Constraints

- Do not reduce existing mobile showcase visibility.
- Do not introduce hover-only information.
- Keep cards readable on mobile.
- Keep Chinese headings readable; no decorative narrow title columns.
- Use existing tokens and layout patterns.
- Do not add motion beyond existing reveal behavior.

## 11. Implementation Notes

Likely files:

- `README.md`
- `docs/quick-reference.md`
- `website/src/pages/index.astro`
- `website/src/components/HeroStatement.astro`
- `website/src/components/home/DecisionModelPreview.astro`
- `website/src/components/home/AntiPatternPreview.astro`
- `website/src/components/home/ResourceEntry.astro`
- `tests/content-assets.test.mjs`
- `tests/e2e/smoke.spec.ts`
- possibly `tests/e2e/public-pages.spec.ts`

Keep each homepage component focused:

- Hero owns first impression and CTAs.
- DecisionModelPreview owns the four-layer operating model.
- AntiPatternPreview owns failure/correction education.
- ResourceEntry owns navigation to execution resources.

## 12. Acceptance Criteria

This iteration is complete when:

- A first-time homepage visitor can identify the four-layer decision model
  without opening docs.
- README explains SongStyle in operational terms before the screenshot section.
- Quick Reference provides a single-page entry into rules, constraints,
  anti-patterns, review, prompts, and skills.
- Anti-pattern correction appears on the homepage and links to the full guide.
- Existing mobile showcase examples remain unchanged.
- `npm run verify` passes.

## 13. Risks

- **Homepage overload:** adding too many explanatory sections can weaken the
  visual showcase. Keep the new sections compact.
- **README bloat:** GitHub readers need clarity, not another full docs page.
- **Duplicate source of truth:** Quick Reference must summarize and link to the
  deeper docs, not redefine rules differently.
- **Base path links:** homepage links must use `withBase`; Markdown links must
  remain valid under the GitHub Pages base path.
- **Premature case expansion:** do not start the data-dense case study in this
  iteration.

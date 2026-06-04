# SongStyle AI Design System v0.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the complete SongStyle AI Design System v0.1 as a tested open-source repository, a static documentation website, and a published GitHub Pages site.

**Architecture:** The repository is a single npm project. Astro builds a static site from content stored in the repository's normative modules, a small custom compiler transforms DTCG 2025.10 Design Tokens into CSS Variables, and a reference UI plus two case studies prove that the system can be applied in code. Human documentation, prompts, Agent Skills, and review tooling share the same principle and checklist sources.

**Tech Stack:** Node.js 24, npm, Astro 6, TypeScript, Markdown/MDX, DTCG 2025.10 JSON, CSS Variables, Node test runner, Playwright, axe-core, GitHub Actions, GitHub Pages

---

## Approved Source

- Design specification: `docs/superpowers/specs/2026-06-04-songstyle-ai-design-system-design.md`
- Target GitHub repository: `RobbyShao-8ag/songstyle-ai-design-system`
- Target release: `v0.1.0`

The specification is the scope authority. A plan task may make implementation
details concrete, but it must not add a production component library, an online
AI generator, user accounts, a database, a Figma plugin, or an MCP server.

## Why This Is Split Into Three Plans

The specification contains three substantial subsystems that can each produce
working, testable software:

1. A repository foundation, Design Token compiler, reference UI, and running
   Astro site.
2. The design-system content, shared review model, prompts, and Agent Skills.
3. The visual case studies, final exhibition experience, release verification,
   and GitHub publication.

Keeping these as separate plans makes review and Goal mode completion criteria
clear. Execute them in order.

## Plan Set

- [ ] **Phase 1: Foundation and Design Tokens**
  - Plan: `docs/superpowers/plans/2026-06-04-songstyle-v0.1-phase-1-foundation.md`
  - Outcome: a running and tested Astro site that consumes generated SongStyle
    Design Tokens and a small reference UI.

- [ ] **Phase 2: Content and AI Assets**
  - Plan: `docs/superpowers/plans/2026-06-04-songstyle-v0.1-phase-2-content-ai-assets.md`
  - Outcome: complete Chinese core documentation, required English entry
    content, the shared review model, four prompts, and two portable Agent
    Skills, all rendered by the website.

- [ ] **Phase 3: Examples, Quality, and Release**
  - Plan: `docs/superpowers/plans/2026-06-04-songstyle-v0.1-phase-3-examples-release.md`
  - Outcome: two complete fictional-brand case studies, before-and-after
    comparisons, final visual polish, release verification, GitHub repository,
    GitHub Pages deployment, and `v0.1.0`.

## Locked Implementation Decisions

### Project Shape

- Use one root `package.json`, one `package-lock.json`, and one Astro project.
- Keep the website source under `website/src/` by setting Astro's `srcDir`.
- Keep public assets under `website/public/`.
- Keep generated site output under `dist/`.
- Keep the reference UI as source under `packages/reference-ui/`; do not
  publish it as an npm package in v0.1.

### Content Flow

- `docs/principles/` is the source of truth for principle definitions.
- `checklists/` is the source of truth for review dimensions and scoring.
- `design-tokens/source/` is the source of truth for visual variables.
- `prompts/`, `skills/`, `examples/`, and the website consume or link to those
  sources rather than inventing parallel definitions.
- Astro Content Collections use the `glob()` loader to read Markdown and MDX
  from repository modules outside `website/src/`. Build scripts and focused
  page code read normative JSON directly.

### Design Tokens

- Use the stable Design Tokens Community Group Format Module 2025.10.
- Use `$type`, `$value`, `$description`, and aliases in source JSON.
- Generate `design-tokens/dist/songstyle.css` and
  `design-tokens/dist/songstyle.resolved.json`.
- Generated files are committed and must be reproducible.

### Website

- Use custom Astro layouts rather than a prebuilt documentation theme because
  the home and case-study pages must act as a digital aesthetic exhibition.
- Use static generation only.
- Use GitHub Pages as the initial deployment target while keeping content and
  code free of platform-specific services.
- Configure:
  - `site: "https://robbyshao-8ag.github.io"`
  - `base: "/songstyle-ai-design-system"`

### Verification

- Unit tests cover Design Token validation, alias resolution, generated CSS,
  content metadata, skill metadata, and required asset coverage.
- `astro check` and `astro build` validate the site.
- Playwright validates routes, desktop and mobile behavior, keyboard access,
  reduced motion, and key case-study content.
- axe-core detects common WCAG A and AA accessibility problems.
- A static internal-link checker runs against `dist/`.
- Manual visual QA uses the Codex in-app browser after significant frontend
  changes.

### Licensing

- MIT applies to code, build utilities, Design Tokens, prompts, skills, and the
  reference UI.
- CC BY 4.0 applies to documentation, examples, and visual case-study content.

## Repository File Map

```text
songstyle-ai-design-system/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── docs/
│   ├── en/
│   ├── foundations/
│   ├── guides/
│   ├── manifesto/
│   ├── principles/
│   ├── references/
│   └── superpowers/
├── design-tokens/
│   ├── dist/
│   └── source/
├── checklists/
├── evals/
├── examples/
├── packages/
│   └── reference-ui/
├── prompts/
├── scripts/
├── skills/
├── tests/
├── website/
│   ├── public/
│   └── src/
├── AGENTS.md
├── CONTRIBUTING.md
├── LICENSE-CODE
├── LICENSE-CONTENT
├── README.md
├── astro.config.mjs
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

## Cross-Phase Verification Commands

These commands become stable by the end of Phase 1 and must remain green:

```bash
npm run tokens:build
npm run tokens:check
npm run test:unit
npm run check
npm run build
npm run test:e2e
npm run verify
```

Expected final result:

```text
All unit tests pass.
Astro type checking passes.
Astro static build completes.
Internal link checking reports zero broken links.
Playwright tests pass in Chromium.
axe-core reports zero automatically detectable WCAG A/AA violations on tested routes.
```

## Specification Coverage Matrix

| Specification requirement | Implementation plan |
| --- | --- |
| Creator-led open-source repository and licensing | Phase 1, Task 1 |
| Core principles and cultural position | Phase 2, Tasks 1 and 3 |
| Complete Chinese content and required English entry content | Phase 2, Tasks 3 and 4 |
| Design foundations and machine-readable Design Tokens | Phase 1, Tasks 2 and 3; Phase 2, Task 3 |
| Four structured prompts | Phase 2, Task 5 |
| Two portable Agent Skills | Phase 2, Task 6 |
| Shared review checklist and fixed evaluation briefs | Phase 2, Task 1; Phase 3, Task 6 |
| Small non-production reference UI | Phase 1, Task 5 |
| Static documentation website | Phase 1, Tasks 4 and 6; Phase 2, Task 2 |
| Lifestyle and digital-product case studies | Phase 3, Tasks 1 and 2 |
| Before-and-after comparisons | Phase 3, Task 3 |
| Exhibition-style home page and efficient documentation pages | Phase 2, Task 2; Phase 3, Task 4 |
| Accessibility, mobile, reduced motion, internal links, and visual QA | Phase 3, Tasks 5 and 7 |
| GitHub repository, GitHub Pages, and v0.1.0 release | Phase 3, Tasks 8 and 9 |

## Git and Commit Policy

- Commit after each plan task.
- Keep generated Design Token output in the same commit as its source changes.
- Do not mix editorial content, visual implementation, and build tooling in one
  commit unless the task explicitly requires them together.
- Use Conventional Commit prefixes such as `chore:`, `feat:`, `docs:`,
  `test:`, and `ci:`.
- Run the task-specific verification command before every commit.
- Run `npm run verify` before the final release commit and tag.

## Goal Mode Objective

After the user approves all implementation plans, start Goal mode with:

```text
Complete SongStyle AI Design System v0.1 according to the approved design
specification and the three implementation plans in docs/superpowers/plans.
Execute the plans in order, keep all work within the v0.1 scope, run the
specified tests and visual verification, and commit each completed task.
The goal is complete only when the documentation website, Design Tokens,
prompts, Agent Skills, reference UI, two case studies, GitHub repository,
GitHub Pages deployment, and v0.1.0 release all satisfy the plans.
```

## Publication Prerequisite

Publication authentication has been verified for `RobbyShao-8ag` through the
installed `gh` CLI. Do not create a repository under a different account.

## External References Used by This Plan

- Astro documentation:
  - `https://docs.astro.build/en/reference/configuration-reference/`
  - `https://docs.astro.build/en/reference/content-loader-reference/`
  - `https://docs.astro.build/en/guides/deploy/github/`
- Design Tokens Community Group Format Module 2025.10:
  - `https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/`
- Agent Skills specification:
  - `https://agentskills.io/specification`
- Playwright accessibility testing:
  - `https://playwright.dev/docs/accessibility-testing`

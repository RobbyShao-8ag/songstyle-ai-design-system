# SongStyle v0.1 Phase 1: Foundation and Design Tokens Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a running, tested Astro website foundation that consumes reproducibly generated SongStyle Design Tokens and a small reference UI.

**Architecture:** A root npm project owns build and verification commands. A small ESM compiler validates DTCG 2025.10 token files, resolves aliases, and generates committed CSS Variables plus resolved JSON. Astro reads source from `website/src/`, imports the generated CSS, and renders a minimal home page plus a reference UI showcase.

**Tech Stack:** Node.js 24, npm, Astro 6, TypeScript, Markdown/MDX, DTCG 2025.10 JSON, CSS Variables, Node test runner, Playwright, axe-core

---

## Task 1: Establish Repository Metadata and Toolchain

**Files:**
- Create: `.gitignore`
- Create: `.nvmrc`
- Create: `AGENTS.md`
- Create: `README.md`
- Create: `LICENSE-CODE`
- Create: `LICENSE-CONTENT`
- Create: `CONTRIBUTING.md`
- Create: `package.json`
- Create: `package-lock.json`
- Create: `tsconfig.json`
- Create: `astro.config.mjs`

- [ ] **Step 1: Create the root npm package**

Run:

```bash
npm init -y
npm install astro@^6.4.2 @astrojs/mdx@^6.0.1 @astrojs/sitemap@^3.7.3
npm install -D @astrojs/check@latest typescript@latest @playwright/test@latest @axe-core/playwright@latest parse5@latest yaml@latest
```

Expected:

```text
package.json and package-lock.json exist.
Dependencies install without an npm error.
```

- [ ] **Step 2: Set package metadata and stable scripts**

Update `package.json` so it contains these fields and scripts:

```json
{
  "name": "songstyle-ai-design-system",
  "version": "0.1.0",
  "private": true,
  "description": "A modern Song-inspired design system for AI-generated websites and Web UI.",
  "license": "SEE LICENSE IN LICENSE-CODE AND LICENSE-CONTENT",
  "type": "module",
  "engines": {
    "node": ">=24"
  },
  "scripts": {
    "dev": "npm run tokens:build && astro dev",
    "build": "npm run tokens:build && astro check && astro build",
    "preview": "astro preview",
    "tokens:build": "node scripts/build-design-tokens.mjs",
    "tokens:check": "node --test tests/design-tokens.test.mjs && npm run tokens:build && git diff --exit-code -- design-tokens/dist",
    "content:check": "node --test tests/content-assets.test.mjs",
    "links:check": "node scripts/check-internal-links.mjs",
    "test:unit": "node --test tests/*.test.mjs",
    "test:e2e": "playwright test",
    "check": "npm run test:unit && astro check",
    "verify": "npm run check && npm run build && npm run links:check && npm run test:e2e"
  }
}
```

- [ ] **Step 3: Add repository ignore and Node version files**

Create `.nvmrc`:

```text
24
```

Create `.gitignore`:

```gitignore
node_modules/
dist/
.astro/
playwright-report/
test-results/
.DS_Store
*.log
```

- [ ] **Step 4: Configure TypeScript**

Create `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@songstyle/reference-ui/*": ["packages/reference-ui/src/*"],
      "@songstyle/website/*": ["website/src/*"]
    }
  }
}
```

- [ ] **Step 5: Configure Astro**

Create `astro.config.mjs`:

```js
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

const referenceUi = fileURLToPath(new URL("./packages/reference-ui/src", import.meta.url));

export default defineConfig({
  site: "https://robbyshao-8ag.github.io",
  base: "/songstyle-ai-design-system",
  srcDir: "./website/src",
  publicDir: "./website/public",
  outDir: "./dist",
  integrations: [mdx(), sitemap()],
  vite: {
    resolve: {
      alias: {
        "@songstyle/reference-ui": referenceUi
      }
    }
  }
});
```

- [ ] **Step 6: Add durable agent guidance**

Create `AGENTS.md` with these required sections:

```markdown
# SongStyle AI Design System Agent Guide

## Purpose
SongStyle translates Song-dynasty aesthetic principles into a modern,
executable design language. It is not an ancient-style asset library.

## Source Of Truth
- `docs/principles/` owns principle definitions.
- `checklists/` owns review dimensions and scoring.
- `design-tokens/source/` owns visual variables.
- `design-tokens/dist/` is generated and must not be edited manually.

## Commands
- `npm run dev`
- `npm run tokens:build`
- `npm run test:unit`
- `npm run build`
- `npm run test:e2e`
- `npm run verify`

## Constraints
- Do not equate SongStyle with ink-wash backgrounds, seals, traditional
  patterns, calligraphic type, or low information density.
- Do not remove information required for usability, accessibility, or business
  goals.
- Keep Chinese content complete; keep the required English entry pages current.
- Keep the reference UI small and non-production.

## Done Means
Run the verification commands required by the active implementation plan,
review the diff, and commit generated Design Token output with its source.
```

- [ ] **Step 7: Add licensing and contribution entry files**

Create `LICENSE-CODE` using the standard MIT License with:

```text
Copyright (c) 2026 RobbyShao-8ag
```

Create `LICENSE-CONTENT` with:

```text
SongStyle AI Design System documentation, examples, and visual case-study
content are licensed under the Creative Commons Attribution 4.0 International
License.

License summary: https://creativecommons.org/licenses/by/4.0/
Legal code: https://creativecommons.org/licenses/by/4.0/legalcode

Copyright (c) 2026 RobbyShao-8ag
```

Create `CONTRIBUTING.md` with sections for:

```markdown
# Contributing

## Before You Contribute
## Repository Modules And Licenses
## Cultural And Design Guardrails
## Development Setup
## Verification
## Pull Request Expectations
```

State explicitly that contributors must not present modern translations as
historical facts and that contributions use the license applicable to their
module.

- [ ] **Step 8: Create the bilingual repository entry README**

Create `README.md` with:

```markdown
# SongStyle AI Design System

**宋式 AI 设计系统**

> AI 不懂得何时停止。宋式设计，在有限表达中建立秩序，在留白之中留下余韵。

SongStyle AI Design System is an open-source design system that translates
principles derived from Song-dynasty aesthetics into a modern, executable
language for AI-generated websites and Web UI.

宋式 AI 设计系统不是古风素材库，也不是单纯的 Prompt 集合。它希望让设计师、
产品经理、前端开发者与 AI Agent 使用同一套原则，判断什么应该存在，什么应该
被删减，以及设计应当在何处停止。

## What It Includes / 包含内容
## What It Is Not / 它不是什么
## Project Status / 项目状态
## Development / 本地开发
## Licenses / 许可证
```

Under development, list `npm install`, `npm run dev`, and `npm run verify`.

- [ ] **Step 9: Verify metadata**

Run:

```bash
npm install
npm pkg get name version type engines scripts
git diff --check
```

Expected:

```text
The package name is songstyle-ai-design-system.
The version is 0.1.0.
No whitespace errors are reported.
```

- [ ] **Step 10: Commit**

```bash
git add .gitignore .nvmrc AGENTS.md README.md LICENSE-CODE LICENSE-CONTENT CONTRIBUTING.md package.json package-lock.json tsconfig.json astro.config.mjs
git commit -m "chore: establish SongStyle project foundation"
```

## Task 2: Build the DTCG Design Token Compiler

**Files:**
- Create: `scripts/lib/design-token-compiler.mjs`
- Create: `scripts/build-design-tokens.mjs`
- Create: `tests/design-tokens.test.mjs`
- Create: `design-tokens/source/`
- Create: `design-tokens/dist/`

- [ ] **Step 1: Write failing compiler tests**

Create `tests/design-tokens.test.mjs`:

```js
import assert from "node:assert/strict";
import test from "node:test";

import {
  collectTokens,
  compileTokenFiles,
  resolveTokenValue,
  tokenToCssValue
} from "../scripts/lib/design-token-compiler.mjs";

test("collectTokens inherits group types and records token paths", () => {
  const tokens = collectTokens({
    color: {
      $type: "color",
      ink: {
        $value: {
          colorSpace: "srgb",
          components: [0.12, 0.15, 0.13],
          alpha: 1
        }
      }
    }
  });

  assert.equal(tokens.get("color.ink").type, "color");
});

test("resolveTokenValue resolves aliases", () => {
  const tokens = collectTokens({
    space: {
      $type: "dimension",
      4: { $value: { value: 16, unit: "px" } },
      section: { $value: "{space.4}" }
    }
  });

  assert.deepEqual(resolveTokenValue("space.section", tokens), {
    value: 16,
    unit: "px"
  });
});

test("tokenToCssValue converts supported DTCG values", () => {
  assert.equal(
    tokenToCssValue("dimension", { value: 16, unit: "px" }),
    "16px"
  );
  assert.equal(
    tokenToCssValue("duration", { value: 220, unit: "ms" }),
    "220ms"
  );
  assert.equal(
    tokenToCssValue("cubicBezier", [0.2, 0, 0, 1]),
    "cubic-bezier(0.2, 0, 0, 1)"
  );
});

test("compileTokenFiles rejects missing types", () => {
  assert.throws(
    () => compileTokenFiles([{ name: "invalid.json", data: { bad: { $value: 1 } } }]),
    /type/i
  );
});

test("compileTokenFiles rejects duplicate token paths", () => {
  assert.throws(
    () => compileTokenFiles([
      { name: "a.json", data: { color: { $type: "color", ink: { $value: { colorSpace: "srgb", components: [0, 0, 0], alpha: 1 } } } } },
      { name: "b.json", data: { color: { $type: "color", ink: { $value: { colorSpace: "srgb", components: [1, 1, 1], alpha: 1 } } } } }
    ]),
    /duplicate/i
  );
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run:

```bash
node --test tests/design-tokens.test.mjs
```

Expected:

```text
FAIL because scripts/lib/design-token-compiler.mjs does not exist.
```

- [ ] **Step 3: Implement the compiler library**

Create `scripts/lib/design-token-compiler.mjs` with exported functions:

```js
const TOKEN_KEY = "$value";
const ALIAS_PATTERN = /^\{([^}]+)\}$/;

export function collectTokens(node, path = [], inheritedType, tokens = new Map()) {
  if (node === null || typeof node !== "object" || Array.isArray(node)) {
    throw new Error(`Invalid group at ${path.join(".") || "<root>"}`);
  }

  const groupType = node.$type ?? inheritedType;

  for (const [name, value] of Object.entries(node)) {
    if (name.startsWith("$")) continue;
    if (name.includes(".") || name.includes("{") || name.includes("}")) {
      throw new Error(`Invalid token or group name: ${name}`);
    }

    const tokenPath = [...path, name];
    if (value && typeof value === "object" && !Array.isArray(value) && TOKEN_KEY in value) {
      const type = value.$type ?? groupType;
      if (!type) throw new Error(`Token ${tokenPath.join(".")} is missing a type`);
      const name = tokenPath.join(".");
      if (tokens.has(name)) throw new Error(`Duplicate token path: ${name}`);
      tokens.set(name, {
        path: tokenPath,
        type,
        value: value.$value,
        description: value.$description ?? ""
      });
      continue;
    }

    collectTokens(value, tokenPath, value?.$type ?? groupType, tokens);
  }

  return tokens;
}

export function resolveTokenValue(name, tokens, stack = []) {
  const token = tokens.get(name);
  if (!token) throw new Error(`Unknown token alias: ${name}`);
  if (stack.includes(name)) {
    throw new Error(`Circular token alias: ${[...stack, name].join(" -> ")}`);
  }

  if (typeof token.value === "string") {
    const match = token.value.match(ALIAS_PATTERN);
    if (match) return resolveTokenValue(match[1], tokens, [...stack, name]);
  }

  return token.value;
}

function colorToCss(value) {
  if (value.colorSpace !== "srgb" || !Array.isArray(value.components) || value.components.length !== 3) {
    throw new Error("Only three-channel sRGB color tokens are supported in v0.1");
  }
  const [r, g, b] = value.components;
  const alpha = value.alpha ?? 1;
  const channels = [r, g, b].map((channel) => Math.round(channel * 255));
  return `rgb(${channels.join(" ")} / ${alpha})`;
}

function dimensionToCss(value) {
  if (typeof value?.value !== "number" || !["px", "rem", "ms", "s"].includes(value.unit)) {
    throw new Error("Invalid dimension or duration token");
  }
  return `${value.value}${value.unit}`;
}

function shadowToCss(value) {
  const shadows = Array.isArray(value) ? value : [value];
  return shadows
    .map((shadow) => [
      shadow.inset ? "inset" : "",
      dimensionToCss(shadow.offsetX),
      dimensionToCss(shadow.offsetY),
      dimensionToCss(shadow.blur),
      dimensionToCss(shadow.spread),
      colorToCss(shadow.color)
    ].filter(Boolean).join(" "))
    .join(", ");
}

export function tokenToCssValue(type, value) {
  switch (type) {
    case "color":
      return colorToCss(value);
    case "dimension":
    case "duration":
      return dimensionToCss(value);
    case "cubicBezier":
      return `cubic-bezier(${value.join(", ")})`;
    case "fontFamily":
      return value.map((family) => family.includes(" ") ? `"${family}"` : family).join(", ");
    case "fontWeight":
    case "number":
      return String(value);
    case "shadow":
      return shadowToCss(value);
    default:
      throw new Error(`Unsupported CSS token type: ${type}`);
  }
}

export function compileTokenFiles(files) {
  const tokens = new Map();
  for (const file of files) collectTokens(file.data, [], undefined, tokens);

  const resolved = {};
  const cssLines = [];

  for (const [name, token] of [...tokens.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const value = resolveTokenValue(name, tokens);
    resolved[name] = { type: token.type, value, description: token.description };
    cssLines.push(`  --song-${name.replaceAll(".", "-")}: ${tokenToCssValue(token.type, value)};`);
  }

  return {
    resolved,
    css: `:root {\n${cssLines.join("\n")}\n}\n`
  };
}
```

- [ ] **Step 4: Implement the compiler CLI**

Create `scripts/build-design-tokens.mjs`:

```js
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { compileTokenFiles } from "./lib/design-token-compiler.mjs";

const sourceDir = path.resolve("design-tokens/source");
const distDir = path.resolve("design-tokens/dist");

const names = (await readdir(sourceDir))
  .filter((name) => name.endsWith(".tokens.json"))
  .sort();

if (names.length === 0) {
  throw new Error("No design token source files found.");
}

const files = await Promise.all(names.map(async (name) => ({
  name,
  data: JSON.parse(await readFile(path.join(sourceDir, name), "utf8"))
})));

const { css, resolved } = compileTokenFiles(files);

await mkdir(distDir, { recursive: true });
await writeFile(path.join(distDir, "songstyle.css"), css);
await writeFile(
  path.join(distDir, "songstyle.resolved.json"),
  `${JSON.stringify(resolved, null, 2)}\n`
);
```

- [ ] **Step 5: Run tests and confirm the compiler passes**

Run:

```bash
npm run tokens:check
```

Expected:

```text
All Design Token compiler tests pass.
```

- [ ] **Step 6: Commit**

```bash
git add scripts/lib/design-token-compiler.mjs scripts/build-design-tokens.mjs tests/design-tokens.test.mjs
git commit -m "feat: add DTCG design token compiler"
```

## Task 3: Add SongStyle Design Token Sources

**Files:**
- Create: `design-tokens/source/color.tokens.json`
- Create: `design-tokens/source/space.tokens.json`
- Create: `design-tokens/source/typography.tokens.json`
- Create: `design-tokens/source/shape.tokens.json`
- Create: `design-tokens/source/motion.tokens.json`
- Generate: `design-tokens/dist/songstyle.css`
- Generate: `design-tokens/dist/songstyle.resolved.json`
- Modify: `tests/design-tokens.test.mjs`

- [ ] **Step 1: Add a failing coverage test**

Append a test that compiles the real source files and asserts these semantic
tokens exist:

```js
const REQUIRED_TOKENS = [
  "color.background.canvas",
  "color.text.primary",
  "color.border.subtle",
  "color.accent.primary",
  "space.page.gutter",
  "space.section.default",
  "typography.family.body",
  "typography.family.display",
  "typography.size.body",
  "shape.radius.control",
  "shape.shadow.soft",
  "motion.duration.enter",
  "motion.easing.standard"
];
```

Expected assertion:

```js
for (const name of REQUIRED_TOKENS) {
  assert.ok(result.resolved[name], `Missing required token: ${name}`);
}
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm run tokens:check
```

Expected:

```text
FAIL because the real Design Token source files do not exist.
```

- [ ] **Step 3: Create the color source**

Create `design-tokens/source/color.tokens.json` using DTCG color objects and
aliases. It must define:

```text
color.primitive.porcelain.50   #fbfaf6
color.primitive.porcelain.100  #f5f2e9
color.primitive.porcelain.200  #ebe6d8
color.primitive.ink.900        #1f2521
color.primitive.ink.700        #3f4942
color.primitive.ink.500        #68736b
color.primitive.mist.50        #f6f7f4
color.primitive.mist.100       #edf0eb
color.primitive.mist.300       #cfd6cf
color.primitive.celadon.300    #a9b9aa
color.primitive.celadon.500    #718878
color.primitive.celadon.700    #4f6557
color.primitive.tea.500        #90755d
color.primitive.tea.700        #695441
color.primitive.vermilion.600  #a65342

color.background.canvas        -> {color.primitive.porcelain.50}
color.background.subtle        -> {color.primitive.mist.50}
color.surface.default          -> {color.primitive.porcelain.100}
color.surface.elevated         -> {color.primitive.porcelain.50}
color.text.primary             -> {color.primitive.ink.900}
color.text.secondary           -> {color.primitive.ink.700}
color.text.muted               -> {color.primitive.ink.500}
color.border.subtle            -> {color.primitive.mist.300}
color.accent.primary           -> {color.primitive.celadon.700}
color.accent.soft              -> {color.primitive.celadon.300}
color.accent.warm              -> {color.primitive.tea.500}
color.state.error              -> {color.primitive.vermilion.600}
```

Each token must include a concise `$description` describing its intended use.

- [ ] **Step 4: Create spacing, typography, shape, and motion sources**

Create the remaining files with these exact scales:

```text
space scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px
page gutter: 24 px
page gutter wide: 48 px
section compact: 64 px
section default: 96 px
section spacious: 128 px

body font family:
Inter, Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif

display font family:
Source Han Serif SC, Noto Serif SC, Songti SC, STSong, serif

type sizes: 14, 16, 18, 24, 32, 48, 64 px
line heights: 1.4, 1.6, 1.8
font weights: 400, 500, 600

radius: 4, 8, 16 px
border width: 1 px
soft shadow: 0 12px 36px 0 rgb(31 37 33 / 0.08)

motion duration: 120, 220, 420 ms
motion easing standard: cubic-bezier(0.2, 0, 0, 1)
motion easing emphasized: cubic-bezier(0.16, 1, 0.3, 1)
motion distance: 8, 16 px
```

Use DTCG `$type` values appropriate to each group: `dimension`, `fontFamily`,
`fontWeight`, `number`, `shadow`, `duration`, and `cubicBezier`.

- [ ] **Step 5: Generate output and verify**

Run:

```bash
npm run tokens:build
npm run tokens:check
git diff --check
```

Expected:

```text
design-tokens/dist/songstyle.css exists.
design-tokens/dist/songstyle.resolved.json exists.
All required token coverage tests pass.
```

- [ ] **Step 6: Commit**

```bash
git add design-tokens tests/design-tokens.test.mjs
git commit -m "feat: define SongStyle design tokens"
```

## Task 4: Build the Astro Website Shell

**Files:**
- Create: `website/public/favicon.svg`
- Create: `website/src/env.d.ts`
- Create: `website/src/styles/global.css`
- Create: `website/src/lib/paths.ts`
- Create: `website/src/layouts/BaseLayout.astro`
- Create: `website/src/components/SiteHeader.astro`
- Create: `website/src/components/SiteFooter.astro`
- Create: `website/src/components/HeroStatement.astro`
- Create: `website/src/pages/index.astro`

- [ ] **Step 1: Create a failing build expectation**

Run:

```bash
npm run build
```

Expected:

```text
FAIL because website/src does not exist.
```

- [ ] **Step 2: Add the Astro environment file**

Create `website/src/env.d.ts`:

```ts
/// <reference types="astro/client" />
```

- [ ] **Step 3: Add the base-path helper**

Create `website/src/lib/paths.ts`:

```ts
export function withBase(path: string): string {
  const normalized = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
}
```

Use this helper for internal links so local development and GitHub Pages use
the same routes.

- [ ] **Step 4: Add global styles that consume generated variables**

Create `website/src/styles/global.css` and begin it with:

```css
@import "../../../design-tokens/dist/songstyle.css";

:root {
  color: var(--song-color-text-primary);
  background: var(--song-color-background-canvas);
  font-family: var(--song-typography-family-body);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  background: var(--song-color-background-canvas);
  color: var(--song-color-text-primary);
}

a {
  color: inherit;
}

:focus-visible {
  outline: 2px solid var(--song-color-accent-primary);
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

Continue with shared `.container`, `.eyebrow`, `.display-title`, `.body-copy`,
and `.quiet-link` utilities using only generated SongStyle variables.

- [ ] **Step 5: Create the base layout**

Create `website/src/layouts/BaseLayout.astro` with props:

```ts
interface Props {
  title: string;
  description: string;
  lang?: "zh-CN" | "en";
}
```

The layout must:

- Import `global.css`.
- Render a skip link to `#main-content`.
- Render `SiteHeader`, `<main id="main-content">`, and `SiteFooter`.
- Set `<html lang>`, title, description, viewport, canonical URL, and favicon.
- Use semantic header, main, and footer landmarks.

- [ ] **Step 6: Create the site header and footer**

`SiteHeader.astro` must include:

```text
Brand: SongStyle AI Design System
Links: 首页, Reference UI
```

Later plans add manifesto, principles, Design Tokens, Prompts, Skills, and
examples only after those routes exist.

`SiteFooter.astro` must include:

```text
宋式 AI 设计系统
Created by RobbyShao-8ag
Code and executable assets: MIT
Documentation and examples: CC BY 4.0
```

All links must use `withBase()`.

- [ ] **Step 7: Create the favicon and minimal home page**

Create `website/public/favicon.svg` as a simple accessible SVG mark using a
porcelain background, an ink foreground, and no text or decorative historical
symbol.

Create `website/src/components/HeroStatement.astro` and
`website/src/pages/index.astro`.

The hero must display:

```text
AI 不懂得何时停止。
宋式设计，在有限表达中建立秩序，在留白之中留下余韵。
```

The page must also include:

- A concise explanation that SongStyle is not ancient-style decoration.
- A primary link to `/reference-ui/`.
- Enough intentional open space to demonstrate the spacing scale without
  hiding the page purpose.

- [ ] **Step 8: Build and verify**

Run:

```bash
npm run build
```

Expected:

```text
Astro check passes.
Astro builds the home page into dist/.
```

- [ ] **Step 9: Commit**

```bash
git add website
git commit -m "feat: add Astro website shell"
```

## Task 5: Add the Non-Production Reference UI

**Files:**
- Create: `packages/reference-ui/src/SongButton.astro`
- Create: `packages/reference-ui/src/SongCard.astro`
- Create: `packages/reference-ui/src/SongSection.astro`
- Create: `packages/reference-ui/src/reference-ui.css`
- Create: `website/src/pages/reference-ui.astro`

- [ ] **Step 1: Create the showcase page before components**

Create `website/src/pages/reference-ui.astro` importing:

```astro
---
import SongButton from "@songstyle/reference-ui/SongButton.astro";
import SongCard from "@songstyle/reference-ui/SongCard.astro";
import SongSection from "@songstyle/reference-ui/SongSection.astro";
---
```

Use all three components in semantic examples.

- [ ] **Step 2: Run the build to verify it fails**

Run:

```bash
npm run build
```

Expected:

```text
FAIL because the reference UI components do not exist.
```

- [ ] **Step 3: Implement the reference UI components**

Implement:

- `SongButton.astro`
  - Supports `href`, `variant: "primary" | "quiet"`, and a default slot.
  - Renders an `<a>` when `href` exists and a `<button type="button">`
    otherwise.
  - Includes visible hover and focus states.
- `SongCard.astro`
  - Supports `eyebrow`, `title`, and a default slot.
  - Uses an `<article>` and a real heading.
- `SongSection.astro`
  - Supports `eyebrow`, `title`, `description`, and a default slot.
  - Uses a semantic `<section>` with a labelled heading.

Create `reference-ui.css` using only `--song-*` variables. Do not add
component-specific token source files in v0.1.

- [ ] **Step 4: Import the reference styles**

Import `packages/reference-ui/src/reference-ui.css` from
`website/src/styles/global.css`.

- [ ] **Step 5: Build and verify**

Run:

```bash
npm run build
```

Expected:

```text
The build passes and dist/reference-ui/index.html exists under the configured base.
```

- [ ] **Step 6: Commit**

```bash
git add packages/reference-ui website/src/pages/reference-ui.astro website/src/styles/global.css
git commit -m "feat: add SongStyle reference UI"
```

## Task 6: Add Automated Website Smoke and Accessibility Tests

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/smoke.spec.ts`
- Create: `scripts/check-internal-links.mjs`
- Create: `tests/content-assets.test.mjs`

- [ ] **Step 1: Configure Playwright**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: "http://127.0.0.1:4321",
    trace: "on-first-retry",
    screenshot: "only-on-failure"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] }
    }
  ],
  webServer: {
    command: "npm run dev -- --host 127.0.0.1",
    url: "http://127.0.0.1:4321/songstyle-ai-design-system/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});
```

- [ ] **Step 2: Write smoke and axe tests**

Create `tests/e2e/smoke.spec.ts`:

```ts
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const BASE_PATH = "/songstyle-ai-design-system";
const withBase = (route: string) => `${BASE_PATH}${route}`;

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
  await expect(page.getByRole("heading", { level: 1 })).toContainText("AI 不懂得何时停止");
});

test("reference controls are keyboard reachable", async ({ page }) => {
  await page.goto(withBase("/reference-ui/"));
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus-visible")).toBeVisible();
});
```

- [ ] **Step 3: Implement the static internal-link checker**

Create `scripts/check-internal-links.mjs` using `parse5` and Node file-system
APIs. It must:

- Recursively read all `dist/**/*.html` files.
- Parse each document with `parse5.parse`.
- Collect local `<a href>` values.
- Ignore `mailto:`, `tel:`, `http:`, `https:`, fragment-only links, and
  non-HTML assets.
- Remove the `/songstyle-ai-design-system` base before mapping links to files.
- Accept both `/path/` -> `dist/path/index.html` and `/path.html` ->
  `dist/path.html`.
- Exit non-zero and list every missing target.
- Print `Internal links OK` when there are no missing targets.

- [ ] **Step 4: Add a minimal content-assets test**

Create `tests/content-assets.test.mjs` that asserts:

```js
import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

const REQUIRED_FILES = [
  "README.md",
  "AGENTS.md",
  "LICENSE-CODE",
  "LICENSE-CONTENT",
  "design-tokens/dist/songstyle.css",
  "website/src/pages/index.astro",
  "website/src/pages/reference-ui.astro"
];

test("phase 1 required files exist", async () => {
  for (const file of REQUIRED_FILES) {
    await assert.doesNotReject(access(file), `Missing required file: ${file}`);
  }
});
```

- [ ] **Step 5: Install Playwright Chromium**

Run:

```bash
npx playwright install chromium
```

Expected:

```text
Chromium installs successfully.
```

- [ ] **Step 6: Run Phase 1 verification**

Run:

```bash
npm run test:unit
npm run build
npm run links:check
npm run test:e2e
```

Expected:

```text
All unit tests pass.
The site builds.
Internal links OK.
Playwright passes on desktop and mobile Chromium.
```

- [ ] **Step 7: Perform manual visual QA**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Use the Codex in-app browser to inspect:

```text
http://127.0.0.1:4321/songstyle-ai-design-system/
http://127.0.0.1:4321/songstyle-ai-design-system/reference-ui/
```

Confirm:

- The hero feels spacious but still communicates its purpose immediately.
- The reference UI shows clear hierarchy, visible focus, and restrained states.
- Mobile layout does not create unusable empty space.

- [ ] **Step 8: Commit**

```bash
git add playwright.config.ts tests scripts/check-internal-links.mjs
git commit -m "test: add website smoke and accessibility checks"
```

## Phase 1 Completion Gate

Run:

```bash
npm run verify
git status --short
```

Expected:

```text
npm run verify passes.
The working tree is clean.
The Astro site runs and consumes generated Design Tokens.
```

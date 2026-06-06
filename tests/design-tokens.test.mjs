import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
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
      {
        name: "a.json",
        data: {
          color: {
            $type: "color",
            ink: {
              $value: {
                colorSpace: "srgb",
                components: [0, 0, 0],
                alpha: 1
              }
            }
          }
        }
      },
      {
        name: "b.json",
        data: {
          color: {
            $type: "color",
            ink: {
              $value: {
                colorSpace: "srgb",
                components: [1, 1, 1],
                alpha: 1
              }
            }
          }
        }
      }
    ]),
    /duplicate/i
  );
});

test("real SongStyle token sources cover required semantic tokens", async () => {
  const sourceDir = path.resolve("design-tokens/source");
  const names = (await readdir(sourceDir))
    .filter((name) => name.endsWith(".tokens.json"))
    .sort();
  const files = await Promise.all(
    names.map(async (name) => ({
      name,
      data: JSON.parse(await readFile(path.join(sourceDir, name), "utf8"))
    }))
  );
  const result = compileTokenFiles(files);
  const requiredTokens = [
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

  for (const name of requiredTokens) {
    assert.ok(result.resolved[name], `Missing required token: ${name}`);
  }
});

test("semantic color tokens document usage boundaries", async () => {
  const source = JSON.parse(
    await readFile("design-tokens/source/color.tokens.json", "utf8")
  );
  const semanticTokens = {
    "color.text.primary": source.color.text.primary,
    "color.text.secondary": source.color.text.secondary,
    "color.text.muted": source.color.text.muted,
    "color.accent.primary": source.color.accent.primary,
    "color.accent.soft": source.color.accent.soft,
    "color.accent.warm": source.color.accent.warm,
    "color.state.error": source.color.state.error
  };

  for (const [name, token] of Object.entries(semanticTokens)) {
    assert.match(token.$description, /Usage:/, `${name} needs usage guidance`);
  }

  assert.match(source.color.text.primary.$description, /body text|primary text/i);
  assert.match(source.color.text.muted.$description, /not for required|low-priority/i);
  assert.match(source.color.accent.soft.$description, /non-critical|supporting emphasis/i);
  assert.match(source.color.accent.warm.$description, /secondary emphasis|warmth cues/i);
  assert.match(source.color.state.error.$description, /error|destructive/i);
});

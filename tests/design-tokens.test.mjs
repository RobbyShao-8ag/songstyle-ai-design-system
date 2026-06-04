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

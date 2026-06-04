import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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

test("normative principles, review dimensions, and evaluation briefs are complete", async () => {
  const principles = JSON.parse(
    await readFile("docs/principles/principles.json", "utf8")
  );
  const review = JSON.parse(
    await readFile("checklists/songstyle-review.json", "utf8")
  );
  const briefs = JSON.parse(await readFile("evals/briefs.json", "utf8"));
  const checklistMarkdown = await readFile(
    "checklists/songstyle-review.md",
    "utf8"
  );

  assert.deepEqual(
    principles.map(({ id }) => id),
    [
      "less-with-order",
      "space-creates-meaning",
      "restraint-knows-measure",
      "quietness-reveals-truth",
      "warmth-makes-technology-approachable",
      "suggestion-leaves-resonance"
    ]
  );
  assert.deepEqual(
    review.dimensions.map(({ id }) => id),
    [
      "information-necessity",
      "hierarchy-clarity",
      "functional-negative-space",
      "appropriate-stopping",
      "order-not-symbols",
      "usability-accessibility-goals"
    ]
  );
  assert.deepEqual(
    briefs.map(({ id }) => id),
    [
      "lifestyle-landing",
      "digital-product-landing",
      "necessary-density",
      "overdecorated-existing-page"
    ]
  );

  for (const dimension of review.dimensions) {
    assert.ok(dimension.question, `${dimension.id} is missing question`);
    assert.ok(dimension.good, `${dimension.id} is missing good`);
    assert.ok(dimension.risk, `${dimension.id} is missing risk`);
    assert.match(checklistMarkdown, new RegExp(dimension.nameZh));
    assert.match(checklistMarkdown, new RegExp(dimension.question));
  }
});

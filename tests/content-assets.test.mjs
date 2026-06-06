import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import YAML from "yaml";

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

const CHINESE_CONTENT_FILES = [
  "docs/manifesto/zh.md",
  "docs/principles/index.md",
  "docs/principles/01-less-with-order.md",
  "docs/principles/02-space-creates-meaning.md",
  "docs/principles/03-restraint-knows-measure.md",
  "docs/principles/04-quietness-reveals-truth.md",
  "docs/principles/05-warmth-makes-technology-approachable.md",
  "docs/principles/06-suggestion-leaves-resonance.md",
  "docs/references/reading-list.md",
  "docs/foundations/index.md",
  "docs/foundations/design-tokens.md",
  "docs/foundations/color.md",
  "docs/foundations/space.md",
  "docs/foundations/typography.md",
  "docs/foundations/surface.md",
  "docs/foundations/motion.md",
  "docs/guides/from-brief-to-web-design.md",
  "docs/guides/contributing.md"
];

function parseFrontmatter(markdown, file) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(match, `${file} is missing YAML frontmatter`);
  return YAML.parse(match[1]);
}

test("Chinese core documentation is complete and follows the page schema", async () => {
  const routes = [];
  for (const file of CHINESE_CONTENT_FILES) {
    const markdown = await readFile(file, "utf8");
    const data = parseFrontmatter(markdown, file);
    for (const field of ["title", "description", "lang", "route", "section", "order"]) {
      assert.notEqual(data[field], undefined, `${file} is missing ${field}`);
    }
    routes.push(data.route);
  }

  for (const route of ["/principles/", "/foundations/", "/design-tokens/", "/contributing/"]) {
    assert.ok(routes.includes(route), `Missing required route: ${route}`);
  }
});

test("principle pages contain normative wording and the rule-page template", async () => {
  const principles = JSON.parse(
    await readFile("docs/principles/principles.json", "utf8")
  );
  const files = CHINESE_CONTENT_FILES.filter((file) =>
    /docs\/principles\/\d{2}-/.test(file)
  );
  const headings = [
    "这意味着什么",
    "为什么重要",
    "如何转译为现代 Web 设计",
    "常见误区",
    "审查问题",
    "参考与延伸阅读"
  ];

  for (const [index, principle] of principles.entries()) {
    const markdown = await readFile(files[index], "utf8");
    for (const value of [
      principle.id,
      principle.nameZh,
      principle.nameEn,
      principle.reviewQuestionZh,
      ...headings
    ]) {
      assert.match(markdown, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  }
});

test("foundation pages link to the Design Tokens documentation", async () => {
  const files = CHINESE_CONTENT_FILES.filter((file) =>
    /docs\/foundations\/(color|space|typography|surface|motion)\.md/.test(file)
  );
  for (const file of files) {
    const markdown = await readFile(file, "utf8");
    assert.match(markdown, /design-tokens\//, `${file} must link to Design Tokens`);
  }
});

test("English entry content and README links are complete", async () => {
  const files = [
    "docs/en/manifesto.md",
    "docs/en/core-principles.md",
    "docs/en/usage.md"
  ];
  for (const file of files) await access(file);

  const readme = await readFile("README.md", "utf8");
  for (const link of [
    "docs/manifesto/zh.md",
    "docs/en/manifesto.md",
    "docs/en/core-principles.md",
    "docs/en/usage.md"
  ]) {
    assert.match(readme, new RegExp(link.replaceAll("/", "\\/")));
  }
});

test("prompt templates share the required structure and review sources", async () => {
  const webDesignPrompts = [
    "prompts/web-design/from-brief.md",
    "prompts/web-design/rewrite-existing-page.md"
  ];
  const reviewPrompts = [
    "prompts/design-review/review-page.md",
    "prompts/design-review/compare-default-and-songstyle.md"
  ];
  const requiredSections = [
    "Assumptions / 假设",
    "Information hierarchy / 信息层级",
    "Removal decisions / 删减决策",
    "Visual direction / 视觉方向",
    "Implementation constraints / 实现约束",
    "Review / 审查"
  ];

  for (const file of [...webDesignPrompts, ...reviewPrompts]) {
    const markdown = await readFile(file, "utf8");
    for (const section of requiredSections) assert.match(markdown, new RegExp(section.replace("/", "\\/")));
    assert.match(markdown, /\/checklist\//);
  }

  for (const file of webDesignPrompts) {
    const markdown = await readFile(file, "utf8");
    assert.match(markdown, /\/principles\//);
  }

  const review = JSON.parse(
    await readFile("checklists/songstyle-review.json", "utf8")
  );
  for (const file of reviewPrompts) {
    const markdown = await readFile(file, "utf8");
    for (const dimension of review.dimensions) assert.match(markdown, new RegExp(dimension.nameZh));
  }
});

test("portable Agent Skills have valid metadata and generated references", async () => {
  const skillNames = [
    "songstyle-web-designer",
    "songstyle-design-reviewer"
  ];
  const principles = JSON.parse(
    await readFile("docs/principles/principles.json", "utf8")
  );
  const review = JSON.parse(
    await readFile("checklists/songstyle-review.json", "utf8")
  );

  for (const skillName of skillNames) {
    const skillFile = `skills/${skillName}/SKILL.md`;
    const markdown = await readFile(skillFile, "utf8");
    const data = parseFrontmatter(markdown, skillFile);
    assert.equal(data.name, skillName);
    assert.match(data.name, /^[a-z0-9-]+$/);
    assert.ok(data.description && data.description.length <= 1024);
    assert.equal(data.license, "MIT");
    assert.match(markdown, /references\/songstyle-principles\.md/);
    assert.match(markdown, /references\/review-model\.md/);

    const principleReference = await readFile(
      `skills/${skillName}/references/songstyle-principles.md`,
      "utf8"
    );
    const reviewReference = await readFile(
      `skills/${skillName}/references/review-model.md`,
      "utf8"
    );
    for (const principle of principles) assert.match(principleReference, new RegExp(principle.id));
    for (const dimension of review.dimensions) assert.match(reviewReference, new RegExp(dimension.id));
  }
});

test("lifestyle case-study source exists", async () => {
  await access("examples/lifestyle-brand/baiting.md");
});

test("digital product case-study source exists", async () => {
  await access("examples/digital-product/qingxu.md");
});

test("evidence-first redesign assets and collaboration files exist", async () => {
  const files = [
    "ROADMAP.md",
    "docs/research/first-round-user-testing.md",
    "docs/references/image-generation-prompts.md",
    ".github/ISSUE_TEMPLATE/bug-report.yml",
    ".github/ISSUE_TEMPLATE/usage-feedback.yml",
    ".github/ISSUE_TEMPLATE/case-study-proposal.yml",
    ".github/ISSUE_TEMPLATE/design-discussion.yml",
    ".github/ISSUE_TEMPLATE/config.yml",
    "website/src/data/cases.ts",
    "website/public/assets/cases/baiting-carafe.webp",
    "website/public/assets/cases/qingxu-research.webp"
  ];

  for (const file of files) {
    await assert.doesNotReject(access(file), `Missing redesign asset: ${file}`);
  }
});

test("mobile showcase redesign assets and components exist", async () => {
  const files = [
    "docs/references/song-aesthetics-digital-design-research.md",
    "docs/assets/mobile-showcase-baiting.png",
    "docs/assets/mobile-showcase-qingxu.png",
    "website/src/components/examples/PhoneFrame.astro",
    "website/src/components/examples/MobileSiteComparison.astro",
    "website/src/components/examples/BaitingDefaultMobile.astro",
    "website/src/components/examples/BaitingSongStyleMobile.astro",
    "website/src/components/examples/QingxuDefaultMobile.astro",
    "website/src/components/examples/QingxuSongStyleMobile.astro",
    "website/src/components/home/MobileShowcasePreview.astro",
    "website/src/components/home/SongAestheticFramework.astro"
  ];

  for (const file of files) {
    await assert.doesNotReject(access(file), `Missing mobile showcase file: ${file}`);
  }
});

test("research summary and README expose the digital SongStyle framework", async () => {
  const research = await readFile(
    "docs/references/song-aesthetics-digital-design-research.md",
    "utf8"
  );
  for (const term of [
    "系统性应用研究几乎空白",
    "格物致知",
    "三远法",
    "宋版书",
    "汝窑",
    "留白生意",
    "器以载道",
    "未经独立验证"
  ]) {
    assert.match(research, new RegExp(term), `Research summary is missing: ${term}`);
  }

  const readme = await readFile("README.md", "utf8");
  for (const term of [
    "Digital SongStyle Framework",
    "same brief",
    "same copy",
    "same image",
    "same CTA",
    "same goal",
    "docs/assets/mobile-showcase-baiting.png",
    "docs/assets/mobile-showcase-qingxu.png"
  ]) {
    assert.match(readme, new RegExp(term, "i"), `README is missing: ${term}`);
  }
});

test("case data declares mobile website briefs and SongStyle mappings", async () => {
  const data = await readFile("website/src/data/cases.ts", "utf8");
  for (const term of [
    "comparisonInvariants",
    "same brief",
    "same copy",
    "same image",
    "same CTA",
    "same goal",
    "businessGoal",
    "mobileBrief",
    "near",
    "middle",
    "far",
    "songMappings"
  ]) {
    assert.match(data, new RegExp(term), `Case data is missing: ${term}`);
  }
});

test("README explains the fair comparison contract", async () => {
  const readme = await readFile("README.md", "utf8");
  for (const term of ["same copy", "same image", "same features", "same goal"]) {
    assert.match(readme, new RegExp(term, "i"), `README is missing: ${term}`);
  }
});

test("Chinese heading readability rule is enforced across guidance and generated references", async () => {
  const requiredPhrase = "中文标题可读性";
  const files = [
    "docs/foundations/typography.md",
    "docs/references/song-aesthetics-digital-design-research.md",
    "checklists/songstyle-review.md",
    "checklists/songstyle-review.json",
    "docs/principles/principles.json",
    "prompts/web-design/from-brief.md",
    "prompts/web-design/rewrite-existing-page.md",
    "prompts/design-review/review-page.md",
    "prompts/design-review/compare-default-and-songstyle.md",
    "skills/songstyle-web-designer/references/songstyle-principles.md",
    "skills/songstyle-web-designer/references/review-model.md",
    "skills/songstyle-design-reviewer/references/songstyle-principles.md",
    "skills/songstyle-design-reviewer/references/review-model.md"
  ];

  for (const file of files) {
    const content = await readFile(file, "utf8");
    assert.match(content, new RegExp(requiredPhrase), `${file} is missing ${requiredPhrase}`);
  }
});

test("community validation files request context and evidence", async () => {
  const roadmap = await readFile("ROADMAP.md", "utf8");
  const userTesting = await readFile("docs/research/first-round-user-testing.md", "utf8");
  assert.match(roadmap, /v0\.2 Focus/);
  assert.match(roadmap, /Evidence And Community Validation/);
  assert.match(userTesting, /不预设 SongStyle 有效/);
  assert.match(userTesting, /相同的\s*业务目标、必要内容与可用性要求/);

  for (const file of [
    ".github/ISSUE_TEMPLATE/bug-report.yml",
    ".github/ISSUE_TEMPLATE/usage-feedback.yml",
    ".github/ISSUE_TEMPLATE/case-study-proposal.yml",
    ".github/ISSUE_TEMPLATE/design-discussion.yml"
  ]) {
    const form = YAML.parse(await readFile(file, "utf8"));
    assert.ok(form.name, `${file} is missing a name`);
    assert.ok(form.description, `${file} is missing a description`);
    assert.ok(Array.isArray(form.body), `${file} is missing form body`);
    assert.match(JSON.stringify(form), /evidence/i, `${file} must request evidence`);
  }
});

test("v0.1 executable and case-study assets are present", async () => {
  const files = [
    "design-tokens/dist/songstyle.css",
    "design-tokens/dist/songstyle.resolved.json",
    "prompts/web-design/from-brief.md",
    "prompts/web-design/rewrite-existing-page.md",
    "prompts/design-review/review-page.md",
    "prompts/design-review/compare-default-and-songstyle.md",
    "skills/songstyle-web-designer/SKILL.md",
    "skills/songstyle-web-designer/references/songstyle-principles.md",
    "skills/songstyle-web-designer/references/review-model.md",
    "skills/songstyle-design-reviewer/SKILL.md",
    "skills/songstyle-design-reviewer/references/songstyle-principles.md",
    "skills/songstyle-design-reviewer/references/review-model.md",
    "examples/lifestyle-brand/baiting.md",
    "examples/digital-product/qingxu.md",
    "examples/comparisons/overview.md",
    "docs/en/manifesto.md",
    "docs/en/core-principles.md",
    "docs/en/usage.md"
  ];
  for (const file of files) await access(file);
});

test("saved evaluations use the required evidence structure", async () => {
  const files = [
    "evals/results/lifestyle-landing.md",
    "evals/results/digital-product-landing.md",
    "evals/results/necessary-density.md",
    "evals/results/overdecorated-existing-page.md",
    "evals/results/website-review.md"
  ];
  const sections = [
    "Brief",
    "Asset under test",
    "Required preservation",
    "Risk detection",
    "Shared checklist",
    "Verdict"
  ];
  for (const file of files) {
    const markdown = await readFile(file, "utf8");
    for (const section of sections) assert.match(markdown, new RegExp(section));
    assert.match(markdown, /PASS/);
  }
  await access("docs/guides/evaluations.md");
});

test("CI and GitHub Pages workflows exist", async () => {
  await access(".github/workflows/ci.yml");
  await access(".github/workflows/deploy.yml");
});

const FOUNDATION_HARDENING_DOCS = [
  {
    file: "docs/principles/priority-and-tradeoffs.md",
    route: "/principles/priority-and-tradeoffs/",
    terms: ["硬约束", "任务目标", "信息秩序", "审美表达", "冲突裁决"]
  },
  {
    file: "docs/foundations/information-distance.md",
    route: "/foundations/information-distance/",
    terms: ["近景", "中景", "远景", "三远法", "信息距离"]
  },
  {
    file: "docs/foundations/accessibility-alignment.md",
    route: "/foundations/accessibility-alignment/",
    terms: ["WCAG", "对比度", "焦点状态", "低饱和", "温润但合规"]
  },
  {
    file: "docs/guides/necessary-density-boundary.md",
    route: "/guides/necessary-density-boundary/",
    terms: ["必要密度", "产品落地页", "数据或专家工具", "交易页面", "不能隐藏必要信息"]
  }
];

test("foundation hardening public docs expose the decision model", async () => {
  for (const doc of FOUNDATION_HARDENING_DOCS) {
    const markdown = await readFile(doc.file, "utf8");
    const data = parseFrontmatter(markdown, doc.file);
    assert.equal(data.route, doc.route, `${doc.file} has wrong route`);
    assert.equal(data.lang, "zh-CN", `${doc.file} must be Chinese source material`);
    for (const term of doc.terms) {
      assert.match(markdown, new RegExp(term), `${doc.file} is missing ${term}`);
    }
  }
});

test("foundation hardening docs are linked from existing entry pages", async () => {
  const principles = await readFile("docs/principles/index.md", "utf8");
  const foundations = await readFile("docs/foundations/index.md", "utf8");
  const guide = await readFile("docs/guides/from-brief-to-web-design.md", "utf8");

  assert.match(principles, /priority-and-tradeoffs\//);
  assert.match(foundations, /information-distance\//);
  assert.match(foundations, /accessibility-alignment\//);
  assert.match(guide, /硬约束检查/);
  assert.match(guide, /近景.*中景.*远景/s);
  assert.match(guide, /priority-and-tradeoffs\//);
  assert.match(guide, /necessary-density-boundary\//);
  assert.match(guide, /information-distance\//);
});

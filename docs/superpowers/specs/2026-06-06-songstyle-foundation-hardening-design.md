# SongStyle Foundation Hardening Design

## Design Specification

- Status: Pending written-spec review
- Date: 2026-06-06
- Author: RobbyShao-8ag
- Target release: v0.2 foundation iteration
- Target repository: `RobbyShao-8ag/songstyle-ai-design-system`
- Source input: user review and GLM 5.0 foundation critique

## 1. Summary

SongStyle v0.1 has a working public site, core principles, review checklist,
design tokens, prompts, portable skills, examples, and regression tests. The
main weakness is no longer missing material. The weakness is that several
important rules remain expressed as guidance rather than as a stable decision
system.

This iteration hardens the foundation so SongStyle can guide both people and AI
agents when aesthetic principles conflict with usability, accessibility,
truthfulness, conversion, or Chinese readability. The result should be a more
executable design language, not a larger documentation archive.

## 2. Diagnosis

The GLM critique is directionally correct: the project needs clearer tradeoff
rules, more concrete translation of Song aesthetic concepts, stronger
evaluation rubrics, and stronger technical constraints. The recommended
implementation should be adjusted in two ways.

First, SongStyle should not use a simple linear priority list such as
`usability > truthfulness > whitespace > resonance`. Some principles, such as
`少而有序` and `平淡见真`, can be hard constraints depending on context. A more
accurate model is layered:

1. Hard constraints: accessibility, readability, required content, truthful
   representation, technical feasibility, and legal or business requirements.
2. Page goal and user task: the primary reason this page or interface exists.
3. Information order: near, middle, and far information relationships.
4. Aesthetic expression: whitespace, restraint, warmth, suggestion, material,
   and cultural resonance.

Second, not every rule belongs in design tokens. Tokens should describe reusable
values that code can consume. Review rules, forbidden patterns, conflict
resolution, and decision records should live in principles, foundations, guides,
checklists, prompts, skills, and tests. Token metadata can explain usage, but it
should not become the only carrier of design judgment.

## 3. Goals

1. Give SongStyle a clear conflict-resolution model for common design tradeoffs.
2. Translate `三远法` into concrete information architecture rules for modern
   web and interface work.
3. Define hard boundaries for Chinese heading readability, accessibility, and
   necessary information density.
4. Make the review checklist more reproducible by adding concrete score
   criteria and critical failures.
5. Ensure prompts and portable skills inherit the same decision model.
6. Add content tests so new foundation rules do not remain isolated in one
   document.
7. Keep the scope focused on foundation quality, not broad case-study expansion.

## 4. Non-Goals

This iteration will not add:

- A new production component library.
- A Figma plugin or design-token export pipeline for third-party tools.
- New large visual case studies beyond small documentation examples if needed.
- Full English parity for every new Chinese foundation document.
- A philosophical encyclopedia of Song dynasty art history.
- Runtime automation that claims to objectively judge aesthetic quality.

English entry pages should remain current, but deep English parity can follow
after the Chinese foundation stabilizes.

## 5. GLM Recommendation Disposition

The GLM critique is treated as useful input, not as a literal implementation
plan. The following items are adopted for this iteration:

- Principle priority and conflict resolution.
- Operational `三远法` mapping.
- Chinese heading readability boundaries.
- Accessibility and low-saturation color alignment.
- Necessary information density boundaries.
- Concrete review scoring criteria.
- Decision-record template.
- Misconceptions and anti-patterns.
- Prompt and skill checkpoints.

The following items are adjusted:

- Principle priority becomes a layered constraint model, not a single linear
  ranking.
- Chinese heading readability becomes a typography, checklist, prompt, skill,
  and test rule. It may use token support, but tokens are not the source of
  truth for forbidden break patterns.
- Color and space token usage guidance starts in foundation docs and semantic
  token descriptions. A separate usage-token file is only justified if it
  produces reusable values.

The following items are deferred:

- Full English depth parity for every new foundation page.
- Multiple new success case studies.
- Large visual relationship diagrams.
- A full automated aesthetic scoring engine.

These deferred items remain valid, but they should follow once the decision
model is stable enough to avoid duplicated rework.

## 6. Foundation Model

### 6.1 Constraint Layers

SongStyle decisions should be judged in this order:

1. **Hard constraints** must not be broken. These include accessibility
   contrast, readable text, meaningful focus states, complete required content,
   truthful claims, clear primary action, and Chinese heading readability.
2. **Task fit** must remain intact. A product page, data dashboard, editorial
   article, and campaign page should not apply the same density or expression
   strength.
3. **Information distance** should organize the page. Near information gives
   the user immediate orientation and action. Middle information supplies proof,
   detail, and comparison. Far information creates atmosphere, long-term
   meaning, and brand resonance.
4. **Aesthetic expression** should refine the result. Whitespace, restraint,
   warmth, suggestion, tonal color, material texture, and stopping rules are
   valuable only when they strengthen the upper layers.

This model preserves SongStyle's aesthetic ambition while preventing common
failure modes: empty interfaces, unreadable titles, vague CTAs, inaccessible
soft colors, and decorative cultural shortcuts.

### 6.2 Principle Tradeoffs

The project should add a dedicated principle tradeoff document:

- `docs/principles/priority-and-tradeoffs.md`

It should define:

- Hard constraints versus soft preferences.
- Common conflict pairs.
- Required resolution behavior.
- Examples of acceptable and unacceptable compromises.

Required conflict cases:

- `留白生意` versus necessary information density.
- `含蓄留韵` versus clear explanation.
- `温润可亲` versus accessibility contrast.
- `克制有度` versus conversion or task completion.
- `秩序而非符号` versus brand demands for cultural expression.
- Chinese title composition versus decorative narrow columns.

## 7. Information Distance

SongStyle should make `三远法` operational for digital design through:

- `docs/foundations/information-distance.md`

The document should define:

- **Near distance / 近景:** headline, primary task, product, CTA, key state,
  or first decision. It should be visible early and carry the strongest
  hierarchy.
- **Middle distance / 中景:** evidence, features, specs, proof, quotes,
  workflow relationships, objections, or supporting controls. It should explain
  and support without competing with the near layer.
- **Far distance / 远景:** brand story, philosophy, atmosphere, long-term
  promise, background context, or secondary exploration. It can be delayed,
  quieter, and more suggestive.

This should not become a rigid component recipe. It should be a repeatable
information model that can apply to landing pages, product pages, content
pages, and tools.

The first implementation should update existing guides, prompts, and skill
references so `Information hierarchy / 信息层级` explicitly asks for near,
middle, and far classification.

## 8. Hard Boundaries

### 8.1 Chinese Heading Readability

The current project already treats Chinese heading readability as a hard
constraint. This iteration should formalize the standard.

Update:

- `docs/foundations/typography.md`
- `checklists/songstyle-review.md`
- `checklists/songstyle-review.json`
- relevant prompts and skill references

Rules:

- Display Chinese headings should avoid decorative narrow columns.
- Heading containers should not force single-character hanging lines in ordinary
  responsive states.
- Line breaks should preserve semantic phrases where the layout controls the
  break.
- Large display sizes must be paired with enough line width and line height.
- Whitespace may frame a title, but it may not fragment reading.

Implementation should not over-specify this only as tokens. A small token or
metadata addition may be useful, but review rules and tests are the primary
home.

### 8.2 Accessibility Alignment

Add:

- `docs/foundations/accessibility-alignment.md`

This document should define how SongStyle's warm, low-saturation palette stays
usable:

- Primary body text must use high-contrast text tokens.
- Muted text is only for genuinely secondary content and must not carry
  required action or legal meaning.
- CTA, focus, error, and destructive states must remain visually distinct.
- Warmth cannot be achieved by lowering text contrast below accessible
  thresholds.
- Decorative low-contrast surfaces cannot replace structural affordances.

The implementation should add at least one automated test that verifies
documented color-token combinations include contrast guidance. A full contrast
engine is not required for this pass unless it can be added cleanly.

### 8.3 Necessary Density Boundary

Add:

- `docs/guides/necessary-density-boundary.md`

This guide should define the minimum information that must survive SongStyle
translation by context:

- Brand or campaign page: proposition, audience relevance, proof, next action.
- Product landing page: value proposition, product facts, price or path to
  purchase if applicable, trust evidence, CTA.
- Content reading page: title, source, date if relevant, structure, navigation,
  reading comfort.
- Data or expert tool: task state, controls, feedback, dense but ordered data,
  error recovery.
- Transaction page: price, terms, primary action, risks, confirmation, support.

The guide should also define removal decisions as risk-bearing actions:
delete, defer, merge, preserve, or clarify. Required information can be
reordered or quieted, but not hidden for aesthetic effect.

## 9. Review Model

The existing checklist should be upgraded from short guidance to a more
reproducible review model.

Update:

- `checklists/songstyle-review.json`
- `checklists/songstyle-review.md`
- generated skill references

Each review dimension should gain:

- `scoreRubric`: concrete criteria for scores 0, 1, 2, 3, and 4.
- `criticalFailures`: conditions that cap the score or force remediation.
- `evidenceRequired`: what the reviewer must cite before scoring.

Example shape:

```json
{
  "id": "hierarchy-clarity",
  "scoreRubric": {
    "0": "Primary task, reading order, or required title is unclear.",
    "1": "Main priority exists but is repeatedly interrupted by competing emphasis.",
    "2": "Hierarchy is understandable but several elements compete or headings break poorly.",
    "3": "Primary, secondary, and supporting information are clear with minor issues.",
    "4": "Hierarchy is clear, composed, and explained through near/middle/far relationships."
  },
  "criticalFailures": [
    "Required action is not visible or understandable.",
    "Display Chinese heading is fragmented by decorative narrow layout."
  ],
  "evidenceRequired": [
    "Primary task",
    "First-screen reading order",
    "Heading line behavior"
  ]
}
```

The markdown checklist should remain readable for humans and not expose too
much raw JSON structure.

## 10. Decision Records

SongStyle prompts already ask for removal decisions. The project should add a
small decision-record template so AI and human designers use the same fields.

Add:

- `docs/guides/decision-record-template.md`

Required fields:

- Element or content item.
- Decision type: delete, defer, merge, preserve, clarify.
- Reason, tied to a principle or hard constraint.
- User or business risk.
- Accessibility or readability risk.
- Reversibility.
- Evidence needed to revisit the decision.

This should feed prompt output formats, but it should stay lightweight. The
goal is traceability, not bureaucracy.

## 11. Misconceptions And Anti-Patterns

The project should consolidate scattered "not this" guidance into one place.

Add:

- `docs/guides/misconceptions.md`
- `docs/guides/anti-patterns.md`

Required misconceptions:

- SongStyle is not generic minimalism.
- SongStyle is not ancient-style decoration.
- SongStyle is not deleting information.
- SongStyle is not low contrast.
- SongStyle is not calligraphy, seals, ink-wash backgrounds, or traditional
  patterns as default shortcuts.

Required anti-patterns:

- Empty prestige: large blank zones with no focusing, grouping, or pacing
  function.
- Broken Chinese titles: whitespace achieved by unreadable line breaks.
- Soft but inaccessible: low contrast presented as warmth.
- Cultural symbol stacking: decorative motifs replacing order and proportion.
- Over-restraint: CTA, proof, or required facts become too hidden.
- AI excess: gradients, badges, icons, and generated sections added only
  because they are easy to produce.

These files should be concise and connected back to the review model.

## 12. Design Tokens

Token changes should be limited and practical.

Recommended updates:

- Add usage metadata to semantic color tokens through `$description` or a
  small `$extensions.songstyle.usage` field if the compiler safely preserves or
  ignores it.
- Consider adding semantic typography aliases for Chinese display title usage
  only if they produce useful CSS variables.
- Add space usage guidance to `docs/foundations/space.md` first. A separate
  token source such as `space-usage.tokens.json` should only be added if it
  produces reusable values rather than prose disguised as tokens.

The design-token compiler currently emits token type, value, and description.
If richer metadata is added, the implementation must decide whether it belongs
in generated output. Do not silently add metadata that tests and documentation
cannot consume.

## 13. Prompt And Skill Integration

Foundation rules must reach AI workflows.

Update:

- `prompts/web-design/from-brief.md`
- `prompts/web-design/rewrite-existing-page.md`
- `prompts/design-review/review-page.md`
- `prompts/design-review/compare-default-and-songstyle.md`
- `skills/songstyle-web-designer/SKILL.md`
- `skills/songstyle-design-reviewer/SKILL.md`
- generated references from `scripts/build-skill-references.mjs`

Required behavior:

- Design prompts must classify information as near, middle, or far.
- Review prompts must identify hard-constraint failures before scoring.
- Removal decisions must use the decision-record fields.
- Review output must cite evidence for each score.
- Skills must instruct agents to stop adding visual elements when no user,
  business, accessibility, or meaning function is served.

Generated references should include the new score rubrics and critical failures
so portable skills do not drift from the source checklist.

## 14. Tests And Verification

Add or extend content tests in:

- `tests/content-assets.test.mjs`
- `tests/design-tokens.test.mjs` if token metadata changes

Tests should verify:

- New foundation files exist and have valid frontmatter where they are public
  docs.
- Priority and tradeoff guidance names the hard constraint model.
- Information-distance guidance contains near, middle, and far mappings.
- Necessary-density guidance covers at least product pages, content pages, data
  tools, and transaction pages.
- Review JSON includes `scoreRubric`, `criticalFailures`, and
  `evidenceRequired` for every dimension.
- Generated skill references include the expanded review model.
- Prompts include hard-constraint checks and decision-record fields.

Run:

- `npm run skills:build`
- `npm run tokens:build` if tokens change
- `npm run test:unit`
- `npm run build`
- `npm run verify` before final integration

## 15. Documentation Navigation

The new materials should be discoverable without overwhelming the homepage.

Update public navigation through existing frontmatter and route handling:

- Keep principles and foundations in their current sections.
- Put decision-record, necessary-density, misconceptions, and anti-patterns in
  guides.
- Add short cross-links from:
  - `docs/principles/index.md`
  - `docs/foundations/index.md`
  - `docs/guides/from-brief-to-web-design.md`
  - `docs/foundations/design-tokens.md` if token usage guidance changes.

The README should mention the hardened foundation only after implementation is
complete and verified. Do not make the README more crowded unless it improves
first-time comprehension.

## 16. Implementation Sequence

The implementation should be split into small commits:

1. Add the foundation documents for tradeoffs, information distance,
   accessibility alignment, and necessary density.
2. Expand the review JSON and markdown checklist with score rubrics, critical
   failures, and evidence requirements.
3. Add decision-record, misconceptions, and anti-pattern guides.
4. Update prompts and skill workflows to consume the new model.
5. Update generated skill references.
6. Add content and token tests.
7. Run full verification and commit generated outputs with their sources.

## 17. Acceptance Criteria

The foundation hardening is complete when:

- A designer can resolve common principle conflicts without asking which
  principle wins.
- An AI prompt must identify hard-constraint failures before applying
  SongStyle expression.
- `三远法` is usable as an information architecture tool, not only an aesthetic
  analogy.
- The checklist score for a page is more reproducible because each dimension
  has concrete scoring evidence.
- Chinese heading readability, accessibility contrast, and necessary density
  are treated as hard boundaries.
- Portable skills include the same expanded review rules as the source docs.
- Tests fail if the new foundation files, prompt references, or generated skill
  references drift out of sync.

## 18. Risks

- **Over-documentation:** Too many new pages can make the system harder to
  learn. Keep each page practical and cross-linked.
- **False precision:** Score rubrics improve consistency but cannot make
  aesthetic judgment fully objective. The docs should say this plainly.
- **Token misuse:** Adding prose-heavy token metadata can make tokens confusing.
  Keep tokens for reusable values and put judgment rules in docs/checklists.
- **Aesthetic dilution:** Hard constraints should not flatten SongStyle into
  generic usability rules. The information-distance and anti-pattern documents
  should preserve the project-specific aesthetic position.
- **Generated reference drift:** Skill reference generation must be updated so
  agents inherit the same rules.

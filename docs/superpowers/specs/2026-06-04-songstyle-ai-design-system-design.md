# SongStyle AI Design System / 宋式 AI 设计系统

## Design Specification

- Status: Proposed for user review
- Date: 2026-06-04
- Author: RobbyShao-8ag
- Target repository: `RobbyShao-8ag/songstyle-ai-design-system`
- Initial release: v0.1

## 1. Summary

SongStyle AI Design System is a creator-led open-source design system that
translates principles derived from Song-dynasty aesthetics into a modern,
executable design language for AI-generated websites and Web UI.

The project does not attempt to reproduce historical Song-dynasty visual
styles. It does not define Eastern design through decorative symbols such as
ink-wash backgrounds, seals, porcelain motifs, traditional patterns, or
calligraphic type. Instead, it focuses on the deeper design order behind a
restrained visual experience: limited information, deliberate spatial
relationships, functional negative space, warmth, clarity, and room for the
viewer to complete the meaning.

The central problem is:

> AI does not know when to stop.

The central response is:

> SongStyle teaches AI to establish order through limited expression and to
> leave resonance within unfilled space.

The long-term vision is to turn Song-dynasty aesthetics from a historical
style into a modern design language that AI can understand, execute, and
evaluate.

## 2. Project Position

### 2.1 What SongStyle Is

SongStyle is:

- A modern design methodology grounded in research and cultural context.
- A practical design system for websites and Web UI.
- A shared language for designers, product managers, front-end developers,
  and AI agents.
- A set of human-readable rules and machine-usable assets.
- An open project that begins with a clear personal point of view and grows
  through community contribution.

### 2.2 What SongStyle Is Not

SongStyle is not:

- A reconstruction of historical Song-dynasty design.
- A generic "ancient Chinese style" or "new Chinese style" asset library.
- A collection of decorative cultural symbols.
- A prompt library without underlying principles.
- A rule that all interfaces should have low information density.
- A reason to sacrifice usability, accessibility, business goals, or truthful
  communication.

### 2.3 Cultural Position

The project uses historical material and scholarship as a foundation, then
states clearly when it performs a modern design translation. It does not claim
that its digital patterns existed in the Song dynasty or that it represents
the only valid interpretation of Song aesthetics.

Core cultural claims must be supported by concise references and further
reading. The project is a design system, not an academic research archive, so
references should establish credibility without overwhelming practical use.

### 2.4 Creator-Led Identity

The project is initially presented as a personal open-source work by
RobbyShao-8ag. The creator's aesthetic position should be visible in the
manifesto, editorial voice, and reference implementation. Contribution rules
remain open so the project can develop into a broader community resource
without losing its original thesis.

## 3. Design Thesis

Song-dynasty aesthetics can appear to contain little information and large
amounts of empty space, yet the remaining information and spatial arrangement
produce a highly refined sense of design. This beauty can often be felt before
it is explained. The project therefore pursues a form of advanced aesthetic
order that can be perceived across differences in education, artistic
training, and cultural background.

Negative space is not an absence of work. It gives the viewer time and room to
form associations, allowing the work to continue beyond what is explicitly
shown. SongStyle does not reduce content for minimalism's sake. It reduces,
organizes, and stops only when every remaining element earns its place.

## 4. Core Principles

The core layer is adaptable to different brands and industries. A design does
not need to look historical or use the SongStyle reference palette to follow
these principles.

### 4.1 少而有序 / Less, With Order

Reducing information is not the goal. The goal is to create clear, stable, and
meaningful relationships among the information that remains.

Design question:

> If this element is removed, does the user's understanding become worse?

### 4.2 留白生意 / Space Creates Meaning

Negative space is an active design element used for focus, rhythm, breathing,
and association. Empty space without purpose is not SongStyle.

Design question:

> What function does this space perform?

### 4.3 克制有度 / Restraint Knows Its Measure

When information, color, decoration, and motion have completed their task, the
design should stop. Additional expression must justify its cost.

Design question:

> Is this addition improving meaning, or only proving that more can be added?

### 4.4 平淡见真 / Quietness Reveals Truth

The design should not depend on intense stimulation or visual tricks. It
builds value through truthful content, accurate structure, and long-term
readability.

Design question:

> Would this still feel valuable after the first visual impression?

### 4.5 温润可亲 / Warmth Makes Technology Approachable

Digital products do not need to feel cold. Color, material, light, motion, and
language should give technology a trustworthy human scale.

Design question:

> Does the interface feel calm and credible without becoming vague?

### 4.6 含蓄留韵 / Suggestion Leaves Resonance

The design should not explain every meaning at once. It leaves room for
understanding, imagination, and later discovery without hiding necessary
information.

Design question:

> What can be suggested rather than fully stated?

## 5. Two-Layer Design System

### 5.1 Core Layer: Adaptable Principles

The core layer contains principles, review questions, content hierarchy rules,
and decision-making methods. It can be applied to modern brands without making
every product share one visual skin.

### 5.2 Expression Layer: SongStyle Reference Language

The expression layer gives the project a recognizable public identity and
provides concrete examples. It is a reference implementation, not a mandatory
brand template.

The reference language includes:

- Low-saturation relationships among porcelain white, ink tones, mist gray,
  celadon, and restrained accent colors.
- Spacious grids, deliberate content widths, and larger-than-default spacing.
- Clear Chinese typography and considered Chinese-English pairing.
- Low-contrast boundaries, weak shadows, and calm transitions.
- Limited material details inspired by paper, objects, and natural light.
- Explicit rejection of high-saturation "national trend" styling, decorative
  symbol stacking, aggressive marketing typography, and excessive motion.

## 6. Target Users

### 6.1 Primary Users

- Designers who want to apply SongStyle principles to modern Web design.
- Product managers who need to define hierarchy, emphasis, and content
  reduction before visual design begins.
- Front-end developers who need design variables, reference patterns, and
  implementation examples.

### 6.2 Core Execution User

AI agents are a core execution user. The project must allow agents such as
Codex and ChatGPT to generate, review, and improve Web designs using the same
principles that humans read.

## 7. v0.1 Scope

v0.1 focuses on websites and Web UI. Mobile apps, brand visuals, and AI images
may appear as supporting examples, but they are not developed to equal depth.

### 7.1 Included

- A Chinese manifesto and complete Chinese documentation.
- Concise English coverage for the README, manifesto, core principles, and
  installation or usage instructions.
- Core principles with concise references and further reading.
- Design foundations for color, spacing, typography, shape, boundaries,
  shadow, and motion.
- Machine-readable Design Tokens and generated CSS Variables.
- Structured prompts for Web design and design review.
- Two Agent Skills for Web design and design review.
- A shared SongStyle review checklist.
- A small set of reference UI patterns and complete page examples.
- A static documentation website that is itself a complete SongStyle example.
- Two fictional-brand case studies: one lifestyle brand and one modern digital
  product.
- Before-and-after comparisons between ordinary AI defaults and SongStyle
  decisions.

### 7.2 Excluded

- A production-grade component library.
- A published framework-specific UI package with compatibility guarantees.
- An online AI generator.
- User accounts, a database, or an administrative backend.
- A Figma plugin.
- An MCP server.
- A full academic research archive.
- A claim of historical reconstruction.

## 8. Success Criteria

v0.1 succeeds when it can demonstrate all of the following:

1. A user can start from a product brief and produce a coherent SongStyle Web
   design proposal.
2. An AI agent can generate and review a page using the same documented
   principles and review dimensions.
3. A reader can explain why SongStyle is not equivalent to ancient style,
   ink-wash decoration, or low information density.
4. Before-and-after comparisons show a clear improvement in hierarchy,
   restraint, functional negative space, and visual longevity.
5. The lifestyle and digital-product examples demonstrate that the method is
   not limited to traditional cultural subjects.
6. The documentation website consumes the project's own Design Tokens and
   passes its own SongStyle review checklist.

The two core verifiable outcomes are:

- Humans can generate a SongStyle Web design proposal from a product brief.
- AI agents can consistently generate and review pages against the system.

## 9. Repository Architecture

The project uses one main repository with internally modular content. The
public brand remains unified while users can consume only the modules they
need.

```text
songstyle-ai-design-system/
├── README.md
├── LICENSE-CODE
├── LICENSE-CONTENT
├── CONTRIBUTING.md
├── docs/
│   ├── manifesto/
│   ├── principles/
│   ├── foundations/
│   ├── references/
│   ├── guides/
│   └── en/
├── design-tokens/
│   ├── source/
│   └── dist/
├── prompts/
│   ├── web-design/
│   └── design-review/
├── skills/
│   ├── songstyle-web-designer/
│   └── songstyle-design-reviewer/
├── checklists/
├── examples/
│   ├── lifestyle-brand/
│   ├── digital-product/
│   └── comparisons/
├── packages/
│   └── reference-ui/
└── website/
```

### 9.1 Module Responsibilities

- `docs/` explains why the system exists, what SongStyle means, and how
  historical ideas are translated into modern decisions.
- `design-tokens/` contains machine-readable design variables and generated
  outputs. Public language always uses "Design Tokens / 设计变量" rather than
  the ambiguous standalone word "tokens."
- `prompts/` contains structured templates that ordinary users can copy and
  adapt.
- `skills/` contains agent workflows, not just prompt text.
- `checklists/` contains the normative review model shared by humans, prompts,
  and skills.
- `examples/` demonstrates the system through complete design decisions and
  before-and-after comparisons.
- `packages/reference-ui/` contains a small, non-production reference
  implementation used to prove that the Design Tokens can be applied in code.
- `website/` presents the project and acts as the first complete reference
  implementation.

### 9.2 Source-of-Truth Rules

- `docs/principles/` is the source of truth for the six principles.
- `checklists/` is the source of truth for review dimensions and scoring.
- `design-tokens/source/` is the source of truth for visual design variables.
- Generated CSS Variables live in `design-tokens/dist/` and must not be edited
  manually.
- Prompts, skills, examples, and the website reference these sources rather
  than creating independent versions of the same rules.

## 10. Documentation Architecture

### 10.1 Chinese Content

Chinese is the complete content source. It includes:

- Manifesto.
- Core principles.
- Design foundations.
- Historical references and modern translations.
- Web design guides.
- Prompt and Skill usage.
- Review checklist.
- Case studies.
- Contribution guidance.

### 10.2 English Content

English content provides an international open-source entry point without
requiring full v0.1 translation parity. It includes:

- README.
- Manifesto.
- Core principles.
- Installation and usage instructions.

English content is maintained independently rather than produced through
unreviewed automatic translation, because key aesthetic concepts can lose
meaning when translated mechanically.

### 10.3 Rule Page Template

Each principle or foundation page should answer:

1. What does this mean?
2. Why does it matter?
3. How does it translate into modern Web design?
4. How should humans and AI use it?
5. What are common mistakes?
6. What questions should a reviewer ask?
7. What references support the cultural context?

## 11. Documentation Website

The website uses a dual experience: exhibition-like expression for the home
and case-study pages, and efficient documentation structure for practical use.

### 11.1 Home and Case Studies: Digital Aesthetic Exhibition

The home page begins with one central statement rather than a dense product
navigation surface:

> AI 不懂得何时停止。<br>
> 宋式设计，在有限表达中建立秩序，在留白之中留下余韵。

The scrolling sequence presents:

1. Why AI-generated design tends toward excess.
2. How SongStyle changes the question from "What else can be added?" to "What
   is already enough?"
3. The six core principles.
4. Before-and-after comparisons.
5. The lifestyle-brand and digital-product examples.
6. Entry points to prompts, skills, Design Tokens, and the review checklist.

### 11.2 Documentation Pages: Clear and Efficient

Documentation pages use:

- Stable side navigation.
- Clear heading hierarchy.
- Copyable code and prompts.
- Direct links between human explanations and machine-readable assets.
- Practical examples and review questions.

### 11.3 Required Public Pages

- Home.
- Manifesto.
- Core principles.
- Design foundations.
- From brief to SongStyle Web design guide.
- Design Tokens / 设计变量.
- Prompts.
- Agent Skills.
- Review checklist.
- Lifestyle-brand case study.
- Digital-product case study.
- Before-and-after comparisons.
- Contribution guide.

## 12. Case Studies

The first two case studies use fictional brands so the examples remain neutral,
reusable, and clearly separate from any one commercial brand.

### 12.1 Lifestyle Brand

Purpose:

- Demonstrate cultural warmth without relying on ancient-style decoration.
- Show how product, scene, material, and language can create quiet value.

### 12.2 Modern Digital Product

Purpose:

- Demonstrate that SongStyle can apply to AI, SaaS, or tool products.
- Show that a modern technical interface can feel clear, warm, and restrained
  without appearing historical.

### 12.3 Case Study Structure

Each case study includes:

1. Product brief and business goal.
2. Ordinary AI default proposal.
3. Diagnosis of the default proposal.
4. SongStyle decisions: what is removed, reorganized, softened, or left open.
5. Final page example.
6. Review checklist results.
7. Implementation notes.

Case-study brand names and copy are editorial details, not normative parts of
the design system.

## 13. Executable Assets

### 13.1 Design Tokens / 设计变量

`design-tokens/` provides structured source files and generated CSS Variables
for:

- Background, text, boundary, accent, and state colors.
- A more spacious but still systematic spacing scale.
- Chinese body text, headings, numerals, and Chinese-English typography.
- Radius, border, and shadow.
- Motion duration, easing, entry behavior, and reduced-motion behavior.

The system must also define prohibited or discouraged patterns, including
strong bounce, explosive scale, decorative particles, unnecessarily deep
shadows, and high-saturation visual noise.

### 13.2 Prompts

Prompts are structured templates for ordinary users:

- Generate a SongStyle Web design proposal from a product brief.
- Rewrite an existing page using SongStyle principles.
- Review a page screenshot or written description.
- Compare an ordinary AI proposal with a SongStyle proposal.

Prompt outputs must include assumptions, information hierarchy, removal
decisions, visual direction, implementation constraints, and review questions.

### 13.3 Agent Skills

The initial release includes:

#### `songstyle-web-designer`

Workflow:

1. Understand the product goal, users, content, and constraints.
2. Identify what information is necessary.
3. Remove or defer information that does not support the page goal.
4. Establish hierarchy, rhythm, and functional negative space.
5. Select an appropriate SongStyle expression strength.
6. Produce a page proposal and implementation constraints.
7. Review the proposal before presenting it.

#### `songstyle-design-reviewer`

Workflow:

1. Understand the page goal and intended audience.
2. Review information necessity and hierarchy.
3. Distinguish functional negative space from empty space.
4. Identify excess color, decoration, motion, and cultural symbolism.
5. Check usability, accessibility, and business clarity.
6. Score the page using the shared review model.
7. Produce prioritized, executable improvements.

### 13.4 Shared Review Model

Humans, prompts, and skills use the same review dimensions:

- Is each piece of information necessary?
- Is the hierarchy clear?
- Does negative space have a function?
- Does the design stop at the appropriate moment?
- Does cultural character come from order rather than symbols?
- Does the page remain usable, accessible, truthful, and aligned with its
  business goal?

The system never assumes that "more empty" is automatically better.

## 14. Technical Architecture

### 14.1 Website Stack

The documentation website uses:

- Astro for a content-driven static site with flexible custom pages.
- TypeScript for reference components and build-time utilities.
- Markdown and MDX for maintainable documentation and community contribution.
- CSS Variables generated from `design-tokens/dist/`.

The site remains hosting-platform neutral and can be deployed to GitHub Pages
or Vercel.

### 14.2 Reference UI

`packages/reference-ui/` is a small reference implementation, not a
production-grade component library. It demonstrates semantic structure,
states, keyboard behavior, and direct use of the project's CSS Variables. The
website consumes these reference patterns so that the design variables are
tested in a real interface.

### 14.3 Content and Asset Flow

```text
Principles ───────┐
                  ├──> Guides, Prompts, Skills, Examples, Website
Review Checklist ─┤
                  │
Design Token Source ──> Validation ──> Generated CSS Variables ──> Reference UI
                                                               └──> Website
```

The website is not an independent visual interpretation. It is a consumer of
the same sources that external users and AI agents receive.

## 15. Failure Handling and Guardrails

### 15.1 Design Guardrails

- A SongStyle recommendation must not remove information required for task
  completion.
- A reviewer must distinguish intentional density from uncontrolled density.
- Accessibility and usability override aesthetic preference.
- Cultural references must be described as references or translations, not as
  historical facts unless supported.
- AI output must state assumptions when a brief lacks necessary context.
- Skills must challenge requests that equate SongStyle with decorative
  ancient-style symbols.

### 15.2 Build Guardrails

- Invalid Design Token source files fail validation.
- Generated files are reproducible and are not edited manually.
- Broken internal links and missing required pages fail the website build.
- The English core-page set is explicit, so partial English coverage is
  intentional rather than accidental.
- Reference examples must not depend on private services, secrets, or a
  backend.

## 16. Quality and Verification

### 16.1 Design Token Verification

- Validate source structure and required variable groups.
- Verify generated CSS Variables are reproducible.
- Verify the website and reference UI consume generated output.

### 16.2 Website Verification

- Build the static site successfully.
- Check desktop and mobile layouts.
- Check semantic structure and keyboard access.
- Check color contrast and reduced-motion behavior.
- Check internal links and required content pages.
- Review the site against the SongStyle checklist.

### 16.3 Prompt and Skill Verification

Use fixed evaluation briefs covering:

- A lifestyle-brand landing page.
- A modern digital-product landing page.
- A content-dense product surface where density is necessary.
- An existing page that overuses decoration and motion.

For each brief, verify that prompts and skills:

- Preserve necessary information and business goals.
- Make explicit removal and hierarchy decisions.
- Avoid decorative cultural shortcuts.
- Apply the shared review model.
- Produce prioritized, actionable recommendations.

### 16.4 Case Study Verification

Each case study must:

- Show the starting brief.
- Explain the weaknesses of the ordinary AI default.
- Explain the SongStyle decisions rather than only showing a prettier result.
- Pass the shared review checklist.
- Include enough implementation detail for a front-end developer to learn from
  it.

## 17. Licensing

To keep executable asset reuse and editorial content reuse clear:

- Code, build utilities, Design Token files, and reference UI are released
  under the MIT License in `LICENSE-CODE`.
- Prompts and skills are also released under the MIT License so they can be
  installed, adapted, and executed without content-license ambiguity.
- Documentation, examples, and visual case-study content are released under
  Creative Commons Attribution 4.0 International in `LICENSE-CONTENT`.

Contributors must agree that their contributions are provided under the
license applicable to the module they modify.

## 18. Release Boundary

v0.1 is complete when:

- The repository structure and contribution guidance exist.
- The Chinese manifesto, principles, foundations, guides, and checklist exist.
- The required English core pages exist.
- Design Token sources and generated CSS Variables exist.
- The four structured prompt templates and two Agent Skills are usable.
- The reference UI and both case studies exist.
- The static website presents the complete project and consumes its own
  generated assets.
- Verification described in this specification passes.

Future work may include a production component library, additional design
domains, a Figma plugin, an MCP server, or interactive AI tools. These are not
dependencies for v0.1.

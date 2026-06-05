# SongStyle Mobile Website Showcase Redesign

## Design Specification

- Status: Approved direction, pending written-spec review
- Date: 2026-06-05
- Author: RobbyShao-8ag
- Target release: v0.2 development iteration
- Target repository: `RobbyShao-8ag/songstyle-ai-design-system`
- Source research: `/Users/a1234/projects/empty/宋代美学指导现代设计_深度调研报告.md`

## 1. Summary

The current SongStyle site explains the idea clearly, but the visual result is
not yet strong enough. It proves restraint, yet it does not fully express the
high-level beauty the project wants to champion: Song painting composition,
Song printed-book rhythm, Ru-ware color, material tactility, functional
negative space, and a sense of quiet resonance.

This iteration upgrades the project from a documentation-led design system into
a visually convincing digital SongStyle showcase. The two fictional cases will
be rebuilt as complete mobile website designs, shown side by side on the same
page:

- Left: a plausible ordinary AI default mobile website.
- Right: a SongStyle mobile website based on the same brief and content.

The comparison must feel like two real sites built for the same client, not two
isolated cards. SongStyle should win by information order, spacing, typography,
color, material, image treatment, and appropriate stopping. It must not win by
deleting useful content or changing the business goal.

## 2. Diagnosis Of The Current Result

The current implementation is directionally correct but visually incomplete.

1. **It is a card comparison, not a website comparison.** The examples show
   components that sit inside a case page. They do not yet feel like actual
   mobile sites that a visitor could imagine using.
2. **The SongStyle side reads as modern minimalism more than Song aesthetics.**
   It uses calm surfaces and restraint, but it does not visibly translate Song
   compositional ideas such as "three distances", "one-corner" framing,
   sparse-dense rhythm, or the tone of Song printed pages.
3. **The negative space is pleasant but under-instrumented.** Space should do
   more than reduce visual noise. It should create pause, hierarchy, route, and
   imagination.
4. **The comparison is not immediate enough.** A first-time visitor should see
   two phone sites and instantly understand: same content, different judgment.

## 3. Research Inputs

The supplied research report identifies a valuable gap: Song aesthetics are
well discussed in interiors, product design, cultural products, architecture,
and exhibitions, but systematic application to UI, web, and app design is
nearly absent. This project should explicitly occupy that gap.

The report provides the following usable design sources:

- **Aesthetic foundations:** 格物致知, 道法自然, 天人合一, 器以载道, 生活即艺术.
- **Visual principles:** low-saturation harmony, "ink has five colors",
  30% or more breathing space, sparse-dense composition, simple geometry, and
  restrained line.
- **Digital analogies:** Ru-ware matte glaze as screen surface, paper and wood
  as micro-texture, ink wash as tonal gradients, crackle as controlled organic
  irregularity.
- **Operational rules:** color under control, decoration serving function,
  readable typography, subtle interaction, human-centered use, and resonance
  beyond explicit information.

The report's market statistics and web article claims should be treated as
background signals unless independently verified. The project may cite the
report as an internal research input, but public claims should remain
methodological rather than promotional.

## 4. Goals

1. Make the project visually impressive within the first 10 seconds of the
   homepage or examples page.
2. Turn Song aesthetics into a digital interface method, not a historical skin.
3. Rebuild Baiting and Qingxu as full mobile website comparisons using the same
   content and business requirements on both sides.
4. Make the SongStyle side clearly different from generic minimalism through
   specific Song-derived layout, color, typography, material, and space rules.
5. Keep ordinary AI versions plausible and professional, not mocked or broken.
6. Add the research report and its distilled framework to the project's
   reference and method pages.
7. Preserve accessibility, responsiveness, static-site simplicity, and the
   existing fair-comparison contract.

## 5. Non-Goals

This iteration will not add:

- A live site generator.
- A Figma plugin.
- User accounts, backend services, or analytics.
- Historical reconstruction of Song dynasty artifacts.
- Heavy animation, scroll-jacking, or inaccessible comparison sliders.
- Traditional motifs as default decoration.
- Claims that every cited network article or market number has been verified.

## 6. Core Experience

The new first impression should be:

> 同一份建站 Brief。左边是 AI 默认完成的移动网站，右边是 SongStyle 完成的移动网站。
> 内容没有变，审美判断变了。

The homepage should show a strong preview of this idea before the reader enters
long documentation. The examples pages should then show the full mobile-site
mockups in a stable side-by-side layout on desktop and a clear stacked layout on
small screens.

## 7. Song Aesthetics To Digital Interface Framework

The implementation should introduce a concise framework that maps Song
aesthetic concepts to interface decisions.

### 7.1 格物致知 / Observed Precision

Every visible element must have a reason. In the interface, this becomes:

- Fewer decorative layers.
- More precise type size, line length, and spacing choices.
- Product or workflow details presented with care instead of volume.
- Testable labels and content invariants.

### 7.2 三远法 / Information Distance

Song landscape "three distances" can become a digital information architecture:

- **Near distance:** the user's immediate task, product, or call to action.
- **Middle distance:** supporting facts, features, or workflow relationships.
- **Far distance:** brand atmosphere, long-term promise, or larger narrative.

The SongStyle mobile sites must visibly separate these distances. Ordinary AI
versions may flatten them into equal-weight sections, stacked cards, or
competing emphasis.

### 7.3 宋版书 / Typographic Rhythm

Song printed-book aesthetics should influence readable screen typography:

- Display type uses the existing Song-style serif direction where available.
- Body copy uses generous line-height and measured line length.
- Dense and sparse areas alternate intentionally.
- Headline breaks should feel composed, not merely responsive.
- Decorative calligraphy fonts are not required and should not reduce
  readability.

### 7.4 汝窑与墨分五彩 / Color And Tone

The SongStyle palette should move beyond generic beige minimalism:

- Primary ground: porcelain white, warm paper, pale mist gray.
- Secondary tone: Ru-ware celadon / sky blue, pale stone, muted clay.
- Accent: restrained indigo or cinnabar only in very small amounts.
- Tonal hierarchy should often come from lightness, material, and texture
  rather than saturated color.

The ordinary AI versions may use common high-energy gradients, saturated accent
colors, and excessive contrast while remaining usable.

### 7.5 留白生意 / Functional Breathing Space

Negative space must perform a job:

- It frames the main product or task.
- It separates near, middle, and far information.
- It creates rest before action.
- It prevents every detail from asking for attention at once.

For SongStyle mobile screens, the target is at least 30% perceived breathing
space across the initial viewport and key sections. This is a design target, not
a brittle pixel-level test.

### 7.6 器以载道 / Ornament Serves Use

Any line, texture, seal-like mark, border, gradient, or organic shape must
support a function: route, grouping, scale, tactility, or atmosphere. Decoration
that only announces "Chinese style" is out of scope.

### 7.7 温润可亲 / Warmth Without Noise

SongStyle is not cold minimalism. Interfaces should feel approachable through
warm neutrals, natural materials, readable rhythm, and clear human task flow.

## 8. Fair Mobile Website Comparison Contract

Each case will use one shared mobile-site brief and one shared content source.
Both versions must render the same:

- Brand name.
- Product or product category.
- Core headline.
- Supporting description.
- Primary image or image set.
- Primary CTA.
- Required sections.
- Feature/specification content.
- Business goal.

The visual versions may change:

- Section order when it clarifies the same goal.
- Layout and grouping.
- Typography, line breaks, and reading rhythm.
- Color, material, and background.
- Image crop and placement.
- Spacing and negative space.
- Card density, borders, dividers, and emphasis.
- Motion treatment if any motion remains subtle and accessible.

The SongStyle version must not remove required content. If content is tucked
away visually, it must still be accessible and visible in the same mobile site
mockup.

## 9. Display Pattern

Desktop and tablet case pages should show one comparison stage:

- A short case header with the shared brief and fairness statement.
- Two phone frames in a two-column grid.
- Left phone label: `AI 默认移动网站`.
- Right phone label: `SongStyle 移动网站`.
- A small invariant strip listing: same brief, same copy, same image, same CTA,
  same goal.
- A short analysis below the phones explaining what changed.

Mobile pages should stack the two phone frames vertically with persistent
labels. The comparison must not require horizontal scrolling.

The phone frame should have a consistent 390 x 844 visual ratio on desktop, but
must be responsive enough for smaller screens. The content inside the phone
should scroll visually as a full landing page composition, not just a cropped
card.

## 10. Case One: Baiting Mobile Website

### 10.1 Shared Brief

白汀 Baiting needs a mobile landing page for a contemporary glass water carafe.
The page must communicate material quality, daily use, calm trust, and a clear
path to purchase or product details.

Required content:

- Brand: 白汀 Baiting.
- Position: 日常饮水器物.
- Headline: 让水回到桌面，安静地成为日常。
- Description: a 1.2 L borosilicate glass carafe with a thin stable rim, wide
  opening, and comfortable daily use.
- Features: 高硼硅玻璃, 1.2 L, 宽口易清洁.
- Primary CTA: 查看器物与购买信息.
- Image: existing Baiting carafe editorial photograph.
- Business goal: make the carafe feel desirable, trustworthy, and easy to
  understand without fake luxury.

### 10.2 Ordinary AI Direction

The default mobile site should feel like a plausible AI-generated landing page:

- Hero with image overlay, gradient, badges, and strong CTA.
- Multiple equal-weight benefit cards.
- More saturated accent color.
- Dense feature blocks and repeated emphasis.
- Professional but visually busy.

It should not look broken, ugly, or unserious.

### 10.3 SongStyle Direction

The SongStyle mobile site should feel like a quiet product page shaped by Song
composition:

- Product image treated as an observed object, not a marketing background.
- Wide breathing space around the carafe.
- Warm paper or porcelain surface with subtle celadon tone.
- Headline broken like a composed inscription.
- Product specifications presented like calm annotations rather than cards.
- One fine line or tonal field may guide the eye.
- CTA appears after a pause, not as a loud button.

The result should evoke "器物、光、桌面、留白" without relying on calligraphy,
seals, or traditional motifs.

## 11. Case Two: Qingxu Mobile Website

### 11.1 Shared Brief

清序 Qingxu needs a mobile landing page for an AI research workspace. The page
must make the workflow legible: collect sources, synthesize findings, and share
a reviewable research narrative.

Required content:

- Brand: 清序 Qingxu.
- Position: AI 研究工作台.
- Headline: 从来源到叙事，让研究过程清楚可见。
- Description: collect trustworthy sources, synthesize cited findings, and
  share a research narrative that teams can understand and review.
- Features: 收集来源, 综合发现, 分享叙事.
- Primary CTA: 开始试用.
- Image: existing Qingxu research editorial photograph.
- Business goal: make the AI product feel credible, calm, and useful for real
  research collaboration.

### 11.2 Ordinary AI Direction

The default mobile site should feel like a common AI SaaS page:

- Dark or high-contrast gradient hero.
- "AI powered" badge and glowing CTA.
- Dashboard-like overlays.
- Feature cards with equal emphasis.
- Futuristic cues that are plausible but generic.

It should remain credible as a product website.

### 11.3 SongStyle Direction

The SongStyle mobile site should translate "three distances" into a research
interface narrative:

- Near distance: current research promise and start action.
- Middle distance: sources, findings, and citation relationships.
- Far distance: shared narrative and team understanding.
- Background uses paper, ink, mist gray, and restrained celadon rather than
  neon or tech gradients.
- Lines and spacing imply relation without over-drawing a dashboard.
- The image should feel like quiet evidence of work, not decoration.

The result should make AI feel trustworthy through order and calm rather than
through spectacle.

## 12. Homepage Changes

The homepage should be redesigned around one immediate visual proof:

1. Thesis: `AI 不懂得何时停止。`
2. Subtitle: `同样的建站内容，SongStyle 让移动网站从不断添加转向准确表达。`
3. Primary visual: two phone sites side by side, preferably using Baiting as the
   first strongest proof.
4. Fairness statement: same brief, same content, same image, same CTA, same
   goal.
5. Method bridge: Song aesthetics become digital decisions: observation,
   information distance, typography, tone, space, useful ornament.
6. Links to full Baiting and Qingxu comparisons.

The homepage should not lead with a resource directory. Resources come after
the proof.

## 13. README Changes

The README should become more direct about the project gap and the visual proof:

- Add one paragraph stating that systematic Song aesthetics for UI, web, and app
  design is nearly absent, based on the supplied research report.
- Add a "Digital SongStyle Framework" section with the six-to-seven mappings in
  Section 7.
- Replace the current static image table with two committed browser screenshots
  of the finished mobile comparisons:
  - `docs/assets/mobile-showcase-baiting.png`
  - `docs/assets/mobile-showcase-qingxu.png`
- Keep the fair comparison contract near the top.
- Avoid unverified promotional metrics.

## 14. Reference Content Changes

Create `docs/references/song-aesthetics-digital-design-research.md` as a
curated summary of the supplied research report for project readers:

- What the report found.
- Which sources are strongest for methodology.
- Which network claims are treated as background, not proof.
- The extracted design commandments.
- How the project translates them into digital interface rules.

Do not copy the full external report into the repository by default. The summary
page should cite the source path, preserve the useful method extraction, and
label unverified market statistics as unverified background signals.

## 15. Implementation Architecture

The implementation should stay static and component-driven.

Create or adapt these units:

- `website/src/data/cases.ts`: extend shared case data from simple component
  content into mobile-site briefs with sections and invariants.
- `website/src/components/examples/PhoneFrame.astro`: reusable responsive phone
  shell.
- `website/src/components/examples/MobileSiteComparison.astro`: shared
  two-column comparison stage with labels and invariant strip.
- `website/src/components/examples/BaitingDefaultMobile.astro`: default AI
  mobile site.
- `website/src/components/examples/BaitingSongStyleMobile.astro`: SongStyle
  mobile site.
- `website/src/components/examples/QingxuDefaultMobile.astro`: default AI
  mobile site.
- `website/src/components/examples/QingxuSongStyleMobile.astro`: SongStyle
  mobile site.
- `website/src/components/home/MobileShowcasePreview.astro`: homepage proof
  preview using one or both cases.
- `website/src/components/home/SongAestheticFramework.astro`: concise method
  bridge.
- `docs/references/song-aesthetics-digital-design-research.md`: curated
  research summary and translation framework.
- `docs/assets/mobile-showcase-baiting.png`: committed screenshot for README.
- `docs/assets/mobile-showcase-qingxu.png`: committed screenshot for README.

Existing case pages should consume the new comparison components. Old card
comparison components may be removed or kept only if still referenced by
archival pages.

## 16. Testing And Verification

Completion requires:

1. Unit/content tests prove the research summary, framework page, and mobile
   comparison components exist.
2. Shared case data tests prove both mobile versions consume the same headline,
   description, CTA, features, image, and business goal.
3. Playwright proves each case page displays two labeled phone websites in one
   comparison stage.
4. Playwright proves both sides expose the same required content.
5. Playwright proves homepage exposes the mobile-site proof before resources.
6. Accessibility tests pass on homepage, both case pages, comparison overview,
   and reference pages.
7. Reduced-motion tests still pass if any motion is introduced.
8. Manual visual QA confirms:
   - Default AI versions are plausible and professional.
   - SongStyle versions are visibly richer than generic minimalism.
   - The mobile-site form is clear at desktop and small-screen sizes.
   - There is no horizontal overflow.
9. `npm run verify` passes before publication.
10. The public GitHub Pages site contains the updated proof after push.

## 17. Success Criteria

This iteration succeeds when a first-time visitor can answer within 10 seconds:

1. SongStyle is solving AI over-addition and weak stopping judgment.
2. The comparison is fair because both sides use the same brief and content.
3. SongStyle is not ancient-style decoration.
4. SongStyle is also not generic minimalism.
5. Song aesthetics have been translated into concrete digital interface
   decisions.

The subjective bar is higher than the previous iteration: the SongStyle mobile
sites should feel good enough that the user wants to show them as the project's
core visual proof.

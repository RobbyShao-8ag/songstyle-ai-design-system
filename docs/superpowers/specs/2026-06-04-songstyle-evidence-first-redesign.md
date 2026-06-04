# SongStyle Evidence-First Redesign

## Design Specification

- Status: Approved direction, pending written-spec review
- Date: 2026-06-04
- Author: RobbyShao-8ag
- Target release: v0.2 development iteration
- Target repository: `RobbyShao-8ag/songstyle-ai-design-system`

## 1. Summary

This iteration makes SongStyle understandable before a reader has to navigate
through its documentation. The public entry experience will move from a
documentation-first introduction to an evidence-first explanation:

> AI does not know when to stop. With the same content, SongStyle turns design
> from continual addition into accurate expression.

The homepage and README will first show a fair visual comparison, then explain
the design method, then provide the executable resources. The two fictional
brand cases will be rebuilt so their ordinary AI and SongStyle versions use
the same product facts, copy, image, action, and business goal. The comparison
must prove that the improvement comes from design judgment rather than from
better content or a more attractive asset.

## 2. Goals

1. Let a first-time visitor understand SongStyle's distinctive value from the
   homepage or README without opening several links.
2. Make the before-and-after cases visually convincing and methodologically
   fair.
3. Use generated images to improve product and scenario comprehension, not to
   decorate the project or simulate historical style.
4. Give the open-source project a clear Roadmap, structured feedback channels,
   and a first-round user testing plan.
5. Preserve the v0.1 thesis that SongStyle is an executable design language,
   not an ancient-style visual skin.

## 3. Audience And Entry Message

The primary public audience is designers and AI-assisted developers together.
The common entry problem is not a framework or a visual trend. It is the
inability of generative systems to decide when an interface has expressed
enough.

The first-screen message is:

> AI 不懂得何时停止。
>
> 同样的内容，SongStyle 让设计从“不断添加”转向“准确表达”。

Supporting language must immediately clarify that SongStyle does not mean
empty pages, ancient decoration, or deleting useful information.

## 4. Evidence-First Information Architecture

### 4.1 Homepage Sequence

The homepage will use this sequence:

1. **Thesis:** one problem, one response, and one primary action.
2. **Fair comparison evidence:** a visible ordinary AI / SongStyle comparison
   with explicit invariants: same copy, same image, same features, same goal.
3. **Method:** a concise four-step explanation:
   necessary information, establish order, functional negative space,
   appropriate stopping.
4. **Case proof:** direct entries to Baiting and Qingxu with visual thumbnails.
5. **Executable resources:** Prompts, Agent Skills, Design Tokens, and review
   checklist.
6. **Participation:** Roadmap, user testing, and contribution entry points.

The homepage should not require a reader to understand the full manifesto
before seeing evidence.

### 4.2 README Sequence

The README will mirror the same narrative:

1. Project thesis and concise definition.
2. A visual comparison image or paired case images.
3. The fairness statement.
4. What SongStyle changes and does not change.
5. Fast links to use, review, cases, Roadmap, and user testing.
6. Scope, development, and licensing.

## 5. Fair Comparison Contract

Each fictional brand has one shared content source. Both visual versions must
render the same:

- Brand name and product positioning
- Main headline and supporting description
- Primary image
- Feature or specification information
- Primary action
- Business goal

The visual versions may change only:

- Layout and grouping
- Information hierarchy
- Typography family, size, weight, and measure
- Color and background treatment
- Image crop, scale, placement, and overlays
- Spacing and functional negative space
- Card, boundary, decoration, and emphasis choices

The ordinary AI version must remain professional, usable, and plausible. It
should demonstrate common over-design tendencies without becoming a caricature:
too many simultaneous emphasis points, unnecessary cards, decorative effects,
competing hierarchy, and stopping too late.

The SongStyle version must not win by removing required content. It should win
through accurate relationships, reading rhythm, visual longevity, and measured
stopping.

## 6. Shared Case Content

### 6.1 Baiting

The shared content will describe one contemporary glass water carafe:

- Brand: 白汀 Baiting
- Position: 日常饮水器物
- Headline: 让水回到桌面，安静地成为日常。
- Description: a 1.2 L borosilicate glass carafe with a thin stable rim, wide
  opening, and comfortable daily use.
- Features: 高硼硅玻璃, 1.2 L, 宽口易清洁
- Action: 查看器物与购买信息
- Image: one realistic editorial product photograph reused in both versions

### 6.2 Qingxu

The shared content will describe one modern AI research workspace:

- Brand: 清序 Qingxu
- Position: AI 研究工作台
- Headline: 从来源到叙事，让研究过程清楚可见。
- Description: collect trustworthy sources, synthesize cited findings, and
  share a research narrative that teams can understand and review.
- Features: 收集来源, 综合发现, 分享叙事
- Action: 开始试用
- Image: one realistic editorial research-work scene reused in both versions

## 7. Generated Image Direction

Generated assets will use realistic editorial photography. They must feel
contemporary, credible, and quiet rather than historical, luxurious, or
fantastical.

### 7.1 Baiting Image

- A transparent glass carafe on a contemporary home table
- Soft natural side light
- Visible material quality and believable proportions
- Calm neutral setting with room for cropping
- No text, logo, traditional motif, watermark, or dramatic styling

### 7.2 Qingxu Image

- A modern research team or researcher organizing sources at a desk
- A screen and physical notes may be visible, but no readable interface text
- Natural light, credible workspace, and restrained color
- No futuristic neon, holograms, exaggerated AI imagery, or watermark

Each image will be stored under `website/public/assets/cases/` and reused by
both visual treatments. Image generation prompts will be documented so the
assets can be understood and regenerated conceptually.

## 8. Visual Explanation

The project should use images where they increase understanding:

- Homepage comparison preview
- Case-study visual treatments
- README evidence

The four-step method explanation should remain code-native HTML/CSS rather
than a generated infographic. It is structured information and must remain
accessible, responsive, and editable.

## 9. Open-Source Participation

### 9.1 Roadmap

Create `ROADMAP.md` with:

- Current v0.1 foundation
- Immediate evidence and community-validation work
- v0.2 focus on operational clarity and real-world proof
- Later possibilities that remain explicitly out of scope until validated

### 9.2 Issue Templates

Create structured GitHub issue forms for:

- Bug report
- SongStyle usage feedback
- Community case-study proposal
- Design discussion

The forms should request evidence, context, and expected outcomes rather than
only opinions.

### 9.3 First-Round User Testing Plan

Create `docs/research/first-round-user-testing.md`. It will recruit designers
and AI-assisted developers, ask them to complete the same brief with and
without SongStyle resources, and collect:

- Time to first coherent proposal
- Ability to explain what was removed or retained
- Checklist scores
- Perceived hierarchy, trust, and visual longevity
- Confusions about SongStyle's meaning
- Reusable artifacts for future community cases

The plan must protect the fairness of the comparison and avoid claiming
success before results exist.

## 10. Implementation Boundaries

This iteration does not add:

- A production component library
- An online generator
- User accounts or a backend
- A Figma plugin or MCP server
- A historical visual reconstruction
- A claim that generated images are historical references
- Interactive comparison controls that are inaccessible or required to
  understand the evidence

Side-by-side and stacked responsive comparisons are preferred over a
JavaScript-dependent slider.

## 11. Verification

Completion requires:

1. Static tests prove Roadmap, issue forms, user-testing plan, generated image
   assets, and documented image prompts exist.
2. Case components consume shared content and the same image path for both
   visual versions.
3. The homepage and README state the fairness contract.
4. Playwright proves the homepage exposes the thesis, fairness statement,
   method, cases, and participation paths.
5. Playwright proves both case pages show the shared copy in both visual
   versions.
6. Desktop and mobile pages have no horizontal overflow and no detectable
   WCAG A/AA violations in the tested routes.
7. Manual visual QA confirms the ordinary versions remain credible and the
   SongStyle versions show a clear improvement without changing the content.
8. `npm run verify` passes before publication.
9. The public GitHub repository and GitHub Pages site contain the update.

## 12. Success Criteria

This iteration succeeds when a first-time visitor can answer, from the
homepage alone:

- What problem does SongStyle solve?
- What remains the same in the comparison?
- What design decisions change?
- Why is SongStyle not merely minimalism or ancient-style decoration?
- How can I use it or help validate it?

It also succeeds when the case studies make a credible claim:

> The content did not become better. The design judgment did.

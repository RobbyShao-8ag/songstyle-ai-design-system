# First-Screen Evidence Visibility Design

## Goal

Make the visual evidence appear earlier on desktop without turning the site
into a dense promotional layout. At a `1280 x 720` viewport, visitors should
see the top of the mobile website comparison on the home page and on both case
study pages without scrolling.

## Scope

This change is limited to desktop vertical rhythm and duplicated case-page
introductory content. It does not redesign the phone treatments, change case
content, alter navigation, or reduce the existing mobile spacing.

## Home Page

For viewports at least `900px` wide:

- Reduce the hero minimum height from the current `78vh` treatment to
  `min(60vh, 580px)`.
- Tighten the spacing between the hero statement, body copy, and actions.
- Tighten the mobile showcase heading spacing and bottom margin.
- Preserve the current single-column, restrained composition and all existing
  copy and calls to action.

At `1280 x 720`, the top edge of the first phone pair must be inside the
viewport when the home page loads.

## Case Pages

For viewports at least `900px` wide:

- Reduce the case article's top padding and the case intro's bottom margin.
- Slightly reduce the maximum desktop case-title size while preserving its
  display role.
- Add a compact mode for `MobileSiteComparison` that can retain the business
  goal and fairness invariants while omitting the repeated large comparison
  title.
- Use that compact-summary mode on the Baiting and Qingxu detail pages.

At `1280 x 720`, the top edge of both phone frames must be inside the viewport
when either case page loads.

## Responsive Behavior

The optimization applies only at desktop breakpoints. Below `900px`, the
current spacious vertical flow remains unchanged so headings, controls, and
stacked phone frames do not become cramped.

## Accessibility

- Heading hierarchy remains valid: each page keeps one `h1`, and compact case
  comparisons retain a visually hidden descriptive `h2` for assistive
  technology.
- Existing links, labels, contrast, and reduced-motion behavior remain intact.
- No content is hidden solely to satisfy the viewport test.

## Verification

Add Playwright regression coverage using a `1280 x 720` viewport. The tests
will assert that:

- The home-page phone pair begins above the bottom of the initial viewport.
- The Baiting and Qingxu phone pairs begin above the bottom of the initial
  viewport.
- The existing fairness invariants and phone labels remain visible and
  accessible.

Run `npm run verify` after implementation and manually inspect the three pages
at the target viewport.

## Non-Goals

- No side-by-side hero redesign.
- No miniature phone mockups inside the hero.
- No changes to the visual language of the four mobile website treatments.
- No content deletion from the case-study Markdown analysis.
